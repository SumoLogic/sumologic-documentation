---
id: c2c-source
title: Cloud-to-Cloud Source Template
description: Use this template to create a Cloud-to-Cloud source doc (/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/...).
---

Use this template to create a [Cloud-to-Cloud source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework) doc. Copy and paste this into your new .md file. Refer to the [Style Guide](/docs/contributing/style-guide) if needed.

```md

---
id: {{vendor-name}}-source #example: druva-source
title: {{Vendor Name}} Source #example: Druva Source
image: 'https://app_icons.s3.amazonaws.com/dropbox.svg' #replace with your app logo
sidebar_label: {{Vendor Name}} #example: Druva
tags:
  - cloud-to-cloud
  - {{vendor-name}} #example: druva
description: Short description. #example: Learn how to configure the Druva Cloud-to-Cloud Source in your Sumo Logic environment.
---


import CodeBlock from '@theme/CodeBlock';
import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

`<img src={useBaseUrl('path-to-your-icon.png')} alt="Thumbnail icon" width="45"/>`

\Introduction\

<!-- Important:
Always start with "The Sumo Logic source for `{{vendor name}}`" in both the description (frontmatter) and the intro paragraph. This ensures brand clarity since the UI shows only the vendor name. The exact wording after that can be adapted. This example shows a common structure, but you may rephrase to fit the use case.
-->

The Sumo Logic source for `{{vendor name}}` enables you to [collect/ingest/stream/etc.] [data type] from `{{vendor name}}` into Sumo Logic. This integration helps you [business value/security/observability outcome], providing visibility into [specific activities, events, or metrics]. With this data in Sumo Logic, you can [detect/respond/optimize/etc.] [key use cases].

\Depending on Sumo Logic Fed deployment availability, add the below note.\

:::note
This source is **not** yet available in our [Fed deployment](/docs/api/about-apis/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).
:::

## Data collected

\Add all data sources and respective polling interval information.\

| Polling Interval | Data |
| :--- | :--- |
| `{{Polling time in minutes}}` | `{{Data sources}}` |

<!-- Example:
| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Team Events](https://www.dropbox.com/developers/documentation/http/teams#team_log-get_events)
-->

## Setup

### Vendor configuration

#### Prerequisites

\NOTE: This section doesn't apply to all sources; use only where needed.\

\Insert steps to configure the Source in the Vendor UI.\

<!-- Example:
You'll need a Dropbox App Key, App Secret, and Access Code to provide to Sumo Logic. To generate these credentials follow the below steps:

1. Sign in to your [Dropbox Business Account](https://www.dropbox.com/login).
1. Create a new app in the [App Console](https://www.dropbox.com/developers/apps).
1. Open the new app and click **Permissions** and enable **events.read** in **Team Scopes** of the app and then click **Submit**.
1. Copy the provided **App Key** and **App Secret** values, you'll provide these to the Sumo Logic Dropbox Source and are needed in the next step.
1. Replace **APP_KEY** with your App Key in the following URL.
    `https://www.dropbox.com/oauth2/authorize?client_id=APP_KEY&token_access_type=offline&response_type=code`
1. Load the modified URL and you'll see the sign in page of Dropbox. Sign in with your Dropbox Business account credentials to obtain the access code. Then click the **Allow** button. Copy the Access Code to provide to the Sumo Logic Dropbox Source.
-->

### Source configuration

\Insert steps to configure the Source in the Sumo Logic UI.\

<!-- Example:

When you create a Dropbox source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Create a Hosted Collector](/docs/send-data/hosted-collectors/).

To configure a Dropbox source:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**.
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **Dropbox**.
1. Enter a **Name** for the Source. The **description** is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="green check circle.png" width="20"/> A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="orange exclamation point.png" width="20"/> An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic but isn’t present or enabled in the schema, it’s ignored and marked as **Dropped**.
1. **App Key**, **App Secret**, and **Access Code**. Provide your Dropbox [authentication](#vendor-configuration) credentials.
1. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Submit**.
-->

## Metadata fields

\Insert metadata fields in the Sumo Logic UI. Update the below table accordingly.\

| Field | Value | Description |
| :--- | :--- | :--- |
| `{{field}}` | `{{value}}` | `{{Description}}` |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [How to Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for more details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"/*c2c-name*/"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration parameters](#config-object) | Yes | Source type specific values. |

### Configuration object

\Add information about the configuration parameters. Update the below table accordingly.\

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| `{{Parameter}}` | `{{Type}}` | `{{Yes/No}}` | `null` | `{{Description}}` |  `{{Example}}` |

### JSON example

\Create and add the JSON config in the dropbox and import it here.\

<CodeBlock language="json">component-name</CodeBlock>

### Terraform example

\Create and add the Terraform config in the dropbox and import it here.\

<CodeBlock language="json">component-name}</CodeBlock>

## Troubleshooting

\This section doesn't apply to all sources; use only where needed.\

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about our cloud-to-cloud sources.
:::

```
