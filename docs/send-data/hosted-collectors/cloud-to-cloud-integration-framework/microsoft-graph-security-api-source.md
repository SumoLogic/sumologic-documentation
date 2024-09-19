---
id: microsoft-graph-security-api-source
title: Microsoft Graph Security API Source
sidebar_label: Microsoft Graph Security API
tags:
  - cloud-to-cloud
  - microsoft-graph-security-api
description: The Microsoft Graph Security API Source provides a secure endpoint to receive alerts from the Microsoft Graph Security API endpoint.
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/microsoft-graph-security-api/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/microsoft-graph-security-api/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/microsoft-graph-security-api/example.tf';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/ms-graph.svg')} alt="icon" width="40"/>

The Microsoft Graph Security API Source provides a secure endpoint to receive alerts from the [Microsoft Graph](https://docs.microsoft.com/en-us/graph/overview) Security API endpoint. It securely stores the required authentication, scheduling, and state tracking information. One threat event is reported for each affected device.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Alerts](https://learn.microsoft.com/en-us/graph/api/security-list-alerts_v2?view=graph-rest-1.0&tabs=http) |

## Setup

### Vendor configuration

You need to create and register a service application within the [Azure Active Directory portal](https://aad.portal.azure.com/). The user creating the service application does not need to be an administrator, however, an administrator will be needed to grant the application the appropriate permissions to the Graph Security API.

The following steps show you how to create a service application:

1. Log into the [Azure Active Directory Portal](https://aad.portal.azure.com/)
1. Select **Azure Active Directory** in the left menu.
    <img src={useBaseUrl('/img/send-data/ms_graph_azure_portal.png')} alt="ms_graph_azure_portal" width="800" style={{border: '1px solid gray'}} />
1. Select **App Registrations**.<br/>
    <img src={useBaseUrl('/img/send-data/2a_ms_graph_app_registration.png')} alt="2a_ms_graph_app_registration" width="400" style={{border: '1px solid gray'}} />
1. Select **New Registration**. Go through the [registration process](https://docs.microsoft.com/en-us/graph/auth-register-app-v2), providing a name for the application. Selecting **Accounts in this organizational directory only** is sufficient.
    <img src={useBaseUrl('/img/send-data/ms_graph_new_registration.png')} alt="ms_graph_new_registration" width="800"style={{border: '1px solid gray'}} />
1. After the application is registered ensure you copy the **Application (client) ID** and **Directory (tenant) ID** displayed on the **Overview** page. These are needed when creating the Source in Sumo Logic.
    <img src={useBaseUrl('/img/send-data/3_ms_graph_app_settings.png')} alt="3_ms_graph_app_settings" width="800"style={{border: '1px solid gray'}} />
1. Within the application configuration page, select **Certificates and Secrets** and create an [Application Client Secret Key](https://docs.microsoft.com/en-us/graph/notifications-integration-app-registration#app-certificates-and-secrets).
    <img src={useBaseUrl('/img/send-data/4_ms_graph_app_client_secret.png')} alt="4_ms_graph_app_client_secret" width="800"style={{border: '1px solid gray'}} />
1. Copy the Client Secret value, you'll need it when creating the Source in Sumo Logic.
    <img src={useBaseUrl('/img/send-data/5_ms_graph_app_client_secret_created.png')} alt="5_ms_graph_app_client_secret_created" width="800"style={{border: '1px solid gray'}} />
1. Request the appropriate [permissions for the application](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-configure-app-access-web-apis#application-permission-to-microsoft-graph). Click on **API Permissions**, then **Add a permission** and select **Microsoft Graph**.
    You need to find and select the **SecurityAlert.Read.All**, **SecurityIncident.Read.All**, and **SecurityEvents.Read.All** permissions. See [this list](https://docs.microsoft.com/en-us/graph/permissions-reference#security-permissions) to view all available security permissions.
    :::note
    An Administrator must approve (grant) these permissions before the Source will function.
    :::
    <img src={useBaseUrl('/img/send-data/6_ms_graph_app_add_permissions.png')} alt="6_ms_graph_app_add_permissions" width="800"style={{border: '1px solid gray'}} />
1. Follow the steps below to enable the Application permission role.
   - In the Manage menu, select App roles.
   - Click the **Create app role** tab.
      - **Display name**. Enter the display name for the role.
      - **Allowed member types**. Select Applications as the allowed member type.
      - **Value**. Enter `SecurityAlert.Read.All` as the value.
      - **Description**. Enter a brief description.
      - Select the checkbox to enable the app role.
    - Click **Apply**.
    <img src={useBaseUrl('/img/send-data/7_ms_graph_app_add_role.png')} alt="7_ms_graph_app_add_role" width="800"style={{border: '1px solid gray'}} />

### Source configuration

When you create a Microsoft Graph Security API Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Microsoft Graph Security API Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.  
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Microsoft Graph Security API**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. Enter the **Directory (tenant) ID**, **Application (client) ID**, and **Application Client Secret Value** you got from the Application you created in the [Vendor configuration](#vendor-configuration) section.
1. The **Polling Interval** is set to 5 minutes by default. You can adjust it based on your needs.
1. **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Submit**.

#### Base URL

Internally, the source will use the following base URL depending on the respective cloud region:

| BASE_URL | Value |
| :--- | :--- |
| Azure Government | https://graph.microsoft.us |
| Azure Global Service | https://graph.microsoft.com |

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemForward` | <code>(true \| false)</code> | Set to `true` when **Forward To SIEM** is checked. |
| `_siemVendor` | `Microsoft` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `Graph Security API` | Set when **Forward To SIEM** is checked. |
| `_siemFormat` | `JSON` | Set when **Forward To SIEM** is checked. |
| `_siemEventID` | `{{category}}` | This field is dynamically set based on the value of the category key in the log. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Microsoft Graph Security API"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| tenant_id | String | Yes | `null` | The Directory (tenant) ID of the Azure AD application. |  |
| secret_key | Boolean | Yes | `null` | The Application Client Secret Key created with access to the Azure AD application. |  |
| application_id | String | Yes | `null` | The Application (client) ID of the Azure AD application.	 |
| azure_gov | Boolean | No | false | Set to true if Azure tenant uses Azure Government region. |  |
| polling_interval | Integer | Yes | 5 | This sets how many minutes the Source checks for new data. |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/microsoft-graph-security-api/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/microsoft-graph-security-api/example.tf" target="_blank">Download example</a>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::