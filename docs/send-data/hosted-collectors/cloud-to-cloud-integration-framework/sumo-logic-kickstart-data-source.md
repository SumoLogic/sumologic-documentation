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

The Sumo Logic Kickstart Data source ingests logs and metrics into Sumo Logic for our pre-loaded [OpenTelemetry Demo Astronomy application](/docs/integrations/sumo-apps/kickstart-data), an e-commerce-style app that simulates real user interactions and system performance. It provides a continuous stream of data that highlights latency spikes across various services, enabling hands-on exploration of Sumo Logic features.

:::info
Kickstart Data comes preloaded for new trial users and expires automatically after 20 days or when you begin ingesting your own data—whichever comes first. [Learn more](/docs/get-started/quickstart/#getting-started-with-kickstart-data-in-your-trial).
:::

## Data collected

| Name | Description |
| :--- | :--- |
| Initial Data             | The source ingests data from 6 hours in the past and 6 hours into the future. |
| Regular Ingestion        | Every 6 hours, the source ingests an additional 6 hours of future-dated data to ensure dashboards are always populated. |
| Latency Spike Simulation | The data demonstrates a scenario showcasing latency spikes, aiding in performance analysis and debugging. |

## Setup

### Source configuration

The Kickstart Data source is automatically included when you create a new organization during your trial. [Learn more](/docs/get-started/quickstart/#getting-started-with-kickstart-data-in-your-trial).

## Kickstart Data availability and cleanup

Kickstart Data is preloaded in all new Sumo Logic Trial accounts to help you explore the platform without needing to ingest your own data. This sample data powers dashboards, log searches, and alerts using simulated application logs.

Kickstart Data is streamed continuously throughout your trial. As a result, the total volume of sample data will grow daily unless you manually stop the collector.

:::note
In some cases, the Kickstart collector may remain active beyond the 7-day period originally expected. To stop ingestion entirely, you must delete the collector manually.
:::

### How to manage or remove Kickstart Data

If you want to prevent Kickstart Data from continuing to ingest or appearing in your searches, you can choose from the following options.

#### Delete the Kickstart collector (recommended)

To stop new Kickstart Data from being ingested every 6 hours:

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the Sumo Logic top menu, select **Configuration**, and then under **Data Collection**, select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.
1. Locate the collector named `sample_otel_astronomy_shop`.
1. Delete the collector.

This action prevents further sample data from entering your account.

#### Filter Kickstart Data out of search results (optional)

To focus only on your own data in search, use a filter to exclude Kickstart logs by metadata.

Add a line like the following to your query:

```sql
_sourceCategory != "kickstart"
```

You can also filter by other metadata such as `_sourceName` or `application`, depending on your environment. Kickstart logs often include tags like `application="astronomy-shop"`.

Use this method if you prefer not to delete the collector or change any partition settings.

#### Adjusting retention settings (not recommended)

While it is technically possible to remove Kickstart Data by [reducing the retention period](/docs/manage/partitions/manage-indexes-variable-retention/#edit-the-retention-period), we do not recommend this method for most users:

* Lowering retention to 1 day may still take up to 3 days to fully remove data.
* Changing retention on the `sumologic_default` partition can result in permanent loss of your own logs.
* Creating new partitions and routing rules requires advanced knowledge of metadata and configuration.

Instead, we recommend deleting the collector and using search filters to isolate your data.

## FAQ

:::info
Click [here](/docs/c2c/info) for more information about Cloud-to-Cloud sources.
:::
