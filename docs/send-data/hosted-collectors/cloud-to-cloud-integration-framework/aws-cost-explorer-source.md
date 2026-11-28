---
id: aws-cost-explorer-source
title: AWS Cost Explorer Source
sidebar_label: AWS Cost Explorer
keywords:
  - cloud-to-cloud
  - aws-cost-explorer
description: Learn how to retrieve cost and usage data from AWS Cost Explorer into the Sumo Logic environment.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src='https://s3.amazonaws.com/app_icons/AWS_Cost_Explorer.png' alt="AWS Cost Explorer icon" width="50"/>

The Sumo Logic source for AWS Cost Explorer collects daily cost and usage data from [AWS Cost Explorer](https://aws.amazon.com/aws-cost-management/aws-cost-explorer/). You choose how the cost is broken down (for example by service and account, or by service and region), which [cost metrics](https://docs.aws.amazon.com/cost-management/latest/userguide/ce-exploring-data.html) to collect, and how often the source polls.

:::important
AWS charges **$0.01 for each Cost Explorer API request**, and most settings on this Source change the number of requests. Review [AWS API cost](#aws-api-cost) before you enable more than the default cost groupings or load a long history.
:::

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 12 hours (default) or 24 hours | [GetCostAndUsage (AWS Cost Explorer)](https://docs.aws.amazon.com/aws-cost-management/latest/APIReference/API_GetCostAndUsage.html) |

The Source collects daily cost. It does not collect forecasts, anomalies, budgets, or Reserved Instance and Savings Plans data.

## Setup

### Vendor configuration

Before you create the Source, complete the following in AWS.

#### Enable Cost Explorer

Cost Explorer must be turned on in the AWS account. In the AWS console, go to **Billing and Cost Management > Cost Explorer** and enable it. The first time you enable it, AWS can take up to 24 hours to prepare your data.

#### Choose the AWS account

* To collect cost for all linked accounts of an AWS Organization, create the role or IAM user in the **management account**.
* A role or IAM user in a member account only sees the cost of that account.

#### Permissions

The Source needs one read-only permission, `ce:GetCostAndUsage`. Attach the following policy to the IAM role or IAM user that the Source uses:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ce:GetCostAndUsage"
      ],
      "Resource": "*"
    }
  ]
}
```

Cost Explorer does not support resource-level permissions, so you need to set `Resource` to `"*"`.

#### Cost allocation tags (optional)

To group cost by a tag, activate the tag first in **Billing and Cost Management > Cost allocation tags**. Activation can take up to 24 hours and is not retroactive, so days before the activation show as untagged.

#### Authentication

You can use one of the following methods to give the Source access to AWS:
- **[Method 1: Role-based access (recommended)](#method-1-role-based-access-recommended)**
- **[Method 2: Key access](#method-2-key-access)**

##### Method 1: Role-based access (recommended)

Role-based access uses temporary credentials, so there is no long-term secret to store or rotate. You can either create the role automatically with a CloudFormation template that Sumo Logic generates, or create it manually. For both procedures, see [Grant Access to an AWS Product](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product).

In the **AWS Access** section of the Source, select **Role-based access**, then choose one of the following:
* **Generate role-based access template**. Download the CloudFormation template, create a stack from it in your AWS account, and copy the role ARN from the stack **Outputs**.
* **Manually create an IAM Role**. Create a role that has the policy above and the following trust relationship:

  ```json
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": { "AWS": "arn:aws:iam::926226587429:root" },
        "Action": "sts:AssumeRole",
        "Condition": {
          "StringEquals": { "sts:ExternalId": "<DEPLOYMENT>:<ORG_ID>" }
        }
      }
    ]
  }
  ```

  Replace `<DEPLOYMENT>:<ORG_ID>` with your Sumo Logic deployment and organization ID, for example `us1:000000905A`. See [Grant Access to an AWS Product](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product) for how to find them.

If you use a generated template, check that the External ID in it is the one shown for your organization. A wrong External ID causes a credentials error in the Source status.

##### Method 2: Key access

1. In AWS, create a dedicated IAM user and attach only the policy above. Do not reuse a personal user.
1. Create an access key for that user and store the secret safely. AWS shows it only once. See [Create access keys](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).
1. Enter the **Access Key ID** and **Secret Access Key** in the Source.

Only long-term access keys (starting with `AKIA`) are supported. Temporary credentials (starting with `ASIA`) are not supported. Rotate the key regularly.

### Source configuration

When you create an AWS Cost Explorer Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure an AWS Cost Explorer Source:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic main menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **AWS Cost Explorer**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="Green check circle" width="20"/> A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="Orange exclamation point" width="20"/> An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic but isn’t present or enabled in the schema, it’s ignored and marked as **Dropped**.
1. **AWS Access**. Select **Role-based access** (recommended) and enter the **Role ARN**, or select **Key access** and enter the **Access Key ID** and **Secret Access Key**. See [Authentication](#authentication).
1. **Cost Data**.
   * **Cost Groupings**. Select how the cost is broken down. Each grouping is a separate series of paid AWS requests and a full view of the same total cost, so do not add groupings together. The default is **Service by account** and **Service by region**.

     | Grouping | `grouping` value | Use it to see |
     |:--|:--|:--|
     | Service by account | `SERVICE,LINKED_ACCOUNT` | Which accounts spend on which services. |
     | Service by region | `SERVICE,REGION` | Which regions spend on which services. |
     | Service by usage type (high volume) | `SERVICE,USAGE_TYPE` | The detail behind a service. A usage type is the specific kind of usage AWS bills for, such as `BoxUsage:m5.large` or `DataTransfer-Out-Bytes`. |
     | Service by purchase type | `SERVICE,PURCHASE_TYPE` | On-demand, reserved and Savings Plans spend. |
     | Account by charge type (credits, refunds, tax) | `LINKED_ACCOUNT,RECORD_TYPE` | Credits, refunds, tax and support fees per account. |
     | Service by operation (high volume) | `SERVICE,OPERATION` | The detail behind a service by API operation. |
     | Instance type by region | `INSTANCE_TYPE,REGION` | Instance types per region. Only services that have instance types, such as EC2 and RDS, return data. |

     Service by usage type and Service by operation produce the most records and the most AWS requests.
   * **Cost Metrics**. Select one or more of **Unblended Cost**, **Amortized Cost**, **Blended Cost**, **Net Unblended Cost** and **Net Amortized Cost**. The default is Unblended Cost and Amortized Cost. For details, see Amazon's [Understanding your AWS Cost Datasets: A Cheat Sheet](https://aws.amazon.com/blogs/aws-cloud-financial-management/understanding-your-aws-cost-datasets-a-cheat-sheet/). All selected metrics share one AWS request, so more metrics add records in Sumo Logic but do not raise your AWS bill.
   * **Group Cost by Tags**. Select to also collect cost by service and cost allocation tag. Enter the **Tag Keys** as a comma-separated list, for example `team,project`. You can enter up to 10 keys. Keys are case-sensitive and each key must already be activated in AWS Billing. Each key is one more series of paid requests.
1. (Optional) **Filters**. Use these to collect only part of your cost.
   * **Only These Accounts**. A comma-separated list of 12-digit account IDs (up to 100), for example `111111111111,222222222222`. Leave empty for all accounts.
   * **Only These Regions**. Select the regions to include. Leave empty for all regions, including global and no-region cost. Select `global` for global services such as Amazon CloudFront, Amazon Route 53 and AWS IAM, and `NoRegion` for cost that belongs to no region.

   The filters apply to every cost grouping. Filtered totals do not match the AWS console. There is no filter by service, because the list of AWS services is not fixed. To narrow by service, use the `service` field in your queries.
1. **History and Polling**.
   * **History (days)**. How many days of history to collect when the Source starts, from 0 to 395 (about 13 months, the Cost Explorer limit). The default of 0 collects only the most recent 7 days. See [Backfill](#backfill).
   * **Polling Interval**. Select **Every 12 hours** (default) or **Every 24 hours**. A 24-hour interval halves the number of AWS requests.
1. (Optional) **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Save**.

## AWS API cost

AWS charges **$0.01 per Cost Explorer API request**, and each page of results is one request. The Source makes at least one series of requests for every cost grouping and tag key, on every poll. To estimate your monthly AWS cost:

(number of groupings × pages per grouping) × polls per day × 30 × $0.01

For example, with the two default groupings, three pages each and a 12-hour interval, that is 6 × 2 × 30 × $0.01, about $3.60 per month. Adding one tag key makes it about $5.40 per month. The number of pages depends on the size of your organization, so treat this as a rough guide.

| Setting | Effect on AWS requests |
|:--|:--|
| Cost Groupings | Each grouping you remove saves one series of requests per poll. |
| Group Cost by Tags and Tag Keys | One more series of requests per key, per poll. |
| Polling Interval | 24 hours halves the requests compared with 12 hours. |
| Only These Accounts and Only These Regions | Fewer groups, so usually fewer pages per request. |
| History (days) | A one-time cost when the Source starts, and again when a grouping or tag key is added. |
| Cost Metrics | No effect. All metrics share one request. |

The Source also fetches the whole previous month once a month, which adds about one series of requests per grouping per month.

## How the data is collected

### Rolling window

Cost Explorer restates recent days: it marks them as estimated and applies credits, refunds and adjustments later. To pick up these changes, every poll fetches from 7 days before the last day it collected, up to yesterday (UTC). The current UTC day is never requested, because its data is incomplete. The newest cost you see is therefore always from the previous UTC day or earlier.

The Source drops records that did not change since it last sent them, so only new and changed values are sent. The record of what was sent is kept in memory only. After a restart, upgrade or crash, the 7-day window is sent once more.

### Monthly reconciliation

On the 5th of each month (UTC), or on the first poll after it, the Source fetches the whole previous month again and sends it without dropping unchanged records. This delivers the final numbers after invoices, credits, refunds and tax settle. Those records appear twice in Sumo Logic, so use the latest `collected_at` per `record_key` in your queries.

Adjustments that AWS applies to a month after it closes, for a day older than 7 days, are not collected. A month total in Sumo Logic can differ slightly from the AWS console.

### Backfill

Backfill collects history and runs only in these cases. It does not run again on a normal restart.
* When the Source is first created, or when a cost grouping or tag key is added or switched on again. A grouping that was switched off loses its saved progress.
* When you raise **History (days)**. Only the missing older days are collected.

Lowering **History (days)**, or changing any other setting such as filters or the polling interval, does not start a backfill. History is collected in chunks of 30 days and its progress is saved, so a restart continues where it stopped.

If you widen a filter, for example by adding an account or region, only the last 7 days are collected for what was added. Older history for it is not collected. To get it, create a new Source with **History (days)** set.

## Data format

Each message is one JSON record for one group, one metric and one day. Credits and refunds are kept as negative amounts, and zero amounts are kept so that a charge refunded to zero reaches Sumo Logic. Every record has the same fields regardless of the grouping. Fields that do not belong to the grouping are empty strings.

```json
{
  "record_type": "cost_usage",
  "grouping": "SERVICE,LINKED_ACCOUNT",
  "record_key": "cost_usage|SERVICE,LINKED_ACCOUNT|UnblendedCost|Amazon Elastic Compute Cloud - Compute|123456789012|||||||||2026-10-28",
  "time_period_start": "2026-10-28",
  "time_period_end": "2026-10-29",
  "metric": "UnblendedCost",
  "amount": 42.1873,
  "unit": "USD",
  "estimated": true,
  "request_id": "a1b2c3d4-0000-0000-0000-000000000000",
  "service": "Amazon Elastic Compute Cloud - Compute",
  "account_id": "123456789012",
  "account_name": "prod-account",
  "region": "",
  "usage_type": "",
  "purchase_type": "",
  "charge_type": "",
  "operation": "",
  "instance_type": "",
  "tag_key": "",
  "tag_value": "",
  "collected_at": "2026-10-30T06:00:12Z"
}
```

| Field | Description |
|:--|:--|
| `record_type` | Always `cost_usage`. |
| `grouping` | The cost grouping that produced the record. |
| `record_key` | Identifies the fact the record states. It does not change when the amount changes, so every restated value of the same day, group and metric has the same key. |
| `time_period_start`, `time_period_end` | The day the record covers. `time_period_start` is also the event timestamp in Sumo Logic, not the time of ingestion. |
| `metric`, `amount`, `unit` | The cost metric, its value and the currency. |
| `estimated` | The flag from AWS. `true` means the day is not final yet. |
| `request_id` | The AWS request ID of the Cost Explorer page that returned the record. Give it to AWS support to trace a request. |
| `collected_at` | When the Source fetched the record. |
| `service`, `account_id`, `account_name`, `region`, `usage_type`, `purchase_type`, `charge_type`, `operation`, `instance_type`, `tag_key`, `tag_value` | The group dimensions. Only those that belong to the grouping are filled. `charge_type` holds the AWS record type, such as `Usage`, `Credit`, `Refund` or `Tax`. For a tag grouping, cost with no value for the tag has an empty `tag_value`. |

### Querying the data

* Each grouping is a full view of the same cost. Always filter on one `grouping`, or the totals are counted several times.
* A restated or repeated value arrives as a new record next to the old one. To get the current value, take the latest `collected_at` for each `record_key`.
* The event timestamp is the cost day, which is in the past. A value restated for an earlier day appears in a search over that day, not in a search over the last few minutes.
* `estimated` is only refreshed for days inside the 7-day window. A day older than that keeps `estimated: true` even after its month closes, so do not use it to decide whether a number is final.

## Limitations

* Cost Explorer refreshes its data at least once every 24 hours, and some data arrives later. Days of the open month are estimates.
* Cost Explorer returns pre-aggregated data, so you cannot drill below the groupings you collect. For line-item detail, use AWS Cost and Usage Reports with an S3 source.
* A maximum of 13 months of history is available, and only daily granularity is supported.
* Only the seven built-in groupings and up to 10 tag keys are available. Custom combinations are not.
* The linked-account groupings return all accounts only when the credentials belong to the management account.
* Filter values are not checked against AWS when you save the Source. An account ID or region with no cost returns nothing.
* If the saved state of the Source is lost, the Source collects the history again and sends that range once more.

:::note
Problems with credentials, permissions, or Cost Explorer not being enabled are not detected when you save the Source. They appear in the Source status after the first poll.
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
| description | String | No | `null` | Type a description of the source. | `"Testing source"` |
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"` |
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | `{"_siemForward": false, "fieldA": "valueA"}` |
| authentication | JSON Object | Yes | `{"type": "AWSRoleBasedAuthentication"}` | How the Source accesses AWS. See [Authentication parameters](#authentication-parameters). | `{"type": "AWSRoleBasedAuthentication", "roleARN": "arn:aws:iam::123456789012:role/SumoCostExplorerRole"}` |
| groupings | String array | No | `["SERVICE,LINKED_ACCOUNT", "SERVICE,REGION"]` | The cost groupings to collect. Allowed values: `SERVICE,LINKED_ACCOUNT`, `SERVICE,REGION`, `SERVICE,USAGE_TYPE`, `SERVICE,PURCHASE_TYPE`, `SERVICE,OPERATION`, `LINKED_ACCOUNT,RECORD_TYPE` and `INSTANCE_TYPE,REGION`. Each grouping is a separate series of paid AWS requests. | `["SERVICE,LINKED_ACCOUNT", "SERVICE,REGION"]` |
| metrics | String array | No | `["UnblendedCost", "AmortizedCost"]` | The cost metrics to collect. Allowed values: `UnblendedCost`, `AmortizedCost`, `BlendedCost`, `NetUnblendedCost` and `NetAmortizedCost`. At least one is required. | `["UnblendedCost", "AmortizedCost"]` |
| enableTagGrouping | Boolean | No | `false` | Collect additional cost groupings by cost allocation tag, each combined with the service. | `true` |
| tagKeys | String | Yes, if `enableTagGrouping` is `true` | `null` | Comma-separated cost allocation tag keys. Up to 10 keys, each up to 128 characters. Keys are case-sensitive and must be activated in AWS Billing. | `"team,project"` |
| filterAccountIds | String | No | `null` | Only include these linked accounts. Comma-separated 12-digit account IDs, up to 100. | `"111111111111,222222222222"` |
| filterRegions | String array | No | `null` | Only include these regions. Allowed values: the commercial AWS regions, such as `us-east-1`, plus `global` and `NoRegion`. | `["us-east-1", "global"]` |
| backfillDays | Integer | No | `0` | The number of days of history to collect when the Source starts, from 0 to 395. See [Backfill](#backfill). | `30` |
| pollingIntervalHour | String | No | `"12h"` | How often the Source polls. Allowed values: `12h` and `24h`. | `"24h"` |

#### Authentication parameters

| Parameter | Type | Required | Description | Example |
|:---|:---|:---|:---|:---|
| authentication.type | String | Yes | `AWSRoleBasedAuthentication` for an IAM role (default, recommended), or `S3BucketAuthentication` for an access key and secret. The second value keeps the name of the shared AWS access type, although it is not specific to S3. | `"AWSRoleBasedAuthentication"` |
| authentication.roleARN | String | Yes, if the type is `AWSRoleBasedAuthentication` | The ARN of the IAM role in your AWS account. | `"arn:aws:iam::123456789012:role/SumoCostExplorerRole"` |
| authentication.awsId | String | Yes, if the type is `S3BucketAuthentication` | The access key ID of the IAM user. It must be a long-term key. | `"AKIAIOSFODNN7EXAMPLE"` |
| authentication.awsKey | String | Yes, if the type is `S3BucketAuthentication` | The secret access key of the IAM user. It is write-only and is never returned. | `"********"` |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/aws-cost-explorer/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/aws-cost-explorer/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
