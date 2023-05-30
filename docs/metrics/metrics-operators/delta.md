---
id: delta
title: delta Metrics Operator
sidebar_label: delta
---


The `delta` operator computes the backward difference at each data point in the time series to determine how much the metric has changed from its last value in the series.

The `delta` operator updates the `metric` dimension, if present, to `delta($metric)`. If the original time series does not have a `metric` dimension, it creates `metric=delta` dimension. Other dimensions remain unaffected.

You can use the `increasing` or `decreasing` option, to make `delta` consider only pairs of consecutive points where the second point is greater or less than the first point. This functionality is useful when you are calculating the positive or the negative difference of a counter over time.

## Syntax

```sql
delta [increasing | decreasing]
```

## Examples

### Difference in a metric value from previous point

This query returns a time series that reflects the difference in the `Net_InBytes`  metric for the eth0 interface  between a charted value and the one preceding it.

```sql
metric=Net_InBytes Interface=eth0 | delta
```

### Positive difference in a metric over time

This query returns a time series that reflects the difference in the `elasticsearch_jvm_mem_heap_used_in_bytes`  metric between a charted value and the one preceding it, only considering pairs of consecutive points where the second point is greater than the first point.

```sql
metric=elasticsearch_jvm_mem_heap_used_in_bytes | delta increasing
```
