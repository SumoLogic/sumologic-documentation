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
- .claude/skills/geo-guide/SKILL.md — Reference guide of GEO principles and patterns loaded as context by `/geo-optimize` and `/seo-audit`. Not an invocable command.

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

**Key distinctions:**
- `/jira` = manage tickets | `/doc-from-jira` = scaffold doc from ticket
- `/audit-doc` = structure/style/links | `/seo-audit` = discoverability signals (run both before PRs)

## Code Review
**Default to fast mode**: For PR reviews, read the diff once (e.g. via `gh pr diff`) and report findings directly in that same turn. Do not invoke the multi-agent `/review` pipeline, spawn background research/finder agents, or run a verification pass, unless the user has explicitly asked for a deep/thorough review.

**File count and diff size are NOT valid reasons to escalate on your own.** A PR that repeats the same simple templated edit across many files (e.g. a doc migration touching 18 pages) is still routine, no matter how many lines it touches — judge by the complexity of the *change*, not the size of the diff. If a PR seems to genuinely warrant deeper review (security-sensitive files, logic/behavior changes, something you're not confident you can verify in one pass), say so and ask the user before escalating — never decide to run the deep pipeline unilaterally.

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
