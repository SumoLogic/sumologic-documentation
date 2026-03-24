# Create New App Doc — Automated App Documentation

Automates the complete workflow for creating a new Sumo Logic app integration doc with proper structure, frontmatter, and navigation setup.

## What this command does

When you invoke `app-doc`, Claude will guide you through:

1. **Gather app information**. Vendor name, category, description, and app icon.
2. **Create markdown file**. Generate doc with proper frontmatter and template structure.
3. **Add to sidebar**. Insert entry into `sidebars.ts` navigation.
4. **Add to hub page**. Create card on the appropriate category index page.
5. **Create CID URL**. Add permanent URL mapping in `cid-redirects.json`.
6. **Validate and test**. Check structure and provide next steps.

## When to use this command

* Creating a new app integration doc in `/docs/integrations/`.
* Documenting a new vendor/product integration.
* Setting up app documentation from scratch.

## App categories

Apps are organized by category in `/docs/integrations/`:

1. `aiml/` — AI and Machine Learning platforms
2. `amazon-aws/` — AWS services
3. `app-development/` — Development tools (GitHub, Jenkins, Jira)
4. `bigdata/` — Big data platforms
5. `cloud-security-monitoring-analytics/` — Cloud security platforms
6. `containers-orchestration/` — Kubernetes, Docker, containers
7. `databases/` — Database systems (MySQL, PostgreSQL, MongoDB)
8. `global-intelligence/` — Global intelligence integrations
9. `google/` — Google Cloud services
10. `hosts-operating-systems/` — OS monitoring (Linux, Windows)
11. `microsoft-azure/` — Azure services
12. `pci-compliance/` — PCI compliance integrations
13. `product-list/` — Product integrations
14. `saas-cloud/` — SaaS cloud applications
15. `saml/` — SAML authentication providers
16. `security-threat-detection/` — Security and threat tools
17. `sumo-apps/` — Sumo Logic native apps
18. `web-servers/` — Web servers (Nginx, Apache)
19. `webhooks/` — Webhook integrations

## Workflow

### Step 1: Gather information

Ask the user for:

**Required:**
* **Vendor name**. The product/vendor name (e.g., "Acme", "Datadog", "Okta")
* **Category**. Which integration category (e.g., "security-threat-detection", "databases")
* **Description**. Short description of what the app does (1-2 sentences)

**Optional:**
* **App icon URL**. S3 URL for the app icon (default: placeholder)
* **Data types**. What data does it collect? (logs, metrics, both)

**Derived:**
* **File ID**. Lowercase, hyphenated version of vendor name (e.g., "acme", "jfrog-artifactory")
* **File path**. `docs/integrations/{category}/{file-id}.md`

### Step 2: Create the markdown file

1. Generate proper frontmatter:
   ```yaml
   ---
   id: vendor-slug
   title: Vendor Name
   image: 'https://app_icons.s3.amazonaws.com/vendor.svg'
   tags:
     - apps
     - vendor-slug
   description: The Sumo Logic app for Vendor analyzes...
   ---
   ```

2. Add required imports:
   ```javascript
   import useBaseUrl from '@docusaurus/useBaseUrl';
   ```

3. Add noindex meta tag for new docs (remove after publishing):
   ```html
   <head>
     <meta name="robots" content="noindex" />
   </head>
   ```

4. Add introduction following Sumo Logic branding:
   - **Must start with**. "The Sumo Logic app for {Vendor Name}...".
   - Include business value and key use cases.
   - Keep to 2-3 sentences.

5. Add template sections:
   - Log and metric types.
   - Sample log messages.
   - Sample queries.
   - Installing the app (with reusable snippet).
   - Viewing dashboards (with reusable snippet).
   - Dashboard sections (placeholders).
   - Optional: Create monitors section.
   - Optional: Alerts table.
   - Upgrade/Downgrade section.
   - Uninstalling section.

### Step 3: Add to sidebar navigation

1. Read `sidebars.ts`.
2. Find the appropriate category section (e.g., `integrations.databases`).
3. Add the new doc entry alphabetically:
   ```typescript
   'integrations/category/vendor-slug',
   ```
4. Validate TypeScript syntax after adding.

**Example:**
```typescript
integrations: {
  databases: [
    'integrations/databases/mongodb',
    'integrations/databases/mysql',
    'integrations/databases/postgresql', // <- new entry added here
  ],
}
```

### Step 4: Add card to hub page

1. Read the category's `index.md` file (e.g., `docs/integrations/databases/index.md`).
2. Create a card using the standard HTML pattern:
   ```html
   <div className="box smallbox card">
     <div className="container">
     <a href={useBaseUrl('docs/integrations/category/vendor-slug')}>
       <img src={useBaseUrl('img/integrations/category/icon.png')}
            alt="Thumbnail icon" width="55"/>
       <h4>Vendor Name</h4>
     </a>
     <p>A guide to Sumo Logic apps for Vendor Name.</p>
     </div>
   </div>
   ```
3. Insert alphabetically or at the end (depending on hub page sorting).
4. Ensure proper indentation and closing tags.

**Note**. Some hub pages sort alphabetically, others by priority. Check existing pattern.

### Step 5: Create CID URL mapping

1. Read `cid-redirects.json`.
2. Find the next available CID number:
   - Search for highest CID in the integrations range (typically 5000-6000).
   - Use next sequential number.
3. Add mapping:
   ```json
   "/cid/5XXX": "/docs/integrations/category/vendor-slug",
   ```
4. Validate JSON syntax.
5. Tell the user their CID number for UI integration.

**Example:**
```json
"/cid/5120": "/docs/integrations/databases/mongodb",
"/cid/5121": "/docs/integrations/databases/mysql",
"/cid/5122": "/docs/integrations/databases/postgresql",
```

### Step 6: Populate template sections

Guide the user to fill in:

**Log and metric types section:**
* Add sample log messages in JSON code blocks with proper syntax highlighting.
* Add sample queries in SQL code blocks.
* Reference vendor documentation where appropriate.

**Dashboard sections:**
* Each dashboard needs:
  * Name as H3 heading.
  * Description of what it shows.
  * "Use this dashboard to:" bulleted list.
  * Screenshot with proper sizing: `width="800"` and border style.

**Optional sections:**
* Monitors/Alerts: Only include if app has pre-configured monitors.
* Prerequisites: Only if special setup required.

### Step 7: Validation checklist

Before finishing, verify:
* [ ] Frontmatter complete with all required fields.
* [ ] Title is Title Case, under 60 characters.
* [ ] Description starts with "The Sumo Logic app for {Vendor}...".
* [ ] Tags include "apps" and vendor slug.
* [ ] Added to `sidebars.ts` in correct category.
* [ ] Card added to hub page with proper HTML structure.
* [ ] CID mapping added to `cid-redirects.json`.
* [ ] All reusable imports use correct relative paths.
* [ ] noindex meta tag present for unpublished docs.
* [ ] JSON files valid (no syntax errors).
* [ ] All placeholder text replaced or removed.

## App Template Structure

All app docs use the standard app template (app-template-v2.md):
* Standard structure with dashboard sections.
* Includes upgrade/downgrade sections.
* Uses `app-install-v2.md` reusable snippet.
* Optional monitors section.

## Example usage

```
User: "Create a new app doc for PostgreSQL in the databases category"

Claude:
1. Confirms: vendor = "PostgreSQL", category = "databases"
2. Creates: docs/integrations/databases/postgresql.md
3. Generates frontmatter:
   - id: postgresql
   - title: PostgreSQL
   - tags: [apps, postgresql]
4. Adds template structure with all sections
5. Updates sidebars.ts: integrations.databases array
6. Adds card to docs/integrations/databases/index.md
7. Creates CID: "/cid/5122": "/docs/integrations/databases/postgresql"
8. Provides checklist and next steps
```

## Safety principles

* **Check for existing docs** before creating (search for vendor name).
* **Validate category exists** before creating file.
* **Use correct relative paths** for imports based on file location.
* **Preserve hub page structure** when adding cards (indentation, order).
* **Validate JSON** after every edit to cid-redirects.json.
* **Do not remove noindex tag** until doc is ready for production.

## Common patterns

**Two-level paths** for vendor with multiple products:
```
docs/integrations/amazon-aws/config.md
docs/integrations/amazon-aws/cloudfront.md
docs/integrations/amazon-aws/s3-audit.md
```

**Single-level paths** for standalone vendors:
```
docs/integrations/databases/postgresql.md
docs/integrations/app-development/jenkins.md
```

## Icon guidelines

App icons should:
* Be in PNG or SVG format.
* Size: ~45-90px width (55px is standard).
* Stored in: `static/img/integrations/{category}/`.
* S3 URL format: `https://app_icons.s3.amazonaws.com/{vendor}.svg`.
* Alt text: "Thumbnail icon".

If no icon available, use placeholder and note in checklist.

## Post-completion message

After successfully creating the app doc, tell the user:

```
✅ App doc created successfully!

Files created/modified:
* 📄 docs/integrations/{category}/{vendor-slug}.md
* 🔗 sidebars.ts (added to {category} section)
* 🎴 docs/integrations/{category}/index.md (card added)
* 🔢 cid-redirects.json (CID: /cid/XXXX)

Next steps:
1. Fill in template sections:
   - Add sample log messages and queries
   - Add dashboard descriptions and screenshots
   - Remove optional sections if not needed
2. Add app icon to static/img/integrations/{category}/
3. Remove <meta name="robots" content="noindex" /> when ready to publish
4. Test locally: yarn start
5. Submit PR: "DOCS-XXX - Add {Vendor Name} app documentation"

Checklist:
* [ ] Sample logs and queries added
* [ ] Dashboard sections completed
* [ ] App icon added
* [ ] All placeholders replaced
* [ ] Tested locally

Would you like me to help fill in any of these sections?
```

## Error handling

**If category does not exist**:
* Show list of valid categories.
* Ask user to confirm or choose different category.

**If doc already exists**:
* Show existing file path.
* Ask if user wants to update it instead.
* Offer to create with different name (e.g., vendor-v2).

**If sidebar section not found**:
* Show closest match.
* Ask for confirmation before creating new section.

**If CID range full** (unlikely):
* Suggest next available range.
* Alert user to coordinate with docs team.

**If JSON becomes invalid**:
* Show syntax error.
* Revert the change.
* Fix and retry.

## Reusable snippets reference

Common imports for app docs:

```markdown
import AppInstall2 from '../../reuse/apps/app-install-v2.md';
import ViewDashboards from '../../reuse/apps/view-dashboards.md';
import CreateMonitors from '../../reuse/apps/create-monitors.md';
import AppUpdate from '../../reuse/apps/app-update.md';
import AppUninstall from '../../reuse/apps/app-uninstall.md';
```

**Path adjustment**. Relative paths depend on file location depth. Most integrations are 2 levels deep (`../..`).

## References

* [App Template v2](/docs/contributing/templates/app-template-v2).
* [Contributing Guide: Create or Edit a Doc](/docs/contributing/create-edit-doc).
* [Style Guide](/docs/contributing/style-guide).
