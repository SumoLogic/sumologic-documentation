---
name: new-release-note-csoar
trigger: user_invoked
---

# Create New Cloud SOAR Release Note

Use this skill when the user wants to create a Cloud SOAR (Automation Service) release note for content releases or platform updates.

## Trigger conditions

This skill should be invoked when:
- User asks to "create a Cloud SOAR release note"
- User mentions "CSOAR release note" or "Automation Service release"
- User wants to document Cloud SOAR content releases (integrations/playbooks) or platform updates
- User references `/new-release-note-csoar` command

## What this skill does

Automates the creation of Cloud SOAR release notes by:
1. Determining release type: Content Release or Application Update
2. Creating individual markdown files with appropriate naming
3. Generating proper frontmatter with type-specific images and keywords
4. Formatting content according to release type structure
5. Validating integration links and date formats

## Instructions

Follow the detailed instructions in:
`/Users/kpohas/sumologic-documentation/.claude/commands/new-release-note-csoar.md`

Key points:

**Date format**: "Month DD, YYYY" with zero-padded day (e.g., "June 05, 2024" or "March 06, 2026")

**Both types use**: Standard Sumo Logic preview image URL

**Content Release** (`-content-release.md`):
- For new integrations and playbooks
- Keywords: automation service, cloud soar, soar (three)
- Includes RSS icon link
- Simple format: intro paragraph + Integrations (H3) + Playbooks (H3)
- [New]/[Updated] tags WITHOUT descriptions

**Application Update** (`-application-update.md`):
- For platform features and bug fixes
- Keywords: automation service, cloud soar (two)
- NO RSS icon
- H2 header: "## {Month} release"
- Detailed format: Changes and enhancements + Bug Fixes
- [Added]/[Updated] tags WITH descriptions
- Publication date typically next month after release month
