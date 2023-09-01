---
id: backshift
title: backshift Search Operator
sidebar_label: backshift
---

The `backshift` operator helps you compare values as they change over time. It simply shifts the data points it is given and returns them in your results in a new field.

The backshift operator can be used with [rollingstd](/docs/search/search-query-language/search-operators/rollingstd), [smooth](/docs/search/search-query-language/search-operators/smooth), or any other operators whose results could be affected by spikes of data (where a spike could possibly throw off future results).

It is important to note that `backshift` does not automatically add timeslices, nor does it do any sorting. You can manually add other operators in the query to add timeslices, for example, and any kind of sorting you'd like to include. To add time-series analysis, add `_timeslice | ... | sort + _timeslice` *before* the `backshift` operator in the query.

## Syntax

```sql
backshift <field> [, shift_length] [by <field>]
```

## Rules

* An alias for `backshift` is optional. When an alias is not provided, `_backshift` is the default alias.
* Specified fields must contain numeric values.
* To add a query that includes a `backshift` operator to a dashboard, you must add a group by function before the `backshift` operator.
* The default window length (`shift_length`) is 1.
* The maximum window length is 1000.

## Examples

Use `backshift` to see the difference of fields between time points.

Running a query like this:

```sql
_sourceCategory=Labs/Apache/Access
| timeslice by 1m
| count by _timeslice
| sort + _timeslice
| backshift _count,10 as size
```

produces results like:

![backshift_new_table.png](/img/search/searchquerylanguage/search-operators/backshift-table-1.png)

Then you can visualize the results as an area chart.

![backshift_new_graph.png](/img/search/searchquerylanguage/search-operators/area-chart-backshift-1.png)
