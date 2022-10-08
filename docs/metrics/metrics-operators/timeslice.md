---
id: timeslice
title: timeslice Operator
sidebar_label: timeslice
---


The `timeslice` operator allows you to aggregate individual data points over a specified duration using a specified rollup function, one of: avg, min, max, sum, count, or rate.

The timeslice operator is currently supported in the Metric Explorer's advanced mode, not in basic mode.

## Syntax

```sql
metrics query | timeslice <avg/min/max/count/sum/rate> over <duration>
```

Where:

duration is the length of time over which you want to aggregate the data, in milliseconds (ms), seconds (s), minutes (m), hours (h), or days (d).

## Example

```sql
cluster=search metric=cpu_idle | timeslice max over 3m
```
