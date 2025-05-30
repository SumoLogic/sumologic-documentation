---
id: crowdstrike-fdr-source
title: Crowdstrike FDR Source
sidebar_label: Crowdstrike FDR
tags:
  - cloud-to-cloud
  - crowdstrike-fdr
description: The CrowdStrike Falcon Data Replicator (FDR) Source provides a secure endpoint to ingest Falcon Data Replicator events using the S3 ingestion capability by consumed SQS notifications of new S3 objects.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/security-threat-detection/crowdstrike.png')} alt="thumbnail icon" width="85"/>

The CrowdStrike Falcon Data Replicator (FDR) Source provides a secure endpoint to ingest [Falcon Data Replicator](https://falcon.crowdstrike.com/support/documentation/9/falcon-data-replicator) events using the S3 ingestion capability by consumed SQS notifications of new S3 objects. It securely stores the required authentication, scheduling, and state tracking information.

:::important
The [CrowdStrike API documentation](https://falcon.crowdstrike.com/login/?next=%2Fdocumentation%2F9%2Ffalcon-data-replicator) is not public and can only be accessed by partners or customers.
:::

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min |  [Falcon Data Replicator Logs](https://falcon.crowdstrike.com/support/documentation/9/falcon-data-replicator) |

## Setup

### Vendor configuration

:::note
You must contact the [CrowdStrike support team](https://supportportal.crowdstrike.com/) to enable CrowdStrike FDR. If it's not enabled, your requests will receive HTTP 500 responses.
:::

Once CrowdStrike FDR is enabled in the CrowdStrike console, navigate to **Support** > **API Clients and Keys**. You need to **Create new credentials** to copy the **AWS Access Key ID**, **AWS Secret Access Key**, and **SQS Queue URL** to provide to Sumo Logic when creating your CrowdStrike FDR Source.

### Source configuration

When you create a CrowdStrike FDR Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure a CrowdStrike FDR Source:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collectors page, click **Add Source** next to a Hosted Collector.
1. Search for and select **CrowdStrike FDR**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo that does not exist in the Fields schema it is ignored, known as dropped.
1. **AWS Access Key ID**: Provide your AWS Access Key ID you copied from CrowdStrike, see the [Vendor configuration](#vendor-configuration) section.
1. **AWS Secret Access Key**: Provide your AWS Secret Access Key you copied from CrowdStrike, see the [Vendor configuration](#vendor-configuration) section.
1. **SQS Queue URL**. Provide your SQS Queue URL you copied from CrowdStrike, see the [Vendor configuration](#vendor-configuration) section.
1. **S3 Region**. Select the S3 Region your data is in, this normally is the same region specified in the **SQS Queue**.
1. (Optional) **Historical Data Collection**. Select the specified time range to ingest only the desired data. By default, it is seven days.
    - By default, all messages are ingested into Sumo Logic without any filtering. However, with the appropriate configuration, customers can ensure that only the desired data within the specified time range is ingested. For instance, if you want to ingest data from the last three days only, then you should configure the source by selecting `3 Days` as the value.
    - Crowdstrike FDR will queue up to 7 days worth of data, if it's configured without any consumer ingesting the events. You should be aware that this historical data will be collected only with the C2C integration.
    - Crowdstrike FDR doesn't allow Sumo Logic to pass any parameter to collect data from a specific time range.
1. **Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/).
1. **Advanced Options for Logs**.
   * **Timestamp Parsing**. This option is selected by default. If it's deselected, no timestamp information is parsed at all.
   * **Time Zone**. There are two options for Time Zone. You can use the time zone present in your log files, and then choose an option in case time zone information is missing from a log message. Or, you can have Sumo Logic completely disregard any time zone information present in logs by forcing a time zone. It's very important to have the proper time zone set, no matter which option you choose. If the time zone of logs cannot be determined, Sumo Logic assigns logs UTC; if the rest of your logs are from another time zone your search results will be affected.
   * **Timestamp Format**. By default, Sumo Logic will automatically detect the timestamp format of your logs. However, you can manually specify a timestamp format for a Source. See [Timestamps, Time Zones, Time Ranges, and Date Formats](/docs/send-data/reference-information/time-reference) for more information.
1. When you are finished configuring the Source, click **Save**.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Crowdstrike FDR"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. |`{"fieldA": "valueA"}` |
| secretAccessKey` | String | Yes |  | The AWS Secret Access Key you got from CrowdStrike. |  |
| SqsQueueURL | String | Yes |  `null` | The SQS Queue URL you got from CrowdStrike. |  |
| accessKeyId | String | Yes |  `null` | The AWS Access Key ID you got from CrowdStrike. |  |
| s3Region | String | Yes | other | The S3 Region your data is in. |  |
| startTime | Integer | No | other | Time range to ingest the desired data. |  |

### JSON example

```json reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/crowdstrike-fdr/example.json
```

### Terraform example

```hcl reference
https://github.com/SumoLogic/sumologic-documentation/blob/main/static/files/c2c/crowdstrike-fdr/example.tf
```


## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
