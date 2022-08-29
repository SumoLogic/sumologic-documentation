---
id: cost-explorer
title: Sumo Logic App for AWS Cost Explorer (Beta)
sidebar_label: AWS Cost Explorer (Beta)
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

<img src={useBaseUrl('img/integrations/amazon-aws/costexplorer.png')} alt="Thumbnail icon" width="50"/>

[AWS Cost Explorer](https://aws.amazon.com/aws-cost-management/aws-cost-explorer/) provides you with a set of default reports that you can use as the starting place for your analysis. From there, use the filtering and grouping capabilities to dive deeper into your cost and usage data and generate custom insights.

The Sumo Logic App for AWS Cost Explorer lets you visualize, understand, and manage your AWS costs and usage over time.

## Before You Begin

This feature is in Beta. To participate, contact your Sumo account executive.

## Log Types
The AWS Cost Explorer App uses the JSON formatted logs collected using AWS Cost Explorer source.

```json
{"Timestamp":1647129599999,"Estimated":true,"Service":"AmazonCloudWatch","Operation":"PutLogEvents","region":"us-east-1","StartDate":"2022-03-12","EndDate":"2022-03-13","CostUsd":0.1326919963,"MetricType":"UnblendedCost","Granularity":"Monthly","CostType":"cost_service_operation_region_UnblendedCost_Monthly"}
```

### Sample Query

The following query sample was taken from the Cost by Region panel on the AWS Cost Explorer - Account dashboard.

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


## Collecting Logs and Metrics

See [AWS Cost Explorer Source (Beta)](/docs/send-data/sources/hosted-collectors/cloud-to-cloud-integration-framework/aws-cost-explorer-source).


## Installing the AWS Cost Explorer App

Now that you have set up a [log collection](https://help.sumologic.com/Beta/Cloud-to-Cloud_Integration_Framework/AWS_Cost_Explorer/Create_a_AWS_Cost_Explorer_Collector_Source), you can install the Sumo Logic **AWS Cost Explorer App** and use its pre-configured dashboards.

1. Download the [AWS_Cost_Explorer.json](https://s3.amazonaws.com/app.scripts/AWS_Cost_Explorer.json) file.
2. Import into the Sumo Logic Library folder of your choice.
3. Once an app json is imported, it will appear in your **Personal** folder, or other folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.

## Viewing AWS Cost Explorer Dashboards

This section provides examples and descriptions for each of the AWS Cost Explorer pre-configured dashboards.


### AWS Cost Explorer - Account

**AWS Cost Explorer - Account** dashboard provides detailed information about cost and usage by different AWS accounts.

Use this dashboard to:
* Monitor and visualize the costs and usage associated with your top cost-accruing AWS accounts detailed breakdown on all AWS accounts
* Gain a better understanding of your cost trends.



### AWS Cost Explorer - Region

**AWS Cost Explorer - Region** dashboard provides detailed information about cost and usage by different AWS Regions within AWS accounts.

Use this dashboard to:
* Monitor and visualize the costs and usage associated with your top cost-accruing AWS regions across different AWS accounts with detailed breakdown on all AWS accounts / regions
* Gain a better understanding of your cost trends.




### AWS Cost Explorer - Services

**AWS Cost Explorer - Services** dashboard provides detailed information about cost and usage by operations performed by various Services in AWS accounts.

Use this dashboard to:
* Monitor and visualize the costs and usage associated with your top cost-accruing AWS services with detailed breakdown on all AWS services
* Gain a better understanding of your cost trends.




### AWS Cost Explorer - Operations

**AWS Cost Explorer - Operations** dashboard provides detailed information about cost and usage by operations performed by various Services in AWS accounts.

**Use this dashboard to:
* Monitor and visualize the costs and usage associated with your top cost-accruing operations performed on various AWS services with detailed breakdown on all operations across various AWS services
* Gain a better understanding of your cost trends.
