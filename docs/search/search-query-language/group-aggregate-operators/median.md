---
id: median
title: median Grouping Operator
sidebar_label: median
---

In order to calculate the median value for a particular field, you can utilize the [`pct` (percentile) operator](/docs/search/search-query-language/group-aggregate-operators/pct-percentile) with a percentile argument of 50.

## Syntax

```sql
pct(<field> [, 50]) [as <field>] [by <field>]
```

## Rules

* Creates a field with the naming convention: `_<field>_pct_50`

## Examples

For example:

```sql
* | parse "data=*" as data
  | pct(data, 50) as median
```

To calculate the median value of a field called `"Len: *"` as seconds, and then take the median, use the following query:

```sql
| parse "Len: *" as seconds
| pct(seconds,50) as median
```

Which would return results similar to:

![Median.png](/img/search/searchquerylanguage/group-aggregate-operators/median.png)
