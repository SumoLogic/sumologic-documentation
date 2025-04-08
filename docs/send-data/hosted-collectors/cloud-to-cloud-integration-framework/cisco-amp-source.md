---
id: cisco-amp-source
title: Cisco AMP Source
sidebar_label: Cisco AMP
tags:
  - cloud-to-cloud
  - cisco-amp
description: The Cisco AMP Source for Sumo Logic provides a secure endpoint to receive data from the Cisco Amp System Log API.
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/cisco-amp/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/cisco-amp/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/cisco-amp/example.tf';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/cisco-amp.png')} alt="icon" width="90"/>

The Cisco AMP Source provides a secure endpoint to receive data from the Cisco Amp [System Log API](https://api-docs.amp.cisco.com/api_resources?api_host=api.amp.cisco.com&api_version=v1). It securely stores the required authentication, scheduling, and state tracking information.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 mins |  [System Log data](https://developer.cisco.com/docs/secure-endpoint/?api_host=api.amp.cisco.com&api_version=v1#!introduction/secure-endpoint-api) |

## Setup

### Vendor configuration

The integration requires an Cisco Amp Client ID and API key.

### Source configuration

When you create a Cisco AMP Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Cisco AMP Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. On the Collectors page, click **Add Source** next to a HostedCollector.
1. Search for and select **Cisco AMP**.
1. Enter a **Name** to display for the Source in the Sumo web application. The description is optional.  
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.  
1. **Client ID**. Provide the Client ID you want to use to authenticate collection requests.
1. **API Region** (Optional). Select the appropriate region of your API Key. The default is `api.amp.cisco.com`.
1. **API Key**. Provide the API Key you want to use to authenticate collection requests. 
1. (Optional) The **Polling Interval** is set for 300 seconds by default, you can adjust it based on your needs. This sets how often the Source checks for new data.
1. When you are finished configuring the Source, click **Submit**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `Cisco` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `AMP` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |
| `_siemEventID` | `<eventType>}` | Where `<eventType>` is the value of the field from the JSON event, such as Threat Detected. A list of possible event types can be found [here](https://api-docs.amp.cisco.com/api_actions/details?api_action=GET+%2Fv1%2Fevent_types&api_host=api.amp.cisco.com&api_resource=Event+Type&api_version=v1). |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Cisco AMP"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| clientId | String | Yes | `null`  | Provide the Client ID you want to use to authenticate collection requests. |  |
| apiRegion | String | No |`null` | Select the appropriate region of your API Key. |  |
| apiKey | String | Yes | `null` | Provide the API Key you want to use to authenticate collection requests. |  |
| pollingInterval | Integer | No | 300 | This sets how often the Source checks for new data. |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/cisco-amp/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/cisco-amp/example.tf" target="_blank">Download example</a>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::