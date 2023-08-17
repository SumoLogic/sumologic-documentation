---
id: create-doc
title: Create and Publish a Sumo Doc
sidebar_label: Create a New Doc
description: Learn how to create a doc, write content in markdown, and submit your changes to our repo.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Here's a high-level overview of how to create a new Sumo Logic doc.

{@import ../reuse/doc-prerequisites.md}


## Step 1: Fork the Sumo Docs repository

To create new doc, we recommend forking our repo, making changes in a new branch, and submitting a PR for review.

Feel free to reach out to the Docs Team to discuss. We're happy to work with you on the project and talk through rewriting content, changing flow, adding a new topic or section, and deprecating content.

1. [Fork](https://help.github.com/articles/fork-a-repo/) the [Sumo Docs repository](https://github.com/SumoLogic/sumologic-documentation). Remember to [sync your fork](https://help.github.com/articles/syncing-a-fork/) and update branches as needed.
1. Review our [README](https://github.com/SumoLogic/sumologic-documentation#readme) documentation guidelines.
1. Create a new branch from your forked repo using a name that best describes the work or references a GitHub issue number. For example: `<your initials>-apps-gitlab`.

## Step 2: Create a doc file

The docs site is comprised of GitHub-flavored markdown files containing content like bulleted instructions, screenshots, tables, interactive code samples, and more.

1. Open your new branch in your IDE and go to the `/docs` folder.
1. In the appropriate subfolder (e.g., `/docs/metrics`), create a markdown file in the format `<your-file>.md`.

## Step 3: Add doc title and metadata

See [Frontmatter](/docs/contributing/style-guide/#metadata-frontmatter) to learn how.


## Step 4: Write your doc

In your IDE, write the body of your doc.
* See our [Style Guide](/docs/contributing/style-guide) to learn how to write and style content, add code snippets, import multimedia, and more. Doc body text content is written in GitHub-flavored markdown, with some customizations.
* See our recommended authoring tools.

:::tip Recommended authoring tools

<details><summary>If you're new to GitHub and/or writing Markdown, we recommend using the following apps (click to expand):</summary>

* [VS Code](https://code.visualstudio.com/): Development application to open the repo, edit and create files, and preview pages as you write. We recommend the following extensions:
   * Markdown All in One
   * Markdown Preview GitHub Styling
   * Markdown Preview Enhanced
   * Markdown Preview Mermaid Support and Mermaid Markdown Syntax Highlighting for charts and graphs
* [GitHub Desktop](https://desktop.github.com/): Easy-to-use interface to update your local machine clone, create branches, push to GitHub, and more.
* [iTerm2](https://iterm2.com/) - Terminal application for macOS. You can also install [Oh My Zsh](https://ohmyz.sh/) for theming.

</details>
:::

## Step 5: Add doc to the navigation menu

To add your new doc to the left-nav menu, you'll need to add its name and file path to the [`sidebars.ts` file](https://github.com/SumoLogic/sumologic-documentation/blob/main/sidebars.ts).

:::note Doc Team Support
The Sumo Logic Doc Team can help you add your doc to the sidebar and top navigation. If you have suggestions, include those in your Pull Request description. If you add the documentation to the sidebar, the team will review the location and names for building and placement in navigation.
:::

## Step 6: Add doc to the hub page

Hub pages are `/index` pages that display all docs in that section in card view. Some cards are sorted by alphabetical order, and some are sorted by importance and/or ranking.

As an example, let's say you needed to add a Best Practices doc to the [**Send Data** hub page](/docs/send-data).<br/><img src={useBaseUrl('img/contributing/hub-card-style.png')} alt="icon" />

Once you decide on placement, use the card HTML code in that doc to create a new entry.

## Step 7: Create CID

Every doc must be associated with a Content ID (CID) number, which is appended to a permalink URL that's placed in the UI in the appropriate place. This way, any future changes to the canonical URL won't impact the UI links.

For example, [https://help.sumologic.com/?cid=0071](https://help.sumologic.com/?cid=0071) links to a metrics page, which appears in the **Metrics** UI section.

To create a CID:

1. Open the [cid-redirects.json](https://github.com/SumoLogic/sumologic-documentation/blob/main/cid-redirects.json) file.
1. 

## Step 8: Preview your changes

Next, you'll build and deploy a local instance of the Sumo Logic Docusaurus site.

Our site is built using Docusaurus, a static site generator, which builds your site as simple static HTML, JavaScript, and CSS files. To view our install installment requirements and preview your build, see [Building Locally](https://github.com/SumoLogic/sumologic-documentation#building-locally) in our README.

We use Yarn for all installs and builds. Never use NPM commands for installing or updating packages.

## Step 9: Submit your request

1. Commit your changes to the branch with a meaningful message.<br/>![pull request](/img/contributing/commit.png) Use descriptive commit messages (and issue or ticket numbers, if applicable) detailing the content updates you are entering for content. One-line messages are fine for small changes, but bigger changes should look like this:
  ```bash
  $ git commit -m "A brief summary of the commit
  >
  > A paragraph describing what changed and its impact."
  ```
1. Set permissions to allow maintainers to edit and update the PR ([learn more](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork)).
1. Push your branch to the forked repo.
1. Visit [our repo](https://github.com/SumoLogic/sumologic-documentation) after pushing your branch. If you see an option to **Compare & pull request** for your branch, click this.<br/>![compare](/img/contributing/compare-pr.png)
   * If you don't see it, create a new [PR](https://github.com/SumoLogic/sumologic-documentation/compare).
      1. Select `main` for the base branch. This is the branch all staging and production content builds from.
      1. Select your branch for the **compare**.
      1. Click **Create pull request**.
1. On the Pull Request page, enter the following:
   * Make sure **base** branch is `main` and **compare** branch is the one you pushed.
   * Enter a title for the PR.
   * Include an issue number from GitHub or Jira, etc.
   * Describe what changed, new pages, updates.
   * Apply a [label](https://github.com/SumoLogic/sumologic-documentation/wiki#github-labels) that best describes your contribution.
1. [Optional]: For urgent, high-priority PRs (for example, doc edits tied to a GA release happening within 24 hours):
   1. Add the GA release date to the title. For example, `AWS Integration release (GA: Jan 1, 2023)`.
   1. From the labels list, select the `hot🔥` label, signifying it's an extremely urgent PR.
   1. For internal Sumos only: after completion of all GitHub checks, send your PR link to the `#doc-int` and `#open-source` Slack channels for review.
1. Click **Create pull request**.<br/> ![pull request](/img/contributing/pull-request.png)
1. First-time contributors will be prompted in a comment to sign our Contributor License Agreement. We allow individual contributions and contributions made on behalf of companies.<br/> ![CLA bot](/img/contributing/clabot.png)

## What happens next?

Docs Team members will review contributions, provide feedback, and approve. When approved, the Docs Team will merge and update staging. Updates to production will be handled by the Docs Team.
