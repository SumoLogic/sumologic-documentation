---
id: druva-source
title: Druva Source
sidebar_label: Druva
tags:
  - cloud-to-cloud
  - druva
description: Learn how to configure the Druva Cloud-to-Cloud source setup in your Sumo Logic environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/druva-logo.svg')} alt="thumbnail icon" width="85"/>

The Druva source provides the ability to analyze and fetch event logs from the **Druva inSync** API and sends it to Sumo Logic. The **Druva inSync** backs up endpoint data and cloud applications, such as Microsoft Office 365 and Salesforce. It also provides archiving, data compliance monitoring, legal hold management, monitoring, and detection tools to discover ransomware and eDiscovery.

This integration accesses the Druva inSync API to retrieve audit events. API documents can be found
[here](https://developer.druva.com/docs/event-apis).


## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Data Governance Cloud](https://developer.druva.com/reference/get_eventmanagement-v2-events) |
| 5 min |  [Data Governance GovCloud](https://developer.druva.com/reference/get_eventmanagement-v2-events-1) |

## Setup

### Vendor configuration

In this configuration, you will set up the Druva account and configure it to be authorized and authenticated to use event logs from Druva inSync API. To enable export events and to obtain auth token, follow the directions below within your Druva environment.

#### Configure Druva inSync to export events

:::note
You must be a Druva inSync Cloud administrator to enable the option to export events and define the Events API settings.
:::

To get the event logs, follow the steps to enable the **Export Events**:
1. Sign in to the Druva inSync Management Console with [inSync Cloud](https://login.druva.com/) account or [inSync GovCloud](https://loginfederal.druva.com/) account.
2. On the [inSync Management Console](https://docs.druva.com/Endpoints/030_Set_up_inSync_for_Endpoints/010_Initial_Configuration/010_Sign_in_to_inSync_Management_Console/Sign_in_to_inSync_Management_Console) menu bar, click <img src={useBaseUrl('/img/send-data/druva-wheel-icon.png')} alt="druva-wheel-icon.png" width="20"/> icon > **Settings**. The Settings page appears.
3. Click the **inSync APIs** tab.
4. In the Events API settings area, click **Edit**. The Edit Events API Settings window appears.<br/><img src={useBaseUrl('/img/send-data/druva-events-api-settings.png')} alt="druva-events-api-settings.png" width="450"/>
5. Select the **Export Events** checkbox.
6. Click in the **Categories to export** box and select the events that you want to export from inSync.
7. In the **Syslog facility** field, type a value between 1 and 23 to assign a Syslog facility ID for inSync events. The default value is 23.
8. Click **Save**.

#### Authentication

Druva supports OAuth 2.0-based authentication for incoming requests. Every use of Druva APIs requires authentication to ensure that only authorized users can interact with Druva APIs.

All requests to Druva APIs are authenticated using OAuth 2.0 access tokens which you receive in exchange of every authorization grant request you make. The OAuth token will expire after 30 minutes for [Data Governance Cloud](https://apis.druva.com/) and 15 minutes for [Data Governance GovCloud](https://govcloudapis.druva.com/).

The Druva Source requires you to provide a **Client ID**, **Client Secret Key**, **API Endpoint URL**. To get these, follow the instructions from [Create and Manage Druva API Credentials](https://docs.druva.com/Druva_Cloud_Platform/Integration_with_Druva_APIs/Create_and_Manage_API_Credentials).

### Source configuration

When you create a Druva Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Druva Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Druva** icon.
1. Enter a **Name** to display for the Source in the Sumo Logic web application. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **API Endpoint URL**. Enter your API Endpoint URL. To get API Endpoint URL, follow the instructions from [Create and Manage Druva API Credentials](https://developer.druva.com/docs/migration-process).
1. **Client ID**. Enter your Client ID. To get Client ID, follow the instructions from [Create and Manage Druva API Credentials](https://docs.druva.com/Druva_Cloud_Platform/Integration_with_Druva_APIs/Create_and_Manage_API_Credentials).
1. **Secret Key**. Enter your Secret Key. To get Secret Key, follow the instructions from [Create and Manage Druva API Credentials](https://docs.druva.com/Druva_Cloud_Platform/Integration_with_Druva_APIs/Create_and_Manage_API_Credentials).
1. When you are finished configuring the Source, click **Save**.

## Metadata Fields

If the Source is configured with the **SIEM forward** option, then the metadata field `_siemparser` will be set to */Parsers/System/Druva/Druva inSync Cloud*.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [How to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Druva"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| baseURL | String | Yes | `null` | The base URL from which the customer wants to retrieve event data. | |
| clientID | String | Yes | `null` | Client ID key of an application. |  |
| secretKey | String | Yes| `null` | Secret key of an application |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/druva/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/druva/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
