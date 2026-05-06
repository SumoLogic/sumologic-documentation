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
