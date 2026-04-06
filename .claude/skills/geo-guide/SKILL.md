---
name: geo-guide
description: GEO (Generative Engine Optimisation) principles and patterns for Sumo Logic documentation in the sumologic-documentation repo. Use when creating or updating docs to rewrite headings as questions, adding FAQ sections, applying BLUF writing style, or adding JSON-LD schema markup to Docusaurus frontmatter. Also trigger for requests like "make my app doc AI-friendly", "optimise for AI citation", "add FAQ schema", or any task involving GEO, structured metadata, or discoverability of Sumo Logic docs for LLMs. Do not use for general documentation updates, routine edits, standard page creation, or any PR that does not explicitly ask for GEO or AI optimisation. 
---

# GEO Reference — Sumo Logic Docs

## What is GEO?

GEO optimises documentation so AI tools like ChatGPT, Perplexity, and Gemini **cite your content** in their answers. Unlike SEO which targets search rankings, GEO targets AI citation frequency.

## Frontmatter Template (GEO-optimised)

GEO changes heading style, page structure, frontmatter fields, and content layout in ways that diverge from the standard Sumo Logic style guide. Apply it only when explicitly requested. Apply GEO when the prompt contains phrases like:

- "optimise for AI citation"
- "GEO optimise this page"
- "make this doc AI-friendly"
- "make this citable by AI tools"
- "add FAQ schema"
- "add JSON-LD" 
- "add structured metadata"
- "apply BLUF" 
- "rewrite headings as questions"

Do not  apply GEO for:
- Routine documentation updates, bug fixes, or content corrections 
- Standard new page creation without an explicit AI-optimisation request
- Pull requests that mention SEO but not GEO or AI citation
- Any task where the prompt does not specifically ask for GEO

Sumo Logic doc pages live under `/docs/` and follow this frontmatter pattern:

```yaml
---
  id: my-page-name
  title: How Do I [Task] with Sumo Logic? 
  sidebar_label: Short Nav Label
  description: One sentence answering the page question for AI crawlers and search engines. 
  keywords: 
    - Sumo Logic
    - feature or product name
    - capability term
  head:
    - tagName: script
      attributes:
        type: application/ld+json
      innerHTML: |
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Your first question here?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Your plain-text answer here." 
              }
            },
            {
              "@type": "Question",
              "name": "Your second question here?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Your plain-text answer here."
              }
            }
          ]
        }
---
```

When generating GEO-optimised frontmatter, add # [GEO: Principle N] inline comments next to each GEO-specific field so reviewers can immediately distinguish GEO additions from standard frontmatter fields. Remove these comments only if the project's YAML linter rejects them.

**Rules:**

- `title` is phrased as a question and matches the H1 (generated from frontmatter ).
- `description` is one sentence describing what the feature does and what problem it solves.
- `keywords` include: the integrated product name, Sumo Logic, and 2–3 capability terms (for example: security, monitoring, logs).
- `mainEntity` in the JSON-LD must mirror the FAQ section at the bottom of the page body to keep them in sync.
- FAQ answers in JSON-LD must be plain text.

## The Five GEO Principles

### Principle 1 — Answer first (BLUF)

**Bottom Line Up Front**. The first sentence of every page and every section must answer the question directly before any background, context, or caveats.

```markdown
<!-- Before -->
"Scheduled searches are a powerful feature of Sumo Logic that allow you to run searches automatically on a recurring schedule..."

<!-- After -->
Use Scheduled Searches to run a saved search automatically and alert your team when results meet a threshold you define.
```

**Rules:**
- Lead every intro and every H2/H3 section with the answer, not the motivation.
- Follow the answer with context, prerequisites, steps, and examples.
- Apply at every section level, not just the top of the page.

### Principle 2 — One page, one question

Each page answers exactly one clearly scoped question. AI cannot follow cross-references between pages, a self-contained page is the only page that gets cited.

```markdown
<!-- Before — monolithic page -->
"Alerts" — scheduled searches + webhook connections + email notifications all on one page

<!-- After — single-question pages -->
"How do I create a scheduled search in Sumo Logic?"
"How do I send Sumo Logic alerts to a webhook?"
"How do I configure email notifications for Sumo Logic alerts?"
```

**Rules:**
- If a page covers more than one question, split it.
- Every answer must be complete without requiring the reader to visit another page.
- Cross-link related pages for further reading, but never for required context.

### Principle 3 — Question-style headings

Rewrite every H2 and H3 as a question a user would type into an AI tool.

| Before | After |
|--------|-------|
| `## Prerequisites` | `## What do I need before getting started?` |
| `## Configuration` | `## How do I configure [feature] in Sumo Logic?` |
| `## Log Collection` | `## How do I collect [source] logs in Sumo Logic?` |
| `## Dashboards` | `## What [feature] does the dashboards include?` |
| `## Limitations` | `## What are the limitations of [feature]?` |

**Rules:**
- Start headings with How, What, Why, When, or Which.
- Include "Sumo Logic" and the feature name where it reads naturally.
- Apply to H2 and H3 only. H1 is generated from `title:` frontmatter.

### Principle 4 — Add FAQ sections

Every major page ends with a structured FAQ block. These are the highest-value content blocks for AI citation because they match how users query AI tools.

```markdown
## Frequently asked questions

### What is [feature name] in Sumo Logic?
[One-sentence BLUF answer.]

### How do I [primary task for this page]?
[Direct answer with inline code or steps if relevant.]

### What happens if [common error or edge case]?
[Direct answer.]

### What are the [feature] limits or quotas?
[Direct answer with specific values where known.]
```

**Rules:**
- Minimum 3 questions per FAQ but aim for 5 to 8.
- Each answer must be fully self-contained. No "see above" or "refer to X".
- Questions must match natural AI query language for the topic.
- Answers must be concise with 1 to 3 sentences.
- Every FAQ entry must have a matching entry in the JSON-LD `mainEntity` array.

### Principle 5 — Structured metadata and schema markup

Add `keywords` and JSON-LD FAQ schema to every major documentation page. See the [Frontmatter Templates](#frontmatter-templates) above for the full patterns This is the signal layer AI crawlers read before rendering the page.

## Gotchas

These are GEO-specific behaviors that differ from standard doc authoring. Apply GEO only when explicitly requested. GEO restructures pages in ways that are intentional for AI citation but inconsistent with the standard Sumo Logic style guide. Applying it to the wrong pull requests creates review noise and style drift.

Only apply GEO when the prompt explicitly asks for it. Trigger phrases are listed in above. If a prompt asks you to "update the authentication page" with no mention of GEO, AI citation, or structured metadata, make the content change only. Do not add JSON-LD, do not rewrite headings as questions, do not add an FAQ section.

These are GEO-specific behaviors that differ from standard doc authoring in this repository.

- **JSON-LD answers must be plain text**. No Markdown, no HTML tags inside `"text":` values. Bold, code fences, and links will break schema validation.
- **`title:` and JSON-LD FAQ questions must not overlap**. The title is the page level question but FAQ entries are sub-questions. Repeating the title as a FAQ question adds no citation value.
- **Keep `description:` under 160 characters**. AI crawlers truncate longer values and may ignore the field entirely.
- **FAQ section and `mainEntity` array must stay in sync**. Adding a question to the body FAQ requires a matching entry in the JSON-LD, and vice versa.
- **Never write an H1 in the body**. The `title:` frontmatter generates the H1. A second H1 in the body breaks page structure and GEO.
- **Do not apply GEO to `docs/reuse/` partials.** These files are import-only snippets and are never crawled directly. Apply GEO only to the parent page that imports them.