---
id: c2c-source
title: C2C Source Template
description: Template for Hosted Collector > Cloud-to-Cloud source docs.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<head>
  <meta name="robots" content="noindex" />
</head>

{{source icon}}

The {{source name}} collects {{data types}} from {{source of origin}}. 

{{what the app does}}

## Data Sources

{{source name}} ingests security events from [EventsFeed API](https://support.catonetworks.com/hc/en-us/articles/360019839477-Cato-API-EventsFeed-Large-Scale-Event-Monitoring) and audit events from [AuditFeed API](https://support.catonetworks.com/hc/en-us/articles/360017900857-Cato-API-AuditFeed).

## Prerequisites

{{if any}}

## States

Sumo Logic Cloud-to-Cloud (C2C) Sources track errors and report health and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

C2C Sources go through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Microsoft.
1. **Collecting**. The Source is actively collecting data from Microsoft.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

### Health Events

To view Health Events and Status for your Source, go to **Manage** > **Collection**> **Collection**. Under the Health column, you can click an **Error** status to open the  Health Events and investigate issues that may have occurred during collection.

![hover-c2c-error.png](/img/send-data/hover-c2c-error.png)

After you click on **Error**, you should see a **Health Events** popup modal containing all detected errors and warnings. Next, click the three-dot icon > **View Details** to open a Health Events panel with details on each detected issue.


#### Set up a Service Application

The Source requires the creation and registration of a service application within the [Azure Active Directory portal](https://aad.portal.azure.com/).

The user creating the service application does not need to be an administrator. However, an administrator is needed to grant the application the appropriate permissions to the Activity Reports API.

Use the following steps to create a service application:

1. Log in to the [Azure Active Directory Portal](https://aad.portal.azure.com/).
1. Then select **Azure Active Directory** in the left menu.

    ![Azure AD step 2.png](/img/send-data/Azure-AD-step-2.png)

1. Then select **App Registrations**.

    ![Azure AD step 3 red box.png](/img/send-data/Azure-AD-step-3-red-box.png)

1. Then select **New Registration**. Go through the registration process, providing a name for the application. Selecting **Accounts in this organizational directory only** is sufficient.

    ![Azure new registration in step 4.png](/img/send-data/Azure-new-registration-in-step-4.png)

1. After the Application is registered (created), be sure to copy the **Application (client) ID** and the **Directory (tenant) ID**. These are used later as configuration parameters in Sumo Logic when creating the Microsoft Graph Azure AD Reporting Source.

    ![Azure created app in step 5.png](/img/send-data/Azure-created-app-in-step-5.png)

1. Within the Application configuration page, select **Certificates and Secrets** to create an Application Client Secret Key.

    ![Azure AD step 6.png](/img/send-data/Azure-AD-step-6.png)

1. Copy the **Client Secret Value** (pictured below). It's needed later in Sumo Logic when creating the Microsoft Graph Azure AD Reporting Source.

    ![Azure AD step 7.png](/img/send-data/Azure-AD-step-7.png)

1. Request the appropriate permissions for the application. Click on **API Permissions**, then **Add a permission** and select **Microsoft Graph**. From there select (or search for) the following permissions. An Administrator must approve (grant) these permissions before the integration will function.

| **API**         | **Account Type**                       | **Permissions**                                                           |
|:-----------------|:----------------------------------------|:---------------------------------------------------------------------------|
| Directory Audit | Delegated (work or school account)     | AuditLog.Read.All and Directory.Read.All                                  |
| Directory Audit | Delegated (personal Microsoft account) | Not supported.                                                            |
| Directory Audit | Application                            | AuditLog.Read.All and Directory.Read.All                                  |
| Sign-in         | Delegated (work or school account)     | AuditLog.Read.All and Directory.Read.All                                  |
| Sign-in         | Delegated (personal Microsoft account) | Not supported.                                                            |
| Sign-in         | Application                            | AuditLog.Read.All and Directory.Read.All and Policy.Read.ConditionalAccess|
| Provisioning    | Delegated (work or school account)     | AuditLog.Read.All and Directory.Read.All                                  |
| Provisioning    | Delegated (personal Microsoft account) | Not supported.                                                            |
| Provisioning    | Application                            | AuditLog.Read.All                                                         |


![azure ad step 8.png](/img/send-data/azure-ad-step-8.png)

## Create a Microsoft Graph Azure AD Reporting Source

When you create a Microsoft Graph Azure AD Reporting Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Create a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Microsoft Graph Azure AD Reporting Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **MS Graph Azure AD Reporting**.

    ![MS graph azure ad reporting icon.png](/img/send-data/MS-graph-azure-ad-reporting-icon.png)

1. Enter a **Name** to display for the Source in the Sumo web application. The description is optional.

    ![MS Azure Graph AD reporting.png](/img/send-data/MS-Azure-Graph-AD-reporting.png)

1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to Cloud SIEM Enterprise. When configured with the **Forward to SIEM** option the following metadata fields are set:

    * `_siemVendor`: Microsoft
    * `_siemProduct`: Graph AD Reporting API
    * `_siemFormat`: JSON
    * `_siemEventID`: The _siemEventId is set to the type of data ingested. Possible values are:
      * Directory audit: `directoryAudits-{{activityDisplayName}}`
      * Provisioning: `provisioning-{{provisioningAction}}`
      * Sign-in: `signin-{{status.errorCode}}`

1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.

   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped. 

1. Provide the **Directory (tenant) ID** and **Application (client) ID** you got after you registered (created) the Azure Application in step 5 of the setup section.

1. **Application Client Secret Value**. Provide the Application Client Secret Value you created in step 7 of the setup section.

1. **Supported APIs to collect**. Select one or more of the available APIs: **Directory Audit**, **Sign-in**, and **Provisioning**.

1. When you are finished configuring the Source, click **Submit**.

### Error types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | FirstPartyGenericError |

### Restarting your Source

<!--
Once we start using this template, we can delete /docs/reuse/restart-c2c-source and its corresponding reference, {@import ../../reuse/restart-c2c-source.md}
-->

If your Source encounters ThirdPartyConfig errors, you can restart it from either the Sumo Logic UI or Sumo Logic API.

#### UI

To restart your source in the Sumo Logic platform, follow the steps below:
1. Open the Collection page, and go to **Manage Data** > **Collection** > **Collection**.
2. Select the source and click the **information** icon on the right side of the row.
3. The API usage information popup is displayed. Click the **Restart Source** button on the bottom left.<br/> <img src="/img/send-data/restart-source-button.png" alt="restart-source-button" width="500" />
4. Click **Confirm** to send the restart request.<br/> <img src="/img/send-data/restart-source-confirm.png" alt="restart-source-confirm" width="500" />
5. The bottom left of the platform will provide a notification informing you the request was successful.<br/>   <img src="/img/send-data/restart-source-initiated.png" alt="restart-source-initiated" width="400" />


#### API

To restart your source using the Sumo Management API, follow the instructions below:
* Method: `POST`
* Example endpoint:
  ```
  https://api.sumologic.com/api/v1/collectors/{collector_id}/sources/{source_id}/action/restart
  ```

Sumo Logic endpoints like `api.sumologic.com` are different in deployments outside `us1`. For example, an API endpoint in Europe would begin `api.eu.sumologic.com`. A service endpoint in `us2` (Western U.S.) would begin `service.us2.sumologic.com`. For more information, see [Sumo Logic Endpoints](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security).


### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| config | JSON Object  | Yes | Contains the configuration parameters for the Source. |   |
| schemaRef | JSON Object  | Yes | Set to `{"type":"MS Graph Azure AD Reporting"}`. | not modifiable |
| sourceType | String | Yes | Set to `Universal`. | not modifiable |

The following table shows the **config** parameters for a Microsoft
Graph Azure AD Source.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the metadata field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM. | modifiable |
| `tenant_id` | String | Yes |  | Provide the Directory (tenant) ID you got after you registered (created) the Azure Application. | modifiable |
| `secret_key` | String | Yes |  | Provide the Application Client Secret Value you created in Azure. | modifiable |
| `application_id` | String | Yes |  | Provide the Application (client) ID you got after you registered (created) the Azure Application. | modifiable |
| `supported_apis` | Array of strings | Yes |  | Define one or more of the available APIs to collect: `Directory Audit`, `Sign-in`, and `Provisioning`. For example, for both you'd use: `["Directory Audit","Signin"]` | modifiable |

Microsoft Graph Azure AD Source JSON example:

```json
{
  "api.version":"v1",
  "source":{
    "config":{
      "name":"ms-azure-ad-reporting-test",
      "tenant_id":"c9b18390-9cd7-4f5f-bfa5-46a50fef83f9",
      "supported_apis":["Directory Audit","Signin","Provisioning"],
      "secret_key":"********",
      "fields":{
        "_siemForward":false
      },
      "application_id":"5a03f2a8-4de9-4243-9d27-32c8f3921466"
    },
    "schemaRef":{
      "type":"MS Graph Azure AD Reporting"
    },
    "sourceType":"Universal"
  }
}
```
