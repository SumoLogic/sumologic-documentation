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
description: One or two sentences for search engines.
keywords:              # optional but recommended
  - keyword1
  - keyword2
tags:                  # optional
  - tag1
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
