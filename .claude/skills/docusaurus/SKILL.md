---
name: docusaurus
description: Docusaurus 3 syntax, frontmatter templates, MDX components, and sidebar config patterns for the sumologic-documentation repo. Use when creating new docs pages, updating sidebars.ts, or working with any Docusaurus-specific features.
---

# Docusaurus 3 Reference — sumologic-documentation

## Frontmatter Templates

### Regular content page
```yaml
---
id: my-page-name
title: My Page Title          # under 60 chars, include target keywords
sidebar_label: Sidebar Label  # short nav label
description: One or two sentences describing this page for search engines.
---
```

### Index / hub page (custom URL)
```yaml
---
slug: /section/subsection
title: Section Title
sidebar_label: Section Title
description: Description of this section.
keywords:
  - keyword1
  - keyword2
tags:
  - tag1
  - tag2
---
```

## Standard Imports

```jsx
import useBaseUrl from '@docusaurus/useBaseUrl';
```

For hub/card pages:
```jsx
import useBaseUrl from '@docusaurus/useBaseUrl';
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';
```

For embedded videos:
```jsx
import Iframe from 'react-iframe';
```

## Hub/Index Page Layouts

### Card grid (sumologic-documentation custom layout)
```jsx
import useBaseUrl from '@docusaurus/useBaseUrl';

<div className="box-wrapper">
  <div className="box smallbox card">
    <div className="container">
      <a href={useBaseUrl('docs/section/page')}>
        <img src={useBaseUrl('img/icons/icon.png')} alt="icon description" width="40"/>
        <h4>Card Title</h4>
      </a>
      <p>Brief description of this section.</p>
    </div>
  </div>
</div>
```

### DocCardList (auto-generated from sidebar)
```jsx
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```

## Admonitions

```markdown
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

:::sumo Best Practice
Sumo Logic-specific best practice. Title is customizable.
:::

:::training
Links to training courses or certifications.
:::
```

Admonitions support code blocks, links, bullets, and images inside them.

## Code Blocks

With language and title:
````markdown
```json title="config.json"
{ "key": "value" }
```
````

With line highlighting:
````markdown
```python {3-5}
line1
line2
highlighted line 3
highlighted line 4
highlighted line 5
line6
```
````

## Images

Add this import under frontmatter:
```jsx
import useBaseUrl from '@docusaurus/useBaseUrl';
```

Image syntax:
```jsx
<img src={useBaseUrl('img/folder/image.png')} alt="Descriptive alt text" style={{border: '1px solid gray'}} width="400" />
```

Guidelines:
- Save images to `/static/img/`
- PNG format preferred; max 2MB; max display width 800px
- Always include descriptive `alt` text
- Square logos: ~50px wide; wide logos: ~100px wide

## Collapsible Sections

```html
<details>
<summary>Toggle label here</summary>

Content goes here. Supports markdown, code blocks, and images.

</details>
```

## Tabs

```jsx
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
```

## Reusable Partials (Snippets)

Shared content lives in `/docs/reuse/` -- these files are not rendered publicly.

```markdown
import MySnippet from '../reuse/my-snippet.md';

<MySnippet/>
```

## Downloadable Files

```jsx
<a href={useBaseUrl('files/your-file.yaml')} target="_blank">your-file.yaml</a>
```

Store downloadable files in `/static/files/`.

## Embedded Video (Iframe)

```jsx
import Iframe from 'react-iframe';

<Iframe url="https://www.youtube.com/embed/VIDEO_ID"
  width="854px"
  height="480px"
  id="myId"
  className="video-container"
  display="initial"
  position="relative"
  allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
/>
```

## sidebars.ts Patterns

### Add a simple doc
```javascript
// In the appropriate sidebar array:
'section/my-doc-id',   // matches frontmatter id: my-doc-id in docs/section/my-doc.md
```

### Add a category with an index page
```javascript
{
  type: 'category',
  label: 'Category Name',
  collapsible: true,
  collapsed: true,
  link: {type: 'doc', id: 'section/index'},
  items: [
    'section/page-one',
    'section/page-two',
    {
      type: 'category',
      label: 'Sub-category',
      items: [
        'section/subcat/page',
      ],
    },
  ],
},
```

### Sidebar ID to file path mapping
- Sidebar entry `'section/my-page'` maps to file `docs/section/my-page.md` with frontmatter `id: my-page`
- For `index.md` files with `slug:`, use the path `'section/index'`

## File Naming Conventions

- Kebab-case: `my-page-name.md`
- Section landing pages: `index.md`
- Reusable snippets: stored in `docs/reuse/`, named descriptively

## Special Folders

| Folder | Purpose |
|--------|---------|
| `docs/reuse/` | Shared markdown snippets, not rendered publicly |
| `docs/beta/` | Beta feature docs (closed/open beta) |
| `docs/contributing/` | Contribution guides and templates |
| `static/img/` | All images |
| `static/files/` | Downloadable files (YAML, JSON, etc.) |
| `blog-service/`, `blog-cse/`, etc. | Release notes (blog-based) |

## Key Docusaurus Plugins Available

- `remark-code-import` -- import code from files into code blocks
- `remark-import-partial` -- import markdown files as partials

## Custom Admonition Keywords (configured in this repo)

`note`, `tip`, `warning`, `important`, `danger`, `sumo`, `secondary`, `success`, `training`

## Local Dev Commands

```bash
yarn start   # hot-reload dev server
yarn build   # full production build
```

---

## Gotchas

These are repo-specific behaviors that differ from standard Docusaurus defaults.

- **`/docs/reuse/` files must not appear in `sidebars.ts`.** They are import-only partials. Adding them to the sidebar will create broken or duplicate pages.
- **`:::sumo` and `:::training` are custom admonitions** configured only in this repo. Standard Docusaurus will not recognize them. Do not add them to other Docusaurus projects.
- **`:::training` renders with a purple background and graduation cap icon** -- it is intentionally distinct from `:::tip`.
- **`secondary` and `success` are also custom admonition keywords** in this repo, in addition to the standard Docusaurus set.
- **Never write an H1 in the body.** The `title:` frontmatter generates the H1. A second H1 in the body breaks page structure and SEO.
- **Use `id:` for content pages, `slug:` for index/hub pages.** Using `slug:` on a regular content page can break sidebar linking.
- **Numbered list items in source always use `1.`** Docusaurus handles auto-incrementing on render. Do not manually number `1.`, `2.`, `3.`.
- **MDX is active.** Curly braces `{` and angle brackets `<` in prose must be escaped or they will cause build errors. Use `\{` and `&lt;` in plain text contexts.
- **Webpack cache conflicts with Algolia search.** The CI build clears webpack cache on each run. Do not add webpack cache back to the PR workflow.
