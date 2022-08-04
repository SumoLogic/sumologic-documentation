---
id: min
title: min
sidebar_label: min
description: The min operator calculates the maximum value of the time series that match a metric query.
---

Calculates the minimum value of the time series that match the query. If grouping is specified, it calculates the minimum for each group.

## min syntax

```sql
min [by FIELD [, FIELD, ...]]
```

### min examples

### Minimum metric value across all matching time series

This query returns the minimum  `cpu_system` value for each time interval across all matching time series.

```sql
dep=prod metric=cpu_system | min
```

### Minimum metric value across by a tag value

This query returns the minimum cpu_system value by node for each time interval across all matching time series.

```sql
cluster=search metric=cpu_idle | min by node
```  
 
