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
cpu | quantize to 15m
```

Sumo divides your time range into 15 minute buckets.

For each bucket, Sumo uses a rollup type, described below, to aggregate the values of all the data points in the bucket. The aggregated values are displayed in your metric visualization or processed further in the pipeline.

By default, Sumo uses the `avg` rollup type. You can specify another rollup type by using the `quantize` operator, as described in [Quantize with rollup type specified](/docs/metrics/introduction/metric-quantization#Quantize_with_rollup_type_specified) below.


#### Rollup types

We use the term rollup to refer to the aggregation function Sumo uses when quantizing metrics. This table describes the different rollup types you can select when running a query.

<table>
  <tr>
   <td><strong>Rollup type</strong>
   </td>
   <td><strong>Description</strong>
   </td>
  </tr>
  <tr>
   <td><code>avg</code>
   </td>
   <td>Calculates the average value of the data points for a time series in each bucket.
   </td>
  </tr>
  <tr>
   <td><code>min</code>
   </td>
   <td>Calculates the minimum value among the data points for a time series in each bucket.
   </td>
  </tr>
  <tr>
   <td><code>max</code>
   </td>
   <td>Calculates the maximum value among the data points for a time series in each bucket.
   </td>
  </tr>
  <tr>
   <td><code>sum</code>
   </td>
   <td>Calculates the sum of the values of the data points for a time series in each bucket.
   </td>
  </tr>
  <tr>
   <td><code>count</code>
   </td>
   <td>Calculates the count of data points for a time series in each bucket.
   </td>
  </tr>
</table>

Sumo quantizes metrics upon ingestion and at query time.

### Quantization at ingestion

Upon ingestion, Sumo quantizes raw metric data points to one hour resolutions for all rollup types: `avg`, `min`, `max`, `sum`, and `count`. This data is stored in one hour rollup tables in Sumo. The raw data is stored in a table referred to as the baseline table. For information about retention times, see [Metric Ingestion and Storage](/docs/metrics/manage-metric-volume/metric-ingestion-and-storage.md).

### Automatic quantization at query time

This section describes how Sumo quantizes metrics when you run a metric query without the `quantize` operator.

If you do not use the `quantize` operator in your metric query, Sumo automatically determines an optimal quantization interval, based on the age of the data you are querying and the query time range. The quantization interval is shown at the top of the metric query tab.


<img src={useBaseUrl('img/metrics/quantization-query-time.png')} alt="metrics" />


The age of the metrics in the time range governs the minimum quantization interval (based on what rollups are available for the query time range). Sumo retains only the last 30 days of raw metric data. So, when you query metrics that are more than 30 days old, Sumo must quantize the data to at least 1 hour, because that’s the minimum resolution rollup available given the age of the data.

If you want, you can override the automatic quantization interval. In the Metrics Explorer’s basic mode you can set the quantization interval in the row creator in the UI. In advanced mode, use the `quantize` operator and specify the interval that fits your need

Sumo Logic sets the actual quantization interval to be as close to your selection as possible. If it is not possible to set the actual interval to the targeted interval—typically because too many buckets would be produced to reasonably show on the chart—Sumo displays a message like the following:

<img src={useBaseUrl('img/metrics/quantization-warning.png')} alt="metrics" />

Sumo Logic will never decrease the quantization interval that you specify. We’ll either use that interval, or increase it as appropriate.


#### How Sumo chooses rollup table and quantization interval

If you don't specify a rollup type in your query, Sumo Logic will run the query using the `avg` rollup, unless the query contains a `max` or `min` aggregation after the first pipe, in which case the query will run against the `max` or `min` rollup respectively.

The table below shows how Sumo Logic selects a quantization interval based on query time range, in the case that you do not specify those options explicitly using the `quantize` operator.


<table>
  <tr>
   <td>Query time range
   </td>
   <td>Default quantization interval
   </td>
  </tr>
  <tr>
   <td>400 days
   </td>
   <td>1 day
   </td>
  </tr>
  <tr>
   <td>200 days
   </td>
   <td>1 day
   </td>
  </tr>
  <tr>
   <td>150 days
   </td>
   <td>12 hours
   </td>
  </tr>
  <tr>
   <td>90 days
   </td>
   <td>6 hours
   </td>
  </tr>
  <tr>
   <td>30 days
   </td>
   <td>2 hours
   </td>
  </tr>
  <tr>
   <td>14 days
   </td>
   <td>1 hour
   </td>
  </tr>
  <tr>
   <td>7 days
   </td>
   <td>1 hour
   </td>
  </tr>
  <tr>
   <td>3 days
   </td>
   <td>1 hour
   </td>
  </tr>
  <tr>
   <td>2 days
   </td>
   <td>10 minutes
   </td>
  </tr>
  <tr>
   <td>1 day
   </td>
   <td>5 minutes
   </td>
  </tr>
  <tr>
   <td>6 hours
   </td>
   <td>1 minute
   </td>
  </tr>
  <tr>
   <td>3 hours
   </td>
   <td>30 seconds
   </td>
  </tr>
  <tr>
   <td>1 hour
   </td>
   <td>15 seconds
   </td>
  </tr>
</table>

### Explicit quantization at query time  

When you run a metric query, you can optionally use the `quantize` operator to specify a quantization interval and rollup type, or both.

When you run a query with the `quantize` operator, the way that Sumo quantizes your metric data points depends on the rollup type you specify, if any, in the `quantize` clause of your query.  Rollup types include `avg`, `min`, `max`, `sum`, and `count`. (Specifying rollup type is optional for the `quantize` operator.)

#### Quantize with rollup type specified  

To specify the rollup type for quantization, include the `quantize` operator as the first operator in your query (immediately after the selector), and specify the rolloup type with the `using` clause. For example, given this query:

```sql
cpu | quantize to 15m using sum
```

Sumo will quantize to the `sum` rollup type.

:::note
If the `quantize` operator in your query is preceded by another metrics operator, a rollup type you specify with `using` will be ignored – it will not be applied at the selector level.
:::

#### Quantize with no rollup type specified  

If your metric query uses the `quantize` operator without specifying a rollup type, internally, Sumo Logic produces the default rollup, (typically, `avg`).


<table>
  <tr>
   <td><strong>Query</strong>
   </td>
   <td><strong>What Happens</strong>
   </td>
  </tr>
  <tr>
   <td><code>cpu | quantize to 1m</code>
   </td>
   <td>Use <code>avg</code> rollup.
   </td>
  </tr>
  <tr>
   <td><code>cpu | quantize to 1m | min</code>
   </td>
   <td>Use <code>min</code> rollup.
   </td>
  </tr>
  <tr>
   <td><code>cpu | quantize to 1m | max</code>
   </td>
   <td>Use <code>max</code> rollup.
   </td>
  </tr>
  <tr>
   <td><code>cpu | quantize to 1m | sum</code>
   </td>
   <td>Use <code>avg</code> rollup.
   </td>
  </tr>
  <tr>
   <td><code>cpu | quantize to 1m | count</code>
   </td>
   <td>Use <code>avg</code> rollup.
   </td>
  </tr>
  <tr>
   <td><code>cpu | quantize to 1m | avg</code>
   </td>
   <td>Use <code>avg</code> rollup.
   </td>
  </tr>
</table>

#### quantize operator is followed by a parse operator

The descriptive points might be passed through without change. For example, the `parse` operator changes time series metadata but lets data points through unchanged. For example,

```sql
... | quantize to 5s | parse field=_sourceHost - as cluster,instance | ..
```
