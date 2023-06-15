---
id: webex-source
title: Webex Source
sidebar_label: Webex
description: Learn how to collect admin audit events using Webex API.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/webex-logo.png')} alt="webex-logo" width="120" />

Cisco Webex is a cloud-based video conferencing and collaboration product suite which comprises software including Webex Meetings, Webex Teams, and Webex Devices. This Webex source collects admin audit events and webhooks (Meeting, rooms, messages, and memberships) data and sends it to Sumo Logic.

## Data Source

- [Admin Audit Events](https://developer.webex.com/docs/api/v1/admin-audit-events/list-admin-audit-events)
- [Webhooks](https://developer.webex.com/docs/webhooks)
  - Meeting
  - Rooms
  - Messages
  - Memberships

## Set up and Configuration

In this configuration, you will create a new [Webex Integration App](https://developer.webex.com/docs/integrations) in [Webex Develops Portal](https://developer.webex.com/) and generate a Client ID, Client Secret, and generate an Oauth 2.0 authorization code. To obtain these, follow the steps below:

### Create a New Webex Integration app

A Webex Integration app with specific permissions is required for Sumo Logic to access Admin Audit Events from Webex. Follow the below instructions to create a new Webex Integration app.

1. Sign in to [Webex Developers Portal](https://developer.webex.com/) using your admin account.
1. Click on your profile in the top right corner, and select **My Webex Apps**. <br/><img src={useBaseUrl('img/send-data/my-webex-apps.png')} alt="my-webex-apps" style={{border: '1px solid black'}} width="700" />
1. Click **Create a New App**. <br/><img src={useBaseUrl('img/send-data/create-a-new-app.png')} alt="create-a-new-app" style={{border: '1px solid black'}} width="700" />
1. Select **Create an Integration** and add the intergration information. <br/><img src={useBaseUrl('img/send-data/create-integration.png')} alt="create-integration" style={{border: '1px solid black'}} width="700" />
    - **Integration name**. Name of the integration (example: Sumo-C2C).
    - **Icon**. Select an icon, either from default images or upload an image of your choice.
    - **App Hub Description**. Description of the app (example: This App will be used for Sumo Logic Integration to collect Admin Audit Events).
    - **Redirect URI(s)**. Required to use `https://localhost`.
    - **Scopes**. Check `audit:events_read` (only scope required for collecting admin audit events).
1. Now click **Add Integration** at the bottom of the page. <br/><img src={useBaseUrl('img/send-data/add-integration.png')} alt="add-integration" style={{border: '1px solid black'}} width="400" />
1. Copy and save the **Client ID** and **Client Secret**.
1. Copy and save the **OAuth Authorization URL**. <br/><img src={useBaseUrl('img/send-data/oauth-authorization.png')} alt="oauth-authorization" style={{border: '1px solid black'}} width="600" />

### Oauth 2.0 Authorization Code

Follow the below instructions to generate Oauth 2.0 Authorization Code.

1. In a web browser, open a new tab and paste the OAuth Authorization URL that was copied from the earlier steps and click **Enter**.
1. It prompted, sign in to your admin Webex account.
1. Click **Accept**. <br/><img src={useBaseUrl('img/send-data/accept-page.png')} alt="accept-page" style={{border: '1px solid black'}} width="400" />
1. Ignore the error message in the webpage. Copy and save the code in the URL, as shown in the following example. <br/><img src={useBaseUrl('img/send-data/code-url.png')} alt="code-url" style={{border: '1px solid black'}} width="700" />

```
https://localhost/?code={{REDACTED_AUTHORIZATION_CODE}}&state=set_state_here
```

### Organization ID

Follow the below instructions to colllect your Organization ID.

1. Sign in to [Webex Control Hub Portal](https://admin.webex.com/) using your admin account.
2. In the **Management** menu, select **Account**.
3. Navigate to **Info** tab.
4. Copy and save the **Organization ID**. <br/><img src={useBaseUrl('img/send-data/organization-id.png')} alt="organization-id" style={{border: '1px solid black'}} width="800" />

## States

Webex Source is a device security platform that discover devices, tracks behavior, detects threats, and takes action to protect your business.
When you create an Webex Source, it goes through the following stages:
1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Webex.
1. **Collecting**. The Source is actively collecting data from Webex.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.
On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

## Create Webex Source

When you create an Webex source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure an Webex source:
1. In Sumo Logic, select **Manage Data > Collection > Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Webex**.<br/> <img src={useBaseUrl('img/send-data/webex-icon.png')} alt="webex-icon" style={{border: '1px solid black'}} width="140" />
1. Enter a **Name** for the Source. The description is optional. <br/><img src={useBaseUrl('img/send-data/webex-cofig-page.png')} alt="webex-config-main.png" style={{border: '1px solid black'}} width="400" />
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Client ID**. Enter the **Client ID** collected from the [new Webex Integration app](#create-a-new-webex-integration-app).
1. **Client Secret**. Enter the **Client Secret** collected from the [new Webex Integration app](#create-a-new-webex-integration-app).
1. **Oauth 2.0 Authorization Code**. Enter the **Oauth 2.0 Authorization Code** collected from the [URL](#oauth-20-authorization-code).
1. **Organization ID**. Enter the **Org ID** fcollected from the [Webex Control Hub PortalURL](#organization-id).
1. **Select Event Categories for Audit Logs**. You have the option to **Collect all events** or **Select events**, where you can specify the exact event categories you would like to collect from the admin audit logs. You can also select from the pre-defined list or type in event categories.
1. Click **Save**.

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
| `config` | JSON Object  | Yes | Contains the [configuration-parameters](#config-parameters) of the Source. | n/a |
| `schemaRef` | JSON Object  | Yes | Use `{"type":"Webex"}` for Webex Source. | not modifiable |
| `sourceType` | String | Yes | Use `Universal` for Webex Source. | not modifiable |

### Config Parameters

| Parameter | Type | Required | Description | Access |
|:---|:---|:---|:---|:---|
| `name` | String | Yes | Type the desired name of the Source and it must be unique per Collector. This value is assigned to the `metadata field _source`.  | modifiable |
| `description` | String  | No | Type the description of the Source. | modifiable |
| `category` | String | No | Type the category of the source. This value is assigned to the metadata field `_sourceCategory`. | modifiable |
| `fields` | JSON Object | No | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `clientId` | String | Yes | Client ID of the Webex Integration created for Sumo Logic from the new Webex Integration app. | modifiable |
| `clientSecret` | String | Yes | Client Secret of the Webex Integration created for Sumo Logic from the new Webex Integration app. | modifiable |
| `code` | String | Yes | Code of the Webex Integration created for Sumo Logic. | modifiable |
| `orgId` | String | Yes | Orgaization Id of the customers Webex account from where you want to collect the audit event from. | modifiable |

### JSON Example

```json
{
  "api.version":"v1",
  "source":{
    "config":{
      "name":"Webex- sandbox",
      "authorizationCode":"********",
      "clientId":"********",
      "collectAll":false,
      "orgId":"********",
      "eventCategories":["LOGINS","LOGOUT","ORG_SETTINGS"],
      "fields":{
        "_siemForward":false
      },
      "clientSecret":"********",
      "category":"sandbox/webex/audit"
    },
    "schemaRef":{
      "type":"Webex"
    },
    "state":{
      "state":"Pending"
    },
    "sourceType":"Universal"
  }
}
```

