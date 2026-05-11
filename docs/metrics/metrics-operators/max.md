---
id: max
title: max Metrics Operator
sidebar_label: max
description: Use the `max` metrics operator to calculate the maximum value of time series that match the query. When grouping is specified, calculates the maximum for each group. Essential for identifying peak values, worst-case scenarios, and maximum capacity or performance metrics across systems or services.
---


The `max` operator calculates the maximum value of the time series that match the query. If grouping is specified, it calculates the maximum for each group.

## Syntax

```sql
max [by FIELD [, FIELD, ...]]
```

## Examples

### Maximum metric value across all matching time series

This query returns the maximum `CPU_Sys` value for each time interval
across all matching time series.

```sql
dep=prod metric=CPU_Sys | max
```

### Maximum metric value across by a tag value

This query returns the maximum `CPU_Sys` value by node for each time interval across all matching time series.

```sql
cluster=search metric=CPU_Sys | max by node
```  
 
