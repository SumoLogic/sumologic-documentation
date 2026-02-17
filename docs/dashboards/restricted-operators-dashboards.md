---
id: restricted-operators-dashboards
title: Restricted Operators in Dashboards
sidebar_label: Restricted Operators in Dashboards
description: Learn more about the restrictions when you use operators with dashboards.
---

This page has information about restrictions and rules about using [Sumo Logic log search operators](/docs/search/search-query-language) with dashboards.

## Dashboard restrictions

The following operators cannot be used with dashboards:

* `Details`
* [`LogReduce`](/docs/search/behavior-insights/logreduce/logreduce-operator)
* [`LogCompare`](/docs/search/behavior-insights/logcompare)
* [`Parse multi`](/docs/search/search-query-language/parse-operators/parse-variable-patterns-using-regex/#parse-multi)
* `Sample` (internal-use operator)
* [`Save`](/docs/search/search-query-language/search-operators/save)

## Auto refresh restrictions

The following operators cannot be used in Auto refresh:

* `Compare With` can be used when your query's aggregate operation is grouped by a [timeslice](/docs/search/search-query-language/search-operators/timeslice)
* `Details`
* [`First`, `Last`](/docs/search/search-query-language/group-aggregate-operators/first-last/) - instead use the **withtime** option, see [`most_recent` and `least_recent`](/docs/search/search-query-language/group-aggregate-operators/most-recent-least-recent).
* [`Join`](/docs/search/search-query-language/search-operators/join/)
* [`LogReduce`](/docs/search/behavior-insights/logreduce/logreduce-operator/)
* [`LogCompare`](/docs/search/behavior-insights/logcompare/)
* [`Now`](/docs/search/search-query-language/search-operators/now)
* [`Outlier`](/docs/search/search-query-language/search-operators/outlier/) will omit the first N (window size) data points in results because those data points are used in the training phase.
* `Parse Using`
* [`queryStartTime()`](/docs/search/search-query-language/search-operators/querystarttime)
* [`queryEndTime()`](/docs/search/search-query-language/search-operators/queryendtime)
* [`Save`](/docs/search/search-query-language/search-operators/save/)
* `Sessionize`
* [`Subquery`](/docs/search/subqueries)
* `Threat Intel`
* [`Trace`](/docs/search/search-query-language/search-operators/trace)
* [`Timeslice`](/docs/search/search-query-language/search-operators/timeslice) greater than 1 day
* [`Transactionize`](/docs/search/search-query-language/transaction-analytics/transactionize-operator/)

The following search modifier cannot be used in Auto refresh.

* `_dataTier`

## Include only after the first group-by phrase

You can use the following operators in dashboard panels:

* [`Accum`](/docs/search/search-query-language/search-operators/accum/)
* [`Backshift`](/docs/search/search-query-language/search-operators/backshift/)
* [`Diff`](/docs/search/search-query-language/search-operators/diff/)
* [`Join`](/docs/search/search-query-language/search-operators/join/)
* [`Limit`](/docs/search/search-query-language/search-operators/limit/)
* [`RollingStd`](/docs/search/search-query-language/search-operators/rollingstd/)
* [`Smooth`](/docs/search/search-query-language/search-operators/smooth/)
* [`Sort`](/docs/search/search-query-language/search-operators/sort/)
* [`Top`](/docs/search/search-query-language/search-operators/top/)
* [`Total`](/docs/search/search-query-language/search-operators/total/)
* [`Transaction`](/docs/search/search-query-language/transaction-analytics/transaction-operator/) By Flow

```sql title="Example"
"error"
| timeslice 1d
| count by _timeslice
| sort by _timeslice asc
| accum _count as running_total
```

## Notes

You can use the [`count_frequent`](/docs/search/search-query-language/group-aggregate-operators/count-count-distinct-and-count-frequent) operator in dashboard queries, but the number of results returned is limited to the top 100 most frequent results. All results are available when the search is run on the **Search** page, but only the top 100 are displayed in the Panel.
