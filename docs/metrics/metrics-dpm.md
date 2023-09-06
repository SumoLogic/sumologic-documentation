---
id: metrics-dpm
title: Metrics DPM
sidebar_label: Metrics DPM
description: Metrics DPM allows you to view metrics ingest volumes across your teams and services to find which sources are sending metrics data. 
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Data volume for metrics is measured in data points per minute (DPM). You can view your data volume for metrics by navigating to **Manage Data > Metrics > Metrics DPM**. The screen not only shows you which sources are sending metrics data, but how much, peaks, average, and credits used, as well as more granular information broken down by cluster, host, source, metrics cardinality, and reporting frequency. This data allows you to see which sources and metrics contribute most to your credit consumption.  

It is important to understand the volume of metrics that you are ingesting into Sumo Logic, because when the DPM limit is exceeded, data is cached on the host and the source is throttled. For more information, see [Data Limits for Metrics](/docs/metrics/manage-metric-volume/data-limits-for-metrics/).

While you can also see metrics DPM breakdown in the [**Metrics** dashboard](/docs/integrations/sumo-apps/data-volume/#metrics) of the Data Volume app, the dashboard only shows volume usage at a source category or source host level. Use the Metrics DPM screen to get more detailed information.
 
 ## View Metrics DPM

Navigate to **Manage Data > Metrics > Metrics DPM**.

 <img src={useBaseUrl('img/metrics/metrics-dpm.png')} alt="Metrics DPM screen" style={{border: '1px solid black'}} width="800" />

 1. Date and time. Select a time to see the metrics gathered for the previous hour. <!-- What is the UTC time zone shown? -->
 1. **Total Ingest Data Points**. The total number of data points ingested during the previous hour. The green up arrow indicates the total is higher than the previous hour, and a red down arrow indicates the total is lower than the previous hour. This lets you see at a glance whether volume rates are rising or falling.
 1. **Ingest DPM**. The data points per minute (DPM) ingested during the previous hour.
 1. **Predicted ingestion tomorrow**. The total number of data points predicted to be ingested during the next 24 hours. 
 1. **Top 100 DPM by Metric**. The top data points per minute ingested divided by metric. Click a metric on the diagram to see a breakdown of ingest.  
 1. **Top 100 DPM by Dimension**. The top data points per minute ingested by dimension. A _dimension_ refers to metadata that uniquely identifies what the metric measures. For example, `_sourceCategory`, `sourceName`, `_collector`, and `container` are examples of dimensions. Click a dimension on the diagram to see a breakdown of ingest. 
 1. **Top 100 DPM by Content Type**. The top data points per minute by content type. Click a content type on the diagram to see a breakdown of ingest.
 1. **Top 100 DPM by Source**. The top data points per minute by source. Click a source on the diagram to see a breakdown of ingest.
 1. **Ingest Breakdown**. The breakdown of information about data ingestion. When you click an item on a diagram or on a table, filters used for the ingest breakdown are displayed. 

## Query the sumologic_volume index

You can obtain the same information displayed in the Metrics DPM screen by querying the `sumologic_volume` index. Adjust the query as needed to perform custom analysis.

Following is an example query.
```
(_index=sumologic_volume _sourceCategory=byMetricDataPoints) 
| parse "intervalStart: *\n" as interval 
| parse regex "\n(?<singleRecord>.*)" multi 
| split singleRecord delim=';' extract 1 as metric, 2 as dpm 
| sum(dpm) as totalDp group by metric 
| round(totalDp / 60, 0) as dpm 
| order by dpm desc 
| fields -totalDp
```