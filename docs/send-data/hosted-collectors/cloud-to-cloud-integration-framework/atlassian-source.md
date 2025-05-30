---
id: atlassian-source
title: Atlassian Source
sidebar_label: Atlassian
tags:
  - cloud-to-cloud
  - atlassian
description: Learn how to retrieve Atlassian audit logs into the Sumo Logic environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/atlassian-icon.png')} alt="atlassian-icon" width="40" />

The Atlassian Organizations API provides resources for managing an Atlassian organization, with this API, you can get an [audit log of events](https://developer.atlassian.com/cloud/admin/organization/rest/api-group-events/#api-group-events) from organizations. This integration collects that data from the Atlassian Organizations API and ingests them into Sumo Logic.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 1 hour |  [Events](https://developer.atlassian.com/cloud/admin/organization/rest/api-group-events/#api-group-events)|

## Setup

:::
You need to have **Atlassian Guard Premium** or **Cloud Enterprise** plan to access user-created activities.
:::

### Vendor configuration

Follow the below steps to generate a Bearer access for user configuration:

1. Log in to your [Atlassian admin console](http://admin.atlassian.com/).
1. After logging in, navigate to the **Organizations** tab.
1. Go to **Settings** and select **API keys**.
1. Click on **Create API key** in the top right.
1. Enter a name for the API key.
1. Configure the expiration date for the key or leave the default value as 1 week.
1. Click on **Create** and save the API key.
1. Copy the values of Organization ID and API key.
1. Select **Done**.

### Source configuration

When you create an Atlassian Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure an Atlassian Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Atlassian**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Organizations**. Click the **+Add** button to enter the Organizations you want to associate. Each Organizations needs a API Key value. This is the value that you generated from the [Atlassian platform](#vendor-configuration).
  :::info
  The authorization will fail if the API key value used is expired. To re-generate the API key, follow the steps mentioned in [vendor configuration](#vendor-configuration).
  :::
1. (Optional) The **Polling Interval** is set for 1 hour by default. You can adjust it based on your needs.
1. (Optional) **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Save**.

## JSON Configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Atlassian"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:---|:---|:---|:---|:---|:---|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| pollingInterval | String | No | 1 hour | This sets how often the Source checks for data. | `1 Hour` |
| orgID | String | Yes | `null` | ID of the organisation. |  |
| token | String | Yes | `null` | Client authentication Bearer token per organization. |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/atlassian/example.json
```

### Terraform example

```hcl reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/atlassian/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
