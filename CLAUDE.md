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

## Pull Request Template

**IMPORTANT**: When creating ANY pull request (through commands or general work), always format the PR description using the official template from `.github/PULL_REQUEST_TEMPLATE.md`.

### PR Description Format

```markdown
## Purpose of this pull request

This pull request {clear description of changes}. {Optional: Additional context}.

{Optional: Bullet list of specific changes}

## Select the type of change

- [ ] Minor Changes - Typos, formatting, slight revisions
- [ ] Update Content - Revisions, updating sections
- [ ] New Content - New features, sections, pages, tutorials
- [ ] Site and Tools - .clabot, version updates, maintenance, dependencies, new packages for the site (Docusaurus, Gatsby, React, etc.)

## Ticket (if applicable)

{TICKET-1234 or leave blank}
```

### Change Type Selection

**Always pre-check the appropriate box** based on the work:

- **[x] New Content** - Use for: new docs, new app docs, new release notes, new pages
- **[x] Update Content** - Use for: doc revisions, content updates, fixes from audits
- **[x] Minor Changes** - Use for: typo fixes, formatting corrections
- **[x] Site and Tools** - Use for: dependency updates, config changes, build tools

### Workflow

1. **Ask for ticket number** (optional): "Do you have a Jira or GitHub ticket number?" (e.g., DOCS-1234, CONN-5678)
2. **Generate PR title**: `{TICKET} - {Brief description}` or just `{Brief description}` if no ticket
3. **Format PR body** using the template above with appropriate checkbox pre-selected
4. **Use with gh pr create**:
   ```bash
   gh pr create --title "{TICKET} - {Description}" --body "$(cat <<'EOF'
   {formatted template}
   EOF
   )"
   ```

### Examples

**New app doc PR**:
- Title: `DOCS-1234 - Add PostgreSQL app documentation`
- Type: [x] New Content

**Content update PR**:
- Title: `DOCS-5678 - Update CloudTrail installation steps`
- Type: [x] Update Content

**Audit fixes PR**:
- Title: `Fix documentation quality issues in security-threat-detection`
- Type: [x] Update Content (or Minor Changes if only typos)

## App Documentation Workflow

When creating a new app doc with `/new-app-doc`, always present all available integration categories:

1. `aiml` - AI and Machine Learning platforms
2. `amazon-aws` - AWS services
3. `app-development` - Development tools (GitHub, Jenkins, Jira)
4. `bigdata` - Big data platforms
5. `cloud-security-monitoring-analytics` - Cloud security platforms
6. `containers-orchestration` - Kubernetes, Docker, containers
7. `databases` - Database systems
8. `global-intelligence` - Global intelligence integrations
9. `google` - Google Cloud services
10. `hosts-operating-systems` - OS monitoring (Linux, Windows)
11. `microsoft-azure` - Azure services
12. `pci-compliance` - PCI compliance integrations
13. `product-list` - Product integrations
14. `saas-cloud` - SaaS cloud applications
15. `saml` - SAML authentication providers
16. `security-threat-detection` - Security and threat tools
17. `sumo-apps` - Sumo Logic native apps
18. `web-servers` - Web servers (Nginx, Apache)
19. `webhooks` - Webhook integrations
