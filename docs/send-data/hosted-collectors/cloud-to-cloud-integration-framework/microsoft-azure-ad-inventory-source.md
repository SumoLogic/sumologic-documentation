---
id: microsoft-azure-ad-inventory-source
title: Microsoft Azure AD Inventory Source
sidebar_label: Microsoft Azure AD Inventory
keywords:
    - microsoft-azure-ad-inventory
    - cloud-SIEM-enterprise
description: The Microsoft Azure AD Inventory Source collects user and device data from the Microsoft Graph API Security endpoint.
---

import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/ad.png')} alt="thumbnail icon" width="55"/>

The Microsoft Azure AD Inventory Source collects user and device data from the [Microsoft Graph API](https://docs.microsoft.com/en-us/graph/overview) Security endpoint. It securely stores the required authentication, scheduling, and state tracking information.

If you want to explicitly allow the static IP addresses used for this Source on your firewall see our [table of static IP addresses by deployment](cloud-to-cloud-source-versions.md).

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 12 hours |  [Users](https://docs.microsoft.com/en-us/graph/api/user-list?view=graph-rest-1.0) |
| 12 hours |  [Devices](https://docs.microsoft.com/en-us/graph/api/resources/azure-ad-overview?view=graph-rest-1.0) |

## Setup

### Vendor configuration

The Source requires the creation and registration of a service application within the [Azure Active Directory portal](https://aad.portal.azure.com/).

The user creating the service application does not need to be an administrator. However, an administrator is needed to grant the application the appropriate permissions to the Users and Devices APIs.

Use the following steps to create a service application:

1. Sign in to the [Azure Active Directory Portal](https://aad.portal.azure.com/)
1. Then select **Azure Active Directory** in the left menu.
    ![Azure AD step 2.png](/img/send-data/Azure-AD-step-2.png)
1. Then select **App Registrations**.<br/>
    ![Azure AD step 3 red box.png](/img/send-data/Azure-AD-step-3-red-box.png)
1. Then select **New Registration**. Go through the registration process, providing a name for the application. Selecting **Accounts in this organizational directory only** is sufficient.
    ![Azure new registration in step 4.png](/img/send-data/Azure-new-registration-in-step-4.png)
1. After the Application is registered (created), be sure to copy the **Application (client) ID** and the **Directory (tenant) ID**. These are used later as configuration parameters in Sumo Logic when creating the Microsoft Azure AD Inventory Source.
    ![Azure created app in step 5.png](/img/send-data/Azure-created-app-in-step-5.png)
1. Within the Application configuration page, select **Certificates and Secrets** to create an Application Client Secret Key.
    ![Azure AD step 6.png](/img/send-data/Azure-AD-step-6.png)
1. Copy the **Client Secret Value** (pictured below). It's needed later in Sumo Logic when creating the Microsoft Azure AD Inventory Source.
    ![Azure AD step 7.png](/img/send-data/Azure-AD-step-7.png)
1. Request the appropriate permissions for the application. Click on **API Permissions**, then **Add a permission** and select **Microsoft Graph**.

From there, select (or search for) the following permissions under type **Application permissions**. An Administrator must approve (grant) these permissions before the integration will function.

| API | Account Type| Permissions |
|:---------|:---------------------------------------------------|:------------------------------------|
| User    | Application (work or school account) | User.Read.All, Directory.Read.All   |
| Devices | Application (work or school account) | Device.Read.All, Directory.Read.All |

You require additional permission to collect `signInActivityData` for User.

| API | Account Type | Permissions |
|:---------|:---------------------------------------------------|:------------------------------------|
| Directory Audit | Application (work or school account) | AuditLog.Read.All |

Personal Microsoft accounts are not supported.

![azure ad step 8.png](/img/send-data/azure-ad-step-8.png)

### Source configuration

When you create a Microsoft Azure AD Inventory Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Microsoft Azure AD Inventory Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Microsoft Azure AD Inventory**.
1. Enter a **Name** to display for the Source in the Sumo web application. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. Provide the **Directory (tenant) ID** and **Application (client) ID** you got after you registered (created) the Azure Application in step 5 of the setup section.
1. **Application Client Secret Value**. Provide the Application Client Secret Value you created in step 7 of the setup section.
1. **Supported APIs to collect**. Select one or more of the available APIs: **Devices** and **Users**.
1. **Collect Users SignInActivity Data**. By enabling the checkbox, you can also include the sign in activity information in your user response. [Learn more](https://learn.microsoft.com/en-us/graph/api/user-list?view=graph-rest-1.0&tabs=http#example-10-get-users-including-their-last-sign-in-time).
   :::note
   To collect the `signInActivity` information you should have `Azure AD Premium P1/P2` license.
   :::
1. **Collect Users Group Details**. By enabling the checkbox, you can also include the user group information in your user response. [Learn more](https://learn.microsoft.com/en-us/graph/api/directoryobject-getmembergroups?view=graph-rest-1.0&tabs=http#http-request).
    :::note
    To know about the permissions required to collect user group details, refer to the [Microsoft documentation](https://learn.microsoft.com/en-us/graph/api/group-get?view=graph-rest-1.0&tabs=http#permissions).
    :::
1. **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Submit**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `Microsoft` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `Azure AD` | Set when **Forward To SIEM** is checked. |
| `_siemDataType` | `Inventory` | Set when **Forward To SIEM** is checked and specific to the API collected. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Microsoft Azure AD Inventory"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| tenant_id | String | Yes | `null` | Provide the Directory (tenant) ID you got after you registered (created) the Azure Application. |  |
| secret_key | String | Yes |`null`  | Provide the Application Client Secret Value you created in Azure. | |
| application_id | String | Yes | `null` | Provide the Application (client) ID you got after you registered (created) the Azure Application. |  |
| supported_apis | Array of strings | Yes | `null` | Define one or more of the available APIs to collect: Devices, and Users.| ["Devices","Users"] |
| userSignInActivity | Boolean | No | False | Select the checkbox to include the sign in activity information in your user response. |  |
| userGroupDetails | Boolean | No | False | Select the checkbox to include the user’s group details in your user response. |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/microsoft-azure-ad-inventory/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/microsoft-azure-ad-inventory/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
