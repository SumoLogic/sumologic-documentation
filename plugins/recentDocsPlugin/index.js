const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const matter = require('gray-matter');

async function fetchGA4PageViews(propertyId) {
  const viewMap = new Map();

  if (!propertyId) {
    console.warn('[recentDocsPlugin] GA4_PROPERTY_ID not set — skipping most-viewed.');
    return viewMap;
  }

  const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (!keyPath || !fs.existsSync(keyPath)) {
    console.warn('[recentDocsPlugin] GOOGLE_APPLICATION_CREDENTIALS not set or file missing — skipping most-viewed.');
    return viewMap;
  }

  try {
    const { BetaAnalyticsDataClient } = require('@google-analytics/data');
    const client = new BetaAnalyticsDataClient({
      keyFilename: keyPath,
    });

    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '90daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 50, // fetch top 50, we'll filter down to docs pages only
    });

    for (const row of response.rows ?? []) {
      const pagePath = row.dimensionValues[0].value;
      const views = parseInt(row.metricValues[0].value, 10);
      viewMap.set(pagePath, views);
    }
  } catch (err) {
    console.warn('[recentDocsPlugin] GA4 fetch failed:', err.message);
  }

  return viewMap;
}

function getGitLastUpdated(fullPath) {
  try {
    const result = execSync(
      `git log -1 --format=%cI -- "${fullPath}"`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }
    ).trim();
    return result || null;
  } catch {
    return null;
  }
}


function getGitFirstCommit(fullPath) {
  try {
    const result = execSync(
      `git log --follow --format=%cI -- "${fullPath}" | tail -1`,
      { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }
    ).trim();
    return result || null;
  } catch {
    return null;
  }
}


module.exports = function recentDocsPlugin(context) {
  return {
    name: 'recent-docs-plugin',

    async loadContent() {
      const docsDir = path.join(context.siteDir, 'docs');
      const docs = [];

      function scanDir(dir) {
        let files;
        try {
          files = fs.readdirSync(dir);
        } catch {
          return;
        }

        for (const file of files) {
          const fullPath = path.join(dir, file);
          let stat;
          try {
            stat = fs.statSync(fullPath);
          } catch {
            continue;
          }

          if (stat.isDirectory()) {
            scanDir(fullPath);
            continue;
          }

          if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;

          let fileContent;
          try {
            fileContent = fs.readFileSync(fullPath, 'utf-8');
          } catch {
            continue;
          }

          const { data } = matter(fileContent);
          if (!data.title) continue; // skip partials and untitled files

          const relativePath = path
            .relative(docsDir, fullPath)
            .replace(/\\/g, '/')
            .replace(/\.mdx?$/, '');


          const gitUpdated = getGitLastUpdated(fullPath);
          const updated = gitUpdated
            ? new Date(gitUpdated).toISOString()
            : stat.mtime.toISOString(); // local dev fallback only

          const createdRaw = data.created_at ?? null;
          const gitCreated = createdRaw ? null : getGitFirstCommit(fullPath);
          const created = createdRaw
            ? new Date(createdRaw).toISOString()
            : gitCreated
              ? new Date(gitCreated).toISOString()
              : null;

          docs.push({
            id: relativePath,
            title: data.title,
            path: `${context.baseUrl}docs/${relativePath}`,
            created,
            updated,
          });
        }
      }

      scanDir(docsDir);
      return docs;
    },

    async contentLoaded({ content, actions }) {
      const { createData } = actions;

      // ── Recently Created ─────────────────────────────────────────────────
      const recentCreated = [...content]
        .filter((d) => d.created !== null)
        .sort((a, b) => new Date(b.created) - new Date(a.created))
        .slice(0, 10)
        .map(({ id, title, path, created }) => ({ id, title, path, created }));

      // ── Recently Updated ─────────────────────────────────────────────────
      const recentUpdated = [...content]
        .sort((a, b) => new Date(b.updated) - new Date(a.updated))
        .slice(0, 10)
        .map(({ id, title, path, updated }) => ({ id, title, path, updated }));

      // ── Most Viewed (GA4) ────────────────────────────────────────────────
      // Set these two env vars to enable:
      //   GA4_PROPERTY_ID                 — numeric GA4 property ID (no "properties/" prefix)
      //   GOOGLE_APPLICATION_CREDENTIALS  — path to the service account JSON key file
      const propertyId = process.env.GA4_PROPERTY_ID;
      const viewMap = await fetchGA4PageViews(propertyId);

      let mostViewed = [];

      if (viewMap.size > 0) {
        mostViewed = content
          .map((doc) => {
            const normalised = doc.path.replace(/\/$/, '').toLowerCase();
            const views =
              viewMap.get(normalised + '/') ??
              viewMap.get(normalised) ??
              0;
            return { ...doc, views };
          })
          .filter((d) => d.views > 0)
          .sort((a, b) => b.views - a.views)
          .slice(0, 10)
          .map(({ id, title, path, views }) => ({ id, title, path, views }));
      }

      await createData(
        'recent-created.json',
        JSON.stringify(recentCreated, null, 2),
      );
      await createData(
        'recent-updated.json',
        JSON.stringify(recentUpdated, null, 2),
      );
      await createData(
        'most-viewed.json',
        JSON.stringify(mostViewed, null, 2),
      );
    },
  };
};