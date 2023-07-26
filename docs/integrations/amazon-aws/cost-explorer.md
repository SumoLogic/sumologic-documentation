---
id: cost-explorer
title: AWS Cost Explorer
description: The Sumo Logic App for AWS Cost Explorer lets you visualize, understand, and manage your AWS costs and usage over time.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src='https://s3.amazonaws.com/app_icons/AWS_Cost_Explorer.png' alt="icon" width="50"/>

[AWS Cost Explorer](https://aws.amazon.com/aws-cost-management/aws-cost-explorer) provides you with a set of default reports that you can use as the starting place for your analysis. From there, use the filtering and grouping capabilities to dive deeper into your cost and usage data and generate custom insights.

The Sumo Logic App for AWS Cost Explorer lets you visualize, understand, and manage your AWS costs and usage over time.

## Log Types

The **AWS Cost Explorer** App uses the JSON formatted logs collected using **AWS Cost Explorer** source.

### Sample Log

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

### Sample Query

The following query sample was taken from the **Cost by Region** panel on the **AWS Cost Explorer - Account** dashboard.

```sql
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

When you create an AWS Cost Explorer collector Source, you add it to an existing Sumo Logic hosted collector. Before creating the Source, you'll need to add a Field-in-Field Schema, Field Extraction Rules, and [identify or create the hosted collector you want to use](/docs/send-data/hosted-collectors#Create-a-Hosted-Collector).

## Field-in-Field Schema

Log in to Sumo Logic, go to Manage Data > Logs > Fields. Search for the **account** and **linkedaccount** field. If not present, create it. Learn how to create and manage fields [here](/docs/manage/fields#manage-fields).

## Field Extraction Rules
Create a Field Extraction Rule (FER) for AWS Cost Explorer Logs. Learn how to create a Field Extraction Rule [here](/docs/manage/field-extractions/create-field-extraction-rule).

* **Rule Name:** AWSCostExplorerFER
* **Applied at:** Ingest Time
* **Scope (Specific Data):**
  ```sql
  account = * region CostUsd CostType StartDate EndDate MetricType Granularity Service LinkedAccount
  ```
* **Parse Expression:** Enter a parse expression to create an “account” field that maps to the alias you set for each sub account. For example, if you used the “securityprod” alias for an AWS account with ID "123456789" and the “infraprod” alias for an AWS account with ID "987654321", your parse expression would look like:
  ```sql
  json "LinkedAccount"
  | if (LinkedAccount = "123456789",  "securityprod", LinkedAccount ) as LinkedAccount
  | if (LinkedAccount = "987654321",  "infraprod", LinkedAccount ) as LinkedAccount
  ```

## Configure an AWS Cost Explorer Source

{@import ../../reuse/aws-cost-explorer.md}

## Installing the AWS Cost Explorer App

Now that you have set up a collection for AWS Cost Explorer, install the Sumo Logic App to use the pre-configured dashboards that provide visibility into your environment for real-time analysis of overall usage.

1. Locate and install the app you need from the App Catalog. If you want to see a preview of the dashboards included with the app before installing, click Preview Dashboards.
2. From the App Catalog, search for AWS Cost Explorer and select the app.
3. To install the app, click Add to Library and complete the following fields.
   * App Name. You can retain the existing name, or enter a name of your choice for the app. 
   * Advanced. Select the Location in the Library (the default is the Personal folder in the library), or click New Folder to add a new folder.
4. Click Add to Library.

Once an app is installed, it will appear in your Personal folder, or another folder that you've specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.

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
