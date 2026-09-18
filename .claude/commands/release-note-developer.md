# Create New Developer Release Note

Automates the creation of Developer release notes for APIs, SDKs, integrations, and platform changes relevant to developers.

## What this command does

When you invoke `release-note-developer`, Claude will guide you through:

1. **Gather release details**. Category, date, title, and content
2. **Create markdown file**. Generate file with proper frontmatter and structure
3. **Format content**. Apply correct formatting for the release type
4. **Validate and preview**. Check structure and provide next steps

## When to use this command

* Announcing new API endpoints or features
* Documenting API changes, deprecations, or breaking changes
* Publishing SDK updates or new SDK versions
* Releasing developer tools or CLI updates
* Announcing platform changes affecting developers
* Documenting authentication or integration changes
* Publishing deprecation notices

## Release categories

Developer release notes typically cover:

* **APIs**. New endpoints, changes, deprecations
* **SDKs**. New SDKs, version updates, improvements
* **CLI**. Command-line tool updates
* **Integrations**. New integrations or integration changes
* **Platform**. Platform changes affecting developers
* **Security**. Authentication, authorization changes
* **Deprecations**. End-of-life announcements

## Workflow

### Step 1: Gather information

Ask the user for:

**Required:**
* **Title/Topic**: Brief description of what this release is about
* **Release date**: Date in YYYY-MM-DD format
* **Content**: The release note content (what changed, why it matters)

**Optional:**
* **Impact level**: Breaking change, deprecation, new feature, minor change
* **Documentation links**: Related doc pages
* **Slug**: Custom slug for filename (auto-generated from title if not provided)
* **Keywords**: Custom keywords for frontmatter (suggest defaults based on content)

**Validate:**
* Check that date is not in the future
* Ensure content is clear and concise
* Verify any doc links are valid relative paths
* Ask user to confirm keywords before creating file

### Step 2: Create the markdown file

**File naming convention:**
```
blog-developer/YYYY-MM-DD-{slug}.md
```

**Slug generation:**
* Lowercase the title
* Replace spaces with hyphens
* Remove special characters
* Keep concise (3-5 words max)

Examples:
* `blog-developer/2026-03-23-api-endpoints.md`
* `blog-developer/2026-04-09-india-datacenter-deprecation.md`
* `blog-developer/2026-05-15-python-sdk-v2.md`

**Important**: Files are created in `/blog-developer/` directory (root level, no subdirectories)

### Step 3: Generate frontmatter

**Standard frontmatter:**
```yaml
---
title: {Month Day, YYYY} - {Topic}
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
hide_table_of_contents: true
---
```

**Title formatting:**
* Start with full date: "Month Day, YYYY" (e.g., "April 9, 2025")
* Follow with " - " separator
* Add topic in Title Case (e.g., "Deprecation of Sumo Logic India Data Center")
* Keep topic concise but descriptive

**Date formatting:**
* Use full month name (January, February, March, etc.)
* Use day without ordinal suffix (1, 9, 23, not 1st, 9th, 23rd)
* Format: "Month Day, YYYY"

**Image:**
* Always use the standard Sumo Logic preview image
* URL: `https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082`

**Keywords (optional but recommended):**
* **Always ask user if they want to include keywords**
* Suggest keywords based on content type:
  * API changes: `api`, `endpoints`, `rest-api`
  * SDK updates: `sdk`, `python`, `java`, etc.
  * Deprecations: `deprecation`, `end-of-life`
  * Breaking changes: `breaking-change`
  * Platform updates: `platform`, `datacenter`
* Format:
  ```yaml
  keywords:
    - api
    - deprecation
  ```
* User can choose to omit keywords or customize the list

### Step 4: Add optional import

For release notes that use links or useBaseUrl:
```javascript
import useBaseUrl from '@docusaurus/useBaseUrl';
```

**Note**: Only add if content uses it. For simple text-only releases, omit.

**Title guidelines:**
* Keep concise (2-5 words)
* Use title case
* Common patterns: "APIs", "SDKs", "CLI Tools", "Platform Updates"
* Can be more specific: "Python SDK", "REST API", "Management APIs"

### Step 5: Write content

Content goes directly after frontmatter (and optional import). No H3 heading needed — the title is in frontmatter.

**Basic structure:**
```markdown
---
title: March 23, 2026 - New Field Extraction Rules API
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
hide_table_of_contents: true
---

{Main content paragraph(s)}

{Optional: H4 sections for subsections}

{Optional: code blocks, lists, links}

{Optional: admonitions for important notes}
```

### Step 6: Content formatting guidelines

#### API Changes

For API announcements, include:
* What changed (new endpoints, parameters, behavior)
* Impact on existing integrations
* Links to API documentation
* Migration guidance if breaking change

**Example:**
```markdown
---
title: March 23, 2026 - New Field Extraction Rules API
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
hide_table_of_contents: true
---

We're excited to announce new API endpoints for managing Field Extraction Rules (FERs) programmatically. These endpoints enable you to create, update, delete, and list FERs via the REST API, making it easier to automate and scale your field extraction configurations.

#### New endpoints

* **Field Extraction Rules API**: Create and manage Field Extraction Rules programmatically. See [Field Extraction Rules API](/docs/api/field-extraction-rules).
* **Webhook Connections API**: Create and manage webhook connections via API. See [Connections API](/docs/api/connections).

#### Breaking changes

**Monitors API**: The `notificationGroupFields` parameter is now required when creating monitors. Update your integrations before June 1, 2026. See the [Monitors API documentation](/docs/api/monitors) for details.
```

#### SDK Updates

For SDK releases:
* Version number
* What's new or changed
* Installation instructions
* Link to SDK docs or GitHub

**Example:**
```markdown
---
title: March 23, 2026 - Python SDK Version 2.0
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
hide_table_of_contents: true
keywords:
  - sdk
  - python
---

We've released version 2.0 of the Sumo Logic Python SDK with support for the latest APIs and improved error handling.

#### What's new

* Support for Field Extraction Rules API
* Async client support for better performance
* Improved error messages and debugging

#### Installation

```python
pip install sumologic-sdk==2.0.0
```

Learn more in the [Python SDK documentation](/docs/api/python-client).
```

#### Deprecations

For deprecation notices:
* What's being deprecated
* Why it's being deprecated (optional, if relevant)
* When it will be removed (end-of-life date)
* Migration path or alternatives
* Impact on existing users

**Example (matches your template):**
```markdown
---
title: April 9, 2025 - Deprecation of Sumo Logic India Data Center
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
hide_table_of_contents: true
keywords:
  - deprecation
  - datacenter
---

As previously communicated to impacted customers, effective as of April 30, 2025, customers will no longer be able to ingest data into the Sumo Logic Mumbai data center (`https://api.in.sumologic.com/`). Customers will retain access to historical data and basic search functionality until April 30, 2026, at which point all access will be terminated.

Historical data will not be migrated to other deployments.

**Reminder**: If you're still referencing the India endpoint, please update your integrations. For supported alternatives, see the [endpoint guide](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).

For help, contact [Support](https://support.sumologic.com/).
```

**Example (API deprecation):**
```markdown
---
title: March 23, 2026 - Legacy Metrics API Deprecation
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
hide_table_of_contents: true
keywords:
  - api
  - deprecation
---

Effective **September 30, 2026**, the following legacy metrics API endpoints will be retired:
* `/v1/metrics/query` (use `/v2/metrics/query` instead)
* `/v1/metrics/catalog` (use `/v2/metrics/catalog` instead)

**Migration**: Update your integrations to use the v2 endpoints. See the [Metrics API migration guide](/docs/api/metrics-migration) for details.

**Impact**: After September 30, 2026, requests to legacy endpoints will return HTTP 410 (Gone).

For help, contact [Support](https://support.sumologic.com/).
```

#### Minor Changes

For small updates or enhancements:
* Brief description of the change
* Link to relevant docs
* Optional impact note

**Example:**
```markdown
---
title: March 23, 2026 - API Enhancements
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
hide_table_of_contents: true
---

We've made the following improvements to our APIs:

* **Audit logging**: When performing create, update, and delete requests through Sumo Logic APIs, the API accessID is now included within the operator field of your related [Audit Event Index](/docs/manage/security/audit-indexes/audit-event-index) messages.
* **Search Job API**: Now returns query execution statistics in response headers for better monitoring and debugging.
```

### Step 7: Validation checklist

Before finishing, verify:
* [ ] File created in `/blog-developer/` directory (root level)
* [ ] Filename follows pattern: `YYYY-MM-DD-{slug}.md`
* [ ] Frontmatter complete with all required fields
* [ ] Title starts with "Month Day, YYYY - " format
* [ ] Date format uses full month name, no ordinal (e.g., "April 9" not "April 9th")
* [ ] `hide_table_of_contents: true` is present
* [ ] Standard image URL is used
* [ ] Content is clear and includes relevant links
* [ ] Breaking changes are clearly marked (use bold or H4 sections)
* [ ] Documentation links use relative paths (start with `/docs/`)
* [ ] Keywords added if applicable (deprecation, api, sdk, etc.)
* [ ] No trailing whitespace

## Example usage

### API Feature Example

```
User: "Create a developer release note for new Field Extraction Rules API endpoints, dated March 23, 2026"

Claude:
1. Confirms date: March 23, 2026
2. Generates slug: "field-extraction-rules-api"
3. Creates: blog-developer/2026-03-23-field-extraction-rules-api.md
4. Generates frontmatter:
   - title: "March 23, 2026 - New Field Extraction Rules API"
   - image: Standard Sumo Logic image
   - hide_table_of_contents: true
5. Writes content with:
   - Description of new endpoints
   - Link to API documentation
   - Impact notes
6. Provides checklist
```

### Deprecation Example

```
User: "Create a deprecation notice for Sumo Logic India Data Center, dated April 9, 2025"

Claude:
1. Confirms date: April 9, 2025
2. Generates slug: "india-datacenter-deprecation"
3. Creates: blog-developer/2025-04-09-india-datacenter-deprecation.md
4. Generates frontmatter:
   - title: "April 9, 2025 - Deprecation of Sumo Logic India Data Center"
   - keywords: deprecation, datacenter
5. Writes content with:
   - What's being deprecated
   - Timeline and dates
   - Migration guidance
   - Support contact
6. Provides checklist
```

## Date formatting rules

**Format: "Month Day, YYYY"**

Month names (full):
* January, February, March, April, May, June
* July, August, September, October, November, December

Day: No ordinal suffix (use 1, 2, 3... not 1st, 2nd, 3rd)

**Examples:**
* ✅ March 23, 2026
* ✅ January 1, 2026
* ✅ December 31, 2025
* ❌ March 23rd, 2026 (no ordinal)
* ❌ Mar 23, 2026 (abbreviated month)
* ❌ 2026-03-23 (wrong format)

## Content formatting guidelines

**Use formatting for clarity:**
* Use **bold** for important terms or breaking changes
* Use H4 sections (`####`) for subsections when needed
* Use bullet lists for multiple related items
* Use admonitions (`:::note`, `:::warning`) for important callouts

**Example:**
```markdown
#### Breaking changes

**Monitors API**: The `notificationGroupFields` parameter is now required when creating monitors. Update your integrations before June 1, 2026.

:::warning
This is a breaking change. Existing integrations must be updated by June 1, 2026.
:::

**Links:**
* Always use relative paths starting with `/docs/`
* Use descriptive link text (not "click here")
* Example: `[Metrics API documentation](/docs/api/metrics)`

**Code blocks:**
* Use appropriate language tags (```python, ```bash, ```json)
* Keep examples concise and relevant
* Show before/after for migration guides

## Safety principles

* **Check for existing files** before creating to avoid duplicates
* **Use clear, descriptive slugs** that indicate content
* **Validate dates**. Ensure date is not in future
* **Include documentation links**. Help users find more info
* **Mark breaking changes clearly**. Use bold text or H4 sections
* **Use standard frontmatter**. Consistent image URL and structure
* **Keep content focused**. One topic per release note

## Post-completion message

After successfully creating the release note, tell the user:

```
✅ Developer release note created successfully!

File created:
* 📄 blog-developer/{YYYY-MM-DD-slug}.md

Summary:
* 📅 Title: {Month Day, YYYY} - {Topic}
* 📝 {Brief summary of content}
* 🏷️ Keywords: {keywords if added}

Next steps:
1. Review content for accuracy and clarity
2. Verify documentation links are correct
3. Ensure breaking changes are clearly marked
4. Test locally: yarn start
5. Check preview at: http://localhost:3000/release-notes-developer
6. Submit PR: "DOCS-XXX - Developer release note: {Topic}"

Checklist:
* [ ] Title format is correct (Month Day, YYYY - Topic)
* [ ] Date uses full month name, no ordinal
* [ ] Standard image URL is used
* [ ] hide_table_of_contents: true is present
* [ ] Documentation links use relative paths
* [ ] Breaking changes clearly marked
* [ ] Content is clear and concise

The release note will appear on the Developer release notes page in reverse chronological order (newest first).

Would you like me to help refine the content or add additional details?
```

## Error handling

**If file already exists:**
* Show existing file path and creation date
* Ask if user wants to:
  * Use different slug (e.g., add `-v2` or more specific topic)
  * Use different date
  * Overwrite (requires explicit confirmation)

**If date is in the future:**
* Warn user and ask for confirmation
* Suggest using current date

**If slug is too generic:**
* Warn if slug is too short or vague (e.g., "api", "update")
* Suggest more descriptive slug (e.g., "field-extraction-rules-api")

**If documentation link looks invalid:**
* Warn if doesn't start with `/docs/`
* Suggest correction
* Proceed with user confirmation

**If content is too long:**
* Suggest breaking into subsections (H4)
* Recommend creating separate doc page and linking to it from release note

## Tips and best practices

**For API changes:**
* Be specific about what endpoints changed
* Include examples of new request/response formats
* Provide migration timeline for breaking changes
* Link to comprehensive API documentation

**For deprecations:**
* Give ample notice (3-6 months minimum)
* Clearly state end-of-life date
* Provide migration path with examples
* Offer support contact for questions

**For SDK releases:**
* Include version number prominently
* Show installation/upgrade commands
* Highlight breaking changes separately
* Link to changelog or GitHub release

**All release notes:**
* Write for developers (assume technical knowledge)
* Focus on impact and action items
* Use clear, direct language
* Provide links for more information
* Keep entries concise but complete

## References

* [Developer Release Notes](https://sumologic.com/help/release-notes-developer)
* [Release Notes Index](/docs/release-notes)
* [API Documentation](/docs/api)
* [Style Guide](/docs/contributing/style-guide)
