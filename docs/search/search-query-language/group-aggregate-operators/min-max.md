---
id: min-max
title: min, max Grouping Operators
sidebar_label: min, max
---


Use the `min` and `max` functions to find the smallest or largest value in a set of values.

## max

Extracts the maximum value of the numerical field being evaluated within the time range.

### Syntax

```sql
max(<numerical_field>) [as <field>] [by <field>]
```

### Rules

* Creates field named **`_max`**

### Example

```sql
... | max(request_received) group by hour
```

```sql
... | max(request_received) as max_request_received, max(request_sent) as max_request_sent
```

When you calculate the maximum value of more than one field, you must create an alias using the [`as` operator](/docs/search/search-query-language/search-operators/as) to rename the `max` fields.

See this example:

```sql
_sourceCategory="OS/Windows"
| kv "HandleCount", "ThreadCount"
| max(HandleCount) as maxHandleCount, max(ThreadCount) as maxThreadCount
```

## min

Extracts the minimum value of the numerical field being evaluated within the time range.

### Syntax

```sql
min(numerical_field) [as <field>] [by <field>]
```

### Rules

* Creates field named `_min`

### Example

```sql
... | min(request_received) group by hour
```

```sql
​... | min(request_received) as min_request_received, max(request_sent) as max_request_sent
```

When you calculate the minimum value of more than one field, you must create an alias using the [`as` operator](/docs/search/search-query-language/search-operators/as) to rename the min fields.

See this example:

```sql
_sourceCategory="OS/Windows"
| kv "HandleCount", "ThreadCount"
| min(HandleCount) as minHandleCount, min(ThreadCount) as minThreadCount
```
