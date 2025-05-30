---
id: google-bigquery-source
title: Google BigQuery Source
sidebar_label: Google BigQuery
tags:
  - cloud-to-cloud
  - google-bigquery
description: Learn how to collect data using the BigQuery API.
---

import React, { useEffect, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/google-bigquery/example.json';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/google-bigquery-icon.png')} alt="google-bigquery-icon" width="70" />

Google Cloud’s BigQuery is a fully managed enterprise data warehouse that helps you to manage and analyze your data, which also provides built-in features such as ML, geospatial analysis, and business intelligence. The Google BigQuery integration gets data from a [Google BigQuery](https://cloud.google.com/bigquery) table via a provided query.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min | [BigQuery API](https://developers.google.com/identity/protocols/oauth2/scopes#bigqueryv2) |

## Setup

:::note
Make sure that you have [BigQuery Data Viewer](https://cloud.google.com/bigquery/docs/access-control#bigquery.dataViewer) and [BigQuery Job User](https://cloud.google.com/bigquery/docs/access-control#bigquery.jobUser) permissions when creating the service account for the Big Query source.
:::

### Vendor configuration

Follow the below steps to get the Service Account's Credential JSON file to run BigQuery jobs:

1. Open [IAM & Admin under Google Cloud Console](https://console.cloud.google.com/iam-admin/iam).
1. Select the **Service Account** tab.<br/><img src={useBaseUrl('img/send-data/Google_IAM_and_Admin.png')} alt="Google_IAM_and_Admin" width="220" />
1. From the project dropdown button, select the project where you will run the BigQuery jobs.<br/><img src={useBaseUrl('img/send-data/Google_Project_Name.png')} alt="Google_Project_Name" width="400" />
1. Click on **Create a Service Account** and follow the instructions in [Create service accounts](https://cloud.google.com/iam/docs/service-accounts-create) google cloud docs.<br/><img src={useBaseUrl('img/send-data/Google_Create_Service_Account.png')} alt="Google_Create_Service_Account" width="500" />
1. Click on the email address provisioned during the creation and then click the **KEYS** tab.<br/><img src={useBaseUrl('img/send-data/Google_Service_Account_Keys.png')} alt="Google_Service_Account_Keys" width="600" />
1. Click **ADD KEY** and choose **Create new key**. <br/><img src={useBaseUrl('img/send-data/Google_add_key.png')} alt="Google_Create_Service_Account" width="200" />
1. Select key type as **JSON**.<br/><img src={useBaseUrl('img/send-data/Google_type_json.png')} alt="Google_Create_Service_Account" width="450" />
1. Click **Create**. A JSON key file is downloaded to your computer.

### Source configuration

When you create an Google BigQuery Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
:::note
   Before setting up the integration, test out the query with the checkpointing logic and a specific checkpoint value in the Google BigQuery console.
:::
To configure an Google BigQuery Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Google BigQuery**.
1. Enter a **Name** for the Source. The description is optional.
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Project ID**. Enter the unique identifier number for your BigQuery project. You can find this from the Google Cloud Console.
1. **Checkpoint Field**. Enter the name of the field in the query result to be used for checkpointing. This field has to be increasing and of type number or timestamp.
1. **Checkpoint Start**. Enter the first value for the checkpoint that the integration will plug into the query.
1. **(Optional) Time Field**. Enter the name of the field in the query result to be parsed as timestamp. If not provided, the current time will be used.
1. **Query**. Enter the query that you need to run. You must include the phrase `%CHECKPOINT%` and sort the checkpoint field.
1. **(Optional) Query Interval**. Enter the time interval to run the query in the format: `Xm` (for X minutes) or `Xh` (for X hours).
1. **Google BigQuery Credential**. Upload the Credential JSON file downloaded from Google Cloud IAM & Admin.
1. **(Optional) Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Save**.

#### Sample values for Query, Checkpoint, and Checkpoint Start fields

Each query must contain a phrase `%CHECKPOINT%`. Integration will extract and save the current checkpoint and use it in place of this phrase. The value of **Checkpoint Start** must be the same type as the **Checkpoint Field**.

:::note
Quote the phrase as **"%CHECKPOINT%"** if the Checkpoint Field is a timestamp string.
:::

Following are some examples that demonstrate what values to use for the Query, Checkpoint, Time Field, and Checkpoint Start fields.

##### Example 1: Checkpoint Field is timestamp.

You can see double quotes for the timestamp as it is a string.

```sql
Select * from MyProject.MyDataSet.MyTable where timestamp > "%CHECKPOINT%"
```

| Field | Value |
|:---|:---|
| `Checkpoint Field` | `timestamp` |
| `Checkpoint Start`| `2022-02-02 11:00:00.000+0700` |
| `Time Field` | `timestamp` |

Specific example on a public dataset:

```sql
SELECT base_url,source_url,collection_category,collection_number,timestamp(sensing_time) as sensing_time FROM bigquery-public-data.cloud_storage_geo_index.landsat_index where sensing_time > '%CHECKPOINT%' order by sensing_time asc LIMIT 100
```

| Field | Value |
|:---|:---|
| `Checkpoint Field` | `sensing_time` |
| `Checkpoint Start`| `2022-02-02 11:00:00.000+0700` |
| `Time Field` | `sensing_time` |

##### Example 2: Checkpoint Field is a numeric field.

```sql
SELECT trip_id,subscriber_type,start_time,duration_minutes FROM bigquery-public-data.austin_bikeshare.bikeshare_trips where trip_id > %CHECKPOINT% order by start_time asc LIMIT 100
```

| Field | Value |
|:---|:---|
| `Checkpoint Field` | `trip_id` |
| `Checkpoint Start`| `0` |
| `Time Field` | `start_time` |

##### Example 3: Query Gmail Logs

In the example below, you'll need to replace `MyProject` and `MyDataSet` with values matching your environment.

```sql
SELECT gmail.message_info,gmail.event_info,gmail.event_info.timestamp_usec AS TIMESTAMP FROM `MyProject.MyDataSet.activity` WHERE gmail.event_info.timestamp_usec > %CHECKPOINT% order by TIMESTAMP LIMIT 30000
```

| Field | Value |
|:---|:---|
| `Checkpoint Field` | `TIMESTAMP` |
| `Checkpoint Start`| `1683053865563258` |
| `Time Field` | `TIMESTAMP` |

Note that the value of `Checkpoint Start` above is an epoch MICRO seconds timestamp (16 digits) for `May 2, 2023 06:57:45.563258 PM GMT` and the query also sorts by the checkpoint field (`TIMESTAMP`).

When setting up this source for Gmail logs for the first time and collecting historical Gmail logs, it is important to set the `Checkpoint Start` in epoch microseconds (16 digits), and sort the checkpoint field explicitly in your query. Also note that it might take a long time for the source (and many BigQuery queries to execute) to backfill if the starting point is set far in the past - depending on your Gmail logs volume.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Google BigQuery"}` | Yes | Define the specific schema type. |
| sourceType | String | `"Universal"` | Yes | Type of source. |
| config | JSON Object | [Configuration object](#configuration-object) | Yes | Source type specific values. |

### Configuration Object

| Parameter | Type | Required | Default | Description | Example |
|:--|:--|:--|:--|:--|:--|
| name | String | Yes | `null` | Type a desired name of the source. The name must be unique per Collector. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_source`. | `"mySource"` |
| description | String | No | `null` | Type a description of the source. | `"Testing source"`
| category | String | No | `null` | Type a category of the source. This value is assigned to the [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field `_sourceCategory`. See [best practices](/docs/send-data/best-practices) for details. | `"mySource/test"`
| fields | JSON Object | No | `null` | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field _siemForward to enable forwarding to SIEM.|`{"_siemForward": false, "fieldA": "valueA"}` |
| projectId | String | Yes | `null` | The project ID is the globally unique identifier for your project. For example, `pelagic-quanta-364805`. |  |
| credentialsJson | String | Yes | `null` | This field contains the credential JSON of the Service Account used for accessing BigQuery service. |  |
| Query | String | Yes | `null` | The query to be used in BigQuery. The special string **%CHECKPOINT%** will be replaced with the largest value seen in the checkpoint field. |  |
| timeField | String | No | `null` | The name of the column to be used to extract timestamp. If not specified, the C2C will use the current time for each row or record we collect. The TIMESTAMP data type is recommended, but any number type will be converted into a epoch milliseconds or epoch microseconds. |  |
| checkpointField | String | Yes | `null` | The column whose largest value will be used as the **%CHECKPOINT%** in the next search. The checkpoint field has to be of type number of timestamp. |  |
| checkpointStart | String | Yes | `null` | The very first value of the checkpoint to be used in the query. | |
## Examples

<>
  {(() => {
    const [json, setJson] = React.useState('');
    const [tf, setTf] = React.useState('');

    React.useEffect(() => {
      fetch(useBaseUrl('/files/c2c/google-bigquery/example.json'))
        .then(res => res.text())
        .then(setJson);
      fetch(useBaseUrl('/files/c2c/google-bigquery/example.tf'))
        .then(res => res.text())
        .then(setTf);
    }, []);

    return (
      <>
        <h3>JSON example</h3>
        <CodeBlock language="json">{json}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/google-bigquery/example.json')} target="_blank" rel="noopener noreferrer">Download example</a>

        <h3>Terraform example</h3>
        <CodeBlock language="hcl">{tf}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/google-bigquery/example.tf')} target="_blank" rel="noopener noreferrer">Download example</a>
      </>
    );
  })()}
</>

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
