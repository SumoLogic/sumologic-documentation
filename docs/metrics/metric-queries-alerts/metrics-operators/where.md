---
id: where
title: where
---


You can use the `where` operator to filter data points by value.

where is somewhat analogous to the [filter](https://help.sumologic.com/Metrics/Metric-Queries-and-Alerts/07Metrics_Operators/filter). metrics operator. However, `filter` only supports filtering entire time series; in contrast, `where` allows you to filter by data point value.


The `where` operator is currently supported in the Metric Explorer's [advanced mode](https://help.sumologic.com/Metrics/Metric-Queries-and-Alerts/02Metrics_Explorer#About_Advanced_Mode_UI), not in basic mode.


### Syntax

```sql
selectors | where _value [VALUE BOOLEAN EXPRESSION | REDUCER BOOLEAN EXPRESSION] [_granularity]
```


Where:

* `_value` is the placeholder for each data point in the time series.
* `_granularity` is the placeholder value for the length of the quantization bucket in milliseconds.
* `[VALUE BOOLEAN EXPRESSION]` is a value expression that operates on individual data points of a time series. For example, `> 3`.
* `[REDUCER BOOLEAN EXPRESSION]` is an expression that takes all the values of a given time series, uses a function to reduce them to a single value, and evaluates that value. The supported functions are listed in the [eval](https://help.sumologic.com/Metrics/Metric-Queries-and-Alerts/07Metrics_Operators/eval) topic.


### Examples

**Example 1**

This query returns the data points in which the value is greater than 10 and less than 30.

```sql
metric=xyz | where _value > 10 and _value < 30
```


**Example 2**

This query returns the data points in which the value is greater than or equal to the maximum value in the time series.

```sql
metric=xyz | where _value >= max - 5
```
