---
id: kaltura-source
title: Kaltura Source
sidebar_label: Kaltura
tags:
  - cloud-to-cloud
  - kaltura
description: Learn how to configure the Kaltura Cloud-to-Cloud source setup using the Sumo logic environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/kaltura-logo.png')} alt="icon" width="70"/>

Kaltura is a video platform for modular systems that exposes different web services that may be deployed in several deployment modes to support different levels of scale. Kaltura’s platform comes in different editions, including the Kaltura-hosted SaaS edition, managed by Kaltura for single publishers and Value Added Resellers (VARs). Kaltura also offers several licensing modes of the self-hosted Kaltura On-Prem edition: Kaltura Community Edition, Kaltura On-Prem for Publishers, and Kaltura OnPrem for OEMs. Kaltura source collects audit trail events and base entry events data and sends it to Sumo Logic.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Audit Trail Events](https://developer.kaltura.com/api-docs/service/auditTrail/action/list) |
| 1 hour |  [Base Entry Events](https://developer.kaltura.com/api-docs/service/baseEntry/action/list) |

## Setup

### Vendor configuration

In this configuration, you will create a new [Kaltura App Token](https://developer.kaltura.com/api-docs/VPaaS-API-Getting-Started/application-tokens.html) in the [Kaltura Developer Portal](https://developer.kaltura.com/api-docs/service/appToken/action/add) or via your own hosted API portal to generate an App Token and App ID.

#### Create a New App Token

A Kaltura App Token with specific permissions is required for Sumo Logic to access Audit Trail and Base Entry Events from Kaltura. Follow the below instructions to create a new App Token.

1. Start a [Kalutra session](https://developer.kaltura.com/api-docs/service/session/action/start) using an admin account.
1. Enter the following parameters in the body:
    - **secret**. The API Secret Keys that are generated when you create an account.
    - **expiry**. 86400 - KS (Kaltura Session) expiry time in seconds.
    - **Partnerid**. A unique identifier allocated to every Kaltura account. The partner ID can be retrieved from the KMC Integration Settings tab.
    - **privileges**. disableentitlement - Session privileges that allows you to limit the applications to perform only specific actions.
    - **type**. ADMIN [2] - The type of Kaltura session (admin or user).
    - **userId**. The Unique ID of the user who is performing the API call. This ID is the end-user’s ID on the publisher’s system.
1. Click on the **Send Request**.
1. Copy and save the Kaltura Session.
1. Add a new [App Token](https://developer.kaltura.com/api-docs/service/appToken/action/add).
1. Enter the following global parameters:
    - **ks**. Paste the KS (Kaltura Session) copied from the previous step.
    - **format**. JSON[1] - format of the response.
1. Enter the following body appToken parameters:
    - **description**. Provide a description to identify what the Token will be used for.   
    - **hashType**. SHA1[SHA1] - Kaltura App Token Hash Type.
    - **sessionType**. ADMIN[2] - Type of Kaltura Session that will be created using the current token.
1. Click on the **Send Request**.
1. Copy and save the **App Token**, **App Token ID**, and **Partner Id** from the response.

### Source configuration

When you create an Kaltura source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Kaltura source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Kaltura**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Base URL**. Enter the API **Base URL**.
1. **Partner ID**. Enter the **Partner ID** collected from the [Vendor configuration](#create-a-new-app-token).
1. **App Token ID**. Enter the **App Token ID** collected from the [Vendor configuration](#create-a-new-app-token).
1. **App Token**. Enter the **App Token** collected from the [Vendor configuration](#create-a-new-app-token).
1. **Select Base Entry Types for Base Entry Logs**. You have the option to **Collect all types** or **Select types**, where you can specify the exact event categories you would like to collect from the base entry logs. Must select from the pre-defined list.
1. **Polling Interval**. You have the option to select how often to poll for base entry events. Default is 24 hours.
1. **Base Entry Init Lookback**. You have option to configure from when the integration should collect Kaltura **Base Entry** events. Default is 1 day.
1. When you are finished configuring the Source, click **Save**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemParser` | `/Parsers/System/Kaltura/Kaltura` | Set when **Forward To SIEM** is checked. |

:::info
Base entry event logs are not supported with the SIEM forward option.
:::

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"kaltura"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| apiBaseUrl | String | Yes | `null` | API URL of your Kaltura environment. |  |
| partnerId | String | Yes | `null` | Partneter Id of the customers Kaltura account from where you want to collect the event from. |  |
| tokenId | String | Yes | `null` | Client ID of the Kaltura App Token created for Sumo Logic. |  |
| token | String | Yes | `null` | Client Token of the Kaltura App Token created for Sumo Logic. |  |
| supportedApis | Array of strings | Yes | `Audit Trail` | Define one or more of the available APIs to collect.<br/>Options Base Entry, Audit Trail. |  |
| collectAll | Boolean | Yes | True | By default, the Source will ingest all Base Entry events. If false, baseEntryTypes is required.. |  |
| baseEntryTypes | Array of strings | no | `null` | A list of Base Entry Types to collect. Required if collectAll is false.<br/>Options: DATA, PLAYLIST, MIX, MEDIA_CLIP, SIP_ENTRY_SERVER, EXTERNAL_MEDIA, CONFERENCE_ENTRY_SERVER. |  |
| polling_interval | Integer | No | 24 | How frequently the integration should poll to Kaltura for Base Entry Events in hours. |  |
| baseEntryInitLookback | Integer | No | 1 | From when the integration should collect Kaltura Base Entry Events. |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/kaltura/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/kaltura/example.tf
```


## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
