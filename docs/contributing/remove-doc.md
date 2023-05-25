---
id: remove-doc
title: How to Remove a Sumo Doc
sidebar_label: Remove a Doc
description: Learn how to properly remove a Sumo Logic doc.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Never delete a doc without a plan in place!

When you delete a doc, you're also deleting a URL. The old URL, when visited, will return a `404 - Page Not Found` error, which is not the customer experience we want. Additionally, this damages our SEO.

To keep our docs site healthy, follow these steps.

## Step 1: Create a 301 redirect

As an example, let's say we have two existing docs called **Nginx app** and **Nginx (Legacy) app**, and we need to deprecate the legacy version.

1. In your GitHub authoring tool (like Atom or VS Code), open our [cid-redirects.json file](https://github.com/SumoLogic/sumologic-documentation/blob/main/cid-redirects.json), which contains all 301 redirects.
1. Add a redirect from the *legacy URL* you're removing to the *new URL* that contains the equivalent content.
  ```
  "/docs/integrations/web-servers/nginx-legacy": "/docs/integrations/web-servers/nginx",
  ```

## Step 2: Update all instances of the old URL

If the doc URL you're removing appears in other docs, you'll need to update those instances to prevent broken links.

In your GitHub authoring tool, run a search for the URL you're removing. In this case, it looks like the legacy URL appears in other docs. Check with a Sumo subject matter expert (SME) to confirm that you can replace all with the new URL.

<img src={useBaseUrl('img/contributing/old-url.png')} alt="header sizes" />

:::caution
Never do a Find All > Replace All, as this can break unrelated items like image paths. Replace each URL on a one-by-one basis.
:::

## Step 3: Delete the doc

Delete the actual .md doc file from the repository (in this example, it'd be `docs/integrations/web-servers/nginx-legacy.md`).

## Step 4: Remove doc from navigation

Remove the doc from the navigation menu ([sidebars.ts](https://github.com/SumoLogic/sumologic-documentation/blob/main/sidebars.ts) file).

## Step 5: Add deprecation note (optional)

If you're deprecating one solution in favor of another (like in our **Nginx** and **Nginx (Legacy)** example), you may also want to [add a note](/docs/contributing/style-guide#admonitions) in the new doc stating the legacy solution has been deprecated. Check with a SME to be sure.


## Step 6: Hide from Google results (optional)

It can take months for an old URL to drop from Google search engine results. If you run into a scenario where you need to hide a page immediately from Google, [open a GitHub Issue](https://github.com/SumoLogic/sumologic-documentation/issues/new/choose) and provide the details for our site admin.
