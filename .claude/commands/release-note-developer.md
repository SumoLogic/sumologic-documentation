# Create New Developer Release Note

Creates a Developer release note for API changes, SDK updates, deprecations, CLI updates, or other developer-facing platform changes.

## Workflow

### Step 1: Gather information

Ask the user for:
- **Title/topic**: brief description (e.g. "New Field Extraction Rules API", "Deprecation of India Data Center")
- **Release date**: YYYY-MM-DD format
- **Content**: what changed, why it matters, impact on existing users
- **Doc links**: relative paths to relevant docs
- **Keywords**: optional; ask the user — suggest based on content type:
  - API changes: `api`, `endpoints`
  - SDK updates: `sdk`, `python`, `java`, etc.
  - Deprecations: `deprecation`, `end-of-life`
  - Breaking changes: `breaking-change`

### Step 2: Create the file

**File**: `blog-developer/YYYY-MM-DD-{slug}.md`

Slug: lowercase, hyphens, 3–5 words. Examples: `api-endpoints`, `india-datacenter-deprecation`, `python-sdk-v2`.

If a file already exists, ask the user to use a different date or a more specific slug.

**Frontmatter**:
```yaml
---
title: {Month Day, YYYY} - {Topic}
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
hide_table_of_contents: true
---
```

**Title format**: "Month Day, YYYY - Topic" — full month name, no ordinal.
- ✅ "April 9, 2025" | ❌ "April 9th, 2025" | ❌ "Apr 9, 2025"

Add `keywords` to frontmatter only if the user wants them.

**Content**:
```markdown
{Main paragraph — what changed, why it matters}

#### {Subsection if needed}

* {Item}
```

- H4 (`####`) for subsections (new endpoints, breaking changes, migration steps, etc.).
- Use `:::warning` admonitions for breaking changes.
- Doc links always use relative paths (`/docs/...`).
- Only add `import useBaseUrl` if content uses images.

### Step 3: Validate

- [ ] `blog-developer/YYYY-MM-DD-{slug}.md`
- [ ] Title: "Month Day, YYYY - Topic" (no ordinal)
- [ ] `hide_table_of_contents: true`
- [ ] Breaking changes clearly marked
- [ ] Doc links use relative paths
- [ ] No trailing whitespace
