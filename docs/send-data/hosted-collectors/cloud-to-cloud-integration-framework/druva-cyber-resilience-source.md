---
id: druva-cyber-resilience-source
title: Druva Cyber Resilience Source
sidebar_label: Druva Cyber Resilience
tags:
  - cloud-to-cloud
  - druva-cyber-resilience
description: Learn how to configure the Druva Cyber Resilience Cloud-to-Cloud source setup in your Sumo Logic environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/druva-logo.svg')} alt="thumbnail icon" width="85"/>

The Druva Data Resiliency Cloud provides unified, easy-to-manage data protection for all workloads. Druva’s cyber resilience solutions keep backup data safe, help to prepare for cyber attacks, and automate the process of recovering data.

The Druva Cyber Resilience source provides the ability to fetch realize events generated within the Druva Realize product using the [Druva Realize Events API](https://developer.druva.com/reference/listeventsbytracker) and sends it to Sumo Logic. Realize events API helps you to collect unusual data activity events, access events, and login events generated in Druva Cyber Resilience product.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Druva Realize Events](https://developer.druva.com/reference/listeventsbytracker) |

## Setup

### Vendor configuration

In this configuration, you will collect the Base URL from the Druva platform to authorize and authenticate the realize events using Druva Realize Events API. Follow the below steps to get the Base URL for user configuration.

1. Sign in to the [Druva console](https://login.druva.com/login).
1. Go to the **Administration** menu and click **Druva Cloud Settings** option.<br/> <img src={useBaseUrl('img/send-data/druva-console.png')} style={{border: '1px solid gray'}} alt="druva-console" width="800" />
1. Select the **API Credentials** option.
1. In the API Credentials page, copy and save the **API Endpoint URL**.<br/> <img src={useBaseUrl('img/send-data/druva-cloud-settings.png')} style={{border: '1px solid gray'}} alt="druva-cloud-settings" width="800" />

### Source configuration

When you create a Druva Cyber Resilience Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Druva Cyber Resilience Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **Druva Cyber Resilience** icon.
1. Enter a **Name** to display for the Source in the Sumo Logic web application. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **API Endpoint URL**. Enter the API Endpoint URL collected from the [Druva Cyber Resilience platform](#vendor-configuration).
1. **Client ID**. Enter your Client ID. To get Client ID, follow the instructions from [Create and Manage Druva API Credentials](https://docs.druva.com/Druva_Cloud_Platform/Integration_with_Druva_APIs/Create_and_Manage_API_Credentials#createnewcreds).
1. **Secret Key**. Enter your Secret Key. To get Secret Key, follow the instructions from [Create and Manage Druva API Credentials](https://docs.druva.com/Druva_Cloud_Platform/Integration_with_Druva_APIs/Create_and_Manage_API_Credentials#createnewcreds).
1. When you are finished configuring the Source, click **Save**.

## Metadata field

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemParser` | `/Parsers/System/Druva/Druva Cyber Resilience` | Set when **Forward To SIEM** is checked. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [How to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Druva Cyber Resilience"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| baseURL | String | Yes | `null` | The base URL from which the customer wants to retrieve event data. |  |
| clientID | String | Yes | `null` | Client ID an API client. |  |
| secretKey | String | Yes | `null` | Secret key of an API client. |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/druva-cyber-resilience/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/druva-cyber-resilience/example.tf
```

## Troubleshooting

This section provides information on how to troubleshoot failures while configuring our Druva Cyber Resilience source.

### 400 error

#### Error Message

```
{
    "error": "invalid_grant. (#10010003b)"
}
```

#### Solution

If the source is configured with either an invalid **Base URL**, **Client ID**, or **Secret Key** the API will return a 400 error code. To rectify this error, validate and enter the correct **Base URL**, **Client ID**, and **Secret Key**.

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
