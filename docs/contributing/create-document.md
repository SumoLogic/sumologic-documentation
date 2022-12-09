---
id: create-document
title: Create a Sumo Logic Document
sidebar_label: Create and Publish a Doc
description: Learn how to create a doc, write content in markdown, and submit your changes to our repo.
---

The Sumo Logic Docs site is comprised of GitHub-flavored markdown files containing content like bulleted instructions, screenshots, tables, interactive code samples, and more.

Here's a high level overview of how to create a doc.

## Step 1: Create a doc file

In the /docs folder, create a markdown file in the format `<your-file>.md`.

## Step 2: Add title and metadata

See our [Style Guide > Frontmatter section](/docs/contributing/style-guide#frontmatter) to learn how.

## Step 3: Write and edit your doc

:::note
Help us keep Sumo Logic open and inclusive by reviewing our [Code of Conduct](/docs/contributing/code-of-conduct).
:::

See our [Style Guide](/docs/contributing/style-guide) to learn how to write and style content, add code snippets, import multimedia, and more. Doc body text content is written in GitHub-flavored markdown, with some customizations.


## Step 4: Add doc to the navigation menu

To add your new doc to the left-nav menu, you'll need to add its name and file path to the [`sidebars.ts` file](https://github.com/SumoLogic/sumologic-documentation/blob/main/sidebars.ts).

:::note Doc Team Support
The Sumo Logic Doc Team will help your add you documentation to the sidebar and top navigation. If you have suggestions, please include those in your Pull Request description. If you add the documentation to the sidebar, the team will review the location and names for building and placement in navigation.
:::

## Step 5: Build and deploy on local to preview changes

Next, you'll build and deploy a local instance of the Sumo Logic Docusaurus site.

Our site is built using Docusaurus, a static site generator, which builds your site as simple static HTML, JavaScript and CSS files. To view our install installment requirements and preview your build, see [Building Locally](https://github.com/SumoLogic/sumologic-documentation#building-locally) in our README.

We use Yarn for all installs and builds. Never use NPM commands for installing or updating packages.

## Step 6: Submit your request

See [Clone Sumo Docs Repository](/docs/contributing#clone-sumo-docs-repository) for instructions.
