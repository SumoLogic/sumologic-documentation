# Claude Code Context — sumologic-documentation

## Project Overview
Open-source Sumo Logic documentation site built with Docusaurus 3.
Docs live in /docs, written in Markdown. Contributions follow the Sumo Logic style guide.

## Repository
@https://github.com/SumoLogic/sumologic-documentation

## Key Folders
@https://github.com/SumoLogic/sumologic-documentation/tree/main/docs

## Skills
- .claude/skills/sumo-style/SKILL.md — Sumo Logic writing conventions. Claude fetches the live style guide and applies it automatically when writing or editing docs.
- .claude/skills/docusaurus/SKILL.md — Docusaurus 3 syntax, frontmatter templates, and sidebar config patterns.
- .claude/skills/pr-template-guide/SKILL.md — PR template structure, formatting examples, and best practices.

## Pull Requests
**CRITICAL REQUIREMENT**: Before creating ANY PR, MUST read `.github/PULL_REQUEST_TEMPLATE.md` and use EXACT checkbox labels from that file.

**Non-negotiable rules:**
1. **Read template first** - Get current checkbox labels from `.github/PULL_REQUEST_TEMPLATE.md` (never guess or use old labels)
2. **Use exact text** - Copy checkbox labels verbatim from the template file. Example current labels: "Minor Changes", "Update Content", "New Content", "Site and Tools" — but always read the file, these may be outdated.
3. **Keep all checkboxes** - Pre-check one box, leave all four in the list
4. **PR title format**: `TICKET - Description` (e.g., `DOCS-1234 - Add PostgreSQL app`)
5. **Ask for ticket number** - Always ask for a Jira ticket before creating a PR. If the user doesn't have one, offer to create it using the Atlassian Jira MCP (optional for quick typo fixes).
6. **Full Jira URL** - Use `https://sumologic.atlassian.net/browse/DOCS-1234` not ticket number alone

See `.claude/skills/pr-template-guide/SKILL.md` for examples and guidance.

## Git Rules
**CRITICAL**: Never commit, merge, or push changes without explicit user approval — even if "accept edits" is enabled. Always ask first.

Before merging any PR, provide the user with the commit description and wait for explicit approval.

Before pushing any commit that changes docs content:
1. Run `yarn start` (if not already running)
2. Tell the user to confirm the changes appear correctly on the site
3. Wait for explicit approval before pushing

## Jira Rules
**CRITICAL**: All Jira operations MUST follow the patterns defined in `.claude/commands/jira.md`.

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
- **Creating tickets**: Follow the three-approach pattern (user description, analyze changes, or file paths) defined in `.claude/commands/jira.md`
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

## Slash Commands
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

### Slash commands

**Creating docs**

| Command | What it does |
|---------|-------------|
| `/doc` | Create a new feature, how-to, concept, reference, or troubleshooting doc |
| `/doc-from-jira` | Fetch a DOCS Jira ticket and scaffold a complete doc from it |
| `/app-doc` | Create a new app integration doc |
| `/c2c-source-doc` | Create a new Cloud-to-Cloud source integration doc |

**Release notes**

| Command | What it does |
|---------|-------------|
| `/release-note` | New release note (service, collector, Cloud SIEM, Cloud SOAR, or developer) |

**Editing and reviewing**

| Command | What it does |
|---------|-------------|
| `/audit-doc` | Full quality audit: structure, style, links, frontmatter, completeness |
| `/seo-audit` | Discoverability audit: SEO, AEO, and GEO signals — run this before a PR |
| `/geo-optimize` | Rewrite a doc to improve AI citation and generative engine visibility |
| `/tone-check` | Check voice and tone against Sumo Logic style rules |
| `/rewrite-intro` | Rewrite a doc's opening paragraph |
| `/simplify` | Simplify overly complex content |
| `/review` | Review a pull request |

**Jira**

| Command | What it does |
|---------|-------------|
| `/jira` | Create, update, search, or transition DOCS Jira tickets |
| `/doc-from-jira` | Start a new doc from a Jira ticket (use this instead of `/jira` when the goal is to write a doc) |

**Removing docs**

| Command | What it does |
|---------|-------------|
| `/remove-doc` | Safely deprecate or move a doc with redirects |

### Which audit command to use

Run both for a thorough pre-PR check — they cover different things:

- **`/audit-doc`** — structure, required sections, broken links, frontmatter completeness, style guide
- **`/seo-audit`** — SEO/AEO/GEO signals: title length, description quality, question headings, direct answers, GEO patterns

### `/jira` vs `/doc-from-jira`

- Use **`/jira`** to manage tickets: create, search, update fields, change status, view your queue
- Use **`/doc-from-jira`** when you have a ticket and want to start writing the doc it describes — it fetches the ticket and scaffolds the file

## Commands

- **Start dev server**: `yarn start` — use this to preview changes locally

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
