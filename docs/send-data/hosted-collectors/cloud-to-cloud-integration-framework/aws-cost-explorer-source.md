---
id: aws-cost-explorer-source
title: AWS Cost Explorer Source
sidebar_label: AWS Cost Explorer
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src='https://s3.amazonaws.com/app_icons/AWS_Cost_Explorer.png' alt="icon" width="50"/>

The AWS Cost Explorer Source collects cost and usage reports from [AWS Cost Explorer](https://aws.amazon.com/aws-cost-management/aws-cost-explorer/). You have the option to collect from one or more specific [AWS cost types](https://docs.aws.amazon.com/cost-management/latest/userguide/ce-exploring-data.html) and set how often reports are collected.

## Create an AWS Cost Explorer Source

When you create an AWS Cost Explorer collector Source, you add it to an existing Sumo Logic hosted collector. Before creating the Source, identify the hosted collector you want to use or simply create a new hosted collector. For further instructions, see [Create a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

{@import ../../../reuse/aws-cost-explorer.md}

:::note
It can take up to 48 hours for AWS to generate your billing data. For accuracy, Sumo Logic does not present any billing analysis for the previous 48-60 hours.
:::

### States

The AWS Cost Explorer Source reports errors, its health, and initialization status. Other than indicating that the source is healthy, you are also informed, in real-time, if the source is running into trouble communicating with AWS API, or if there's an error that requires user action indicated by [Sumo Logic Health Events](/docs/manage/health-events).

An AWS Cost Explorer Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, details are stored and the source is placed in a **Pending** state.
2. **Started**. A collection task is created on the hosted collector.
3. **Initialized**. Task configuration is complete in Sumo Logic.
4. **Authenticated**. The Source has successfully authenticated with AWS
5. **Collecting**. The Source is actively collecting data from AWS accounts.

If the Source has any issues during any one of these states, it is placed in an **Error** state.<br/>![Health and Status columns.png](/img/send-data/health-status.png)

Hover your mouse over the status icon to view a tooltip with details on the detected issue.<br/>![error status.png](/img/send-data/hover-status.png)

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the [Health](/docs/manage/health-events#Collection-page) and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events) to investigate issues with collection.


### Error types

When Sumo Logic detects an issue it is tracked by [Health Events](/docs/manage/health-events). The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

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

Sources can be configured using UTF-8 encoded JSON files with the [Collector Management API](/docs/api/collector-management). See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details.

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
   <td>Type the desired name of the Source. The name must be unique per Collector. This value is assigned to the <a href="/docs/search/get-started-with-search/search-basics/built-in-metadata">metadata</a> field _source.</td>
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
   <td>Type a category of the source. This value is assigned to the <a href="/docs/search/get-started-with-search/search-basics/built-in-metadata">metadata</a> field <code>_sourceCategory</code>. See <a href="/docs/send-data/best-practices">best practices</a> for details.
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


```json title="AWS Cost Explorer Source JSON Example"
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
