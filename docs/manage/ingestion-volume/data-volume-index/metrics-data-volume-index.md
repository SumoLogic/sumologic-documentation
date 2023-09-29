---
id: metrics-data-volume-index
title: Metrics Data Volume Index
description: The Metrics Data Volume Index contains JSON formatted messages that contain parent objects for each source data point, and child objects that detail the data points for each parent.
---


Sumo Logic populates the Metrics Data Volume Index with a set of JSON-formatted messages every five minutes. The messages contain the volume of metric data points your account is ingesting. 

You can query the index to:

* Get the total metric data volume (data points) ingested by collector, source, source name, source category, or source host. 

:::note
You cannot query the index to get storage credits. For information about storage credits, see [Cloud Flex Credits Accounts](/docs/manage/manage-subscription/cloud-flex-credits-accounts).
:::

## Message format

Each JSON message contains the parent object for each source data point, and child objects that detail the data points for each parent.

For example, a single message for collector volume data may look similar to the following, where `collector_N `is the name of a collector. The data points values are the aggregated volume for a five minute time
period.

```sql
_index=sumologic_volume _sourceCategory=sourcecategory_tracing_volume
| parse regex "\"(?<collector>[^\"]+)\"\:\{\"billedBytes\"\:(?<billedBytes>\d+)\,\"spansCount\"\:(?<spansCount>\d+)\}" multi
| timeslice 1h
|sum(billedBytes) as %"billedBytes" by _timeslice
| predict %"billedBytes" by 1h model=ar, forecast=20
| fields - billedBytes_error
```

## Querying the Metrics Data Volume index

When you query the index, the query scope must include the following:

```sql
_index=sumologic_volume _sourceCategory=<index_source_category>
```

Where `index_source_category` is one of the categories listed in the table below.

| Index Log Type | Index Source Category | Description |
|:--|:--|:--|
| Collector | `collector_metrics_volume` | Use this source category to query metric volume by collector. |
| Source | `source_metrics_volume` | Use this source category to query metric volume by source. |
| SourceName | `sourcename_metrics_volume` | Use this source category to query metric volume by source name.  |
| SourceCategory | `sourcecategory_metrics_volume` | Use this source category to query metric volume by source category. |
| SourceHost | `sourcehost_metrics_volume` | Use this source category to query metric volume by source host.  |
| Logs-to-Metrics | `logstometricsrulename_metrics_volume` | Use this source category to query metric volume by logs-to-metrics rule. |

## Metric volume query examples

### Metric volume by source category

This query returns the metric volume by source category.

```sql
_index=sumologic_volume _sourceCategory="sourcecategory_metrics_volume"
| parse regex "\"(?<sourcecategory>[^\"]+)\"\:\{\"dataPoints\"\:(?<datapoints>\d+)\}" multi
| sum(datapoints) as datapoints by sourcecategory
```

It returns results like these:

![metric-volume-source-category](/img/ingestion-volume/metric-volume-source-category.png)

### Metric volume by collector

This query returns the metric volume by collector.

```sql
_index=sumologic_volume  _sourceCategory="collector_metrics_volume"
| parse regex "\"(?<collector>[^\"]+)\"\:\{\"dataPoints\"\:(?<datapoints>\d+)\}" multi
| sum(datapoints) as datapoints by collector
```

It returns results like these:

![metric-volume-collector.png](/img/ingestion-volume/metric-volume-collector.png)

### Metric volume for a specific collector

This query returns the metric volume for a specific Collector. The Collector name can be supplied within using the where operator to get the ingest data for a specific Collector.

```sql
_index=sumologic_volume  _sourceCategory="collector_metrics_volume"
| parse regex "\"(?<collector>[^\"]+)\"\:\{\"dataPoints\"\:(?<datapoints>\d+)\}" multi
| where collector= "<<collector_name>>"
| sum(datapoints) as datapoints by collector
| fields datapoints
```

### Query for metric ingestion outliers 

This query runs against the metrics volume index and uses the [outlier](/docs/search/search-query-language/search-operators/manually-cast-data-string-number) operator to find timeslices in which your metric ingestion in DPM was greater than the running average by a statistically significant amount. 

```
_index=sumologic_volume _sourceCategory=sourcecategory_metrics_volume
| parse regex "\"(?<collector>[^\"]+)\"\:\{\"dataPoints\"\:(?<datapoints>\d+)\}" multi
| timeslice 6h
| sum(datapoints) as datapoints by _timeslice
| outlier datapoints
```

The suggested time range for this query is 7 days. Timeslices can always be reduced depending on the time range of the query.

### Query for metric ingestion prediction 

This query runs against the metrics volume index and uses the [predict](/docs/search/search-query-language/search-operators/predict) operator to predict future values.

```
_index=sumologic_volume _sourceCategory=sourcecategory_metrics_volume datapoints
| parse regex "\"(?<collector>[^\"]+)\"\:\{\"dataPoints\"\:(?<datapoints>\d+)\}" multi
| timeslice 1h
| sum(datapoints) as datapoints by _timeslice
| predict datapoints by 1h model=ar, forecast=20
| fields - datapoints_error
```

The suggested time range for this query is 7 days. Timeslices can always be reduced depending on the time range of the query.
