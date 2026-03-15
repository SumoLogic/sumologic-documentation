---
name: docusaurus
description: Generate Docusaurus 3 compatible markdown, frontmatter, sidebars config, and MDX components. Use when creating new docs pages, updating sidebars.ts, or working with Docusaurus-specific features.
---

# Docusaurus 3 — Quick Reference

## Frontmatter template

id: page-id
title: Page Title (under 60 chars, include keywords)
sidebar_label: Short Nav Label
description: 1-2 sentence SEO description.
keywords:
  - keyword1
  - keyword2
tags: [keyword1, keyword2]

## Admonitions

:::note
Informational note.
:::

:::tip
Helpful tip about a feature.
:::

:::important
Vital information.
:::

:::warning
Important and potentially problematic information.
:::

:::danger
Dangerous action that could result in data loss.
:::

:::sumo[Best Practice]
Sumo Logic-specific best practices or SME guidance. Title can be changed.
:::

:::training
Links to training courses or certifications.
:::

## Images

Add this import under frontmatter:
import useBaseUrl from '@docusaurus/useBaseUrl';

Image syntax:
<img src={useBaseUrl('img/your-image.png')} alt="Descriptive alt text" style={{border: '1px solid gray'}} width="500" />

- Save images to /static/img
- PNG format only, max 2MB, max width 800px
- Always include alt text
- Square logos: ~50px wide; wide logos: ~100px wide

## Reusable content

import MySnippet from '../reuse/my-snippet.md';
<MySnippet/>

Store reusable snippets in /docs/reuse

## Collapsible sections

<details>
<summary>Toggle label here</summary>

Content goes here. Supports markdown, code blocks, images.

</details>

## Tabs

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  className="unique-tabs"
  defaultValue="tab1"
  values={[
    {label: 'Tab 1', value: 'tab1'},
    {label: 'Tab 2', value: 'tab2'},
  ]}>
<TabItem value="tab1">

Content for tab 1.

</TabItem>
<TabItem value="tab2">

Content for tab 2.

</TabItem>
</Tabs>

## Sidebar entry (sidebars.ts)

Single doc entry:
'folder/page-id'

Category entry:
{
  type: 'category',
  label: 'Section Name',
  collapsible: true,
  collapsed: false,
  link: {type: 'doc', id: 'folder/index'},
  items: [
    'folder/doc-id1',
    'folder/doc-id2',
  ],
},

## Hub/index page

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>

## Downloadable files

<a href={useBaseUrl('files/your-file.yaml')} target="_blank">your-file.yaml</a>

Store files in /static/files

## Local preview commands

yarn start  — hot reload dev server
yarn build  — full production build
