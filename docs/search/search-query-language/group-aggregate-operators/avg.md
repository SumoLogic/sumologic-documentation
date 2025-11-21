---
id: avg
title: avg Grouping Operator
sidebar_label: avg
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The averaging function (`avg`) calculates the average value of the numerical field being evaluated within the time range analyzed.

## Syntax

```sql
avg(<numerical_field>) [as <field>] [by <field>]
```

## Rules

* Creates field named `_avg`

## Examples

### Parse milliseconds and calculate average

This example query parses the number of milliseconds and calculates the average across the search time range.

```sql
_sourceCategory=app
| parse "time taken: * ms," as time
| avg(time) as avg_time
```

An example snippet from a log would like this: `time taken: 21 ms,` where the value parsed from `time taken` would be 21, which in this case is in milliseconds.

The average operator would calculate against all parsed values and return the average, which would be returned in the **Aggregates** tab as a number, such as 50.

<img src={useBaseUrl('img/search/searchquerylanguage/group-aggregate-operators/avg-results.png')} alt="Avg results" style={{border: '1px solid gray'}} width="200" />

### Use Aggregate in Query

This example shows you how to use more than one aggregate operator like avg in a query. This is useful when you need to calculate the average of more than one field.

When multiple aggregates are used you need to create an alias using the as operator so they each get a unique field name. For example,

```sql
| avg(time) as avg_time, avg(_size) as logSize
```
