---
id: queryendtime
title: queryEndTime Search Operator
sidebar_label: queryEndTime()
---

The `queryEndTime()` operator returns the end time of the search <a href="/docs/search/get-started-with-search/build-search/set-time-range">time range</a> in milliseconds. You can use it in combination with <a href="#queryStartTime">queryStartTime()</a> to establish times and ranges for your non-continuous queries.

:::note
For dashboards in live mode or real time scheduled searches queryTimeRange() is a more suitable option. In most cases the results would still be the same as using queryStartTime() and queryEndTime(), but the latter can be off from the real range by a few milliseconds.
:::

## Syntax

```sql
queryEndTime() as <field>
```

## Rules

* An alias is required.

## Examples

To get a duration of your query:

```sql
error
| (queryEndTime() - queryStartTime()) as duration
```

To list start time, end time, and duration:

```sql
error
| queryStartTime() as starttime
| queryEndTime() as endtime
| (endtime - starttime) as duration
```
