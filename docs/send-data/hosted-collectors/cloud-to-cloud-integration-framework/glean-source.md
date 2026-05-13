---
id: glean-source
title: Glean Source
sidebar_label: Glean
tags:
  - cloud-to-cloud
  - glean
description: Learn how to configure the Glean Cloud-to-Cloud Source in your Sumo Logic environment.
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/glean/glean-source.json';
import ExampleTerraform from '/files/c2c/glean/glean-source.tf';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

<img src='https://app_icons.s3.amazonaws.com/glean.svg' alt="Glean icon" width="45"/>

The Sumo Logic source for Glean enables you to collect activity logs from Glean into Sumo Logic. This integration helps you monitor user activity and security events, providing visibility into search and content interactions across your organization.

:::note
This source is **not** yet available in our [Fed deployment](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).
:::

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min | [Activity Events](https://developers.glean.com/docs/client_api/activity_api/) |

## Setup

### Vendor configuration

<!-- TODO: Add vendor configuration prerequisites and steps -->

#### Prerequisites

- A Glean enterprise account with admin access.
- An API token generated from the Glean admin console.

### Source configuration

When you create a Glean source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Glean source:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**.
1. On the **Collection** page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Glean**.
1. Enter a **Name** for the source. The **Description** is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the check box to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="check" width="20"/> A green circle with a check mark shows when the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="exclamation" width="20"/> An orange triangle with an exclamation point shows when the field does not exist in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic but is not present or enabled in the schema, it is ignored and marked as **Dropped**.
1. **API Token**. Provide your Glean API token generated from the [vendor configuration](#vendor-configuration) steps.
1. **Glean Instance URL**. Enter your Glean instance URL (for example, `https://your-company.glean.com`).
1. (Optional) **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the source, click **Save**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `Glean` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `Glean` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |

## JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/api/collector-management). See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"glean"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"` |
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"` |
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | `{"_siemForward": false, "fieldA": "valueA"}` |
| apiToken | String | Yes | `null` | The API token for authenticating with Glean. | `"glean_api_..."` |
| instanceUrl | String | Yes | `null` | Your Glean instance URL. | `"https://your-company.glean.com"` |

### JSON example

<CodeBlock language="json">{ExampleJSON}</CodeBlock>

[Download example](/files/glean-source.json)

### Terraform example

<CodeBlock language="json">{ExampleTerraform}</CodeBlock>

[Download example](/files/glean-source.tf)

## FAQ

:::info
[Learn more](/docs/c2c/info) about Cloud-to-Cloud sources.
:::
