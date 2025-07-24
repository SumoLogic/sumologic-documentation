---
id: jumpcloud-directory-insights-source
title: JumpCloud Directory Insights Source
sidebar_label: JumpCloud Directory Insights
tags:
  - cloud-to-cloud
  - jumpcloud-directory-insights
description: Learn how to collect events data from the JumpCloud Directory Insight.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/jumpcloud-directory-insights-logo.png')} alt="jumpcloud-directory-insights-icon" width="120" />

JumpCloud's open directory platform unifies your technology stack across identity, access, and device management in a cost-effective manner that doesn't sacrifice security or functionality. Directory Insights gives you a clear path to view, analyze, and save user and resource activity data, in a standard format that you can query in real time.

JumpCloud Directory Insights Source is used to collect Directory Insights Events from the JumpCloud platform using the REST API and send it to Sumo Logic.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Events data](https://docs.jumpcloud.com/api/insights/directory/1.0/index.html#section/Overview) |

## Setup

### Vendor configuration

The JumpCloud Directory Insights source requires you to provide the **API Key** and **Organization ID** to access the source data.

- To generate the **API Key**, follow the instructions mentioned in the [Jumpcloud documentation](https://docs.jumpcloud.com/api/insights/directory/1.0/index.html#section/Authentication-and-Authorization/Authentication).
- To generate the **Organization ID**, follow the instructions mentioned in the [Jumpcloud documentation](https://jumpcloud.com/support/settings-in-admin-portal).

### Source configuration

When you create a JumpCloud Directory Insights source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a JumpCloud Directory Insights source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **JumpCloud Directory Insights**.
1. Enter a **Name** for the source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. In **API Key**, enter the API Key you generated from the JumpCloud Directory Insights platform.
1. In **Organization ID**, enter the Organization ID you generated from the JumpCloud Directory Insights platform.
1. In **Service**, select the type of logs to collect. This allows you to limit the response to just the data you want.
1. When you are finished configuring the Source, click **Save**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemParser` | `/Parsers/System/JumpCloud/JumpCloud Directory Insights` | Set when **Forward To SIEM** is checked. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"JumpCloud Directory Insights"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| apiKey | String | Yes | `null` | API Key generated from the JumpCloud Directory Insights platform. |  |
| orgID | String | Yes | `null` | Organization ID generated from the JumpCloud Directory Insights platform. |  |
| service | String | Yes | `null` | Type of logs from which you want to collect the data from. |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/jumpcloud-directory-insights/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/jumpcloud-directory-insights/example.tf
```

## Troubleshooting

After configuring your source, you should check the status of the source in the **Collectors** page > **Status** column. If the source is not functioning as expected, you may see an error next to the Source Category column as shown below: 

**Error Code**: `400` <br />
**Solution**: Make sure that the **orgID** entered is correct your domain.

**Error Code**: `401` <br />
**Solution**: Make sure that the **apiKey** entered is correct your domain.

**Error Code**: `402` <br />
**Solution**: Make sure that the Directory Insights is enabled for the Organization.

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
