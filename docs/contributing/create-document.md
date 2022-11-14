---
id: create-document
title: Create a Sumo Logic Document
sidebar_label: Create and Publish a Doc
description: Learn how to create a doc, write content in markdown, and submit your changes to our repo.
---

:::caution

&#128679; Under construction &#128679;
:::

The Sumo Logic Docs site is comprised of markdown files written in GitHub-flavored markdown containing content like bulleted instructions, images, tables, interactive code samples, and more. Here's a high level overview of how to create a doc.

## Step 1: Create a doc file

In the /docs folder, create a markdown file in the format `<your-file>.md`.

## Step 2: Add a doc title and metadata

See [Markdown Features > Front Matter](/docs/contributing/markdown-cheat-sheet#frontmatter) to learn how.

## Step 3: Add doc content

:::note
Help us keep Sumo Logic open and inclusive. Read and follow our [Code of Conduct](/docs/contributing/code-of-conduct).
:::

See our [Markdown Cheat Sheet](markdown-cheat-sheet.md) to learn how to write and style content, add code snippets, import multimedia, and more. Doc body text content is written in GitHub-flavored markdown, with some customizations.


## Step 4: Add doc to the navigation menu

The [`sidebars.ts` file](https://github.com/SumoLogic/sumologic-documentation/blob/main/sidebars.ts) controls the sidebar navigation for the entire site. It consists of multiple sidebars and sections based on the Guides top navigation, drilling down per guide. A list of sections and advice on content is at the top of the sidebars file, with comments throughout. The [docusaurus.config.js file](https://docusaurus.io/docs/api/docusaurus-config) controls top-level navigation content.

* To add a specific page, you include the directory path and topic id from the frontmatter. For example, this page is `contribution/create-document`.
* To add a section within a section, use a category section with page links in it (see below example).
* To add an index for a section, create an index.md page in the folder. Give it a `slug: name` where the name is the folder for the entire section like contribution-guide. In the category, use a link line with the folder name and index for example: `link: {type: 'doc', id: 'contribution/index'},`.
* To add a new page, make note of the file path and id. For example, this document is located in the folder `contribution` with an id of `create-document`. When adding this file to the sidebar, it would be added to the `contribution/create-document`.

<details><summary>Example: add <code>contribution/create-document</code> to sidebars.ts</summary>

```js title="sidebars.ts"
//Contribution guide for documentation
  contributing: [
    {
      type: 'category',
      label: 'Contribution Guide',
      collapsible: true,
      collapsed: false,
      link: {type: 'doc', id: 'contributing/index'},
      items: [
        'contributing/create-document',
        'contributing/markdown-cheat-sheet',
        'contributing/build-deploy',
        'contributing/translations',
        {
          type: 'category',
          label: 'Templates',
          collapsible: true,
          collapsed: false,
          items: [
            'contributing/templates/partner-app'
          ]
        }
      ],
    },
  ],
```

</details>

* To add a category, or drop-down list of documentation, use the following format:

<details><summary>Example: add sidebar category example with additional section</summary>

```js title="sidebars.ts"
    {
      type: 'category',
      label: 'Name of Guide',
      collapsible: true,
      collapsed: false,
      link: {type: 'doc', id: 'foldername/id-first-page'},
      items: [
        'foldername/doc-id1',
        'foldername/doc-id2',
        {
          type: 'category',
          label: 'Section in Guide',
          collapsible: true,
          collapsed: false,
          link: {type: 'doc', id: 'foldername/id-section'},
          items: [
            'foldername/doc-id3',
            'foldername/doc-id4',
          ]
        }
      ],
    },
```

</details>

* To add a dedicated sidebar, use the following format:

<details><summary>Example: adding a dedicated sidebar for a guide</summary>

```js title="sidebars.ts"
module.exports = {
  sectionName: [
    ``,
    {
      type: 'category',
      label: 'Name of Guide',
      collapsible: true,
      collapsed: false,
      link: {type: 'doc', id: 'foldername/id-first-page'},
      items: [
        'foldername/doc-id1',
        'foldername/doc-id2',
        {
          type: 'category',
          label: 'Section in Guide',
          collapsible: true,
          collapsed: false,
          link: {type: 'doc', id: 'foldername/id-section'},
          items: [
            'foldername/doc-id3',
            'foldername/doc-id4',
          ]
        }
      ],
    },
    {
      type: 'category',
      label: 'Name of Another Guide',
      collapsible: true,
      collapsed: false,
      link: {type: 'doc', id: 'otherfoldername/id-first-page'},
      items: [
        'otherfoldername/doc-id1',
        'otherfoldername/doc-id2',
        {
          type: 'category',
          label: 'Section in Another Guide',
          collapsible: true,
          collapsed: false,
          link: {type: 'doc', id: 'otherfoldername/id-section'},
          items: [
            'otherfoldername/doc-id3',
            'otherfoldername/doc-id4',
          ]
        }
      ],
    },
  ]
```
</details>

:::note Doc Team Support
The Sumo Logic Doc Team will help your add your documentation to the sidebar and top navigation. If you have suggestions, please include those in your Pull Request description. If you add the documentation to the sidebar, the team will review the location and names for building and placement in navigation.
:::

## Step 5: Build and deploy on local to preview changes

Next, you'll build and deploy a local instance of the Sumo Logic Docusaurus site.

Our site is built using Docusaurus, a static site generator. To preview your work, make sure to run the following commands to install and build. We use Yarn for all installs and builds. Never use NPM commands for installing or updating packages.

To view our install installment requirements and how to preview your build, see [Building Locally](https://github.com/SumoLogic/sumologic-documentation#building-locally) in our README. Docusaurus builds your site as simple static HTML, JavaScript and CSS files.

## Step 6: Submit your request

See [Clone Sumo Docs Repository](/docs/contributing#clone-sumo-docs-repository) for instructions.
