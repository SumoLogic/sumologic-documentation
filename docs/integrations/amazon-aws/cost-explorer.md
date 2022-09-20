---
id: cost-explorer
title: Sumo Logic App for AWS Cost Explorer
sidebar_label: AWS Cost Explorer
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/amazon-aws/costexplorer.png')} alt="Thumbnail icon" width="50"/>

[AWS Cost Explorer](https://aws.amazon.com/aws-cost-management/aws-cost-explorer) provides you with a set of default reports that you can use as the starting place for your analysis. From there, use the filtering and grouping capabilities to dive deeper into your cost and usage data and generate custom insights.

The Sumo Logic App for AWS Cost Explorer lets you visualize, understand, and manage your AWS costs and usage over time.

## Log Types

The **AWS Cost Explorer** App uses the JSON formatted logs collected using **AWS Cost Explorer **source.

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

The following query sample was taken from the **Cost by Region** panel on the** AWS Cost Explorer - Account** dashboard.

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

## Create an AWS Cost Explorer Source

When you create an AWS Cost Explorer collector Source, you add it to an existing Sumo Logic hosted collector. Before creating the Source, you'll need to add a Field-in-Field Schema, Field Extraction Rules, and [identify or create the hosted collector you want to use](/docs/Send-Data/Hosted-Collectors#Create-a-Hosted-Collector).


### Field-in-Field Schema

Log in to Sumo Logic, go to Manage Data > Logs > Fields. Search for the **account** and **linkedaccount** field. If not present, create it. Learn how to create and manage fields [here](/docs/Manage/Fields#manage-fields).


### Field Extraction Rules
Create a Field Extraction Rule (FER) for AWS Cost Explorer Logs. Learn how to create a Field Extraction Rule [here](/docs/Manage/Field-Extractions/Create-a-Field-Extraction-Rule).

* **Rule Name: **AWSCostExplorerFER
* **Applied at: **Ingest Time
* **Scope (Specific Data): **

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

1. On the **Manage Data > Collection > Collection** page, click **Add Source** next to a **Hosted **Collector.
2. Select **AWS Cost Explorer**. <br/> ![aws-cost-explorer-icon.png](/img/send-data/aws-cost-explorer-icon.png)
3. Enter a **Name** for the Source in the Sumo Logic console. The **Description** is optional.<br/>  ![awsCostExplorer-input.png](/img/integrations/amazon-aws/cost-explorer-v2-1-1.png)
4. For **Source Category** (Optional), enter any string to tag the output collected from the Source. Category [metadata](/docs/Search/Get-Started-with-Search/Search-Basics/Built-in-Metadata) is stored in a searchable field called `_sourceCategory`.
5. For [Fields](/docs/Manage/Fields), click the **+Add** link to add custom log metadata. Define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled, in the Fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema or is disabled it is ignored, known as dropped.<br/><br/>It is preferable to add an **account** field (for the dashboards) and assign it a friendly name to identify the corresponding AWS account.<br/> ![accountField.png](/img/send-data/accountField.png)
6. For the **AWS Access Key** and **AWS Secret Key**, provide the IAM User access key and secret key you want to use to authenticate collection requests.
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
7. For the **Enable Regions** field, provide the regions which need to be monitored for cost. The cost incurred across these regions will be fetched separately. The region list here includes all the standard AWS regions along with “global”. “Global” region includes services like Amazon CloudFront, Amazon Route 53, Amazon IAM. If the field is left empty (default behavior), then data will be fetched from all the enabled regions of the respective AWS account. It is recommended to provide only the regions which are actively used and need to be monitored for cost. This will save the AWS cost for running this source on unused regions.
8. For the **Cost Type**, provide supported cost types / MetricTypes. For details on the CostType, see Amazon's [Understanding your AWS Cost Datasets: A Cheat Sheet](https://aws.amazon.com/blogs/aws-cloud-financial-management/understanding-your-aws-cost-datasets-a-cheat-sheet/).
    * AmortizedCost
    * BlendedCost
    * NetAmortizedCost
    * NetUnblendedCost
    * UnblendedCost
9. For **Granularity**, provide 2 supported granularities for each of the MetricTypes (or cost types):
    * Daily Costs (Polled every 12h)
    * Monthly Costs (Polled every day)
10. Add **[Processing Rules](/docs/Manage/Collection/Processing-Rules)**.
11. Click **Submit** when complete.

It can take up to 48 hours for AWS to generate your billing data. For accuracy, Sumo Logic does not present any billing analysis for the previous 48-60 hours.


### States

The AWS Cost Explorer Source reports errors, its health, and initialization status. Other than indicating that the source is healthy, you are also informed, in real-time, if the source is running into trouble communicating with AWS API, or if there's an error that requires user action indicated by [Sumo Logic Health Events](/docs/Manage/Health-Events).

An AWS Cost Explorer Source goes through the following states when created:

1. **Pending**: Once the Source is submitted, details are stored and the source is placed in a **Pending** state.
2. **Started**: A collection task is created on the hosted collector.
3. **Initialized**: Task configuration is complete in Sumo Logic.
4. **Authenticated**: The Source has successfully authenticated with AWS
5. **Collecting**: The Source is actively collecting data from AWS accounts.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

![Health and Status columns.png](/img/send-data/health-status.png)

Hover your mouse over the status icon to view a tooltip with details on the detected issue.

![error status.png](/img/send-data/hover-status.png)

When you delete the source it is placed in a **Stopping** state, when it has successfully stopped it is deleted from your Hosted Collector.

On the Collection page, the [Health](/docs/Manage/Health-Events#Collection-page) and Status for Sources is displayed. Use [Health Events](/docs/Manage/Health-Events) to investigate issues with collection.


### Error types

When Sumo Logic detects an issue it is tracked by [Health Events](/docs/Manage/Health-Events). The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

<table><small>
  <tr>
   <td>Type
   </td>
   <td>Reason
   </td>
   <td>Retries
   </td>
   <td>Retry Behavior
   </td>
   <td>Health Event Name
   </td>
  </tr>
  <tr>
   <td>ThirdPartyConfig
   </td>
   <td>Normally due to an invalid configuration. You'll need to review your Source configuration and make an update.
   </td>
   <td>No retries are attempted until the Source is updated.
   </td>
   <td>Not applicable
   </td>
   <td>ThirdPartyConfigError
   </td>
  </tr>
  <tr>
   <td>ThirdPartyGeneric
   </td>
   <td>Normally due to an error communicating with the third party service APIs.
   </td>
   <td>Yes
   </td>
   <td>The Source will retry for up to 90 minutes, after which retries will be attempted every 60 minutes.
   </td>
   <td>ThirdPartyGenericError
   </td>
  </tr>
  <tr>
   <td>FirstPartyGeneric
   </td>
   <td>Normally due to an error communicating with the internal Sumo Logic APIs.
   </td>
   <td>Yes
   </td>
   <td>The Source will retry for up to 90 minutes, after which retries will be attempted every 60 minutes.
   </td>
   <td>FirstPartyGenericError
   </td>
  </tr></small>
</table>


### JSON Configuration

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/API/Collector). See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details.

<table><small>
  <tr>
   <td>Parameter
   </td>
   <td>Type
   </td>
   <td>Required
   </td>
   <td>Description
   </td>
   <td>Access
   </td>
  </tr>
  <tr>
   <td>config
   </td>
   <td>JSON Object
   </td>
   <td>Yes
   </td>
   <td>Contains the <a href="/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/salesforce-source#configParameters">configuration parameters</a> for the Source.
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>schemaRef
   </td>
   <td>JSON Object
   </td>
   <td>Yes
   </td>
   <td>Use <code>&#123;"type":"AWS Cost Explorer"&#125;</code> for an AWS Cost Explorer Source.
   </td>
   <td>Not modifiable
   </td>
  </tr>
  <tr>
   <td>sourceType
   </td>
   <td>String
   </td>
   <td>Yes
   </td>
   <td>Use Universal for an AWS Cost Explorer Source.</td>
   <td>Not modifiable
   </td>
  </tr></small>
</table>


The following table shows the **config** parameters for an AWS Cost Explorer Source.


<table><small>
  <tr>
   <td>Parameter
   </td>
   <td>Type
   </td>
   <td>Required
   </td>
   <td>Default
   </td>
   <td>Description
   </td>
   <td>Access
   </td>
  </tr>
  <tr>
   <td>name
   </td>
   <td>String
   </td>
   <td>Yes
   </td>
   <td>
   </td>
   <td>Type the desired name of the Source. The name must be unique per Collector. This value is assigned to the <a href="/docs/Search/Get-Started-with-Search/Search-Basics/Built-in-Metadata">metadata</a> field _source.</td>
   <td>modifiable
   </td>
  </tr>
  <tr>
   <td>description
   </td>
   <td>String
   </td>
   <td>No
   </td>
   <td>Null
   </td>
   <td>Type a description of the Source.
   </td>
   <td>modifiable
   </td>
  </tr>
  <tr>
   <td>category
   </td>
   <td>String
   </td>
   <td>No
   </td>
   <td>Null
   </td>
   <td>Type a category of the source. This value is assigned to the <a href="/docs/Search/Get-Started-with-Search/Search-Basics/Built-in-Metadata">metadata</a> field <code>_sourceCategory</code>. See <a href="/docs/send-data/best-practices">best practices</a> for details.
   </td>
   <td>modifiable
   </td>
  </tr>
  <tr>
   <td>fields
   </td>
   <td>JSON Object
   </td>
   <td>No
   </td>
   <td>
   </td>
   <td>JSON map of key-value fields (metadata) to apply to the Collector or Source.
<p>Use the string field account to tag the logs with friendly aws account name.</p>
   </td>
   <td>modifiable
   </td>
  </tr>
  <tr>
   <td>accessID
   </td>
   <td>String
   </td>
   <td>Yes
   </td>
   <td>
   </td>
   <td>Provide the AWS IAM User access key ID you want to use to authenticate collection requests.
   </td>
   <td>modifiable
   </td>
  </tr>
  <tr>
   <td>accessKey
   </td>
   <td>String
   </td>
   <td>Yes
   </td>
   <td>
   </td>
   <td>Provide the AWS Secret Key you want to use to authenticate collection requests.
   </td>
   <td>modifiable
   </td>
  </tr>
  <tr>
   <td>granularity
   </td>
   <td>String array
   </td>
   <td>Yes
   </td>
   <td>
   </td>
   <td>Provide a list, such as ["daily","monthly"]
   </td>
   <td>modifiable
   </td>
  </tr>
  <tr>
   <td>costMetrics
   </td>
   <td>String array
   </td>
   <td>Yes
   </td>
   <td>
   </td>
   <td>Provide a list, such as
<p><code>["AmortizedCost","BlendedCost","NetAmortizedCost",</code></p>
<p><code>"NetUnblendedCost","UnblendedCost"]</code></p>
   </td>
   <td>modifiable
   </td>
  </tr>
  <tr>
   <td>AWS Region
   </td>
   <td>String array
   </td>
   <td>No
   </td>
   <td>
   </td>
   <td>Provide a list, such as <code>["US East (Ohio)","US West (Oregon)"] </code></td>
   <td>modifiable
   </td>
  </tr></small>
</table>


AWS Cost Explorer Source JSON Example:

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
