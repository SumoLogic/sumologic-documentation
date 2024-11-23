---
id: trend-micro-source
title: Trend Micro Source
sidebar_label: Trend Micro
tags:
  - cloud-to-cloud
  - trend-micro
description: Learn how to collect alert details from Trend Micro platform.
---
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/trend-micro/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/trend-micro/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/trend-micro/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/trend-micro-logo.png')} alt="logo" width="120" />

Trend Micro is a global leader in cybersecurity solutions, offering a range of products and services to protect against online threats. The company specializes in security for cloud environments, networks, endpoints, and hybrid infrastructure, leveraging advanced threat intelligence and artificial intelligence.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 15 min |  [Alert Details](https://automation.trendmicro.com/xdr/api-v3/#tag/Workbench/paths/~1v3.0~1workbench~1alerts/get) |

## Setup

### Vendor configuration

:::note
Ensure that you have view, filter, and search permissions for the alert endpoint.
:::

The Trend Micro  source requires you to provide a API Base URL and Authentication Token. To obtain these, follow the steps below.

- **Base URL**. The integration requires the configuration of the Trend Micro Vision One domain. Trend Micro Vision One API Regions are:
   | Region | Base URL |
   |:--|:--|
   | Australia | `api.au.xdr.trendmicro.com` |
   | European Union | `api.eu.xdr.trendmicro.com` |
   | India | `api.in.xdr.trendmicro.com` |
   | Japan | `api.xdr.trendmicro.co.jp` |
   | Singapore | `api.sg.xdr.trendmicro.com` |
   | United Arab Emirates | `api.mea.xdr.trendmicro.com` |
   | United States | `api.xdr.trendmicro.com` |
   | United States (for Government) | `api.usgov.xdr.trendmicro.com` |
- **Bearer token**. To generate the authentication token, refer to the [Trend Micro Documentation](https://docs.trendmicro.com/en-us/documentation/article/cloud-app-security-integration-api-online-help-generating-an-authen).

### Source configuration

When you create a Trend Micro source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Trend Micro source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Trend Micro**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **API Base URL**. Enter the [Base URL](#vendor-configuration) to fetch the data from the Trend Micro Vision One source.
1. **Auth Token**. Enter the authentication token collected from the [Trend Micro platform](#vendor-configuration).
1. **Polling Interval**. The polling interval is set for 15 minutes by default. You can adjust it based on your needs. This sets how often the source checks for new data.
1. **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Trend Micro"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| apiBaseUrl | String | Yes | `null` | The base URL to fetch the data from the Trend Micro Vision One source. |  |
| authToken | String | Yes | `null` | Client Authentication Token to be used in the API header. |  |
| pollingInterval | integer | Yes | `15 minutes` | Time interval (in minutes) after which the source will check for new data. |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/trend-micro/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/trend-micro/example.tf" target="_blank">Download example</a>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::