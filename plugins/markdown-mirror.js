/**
 * markdown-mirror — Docusaurus plugin
 *
 * Copies every .md/.mdx file from docs/ into {outDir}/llm/docs/ during
 * production builds, making raw source available to AI crawlers at predictable
 * URLs like /help/llm/docs/search/get-started-with-search.md
 *
 * Also generates /llm/docs/index.txt listing every mirrored path.
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
    },
  };
};
