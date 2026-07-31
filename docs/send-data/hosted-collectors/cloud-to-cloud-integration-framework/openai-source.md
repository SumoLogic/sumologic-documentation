---
id: openai-source
title: OpenAI Source
sidebar_label: OpenAI
tags:
  - cloud-to-cloud
  - openai-source
description: Learn how to collect Organization Usage Costs data from the OpenAI Administration API and send them to Sumo Logic.

---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/send-data/openAI-logo.png')} alt="logo" width="100" />

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/preview')}><span className="preview-private">Private Preview</span></a></p>

:::info
This feature is in Private Preview. For more information, contact your Sumo Logic account representative.
:::

The OpenAI Administration API provides organization-level management and monitoring capabilities, including user management, project management, API key administration, audit logs, and usage and billing data. The Organization Usage Costs endpoint (`/v1/organization/costs`) returns aggregated cost data for an organization, broken down by time bucket, with optional grouping by project, line item, or API key.

## Data collected

The data will be collected from the OpenAI database using the following log:

| Polling Interval | Data |
|:--|:--|
| 5 minutes | [Organization Costs](https://developers.openai.com/api/reference/resources/admin/subresources/organization/subresources/usage/methods/costs) |

## Setup

### Vendor configuration

The OpenAI source requires you to provide the **Admin API Key** to set up the integration.

#### Prerequisites

- Requires an OpenAI API account with usage-based billing. New accounts receive a limited free credit grant.
- Admin API keys require an Organization Owner or Admin role. See [Rate limits](https://platform.openai.com/docs/guides/rate-limits) for tier details.

Follow the steps below to obtain the Admin API Keys:
1. [Sign in](https://platform.openai.com) to the OpenAI Platform.
2. Navigate to **Settings > Organization > Admin API Keys**.
3. Click **Create admin API key** and note the key value (for example, `sk-admin-`).

### Source configuration

When you create an OpenAI source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure an OpenAI source:
1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu, select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **OpenAI**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="Green check circle" width="20"/> A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="Orange exclamation point" width="20"/> An orange triangle with an exclamation point is shown when the field doesn't exist or is disabled in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic but isn’t present or enabled in the schema, it’s ignored and marked as **Dropped**.
1. **Admin API Key**. The OpenAI [Admin API key](#vendor-configuration). For example, `sk-admin-`.
1. (Optional) **Project IDs**. Enter your list of [Project IDs](#vendor-configuration) to filter costs. Leave empty for all projects.
1. (Optional) **API Key IDs**. Enter your [API key IDs](#vendor-configuration) to filter costs. Leave empty for all API keys.
1. **Polling Interval**. The polling interval is set for 5 minutes by default. You can adjust it based on your needs. This sets how often the source checks for new data.
1. **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type": "OpenAI"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"` |
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| adminApiKey | String | Yes | `null` | OpenAI Admin API Key required for organization-level endpoints. | `sk-admin-` |
| projectIds | Array of String | No | `null` | Filter costs to specific project IDs. If empty, costs for all projects are returned. |  |
| apiKeyIds | Array of String | No | `null` | Filter costs to specific API key IDs. If empty, costs for all API keys are returned. |  |
| pollingInterval | Integer | No | `5` | Time interval (in minutes) after which the source will check for new data. |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/openai/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/openai/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
