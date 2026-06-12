# SEO/AEO/GEO Audit — Search and AI Discoverability Check

Use this command to audit a doc for SEO, AEO, and GEO signals — run it before any PR on new or updated content, even if you're not focused on search optimization.

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

* [ ] `title` is under 60 characters — **Critical** if over 60
* [ ] `title` includes the primary keyword or product/feature name
* [ ] `description` is 140–160 characters — **Warning** if shorter than 100 or longer than 160
* [ ] `description` leads with an action verb or product name (not "This page" or "This doc")
* [ ] `keywords` field present with 3–5 relevant terms — **Suggestion** if missing
* [ ] No `slug` on a regular content page (breaks sidebar linking) — **Critical** if present

**Headings**

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

GEO focuses on getting content cited accurately by AI tools.

* [ ] Opening paragraph provides a direct, factual, self-contained answer to "what is [subject]" or "how to [task]" — **Warning** if the opening is vague or purely navigational
* [ ] Key facts are stated explicitly as standalone sentences (not buried in subordinate clauses) — **Suggestion** to restructure if found
* [ ] Numbers, version references, and dates are stated directly — **Warning** if "latest" or "current" is used without a specific value that an AI could cite
* [ ] The page has an "At a glance" or "Key facts" or comparable summary section — **Suggestion** if absent for pages over 800 words
* [ ] The doc is self-contained enough to be understood without following links — **Suggestion** if heavy pronoun or implicit cross-reference dependency found
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
| `slug` on regular page | Overrides URL derived from file path; breaks sidebar linking |

### Warnings

| Issue | Why it matters |
|-------|---------------|
| `description` under 100 chars | Too short to be a useful snippet; search engine may auto-generate a worse one |
| `description` over 160 chars | Truncated in search results |
| `description` starts with "This page" | Wastes the most-crawled part of the snippet on filler |
| No internal links | Reduces topical authority; orphaned pages rank lower |
| Vague opening paragraph | AI tools and featured snippet algorithms skip to the first clear answer |
| "latest" or "current" without a version | AI tools reproduce stale references; be specific |

### Suggestions

| Issue | Why it matters |
|-------|---------------|
| No `keywords` field | Missed opportunity to guide indexing |
| No question-format headings | Featured snippets and "People also ask" prefer question/answer structure |
| No "At a glance" section | LLMs prefer pages with scannable summaries they can cite verbatim |
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

* Run this after `/geo-optimize` to verify improvements were applied
* For batch fixes on description length, `/seo-audit` + `/geo-optimize` together cover most GEO gaps

---

## Related commands

`/seo-audit` checks discoverability signals only. For a full quality check, run both:

* **`/audit-doc`** — structure, required sections, broken links, frontmatter completeness, style guide
* **`/geo-optimize`** — apply GEO improvements after this audit identifies gaps
