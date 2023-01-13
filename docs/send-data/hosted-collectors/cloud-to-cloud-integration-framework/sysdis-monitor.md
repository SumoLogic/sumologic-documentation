---
id: sysdig-monitor-source
title: Sysdig Monitor Source
sidebar_label: Sysdig Monitor
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Sysdig Monitor Cloud-to-Cloud source provides the ability to collect events such as monitoring, alerting, troubleshooting from the Sysdig Monitor platform and send them to Sumo Logic. It ingests events from the [Sysdig Monitor API](https://app.sysdigcloud.com/api/public/docs/index.html).

## Prerequisites

Before you begin setting up your **Sysdig Monitor** Source, the integration must be configured with the **Base URL** and **Sysdig Monitor API Token**.

### Base URL

The **Base URL** is the URL where your Sysdig Monitor account is located. To get the base URL, follow the steps below:
1. Log in to the Sysdig Monitor application.
2. At the top of the browser, you will see the Base URL inside the address bar. <br/> <img src={useBaseUrl('img/send-data/sysdig-base-url.png')} alt="sysdig-base-url.png" width="850" />
3. The following table contains the base URLs based on the location of your **Sysdig Monitor** account:

   | Region  | Base URLs |
   |:--|:--|
   | US1 |	`https://app.sysdigcloud.com/`|
   | US2 |	`https://us2.app.sysdig.com/` |
   | EU1 |	`https://eu1.app.sysdig.com/` |
   | AU1 |	`https://app.au1.sysdig.com/` |
   | US4 |	`https://app.us4.sysdig.com/` |


### API Token

The **API security token** is used to authenticate with Sysdig HTTP API. To get the **Sysdig API token**, follow the steps below:
1. Log in to the Sysdig Monitor application.
2. Navigate to **Events** section from left panel and click **Settings**.<br/> <img src={useBaseUrl('img/send-data/sysdig-settings-menu.png')} alt="sysdig-settings-menu.png" width="750" />
3. Select **User Profile**. The Sysdig Secure API token is displayed in the UI.<br/> <img src={useBaseUrl('img/send-data/sysdig-api-token.png')} alt="sysdig-api-token.png" width="800" />
4. You can copy the generated token for use, or click the **Reset Token** button to generate a new one.
:::note
When you reset the token, the previous token issued becomes invalid immediately.
:::


## Data Sources

The Sysdig Monitor integration fetches all types of user events using [Events V2 API](https://github.com/sysdiglabs/sysdig-sdk-python/blob/master/sdcclient/monitor/_events_v2.py).
:::note
The endpoint used in the integration is not specified in the Sysdig Monitor API documentation.
:::

## States

The Sysdig Monitor platform provides security, monitoring, and forensics in a cloud, container, and microservices-friendly architecture, integrated with Kubernetes and Docker. It collects, correlates, and visualizes full-stack data and provides monitoring dashboards.

When a Sysdig Monitor Source is created, it goes through the following states:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Sysdig Monitor.
1. **Collecting**. The Source is actively collecting data from SysDIG Monitor.

If the Source has any issues during any one of these states, it is placed in an **Error** state. When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.
On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events.md) to investigate issues with collection.<br/>![Azure Event Hubs error.png](/img/send-data/Azure-Event-Hubs-error.png)

Hover your mouse over the status icon to view a tooltip with a count of the detected errors and warnings. You can click on the status icon to open a Health Events panel with details on each detected issue.<br/>![health error generic.png](/img/send-data/azure_health_error_generic.png)


## Setup and configuration

When you create a Sysdig-Monitor Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
2. On the Collectors page, click **Add Source** next to a Hosted Collector.
3. Select **Sysdig** icon.  <br/>  <img src={useBaseUrl('img/send-data/sysdig-icon.png')} alt="sysdig-icon.png" width="150" />
4. Enter a **Name** to display for the Source in the Sumo Logic web application. The description is optional. <br/>   <img src={useBaseUrl('img/send-data/sysdig-config.png')} alt="sysdig-config.png" width="450" />
5. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
6. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
7. In **Base URL**, choose the URL where your **Sysdig** account is located. To know your base URL, see [Base URL](#base-url) section.
8. In **API Key**, authenticate your account by entering your secret API key. You can access your API key or generate a new one from **User Event API Management Console**, see [API Token](#api-token) section
9. When you are finished configuring the Source, click **Save**.

### Error types

When Sumo Logic detects an issue, it is tracked by Health Events. The following table shows three possible error types. It tells the reason for the error, if the source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable                                                    | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs.                                     | Yes                                                   | The Source will retry for up to 90 minutes, after which it quits.                               | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs.                                     | Yes                                                   | The Source will retry for up to 90 minutes, after which it quits.                               | FirstPartyGenericError |

### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|--|--|--|--|--|
| `config` | JSON Object  | Yes | Contains the [configuration-parameters](#config-parameters) of the Source. |
| `schemaRef` | JSON Object  | Yes | Use `{"type":"Sysdig Monitor Source"}` for Sysdig Monitor Source. | not modifiable |
| `sourceType` | String | Yes | Use `Universal` for Sysdig Monitor Source. | not modifiable |

### Config Parameters

| Parameter | Type | Required | Description | Access |
|--|--|--|--|--|
| `name` | String | Yes | Type the desired name of the Source and it must be unique per Collector. This value is assigned to the `metadata field _source`.  | modifiable |
| `description` | String  | No | Type the description of the Source. | modifiable |
| `category` | String | No | Type the category of the source. This value is assigned to the metadata field `_sourceCategory`. | modifiable |
| `fields` | JSON Object | No | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| baseURL | String | Yes | Region URL of the Sysdig monitor application. | modifiable |
| apiToken | String | Yes | Secret api key to authenticate your account.  | modifiable |
