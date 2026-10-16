---
id: cost-explorer
title: AWS Cost Explorer
description: The Sumo Logic App for AWS Cost Explorer lets you visualize, understand, and manage your AWS costs and usage over time.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src='https://s3.amazonaws.com/app_icons/AWS_Cost_Explorer.png' alt="AWS Cost Explorer icon" width="50"/>

[AWS Cost Explorer](https://aws.amazon.com/aws-cost-management/aws-cost-explorer) provides you with a set of default reports that you can use as the starting place for your analysis. From there, use the filtering and grouping capabilities to dive deeper into your cost and usage data and generate custom insights.

The Sumo Logic App for AWS Cost Explorer lets you visualize, understand, and manage your AWS costs and usage over time.

## Log types

The **AWS Cost Explorer** App uses the JSON formatted logs collected using **AWS Cost Explorer** source.

### Sample log messages

```json
{
   "Timestamp":1647129599999,
   "Estimated":true,
   "Service":"AmazonCloudWatch",
   "Operation":"PutLogEvents",
   "region":"us-east-1",
   "StartDate":"2022-03-12",
   "EndDate":"2022-03-13",
   "CostUsd":0.1326919963,
   "MetricType":"UnblendedCost",
   "Granularity":"Monthly",
   "CostType":"cost_service_operation_region_UnblendedCost_Monthly"
}
```

### Sample queries

The following query sample was taken from the **Cost by Region** panel on the **AWS Cost Explorer - Account** dashboard.

```sumo
account={{account}} region CostUsd CostType StartDate EndDate MetricType Granularity Daily
| json "region", "CostUsd", "CostType", "StartDate", "EndDate", "MetricType", "Granularity", "Estimated"
| where MetricType matches "{{MetricType}}" and estimated matches "{{estimated}}"
| where Granularity = "Daily" and CostType = "cost_region_{{MetricType}}_Daily"
| last(CostUsd) as CostUsd by StartDate, EndDate, account, region, CostType, MetricType, Granularity, Estimated
| sum(CostUsd) as total_cost by region
| sort by total_cost, region
| limit 10
```

## Create a AWS Cost Explorer Collector Source

When you create an AWS Cost Explorer collector Source, you add it to an existing Sumo Logic hosted collector. Before creating the Source, you'll need to add a Field-in-Field Schema, Field Extraction Rules, and [identify or create the hosted collector you want to use](/docs/send-data/hosted-collectors/configure-hosted-collector).

## Field-in-Field Schema

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Data Management**, and then under **Logs** select **Fields**. You can also click the **Go To...** menu at the top of the screen and select **Fields**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Fields**. 
1. Search for the **account** and **linkedaccount** field.
1. If not present, create it. Learn how to create and manage fields [here](/docs/manage/fields#manage-fields).

## Field Extraction Rules
Create a Field Extraction Rule (FER) for AWS Cost Explorer Logs. Learn how to create a Field Extraction Rule [here](/docs/manage/field-extractions/create-field-extraction-rule).

* **Rule Name:** AWSCostExplorerFER
* **Applied at:** Ingest Time
* **Scope (Specific Data):**
  ```sumo
  account = * region CostUsd CostType StartDate EndDate MetricType Granularity Service LinkedAccount
  ```
* **Parse Expression:** Enter a parse expression to create an “account” field that maps to the alias you set for each sub account. For example, if you used the “securityprod” alias for an AWS account with ID "123456789" and the “infraprod” alias for an AWS account with ID "987654321", your parse expression would look like:
  ```sumo
  | json "LinkedAccount"
  | if (LinkedAccount = "123456789",  "securityprod", LinkedAccount ) as LinkedAccount
  | if (LinkedAccount = "987654321",  "infraprod", LinkedAccount ) as LinkedAccount
  ```

## Configure an AWS Cost Explorer Source

To configure an AWS Cost Explorer Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **AWS Cost Explorer**.<br/><img src={useBaseUrl('img/send-data/aws-cost-explorer-icon.png')} alt="AWS Cost Explorer icon" width="50" />
1. Enter a **Name** for the Source in the Sumo Logic console. The **Description** is optional.<br/><img src={useBaseUrl('img/integrations/amazon-aws/cost-explorer-v2-1-1.png')} alt="AWS Cost Explorer source configuration" width="400" />
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) is stored in a searchable field called `_sourceCategory`.
1. For [Fields](/docs/manage/fields), click the **+Add** link to add custom log metadata. Define the fields you want to associate. Each field needs a name (key) and value.
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="green check circle" width="20"/> A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="orange exclamation point" width="20"/> An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic but isn’t present or enabled in the schema, it’s ignored and marked as **Dropped**.<br/><br/>It is preferable to add an **account** field (for the dashboards) and assign it a friendly name to identify the corresponding AWS account.<br/><img src={useBaseUrl('img/send-data/accountField.png')} alt="Account field configuration" style={{border: '1px solid gray'}} width="400" />
1. For the **AWS Access Key** and **AWS Secret Key**, provide the IAM User access key and secret key you want to use to authenticate collection requests. Make sure your IAM user has the following IAM policy attached with it.
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
1. Click **Submit** when complete.

## Installing the AWS Cost Explorer App

Now that you have set up a collection for AWS Cost Explorer, install the Sumo Logic App to use the pre-configured dashboards that provide visibility into your environment for real-time analysis of overall usage.

import AppInstall from '../../reuse/apps/app-install.md';

<AppInstall/>

## Viewing AWS Cost Explorer Dashboards

This section provides examples and descriptions for each of the AWS Cost Explorer pre-configured dashboards.

### Account

**AWS Cost Explorer - Account** dashboard provides detailed information about cost and usage by different AWS accounts.

Use this dashboard to:
* Monitor and visualize the costs and usage associated with your top cost-accruing AWS accounts detailed breakdown on all AWS accounts
* Gain a better understanding of your cost trends.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Cost-Explorer-Account.png')} alt="cost explorer dashboard" />


### Region

**AWS Cost Explorer - Region** dashboard provides detailed information about cost and usage by different AWS Regions within AWS accounts.

Use this dashboard to:
* Monitor and visualize the costs and usage associated with your top cost-accruing AWS regions across different AWS accounts with detailed breakdown on all AWS accounts / regions
* Gain a better understanding of your cost trends.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Cost-Explorer-Region.png')} alt="cost explorer dashboard" />


### Services

**AWS Cost Explorer - Services** dashboard provides detailed information about cost and usage by operations performed by various Services in AWS accounts.

Use this dashboard to:
* Monitor and visualize the costs and usage associated with your top cost-accruing AWS services with detailed breakdown on all AWS services
* Gain a better understanding of your cost trends.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Cost-Explorer-Services.png')} alt="cost explorer dashboard" />

### Operations

**AWS Cost Explorer - Operations** dashboard provides detailed information about cost and usage by operations performed by various Services in AWS accounts.

Use this dashboard to:
* Monitor and visualize the costs and usage associated with your top cost-accruing operations performed on various AWS services with detailed breakdown on all operations across various AWS services
* Gain a better understanding of your cost trends.

<img src={useBaseUrl('img/integrations/amazon-aws/AWS-Cost-Explorer-Operations.png')} alt="cost explorer dashboard" />
