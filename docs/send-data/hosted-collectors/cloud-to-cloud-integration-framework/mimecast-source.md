---
id: mimecast-source
title: Mimecast Source
sidebar_label: Mimecast
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/Mimecast-icon.png')} alt="icon" width="50"/>

The Mimecast Source supports collecting SIEM, DLP, Audit, and Hold Message List data from the [Mimecast API](https://www.mimecast.com/tech-connect/documentation/). It securely stores the required authentication, scheduling, and state tracking information.

The Mimecast Source leverages the following:

 * [Download SIEM Logs](https://www.mimecast.com/tech-connect/documentation/tutorials/understanding-siem-logs/)
 * [Download DLP Logs](https://integrations.mimecast.com/documentation/endpoint-reference/logs-and-statistics/get-dlp-logs/)
 * [Download Audit Events](https://integrations.mimecast.com/documentation/endpoint-reference/logs-and-statistics/get-audit-events/)
 * [Download Hold Message List](https://integrations.mimecast.com/documentation/endpoint-reference/message-queues/get-hold-message-list/)

## States

A Mimecast Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing [Health Events](/docs/manage/health-events.md).

A Mimecast Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Mimecast.
1. **Collecting**. The Source is actively collecting data from Mimecast.

If the Source has any issues during any one of these states, it is placed
in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the Health and Status for Sources is displayed. Use Health Events to investigate issues with collection.

![error mimecast.png](/img/send-data/error-mimecast.png)

Hover your mouse over the status icon to view a tooltip with details on
the detected issue.

![health error generic.png](/img/send-data/health-error-generic.png)

## Prerequisite

The user account associated with your Mimecast credentials needs to have `basic administrator` access. In the Enhanced Logging section of the **Administration > Account > Account Settings** menu in the **Administration Console**, at least one of the fields should be enabled for email logging for at least one inbound, outbound, and internal emails.

See these [guidelines](https://community.mimecast.com/docs/DOC-3181) to create the necessary credentials you'll need to authenticate the Mimecast Source, which includes an Application Key, Secret Key, and Access Key.

:::note
Consider the Authentication Profile TTL when configuring access. If your credentials expire you'll receive a 418 Error message from the Health Events of your Source, in which case you'll need to provide new credentials. Details on the recommended configuration, including setting a non-expiring key is found in the [guidelines](https://community.mimecast.com/docs/DOC-3181).
:::

### Create a Mimecast Source

When you create a Mimecast Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Mimecast Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **Mimecast**.<br/><img src={useBaseUrl('img/send-data/Mimecast-icon.png')} alt="icon" width="70"/>
1. Enter a **Name** for the Source. The description is optional.<br/> ![mimecast add apis input.png](/img/send-data/mimecast-add-apis-input.png)
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to Cloud SIEM Enterprise. When configured with the **Forward to SIEM** option the following metadata fields are set:
   * `_siemVendor`: Mimecast
   * `_siemProduct`: Mimecast
   * `_siemFormat`: JSON
   * `_siemEventID`: The SIEM event ID is populated by the suffix of the file name, which references the log type. This includes values such as:
     * `receipt`
     * `process`
     * `delivery`
     * `jrnl`
     * `ttp`<br/>
  The DLP event id is `dlp`.
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped. 
1. **Base URL**. The base URL parameter depends on your global region. See this Mimecast [document](https://www.mimecast.com/tech-connect/documentation/api-overview/global-base-urls/) for guidance on which base URL to use.
1. Provide the **Application ID**, **Access Key**, and **Secret Key** to authenticate requests. See these [guidelines](https://community.mimecast.com/docs/DOC-3181) to create the necessary authentication requirements.
1. **Supported APIs to collect**. Select one or more of the available APIs: **SIEM**, **DLP**, **Audit Events**, and **Hold Message List**.<br/> ![mimecast additional apis option.png](/img/send-data/mimecast-additional-apis-option.png)
1. When you are finished configuring the Source, click **Submit**.

### Error types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}


### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| config                    | JSON Object          | Yes                       | Contains the configuration parameters for the Source. |                        |
| schemaRef                 | JSON Object          | Yes                       | Use `{"type":"Mimecast"}` for a Mimecast Source.                                      | not modifiable         |
| sourceType                | String               | Yes                       | Use `Universal` for a Mimecast Source.                                                | not modifiable         |

The following table shows the **config** parameters for a Mimecast
Source.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the metadata field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `domain` | String | Yes |  | The base URL parameter depends on your global region.	modifiable
`application_key` | String | Yes |  | The Mimecast key you want to use to authenticate collection requests.	modifiable
`application_id` | Boolean | Yes |  | he Mimecast application ID you want to use to authenticate collection requests. | modifiable |
| `access_key` | String | Yes |  | The Mimecast access key you want to use to authenticate collection requests. | modifiable |
| `secret_key` | String | Yes |  | The Mimecast secret key you want to use to authenticate collection requests. | modifiable |
| `supported_apis` | Array of strings | Yes |  | efine one or more of the available APIs to collect: `SIEM`, `DLP`, `Audit Events`, and `Hold Message List`. For example, for all you'd use: `["SIEM","DLP","Audit Events","Hold Message List"]` | modifiable |

Mimecast Source JSON example:

```json
{
  "api.version":"v1",
  "source":{
    "schemaRef":{
      "type":"Mimecast"
    },
    "config":{
      "name":"Mimecast",
      "description":"East field",
      "domain":"us-api.mimecast.com",
      "application_key":"********",
      "application_id":"********,
      "access_key":"********",
      "secret_key":"********",
      "fields":{
        "_siemForward":false
      },
      "category":"eastTeamF",
      "supported_apis":["SIEM","DLP","Audit Events","Hold Message List"]
    },
    "sourceType":"Universal"
  }
}
```
