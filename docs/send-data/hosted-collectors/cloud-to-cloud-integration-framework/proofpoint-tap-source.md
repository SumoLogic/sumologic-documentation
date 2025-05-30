---
id: proofpoint-tap-source
title: Proofpoint TAP Source
sidebar_label: Proofpoint TAP
tags:
    - proofpoint-tap
description: The Proofpoint TAP Source provides a secure endpoint to receive data from the Proofpoint TAP SIEM API.
---

import React, { useEffect, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/proofpoint-tap/example.json';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/proofpoint-logo.png')} alt="icon" width="140"/>

The Proofpoint TAP Source provides a secure endpoint to receive data from the Proofpoint [TAP SIEM API](https://help.proofpoint.com/Threat_Insight_Dashboard/API_Documentation/SIEM_API). It securely stores the required authentication, scheduling, and state tracking information.

The Proofpoint integration supports the following four event types:

 * Messages Permitted
 * Messages Blocked
 * Clicks Permitted
 * Clicks Blocked

:::note
The maximum data retention period for Proofpoint TAP is 7 days, as mentioned in their [documentation](https://help.proofpoint.com/Threat_Insight_Dashboard/API_Documentation/SIEM_API). The integration will only be able to fetch a maximum of the last 7 days data. So there is a chance of data loss if the C2C stops functioning for more than a 7-day time interval.
:::

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 300 seconds |  Clicks |
| 300 seconds |  Messages |

## Setup

### Vendor configuration

The integration must be configured with a service credential (`Service Principal`) and API secret key. The service principal and secret are used to authenticate to the SIEM API.

1. Log in to the [TAP dashboard](https://threatinsight.proofpoint.com/auth/new).
1. Generate TAP service credentials. For directions, see the [Proofpoint TAP documentation](https://ptr-docs.proofpoint.com/ptr-guides/integrations-files/ptr-tap/#generate-tap-service-credentials).
1. Copy the Service Principal and Secret and save them for later use in [Source configuration](#source-configuration) below.

#### Copy log options

There are two options to be aware of, **Copy logs for each recipient** and **Copy logs for each MessagePart**. With both options enabled, the integration creates and ingests four total events, for one original event.

#### Copy logs for each recipient

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

#### Copy logs for each MessagePart

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

### Source configuration

When you create a Proofpoint TAP Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Proofpoint TAP Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.  
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Proofpoint TAP**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **Proofpoint Domain**. Provide a Proofpoint endpoint if different from the default, `tap-api-v2.proofpoint.com`.
1. **API Secret**. Provide the Proofpoint API Secret for authenticating collection requests (copied in [Vendor configuration](#vendor-configuration) above).
1. **Service Principal**. Provide the Proofpoint Service Principal for authenticating collection requests (copied in [Vendor configuration](#vendor-configuration) above).
1. Select from the options **Copy** **logs for each recipient** and **Copy logs for each MessagePart**. With both options enabled, the integration creates and ingests four total events, for one original event. See [copy log options](#copy-logoptions) for details.
1. (Optional) The **Polling Interval** is set for 300 seconds by default, you can adjust it based on your needs.
1. When you are finished configuring the Source, click **Submit**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemProduct` | `TAP` | Set when **Forward To SIEM** is checked. |
| `_siemVendor` | `Proofpoint` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |
| `_siemEventID` | `CLICK_BLOCKED, CLICK_PERMITTED, CLICK_PERMITTED, or MESSAGE_DELIVERED` | The SIEM event ID is set to the type of message ingested. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Proofpoint"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| domain | String | Yes |  | Provide a Proofpoint endpoint if different from the default, tap-api-v2.proofpoint.com. | |
| api_secret | String | Yes | `null` | Provide the Proofpoint API Secret for authenticating collection requests.| |
| service_principal | String | Yes |`null`  | Provide the Proofpoint Service Principal for authenticating collection requests.| |
| supported_events | JSON Object | Yes | `null` | The events to collect, options are clicks and messages. | |
| split_recipients | Boolean | No | true | Set to true to copy logs for each recipient. | |
| split_message_parts | Boolean | No | false | Set to true to copy logs for each MessagePart. | |
| pollingInterval | Integer | No | 300 | This sets how often the Source checks for new data. | |

## Examples

<>
  {(() => {
    const [json, setJson] = React.useState('');
    const [tf, setTf] = React.useState('');

    React.useEffect(() => {
      fetch(useBaseUrl('/files/c2c/proofpoint-tap/example.json'))
        .then(res => res.text())
        .then(setJson);
      fetch(useBaseUrl('/files/c2c/proofpoint-tap/example.tf'))
        .then(res => res.text())
        .then(setTf);
    }, []);

    return (
      <>
        <h3>JSON example</h3>
        <CodeBlock language="json">{json}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/proofpoint-tap/example.json')} target="_blank" rel="noopener noreferrer">Download example</a>

        <h3>Terraform example</h3>
        <CodeBlock language="hcl">{tf}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/proofpoint-tap/example.tf')} target="_blank" rel="noopener noreferrer">Download example</a>
      </>
    );
  })()}
</>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
