---
id: rapid7-source
title: Rapid7 Source
sidebar_label: Rapid7
tags:
    - rapid7
description: Learn how to collect assets and vulnerabilities from Rapid7 InsightVM.
---
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/rapid7/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/rapid7/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/rapid7/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/rapid7-logo.png')} alt="rapid7-logo" width="80" />

The Rapid7 source collects asset and vulnerabilities from [Rapid7 InsightVM](https://help.rapid7.com/insightvm/en-us/api/integrations.html) API and sends it to Sumo Logic. InsightVM provides a fully available, scalable, and efficient way to collect vulnerability data and minimize risk. InsightVM automatically evaluates changes in user's networks, allowing security professionals to better understand and quickly manage the risk posed to their organization.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min | [Assets](https://help.rapid7.com/insightvm/en-us/api/integrations.html#operation/searchIntegrationAssets) |
| 5 min | [Vulnerabilities](https://help.rapid7.com/insightvm/en-us/api/integrations.html#operation/searchIntegrationVulnerabilities) |

## Setup

### Vendor configuration

The Rapid7 InsightVM source requires you to provide a region and organizational API key to access the data. Follow the instructions from Rapid7 documentation, to determine the [Region](https://docs.rapid7.com/insight/api-overview#endpoint) and [Organizational API key](https://docs.rapid7.com/insight/managing-platform-api-keys#generate-an-organization-key).

### Source configuration

When you create an Rapid7 Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure an Rapid7 Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Rapid7**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. Enter the **Region** of Rapid7 InsightVM platform.
1. Enter the **API Key** for authorization.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Rapid7"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| region | String | Yes | |Region of the Insight platform. Know more about [Supported regions](https://docs.rapid7.com/insight/product-apis/#supported-regions).  |  |
| apikey | String | Yes | `null` |API Key for the account authorization. |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

<a href="/files/c2c/rapid7/example.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

<a href="/files/c2c/rapid7/example.tf" target="_blank">Download example</a>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::


