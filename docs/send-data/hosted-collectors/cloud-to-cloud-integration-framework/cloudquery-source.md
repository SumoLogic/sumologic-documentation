---
id: cloudquery-source
title: CloudQuery Source
sidebar_label: CloudQuery
tags:
  - cloud-to-cloud
  - cloudquery
description: Learn how to collect inventory from the AWS APIs and transform them into the CloudQuery schema and send it to Sumo Logic.
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/cloudquery/example.json';
import MyComponentSource from '!!raw-loader!/files/c2c/cloudquery/example.json';
import TerraformExample from '!!raw-loader!/files/c2c/cloudquery/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/cloudquery-logo.png')} alt="cloudquery-icon" width="70" />

The CloudQuery integration is used to pull inventory from the AWS APIs and transform them into the CloudQuery schema and send it to Sumo Logic.

:::note
This source is available in the [Fed deployment](https://hub.cloudquery.io/plugins/source/cloudquery/aws/v22.19.2/docs).
:::

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 24 hours |  [Data service table data](https://developer.code42.com/api) |

## Setup

### Source configuration

When you create an CloudQuery source, you add it to a Hosted Collector. Before creating the source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a CloudQueryr Source:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **CloudQuery**.
1. Enter a **Name** for the source. The description is optional. 
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **AWS Access Key ID**. Enter the Access Key ID collected from the [AWS Management Console](#vendor-configuration).
1. **AWS Secret Access Key**. Enter the Secret Access Key collected from the [AWS Management Console](#vendor-configuration).
1. **Regions**. Identify and enter your Region based on your Base URL.
1. **Sevices**. Enter the type of service from which the data needs to be collected.
1. By default, **Polling Interval** is set to 24 hours.
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"CloudQuery"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| awsId | String | Yes | `null` | The AWS access ID that you want to use to authenticate collection requests.  |  |
| awsKey | String | Yes | `null` | The AWS secret key that you want to use to authenticate collection requests. |  |
| limitToRegions | Array | Yes |  | List of regions for which the data has to be fetched. |  |
| limitToServices | Array | Yes |  | List of services for which the data has to be fetched. |  |
| pollingInterval | Integer | No | 24 | This sets how often the Source checks for data. |  |

### JSON example

<CodeBlock language="json">{MyComponentSource}</CodeBlock>

[Download example](/files/c2c/cloudquery/example.json)

### Terraform example

<CodeBlock language="json">{TerraformExample}</CodeBlock>

[Download example](/files/c2c/cloudquery/example.tf)

## Limitations

- The integration lacks support for fetching service table data from multiple AWS accounts.
- The integration does not support to retrieve data from services like Classic load balancer, Network load balancer, Aurora, and VPC.

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::