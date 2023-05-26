---
id: accum
title: accum Metrics Operator
sidebar_label: accum
---


The `accum` operator creates a series of running totals for each metric time series. The running total in each series starts from the value of the first data point in the series, then iteratively adds up successive
values.

`accum` is useful for metrics where the cumulative value over time is of interest, for instance the number of failed or successful transactions.

## Syntax

```sql
accum
```

## Example

This query calculates the running total for the `success.count` metric: `success.count | accum`.

If the values of success.count during the time range are: `59, 69, 57, 64, 47, 51, 62, 58, 70, 60`.

`accum` produces the following accumulated totals for those values: `59, 128, 185, 249, 296, 347, 409, 467, 537, 597`.

In the metric chart below, the green time series is the result of using
`accum`:

`SuccessCount | accum`

The orange time series shows the results without the `accum` operator.

![accum.png](/img/metrics/accum.png)  
 
