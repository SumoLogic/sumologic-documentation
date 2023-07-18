---
id: okta-source
title: Okta Source
sidebar_label: Okta
keywords:
    - okta
    - cloud-SIEM-enterprise
description: The Okta Source provides a secure endpoint to receive event data from the Okta System Log API.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saml/okta.png')} alt="Thumbnail icon" width="75"/>

The Okta Source provides a secure endpoint to receive event data from the Okta [System Log API](https://developer.okta.com/docs/reference/api/system-log/), [Users API](https://developer.okta.com/docs/reference/api/users/), and [User's Group API](https://developer.okta.com/docs/reference/api/users/#get-user-s-groups).
It securely stores the required authentication, scheduling, and state tracking information.

:::note
This Source is available in the [Fed deployment](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security).
:::

## Setup and Configuration

The Okta source requires you to provide the API token to access the data. To create an Okta API token, following instructions in [Okta help](https://support.okta.com/help/s/article/How-do-I-create-an-API-token). 

## States

An Okta Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing [Health Events](/docs/manage/health-events.md).

An Okta Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Okta.
1. **Collecting**. The Source is actively collecting data from Okta.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the Health and Status for Sources is displayed. Use Health Events to investigate issues with collection. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

![Health and Status columns.png](/img/send-data/okta-Health-and-Status-columns.png)

Hover your mouse over the status icon to view a tooltip with details on
the detected issue.

![error status.png](/img/send-data/okta-error-status.png)

## Create an Okta Source

When you create an Okta Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure an Okta Source:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **Okta**.<br/><img src={useBaseUrl('img/send-data/okta-source-icon.png')} alt="[okta source icon" width="100"/>
1. Enter a **Name** to display for the Source in the Sumo web application. The description is optional. <br/><img src={useBaseUrl('img/send-data/Okta-version.png')} alt="okta-connfig" style={{border: '1px solid black'}} width="400"/>
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to Cloud SIEM Enterprise. When configured with the **Forward to SIEM** option the following metadata fields are set:
   * `_siemVendor`: Okta
   * `_siemProduct`: SSO
   * `_siemFormat`: JSON
   * `_siemEventID`: `<eventType>` Where `<eventType>` is the value of the field from the JSON event, such as user.session.start. See the list of possible event types.
   * `_siemDataType`: Inventory (only for user inventory data)
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **Okta API Key**. Provide the Okta API key you want to use to authenticate collection requests.
1. **Okta Domain**. Provide your specific Okta domain, such as `mydomain.okta.com`.
1. **Okta Event Types to Request**. By default, the Source will ingest all Okta events. You can instead configure a subset of events to collect. Click **Select Events** to specify the events you want to collect.

   ![okta events to collect.png](/img/send-data/okta-events-to-collect.png) 

1. **Inventory**. Select if you want to fetch user inventory data once every 24 hours. This uses the List Users API.
1. (Optional) The **Polling Interval** is set for 300 seconds by default, you can adjust it based on your needs. This sets how often the Source checks for new data.
1. (Optional) In **Processing Rules for Logs**, configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
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

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| config            | JSON Object  | Yes               | Contains the [configuration parameters](okta-source.md) for the Source. |                |
| schemaRef         | JSON Object  | Yes               | Use `{"type":"Okta"}` for an Okta Source.                                               | not modifiable |
| sourceType        | String       | Yes               | Use `Universal` for an Okta Source.                                                     | not modifiable |

### Config parameters

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the metadata field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM. | modifiable |
| `apiKey` | String | Yes |  | The Okta API key you want to use to authenticate collection requests.| modifiable
| `domain` | String | Yes |  | Provide your specific Okta domain, such as mydomain.okta.com.	| modifiable|
| `users` | Boolean | No | False | Set to true to collect user inventory data once every 24 hours.| modifiable |
| `collectAll` | Boolean | No | True | By default, the Source will ingest all Okta events. If false, eventTypes is required. | modifiable|
eventTypes | String | No |  | Comma separated list of events to collect. Required if collectAll is false. | modifiable|
| `pollingInterval` | Integer | No | 300 | This sets how often the Source checks for new data. | modifiable|

### JSON example

```json
{
  "api.version":"v1",
  "source":{
    "schemaRef":{
      "type":"Okta"
    },
    "config":{
      "name":"Okta",
      "description":"East field",
      "domain":"mydomain.okta.com",
      "users":true,
      "collectAll":true,
      "apiKey":"********",
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

## Limitation

During a polling interval, an Okta Source will make a request for every 1,000 logs available. The Okta API uses paging and only 1,000 logs are returned at a time.