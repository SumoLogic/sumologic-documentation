---
id: symantec-web-security-service-source
title: Symantec Web Security Service Source
sidebar_label: Symantec Web Security Service
description: The Symantec Web Security Service Source provides a secure endpoint to receive WSS Access logs from the Symantec WSS API.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/symantec-logo.svg')} alt="icon" width="125"/>

The Symantec Web Security Service Source provides a secure endpoint to receive WSS Access logs from the Symantec WSS API. It securely stores the required authentication, scheduling, and state tracking information.

* See the [Access Log Format](https://techdocs.broadcom.com/us/en/symantec-security-software/web-and-network-security/web-security-service/help/wss-reference/accesslogformats-ref.html) for reference.
* Logs are ingested in batches of 1,000.
* Logs are polled every five minutes.

## Prerequisite

You need to configure a WSS agent on the machine you want to collect data from. The WSS agent will collect your access data and the Symantec Web Security Service Source will receive that data using the Symantec WSS API. To configure and install the agent, follow the instructions in the [Web Security Service documentation](https://techdocs.broadcom.com/us/en/symantec-security-software/web-and-network-security/web-security-service/help/conn-matrix/conn-about-wssa.html).

## States

A Symantec Web Security Service Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing [Health Events](/docs/manage/health-events).

A Symantec Web Security Service Source goes through the following states when created:

1. **Pending**. Once the Source is submitted it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Symantec.
1. **Collecting**. The Source is actively collecting data from Symantec.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the [Health](/docs/manage/health-events#collection-page) and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events) to investigate issues with collection. <br/>![C2C error icon on collection page.png](/img/send-data/C2C-error-icon-on-collection-page.png)

Hover your mouse over the status icon to view a tooltip with a count of the detected errors and warnings.<br/> ![hover c2c error.png](/img/send-data/hover-c2c-error.png)

You can click on the status icon to open a Health Events panel with details on each detected issue.

## Authentication

You need to have a Symantec Web Security Service username and password. To create a User API Key that serves as the username and password in the Sync API syntax follow these steps:

1. Navigate to **Account Configuration > API Credentials**.
1. Click **Add API Credentials**.
1. WSS displays the **Add API Credential** dialog, which contains the random characters **Username** and **Password**.<br/> ![Symantec generate api creds.png](/img/send-data/Symantec-generate-api-creds.png)
   1. Copy the **Username** and **Password** keys into a text file.
   1. Select the API **Expiry** you'd like to set.
      * Time-based—You define the date and time when this token expires.
      * Never expires.
   1. For the **Access** option, select **Reporting Access Logs**.
1. Click **Save**.

See [Symantec Security Software documentation](https://techdocs.broadcom.com/us/en/symantec-security-software/web-and-network-security/web-security-service/Help/API_8/api-keys.html) for further details on generating API credentials.

## Create a Symantec Web Security Service Source

When you create a Symantec Web Security Service Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Symantec Web Security Service Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **Symantec Web Security Service**.<br/> ![symantec source icon.png](/img/send-data/symantec-source-icon.png)
1. Enter a **Name** to display for the Source in the Sumo web application. The description is optional.<br/> ![Symantec WSS version 1.2.3.png](/img/send-data/Symantec-WSS.png)
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM Enterprise](/docs/cse). When configured with the **Forward to SIEM** option the following metadata fields are set:
   * `_siemVendor`: Symantec
   * `_siemProduct`: Web Security Service
   * `_siemFormat`: JSON
   * `_siemEventID`: proxy-messages
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **API Username** and **Password**. Provide the Symantec Web Security Service user credentials you want to use to authenticate collection requests. This was copied during the [Authentication](#authentication) steps above.
1. When you are finished configuring the Source, click **Submit**.

### Error types

When Sumo Logic detects an issue it is tracked by [Health Events](/docs/manage/health-events). The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}


### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/api/collector-management). See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| config | JSON Object  | Yes | Contains the [configuration parameters](#config-parameters) for the Source. |   |
| schemaRef | JSON Object  | Yes | Use `{"type":"Symantec Web Security Service"}` for a Symantec Web Security Service Source. | not modifiable |
| sourceType | String | Yes | Use `Universal` for a Symantec Web Security Service Source. | not modifiable |

#### Config Parameters

The following table shows the **config** parameters for a Symantec Web Security Service Source.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `apiUsername` | String | Yes |  | Provide the username you want to use to authenticate collection requests. | modifiable |
| `apiPassword` | String | Yes |  | Provide the password for the username that you want to use to authenticate collection requests. | modifiable |

Symantec Web Security Service Source JSON example:

```json
{
  "api.version":"v1",
  "source":{
    "schemaRef":{
      "type":"Symantec Web Security Service"
    },
    "config":{
      "name":"Symantec WSS",
      "apiUsername":"********",
      "fields":{
        "_siemForward":false
      },
      "category":"c2c/sym",
      "apiPassword":"********"
    },
    "state":{
      "state":"Collecting"
    },
    "sourceType":"Universal"
  }
}
```
