---
id: sort
title: sort Search Operator
sidebar_label: sort
---

The `sort` operator orders aggregated search results. The default sort order is descending. Then you can use the top or limit operators to reduce the number of sorted results returned.

Order is also synonymous with sort. You can use them interchangeably in your queries.

## Syntax

```sql
sort by <field> (displays results as descending, by default)
```

```sql
sort by +<field> (displays results as ascending)
```

```sql
sort by <field> asc (displays results as ascending)
```

```sql
sort by <fieldA>, <fieldB>
```

```sql
top <#> <field>​​​​​​​ by <group_by_operator>
```

## Rules

* Default sort order is descending.
* Sorting is case sensitive with lower-case followed by upper-case.
* To reverse the sort order to ascending, type a plus sign (+) before the field name you are sorting by. Alternatively, you can type **asc** after the field name.
* To numerically sort, first [cast the field to a number](/docs/search/search-query-language/search-operators/manually-cast-data-string-number). Otherwise, the sort will be ordered as a text field.

## Examples

```sql
status AND down | extract "user=(?<user>.*?):" | count (*) group by user | sort by _count
```

```sql
... | count user | top 2 user by _count
```

```sql
... | count user | sort by _count asc
```

### Top 10 pages by page hits

This example counts page hits by sourceHost, sorts them by page hits, and limits the results to the top 10.

```sql
_sourceCategory=Labs/Apache/Access
| count as page_hits by _sourceHost
| sort by page_hits
| limit 10
```

which provides results like:

![sort](/img/reuse/query-search/sort_operator_example.png)

For more information, see [Top](top.md) operator or [Limit](limit.md) operator.
