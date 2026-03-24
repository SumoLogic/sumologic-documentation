---
name: new-release-note-developer
trigger: user_invoked
---

# Create New Developer Release Note

Use this skill when the user wants to create a developer release note for APIs, SDKs, CLI tools, platform changes, or deprecations.

## Trigger conditions

This skill should be invoked when:
- User asks to "create a developer release note"
- User mentions publishing API changes or SDK updates
- User wants to document a deprecation or breaking change
- User references `/new-release-note-developer` command

## What this skill does

Automates the creation of developer release notes by:
1. Creating individual markdown files for each release (`blog-developer/YYYY-MM-DD-slug.md`)
2. Generating proper frontmatter with date and topic
3. Formatting content with proper structure
4. Validating date format and documentation links

## Instructions

Follow the detailed instructions in:
`.claude/commands/new-release-note-developer.md`

Key points:
- Developer release notes use individual files per release
- File naming: `YYYY-MM-DD-{slug}.md` (e.g., `2026-04-09-india-datacenter-deprecation.md`)
- Title format: "Month Day, YYYY - Topic" (e.g., "April 9, 2025 - Deprecation of Sumo Logic India Data Center")
- Date format: Full month name, no ordinal (e.g., "April 9" not "April 9th")
- Standard frontmatter with image and hide_table_of_contents
- Include documentation links with relative paths
- Use bold text or H4 sections for breaking changes
