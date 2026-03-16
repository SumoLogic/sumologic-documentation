---
id: remove-doc
title: Move or Remove a Doc
description: Learn how to properly move or remove a Sumo Logic doc.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

When you move a doc or remove it altogether, that deletes its URL. Visiting the old URL will return a `404 - Page Not Found` error, which negatively impacts customer experience and can damage our SEO.

To prevent this, create a 301 redirect. Follow these steps to ensure a smooth transition and maintain the health of our docs site.

## Prerequisites

import DocPrereq from '../reuse/doc-prerequisites.md';

<DocPrereq/>

## Step 1: Create a 301 redirect

As an example, let's say there are two docs called **Nginx App** and **Nginx (Legacy) App**, and we need to deprecate the latter.

1. In your GitHub authoring tool (like VS Code), open the [cid-redirects.json file](https://github.com/SumoLogic/sumologic-documentation/blob/main/cid-redirects.json), which contains all 301 redirects.
1. Add a redirect from the old URL you're removing to the new URL containing the equivalent content.
   ```json
   "/docs/integrations/web-servers/nginx-legacy": "/docs/integrations/web-servers/nginx",
   ```

## Step 2: Update internal links

Ensure any internal links pointing to the deleted doc are updated to the new URL.

1. In your GitHub authoring tool, run a search for the URL you're removing. For example, if the legacy URL appears in other documents, replace all instances with the new URL.<br/><img src={useBaseUrl('img/contributing/old-url.png')} alt="Screenshot of a 'Find All' search for the URL to be removed" />
   :::warning
   Never do a Find All > Replace All, as this can break unrelated items like image paths. Replace each URL on a one-by-one basis.
   :::
1. If applicable:
   * Remove from its parent index.md hub page.
   * Remove from [Product List](/docs/integrations/product-list/).

## Step 3: Delete the doc file

Delete the actual .md doc file from the repository (in this example, it'd be `docs/integrations/web-servers/nginx-legacy.md`).

## Step 4: Remove doc from navigation

Remove the doc from the navigation menu ([sidebars.ts](https://github.com/SumoLogic/sumologic-documentation/blob/main/sidebars.ts) file).

## Step 5: Publish and test the redirect

Verify that the redirect works correctly and leads to the intended destination.

## Optional steps

### Add deprecation note

If you're deprecating one solution in favor of another (like in the above **Nginx** and **Nginx (Legacy)** example), you may also want to [add a note](/docs/contributing/style-guide#admonitions) in the new doc stating the legacy solution has been deprecated. Check with a subject matter expert to be sure.

### Hide from search engine results

It can take months for an old URL to drop from Google search engine results. If you need to hide a page immediately from Google, [open a GitHub Issue](https://github.com/SumoLogic/sumologic-documentation/issues/new/choose) and provide the details for our site admin.

### Exclude pages from the site build

You can prevent content from being indexed by excluding it from compilation entirely. Pages that aren't compiled into the build output won't appear on the live site or sitemap, so neither search engines nor internal site search can index them.

To exclude docs, add their paths to the `docs.exclude` setting in `docusaurus.config.js`:

```json title="docusaurus.config.js"
presets: [
  [
    '@docusaurus/preset-classic',
    ({
      docs: {
        exclude: [
          '**/reuse/**',
          '**/ja/**',
        ],
      },
    }),
  ],
];
```

Any markdown files in the listed directories are excluded from the build and won't be served or indexed. Note that `reuse` files are still embedded where referenced — they just won't compile as standalone pages.

For finer-grained control — for example, keeping a page compiled but hidden from search — use `robots.txt` or `noindex` meta tags instead. If content should never be published at all, excluding it from compilation is the most reliable approach.

If a document has already been indexed and needs to be urgently removed from Google search results, follow [Google's removal instructions](https://support.google.com/webmasters/answer/9689846?sjid=11985967130976965420-NC).
