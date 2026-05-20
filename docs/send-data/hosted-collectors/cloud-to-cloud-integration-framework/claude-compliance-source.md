---
id: claude-compliance-source
title: Claude Compliance Source
sidebar_label: Claude Compliance
tags:
  - cloud-to-cloud
  - claude-compliance
description: Learn to collect the chats from Claude Compliance platform.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/claude-compliance.png')} alt="Claude Compliance icon" width="40" />

The Sumo Logic source for Claude Compliance enables you to collect chat messages data from Claude into Sumo Logic
Claude provides advanced AI solutions for enterprises, offering secure, compliant, and customizable conversational AI capabilities with Claude to improve productivity while meeting organizational governance and regulatory needs.

The Claude compliances Messages API enables enterprise customers to access structured chat logs and metadata to support auditing, compliance, and security requirements.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  Messages

## Setup

### Vendor configuration

You are required to provide the **Organization UUID** and **API Key** to configure the Claude Compliance source.

To collect logs, you need a Claude API key with access to the Compliance API. Use one of the following options to create the API key:

#### Console / API 

Keys are created in the **Admin keys** section of Console Settings.
1. Click **Create key** to name your key.
2. Receive a secret access key and store it securely. 

:::note
If the Compliance API is enabled for your organization, Admin keys created here are automatically granted the `read:compliance_activities` scope. If the Compliance API is not yet enabled, contact your Claude representative to request access. 
:::

#### Claude.ai

Keys are created in the **Compliance access keys** section of Data Management Settings.
1. Click the **Create key** to name your key.
2. Name the key and select its scopes.
3. Receive a secret access key and store it securely.

:::note
If you do not see the Compliance access keys section, it means that either you are not a Primary Owner of the organization, or the Compliance API is not enabled for your organization. The Primary Owner needs to enable it in the Data and Privacy section of your organization's settings.
:::

### Source configuration

When you create a Claude Compliance Source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Claude Compliance Source, follow the steps below:
1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Claude Compliance**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="Green check circle" width="20"/> A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="Orange exclamation point" width="20"/> An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Organization UUID**. Enter the Organization UUID collected from the [Claude Console](#vendor-configuration).
1. **API Key**. Enter the API Key generated from the [Claude Console](#vendor-configuration).
1. **Polling Interval**. The polling interval is set for 5 minutes by default and can be configured to a maximum of 24 hours. You can adjust it based on your needs. This sets how often the source checks for new data.
1. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Save**.

:::info
After configuring the Claude Compliance source, consider installing the Sumo Logic app for [Claude Compliance](/docs/integrations/saas-cloud/claude-compliance/) to visualize and analyze the collected data using prebuilt dashboards and monitor alerts.
:::

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Claude Compliance"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"` |
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"` |
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.| `{"_siemForward": false, "fieldA": "valueA"}` |
| organizationUUID | String | Yes | `null` | Your Organization UUID from Claude Console. | org_01ABCDEFGHIJK123456789 |
| apiKey | String | Yes | `null` | API Key of the account. | sk-ant-XXXXXXXXXXXXXXX |
| pollingInterval | Integer | Yes | `5 minutes` | Time interval (in minutes) after which the source will check for new data. | 5m |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/claude-compliance/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/claude-compliance/example.tf
```

## Limitations
- Updates to chats after a prolonged gap may cause re-ingestion and potential duplication.
- As Claude Compliance API continues to evolve, updates may alter conversation data or API behavior, potentially impacting integration consistency.

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
