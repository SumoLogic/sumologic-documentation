---
id: chart-search-results
title: Chart Search Results
description: In the Aggregates tab, in addition to the standard table view, you can view search results as a chart, such as a bar or column chart.
---


In the **Aggregates** tab, in addition to the standard table view, you can view search results as a chart, such as a bar or column chart.

Only search results that have been aggregated using a group or aggregate operator can be charted. See [Group or Aggregate Operators](/docs/search/search-query-language/group-aggregate-operators) for a list. 

When charting aggregate results from a query, the grouping function defines the plotted values on the one axis, and the grouping operator determines the values on the other axis. For example, **group by `_sourceHost`** produces a bar or point for each host. If you're using
multiple group-by functions, a separate bar or point represents each set of grouped results.

**To chart aggregate results:**

1. From a search, run an aggregate query.
1. From the **Aggregates** tab, click a graph button on the **Aggregates** tab.

![aggregates](/img/search/get-started-search/search-basics/aggregates.png)

For this example, you can see a bar chart, but you can pick from any of the available charting options, see [Chart Panel Types](/docs/dashboards/panels) for details.

### Why are the chart options not available?

Your data may be a string data type instead of a number. Most aggregate operators will cast your data to a number, operators like `first` and `last` don't. You can cast your data to a number if needed using the `num` operator.

Example:

```sql
_sourceCategory=concierge completed execution
| parse "Execution duration: * s" as duration
| timeslice 5m
| first(duration) as duration by _timeslice
| num(duration)
| sort by duration
```

For details on casting your data to a string or numeric data type see [Casting Data to a Number or String](/docs/search/search-query-language/search-operators/manually-cast-data-string-number) for details.
