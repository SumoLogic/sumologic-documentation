---
id: zimperium-mtd-source
title: Zimperium MTD Source
sidebar_label: Zimperium MTD
tags:
  - cloud-to-cloud
  - zimperium-mtd
description: Learn how to collect the device logs from the Zimperium API and send it to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/zimperium-mtd.png')} alt="logo" width="60" />

Zimperium is a cybersecurity company specializing in mobile threat defense. It uses machine learning and on-device detection to deliver real-time protection against mobile device, network, phishing, and app threats. Designed for enterprises, its solutions safeguard sensitive data and ensure mobile security and integrity without compromising user experience or privacy in an increasingly mobile-first world.

## Data collected

The data will be collected from Zimperium MTD's database using the following log:

| Polling Interval | Data |
| :--- | :--- |
| 12 hours | [Device Logs](https://zc202.zimperium.com/login?redirect=/ziap-docs/zips-docs/api/api_details_device.html) |

## Setup

### Vendor configuration

The Zimperium MTD source requires you to provide the **Account URL**, **Client ID**, and **Client Secret** to setup the integration.

#### Account URL

The Account URL is the Base URL used to retrieve the source data from the Zimperium device log API. For example, `https://{subdomain}.zimperium.com`

#### Client ID and Client Secret

Follow the steps below to generate the Client Id and Client Secret:

1. Log in to the Zimperium portal and navigate to **API Keys**.
1. From the API Keys page, select **Add Partner API Key** to create a new API key.
1. Enter the **API Key Description** and select **Save API Access** to obtain the Client ID and Client Secret credentials.

Once you have all the required values, set up the source configuration to collect your desired log types available in the configuration section.

### Source configuration

When you create a Zimperium MTD source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Zimperium MTD source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Zimperium MTD**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Account URL**. Enter your [Account URL](#vendor-configuration).
1. **Client ID**. Enter your [Client ID](#vendor-configuration).
1. **Client Secret**. Enter your [Client Secret](#vendor-configuration).
1. **Polling Interval**. The polling interval is set for 12 hours by default and can be configured to a maximum of 24 hours. You can adjust it based on your needs. This sets how often the source checks for new data.
1. **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{“type”: “Zimperium MTD”} for Zimperium MTD Source` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"` |
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| accountURL | String | Yes | `null` | The base URL to fetch the data from the Zimperium Device log api. | `https://{subdomain}.zimperium.com` |
| clientId | String | Yes | `null` | The client identifier is given within the Console user interface. |  |
| clientSecret | String | Yes | `null` | The client secret is given within the Console user interface. |  |
| pollingInterval | Integer | Yes | `12 hours` | Time interval (in hours) after which the source will check for new data. |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/zimperium-mtd/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/zimperium-mtd/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
