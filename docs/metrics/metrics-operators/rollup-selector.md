---
id: rollup-selector
title: rollup selector Metrics Operator
sidebar_label: rollup selector
---

:::note
Currently, Rollup Selector is available in the Metric Explorer's advanced mode only, not in basic mode.
:::

In a metric query selector, before the first pipe in your query, you can use a Rollup Selector to specify how you want the raw data points to be aggregated. Specifically, you can select what rollup function to use (`avg`, `min`, `max`, `count`, or `sum`), and the duration of time over which you want to aggregate data points.

This control over rollup behavior is useful because otherwise,

Sumo Logic will use the default rollup, which is usually avg. (Exceptions: if a query has a max or min aggregation after the first pipe, the query will run against the max or min rollup respectively.)
Sumo Logic will and will automatically choose a rollup duration to limit the number of data points per returned time series to 300.

## Syntax
You include a rollup selection in the scope of your query, before the first pipe.

```sql
query selector aggregator over duration
```

Where:

* `aggregator` is one of avg, min, max, count, or sum.
* `duration` is the length of time over which you want to aggregate the data, in milliseconds (ms), seconds (s), minutes (m), hours (h), or days (d).

## Rules

You must supply both an aggregation function and duration.
Sumo Logic supports a maximum of 300 data points per time series, so, if you choose a duration that would return more than that, we will automatically choose a more granular duration.

## Example
When this query is run, the matching data points will be rolled up using the sum rollup type, over a 5 minute duration.

```sql
metric=cpu_idle [sum over 5m] | max
```
