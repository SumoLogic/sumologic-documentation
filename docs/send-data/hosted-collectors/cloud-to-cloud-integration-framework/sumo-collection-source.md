---
id: sumo-collection-source
title: Sumo Collection Source
sidebar_label: Sumo Collection
tags:
  - cloud-to-cloud
  - sumo-collection
description: The Sumo Collection Source aims to collect the list of the collectors and their sources and send them to Sumo Logic.
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/sumo-collection/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/sumo-collection/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/sumo-collection/example.tf';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/sumo-logic-logo.png')} alt="icon" width="80"/>

Sumo Logic enables users to seamlessly gather and analyze valuable insights from diverse sources. By leveraging its robust API capabilities, you can efficiently extract, transform, and load data into your analytics pipeline. This streamlined process allows you to harness the power of real-time data analysis, improving decision-making, troubleshooting, and overall operational efficiency within your organization.

## Data collected

| Polling Interval | Data | Description |
| :--- | :--- | :--- |
| 12 hours | Collector API | The Collector API allows you to collect the list of collectors. |
| 5 minutes | Source API | The Source API allows you to collect the list of sources for each collectorId. |

## Setup

### Vendor configuration

The Sumo Collection Source requires you to provide the Deployment region, Access ID, and Access Key to access the data.

#### Deployment

The Sumo Logic integration requires the configuration of the Sumo Logic domain.

Sumo Logic API Regions are:

| Region | URL |
|:--|:--|
| AU |	`https://api.au.sumologic.com/` |
| CA |	`https://api.ca.sumologic.com/` |
| DE |	`https://api.de.sumologic.com/` |
| EU | `https://api.eu.sumologic.com/`|
| FED |	`https://api.fed.sumologic.com/` |
| IN |	`https://api.in.sumologic.com/` |
| JP |	`https://api.jp.sumologic.com/` |
| KR |	`https://api.kr.sumologic.com/` |
| US1 |	`https://api.sumologic.com/` |
| US2 |	`https://api.us2.sumologic.com/` |

#### Access ID and Access Key

Follow the steps mentioned under the **Create an access key** section in the [Access Keys](/docs/manage/security/access-keys/#create-an-access-key) document to generate the Access ID and Access Key.

### Source configuration

When you create a Sumo Collection Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Sumo Collection Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Sumo Collection**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema is ignored, known as dropped.
1. **Deployment**. Select the deployment region from the dropdown. For example, `AU`.
1. **Access ID**. Enter the Access ID collected from the [Sumo Collection](#access-id-and-access-key) platform. For example, `sug2lhtaa1g6xk`.
1. **Access Key**. Enter the Access Key collected from the [Sumo Collection](#access-id-and-access-key) platform. For example, `00xxxxxx-xxx2-9316-7xx42xxx1x41`.
1. (Optional) **Collector Type**. Specify the collector type:
  - Installed
  - Dead
  - Hosted
  - Alive
11. (Optional) **Collect Source Details**. Check the box to collect the source details.
12. (Optional) **Filters**. Click the **+Add** button to define the filters you want to associate. Each filter needs a **Field Name** (key) and **Field Value** (value). For key-value pairs, the length is set to 256 characters and the API accepts a maximum length of 1024 characters for the filter.
13. (Optional) **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
14. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{“type”: “Sumo Collection”}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"` |
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"` |
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the collector or source. Use the boolean field `_siemForward` to enable forwarding to SIEM.| `{"_siemForward": false, "fieldA": "valueA"}` |
| deployment | String | Yes | `null` | The Sumo Logic base URL of your region. | `https://api.au.sumologic.com/` |
| accessId | String | Yes | `null` | The access ID of your Sumo Logic account. | `sug2lhtaa1g6xk` |
| accessKey | String | Yes | `null` | The access key of your Sumo Logic account. | `00xxxxxx-xxx2-9316-7xx42xxx1x41` |
| collectorType | String | No | `null` | The type of collectors. | `Installed` |
| pollingIntervalCollectorHour | Integer | Yes | `12` | Time interval (in hours) after which the source will check for new data from the collector API. <br/>Default: 12 <br/>Min: 1 <br/>Max: 24 | |
| collectSources | Boolean | Yes | `False` | Collects the source details when enabled. | |
| pollingIntervalSourceMin | Integer | Yes | `5` | Time interval (in hours) after which the source will check for new data for the API. <br/>Default: 5 <br/>Min: 1 <br/>Max: 60 | |
| filters | Array | No | `null` | An array of key-value pairs to filter the data. For key-value pairs, the length is set to 256 characters and the API accepts a maximum length of 1024 characters for the filter. | |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/sumo-collection/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/sumo-collection/example.tf" target="_blank">Download example</a>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::