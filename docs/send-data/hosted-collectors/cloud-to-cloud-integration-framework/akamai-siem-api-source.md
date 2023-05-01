---
id: akamai-siem-api-source
title: Akamai SIEM API Source
sidebar_label: Akamai SIEM API
description: The Akamai SIEM API Source provides a secure endpoint to receive security events generated on the Akamai platform by leveraging the V1 SIEM API.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/akamai.svg')} alt="Thumbnail icon" width="90"/>

The Akamai SIEM API Source provides a secure endpoint to receive security events generated on the Akamai platform by leveraging the [V1 SIEM API](https://developer.akamai.com/api/cloud_security/siem/v1.html). It securely stores the required authentication, scheduling, and state tracking information.

:::note
This source has a maximum ingest rate of 1 TB/day as measured by the [Data Volume Index](/docs/manage/ingestion-volume/data-volume-index). Contact Sumo Logic support for alternative collection techniques if your Source exceeds this rate.
:::

## States

An Akamai SIEM API Source tracks errors, reports its health, and start-up progress. You’re informed, in real time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing [Health Events](/docs/manage/health-events.md).

An Akamai SIEM API Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Symantec.
1. **Collecting**. The Source is actively collecting data from Symantec.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events.md) to investigate issues with collection. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.<br/> ![Akamai health error.png](/img/send-data/Akamai-health-error.png)

Hover your mouse over the status icon to view a tooltip with a count of the detected errors and warnings.<br/> ![hover c2c error.png](/img/send-data/hover-c2c-error.png)

You can click on the status icon to open a Health Events panel with details on each detected issue.

## Prerequisite and Authentication

The Akamai SIEM API Source requires you to provide a **Client Token**, **Client Secret**, **Access Token**, **Akamai API Host**, and at least one **Config ID**. To get these, follow the instructions from Akamai's documentation to [Set up SIEM integration](https://developer.akamai.com/tools/integrations/siem).

## Create an Akamai SIEM API Source

When you create an Akamai SIEM API Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure an Akamai SIEM API Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collection page, click **Add Source** next to a HostedCollector.
1. Select **Akamai SIEM API**.<br/><img src={useBaseUrl('img/send-data/Akamai-source-icon.png')} alt="Thumbnail icon" width="90"/>
1. Enter a **Name** to display for the Source in the Sumo web application. The description is optional.<br/><img src={useBaseUrl('img/send-data/Akamai-SIEM-API-Source.png')} alt="Thumbnail icon" width="400"/>
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to Cloud SIEM Enterprise. When configured with the **Forward to SIEM** option the following metadata fields are set:
    * `_siemVendor`:Akamai
    * `_siemProduct`:SIEM
    * `_siemFormat`:JSON
    * `_siemEventID`: `<type>` This is the value from the `type` field of the event. This is typically `akamai_siem`.
1. **Client Token**, **Client Secret**, **Access Token**, and **Akamai API Host**. Provide the Akamai SIEM API authentication credentials you want to use to [authenticate](#prerequisite-and-authentication)) collection requests. The **Akamai API Host** is the custom hostname applied to your credentials, it looks something like this: `akzz-XXXXXXXXXXXXXXXX-XXXXXXXXXXXXXXXX.luna.akamaiapis.net`.
1. **Config IDs**. Provide at least one Security Configuration ID you got when you turned on the SIEM integration in Akamai. This was done in the [prerequisite and authentication](#prerequisite-and-authentication) section.
1. **Parsing Options**. Select if you want to **Enable post processing** or **Disable all parsing**. The post processing options are **Decode httpMessage fields** and **Duplicate Events once for each rule associated with the event**. We recommend both parsing options when **Forward to SIEM** is enabled.
   * **Decode httpMessage fields** will decode the following fields from the `httpMessage` field of the [event](https://developer.akamai.com/api/cloud_security/siem/v1.html#event):
      * `httpMessage.requestHeaders`
      * `httpMessage.responseHeaders`
      * `httpMessage.query`
      For example, a log with the values:
      ```json
      {
         "format": "json",
         "type": "akamai_siem",
         "version": "1.0",
         "attackData": {
             ...
         },
         "geo": {
             ...
         },
         "httpMessage": {
            "bytes": "266",
            "host": "www.hmapi.com",
            "method": "GET",
            "path": "/",
            "port": "80",
            "protocol": "HTTP/1.1",
            "query": "option=com_jce%20telnet.exe",
            "requestHeaders": "User-Agent%3a%20BOT%2f0.1%20(BOT%20for%20JCE)%0d%0aAccept%3a%20text%2fhtml,application%2fxhtml+xml,application%2fxml%3bq%3d0.9,*%2f*%3bq%3d0.8%0d%0auniqueID%3a%20CR_H8%0d%0aAccept-Language%3a%20en-US,en%3bq%3d0.5%0d%0aAccept-Encoding%3a%20gzip,%20deflate%0d%0aConnection%3a%20keep-alive%0d%0aHost%3a%20www.hmapi.com%0d%0aContent-Length%3a%200%0d%0a",
            "requestId": "1158db1758e37bfe67b7c09",
            "responseHeaders": "Server%3a%20AkamaiGHost%0d%0aMime-Version%3a%201.0%0d%0aContent-Type%3a%20text%2fhtml%0d%0aContent-Length%3a%20266%0d%0aExpires%3a%20Tue,%2004%20Apr%202017%2010%3a57%3a02%20GMT%0d%0aDate%3a%20Tue,%2004%20Apr%202017%2010%3a57%3a02%20GMT%0d%0aConnection%3a%20close%0d%0aSet-Cookie%3a%20ak_bmsc%3dAFE4B6D8CEEDBD286FB10F37AC7B256617DB580D417F0000FE7BE3580429E23D%7epluPrgNmaBdJqOLZFwxqQLSkGGMy4zGMNXrpRIc1Md4qtsDfgjLCojg1hs2HC8JqaaB97QwQRR3YS1ulk+6e9Dbto0YASJAM909Ujbo6Qfyh1XpG0MniBzVbPMUV8oKhBLLPVSNCp0xXMnH8iXGZUHlUsHqWONt3+EGSbWUU320h4GKiGCJkig5r+hc6V1pi3tt7u3LglG3DloEilchdo8D7iu4lrvvAEzyYQI8Hao8M0%3d%3b%20expires%3dTue,%2004%20Apr%202017%2012%3a57%3a02%20GMT%3b%20max-age%3d7200%3b%20path%3d%2f%3b%20domain%3d.hmapi.com%3b%20HttpOnly%0d%0a",
            "start": "1491303422",
            "status": "200"
        }
      }
      ```
      will be decoded as:
      ```json
      {
        "format": "json",
        "type": "akamai_siem",
        "version": "1.0",
        "attackData": {
        ...
        },
        "geo": {
        ...
        },
        "httpMessage": {
            "bytes": "266",
            "host": "www.hmapi.com",
            "method": "GET",
            "path": "/",
            "port": "80",
            "protocol": "HTTP/1.1",
            "query": "option=com_jce telnet.exe",
            "requestHeaders": {
                "Accept": "text/html,application/xhtml xml,application/xml;q=0.9,*/*;q=0.8",
                "Accept-Encoding": "gzip, deflate",
                "Accept-Language": "en-US,en;q=0.5",
                "Connection": "keep-alive",
                "Content-Length": "0",
                "Host": "www.hmapi.com",
                "User-Agent": "BOT/0.1 (BOT for JCE)",
                "uniqueID": "CR_H8"
            },
            "requestId": "1158db1758e37bfe67b7c09",
            "responseHeaders": {
                "Connection": "close",
                "Content-Length": "266",
                "Content-Type": "text/html",
                "Date": "Tue, 04 Apr 2017 10:57:02 GMT",
                "Expires": "Tue, 04 Apr 2017 10:57:02 GMT",
                "Mime-Version": "1.0",
                "Server": "AkamaiGHost",
                "Set-Cookie": "ak_bmsc=AFE4B6D8CEEDBD286FB10F37AC7B256617DB580D417F0000FE7BE3580429E23D~pluPrgNmaBdJqOLZFwxqQLSkGGMy4zGMNXrpRIc1Md4qtsDfgjLCojg1hs2HC8JqaaB97QwQRR3YS1ulk 6e9Dbto0YASJAM909Ujbo6Qfyh1XpG0MniBzVbPMUV8oKhBLLPVSNCp0xXMnH8iXGZUHlUsHqWONt3 EGSbWUU320h4GKiGCJkig5r hc6V1pi3tt7u3LglG3DloEilchdo8D7iu4lrvvAEzyYQI8Hao8M0=; expires=Tue, 04 Apr 2017 12:57:02 GMT; max-age=7200; path=/; domain=.hmapi.com; HttpOnly"
            },
            "start": "1491303422",
            "status": "200"
        }
      }
      ```      
      * **Duplicate Events once for each rule associated with the event** will decode the `attackData` (rules) that triggered the events and duplicate the event, one for each triggered rule. In this case the base event:
      ```json
      {
         "format": "json",
         "type": "akamai_siem",
         "version": "1.0",
         "attackData": {
             "clientIP": "52.91.36.10",
             "configId": "14227",
             "policyId": "qik1_26545",
             "rules": [
                 {
                     "rule": "950002",
                     "ruleAction": "alert",
                     "ruleData": "telnet.exe",
                     "ruleMessage": "System Command Access",
                     "ruleSelector": "ARGS:option",
                     "ruleTag": "OWASP_CRS/WEB_ATTACK/FILE_INJECTION",
                     "ruleVersion": "4"
                 },
                 {
                     "rule": "950006",
                     "ruleAction": "alert",
                     "ruleData": "telnet.exe",
                     "ruleMessage": "System Command Injection",
                     "ruleSelector": "ARGS:option",
                     "ruleTag": "OWASP_CRS/WEB_ATTACK/COMMAND_INJECTION",
                     "ruleVersion": "4"
                 },
                 {
                     "rule": "CMD-INJECTION-ANOMALY",
                     "ruleAction": "deny",
                     "ruleData": "Vector Score: 10, DENY threshold: 9, Alert Rules: 950002:950006, Deny Rule: , Last Matched Message: System Command Injection",
                     "ruleMessage": "Anomaly Score Exceeded for Command Injection",
                     "ruleSelector": "",
                     "ruleTag": "AKAMAI/POLICY/CMD_INJECTION_ANOMALY",
                     "ruleVersion": "1"
                 }
             ]
         },
         "geo": {
           ...
         },
         "httpMessage": {
           ...
         }
      }
      ```
      would be transformed into **three distinct events** that are exactly the same, except for the `attackData` which would be duplicated once for each rule. For example, the first event would be:
      ```json
      {
      "format": "json",
          "type": "akamai_siem",
          "version": "1.0",
          "attackData": {
              "clientIP": "52.91.36.10",
              "configId": "14227",
              "policyId": "qik1_26545",
              "rule": "950002",
              "ruleAction": "alert",
              "ruleData": "telnet.exe",
              "ruleMessage": "System Command Access",
              "ruleSelector": "ARGS:option",
              "ruleTag": "OWASP_CRS/WEB_ATTACK/FILE_INJECTION",
              "ruleVersion": "4"
          },
          "geo": {
            ...
          },
          "httpMessage": {
            ...
          }
      }
          "format": "json",
          "type": "akamai_siem",
          "version": "1.0",
          "attackData": {
              "clientIP": "52.91.36.10",
              "configId": "14227",
              "policyId": "qik1_26545",
              "rule": "950002",
              "ruleAction": "alert",
              "ruleData": "telnet.exe",
              "ruleMessage": "System Command Access",
              "ruleSelector": "ARGS:option",
              "ruleTag": "OWASP_CRS/WEB_ATTACK/FILE_INJECTION",
              "ruleVersion": "4"
          },
          "geo": {
            ...
          },
          "httpMessage": {
            ...
          }
      }
      ```
      and the second would be:
      ```json
      {
          "format": "json",
          "type": "akamai_siem",
          "version": "1.0",
          "attackData": {
              "clientIP": "52.91.36.10",
              "configId": "14227",
              "policyId": "qik1_26545",
              "rule": "950006",
              "ruleAction": "alert",
              "ruleData": "telnet.exe",
              "ruleMessage": "System Command Injection",
              "ruleSelector": "ARGS:option",
              "ruleTag": "OWASP_CRS/WEB_ATTACK/COMMAND_INJECTION",
              "ruleVersion": "4"
          },
          "geo": {
            ...
          },
          "httpMessage": {
            ...
          }
      }
      ```
      and so on. One event for each element of the rules array within `attackData`.
1. **Advanced Options**. These options should be kept at their default value. They may require changes for environments with a high volume of events.
   * **Option: Reset the offset token to start collection from current point in time**: In some cases, the Collector might enter a state where the offset token used to track what data has already been consumed might become invalid. This can occur if the Collector stops collecting for a period of time or if the credentials have expired. The Collector attempts to detect this condition and reset the offset token. It may be the case that manual intervention is needed to reset the offset token. In this case, you should select the **Reset the offset token to start collection from current point in time** so the Collector will start collecting from the current period in time.
   * **Option: Number of logs to pull per request**: This option controls the number of logs that are pulled for each request. The default value for this is 10,000, but in some environments it may be necessary to increase the number of logs pulled with each request. If the integration is falling behind in terms of its collection rate, this limit should be increased to pull more events with each request. Supported values are between 1,000 and 200,000, and if a value out of this range is specified the default value of 10,000 is used.
   * **Option: Poll Interval (in seconds)**: This option controls the poll interval for requesting events. This polling interval is only used when the previous requests indicate no more log data is available. The interval value must be at least 30, if anything lower is defined, 30 is automatically defined.
1. When you are finished configuring the Source, click **Submit**.

## Error types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}

## JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required? | Description | Access|
|:-------|:-----------|:-------|:--------|:----|
| config | JSON Object  | Yes | Contains the [configuration parameters](#config-parameters) for the Source. |   |
| schemaRef | JSON Object  | Yes | Use `{"type":"Akamai SIEM API"}` for a Akamai SIEM API Source. | not modifiable |
| sourceType | String | Yes | Use `Universal` for a Akamai SIEM API Source. | not modifiable |

#### Config Parameters

The following table shows the **config** parameters for a Akamai SIEM API Source.

| Parameter | Type | Required? | Default |Description | Access|
|:-------|:----------|:----|:------|:-----------|:----|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `clientSecret` | String | No |  | The Client Secret you want to use to authenticate collection requests. | modifiable |
| `clientToken` | String | Yes |  | The Client Token for the Client Secret that you want to use to authenticate collection requests. | modifiable |
| `accessToken` | String | Yes |  | The Access Token you want to use to authenticate collection requests. | modifiable |
| `host` | String | Yes |  | The custom hostname applied to your credentials, it looks like: `akzz-XXXXXXXXXXXXXXXX-XXXXXXXXXXXXXXXX.luna.akamaiapis.net` | modifiable |
| `configIds` | Array of strings | Yes |  | Provide at least one Configuration ID you got when you turned on the SIEM integration in Akamai. | modifiable |
| `disablePostProcess` | Boolean | No | False | When `true` event logs are collected as is from Akamai. When `false` you need to specify the `splitOnRules` and `decodeHttp` parameters. | modifiable |
| `splitOnRules` | Boolean | No unless `disablePostProcess` is set to true | False | Duplicate Events once for each rule associated with the event. Sets if the event is duplicated once for each rule triggered in the attack data. | modifiable |
| `decodeHttp` | Boolean | No unless `disablePostProcess` is set to true | True | Decode httpMessage fields. Sets if the httpMessage fields are URL decoded. | modifiable |
| `resetOffset` | Boolean | No | False | Reset the offset token to start collection from current point in time. | modifiable |
| `limit` | Integer | No | 10000 | The number of logs to pull per request. Can be a maximum of 200000 and a minimum of 1000. | modifiable |
| `pollInterval` | Integer | No | 30 | The poll interval in seconds. Can be a maximum of 600 and a minimum of 15. | modifiable |

Akamai SIEM API Source JSON example:

```json
{
  "api.version":"v1",
  "source":{
    "state":{
      "state":"Collecting"
    },
    "schemaRef":{
      "type":"Akamai SIEM API"
    },
    "config":{
      "name":"akamai test",
      "splitOnRules":true,
      "clientToken":"********",
      "host":"********.luna.akamaiapis.net",
      "configIds":["74215"],
      "decodeHttp":true,
      "fields":{
        "_siemForward":false
      },
      "resetOffset":false,
      "clientSecret":"********",
      "limit":10000,
      "pollInterval":30,
      "accessToken":"********"
    },
    "sourceType":"Universal"
  }
}
```
