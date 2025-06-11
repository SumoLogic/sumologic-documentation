---
id: sumo-collection-source
title: Sumo Collection Source
sidebar_label: Sumo Collection
tags:
  - cloud-to-cloud
  - sumo-collection
description: The Sumo Collection Source aims to collect the list of the collectors and their sources and send them to Sumo Logic.
---

import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/sumo-logic-logo.png')} alt="icon" width="60"/>

Sumo Logic's Cloud-to-Cloud (C2C) framework enables seamless data integration by leveraging API-based connections to collect insights from external systems and services. The Sumo Collection Source is part of this framework and is designed to gather a list of collectors and their associated sources directly from the Sumo Logic platform.

This source supports both Installed and Hosted Collectors configured within a C2C environment. By using Sumo Logic’s API, it provides centralized, real-time visibility into collector and source health, operational status, and configuration metrics—helping teams proactively monitor deployments, troubleshoot issues, and maintain a reliable data collection pipeline.

:::tip
For related info on collector health events, see [this doc](/docs/manage/health-events).
:::

## Data collected

| Polling Interval | Data |
| :-- | :-- |
| 12 hours | [Collector API](/docs/api/collector-management/collector-api-methods-examples/#get-a-list-of-collectors) |
| 5 minutes | [Source API](/docs/api/collector-management/source-api/#list-sources) |

## Setup

### Vendor configuration

The Sumo Collection source requires you to provide the **Deployment**, **Access ID**, and **Access Key** to access the data.

#### Deployment

Identify your **Deployment** region based on your Base URL. The deployment region can be selected from the list below.

| Region | URL |
|:--|:--|
| AU  |	`https://api.au.sumologic.com/`  |
| CA  |	`https://api.ca.sumologic.com/`  |
| DE  |	`https://api.de.sumologic.com/`  |
| EU  | `https://api.eu.sumologic.com/`  |
| FED |	`https://api.fed.sumologic.com/` |
| JP  |	`https://api.jp.sumologic.com/`  |
| KR  |	`https://api.kr.sumologic.com/`  |
| US1 |	`https://api.sumologic.com/`     |
| US2 |	`https://api.us2.sumologic.com/` |

#### Access ID and Access Key

To generate the Access ID and Access Key, refer to [Create an access key](/docs/manage/security/access-keys/#create-an-access-key).

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
1. **Access ID**. Enter the Access ID collected from the [vendor configuration](#access-id-and-access-key). For example, `sug2lhtaa1g6xk`.
1. **Access Key**. Enter the Access Key collected from the [vendor configuration](#access-id-and-access-key). For example, `00xxxxxx-xxx2-9316-7xx42xxx1x41`.
1. (Optional) **Collector Type**. Select the type of collector: Installed and/or Hosted.
1. **Collector API Interval**. Set how often the source needs to check for new collector data. The polling interval is set for 12 hours by default. You can adjust it based on your needs.
1. (Optional) **Collect Source Details**. Check the box to collect the source details.
    1. **Source API Interval**. Set how often the source needs to check for new source data. The polling interval is set for 5 minutes by default. You can adjust it based on your needs.
1. (Optional) **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Save**.

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
| pollingIntervalSourceMin | Integer | Yes | `5` | Time interval (in minutes) after which the source will check for new data from the source API. <br/>Default: 5 <br/>Min: 1 <br/>Max: 60 | |
| filters | Array | No | `null` | An array of key-value pairs to filter the data. For key-value pairs, the length is set to 256 characters and the API accepts a maximum length of 1024 characters for the filter. | |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/sumo-collection/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/sumo-collection/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
