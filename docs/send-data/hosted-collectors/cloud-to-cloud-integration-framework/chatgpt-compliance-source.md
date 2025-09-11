---
id: chatgpt-compliance-source
title: ChatGPT Compliance Source
sidebar_label: ChatGPT Compliance
tags:
  - cloud-to-cloud
  - chatgpt-compliance
description: Learn to collect the conversations from ChatGPT Compliance platform.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/chatgpt-compliance.png')} alt="ChatGPT-Compliance-icon" width="40" />

OpenAI: OpenAI provides advanced AI solutions for enterprises, offering secure, compliant, and customizable conversational AI capabilities to improve productivity while meeting organizational governance and regulatory needs.

ChatGPT Compliance: The Compliance API enables enterprise customers to access structured conversation logs and metadata, integrating with eDiscovery, DLP, or SIEM systems to support auditing, compliance, and security requirements.

## Data collected

| Source | Description | Polling interval |
| :-- | :-- | :-- |
| Conversations | Log of user interactions with ChatGPT, including exchanged messages and metadata, used for compliance review and auditing. | 1 hour |

## Setup

### Vendor configuration

You are required to provide the **Workspace ID** and **API Key** to configure the ChatGPT Compliance source.

#### Pre-requisites

1. **Workspace ID**
   - In the OpenAI platform sidebar, go to **Settings - Workspace Settings (or General Settings)**.
   - Your **Workspace ID** can be found in the **About / Workspace Info** section.

2. **API Key**
   - Create a new key via the [OpenAI API Platform Portal](https://platform.openai.com/).
   - Must be generated under the **correct Organization (Enterprise Workspace)**. Do not use a personal account/org.
   - Configure with: **Default Project | All Permissions**.
   - This must be a **fresh key**. Once Compliance API scopes are assigned, all other scopes are revoked.
   - The API key can only be viewed/copied **once**, so ensure it is securely stored.
   - To request Compliance API scope, email [support@openai.com](mailto:support@openai.com) with:
     - Last 4 digits of the API key.
     - Key Name (name assigned during creation).
     - Created By (user who created the key).
     - Requested scope: `read`.
   - OpenAI’s team will review the request. Once verified, they will grant the requested Compliance API scopes to the key.

### Source configuration

When you create a ChatGPT Compliance Source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a ChatGPT Compliance Source, follow the steps below:
1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **ChatGPT Compliance**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="green check circle.png" width="20"/> A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="orange exclamation point.png" width="20"/> An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Workspace ID**. Name of the workspace ID.
1. **API Key**. Enter the API Key generated from the [ChatGPT platform](#vendor-configuration).
1. **Polling Interval**. The polling interval is set for 1 hour by default and can be configured to a maximum of 24 hours. You can adjust it based on your needs. This sets how often the source checks for new data.
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"ChatGPT Compliance"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"` |
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"` |
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.| `{"_siemForward": false, "fieldA": "valueA"}` |
| workspaceId | String | Yes | `null` | Name of your workspace ID. | ABCD-SAMPLE-WORKSPACE-ID |
| apiKey | String | Yes | `null` | API Key of the account. | sk-proj-XXXXXXXXXXXXXXX |
| pollingInterval | Integer | Yes | `1 hour` | Time interval (in hours) after which the source will check for new data. | 1h |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/chatgpt-compliance/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/chatgpt-compliance/example.tf
```

## Limitations
1. Updates to conversations after a prolonged gap may cause re-ingestion and potential duplication.  
2. As ChatGPT continues to evolve, updates may alter conversation data or API behavior, potentially impacting integration consistency.

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
