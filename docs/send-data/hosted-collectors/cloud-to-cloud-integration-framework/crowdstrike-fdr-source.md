---
id: crowdstrike-fdr-source
title: Crowdstrike FDR Source
sidebar_label: Crowdstrike FDR
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/crowdstrike.png')} alt="thumbnail icon" width="85"/>

The CrowdStrike Falcon Data Replicator (FDR) Source provides a secure endpoint to ingest [Falcon Data Replicator](https://falcon.crowdstrike.com/support/documentation/9/falcon-data-replicator) events using the S3 ingestion capability by consumed SQS notifications of new S3 objects. It securely stores the required authentication, scheduling, and state tracking information.

:::important
The [CrowdStrike API documentation](https://falcon.crowdstrike.com/login/?next=%2Fdocumentation%2F9%2Ffalcon-data-replicator) is not public and can only be accessed by partners or customers.
:::

This Source is available in the Fed deployment.

## Historical data

:::note
If you have already enabled Crowdstrike FDR you can have a queue of up to seven days worth of data. This historical data is ingested by the CrowdStrike FDR Source. This can be avoided by not enabling FDR in the Crowdstrike portal until you're ready to configure the Crowdstrike FDR Source. If you have enabled FDR and do not want to ingest the historical data, contact Crowdstrike Support for guidance.
:::

## States

A CrowdStrike FDR Source tracks errors, reports its health, and start-up progress. You’re informed, in real-time, if the Source is having trouble connecting, if there's an error requiring user action, or if it is healthy and collecting by utilizing Health Events.

A CrowdStrike FDR Source goes through the following states when created:

1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with CrowdStrike.
1. **Collecting**. The Source is actively collecting data from CrowdStrike.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.

On the Collection page, the Health and Status for Sources is displayed. Use Health Events to investigate issues with collection. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

![crowdstrike error.png](/img/send-data/crowdstrike-error.png)

Hover your mouse over the status icon to view a tooltip with details on the detected issue.

![health error generic.png](/img/send-data/health-error-generic.png)

## Prerequisite

You must contact the [CrowdStrike support team](https://supportportal.crowdstrike.com/) to enable CrowdStrike FDR. If it's not enabled, your requests will receive HTTP 500 responses.

### Authentication

Once enabled, in the CrowdStrike console, navigate to **Support > API Clients and Keys**. You need to **Create new credentials** to copy the **AWS Access Key ID**, **AWS Secret Access Key**, and **SQS Queue URL** to provide to Sumo Logic when creating your CrowdStrike FDR Source.

### Create a CrowdStrike FDR Source

When you create a CrowdStrike FDR Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a CrowdStrike FDR Source:

1. In Sumo Logic, select **Manage Data > Collection > Collection**. 

1. On the Collectors page, click **Add Source** next to a Hosted Collector.

1. Select **CrowdStrike FDR**.

    ![CrowdStrike FDR icon.png](/img/send-data/CrowdStrike-FDR-icon.png)

1. Enter a **Name** for the Source. The description is optional.

    ![CrowdStrike FDR create input.png](/img/send-data/CrowdStrike-FDR-create-input.png)

1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.

1. **Forward to SIEM**. Check the checkbox to forward your data to Cloud SIEM Enterprise. When configured with the **Forward to SIEM** option no fields are set.

1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.

   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.

1. **AWS Access Key ID**: Provide your AWS Access Key ID you copied from CrowdStrike, see the [Prerequisite](#prerequisite).

1. **AWS Secret Access Key**: Provide your AWS Secret Access Key you copied from CrowdStrike, see the [Prerequisite](#prerequisite).

1. **SQS Queue URL**. Provide your SQS Queue URL you copied from CrowdStrike, see the [Prerequisite](#prerequisite).

1. **S3 Region**. Select the S3 Region your data is in, this normally is the same region specified in the **SQS Queue**.

1. When you are finished configuring the Source, click **Submit**.

## Error types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third party service APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}

## JSON configuration 

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description| Access |
|:--|:--|:--|:--|:--|
| config | JSON Object | Yes | Contains the [configuration parameters](#json-configuration) for the Source. |   |
| schemaRef | JSON Object | Yes | Use `{"type":"Crowdstrike FDR"}` for a CrowdStrike FDR Source. | not modifiable |
| sourceType | String | Yes | Use `Universal` for a CrowdStrike FDR Source. | not modifiable |

The following table shows the **config** parameters for a CrowdStrike FDR Source.

| Parameter | Type | Required? | Default | Description | Access |
|:--|:--|:--|:--|:--|:--|
| `name` | String | Yes |  | Type a desired name of the Source. The name must be unique per Collector. This value is assigned to the metadata field `_source`. | modifiable |
| `description` | String | No | null | Type a description of the Source. | modifiable |
| `category` | String | No | null | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | modifiable |
| `fields` | JSON Object | No |  | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM. | modifiable |
| `secretAccessKey` | String | Yes |  | The AWS Secret Access Key you got from CrowdStrike. | modifiable |
| `SqsQueueURL` | String | Yes |  | The SQS Queue URL you got from CrowdStrike. | modifiable |
| `accessKeyId` | String | Yes |  | The AWS Access Key ID you got from CrowdStrike. | modifiable |
| `s3Region` | String | Yes | other | The S3 Region your data is in. | modifiable |

CrowdStrike FDR Source JSON example:

```json
{
  "api.version":"v1",
  "source":{
    "schemaRef":{
      "type":"Crowdstrike FDR"
    },
    "config":{
      "automaticDateParsing":true,
      "name":"FDR test",
      "forceTimeZone":false,
      "description":"Example config",
      "secretAccessKey":"********",
      "SqsQueueURL":"https://sqs.us-west-1.amazonaws.com/***/***",
      "multilineEnabled":false,
      "accessKeyId":"********",
      "fields":{
        "_siemForward":false
      },
      "category":"Sumo/FDR",
      "timestampFormatAutoDetection":false,
      "s3Region":"us-west-1",
      "useAutolineMatching":true
    },
    "state":{
      "state":"Collecting"
    },
    "sourceType":"Universal"
  }
}
```
