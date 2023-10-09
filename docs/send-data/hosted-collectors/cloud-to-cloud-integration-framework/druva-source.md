---
id: druva-source
title: Druva Source
sidebar_label: Druva
description: Learn how to configure the Druva Cloud-to-Cloud source setup in your Sumo Logic environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/druva-logo.svg')} alt="thumbnail icon" width="85"/>

The Druva source provides the ability to analyze and fetch event logs from the **Druva inSync** API and sends it to Sumo Logic. The **Druva inSync** backs up endpoint data and cloud applications, such as Microsoft Office 365 and Salesforce. It also provides archiving, data compliance monitoring, legal hold management, monitoring, and detection tools to discover ransomware and eDiscovery.

This integration accesses the Druva inSync API to retrieve audit events. API documents can be found
[here](https://developer.druva.com/docs/event-apis).

## Data Sources

The Druva Source consumes event logs from the [Data Governance Cloud](https://developer.druva.com/reference/get_eventmanagement-v2-events) or [Data Governance GovCloud](https://developer.druva.com/reference/get_eventmanagement-v2-events-1) and sends it to Sumo Logic.

## Metadata Fields

Metadata fields will be set, if the integration is configured with the SIEM forward option. See **Metadata Fields** table below:

| Field Name | Value |
| :--- | :--- |
| _siemparser | /Parsers/System/Druva/Druva inSync Cloud |

## Setup and Configuration

In this configuration, you will set up the Druva account and configure it to be authorized and authenticated to use event logs from Druva inSync API. To enable export events and to obtain auth token, follow the directions below within your Druva environment.

### Configure Druva inSync to export events

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

### Authentication

Druva supports OAuth 2.0-based authentication for incoming requests. Every use of Druva APIs requires authentication to ensure that only authorized users can interact with Druva APIs.

All requests to Druva APIs are authenticated using OAuth 2.0 access tokens which you receive in exchange of every authorization grant request you make. The OAuth token will expire after 30 minutes for [Data Governance Cloud](https://apis.druva.com/) and 15 minutes for [Data Governance GovCloud](https://govcloudapis.druva.com/).

The Druva Source requires you to provide a **Client ID**, **Client Secret Key**, **Base URL**. To get these, follow the instructions from [Create and Manage Druva API Credentials](https://docs.druva.com/Druva_Cloud_Platform/Integration_with_Druva_APIs/Create_and_Manage_API_Credentials).

## States

A Druva Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

A Druva Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source is successfully authenticated with Druva.
1. **Collecting**. The Source is actively collecting data from Druva.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events.md) to investigate issues with collection. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

## Setup and configuration Source

When you create a Druva Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Druva Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Select **Druva** icon.  <br/>  <img src={useBaseUrl('img/send-data/druva-icon.png')} alt="druva-icon.png" width="120" />
1. Enter a **Name** to display for the Source in the Sumo Logic web application. The description is optional. <br/>   <img src={useBaseUrl('img/send-data/druva-config.png')} alt="druva-config.png" width="400" />
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Base URL**. Choose the base url from the drop-down menu as per your requirements — [Data Governance Cloud](https://apis.druva.com) and [Data GovernanceGov Cloud](https://govcloudapis.druva.com).<br/><img src={useBaseUrl('/img/send-data/druva-base-url.png')} alt="druva-base-url.png" width="400"/>
1. **Client ID**. Enter your Client ID. To get Client ID, follow the instructions from [Create and Manage Druva API Credentials](https://docs.druva.com/Druva_Cloud_Platform/Integration_with_Druva_APIs/Create_and_Manage_API_Credentials).
1. **Secret Key**. Enter your Secret Key. To get Secret Key, follow the instructions from [Create and Manage Druva API Credentials](https://docs.druva.com/Druva_Cloud_Platform/Integration_with_Druva_APIs/Create_and_Manage_API_Credentials).
1. When you are finished configuring the Source, click **Save**.

## Error types

When Sumo Logic detects an issue, it is tracked by Health Events. The following table shows three possible error types. It tells the reason for the error, if the source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable                                                    | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third-party service APIs.                                     | Yes                                                   | The Source will retry indefinitely.                               | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs.                                     | Yes                                                   | The Source will retry indefinitely.                   | FirstPartyGenericError |

## JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [How to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| `config` | JSON Object  | Yes | Contains the [configuration-parameters](#config-parameters) of the Source. | na |
| `schemaRef` | JSON Object  | Yes | Use `{"type":"Druva"}` for Druva Source. | not modifiable |
| `sourceType` | String | Yes | Use `Universal` for Druva Source. | not modifiable |

### Config Parameters

| Parameter | Type | Required | Description | Access |
|:---|:---|:---|:---|:---|
| `name` | String | Yes | Type the desired name of the Source and it must be unique per Collector. This value is assigned to the `metadata field _source`.  | modifiable |
| `description` | String  | No | Type the description of the Source. | modifiable |
| `category` | String | No | Type the category of the source. This value is assigned to the metadata field `_sourceCategory`. | modifiable |
| `fields` | JSON Object | No | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `baseURL` | String | Yes | The base URL from which the customer wants to retrieve event data. | modifiable |
| `clientID` | String | Yes | Client ID key of an application. | modifiable |
| `secretKey` | String | Secret key of an application | modifiable |

### JSON Example

```json
{
    "api.version": "v1",
    "source": {
        "config": {
            "name": "Druva",
            "description": "test_description",
            "category": "source_category",
            "baseURL": "https://apis.druva.com",
            "clientID": "testclientid",
            "secretKey": "*********",
            "fields":{
                "_siemForward":false
            }
        },
        "schemaRef": {
            "type": "Druva"
        },
        "sourceType": "Universal"
    }
}
```
