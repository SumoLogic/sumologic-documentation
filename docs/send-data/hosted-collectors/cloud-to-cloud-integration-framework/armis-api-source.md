---
id: armis-api-source
title: Armis API Integration Source
sidebar_label: Armis API
tags:
  - cloud-to-cloud
  - armis-api
description: Learn how to fetch device and alerts logs from Armis platform and send it to Sumo Logic.
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/armis-api/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/armis-api/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/armis-api/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/armis-icon.png')} alt="armis-icon.png" width="80" />

Armis API is a device security platform that discover devices, tracks behavior, detects threats, and takes action to protect your business. The Source integration ingests alert and device data from the Armis platform.

:::sumo Best Practice
Armis and Sumo Logic recommend using the Armis SIEM Integration, which pushes logs from Armis to a Sumo Logic HTTP source. There is a known limitation with the Armis API’s time query parameters, which can result in missing logs when using the Cloud-to-Cloud source. To avoid this, we advise using the Armis-side integration instead.
:::

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  Alerts data |
| 24 hours |  Device data |

## Setup

### Vendor configuration

In this configuration, you will set up an Armis source account and configure it to be authorized and authenticated to use device logs and alerts from Armis API.
To obtain an Armis auth token, follow the steps below:
1. Log into the [Armis](https://armis.com/) application.
1. Navigate to **Settings** > **API Management** on your Armis application.<br/> <img src={useBaseUrl('img/send-data/armis-settings.png')} alt="armis-settings.png" width="900" style={{border:'1px solid gray'}} />
1. Create a new API secret key if you haven't created one yet by clicking the **Create** button from the API Management page.<br/> <img src={useBaseUrl('img/send-data/create-api.png')} alt="create-api.png" width="=700" />
1. Click **Show** to view the secret key.<br/> <img src={useBaseUrl('img/send-data/show-secretkey.png')} alt="show-secretkey.png" width="700" />
1. A popup window will be displayed. Copy and paste the secret key to a folder location. Remember, you will need to enter this key while creating the **Armis Cloud-to-Cloud Source**.<br/><img src={useBaseUrl('img/send-data/show-key.png')} alt="show-key.png" width="400" />

### Source configuration

When you create an Armis Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure an Armis Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Armis**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a checkmark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored (i.e., dropped).
1. In **Instance URL**, enter the Armis hostname.
   :::info
   Armis Instance URL is the Armis hostname. For example, `https://armis-instance.armis.com`.
   :::
1. In **Secret Key**, enter your API secret key that you have generated in [Vendor configuration](#vendor-configuration) section.
1. In **Armis API selection**. Choose the data sources from which you want to ingest data. The integration provides the option to you to select either one or both of the data sources.
   * If **Alert API** is selected, the integration will fetch alert data.
     * Permission `Alert>Read` must be provided to fetch alert data.
     * Data for an alert will be fetched every 5 minutes.
   * If **Device API** is selected, the integration will fetch device data.
     * Permission `Device>Read` must be provided to fetch device data.
     * Data for the device will be fetched every 24 hours.
   :::note
   This step is mandatory, ensure you select one data source.
   :::
1. (Optional) In **Processing Rules for Logs**, configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Submit**.

## JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Armis"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:---|:---|:---|:---|:---|:---|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| instanceUrl | String | Yes | `null`| Armis Instance URL |  |
| apiSecretKey | String | Yes | `null`| Armis API secret key |  |
| apiType | Array | Yes | | You may use either or both sources of data, that is, Alerts and devices. |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/armis-api/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/armis-api/example.tf" target="_blank">Download example</a>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
