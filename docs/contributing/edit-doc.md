---
id: edit-doc
title: Edit an Existing Sumo Doc
sidebar_label: Edit a Doc
description: Learn how to edit a doc, write content in markdown, and submit your changes to our repo.
---

Here's a high-level overview of how to edit an existing Sumo Logic doc.

{@import ../reuse/doc-prerequisites.md}


## Minor edits

To submit a bug fix or another minor edit:

1. Scroll to the bottom of that doc and click the **Edit this page** link. This will open your selected doc in **Edit file** mode on our GitHub repo website.
1. Apply your edits to the file.
1. Click **Commit changes**.
1. In the **Propose changes** dialog, enter a description of your change, enter a new name for your branch if desired, and click **Propose Change**.

This will fork and submit changes to the Docs Team for review.


## Major edits

If you'd like to submit more extensive edits, we recommend forking our repo, making changes in a new branch, and submitting a PR for review.

Feel free to reach out to the Docs Team to discuss. We're happy to work with you on the project and talk through rewriting content, changing flow, adding a new topic or section, and deprecating content.

### Step 1: Fork the repository

1. [Fork](https://help.github.com/articles/fork-a-repo/) the [Sumo Docs repository](https://github.com/SumoLogic/sumologic-documentation). Remember to [sync your fork](https://help.github.com/articles/syncing-a-fork/) and update branches as needed.
1. Review our [README](https://github.com/SumoLogic/sumologic-documentation#readme) documentation guidelines.
1. Create a new branch from your forked repo using a name that best describes the work or references a GitHub issue number. For example: `<your initials>-apps-gitlab`.

### Step 2: Edit your doc

In your new branch, edit the doc markdown file. See our [Style Guide](/docs/contributing/style-guide) to learn how to style content, add code snippets, import multimedia, and more. Doc body text content is written in GitHub-flavored markdown, with some customizations.

:::tip Recommended authoring tools

<details><summary>If you're new to GitHub and/or writing Markdown, we recommend using the following apps (click to expand):</summary>

<!-- Removed Atom because it is no longer available:
* [Atom](https://atom.io): Create new branches, stage and commit, push and pull, resolve merge conflicts, view PRs and more - all from within your editor. The GitHub package comes bundled with Atom.-->
* [GitHub Desktop](https://desktop.github.com/): Easy-to-use interface to update your local machine clone, create branches, push to GitHub, and more.
* [VS Code](https://code.visualstudio.com/): Development application to open the repo, edit and create files, and preview pages as you write. We recommend the following extensions:
   * Markdown All in One
   * Markdown Preview GitHub Styling
   * Markdown Preview Enhanced
   * Markdown Preview Mermaid Support and Mermaid Markdown Syntax Highlighting for charts and graphs
* [iTerm2](https://iterm2.com/) - Terminal application for macOS. You can also install [Oh My Zsh](https://ohmyz.sh/) for theming.

</details>
:::

### Step 3: Preview your changes

Next, you'll build and deploy a local instance of the Sumo Logic Docusaurus site.

Our site is built using Docusaurus, a static site generator, which builds your site as simple static HTML, JavaScript, and CSS files. To view our install installment requirements and preview your build, see [Building Locally](https://github.com/SumoLogic/sumologic-documentation#building-locally) in our README.

We use Yarn for all installs and builds. Never use NPM commands for installing or updating packages.

### Step 4: Submit your request

1. Commit your changes to the branch with a meaningful message.<br/>![pull request](/img/contributing/commit.png) Use descriptive commit messages (and issue or ticket numbers, if applicable) detailing the content updates you are entering for content. One-line messages are fine for small changes, but bigger changes should look like this:
  ```bash
  $ git commit -m "A brief summary of the commit
  >
  > A paragraph describing what changed and its impact."
  ```
1. Set permissions to allow maintainers to edit and update the PR ([learn more](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork)).
1. Push your branch to the forked repo.
1. Visit [GitHub](https://github.com/SumoLogic/sumologic-documentation) after pushing your branch. If you see an option to **Compare & pull request** for your branch, click this.<br/>![compare](/img/contributing/compare-pr.png)
   * If you don't see it, create a new [PR](https://github.com/SumoLogic/sumologic-documentation/compare).
      1. Select `main` for the base branch. This is the branch all staging and production content builds from.
      1. Select your branch for the **compare**.
      1. Click **Create Pull Request**.
1. On the Pull Request page, enter the following:
   * Make sure the **base** branch is `main` and **compare** branch is the one you pushed.
   * Enter a title for the PR.
   * If applicable, add issue number from Jira or similar program.
   * Describe your updates.
   * Apply a [label](https://github.com/SumoLogic/sumologic-documentation/wiki#github-labels) that best describes your contribution.
1. [Optional]: For urgent, high-priority PRs (for example, doc edits tied to a GA release happening within 24 hours):
   1. Add the GA release date to the title. For example, `AWS Integration release (GA: Jan 1, 2023)`.
   1. From the labels list, select the `hot🔥` label, signifying it's an extremely urgent PR.
   1. For internal Sumos only: after completion of all GitHub checks, send your PR link to the `#doc-int` and `#open-source` Slack channels for review.
1. Click **Create pull request**.<br/> ![pull request](/img/contributing/pull-request.png)
1. First-time contributors will be prompted in a comment to sign our Contributor License Agreement. We allow individual contributions and contributions made on behalf of companies.<br/> ![CLA bot](/img/contributing/clabot.png)


## What happens next?

Docs Team members will review contributions, provide feedback, and approve. When approved, the Docs Team will merge and update staging. Updates to production will be handled by the Docs Team.


<!--
#### Pull Request Submission Guidelines

We currently cut branches from <code>main</code> for accepting documentation. As our processes refine and work expands, we may use the [Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) for development content.

As PRs are merged to the main branch by the Sumo Logic Docs Team, the content builds and deploys to a staging site. This can be reviewed and tested thoroughly on a server, rather than a local.

When all content is tested and ready for live, a Sumo Logic Docs Team member can tag a release to build and deploy to Production. This site is live to the world to search, use, and read to learn Sumo Logic.
-->
