---
id: create-edit-doc
title: Create or Edit a Doc
description: How to create or edit a Sumo Logic doc by forking the repo, writing in Markdown with Docusaurus components, previewing locally, and opening a pull request.
keywords:
  - create a doc
  - edit documentation
  - markdown
  - contribute docs
  - pull request
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

This guide walks you through creating or editing a Sumo Logic doc: forking the repository, writing content in Markdown, previewing your changes locally, and submitting a pull request. Whether you're fixing a small error or adding a new page, the steps are the same.

:::tip Recommended: Use Claude Code
If you have [Claude Code](https://claude.ai/code) installed, this repo's `/doc`, `/audit-doc`, and `/seo-audit` slash commands can help you draft and review docs locally against your fork. See the [README](https://github.com/SumoLogic/sumologic-documentation#claude-code-tooling) for the full command list and which ones require internal access.
:::

## Prerequisites

import DocPrereq from '../reuse/contributing/doc-prerequisites.md';

<DocPrereq/>

## Quickstart

### Submit a GitHub Issue

Short on time? You can report a bug or request more information by [submitting a GitHub Issue](https://github.com/SumoLogic/sumologic-documentation/issues/new/choose) to our repository. Enter as much information as you can, including content corrections, steps to reproduce, command/code updates, clarifying questions, and recommended fixes.

Before submitting an issue, you can browse our [existing GitHub issues](https://github.com/SumoLogic/sumologic-documentation/issues) to see if someone has already reported it, and join the discussion via comments.

### Submit a minor fix

You can submit a minor fix, like a typo correction, without cloning or forking the repository locally. Check out the instructions below.

:::training Micro Lesson
Check out this brief tutorial on how to submit a basic change to our docs.

<Iframe url="https://fast.wistia.net/embed/iframe/83p9f6qa6n?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Tutorial: Contributing to Sumo Docs: Simple Edits Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

:::

<details>
<summary>View text instructions</summary>

1. Scroll to the bottom of that doc and click the **Edit this page** link. This will open your selected doc in **Edit file** mode on our GitHub repo website.
1. Click **Fork this repository** to continue.
1. Apply your edits to the file.
1. Scroll down a bit on the page until you see the description field, enter a brief summary of your changes there, then click **Commit changes**.
1. In the **Propose changes** dialog, enter a description of your change, enter a new name for your branch if desired, and click **Propose Change**.

This will fork and submit changes to the Docs Team for review.
</details>

## Edit a doc

### Step 1: Fork the Sumo Docs repository

import ForkRepo from '../reuse/contributing/fork-repo.md';

<ForkRepo/>

### Step 2: Edit your doc

In your new branch, edit the doc Markdown file. See our [Style Guide](/docs/contributing/style-guide) to learn how to style content, add code snippets, import multimedia, and more. Doc body text content is written in GitHub-flavored Markdown, with some customizations.

### Step 3: Preview your changes

<Preview/>

### Step 4: Submit your request

<Submit/>

## Create a new doc

To submit more extensive edits, such as creating a new doc, we recommend forking our repo, making changes in a new branch, and submitting a PR for review.

Feel free to [reach out to the Sumo Logic Docs Team](#contact-us) to discuss. We're happy to work with you on the project and talk through rewriting content, changing flow, adding a new topic or section, and deprecating content.

### Step 1: Fork the Sumo Docs repository

<ForkRepo/>

### Step 2: Create a doc file

Our docs are GitHub-flavored Markdown files containing content like bulleted instructions, screenshots, tables, interactive code samples, and more.

1. Open your new branch in your IDE and go to the `/docs` folder.
1. Create a new Markdown file in the format `<your-file>.md` and save it to the appropriate subfolder. For example, if you're creating a new metrics doc, you'd save it to the `/docs/metrics` folder.
1. At the top of your file, add your frontmatter, which is the doc metadata. Follow the instructions under [Frontmatter](/docs/contributing/style-guide/#metadata-frontmatter), and see [Metadata descriptions](/docs/contributing/style-guide/#metadata-descriptions) for description length and formatting rules.

### Step 3: Write your doc

In your Integrated Development Environment (IDE), compose the body of your document in GitHub-flavored Markdown. Refer to our [style guide](/docs/contributing/style-guide) for instructions on crafting and styling content, including adding code snippets, importing multimedia, and more.

### Step 4: Add doc to the navigation menu

To add your new doc to the left-nav menu, you'll need to add its name and file path to the [`sidebars.ts` file](https://github.com/SumoLogic/sumologic-documentation/blob/main/sidebars.ts).

:::note Docs Team Support
The Docs Team can help you add your doc to the sidebar and top navigation. If you have suggestions, include those in your PR description. If you add the documentation to the sidebar, the team will review the location and names for building and placement in navigation.
:::

### Step 5: Add doc to the hub page

Hub pages are section `/index` pages that display the docs in that section as a grid of cards. Some sections order cards alphabetically; others lead with the most important docs.

Open the section's `index.md` and add a card for your doc: copy an existing `<div className="box smallbox card">` block inside the page's `<div className="box-wrapper">`, then update the link, icon, title, and description. Match the existing card order.<br/><img src={useBaseUrl('img/contributing/hub-card-style.png')} alt="Hub card style" /><br/>See [Hub pages](/docs/contributing/style-guide/#hub-pages) in the style guide for the full card markup.

### Step 6: Create CID URL

We assign each document a permanent URL with a content ID (CID) number, which performs a 301 redirect to the canonical URL. This means future changes to the canonical URL, such as a product name change, won't break **Learn More** links or require code changes to the user interface.

This URL is then placed in the UI in the appropriate place. For example, `cid=0071` links to a metrics page, which appears in the product in the **Metrics** section as a help link.

To create a CID:
1. In a GitHub authoring tool like VS Code, open our [cid-redirects.json file](https://github.com/SumoLogic/sumologic-documentation/blob/main/cid-redirects.json), which contains all 301 redirects.
1. Scroll down to the CIDs section, where the line items start with `"/cid/"`.
1. Find an unused CID number, then associate that CID value to your doc's file path. For example, if `5122` is unused, and your file path is `/docs/metrics/chart`:
  ```json title="Example" {2}
  "/cid/5120": "/docs/metrics",
  "/cid/5121": "/docs/metrics/introduction",
  "/cid/5122": "/docs/metrics/chart",
  ```


### Step 7: Preview your changes

import Preview from '../reuse/contributing/preview.md';

<Preview/>


### Step 8: Submit your request

import Submit from '../reuse/contributing/submit.md';

<Submit/>


## What happens next?

The Docs Team will review contributions, provide feedback, and merge approved changes to staging. They'll handle production updates separately.

## Contact us

Need to get in touch? You can find us at:
* [Sumo Logic Support](https://support.sumologic.com/support/s)
* [Sumo Logic Community](https://sumologic.my.site.com/support/s/)
