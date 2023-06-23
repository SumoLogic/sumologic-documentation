---
id: armis-api-source
title: Armis API Integration Source
sidebar_label: Armis API
description: Learn how to fetch device and alerts logs from Armis platform and send it to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/armis-icon.png')} alt="armis-icon.png" width="80" />

Armis API is a device security platform that discover devices, tracks behavior, detects threats, and takes action to protect your business.
The Source integration ingests alert and device data from the Armis platform.

## Prerequisites

To collect alerts and device logs from Armis platform, you must have an authorized Armis account. Armis APIs use an authorization token to make authorized calls to the API. This section demonstrates how to obtain a token from the Armis (UI).

## Rules

* JSON is the only supported log format
* Data is collected in five minute intervals.

## States

The Armis API integration Source is a device security platform that discover devices, tracks behavior, detects threats, and takes action to protect your business.
When you create an Armis API Source, it goes through the following stages:
1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Armis APIs.
1. **Collecting**. The Source is actively collecting data from Armis APIs .

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.
On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events.md) to investigate issues with collection.<br/>![Azure Event Hubs error.png](/img/send-data/Azure-Event-Hubs-error.png)

Hover your mouse over the status icon to view a tooltip with a count of the detected errors and warnings. You can click on the status icon to open a Health Events panel with details on each detected issue.<br/>![health error generic.png](/img/send-data/azure_health_error_generic.png)

## Data Sources

The Armis API Integration consumes the following data sources and send it to Sumo Logic.
* Collect alert data from the alert API and will be forwarded to Sumo Logic as SIEM data.
* Collect device data from the device API and will be forwarded to Sumo Logic as Inventory data.

## Setup and Configuration

In this configuration, you will set up an Armis source account and configure it to be authorized and authenticated to use device logs and alerts from Armis API.
To obtain an Armis auth token, follow the steps below:
1. Log into the [Armis](https://armis.com/) application.
1. Navigate to **Settings** > **API Management** on your Armis application.<br/> <img src={useBaseUrl('img/send-data/armis-settings.png')} alt="armis-settings.png" width="900" />
1. Create a new API secret key if you haven't created one yet by clicking the **Create** button from the API Management page.<br/> <img src={useBaseUrl('img/send-data/create-api.png')} alt="create-api.png" width="=700" />
1. Click **Show** to view the secret key.<br/> <img src={useBaseUrl('img/send-data/show-secretkey.png')} alt="show-secretkey.png" width="700" />
1. A popup window will be displayed. Copy and paste the secret key to a folder location. Remember, you will need to enter this key while creating the **Armis Cloud-to-Cloud Source**.<br/><img src={useBaseUrl('img/send-data/show-key.png')} alt="show-key.png" width="400" />

## Create an Armis Source

When you create an Armis Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).

To configure an Armis Source:
1. In Sumo Logic, select **Manage Data** > **Collection** > **Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Search for and select **Armis**.<br/> <img src={useBaseUrl('img/send-data/armis-icon.png')} alt="armis-icon.png" width="150" />
1. Enter a **Name** for the Source. The description is optional.<br/> <img src={useBaseUrl('img/send-data/armis-config-main.png')} alt="armis-config-main" width="450" />
1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate. Each field needs a name (key) and value.
   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a checkmark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored (i.e., dropped).
1. In **Instance URL**, enter the Armis hostname.

   :::info
   Armis Instance URL is the Armis hostname. For example, `https://armis-instance.armis.com`.
   :::

8. In **Secret Key**, enter your API secret key that you have generated in [Setup and Configuration](#setup-and-configuration) section.
9. In **Armis API selection**. Choose the data sources from which you want to ingest data. The integration provides the option to you to select either one or both of the data sources.
   * If **Alert API** is selected, the integration will fetch alert data.
     * Permission `Alert>Read` must be provided to fetch alert data.
     * Data for an alert will be fetched every 5 minutes.
   * If **Device API** is selected, the integration will fetch device data.
     * Permission `Device>Read` must be provided to fetch device data.
     * Data for the device will be fetched every 24 hours.

  :::note
  This step is mandatory, ensure you select one data source.
  :::

1. (Optional) In **Processing Rules for Logs**, configure any desired filters, such as allowlist, denylist, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).
1. When you are finished configuring the Source, click **Submit**.

### Error types

When Sumo Logic detects an issue it is tracked by Health Events. The following table shows the three possible error types, the reason the error would occur, if the Source attempts to retry, and the name of the event log in the Health Event Index.

| Type | Reason | Retries | Retry Behavior | Health Event Name |
|:--|:--|:--|:--|:--|
| ThirdPartyConfig  | Normally due to an invalid configuration. You'll need to review your Source configuration and make an update. | No retries are attempted until the Source is updated. | Not applicable | ThirdPartyConfigError  |
| ThirdPartyGeneric | Normally due to an error communicating with the third-party service APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | ThirdPartyGenericError |
| FirstPartyGeneric | Normally due to an error communicating with the internal Sumo Logic APIs. | Yes | The Source will retry for up to 90 minutes, after which it quits. | FirstPartyGenericError |

### Restarting your Source

{@import ../../../reuse/restart-c2c-source.md}


### JSON configuration

Sources can be configured using UTF-8 encoded JSON files with the Collector Management API. See [how to use JSON to configure Sources](/docs/send-data/use-json-configure-sources) for details. 

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| `config` | JSON Object  | Yes | Contains the [configuration-parameters](#config-parameters) of the Source. |
| `schemaRef` | JSON Object  | Yes | Use `{"type":"Armis"}` for Armis Source. | not modifiable |
| `sourceType` | String | Yes | Use `Universal` for Armis Source. | not modifiable |

### Config Parameters

| Parameter | Type | Required | Description | Access |
|:--|:--|:--|:--|:--|
| `name` | String | Yes | Type the desired name of the Source and it must be unique per Collector. This value is assigned to the `metadata field _source`.  | modifiable |
| `description` | String  | No | Type the description of the Source. | modifiable |
| `category` | String | No | Type the category of the source. This value is assigned to the metadata field `_sourceCategory`. | modifiable |
| `fields` | JSON Object | No | JSON map of key-value fields (metadata) to apply to the Collector or Source. Use the boolean field `_siemForward` to enable forwarding to SIEM. | modifiable |
| `instanceUrl` | String | Yes | Armis Instance URL | modifiable |
| `apiSecretKey` | String | Yes | Armis API secret key | modifiable |
| `apiType` | Array | Yes | You may use either or both sources of data, i.e. Alerts and devices. |

Armis Source JSON example:

```json
{
    "api.version": "v1",
    "source": {
        "config": {
            "name": "armis",
            "description": "description",
            "category": "source_category",
            "instanceURL": "http://armis-instance.armis.com",
            "secretKey": "*********",
            "apiType": [
                "alertLogs",
                "deviceLogs"
            ],
            "fields": {
                "_siemForward": false
            }
        },
        "schemaRef": {
            "type": "Armis"
        },
        "sourceType": "Universal"
    }
}
```
