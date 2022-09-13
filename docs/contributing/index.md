---
slug: /contributing
title: Contributing to Sumo
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/documentation.png')} alt="icon" width="75"/>

:::caution

&#128679; Under construction &#128679;
:::

Thank you for your interest in contributing to Sumo Logic documentation! We welcome all contributions, from minor typo fixes to new topics and tutorials. Your expertise and sharing helps fellow users learn and expand their knowledge of Sumo Logic. Sumo Logic Documentation is an Open Source project available as a [GitHub repository](https://github.com/SumoLogic/sumologic-documentation). This section will grow as we answer questions and provide support for submissions and new content.

The docs in this section provide information on creating files, writing in markdown, using our templates, submitting pull requests and more.

For a complete guide to contributing, creating branches, using Markdown, and more, check out our [GitHub repo](https://github.com/SumoLogic/sumologic-documentation) and [repo Wiki](https://github.com/SumoLogic/sumologic-documentation/wiki).


## Before You Begin

* You must have a [GitHub account](https://github.com/signup/free) to contribute to Sumo Logic documentation
* We recommend adding [2FA protection](https://devdocs.magento.com/contributor-guide/contributing.html#two-factor) when contributing to Sumo Logic repositories.


## Ways to Contribute

There are many ways that you can contribute to Sumo Docs, beyond writing code. This provides a high-level overview of how you can get involved.

* For minor changes like a typo, bug, or code snippet edit, you could use the [Edit Page button](#edit-page-directly) or [submit an issue](#submit-issue-or-bug).
* For more extensive contributions, you can [clone the repo files](#clone-our-repository) to your local machine, make changes in a branch, and push a pull request for review and merging to the site.
  * **New content** of tutorials and sample code can be discussed with the documentation team in Discord and through submitted issues. We can work with you on the project.
  * **Updates** that you wish to contribute can be discussed with the documentation team in Slack, through submitted issues, and in pull requests. These include rewriting content, changing flow, adding a new topic or section, and deprecating content.

### Submit Issue or Bug

If you find a bug in documentation or site tools, or want to request more information, you can help us by [submitting an issue](https://github.com/SumoLogic/sumologic-documentation/issues/new/choose) to our GitHub Repository. You can enter an issue through GitHub or from any page on the documentation site. To share your knowledge, submit a Pull Request with a fix.

Enter as much information as you can, including content corrections, steps to reproduce, command or code updates, or questions for clarifications.

<!--To easily submit an issue for a specific page, click Report an issue (coming soon) on the documentation web page and include your feedback.-->

**Note:** Check the existing issues on GitHub to see if someone has already reported the issue.

### Submit Feature Request

You can request a new feature by [submitting a feature request](https://github.com/SumoLogic/sumologic-documentation/issues/new?assignees=&labels=type%3Afeature&template=feature_request.md&title=) to our GitHub Repository.

### Edit Page directly

While reviewing content on the site, you can click **Edit this page**, located at the bottom of each doc page, to directly update and submit changes through the GitHub repo website. This link will open the correct page to edit, including versioned content.

1. On a page where you find an error, click the Edit this page link found at the bottom.<br/><img src={useBaseUrl('img/contributing/editpage.png')} alt="editpage" width="175"/>
1. The markdown file opens in GitHub.
1. Make your edits to the file.
1. Scroll to the bottom and select Create a new branch... Enter a name for the branch and click Propose Change.


### Clone Sumo Docs Repository

Another option is to clone the GitHub repository and edit locally. This is common for developers, working with GitHub tools, Git commands, and code editors like VSCode or Atom.


#### Fork and clone

1. [Fork](https://help.github.com/articles/fork-a-repo/) the [sumologic-documentation](https://github.com/SumoLogic/sumologic-documentation) repository. Remember to [sync your fork](https://help.github.com/articles/syncing-a-fork/) and update branches as needed.
1. Review documentation guidelines.

**Note:** If you use a fork instead of a branch, please set permissions to allow maintainers to edit and update the PR. See [Allowing changes to a pull request branch created from a fork](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) in the *GitHub documentation*.

#### Commit Message Guidelines

Use descriptive commit messages detailing the content updates you are entering for content. Mention issue or ticket numbers as relevant for work.

Always write a clear log message for your commits. One-line messages are fine for small changes, but bigger changes should look like this:

```bash
$ git commit -m "A brief summary of the commit
>
> A paragraph describing what changed and its impact."
```

For example:
```bash
$ git commit -m "Updating query for metrics"
```

#### Create a branch

1. Create a new branch from your cloned repo/fork using a name that best describes the work or references a GitHub issue number. For example: `<your initials>-tracing-update` or `<your initials>-apps-gitlab`
1. Edit or create markdown (.md) files in your branch. See [Create a Document](create-document.md) and [Markdown Features](markdown-features.md) for more info.

#### Push your changes

1. Commit your changes to the branch with a meaningful message.<br/>![pull request](/img/contributing/commit.png)
1. Push your branch to the repo/fork.

#### Create a pull request

1. Visit [GitHub](https://github.com/SumoLogic/sumologic-documentation) after pushing your branch. If you see an option to **Compare & Pull Request** for your branch click this.<br/>![compare](/img/contributing/compare-pr.png)
   * If you don't see it, create a new [pull request](https://github.com/SumoLogic/sumologic-documentation/compare).
      1. Select `main` for the base branch. This is the branch all staging and production content builds from).
      1. Select your branch for the **compare**.
      1. Click **Create Pull Request**.
1. On the Pull Request page, enter the following:
   * Make sure **base** branch is `main` and **compare** branch is the one you pushed.
   * Enter a title for the PR.
   * Include an issue number from GitHub or Jira, etc.
   * Describe what changed, new pages, updates.
   * Apply a label that best describes your contribution.

   <details><summary>Our GitHub Labels (click to expand)</summary>

   The [labels](https://github.com/SumoLogic/sumologic-documentation/labels) we use for issues and pull requests include the following:

   | Label | Issues/PR | Description |
   | -- |-- | -- |
   | `doc:minor edit` | both | Small updates for typos, fixes for styles/formats, link fixes, etc. |
   | `doc:new` | both | A new topic or topic section, typically requires deeper tech and writer reviews. |
   | `doc:site tech` | both | Updates, maintenance, and new additions to site code. Includes plugins, CSS, templates, etc. |
   | `doc:update` | both | An update to an existing document/topic. This includes revised content, instructions, screenshots, etc. |
   | `status:backlog` | both | Work will be completed at a later time, added to backlog items. |
   | `status:committed` | both | Work is committed and is planned or in-progress. |
   | `status:duplicate` | both | The issue/PR is a duplicate of other work. A link to the new item will be added when closing as a dupe. |
   | `status:in review` | PR | Work is incomplete and ready/in review. Developers and writers are actively reviewing content. |
   | `status:invalid` | both | The issue or report is not valid. A reason should be provided when closing. |
   | `status:wontfix` | both | The request or issue will not be worked on. A reason should be provided when closing. |
   | `type:bug` | issues | Problem in a documentation page or site code. |
   | `type:feature` | issues | New feature, option, site format, etc. |
   | `type:feedback` | issues | Feedback entered for a page or through the website when clicking report an issue. |

   </details>

1. Click **Create Pull Request**.<br/> ![pull request](/img/contributing/pull-request.png)
1. Sign our Contributor License Agreement (built using [cla-bot](https://colineberhardt.github.io/cla-bot/)). We allow  individual contributions and contributions made on behalf of companies. If you have any questions, please [submit an issue](https://github.com/SumoLogic/sumologic-documentation/issues).

Doc team members will review contributions, provide feedback, and approve. When approved, the Doc team will merge and update staging. Updates to production will be handled by the Doc team.

#### Pull Request Submission Guidelines

We currently cut branches from **main branch** for accepting documentation. As our processes refine and work expands, we may use the [Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) for development content.

As Pull Requests (PRs) are merged to the main branch by the Sumo Logic Doc team, the content builds and deploys to a staging site. This can be reviewed and tested thoroughly on a server, rather than a local.

When all content is tested and ready for live, a Sumo Logic Doc team member can tag a release to build and deploy to Production. This site is live to the world to search, use, and read to learn Sumo Logic.


## Recommended Applications

If you're new to GitHub and writing [Markdown](https://daringfireball.net/projects/markdown/syntax) documentation, we recommend using the following applications:

* [GitHub Desktop](https://desktop.github.com/) - Easy to use interface to update your local machine clone, create branches, push to GitHub and more.
* [VS Code](https://code.visualstudio.com/) - Development application to open the repo, edit and create files, and preview pages as you write. We recommend the following extensions:

  * Markdown All in One
  * Markdown Preview GitHub Styling
  * Markdown Preview Enhanced
  * Markdown Preview Mermaid and Mermaid Markdown Syntax Highlighting for charts and graphs

* [iTerm2](https://iterm2.com/) - Terminal application for MacOS. You can also install [Oh My Zsh](https://ohmyz.sh/) for theming.


## Contact us!

Need to get in touch? Find us on [Sumo Dojo Slack](https://sumodojo.slack.com).
