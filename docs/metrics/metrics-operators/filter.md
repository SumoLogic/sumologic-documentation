---
id: filter
title: filter Metrics Operator
sidebar_label: filter
---

:::note
The functionality provided by the `filter` operator has been incorporated into the `where` operator. We recommend the use of `where` over `filter`, because `filter` will be deprecated in the future. For more information, see [`where` Metrics Operator](docs/metrics/metrics-operators/where.md)
:::

You can use the `filter` operator to limit the results returned by a metric query. There are several ways you can restrict results. You can apply an aggregation function, such as `avg`, to a time series. You can also filter based on how many times the value of individual data points meet a value condition over a particular duration.

## filter syntax

There are two supported syntaxes for the `filter` operator.

### Syntax 1

The first variant filters based on a function (usually an aggregation function) applied to the time series.

```sql
metric query | filter [REDUCER BOOLEAN EXPRESSION]
```

Where:

`[REDUCER BOOLEAN EXPRESSION]` is an expression that takes all the values of a given time series, uses a function to reduce them to a single value, and evaluates that value. 

The supported functions are:

* `avg`. Returns the average of the time series.
* `min`. Returns the minimum value in the time series.
* `max`. Returns the maximum value in the time series.
* `sum`. Returns the sum of the values in the time series.
* `count`. Returns the count of data points in the time series.
* `pct(n)`. Returns the nth percentile of the values in the time series.
* `latest`. Returns the last data point in the time series.

#### Syntax 1 examples

**Example 1**

Return the time series in which the average value of the CPU_User metric is greater than 95:

```sql
metric=CPU_User | filter avg > 95`
```

**Example 2**

Return the time series in which the latest value of the CPU_User metric is greater than 50:

```sql
metric=CPU_User | filter latest > 50
```

### Syntax 2

The second variant filters based on how many times the values of individual data points of a time series meet a value condition over a particular duration.

```sql
SELECTOR | filter _value [VALUE BOOLEAN EXPRESSION] [all | atleast n] [first | any | last] [duration]
```

Where:

* `[VALUE BOOLEAN EXPRESSION]` is a value expression that operates on individual data points of a time series. For example, `> 3`
* Use `all` to specify that all data points within the duration must meet the value condition, or `atleast n`, where `n` is a count, to specify how many data points must meet the value condition.
* Use `first`, `any`, or `last` to specify what part of the time range that duration applies to: the start of the time range, any part of the time range, or the end of the time range.
* Use `duration` to specify the length of time to consider in the query in minutes (m), hours (h), or days (d). For example, `5m`, `6h`, or `1d`.

#### Syntax 2 examples

**Example 1**

Return only the time series in which all data points during the last 5 minutes of the query time range have a value greater than 3. 

:::note
There must be a least one data point in the last 5 minutes of the time range for this to be valid.
:::

```sql
filter _value > 3 all last 5m
```

**Example 2**

Return only the time series that have at least 1 data point greater than 3 for the last 5 minutes of the query time range. 

```sql
filter _value > 3 atleast 1 last 5m
```

**Example 3**

Return only the time series that have only values greater than 3 for any consecutive 5 minutes of the time range.

```sql
filter _value > 3 all any 5m
```

**Example 4**

Return only the time series that have only values greater than 3 for the first 5 minutes of the query time range. 

:::tip
There must be a least one data point in the first 5 minutes of the time range for this to be valid.
:::

```sql
filter _value > 3 all first 5m
```  
 
