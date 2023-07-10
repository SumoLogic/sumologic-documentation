---
id: cse-aws-ec-inventory-source
title: CSE AWS EC2 Inventory Source
sidebar_label: CSE AWS EC2 Inventory
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/aws-ec2.svg')} alt="icon" width="50"/>

The CSE AWS EC2 Inventory Source provides a secure endpoint to receive event data from the [EC2 describe instances API](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeInstances.html). It securely stores the required authentication, scheduling, and state tracking information.

For information on how inventory data is used in Cloud SIEM Enterprise, see [Inventory Sources and Data](/docs/cse/administration/inventory-sources-and-data.md).

## Inventory data mapped

The table below shows the AWS source fields that CSE maps to CSE schema attributes.

| CSE schema attribute | AWS source field |
| :-- | :-- |
|`ip` |`PublicIpAddress`. If null, then `PrivateIpAddress`|
|`hostname` |`PublicDnsName`. If null, then `PrivateDnsName`|
|`uniqueId` | `AccountId` from `ARN-InstanceId` |

## Authentication

The [IAM policy](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-policies-for-amazon-ec2.html) needs the `ec2:DescribeInstances` and `ec2:DescribeImages` permissions.

## States

The CSE AWS EC2 Inventory Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

The CSE AWS EC2 Inventory Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with CSE AWS EC2 Inventory.
1. **Collecting**. The Source is actively collecting data from CSE AWS EC2 Inventory.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events) to investigate issues with collection. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

## Create a CSE AWS EC2 Inventory Source

When you create a CSE AWS EC2 Inventory Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a CSE AWS EC2 Inventory Source:

1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Select **AWS EC2 Inventory**.<br/>![EC2 inventory icon.png](/img/send-data/EC2-inventory-icon.png)
1. Enter a **Name** for the Source. The description is optional. <br/><img src={useBaseUrl('/img/send-data/AWS-EC2-input-pane.png')} alt="AWS EC2 input pane" style={{border: '1px solid black'}} width="400"/>
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to Cloud SIEM Enterprise. When configured with the **Forward to SIEM** option the following metadata fields are set:
    * `_siemVendor`: Amazon
    * `_siemProduct`: AWS EC2 Inventory
    * `_siemDataType`: Inventory
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **AWS Access**. The integration is configured for either role based AWS authentication or key based AWS authentication.
    - **Role Based Access**. AWS Role ARN is required for Role based Access. Use the information provided on the source page to configure the role.<br/><img src={useBaseUrl('/img/send-data/role-based.png')} alt="role-based" style={{border: '1px solid black'}} width="400"/>
    - **Key Access**. Enter the IAM user access key ID and secret key you want to use to authenticate collection requests.<br/><img src={useBaseUrl('/img/send-data/key-based.png')} alt="key-based" style={{border: '1px solid black'}} width="400"/>
1. **Regions**. Provide a list of AWS regions to query EC2 instances, such as `us-east-2`.
1. (Optional) The **Polling Interval** is set for 600 minutes by default, you can adjust it based on your needs.
1. **Processing Rules for Logs (Optional)**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule/).
1. When you are finished configuring the Source, click **Save**.

### Error types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}

### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| config | JSON Object | Yes | Contains the configuration parameters for the Source. | n/a |
| schemaRef | JSON Object | Yes | Use `{"type":"CSE AWS EC2 Inventory"}`. | not modifiable |
| sourceType | String | Yes | Use `Universal` for CSE AWS EC2 Inventory Source. | not modifiable |

### Config Parameters

The following table shows the ****config**** parameters.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the metadata field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM. | modifiable |
| `limitToRegions` | String array | Yes | | Provide a list of AWS regions to query EC2 instances, such as `us-east-2`. Use `["all"]` to support all regions. | modifiable |
|`authentication.type` | String | Yes | AWS Role Based Authentication | Select how Sumo Logic should access your AWS account. | modifiable |
|`authentication.roleARN` | String | Yes | |Provide the IAM Role ARN you want to use to authenticate collection requests. | modifiable |
|`authentication.awsId` | String | Yes | | Provide the IAM User access key ID you want to use to authenticate collection requests. | modifiable |
|`authentication.roleARN` | String | Yes | |Provide the Secret Key you want to use to authenticate collection requests. | modifiable |
|`polling_interval` | Integer | No | 600 | The minutes in between checks for new data. | modifiable |

### JSON Example

```json title="JSON example for Role Based Authentication"
{
  "api.version":"v1",
  "source":{
    "config":{
      "name":"AWS Inventory",
      "fields":{
        "_siemForward":true
      },
      "category":"aws/inventory",
      "limitToRegions":["all"],
      "authentication":{
        "type": "AWSRoleBasedAuthentication",
        "roleARN": "arn:aws:iam::9568827XXXX:role/C2C_EC2InventoryTest"
      },
      "polling_interval":600
    },
    "state":{
      "state":"Collecting"
    },
    "schemaRef":{
      "type":"CSE AWS EC2 Inventory"
    },
    "sourceType":"Universal"
  }
}
```

```json title="JSON example for Key Authentication"
{
  "api.version":"v1",
  "source":{
    "config":{
      "name":"AWS Inventory",
      "fields":{
        "_siemForward":true
      },
      "category":"aws/inventory",
      "limitToRegions":["all"],
      "authentication":{
        "type": "S3BucketAuthentication",
        "awsId": "XXXXXXSVHNHFXXXXXXX",
        "awsKey": "XXXXXtrrIqHvXgMYJEQcwLfEQtyNXXXXXXXX"
      },
      "polling_interval":600
    },
    "state":{
      "state":"Collecting"
    },
    "schemaRef":{
      "type":"CSE AWS EC2 Inventory"
    },
    "sourceType":"Universal"
  }
}
```
