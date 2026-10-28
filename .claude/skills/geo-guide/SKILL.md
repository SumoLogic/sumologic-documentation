---
name: geo-guide
description: SEO and GEO (Generative Engine Optimization) principles and patterns for Sumo Logic documentation in the sumologic-documentation repo. Use when creating or updating a doc to improve Google search visibility and AI citation. Covers search intent, title and description tuning, heading structure, internal links, image alt text, BLUF writing, question-style headings, FAQ sections, and frontmatter keywords. Trigger for requests like "SEO optimize this doc", "GEO optimize this page", "SEO and GEO this folder", "make my doc AI-friendly", "optimize for AI citation", "improve search ranking", "add FAQ schema", or any task about search discoverability or LLM citation of Sumo Logic docs. Do not use for general documentation updates, routine edits, standard page creation, or any PR that does not explicitly ask for SEO, GEO, or AI optimization.
---
 
# SEO + GEO Reference — Sumo Logic Docs
 
## What does this skill do?
 
It improves a doc page on two fronts at once:
 
- **SEO** (Search Engine Optimization): helps Google and other search engines understand the page, match it to the right search intent, and show a strong, clickable result.
- **GEO** (Generative Engine Optimization): helps AI LLM tools to extract and **cite** the page in their answers.

The two overlap heavily: clear intent, answer-first writing, descriptive headings, and self-contained pages help both. Where they pull in different directions, follow the [Reconciling SEO and GEO](#reconciling-seo-and-geo) table.
 
**Be honest about outcomes.** This skill improves the signals and content quality that search engines and LLMs reward. It cannot guarantee a top 5–8 Google position or AI citation, because ranking also depends on backlinks, domain authority, competition, and freshness. Never promise ranking results in PR descriptions or summaries.
 
## When to apply
 
Apply this skill only when the prompt explicitly asks for it. Choose a mode from the wording:
 
| Prompt wording | Mode |
|----------------|------|
| "SEO optimize", "improve search ranking", "improve Google visibility", "optimize meta title/description" | **SEO only** (Part A) |
| "GEO optimize", "make this AI-friendly", "optimize for AI citation", "add FAQ schema", "apply BLUF", "rewrite headings as questions", "add structured metadata" | **GEO only** (Part B) |
| "SEO and GEO", "optimize this doc", "optimize this folder", "make this rank and get cited" | **Both** (Parts A and B) |
 
Do not apply for:
 
- Routine documentation updates, bug fixes, or content corrections
- Standard new page creation without an explicit SEO, GEO, or AI-optimization request
- Pull requests that mention neither SEO, GEO, nor AI citation
- Any task where the prompt does not specifically ask for optimization
If the prompt says only "update the authentication page", make the content change and nothing else. No heading rewrites, no FAQ, no title or description changes.
 
## Workflow
 
### Single doc
 
1. **Read** the page and its frontmatter. Identify the one question the page answers.
2. **Audit** using the [Audit Checklist](#audit-checklist). Note what already passes.
3. **Propose** the changes as a short list (before → after for title, description, and each heading). Wait for approval if running interactively (for example via `/geo-optimize`).
4. **Apply** the approved changes, touching only what the chosen mode covers.
5. **Verify** with the checklist again, then report.

## Audit Checklist
 
**SEO**
- [ ] Page has one clear primary search intent and one primary keyword phrase
- [ ] `title` ≤ 60 characters, primary keyword near the front, unique across the site
- [ ] `description` 140–160 characters, unique, includes the primary keyword naturally
- [ ] Heading hierarchy is clean (one H1 from `title`, then H2 → H3 with no skipped levels)
- [ ] Every image has meaningful alt text
- [ ] Internal links use descriptive anchor text (no "click here")
- [ ] Page links out to 2–5 relevant docs and is linked from at least one parent or sibling page
- [ ] No keyword stuffing; the page reads naturally

**GEO**
- [ ] First sentence of the page and of every section answers the question (BLUF)
- [ ] Page answers exactly one question and is self-contained
- [ ] H2/H3 headings are question-style or "How to" task statements
- [ ] FAQ section with 3–8 distinct, self-contained Q&As
- [ ] `keywords` present in frontmatter

## Frontmatter Template (SEO + GEO optimized)
 
Sumo Logic doc pages live under `/docs/` and follow this pattern:
 
```yaml
---
id: my-page-name
title: How to [Task] with Sumo Logic            # [SEO: Part A.2] [GEO: Principle 3]
sidebar_label: Short Nav Label
description: One sentence, 140-160 characters, answering the page question.   # [SEO: Part A.3] [GEO: Principle 1]
keywords:                                        # [GEO: Principle 5]
  - Sumo Logic
  - feature or product name
  - capability term
---
```
 
When generating optimized frontmatter, add `# [SEO: …]` or `# [GEO: …]` inline comments next to each field you add or change so reviewers can tell optimization edits from standard frontmatter. Remove these comments only if the project's YAML linter rejects them.
 
**Rules:**
 
- `title` is phrased as a "How to" task statement (or a What/Why/Which question for concept pages) and matches the H1 (generated from frontmatter). Use "How to X", not "How do I X".
- `description` is one sentence describing what the feature does and what problem it solves.
- `keywords` include: the integrated product name, Sumo Logic, and 2–3 capability terms (for example: security, monitoring, logs).
- **Never change `id` or `slug` on an existing page** unless the prompt explicitly asks. Changing either changes the URL, breaks inbound links, and can drop existing rankings. If a URL change is truly needed, add a redirect and flag it for human review.
---
 
# Part A — SEO Principles
 
### A.1 — Match search intent
 
Decide what the searcher wants and make the page deliver it in the first screen.
 
- **Procedural intent** ("how to collect X logs") → steps-first page, prerequisites kept short.
- **Conceptual intent** ("what is X") → definition first, then how it works.
- **Troubleshooting intent** ("X not working", "error Y") → symptom, cause, fix, in that order.
- Pick **one primary keyword phrase** (the phrase a user would actually type) plus 2–3 secondary phrases. Use the product's real terminology and common variants (for example, "AWS CloudTrail" and "CloudTrail logs").
- Do not invent keywords. Derive them from the page content, existing headings, and how Sumo Logic and the integrated product name their features.

### A.2 — Title tag (the `title:` field)
 
- Keep to **60 characters or fewer** so it is not truncated in results. Check the Docusaurus site config: if a title suffix such as "| Sumo Logic Docs" is appended automatically, leave room for it.
- Put the primary keyword **near the front**.
- Make it specific and unique. Two pages must never share a title.
- Follow the existing pattern: "How to [Task] with Sumo Logic" for procedures; "What is [Feature] in Sumo Logic?" for concepts. Shorten the task wording if needed to fit 60 characters.

### A.3 — Meta description (the `description:` field)
 
- **140–160 characters.** Longer values get truncated.
- One sentence that says what the user will achieve and for which product. Include the primary keyword naturally.
- Write it as a reason to click: concrete outcome, not "This page describes…".
- Unique per page. Do not copy the first paragraph verbatim.

### A.4 — Heading structure and on-page keywords
 
- One H1 only, generated from `title:`. Never add an H1 in the body.
- H2 → H3 in order. Never skip a level for styling reasons.
- Work the primary keyword into the intro (first 100 words) and into at least one H2, where it reads naturally.
- Use secondary phrases in H2/H3 and body text only where they fit. Never repeat a phrase mechanically.
- Keep paragraphs short (2–4 sentences), use numbered lists for procedures and tables for comparisons. Scannable pages earn longer visits and are easier for engines to excerpt.

### A.5 — Internal and external links
 
- Use **descriptive anchor text** that names the destination ("configure the Sumo Logic Cloud-to-Cloud collector"), never "click here" or "this page".
- Link to 2–5 genuinely related docs (prerequisites, next steps, related features). Internal links help crawlers discover pages and pass authority.
- Verify that every link target exists. Use the repo's relative-link conventions so builds do not break.
- Link to external sources (vendor docs) only when it helps the reader complete the task. Follow existing repo conventions for link attributes.
- If the page is an orphan (no page links to it), flag it in the report.

### A.6 — Images and media
 
- Every informative image gets alt text describing what it shows and why it matters ("Sumo Logic Add Collector dialog with the Cloud-to-Cloud option highlighted"). Decorative images get empty alt text.
- Use descriptive file names (`create-scheduled-search.png`, not `Screenshot-2.png`) for **new** images only. Do not rename existing image files unless asked, since that touches many references.
- Do not add images only for SEO.

### A.7 — Content quality and freshness
 
Search engines and LLMs reward accurate, complete, first-hand technical content.
 
- Every command, setting name, UI label, and limit must be correct. **Never fabricate values, limits, UI paths, or version numbers.** If unsure, leave it out or flag it for a human to confirm.
- Keep version or date-sensitive facts explicit ("as of …", supported versions) only when the source material states them.
- Cover the task fully: prerequisites, steps, expected result, and common errors.
- Remove filler intros ("In today's world…"). BLUF (Principle 1 below) handles this.

### A.8 — Things this skill must not do for SEO
 
- No keyword stuffing, hidden text, or repeating the same phrase unnaturally
- No changes to `id`, `slug`, or file paths without an explicit request and a redirect plan
- No `noindex`, canonical, or sitemap edits unless explicitly asked
- No claims about guaranteed ranking
---
 
# Part B — The Five GEO Principles
 
GEO changes heading style, page structure, frontmatter fields, and content layout in ways that diverge from the standard Sumo Logic style guide. Apply it only when requested (see [When to apply](#when-to-apply)).
 
### Principle 1 — Answer first (BLUF)
 
**Bottom Line Up Front**. The first sentence of every page and every section must answer the question directly before any background, context, or caveats.
 
```markdown
<!-- Before -->
"Scheduled searches are a powerful feature of Sumo Logic that allow you to run searches automatically on a recurring schedule..."
 
<!-- After -->
"Use Scheduled Searches to run a saved search automatically and alert your team when results meet a threshold you define."
```
 
**Rules:**
- Lead every intro and every H2/H3 section with the answer, not the motivation.
- Follow the answer with context, prerequisites, steps, and examples.
- Apply at every section level, not just the top of the page.

### Principle 2 — One page, one question
 
Each page answers exactly one clearly scoped question. AI cannot follow cross-references between pages. A self-contained page is the only page that gets cited.
 
```markdown
<!-- Before — monolithic page -->
"Alerts" — scheduled searches + webhook connections + email notifications all on one page
 
<!-- After — single-question pages -->
"How to create a scheduled search in Sumo Logic"
"How to send Sumo Logic alerts to a webhook"
"How to configure email notifications for Sumo Logic alerts"
```
 
**Rules:**
- If a page covers more than one question, split it. **Splitting pages is a structural change: propose it in the report and wait for approval. Do not split pages automatically in folder mode.**
- Every answer must be complete without requiring the reader to visit another page.
- Cross-link related pages for further reading, but never for required context.

### Principle 3 — Question-style headings
 
Rewrite every H2 and H3 as the question a user would type into an AI tool, or as a "How to" task statement for procedural sections.
 
| Before | After |
|--------|-------|
| `## Prerequisites` | `## What do you need before getting started?` |
| `## Configuration` | `## How to configure [feature] in Sumo Logic` |
| `## Log Collection` | `## How to collect [source] logs in Sumo Logic` |
| `## Dashboards` | `## What dashboards does [feature] include?` |
| `## Limitations` | `## What are the limitations of [feature]?` |
 
**Rules:**
- Use "How to X" for procedural headings (not "How do I X"). Use What, Why, When, or Which for conceptual headings.
- Write headings in the second person or as a neutral task statement, never the first person ("How do I", "What do I need"). FAQ questions follow the rule in [Principle 4](#principle-4--add-faq-sections).
- Include "Sumo Logic" and the feature name where it reads naturally.
- Apply to H2 and H3 only. H1 is generated from `title:` frontmatter.
- **Preserve anchors.** Rewriting a heading changes its auto-generated anchor (`#prerequisites` becomes `#what-do-you-need-before-getting-started`). Search the repo for links to the old anchor and update them, or keep the old anchor with an explicit heading ID (`## New heading {#old-anchor}`) so existing links and external references keep working.

### Principle 4 — Add FAQ sections
 
Every major page ends with a structured FAQ block. These are the highest-value content blocks for AI citation because they match how users query AI tools. They also cover long-tail search phrasings that the main body does not.
 
```markdown
## FAQ
 
### What is [feature name] in Sumo Logic?
[One-sentence BLUF answer.]
 
### How do you [primary task for this page]?
[Direct answer with inline code or steps if relevant.]
 
### What happens if [common error or edge case]?
[Direct answer.]
 
### What are the [feature] limits or quotas?
[Direct answer with specific values where known.]
```
 
**Rules:**
 
- Minimum 3 questions per FAQ but aim for 5 to 8.
- Cover distinct intents (scope, capabilities, limitations, editing, prerequisites), not variations of one question.
- Prefer second person for task questions ("How do you X?", "How to X"). Use first person for personal or eligibility questions ("Can I opt out?", "Do I need a credit card?"). Forcing those into second person ("Can you opt out?") reads like the document interrogating the reader. Answers respond in second person either way.
- Each answer must be fully self-contained. No "see above" or "refer to X".
- Questions must match natural AI query language for the topic.
- Answers must be concise with 1 to 3 sentences.
- **Only write answers supported by the page content or verified facts.** If a limit or quota is unknown, omit that question rather than guessing.

### Principle 5 — Structured metadata and schema markup
 
Add `keywords` to every major documentation page. This is the signal layer AI crawlers read before rendering the page. See the [Frontmatter Template](#frontmatter-template-seo--geo-optimized) above for the full pattern. Per-page JSON-LD schema injection requires a swizzled `@theme/DocItem/Metadata` component that does not yet exist in this repo — scope Principle 5 to `keywords` only until that infrastructure is built.
 
Note: `keywords` is a weak signal for Google ranking. It is kept for GEO and internal consistency. Do not spend effort tuning it for Google, and do not stuff it.
 
 
### AEO patterns
 
These patterns cover answer-engine signals such as featured snippets and "People also ask". Apply them when writing or editing any doc.
 
#### Make facts citation-ready
 
LLMs extract facts stated as short, explicit, standalone sentences.
 
**Hard to cite (buried fact):**
> The integration, which was released in version 3.5 and works with both hosted and installed collectors, supports up to 10,000 events per second depending on the instance size.
 
**Easy to cite (explicit facts):**
> The integration supports up to 10,000 events per second on large instances. It works with both Hosted and Installed Collectors. It was introduced in version 3.5.
 
#### Replace vague version references
 
AI tools reproduce whatever is on the page. Vague references become stale citations.
 
| Vague | Specific |
|-------|----------|
| the latest version | version 3.10 |
| the current release | the May 2026 release |
| recent updates | updates added in Q1 2026 |
 
Use specific versions and dates only when the source material states them (see [A.7](#a7--content-quality-and-freshness)). If the doc intentionally stays version-agnostic, add a note like "See the release notes for the current version number."
 
#### Define acronyms and terms
 
LLMs cannot infer definitions. An undefined acronym or domain term can produce an incorrect expansion in AI-generated answers.
 
Define on first use in body text:
> Sumo Logic uses Field Extraction Rules (FERs) to parse key-value pairs from raw log messages at ingest time.
 
After the first use, the abbreviation alone is fine. Define the term once at its genuine first use (often the opening paragraph). Do not re-expand the same acronym in later tables or sections.
 
---
 
# Reconciling SEO and GEO
 
| Situation | Resolution |
|-----------|------------|
| Title must be ≤ 60 chars but "How to [Task] with Sumo Logic" runs longer | Shorten the task wording. Keep "How to" and "Sumo Logic" if they fit; drop "Sumo Logic" last only if the site title suffix already supplies it |
| Question-style heading vs. keyword-first heading | Use the question or "How to" form and place the keyword inside it |
| "One page, one question" vs. internal-link advice | Both apply: links go to *related* pages for further reading, never for required context |
| FAQ duplicates content already in the body | Keep the FAQ answer short and self-contained; do not copy whole paragraphs |
| FAQ question repeats the page title | Remove it. Title is the page question; FAQ entries are sub-questions |
| Pushing a keyword hurts readability | Readability wins. Drop the keyword placement |
 
---
 
## Gotchas
 
GEO and SEO changes restructure pages in ways that are intentional for discoverability but inconsistent with the standard Sumo Logic style guide. Applying them to the wrong pull requests creates review noise and style drift. Only apply this skill when the prompt explicitly asks for it. Trigger phrases are listed above.
 
- **`title:` and FAQ questions must not overlap**. The title is the page-level question; FAQ entries are sub-questions. Repeating the title as a FAQ question adds no citation value.
- **Keep `description:` between 140–160 characters**. Crawlers truncate longer values and may ignore the field entirely.
- **Keep `title:` at 60 characters or fewer**, and unique across pages.
- **Never write an H1 in the body**. The `title:` frontmatter generates the H1. A second H1 in the body breaks page structure and GEO.
- **Do not apply this skill to `docs/reuse/` partials.** These files are import-only snippets and are never crawled directly. Apply it only to the parent page that imports them.
- **Do not change `id`, `slug`, or file paths** of existing pages. Doing so breaks URLs and rankings.
- **Do not break anchors.** Heading rewrites change anchors; update inbound links or preserve the old anchor.
- **Do not fabricate facts.** No invented limits, defaults, UI labels, or versions in descriptions, FAQs, or alt text.
- **Do not alter code blocks, commands, queries, or JSON samples** while optimizing prose.
- **Folder runs: keep titles and descriptions unique.** Duplicates across pages weaken both SEO and citation value.
## Output Report
 
After every run, finish with a short report:
 
```
Mode: SEO | GEO | Both
Pages changed: N
Pages skipped: N (reason)
Per page: title (old → new), description length, headings rewritten, FAQ added (Y/N), images given alt text
Needs human review: page splits, overlapping pages, orphan pages, link/anchor updates, any facts not verified
```
 
Do not claim ranking or citation improvements in the report. Describe only what changed.
 
## Cross-References
 
Related tooling and guidance:
 
- **`/geo-optimize`**. Interactive command for applying SEO and GEO improvements to a doc. Proposes changes and waits for approval before implementing.
- **`/seo-audit`**. Audit command that checks SEO/AEO/GEO signals and can hand off to `/geo-optimize` when improvements are needed.
- **Public style guide**. Human-readable AEO and GEO guidance:
  - [AEO (Answer Engine Optimization)](https://www.sumologic.com/help/docs/contributing/style-guide/#aeo-answer-engine-optimization)
  - [GEO (Generative Engine Optimization)](https://www.sumologic.com/help/docs/contributing/style-guide/#geo-generative-engine-optimization)
