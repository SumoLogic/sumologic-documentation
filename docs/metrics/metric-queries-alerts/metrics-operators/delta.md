---
id: delta
title: delta
sidebar_label: delta
description: The delta operator computes the backward difference at each data point in the time series to determine how much the metric has changed from its last value in the series.
---

Computes the backward difference at each data point in the time series to determine how much the metric has changed from its last value in the series.

The `delta` operator updates the `metric` dimension, if present, to `delta($metric)`. If the original time series does not have a `metric` dimension, it creates `metric=delta` dimension. Other dimensions remain unaffected.

## delta syntax

```sql
metric query | delta
```

## delta examples

### Difference in a metric value from previous point

This query returns a time series that reflects the difference in the `Net_InBytes`  metric for the eth0 interface  between a charted value and the one preceding it. 

```sql
metric=Net_InBytes Interface=eth0 | delta
```  
 
