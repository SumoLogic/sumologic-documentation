---
id: microsoft-graph-security-api-source
title: Microsoft Graph Security API Source
sidebar_label: Microsoft Graph Security API
description: The Microsoft Graph Security API Source provides a secure endpoint to receive alerts from the Microsoft Graph Security API endpoint.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/ms-graph.svg')} alt="icon" width="50"/>

The Microsoft Graph Security API Source provides a secure endpoint to receive alerts from the [Microsoft Graph](https://docs.microsoft.com/en-us/graph/overview) Security API endpoint. It securely stores the required authentication, scheduling, and state tracking information. One threat event is reported for each
affected device.

## Collected data

The Microsoft Graph Security API Source consumes [alerts](https://learn.microsoft.com/en-us/graph/api/resources/security-alert?view=graph-rest-1.0) from the Microsoft Graph [Security API Endpoint](https://learn.microsoft.com/en-us/graph/api/security-list-alerts_v2?view=graph-rest-1.0).

## States

A Microsoft Graph Security API Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

A Microsoft Graph Security API Source goes through the following states
when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Microsoft.
1. **Collecting**. The Source is actively collecting data from Microsoft.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the Health and Status for Sources is displayed. Use Health Events to investigate issues with collection. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

![Cylance-error](/img/send-data/Cylance-error.png)

Hover your mouse over the status icon to view a tooltip with details on the detected issue.

![health error generic.png](/img/send-data/health-error-generic.png)

### Prerequisite

You need to create and register a service application within the [Azure Active Directory portal](https://aad.portal.azure.com/). The user creating the service application does not need to be an administrator, however, an administrator will be needed to grant the application the appropriate permissions to the Graph Security API.

The following steps show you how to create a service application:

1. Log into the [Azure Active Directory Portal](https://aad.portal.azure.com/)

1. Select **Azure Active Directory** in the left menu.

    <img src={useBaseUrl('/img/send-data/ms_graph_azure_portal.png')} alt="ms_graph_azure_portal" width="800" style={{border: '1px solid black'}} />

1. Select **App Registrations**.

    <img src={useBaseUrl('/img/send-data/2a_ms_graph_app_registration.png')} alt="2a_ms_graph_app_registration" width="400" style={{border: '1px solid black'}} />

1. Select **New Registration**. Go through the [registration process](https://docs.microsoft.com/en-us/graph/auth-register-app-v2), providing a name for the application. Selecting **Accounts in this organizational directory only** is sufficient.

    <img src={useBaseUrl('/img/send-data/ms_graph_new_registration.png')} alt="ms_graph_new_registration" width="800"style={{border: '1px solid black'}} />

1. After the application is registered ensure you copy the **Application (client) ID** and **Directory (tenant) ID** displayed on the **Overview** page. These are needed when creating the Source in Sumo Logic.

    <img src={useBaseUrl('/img/send-data/3_ms_graph_app_settings.png')} alt="3_ms_graph_app_settings" width="800"style={{border: '1px solid black'}} />

1. Within the application configuration page, select **Certificates and Secrets** and create an [Application Client Secret Key](https://docs.microsoft.com/en-us/graph/notifications-integration-app-registration#app-certificates-and-secrets).

    <img src={useBaseUrl('/img/send-data/4_ms_graph_app_client_secret.png')} alt="4_ms_graph_app_client_secret" width="800"style={{border: '1px solid black'}} />

1. Copy the Client Secret value, you'll need it when creating the Source in Sumo Logic.

    <img src={useBaseUrl('/img/send-data/5_ms_graph_app_client_secret_created.png')} alt="5_ms_graph_app_client_secret_created" width="800"style={{border: '1px solid black'}} />

1. Request the appropriate [permissions for the application](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-configure-app-access-web-apis#application-permission-to-microsoft-graph). Click on **API Permissions**, then **Add a permission** and select **Microsoft Graph**.

    You need to find and select the **SecurityAlert.Read.All**, **SecurityIncident.Read.All**, and **SecurityEvents.Read.All** permissions. See [this list](https://docs.microsoft.com/en-us/graph/permissions-reference#security-permissions) to view all available security permissions.

    :::note
    An Administrator must approve (grant) these permissions before the Source will function.
    :::

    <img src={useBaseUrl('/img/send-data/6_ms_graph_app_add_permissions.png')} alt="6_ms_graph_app_add_permissions" width="800"style={{border: '1px solid black'}} />

1. Follow the steps below to enable the Application permission role.
   - In the Manage menu, select App roles.
   - Click the **Create app role** tab.
      - **Display name**. Enter the display name for the role.
      - **Allowed member types**. Select Applications as the allowed member type.
      - **Value**. Enter `SecurityEvents.Read.All` as the value.
      - **Description**. Enter a brief description.
      - Select the checkbox to enable the app role.
    - Click **Apply**.

    <img src={useBaseUrl('/img/send-data/7_ms_graph_app_add_role.png')} alt="7_ms_graph_app_add_role" width="800"style={{border: '1px solid black'}} />
### Create a Microsoft Graph Security API Source

When you create a Microsoft Graph Security API Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Microsoft Graph Security API Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 

1. On the Collectors page, click **Add Source** next to a Hosted Collector.

1. Select **Microsoft Graph Security API**.

    ![Mircrosoft Graph API icon.png](/img/send-data/Mircrosoft-Graph-API-icon.png)

1. Enter a **Name** for the Source. The description is optional.

    <img src={useBaseUrl('/img/send-data/Microsoft-Graph-Security-API-Source-input.png')} alt="Microsoft-Graph-Security-API-Source-input" width="400" style={{border: '1px solid black'}} />

1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.

1. **Forward to SIEM**. Check the checkbox to forward your data to Cloud SIEM Enterprise. When configured with the **Forward to SIEM** option the following metadata fields are set:

   | Field Name | Value   |
   | :-- | :-- |
   | _siemForward  | true |  
   | _siemVendor  | Microsoft  |
   | _siemProduct | Graph Security API |  
   | _siemFormat	| JSON |
   | _siemEventID| 	This field is dynamically set based on the value of the category key in the log. <br/> `{{category}}` |

1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.

   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.

1. Enter the **Directory (tenant) ID**, **Application (client) ID**, and **Application Client Secret Value** you got from the Application you created in the [prerequisite](#prerequisite) step.

1. The **Polling Interval** is set to 5 minutes by default. You can adjust it based on your needs.

1. **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).

1. When you are finished configuring the Source, click **Submit**.

### Error types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
| :-- | :-- | :-- |
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}

### Base URL

Internally, the source will use the following base URL depending on the respective cloud region:

| BASE_URL | Value |
| :--- | :--- |
| Azure Government | https://graph.microsoft.us |
| Azure Global Service | https://graph.microsoft.com |

### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| config | JSON Object | Yes | Contains the configuration parameters for the Source. |                                        |
| schemaRef | JSON Object | Yes | Use `{"type":"Microsoft Graph Security API"}` for a Microsoft Graph Security API Source. | not modifiable |
| sourceType | String | Yes | Use `Universal` for a Microsoft Graph Security API Source. | not modifiable |

The following table shows the **config** parameters for a Microsoft Graph Security API Source.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the metadata field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable | 
| `tenant_id` | String | Yes |  | The Directory (tenant) ID of the Azure AD application. | modifiable |
| `secret_key` | Boolean | Yes |  | The Application Client Secret Key created with access to the Azure AD application. | modifiable |
| `application_id` | String | Yes |  | The Application (client) ID of the Azure AD application.	modifiable |
| `azure_gov` | Boolean | No | false | Set to true if Azure tenant uses Azure Government region. | modifiable |
| `polling_interval` | Integer | Yes | 5 | This sets how many minutes the Source checks for new data. | modifiable |

Microsoft Graph Security API Source JSON example:

```json
{
  "api.version":"v1",
  "source":{
    "schemaRef":{
      "type":"Microsoft Graph Security API"
    },
    "state":{
      "state":"Authenticated"
    },
    "config":{
      "name":"Graph Security",
      "tenant_id":"********",
      "polling_interval":5,
      "secret_key":"********",
      "fields":{
        "_siemForward":false
      },
      "category":"graph-api",
      "application_id":"********"
    },
    "sourceType":"Universal"
  }
}
```
