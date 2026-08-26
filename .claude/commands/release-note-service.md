# Create New Service Release Note

Automates the creation of Service release notes for new features, updates, and improvements across Sumo Logic platform categories.

## What this command does

When you invoke `release-note-service`, Claude will guide you through:

1. **Determine category**. Apps, Manage, Collection, Search, or UI
2. **Gather release details**. Feature name, description, and changes
3. **Create markdown file**. Generate file with proper frontmatter and structure
4. **Format content**. Apply correct formatting for the feature announcement
5. **Validate and preview**. Check structure and provide next steps

## When to use this command

* Announcing new platform features or capabilities
* Documenting updates to existing features
* Publishing UI improvements and enhancements
* Releasing new collection methods or integrations
* Announcing management and admin features
* Publishing app-related updates

## Categories

Service release notes are organized by platform area:

* **Apps**. App-related features and updates
* **Collection**. Data collection features, sources, authentication
* **Manage**. Management and administration features
* **Search**. Search features, queries, analytics
* **UI**. User interface updates and improvements (often labeled "New UI")

## Workflow

### Step 1: Gather information

Ask the user for:

**Required:**
* **Category**: Which platform area (apps, collection, manage, search, ui)
* **Feature name**: Brief, descriptive name of the feature or update
* **Release date**: Date in YYYY-MM-DD format
* **Description**: What the feature does and why it matters (2-3 sentences)

**Optional:**
* **Documentation link**: Relative path to the doc (e.g., `/docs/manage/...`)
* **"What's new" details**: Bulleted list of specific changes or capabilities
* **Keywords**: Custom keywords for frontmatter (suggest defaults based on content)

**Validate:**
* Check that date is not in the future
* Ensure category is valid (apps, collection, manage, search, ui)
* Verify documentation link is valid relative path if provided
* Ask user to confirm keywords before creating file

### Step 2: Create the markdown file

**File naming convention:**
```
blog-service/YYYY-MM-DD-{category}.md
```

Examples:
* `blog-service/2026-03-20-collection.md`
* `blog-service/2026-03-18-apps.md`
* `blog-service/2026-02-12-ui.md`

**Important**: Files are created in `/blog-service/` directory

**Note on file conflicts**: If a file already exists for the same date and category, ask the user:
* Use a different date
* Append to existing file (if related features)
* Use more specific category suffix (e.g., `-collection-m365` if needed)

### Step 3: Generate frontmatter

**Standard frontmatter:**
```yaml
---
title: {Feature Description} ({Category})
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - {keyword1}
  - {keyword2}
hide_table_of_contents: true
---
```

**Title formatting:**
* Feature description in Title Case
* Category in parentheses: (Apps), (Collection), (Manage), (Search), (New UI)
* NO date in title (unlike other release note types)
* Keep concise but descriptive
* Examples:
  * "App Registration Authentication for Microsoft 365 Audit Source (Collection)"
  * "Data Volume for MSSP (Apps)"
  * "Content Item Actions Available Directly From Navigation Menus (New UI)"

**Category labels in titles:**
* apps → (Apps)
* collection → (Collection)
* manage → (Manage)
* search → (Search)
* ui → (New UI)

**Image:**
* Always use the standard Sumo Logic preview image
* URL: `https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082`

**Keywords:**
* **Always ask user to confirm keywords before creating file**
* Suggest keywords based on content:
  * Feature-specific terms (e.g., "Microsoft 365 Audit", "authentication")
  * Category keywords (e.g., "apps", "ui", "collection")
  * Product names or technologies mentioned
* Format:
  ```yaml
  keywords:
    - keyword1
    - keyword2
  ```
* User can customize the list

### Step 4: Add optional import

For release notes that use links or useBaseUrl:
```javascript
import useBaseUrl from '@docusaurus/useBaseUrl';
```

**Note**: Only add if content uses it. For simple text-only releases, omit.

### Step 5: Write content

Content goes directly after frontmatter (and optional import). No H3 heading needed — the title is in frontmatter.

**Basic structure:**
```markdown
---
title: Feature Name (Category)
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - keyword1
  - keyword2
hide_table_of_contents: true
---

{Description paragraph explaining the feature and its benefits}

{Optional: What's new section with bulleted list}

{Optional: Documentation links}
```

#### Simple Feature Announcement

For straightforward feature updates:
```markdown
---
title: App Registration Authentication for Microsoft 365 Audit Source (Collection)
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - Microsoft 365 Audit
  - authentication
hide_table_of_contents: true
---

The Microsoft 365 Audit Source now supports the App Registration authentication method. This enhancement allows organizations to authenticate using Azure Active Directory App Registrations, providing a more secure and flexible authentication option for collecting Microsoft 365 audit logs.

[Learn more](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/microsoft-365-audit-source/).
```

#### Feature with "What's new" Section

For features with multiple specific changes:
```markdown
---
title: Content Item Actions Available Directly From Navigation Menus (New UI)
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - ui
hide_table_of_contents: true
---

You can now perform common actions on content items directly from the navigation menus in the left-hand sidebar, making it faster and easier to manage your content without opening each item.

**What's new:**
* Right-click on any content item in the sidebar to access a context menu
* Available actions: Open, Open in New Tab, Copy, Move, Delete, Share, Schedule Report
* Works for dashboards, searches, folders, and other content items
* Same functionality as the Actions menu in the Content Library

This enhancement streamlines your workflow by providing quick access to frequently used actions. [Learn more](/docs/get-started/library/).
```

### Step 6: Content formatting guidelines

**Write for clarity:**
* Start with a clear statement of what the feature is
* Explain the benefit or business value in 2-3 sentences
* Use "What's new:" section for bulleted specifics (optional)
* End with a "Learn more" link to relevant docs

**Use formatting for readability:**
* Use **bold** for section labels like "What's new:"
* Use bullet lists for multiple related items
* Use admonitions (`:::note`, `:::warning`) for important callouts if needed
* Keep paragraphs concise (2-4 sentences max)

**Links:**
* Always use relative paths starting with `/docs/`
* Use descriptive link text (typically "Learn more")
* Example: `[Learn more](/docs/send-data/...)`

**Examples by category:**

**Apps:**
```markdown
---
title: Data Volume for MSSP (Apps)
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - data-volume-for-mssp
  - apps
hide_table_of_contents: true
---

The Data Volume for MSSP app is now available, providing managed security service providers with visibility into data usage across multiple customer accounts. This app helps MSSPs track, analyze, and optimize data ingestion to improve cost management and capacity planning.

[Learn more](/docs/integrations/sumo-apps/data-volume-for-mssp).
```

**Collection:**
```markdown
---
title: Enhanced Authentication Options for Cloud Sources (Collection)
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - authentication
  - cloud-to-cloud
  - collection
hide_table_of_contents: true
---

Cloud-to-Cloud sources now support additional authentication methods including OAuth 2.0 client credentials flow and service account authentication. These new options provide more flexibility for enterprise customers to integrate with cloud services using their preferred authentication standards.

**What's new:**
* OAuth 2.0 client credentials flow for machine-to-machine authentication
* Service account support for Google Cloud and AWS integrations
* Enhanced security with token rotation and expiration handling
* Backward compatible with existing authentication methods

[Learn more](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/).
```

**UI:**
```markdown
---
title: Improved Dashboard Loading Performance (New UI)
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - ui
  - dashboards
  - performance
hide_table_of_contents: true
---

Dashboards now load up to 50% faster in the new UI through optimized query execution and progressive rendering. Large dashboards with many panels will see the most significant improvements, reducing wait times and improving the overall user experience.
```

### Step 7: Validation checklist

Before finishing, verify:
* [ ] File created in `/blog-service/` directory
* [ ] Filename follows pattern: `YYYY-MM-DD-{category}.md`
* [ ] Frontmatter complete with all required fields
* [ ] Title includes feature description and category in parentheses
* [ ] Title does NOT include date
* [ ] `hide_table_of_contents: true` is present
* [ ] Standard image URL is used
* [ ] Keywords confirmed with user
* [ ] Category label uses correct format: (Apps), (Collection), (Manage), (Search), (New UI)
* [ ] Content is clear and focused on user benefits
* [ ] Documentation link uses relative path (starts with `/docs/`)
* [ ] No trailing whitespace

## Example usage

### Collection Feature Example

```
User: "Create a Service release note for Microsoft 365 Audit Source App Registration authentication, collection category, dated March 20, 2026"

Claude:
1. Confirms category: Collection
2. Confirms date: 2026-03-20
3. Asks for keywords (suggests: "Microsoft 365 Audit", "authentication")
4. Creates: blog-service/2026-03-20-collection.md
5. Generates frontmatter:
   - title: "App Registration Authentication for Microsoft 365 Audit Source (Collection)"
   - keywords: Microsoft 365 Audit, authentication
6. Writes content with:
   - Description of new authentication method
   - Business value
   - Link to documentation
7. Provides checklist
```

### UI Feature Example

```
User: "Create a Service release note for new context menu actions in the sidebar, UI category, dated February 12, 2026"

Claude:
1. Confirms category: UI
2. Confirms date: 2026-02-12
3. Asks for keywords (suggests: "ui", "navigation")
4. Creates: blog-service/2026-02-12-ui.md
5. Generates frontmatter:
   - title: "Content Item Actions Available Directly From Navigation Menus (New UI)"
   - keywords: ui
6. Writes content with:
   - Feature description
   - "What's new" section with bullets
   - Link to documentation
7. Provides checklist
```

## Category guidelines

**Apps**. Use for:
* New apps or app updates
* App integrations
* App-specific features
* MSSP or multi-tenant features

**Collection**. Use for:
* New sources or source types
* Collection authentication changes
* Collector features
* Data ingestion enhancements

**Manage**. Use for:
* Account management features
* User and role management
* Security and compliance features
* Settings and configuration updates

**Search**. Use for:
* Search language enhancements
* Query performance improvements
* Analytics features
* Data parsing updates

**UI**. Use for:
* User interface changes
* Navigation improvements
* Visual design updates
* Workflow enhancements
* Label as "(New UI)" in title

## Safety principles

* **Check for existing files** before creating (same date + category = conflict)
* **Validate category** is one of: apps, collection, manage, search, ui
* **Use clear, descriptive titles** that explain the feature
* **Include documentation links**. Help users find more info
* **Use standard frontmatter**. Consistent image URL and structure
* **Keep content focused**. One feature per release note
* **Always ask user to confirm keywords** before creating file

## Post-completion message

After successfully creating the release note, tell the user:

```
✅ Service release note created successfully!

File created:
* 📄 blog-service/{YYYY-MM-DD-category}.md

Summary:
* 📋 Category: {Category}
* 📝 Title: {Feature Description} ({Category})
* 🏷️ Keywords: {keywords}

Next steps:
1. Review content for accuracy and clarity
2. Verify documentation link is correct
3. Ensure keywords are appropriate
4. Test locally: yarn start
5. Check preview at: http://localhost:3000/release-notes-service
6. Submit PR: "DOCS-XXX - Service release note: {Feature Description}"

Checklist:
* [ ] Title format is correct (Feature Description (Category))
* [ ] Title does NOT include date
* [ ] Category label uses correct format
* [ ] Standard image URL is used
* [ ] hide_table_of_contents: true is present
* [ ] Documentation link uses relative path
* [ ] Content is clear and concise
* [ ] Keywords confirmed with user

The release note will appear on the Service release notes page in reverse chronological order (newest first).

Would you like me to help refine the content or add additional details?
```

## Error handling

**If file already exists:**
* Show existing file path and creation date
* Ask if user wants to:
  * Use different date
  * Append to existing file (if related features)
  * Use more specific category suffix (e.g., `-collection-m365`)
  * Overwrite (requires explicit confirmation)

**If date is in the future:**
* Warn user and ask for confirmation
* Suggest using current date

**If category is invalid:**
* Show error: "Category must be one of: apps, collection, manage, search, ui"
* Ask user to select valid category

**If documentation link looks invalid:**
* Warn if doesn't start with `/docs/`
* Suggest correction
* Proceed with user confirmation

**If title is too long:**
* Warn if title exceeds 100 characters
* Suggest shorter, more concise wording
* Category label must stay in title

**If keywords not confirmed:**
* Do not create file until user confirms keywords
* Show suggested keywords and wait for approval/modification

## Tips and best practices

**For all Service releases:**
* Lead with user benefit, not technical implementation
* Explain "what" and "why", not "how"
* Keep descriptions concise (2-3 sentences)
* Link to comprehensive documentation for details
* Use "What's new" bullets for multiple specific changes

**Title guidelines:**
* Be specific about the feature (not "New Collection Feature")
* Use active language ("Enhanced...", "New...", "Improved...")
* Include category in parentheses at end
* No date in title (unlike other release types)
* Keep under 100 characters including category

**Content structure:**
* First paragraph: What is it and why does it matter?
* Optional "What's new" section: Specific capabilities or changes
* Final element: "Learn more" link to docs

**Keywords:**
* Include feature-specific terms
* Add category keyword (apps, ui, collection, etc.)
* Mention product names or technologies
* Keep list focused (2-5 keywords)

## References

* [Service Release Notes](https://sumologic.com/help/release-notes-service)
* [Release Notes Index](/docs/release-notes)
* [Style Guide](/docs/contributing/style-guide)
