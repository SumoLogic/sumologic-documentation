---
id: metric-quantization
title: Metrics Quantization
sidebar_label: Metrics Quantization
description: Learn about how Sumo aggregates metric data points over time buckets.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo ingests individual metric data points from your metric sources. In metric visualizations, rather than charting individual data points, Sumo presents the aggregated value of the data points received during an interval.

Quantization is the process of aggregating metric data points for time series over an interval, for example, an hour or a minute, using a particular aggregation function: `avg`, `min`, `max`, `sum`, or `count`.


### Quantization terminology

This section defines the quantization-related terms we use in Sumo. So, what is quantization? At a high level, it’s the process that Sumo Logic performs on raw data points to produce the aggregated metric values that your metric queries run against.


#### Buckets

We use the term _bucket_ to refer to the intervals across which Sumo quantizes your metrics.

When you run a metric query, Sumo divides up your metric query time range into contiguous buckets, either automatically, or based on the interval you specify in the `quantize` operator. For example, given this query:

```sql
metric=CPU_Idle | quantize to 15m
```

Sumo divides your time range into 15 minute buckets.

For each bucket, Sumo uses a rollup type, described below, to aggregate the values of all the data points in the bucket. The aggregated values are displayed in your metric visualization or processed further in the pipeline.

By default, Sumo uses the `avg` rollup type. You can specify another rollup type by using the `quantize` operator, as described in [Quantize with rollup type specified](/docs/metrics/introduction/metric-quantization#quantize-with-rollup-type-specified) below.


#### Rollup types

We use the term rollup to refer to the aggregation function Sumo uses when quantizing metrics. This table describes the different rollup types you can select when running a query.

<table>
  <tr>
   <td><strong>Rollup type</strong>   </td>
   <td><strong>Description</strong>   </td>
  </tr>
  <tr>
   <td><code>avg</code> </td>
   <td>Calculates the average value of the data points for a time series in each bucket. </td>
  </tr>
  <tr>
   <td><code>min</code> </td>
   <td>Calculates the minimum value among the data points for a time series in each bucket.   </td>
  </tr>
  <tr>
   <td><code>max</code>   </td>
   <td>Calculates the maximum value among the data points for a time series in each bucket. </td>
  </tr>
  <tr>
   <td><code>sum</code></td>
   <td>Calculates the sum of the values of the data points for a time series in each bucket. </td>
  </tr>
  <tr>
   <td><code>count</code></td>
   <td>Calculates the count of data points for a time series in each bucket. </td>
  </tr>
</table>

Sumo quantizes metrics upon ingestion and at query time.

### Quantization at ingestion

Upon ingestion, Sumo quantizes raw metric data points to one hour resolutions for all rollup types: `avg`, `min`, `max`, `sum`, and `count`. This data is stored in one hour rollup tables in Sumo. The raw data is stored in a table referred to as the baseline table. For information about retention times, see [Metric Ingestion and Storage](/docs/metrics/manage-metric-volume/metric-ingestion-and-storage.md).

### Automatic quantization at query time

This section describes how Sumo quantizes metrics when you run a metric query without specifying quantization interval.

If you do not use the `quantize to INTERVAL` in your metric query, Sumo automatically determines an optimal quantization interval, based on the age of the data you are querying and the query time range. The quantization interval is shown at the top of the metric query tab.


<img src={useBaseUrl('img/metrics/quantization-query-time.png')} alt="metrics" />


The age of the metrics in the time range governs the minimum quantization interval (based on what rollups are available for the query time range). Sumo retains only the last 30 days of raw metric data. So, when you query metrics that are more than 30 days old, Sumo must quantize the data to at least 1 hour, because that’s the minimum resolution rollup available given the age of the data.

If you want, you can override the automatic quantization interval. In the Metrics Explorer’s basic mode you can set the quantization interval in the row creator in the UI. In advanced mode, use the `quantize` operator and specify the interval that fits your need

Sumo Logic sets the actual quantization interval to be as close to your selection as possible. If it is not possible to set the actual interval to the targeted interval—typically because too many buckets would be produced to reasonably show on the chart—Sumo displays a message like the following:

<img src={useBaseUrl('img/metrics/quantization-warning.png')} alt="metrics" />

Sumo Logic will never decrease the quantization interval that you specify. We’ll either use that interval, or increase it as appropriate.


#### How Sumo chooses rollup table and quantization interval

If you do not specify a rollup type in your query, Sumo Logic will run the query using the `avg` rollup.

The table below shows how Sumo Logic selects a quantization interval based on query time range, in the case that you do not specify those options explicitly using the `quantize` operator.

| Query time range | Default quantization interval |
|:---|:---|
| 400 days | 1 day |
| 200 days | 1 day |
| 150 days | 12 hours |
| 90 days | 6 hours |
| 30 days | 2 hours |
| 14 days | 1 hour |
| 7 days | 1 hour |
| 3 days | 1 hour |
| 2 days | 10 minutes |
| 1 day | 5 minutes |
| 6 hours | 1 minute |
| 3 hours | 30 seconds |
| 1 hour | 15 seconds |

### Explicit quantization at query time  

When you run a metric query, you can optionally use [Metrics Quantize Operator](/docs/metrics/metrics-operators/quantize.md) to specify a quantization interval, rollup type, or both.

When you run a query with the `quantize` operator, the way that Sumo quantizes your metric data points depends on the rollup type you specify, if any, in the `quantize` clause of your query. Rollup types include `avg`, `min`, `max`, `sum`, and `count`.

:::note
Specifying rollup type and quantization interval is optional for the `quantize` operator, however, one of them needs to be present.
:::

#### Quantize with rollup type specified  

To specify the rollup type for quantization, include the `quantize` operator as the first operator in your query (immediately after the selector), and specify the rolloup type with the `using` clause. For example, given this query:

```sql
metric=CPU_Idle | quantize to 15m using sum
```

Sumo will quantize to the `sum` rollup type.

Also, you can skip specifying target quantization interval:

```sql
metric=CPU_Idle | quantize using max
```

In this case, Sumo Logic will automatically determine appropriate quantization interval and quantize to the `max` rollup type.

:::note
If the `quantize` operator in your query is preceded by another metrics operator, a rollup type you specify with `using` will be ignored – it will not be applied at the selector level.
:::

#### Quantize with no rollup type specified  

If your metrics query uses the `quantize` operator without specifying a rollup type, internally, Sumo Logic uses the default `avg` rollup.

For example, given this query:

```sql
metric=CPU_Idle | quantize to 15m
```

15-minute interval and `avg` rollup will be used.
