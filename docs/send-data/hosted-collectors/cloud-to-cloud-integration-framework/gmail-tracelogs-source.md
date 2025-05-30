---
id: gmail-tracelogs-source
title: Gmail Trace Logs Source
sidebar_label: Gmail Trace Logs
tags:
  - cloud-to-cloud
  - gmail-tracelogs
description: The Sumo Logic Gmail Trace Logs source pulls the Gmail log from the BigQuery using BigQuery Library APIs and ingests them into the Sumo Logic to store, analyze, and alert.
---

import React, { useEffect, useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import ExampleJSON from '/files/c2c/gmail-tracelogs/example.json';
import CollBegin from '../../../reuse/collection-should-begin-note.md';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/gmail-trace-logs-icon.svg')} alt="Gmail" width="50"/>

:::note
This source was originally developed for [Gmail logs in BigQuery](https://support.google.com/a/topic/7233311?fl=1&sjid=293657922002214011-NA), which has been replaced by [Google Workspace logs and reports in BigQuery](https://support.google.com/a/topic/9079469?fl=1&sjid=293657922002214011-NA).

You'll need to use our [Google BigQuery source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/google-bigquery-source) instead (see [Example 3: Query Gmail Logs](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/google-bigquery-source/#example-3-query-gmail-logs)).
:::

The Gmail Trace Logs integration pulls the Gmail log from the BigQuery using BigQuery Library APIs and ingests them into the Sumo Logic to store, analyze, and alert.

## Data collected

| Polling Interval | Data |
| :--- | :--- |
| 5 min | [Set up Gmail logs in BigQuery](https://support.google.com/a/answer/7233312?hl=en&fl=1) |
| 5 min | [Schema for Gmail logs in BigQuery](https://support.google.com/a/answer/7230050?hl=en) |

## Setup

### Vendor configuration

Follow the below steps to get the Service Account's Credential JSON file to to complete the authorization process.

1. Open [IAM & Admin under Google Cloud Console](https://console.cloud.google.com/iam-admin/iam).
1. Select the **Service Account** tab.<br/><img src={useBaseUrl('img/send-data/Google_IAM_and_Admin.png')} alt="Google_IAM_and_Admin" width="220" />
1. From the project dropdown button, select the project where you will run the BigQuery jobs.<br/><img src={useBaseUrl('img/send-data/Google_Project_Name.png')} alt="Google_Project_Name" width="400" />
1. Click on **Create a Service Account** and follow the instructions in [Create service accounts](https://cloud.google.com/iam/docs/service-accounts-create) google cloud docs.<br/><img src={useBaseUrl('img/send-data/Google_Create_Service_Account.png')} alt="Google_Create_Service_Account" width="500" />
1. Click on the email address provisioned during the creation and then click the **KEYS** tab.<br/><img src={useBaseUrl('img/send-data/Google_Service_Account_Keys.png')} alt="Google_Service_Account_Keys" width="600" />
1. Click **ADD KEY** and choose **Create new key**. <br/><img src={useBaseUrl('img/send-data/Google_add_key.png')} alt="Google_Create_Service_Account" width="200" />
1. Select key type as **JSON**.<br/><img src={useBaseUrl('img/send-data/Google_type_json.png')} alt="Google_Create_Service_Account" width="450" />
1. Click **Create**. A JSON key file is downloaded to your computer.

### Source configuration

When you create an Gmail Trace Logs Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure Gmail Trace Logs Source:
1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu select **Configuration**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Gmail Trace Logs**.
1. Enter a **Name** for the Source. The description is optional.
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
   :::note
   <CollBegin/>
   :::
1. **(Optional) Processing Rules for Logs**. Configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Save**.

## Metadata fields

If the integration is configured with the SIEM forward option, set the Metadata field `_siemparser` to `/Parsers/System/Google/GCP BigQuery Gmail`.

## JSON schema

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Value | Required | Description |
|:--|:--|:--|:--|:--|
| schemaRef | JSON Object  | `{"type":"Gmail Trace Logs"}` | Yes | Define the specific schema type. |
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
| datasetId | String | Yes | `null` | The Dataset ID is the project-wise unique identifier for your dataset. For example, `gmaillogsbigquery`. |  |
| privateKey | String | Yes | `null` | The Private Key is part of Service Account JSON, it is a security key which is required for authentication. |  |
| clientEmail | String | No | `null` | User email collected from the Google Cloud Console. |  |
| tokenUri | String | Yes | `null` | The Token URI is part of Service Account JSON, it is used for generating the token. |  |
| startTime | String | Yes | `null` | This sets how many hours the Source checks for new data. The default is 24 hours. |  |
| dataLocation | String | Yes | `null` | Dataset ID is the project-wise unique identifier for your dataset. |  |

## Examples

<>
  {(() => {
    const [json, setJson] = React.useState('');
    const [tf, setTf] = React.useState('');

    React.useEffect(() => {
      fetch(useBaseUrl('/files/c2c/gmail-tracelogs/example.json'))
        .then(res => res.text())
        .then(setJson);
      fetch(useBaseUrl('/files/c2c/gmail-tracelogs/example.tf'))
        .then(res => res.text())
        .then(setTf);
    }, []);

    return (
      <>
        <h3>JSON example</h3>
        <CodeBlock language="json">{json}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/gmail-tracelogs/example.json')} target="_blank" rel="noopener noreferrer">Download example</a>

        <h3>Terraform example</h3>
        <CodeBlock language="hcl">{tf}</CodeBlock>
        <a href={useBaseUrl('/files/c2c/gmail-tracelogs/example.tf')} target="_blank" rel="noopener noreferrer">Download example</a>
      </>
    );
  })()}
</>


## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
