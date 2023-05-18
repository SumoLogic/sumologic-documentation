---
id: where
title: where Metrics Operator
sidebar_label: where
---

You can use the `where` operator to filter out either entire time series, or individual data points within a time series.


## Syntax

```sql
where [VALUE BOOLEAN EXPRESSION | REDUCER BOOLEAN EXPRESSION]
```

Where:

* `[VALUE BOOLEAN EXPRESSION]` is a value expression that operates on individual data points of a time series. For example,

  ```sql
  _value > 3
  ```

  For more examples, see [Filtering data points](#filtering-data-points)

* `[REDUCER BOOLEAN EXPRESSION]` evaluates the value returned from applying an aggregation function to a given time series. For example:

  ```sql
  avg > 5
  ```

  The supported reducer functions are:

  * `avg`. Returns the average of the time series.
  * `min`. Returns the minimum value in the time series.
  * `max`. Returns the maximum value in the time series.
  * `sum`. Returns the sum of the values in the time series.
  * `count`. Returns the count of data points in the time series.
  * `pct(n)`. Returns the nth percentile of the values in the time series.
  * `latest`. Returns the last data point in the time series.

For more examples, see [Filtering time series](#filtering-time-series).


## Examples

### Filtering data points

**Syntax**

```sql
where [VALUE BOOLEAN EXPRESSION]
```

**Examples**

This query filters out data points that are less or equal than 5.

```sql
metric=cpu | where _value > 5
```

This query filters out data points that are less or equal than the minimum value minus 5.

```sql
metric=cpu | where _value > min - 5
```

### Filtering time series

**Syntax 1**

This query returns the time series where the average value of its data points is greater than 3.

```sql
metric=cpu | where avg > 3
```

**Syntax 2**

This query filters out time series based on how many times the values of individual data points of a time series meet a value condition over a particular duration.

```sql
where [VALUE BOOLEAN EXPRESSION] [all | atleast n] [first | any | last] [duration]
```

Where:

* `[all | atleast n]`. Use `all` to specify that all data points within the duration must meet the value condition, or at `least n` to specify how many data points must meet the value condition.
* `[first | any | last]`. Use `first`, `any`, or `last` to specify what part of the time range that duration applies to: the start of the time range, any part of the time range, or the end of the time range.
* `[duration]` Use duration to specify the length of time to consider in the query in minutes (m), hours (h), or days (d). For example, 5m, 6h, or 1d.

  :::note
  All three of the parameters above are required.
  :::

This query only returns the time series that have only values greater than 3 for any consecutive 5 minutes of the time range.

```sql
metric=cpu | where _value > 3 all any 5m
```

This query only returns the time series that have at least three data points with values greater than 3 for any consecutive 5 minutes of the time range.

```sql
metric=cpu | where _value > 3 atleast 3 any 5m
```
