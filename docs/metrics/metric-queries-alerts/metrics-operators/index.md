---
slug: /metrics/metric-queries-alerts/metrics-operators
title: Metrics Operators
sidebar_label: Metrics Operators
description: Learn about how to use Sumo Logic metric query operators and run queries on a metric query tab.
---

The following table lists the metrics supported operators and provides examples of queries containing each type of operator.

## accum

[accum](accum.md) - Converts each time-series in the row to a series of running totals. The running total in each series starts from the value of the first data point in the series, then iteratively adds up successive values.

For example, if `RequestCount` is:`{ 2, 0, 4, 3, 0, 0 }`

`RequestCount | accum` is:

 `{ 2, 2, 6, 9, 9, 9 }`

Available in basic and advanced query modes.

Example: `RequestCount | accum`

## avg

[avg](avg.md) - Calculates the average of all the resulting time series. If grouping is specified, it calculates the average for each group.

`avg [by FIELD [, FIELD, ...]]`

Available in basic and advanced query modes.

Examples:

`dep=prod metric=cpu_system | avg`

`cluster=search metric=cpu_idle | avg by node`

## along

[along](along.md) - For use when joining metric queries, results in the Sumo evaluating the summation expression by one or more metric fields.

`#A + #B along [FIELD (,FIELD, ...]]`

Given joined metric queries like this:

`metric=CPU_User _sourceHost=cqsplitter-*`

`metric=CPU_Sys _sourceHost=cqsplitter-* #A + #B along _sourceHost`

The along operator causes the summation to be performed for time series whose `_sourceHost` value matches.

## bottomk

[bottomk](bottomk.md) - Select the bottom specified time series sorted by the value of a mathematical expression evaluated over the query time range.

`bottomk (number, aggregator)`

Supported aggregate functions: `min`, `max`, `avg`, `count`, `sum`, `pct(n)`, `latest`

Available in advanced query mode. Only simple aggregators supported (excluding pct) and no multiple dimensions in basic mode.

Take the bottom 5 time series with the highest maximum value: `dep=prod metric=cpu_system | bottomk (5, max)`

## count
[count](count.md) - Counts the total number of time series that match the query. If grouping is specified, it counts the total number for each group.

`count [by FIELD [, FIELD, ...]]`

Available in basic and advanced query modes.

Examples:

`dep=prod | count`

`cluster=search | count by node`

## delta
[delta](delta.md) - Computes the backward difference at each data point in the time series to determine how much the metric has changed from its last value in the series.This operator also assigns the value of the metric tag to be `delta($metric)`.​​​​​​​Available in basic and advanced query modes.

Example: `metric=Net_InBytes Interface=eth0 | delta`


## eval
[eval](eval.md) - Evaluates a time series based on a user-specified math expression.

`metrics query | eval <math expression>`

where math expression is a validmath expression with `_value` as the placeholder for each data point in the time series.

Supported Basic operations: `+`, `-`, `*`, `/`

Supported Math functions: `sin`, `cos`, `abs`, `log`, `round`, `ceil`, `floor`, `tan`, `exp`, `sqrt`, `min`, `max`

Available in basic and advanced query modes. In advanced expression terms must be separated by whitespace.

Example:

`_sourceCategory=ApacheHttpServer metrics=request_per_sec | rate | eval max(_value, 0) _sourceCategory=ApacheHttpServer metrics=cpu_idle | eval _value * 100`

## fillmissing
[fillmissing](fillmissing.md) - Fills empty time slices in metric query results with a derived data point. You can choose between several methods of deriving a data point, or leave empty timeslices empty.

`metric query | fillmissing [using] <empty | interpolation | last | fixed>`

Examples:Available in basic and advanced query modes. | `_sourceCategory=Labs/VMWare6.5/Metrics hostname=thisveryhost metric=cpu_ready | fillmissing interpolation`

## filter
[filter](filter.md) - Filters a query to help reduce the number of series returned by applying a boolean test to some aggregate quantity. `filter <aggregator> <boolean operator> <numerical value>`

Supported aggregate functions: `min`, `max`, `avg`, `count`, `sum`, `pct(n)`, `latest`

When you use `max` as the aggregation function for `filter`, you must set an upper limit, as shown in the second example in the "Examples" column to the right. ​​​​​​​Basic query mode supports only a simplified form (x >= avg).

Examples: Show only cpu metrics whose average over the time range queried is greater than 80%: `cpu | filter avg > 80` Show only cpu metrics where the min is greater than 20% and the max less than 50%: `cpu | filter min > 20 and max < 50`

## max
[max](max.md) - Calculates the maximum value of the time series that match the query. If grouping is specified, it calculates the maximum for each group.

`max [by FIELD [, FIELD, ...]]`

Examples:

`dep=prod metric=cpu_system | max`

`cluster=search metric=cpu_idle | max by node`

## min
[min](min.md) - Calculates the minimum value of the time series that match the query. If grouping is specified, it calculates the minimum for each group.

`min [by FIELD [, FIELD, ...]]`

Examples:

`dep=prod metric=cpu_system | min`

`cluster=search metric=cpu_idle | min by node`

## outlier
[outlier](outlier.md) - Identifies metrics data points that are outside the range of expected values.

​​​​​​​Available in basic and advanced query modes. Basic mode does not support `window` and `threshold`.

Example: `_sourceCategory=hostmetrics _sourceHost=nxPTY | outlier`

## parse
[parse] - Parses the given field to create new fields to use in the metrics query. If no field is specified while parsing [Graphite metrics](../../../../static/img/send-data/streaming-metrics-source.png), the metric name is used.

Each wildcard in the pattern corresponds to a specified field. The parse operator supports both lazy (shortest match) and greedy (longest match) wildcard matches. Use '*' for a lazy match, or '**' for a greedy match.

`parse [field=FIELD] PATTERN as FIELD [, FIELD, ...]`

Available in basic and advanced query modes.

Examples:

`dep=prod | parse *-search-* as deployment, instance`

`cluster=frontend | parse field=user **-* as user_id, user_type`

## pct
[pct](pct.md) - Calculates the specified percentile of the metrics that match the query. If grouping is specified, it calculates the specified percentile for each group.

`pct(DOUBLE) [by FIELD [, FIELD, ...]]`
​
Available in basic and advanced query modes.

Examples:

`dep=prod metric=cpu_system | pct(95)`

`cluster=search metric=cpu_idle | pct(99.9) by node`

## quantize
[quantize](quantize.md) - Segregates time series data by time period. This allows you to create aggregated results in buckets of fixed intervals (for example, 5-minute intervals).

`quantize to INTERVAL [using ROLLUP]`

where `ROLLUP` is `avg`, `min`, `max`, `sum` or `count`.

For information about quantization, see [Metric Quantization](../../introduction-metrics/metric-quantization.md). ​​​​​​​Available in basic and advanced query modes, excluding `drop last`.

`_sourceCategory=hostmetrics | quantize to 5m`

`logins | quantize to 5m using sum` |

## rate
[rate](rate.md) - Computes a rate based on the forward difference at each time in the time series. The difference between the current and the next recorded value in a time series is scaled to a value per second.

This operator also assigns the value of the metric tag to be rate($metric) and the value of the unit metadata field to be $unit/second.

`rate [increasing | decreasing]`

With the increasing (or decreasing) option, the operator considers only those pairs of consecutive points where the second point in the pair is greater (or less) than the first point.

Available in basic and advanced query modes.

Examples:

`metric=Net_InBytes Interface=eth0 | rate`

`metric=Net_InBytes Interface=eth0 | rate increasing`

`metric=Net_InBytes Interface=eth0 | rate decreasing`

## sum
[sum](sum.md) - Calculates the sum of the metrics values that match the query. If grouping is specified, it calculates the sum for each group.

`sum [by FIELD [, FIELD, ...]]`

Available in basic and advanced query modes.

`dep=prod metric=cpu_system | sum`

`cluster=search metric=cpu_idle | sum by node` |

## timeshift
timeshift - Shifts the time series from your metrics query by the specified amount of time. This can help when comparing a time series across multiple time periods.

`timeshift TIME_INTERVAL	cluster=search metric=cpu_idle | timeshift 5h`

`dep=prod metric=cpu_system | timeshift -1m`

## topk
[topk](topk.md) - Select the top specified time series sorted by the value of a mathematical expression evaluated over the query time range.

`topk (number, aggregator)`

Supported aggregate functions: `min`, `max`, `avg`, `count`, `sum`, `pct(n)`, `latest`

​​​​​​​Available in basic and advanced query modes.​​​​​​​ Basic mode supports only simple aggregators (excluding pct) and no multiple dimensions.

Take the top 10 time series with the highest maximum value: `metric=cpu_system | topk (10, max)`

Reduce each time series by calculating `(max / avg * 2)` for it. Sort by this reduced value and take the top 10 values: `metric=cpu_system |topk (10, max /avg * 2)`
