---
id: sum
title: sum Metrics Operator
sidebar_label: sum
---


The sum operator calculates the sum of the metrics values that match the query. If grouping is specified, it calculates the sum for each group.

## Syntax

```sql
sum [by FIELD [, FIELD, ...]]
```

## Examples

### Sum the value of a metric 

This query calculates the total of the `CPU_Sys` metric values across all time series whose `dep` tag equals “prod”.

```sql
dep=prod metric=CPU_Sys | sum
```

### Sum the value of a metric by one field 

This query calculates the total of the `CPU_Sys` metric values across all time series whose `dep` tag equals “prod” by node.

```sql
dep=prod metric=CPU_Sys | sum by node
```  
