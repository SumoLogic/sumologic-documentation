---
id: sentinelone-mgmt-api-source
title: SentinelOne Mgmt API Source
sidebar_label: SentinelOne Mgmt API
keywords:
    - sentinelone-mgmt-api
    - cloud-SIEM-enterprise
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/sentinelone-icon.png')} alt="sentinelone-icon.png" width="50" />

The SentinelOne Mgmt API Source collects data from the SentinelOne Management Console. It securely stores the required authentication, scheduling, and state tracking information.

Data from the following object types are collected from [SentinelOne APIs](https://usea1-partners.sentinelone.net/api-doc/overview):

 * `activities`
 * `agents`
 * `threats`

Once the Source is created it will start collecting historical data and maintain a polling interval of five minutes.

:::note
This Source is available in the Fed deployment.
:::

## States

A SentinelOne Mgmt API Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

A SentinelOne Mgmt API Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with SentinelOne.
1. **Collecting**. The Source is actively collecting data from SentinelOne.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the Health and Status for Sources is displayed. Use Health Events to investigate issues with collection.

![sentinelOne health.png](/img/send-data/sentinalOne-health.png)

Hover your mouse over the status icon to view a tooltip with a count of the detected errors and warnings.

![hover c2c error.png](/img/send-data/hover-c2c-error.png)

You can click on the status icon to open a Health Events panel with details on each detected issue.

## Authentication

The SentinelOne Mgmt API Source requires authentication with a token associated with ApiToken. See [how to generate an API Token from SentinelOne documentation](https://usea1-partners.sentinelone.net/docs/en/generating-api-tokens.html). The following steps are provided as a guide.

To generate an API token:

1. Log in to the SentinelOne Management Console with Admin user credentials.
1. In the Management Console, click **Settings**.
1. In the **Settings** view, click **Users**.
1. Click **New User**.
1. Enter the information for the new console user.
1. In **Role**, select **Admin**.
1. Click **Save**.
1. Log in to the SentinelOne Management Console with the credentials of the new user.
1. Navigate to **Settings > Users**.
1. Select the newly added console user.
1. Click **Options**.
1. Click **Generate API token**.
1. Copy or download this API Token.

### Create a SentinelOne Mgmt API Source

When you create a SentinelOne Mgmt API Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a SentinelOne Mgmt API Source:**

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 

1. On the Collectors page, click **Add Source** next to a Hosted Collector.

1. Select **SentinelOne Mgmt API**.

   ![sentinel one icon.png](/img/send-data/sentinal-one-icon.png)

1. Enter a **Name** to display for the Source in the Sumo web application. The description is optional.

   ![SentinelOne create pane.png](/img/send-data/SentinalOne-create-pane.png)

1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to Cloud SIEM Enterprise. When configured with the **Forward to SIEM** option the following metadata fields are set:
   * `_siemVendor`: SentinelOne
   * `_siemProduct`: MGMT API
   * `_siemFormat`: JSON
   * `_siemEventID`: The type of data ingested. Values include `activities - {id}`, `threats - {id}`, or `agents`. Agents has a `_siemDataType` of `Inventory`.
:::note
If you entered actions in Supported APIs to collect above, the `_siemDataType` field will be set to `Inventory`.
:::
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped. 
1. **Base URL**. Provide your SentinelOne Management URL. It's in this format: `https:/\<your_management_ur\>`.
1. **API Token**. Provide the API Token you got from the SentinelOne Management Console. See Authentication above for details.
1. **Supported APIs to collect**. Select one or more of the available APIs: **activities**, **agents**, and **threats**.
1. When you are finished configuring the Source, click **Submit**.

### Error types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}


### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| config | JSON Object  | Yes | Contains the configuration parameters for the Source. |   |
| schemaRef | JSON Object  | Yes | Set to `{"type":"SentinelOne Mgmt API"}`. | not modifiable |
| sourceType | String | Yes | Set to `Universal`. | not modifiable |

The following table shows the **config** parameters for a SentinelOne Mgmt API Source.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the metadata field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM. | modifiable |
| `base_url` | String | Yes |  | Provide your SentinelOne Management URL. It's in this format: `https://<your_management_url>`. | modifiable |
| `api_secret` | String | Yes |  | Provide your API Token from SentinelOne that you want to use to authenticate collection requests. | modifiable |
| `supported_apis` | Array of strings | Yes |  | Define one or more of the available APIs to collect: activities, agents, and threats.<br/>For example, for all three you'd use: `["activities","agents","threats"]` | modifiable |

SentinelOne Mgmt API Source JSON example:

```json
{
  "api.version":"v1",
  "source":{
    "config":{
      "name":"SentinelOne",
      "supported_apis":["activities","agents","threats"],
      "api_secret":"********",
      "base_url":"https://usea1-partners.sentinelone.net/",
      "fields":{
        "_siemForward":false
      }
    },
    "schemaRef":{
      "type":"SentinelOne Mgmt API"
    },
    "state":{
      "state":"Collecting"
    },
    "sourceType":"Universal"
  }
}
```
