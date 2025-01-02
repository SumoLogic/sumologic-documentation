---
id: cse-aws-ec-inventory-source
title: Cloud SIEM AWS EC2 Inventory Source
sidebar_label: Cloud SIEM AWS EC2 Inventory
tags:
  - cloud-to-cloud
  - cse-aws-ec-inventory
description: The Cloud SIEM AWS EC2 Inventory Source provides a secure endpoint to receive event data from the EC2 describe instances API.
---
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON1 from '/files/c2c/cse-aws-ec-inventory/example1.json';
import ExampleJSON2 from '/files/c2c/cse-aws-ec-inventory/example2.json';
import MyComponentSource1 from '!!raw-loader!/files/c2c/cse-aws-ec-inventory/example1.json';
import TerraformExample1 from '!!raw-loader!/files/c2c/cse-aws-ec-inventory/example1.tf';
import MyComponentSource2 from '!!raw-loader!/files/c2c/cse-aws-ec-inventory/example2.json';
import TerraformExample2 from '!!raw-loader!/files/c2c/cse-aws-ec-inventory/example2.tf';
import ForwardToSiem from '/docs/reuse/forward-to-siem.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/aws-ec2.svg')} alt="icon" width="50"/>

The Cloud SIEM AWS EC2 Inventory Source provides a secure endpoint to receive event data from the [EC2 describe instances API](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeInstances.html). It securely stores the required authentication, scheduling, and state tracking information.

For information on how inventory data is used in Cloud SIEM, see [Inventory Sources and Data](/docs/cse/administration/inventory-sources-and-data.md).

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 10 hours |  [Event data](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeInstances.html) |

## Setup

### Vendor configuration

#### Inventory data mapped

The table below shows the AWS source fields that Cloud SIEM maps to Cloud SIEM schema attributes.

| Cloud SIEM schema attribute | AWS source field |
| :-- | :-- |
|`ip` |`PublicIpAddress`. If null, then `PrivateIpAddress`|
|`hostname` |`PublicDnsName`. If null, then `PrivateDnsName`|
|`uniqueId` | `AccountId` from `ARN-InstanceId` |

#### Authentication

The [IAM policy](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-policies-for-amazon-ec2.html) needs the `ec2:DescribeInstances` and `ec2:DescribeImages` permissions.

### Source configuration

When you create a Cloud SIEM AWS EC2 Inventory Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a Cloud SIEM AWS EC2 Inventory Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Select **AWS EC2 Inventory**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. **Forward to SIEM**. Check the checkbox to forward your data to [Cloud SIEM](/docs/cse/). <br/><ForwardToSiem/>
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **AWS Access**. The integration is configured for either role based AWS authentication or key based AWS authentication.
    - **Role Based Access**. AWS Role ARN is required for Role based Access. Use the information provided on the source page to configure the role.<br/><img src={useBaseUrl('/img/send-data/role-based.png')} alt="role-based" style={{border: '1px solid gray'}} width="400"/>
    - **Key Access**. Enter the IAM user access key ID and secret key you want to use to authenticate collection requests.<br/><img src={useBaseUrl('/img/send-data/key-based.png')} alt="key-based" style={{border: '1px solid gray'}} width="400"/>
1. **Regions**. Provide a list of AWS regions to query EC2 instances, such as `us-east-2`.
1. (Optional) The **Polling Interval** is set for 600 minutes by default, you can adjust it based on your needs.
1. **Processing Rules for Logs (Optional)**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule/).
1. When you are finished configuring the Source, click **Save**.

## Metadata fields

| Field | Value | Description |
| :--- | :--- | :--- |
| `_siemVendor` | `Amazon` | Set when **Forward To SIEM** is checked. |
| `_siemProduct` | `AWS EC2 Inventory` | Set when **Forward To SIEM** is checked. |
| `_siemDataType` | `Inventory` | Set when **Forward To SIEM** is checked. |

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Cloud SIEM AWS EC2 Inventory"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| limitToRegions` | String array | Yes | | Provide a list of AWS regions to query EC2 instances, such as `us-east-2`. Use `["all"]` to support all regions. | modifiable |
| authentication.type | String | Yes | `null` | AWS Role Based Authentication | Select how Sumo Logic should access your AWS account. |  |
| authentication.roleARN | String | Yes | `null` | Provide the IAM Role ARN you want to use to authenticate collection requests. |  |
| authentication.awsId | String | Yes |`null` | Provide the IAM User access key ID you want to use to authenticate collection requests. |  |
| authentication.roleARN | String | Yes | `null` |Provide the Secret Key you want to use to authenticate collection requests. |  |
| polling_interval | Integer | No | 600 | The minutes in between checks for new data. |  |

### JSON example

<CodeBlock language="json">{MyComponentSource1}</CodeBlock>

<a href="/files/c2c/cse-aws-ec-inventory/example1.json" target="_blank">Download example</a>

<CodeBlock language="json">{MyComponentSource2}</CodeBlock>

<a href="/files/c2c/cse-aws-ec-inventory/example2.json" target="_blank">Download example</a>

### Terraform example

<CodeBlock language="json">{TerraformExample1}</CodeBlock>

<a href="/files/c2c/cse-aws-ec-inventory/example1.tf" target="_blank">Download example</a>

<CodeBlock language="json">{TerraformExample2}</CodeBlock>

<a href="/files/c2c/cse-aws-ec-inventory/example2.tf" target="_blank">Download example</a>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::