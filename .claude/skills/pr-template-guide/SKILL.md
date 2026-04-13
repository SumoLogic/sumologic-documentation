# PR Template Guide — Universal Reference

This document provides guidance on formatting PR descriptions according to the repository's official PR template. **Use this for ALL pull requests**, regardless of what changed or how the changes were made.

## Official PR Template

Located at `.github/PULL_REQUEST_TEMPLATE.md`:

```markdown
## Purpose of this pull request

This pull request... <!-- brief description here -->


## Select the type of change
<!-- What types of changes does your code introduce? Select the checkbox after clicking "Create pull request" button. -->

- [ ] Minor Changes - Typos, formatting, slight revisions
- [ ] Update Content - Revisions, updating sections
- [ ] New Content - New features, sections, pages, tutorials
- [ ] Site and Tools - .clabot, version updates, maintenance, dependencies, new packages for the site (Docusaurus, Gatsby, React, etc.)

## Ticket (if applicable)

<!-- enter your Jira, Asana, or GitHub ticket number -->
```

## When to Use This Template

**ALWAYS** - Use this template format for any PR creation:
- Creating new documentation or pages
- Updating existing documentation
- Fixing typos or formatting issues
- Adding release notes
- Updating dependencies or site configuration
- Any other repository changes

## Change Type Selection Guide

Choose the appropriate checkbox based on the work:

### ✅ New Content
Use when:
- Creating new documentation pages
- Adding new app integration docs
- Adding new release notes
- Creating new features or tutorials
- Adding entirely new sections

### ✅ Update Content
Use when:
- Revising existing documentation
- Updating instructions or procedures
- Fixing documentation quality issues
- Improving existing content
- Adding information to existing pages

### ✅ Minor Changes
Use when:
- Fixing typos or grammar
- Correcting formatting
- Making small text revisions
- Quick fixes that don't change meaning

### ✅ Site and Tools
Use when:
- Updating dependencies (yarn, npm packages)
- Changing Docusaurus configuration
- Modifying build tools or CI/CD
- Updating .clabot or other automation

## PR Description Format

```markdown
## Purpose of this pull request

This pull request {clear description of what changed and why}.

{Optional: Bullet list of specific changes if multiple items}

## Select the type of change

- [ ] Minor Changes - Typos, formatting, slight revisions
- [ ] Update Content - Revisions, updating sections
- [ ] New Content - New features, sections, pages, tutorials
- [ ] Site and Tools - .clabot, version updates, maintenance, dependencies, new packages for the site (Docusaurus, Gatsby, React, etc.)

## Ticket (if applicable)

{https://sumologic.atlassian.net/browse/DOCS-1234 or leave blank if no ticket}
```

## Best Practices

1. **Ask for ticket number** - Always ask for the Jira/GitHub ticket number (e.g., DOCS-1234). Use the full URL in the PR body. Optional for quick typo fixes or small bug fixes.
2. **Pre-check the right box** - Analyze the changes and pre-select the appropriate type
3. **Write clear descriptions** - First line should summarize changes, add bullets for details
4. **Format for gh pr create** - Use heredoc format for proper multiline PR bodies
5. **Match commit messages** - Keep PR title and commit message aligned

## Example PR Descriptions

### Example 1: New Documentation

```markdown
## Purpose of this pull request

This pull request adds documentation for the PostgreSQL app integration. This includes:

- Installation and configuration steps
- Sample log messages and queries
- Dashboard descriptions with screenshots
- Monitoring and troubleshooting guidance

## Select the type of change

- [ ] Minor Changes - Typos, formatting, slight revisions
- [ ] Update Content - Revisions, updating sections
- [x] New Content - New features, sections, pages, tutorials
- [ ] Site and Tools - .clabot, version updates, maintenance, dependencies, new packages for the site (Docusaurus, Gatsby, React, etc.)

## Ticket (if applicable)

https://sumologic.atlassian.net/browse/DOCS-1234
```

### Example 2: Content Updates

```markdown
## Purpose of this pull request

This pull request updates the CloudTrail documentation to reflect the new authentication flow introduced in v2.5.

## Select the type of change

- [ ] Minor Changes - Typos, formatting, slight revisions
- [x] Update Content - Revisions, updating sections
- [ ] New Content - New features, sections, pages, tutorials
- [ ] Site and Tools - .clabot, version updates, maintenance, dependencies, new packages for the site (Docusaurus, Gatsby, React, etc.)

## Ticket (if applicable)

https://sumologic.atlassian.net/browse/DOCS-5678
```

### Example 3: Quality Fixes

```markdown
## Purpose of this pull request

This pull request fixes documentation quality issues:

- Updated frontmatter descriptions to meet 100-160 character requirement
- Fixed broken internal links to use relative paths
- Added missing alt text to images
- Corrected heading hierarchy

## Select the type of change

- [ ] Minor Changes - Typos, formatting, slight revisions
- [x] Update Content - Revisions, updating sections
- [ ] New Content - New features, sections, pages, tutorials
- [ ] Site and Tools - .clabot, version updates, maintenance, dependencies, new packages for the site (Docusaurus, Gatsby, React, etc.)

## Ticket (if applicable)

<!-- enter your Jira, Asana, or GitHub ticket number -->
```

### Example 4: Typo Fixes

```markdown
## Purpose of this pull request

This pull request fixes typos and formatting issues in the security integration docs.

## Select the type of change

- [x] Minor Changes - Typos, formatting, slight revisions
- [ ] Update Content - Revisions, updating sections
- [ ] New Content - New features, sections, pages, tutorials
- [ ] Site and Tools - .clabot, version updates, maintenance, dependencies, new packages for the site (Docusaurus, Gatsby, React, etc.)

## Ticket (if applicable)

<!-- enter your Jira, Asana, or GitHub ticket number -->
```

### Example 5: Dependency Update

```markdown
## Purpose of this pull request

This pull request updates Docusaurus from v3.1.0 to v3.2.0 and updates related dependencies.

## Select the type of change

- [ ] Minor Changes - Typos, formatting, slight revisions
- [ ] Update Content - Revisions, updating sections
- [ ] New Content - New features, sections, pages, tutorials
- [x] Site and Tools - .clabot, version updates, maintenance, dependencies, new packages for the site (Docusaurus, Gatsby, React, etc.)

## Ticket (if applicable)

https://sumologic.atlassian.net/browse/DOCS-9012
```

## Ticket Number Patterns

Ticket links are preferred for most PRs. Always use full URLs:
- **Jira**: `https://sumologic.atlassian.net/browse/DOCS-1234`
- **GitHub**: `https://github.com/SumoLogic/sumologic-documentation/issues/123`
- **Asana**: Full task URL

**When tickets are optional:**
- Quick typo fixes (1-2 word changes)
- Small bug fixes (one-line changes)
- Minor formatting corrections

**When tickets are required:**
- New documentation or features
- Content updates or revisions
- Dependency updates
- Any substantial changes

Always ask the user for their ticket number before creating the PR. If they don't have one for a small fix, proceed without it.

## PR Title Format

PR titles should follow this format:

**With ticket (preferred):**
```
{TICKET} - {Brief description}
```

**Without ticket (only for quick fixes):**
```
{Brief description}
```

Examples:
- `DOCS-1234 - Add PostgreSQL app documentation`
- `DOCS-5678 - Update CloudTrail authentication steps`
- `Fix typo in installation steps` (quick fix, no ticket)
- `DOCS-7890 - Update Docusaurus to v3.2.0`

## Using with gh pr create

Format the PR body using heredoc for proper multiline support:

```bash
gh pr create --title "DOCS-1234 - Add PostgreSQL app documentation" --body "$(cat <<'EOF'
## Purpose of this pull request

This pull request adds documentation for the PostgreSQL app integration.

## Select the type of change

- [ ] Minor Changes - Typos, formatting, slight revisions
- [ ] Update Content - Revisions, updating sections
- [x] New Content - New features, sections, pages, tutorials
- [ ] Site and Tools - .clabot, version updates, maintenance, dependencies, new packages for the site (Docusaurus, Gatsby, React, etc.)

## Ticket (if applicable)

https://sumologic.atlassian.net/browse/DOCS-1234
EOF
)"
```
