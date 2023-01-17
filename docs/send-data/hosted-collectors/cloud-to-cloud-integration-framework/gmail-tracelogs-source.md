---
id: gmail-tracelogs-source
title: Gmail Trace Logs Source
description: Gmail Trace Logs Integration
---

The Gmail Trace Logs integration pulls the Gmail log from the BigQuery using BigQuery Library APIs and ingests them into the Sumo Logic to store, analyze, and alert.


## Data sources

The Gmail Trace Logs integration will query a single data source (BigQuery). The Gmail Trace Logs Source ingests the following:

* [Set up Gmail logs in BigQuery](https://support.google.com/a/answer/7233312?hl=en&fl=1)
* [Schema for Gmail logs in BigQuery](https://support.google.com/a/answer/7230050?hl=en)


## Authorization

You need to generate the **Service Account Key** JSON file to complete the authorization process, follow the instructions below:

* Open the **Google Cloud Console**.
* Go to **IAM** & **ADMIN** tab.
* Select the **Service Account** tab.
* Select the **Project** and click the email address for the service account that you created.
* Click **Keys**.
* Click **Add key**, and then click **Create new key**.
* Click **Create**. A JSON key file is downloaded to your computer.
* Click **Close**.


## Metadata Fields

Metadata fields will be set, if the integration is configured with the SIEM forward option. See **Metadata Fields** table below:

| Fields     |    Value                    |
| -------    |  :------------------------: |
|_siemparser    |/Parsers/System/Google/GCP BigQuery Gmail


## Setup and Configuration

The integration requires the following information to connect to the Gmail Trace Logs:
* `name`
* `projectId`
* `datasetId`
* `privateKey`
* `clientEmail`
* `tokenURI`
* `dataLocation`

:::info
* Find `projectId`, `privateKey`, `clientEmail` and `tokenURI` from the Google Cloud Console
* BigQuery DataSetId  = `datasetId`
* BigQuery DataSet Location  = `dataLocation`
* StartTime is set to "24 Hours ago" (by default), but can be modified.
:::
