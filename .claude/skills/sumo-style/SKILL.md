---
name: sumo-style
description: Sumo Logic writing conventions and style guide. Apply when writing, editing, reviewing, or auditing any documentation content for the sumologic-documentation repo. Triggers include drafting new docs, rewriting intros, tone checks, frontmatter audits, and style reviews.
---

# Sumo Logic Style Guide

## Always fetch before applying rules

Before writing, editing, or auditing any content, fetch both of these pages:

- https://www.sumologic.com/help/docs/contributing/style-guide/
- https://www.sumologic.com/help/docs/contributing/word-list/

Apply the fetched rules. This is a living style guide -- the live pages take precedence over everything below. The rules below are fallback defaults only, for cases where the fetch fails or is unavailable.

---

## Voice and tone

- **Address readers as "you".** Never "the user" or "one."
- **Active voice.** "Sumo Logic ingests data" not "data is ingested by Sumo Logic."
- **Conversational but professional.** Avoid stiff, institutional language.
- **8th-grade reading level** for introductory and instructional content.
- **No "please" in task directives.** "Build the query using..." not "Please build..."
- **Use "need to"** instead of "must" or "have to."
- **Always say "Sumo Logic"** (not "Sumo" except in code); "we" is acceptable conversationally.
- **Avoid filler adjectives.** Cut "very", "best", "simply", "just", "easy", "straightforward."
- **Be judicious with "always" and "never".**

### Contractions

- **Common contractions** (you'll, they're, we're) are acceptable.
- **Negative contractions must be spelled out.** "cannot" not "can't", "will not" not "won't", "do not" not "don't."
- **Avoid uncommon contractions.** "should've", "it'll", "they'd" -- rewrite instead.

## Language rules

- **No abbreviations.** Write "for example" not "e.g.", "that is" not "i.e.", "and so on" not "etc."
- **Spell out acronyms on first use** in body text: "Application Load Balancer (ALB)"; use ALB after. Do not spell out in headings.
- **No gender pronouns** unless referring to a specific named person.
- **No regional idioms or slang.**
- **Ampersand (&).** Do not use for "and" in prose.
- **Numbers.** Spell out one through nine; use numerals for 10 and above.

### Inclusive language

| Use | Avoid |
|-----|-------|
| allowlist | whitelist |
| denylist | blacklist |
| placeholder data | dummy data |
| primary / main | master |
| press / click | hit |

## Headings

- **H1 (title): Title Case.** Set via frontmatter `title:`, never write an H1 in the body.
- **H2 and below: Sentence case.** Capitalize proper nouns only.
- **Start body content at H2** (`##`).
- **Plain text only.** No bold, italics, or inline code in headings.
- **Keep titles under 60 characters** for SEO; include main keywords.

## Doc structure

Every doc should include:

1. Frontmatter
2. Introduction -- what the page teaches, why read it, who should read it
3. Contextual guidance -- where this fits in a tutorial or workflow, if applicable
4. Links to related concepts for additional reading
5. Admonitions where appropriate

## Frontmatter

```yaml
---
id: page-slug          # required for content pages; kebab-case, short
title: Page Title      # required; Title Case; max 60 chars for SEO; include keywords
sidebar_label: Label   # optional; what appears in sidebar nav
description: One or two sentences for search engines. 140–160 characters. Plain text only — no backticks or Markdown. Do not start with "This page" or "This doc."
keywords:              # optional but recommended
  - keyword1
  - keyword2
---
```

- **Use `slug:`** instead of `id:` for index/hub pages that need a custom URL path.
- **Use `id:`** for all regular content pages.

## Emphasis

- **Bold** for UI elements the reader interacts with (buttons, tabs, field names).
- **Italics** for first-time term definitions, or content the reader types into a field.
- **Never underline text.**

## Lists

- **Numbered lists** for sequential steps.
- **Bulleted lists** (using `-`) for non-sequential items.
- **Always use `1.`** for all numbered steps -- Docusaurus auto-numbers on build.
- **End each bullet with a terminal period.**
- **Introduce lists with a stem sentence** before the list.

## Links

- **Internal links.** Use relative paths or `useBaseUrl`.
- **External links.** Use full absolute URLs.
- **Descriptive link text.** Never "click here" or bare "here."
- **Use "Learn more"** when linking to supplementary Sumo Logic docs.
- **Use "click"** not "click on."

## Code

- **Inline code.** Single backticks for commands, operators, API methods, and error messages.
- **Code blocks.** Triple backticks, always specify the language.
  - `sql` for Sumo Logic queries.
  - `json` for Sumo Logic log examples.
- **Code blocks are for runnable snippets only** -- not for error messages or non-executable output.

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

- **Always include descriptive `alt` text.**
- **Store images in `/static/img/`.**

## Reusable snippets

Shared content lives in `/docs/reuse/`. Import with:

```markdown
import PartialName from '../reuse/filename.md';

<PartialName/>
```

## Branding openers

- **App docs** must open with: "The Sumo Logic app for [Vendor]..."
- **C2C source docs** must open with: "The Sumo Logic source for [Vendor]..."

## Word list quick reference

Fetch the full list at https://www.sumologic.com/help/docs/contributing/word-list/ -- these are the most common gotchas:

- **"check box".** Two words.
- **"plugin".** One word, no hyphen.
- **"dropdown"** (noun), **"drop-down"** (adjective).
- **"setup"** (noun/adjective), **"set up"** (verb).
- **"login"** (noun/adjective), **"log in"** (verb).
- **"email".** One word, no hyphen, lowercase.
- **"JavaScript".** Always camelCase.
- **"data are"** not "data is."
- **"repo".** Acceptable shorthand for "repository."

## Contributing workflow

1. Fork the repo and create a branch from `main`.
2. Edit or add markdown files in `/docs`.
3. Add frontmatter to every new file.
4. Add the page to `sidebars.ts`.
5. Add to the hub/index page if creating a new section page.
6. Add a CID URL mapping in `cid-redirects.json` if needed.
7. Submit a PR to `main`.

---

## Release notes

Release notes are the changelog. They publish to the docs site and to an RSS feed. Keep every note short and link out for detail.

Each product area has its own blog folder: `blog-service`, `blog-collector`, `blog-cse`, `blog-csoar`, `blog-developer`. Copy a recent post in the matching folder as the model for filename, frontmatter, and structure.

Every post filename must start with `YYYY-MM-DD-`. Docusaurus takes the publish date and sort order from that prefix.

### Writing style

- **Open with a direct statement of what changed.** Do not use announcement framing ("We're excited to...", "We are pleased to announce..."). State the change and let it speak for itself.
  - ✅ "Multi-child-org search results now include an `_orgName` field alongside `_orgId`."
  - ❌ "We're excited to announce that multi-child-org search results now include an `_orgName` field."
- **Lead with the benefit.** Say what the reader can now do and why it matters.
- **Be concise.** Two to three sentences for a feature. One sentence per list item.
- **End the opening paragraph with a "Learn more" link** to the relevant doc, using a relative path starting with `/docs/`.
- **Mark breaking changes and prerequisites** with an admonition.
- **Title dates as Month D, YYYY.** Full month name, no ordinal, no leading zero: "March 9, 2026", not "March 9th, 2026" or "March 09, 2026".

### Structure and frontmatter


**Choosing between Service and Developer:** Use Developer when the primary audience is someone writing code to connect to Sumo Logic API endpoints, auth flows, and the MCP server. Use Service when the audience is a Sumo Logic user, even if the feature has an API.

---

## Gotchas

These are Sumo Logic- and repo-specific facts that override general assumptions.

- **No em dashes, ever.** Do not use "--" as a substitution for an em dash either. Rewrite the sentence instead.
- **Site URL is `sumologic.com/help`**, not `help.sumologic.com`. Always use the former in docs and links.
- **`:::training` is a custom Sumo Logic admonition** (purple, graduation cap icon). It is not a standard Docusaurus admonition -- do not treat it like one or omit it.
- **`:::sumo` is also custom.** Standard Docusaurus will not recognize it outside this repo.
- **Never write an H1 in the body.** The `title:` frontmatter generates it. A second H1 breaks the page structure.
- **`/docs/reuse/` pages must not be listed in `sidebars.ts`** and should not be navigable. They are import-only partials.
- **Negative contractions must always be spelled out.** "cannot", "will not", "do not" -- even in casual or conversational tone.
- **After editing, self-review for mid-sentence capitalization.** When removing a word (e.g., "please") before a verb mid-sentence, ensure the following word is not accidentally capitalized. For example, "please file" → "file" (lowercase), not "File".
- **Numbered list items always use `1.`** (not `1.`, `2.`, `3.`). Docusaurus handles rendering.
- **Capitalized product terms.** Collector, Source, Hosted Collector, Library. User-created objects (dashboards, folders) are lowercase.
- **C2C sources and apps have distinct openers.** Do not use the app opener for a source doc or vice versa.
- **Release notes have their own rules.** Apply the section below when writing or editing anything in `blog-service`, `blog-collector`, `blog-cse`, `blog-csoar`, or `blog-developer`. The live style guide at [Release notes](/docs/contributing/style-guide/#release-notes) takes precedence if fetched.
