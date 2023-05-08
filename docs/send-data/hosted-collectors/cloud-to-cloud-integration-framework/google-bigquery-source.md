---
id: google-bigquery-source
title: Google BigQuery Source
sidebar_label: Google BigQuery
description: The Google BigQuery API integration ingests data from the BigQuery API.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/google-bigquery-icon.png')} alt="google-bigquery-icon" width="70" />

Google Cloud’s BigQuery is a fully managed enterprise data warehouse that helps you to manage and analyze your data, which also provides built-in features such as ML, geospatial analysis, and business intelligence. The Google BigQuery integration gets data from a [Google BigQuery](https://cloud.google.com/bigquery?utm_source=google&utm_medium=cpc&utm_campaign=na-none-all-en-dr-sitelink-all-all-trial-b-gcp-1605212&utm_content=text-ad-none-any-DEV_c-CRE_648217359723-ADGP_Desk%20%7C%20BKWS%20-%20BRO%20%7C%20Txt%20_%20BI%20Engine%20_%20Product%20Support-KWID_43700075197895289-kwd-1409510316386-userloc_9031936&utm_term=KW_bigquery%20bi%20engine-ST_BigQuery%20BI%20Engine-NET_g-&gclid=CjwKCAjwxr2iBhBJEiwAdXECw6GBvSq5vsHUwq6kL8X6cr4PxNIUY38sUiHseLcYIBRHB7ap8gUMrxoCYV4QAvD_BwE&gclsrc=aw.ds#section-1) table via a provided query.

## Data Source

The Google BigQuery Integration fetches data using [BigQuery API](https://developers.google.com/identity/protocols/oauth2/scopes#bigqueryv2).

## Setup and Configuration

Follow the below steps to get the Service Account's Credential JSON file to run BigQuery jobs:

1. Open [IAM & Admin under Google Cloud Console](https://console.cloud.google.com/iam-admin/iam).
1. Select the **Service Account** tab.<br/><img src={useBaseUrl('img/send-data/Google_IAM_and_Admin.png')} alt="Google_IAM_and_Admin" width="220" />
1. From the project dropdown button, select the project where you will run the BigQuery jobs.<br/><img src={useBaseUrl('img/send-data/Google_Project_Name.png')} alt="Google_Project_Name" width="400" />
1. Click on **Create a Service Account** and follow the instructions in [Create service accounts](https://cloud.google.com/iam/docs/service-accounts-create) google cloud docs.<br/><img src={useBaseUrl('img/send-data/Google_Create_Service_Account.png')} alt="Google_Create_Service_Account" width="500" />
1. Click on the email address provisioned during the creation and then click the **KEYS** tab.<br/><img src={useBaseUrl('img/send-data/Google_Service_Account_Keys.png')} alt="Google_Service_Account_Keys" width="600" />
1. Click **ADD KEY**. 
1. Click **Create new key** and choose **JSON**.
1. Click **Create**. A JSON key file is downloaded to your computer.

## States

Google BigQuery integration Source is a dfully managed enterprise data warehouse that helps you to manage and analyze your data.
When you create an Rapid7 Source, it goes through the following stages:
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
1. **Project ID**. Enter the unique identifier number for your project. You can find this from the Google Cloud Console.
1. **Delegated User Email**. Enter the admin user email address for the domain which grants the access to service account.
1. **Checkpoint Field**. Enter the name of the field in the query result to be used for checkpointing. This field has to be increasing and of type number or timestamp.
1. **Checkpoint Start**. Enter the first value for the checkpoint that the integration will plug into the query.
1. **Time Field (Optional)**. Enter the name of the field in the query result to be parsed as timestamp. If not provided the current time will be used.
1. **Query**. Enter the BigQuery Name of the user to run. It has to include the phrase "%CHECKPOINT%".
1. **Query Interval (Optional)**. Enter the time interval to run the query in the format: Xm (for X minutes) or Xh (for X hours).
1. **Google BigQuery Credential**. Upload the JSON Key file downloaded from Google Cloud IAM & Admin.
1. **Processing Rules for Logs (Optional)**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Submit**.

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
| `Query` | String | Yes | The query to be used in BigQuery. The special string **%checkpoint%** will be replaced with the largest value seen in the checkpoint field. | modifiable |
| `timeField` | String | No | The name of the column to be used to extract timestamp. If not specified, the C2C will use the current time for each row or record we collect. The TIMESTAMP data type is recommended, but any number will be converted into a timestamp by dividing by 10 until the integral part has 10 digits. For example, `TIMESTAMP_MICROS(event_info.timestamp_usec)` as time. | modifiable |
| `checkpointField` | String | Yes | The column whose largest value will be used as the %checkpoint% in the next search. The previous value will be saved in a file and compared with the current value using max() after being converted to string, so you can use any field type which is either a number or lexicographically comparable like TIMESTAMP. | modifiable |
| `checkpointStart` | String | Yes | Provide the value that we will plugin at the very first run only. This is because the checkpoint might not be a timestamp field so we don’t know the exact value here. | modifiable |

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
