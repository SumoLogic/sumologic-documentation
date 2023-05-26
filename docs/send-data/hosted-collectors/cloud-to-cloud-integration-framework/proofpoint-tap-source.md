---
id: proofpoint-tap-source
title: Proofpoint TAP Source
sidebar_label: Proofpoint TAP
description: The Proofpoint TAP Source provides a secure endpoint to receive data from the Proofpoint TAP SIEM API.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/proofpoint-logo.png')} alt="icon" width="140"/>

The Proofpoint TAP Source provides a secure endpoint to receive data from the Proofpoint [TAP SIEM API](https://help.proofpoint.com/Threat_Insight_Dashboard/API_Documentation/SIEM_API). It securely stores the required authentication, scheduling, and state tracking information.

The Proofpoint integration supports the following four event types:

 * Messages Permitted
 * Messages Blocked
 * Clicks Permitted
 * Clicks Blocked

:::note
This Source is available in the [Fed deployment](/docs/api/troubleshooting#deployments-and-sumo-logic-endpoints).
:::

## States

A Proofpoint TAP Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

A Proofpoint TAP Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Proofpoint TAP.
1. **Collecting**. The Source is actively collecting data from Proofpoint TAP.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the Health and Status for Sources is displayed. Use Health Events to investigate issues with collection.

![proofpoint error icon.png](/img/send-data/proofpoint-error-icon.png)

Hover your mouse over the status icon to view a tooltip with details on
the detected issue.

![health error generic.png](/img/send-data/health-error-generic.png)

## Prerequisite

The integration must be configured with a service credential (`Service Principal`) and API secret key.

The integration supports two types of event collection:

 * `clicks` - collect Clicks blocked events and Clicks permitted events.
 * `messages` - collect Messages blocked events and Messages permitted events.

## Copy log options

There are two options to be aware of, **Copy logs for each recipient** and **Copy logs for each MessagePart**. With both options enabled, the integration creates and ingests four total events, for one original event.

### Copy logs for each recipient

If this is enabled, the integration will create a duplicate log, one for each recipient listed in the `recipients` section of a message. For example, with the following event:  

```json
{
        "GUID": "c26dbea0-80d5-463b-b93c-4e8b708219ce",
        "QID": "r2FNwRHF004109",
        "ccAddresses": [
            "bruce.wayne@university-of-education.zz"
        ],
        "clusterId": "pharmtech_hosted",
        "completelyRewritten": "true",
        "fromAddress": "badguy@evil.zz",
        "headerCC": "\"Bruce Wayne\" <bruce.wayne@university-of-education.zz>",
        "headerFrom": "\"A. Badguy\" <badguy@evil.zz>",
        "headerReplyTo": null,
        "headerTo": "\"Clark Kent\" <clark.kent@pharmtech.zz>; \"Diana Prince\" <diana.prince@pharmtech.zz>",
        "impostorScore": 0,
        "malwareScore": 100,
        "messageID": "20160624211145.62086.mail@evil.zz",
        "messageParts": [{
                "contentType": "text/plain",
                "disposition": "inline",
                "filename": "text.txt",
                "md5": "008c5926ca861023c1d2a36653fd88e2",
                "oContentType": "text/plain",
                "sandboxStatus": "unsupported",
                "sha256": "85738f8f9a7f1b04b5329c590ebcb9e425925c6d0984089c43a022de4f19c281"
            },
            {
                "contentType": "application/pdf",
                "disposition": "attached",
                "filename": "Invoice for Pharmtech.pdf",
                "md5": "5873c7d37608e0d49bcaa6f32b6c731f",
                "oContentType": "application/pdf",
                "sandboxStatus": "threat",
                "sha256": "2fab740f143fc1aa4c1cd0146d334c5593b1428f6d062b2c406e5efe8abe95ca"
            }
        ],
        "messageTime": "2016-06-24T21:18:38.000Z",
        "modulesRun": [
            "pdr",
            "sandbox",
            "spam",
            "urldefense"
        ],
        "phishScore": 46,
        "policyRoutes": [
            "default_inbound",
            "executives"
        ],
        "quarantineFolder": "Attachment Defense",
        "quarantineRule": "module.sandbox.threat",
        "recipient": [
            "clark.kent@pharmtech.zz",
            "diana.prince@pharmtech.zz"
        ],
        "replyToAddress": null,
        "sender": "e99d7ed5580193f36a51f597bc2c0210@evil.zz",
        "senderIP": "192.0.2.255",
        "spamScore": 4,
        "subject": "Please find a totally safe invoice attached.",
        "threatsInfoMap": [{
                "campaignId": "46e01b8a-c899-404d-bcd9-189bb393d1a7",
                "classification": "MALWARE",
                "threat": "2fab740f143fc1aa4c1cd0146d334c5593b1428f6d062b2c406e5efe8abe95ca",
                "threatId": "2fab740f143fc1aa4c1cd0146d334c5593b1428f6d062b2c406e5efe8abe95ca",
                "threatStatus": "active",
                "threatTime": "2016-06-24T21:18:38.000Z",
                "threatType": "ATTACHMENT",
                "threatUrl": "https://threatinsight.proofpoint.com/#/73aa0499-dfc8-75eb-1de8-a471b24a2e75/threat/u/2fab740f143fc1aa4c1cd0146d334c5593b1428f6d062b2c406e5efe8abe95ca"
            },
            {
                "campaignId": "46e01b8a-c899-404d-bcd9-189bb393d1a7",
                "classification": "MALWARE",
                "threat": "badsite.zz",
                "threatId": "3ba97fc852c66a7ba761450edfdfb9f4ffab74715b591294f78b5e37a76481aa",
                "threatTime": "2016-06-24T21:18:07.000Z",
                "threatType": "URL",
                "threatUrl": "https://threatinsight.proofpoint.com/#/73aa0499-dfc8-75eb-1de8-a471b24a2e75/threat/u/3ba97fc852c66a7ba761450edfdfb9f4ffab74715b591294f78b5e37a76481aa"
            }
        ],
        "toAddresses": [
            "clark.kent@pharmtech.zz",
            "diana.prince@pharmtech.zz"
        ],
        "xmailer": "Spambot v2.5"
    }
```

Two total event logs would be created, one with the `recipient` field of `clark.kent@pharmtech.zz` and one with the `recipient` field of `diana.prince@pharmtech.zz`. If this option is disabled, the above event will be ingested without any changes.

### Copy logs for each MessagePart

This will create duplicate logs, one for each value within `MessageParts`. Take the above message. If enabled, the integration will log two events. One with `MessageParts` of:  

```json
{
    "contentType": "text/plain",
    "disposition": "inline",
    "filename": "text.txt",
    "md5": "008c5926ca861023c1d2a36653fd88e2",
    "oContentType": "text/plain",
    "sandboxStatus": "unsupported",
    "sha256": "85738f8f9a7f1b04b5329c590ebcb9e425925c6d0984089c43a022de4f19c281"
}
```

The other with `MessageParts` of:  

```json
{
    "contentType": "application/pdf",
       "disposition": "attached",
       "filename": "Invoice for Pharmtech.pdf",
       "md5": "5873c7d37608e0d49bcaa6f32b6c731f",
       "oContentType": "application/pdf",
       "sandboxStatus": "threat",
       "sha256": "2fab740f143fc1aa4c1cd0146d334c5593b1428f6d062b2c406e5efe8abe95ca"
}
```

If this option is disabled, the above event will be ingested with no change.

:::important
With both options enabled above, the integration would create and ingest four total events, for one original event.
:::

## Create a Proofpoint TAP Source

When you create a Proofpoint TAP Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Proofpoint TAP Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 

1. On the Collectors page, click **Add Source** next to a Hosted Collector.

1. Select **Proofpoint TAP**.

1. Enter a **Name **for the Source. The description is optional.

   ![Proofpoint TAP create pane.png](/img/send-data/Proofpoint-TAP-create-pane.png)

1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to Cloud SIEM Enterprise. When configured with the **Forward to SIEM** option the following metadata fields are set:

   * `_siemVendor`: Proofpoint
   * `_siemProduct`: TAP
   * `_siemFormat`: JSON
   * `_siemEventID`: The SIEM event ID is set to the type of message ingested. Possible options are:
     * `CLICK_BLOCKED`
     * `CLICK_PERMITTED`
     * `MESSAGE_BLOCKED`
     * `MESSAGE_DELIVERED`

1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.

   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.

1. **Proofpoint Domain**. Provide a Proofpoint endpoint if different from the default, `tap-api-v2.proofpoint.com`.

1. **API Secret**. Provide the Proofpoint API Secret for authenticating collection requests.

1. **Service Principal**. Provide the Proofpoint Service Principal for authenticating collection requests.

1. Select from the options **Copy** **logs for each recipient** and **Copy logs for each MessagePart**. With both options enabled, the integration creates and ingests four total events, for one original event. See [copy options](#copy-log-options) for details.

1. (Optional) The **Polling Interval** is set for 300 seconds by default, you can adjust it based on your needs.

1. When you are finished configuring the Source, click **Submit**.


### Error Types

When Sumo Logic detects an issue it is tracked by [Health Events](/docs/manage/health-events/). The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

|Type | Reason | Retries | Retry Behavior | Health Event Name |
| :-- | :-- | :-- | :-- | :-- |
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable |ThirdPartyConfigError  |   
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. |ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | FirstPartyGenericError |  

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}


### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| config                    | JSON Object          | Yes | Contains the configuration parameters for the Source. |                        |
| schemaRef                 | JSON Object          | Yes | Use `{"type":"Proofpoint"}` for a Proofpoint Source. | not modifiable         |
| sourceType                | String               | Yes | Use `Universal` for a Proofpoint Source. | not modifiable         |

The following table shows the **config** parameters for a Proofpoint
TAP Source.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the metadata field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM. | modifiable |
| `domain` | String | Yes |  | Provide a Proofpoint endpoint if different from the default, tap-api-v2.proofpoint.com.	modifiable|
| `api_secret` | String | Yes |  | Provide the Proofpoint API Secret for authenticating collection requests.	modifiable|
| `service_principal` | String | Yes |  | Provide the Proofpoint Service Principal for authenticating collection requests.	modifiable|
| `supported_events` | JSON Object | Yes |  | The events to collect, options are clicks and messages. | modifiable|
| `split_recipients` | Boolean | No | true | Set to true to copy logs for each recipient. | modifiable|
| `split_message_parts` | Boolean | No | false	Set to true to copy logs for each MessagePart. | modifiable|
| `pollingInterval` | Integer | No | 300 | This sets how often the Source checks for new data. | modifiable|

Proofpoint Source JSON example:

```json
{
  "api.version":"v1",
  "source":{
    "schemaRef":{
      "type":"Proofpoint"
    },
    "config":{
      "name":"Proofpoint",
      "description":"East field",
      "domain":"tap-api-v2.proofpoint.com",
      "api_secret":"********",
      "service_principal":"********",
      "split_recipients":true,
      "split_message_parts":false,
      "fields":{
        "_siemForward":false
      },
      "category":"eastTeamF",
      "pollingInterval":300
    },
    "sourceType":"Universal"
  }
}
```
