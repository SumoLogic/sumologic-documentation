---
id: eval
title: eval Metrics Operator
sidebar_label: eval
---


The eval operator evaluates a time series based on a user-specified arithmetic or mathematical function.

## Syntax

```sql
eval expr([REDUCER BOOLEAN EXPRESSION | _value] [_granularity])
```

* `expr` is basic arithmetic or mathematical function:  +, -, *, /, sin, cos, abs, log, round, ceil, floor, tan, exp, sqrt, min, max
* `_value` is the placeholder for each data point in the time series.
* `REDUCER BOOLEAN EXPRESSION` is an expression that takes all the values of a given time series, uses a function to reduce them to a single value, and evaluates that value. The supported functions are:
    * `avg`. Returns the average of the time series.
    * `min`. Returns the minimum value in the time series.
    * `max`. Returns the maximum value in the time series.
    * `sum`. Returns the sum of the values in the time series.
    * `count`. Returns the count of data points in the time series.
    * `pct(n)`. Returns the nth percentile of the values in the time series.
    * `latest`. Returns the last data point in the time series.
    * `stddev`. Returns standard deviation of the points in the time series.
* `_granularity`. Returns the length of the [quantization](/docs/metrics/introduction/metric-quantization) bucket in milliseconds. You can use this placeholder in your query.


## Examples

**Example 1**

This query returns the value of the cpu_idle metric, multiplied by 100.

```
_sourceCategory=ApacheHttpServer metric=cpu_idle | eval _value * 100
```

**Example 2**

This query sets the value of each point in a single time series to the average of all values in that time series.

```
metric=cpu | eval avg
```

For example, if you have this series, where the points are `(timestamp, value)`:

```
m1: (0, 1) (1, 2) (2, 3)
m2: (0, 3) (1, 6) (2, 9)
```

then `eval avg` would produce:

```
m1: (0, 2) (1, 2) (2, 2)
m2: (0, 6) (1, 6) (2, 6)
```

**Example 3**

This query returns the rate of change per second for the metric.

```
metric=cpu | sum | eval 1000 * _value / _granularity
```
