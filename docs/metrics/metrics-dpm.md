---
id: metrics-dpm
title: Metrics DPM
sidebar_label: Metrics DPM
description: Metrics DPM allows you to view metrics ingest volumes across your teams and services to find which sources are sending metrics data. 
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

Data volume for metrics is measured in data points per minute (DPM). A data point is an individual piece of data. The total number of data points being sent in a given time can give you a good idea of where the load is heaviest. For example, let's say you want to find out how much data is being sent to metrics from a certain source, host, or source category. You can look at the actual number of individual data points per minute being sent from these to determine whether they are consuming too much metrics bandwidth. Knowing the DPM for these and other kinds of data allows you to monitor your consumption rates.

You can view your data volume for metrics by navigating to **Manage Data > Metrics > Metrics DPM**. The screen provides a granular breakdown of your metrics ingestion and credits used. You can track DPM consumption by individual metric names, or by specific dimensions like cluster, host, source, and so on. With this data, you can see which sources and metrics contribute most to your credit consumption, and take necessary actions. 

Understanding the volume of metrics that you are ingesting is important because when you exceed the DPM limit, data is cached on the host and the source is throttled, reducing query performance and accuracy. For more information, see [Data Limits for Metrics](/docs/metrics/manage-metric-volume/data-limits-for-metrics/).

While you can also see metrics DPM breakdown in the [**Metrics** dashboard](/docs/integrations/sumo-apps/data-volume/#metrics) of the Data Volume app, the dashboard only shows volume usage at a source category or source host level. Use the Metrics DPM screen to get more detailed information.

:::note
To see data volume you need to have [Audit Index](/docs/manage/security/audit-indexes/audit-event-index) enabled.
:::
 
## View Metrics DPM

Navigate to **Manage Data > Metrics > Metrics DPM**.

 <img src={useBaseUrl('img/metrics/metrics-dpm.png')} alt="Metrics DPM screen" style={{border: '1px solid black'}} width="800" />

1. **Date and time**. Select a time to see the metrics gathered for the previous hour. 
1. **Total Ingest Data Points**. The total number of data points ingested during the previous hour. The green up arrow indicates the total is higher than the previous hour, and a red down arrow indicates the total is lower than the previous hour. This lets you see at a glance whether volume rates are rising or falling.
1. **Ingest DPM**. The data points per minute (DPM) ingested during the previous hour.
1. **Predicted ingestion tomorrow**. The total number of data points predicted to be ingested during the next 24 hours. Sumo Logic uses past data ingestion trends to make predictions.
1. **Top 100 DPM by Metric**. The top metric names that have the highest data points ingested. Click a specific metric on the diagram to see a breakdown of ingest for that metric.  
1. **Top 100 DPM by Dimension**. The top dimensions that are present in metrics data ingested. A _dimension_ refers to metadata that uniquely identifies what the metric measures. For example, `_sourceCategory`, `sourceName`, `_collector`, and `container` are examples of dimensions. Click a dimension on the diagram to see a breakdown of metric ingest for that dimension.
1. **Top 100 DPM by Content Type**. The top data points per minute by content type. Click a content type on the diagram to see a breakdown of ingest.
1. **Top 100 DPM by Source**. The top data points per minute by source. Click a source on the diagram to see a breakdown of ingest.
1. **Ingest Breakdown**. The breakdown of information about data ingestion. When you click an item on a diagram or on a table, filters used for the ingest breakdown are displayed. 

## Query the sumologic_volume index

You can obtain the same information displayed in the Metrics DPM screen by querying the `sumologic_volume` index. Adjust the query as needed to perform custom analysis.

Following is an example query that lists the metric names that account for metrics data ingested arranged in descending order based on their DPM contribution.
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
Following is an example query that computes the average DPM ingestion for a given time period.
```
(_index=sumologic_volume _sourceCategory=byMetricDataPoints)
| parse "intervalStart: *\n" as interval
| parse regex "\n(?<singleRecord>.*)" multi
| split singleRecord delim=';' extract 1 as metric, 2 as dpCount
| num(dpCount)
| sum(dpCount) as dpm
| round(dpm / 60, 0) as dpm
```
