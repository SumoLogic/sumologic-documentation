---
id: topk
title: topk Search Operator
sidebar_label: topk
---

The `topk` operator allows you to select the top values from fields and group them by fields. It can replace the `top` operator and adds the ability to choose the top of top.

:::tip
If you're using `top`, we recommend switching to `topk` for all your queries so that you can take advantage of the additional functionality of `topk`.
:::

## Syntax

```sql
topk(<#>, <top_field>[, <top_field_2>, ...]) [by <group_by_fields>]
```

`#` is an integer equal to or greater than 1.

#### Response Field

* `_rank` - the order number of the result.

## Example

#### Top 5 source hosts generating errors

Look at the top five source hosts generating the most errors and the number of errors for given timeslices:

```sql
error
| timeslice 1m
| count by _timeslice, _sourceHost
| topk(5, _count)
```

![basic error ranking results.png](/img/search/searchquerylanguage/search-operators/topk/basic-error-ranking-results.png)

#### Top 2 results

Look at the top 2 results for a given category:

```sql
error
| timeslice 1m
| count by _timeslice, _sourceHost
| topk(2,_count) by _sourceHost
```

Let's figure out what is the maximum error count for each sourceHost for the given time range slightly changing our query. We’ll add a by clause to the given operator and provide sourceHost as an argument. This tells the system that we want to look for the top “x” counts for each source Host.

![basic top 2 rank.png](/img/search/searchquerylanguage/search-operators/topk/basic-top-2-rank.png)

Find the top two source host, source category pairs.

```sql
error
| timeslice 1m
| count by _timeslice, _sourceHost, _sourceCategory
| topk(2,_count) by _sourceHost, _sourceCategory
```

We can specify more than one argument to group by. In the query above, we are looking for the top 2 results for each source host, source Category pairs.

![basic top with group by.png](/img/search/searchquerylanguage/search-operators/topk/basic-top-with-group-by.png)  
