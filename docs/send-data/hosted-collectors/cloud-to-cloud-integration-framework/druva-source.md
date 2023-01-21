---
id: druva-source
title: Druva Source
sidebar_label: Druva
description: This document explains how to configure the Druva Cloud-to-Cloud source setup on the Sumo logic environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Druva source provides the ability to analyze and fetch event logs from the **Druva inSync** API and send it to Sumo Logic. The **Druva inSync** backs up endpoint data and cloud applications, such as Microsoft Office 365 and Salesforce. It also provides archiving, data compliance monitoring, legal hold management, monitoring and detection tools to discover ransomware and E-discovery.

This integration accesses the Druva inSync API to retrieve audit events. API documents can be found
[here](https://developer.druva.com/docs/event-apis).


## Prerequisites

Before you begin setting up Druva source, you must meet the following requirements:
* An administrator account is required for **Druva inSync** Cloud.
* Enable the **Export Events** option. To know the steps, see the [Configure Druva inSync](#configure-inSync-to-export-events) section.
* Obtain access tokens by [authentication](#authentication).


### Configure Druva inSync to export events

Only an Druva inSync Cloud administrator can enable the option to export events and define the Events API settings. To get the event logs, follow the steps to enable the **Export Events**:
1. Log in to the Druva inSync Management Console with [inSync Cloud](https://login.druva.com/) account or [inSync GovCloud](https://loginfederal.druva.com/) account.
2. On the [inSync Management Console](https://docs.druva.com/Endpoints/030_Set_up_inSync_for_Endpoints/010_Initial_Configuration/010_Sign_in_to_inSync_Management_Console/Sign_in_to_inSync_Management_Console) menu bar, click **Settings** (wheel icon) > Settings. The Settings page appears.
3. Click the **inSync APIs** tab.
4. In the Events API settings area, click **Edit**. The Edit Events API Settings window appears.<br/><img src={useBaseUrl('img/send-data/events-api-settings.png')} alt="events-api-settings.png" width="450"/>
5. Select the **Export Events** checkbox.
6. Click in the **Categories** to export box and select the events that you want to export from inSync.
7. In the **Syslog facility** field, type a value between 1 and 23 to assign a Syslog facility ID for inSync events. The default value is 23.
8. Click **Save**.


### Authentication

Druva supports OAuth 2.0-based authentication for incoming requests. Every use of Druva APIs requires authentication to ensure that only authorized users can interact with Druva APIs.

All the requests to Druva APIs are authenticated using OAuth 2.0 access token which you receive in exchange of every authorization grant request you make. The OAuth token will expire after 30 minutes for [Data Governance Cloud](https://apis.druva.com/) and 15 minutes for [Data Governance GovCloud](https://govcloudapis.druva.com/).

The Druva Source requires you to provide a **Client ID**, **Client Secret Key**, **Base URL**. To get these, follow the instructions from [Druva documentation](https://developer.druva.com/reference/reference-getting-started).


## Data Sources

The Druva API integration consumes event logs from the [Data Governance Cloud](https://developer.druva.com/reference/get_eventmanagement-v2-events) or [Data Governance GovCloud](https://developer.druva.com/reference/get_eventmanagement-v2-events-1) and sends it to Sumo Logic.


## States

A Druva API integration Source is an integrated Security Awareness Training and Simulated Phishing platform that helps to train users to understand the dangers of spam, phishing, spear phishing, malware, ransomware, and social engineering through simulated phishing and security awareness training.

When a Druva API Source is created, it goes through the following states:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is completed in Sumo Logic.
1. **Authenticated**. The Source is successfully authenticated with Druva.
1. **Collecting**. The Source is actively collecting data from Druva.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the [Health](/docs/manage/health-events#collection-page) and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events) to investigate issues with collection. <br/>![C2C error icon on collection page.png](/img/send-data/C2C-error-icon-on-collection-page.png)

Hover your mouse over the status icon to view a tooltip with a count of the detected errors and warnings.<br/> ![hover c2c error.png](/img/send-data/hover-c2c-error.png)

## Setup and configuration Source

When you create a Druva Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector.md).

**To configure a Druva Source**

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**.
1. On the **Collectors** page, click **Add Source** next to a Hosted Collector.
1. Select **Druva**. <br/><img src={useBaseUrl('img/send-data/druva-icon.png')} alt="druva-icon.png" width="200"/>
1. **Name**. Enter a Name to display for the Source in the Sumo Logic web application.
1. **Description**. (Optional)
1. **Source Category**.(Optional) Enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. Fields. (Optional) Click **+Add** to add additional fields; each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema or is disabled it is ignored, known as dropped.
1. **Base URL**. Choose the base url from the drop-down menu as per your requirements — [Data Governance Cloud](https://apis.druva.com) and [Data GovernanceGov Cloud](https://govcloudapis.druva.com).<br/><img src={useBaseUrl('img/send-data/base-url.png')} alt="base-url.png" width="400"/>
1. **Client ID**. Enter your Client ID generated from your [Druva application](https://developer.druva.com/docs/authentication).
1. **Secret Key**. Enter your Client secret key generated within your [Druva Application](https://developer.druva.com/docs/authentication).<br/><img src={useBaseUrl('img/send-data/druva-config.png')} alt="druva-config.png" width="600"/>

## Error types

When Sumo Logic detects an issue, it is tracked by Health Events. The following table shows three possible error types. It tells the reason for the error, if the source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable                                                    | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third-party service APIs.                                     | Yes                                                   | The Source will retry for up to 90 minutes, after which it quits.                               | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs.                                     | Yes                                                   | The Source will retry for up to 90 minutes, after which it quits.                               | FirstPartyGenericError |


## JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| `config` | JSON Object  | Yes | Contains the [configuration-parameters](#config-parameters) of the Source. | na |
| `schemaRef` | JSON Object  | Yes | Use `{"type":"Druva"}` for Druva Source. | not modifiable |
| `sourceType` | String | Yes | Use `Universal` for Druva Source. | not modifiable |


### Config Parameters

| Parameter | Type | Required | Description | Access |
|:---|:---|:---|:---|:---|
| `name` | String | Yes | Type the desired name of the Source and it must be unique per Collector. This value is assigned to the `metadata field _source`.  | modifiable |
| `description` | String  | No | Type the description of the Source. | modifiable |
| `category` | String | No | Type the category of the source. This value is assigned to the metadata field `_sourceCategory`. | modifiable |
| `fields` | JSON Object | No | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `baseURL` | String | Yes | The base URL from which the customer wants to retrieve event data. | modifiable |
| `clientID` | String | Yes | Client ID key of an application. | modifiable |
| `secretKey` | String | Secret key of an application | modifiable |


### JSON Example

```json
"api.version": "v1",
"source": {
    "config": {
"name": "Druva",
"description": "test_description",
"category": "source_category",
"baseURL": "https://apis.druva.com",
"clientID": "testclientid",
"secretKey": "*********”
      },
    "schemaRef": {
        "type": "Druva"
    },
    "sourceType": "Universal"
}
}
```
