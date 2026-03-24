---
name: new-release-note-service
trigger: user_invoked
---

# Create New Service Release Note

Use this skill when the user wants to create a Service release note for platform features, updates, and improvements.

## Trigger conditions

This skill should be invoked when:
- User asks to "create a Service release note"
- User mentions "Service feature" or "platform update"
- User wants to document new features in Apps, Collection, Manage, Search, or UI
- User references `/new-release-note-service` command

## What this skill does

Automates the creation of Service release notes by:
1. Determining the category: Apps, Collection, Manage, Search, or UI
2. Creating individual markdown files with appropriate naming
3. Generating proper frontmatter with category-specific titles
4. Formatting content for feature announcements
5. Validating keywords with user confirmation

## Instructions

Follow the detailed instructions in:
`.claude/commands/new-release-note-service.md`

Key points:

**File naming**: `blog-service/YYYY-MM-DD-{category}.md`

**Categories**: apps, collection, manage, search, ui

**Title format**: "{Feature Description} ({Category})" - NO date in title

**Category labels**:
- apps → (Apps)
- collection → (Collection)
- manage → (Manage)
- search → (Search)
- ui → (New UI)

**Keywords**: Always ask user to confirm keywords before creating file

**Standard image**: Uses standard Sumo Logic preview image URL

**Structure**: Simple format with intro paragraph, optional "What's new" bullets, and documentation link
