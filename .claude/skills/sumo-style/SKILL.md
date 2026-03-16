---
name: sumo-style
description: Sumo Logic writing conventions and style guide. Apply when writing, editing, or reviewing any documentation content for the sumologic-documentation repo.
---

# Sumo Logic Documentation Style Guide

The full style guide lives at: https://www.sumologic.com/help/docs/contributing/style-guide

When writing or editing a doc, fetch and read that page first, then apply its conventions. The rules below cover the most critical patterns and don't require a fetch.

---

## Voice and Tone

- **Address readers as "you"** — never "the user" or "one"
- **Active voice** — "Sumo Logic ingests data" not "data is ingested by Sumo Logic"
- **Conversational but professional** — avoid stiff, institutional language
- **8th-grade reading level** for introductory and instructional content
- **No "please"** in task directives — "Build the query using..." not "Please build..."
- Use **"need to"** instead of "must" or "have to" — softer, friendlier tone
- Always say **"Sumo Logic"** (not "Sumo"); "we" is acceptable conversationally
- Spell out negative contractions — use "cannot" not "can't"
- Avoid generic filler adjectives like "very" or "best" — let the product speak for itself
- Be judicious with "always" and "never"

## Language Rules

- **No abbreviations**: write "for example" not "e.g.", "that is" not "i.e.", "and so on" not "etc."
- **Spell out acronyms on first use** in body text: "Application Load Balancer (ALB)"; after that, ALB is fine. Do not spell out in headings.
- **Inclusive and culturally neutral terms**:
  - ✅ allowlist, denylist, placeholder data, primary/main, press/click
  - ❌ whitelist, blacklist, dummy data, master, hit
- No gender pronouns unless referring to a specific person
- No regional idioms or slang
- Keep sentences concise; prefer short, simple words

## Headings

- **H1 (title)**: Title Case — set via frontmatter `title:`, never write an H1 in the body
- **H2 and below**: Sentence case (capitalize proper nouns only)
- Start body content at H2 (`##`)
- No bold, italics, or backticks inside headings
- SEO: keep titles under 60 characters and include main keywords

## Doc Structure

Every doc should include:

1. **Frontmatter** — see below
2. **Introduction** — what the page teaches, why read it, who should read it
3. **Contextual guidance** — where this fits in a tutorial or workflow, if applicable
4. **Links** — to related concepts for additional reading
5. **Admonitions** — where appropriate

## Frontmatter

```yaml
---
id: page-slug          # required for content pages; kebab-case, short
title: Page Title      # required; Title Case; max 60 chars for SEO; include keywords
sidebar_label: Label   # optional; what appears in sidebar nav
description: One or two sentences for search engines.
keywords:              # optional but recommended
  - keyword1
  - keyword2
tags:                  # optional
  - tag1
---
```

- Use `slug:` instead of `id:` for **index/hub pages** that need a custom URL path
- Use `id:` for all regular content pages

## Emphasis

- **Bold** for UI elements the user interacts with (buttons, tabs, field names)
- *Italics* for defining a term for the first time, or content the user types into a field
- Never underline text

## Lists

- **Numbered lists** for sequential steps
- **Bulleted lists** (using `-`) for non-sequential items
- End each bullet with a terminal period
- Separate an intro phrase from its explanation with a period, not a dash

## Links

- **Internal links**: use relative paths or `useBaseUrl`
- **External links**: use full absolute URLs
- Use descriptive link text (page title or a brief summary) — never "click here"
- Use "Learn more" when linking to supplementary Sumo Logic docs
- Always link to important concepts and overviews for additional reading

## Code

- **Inline code**: single backticks for commands, operators, API methods, and error messages
- **Code blocks**: triple backticks, always specify the language for syntax highlighting
  - Use `sql` for Sumo Logic queries
  - Use `json` for Sumo Logic log examples
- Code blocks are for runnable snippets only — not for error messages or non-executable output

## Admonitions

```markdown
:::note
Supplementary information.
:::

:::tip
Helpful tip about a feature or option.
:::

:::important
Vital information the reader must know.
:::

:::warning
Important and potentially problematic information.
:::

:::danger
Dangerous action that could result in data loss.
:::

:::sumo Best Practice
Sumo Logic-specific best practices, links, or expert guidance. Title is customizable.
:::

:::training
Links to training courses, certifications, or micro lessons.
:::
```

## Images

```jsx
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/folder/filename.png')} alt="descriptive alt text" style={{border: '1px solid gray'}} width="400" />
```

- Always include descriptive `alt` text
- Store images in `/static/img/`

## Reusable Snippets

Shared content lives in `/docs/reuse/`. Import with:

```markdown
import PartialName from '../reuse/filename.md';

<PartialName/>
```

## App and Source Doc Branding

- App docs must open with: "The Sumo Logic app for [Vendor]..."
- Source docs must open with: "The Sumo Logic source for [Vendor]..."

## Contributing Workflow

1. Fork the repo and create a branch from `main`
2. Edit or add markdown files in `/docs`
3. Add frontmatter to every new file
4. Add the page to `sidebars.ts`
5. Add to the hub/index page if creating a new section page
6. Add a CID URL mapping in `cid-redirects.json` if needed
7. Submit a PR to `main`
