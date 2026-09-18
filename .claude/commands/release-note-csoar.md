# Create New Cloud SOAR Release Note

Automates the creation of Cloud SOAR (Automation Service) release notes for platform updates, integration changes, and bug fixes.

## What this command does

When you invoke `release-note-csoar`, Claude will guide you through:

1. **Determine release type**. Content Release or Application Update
2. **Gather release details**. Date, changes, integrations, playbooks, or platform updates
3. **Create markdown file**. Generate file with proper frontmatter and structure
4. **Format content**. Apply correct formatting for the release type
5. **Validate and preview**. Check structure and provide next steps

## When to use this command

* Publishing new integrations and playbooks (Content Release)
* Publishing Cloud SOAR platform updates (Application Update)
* Documenting integration updates or bug fixes
* Announcing new API endpoints or features
* Releasing playbook improvements

## Release types

### Content Release (`-content-release.md`)

For releases focused on new content (integrations and playbooks):
* **New integrations**: Brand new integrations added to App Central
* **Updated integrations**: Improvements to existing integrations
* **New playbooks**: New playbooks with ID numbers and titles
* **Simple format**: Just lists of what's new/updated, minimal descriptions

**Typical cadence**: Monthly or as content batches are released

### Application Update (`-application-update.md`)

For platform features, enhancements, and bug fixes:
* **Platform features**: New capabilities, UX improvements, APIs
* **Integration changes**: With detailed descriptions of what changed
* **Bug fixes**: Issues resolved in integrations, platform, or playbooks
* **Detailed format**: Sections with descriptions and context

**Typical cadence**: Monthly, published early the following month

## Release structure (varies by type)

### Content Release Structure

Simple format with just lists:

1. **Intro paragraph** - Brief description of release
2. **Integrations** (H3) - Bulleted list of [New]/[Updated] integrations
3. **Playbooks** (H3) - Bulleted list of [New] playbooks with IDs and titles

### Application Update Structure

Detailed format with descriptions and bug fixes:

1. **Release month header** (H2) - "## {Month} release"
2. **Changes and enhancements** (H3)
   - **Integrations** (H4) - New or updated integrations with descriptions
   - **Platform** (H4) - Platform features and improvements
   - **Playbooks** (H4) - Playbook-related changes (optional)
3. **Bug Fixes** (H3)
   - **Integrations** (H4) - Integration bug fixes
   - **Platform** (H4) - Platform bug fixes
   - **Playbooks** (H4) - Playbook bug fixes

## Workflow

### Step 1: Determine release type

Ask the user which type of release:

**Content Release** - For new integrations and playbooks
* Simple list format
* No detailed descriptions
* No bug fixes section
* Use when: Releasing batch of new content

**Application Update** - For platform features and bug fixes
* Detailed descriptions
* Bug fixes section
* Organized by month
* Use when: Monthly platform updates

### Step 2: Gather information

**For Content Release:**
* **Publication date**: Date in YYYY-MM-DD format
* **New integrations**: List of integrations to add
* **Updated integrations**: List of integrations to update
* **New playbooks**: List with ID numbers and titles (if any)

**For Application Update:**
* **Release month**: Which month is this release for? (e.g., "February")
* **Publication date**: Date in YYYY-MM-DD format (typically early next month)
* **Integration changes**: New or updated integrations with descriptions
* **Platform changes**: Platform features and improvements
* **Bug fixes**: List of bugs fixed

**Keywords (for both types):**
* Ask user to confirm or customize keywords
* Suggested defaults (see frontmatter section below)

**Validate:**
* Check that date is not in the future
* For Application Update: Ensure release month aligns with publication date
* Verify integration links are valid
* Confirm keywords with user before creating file

### Step 3: Create the markdown file

**File naming convention:**

For Content Release:
```
blog-csoar/YYYY-MM-DD-content-release.md
```

For Application Update:
```
blog-csoar/YYYY-MM-DD-application-update.md
```

Examples:
* `blog-csoar/2024-06-05-content-release.md`
* `blog-csoar/2026-03-06-application-update.md`

**Important**: Files are created in `/blog-csoar/` directory (root level)

### Step 4: Generate frontmatter

**For Content Release:**
```yaml
---
title: {Month DD, YYYY} - Content Release
hide_table_of_contents: true
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - automation service
  - cloud soar
  - soar
---
```

**For Application Update:**
```yaml
---
title: {Month DD, YYYY} - Application Update
hide_table_of_contents: true
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - automation service
  - cloud soar
---
```

**Title formatting:**
* Start with full date: "Month DD, YYYY" (e.g., "June 05, 2024" or "March 06, 2026")
* Follow with " - Content Release" or " - Application Update"

**Date formatting:**
* Use full month name (January, February, March, etc.)
* Use zero-padded day (01, 05, 06, 08, not 1, 5, 6, 8)

**Keywords:**
* **Always ask user to confirm keywords before creating file**
* Suggested defaults:
  * Content Release: `automation service`, `cloud soar`, `soar` (three keywords)
  * Application Update: `automation service`, `cloud soar` (two keywords)
* User may want to add additional keywords based on specific content (e.g., `integrations`, `playbooks`, `api`, `platform`)

**Image:**
* Both types use the same standard Sumo Logic preview image:
  * `https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082`

### Step 5: Add required import

**For both types**, add the useBaseUrl import after frontmatter:
```javascript
import useBaseUrl from '@docusaurus/useBaseUrl';
```

### Step 6: Write content structure

**Content Release template:**
```markdown
---
title: June 05, 2024 - Content Release
hide_table_of_contents: true
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - automation service
  - cloud soar
  - soar
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This release introduces new integrations, new playbooks, and several updates.

### Integrations

* [New] [AWS WAF](/docs/platform-services/automation-service/app-central/integrations/aws-waf)
* [Updated] [Okta](/docs/platform-services/automation-service/app-central/integrations/okta)

### Playbooks

* [New] 541 - Management of AWS EKS Insights
* [New] 542 - Resolution of AWS EKS Insights
```

**Application Update template:**
```markdown
---
title: March 06, 2026 - Application Update
hide_table_of_contents: true
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - automation service
  - cloud soar
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## {Month} release

Following are the updates made in {Month} {YYYY}.

### Changes and enhancements

#### Integrations

* [Added] [Integration Name](/docs/path/to/integration/) - Description of what was added.
* [Updated] [Integration Name](/docs/path/to/integration/) - Description of what was updated.

#### Platform

* Description of platform enhancement or feature.
* Description of another platform change.

### Bug Fixes

#### Integrations

* In the [Integration Name](/docs/path/to/integration/) integration, description of bug fix.

#### Platform

Fixed an issue where [description of bug and fix].
```

### Step 7: Content formatting guidelines

## Content Release Formatting

#### Intro Paragraph

* Simple one-sentence description
* Format: "This release introduces {what's new}."
* Examples:
  * "This release introduces new integrations, new playbooks, and several updates."
  * "This release introduces new integrations and updates to existing integrations."

#### Integrations Section (H3)

* Simple bulleted list with [New] or [Updated] tags
* Format: `* [Tag] [Integration Name](link)`
* NO descriptions needed - just link to integration doc
* Links use full path: `/docs/platform-services/automation-service/app-central/integrations/{slug}`

**Example:**
```markdown
### Integrations

* [New] [AWS WAF](/docs/platform-services/automation-service/app-central/integrations/aws-waf)
* [New] [Cyberint](/docs/platform-services/automation-service/app-central/integrations/cyberint)
* [Updated] [Okta](/docs/platform-services/automation-service/app-central/integrations/okta)
* [Updated] [ServiceNow V2](/docs/platform-services/automation-service/app-central/integrations/servicenow-v2)
```

#### Playbooks Section (H3)

* Optional - only if new playbooks released
* Format: `* [New] {ID} - {Playbook Title}`
* ID is a number (e.g., 541, 542, 543)
* Use "- " between ID and title

**Example:**
```markdown
### Playbooks

* [New] 541 - Management of AWS EKS Insights
* [New] 542 - Resolution of AWS EKS Insights
* [New] 543 - Alert and Vulnerability detection with Sysdig Secure
```

## Application Update Formatting

#### Release Month Header (H2)

* Always use H2 (`##`) for the month
* Format: "## {Month} release"
* Examples: "## February release", "## March release"
* Followed by: "Following are the updates made in {Month} {YYYY}."

#### Changes and Enhancements Section

**Integrations subsection:**
* Use tags: `[Added]` for new integrations, `[Updated]` for existing ones
* Format: `[Tag] [Integration Name](link) - Description.`
* Link to integration documentation in `/docs/platform-services/automation-service/app-central/integrations/`
* Be specific about what action or feature was added/updated
* Can mention specific actions: "Added 'Count Occurrence Of Value' action"

**Example:**
```markdown
#### Integrations

* [Added] [Sumo Logic Automation Tools](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-automation-tools/) - Added "Count Occurrence Of Value" action to count the occurrence of a specified value in texts.
* [Updated] [ThreatConnect V3](/docs/platform-services/automation-service/app-central/integrations/threatconnect-v3/) - Added observations parameter to the Update Intelligence action to enable recording observation counts for indicators.
```

**Platform subsection:**
* List platform-wide changes or features
* Focus on user-facing improvements
* Can include UX enhancements, new APIs, or system improvements
* Use clear, simple language

**Example:**
```markdown
#### Platform

* Improved the sorting UX experience on all tables in Cloud SOAR and the Automation Service to align with other Sumo Logic modules.
* Deleted records will no longer be fetched during table searches unless the `Deleted` filter is applied.
* Added new public APIs:
  * [Add playbooks to an incident](https://api.sumologic.com/docs/csoar/#operation/incidents_runbook_create).
  * [Retrieve all playbooks attached to a specific incident](https://api.sumologic.com/docs/csoar/#operation/incidents_runbook_retrieve).
```

**Playbooks subsection (optional):**
* Only include if there are playbook-specific changes
* Format similar to platform changes

#### Bug Fixes Section

* Group by subsection: Integrations, Platform, Playbooks
* For integrations: Start with "In the [Integration Name](link) integration, ..."
* For platform/playbooks: Use "Fixed an issue where..." or direct description
* Be specific about what was fixed

**Example:**
```markdown
### Bug Fixes

#### Integrations

* In the [Microsoft EWS (Graph)](/docs/platform-services/automation-service/app-central/integrations/microsoft-ews-graph/) integration, removed the default values for the `has_attachments` and `un_read` fields in the Search Emails Extended action. The change allows users to search for emails without being forced to filter by attachment status or read/unread status.

#### Platform

Fixed an issue where query filters were being applied incorrectly during search.

#### Playbooks

Fixed issues while selecting variables containing the period character in textarea fields and test node input.
```

### Step 8: Validation checklist

**For Content Release:**
* [ ] File created in `/blog-csoar/` directory
* [ ] Filename is `YYYY-MM-DD-content-release.md`
* [ ] Title is "Month DD, YYYY - Content Release" (zero-padded day)
* [ ] Date uses full month name with zero-padded day (e.g., "June 05")
* [ ] Image URL: Standard Sumo Logic preview image
* [ ] Keywords: automation service, cloud soar, soar (three keywords)
* [ ] `hide_table_of_contents: true` is present
* [ ] Import statement included
* [ ] Simple intro paragraph present
* [ ] Integrations section uses [New]/[Updated] tags
* [ ] Integration links have NO descriptions (just links)
* [ ] Playbooks section uses [New] with ID numbers (if included)
* [ ] No trailing whitespace

**For Application Update:**
* [ ] File created in `/blog-csoar/` directory
* [ ] Filename is `YYYY-MM-DD-application-update.md`
* [ ] Title is "Month DD, YYYY - Application Update" (zero-padded day)
* [ ] Date uses full month name with zero-padded day (e.g., "March 06")
* [ ] Image URL: Standard Sumo Logic preview image
* [ ] Keywords: automation service, cloud soar (two keywords)
* [ ] `hide_table_of_contents: true` is present
* [ ] Import statement included
* [ ] H2 header: "## {Month} release"
* [ ] Intro: "Following are the updates made in {Month} {YYYY}."
* [ ] Integration changes use [Added]/[Updated] WITH descriptions
* [ ] Integration links point to correct paths
* [ ] All sections properly formatted (H3 for main, H4 for subsections)
* [ ] No trailing whitespace

## Example usage

### Content Release Example

```
User: "Create a Cloud SOAR content release for June 5, 2024, with new AWS integrations and playbooks"

Claude:
1. Confirms type: Content Release
2. Confirms date: June 5, 2024
3. Creates: blog-csoar/2024-06-05-content-release.md
4. Generates frontmatter:
   - title: "June 05, 2024 - Content Release"
   - image: Standard Sumo Logic preview image
   - keywords: automation service, cloud soar, soar
5. Writes content with:
   - Simple intro: "This release introduces new integrations, new playbooks, and several updates."
   - Integrations section with [New]/[Updated] tags (no descriptions)
   - Playbooks section with ID numbers
6. Provides checklist
```

### Application Update Example

```
User: "Create a Cloud SOAR release note for February 2026, published March 6, with integration updates and bug fixes"

Claude:
1. Confirms type: Application Update
2. Confirms publication date: March 6, 2026
3. Confirms release month: February
4. Creates: blog-csoar/2026-03-06-application-update.md
5. Generates frontmatter:
   - title: "March 06, 2026 - Application Update"
   - keywords: automation service, cloud soar
6. Writes content with:
   - H2: "## February release"
   - Intro: "Following are the updates made in February 2026."
   - Changes and enhancements section (with descriptions)
   - Bug fixes section
7. Provides checklist
```

## Integration documentation paths

Integration docs are located at:
```
/docs/platform-services/automation-service/app-central/integrations/{integration-slug}/
```

**Common integrations:**
* Microsoft EWS (Graph): `/docs/platform-services/automation-service/app-central/integrations/microsoft-ews-graph/`
* ThreatConnect V3: `/docs/platform-services/automation-service/app-central/integrations/threatconnect-v3/`
* Atlassian Opsgenie: `/docs/platform-services/automation-service/app-central/integrations/atlassian-opsgenie/`
* Sumo Logic Automation Tools: `/docs/platform-services/automation-service/app-central/integrations/sumo-logic-automation-tools/`

**Tip**: Integration slugs are lowercase with hyphens. If unsure, use Grep to find the integration doc.

## API documentation links

Cloud SOAR API docs:
* API reference: `https://api.sumologic.com/docs/csoar/`
* Cloud SOAR automation docs: `/docs/cloud-soar/automation/`

## Date formatting rules

**Format: "Month DD, YYYY"**

Month names (full):
* January, February, March, April, May, June
* July, August, September, October, November, December

Day: Zero-padded two digits (use 01, 06, 08, 15... not 1, 6, 8)

**Examples:**
* ✅ March 06, 2026
* ✅ January 08, 2026
* ✅ December 31, 2025
* ✅ June 05, 2024
* ❌ March 6, 2026 (not zero-padded)
* ❌ March 6th, 2026 (has ordinal)
* ❌ Mar 06, 2026 (abbreviated month)
* ❌ 2026-03-06 (wrong format)

## Release timing

**Important**: Cloud SOAR release notes are typically published early the following month for the previous month's changes.

**Pattern:**
* February changes → Published early March (e.g., March 6)
* January changes → Published early February
* December changes → Published early January

**In the file:**
* Filename uses publication date: `2026-03-06-application-update.md`
* Title uses publication date: "March 6, 2026 - Application Update"
* H2 uses release month: "## February release"
* Intro uses release month: "Following are the updates made in February 2026."

## Safety principles

* **Check for existing files** before creating to avoid duplicates
* **Validate release month alignment** with publication date
* **Verify integration links** exist before including them
* **Use consistent formatting** for all integration changes
* **Include both keywords**. Automation service and cloud soar
* **Group bug fixes by category** for clarity
* **Keep descriptions concise** but informative

## Post-completion message

After successfully creating the release note, tell the user:

```
✅ Cloud SOAR release note created successfully!

File created:
* 📄 blog-csoar/{YYYY-MM-DD}-application-update.md

Summary:
* 📅 Publication: {Month Day, YYYY}
* 📆 Release month: {Month}
* 🔧 Integration updates: {count}
* 🐛 Bug fixes: {count}

Next steps:
1. Review all integration links are correct
2. Verify bug fix descriptions are accurate
3. Ensure release month matches publication date
4. Test locally: yarn start
5. Check preview at: http://localhost:3000/release-notes-csoar
6. Submit PR: "DOCS-XXX - Cloud SOAR {Month} release notes"

Checklist:
* [ ] Filename is {date}-application-update.md
* [ ] Title follows "Month Day, YYYY - Application Update" format
* [ ] H2 header is "## {Month} release"
* [ ] Integration changes use [Added]/[Updated] tags
* [ ] All integration links are valid
* [ ] Keywords include automation service and cloud soar
* [ ] Bug fixes grouped by category

The release note will appear on the Cloud SOAR release notes page in reverse chronological order (newest first).

Would you like me to help refine any sections or add additional details?
```

## Error handling

**If file already exists:**
* Show existing file path and date
* Ask if user wants to:
  * Update existing file (add more content)
  * Use different date
  * Create anyway (overwrite - requires confirmation)

**If release month doesn't match date:**
* Warn user about mismatch
* Example: "March 6 publication should be for February release, not March"
* Ask for confirmation or correction

**If integration link looks invalid:**
* Warn if doesn't follow standard path pattern
* Suggest searching for correct integration doc
* Proceed with user confirmation

**If date is in the future:**
* Warn user and ask for confirmation
* Suggest using current date

## Tips and best practices

**For integration changes:**
* Be specific about what actions were added or updated
* Include the purpose or benefit of the change
* Always link to integration documentation
* Use [Added] for completely new integrations
* Use [Updated] for changes to existing integrations

**For platform changes:**
* Focus on user-facing improvements
* Explain the benefit or impact
* Group related changes together
* Include API links when relevant

**For bug fixes:**
* Clearly describe what was fixed
* Explain the previous behavior and new behavior
* Group by category for organization

**All sections:**
* Keep language clear and concise
* Focus on what changed and why it matters
* Use bullet points for easy scanning
* Maintain consistent formatting

## References

* [Cloud SOAR Release Notes](https://sumologic.com/help/release-notes-csoar)
* [Cloud SOAR Documentation](/docs/cloud-soar)
* [Automation Service](/docs/platform-services/automation-service)
* [App Central Integrations](/docs/platform-services/automation-service/app-central/integrations)
* [Style Guide](/docs/contributing/style-guide)
