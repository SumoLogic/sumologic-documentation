---
id: max
---

# max

Calculates the maximum value of the time series that match the query. If grouping is specified, it calculates the maximum for each group.

## Syntax

```sql
max [by FIELD [, FIELD, ...]]
```

## max examples

### Maximum metric value across all matching time series

This query returns the maximum `cpu_system` value for each time interval
across all matching time series.

```sql
dep=prod metric=cpu_system | max
```

### Maximum metric value across by a tag value

This query returns the maximum `cpu_system` value by node for each time interval across all matching time series.

```sql
cluster=search metric=cpu_idle | max by node
```  
 
