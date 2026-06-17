# Sumo Docs

[![Deploy](https://img.shields.io/github/actions/workflow/status/SumoLogic/sumologic-documentation/workflow_deploy-to-pantheon-prod.yml?branch=main&style=flat&label=deploy)](https://github.com/SumoLogic/sumologic-documentation/actions/workflows/workflow_deploy-to-pantheon-prod.yml?query=branch%3Amain)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)](https://www.sumologic.com/help/docs/contributing)
[![License](https://img.shields.io/github/license/SumoLogic/sumologic-documentation?style=flat&colorB=ff0000)](LICENSE)
[![Docusaurus](https://img.shields.io/static/v1?label=&message=Docusaurus&color=3ECC5F&style=flat&logo=docusaurus&logoColor=white)](https://docusaurus.io)
[![Node.js >=20](https://img.shields.io/static/v1?label=Node.js&message=%3E%3D20&color=339933&style=flat&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Yarn v1](https://img.shields.io/static/v1?label=Yarn&message=v1&color=2C8EBB&style=flat&logo=yarn&logoColor=white)](https://yarnpkg.com)

Sumo Docs is the open-source documentation site for Sumo Logic, an AI-powered security operations platform providing Cloud SIEM and security analytics to help teams automate, detect, and investigate threats. Sumo Logic empowers users to monitor, troubleshoot, and defend their environments using AI insights powered by log analytics. Learn more at [sumologic.com](https://www.sumologic.com).

The site is built with [Docusaurus 3](https://docusaurus.io/) and supports React, Rehype, and Remark plugins.

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

Our docs team reviews issues and pull requests regularly. Response times may vary depending on the backlog.

Merge times depend on the type of change:

- **Content changes** (`docs/`, `blog-*`, `static/img`) — no hard merge window. We prefer U.S. or India business hours when possible.
- **Back-end changes** (`src/`, `sidebars.ts`, config files, `.github/`) — merged **Monday–Friday, 7:00am–2:00pm PT** only, when the WebOps team is available.

PRs that mix content and back-end files follow the back-end rules.

## License

This project is licensed under the [MIT License](LICENSE).
