# new-c2c-source-doc

<!-- Question for Amee and JV: should we drop the image: '{icon-url}' ? I don't think we use that. -->

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
4. Including all required frontmatter and sections

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

Create the file at the path determined in Step 2 with the following structure:

```markdown
---
id: {slug}-source
title: {Vendor Name} Source
image: '{icon-url}'
sidebar_label: {Vendor Name}
tags:
  * cloud-to-cloud
  * {slug}
description: Learn how to configure the {Vendor Name} Cloud-to-Cloud Source in your Sumo Logic environment.
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/{slug}-source.json';
import ExampleTerraform from '/files/{slug}-source.tf';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<img src={useBaseUrl('img/send-data/TODO-update-icon-path.png')} alt="{Vendor Name} icon" width="45"/>

The Sumo Logic source for {Vendor Name} enables you to collect [data type] from {Vendor Name} into Sumo Logic. This integration helps you [business value], providing visibility into [specific activities]. With this data in Sumo Logic, you can [key use cases].

{IF Fed deployment NOT available, include:}
:::note
This source is **not** yet available in our [Fed deployment](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).
:::

## Data collected

{IF user provided data sources:}
| Polling Interval | Data |
| :--- | :--- |
| {interval} | {data source with link if available} |

{IF user will add later:}
| Polling Interval | Data |
| :--- | :--- |
| 5 min | [Example Data Source](https://vendor-docs-url) |

## Setup

### Vendor configuration

{IF vendor config applicable:}
#### Prerequisites

{Insert prerequisites and vendor UI configuration steps}

{IF vendor config NOT applicable:}
{omit this section entirely}

### Source configuration

When you create a {Vendor Name} source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a {Vendor Name} source:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**.
1. On the **Collection** page, click **Add Source** next to a Hosted Collector.
1. Search for and select **{Vendor Name}**.
1. Enter a **Name** for the source. The **Description** is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the check box to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="check" width="20"/> A green circle with a check mark shows when the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="exclamation" width="20"/> An orange triangle with an exclamation point shows when the field does not exist in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic but is not present or enabled in the schema, it is ignored and marked as **Dropped**.
1. **{Configuration Fields}**. Provide your {Vendor Name} [authentication credentials](#vendor-configuration).
1. (Optional) **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the source, click **Save**.

## Metadata fields

{Leave placeholder for user to fill in:}

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `{Vendor Name}` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `{Product Name}` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |

## JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/api/collector-management). See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"{slug}"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"` |
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |

{Add vendor-specific parameters as user provides them}

### JSON example

<CodeBlock language="json">{ExampleJSON}</CodeBlock>

[Download example](/files/{slug}-source.json)

### Terraform example

<CodeBlock language="json">{ExampleTerraform}</CodeBlock>

[Download example](/files/{slug}-source.tf)

## FAQ

:::info
[Learn more](/docs/c2c/info) about Cloud-to-Cloud sources.
:::
```

**Important**:
* Include `<meta name="robots" content="noindex" />` until the doc is ready to publish
* Use the style "Learn how to configure the {Vendor Name} Cloud-to-Cloud Source" in description
* Start intro with "The Sumo Logic source for {Vendor Name}"
* Link to `/docs/send-data/hosted-collectors/configure-hosted-collector` (updated path)

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

Create two placeholder files for JSON and Terraform examples that the user can populate:

1. `/static/files/{slug}-source.json` with basic structure:
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

2. `/static/files/{slug}-source.tf` with basic structure:
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

### Step 7: Summary and Next Steps

After creating all files, provide a summary:

```markdown
## Created C2C Source Documentation

**Files created:**
* `/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/{slug}-source.md`
* `/static/files/{slug}-source.json`
* `/static/files/{slug}-source.tf`

**Files modified:**
* `sidebars.ts` - Added to navigation
* `cid-redirects.json` - Added CID mapping

**Next steps:**
1. Update the icon path in the doc (currently `TODO-update-icon-path.png`)
2. Fill in vendor configuration steps (if applicable)
3. Add data sources and polling intervals table
4. Update metadata fields table with actual fields
5. Complete JSON configuration parameters in the table
6. Populate the JSON example in `/static/files/{slug}-source.json`
7. Populate the Terraform example in `/static/files/{slug}-source.tf`
8. Add any troubleshooting tips if applicable
9. Remove `<meta name="robots" content="noindex" />` when ready to publish
10. Test the doc locally with `npm start`

**Document URL (after publish):**
`https://sumologic.com/help/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/{slug}-source`

**CID URL:**
`https://sumologic.com/help/cid/c2c-{slug}`
```

## Error Handling

* If the file already exists, warn the user and ask if they want to overwrite
* If the sidebar section structure has changed, notify the user to manually add the entry
* If `static/files/` directory does not exist, create it
* Validate that vendor name is provided before proceeding

## Notes

* Always use the `noindex` meta tag for new docs until they're ready to publish
* Follow the Sumo Logic style guide for all content
* C2C sources follow a standardized template for consistency
* JSON and Terraform examples should be functional and tested before publishing
