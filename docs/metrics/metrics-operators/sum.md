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

This query calculates the total of the `cpu_system` metric values across all time series whose `dep` tag equals “prod”.

```sql
dep=prod metric=cpu_system | sum
```

### Sum the value of a metric by one field 

This query calculates the total of the `cpu_system` metric values across all time series whose `dep` tag equals “prod” by node.

```sql
cluster=search metric=cpu_idle | sum by node
```  
