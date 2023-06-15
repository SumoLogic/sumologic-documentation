---
id: rate
title: rate Metrics Operator
sidebar_label: rate
---


The rate operator calculates the per-second rate of change between data points in the time series. Regular `rate` (without `over` modifier) calculates the rate of change between consecutive data points.

`rate over TIME` on the other hand allows you to calculate an average rate of change over a specified time window. This is achieved by considering the first and the last metric value in the given time window, extrapolating to the ends of window if necessary.

The rate operator also assigns the value of the metric tag to be `rate($metric)` and the value of the unit metadata field to be `$unit/second` (for example, 1/second).

You can use the `increasing` or `decreasing` option, to make `rate` consider only positive or negative rate values. This functionality is useful when you are calculating the positive or the negative rate of change of a metric over time.

When working with counters, you can also use a dedicated `counter` mode which accounts for counter resets and always returns non-negative rate values.

## Syntax

```sql
rate [increasing | decreasing | counter] [[over] INTERVAL]
```

where `INTERVAL` is the duration over which you want to calculate and average rate, in seconds (`s`) , minutes (`m`), hours (`h`), or days (`d`).

## Examples

### Rate of change between consecutive data points

This query calculates the increase or decrease per second in the `Net_InBytes` metric from one collected data point to the next. 

```sql
metric=Net_InBytes Interface=eth0 | rate
```

### Rate of change between consecutive counter values

This query calculates the increase in `apiserver_request_total` counter value from one collected data point to the next. 

```sql
metric=apiserver_request_total | rate counter
```

### Average rate of change of a time window

This query calculates the average rate of `apiserver_request_total` counter value changes over a 5-minute time window

```sql
metric=apiserver_request_total | rate counter over 5m
```
