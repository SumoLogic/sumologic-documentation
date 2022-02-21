---
slug: /contribution
---

# Contributing to Sumo

We welcome contributions for updates, new documentation, tutorials, and more for the Sumo Logic Documentation site.

This guide provides information on our markdown, creating files, adding them to the navigation sidebar, templates, and more.

Additional content will be added as needed. You can also learn more in our GitHub [Wiki](https://github.com/SumoLogic/sumologic-documentation/wiki) and [Repository](https://github.com/SumoLogic/sumologic-documentation).

## Open Source Content

Sumo Logic Documentation is an Open Source project available as a GitHub repository: https://github.com/SumoLogic/sumologic-documentation. You can clone the files to your local machine, make changes in a branch, and push a pull request for review and merging to the site. Or click Edit this Page on any page to directly update and submit changes through the GitHub repo website.

:::note GitHub Account
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
1. Edit or create markdown (.md) files in your branch. See [Create a Document](create-a-document.md) and [Markdown Features](markdown-features.md) for more info.
1. Commit your changes to the branch with a meaningful message.

  ![pull request](/img/contribution/commit.png)

1. Push your branch to the repo/fork.

### Create a pull request

Doc team members will review and approve your contributions using GitHub.

1. Visit [GitHub](https://github.com/SumoLogic/sumologic-documentation) after pushing your branch. You may see an option to Compare and Create a Pull Request for your branch. Otherwise, create a new [pull request](https://github.com/SumoLogic/sumologic-documentation/compare).
1. Select `main` for the base branch. Select your branch for the compare.
1. Click **Create Pull Request**.
1. Enter the following:

     * Enter a title for the PR.
     * Include an issue number from GitHub or Jira, etc.
     * Describe what changed, new pages, updates.

1. Click Create Pull Request.

![pull request](/img/contribution/pull-request.png)

GitHub will generate a pull request for review. Doc team members will review, provide feedback, and approve. When approved, the Doc team will merge and update staging. Updates to production will be handled by the Doc team.

## Recommended applications

If new to GitHub and writing Markdown documentation, we recommend using the following applications:

* [GitHub Desktop](https://desktop.github.com/) - Easy to use interface to update your local machine clone, create branches, push to GitHub and more. 
* [VS Code](https://code.visualstudio.com/) - Development application to open the repo, edit and create files, and preview pages as you write. We recommend the following extensions:

  * Markdown All in One
  * Markdown Preview GitHub Styling
  * Markdown Preview Enhanced
  * Markdown Preview Mermaid and Mermaid Markdwn Syntax Highlighting for charts and graphs

* [iTerm2](https://iterm2.com/) - Terminal application for MacOS. You can also install [Oh My Zsh](https://ohmyz.sh/) for theming.