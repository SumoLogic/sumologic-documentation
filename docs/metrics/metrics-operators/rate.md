---
id: rate
title: rate Metrics Operator
sidebar_label: rate
---


The rate operator calculates the per-second rate of change between data points in the time series. There are two different modes in which the rate operator can work:

* Regular `rate` (without `over` modifier) calculates the rate of change between consecutive data points. It divides the difference in values of consecutive data points by the difference in their timestamps in seconds.
* `rate over TIME`, on the other hand, allows you to calculate an average rate of change over a specified time window. This is achieved by considering the first and the last metric value in the given time window, extrapolating to the ends of the window if necessary.

The rate operator also assigns the value of the metric tag to be `rate($metric)` and the value of the unit metadata field to be `$unit/second` (for example, 1/second).

## Syntax

```sql
rate [increasing | decreasing | counter] [[over] INTERVAL]
```
where `INTERVAL` is the duration over which you want to calculate and average rate, in seconds (`s`) , minutes (`m`), hours (`h`), or days (`d`).

When deciding which mode you should use, here are some guidelines:
* You need to get an instant rate of a counter - use `rate counter`.
* You need to get an average rate of a counter over an interval - use `rate counter over INTERVAL`.
* You need to get an instant rate of a non-counter metric - use `rate`.
* You need to get an average rate of a non-counter metric over an interval  - use `rate over INTERVAL`.

The use of `counter` mode is recommended for counter-like metrics because it accounts for counter resets and always returns non-negative rate values.

You can also use the `increasing` or `decreasing` option to make `rate` consider only positive or negative rate values, respectively. However, these options are mostly kept for backward compatibility and so their usage is not recommended.

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
