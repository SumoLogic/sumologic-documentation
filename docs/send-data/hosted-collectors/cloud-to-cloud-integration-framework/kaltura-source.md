---
id: kaltura-source
title: Kaltura Source
sidebar_label: Kaltura
tags:
  - cloud-to-cloud
  - kaltura
description: Learn how to configure the Kaltura Cloud-to-Cloud source setup using the Sumo logic environment.
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/kaltura/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/kaltura/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/kaltura/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/kaltura.png')} alt="icon" width="100"/>

Kaltura is a video platform for modular systems that exposes different web-services and that may be deployed in several deployment modes to support different levels of scale. Kaltura’s platform comes in different editions, including the Kaltura-hosted SaaS edition, managed by Kaltura for single publishers and Value Added Resellers (VARs), as well as in several licensing modes of the, self-hosted, Kaltura On-Prem edition: Kaltura Community Edition, Kaltura On-Prem for Publishers and Kaltura OnPrem for OEMs. Kaltura source collects audit trail events and base entry events data and sends it to Sumo Logic.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Audit Trail Events](https://developer.kaltura.com/api-docs/service/auditTrail/action/list) |
| 1 hour |  [Base Entry Events](https://developer.kaltura.com/api-docs/service/baseEntry/action/list) |

## Setup

### Vendor configuration

In this configuration, you will create a new [Kaltura App Token](https://developer.kaltura.com/api-docs/VPaaS-API-Getting-Started/application-tokens.html) in [Kaltura Develops Portal](https://developer.kaltura.com/api-docs/service/appToken/action/add) or via your own hosted api portal and generate a App token and App Id. 

#### Create a New App Token

A Kaltura App Token with specific permissions is required for Sumo Logic to access Audit Trail and Base Entry Events from Kaltura. Follow the below instructions to create a new App Token.

1. Start a [Kalutra session](https://developer.kaltura.com/api-docs/service/session/action/start) using an admin account.
2. Fill out the following parameter: 
    - **secret**. The API Secret Keys are generated when you create an account.
    - **expiry**. 86400 - KS (Kaltura Session) expiry time in seconds.
    - **Partnerid**. A unique identifier allocated to every Kaltura account. The partner ID can be retrieved from the KMC Integration Settings tab.
    - **privileges**. disableentitlement - Session privileges allows applications to limit the user to perform only specific actions.
    - **type**. ADMIN [2] - The type of kaltura session (admin or user)
    - **userId**. The Unique ID of the user who is performing the API call. This ID is the end-user’s ID on the publisher’s system.
3. Click Send Request
4. Copy and save the KS (Kaltura Session).
5. Add a new [App Token](https://developer.kaltura.com/api-docs/service/appToken/action/add)
6. Fill out the following global parameters: 
    - **ks**. Paste in the KS (Kaltura Session) from previous step.
    - **format**. JSON[1] - format of the response
7. Fill out the following body appToken parameters:
    - **description** Provide a description to identify what the Token will be used for.
    - **hashType**. SHA1[SHA1] - Kaltura App Token Hash Type.
    - **sessionType**. ADMIN[2] - Type of KS (Kaltura Session) that will be created using the current token.
8. Click Send Request
9. Copy and save the App Token,App Token ID, partnerId from the response.

### Source configuration

When you create an Kaltura source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure an Kaltura source:
1. In Sumo Logic, select **Manage Data > Collection > Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Kaltura**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Base URL**. Enter the API **Base URL**.
1. **Partner ID**. Enter the **Partner ID** collected from the [New App Token](#create-a-new-app-token).
1. **App Token ID**. Enter the **App Token ID** collected from the [New App Token](#create-a-new-app-token).
1. **App Token**. Enter the **App Token** collected from the [New App Token](#create-a-new-app-token).
1. **Select Base Entry Types for Base Entry Logs**. You have the option to **Collect all types** or **Select types**, where you can specify the exact event categories you would like to collect from the base entry logs. Must select from the pre-defined list.
1. **Polling Interval** You have the option to select how often to poll for base entry events. Default is 24 hours.
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

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
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| apiBaseUrl | String | Yes | `null` | API URL of your Kaltura enviorment. |  |
| partnerId | String | Yes | `null` | Partneter Id of the customers Kaltura account from where you want to collect the event from. |  |
| tokenId | String | Yes | `null` | Client ID of the Kaltura App Token created for Sumo Logic. |  |
| token | String | Yes | `null` | Client Token of the Kaltura App Token created for Sumo Logic. |  |
| supportedApis | Array of strings | Yes | `Audit Trail` | Define one or more of the available APIs to collect.<br/>Options Base Entry, Audit Trail. |  |
| collectAll | Boolean | Yes | True | By default, the Source will ingest all Base Entry events. If false, baseEntryTypes is required.. |  |
| baseEntryTypes | Array of strings | no | `null` | A list of Base Entry Types to collect. Required if collectAll is false.<br/>Options: DATA, PLAYLIST, MIX, MEDIA_CLIP, SIP_ENTRY_SERVER, EXTERNAL_MEDIA, CONFERENCE_ENTRY_SERVER. |  |
| polling_interval | Integer | No | 24 | How frequently the integration should poll to Kalura for Base Entry Events in hours. |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

[Download example](/files/c2c/kaltura/example.json)

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

[Download example](/files/c2c/kaltura/example.tf)

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::