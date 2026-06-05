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

Before proposing changes, assess the doc against these signals and tell the user what you found:

**AEO signals** (featured snippets, "People also ask", direct answer boxes)
- Are any H2 or H3 headings phrased as questions (e.g., "What is X?", "How do I configure Y?")?
- Does the first paragraph directly answer the implied question a user would search for?
- Are there structured lists or tables that search engines can extract as direct answers?
- Are key terms defined with explicit "X is..." or "X means..." sentences?

**Opening paragraph quality** (AEO + GEO)
An LLM and a featured snippet algorithm both scan the first 1–3 sentences first. Check:
- Does it directly answer "what is [subject]" or "what does [subject] do"?
- Is it self-contained (understandable without reading anything else)?
- Does it avoid filler openers like "This document covers..." or "Welcome to..."?

**Factual density** (GEO)
LLMs prefer pages where key facts are stated explicitly as short, standalone sentences.
- Are definitions buried in subordinate clauses?
- Are numbers and specifications stated directly?
- Does the doc use "latest", "current", or "recent" without a specific version or date?

**Structured content**
Lists, tables, and short Q&A pairs are extracted by AI more reliably than prose paragraphs.
- Does the doc have lists for things that are enumerable?
- Does it have a table for comparisons, parameters, or options?
- Are there H2 or H3 headings phrased as questions?

**Summary section**
Pages with an "At a glance", "Key facts", or "Overview" section near the top get cited more often because the summary is the most citation-friendly portion.
- Does the doc have such a section?
- Is it near the top?

**Self-containedness**
AI tools cannot follow links. If the doc depends on the reader having read another page first, an AI cannot synthesize it correctly.
- Does the doc explain its own prerequisites briefly?
- Are acronyms defined on first use?
- Would a reader with no context understand the key points?

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
- Whether any remaining GEO suggestions need a larger rewrite (offer `/rewrite-intro` if the opening paragraph needed major work)
- Whether the doc would benefit from a `/tone-check` pass afterward

---

## GEO improvement patterns

### Pattern 1: Strengthen the opening paragraph

The opening paragraph is the highest-leverage GEO change. LLMs pull from the first few sentences more than anywhere else on the page.

**Weak opener (do not leave as-is):**
> This document provides information about configuring the AWS Observability solution.

**Strong opener:**
> The Sumo Logic AWS Observability solution collects metrics and logs from Amazon Web Services, including EC2, RDS, ELB, and Lambda, and correlates them in pre-built dashboards. It uses CloudFormation templates to deploy collectors automatically, requiring no manual source configuration.

Rules for a strong GEO opener:
- State what the subject is or does in the first sentence
- State the mechanism, scope, or key capability in the second sentence
- Do not start with "This document", "This page", "Overview", or "Welcome"
- Aim for 2–4 sentences, 50–100 words

### Pattern 2: Add an "At a glance" section

Place this immediately after the opening paragraph for docs over 600 words.

```markdown
## At a glance

- **What it does**: [One sentence — the core capability]
- **How it works**: [One sentence — the mechanism]
- **Supported [versions/types/platforms]**: [Specific list]
- **Prerequisites**: [Specific list]
- **Limitations**: [Key limits, if any]
```

Adapt the labels to fit the doc type. For reference docs, use "Key fields" or "Parameters at a glance." For how-to guides, use "Before you begin."

### Pattern 3: Reframe headings as questions

AI tools and featured snippet algorithms favor pages where headings signal the question being answered.

| Original heading | Question-format alternative |
|-----------------|----------------------------|
| Overview | What is [feature]? |
| How it works | How does [feature] work? |
| Prerequisites | What do you need before you start? |
| Limitations | What are the limitations of [feature]? |
| Troubleshooting | Why is [feature] not working? |

Only reframe headings where the question form is natural and specific. Do not reframe step headings like "Step 1: Configure the source" — those are correct as-is.

### Pattern 4: Make facts citation-ready

LLMs extract facts that are stated as short, explicit, standalone sentences.

**Hard to cite (buried fact):**
> The integration, which was released in version 3.5 and works with both hosted and installed collectors, supports up to 10,000 events per second depending on the instance size.

**Easy to cite (explicit facts):**
> The integration supports up to 10,000 events per second on large instances. It works with both Hosted and Installed Collectors. It was introduced in version 3.5.

### Pattern 5: Replace vague version references

AI tools reproduce whatever is on the page. Vague references become stale citations.

| Vague | Specific |
|-------|----------|
| the latest version | version 3.10 |
| the current release | the May 2026 release |
| recent updates | updates added in Q1 2026 |

If the doc intentionally stays version-agnostic, add a note like "See the release notes for the current version number."

### Pattern 6: Define acronyms and terms

LLMs cannot infer definitions. If an acronym or domain term appears without definition, an AI may generate an incorrect expansion.

Define on first use in body text:
> Sumo Logic uses Field Extraction Rules (FERs) to parse key-value pairs from raw log messages at ingest time.

After the first use, the abbreviation alone is fine.

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
* If a section is very long and difficult to restructure safely, recommend `/rewrite-intro` or `/simplify` instead of attempting a full rewrite here
