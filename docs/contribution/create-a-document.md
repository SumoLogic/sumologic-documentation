---
id: create-document
title: Create a Document
sidebar_label: Create a Document
description: Learn how to write a doc in markdown.
---

A document is a markdown file (.md) with content, bulleted instructions, images, tables, code samples, and more.

## Create your first Doc

Create a markdown file with filename.md in a /docs folder that best matches the guide. This is the English language guide. For information on translations, see [Translate Documentation](translate-documentation.md).

```markdown
---
id: page-id
sidebar_label: Navigation title
description: Learn more about...
---

# Title of the Page
```

| Parameter | Description |
| -- | -- |
| `id:` | **Required.** Id for the page used in the sidebar and as the canonical link. Keep it short and only use dashes. |
| `sidebar_label:` | Optional, use a different title for the side navigation. Keep this title short. It does not affect the canonical link or page title. |
| `description:` | Optional, one sentence describing what the user will find in the page for searches. Otherwise the first couple sentences are used for searches. |
| `# Title of the Page` | **Required.** Only use an H1 once for the title of the page. This title is used in navigation is a `sidebar_label` is not included.|
| `slug:` | Overrides the id for the canonical link. Best used for index pages for sections. |

## Add content and images

All content uses GitHub Flavored Markdown with some options and additions. All images should be added to the `static/img` folders. The current folders are based on doc sections. Always replace an existing image, do not keep adding new ones with dates. You can also add files such as custom code, json, yaml, and xml in the `static/files` folder.

For information, see [Markdown Features](markdown-features.md) and [Docusaurus Static Assets](https://docusaurus.io/docs/static-assets) for more information.

## Reusing Content

You can create a section of content for reuse by creating a markdown file and saving it in `/docs/reuse`. If the file includes headings, they do not add to the right side page nav. You may want reuse to be just a section of content without headings.

To add the file to another document, use this code with the reuse file name:

```
{@import ../../reuse/filename.md}
```

## Add to Navigation

The `sidebar.ts` file (in repo root) controls the side navigation for the entire site. It includes multiple sidebars and sections based on the Guides top navigation, drilling down per guide. A list of sections and advice on content is at the top of the sidebars file, with comments throughout.

* To add a specific page, you include the directory path and topic id from the frontmatter. For example, this page is `contribution/create-document`.
* To add a section within a section, use a category section with page links in it (see below example).
* To add an index for a section, create an index.md page in the folder. Give it a `slug: name` where the name is the folder for the entire section like contribution-guide. In the category, use a link line with the folder name and index for example: `link: {type: 'doc', id: 'contribution/index'},`.

:::sumo Doc Team Support
The Sumo Logic Doc Team will help to add your documentation to the sidebar and top navigation. If you have suggestions, please include those in the Pull Request description. If you add the documentation to the sidebar, the team will review the location and names for building and placement in navigation.
:::

When adding a new page, make note of the file path and id. For example, this document is located in the folder `contribution` with an id of `create-document`. When adding this file to the sidebar, it would be added to the  `contribution/create-document`.

```js title="Add this page to sidebar.ts" {10}
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

To add a category, or drop-down list of documentation, use the following format:

```js Sidebar category example with additional section
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

To add a dedicated sidebar, use the following format:

```js Example adding a dedicated sidebar for a guide
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

### Top Navigation

All top navigation content is controlled by the docusaurus.config.js file. We recommend only allowing the Sumo Logic documentation team touch this file. For information from Docusaurus, see [Docusaurus Config](https://docusaurus.io/docs/api/docusaurus-config).
