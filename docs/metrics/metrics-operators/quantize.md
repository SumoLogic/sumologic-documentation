---
id: quantize
title: quantize Metrics Operator
sidebar_label: quantize
description: Use the `quantize` metrics operator to control quantization behavior by specifying time bucket size and rollup type for aggregating data points. Override automatic quantization with custom intervals (seconds, minutes, hours, days) and rollup types (avg, min, max, sum, count, rate). Essential for precise control over metric aggregation and visualization granularity.
---


You can use the `quantize` operator to control the Sumo’s quantization behavior, which is described in detail in [Metrics Quantization](/docs/metrics/introduction/metric-quantization/).

You can specify:
* The size of the time buckets across which Sumo aggregates your metrics. If you do not specify a quantization interval, Sumo determines an optimum size for time buckets, as described in [Automatic quantization at query time](/docs/metrics/introduction/metric-quantization/#automatic-quantization-at-query-time).  
* The rollup type that Sumo uses to aggregate the individual data points in a time bucket, which can be one of `avg`, `min`, `max`, `sum`, `count`, or `rate`. If you do not specify a rollup type in the `quantize` clause of your query, for each time bucket, Sumo presents the average of the data points in that bucket.  

## Syntax

```sql
quantize [to INTERVAL] [using ROLLUP] [drop last]
```

where:

* `INTERVAL` is the duration over which you want to quantize the metrics, in seconds (`s`), minutes (`m`), hours (`h`), or days (`d`).
* `ROLLUP` is  `avg`, `min`, `max`, `sum`, `count`, or `rate`.
* `drop last` causes the last time bucket to be dropped, if the end of that bucket is after the end of the query time range.
* At least one of the `to INTERVAL` or `using ROLLUP` clauses needs to be present.

:::note
To apply the quantization directly to the selector, `quantize` has to follow the selector immediately. Otherwise, it will just work on top of whatever has been returned by the previous step.
:::

:::note
In the Metrics Search, you must [switch to advanced mode](/docs/metrics/metrics-queries/metrics-explorer/#switch-betweenbasic-and-advancedmode) to enter the `drop last` option.
:::

## Examples 

### Set time bucket size

The `quantize` clause in this metric query sets the time bucket size to 5 minutes. Sumo will aggregate the metrics in each time bucket using the default rollup type, `avg`. 

```sql
_sourceCategory=hostmetrics | quantize to 5m
```

### Set time bucket size and rollup type

The `quantize` clause in this metric query sets the time bucket size to 10 minutes, and specifies the `max` rollup type. Sumo will take maximum of the metric values in each 10 minute time bucket and return that value.

```sql
metric=CPU_User cluster=kafka | quantize to 10m using max
```

### Set time bucket size, rollup type, and drop last 

The `quantize` clause in this metric query sets the time bucket size to 10 minutes, and specifies the `max` rollup type. Sumo will take maximum of the metric values in each 10 minute time bucket and return that value. If the last time bucket ends after the end of the query time range, that bucket is dropped.

```sql
metric=CPU_User cluster=kafka | quantize to 10m using max drop last
```

### Omit time bucket size

In this example we omit the `to INTERVAL` part of the query and let Sumo determine appropriate quantization interval according to [How Sumo chooses rollup table and quantization interval](/docs/metrics/introduction/metric-quantization/#quantization-at-ingestion). `max` rollup type will be used to aggregate the metrics in each time bucket.

```sql
metric=CPU_User cluster=kafka | quantize using max
```
