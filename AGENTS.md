# AGENTS.md — sumologic-documentation

This file is the canonical source of context and guardrails for AI coding agents (Claude Code, Cursor, GitHub Copilot, Codex, etc.) working in this repository. `CLAUDE.md` is a one-line pointer to this file, kept only because Claude Code looks for that filename specifically.

## Project Overview
Open-source Sumo Logic documentation site built with Docusaurus 3.
Docs live in /docs, written in Markdown. Contributions follow the Sumo Logic style guide.

## Repository
https://github.com/SumoLogic/sumologic-documentation

## Directory Conventions

| What | Where |
|------|-------|
| Docs pages | `/docs/<category>/<filename>.md` |
| Images | `/static/img/<category>/` |
| Service release notes | `/blog-service/` |
| Collector release notes | `/blog-collector/` |
| CSE release notes | `/blog-cse/` |
| C2C source docs | `/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/` |
| App integration docs | `/docs/platform-services/automation-service/app-central/integrations/` |
| Sidebar config | `sidebars.ts` |

## Frontmatter

Every doc requires at minimum: `id`, `title`, `description`. New docs also need a `sidebar_label` if the title is long.

**CRITICAL**: Never add a `slug` field unless explicitly requested — it overrides the URL path derived from the file location.

## Commands

- **Start dev server**: `yarn start` — use this to preview changes locally

## Pull Requests
**CRITICAL REQUIREMENT**: Before creating ANY PR, MUST read `.github/PULL_REQUEST_TEMPLATE.md` and use EXACT checkbox labels from that file.

**Non-negotiable rules:**
1. **Read template first** - Get current checkbox labels from `.github/PULL_REQUEST_TEMPLATE.md` (never guess or use old labels)
2. **Use exact text** - Copy checkbox labels verbatim from the template file. Example current labels: "Minor Changes", "Update Content", "New Content", "Site and Tools" — but always read the file, these may be outdated.
3. **Keep all checkboxes** - Pre-check one box, leave all four in the list
4. **PR title format**: `TICKET - Description` (e.g., `DOCS-1234 - Add PostgreSQL app`)
5. **Ask for ticket number** - Always ask for a Jira ticket before creating a PR, and offer to create one if the user doesn't have one. Exception: this ticket requirement is optional for quick typo fixes.
6. **Full Jira URL** - Use `https://sumologic.atlassian.net/browse/DOCS-1234` not ticket number alone

## Git Rules
**CRITICAL**: Never commit, merge, or push changes without explicit user approval — even if auto-accept is enabled. Always ask first.

Before merging any PR, provide the user with the commit description and wait for explicit approval.

Before pushing any commit that changes docs content:
1. Run `yarn start` (if not already running)
2. Tell the user to confirm the changes appear correctly on the site
3. Wait for explicit approval before pushing

## Jira Rules

### Field Requirements
- **Assignee**: Do not set manually — Jira Automation assigns based on Technical Area.
- **Technical Area**: REQUIRED field. Must be set from allowed values. Use file paths and content keywords to determine the correct area (see `.claude/commands/jira.md` for mappings).
- **Existing Tech Docs Link** (`customfield_10750`):
  - REQUIRED when transitioning to Published status
  - MUST be populated when creating or updating tickets that touch existing articles
  - Use full production URL (e.g., `https://www.sumologic.com/help/docs/get-started/training-certification-faq`)
- **GitHub PR link** (`customfield_10466`): After creating a PR, automatically update this field with the PR URL
- **Description**: Always use `contentFormat: markdown`

### Workflow Requirements
- **Creating tickets**: Use one of three approaches — a user-provided description, analysis of the code changes being made, or the file paths touched. (Claude Code: see `.claude/commands/jira.md` for the concrete pattern and Technical Area mappings.)
- **Titles**: Sentence case, action verb, specific, under 10 words
- **Descriptions**: Benefit-driven, active voice, under 150 words unless complex, markdown format
- **Comment attribution**: Always append `— via Claude Code` to any comment posted to a Jira ticket
- **Status transitions**: Use workflow states: Backlog → To Do → In Progress → Blocked → In Review → On Hold → Published → Closed

### Publishing Checklist
Before transitioning any ticket to Published:
1. Verify "Existing Tech Docs Link" field is populated with production URL
2. Verify "GitHub Pull Request" field has the merged PR URL
3. Ensure PR has been merged to main branch

## GitHub Rules
- **Assignee**: Assign any new PR to the current user unless otherwise specified

## Search, crawlers, and LLM-facing files
Three pieces work together and should be kept in sync when touching any of them:

- **`src/plugins/markdown-mirror.js`** mirrors every `/docs` page as raw Markdown at `/help/llm/docs/{path}`, for AI crawlers/agents to consume — not for Algolia site search. It also generates `/help/llm/docs/index.txt` (every mirrored path) and stamps the "Last updated" date in `static/llms.txt`.
- **`static/robots.txt`** (in this repo, PR-editable) explicitly welcomes general AI/LLM crawlers and points them to `/llms.txt`, but disallows the `Algolia Crawler` user-agent from `/llm/` specifically, so the raw Markdown mirror doesn't get pulled into site search results.
- **Algolia Crawler Admin** (external, NOT stored in this repo — no config file to edit via PR) runs the actual site-search crawl (index `sumodocs`) and separately excludes `https://www.sumologic.com/help/llm/**` via its own `exclusionPatterns`, redundant with the robots.txt rule above.

If you change the `/help/llm/` URL structure or add new machine-readable mirror paths: update `robots.txt` in this repo, and tell the user that the Algolia Crawler Admin's `exclusionPatterns` need a matching external update since that config can't be reached via a PR.

## llms.txt
`static/llms.txt` is a separate, hand-curated file distinct from the per-page Markdown mirror above — it's an index (product overview, primary audiences, prioritized doc links) aimed at AI answer engines/crawlers reading the published site, not at coding agents working in this repo. The `markdown-mirror.js` plugin only auto-stamps its "Last updated" date; the list of linked docs is maintained manually and is a curated subset, not exhaustive. When adding, moving, or removing a doc page that belongs in that curated index, check whether `static/llms.txt` needs a matching update.

---

## Claude Code specifics

The sections below apply only to Claude Code. Other agents can ignore them.

### Skills
- `.claude/skills/sumo-style/SKILL.md` — Sumo Logic writing conventions. Claude fetches the live style guide and applies it automatically when writing or editing docs.
- `.claude/skills/docusaurus/SKILL.md` — Docusaurus 3 syntax, frontmatter templates, and sidebar config patterns.
- `.claude/skills/pr-template-guide/SKILL.md` — PR template structure, formatting examples, and best practices.
- `.claude/skills/geo-guide/SKILL.md` — Reference guide of GEO principles and patterns loaded as context by `/geo-optimize` and `/seo-audit`. Not an invocable command.

### Jira Commands
All Jira operations MUST follow the patterns defined in `.claude/commands/jira.md`, including the three-approach ticket-creation pattern and Technical Area mappings.

### Slash Commands
Primary commands for documentation work. Proactively suggest when context fits — don't wait for the user to ask.

**Content:** `/doc`, `/doc-from-jira`, `/app-doc`, `/c2c-source-doc`, `/remove-doc`
**Release notes:** `/release-note-service`, `/release-note-collector`, `/release-note-cse`, `/release-note-csoar`, `/release-note-developer`
**Quality:** `/audit-doc`, `/seo-audit`, `/geo-optimize`, `/tone-check`, `/rewrite-intro`, `/simplify`
**Workflow:** `/jira`, `/review`

**When to proactively suggest:**
- User mentions a Jira ticket → suggest `/doc-from-jira`
- User is about to create a PR → suggest `/seo-audit` first
- Doc needs discoverability improvements → suggest `/geo-optimize`
- User asks about doc quality → suggest `/audit-doc` and `/seo-audit` together

**Key distinctions:**
- `/jira` = manage tickets | `/doc-from-jira` = scaffold doc from ticket
- `/audit-doc` = structure/style/links | `/seo-audit` = discoverability signals (run both before PRs)
