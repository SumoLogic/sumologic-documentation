---
id: gmail-tracelogs-source
title: Gmail Trace Logs Source
sidebar_label: Gmail Trace Logs
description: The Sumo Logic Gmail Trace Logs source pulls the Gmail log from the BigQuery using BigQuery Library APIs and ingests them into the Sumo Logic to store, analyze, and alert.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/gmail-trace-logs-icon.svg')} alt="Gmail" width="50"/>

:::note
This source was originally developed for [Gmail logs in BigQuery](https://support.google.com/a/topic/7233311?fl=1&sjid=293657922002214011-NA), which has been replaced by [Google Workspace logs and reports in BigQuery](https://support.google.com/a/topic/9079469?fl=1&sjid=293657922002214011-NA).

You'll need to use our [Google BigQuery source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/google-bigquery-source) instead (see [Example 3: Query Gmail Logs](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/google-bigquery-source/#example-3-query-gmail-logs)). 
:::

The Gmail Trace Logs integration pulls the Gmail log from the BigQuery using BigQuery Library APIs and ingests them into the Sumo Logic to store, analyze, and alert.

## Data sources

The Gmail Trace Logs integration will query a single data source (BigQuery). The Gmail Trace Logs Source ingests the following:

* [Set up Gmail logs in BigQuery](https://support.google.com/a/answer/7233312?hl=en&fl=1)
* [Schema for Gmail logs in BigQuery](https://support.google.com/a/answer/7230050?hl=en)

## Metadata fields

Metadata fields will be set, if the integration is configured with the SIEM forward option. See **Metadata Fields** table below:

| Fields     |    Value                    |
| :-------    |  :------------------------: |
|_siemparser    |/Parsers/System/Google/GCP BigQuery Gmail

## Setup and Configuration

Follow the below steps to get the Service Account's Credential JSON file to to complete the authorization process.

1. Open [IAM & Admin under Google Cloud Console](https://console.cloud.google.com/iam-admin/iam).
1. Select the **Service Account** tab.<br/><img src={useBaseUrl('img/send-data/Google_IAM_and_Admin.png')} alt="Google_IAM_and_Admin" width="220" />
1. From the project dropdown button, select the project where you will run the BigQuery jobs.<br/><img src={useBaseUrl('img/send-data/Google_Project_Name.png')} alt="Google_Project_Name" width="400" />
1. Click on **Create a Service Account** and follow the instructions in [Create service accounts](https://cloud.google.com/iam/docs/service-accounts-create) google cloud docs.<br/><img src={useBaseUrl('img/send-data/Google_Create_Service_Account.png')} alt="Google_Create_Service_Account" width="500" />
1. Click on the email address provisioned during the creation and then click the **KEYS** tab.<br/><img src={useBaseUrl('img/send-data/Google_Service_Account_Keys.png')} alt="Google_Service_Account_Keys" width="600" />
1. Click **ADD KEY** and choose **Create new key**. <br/><img src={useBaseUrl('img/send-data/Google_add_key.png')} alt="Google_Create_Service_Account" width="200" />
1. Select key type as **JSON**.<br/><img src={useBaseUrl('img/send-data/Google_type_json.png')} alt="Google_Create_Service_Account" width="450" />
1. Click **Create**. A JSON key file is downloaded to your computer.

## States

Gmail Trace Logs source is a fully managed enterprise data warehouse that helps you to manage and analyze your data.
When you create an Gmail Trace Logs source, it goes through the following stages:
1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Gmail Trace Logs.
1. **Collecting**. The Source is actively collecting data from Gmail Trace Logs.

If the source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.
On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. You can click the text in the Health column, such as **Error**, to open the issue in Health Events to investigate.

## Create Gmail Trace Logs Source

When you create an Gmail Trace Logs Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure Gmail Trace Logs Source:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Gmail Trace Logs**.<br/><img src={useBaseUrl('img/send-data/gmail-trace-logs-icon.png')} alt="gmail-trace-logs-icon" width="100" style={{border: '1px solid black'}}/>
1. Enter a **Name** for the Source. The description is optional. <br/><img src={useBaseUrl('img/send-data/gmail-trace-logs_config_main.png')} alt="gmail-trace-logs-config-main.png" width="400" style={{border: '1px solid black'}} />
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields**. Click the **+Add** button to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.
1. **Project ID**. Enter the unique identifier number. You can find this from the Google Cloud Console.
1. **Dataset ID**. Enter the ID. The Dataset ID is the project-wise unique identifier for your dataset. 
1. **Data Location**. Enter the location of DataSet which is set while creating Dataset in BigQuery.
1. **Private Key**. Enter the private key of Service Account JSON. This is a security key which is required for authentication. You can find this from the Google Cloud Console.
1. **Client Email**. Enter the user email collected from the Google Cloud Console.
1. **Token URI**. Enter the token URI used for generating the token. You can find this from the Google Cloud Console.
1. The **Collection should begin** is set to **24 Hours ago** by default. You can adjust it based on your needs.
1. **(Optional) Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Save**.

### Error Types

When Sumo Logic detects an issue, it is tracked by Health Events. The following table shows the three possible error types, the reason for the error, if the source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third-party service APIs. | Yes | The Source will retry indefinitely. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry indefinitely. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}

### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| `config` | JSON Object  | Yes | Contains the [configuration-parameters](#config-parameters) of the Source. | n/a |
| `schemaRef` | JSON Object  | Yes | Use `{"type":"Gmail Trace Logs"}` for Gmail Trace Logs Source. | not modifiable |
| `sourceType` | String | Yes | Use `Universal` for Gmail Trace Logs. | not modifiable |

### Config parameters

| Parameter | Type | Required | Description | Access |
|:---|:---|:---|:---|:---|
| `name` | String | Yes | Type the desired name of the Source and it must be unique per Collector. This value is assigned to the `metadata field _source`.  | modifiable |
| `description` | String  | No | Type the description of the Source. | modifiable |
| `category` | String | No | Type the category of the source. This value is assigned to the metadata field `_sourceCategory`. | modifiable |
| `fields` | JSON Object | No | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `projectId` | String | Yes | The project ID is the globally unique identifier for your project. For example, `pelagic-quanta-364805`. | modifiable |
| `datasetId` | String | Yes | The Dataset ID is the project-wise unique identifier for your dataset. For example, `gmaillogsbigquery`. | modifiable |
| `privateKey` | String | Yes | The Private Key is part of Service Account JSON, it is a security key which is required for authentication. | modifiable |
| `clientEmail` | String | No | User email collected from the Google Cloud Console. | modifiable |
| `tokenUri` | String | Yes | The Token URI is part of Service Account JSON, it is used for generating the token. | modifiable |
| `startTime` | String | Yes | This sets how many hours the Source checks for new data. The default is 24 hours. | modifiable |
| `dataLocation` | String | Yes | Dataset ID is the project-wise unique identifier for your dataset. | modifiable |

### JSON example

```json
{
   "api.version":"v1",
   "source":{
        "config":{
            "name":"Gmail Trace Log",
            "category":"gmail",
            "projectId":"Product123",
            "datasetId":"Product123",
            "privateKey":"*****************",
            "tokenURI":"dshjfgbkjlafdhbdhfvhjksdg",
            "clientEmail":"product123@gmail.com",
            "dataLocation":"US",
            "startTime":"24 Hours ago"
        },
        "schemaRef":{
            "type":"Gmail Trace Logs"
        },
        "sourceType":"Universal"
   }
}
```