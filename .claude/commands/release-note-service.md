# Create New Service Release Note

Creates a Service release note for a new feature, update, or improvement across Sumo Logic platform categories.

## Workflow

### Step 1: Gather information

Ask the user for:
- **Category**: apps, collection, manage, search, or ui
- **Feature name**: brief, descriptive name
- **Release date**: YYYY-MM-DD format
- **Description**: 2–3 sentences — what the feature is and why it matters
- **Doc link**: relative path (optional)
- **"What's new" bullets**: optional, for multiple specific changes
- **Keywords**: confirm with user before creating file

### Step 2: Create the file

**File**: `blog-service/YYYY-MM-DD-{category}.md`

If a file already exists for the same date and category, ask the user to use a different date, append to the existing file, or add a more specific suffix.

**Frontmatter**:
```yaml
---
title: {Feature Description} ({Category Label})
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - {keyword1}
hide_table_of_contents: true
---
```

**Title**: Feature description in Title Case + category label in parentheses. No date in title.
- apps → (Apps) | collection → (Collection) | manage → (Manage) | search → (Search) | ui → (New UI)

**Content**:
```markdown
{Description — what the feature is and why it matters}

**What's new:**
* {Specific capability}

[Learn more](/docs/path/to/doc).
```

"What's new:" is optional — use for multiple specific changes, omit for single-point announcements. Only add `import useBaseUrl` if the content uses it.

### Step 3: Validate

- [ ] `blog-service/YYYY-MM-DD-{category}.md`
- [ ] Title: feature description + category label in parens, no date
- [ ] `hide_table_of_contents: true`
- [ ] Keywords confirmed with user
- [ ] Doc link uses `/docs/...` relative path
- [ ] No trailing whitespace
