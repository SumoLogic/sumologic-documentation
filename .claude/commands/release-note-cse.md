# Create New Cloud SIEM Release Note

Automates the creation of Cloud SIEM (CSE) release notes with proper formatting, frontmatter, and structure.

## What this command does

When you invoke `release-note-cse`, Claude will guide you through:

1. **Determine release type**. Content release or Application release
2. **Gather release details**. Date, changes, features, bug fixes
3. **Create markdown file**. Generate file with proper frontmatter and structure
4. **Format content**. Apply correct formatting for rules, mappers, parsers, or features
5. **Validate and preview**. Check structure and provide next steps

## When to use this command

* Publishing Cloud SIEM content updates (rules, log mappers, parsers).
* Announcing new Cloud SIEM features or bug fixes.
* Creating regular bi-weekly or monthly CSE release notes.
* Documenting Cloud SIEM application updates.

## Release types

### Content Release (`-content.md`)

For updates to Cloud SIEM detection content:
* **Rules**: New or updated detection rules
* **Log Mappers**: New or updated log mapping configurations
* **Parsers**: Parser updates and enhancements
* **Schema changes**: New fields or tags

**Typical cadence**: Every 1-2 weeks

### Application Release (`-application.md`)

For Cloud SIEM product features and updates:
* **New features**: UI improvements, new capabilities
* **Bug fixes**: Issue resolutions
* **Performance improvements**: Optimizations
* **Breaking changes or deprecations**.

**Typical cadence**: As needed when features ship

## Workflow

### Step 1: Gather information

Ask the user for:

**Required:**
* **Release type**: Content or Application
* **Release date**: Date in YYYY-MM-DD format
* **Changes**: List of what's included

**For Content Releases:**
* New/updated rules (rule IDs and names).
* New/updated log mappers.
* New/updated parsers.
* Brief summary of changes.

**For Application Releases:**
* Feature name and description.
* Documentation links.
* Screenshots (if applicable).
* Any breaking changes.

**Keywords (for both types):**
* Ask user to confirm or customize keywords
* Suggest defaults based on release type (see frontmatter section below)

**Validate:**
* Check that date is not in the future (use today's date if not specified).
* Ensure file does not already exist for this date and type.
* Confirm changes are ready to publish.
* Confirm keywords with user before creating file.

### Step 2: Create the markdown file

**File naming convention:**
```
blog-cse/YYYY-MM-DD-{type}.md
```

Examples:
* `blog-cse/2026-03-19-content.md`.
* `blog-cse/2026-03-19-application.md`.

**Important**: Files are created in `/blog-cse/` directory, NOT in `/docs/`

### Step 3: Generate frontmatter

**For Content Releases:**
```yaml
---
title: {Month} {Day}th, {Year} - Content Release
hide_table_of_contents: true
keywords:
  * rules
  * log mappers
  * parsers
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
---
```

**For Application Releases:**
```yaml
---
title: {Month} {Day}, {Year} - Application Update
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  * {relevant-keyword}
hide_table_of_contents: true
---
```

**Keywords guidance:**
* **Always ask user to confirm keywords before creating file**
* Suggested defaults:
  * Content releases: `rules`, `log mappers`, `parsers`
  * Application releases: Feature-specific keywords (e.g., `insights`, `entities`, `signals`, `cloud siem`)
* User may want to add or modify keywords based on specific content

**Date formatting:**
* Use ordinal suffixes: "March 12th", "February 3rd", "January 21st"
* Full month name, not abbreviated.

### Step 4: Add required import

Always include after frontmatter:
```javascript
import useBaseUrl from '@docusaurus/useBaseUrl';
```

### Step 5: Write content

#### Content Release Structure

```markdown
This content release includes:
    - {High-level summary point 1}
    - {High-level summary point 2}
    - {High-level summary point 3}

Additional changes are enumerated below.

### Rules
* [New] MATCH-SXXXX Rule Name.
* [Updated] FIRST-SXXXX Rule Name. Brief description of what changed.

### Log Mappers
* [New] Vendor - Event Type.
* [Updated] Vendor - Event Type.

### Parsers
* [Updated] /Parsers/System/Vendor/Parser Name.
```

**Content Release Guidelines:**
* Start with bulleted summary (3-5 high-level points).
* Use indentation (4 spaces) for bullet points.
* Group changes by type: Rules, Log Mappers, Parsers
* Use `[New]` or `[Updated]` tags.
* Rule IDs use format: `MATCH-SXXXX`, `FIRST-SXXXX`, `THRESHOLD-SXXXX`
* Parser paths use full hierarchy: `/Parsers/System/Vendor/Name`
* Add brief explanations for significant updates.
* Sort items alphabetically within each section.

#### Application Release Structure

```markdown
### {Feature Name}

{Feature description and business value}. [Learn more](/docs/path/to/docs).

{Optional screenshot or additional details}
```

**Application Release Guidelines:**
* Use H3 (`###`) for each feature.
* Start with clear, concise description.
* Include "Learn more" link to relevant docs.
* Keep it brief (2-3 sentences per feature).
* Add screenshots using: `<img src={useBaseUrl('img/path')} alt="description" />`
* Highlight business value and user impact.

### Step 6: Format dates and titles

**Title formatting rules:**
* Month: Full name (March, not Mar)
* Day: Ordinal suffix (12th, 3rd, 21st)
  * 1st, 2nd, 3rd.
  * 4th-20th end in "th".
  * 21st, 22nd, 23rd, 31st.
  * 24th-30th end in "th".
* Year: Full 4 digits
* Type: "Content Release" or "Application Update"

Examples:
* ✅ "March 19th, 2026 - Content Release".
* ✅ "February 3rd, 2026 - Application Update".
* ❌ "Mar 19, 2026 - Content Release" (month abbreviated).
* ❌ "March 19 2026 - Content Release" (missing "th").

### Step 7: Validation checklist

Before finishing, verify:
* [ ] File created in `/blog-cse/` directory (not `/docs/`).
* [ ] Filename follows pattern: `YYYY-MM-DD-{type}.md`
* [ ] Frontmatter complete with all required fields.
* [ ] Title formatted correctly with ordinal suffix.
* [ ] `hide_table_of_contents: true` present
* [ ] Keywords appropriate for release type.
* [ ] `import useBaseUrl` statement included.
* [ ] Content follows proper structure (Rules → Log Mappers → Parsers).
* [ ] All `[New]` and `[Updated]` tags present.
* [ ] Parser paths use full `/Parsers/System/Vendor/Name` format.
* [ ] Links use relative paths or `useBaseUrl`.
* [ ] No trailing whitespace or extra blank lines.

## Example usage

### Content Release Example

```
User: "Create a CSE content release for today with updates to AWS CloudTrail rules and new Okta log mappers"

Claude:
1. Confirms date: 2026-03-19
2. Confirms type: Content Release
3. Creates: blog-cse/2026-03-19-content.md
4. Generates frontmatter with proper title: "March 19th, 2026 - Content Release"
5. Adds summary section
6. Creates sections for Rules and Log Mappers
7. Formats with proper [New]/[Updated] tags
8. Provides checklist and next steps
```

### Application Release Example

```
User: "Create a CSE application release for March 15th about the new bulk insight update feature"

Claude:
1. Confirms date: 2026-03-15
2. Confirms type: Application Release
3. Creates: blog-cse/2026-03-15-application.md
4. Generates frontmatter: "March 15, 2026 - Application Update"
5. Adds feature section with H3 heading
6. Includes description and Learn more link
7. Provides checklist
```

## Common patterns

### Rule ID formats

* `MATCH-SXXXX` — Match rules (most common).
* `FIRST-SXXXX` — First Seen rules.
* `THRESHOLD-SXXXX` — Threshold rules.
* `AGGREGATION-SXXXX` — Aggregation rules.
* `CHAIN-SXXXX` — Chain rules.
* `OUTLIER-SXXXX` — Outlier rules.

### Parser path structure

Always use full path:
```
/Parsers/System/{Vendor}/{Parser Name}
```

Examples:
* `/Parsers/System/AWS/AWS CloudTrail`.
* `/Parsers/System/Okta/Okta`.
* `/Parsers/System/Microsoft/Microsoft 365`.
* `/Parsers/System/Cisco/Cisco ASA`.

### Log Mapper naming

Format: `{Vendor} - {Event Type}`

Examples:
* `Okta - Authentication Events`.
* `AWS CloudTrail - Management Events`.
* `Microsoft 365 - Audit Logs`.
* `CrowdStrike Falcon - Detection Events`.

### Vendor consistency

Use standard vendor names:
* ✅ "Microsoft 365" (not "Office 365", "O365").
* ✅ "Google Workspace" (not "G Suite", "GSuite").
* ✅ "SonicWall Firewall" (not "Dell SonicWall").
* ✅ "AWS CloudTrail" (not "Amazon CloudTrail").

## Archive process

**When to archive:**
* At year-end, older releases move to archive files.
* Archive files are in `/blog-cse/{YEAR}/12-31.md`.
* Current year + 1-2 prior years remain active.
* Older years are archived.

**Archive structure:**
```markdown
---
title: {Year} Release Notes Archive - Cloud SIEM
keywords: [rules, signals, schema, log mappers, parsers, cloud siem]
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This is an archive of {Year} Cloud SIEM release notes. [View the full archive](/release-notes-cse/archive).

<!--truncate-->

---

### {Month} {Day}, {Year} - {Type}

{Content}

---
```

**Note:** Users typically do not need to manage archives manually. Mention this only if they ask about archiving old releases.

## Safety principles

* **Check existing files** before creating to avoid duplicates.
* **Validate dates** are not in the future.
* **Use consistent vendor names** (check existing releases for precedent).
* **Preserve exact rule IDs** when user provides them.
* **Do not invent rule IDs**. Ask user if not provided.
* **Link to docs** when mentioning features.

## Post-completion message

After successfully creating the release note, tell the user:

```
✅ Cloud SIEM release note created successfully!

File created:
* 📄 blog-cse/{date}-{type}.md.

Summary:
* Type: {Content Release | Application Update}
* Date: {formatted date}
* Changes: {count} rules, {count} log mappers, {count} parsers

Next steps:
1. Review content for accuracy
2. Add any missing details or descriptions
3. Verify all rule IDs and parser paths are correct
4. Add screenshots for application updates (if applicable)
5. Test locally: yarn start
6. Check preview at: http://localhost:3000/release-notes-cse
7. Submit PR: "DOCS-XXX - CSE {type} release notes for {date}"

Checklist:
* [ ] All rule IDs verified.
* [ ] Parser paths use full /Parsers/System/ format.
* [ ] Vendor names consistent with existing releases.
* [ ] Links tested and working.
* [ ] No placeholder text remaining.

The release note will appear on the Cloud SIEM release notes page in reverse chronological order (newest first).

Would you like me to help fill in any additional details?
```

## Error handling

**If file already exists:**
* Show existing file path and date.
* Ask if user wants to:
  * Add to existing release (append content).
  * Create with different date.
  * Overwrite (requires confirmation).

**If date is invalid:**
* Show error and ask for correct format (YYYY-MM-DD).
* Suggest today's date as default.

**If rule IDs do not match pattern:**
* Warn user about non-standard format.
* Ask for confirmation before proceeding.

**If vendor names are inconsistent:**
* Check recent releases for the vendor.
* Suggest standard name.
* Ask user to confirm.

## Tips and best practices

**Content releases:**
* Lead with most significant changes in summary.
* Group related changes together (e.g., all Okta updates).
* Include context for major updates ("Updated detection expression for improved query performance").
* Keep descriptions concise (one sentence per update).

**Application releases:**
* Lead with user benefit, not technical details.
* Always link to documentation.
* Use screenshots for UI changes.
* Mention if feature requires admin privileges.

**General:**
* Be consistent with formatting across releases.
* Use active voice ("Added support for.." not "Support was added..").
* Spell out acronyms on first use in each release.
* Keep release notes focused on what changed, not why.

## References

* [Cloud SIEM Release Notes](https://sumologic.com/help/release-notes-cse)
* [Release Notes Index](/docs/release-notes).
* [Style Guide](/docs/contributing/style-guide).
