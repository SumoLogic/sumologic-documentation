---
id: code42-incydr-source
title: Code42 Incydr Source
sidebar_label: Code42 Incydr
tags:
  - cloud-to-cloud
  - code42-incydr
description: Learn how to collect sessions, file events, and audit logs from the Code42 Incydr.
---
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/code42-incydr/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/code42-incydr/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/code42-incydr/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/code42-incydr-logo.png')} alt="code42-incydr-icon" width="100" />

The Code42 Incydr is an insider risk management solution that allows you to detect and respond to data exposure and exfiltration from corporate computer, cloud, and email systems. It provides the visibility, context, and controls needed to protect data without overwhelming security teams or inhibiting employee productivity.

Code42 Incydr source is used to analyze and fetch sessions, file events, and audit logs from the [Code42 Incydr API](https://developer.code42.com/api) and send it to Sumo Logic.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Sessions](https://developer.code42.com/api/#tag/Alerts-and-Sessions/operation/SearchSessions), [File Events](https://developer.code42.com/api/#tag/File-Events/operation/searchEvents), and [Audit Logs](https://developer.code42.com/api/#tag/Audit-Log/operation/searchAuditLog) |

## Setup

### Vendor configuration

The Code42 Incydr source requires you to provide the **Base URL**, **Client ID**, and **Secret Key** to access the source data.

- The **Base URL** is used to retrieve the source data from the Incydr API. The domain used for making API requests can be determined using the domain you use to sign in to the Code42 console.
    - api.us.code42.com
    - api.us2.code42.com
    - api.ie.code42.com
    - api.gov.code42.com
    :::info
    Make sure that all API requests are made using HTTPs.
    :::
- To generate the **Client ID** and **Secret Key**, follow the instructions mentioned in the [Incydr API documentation](https://support.code42.com/hc/en-us/sections/14804104624663-Code42-console-reference).

### Source configuration

When you create an Code42 Incydr source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Code42 Incydr Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.  
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Code42 Incydr**.
1. Enter a **Name** for the source. The description is optional. 
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. In **Base URL**, select the domain from which you want to retrieve the source data from the Incydr API.
1. In **Client ID**, enter the Client ID you generated from the Code42 Incydr platform.
1. In **Secret Key**, enter the Secret Key you generated from the Code42 Incydr platform.
1. In **Data Collection**, select the type of source from which you want to collect the data from. This allows you to limit the response to just the data you want.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemParser` | `/Parsers/System/Code42/Code42 Incydr` | Set when **Forward To SIEM** is checked. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Code42 Incydr"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| baseURL | String | Yes | `null` | API Key to used for Authorization.  |  |
| clientID | Boolean | No | `null` | Client ID generated from the Code42 Incydr platform. |  |
| secretKey | String | No | `null` | Secret Key generated secured from the Code42 Incydr platform. |  |
| dataCollection | String | No | `null` | Type of source from which you want to collect the data from. |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/code42-incydr/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/code42-incydr/example.tf" target="_blank">Download example</a>

## Troubleshooting

After configuring your source, you should check the status of the source in the **Collectors** page > **Status** column. If the source is not functioning as expected, you may see an error next to the Source Category column as shown below: 

**Error Code**: `401` <br />
**Error Details**:
```
{
    "error": "invalid_client"
}
```

To resolve these errors:
- Make sure the **Base URL** matches your domain.
- Make sure correct **Client ID or Secret Key** is used to configure the source.

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
