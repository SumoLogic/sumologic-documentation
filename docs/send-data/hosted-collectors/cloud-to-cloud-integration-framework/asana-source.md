---
id: asana-source
title: Asana Source
sidebar_label: Asana
description: Learn how to retrieve Asana audit logs into the Sumo Logic environment.

---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/asana-icon.png')} alt="asana-icon" width="40" />

The Asana Audit Logs API Integration ingests events from [Asana Audit Logs API](https://developers.asana.com/reference/audit-log-api). Asana can help you to break down large work into manageable tasks. It's a comprehensive work management tool that allows you to track project and task progress, share files, comments, and notes, and keep track of deadlines.

## Prerequisites

* Only [Service Accounts](https://asana.com/guide/help/premium/service-accounts) in Enterprise Domains can access audit log API endpoints.
* Your Service account's Personal Access Token (PAT) is required.

## Data Source

The Asana Audit Logs Integration fetches audit logs every 5 mins using [GetAuditLogs](https://developers.asana.com/reference/getauditlogevents) source.

## Setup and Configuration

Follow the below steps to get the required fields for user configuration:

1. Log in to your [Asana Enterprise Account](https://app.asana.com/admin).<br/> <img src={useBaseUrl('img/send-data/asana_login.png')} alt="asana-login" width="400" />
1. After logging in, click the **Apps** tab from with your admin console.
1. Click **Service accounts**.
1. Click the **Add service account** button.
1. Refer to the below image for the same:<br/> <img src={useBaseUrl('img/send-data/add_service_account.png')} alt="add_service_account" width="800" />
1. Copy the Personal Access Token (PAT) from here for further use.<br/> <img src={useBaseUrl('img/send-data/pat.png')} alt="pat" width="400" />
1. Click **Save changes** to save the PAT token for your service account.
1. Inspect the URL and parse the workspace ID of your service account.<br/> <img src={useBaseUrl('img/send-data/workspace_id.png')} alt="workspace_id" width="700" />

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
On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

## Create Asana Source

When you create an Asana Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure an Asana Source:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Asana**.<br/> <img src={useBaseUrl('img/send-data/asana-icon.png')} alt="asana-icon" width="40" />
1. Enter a **Name** for the Source. The description is optional. <br/><img src={useBaseUrl('img/send-data/asana_config_main.png')} alt="asana-config-main.png" width="400" />
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. Enter the Personal Access Token (PAT) from the Asana platform.
1. Enter the unique workspace ID for the users service account.

### Error Types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason for the error, if the source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third-party service APIs. | Yes | The Source will retry indefinitely. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry indefinitely. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}

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
| `workspaceID` | String | Yes | This will be the unique workspace id for the users service account. | modifiable |

### JSON Example

```json
{
	"api.version":"v1",
	"source":{
		"config":{
			"name":"Asana",
			"description":"Test Source",
			"category":"source_category",
			"personalAccessToken":"****************************",
			"workspaceID":"1204094735693514"
		},
		"schemaRef":{
			"type":"Asana"
		},
		"sourceType":"Security"
	}
}
```
