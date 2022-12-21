---
id: armis-api-source
title: Armis API Integration
sidebar_label: Armis API Source
description: This document explains how to fetch device and alerts logs from Armis platform and send it to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/armis-icon.png')} alt="armis-icon.png" width="150" />

Armis API is a device security platform that discover devices, tracks behavior, detects threats, and takes action to protect your business.
The Source integration ingests alert and device data from the Armis platform.


## Prerequisites

To collect alerts and device logs from Armis platform, you must have an authorized Armis account. Armis APIs use an authorization token to make authorized calls to the API. This section demonstrates how to obtain a token from the Armis (UI).


## States

The Armis API integration Source is a device security platform that discover devices, tracks behavior, detects threats, and takes action to protect your business.
When a Armis API Source is created, it goes through the following states:
1. **Pending**. Once the Source is submitted, it is validated, stored, and placed in a **Pending** state.
1. **Started**. A collection task is created on the Hosted Collector.
1. **Initialized**. The task configuration is complete in Sumo Logic.
1. **Authenticated**. The Source successfully authenticated with Armis api.
1. **Collecting**. The Source is actively collecting data from Armis api .

If the Source has any issues during any one of these states, it is placed in an **Error** state.

When you delete the Source, it is placed in a **Stopping** state. When it has successfully stopped, it is deleted from your Hosted Collector.
On the [Collection page](/docs/manage/health-events#collection-page), the Health and Status for Sources is displayed. Use [Health Events](/docs/manage/health-events.md) to investigate issues with collection.

Hover your mouse over the status icon to view a tooltip with a count of the detected errors and warnings. You can click on the status icon to open a Health Events panel with details on each detected issue.


## Data Sources

The Armis API Integration consumes the following data sources and send it to Sumo Logic.
* Collections alert data from the alert API and will be forwarded to Sumo Logic as SIEM data.
* Collect device data from the device API and will be forwarded to Sumo Logic as Inventory data.


## Setup and Configuration

In this configuration, you will set up a Armis source account and configure it to be authorized and authenticated to use device logs and alerts from Armis API.
To obtain a Armis auth token, follow the steps below:
1. Log into the [Armis](https://armis.com/) application.
1. Navigate to **Settings** > **API Management** on your Armis application.
    <img src={useBaseUrl('img/send-data/armis-settings.png')} alt="armis-settings.png" width="900" />
1. Create a new API secret key if you haven't created yet. Click **Create** button from API Management page.

    <img src={useBaseUrl('img/send-data/create-api.png')} alt="create-api.png" width="=700" />

1. Click **Show** to view the secret key.

   <img src={useBaseUrl('img/send-data/show-secretkey.png')} alt="show-secretkey.png" width="700" />

1. A popup window will be displayed, copy and paste the secret key to a folder location. Remember, you will need to enter this key while creating the **Armis Cloud-to-Cloud Source**.  <img src={useBaseUrl('img/send-data/show-key.png')} alt="show-key.png" width="400" />

## Create an Armis Source

When you create a Armis Source, you add it to a Hosted Collector. Before creating the Source, identify the Hosted Collector you want to use or create a new Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
To configure a Armis Source:
1. In Sumo Logic, select **Manage Data > Collection > Collection**. 
1. On the Collection page, click **Add Source** next to a Hosted Collector.
1. Select **Armis**.
    <img src={useBaseUrl('img/send-data/armis-icon.png')} alt="armis-icon.png" width="150" />

1. Enter a **Name** for the Source. The description is optional.
    <img src={useBaseUrl('img/send-data/armis-config-main.png')} alt="armis-config-main" width="450" />

1. (Optional) For **Source Category**, enter any string to tag the output collected from the Source. Category metadata is stored in a searchable field called `_sourceCategory`.
1. (Optional) **Fields.** Click the **+Add Field** link to define the fields you want to associate, each field needs a name (key) and value.

   * ![green check circle.png](/img/reuse/green-check-circle.png) A green circle with a check mark is shown when the field exists in the Fields table schema.
   * ![orange exclamation point.png](/img/reuse/orange-exclamation-point.png) An orange triangle with an exclamation point is shown when the field doesn't exist in the Fields table schema. In this case, an option to automatically add the nonexistent fields to the Fields table schema is provided. If a field is sent to Sumo Logic that does not exist in the Fields schema it is ignored, known as dropped.

1. In **Instance URL**, enter the Armis hostname. For example, https://armis-instance.armis.com.

 :::note
 Armis Instance URL is the Armis hostname.
 :::

1. In **Secret Key**, enter your API secret key you have generated in [Setup and Configuration](#setup-and-configuration) section.
1. In **Armis API selection**. Choose the data sources from which you want to ingest data. The integration provides the option to you to select either one or both of the data sources.

* If **Alert API** is selected, the integration will fetch alerts data.
  * Permission `Alert>Read` must be provided to fetch alerts data.
  * Data for alert will be fetched every 5 minutes.

* If **Device API** is selected, the integration will fetch device data.
  * Permission `Device>Read` must be provided to fetch device data.
  * Data for device will be fetched every 24 hours.

:::note
This step is mandatory, ensure you select one data source.
:::
1. (Optional) In **Processing Rules for Logs**, configure any desired filters, such as allow list, deny list, hash, or mask, as described in [Create a Processing Rule](/docs/send-data/collection/processing-rules/create-processing-rule).

1. When you are finished configuring the Source, click **Save**.
