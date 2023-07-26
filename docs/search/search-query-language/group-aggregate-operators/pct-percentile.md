---
id: pct-percentile
title: pct (percentile) Grouping Operator
sidebar_label: pct
---

The `pct` (percentile) operator finds the specified percentiles of a given field. 

The operator works in two ways:

* The operator returns exact percentiles at under 1,000 data points.
* At over 1,000 data points, the pct operator automatically switches to the t-digest algorithm for approximate results. This approximation is more accurate near the extremes (such as 99th and 1st percentiles) and less accurate closer to the median.

The input to the operator is a percentile. For example:

* **pct(x, 50)** gives the median (50th percentile and 0.5th quantile).
* **pct(x, 0.50)** gives the 0.5th percentile, or 0.005th quantile (for example, not the median).

## Syntax

```sql
...| pct(<field> [, percentile]) [as <field>] [by <field>]
```

```sql
...| pct(<field> [, percentile, percentile, percentile]) [by <field>]
```

## Rules

* Default alias field is named: `_<fieldname>_pct_<percentile>`
* Separate multiple percentile arguments in one query with commas.
* Multiple pct functions can be included in the same group-by aggregation.
* The pct operator supports decimal percentiles.

## Examples

```sql
| parse "filesize=*" as filesize
| pct(filesize, 75, 95) by _sourceHost
```

Running this query creates the fields `_filesize_pct_75` and `_filesize_pct_95`, corresponding to the 75th and 95th percentile file sizes for each source host.

To find the 99.9th percentile in a query, use, for example, `pct(millis, 99.9)`.
