---
id: stddev
title: stddev Grouping Operator
sidebar_label: stddev
---

Finds the standard deviation value for a distribution of numerical values within the time range analyzed and associated with a group designated by the "group by" field.

## Syntax

```sql
stddev(<numerical_field>) [as <field>] [by <field>]
```

## Rules

* Creates field named **`_stddev`**

## Example

You can use the query below to view the standard deviation of time delay, along with the average of time delay, max delay, and the min delay for a Source. You can use this query to troubleshoot large message time and receipt time discrepancies.

```sql
_source=CollectD
| abs(_receipttime - _messagetime) as delt
| delt/1000/60 as delt
| min(delt), max(delt), avg(delt), stddev(delt), count(*) by _collector, _sourcename
```

![avg results](/img/search/searchquerylanguage/group-aggregate-operators/stddev.png)

When you calculate the standard deviation of more than one field, you must create an alias using the [`as` operator](/docs/search/search-query-language/search-operators/as) to rename the `stddev` fields. See this example:

```sql
_sourceCategory="OS/Windows"
| kv "HandleCount", "ThreadCount"
| stddev(HandleCount) as stddevHandleCount, stddev(ThreadCount) as stddevThreadCount
```
