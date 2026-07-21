# SEO/AEO/GEO Audit — Search and AI Discoverability Check

Audits documentation for search engine optimization (SEO), answer engine optimization (AEO), and generative engine optimization (GEO) signals. Produces a prioritized report and offers to apply fixes.

## What this command does

When you invoke `/seo-audit`, Claude will:

1. **Read the specified file or directory**
2. **Check SEO signals**. Title length, meta description, keywords, heading structure
3. **Check AEO signals**. Question-format headings, direct answers, featured snippet readiness
4. **Check GEO signals**. Authoritative statements, structured facts, LLM citation patterns
5. **Check internal linking**. Presence of links, descriptive anchor text
6. **Generate a prioritized report**. Issues ranked by impact
7. **Offer to fix issues**. Apply improvements with user approval

## When to use this command

* Before submitting a PR for new or updated content
* Auditing a section or category for discoverability gaps
* Preparing docs for a product launch or announcement
* Quarterly content health checks
* After rewriting or restructuring a doc

## Signal definitions

**SEO** (Search Engine Optimization): signals that help traditional search engines rank and surface pages.

**AEO** (Answer Engine Optimization): signals that help search engines display the page as a direct answer (featured snippets, knowledge panels, "People also ask" boxes).

**GEO** (Generative Engine Optimization): signals that help LLM-powered tools (ChatGPT, Perplexity, Gemini, Claude) cite and quote the page accurately in generated responses.

---

## Workflow

### Step 1: Identify the file or directory

If the user provides a file path, read that file. If they provide a directory, find all `.md` files in it and audit each one, then produce a summary.

If no argument is given, ask the user for the file path.

### Step 2: Read the file(s)

Use the Read tool to read the complete file content including frontmatter.

### Step 3: Run SEO checks

**Frontmatter**

* [ ] `title` present
* [ ] `title` is under 60 characters — **Critical** if missing or over 60
* [ ] `title` includes the primary keyword or product/feature name
* [ ] `description` present — **Critical** if missing
* [ ] `description` is 140–160 characters — **Warning** if under 100 or over 160; **Suggestion** if 100–139 (functional but below target)
* [ ] `description` leads with an action verb or product name (not "This page" or "This doc")
* [ ] `keywords` field present with 3–5 relevant terms — **Suggestion** if missing
* [ ] No `slug` on a regular content page (breaks sidebar linking) — **Critical** if present

**Headings**

* [ ] No H1 in body — title frontmatter generates H1; a second H1 breaks SEO — **Critical** if present
* [ ] H2 used for main sections; no skipped heading levels (H2 → H4 without H3) — **Warning** if skipped
* [ ] At least 2 H2 headings for pages over 500 words — **Suggestion** if none
* [ ] No duplicate headings at the same level — **Warning** if duplicated
* [ ] Headings are under 60 characters — **Suggestion** if over

**Content**

* [ ] First paragraph (after frontmatter) is substantive — tells the reader what the doc covers, why it matters, and who it is for — **Warning** if it is thin (under 50 words) or just restates the title
* [ ] Page has at least one internal link to a related doc — **Warning** if none
* [ ] Internal link anchor text is descriptive (not "click here" or "here") — **Warning** if bare
* [ ] No bare external URLs — wrap in markdown link syntax — **Warning** if present

**Images**

* [ ] All images have non-empty `alt` text — **Critical** if missing
* [ ] Alt text describes the image content, not just "screenshot" or the filename — **Warning** if generic

### Step 4: Run AEO checks

AEO focuses on getting content surfaced as direct answers in search results.

* [ ] At least one H2 heading is phrased as a question (e.g., "What is X?", "How do I configure Y?") or implies a clear question — **Suggestion** if none for docs over 600 words
* [ ] The first 1–2 sentences directly state what the subject is or what the doc accomplishes — **Warning** if the intro buries the answer
* [ ] At least one structured list (bulleted or numbered) on pages over 400 words — **Suggestion** if none (search engines extract lists for "People also ask" answers)
* [ ] At least one definition or "X is..." or "X means..." statement for concept-heavy docs — **Suggestion** if absent
* [ ] Tables used where comparing options or listing parameters — **Suggestion** if prose is used instead

### Step 5: Run GEO checks

GEO focuses on getting content cited accurately by AI tools. Check the doc against the **Five GEO Principles** defined in [`geo-guide/SKILL.md`](.claude/skills/geo-guide/SKILL.md) — question-style headings and `keywords` are already covered by Step 4 (AEO checks) and Step 3 (Frontmatter). Step 4 also checks whether the page's opening states the answer directly, but BLUF applies at every section level, so check the remaining ground here:

* [ ] Each major H2 and H3 section leads with a direct answer to what it covers, not just the page's opening (answer-first / BLUF) — **Warning** if sections bury the answer in setup or context first
* [ ] Page answers one clearly scoped question — **Suggestion** if it covers multiple distinct questions that should be split into separate pages
* [ ] Page is self-contained without requiring another page for required context (one page, one question) — **Suggestion** if heavy pronoun or implicit cross-reference dependency found
* [ ] Page has an FAQ section — **Suggestion** if absent

Also check these signals, which the GEO skill does not cover:

* [ ] Key facts are stated explicitly as standalone sentences (not buried in subordinate clauses) — **Suggestion** to restructure if found
* [ ] Numbers, version references, and dates are stated directly — **Warning** if "latest" or "current" is used without a specific value that an AI could cite
* [ ] The page has an "At a glance" or "Key facts" or comparable summary section — **Suggestion** if absent for pages over 800 words
* [ ] Key terms are defined on first use — **Suggestion** if acronyms or jargon appear without explanation

### Step 6: Generate report

Use this format:

```
SEO/AEO/GEO Audit Report
File: {file_path}
Date: {current_date}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{pass_count} checks passed
{warning_count} warnings
{critical_count} critical issues
{suggestion_count} suggestions

Discoverability score: {Pass | Needs work | At risk}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CRITICAL ISSUES (fix before merging)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{critical_issues with specific field names and values}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WARNINGS (should fix)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{warnings with line numbers and suggested fixes}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUGGESTIONS (recommended for better AI visibility)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{suggestions with specific examples}
```

### Step 7: Offer to apply fixes

After presenting the report, ask:

1. **Fix all critical issues** — fix missing/invalid frontmatter fields, add alt text
2. **Fix specific issues** — user selects which ones
3. **Run `/geo-optimize`** — if the doc has multiple GEO suggestions, recommend this command
4. **Export report** — save findings as a checklist for the PR description

Do not modify files without explicit user approval.

---

## Issue reference

### Critical

| Issue | Why it matters |
|-------|---------------|
| Missing `description` | Search engines cannot generate a preview snippet; AI tools have no summary to cite |
| Missing `title` | Page cannot be indexed or linked properly |
| `title` over 60 chars | Truncated in search results; first 60 chars carry the most weight |
| H1 in body | Duplicate H1 confuses search engines and breaks page structure |
| Missing image alt text | Accessibility failure; images are invisible to search crawlers |

### Warnings

| Issue | Why it matters |
|-------|---------------|
| `description` under 100 chars | Too short to be a useful snippet; search engine may auto-generate a worse one |
| `description` over 160 chars | Truncated in search results |
| `description` starts with "This page" | Wastes the most-crawled part of the snippet on filler |
| No internal links | Reduces topical authority; orphaned pages rank lower |
| Vague opening paragraph | AI tools and featured snippet algorithms skip to the first clear answer |
| Sections bury the answer in setup or context first | BLUF applies at every section level, not just the page's opening |
| "latest" or "current" without a version | AI tools reproduce stale references; be specific |

### Suggestions

| Issue | Why it matters |
|-------|---------------|
| `description` is 100–139 chars | Functional but below the 140–160 target; AI crawlers get less to cite |
| No `keywords` field | Missed opportunity to guide indexing |
| No question-format headings | Featured snippets and "People also ask" prefer question/answer structure |
| No "At a glance" section | LLMs prefer pages with scannable summaries they can cite verbatim |
| No FAQ section | FAQ blocks are the highest-value content for AI citation; see `geo-guide/SKILL.md` |
| Heavy cross-reference dependency | AI tools cannot follow links; a page that isn't self-contained won't be cited accurately |
| Page covers multiple distinct questions | AI cannot follow cross-references; only a single-question page gets cited — split it |
| No structured lists | Lists are extracted preferentially for featured snippets |
| Unexplained acronyms | AI tools may generate incorrect expansions; define them |

---

## Directory audit

When auditing a directory, produce a summary table:

```
File | Critical | Warnings | Suggestions | Score
-----|----------|----------|-------------|------
cloudtrail.md | 0 | 2 | 3 | Pass
okta.md | 1 | 4 | 2 | Needs work
```

Then ask if the user wants to drill into any specific file.

---

## Tips

* Run this before `/audit-doc` to prioritize discoverability fixes first
* Run this after `/geo-optimize` to verify improvements were applied
* For batch fixes on description length, `/seo-audit` + `/geo-optimize` together cover most GEO gaps
* Pair with `/tone-check` for comprehensive pre-PR review

---

## Related commands

`/seo-audit` checks discoverability signals only. For a full quality check, run both:

* **`/audit-doc`** — structure, required sections, broken links, frontmatter completeness, style guide
* **`/geo-optimize`** — apply GEO improvements after this audit identifies gaps
* **`/tone-check`** — voice and tone check (standalone; not covered here)
