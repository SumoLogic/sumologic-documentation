<!-- do not publish!-->

# Style guide re-scope plan

Goal: cut repetition of generic Docusaurus/Markdown docs from `docs/contributing/style-guide.md`.
Keep only Sumo-specific house rules; link out for the mechanics. Do this as its own
ticket **after** DOCS-1474 (#7081) and DOCS-1520 land. ~505 lines removed.

Pattern for each compressed section: one-line link to the Docusaurus page + a short
"Sumo conventions" list.

---

## Compress (link out + keep house rules)

### `## Tabs` — 78 lines -> ~15

> ## Tabs
> Use [Docusaurus tabs](https://docusaurus.io/docs/markdown-features/tabs) for mutually
> exclusive paths - environment (Kubernetes vs. non-Kubernetes), OS, collection method.
> Add the imports once per file:
> ```md
> import Tabs from '@theme/Tabs';
> import TabItem from '@theme/TabItem';
> ```
> - **Use `groupId`** when the same choice appears more than once on a page or across
>   pages, so the reader's selection syncs and sticks (for example, `groupId="k8s-nonk8s"`).
> - **Make each tab self-contained.** A reader who picks one tab and ignores the rest
>   should get every step for that path. Don't scatter one procedure so step 3 is under
>   tab A and step 4 under tab B.
> - `className="unique-tabs"` is an optional styling class used in some docs.

### `## Videos` — 70 lines -> ~12

> ## Videos
> Embed videos with `react-iframe` (`import Iframe from 'react-iframe';`). Use the
> vendor's embed URL as `url=`, `className="video-container"`, and
> `width="854px" height="480px"`.
> - **YouTube:** append `?rel=0` to the embed URL so only same-channel videos are
>   suggested afterward.
> - **Other hosts (Wistia, etc.):** same `<Iframe>` pattern with that host's embed URL.
> - Keep videos short and captioned; never make one required to complete a task.

### `## Admonitions` — 110 lines -> ~20

> ## Admonitions
> We call Docusaurus's callouts *admonitions*. Standard types (`:::note`, `:::tip`,
> `:::info`, `:::warning`, `:::danger`) work as
> [documented by Docusaurus](https://docusaurus.io/docs/markdown-features/admonitions)
> and accept full Markdown.
>
> Two are Sumo-specific:
> - `:::sumo Best Practice` - subject matter expert guidance, best practices, Sumo Logic-specific notes.
>   Retitle as needed.
> - `:::training` - links to training courses, certifications, and micro-lessons.
>
> | Use | For |
> |---|---|
> | `:::note` | neutral aside |
> | `:::tip` | optional shortcut or better way |
> | `:::info` / `:::important` | something the reader must not miss |
> | `:::warning` | risk of a confusing or wrong result |
> | `:::danger` | risk of data loss or an unrecoverable action |

### `## Code (blocks)` — 135 lines -> ~15

> ## Code blocks
> Triple-backtick fences, with a language for highlighting - see
> [Docusaurus code blocks](https://docusaurus.io/docs/markdown-features/code-blocks)
> for titles, line highlighting, and line numbers.
> - Use `sql` for Sumo Logic queries, `json` for Sumo Logic logs.
> - Code blocks are for snippets a reader copies and runs. Format error messages as
>   [inline code](#code-inline), not blocks.
> - Embed a file from GitHub with ```` ```json reference ```` and the file URL (add
>   `#L4-L5` for a line range). Used throughout the
>   [C2C source docs](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework).

### `## Tables` — 84 lines -> ~10

> ## Tables
> Standard Markdown tables. Columns are left-aligned by default; use `:--:` / `--:` to
> center or right-align. Cells accept inline Markdown, links, images, and `<br/>` for
> line breaks. Rows get zebra striping from the site theme - no styling needed. For
> complex layouts, raw HTML tables also work.

### `## Collapsible text blocks` — 55 lines -> ~8

> ## Collapsible text blocks
> Use [Docusaurus `<details>`](https://docusaurus.io/docs/markdown-features#details) to
> fold away long optional content - verbose examples, long code samples, big lists.
> Collapsed content is still indexed for search. Never put required steps or
> instructions in an expander.

### `## Downloadable files` — 33 lines -> ~6

> ## Downloadable files
> Put the asset in `static/files/`, then link it:
> `<a href={useBaseUrl('files/yourfile.ext')} target="_blank">yourfile.ext</a>`.
> Most formats are supported
> ([Docusaurus static assets](https://docusaurus.io/docs/static-assets)).

---

## Keep, light trim only

| Section | What to do |
|---|---|
| `## Metadata (frontmatter)` | Keep - 85% your SEO/`id` rules. Keep the link to the Docusaurus front-matter page; drop the Jekyll link. |
| `## Images` | Keep - alt text, logos, screenshots, masking sensitive info, images-in-lists are all house rules. Trim only the generic `<img>`/`useBaseUrl` explainer to one line. |
| `## Reusing content` | Keep - the `reuse/` folder pattern and H3/H4 split are yours. Consolidate the two duplicate "Restarting your source" subheadings (copy-paste error). |
| `## Navigation menus` | Keep "which file, how our sections map, read the comments at the top of `sidebars.ts`"; cut generic category/`<details>` sidebar syntax and link to Docusaurus for it. |

---

## After the trim: optional split

Once the mechanics are out, the remaining style guide is coherent enough to split into
a Docusaurus category (mirrors Google / Microsoft): `Basics` (highlights list) ·
`Voice and tone` · `Language and grammar` · `Punctuation` · `Formatting` ·
`UI and code` · `Images and media`. Budget for anchor breakage: audit
`grep -rn 'style-guide/#' docs/ .claude/`, update links or add redirects, keep the old
URL as a landing page.
