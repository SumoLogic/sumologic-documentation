---
id: aws-cost-explorer-source
title: AWS Cost Explorer Source
sidebar_label: AWS Cost Explorer
tags:
  - cloud-to-cloud
  - aws-cost-explorer
description: Learn how to retrieve cost and usage reports from AWS Cost Explorer into the Sumo Logic environment.
---

import React, { useEffect, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/aws-cost-explorer/example.json';
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

To configure an AWS Cost Explorer Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **AWS Cost Explorer**.
1. Enter a **Name** for the Source in the Sumo Logic console. The **Description** is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) is stored in a searchable field called `_sourceCategory`.
1. For [Fields](/docs/manage/fields), click the **+Add** link to add custom log metadata. Define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema or is disabled it is ignored, known as dropped.<br/><br/>It is preferable to add an **account** field (for the dashboards) and assign it a friendly name to identify the corresponding AWS account.<br/> ![accountField.png](/img/send-data/accountField.png)
1. For the **AWS Access Key** and **AWS Secret Key**, provide the IAM User access key and secret key you want to use to authenticate collection requests.
Make sure your IAM user has the following IAM policy attached with it.
     ```json
     {
         "Version": "2012-10-17",
         "Statement": [
             {
                 "Sid": "VisualEditor0",
                 "Effect": "Allow",
                 "Action": [
                     "ce:Describe*",
                     "ce:Get*",
                     "ce:List*",
                     "ec2:DescribeRegions"
                 ],
                 "Resource": "*"
             }
         ]
     }
     ```
1. (Optional) For the **Enable Regions** field, provide the regions which need to be monitored for cost. The cost incurred across these regions will be fetched separately. The region list here includes all the standard AWS regions along with “global”. “Global” region includes services like Amazon CloudFront, Amazon Route 53, and Amazon IAM. If the field is left empty (default behavior), then data will be fetched from all the enabled regions of the respective AWS account. It is recommended to provide only the regions which are actively used and need to be monitored for cost. This will save the AWS cost for running this source on unused regions.
1. For the **Cost Type**, provide supported cost types / MetricTypes. For details on the CostType, see Amazon's [Understanding your AWS Cost Datasets: A Cheat Sheet](https://aws.amazon.com/blogs/aws-cloud-financial-management/understanding-your-aws-cost-datasets-a-cheat-sheet/).
    * AmortizedCost
    * BlendedCost
    * NetAmortizedCost
    * NetUnblendedCost
    * UnblendedCost
1. For **Granularity**, provide 2 supported granularities for each of the MetricTypes (or cost types):
    * Daily Costs (Polled every 12h)
    * Monthly Costs (Polled every day)
1. Add **[Processing Rules](/docs/send-data/collection/processing-rules)**.
1. When you are finished configuring the Source, click **Save**.

:::note
It can take up to 48 hours for AWS to generate your billing data. For accuracy, Sumo Logic does not present any billing analysis for the previous 48-60 hours.
:::

## JSON Configuration

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/api/collector-management). See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details.

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"AWS Cost Explorer"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#config-parameters) | Yes | Source type specific values. |

### Config Parameters

| Parameter | Type | Required | Default | Description | Example |
|:---|:---|:---|:---|:---|:---|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| accessID | String | Yes | `null` | Personal Access Token from the Asana platform. |  |
| accessKey | String | Yes | `null` | Personal Access Token from the Asana platform. |  |
| granularity | String | Yes | `null` | Personal Access Token from the Asana platform. |  |
| costMetrics | String array | Yes |  | Provide a list, such as `["AmortizedCost","BlendedCost","NetAmortizedCost", "NetUnblendedCost","UnblendedCost"]` |  |
| AWS Region | String array | No | | Provide a list, such as `["US East (Ohio)","US West (Oregon)"]` |  |

## Examples

<>
  {(() => {
    const [json, setJson] = React.useState('');
    const [tf, setTf] = React.useState('');

    React.useEffect(() => {
      fetch(useBaseUrl('/files/c2c/aws-cost-explorer/example.json'))
        .then(res => res.text())
        .then(setJson);
      fetch(useBaseUrl('/files/c2c/aws-cost-explorer/example.tf'))
        .then(res => res.text())
        .then(setTf);
    }, []);

    return (
      <>
        <h3>JSON example</h3>
        <CodeBlock language="json">{json}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/aws-cost-explorer/example.json')} target="_blank" rel="noopener noreferrer">Download example</a>

        <h3>Terraform example</h3>
        <CodeBlock language="hcl">{tf}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/aws-cost-explorer/example.tf')} target="_blank" rel="noopener noreferrer">Download example</a>
      </>
    );
  })()}
</>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
