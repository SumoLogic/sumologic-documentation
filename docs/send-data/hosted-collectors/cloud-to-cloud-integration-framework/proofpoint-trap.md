---
id: proofpoint-trap-source
title: Proofpoint TRAP Source
sidebar_label: Proofpoint TRAP
tags:
  - cloud-to-cloud
  - proofpoint-trap
description: Learn how to collect Proofpoint TRAP message data and send it to Sumo Logic.
---

import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/proofpoint-logo.png')} alt="icon" width="50"/>

The Sumo Logic source for Proofpoint TRAP enables you to ingest message logs from the Proofpoint TRAP API and send them to Sumo Logic for analysis. This integration enhances email threat visibility by providing detailed insights into message disposition, threats detected, and policy actions, helping security teams identify, investigate, and respond to email-based attacks more effectively.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  Message Logs |

## Setup

### Vendor configuration

:::note
The Proofpoint TRAP API documentation is not public and accessible only with Support Community account. [Reference](https://proofpoint.my.site.com/community/s/article/Threat-Response-TRAP-How-to-Access-Threat-Response-Auto-Pull-TRAP-documentation)
:::

The Proofpoint TRAP source requires you to provide the Proofpoint TRAP Base URL, Authentication Base URL, Client ID, and Client Secret to configure the source.

### Source configuration

When you create a Proofpoint TRAP Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure the Proofpoint TRAP Source:
1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select the **Proofpoint TRAP** icon.
1. Enter a **Name** to display for the Source in Sumo Logic. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="green check circle.png" width="20"/> A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="orange exclamation point.png" width="20"/> An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Base URL**. Enter your [Base URL](#vendor-configuration).
1. **Auth Base URL**. Enter your [Auth Base URL](#vendor-configuration).
1. **Client ID**. Enter your [Client ID](#vendor-configuration).
1. **Client Secret**. Enter your [client secret](#vendor-configuration).
1. **Polling Interval**. The polling interval is set for 5 minutes by default and can be configured from a minimum of 5 minutes to a maximum of 60 minutes. You can adjust it based on your needs. This sets how often the source checks for new data.
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Proofpoint TRAP"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| baseURL | String | Yes | `null` | The base URL to fetch the data from the Proofpoint API. |  |
| authBaseURL | String | Yes | `null` | The auth base URL to fetch the data from the Proofpoint API. |  |
| clientId | String | Yes | `null` | The client identifier of your account. |  |
| clientSecret | String | Yes | `null` | The client secret of your account. |  |
| pollingInterval | Integer | Yes | `5 minutes` | Time interval (in hours) after which the source will check for new data. <br/>Minimum: 5 minutes <br/>Maximum: 60 minutes |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/proofpoint-trap/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/proofpoint-trap/example.tf
```


## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
