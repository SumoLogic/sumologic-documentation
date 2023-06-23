---
id: crowdstrike-source
title: CrowdStrike Source
sidebar_label: CrowdStrike
description: The CrowdStrike Source provides a secure endpoint to receive event data from the CrowdStrike Streams API.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/crowdstrike.png')} alt="thumbnail icon" width="85"/>

The CrowdStrike Source provides a secure endpoint to receive event data from the CrowdStrike [Streams API](https://falcon.crowdstrike.com/support/documentation/89/event-streams-apis). It securely stores the required authentication, scheduling, and state tracking information.

:::important
The CrowdStrike API documentation is not public and can only be accessed by partners or customers.
:::

The types of events are defined in the [Streaming API Event Dictionary](https://falcon.crowdstrike.com/support/documentation/62/streaming-api-event-dictionary).

:::note
This Source is available in the Fed deployment.
:::

## Prerequisite

Before you can connect to event streams, you must contact the [CrowdStrike support team](https://supportportal.crowdstrike.com/) to enable the streaming APIs on your customer account. If it's not enabled, your requests will receive HTTP 500 responses.

## States

A CrowdStrike Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

A CrowdStrike Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with CrowdStrike.
1. **Collecting**. The Source is actively collecting data from CrowdStrike.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the Health and Status for Sources is displayed. Use Health Events to investigate issues with collection. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

![crowdstrike error.png](/img/send-data/crowdstrike-error.png)

Hover your mouse over the status icon to view a tooltip with details on the detected issue.

![health error generic.png](/img/send-data/health-error-generic.png)

## Authentication

You must contact CrowdStrike support and enable the [Streams API](https://falcon.crowdstrike.com/support/documentation/89/event-streams-apis).

A CrowdStrike Source authenticates with an OAuth2 API key. These are created in the Crowdstrike Console under [API Clients and Keys](https://falcon.crowdstrike.com/support/api-clients-and-keys). The API token needs the `READ` privilege for the following properties:

* Detections
* Event Streams
* Hosts
* Host Groups

## Create a CrowdStrike Source

When you create a CrowdStrike Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a CrowdStrike Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **CrowdStrike**.<br/>  ![crowdstrike icon.png](/img/send-data/crowdstrike-icon.png)
1. Enter a **Name** for the Source. The description is optional. <br/>  ![crowdstrike src 10.png](/img/send-data/crowdstrike-src.png)
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to Cloud SIEM Enterprise. When configured with the **Forward to SIEM** option the following metadata fields are set:
    * `_siemVendor`: CrowdStrike
    * `_siemProduct`: Falcon Endpoint Protection (CNC)
    * `_siemFormat`: JSON
    * `_siemEventID`: `<metadata.eventype>`, where `<metadata.eventype>` is the value of the field from the JSON event, such as IncidentSummaryEvent or DetectionSummaryEvent.
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

### Error types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs. | Yes | The Source will retry for up to 90 minutes, after which retries will be attempted every 60 minutes. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry for up to 90 minutes, after which retries will be attempted every 60 minutes. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}

### JSON configuration 

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

|  Parameter | Type | Required | Description |  Access |
|:--|:--|:--|:--|:--|
| config | JSON Object | Yes | Contains the configuration parameters for the Source. |   |
| schemaRef | JSON Object | Yes | Use `{"type":"CrowdStrike"}` for a CrowdStrike Source. | not modifiable |
| sourceType | String | Yes | Use `Universal` for a CrowdStrike Source. | not modifiable |

The following table shows the **config** parameters for a CrowdStrike Source.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the metadata field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM. | modifiable |
| `domain` | String | Yes |  | Your CrowdStrike domain, for example, api.crowdstrike.com. | modifiable |
| `clientID` | String | Yes |  | The CrowdStrike Client ID you want to use to authenticate collection requests. | modifiable |
| `secretKey` | String | Yes |  | The CrowdStrike API key you want to use to authenticate collection requests. | modifiable |

CrowdStrike Source JSON example:

```json
{
  "api.version":"v1",
  "source":{
    "schemaRef":{
      "type":"CrowdStrike"
    },
    "config":{
      "name":"CrowdStrike",
      "description":"East field",
      "domain":"api.crowdstrike.com",
      "secretKey":"********",
      "clientID":"123",
      "fields":{
        "_siemForward":false
      },
      "category":"eastTeam"
    },
    "sourceType":"Universal"
  }
}
```
