---
id: aws-cost-explorer-source
---

# AWS Cost Explorer Source

The AWS Cost Explorer Source collects cost and usage reports from [AWS Cost Explorer](https://aws.amazon.com/aws-cost-management/aws-cost-explorer/). You have the option to collect from one or more specific [AWS cost types](https://docs.aws.amazon.com/cost-management/latest/userguide/ce-exploring-data.html) and set how often reports are collected.

:::note
This feature is in Beta. To participate, contact your Sumo account executive.
:::

## Create an AWS Cost Explorer Source

When you create an AWS Cost Explorer collector Source, you add it to an existing Sumo Logic hosted collector. Before creating the Source, identify the hosted collector you want to use or simply create a new hosted collector. For further instructions, see [Create a Hosted Collector](../../../hosted-collectors.md).

To configure an AWS Cost Explorer Source:

1. On the **Manage Data \> Collection \> Collection** page, click **Add Source** next to a **Hosted** Collector.

1. Select **AWS Cost Explorer**.

    ![aws-cost-explorer-icon.png](/img/send-data/aws-cost-explorer-icon.png)

1. Enter a **Name** for the Source in the Sumo Logic console. The **Description** is optional.

    ![awsCostExplorer-input.png](/img/send-data/awsCostExplorer-input.png)

1. For **Source Category** (Optional), enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `\_sourceCategory`.

1. **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.

   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema. 
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.  

    It's recommended to add an **account** field and assign it a friendly name to identify the corresponding AWS account.

    ![accountField.png](/img/send-data/accountField.png)

1. For the **AWS Access Key** and **AWS Secret Key**, provide the IAM User access key and secret key you want to use to authenticate collection requests. See how to [grant access](../amazon-web-services/grant-access-aws-product.md) to an AWS product for details.

1. For the **Cost Type**, select one or more of the following types to collect. For details on the types, see Amazon's [Understanding your AWS Cost Datasets: A Cheat Sheet](https://aws.amazon.com/blogs/aws-cloud-financial-management/understanding-your-aws-cost-datasets-a-cheat-sheet/) and [Exploring your data using Cost Explorer](https://docs.aws.amazon.com/cost-management/latest/userguide/ce-exploring-data.html).

   * AmortizedCost 
   * BlendedCost 
   * NetAmortizedCost
   * NetUnblendedCost 
   * UnblendedCost

1. For **Granularity**, select one or both of the available time intervals to pull data.

   * Daily Costs (Polled every 12h) 
   * Monthly Costs (Polled every day)

1. **Processing Rules**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in Create a Processing Rule.

1. Click **Submit** when complete.

## States

The AWS Cost Explorer Source reports errors, its health, and initialization status. Other than indicating that the source is healthy, you are also informed, in real-time, if the source is running into trouble communicating with AWS API, or if there's an error that requires user action indicated by Sumo Logic Health Events.

An AWS Cost Explorer Source goes through the following states when
created:

1. **Pending**: Once the Source is submitted, details are stored and the source is placed in a **Pending** state.
1. **Started**: A collection task is created on the hosted collector.
1. **Initialized**: Task configuration is complete in Sumo Logic.
1. **Authenticated**: The Source has successfully authenticated with AWS
1. **Collecting**: The Source is actively collecting data from AWS accounts.

If the Source has any issues during any one of these states it is placed in an **Error** state.

![Health and Status columns.png](/img/send-data/health-status.png)

Hover your mouse over the status icon to view a tooltip with details on the detected issue.

![error status.png](/img/send-data/hover-status.png)

When you delete the source it is placed in a **Stopping** state, when it has successfully stopped it is deleted from your Hosted Collector.

On the Collection page, the [Health](../../../../manage/health-events.md) and Status for Sources is displayed. Use [Health Events](../../../../manage/health-events.md) to investigate issues with collection.

## Error types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|--|--|--|--|--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs. | Yes | The Source will retry for up to 90 minutes, after which retries will be attempted every 60 minutes. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry for up to 90 minutes, after which retries will be attempted every 60 minutes. | FirstPartyGenericError |

## JSON Configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/sources/use-json-configure-sources) for details.

| Parameter  | Type | Required | Description | Access |
|--|--|--|--|--|
| config | JSON Object | Yes | Contains the [configuration parameters](Salesforce_Source.md) for the Source. |   |
| schemaRef  | JSON Object | Yes | Use `{"type":"AWS Cost Explorer"} ` for an AWS Cost Explorer Source. | Not modifiable |
| sourceType | String | Yes | Use Universal for an AWS Cost Explorer  Source.   | Not modifiable |

The following table shows the **config** parameters for an AWS Cost
Explorer Source.

| Parameter | Type | Required? | Default |Description | Access|
|-------------------|----------|----|------|-----------|----------------|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the [metadata](/05Search/Get-Started-with-Search/Search-Basics/Built-in-Metadata) field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](../../../../search/get-started-with-search/search-basics/built-in-metadata.md) field `_sourceCategory`. See [best practices](../../../design-deployment/best-practices-source-categories.md) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the field `account` to tag logs with a friendly AWS account name. | modifiable |
| accessID | String | Yes |  | Provide the AWS IAM User access key ID you want to use to authenticate collection requests. | modifiable | 
| accessKey | String | Yes |  | Provide the AWS Secret Key you want to use to authenticate collection requests. | modifiable |
| granularity | String | array | Yes |  | Provide a comma separated list, such as ["daily","monthly"] | modifiable |
| costMetrics | String | array | Yes |  | Provide a comma separated list, such as `["AmortizedCost","BlendedCost","NetAmortizedCost", "NetUnblendedCost","UnblendedCost"]`  | modifiable |

AWS Cost Explorer Source JSON Example:

```json
{
    "api.version": "v1",
    "source": {
        "schemaRef": {
            "type": "AWS Cost Explorer"
        },
        "config": {
            "accessID": "********",
            "name": "billing",
            "description": "billing",
            "fields": {
                "_siemForward": false,
                "account": "prod"
            },
            "accessKey": "********",
            "granularity": ["daily", "monthly"],
            "costMetrics": ["AmortizedCost", "BlendedCost", "NetAmortizedCost", "NetUnblendedCost", "UnblendedCost"],
            "category": "aws/billing"
        },
        "state": {
            "state": "Collecting"
        },
        "sourceType": "Universal"
    }
}
```
