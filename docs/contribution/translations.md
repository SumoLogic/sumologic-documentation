---
id: translations
title: Translating Documentation
sidebar_label: Translating Documentation
description: Learn about our doc translation process.
---

All content in /docs folder is the English language documentation, the source of truth for all content. For full information on translations and commands, see [Docusaurus i18n](https://docusaurus.io/docs/i18n/introduction).

:::sumo Doc Team Support
The Sumo Logic documentation team will help with all translation efforts and tracking. Always make note of translation needs in the PR. These will be a source of truth for changes made, translations required, and updates completed in all supported languages.
:::

## Translate new files

As you add new files, make sure to create a copy of that file matching the folder structure in /i18n/ja/ for the following:

* New documentation: /i18n/ja/docusaurus-plugin-content-docs/current
* New release notes: /i18n/ja/docusaurus-plugin-content-blog

You can copy and paste the file with a file explorer.

We also recommend adding a note in your Pull Request for content needing translation (coming soon).

## Updating content

Updating existing files and translating should be done in the English language documents in /docs. In your Pull Request, make note of the need for translation updates. We can work with translators to use your PR as a reference of changes made per file and line. The doc team will work with them on these edits.

## Translate a doc

Copy the `docs/intro.md` file to the `i18n/fr` folder:

```bash
mkdir -p i18n/fr/docusaurus-plugin-content-docs/current/

cp docs/intro.md i18n/fr/docusaurus-plugin-content-docs/current/intro.md
```

Translate `i18n/fr/docusaurus-plugin-content-docs/current/intro.md` in French.

## Build your localized site

Build your site for a specific locale:

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
