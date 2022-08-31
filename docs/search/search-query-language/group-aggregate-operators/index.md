---
slug: /search/search-query-language/group-aggregate-operators
title: Group or Aggregate Operators
---



Aggregating functions evaluate messages and place them into groups. The group operator is used in conjunction with group-by functions.

Only search results that have been aggregated using a group or aggregate operator can be placed on a dashboard panel. See [Chart Search Results](../../get-started-with-search/search-basics/chart-search-results.md) for information about charting.

When using any grouping function, the word **by** is sufficient for representing the group operator. The typical construction when using group-by functions is:

```sql
grouping_function by <fieldname>
```

Aggregating (group-by) functions include:

* [avg](avg.md)
* [count, count_distinct, and count_frequent](count-count-distinct-and-count-frequent.md)
* [first and last](first-and-last.md)
* [min and max](min-and-max.md)
* [most_recent and least_recent](most-recent-and-least-recent.md)
* [pct](percentile-pct.md)
* [stddev](standard-deviation.md)
* [sum](sum.md)
* [values](values.md)

:::important
The **withtime**, **most_recent**, and **least_recent** operators are not considered standalone operators; they are designed to only be used as an alternative to the [first and last operators](first-and-last.md) in Live Dashboards or any continuous query where first and last are not supported.
:::

By default, the ordering is not defined inside of groups created using a group-by expression. To order your results, use the [**sort**](../search-operators/sort.md) operator.

## Syntax

* `... | group_by_function <field_to_operate_on> group by <field_to_group_by>[, <field2>, ...]`

You can use **by** instead of **group by** so `count group by user` is equivalent to `count by user`.

## Rules

* Can not be used with the [LogReduce](/docs/search/logreduce) operator.
* When [parsing and naming (aliasing) fields](../parse-operators/parse-field-option.md), avoid using the names of grouping functions or other operators as field names.
* When using **count**, or any grouping function, remember to include the underscore before the field name (sort by `_count`).
* Multiple **aggregation** functions can be on the same line but you can't include another function, such as a math function, on the same line of a query.

For example, you can't use:

```sql
... | avg(x + y) as average, sum(x+y) as total
```

You would need to do that in two separate steps, such as:

```sql
... | x + y as z | avg(z) as average, sum(z) as total
```

In another example, you can't use:

```sql
avg(abs_latency)/1000/60 as avg_latency_min
```

Instead, you'd need to use two separate lines:

```sql
avg(abs_latency_ms) as avg_latency_ms
| avg_latency_ms / 1000 / 60 as avg_latency_min
```

## Examples

### Sort by _count and limit to 10 results

```sql
* | parse "GET * " as url 
| count by url 
| sort by _count 
| limit 10
```

### Count by user

```sql
status AND down 
| parse regex "user=(\<use\>.*?)"
| parse regex "host=(\<msg_hos\>.*?)"
| count by user
```

### Count by the Source IP address

```sql
_sourceCategory=apache 
| parse "* " as src_ip
| parse "GET *" as url
| count by src_ip
| sort by _count
```

### Group by multiple fields

```sql
| count(field1), avg(field2) group by field1, _timeslice
```

### Use multiple aggregate operators

```sql
| max(amount) as amount_max, count(datetime) as datetime_count, sum(_size) as messages_size_sum, last(query) as last_query
```

All Sumo Logic system-generated fields begin with an underscore ("\_"). Group-by functions always create a Sumo Logic field named with a combination of an underscore (\_) and the function name. Using the function **count** inserts a field into the pipeline called `_count`. The function **count_distinct** inserts a field into the pipeline
called `_count_distinct`.
