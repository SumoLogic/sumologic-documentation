<img src="https://www.sumologic.com/help/img/reuse/sumo-docs-readme.png" width="400"/>

[![Build](https://img.shields.io/github/actions/workflow/status/SumoLogic/sumologic-documentation/workflow_deploy-to-pantheon-prod.yml?style=flat&label=build)](https://github.com/SumoLogic/sumologic-documentation/actions/workflows/workflow_deploy-to-pantheon-prod.yml)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](https://www.sumologic.com/help/docs/contributing)
[![License](https://img.shields.io/github/license/sourcerer-io/hall-of-fame.svg?style=flat&colorB=ff0000)](LICENSE)
[![Follow @SumoLogic](https://img.shields.io/badge/Follow_@SumoLogic-000000?style=flat&logo=x&logoColor=white)](https://x.com/SumoLogic)
[![RSS](https://img.shields.io/badge/RSS-FFA500?style=flat&logo=rss&logoColor=white)](https://www.sumologic.com/help/release-notes-service)

[![Docusaurus](https://img.shields.io/badge/Docusaurus-1A6B3C?style=flat&logo=docusaurus&logoColor=white)](https://docusaurus.io)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white)](https://github.com/features/actions)
[![Algolia](https://img.shields.io/badge/Algolia-003DFF?style=flat&logo=algolia&logoColor=white)](https://www.algolia.com)
[![Pantheon](https://img.shields.io/badge/Pantheon-FFDC28?style=flat&logo=pantheon&logoColor=black)](https://pantheon.io)

This is the open-source repo for [Sumo Logic Documentation](https://www.sumologic.com/help), the official docs site for Sumo Logic's cloud data analytics platform. The site is built with [Docusaurus 3](https://docusaurus.io/) and supports React, Rehype, and Remark plugins.

## Table of contents

- [Get involved](#get-involved)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Apply your changes](#apply-your-changes)
- [Build locally](#build-locally)
- [Repo structure](#repo-structure)
- [For Docs Team contributors](#for-docs-team-contributors)
- [Publishing](#publishing)
- [License](#license)

## Get involved

We welcome contributions from the community. You can fix a typo, propose new content, or improve existing docs by [opening an issue](https://github.com/SumoLogic/sumologic-documentation/issues/new/choose) or submitting a pull request.

Browse [existing issues](https://github.com/SumoLogic/sumologic-documentation/issues) before opening a new one — someone may have already reported it.

We use [cla-bot](https://colineberhardt.github.io/cla-bot/) to manage our Contributor License Agreement (CLA) process. You will be prompted to sign the CLA on your first contribution.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) version 20 or higher
- [Yarn](https://yarnpkg.com/en/), installable via [Homebrew](https://brew.sh/) (`brew install yarn`)

## Installation

1. Fork and clone the repo.
1. Navigate to the repo folder:

   ```bash
   cd sumologic-documentation
   ```

1. Install dependencies:

   ```bash
   yarn install
   ```

## Apply your changes

Edit files using [Markdown syntax](https://www.sumologic.com/help/docs/contributing/style-guide/#markdown). Keep contributions concise, accurate, and aligned with our [Style Guide](https://www.sumologic.com/help/docs/contributing/style-guide/).

See our [Contributor Guidelines](https://www.sumologic.com/help/docs/contributing/create-edit-doc/#edit-a-doc) for details on Markdown editing, proposing bug fixes, and testing your changes.

## Build locally

Serve and preview your changes with hot reloads:

```bash
yarn start
```

Any broken links or images will be listed in the output. Fix them, rebuild, and verify before submitting. Press `Ctrl + C` to stop the local server.

## Repo structure

| Path | Contents |
|------|----------|
| `/docs` | Documentation source files |
| `/blog-service` | Service release notes |
| `/blog-collector` | Collector release notes |
| `/blog-cse` | Cloud SIEM release notes |
| `/blog-csoar` | Cloud SOAR release notes |
| `/static/img` | Images and media assets |
| `sidebars.ts` | Left-nav sidebar configuration |
| `docusaurus.config.ts` | Site configuration |
| `cid-redirects.json` | Permanent URL redirects (CID mappings) |

## For Docs Team contributors

This repo includes [Claude Code](https://claude.ai/code) tooling for the Docs Team — slash commands for creating docs, auditing content, managing Jira tickets, and more. See [CLAUDE.md](CLAUDE.md) for the full reference.

## Publishing

Our docs team reviews issues and pull requests regularly. We will help review, test, and merge your contributions for publishing. Response times may vary depending on the backlog.

## License

This project is licensed under the [Apache 2.0 License](LICENSE).
