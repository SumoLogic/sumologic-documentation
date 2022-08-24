---
id: create-document
title: Create a Sumo Logic Document
sidebar_label: Create Your First Doc
description: Learn how to create and write a doc in markdown.
---

A document is a markdown file (.md) with content, bulleted instructions, images, tables, code samples, and more.

To create your first doc:

## 1. Create doc file

Create a markdown file with filename.md in a /docs folder that best matches the guide. This is the English language guide. For information on translations, see [Translate Documentation](translate-documentation.md).

## 2. Add doc title and metadata

See [Markdown Features > Front Matter](/docs/contribution/markdown-features#front-matter) to learn how.

## 3. Add doc content

### Text

Doc body text content is written in GitHub-flavored markdown, with some customizations.

### Images

Images must be added to the `static/img` folders. The `img` folder structure currently mirrors the doc sections. To stay organized, always replace existing images, rather than adding new ones with dates or version numbers.

### Custom files

You can also add files such as custom code, json, yaml, and xml in the `static/files` folder.

See [Markdown Features](markdown-features.md) and [Docusaurus Static Assets](https://docusaurus.io/docs/static-assets) for more information.

### Reusing content

You can create a section of content for reuse by creating a markdown file and saving it in `/docs/reuse`. If the file includes headings, they do not add to the right side page nav. You may want reuse to be just a section of content without headings.

To add the file to another document, use this code with the reuse file name:
```bash
{@import ../../reuse/filename.md}
```

## 4. Add doc to navigation menu

The `sidebars.ts` file (in repo root) controls the side navigation for the entire site. It consists of multiple sidebars and sections based on the Guides top navigation, drilling down per guide. A list of sections and advice on content is at the top of the sidebars file, with comments throughout. The [docusaurus.config.js file](https://docusaurus.io/docs/api/docusaurus-config) controls top-level navigation content.

* To add a specific page, you include the directory path and topic id from the frontmatter. For example, this page is `contribution/create-document`.
* To add a section within a section, use a category section with page links in it (see below example).
* To add an index for a section, create an index.md page in the folder. Give it a `slug: name` where the name is the folder for the entire section like contribution-guide. In the category, use a link line with the folder name and index for example: `link: {type: 'doc', id: 'contribution/index'},`.
* To add a new page, make note of the file path and id. For example, this document is located in the folder `contribution` with an id of `create-document`. When adding this file to the sidebar, it would be added to the `contribution/create-document`.

<details><summary>Example: add <code>contribution/create-document</code> to sidebars.ts</summary>

```js title="sidebars.ts"
//Contribution guide for documentation
  contribution: [
    {
      type: 'category',
      label: 'Contribution Guide',
      collapsible: true,
      collapsed: false,
      link: {type: 'doc', id: 'contribution/index'},
      items: [
        'contribution/create-document',
        'contribution/markdown-features',
        'contribution/release-notes',
        'contribution/build-deploy',
        'contribution/translate',
        {
          type: 'category',
          label: 'Templates',
          collapsible: true,
          collapsed: false,
          items: [
            'contribution/templates/partner-app'
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
