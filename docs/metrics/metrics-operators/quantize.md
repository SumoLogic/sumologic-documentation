---
id: quantize
title: quantize Metrics Operator
sidebar_label: quantize
---


You can use the `quantize` operator to control the Sumo’s quantization behavior, which is described in detail in [Metric Quantization](../introduction/metric-quantization.md).
You can specify:

* The size of the time buckets across which Sumo aggregates your metrics. If you do not specify a quantization interval, Sumo determines an optimum size for time buckets, as described in [Automatic quantization at query time](../introduction/metric-quantization.md).  
* The rollup type that Sumo uses to aggregate the individual data points in a time bucket, which can be one of `avg, min, max, sum,` or `count`. If you do not specify a rollup type in the `quantize` clause of your query, for each time bucket, Sumo presents the average of the data points in that bucket.  

## Syntax

:::note
The `quantize` operator *must* appear immediatdly after your query selector, before any other operators.
:::

```sql
metrics query | quantize to INTERVAL [using ROLLUP] [drop last]
```

where:

* `INTERVAL` is the duration over which you want to quantize the metrics, in seconds (`s`) , minutes (`m`), hours (`h`), or days (`d`).
* `ROLLUP` is  `avg, min, max, sum`, or `count`.
* `drop last` causes the last time bucket to be dropped, if the end of that bucket is after the end of the query time range.

:::note
In the Metrics Explorer, you must [switch to Advanced Mode](/docs/metrics/metrics-queries/metrics-explorer) to enter the `drop last` option.
:::

## Examples 

### Set time bucket size

The `quantize` clause in this metric query sets the time bucket size to 5 minutes. Sumo will aggregate the metrics in each time bucket using the default rollup type, `avg`. 

```sql
_sourceCategory=hostmetrics | quantize to 5m
```

### Set time bucket size and rollup type

The `quantize` clause in this metric query sets the time bucket size to 10 minutes, and specifies the `sum` rollup type. Sumo will sum the metric values in each 10 minute time bucket and return that value.

```sql
metric=CPU_User cluster=kafka | quantize to 10m using sum
```

### Set time bucket size, rollup type, and drop last 

The `quantize` clause in this metric query sets the time bucket size to 10 minutes, and specifies the `sum` rollup type. Sumo will sum the metric values in each 10 minute time bucket and return that value. If the last time bucket ends after the end of the query time range, that bucket is dropped.

```sql
metric=CPU_User cluster=kafka | quantize to 10m using sum drop last
```
