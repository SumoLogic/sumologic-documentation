# GEO Optimize — Generative Engine Optimization (AEO + GEO)

Rewrites and restructures documentation to improve discoverability in AI-powered search tools (ChatGPT, Perplexity, Gemini, Claude, and similar) and to surface content as direct answers in traditional search results. Covers both **AEO** (Answer Engine Optimization — featured snippets, "People also ask") and **GEO** (Generative Engine Optimization — LLM citation and extraction).

## What this command does

When you invoke `/geo-optimize`, Claude will:

1. **Read the doc**
2. **Diagnose the current state**. Identify AEO and GEO gaps before making changes
3. **Propose specific improvements**. Show the user what will change and why
4. **Apply approved changes**. Rewrite only the sections the user approves
5. **Validate the result**. Confirm the doc is more answer- and citation-ready without breaking accuracy

## When to use this command

* New docs for features that are frequently searched in AI tools or voice search
* High-traffic docs that rarely appear in AI-generated answers or featured snippets
* Concept and reference docs where accuracy and citability matter most
* After `/seo-audit` flags AEO or GEO suggestions
* Before a product launch to maximize early visibility

## What this command does NOT change

* Technical accuracy — never alter facts, steps, code, or configuration values
* Voice and tone — keep the Sumo Logic style; do not introduce formal or robotic language
* Doc structure beyond adding or enhancing specific sections
* Content the user has not approved

---

## Workflow

### Step 1: Get the file

Ask for the file path if not provided. Read the complete file including frontmatter.

### Step 2: Diagnose AEO and GEO gaps

Before proposing changes, assess the doc against the **Five GEO Principles** defined in [`geo-guide/SKILL.md`](.claude/skills/geo-guide/SKILL.md) — answer-first (BLUF), one page one question, question-style headings, FAQ sections, and structured metadata — and tell the user what you found.

Also check these AEO-specific signals, which the GEO skill does not cover:

**Factual density**
LLMs prefer pages where key facts are stated explicitly as short, standalone sentences.
- Are definitions buried in subordinate clauses?
- Are numbers and specifications stated directly?
- Does the doc use "latest", "current", or "recent" without a specific version or date?

**Structured content**
Lists, tables, and short Q&A pairs are extracted by AI more reliably than prose paragraphs.
- Does the doc have lists for things that are enumerable?
- Does it have a table for comparisons, parameters, or options?
- Are key terms defined with explicit "X is..." or "X means..." sentences?

**Summary section**
Pages with an "At a glance", "Key facts", or "Overview" section near the top get cited more often because the summary is the most citation-friendly portion.
- Does the doc have such a section?
- Is it near the top?

### Step 3: Propose improvements

Present a numbered list of proposed changes. For each one, show:
- What section is affected
- What the current content looks like (short excerpt)
- What the improved version would look like
- Why this helps GEO

Do not apply any change until the user approves.

**Example proposal format:**

```
Proposed changes for: docs/send-data/collect-from-other-data-sources/collect-logs-from-cloudwatch.md

1. Strengthen the opening paragraph (GEO: direct answer, self-contained)
   Current: "This page explains how to collect logs from Amazon CloudWatch using Sumo Logic."
   Proposed: "Sumo Logic collects logs from Amazon CloudWatch through an AWS Lambda function
   that subscribes to CloudWatch Log Groups and forwards log data to an HTTP Source. You can
   collect from any log group in your AWS account, including VPC Flow Logs, Route 53 query
   logs, and custom application logs."
   Why: The current opener says nothing an LLM could cite. The proposed version states the
   mechanism and scope explicitly.

2. Add "At a glance" section after the intro (GEO: summary, structured)
   Proposed addition:
   ## At a glance
   - **What it does**: Forwards CloudWatch logs to Sumo Logic in near real-time.
   - **How it works**: AWS Lambda subscribes to CloudWatch Log Groups and sends data to
     a Sumo Logic HTTP Source.
   - **Supported log types**: VPC Flow Logs, Route 53, Lambda, custom application logs.
   - **Prerequisites**: AWS IAM permissions for Lambda and CloudWatch; a Sumo Logic HTTP Source.

3. Convert "Features" prose to a bulleted list (GEO: structured data)
   ...
```

### Step 4: Apply approved changes

After the user confirms which changes to make:

1. Apply each change using the Edit tool
2. Preserve all technical content exactly
3. Do not change heading levels or alter the sidebar entry
4. Do not add a `slug` field
5. After all edits, read the file back and confirm the changes look correct

### Step 5: Suggest follow-up

After applying changes, tell the user:
- Which checks in `/seo-audit` this resolves
- Whether any remaining GEO suggestions need a larger rewrite (offer to rewrite the opening paragraph if it needed major work)

---

## GEO improvement patterns

Full rules and examples for each pattern live in [`geo-guide/SKILL.md`](.claude/skills/geo-guide/SKILL.md). Use this table as a quick reference when proposing changes.

| Pattern | What it addresses | Rule source |
|---------|------------------|-------------|
| Strengthen the opening paragraph | Weak openers that bury the point | [Principle 1 — Answer first (BLUF)](.claude/skills/geo-guide/SKILL.md#principle-1--answer-first-bluf) |
| Add an "At a glance" section | No citable summary near the top | [Principle 1 — Answer first (BLUF)](.claude/skills/geo-guide/SKILL.md#principle-1--answer-first-bluf) |
| Reframe headings as questions | Section headings that don't signal the question being answered | [Principle 3 — Question-style headings](.claude/skills/geo-guide/SKILL.md#principle-3--question-style-headings) |
| Make facts citation-ready | Key facts buried in long sentences | [AEO patterns — Make facts citation-ready](.claude/skills/geo-guide/SKILL.md#make-facts-citation-ready) |
| Replace vague version references | "latest", "current", "recent" without specifics | [AEO patterns — Replace vague version references](.claude/skills/geo-guide/SKILL.md#replace-vague-version-references) |
| Define acronyms and terms | Undefined abbreviations or domain terms | [AEO patterns — Define acronyms and terms](.claude/skills/geo-guide/SKILL.md#define-acronyms-and-terms) |

---

## What not to change

* **Code blocks** — never alter code, commands, or configuration values
* **Step-by-step instructions** — do not reorder or reword steps; only improve surrounding prose
* **Product names and proper nouns** — do not rephrase "Cloud SIEM" or "Hosted Collector"
* **Warnings, notes, and admonitions** — these are already structured for extraction; leave them
* **Tables** — do not convert tables to prose; they are already GEO-friendly

---

## Safety principles

* Present a proposal and wait for approval before editing
* Preserve technical accuracy above all else — if a rewrite would require fact-checking, flag it and ask the user to verify
* Do not alter frontmatter except `description` if explicitly requested
* Keep the Sumo Logic voice — do not make the doc sound like a Wikipedia article
* If a section is very long and difficult to restructure safely, flag it and ask the user how they'd like to proceed instead of attempting a full rewrite here
