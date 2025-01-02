---
id: remove-doc
title: Remove a Doc
description: Learn how to properly remove a Sumo Logic doc.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

When you delete a doc, its URL is also deleted. Visiting the old URL will return a `404 - Page Not Found` error, which negatively impacts customer experience and can damage our SEO.

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
1. Check with a Sumo Logic subject matter expert to confirm that you can replace all with the new URL.

:::warning
Never do a "Find All > Replace All", as this can break unrelated items like image paths. Replace each URL on a one-by-one basis.
:::

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
