---
id: top
title: top Search Operator
sidebar_label: top
---

Use the `top` operator with the [`sort`](/docs/search/search-query-language/search-operators/sort) operator to reduce the number of sorted results returned.

:::tip
We recommend you instead use the [`topk`](/docs/search/search-query-language/search-operators/topk) operator so you can take advantage of its additional functionality.
:::

## Syntax

```sql
top <#> <field> [by <group_by_operator>]
```

## Examples

#### List the Top 5 source categories with errors

Use the following query to list the top 5 source categories with errors, and get their count.

```sql
error | top 5 _sourcecategory
```

which produces results like:

![example](/img/reuse/query-search/top_example1.png)

You can use the following query to get the same results, but make the
count explicit:

```sql
error | top 5 _sourcecategory by count
```

#### List the Top 10 source categories by message time

This query lists the top 10 source categories by message time, without
an explicit count.

```sql
error | top 10 _sourcecategory by _messagetime
```

which produces results like:

![example](/img/reuse/query-search/top_example3.png)
