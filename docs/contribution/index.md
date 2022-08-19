---
slug: /contribution
title: Contributing to Sumo
---

Thank you for your interest in contributing to Sumo Logic documentation! We welcome contributions for updates, new documentation, tutorials, and more for the Sumo Logic Documentation site.

This guide provides information on our markdown, creating files, adding them to the navigation sidebar, templates, and more.

Additional content will be added as needed. You can also learn more in our [GitHub repo](https://github.com/SumoLogic/sumologic-documentation). For a complete guide to contributing, creating branches, using Markdown, and more, check out our [repo Wiki](https://github.com/SumoLogic/sumologic-documentation/wiki).


## Contributor License Agreements

When you submit a pull request, you'll be asked to sign our Contributor License Agreement. We allow both individual contributions and contributions made on behalf of companies. We use an open source tool called [cla-bot](https://colineberhardt.github.io/cla-bot/). If you have any questions about our CLA, please [submit an issue](https://github.com/SumoLogic/sumologic-documentation/issues).


## Code of Conduct

Help us keep Sumo Logic open and inclusive. Read and follow our [Code of Conduct](/docs/contribution/code-of-conduct).


## Ways to Contribute

There are many ways in which you can contribute to content:

* **Submit Issues and Bugs**: If you find a bug in documentation or site tools, you can help us by [submitting an issue](https://github.com/SumoLogic/sumologic-documentation/issues/new?assignees=&labels=type%3Abug&template=bug_report.md&title=) to our GitHub Repository. You can enter an issue through GitHub or from any page on the documentation site. To share your knowledge, submit a Pull Request with a fix.
* **Feature Requests**: You can request a new feature by [submitting a feature request](https://github.com/SumoLogic/sumologic-documentation/issues/new?assignees=&labels=type%3Afeature&template=feature_request.md&title=) to our GitHub Repository.
* **Edit Pages**: As you review content on the site, you can click *Edit this page* to commit changes through GitHub directly.

If you'd like to implement a new section or tutorial, then consider what kind of change it is:

* **New content** of tutorials and sample code can be discussed with the documentation team in Discord and through submitted issues. We can work with you on the project.
* **Updates** that you wish to contribute can be discussed with the documentation team in Slack, through submitted issues, and in pull requests. These include rewriting content, changing flow, adding a new topic or section, and deprecating content.
* **Minor changes** can be directly submitted to the GitHub Repository as a Pull Request. These include typos, updated code samples, troubleshooting, added guide steps, terms, and more. See the section about [Pull Request Submission Guidelines](#pull-request-submission-guidelines).

## Open Source Content

Sumo Logic Documentation is an Open Source project available as a GitHub repository: https://github.com/SumoLogic/sumologic-documentation. You can clone the files to your local machine, make changes in a branch, and push a pull request for review and merging to the site. Or click **Edit this Page**, located at the bottom of all pages, to directly update and submit changes through the GitHub repo website.

:::caution GitHub Account
You must have a [GitHub account](https://github.com/signup/free) to contribute to documentation. All Sumo Logic employees and GitHub members can submit changes as needed. All other users can contribute and accept a Contributor License Agreement (CLA) for PR review and approval.
:::

## Clone the Repository

Another option is to clone the GitHub repository and edit locally. This is common for developers, working with GitHub tools, Git commands, and code editors like VSCode or Atom.

### Fork and clone

:::sumo Working with Github during ALPHA
Fork will be for the future and Third Parties. For now, clone and branch to work.
:::

1. [Fork](https://help.github.com/articles/fork-a-repo/) the [sumologic-documentation](https://github.com/SumoLogic/sumologic-documentation) repository. Remember to [sync your fork](https://help.github.com/articles/syncing-a-fork/) and update branches as needed.
1. Review documentation guidelines.

### Create and push a branch

1. Create a new branch from your cloned repo/fork using a name that best describes the work or references a GitHub issue number. For example: lk-tracing-update or lk-apps-gitlab
1. Edit or create markdown (.md) files in your branch. See [Create a Document](create-document.md) and [Markdown Features](markdown-features.md) for more info.
1. Commit your changes to the branch with a meaningful message.

  ![pull request](/img/contribution/commit.png)

1. Push your branch to the repo/fork.

### Create a pull request

Doc team members will review and approve your contributions using GitHub.

1. Visit [GitHub](https://github.com/SumoLogic/sumologic-documentation) after pushing your branch. You may see an option to **Compare & Pull Request** for your branch.

    ![compare](/img/contribution/compare-pr.png)

    Otherwise, create a new [pull request](https://github.com/SumoLogic/sumologic-documentation/compare).

      1. Select `main` for the base branch. Select your branch for the **compare**.
      1. Click **Create Pull Request**.

1. On the Pull Request page, enter the following:

     * Make sure **base** branch is `main` and **compare** branch is the one you pushed.
     * Enter a title for the PR.
     * Include an issue number from GitHub or Jira, etc.
     * Describe what changed, new pages, updates.

1. Click **Create Pull Request**.

![pull request](/img/contribution/pull-request.png)

GitHub will generate a pull request for review. Doc team members will review, provide feedback, and approve. When approved, the Doc team will merge and update staging. Updates to production will be handled by the Doc team.

### Pull Request Submission Guidelines

We currently cut branches from **main branch** for accepting documentation. As our processes refine and work expands, we may use the [Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) for development content.

As Pull Requests (PR) are merged to the main branch by the Sumo Logic Doc team, the content builds and deploys to a staging site. This can be reviewed and tested thoroughly on a server, rather than a local.

When all content is tested and ready for live, a Sumo Logic Doc team member can tag a release to build and deploy to Production. This site is live to the world to search, use, and read to learn Sumo Logic.

### Commit Message Guidelines

Use descriptive commit messages detailing the content updates you are entering for content. Mention issue or ticket numbers as relevant for work.

Always write a clear log message for your commits. One-line messages are fine for small changes, but bigger changes should look like this:

```
$ git commit -m "A brief summary of the commit
>
> A paragraph describing what changed and its impact."
```

For example: `$ git commit -m "Updating query for metrics"`


## Recommended Applications

If new to GitHub and writing Markdown documentation, we recommend using the following applications:

* [GitHub Desktop](https://desktop.github.com/) - Easy to use interface to update your local machine clone, create branches, push to GitHub and more.
* [VS Code](https://code.visualstudio.com/) - Development application to open the repo, edit and create files, and preview pages as you write. We recommend the following extensions:

  * Markdown All in One
  * Markdown Preview GitHub Styling
  * Markdown Preview Enhanced
  * Markdown Preview Mermaid and Mermaid Markdwn Syntax Highlighting for charts and graphs

* [iTerm2](https://iterm2.com/) - Terminal application for MacOS. You can also install [Oh My Zsh](https://ohmyz.sh/) for theming.
