---
id: aws-cost-explorer-source
title: AWS Cost Explorer Source
sidebar_label: AWS Cost Explorer
tags:
  - cloud-to-cloud
  - aws-cost-explorer
description: Learn how to retrieve cost and usage reports from AWS Cost Explorer into the Sumo Logic environment.
---

import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/img/c2c/aws-cost-explorer/example.json';
import MyComponentSource from '!!raw-loader!/img/c2c/aws-cost-explorer/example.json';
import TerraformExample from '!!raw-loader!/img/c2c/aws-cost-explorer/example.tf';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src='https://s3.amazonaws.com/app_icons/AWS_Cost_Explorer.png' alt="icon" width="50"/>

The AWS Cost Explorer Source collects cost and usage reports from [AWS Cost Explorer](https://aws.amazon.com/aws-cost-management/aws-cost-explorer/). You have the option to collect from one or more specific [AWS cost types](https://docs.aws.amazon.com/cost-management/latest/userguide/ce-exploring-data.html) and set how often reports are collected.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [AWS Cost Explorer](https://aws.amazon.com/aws-cost-management/aws-cost-explorer/)|


## Setup

### Source configuration

When you create an AWS Cost Explorer collector Source, you add it to an existing Sumo Logic hosted collector. Before creating the Source, identify the hosted collector you want to use or simply create a new hosted collector. For further instructions, see [Create a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

{@import ../../../reuse/aws-cost-explorer.md}

:::note
It can take up to 48 hours for AWS to generate your billing data. For accuracy, Sumo Logic does not present any billing analysis for the previous 48-60 hours.
:::

### JSON Configuration

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/api/collector-management). See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"AWS Cost Explorer"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Config Parameters

| Parameter | Type | Required | Default | Description | Example |
|:---|:---|:---|:---|:---|:---|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| accessID | String | Yes | `null` | Personal Access Token from the Asana platform. | modifiable |
| accessKey | String | Yes | `null` | Personal Access Token from the Asana platform. | modifiable |
| granularity | String | Yes | `null` | Personal Access Token from the Asana platform. | modifiable |
| costMetrics | String array | Yes | `null` | Provide a list, such as `["AmortizedCost","BlendedCost","NetAmortizedCost", "NetUnblendedCost","UnblendedCost"]` | modifiable |
| AWS Region | String array | No | `null` | Provide a list, such as `["US East (Ohio)","US West (Oregon)"]` | modifiable |

### JSON example

```json
{
  "api.version":"v1",
  "source":{
    "schemaRef":{
      "type":"AWS Cost Explorer"
    },
    "config":{
      "accessID":"********",
      "name":"billing200",
      "description":"billing200",
      "fields":{
        "_siemForward":false,
        "account":"prod"
      },
      "accessKey":"********",
      "granularity":["daily","monthly"],
      "costMetrics":["AmortizedCost","BlendedCost","NetAmortizedCost","NetUnblendedCost","UnblendedCost"],
      "category":"aws/billing"
    },
    "state":{
      "state":"Collecting"
    },
    "sourceType":"Universal"
  }
}
```

### Terraform example

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud to Cloud sources.
:::