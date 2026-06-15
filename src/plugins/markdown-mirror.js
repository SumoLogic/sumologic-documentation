/**
 * markdown-mirror — Docusaurus plugin
 *
 * Copies every .md/.mdx file from docs/ into {outDir}/llm/docs/ during
 * production builds, making raw source available to AI crawlers at predictable
 * URLs like /help/llm/docs/search/get-started-with-search.md
 *
 * Also generates /llm/docs/index.txt listing every mirrored path, stamps the
 * Last updated date in llms.txt, and injects <link rel="alternate"
 * type="text/markdown"> into every docs HTML page so crawlers can discover
 * the mirror automatically.
 */

const fs = require('fs');
const path = require('path');

function walkDocs(dir, base = dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDocs(full, base, files);
    } else if (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) {
      files.push(path.relative(base, full));
    }
  }
  return files;
}

module.exports = function markdownMirrorPlugin(context) {
  const docsDir = path.join(context.siteDir, 'docs');

  return {
    name: 'markdown-mirror',

    async postBuild({ outDir }) {
      const mirrorDir = path.join(outDir, 'llm', 'docs');
      const relPaths = walkDocs(docsDir);
      const index = [];

      for (const rel of relPaths) {
        const src = path.join(docsDir, rel);
        const dest = path.join(mirrorDir, rel);
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.copyFileSync(src, dest);
        index.push(`/llm/docs/${rel.replace(/\\/g, '/')}`);
      }

      // Write index for easy discovery
      fs.writeFileSync(path.join(mirrorDir, 'index.txt'), index.join('\n') + '\n');
      console.log(`[markdown-mirror] ${relPaths.length} files mirrored to /llm/docs/`);

      // Update "Last updated" date in the built llms.txt
      const llmsTxtPath = path.join(outDir, 'llms.txt');
      if (fs.existsSync(llmsTxtPath)) {
        const today = new Date().toISOString().slice(0, 10);
        const updated = fs.readFileSync(llmsTxtPath, 'utf8')
          .replace(/^- Last updated: .+$/m, `- Last updated: ${today}`);
        fs.writeFileSync(llmsTxtPath, updated);
        console.log(`[markdown-mirror] llms.txt Last updated set to ${today}`);
      }

      // Inject <link rel="alternate" type="text/markdown"> into each docs HTML page
      const docsHtmlDir = path.join(outDir, 'docs');
      if (fs.existsSync(docsHtmlDir)) {
        const siteUrl = context.siteConfig.url;
        const baseUrl = context.siteConfig.baseUrl.replace(/\/$/, '');
        let injected = 0;

        function injectAlternateLinks(dir) {
          for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            const full = path.join(dir, entry.name);
            if (entry.isDirectory()) {
              injectAlternateLinks(full);
              continue;
            }
            if (entry.name !== 'index.html') continue;

            // Relative path of this page's directory from the docs HTML root
            // e.g. outDir/docs/alerts/monitors → 'alerts/monitors'
            const docPath = path.relative(docsHtmlDir, dir);

            // Check both mirror patterns: folder/index.md and flat-file.md
            const candidates = docPath
              ? [
                  path.join(mirrorDir, docPath, 'index.md'),
                  path.join(mirrorDir, docPath + '.md'),
                  path.join(mirrorDir, docPath, 'index.mdx'),
                  path.join(mirrorDir, docPath + '.mdx'),
                ]
              : [path.join(mirrorDir, 'index.md')];

            const found = candidates.find(c => fs.existsSync(c));
            if (!found) continue;

            const mirrorRelPath = '/' + path.relative(outDir, found).replace(/\\/g, '/');
            const mirrorHref = `${siteUrl}${baseUrl}${mirrorRelPath}`;
            const tag = `<link rel="alternate" type="text/markdown" href="${mirrorHref}"/>`;

            let html = fs.readFileSync(full, 'utf8');
            html = html.replace('</head>', `${tag}</head>`);
            fs.writeFileSync(full, html);
            injected++;
          }
        }

        injectAlternateLinks(docsHtmlDir);
        console.log(`[markdown-mirror] ${injected} HTML pages tagged with <link rel="alternate" type="text/markdown">`);
      }
    },
  };
};
