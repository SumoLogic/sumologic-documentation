---
id: first-last
title: first, last Grouping Operators
sidebar_label: first, last
---


The `first` and `last` operators return the first or last result relative to the sort order. By default, searches return results in descending chronological order (most recent descending to oldest).

For example, the following image shows a few results in the default sort order. The `#` column starts at one, and the `Time` values start with the most recent.

![new_to_old_default_result_order.png](/img/search/searchquerylanguage/group-aggregate-operators/new_to_old_default_result_order.png)

* The `first` result is indicated with the `#` value of 1. This `first` result has the most recent `Time`.
* The `last` result is indicated with the `#` value of 5. This `last` result has the oldest `Time`.

:::tip
Using the [sort](/docs/search/search-query-language/search-operators/sort) operator allows you to change the default sort order.
:::

#### Limitations

First and last are not supported in Live Dashboards or any continuous query. Instead, use the `withtime` operator, see [`most_recent` and `least_recent`](/docs/search/search-query-language/group-aggregate-operators/most-recent-least-recent).

## first

The default sort order for returned messages is reverse chronological—most recent descending to oldest. So `first` finds the most recent value of the field being evaluated within the time range. However, if you have specified a sort order other than descending chronological, then `first` finds the message that precedes all others based on the sort order defined in your query.

If there is no sort order specified for returned results (for example, when using `limit 20`), then `first` simply returns the first result encountered without respect to date or list order.

### Syntax

```sql
first(<field>) [as <field>] [by <field>]
```

### Rules

* The default field created is named **`_first`**

### Example

```sql
... | first(error_message) group by hostname
```

Note that when you find the first occurrence of more than one field, you must create an alias using the [as
operator](/docs/search/search-query-language/search-operators/as) to rename the _first fields. See this example:

```sql
_sourceCategory=Apache/Access
| first(url) as first_url, first(status_code) as first_statuscode
```

## last

Finds the last value of the field being evaluated within the time range and according to the specified sort order. Remember that the default order for returned messages is reverse chronological—most recent descending to oldest. Therefore, `last` is the oldest result in the returned list. If you have specified an order other than reverse chronological, then `last` finds the ending message that follows all others based on your sort order.

### Syntax

```sql
last(<field>) [as <field>] [by <field>]
```

### Rules

* The default field created is named `_last`

### Example

```sql
... | last(status_code) group by hostname
```

Sample log message:

```json
Aug 2 04:06:08 : host=10.1.1.124: local/ssl2 notice mcpd[3772]: filesize=20454: diskutilization=0.4 : 01070638:5: Pool member 172.31.51.22:0 monitor status down.
```

Example based on sample log message:

```sql
disk*
| parse "diskutilization=*" as disk
| disk>0.8?1:0 as overcapacity
| last(overcapacity) by _sourceHost
| sort by _last
```

This query finds all messages that contain the term `disk\*` and parses out all that have a `diskutilization=` value. It then extracts the value of diskutilization into field `disk`. It then determines if that value is greater than 80% and will find the last occurrence of that value per host effectively producing a list of hosts that have disk utilization that is over 80%.

Note that when you find the last occurrence of more than one field, you must create an alias using the [`as` operator](/docs/search/search-query-language/search-operators/as) to rename the `_last` fields. See this example:

```sql
_sourceCategory=Apache/Access
| last(url) as last_url, last(status_code) as last_statuscode
```
