---
id: translations
title: Translating Documentation
sidebar_label: Translating Docs
description: Learn about our doc translation process.
---

<head>
  <meta name="robots" content="noindex" />
</head>

All content in /docs folder is the English language documentation, the source of truth for all content. For full information on translations and commands, see [Docusaurus i18n](https://docusaurus.io/docs/i18n/introduction).

:::sumo Doc Team Support
The Sumo Logic documentation team will help with all translation efforts and tracking. Always make note of translation needs in the PR. These will be a source of truth for changes made, translations required, and updates completed in all supported languages.
:::

As we add new languages for translation, the Sumo Logic Doc team can set up the files for translation and tags for the language. When we add a new language to translate, we create a base of site interface files and documentation content using a command. This includes the top nav, sidebar navigation, and landing page content.

All English content is the source of truth for all!

Current languages supported:

* English: en
* Japanese: ja

## Contributing Translations

Each supported language will have all user interface and documentation in a language specific folder under i18n:

| Language | Interface translations | Documentation content |
| :-- | :-- | :-- |
| English | `/src` in theme and pages | `/docs` |
| Japanese | `/i18n/ja/docusaurus-theme-classic`<br/><br/>code.json is landing page | `/i18n/ja/docusaurus-plugin-content-docs/current`<br/><br/>current.json is sidebar categories |


## Translating new doc files

As you add new doc files, make sure to create a copy of that file matching the folder structure in /i18n/ja/ for the following: `/i18n/ja/docusaurus-plugin-content-docs/current`.

You can copy and paste the file with a file explorer. We also recommend adding a note in your Pull Request for content needing translation.

1. **Translating a doc**. Copy the `docs/intro.md` file to the `i18n/fr` folder:
  ```bash
  mkdir -p i18n/fr/docusaurus-plugin-content-docs/current/

  cp docs/intro.md i18n/fr/docusaurus-plugin-content-docs/current/intro.md
  ```
  Translate `i18n/fr/docusaurus-plugin-content-docs/current/intro.md` in French.
  
2. Build your localized site. Build your site for a specific locale:
  ```bash
  npm run build -- --locale fr
  ```
  Or build your site to include all the locales at once:
  ```bash
  npm run build
  ```
  :::caution
  In development, you can only use one locale at a same time.
  :::

## Updating translated content

Updating existing files and translating should be done in the English language documents in /docs. In your Pull Request, make note of the need for translation updates. We can work with translators to use your PR as a reference of changes made per file and line. The doc team will work with them on these edits.

As you add new Markdown files in English, you will need to create copies in the language folders. The /docs folder structure and content is exactly the same in all other language folders.

Do not change the following:

* All file names should remain in English to work with the navigation and builds. JSON files allow you to enter translated names for those entries.
* All screenshots are currently in English. Translated images can be added per language as needed. More info coming.

If you only update content in existing files, we will need to track these changes and provide them for translation.
