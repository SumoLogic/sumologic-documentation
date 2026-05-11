---
id: in
title: in Metrics Operator
sidebar_label: in
description: Use the `in` metrics operator in query selectors as shorthand for multiple OR conditions, simplifying queries that check if a field matches any value in a list. Improves query readability and reduces repetitive OR clauses when filtering metrics by multiple possible values for a single dimension.
---


The `in` operator functionality can be used in a metrics query selector as shorthand for multiple OR conditions.

## Syntax

```sql
<selectors> <field>=(<value>[, <value>, …])
```

Where:

* `<selectors>` is one or more metadata key-value pairs or keywords that scope your query.
* `<field>` is the field (dimension) you want to match.
* `<value>` is the value of dimension that you want to limit your query to.


## Example
This example will match time series in which the value of the `dimX` field is one of the strings in the array enclosed in parentheses.

```sql
metric=CPU_Total dimX=(123, 345, 567)
```
