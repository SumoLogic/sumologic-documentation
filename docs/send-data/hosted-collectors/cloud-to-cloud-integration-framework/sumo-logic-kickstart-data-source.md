---
id: sumo-logic-kickstart-data-source
title: Sumo Logic Kickstart Data Source
sidebar_label: Sumo Logic Kickstart Data
keywords:
  - sumo-logic-kickstart-data
  - cloud-to-cloud
description: Learn how to collect audit reporting events from Sumo Logic Kickstart Data platform.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/send-data/sumo-logic-kickstart-data.png')} alt="thumbnail icon" width="100"/>

The Sumo Logic Kickstart Data source ingests logs and metrics into Sumo Logic for our pre-loaded OpenTelemetry demo application. This source is engineered to provide a continuous stream of data that simulates a specific scenario, highlighting latency spikes across various services.

:::tip
Learn more about [Kickstart Data](/docs/get-started/quickstart/#getting-started-with-kickstart-data-in-your-trial).
:::

## Data collected

| Name | Description |
| :--- | :--- |
| Initial Data             | The source ingests data from 6 hours in the past and 6 hours into the future. |
| Regular Ingestion        | Every 6 hours, the source ingests an additional 6 hours of future-dated data to ensure dashboards are always populated. |
| Latency Spike Simulation | The data demonstrate a scenario showcasing latency spikes, aiding in performance analysis and debugging. |

## Setup

### Source configuration

The Kickstart Data source is pre-installed for all users upon creation of a [new organization](/docs/manage/manage-subscription/create-and-manage-orgs).

## Removing Kickstart Data from your environment

If you're done exploring Kickstart Data and want to purge it from your environment, follow the steps below to remove it from your Sumo Logic account. This process involves updating retention settings to automatically age out the sample data.

### Step 1: Reduce retention period for the Kickstart partition

Kickstart Data is stored in a dedicated partition named `sample_otel_astronomy_shop`.

1. Navigate to the **Partitions** page in the Sumo Logic UI. See [Managing Partitions](/docs/manage/partitions) for guidance.
2. Locate the partition named `sample_otel_astronomy_shop`.
3. Edit the retention period and set it to **1 day**.
4. When prompted, click **Apply change now**.

Kickstart Data will be fully aged out and removed after 24 hours.

### Step 2: (Optional) Reduce retention for the default partition

In some cases, a small amount of Kickstart Data may also end up in the default partition named `sumologic_default`.

Only do this if you haven’t started ingesting your own data. Changing this setting will delete **all logs** in the default partition—including your own.

1. While still on the **Partitions** page, locate the partition named `sumologic_default`.
2. Edit the retention period and set it to **1 day**.
3. Click **Apply change now**.
4. After 24 hours, return to the partition settings and increase the retention back to your preferred duration (e.g., 30 days) to preserve ongoing ingested data.

### Important considerations

* Lowering the retention period causes **all data** in the partition to be deleted after 24 hours.
* If you’re actively sending production data, do not adjust retention settings on the default partition.
* Be sure to restore your original retention settings after Kickstart Data has been removed to avoid losing future log data.


## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
