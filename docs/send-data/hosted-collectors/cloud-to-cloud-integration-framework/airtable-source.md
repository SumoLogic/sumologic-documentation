---
id: airtable-source
title: Airtable Source
sidebar_label: Airtable
description: Learn how to retrieve Airtable audit logs into the Sumo Logic environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/airtable-icon.png')} alt="airtable-icon.png" width="50" />

The Airtable API integration ingests audit logs periodically from the Airtable app platform into the Sumo Logic environment for storing and analyzing data.

## Data Sources

The Airtable Integration periodically consumes audit logs from the Airtable API and sends data to Sumo Logic in chunks.


## Prerequisites

To collect audit logs from the Airtable application into Sumo Logic, you must meet the following criteria:
* You need to have an Airtable admin account.
* Choose **enterprise.auditLogs:read** permission to access the token.
* You must have an Enterprise billing plan.


## Authentication

Airtable's API uses token-based authentication, it allows you to authenticate API requests by inputting your access tokens into the HTTP authorization bearer token header. You need to create a `Personal Access token` that will be used to authenticate API requests.

Complete the following steps to create service account credentials:
1. Go to the [Airtable application](https://airtable.com/) and navigate to **Create Token**.
2. Click the **Create new token** button to create a new personal access token.
3. Give your token a unique name. This name will be visible in the record revision history.
4. Choose the scope **enterprise.auditLogs:read** to grant your token. This controls what API endpoints the token will be able to use.
5. Click **add a base** to grant the token access to a base or workspace.
6. You can grant access to any number and combination of **bases** and **workspaces** associated with your account. Ensure that the token can only read and write data within the bases and workspaces that have been assigned to it.


## States

An Airtable Source lets you pull audit logs from the Airtable app. When you create an Airtable Source, it goes through the following states:
1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source is successfully authenticated with the Airtable app.
1. **Collecting**. The Source is actively collecting data from the Airtable app.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.
On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events.md) to investigate issues with collection.<br/>![Azure Event Hubs error.png](/img/send-data/Azure-Event-Hubs-error.png)

Hover your mouse over the status icon to view a tooltip with a count of the detected errors and warnings. You can click on the status icon to open a Health Events panel with details on each detected issue.<br/>![health error generic.png](/img/send-data/azure_health_error_generic.png)


## Setup and Configuration

In this configuration, you will set up an Airtable source account with your Enterprise account and configure it to be authorized and authenticated to use audit logs from Airtable API.

To configure an Airtable Source:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.
1. On the Collection page, click **Add Source** next to a **Hosted Collector**.
1. Search for and select **Airtable**.<br/><img src={useBaseUrl('img/send-data/airtable-icon.png')} alt="airtable-icon.png" width="150" />
1. Enter a **Name** for the Source. The description is optional.<br/><img src={useBaseUrl('img/send-data/airtable-config-main.png')} alt="airtable-config-main.png" width="500" />
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM Enterprise](/docs/cse)
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
    * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a checkmark is shown when the field exists in the Fields table schema.
    * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.  
1. In **Account ID**, enter an account ID that will be a unique identifier for your enterprise account.
1. In **Personal Access Token**, enter the access token that you have generated in the [authentication](#authentication) section.
1. When you are finished configuring the Source, click **Save**.


## Error Types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third-party service APIs. | No | Not applicable | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | No | Not applicable | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}

## JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| `config` | JSON Object  | Yes | Contains the [configuration-parameters](#config-parameters) of the Source. |
| `schemaRef` | JSON Object  | Yes | Use `{"type":"Airtable"}` for Airtable Source. | not modifiable |
| `sourceType` | String | Yes | Use `Universal` for Airtable Source. | not modifiable |


### Config Parameters

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| `name` | String | Yes | Type the desired name of the Source and it must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`.  | modifiable |
| `description` | String  | No | Type the description of the Source. | modifiable |
| `category` | String | No | Type the category of the source. This value is assigned to the metadata field `_sourceCategory`. | modifiable |
| `fields` | JSON Object | No | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `accountId` | String | Yes | Account ID is a unique identifier for your Enterprise Account. | modifiable |
| `personalAccessTokens` | String | Yes | Used to authenticate API requests. | modifiable |

Airtable Source JSON example:

```json
{
    "api.version": "v1",
    "source": {
      "config": {
        "name": "airtable",
        "accountId": "accountid",
        "personalAccessToken": "*********",
        "fields": {
          "_siemForward": true
        }
      },
      "schemaRef": {
        "type": "Airtable"
      },
      "sourceType": "Universal"
    }
}
```


## Limitations

We are using `Personal Access Token` authentication in the integration, which is currently in public beta version. For more information, refer to the [Airtable Notification](https://airtable.com/developers/web/api/authentication#types-of-token).


## Assumptions

* Size of the single audit log will be less than 64 KB.
* Data URLs will expire after 7 days. If URLs are not processed within 7 days, the integration will create a new request which may cause data duplication.
