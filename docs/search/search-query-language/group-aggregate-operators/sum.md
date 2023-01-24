---
id: sum
title: sum Grouping Operator
sidebar_label: sum
---

`sum` adds the values of the numerical field being evaluated within the time range analyzed.

## Syntax

```sql
sum(<numerical_field>) [as <field>] [by <field>]
```

## Rules

* Creates field named **`_sum`**

## Example

```sql
... | sum(bytes_received) group by hostname
```

Sample log message:

```json
Aug 2 04:06:08 : host=10.1.1.124: local/ssl2 notice mcpd[3772]: filesize=20454: diskutilization=0.4 : 01070638:5: Pool member 172.31.51.22:0 monitor status down.
```

Example based on sample log message above:

```sql
file*| parse "filesize=*" as filesize
| sum (filesize) group _sourceHost
```

Finds all messages that contain term **file\*** and parses out all that
have a `filesize=value`. It will then extract the value of filesize
and will add all those values per host where those log messages are
generated.

When you calculate the sum of more than one field, you must create an alias using the [`as` operator](/docs/search/search-query-language/search-operators/as) to rename the `sum` fields. See this example:

```sql
_sourceCategory="OS/Windows"
| kv "HandleCount", "ThreadCount"
| sum(HandleCount) as sumHandleCount, sum(ThreadCount) as sumThreadCount
```

You can use multiple aggregation operators on the same line of a query. For example:

```sql
max(amount) as amount_max, count(datetime) as datetime_count, sum(_size) as messages_size_sum, last(query) as last_query
```
