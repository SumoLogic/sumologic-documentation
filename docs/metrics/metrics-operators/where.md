---
id: where
title: where Metrics Operator
sidebar_label: where
description: Use the where metrics operator to filter out entire time series or individual data points within a time series using value boolean expressions or reducer boolean expressions.
---

You can use the `where` operator to filter out either entire time series, or individual data points within a time series.


## Syntax

```metrics
where [VALUE BOOLEAN EXPRESSION | REDUCER BOOLEAN EXPRESSION]
```

Where:

* `VALUE BOOLEAN EXPRESSION` is a value expression that operates on individual data points of a time series. For example, `_value > 3`.
* `REDUCER BOOLEAN EXPRESSION` evaluates the value returned from applying an aggregation function to a given time series. For example, `avg > 5`. The supported reducer functions are: `avg`, `min`, `max`, `sum`, `count`, `pct(n)`, `latest`.

To filter by a value condition over a time window, use the extended syntax:

```metrics
where [VALUE BOOLEAN EXPRESSION] [all | atleast n] [first | any | last] [duration]
```

Where:

* `all | atleast n` — use `all` to require every data point within the duration to meet the condition, or `atleast n` to specify a minimum count.
* `first | any | last` — the part of the time range the duration applies to: the start, any part, or the end.
* `duration` — length of time in minutes (m), hours (h), or days (d). For example, `5m`, `6h`, or `1d`.

:::note
All three of the extended parameters above are required when using the time window form.
:::


## Examples

### Filtering data points

This query filters out data points that are less than or equal to 5.

```metrics
metric=CPU_Idle | where _value > 5
```

This query filters out data points that are less than or equal to the minimum value minus 5.

```metrics
metric=CPU_Idle | where _value > min - 5
```

### Filtering time series

This query returns the time series where the average value of its data points is greater than 3.

```metrics
metric=CPU_Idle | where avg > 3
```

This query returns only the time series that have all values greater than 3 for any consecutive 5 minutes of the time range.

```metrics
metric=CPU_Idle | where _value > 3 all any 5m
```

This query returns only the time series that have at least three data points with values greater than 3 for any consecutive 5 minutes of the time range.

```metrics
metric=CPU_Idle | where _value > 3 atleast 3 any 5m
```
