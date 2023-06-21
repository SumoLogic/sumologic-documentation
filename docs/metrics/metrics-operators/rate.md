---
id: rate
title: rate Metrics Operator
sidebar_label: rate
---


The rate operator calculates the per-second rate of change between consecutive data points. It divides the difference in values of consecutive data points by the difference in their timestamps (in milliseconds) and then multiplies the result by 1000 (to scale up the quantity from a per-millisecond rate to a per-second rate).

The rate operator also assigns the value of the metric tag to be `rate($metric)` and the value of the unit metadata field to be `$unit/second` (for example, 1/second).

## Syntax

```sql
rate [increasing | decreasing]
```

If you use the `increasing` option, the operator will consider only those pairs of consecutive points where the second point in the pair is greater than the first point. Similarly, if you use the the `decreasing` option, the operator will consider only those pairs of consecutive points where the second point in the pair is less than the first point. This functionality is useful when you are calculating the rate of change of a counter over time.

## Examples

This query calculates the increase or decrease per second in the `Net_InBytes` metric from one collected data point to the next. 

```sql
metric=Net_InBytes Interface=eth0 | rate
```  
