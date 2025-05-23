---
id: confluent-cloud-metrics-source
title: Confluent Cloud Metrics Source
sidebar_label: Confluent Cloud Metrics
tags:
  - cloud-to-cloud
  - confluent-cloud-metrics
description: The Confluent Cloud Metrics source aims to collect metric data from the Confluent Cloud Metrics platform API and send them to Sumo Logic.
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/confluent-cloud-metrics/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/confluent-cloud-metrics/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/confluent-cloud-metrics/example.tf';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/confluent-cloud-metrics.png')} alt="icon" width="160"/>

Confluent is a software company that helps organizations manage, deploy, and scale real-time data infrastructure, enabling businesses to build real-time applications and derive insights from data efficiently.
Confluent Cloud is a scalable, fully managed streaming data service based on Apache Kafka®. It offers a web interface called the Cloud Console for managing resources, settings, and billing, along with a local Command Line Interface (CLI) and REST APIs to create and manage Kafka topics. This integration aims to collect metric data in the Prometheus format from the Confluent Cloud Metrics platform and send them to Sumo Logic.

:::note
This source collects Confluent metrics data that has the single most recent data point for each metric and for each distinct combination of labels. [Learn more](https://api.telemetry.confluent.cloud/docs?&_ga=2.117120000.763533315.1738005875-728715252.1738005875&_gl=1*fkaiwi*_gcl_au*MTkyNzY5NzMuMTczODAwNTg3NA..*_ga*NzI4NzE1MjUyLjE3MzgwMDU4NzU.*_ga_D2D3EGKSGD*MTczODAwNTg3NC4xLjEuMTczODAwNTk2NS42MC4wLjA.#tag/Version-2/paths/~1v2~1metrics~1%7Bdataset%7D~1export/get). 
:::

## Data collected

| Polling Interval | Data |
| :-- | :-- | 
| 5 minutes | [Export metric values API](https://api.telemetry.confluent.cloud/docs?&_ga=2.117120000.763533315.1738005875-728715252.1738005875&_gl=1*fkaiwi*_gcl_au*MTkyNzY5NzMuMTczODAwNTg3NA..*_ga*NzI4NzE1MjUyLjE3MzgwMDU4NzU.*_ga_D2D3EGKSGD*MTczODAwNTg3NC4xLjEuMTczODAwNTk2NS42MC4wLjA.#tag/Version-2/paths/~1v2~1metrics~1%7Bdataset%7D~1export/get) | 

## Setup

### Vendor configuration

The Confluent Cloud Metrics source requires you to provide the **Client ID (API Key ID)** and the **Client Secret (API Secret)** to access the data.
To generate the Client ID and Client Secret, refer to the [cloud API key generation](https://docs.confluent.io/cloud/current/monitoring/metrics-api.html#add-the-metricsviewer-role-to-a-new-service-account) in your Confluent Cloud account.

### Source configuration

When you create a Confluent Cloud Metrics source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Confluent Cloud Metrics source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Confluent Metrics**.
1. Enter a **Name** for the source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema is ignored, known as dropped.
1. **API Key ID**. Enter the Client ID collected from the [vendor configuration](#vendor-configuration). For example, `U5XXXYZYGAXXXFRZ`.
1. **API Secret**. Enter the Client Secret collected from the [vendor configuration](#vendor-configuration). For example, `psYDINXXXG9eYi9hF/X20SZAI4YEn5IZ0cXXXuZ556WIbKYvHPHSCTXXXyF`.
1. **Resource Filters**. Select the checkbox to collect metrics for the required resources, and then enter the ID of the relevant resource to export metrics.
1. (Optional) **Resource Filter**. Select the checkbox to specify the metric to export. If this parameter is not specified, all metrics for the resource will be exported.
1. (Optional) **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{“type”: “Confluent Cloud Metrics”}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"` |
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"` |
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the collector or source. Use the boolean field `_siemForward` to enable forwarding to SIEM.| `{"_siemForward": false, "fieldA": "valueA"}` |
| clientId | String | Yes | `null` | API Key ID generated from the Cloud API key in your Confluent Cloud account. | `U5XXXYZYGAXXXFRZ` |
| clientSecret | String | Yes | `null` | API Key Secret generated from the Cloud API Key in your Confluent Cloud account. | `psYDINXXXG9eYi9hF/X20SZAI4YEn5IZ0cXXXuZ556WIbKYvHPHSCTXXXyF` |
| resourceKafkaId | Boolean | No | `False` | The boolean value for collecting the metrics for Kafka IDs. |  |
| resourceConnectorId | Boolean | No | `False` | The boolean value for collecting the metrics for collector IDs. |  |
| resourceKSQLId | Boolean | No | `False` | The boolean value for collecting the metrics for kSQL IDs. |  |
| resourceSchemaRegistryId | Boolean | No | `False` | The boolean value for collecting the metrics for SchemaRegistry IDs. |  |
| resourceComputePoolId | Boolean | No | `False` | The boolean value for collecting the metrics for ComputePool IDs. |  |
| kafkaId | []String | No | `False` | The ID of the Kafka cluster to export metrics for. |  |
| connectorId | []String | No | `False` | The ID of the Connector to export metrics for. |  |
| ksqlId | []String | No | `False` | The ID of the ksqlDB application to export metrics for. |  |
| schemaRegistryId | []String | No | `False` | The ID of the Schema Registry to export metrics for. |  |
| computepoolId | []String | No | `False` | The ID of the Flink Compute Pool to export metrics for. |  |
| metric | []String | No | `False` | The metric to export. If this parameter is not specified, all metrics for the resource will be exported. |  |
| ignoreFailedMetrics | Boolean | No | `False` | Ignore failed metrics and export only successful metrics if the allowed failure threshold is not breached. If this parameter is set to true, a StateSet metric (export_status) will be included in the response to report which metrics were successful and which failed. | |
| pollingIntervalMin | Integer | Yes | `5` | Time interval (in minutes) after which the source will check for new data from the source API | |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/confluent-cloud-metrics/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/confluent-cloud-metrics/example.tf" target="_blank">Download example</a>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
