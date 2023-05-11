---
id: google-bigquery-source
title: Google BigQuery Source
sidebar_label: Google BigQuery
description: Learn how to collect data using the BigQuery API.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/google-bigquery-icon.png')} alt="google-bigquery-icon" width="70" />

Google Cloud’s BigQuery is a fully managed enterprise data warehouse that helps you to manage and analyze your data, which also provides built-in features such as ML, geospatial analysis, and business intelligence. The Google BigQuery integration gets data from a [Google BigQuery](https://cloud.google.com/bigquery) table via a provided query.

## Data Source

The Google BigQuery Integration fetches results of a query using [BigQuery API](https://developers.google.com/identity/protocols/oauth2/scopes#bigqueryv2).

## Setup and Configuration

Follow the below steps to get the Service Account's Credential JSON file to run BigQuery jobs:

1. Open [IAM & Admin under Google Cloud Console](https://console.cloud.google.com/iam-admin/iam).
1. Select the **Service Account** tab.<br/><img src={useBaseUrl('img/send-data/Google_IAM_and_Admin.png')} alt="Google_IAM_and_Admin" width="220" />
1. From the project dropdown button, select the project where you will run the BigQuery jobs.<br/><img src={useBaseUrl('img/send-data/Google_Project_Name.png')} alt="Google_Project_Name" width="400" />
1. Click on **Create a Service Account** and follow the instructions in [Create service accounts](https://cloud.google.com/iam/docs/service-accounts-create) google cloud docs.<br/><img src={useBaseUrl('img/send-data/Google_Create_Service_Account.png')} alt="Google_Create_Service_Account" width="500" />
1. Click on the email address provisioned during the creation and then click the **KEYS** tab.<br/><img src={useBaseUrl('img/send-data/Google_Service_Account_Keys.png')} alt="Google_Service_Account_Keys" width="600" />
1. Click **ADD KEY** and choose **Create new key**. <br/><img src={useBaseUrl('img/send-data/Google_add_key.png')} alt="Google_Create_Service_Account" width="200" />
1. Select key type as **JSON**.<br/><img src={useBaseUrl('img/send-data/Google_type_json.png')} alt="Google_Create_Service_Account" width="450" />
1. Click **Create**. A JSON key file is downloaded to your computer.

## States

Google BigQuery integration Source is a fully managed enterprise data warehouse that helps you to manage and analyze your data.
When you create an Google BigQuery Source, it goes through the following stages:
1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Google BigQuery.
1. **Collecting**. The Source is actively collecting data from Google BigQuery.

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.
On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

## Create Google BigQuery Source

When you create an Google BigQuery Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
:::note
   Before setting up the integration, test out the query with the checkpointing logic and a specific checkpoint value in the Google BigQuery console.
:::
To configure an Google BigQuery Source:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Google BigQuery**.<br/><img src={useBaseUrl('img/send-data/google-bigquery-icon.png')} alt="google-bigquery-icon" width="80" />
1. Enter a **Name** for the Source. The description is optional. <br/><img src={useBaseUrl('img/send-data/google-bigquery_config_main.png')} alt="google-bigquery-config-main.png" width="400" />
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Project ID**. Enter the unique identifier number for your BigQuery project. You can find this from the Google Cloud Console.
1. **Checkpoint Field**. Enter the name of the field in the query result to be used for checkpointing. This field has to be increasing and of type number or timestamp.
1. **Checkpoint Start**. Enter the first value for the checkpoint that the integration will plug into the query.
1. **(Optional) Time Field**. Enter the name of the field in the query result to be parsed as timestamp. If not provided, the current time will be used.
1. **Query**. Enter the query that you need to run. It must include the phrase `%CHECKPOINT%`.
1. **(Optional) Query Interval**. Enter the time interval to run the query in the format: `Xm` (for X minutes) or `Xh` (for X hours).
1. **Google BigQuery Credential**. Upload the Credential JSON file downloaded from Google Cloud IAM & Admin.
1. **(Optional) Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Save**.

### Sample values for Query, Checkpoint, and Checkpoint Start fields

Each query must contain a phrase **%CHECKPOINT%**, integration will extract and save the current checkpoint and use it in place of this phrase. The value of **Checkpoint Start** must be the same type as the **Checkpoint Field**.
:::note
Quote the phrase as **"%CHECKPOINT%"** if the Checkpoint Field is a timestamp string.
:::

Following are some examples which will help you understand on what value to use for the field Query, Checkpoint, Time Field and Checkpoint Start.

#### Example 1: Checkpoint Field is timestamp.

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

#### Example 2: Checkpoint Field is a numeric field.

```sql
SELECT trip_id,subscriber_type,start_time,duration_minutes FROM bigquery-public-data.austin_bikeshare.bikeshare_trips where trip_id > %CHECKPOINT% order by start_time asc LIMIT 100
```

| Field | Value |
|:---|:---|
| `Checkpoint Field` | `trip_id` |
| `Checkpoint Start`| `0` |
| `Time Field` | `start_time` |

#### Example 3: Query Gmail Logs

```sql
select message_info,event_info, event_info.timestamp_usec as timestamp from MyProject.MyDataSet.activity where event_info.timestamp_usec > %CHECKPOINT% LIMIT 100
```

| Field | Value |
|:---|:---|
| `Checkpoint Field` | `timestamp` |
| `Checkpoint Start`| `1683053865563258` |
| `Time Field` | `timestamp` |

### Error Types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason for the error, if the source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third-party service APIs. | Yes | The Source will retry indefinitely. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry indefinitely. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}

### JSON Configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| `config` | JSON Object  | Yes | Contains the [configuration-parameters](#config-parameters) of the Source. | na |
| `schemaRef` | JSON Object  | Yes | Use `{"type":"Google BigQuery"}` for Google BigQuery Source. | not modifiable |
| `sourceType` | String | Yes | Use `Universal` for Google BigQuery. | not modifiable |

### Config Parameters

| Parameter | Type | Required | Description | Access |
|:---|:---|:---|:---|:---|
| `name` | String | Yes | Type the desired name of the Source and it must be unique per Collector. This value is assigned to the `metadata field _source`.  | modifiable |
| `description` | String  | No | Type the description of the Source. | modifiable |
| `category` | String | No | Type the category of the source. This value is assigned to the metadata field `_sourceCategory`. | modifiable |
| `fields` | JSON Object | No | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `projectId` | String | Yes | The project ID is the globally unique identifier for your project. For example, `pelagic-quanta-364805`. | modifiable |
| `credentialsJson` | String | Yes | This field contains the credential JSON of the Service Account used for accessing BigQuery service. | modifiable |
| `Query` | String | Yes | The query to be used in BigQuery. The special string **%CHECKPOINT%** will be replaced with the largest value seen in the checkpoint field. | modifiable |
| `timeField` | String | No | The name of the column to be used to extract timestamp. If not specified, the C2C will use the current time for each row or record we collect. The TIMESTAMP data type is recommended, but any number type will be converted into a epoch milliseconds or epoch microseconds. | modifiable |
| `checkpointField` | String | Yes | The column whose largest value will be used as the **%CHECKPOINT%** in the next search. The checkpoint field has to be of type number of timestamp. | modifiable |
| `checkpointStart` | String | Yes | The very first value of the checkpoint to be used in the query. | modifiable |

### JSON Example

```json
{
  "api.version":"v1",
    "source":{
        "schemaRef":{
        "type":"Google BigQuery"
        },
        "config":{
        "name":"MyBigQuerySource",
        "checkpointField":"timestamp_usec",
        "timeField":"timestamp_usec",
        "checkpointStart":"0",
        "query":"select message_info,event_info,event_info.timestamp_usec as timestamp_usec from `bigquery-dev-382704.BigQueryTest.GmailTest` where event_info.timestamp_usec > %CHECKPOINT%  LIMIT 2",
        "projectId":"********",
        "fields":{
            "_siemForward":false
            },
        "pollingInterval":"2m",
        "credentialsJson":"********"
        },
        "state":{
        "state":"Collecting"
        },
    "sourceType":"Universal"
  }
}
```
