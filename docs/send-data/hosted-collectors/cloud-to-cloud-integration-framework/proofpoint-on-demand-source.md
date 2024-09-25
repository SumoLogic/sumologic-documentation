---
id: proofpoint-on-demand-source
title: Proofpoint On Demand Source
sidebar_label: Proofpoint On Demand
tags:
    - proofpoint-on-demand
description: The Proofpoint On Demand (PoD) Source collects data from the Proofpoint On Demand (PoD) Log Service and uses the secure WebSocket (WSS) protocol to stream logs.
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/proofpoint-on-demand/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/proofpoint-on-demand/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/proofpoint-on-demand/example.tf';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/proofpoint-logo.png')} alt="icon" width="140"/>

The Proofpoint On Demand (PoD) Source collects data from the Proofpoint On Demand (PoD) Log Service and uses the secure WebSocket (WSS) protocol to stream logs. It securely stores the required authentication, scheduling, and state tracking information.

:::note
This Source requires you to be licensed for Proofpoint On Demand’s Remote Syslog feature. Please reach out to Proofpoint for more information.

The Proofpoint PoD API is not public; you'll need to request details on the API from Proofpoint.
:::

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min | [Log Service data](https://docs-cortex.paloaltonetworks.com/r/Cortex-XDR/Cortex-XDR-API-Reference/Get-Alerts) |

## Setup

### Vendor configuration

The Proofpoint On Demand Source requires you to provide a cluster ID and token from Proofpoint to access the API. You need to request details on
the API from Proofpoint.

 * The `CLUSTER_ID` is displayed in the upper-right corner of the management interface next to the release number.
 * Proofpoint will provide the token for each cluster.

### Source configuration

When you create a Proofpoint On Demand Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Proofpoint On Demand Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
2. On the Collectors page, click **Add Source** next to a Hosted Collector.
3. Select **Proofpoint On Demand**.
4. Enter a **Name** to display for the Source in the Sumo web application. The description is optional.
5. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
6. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
7. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
8. **Cluster ID** and **Token**. Provide the Proofpoint authentication credentials you want to use to [authenticate](#configuration-object) collection requests.
9. **Supported Events**. There are two types of events you can collect. Select one or both of the options, **message** and **maillog**. The following shows the main fields returned from each type:
  * **message**: `guid`, `connection`, `envelope`, `msg`, `msgParts`, `filter`, `pps`
  * **maillog**: `data`, `id`, `pps`, `sm`, `ts`
10. When you are finished configuring the Source, click **Submit**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `Proofpoint` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `POD` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |
| `_siemEventID` | `MESSAGE or MAILLOG` | Set to the type of message ingested. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Proofpoint On Demand"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| `cluster_id `| String | Yes | `null` |Provide your Cluster ID from Proofpoint.||
| `api_secret` | String | Yes | `null` | Provide your API Token from Proofpoint that you want to use to authenticate collection requests.	||
| `supported_events` | Array of strings | Yes | |There are two types of events you can collect. Specify one or both of the following:<br/>`message`: The main fields in message logs are guid, connection, envelope, msg, msgParts, filter, pps.<br/>`maillog`: Then main fields in maillog logs are data, id, pps, sm, ts.<br/>For example, for both you'd use: `["maillog","message"]`	|  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/proofpoint-on-demand/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/proofpoint-on-demand/example.tf" target="_blank">Download example</a>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
