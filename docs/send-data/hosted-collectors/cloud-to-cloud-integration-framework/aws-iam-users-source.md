---
id: aws-iam-users-source
title: AWS IAM Users Source
sidebar_label: AWS IAM Users
tags:
  - cloud-to-cloud
  - aws-iam-users-source
description: Learn how to collect the IAM User Inventory logs from the AWS SDK and send them to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/misc/aws-iam-logo.png')} alt="logo" width="80" />

Amazon Web Services (AWS) is a leading cloud platform that offers scalable computing, storage, databases, AI/ML, and security solutions. Its global infrastructure and pay-as-you-go model support secure, high-performance application deployment for businesses of all sizes, driving digital transformation.

AWS IAM Users are individual identities within AWS Identity and Access Management (IAM) that you create to represent a person or service that interacts with your AWS resources.

## Data collected

The data will be collected from the OneLogin database using the following log:

| Polling Interval | Data |
| :--- | :--- |
| 12 hours | [ListUsers (IAM Service)](https://docs.aws.amazon.com/IAM/latest/APIReference/API_ListUsers.html) |

## Setup

### Vendor configuration

You can use the following authentication methods for accessing AWS services using the Go SDK:
- **[Method 1: Role Based Access (Recommended)](#method-1-role-based-access-recommended)**
- **[Method 2: Key Access](#method-2-key-access)**

#### Method 1: Role Based Access (Recommended)

To generate a Role ARN, you can click the dropdown and select one of the following options:
- Manually create an IAM Role. 
- Generate role-based access template.

#### Method 2: Key Access

To generate the AWS access ID and AWS access key, see [Create access keys for the root user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user_manage_add-key.html).

Once you have all the required values, set up the source configuration to collect your desired log types available in the configuration section.

### Source configuration

When you create a AWS IAM Users source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector and Source](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a AWS IAM Users source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **OneLogin**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists and is enabled in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist, or is disabled in the Fields table schema. In this case, you'll see an option to automatically add or enable the nonexistent fields to the Fields table schema. If a field is sent to Sumo Logic but isn’t present or enabled in the schema, it’s ignored and marked as **Dropped**.
1. **Regions**. Provide a list of AWS regions to query IAM users. Use ["all"] to support all regions. For example, `us-east-2`.
1. **AWS Access**. Select one of the following authentication methods for accessing AWS services using the Go SDK:
    - **[Method 1: Role Based Access (Recommended)](#vendor-configuration)**
    - **[Method 2: Key Access](#vendor-configuration)**
1. (Optional) **Path Prefix**. Provide the path prefix for filtering the results. It defaults to a slash (/), listing all user names.
1. **Polling Interval**. The polling interval is set for 12 hours by default and can be configured from a minimum of 1 hour to a maximum of 24 hours. You can adjust it based on your needs. This sets how often the source checks for new data.
1. **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [Use JSON to Configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{“type”: “AWS IAM Users”}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"` |
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| limitToRegions | []String | Yes | `null` | The list of AWS regions to query IAM users. Use ["all"] to support all regions. | `us-east-2` |
| authentication.type | String | Yes | `AWSRoleBasedAuthentication` | The method for Sumo Logic to access your AWS account. |  |
| authentication.roleARN | String | Yes | `null` | The IAM Role ARN you want to use to authenticate collection requests. |  |
| authentication.awsId | String | Yes | `null` | The IAM User access key ID you want to use to authenticate collection requests. |  |
| authentication.awsKey | String | Yes | `null` | The secret key you want to use to authenticate collection requests. |  |
| pathPrefix | String | No | `null` | The path prefix for filtering the results. It defaults to a slash (/), listing all user names. |  |
| pollingInterval | Integer | Yes | `12 hours` | Time interval (in hours) after which the source will check for new data.<br/>Min: 1 hour<br/>Max: 24 hours |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/aws-iam-users/example.json
```

### Terraform example

```sh reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/aws-iam-users/example.tf
```

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
