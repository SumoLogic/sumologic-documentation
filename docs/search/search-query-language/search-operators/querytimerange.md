---
id: querytimerange
title: queryTimeRange Search Operator
sidebar_label: queryTimeRange()
---

The `queryTimeRange()` operator returns the time duration for the query being executed in milliseconds. You can use it to establish time ranges for your continuous queries (CQs). This is a preferred operator for queries that are run in live dashboards or real time scheduled searches since it is more accurate than [queryStartTime](querystarttime.md) and [queryEndTime](queryendtime.md) operators in these cases.

## Syntax

```sql
queryTimeRange() as <field>
```

## Rules

* An alias is required.

## Examples

To get the range of time for your query:

```sql
error
| queryTimeRange() as range
```
