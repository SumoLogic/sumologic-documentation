# new-c2c-source-doc

Create a new Cloud-to-Cloud integration source documentation page with proper structure, navigation, and redirects.

## Usage

```
/new-c2c-source-doc
```

## Overview

This command automates the creation of Cloud-to-Cloud (C2C) source documentation by:
1. Creating a properly structured doc file from the template
2. Adding the source to the sidebar navigation
3. Creating a CID redirect mapping
4. Including all expected frontmatter and sections

## Prerequisites

Before running this command, you should have:
* Vendor name and icon/logo URL
* List of data sources and polling intervals
* Vendor configuration prerequisites (if applicable)
* Source configuration steps for Sumo Logic UI
* Metadata fields information
* JSON schema configuration parameters
* Fed deployment availability status

## Process

### Step 1: Gather Information

Ask the user for the following information using AskUserQuestion:

**Question 1**: "What is the vendor/product name?"
* **Header**: "Vendor Name"
* **Options**:
  * "I'll provide it in text" (description: "Enter the full vendor/product name exactly as it should appear")
  * Note: Use the "Other" option that's automatically provided

**Question 2**: "What is the icon URL for this source?"
* **Header**: "Icon URL"
* **Options**:
  * "Use S3 app icons URL" (description: "Format: https://app_icons.s3.amazonaws.com/{vendor}.svg")
  * "I'll provide a custom URL" (description: "Provide the full HTTPS URL to the icon")

**Question 3**: "Is this source available in Fed deployment?"
* **Header**: "Fed Deployment"
* **Options**:
  * "Not available" (description: "Include note that source is not available in Fed deployment")
  * "Available" (description: "Source is available in Fed deployment, no note needed")
  * "Unknown" (description: "Check with team and include the not-available note for now")

**Question 4**: "Do you have the vendor configuration details ready?"
* **Header**: "Vendor Config"
* **Options**:
  * "Yes, I'll provide them" (description: "I have prerequisites and vendor UI setup steps")
  * "No, I'll add them later" (description: "Leave placeholder comments in the template")
  * "Not applicable" (description: "This source does not require vendor-side configuration")

**Question 5**: "Do you have the data sources and polling intervals?"
* **Header**: "Data Sources"
* **Options**:
  * "Yes, ready to add" (description: "I have the complete table of data sources and intervals")
  * "No, I'll add later" (description: "Leave the example table structure")

### Step 2: Generate Slug and Paths

From the vendor name provided:
1. Generate a slug: lowercase, hyphenated version (e.g., "Druva" → "druva", "AWS CloudTrail" → "aws-cloudtrail")
2. Create file path: `/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/{slug}-source.md`
3. Generate document ID: `{slug}-source`
4. Generate CID: `c2c-{slug}`

### Step 3: Create the Documentation File

Read `docs/contributing/templates/c2c-source.md` and use it as the exact structure for the new file. Substitute all `{{placeholder}}` values with the vendor information gathered in Step 1.

**Required substitutions and rules:**
- **`id`**: `{slug}-source` (e.g., `druva-source`)
- **`image`**: S3 icon URL or placeholder
- **`sidebar_label`**: short vendor name only, no "Source" suffix
- **`description`**: must follow this style exactly: `"Learn how to configure the {Vendor Name} Cloud-to-Cloud Source in your Sumo Logic environment."`
- **Intro paragraph**: must start with `"The Sumo Logic source for {Vendor Name} enables you to collect..."`
- **Imports**: keep `useBaseUrl` and `ForwardToSiem` at the top; do not add `CodeBlock` or file imports
- **Fed deployment note**: include if source is not available in Fed (omit if available)
- **Vendor configuration section**: include only if vendor-side setup is needed; omit entirely otherwise
- **JSON/Terraform examples**: use `reference` code blocks pointing to `static/files/c2c/{slug}/example.json` and `static/files/c2c/{slug}/example.tf` — do not use `<CodeBlock>` component or download links
- **Section header**: `## JSON schema` (not "JSON configuration")
- **Final step**: `click **Save**`

### Step 4: Update sidebars.ts

1. Open `sidebars.ts`
2. Find the `'send-data/hosted-collectors/cloud-to-cloud-integration-framework'` section
3. Add the new source in **alphabetical order** within the appropriate subsection:

```typescript
{
  type: 'doc',
  label: '{Vendor Name}',
  id: 'send-data/hosted-collectors/cloud-to-cloud-integration-framework/{slug}-source',
},
```

**Location**: The C2C sources are typically organized by category (Security, Cloud, etc.) or alphabetically in a flat list. Add to the appropriate section based on existing patterns.

### Step 5: Create CID Redirect

1. Open `cid-redirects.json`
2. Add a new entry for the CID mapping:

```json
{
  "cid": "c2c-{slug}",
  "slug": "/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/{slug}-source"
}
```

Insert in alphabetical order by CID.

### Step 6: Create Placeholder Config Files

Create two placeholder files that the user can populate. Files live under `static/files/c2c/{slug}/` (not `static/files/{slug}-source.*`):

1. `static/files/c2c/{slug}/example.json`:
```json
{
  "api.version": "v1",
  "source": {
    "schemaRef": {
      "type": "{slug}"
    },
    "sourceType": "Universal",
    "config": {
      "name": "{Vendor Name}",
      "description": "{Vendor Name} source",
      "category": "c2c/{slug}",
      "fields": {
        "_siemForward": false
      }
    }
  }
}
```

2. `static/files/c2c/{slug}/example.tf`:
```hcl
resource "sumologic_cloud_to_cloud_source" "{slug}_source" {
  collector_id = sumologic_collector.collector.id
  schema_ref = {
    type = "{slug}"
  }
  config = jsonencode({
      "name": "{Vendor Name}",
      "description": "{Vendor Name} source",
      "category": "c2c/{slug}",
      "fields": {
        "_siemForward": false
      }
  })
}

output "sumologic_{slug}_source" {
  value = sumologic_cloud_to_cloud_source.{slug}_source
}
```

The reference blocks in the doc point to these files via their GitHub URL:
```
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/{slug}/example.json
```

### Step 7: Summary and Next Steps

After creating all files, provide a summary:

```markdown
## Created C2C Source Documentation

**Files created:**
* `/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/{slug}-source.md`
* `static/files/c2c/{slug}/example.json`
* `static/files/c2c/{slug}/example.tf`

**Files modified:**
* `sidebars.ts` - Added to navigation
* `cid-redirects.json` - Added CID mapping

**Next steps:**
1. Update the icon path in the doc (currently `TODO-update-icon-path.png`)
2. Fill in vendor configuration steps (if applicable)
3. Add data sources and polling intervals table
4. Update metadata fields table with actual fields
5. Complete JSON configuration parameters in the table
6. Populate the JSON example in `static/files/c2c/{slug}/example.json`
7. Populate the Terraform example in `static/files/c2c/{slug}/example.tf`
8. Add any troubleshooting tips if applicable
9. Remove `<meta name="robots" content="noindex" />` when ready to publish
10. Test the doc locally with `npm start`

**Document URL (after publish):**
`https://sumologic.com/help/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/{slug}-source`

**CID URL:**
`https://sumologic.com/help/cid/c2c-{slug}`
```

## Validation checklist

Before finishing, verify:

**Frontmatter**
* [ ] `id` is `{slug}-source`.
* [ ] `title` is `{Vendor Name} Source`.
* [ ] `image` is present (S3 URL or placeholder).
* [ ] `sidebar_label` is `{Vendor Name}` (short form, no "Source").
* [ ] `tags` includes `cloud-to-cloud` and the vendor slug, using `-` list syntax.
* [ ] `description` follows the style: `"Learn how to configure the {Vendor Name} Cloud-to-Cloud Source in your Sumo Logic environment."`.

**Content**
* [ ] Opening paragraph starts with `"The Sumo Logic source for {Vendor Name} enables you to collect..."`.
* [ ] `noindex` meta tag present (remove only when ready to publish).
* [ ] Fed deployment note included if source is not available in Fed.
* [ ] Data collected table uses two columns: `| Polling Interval | Data |`.
* [ ] **Forward to SIEM** step present in source configuration.
* [ ] **Processing Rules** step present in source configuration.
* [ ] `## Metadata fields` section present with `_siemVendor`, `_siemProduct`, `_siemFormat`.
* [ ] Section header is `## JSON schema` (not "JSON configuration").
* [ ] JSON and Terraform examples use ` ```json reference ` / ` ```sh reference ` blocks (not `<CodeBlock>` component).
* [ ] No download links (they are not part of the published pattern).
* [ ] All placeholder text replaced or removed.

**Files and navigation**
* [ ] Config files created at `static/files/c2c/{slug}/example.json` and `static/files/c2c/{slug}/example.tf`.
* [ ] Reference block URLs point to `static/files/c2c/{slug}/example.json` (not `static/files/{slug}-source.json`).
* [ ] Added to `sidebars.ts` in alphabetical order.
* [ ] CID redirect added to `cid-redirects.json`.

## Error handling

* If the file already exists, warn the user and ask if they want to overwrite.
* If the sidebar section structure has changed, notify the user to manually add the entry.
* If `static/files/` directory does not exist, create it.
* Validate that vendor name is provided before proceeding.

## Notes

* Always use the `noindex` meta tag for new docs until they're ready to publish.
* Follow the Sumo Logic style guide for all content.
* C2C sources follow a standardized template for consistency.
* JSON and Terraform examples should be functional and tested before publishing.
