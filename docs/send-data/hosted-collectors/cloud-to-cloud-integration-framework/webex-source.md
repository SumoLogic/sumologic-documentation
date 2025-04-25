---
id: webex-source
title: Webex Source
sidebar_label: Webex
tags:
  - cloud-to-cloud
  - webex
description: Learn how to collect admin audit events using Webex API.
---
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/webex/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/webex/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/webex/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/webex-logo.png')} alt="webex-logo" width="120" />

Cisco Webex is a cloud-based video conferencing and collaboration product suite, which comprises software including Webex Meetings, Webex Teams, and Webex Devices. This Webex source collects admin audit events and webhooks (meetings, rooms, messages, and memberships) data and sends it to Sumo Logic.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Admin Audit Events](https://developer.webex.com/docs/api/v1/admin-audit-events/list-admin-audit-events) |
| 5 min |  [Webhooks](https://developer.webex.com/docs/webhooks) - Meeting, Rooms, Messages, and Memberships |

## Setup

### Vendor configuration

In this configuration, you will create a new [Webex Integration App](https://developer.webex.com/docs/integrations) in [Webex Develops Portal](https://developer.webex.com/) and generate a Client ID, Client Secret, and OAuth 2.0 authorization code.

#### Create a New Webex Integration app

A Webex Integration app with specific permissions is required for Sumo Logic to access Admin Audit Events from Webex. Follow the below instructions to create a new Webex Integration app.

1. Sign in to [Webex Developers Portal](https://developer.webex.com/) using your admin account.
1. Click on your profile in the top right corner, and select **My Webex Apps**. <br/><img src={useBaseUrl('img/send-data/my-webex-apps.png')} alt="my-webex-apps" style={{border: '1px solid gray'}} width="700" />
1. Click **Create a New App**. <br/><img src={useBaseUrl('img/send-data/create-a-new-app.png')} alt="create-a-new-app" style={{border: '1px solid gray'}} width="700" />
1. Select **Create an Integration** and add the integration information. <br/><img src={useBaseUrl('img/send-data/create-integration.png')} alt="create-integration" style={{border: '1px solid gray'}} width="700" />
    - **Integration name**. Name of the integration (example: Sumo-C2C).
    - **Icon**. Select an icon, either from default images or upload an image of your choice.
    - **App Hub Description**. Description of the app (example: This App will be used for Sumo Logic Integration to collect Admin Audit Events).
    - **Redirect URI(s)**. Required to use `https://localhost`.
    - **Scopes**. Check `audit:events_read` (only scope required for collecting admin audit events).
1. Now click **Add Integration** at the bottom of the page. <br/><img src={useBaseUrl('img/send-data/add-integration.png')} alt="add-integration" style={{border: '1px solid gray'}} width="400" />
1. Copy and save the **Client ID** and **Client Secret**.
1. Copy and save the **OAuth Authorization URL**. <br/><img src={useBaseUrl('img/send-data/oauth-authorization.png')} alt="oauth-authorization" style={{border: '1px solid gray'}} width="600" />

#### OAuth 2.0 Authorization Code

Follow the below instructions to generate OAuth 2.0 Authorization Code.

1. In a web browser, open a new tab and paste the OAuth Authorization URL that was copied from the earlier steps and click **Enter**.
1. It prompted, sign in to your admin Webex account.
1. Click **Accept**. <br/><img src={useBaseUrl('img/send-data/accept-page.png')} alt="accept-page" style={{border: '1px solid gray'}} width="400" />
1. Ignore the error message in the webpage.<br/><img src={useBaseUrl('img/send-data/code-url.png')} alt="code-url" style={{border: '1px solid gray'}} width="700" /><br/>
   Copy and save the code in the URL, as shown in the following example. 
   ```bash
   https://localhost/?code={{REDACTED_AUTHORIZATION_CODE}}&state=set_state_here
   ```

#### Organization ID

Follow the below instructions to colllect your Organization ID.

1. Sign in to [Webex Control Hub Portal](https://admin.webex.com/) using your admin account.
2. In the **Management** menu, select **Account**.
3. Navigate to the **Info** tab.
4. Copy and save the **Organization ID**. <br/><img src={useBaseUrl('img/send-data/organization-id.png')} alt="organization-id" style={{border: '1px solid gray'}} width="800" />

### Source configuration

When you create an Webex source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure an Webex source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Webex**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Client ID**. Enter the **Client ID** collected from the [new Webex Integration app](#create-a-new-webex-integration-app).
1. **Client Secret**. Enter the **Client Secret** collected from the [new Webex Integration app](#create-a-new-webex-integration-app).
1. **OAuth 2.0 Authorization Code**. Enter the **OAuth 2.0 Authorization Code** collected from the [URL](#oauth-20-authorization-code).
1. **Organization ID**. Enter the **Org ID** fcollected from the [Webex Control Hub PortalURL](#organization-id).
1. **Select Event Categories for Audit Logs**. You have the option to **Collect all events** or **Select events**, where you can specify the exact event categories you would like to collect from the admin audit logs. You can also select from the pre-defined list or type in event categories.
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Webex"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| clientId | String | Yes | `null` | Client ID of the Webex Integration created for Sumo Logic from the new Webex Integration app. |  |
| clientSecret | String | Yes | `null` | Client Secret of the Webex Integration created for Sumo Logic from the new Webex Integration app. |  |
| code | String | Yes | `null` | Code of the Webex Integration created for Sumo Logic. |  |
| orgId | String | Yes | `null` | Orgaization Id of the customers Webex account from where you want to collect the audit event from. |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/webex/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/webex/example.tf" target="_blank">Download example</a>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::