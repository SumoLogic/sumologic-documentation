---
id: proofpoint-on-demand-source
title: Proofpoint On Demand Source
sidebar_label: Proofpoint On Demand
description: The Proofpoint On Demand (PoD) Source collects data from the Proofpoint On Demand (PoD) Log Service and uses the secure WebSocket (WSS) protocol to stream logs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/proofpoint-logo.png')} alt="icon" width="140"/>

The Proofpoint On Demand (PoD) Source collects data from the Proofpoint On Demand (PoD) Log Service and uses the secure WebSocket (WSS) protocol to stream logs. It securely stores the required authentication, scheduling, and state tracking information.

:::note
This Source requires you to be licensed for Proofpoint On Demand’s Remote Syslog feature. Please reach out to Proofpoint for more information.

The Proofpoint PoD API is not public; you'll need to request details on the API from Proofpoint.
:::

Data is in JSON format and is ingested in batches of 1,000 or a five-minute interval, whichever is first.

## States

A Proofpoint On Demand Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

A Proofpoint On Demand Source goes through the following states when
created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Proofpoint.
1. **Collecting**. The Source is actively collecting data from Proofpoint.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the Health and Status for Sources is displayed. Use Health Events to investigate issues with collection.<br/> ![PoD error health event.png](/img/send-data/PoD-error-health-event.png)

Hover your mouse over the status icon to view a tooltip with a count of the detected errors and warnings.<br/> ![hover c2c error.png](/img/send-data/hover-c2c-error.png)

You can click on the status icon to open a Health Events panel with details on each detected issue.

## Authentication

The Proofpoint On Demand Source requires you to provide a cluster ID and
token from Proofpoint to access the API. You need to request details on
the API from Proofpoint.

 * The CLUSTER_ID is displayed in the upper-right corner of the management interface next to the release number.
 * Proofpoint will provide the token for each cluster.

## Create a Proofpoint On Demand Source

When you create a Proofpoint On Demand Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Proofpoint On Demand Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
2. On the Collectors page, click **Add Source** next to a Hosted Collector.
3. Select **Proofpoint On Demand**. <br/>   ![proofpoint icon.png](/img/send-data/proofpoint-icon.png)
4. Enter a **Name** to display for the Source in the Sumo web application. The description is optional.<br/> ![proofpoint on demand input window.png](/img/send-data/proofpoint-on-demand-input-window.png)
5. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
6. **Forward to SIEM**. Check the checkbox to forward your data to Cloud SIEM Enterprise. When configured with the **Forward to SIEM** option the following metadata fields are set:
   * `_siemVendor`: Proofpoint
   * `_siemProduct`: POD
   * `_siemFormat`: JSON
   * `_siemEventID`: Set to the type of message ingested, either MESSAGE or MAILLOG.
7. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
8. **Cluster ID** and **Token**. Provide the Proofpoint authentication credentials you want to use to [Authenticate](#authentication) collection requests.
9. **Supported Events**. There are two types of events you can collect. Select one or both of the options, **message** and **maillog**. The following shows the main fields returned from each type:
  * **message**: `guid`, `connection`, `envelope`, `msg`, `msgParts`, `filter`, `pps`
  * **maillog**: `data`, `id`, `pps`, `sm`, `ts`
10. When you are finished configuring the Source, click **Submit**.

### Error types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable                                                    | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs.                                     | Yes                                                   | The Source will retry for up to 90 minutes, after which it quits. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs.                                     | Yes                                                   | The Source will retry for up to 90 minutes, after which it quits. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}


### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| config     | JSON Object  | Yes    | Contains the configuration parameters for the Source. |   |
| schemaRef   | JSON Object  | Yes   | Set to `{"type":"Proofpoint On Demand"}`.  | not modifiable |
| sourceType      | String       | Yes   | Set to `Universal`.        | not modifiable |

The following table shows the **config** parameters for a Proofpoint On
Demand Source.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the metadata field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `cluster_id `| String | Yes | Provide your Cluster ID from Proofpoint.	modifiable
| `api_secret` | String | Yes | Provide your API Token from Proofpoint that you want to use to authenticate collection requests.	modifiable
| `supported_events` | Array of strings | Yes | There are two types of events you can collect. Specify one or both of the following:<br/>`message`: The main fields in message logs are guid, connection, envelope, msg, msgParts, filter, pps.<br/>`maillog`: Then main fields in maillog logs are data, id, pps, sm, ts.<br/>For example, for both you'd use: `["maillog","message"]`	| modifiable |

Proofpoint On Demand Source JSON example:

```json
{
  "api.version":"v1",
  "source":{
    "schemaRef":{
      "type":"Proofpoint On Demand"
    },
    "config":{
      "name":"PoD",
      "api_secret":"********",
      "supported_events":["message","maillog"],
      "fields":{
        "_siemForward":false
      },
      "cluster_id":"********"
    },
    "sourceType":"Universal"
  }
}
```
