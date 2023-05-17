---
id: stddev
title: stddev Metrics Operator
sidebar_label: stddev
---


The `stddev` operator measures of the magnitude of deviations between the values in a time series.

Often used in financial applications, calculating standard deviations also has value in analyzing system behaviors. Measuring the standard deviation of a system metric is useful in performance analysis, transaction monitoring, and identifying or removing outliers. A low deviation value indicates that the data points tend to be very close to the mean, whereas a high deviation value indicates that the data are spread out over a large range of values. A low standard deviation implies that there is a more stable, or consistent, performance within the system.

`stddev` calculates the standard deviation at each time interval across all the time series, resulting in one time series that contains the standard deviation per time slot. If you group the results by a dimension, the standard deviation for the time series in each group is calculated. The result is returned as a metric named _stddev_.


## Syntax

```sql
metric query | stddev [by FIELD [, FIELD, ...]]
```

`stddev` isn’t supported in queries that use the `quantize` operator.

## Examples

**Example 1**

This query returns the standard deviation of the `cpu_system` metric from the _prod_ deployment.

```sql
dep=prod metric=cpu_system | stddev
```

**Example 2**

This query returns the standard deviation of the `cpu_system` metric from the _prod_ deployment, grouped by the source that collected the metrics.

```sql
dep=prod metric=cpu_system | stddev by _source
```
