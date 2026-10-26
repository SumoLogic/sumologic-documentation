---
id: querytimerange
title: queryTimeRange Search Operator
sidebar_label: queryTimeRange()
description: Use the queryTimeRange operator to return the time duration for the query being executed in milliseconds.
---

The `queryTimeRange()` operator returns the time duration for the query being executed in milliseconds. You can use it to establish time ranges for your continuous queries (CQs). This is a preferred operator for queries that run in auto refresh dashboards since it is more accurate than [`queryStartTime()`](querystarttime.md) and [`queryEndTime()`](queryendtime.md) operators in these cases.

## Syntax

`queryTimeRange() as <field>`

## Rules

* An alias is required.

## Examples

### Return the query time range in milliseconds

To get the range of time for your query:

```sumo
error
| queryTimeRange() as range
```

### Calculate an event rate per time range

Use `queryTimeRange()` to normalize a count against the total query duration:

```sumo
error
| count as total_errors
| queryTimeRange() as range_ms
| (total_errors / (range_ms / 1000)) as errors_per_second
```
