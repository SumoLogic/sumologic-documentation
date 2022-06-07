---
id: pct
---

# pct

Calculates, at each timestamp, the nth percentile of values of the input series for each time interval. If grouping is specified, it calculates the specified percentile for each group.

## pct syntax

```sql
pct(DOUBLE) [by FIELD [, FIELD, ...]]
```

Where `DOUBLE` is floating point number between 0.0 and 100.0, both inclusive.

## pct examples

### Return the 95th percentile of all input time series

This query calculates a single time series, where each plotted value is the 95th percentile of the `MemoryUsed` metric of the input time series for a timeslice.  

```sql
metric=MemoryUsed | pct(95.0)
```

### Return time series with average metric value in 95th percentile by a field

This query is similar to the previous but it calculates the percentile of the `MemoryUsed` metric by a metric field, in this case, `node`. The query returns a time series for each node; each plotted point in a time series corresponds to the 95th percentile of all of the input time series with that `node` value, for a timeslice.

```sql
metric=MemoryUsed | pct(95.0) by node
```
