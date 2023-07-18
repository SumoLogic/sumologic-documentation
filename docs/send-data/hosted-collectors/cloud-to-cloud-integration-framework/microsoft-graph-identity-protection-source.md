---
id: microsoft-graph-identity-protection-source
title: MS Graph Identity Protection Source
sidebar_label: MS Graph Identity Protection
description: The Microsoft Graph Identity Protection Source collects Risk Detection and Risky User from the Microsoft Graph Identity Protection API.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/ms-graph.svg')} alt="icon" width="50"/>

The [Microsoft Graph](https://docs.microsoft.com/en-us/graph/overview) Identity Protection Source collects [Risk Detection](https://docs.microsoft.com/en-us/graph/api/riskdetection-list?view=graph-rest-1.0) and [Risky User](https://docs.microsoft.com/en-us/graph/api/riskyuser-list?view=graph-rest-1.0) data from the Microsoft Graph [Identity Protection API](https://docs.microsoft.com/en-us/graph/api/resources/identityprotectionroot?view=graph-rest-1.0). It
securely stores the required authentication, scheduling, and state tracking information.

If you want to explicitly allow the static IP addresses used for this Source on your firewall see our [table of static IP addresses by deployment](cloud-to-cloud-source-versions.md).

#### States

A Microsoft Graph Identity Protection Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

A Microsoft Graph Identity Protection Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Microsoft.
1. **Collecting**. The Source is actively collecting data from Microsoft.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the Health and Status for Sources is displayed. Use Health Events to investigate issues with collection. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

![Azure AD Inventory error.png](/img/send-data/Azure-AD-Inventory-error.png)

Hover your mouse over the status icon to view a tooltip with a count of the detected errors and warnings.

![hover over health status icon.png](/img/send-data/hover-over-health-status-icon.png)

You can click on the status icon to open a Health Events panel with details on each detected issue.

## Set up a Service Application

The Source requires the creation and registration of a service application within the [Azure Active Directory portal](https://aad.portal.azure.com/).

The user creating the service application does not need to be an administrator. However, an administrator is needed to grant the application the appropriate permissions to the Identity and Access API.

Use the following steps to create a service application:

1. Log in to the [Azure Active Directory Portal](https://aad.portal.azure.com/)
1. Then select **Azure Active Directory** in the left menu.

    ![Azure AD step 2.png](/img/send-data/Azure-AD-step-2.png)

1. Then select **App Registrations**.

    ![Azure AD step 3 red box.png](/img/send-data/Azure-AD-step-3-red-box.png)

1. Then select **New Registration**. Go through the registration process, providing a name for the application. Selecting **Accounts in this organizational directory only** is sufficient.

    ![Azure new registration in step 4.png](/img/send-data/Azure-new-registration-in-step-4.png)

1. After the Application is registered (created), be sure to copy the **Application (client) ID** and the **Directory (tenant) ID**. These are used later as configuration parameters in Sumo Logic when creating the Microsoft Graph Identity Protection Source.

    ![Azure created app in step 5.png](/img/send-data/Azure-created-app-in-step-5.png)

1. Within the Application configuration page, select **Certificates and Secrets** to create an Application Client Secret Key.

    ![Azure AD step 6.png](/img/send-data/Azure-AD-step-6.png)

1. Copy the **Client Secret Value** (pictured below). It's needed later in Sumo Logic when creating the Microsoft Graph Identity Protection Source.

    ![Azure AD step 7.png](/img/send-data/Azure-AD-step-7.png)

1. Request the appropriate permissions for the application. Click on **API Permissions**, then **Add a permission** and select **Microsoft Graph**. From there select (or search for) the following permissions. An Administrator must approve (grant) these permissions before the integration will function.

| API |  Account Type |  Permissions |
|:----------------|:----------------------------------------|:----------------------------|
| Risk Detection | Delegated (work or school account)     | IdentityRiskEvent.Read.All |
| Risk Detection | Delegated (personal Microsoft account) | Not supported.             |
| Risk Detection | Application                            | IdentityRiskEvent.Read.All |
| Risky User     | Delegated (work or school account)     | IdentityRiskyUser.Read.All |
| Risky User     | Delegated (personal Microsoft account) | Not supported.             |
| Risky User     | Application                            | IdentityRiskyUser.Read.All |

![azure ad step 8.png](/img/send-data/azure-ad-step-8.png)

## Create a Microsoft Graph Identity Protection Source

When you create a Microsoft Graph Identity Protection Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Create a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Microsoft Graph Identity Protection Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 

1. On the Collectors page, click **Add Source** next to a Hosted Collector.

1. Select **Microsoft Graph Identity Protection Source**.

    ![MS Graph Identity Protection Icon.png](/img/send-data/MS-Graph-Identity-Protection-Icon.png)

1. Enter a **Name** to display for the Source in the Sumo web application. The description is optional.

    ![MS Graph Identity Proctection version 1 input.png](/img/send-data/MS-Graph-Identity-Proctection-version-1-input.png)

1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to Cloud SIEM Enterprise. When configured with the **Forward to SIEM** option the following metadata fields are set:

    * `_siemVendor`: Microsoft
    * `_siemProduct`: Graph Identity Protection API
    * `_siemFormat`: JSON
    * `_siemEventID`: The `_siemEventId` is set to the type of data ingested either `riskDetections` or `riskyUsers`.

1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.

   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped. 

1. Provide the **Directory (tenant) ID** and **Application (client) ID** you got after you registered (created) the Azure Application in step 5 of the setup section.

1. **Application Client Secret Value**. Provide the Application Client Secret Value you created in step 7 of the setup section.

1. **Supported APIs to collect**. Select one or more of the available APIs, **riskDetections** and **riskyUsers**.

1. When you are finished configuring the Source, click **Submit**.

### Error types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable                                                    | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs.                                     | Yes                                                   | The Source will retry for up to 90 minutes, after which it quits. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs.                                     | Yes                                                   | The Source will retry for up to 90 minutes, after which it quits. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}


### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| config | JSON Object  | Yes | Contains the configuration parameters for the Source. |                |
| schemaRef | JSON Object  | Yes | Set to `{"type":"MS Graph Identity Protection"}`. | not modifiable |
| sourceType        | String       | Yes               | Set to `Universal`. | not modifiable |

The following table shows the **config** parameters for a Microsoft
Graph Identity Protection Source.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the metadata field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM. | modifiable |
| `tenant_id` | String | Yes |  | Provide the Directory (tenant) ID you got after you registered (created) the Azure Application. | modifiable |
| `secret_key` | String | Yes |  | Provide the Application Client Secret Value you created in Azure. | modifiable
| `application_id` | String | Yes |  | Provide the Application (client) ID you got after you registered (created) the Azure Application. | modifiable |
| `supported_apis` | Array of strings | Yes |  | Define one or more of the available APIs to collect: Devices, and Users. For example, for both you'd use: ["Devices","Users"] | modifiable |  

Microsoft Graph Identity Protection Source JSON example:

```json
{
    "api.version": "v1",
    "source": {
        "schemaRef": {
            "type": "MS Graph Identity Protection"
        },
        "config": {
            "name": "MS Graph Identity",
            "tenant_id": "TenantID",
            "supported_apis": ["RiskyUsers", "RiskDetections"],
            "secret_key": "********",
            "application_id": "ApplicationID",
            "fields": {
                "_siemForward": false
            }
        },
        "sourceType": "Universal"
    }
}
```
