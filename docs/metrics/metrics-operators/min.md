---
id: min
title: min Metrics Operator
sidebar_label: min
description: Use the `min` metrics operator to calculate the minimum value of time series that match the query. When grouping is specified, calculates the minimum for each group. Essential for identifying lowest values, best-case performance, minimum thresholds, and resource floor values across systems or services.
---



The `min` operator calculates the minimum value of the time series that match the query. If grouping is specified, it calculates the minimum for each group.

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

This query returns the minimum `CPU_Sys` value by node for each time interval across all matching time series.

```sql
cluster=search metric=CPU_Sys | min by node
```  
 
