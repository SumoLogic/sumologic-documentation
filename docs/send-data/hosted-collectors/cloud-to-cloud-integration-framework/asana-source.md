---
id: asana
title: Asana Source
sidebar_label: Asana
description: Learn how to retrieve Asana audit logs into the Sumo Logic environment.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/asana.png')} alt="asana-icon.png" width="80" />

The Asana Audit Logs API Integration ingests events from [Asana Audit Logs API](https://developers.asana.com/reference/audit-log-api). Asana can help you to break down large work into manageable tasks. It's a comprehensive work management tool that allows you to track project and task progress, share files, comments, and notes, and keep track of deadlines.

## Prerequisites

1. Only [Service Accounts](https://asana.com/guide/help/premium/service-accounts) in Enterprise Domains can access audit log API endpoints.

2. Service account's Personal Access Token (PAT) is required.

## Data Sources

The Asana Audit Logs Integration fetches audit logs using [GetAuditLogs](https://developers.asana.com/reference/getauditlogevents) source.

## Setup and Configuration

Follow the below steps to get the required fields for user configuration:

1. Login to your [Asana Enterprise Account](https://app.asana.com/admin).

2. After Logging in, Click the `Apps` tab from with your admin console.

3. Click `Service accounts`

4. Click the `Add service account` button

5. Refer to the below image for the same:

6. Copy the Personal Access Token (PAT) from here for further use.

7. Click `Save Changes` to save the PAT token for your service account.

7. Inspect the URL and parse the workspace ID of your service account.

## States

The Asana integration Source is a device security platform that discover devices, tracks behavior, detects threats, and takes action to protect your business.
When you create an Asana Source, it goes through the following stages:
1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Asana.
1. **Collecting**. The Source is actively collecting data from Asana.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.
On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events.md) to investigate issues with collection.<br/>![Azure Event Hubs error.png](/img/send-data/Azure-Event-Hubs-error.png)

Hover your mouse over the status icon to view a tooltip with a count of the detected errors and warnings. You can click on the status icon to open a Health Events panel with details on each detected issue.<br/>![health error generic.png](/img/send-data/azure_health_error_generic.png)

## Create Asana Source

When you create an Asana Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure an Asana Source:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Asana**.<br/> 
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. Enter the Personal Access Token (PAT) from the Asana platform.

### Error Types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third-party service APIs. | No | Not applicable | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | No | Not applicable | FirstPartyGenericError |

### Restarting your Source

If your Source encounters ThirdPartyConfig errors, you can restart it from either the Sumo Logic UI or Sumo Logic API.

#### UI

To restart your source in the Sumo Logic platform, follow the steps below:
1. Open the Collection page, and go to **Manage Data** > **Collection** > **Collection**.
2. Select the source and click the **information** icon on the right side of the row.
3. The API usage information popup is displayed. Click the **Restart Source** button on the bottom left. <br/><img src={useBaseUrl('img/send-data/restart-source-button.png')} alt="restart-source-button.png" width="600" />
4. Click **Confirm** to send the restart request. <br/><img src={useBaseUrl('img/send-data/restart-source-confirm.png')} alt="restart-source-confirm.png" width="600" />
5. The bottom left of the platform will provide a notification informing you the request was successful.<br/><img src={useBaseUrl('img/send-data/restart-source-initiated.png')} alt="restart-source-initiated.png" width="600" />

#### API

To restart your source using the Sumo Management API, follow the instructions below:
* Method: POST
* Example endpoint: `https://api.sumologic.com/api/v1/collectors/{collector_id}/sources/{source_id}/action/restart`.

<details><summary>Which API endpoint should I use?</summary>

{@import ../../../reuse/api-endpoints.md}

</details>

### JSON Configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| `config` | JSON Object  | Yes | Contains the [configuration-parameters](#config-parameters) of the Source. | na |
| `schemaRef` | JSON Object  | Yes | Use `{"type":"Asana"}` for Asana Source. | not modifiable |
| `sourceType` | String | Yes | Use `Universal` for Asana Source. | not modifiable |

### Config Parameters

| Parameter | Type | Required | Description | Access |
|:---|:---|:---|:---|:---|
| `name` | String | Yes | Type the desired name of the Source and it must be unique per Collector. This value is assigned to the `metadata field _source`.  | modifiable |
| `description` | String  | No | Type the description of the Source. | modifiable |
| `category` | String | No | Type the category of the source. This value is assigned to the metadata field `_sourceCategory`. | modifiable |
| `fields` | JSON Object | No | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `personalAccessToken` | String | Yes | Personal Access Token from the Asana platform. | modifiable |
| `workspaceID` | String | Yes | This will be the unique workspace id for the users service account | modifiable |

### JSON Example

```json
{
    "api.version": "v1",
    "source": {
        "config": {
                           "name": "Asana",
                           "description": "Test Source",
                           "category": "source_category",
                           "personalAccessToken": "****************************",
   "workspaceID": "1204094735693514"
                      },
        "schemaRef": {
            "type": "Asana"
        },
        "sourceType": "Universal"
    }
}
```