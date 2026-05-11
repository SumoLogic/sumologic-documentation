---
id: querytimerange
title: queryTimeRange Search Operator
sidebar_label: queryTimeRange()
description: Use the `queryTimeRange` operator to return the time duration for the query being executed in milliseconds. Preferred for continuous queries and auto refresh dashboards where it provides more accurate results than queryStartTime and queryEndTime operators. Requires an alias. Essential for establishing time ranges in continuous queries and dynamic dashboard calculations.
---

The `queryTimeRange()` operator returns the time duration for the query being executed in milliseconds. You can use it to establish time ranges for your continuous queries (CQs). This is a preferred operator for queries that run in auto refresh dashboards since it is more accurate than [`queryStartTime()`](querystarttime.md) and [`queryEndTime()`](queryendtime.md) operators in these cases.

## Syntax

`queryTimeRange() as <field>`

## Rules

* An alias is required.

## Examples

To get the range of time for your query:

```sumo
error
| queryTimeRange() as range
```
