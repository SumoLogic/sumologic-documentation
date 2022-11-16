---
slug: /manage/ingestion-volume/data-volume-index
title: Data Volume Index
description: Provides data that helps Admins understand data ingest volume in bytes and number of log messages processed overall.
---


The Data Volume Index gives you visibility into how much data you are sending to Sumo Logic, allowing you to proactively manage your systems’ behavior and to fine tune your data ingest with respect to the data plan for your Sumo Logic subscription.

The Data Volume Index provides data for logs and metrics:

* **Logs and Tracing.** Ingest volume in bytes and the number of log messages. Tracing ingest volume in billed bytes and spans count. See [Log Ingest Data Volume Index](log-tracing-data-volume-index.md) and [Tracing Ingest Data Volume Index](metrics-data-volume-index.md) for details.
* **Metrics.** Ingest volume measured in data points. See [Metrics Ingest Data Volume Index](metrics-data-volume-index.md) for details.

The Data Volume Index must be manually enabled by an administrator. The index then begins populating. A set of messages within the index is created every five minutes. The data does not backfill and is provided to the index only when the option is enabled.

After the Data Volume Index is enabled, you can access it using this search query: 

```sql
_index=sumologic_volume
```

:::important
Creating an Index typically adds a nominal amount of data to your overall volume (approximately one to two percent) when pre-aggregated. Depending on your Sumo Logic account type and subscription, this data will count against your data volume quota.
:::

## Enable the Data Volume Index

The Data Volume Index must be enabled by an administrator.

To enable the Data Volume Index:

1. Go to the **Administration** \> **Account** \> **Data Management** page.
1. Under **Data Volume**, select **Enable**.

![data_volume_check_box.png](/img/ingestion-volume/data_volume_check_box.png)

A message confirms that the feature is enabled.

import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

## Guide contents

In this section, we'll introduce the following concepts:

<DocCardList items={useCurrentSidebarCategory().items}/>
