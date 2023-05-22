---
id: parse
title: parse Metrics Operator
sidebar_label: parse
---

The parse operator parses the specified field to create new fields to use in the metrics query.

:::tip
If you are querying Graphite metrics, and do not specify the field to be parsed, then the metric name will be parsed.
:::

Each wildcard in the pattern corresponds to a specified field. The parse operator supports both lazy (shortest match) and greedy (longest match wildcard matches.  Use '\*' for a lazy match, or '\*\*' for a greedy match.

## Syntax

```sql
parse [field=FIELD] PATTERN as PARSED_FIELD [, PARSED_FIELD, ...]
```

Where:

* `FIELD` is the metric field you want to parse, 
* `PATTERN` is an expression in which wildcards indicate how to parse `FIELD`
* `PARSED_FIELD` is a field that results from the parsing process

## Examples

### parse three fields from a metric field

In this query, we parse the `LoadBalancer` field. The format of the field is `type/name/id`, for example:   

```sql
app/app-song-8d/4567223890123456
```

This query creates a field for each of the forward-slash-separated segments:  

```
AvailabilityZone=us-west-1a metric=HTTPCode_Target_2XX_Count | parse field=LoadBalancer */*/* as type, name, id
```

The `parse` operator creates fields named `type`, `name`, and `id` that have the values from the slash-separated segments of the `LoadBalancer` field.

### Use a parsed field in a query

You can use the field(s) you’ve parsed within the same query, after the `parse` operator. for example, this query parses the `name` field out of the  `LoadBalancer` field, returns the average value of the `HTTPCode_Target_2XX_Count` metric by the `name` field.

```
AvailabilityZone=us-west-1a metric=HTTPCode_Target_2XX_Count | parse field=LoadBalancer */*/* as type, name, id | avg by name
```
