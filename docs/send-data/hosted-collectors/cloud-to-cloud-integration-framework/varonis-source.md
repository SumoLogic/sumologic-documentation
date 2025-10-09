---
id: varonis-source
title: Varonis Source
sidebar_label: Varonis
tags:
  - cloud-to-cloud
  - varonis
description: Learn how to collect Varonis alerts and their detailed information and send them to Sumologic.
---

import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/misc/varonis-logo.png')} alt="icon" width="100"/>

The Sumo Logic source for Varonis enables you to collect alerts from Varonis into Sumo Logic. This integration helps you to collect real-time intelligent alerts about suspicious activity across your files, emails, and data stores. Powered by advanced threat detection and behavioral analytics, these alerts help security teams quickly identify insider threats, ransomware, and data breaches. With clear context and actionable insights, Varonis alerts enable faster response and stronger protection of your most sensitive information.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 minutes |  Alert Details API |

## Setup

### Vendor configuration

The Varonis source requires you to provide the Varonis **Domain URL** and **API Key** to configure the source.

#### Domain URL

The **Domain URL** will be the endpoint URL of the Varonis console taken from source input. For example, `https://domain.varonis.io`.

#### API Key

1. [Sign in](https://loginx.varonis.com/) to your **Varonis** workspace.
2. Navigate to **Configuration** > **API Keys** and create an API key with the **Threat Detection Integrator** role.

### Source configuration

When you create a Varonis Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure Varonis Source:
1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. 
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select the **Varonis** icon.
1. Enter a **Name** to display for the Source in Sumo Logic. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="green check circle.png" width="20"/> A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="orange exclamation point.png" width="20"/> An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. Enter the [Domain URL](#domain-url) collected from the [vendor configuration](#vendor-configuration).
1. Enter the [API Key](#api-key) collected from the [vendor configuration](#vendor-configuration).
1. The **Polling Interval** is set for 5 minutes hours by default. You can adjust it based on your needs.
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Varonis"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| domainURL | String | Yes | `null` | Domain URL of your account. |  |
| apiKey | String | Yes | `null` | API key of your account. |  |
| pollingIntervalMin | Integer | Yes | 5 minutes | Time interval (in mins) after which the source will check for new data. <br/>Default: 5 minutes <br/>Minimum: 5 minutes <br/>Maximum: 60 minutes |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/varonis/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/varonis/example.tf
```


## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
