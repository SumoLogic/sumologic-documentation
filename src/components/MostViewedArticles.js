// src/components/MostViewedArticles.jsx
import React from 'react';
import Link from '@docusaurus/Link';
import { Box, Typography } from '@mui/material';
import mostViewed from '@generated/recent-docs-plugin/default/most-viewed.json';

export default function MostViewedArticles() {
  return (
    <Box>
      <Typography
        component="h2"
        fontFamily="Lab Grotesque"
        fontSize={15}
        fontWeight={900}
        letterSpacing="0.08em"
        mb={1.5}
        pb={0.75}
        sx={{
          borderBottom: '2px solid',
          borderColor: 'primary.main',
          color: 'text.secondary',
          textTransform: 'uppercase',
        }}
      >
        Most Viewed Articles
      </Typography>

      {!mostViewed?.length ? (
        <Typography color="text.secondary" fontSize={14}>
          Analytics data not yet available.
        </Typography>
      ) : (
        <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {mostViewed.map((doc) => (
            <Box
              component="li"
              key={doc.id}
              sx={{
                borderBottom: '1px solid',
                borderColor: 'grey.100',
                display: 'flex',
                flexDirection: 'column',
                py: 0.75,
                '&:last-child': { borderBottom: 'none' },
              }}
            >
              <Link
                to={doc.path}
                style={{
                  color: 'inherit',
                  fontSize: 14,
                  fontWeight: 500,
                  lineHeight: 1.4,
                  textDecoration: 'none',
                }}
              >
                {doc.title}
              </Link>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}


# GA4 Most-Viewed Setup Guide
# ─────────────────────────────────────────────────────────────────────────────
# Follow these steps once. After setup the plugin reads GA4 page-view data
# at build time and populates the "Most Viewed" column automatically.
# ─────────────────────────────────────────────────────────────────────────────


## Step 1 — Install the GA4 client library

npm install @google-analytics/data

# Or with yarn:
yarn add @google-analytics/data


## Step 2 — Open Google Cloud Console

https://console.cloud.google.com/


## Step 3 — Enable the Analytics Data API

1. In the Console, go to: APIs & Services > Library
2. Search for "Google Analytics Data API"
3. Click Enable


## Step 4 — Create a Service Account

1. Go to: IAM & Admin > Service Accounts
2. Click "Create Service Account"
3. Name it something like: sumo-docs-ga4-reader
4. Grant it no project-level roles (click Continue, then Done)


## Step 5 — Download the JSON key

1. Click the service account you just created
2. Go to the Keys tab
3. Click Add Key > Create new key > JSON
4. Save the downloaded file as: ga4-key.json
5. Store it somewhere safe — NEVER commit this file to the repo

   Add to .gitignore:
   ga4-key.json
   **/ga4-key.json


## Step 6 — Add the service account as a Viewer in your GA4 property

1. Go to: https://analytics.google.com/
2. Open your property > Admin (gear icon, bottom left)
3. Under "Property", click "Property Access Management"
4. Click the + button > Add users
5. Enter the service account email (format: name@project-id.iam.gserviceaccount.com)
6. Set role to: Viewer
7. Click Add


## Step 7 — Find your GA4 Property ID

1. In Google Analytics, go to Admin > Property Settings
2. Copy the "Property ID" — it is a plain number, e.g. 123456789
   (Do NOT include the "properties/" prefix)


## Step 8 — Set environment variables

### Local development (.env.local — do not commit):

GA4_PROPERTY_ID=123456789
GOOGLE_APPLICATION_CREDENTIALS=/absolute/path/to/ga4-key.json


### GitHub Actions (Settings > Secrets and variables > Actions):

Secret name              Value
──────────────────────── ─────────────────────────────────────────────
GA4_PROPERTY_ID          123456789
GA4_KEY_JSON             (paste the entire contents of ga4-key.json)

Then add this step to your workflow BEFORE the build step:

    - name: Write GA4 service account key
      run: echo '${{ secrets.GA4_KEY_JSON }}' > ga4-key.json

    - name: Build
      env:
        GA4_PROPERTY_ID: ${{ secrets.GA4_PROPERTY_ID }}
        GOOGLE_APPLICATION_CREDENTIALS: ./ga4-key.json
      run: yarn build


## Step 9 — Verify it works locally

yarn start

Open the browser console and check for either:
  ✅  No warning             → GA4 data loaded successfully
  ⚠️  "GA4 fetch failed"    → check property ID and key file path
  ⚠️  "GA4_PROPERTY_ID not set" → env var missing


## How page paths are matched

GA4 reports paths like:  /help/docs/integrations/amazon-aws/cloudtrail/
The plugin normalises:   doc.path (e.g. /help/docs/integrations/amazon-aws/cloudtrail)
And checks both with and without trailing slash so paths always match.


## Notes

- The plugin fetches the top 50 GA4 paths by views over the last 90 days,
  then filters to only paths that match a real doc page.
- If GA4 env vars are not set the plugin silently skips and most-viewed.json
  is written as an empty array — the "Most Viewed" column shows a placeholder.
- The @google-analytics/data package is only required() at runtime inside the
  try block, so the plugin will not crash if the package is not installed.