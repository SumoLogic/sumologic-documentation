---
id: in
title: in Metrics Operator
sidebar_label: in
---


The `in` operator functionality can be used in a metrics query selector as shorthand for multiple OR conditions.

## Syntax

```sql
selectors dimension=(value1, value2, value3, …) | metric query
```

Where:

* `selectors` is one or more metadata key-value pairs or keywords that scope your query.
* `dimension` is the dimension (field) you want to match.
`value1`, `value2`, `value3`, and so on are values of dimension that you want to limit your query to.


## Example
This example will match time series in which the value of the `dimX` field is one of the strings in the array enclosed in parentheses.

```sql
metric=CPU_Total dimX=(123, 345, 567)
```
