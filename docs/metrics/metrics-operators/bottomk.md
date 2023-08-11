---
id: bottomk
title: bottomk Metrics Operator
sidebar_label: bottomk
---


The `bottomk` operator applies a specified aggregation function to the time series that match the query selector, and returns the n time series that have the lowest evaluated value over the query time range.  

## Syntax

```sql
bottomk (N, SCALAR_EXPRESSION) [by FIELD [, FIELD, ...]]
```

Where: 

`N` is the number of time series to chart

`SCALAR_EXPRESSION` is one these functions:

| Function | Description |
|:--|:--|
| min | Rank matching time series by which had the minimum value of the metric across the time range, and return the bottom n time series.  |
| max | Rank matching time series by which had the maximum value of the metric across the time range, and return the bottom n time series. |
| avg | Rank matching time series by the average value of the metric across the time range, and return the bottom n time series.  |
| count | Rank matching time series by the count of the metric values across the time range, and return the  bottom n time series.  |
| sum | Rank matching time series by the sum of the metric values across the time range, and return the bottom n time series. |
| pct(n) | Return the n time series for which the calculated percentile of the metric values across the time range was lowest, and return the bottom n. |
| latest | Rank matching time series by the value of the most recently ingested data point, and return the bottom n time series.  |

## Examples

### Bottom time series by avg value

This query ranks the time series that match the query selector by the average value of the CPU_Sys metric over the time range, and returns the bottom 5 time series.

```sql
_contentType=HostMetrics metric=CPU_Sys | bottomk (5, avg)
```

### The 5 time series with the lowest 99% confidence interval

This query applies a math expression to each time series that match the query selector. The math expression calculates the average value over the time range, plus 3 standard deviations.  The time series are ranked by the calculated value, and the bottom 5 time series are returned.

```sql
_contentType=HostMetrics metric=CPU_Sys | bottomk (5, avg + 3 * stddev)
```

### Bottom time series by specified percentile

This query calculates 10th percentile of the  Mem_FreePercent metric for each time series that match the query, ranks the time series on that basis, and returns the bottom 5 time series. 

```sql
_contentType=HostMetrics metric=Mem_FreePercent | bottomk (5, pct (10))
```
