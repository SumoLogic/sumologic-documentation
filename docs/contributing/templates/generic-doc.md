---
id: generic-doc
title: Doc (Generic) Template
description: Use this generic template to create a Sumo Logic doc.
---

Use this generic template to create a new doc. Copy and paste this into your new .md file and refer to the [Style Guide](/docs/contributing/style-guide).

```md

---
id: doc
title: Doc Title
description: Use this generic template to create a Sumo Logic doc.
---

<head>
  <meta name="robots" content="noindex" />
</head>

import useBaseUrl from '@docusaurus/useBaseUrl';

\Copy this markdown file and replace it with your own documentation. To view the full list of markdown components, see our [Style Guide](/docs/contributing/style-guide).

Replace the title above in the [Frontmatter section](/docs/contributing/style-guide#frontmatter) with yours. This will render as an H1 header. All other header sections should be H2, H3, H4, or H5.\

## Sample H2 section

\To add an image, save the .png file with a simple name to the `/static/img` folder. For many images, consider guide or product feature folders. Include alt text and the file location `/img/folder-name/` and file name.\

Example image:

<img src={useBaseUrl('img/reuse/sumo-square.png')} alt="Sumo Logic logo" style={{border: '1px solid gray'}} width="50" />

### Instructions

\Always use `1.` to start your instructions. You do not need to sequentially number the list; markdown automatically numbers it for you on build.

1. Click **Collections**, then **Sources** tab.
1. Next step, just write it out.
    * Bullet list just tab and use `*` or `1.`.
    * Next bullet.<br/><img src={useBaseUrl('img/reuse/sumo-square.png')} alt="Sumo Logic logo" style={{border: '1px solid gray'}} width="50" />
1. The numbers continue with content indented above!

Example table:

| Item | Description |
| :-- | :-- |
| Dashboard | *Markdown* **works** `here`, too. |
| *Query* | [More info](/docs/search/search-query-language)! |

```
