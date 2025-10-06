---
id: create-edit-doc
title: Create or Edit a Doc
description: Learn how to create or edit a doc, write content in markdown, and submit your changes to our GitHub repository.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Iframe from 'react-iframe';

Discovered an error in a document? Learn how to submit a fix, along with a comprehensive guide on creating or editing a Sumo Logic document.

## Prerequisites

import DocPrereq from '../reuse/doc-prerequisites.md';

<DocPrereq/>


## Quickstart

### Submit a GitHub Issue

Short on time? You can report a bug or request more information by [submitting a GitHub Issue](https://github.com/SumoLogic/sumologic-documentation/issues/new/choose) to our repository. Enter as much information as you can, including content corrections, steps to reproduce, command/code updates, clarifying questions, and recommended fixes.

Before submitting an issue, you can browse our [existing GitHub issues](https://github.com/SumoLogic/sumologic-documentation/issues) to see if someone has already reported it, and join the discussion via comments.

### Submit a minor fix

Submitting a minor fix, such as correcting a typo, is very easy and can be done quickly without having to clone or fork your GitHub repository locally. Check out the instructions below.

:::sumo Micro Lesson
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

:::


## Edit a doc

### Step 1: Fork the Sumo Docs repository

1. Fork the [Sumo Docs repository](https://github.com/SumoLogic/sumologic-documentation) locally. Remember to sync your fork and update branches as needed.
   :::tip GitHub tips
   * [How to fork a repo](https://help.github.com/articles/fork-a-repo/)
   * [How to sync your fork with branches](https://help.github.com/articles/syncing-a-fork/)
   :::
1. Review our [README](https://github.com/SumoLogic/sumologic-documentation#readme) documentation guidelines.
1. Create a new branch from your forked repo using a name that best describes the work or references a GitHub issue number. For example, if you wanted to submit a PR to edit our Elasticsearch app doc, you'd write something like: `<your initials>-apps-elasticsearch`.

import Tools from '../reuse/contributing/tools.md';

<Tools/>

### Step 2: Edit your doc

In your new branch, edit the doc markdown file. See our [Style Guide](/docs/contributing/style-guide) to learn how to style content, add code snippets, import multimedia, and more. Doc body text content is written in GitHub-flavored markdown, with some customizations.

### Step 3: Preview your changes

<Preview/>

### Step 4: Submit your request

<Submit/>

## Create a new doc

To submit more extensive edits, such as creating a new doc, we recommend forking our repo, making changes in a new branch, and submitting a PR for review.

Feel free to [reach out to the Docs Team](#contact-us) to discuss. We're happy to work with you on the project and talk through rewriting content, changing flow, adding a new topic or section, and deprecating content.

### Step 1: Fork the Sumo Docs repository

import ForkRepo from '../reuse/contributing/fork-repo.md';

<ForkRepo/>

<Tools/>

### Step 2: Create a doc file

Our docs are GitHub-flavored markdown files containing content like bulleted instructions, screenshots, tables, interactive code samples, and more.

1. Open your new branch in your IDE and go to the `/docs` folder.
1. Create a new markdown file in the format `<your-file>.md` and save it to the appropriate subfolder. For example, if you're creating a new metrics doc, you'd save it to the `/docs/metrics` folder.
1. At the top of your file, add your frontmatter, which is the doc metadata. Follow the instructions under [Frontmatter](/docs/contributing/style-guide/#metadata-frontmatter).


### Step 3: Write your doc

In your Integrated Development Environment (IDE), compose the body of your document.

Refer to our [Style Guide](/docs/contributing/style-guide) for instructions on crafting and styling content, including adding code snippets, importing multimedia, and more. The body text of your document is written in GitHub-flavored markdown, with some customizations.

### Step 4: Add doc to the navigation menu

To add your new doc to the left-nav menu, you'll need to add its name and file path to the [`sidebars.ts` file](https://github.com/SumoLogic/sumologic-documentation/blob/main/sidebars.ts).

:::note Doc Team Support
The Sumo Logic Doc Team can help you add your doc to the sidebar and top navigation. If you have suggestions, include those in your Pull Request description. If you add the documentation to the sidebar, the team will review the location and names for building and placement in navigation.
:::

### Step 5: Add doc to the hub page

Hub pages are `/index` pages that display all docs in that section in card view. Some cards are sorted by alphabetical order, and some are sorted by importance and/or ranking.

As an example, let's say you needed to add a Best Practices doc to the [**Send Data** hub page](/docs/send-data).<br/><img src={useBaseUrl('img/contributing/hub-card-style.png')} alt="icon" />

Once you decide on placement, use the card HTML code in that doc to create a new entry.

### Step 6: Create CID URL

We often encounter changes in links, so we assign each document a permanent URL, which includes a Content ID (CID) number. This permanent URL performs a 301 redirect to the canonical URL. This approach ensures that future modifications to the canonical URL, such as product name changes, do not affect the 'Learn More' links for users. Additionally, it reduces the need for code changes to the user interface, offering greater flexibility for making quick updates.

This URL is then placed in the UI in the appropriate place. For example, `cid=0071` links to a metrics page, which appears in the product in the **Metrics** section as a help link.

To create a CID:
1. In your GitHub authoring tool (like Atom or VS Code), open our [cid-redirects.json file](https://github.com/SumoLogic/sumologic-documentation/blob/main/cid-redirects.json), which contains all 301 redirects.
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

Docs Team members will review contributions, provide feedback, and approve. When approved, the Docs Team will merge and update staging. Updates to production will be handled by the Docs Team.

## Contact us

Need to get in touch? You can find us at:
* [Sumo Logic Support](https://support.sumologic.com/support/s)
* [Sumo Logic Community](https://sumologic.my.site.com/support/s/)
* [Sumo Dojo Slack](https://sumodojo.slack.com)


<!--
#### Pull Request Submission Guidelines

We currently cut branches from <code>main</code> for accepting documentation. As our processes refine and work expands, we may use the [Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) for development content.

As PRs are merged to the main branch by the Sumo Logic Docs Team, the content builds and deploys to a staging site. This can be reviewed and tested thoroughly on a server, rather than a local.

When all content is tested and ready for live, a Sumo Logic Docs Team member can tag a release to build and deploy to Production. This site is live to the world to search, use, and read to learn Sumo Logic.
-->
