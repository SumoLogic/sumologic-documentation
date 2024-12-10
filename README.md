<img src="https://help.sumologic.com/img/sumo-docs-readme.png" width="400"/>

<p>
  <a href="https://github.com/SumoLogic/sumologic-documentation/blob/main/.github/workflows/production.yml"><img src="https://github.com/SumoLogic/sumologic-documentation/actions/workflows/production.yml/badge.svg" alt="GitHub Actions status"></a>
  <a href="https://help.sumologic.com/docs/contributing"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/sourcerer-io/hall-of-fame.svg?colorB=ff0000"></a>
  <a href="https://x.com/SumoLogic"><img src="https://img.shields.io/twitter/follow/sumologic.svg?style=social" alt="Twitter Follow" /></a>
  <a href="https://help.sumologic.com/release-notes-service"><img src="https://img.shields.io/badge/RSS-FFA500?style=for-the-badge&logo=rss&logoColor=white" alt="RSS Follow" width="50"/></a>
</p>

Sumo Docs is the open-source documentation site for Sumo Logic, an all-in-one cloud data analytics platform built to support security, operations, and business intelligence use cases. Sumo Logic empowers users to monitor, analyze, troubleshoot, and visualize data from their applications and network environments in real time. Its elastic processing capabilities enable seamless log data collection and management from various sources, regardless of type, volume, or location. Learn more at [sumologic.com](https://www.sumologic.com).

## Get involved

We welcome contributions from the community! Whether it's fixing a typo, adding new content, or proposing improvements, your input helps users make the most of Sumo Logic. You can contribute by creating an issue or submitting a pull request in our GitHub repository.

Here’s how to get started:
- Fork our repo and create a new branch for your content changes.
- Preview your edits by building the site locally.
- Submit a pull request for review.

Our team will help review, test, and merge your contributions for publishing.

Sumo Docs is built with [Docusaurus 3](https://docusaurus.io/) and supports React, Rehype, and Remark plugins. We also use [cla-bot](https://colineberhardt.github.io/cla-bot/) to manage our Contributor License Agreement (CLA) process.

Before submitting an issue or pull request, please review the sections below.

## Table of contents

- [Get involved](#get-involved)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Contributing content](#contributing-content)
- [Building locally](#building-locally)
- [Publishing content](#publishing-content)

## Prerequisites

To contribute to Sumo Docs, ensure you have the following tools installed:

- [Node.js](https://nodejs.org/en/download/) version 18 or higher
- [Yarn](https://yarnpkg.com/en/), installable via [Homebrew](https://brew.sh/) (`brew install yarn`)

## Installation

1. Fork and clone the repository using Git or a tool like GitHub Desktop.
2. Navigate to the cloned repository folder:
   ```bash
   cd sumologic-documentation
   ```
3. Install dependencies:
   ```bash
   yarn install
   ```

## Apply your changes

Make edits using [Markdown syntax](https://help.sumologic.com/docs/contributing/style-guide/#markdown). Keep contributions concise, informative, and aligned with our guidelines.

Refer to our [Contributor Guidelines](https://help.sumologic.com/docs/contributing/create-edit-doc/#edit-a-doc) for more information on:
- Markdown editing
- Proposing bug fixes
- Testing your changes

All contributions must follow our [Style Guide](https://help.sumologic.com/docs/contributing/style-guide/).

## Building locally

Building the site locally ensures your changes are accurate and functional before submission.

1. Serve and preview your content with hot reloads:
   ```bash
   yarn start
   ```
   Any issues, such as broken links or images, will be listed. Fix them, rebuild, and verify your changes.

2. Build the site and test locally:
   ```bash
   yarn build
   ```
   The static files will be generated in the `build` folder and served at `http://localhost:3000/`.

To stop the local server or build process, press `Ctrl + C`. You can rebuild and restart as needed.

## Publishing content

Our documentation team regularly reviews issues and pull requests. While we strive to address contributions promptly, there may be delays as we work through the backlog. Your patience is appreciated.
