---
id: percentile-pct
---

# percentile (pct)

The pct operator finds the specified percentiles of a given field. 

The operator works in two ways:

1.  The operator returns exact percentiles at under 1,000 data points.
2.  At over 1,000 data points, the pct operator automatically switches
    to the t-digest algorithm for approximate results. This
    approximation is more accurate near the extremes (e.g., 99th and 1st
    percentiles) and less accurate closer to the median.

The input to the operator is a percentile. For example:

* **pct(x, 50)** gives the median (50th percentile and 0.5th
    quantile).
* **pct(x, 0.50)** gives the 0.5th percentile, or 0.005th quantile
    (i.e., not the median).

## Syntax

* `...| pct\<fiel\> [, percentile]) [as\<fiel\>] [by\<fiel\>]`
* `...| pct\<fiel\> [, percentile, percentile, percentile]) [by\<fiel\>]`

## Rules

* Default alias field is named: `\<fieldnam\>_pct\<percentil\>`
* Separate multiple percentile arguments in one query with commas.
* Multiple pct functions can be included in the same group-by
    aggregation.
* The pct operator supports decimal percentiles.

## Examples

`| parse "filesize=*" as filesize | pct(filesize, 75, 95) by _sourceHost`

Running this query creates the fields `_filesize_pct_75` and
`_filesize_pct_95`, corresponding to the 75th and 95th percentile file
sizes for each source host.

To find the 99.9th percentile in a query, use, for example,
`pct(millis, 99.9)`.
