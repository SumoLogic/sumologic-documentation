---
id: topk
title: topk Metrics Operator
sidebar_label: topk
---

The `topk` operator applies a specified aggregation function to the time series that match the query selector, and returns the *n* time series that have the highest evaluated value over the query time range.  

## Syntax

```sql
topk (N, SCALAR_EXPRESSION) [by FIELD [, FIELD, ...]]
```

Where: 

* `N` is the number of time series to chart
* `SCALAR_EXPRESSION` is one these functions:
    * `min`. Rank matching time series by which had the minimum value of the metric across the time range, and return the top n time series. 
    * `max`. Rank matching time series by which had the maximum value of the metric across the time range, and return the top n time series.
    * `avg`. Rank matching time series by the average value of the metric across the time range, and return the top n time series. 
    * `count`. Rank matching time series by the count of the metric values across the time range, and return the top n time series. 
    * `sum`. Rank matching time series by the sum of the metric values across the time range, and return the top n time series.
    * `pct(n)`. Return the n time series for which the calculated percentile of the metric values across the time range was lowest, and return the top n. 
    * `latest`. Rank matching time series by the value of the most recently ingested datapoint, and return the top n time series. 

## Examples

### Top 10 time series by maximum value

This query ranks the time series that match the query selector by the maximum value of the `CPU_Sys` metric over the time range, and returns the top 10 time series.

```sql
metric=CPU_Sys | topk (10, max)
```

Top 10 time series based on a calculated value.

This query applies a math expression — `(max / avg * 2)` — to each time series that matches the query selector. The time series are ranked by the calculated value, and the top 10 time series are returned.

```sql
metric=CPU_Sys |topk (10, max / avg * 2)
```
