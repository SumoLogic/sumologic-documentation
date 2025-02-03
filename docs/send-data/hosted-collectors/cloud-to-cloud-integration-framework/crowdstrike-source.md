---
id: crowdstrike-source
title: CrowdStrike Source
sidebar_label: CrowdStrike
tags:
  - cloud-to-cloud
  - crowdstrike
description: The CrowdStrike Source provides a secure endpoint to receive event data from the CrowdStrike Streams API.
---
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/crowdstrike/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/crowdstrike/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/crowdstrike/example.tf';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/crowdstrike.png')} alt="thumbnail icon" width="85"/>

The CrowdStrike Source provides a secure endpoint to receive event data from the CrowdStrike [Streams API](https://falcon.crowdstrike.com/support/documentation/89/event-streams-apis). It securely stores the required authentication, scheduling, and state tracking information.

:::important
The CrowdStrike API documentation is not public and can only be accessed by partners or customers.
:::

The types of events are defined in the [Streaming API Event Dictionary](https://falcon.crowdstrike.com/support/documentation/62/streaming-api-event-dictionary).

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Event data](https://falcon.crowdstrike.com/support/documentation/89/event-streams-apis) |

## Setup

### Vendor configuration

:::note
Before you can connect to event streams, you must contact the [CrowdStrike support team](https://supportportal.crowdstrike.com/) to enable the streaming APIs on your customer account. If it's not enabled, your requests will receive HTTP 500 responses.
:::

You must contact CrowdStrike support and enable the [Streams API](https://falcon.crowdstrike.com/support/documentation/89/event-streams-apis).

A CrowdStrike Source authenticates with an OAuth2 API key. These are created in the Crowdstrike Console under [API Clients and Keys](https://falcon.crowdstrike.com/support/api-clients-and-keys). The API token needs the `READ` privilege for the following properties:

* Detections
* Event Streams
* Hosts

### Source configuration

When you create a CrowdStrike Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a CrowdStrike Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **CrowdStrike**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **CrowdStrike domain**: Provide your [CrowdStrike domain](https://falcon.crowdstrike.com/support/documentation/89/event-streams-apis ), for example, `api.crowdstrike.com`.
1. **Client ID**: Provide the CrowdStrike Client ID you want to use to authenticate collection requests.
1. **Secret Key**. Provide the CrowdStrike API key you want to use to authenticate collection requests.
1. (Optional) **Application ID**. To allow for easier tracking of your log ingestion, you can provide a 1 to 15 character identifier to add to your CrowdStrike Audit Logs.
    :::note
    If no Application ID is provided, a random ID is generated. Any time this ID is changed, the Source will re-read the data stream starting at the beginning.
    :::
1. When you are finished configuring the Source, click **Submit**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `CrowdStrike` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `Falcon Endpoint Protection (CNC)` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |
| `_siemEventID` | `<metadata.eventype>` | Where `<metadata.eventype>` is the value of the field from the JSON event, such as IncidentSummaryEvent or DetectionSummaryEvent. |

## JSON schema 

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"CrowdStrike"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward `to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| domain | String | Yes | `null` | Your CrowdStrike domain. | `api.crowdstrike.com`|
| clientID | String | Yes | `null` | The CrowdStrike Client ID you want to use to authenticate collection requests. |  |
| secretKey | String | Yes | `null` | The CrowdStrike API key you want to use to authenticate collection requests. |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/crowdstrike/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/crowdstrike/example.tf" target="_blank">Download example</a>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
