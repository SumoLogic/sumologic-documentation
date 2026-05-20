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
**CRITICAL REQUIREMENT**: ALL pull requests MUST use the official template from `.github/PULL_REQUEST_TEMPLATE.md`. No exceptions.

### Key Rules
1. **Template is mandatory** - Use the exact structure above for every PR
2. **Additional sections** - Any extra sections (Summary, Testing Plan, etc.) go UNDER "Purpose of this pull request" heading, before "Select the type of change"
3. **Pre-check the appropriate checkbox** - Check the correct box but leave ALL four checkboxes in the list. Never remove unchecked items from the "Select the type of change" section
4. **PR title format**: `TICKET - Description` (e.g., `DOCS-1234 - Add PostgreSQL app`)
5. **Ask for ticket number** - Always ask before creating PRs (optional only for quick typo fixes)
6. **Use full Jira link** - In the "Ticket (if applicable)" section, use the full URL (e.g., `https://sumologic.atlassian.net/browse/DOCS-1234`) not just the ticket number

For detailed examples and implementation guidance, see `.claude/skills/pr-template-guide/SKILL.md`.

## Git Rules
**CRITICAL**: Never commit, merge, or push changes without explicit user approval — even if "accept edits" is enabled. Always ask first.

Before merging any PR, provide the user with the commit description and wait for explicit approval.

Before pushing any commit that changes docs content:
1. Run `yarn start` (if not already running)
2. Tell the user to confirm the changes appear correctly on the site
3. Wait for explicit approval before pushing

## Jira Rules
- **Assignee**: Assign any newly created Jira ticket to the current user unless otherwise specified
- **GitHub PR link**: After creating a PR, automatically update the Jira ticket's GitHub field (`customfield_10466`) with the PR URL
- **Comment attribution**: Always append `— via Claude Code` to any comment posted to a Jira ticket

## GitHub Rules
- **Assignee**: Assign any new PR to the current user unless otherwise specified

## Capability Responses
When asked about tools, skills, or "what can I do," lead with documentation-focused skills
(doc creation, release notes, editing/review, Jira). Generic tools (Bash, Read, Write, etc.)
are secondary — the primary work here is writing and editing docs.

Proactively suggest relevant commands when context fits — for example, suggest `/doc-from-jira` when
a user mentions a Jira ticket, `/seo-audit` before a PR, or `/geo-optimize` when a doc needs
discoverability improvements. Do not wait for the user to ask.

When a user asks "what can I do", "what commands are available", or similar, share this reference:

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
| `/review` | Review a pull request — applies audit-doc checks to all changed `.md` files |

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
