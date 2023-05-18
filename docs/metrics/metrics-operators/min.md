---
id: min
title: min Metrics Operator
sidebar_label: min
---



The min operator calculates the minimum value of the time series that match the query. If grouping is specified, it calculates the minimum for each group.

## Syntax

```sql
min [by FIELD [, FIELD, ...]]
```

## Examples

### Minimum metric value across all matching time series

This query returns the minimum `CPU_Sys` value for each time interval across all matching time series.

```sql
dep=prod metric=CPU_Sys | min
```

### Minimum metric value across by a tag value

This query returns the minimum `CPU_System` value by node for each time interval across all matching time series.

```sql
cluster=search metric=CPU_Sys | min by node
```  
 
