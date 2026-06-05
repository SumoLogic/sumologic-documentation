# Create New Cloud SIEM Release Note

Creates a Cloud SIEM (CSE) release note — either a content release (rules, log mappers, parsers) or an application release (features, bug fixes, UI updates).

## Workflow

### Step 1: Determine release type

Ask the user: **Content release** (rules, log mappers, parsers — typically bi-weekly) or **Application release** (new features, bug fixes, UI improvements)?

### Step 2: Gather information

**For content releases:**
- Release date (YYYY-MM-DD)
- New/updated rules (IDs and names) — do not invent rule IDs, ask the user
- New/updated log mappers
- New/updated parsers
- 3–5 high-level summary points
- Keywords (confirm with user; default: rules, log mappers, parsers)

**For application releases:**
- Release date (YYYY-MM-DD)
- Features with descriptions and doc links
- Keywords (confirm with user)

### Step 3: Create the file

**File**: `blog-cse/YYYY-MM-DD-{type}.md` — type is `-content` or `-application`

Always include `import useBaseUrl from '@docusaurus/useBaseUrl';` after frontmatter.

If a file already exists for the same date and type, ask the user to use a different date or append.

---

#### Content release

**Frontmatter**:
```yaml
---
title: {Month} {Day ordinal}, {Year} - Content Release
hide_table_of_contents: true
keywords:
  - rules
  - log mappers
  - parsers
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
---
```

Title uses ordinal suffix: "March 19th, 2026 - Content Release", "February 3rd, 2026 - Content Release". Full month name, not abbreviated.

**Content**:
```markdown
This content release includes:
    - {Summary point 1}
    - {Summary point 2}

Additional changes are enumerated below.

### Rules
* [New] MATCH-SXXXX Rule Name.
* [Updated] FIRST-SXXXX Rule Name. Brief description of what changed.

### Log Mappers
* [New] Vendor - Event Type.

### Parsers
* [Updated] /Parsers/System/Vendor/Parser Name.
```

- Summary bullets use 4-space indentation.
- `[New]` or `[Updated]` tag on every item.
- Rule ID formats: `MATCH-SXXXX`, `FIRST-SXXXX`, `THRESHOLD-SXXXX`, `AGGREGATION-SXXXX`, `CHAIN-SXXXX`, `OUTLIER-SXXXX`
- Parser paths use full hierarchy: `/Parsers/System/Vendor/Name`
- Log mapper format: `Vendor - Event Type`
- Sort alphabetically within each section.

---

#### Application release

**Frontmatter**:
```yaml
---
title: {Month} {Day}, {Year} - Application Update
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - {keyword}
hide_table_of_contents: true
---
```

**Content**:
```markdown
### {Feature Name}

{Description and business value}. [Learn more](/docs/path/to/docs).
```

H3 for each feature. Add screenshots with `<img src={useBaseUrl('img/path')} alt="description" />` for UI changes.

### Step 4: Validate

- [ ] `blog-cse/YYYY-MM-DD-{type}.md`
- [ ] Title uses ordinal suffix for content releases
- [ ] `import useBaseUrl` included
- [ ] `hide_table_of_contents: true`
- [ ] Content: `[New]`/`[Updated]` tags on all items; parser paths complete
- [ ] Keywords confirmed with user
- [ ] No trailing whitespace
