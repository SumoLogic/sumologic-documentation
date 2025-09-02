---
id: metric-query-tips-tricks-best-practices
title: Metric Query Tips, Tricks, and Best Practices
sidebar_label: Metric Query Tips
description: Learn the secrets for getting the most out of your metric queries.
---

import useBaseUrl from '@docusaurus/useBaseUrl'

There are some common stumbling blocks for creating and charting metric queries in Sumo Logic. In this article we'll cover key metric query best practices, patterns, and tips such as:
- Logs vs metric queries.
- Metrics query language tips and techniques.
- Metric discovery.
- Quantization and rollups.
- Chart types, raw vs aggregate, and layout tips.
- "ABC" pattern.
- Rates and counters.

## Logs vs metrics

While they share a dashboard chart UI logs and metrics query languages are very different.

| Concept | Logs | Metrics |
| :-- | :-- | :-- |
| Timestamp | Have a `_messagetime` parsed from the timestamp string and `_receipttime` (time sent to Sumo Logic). | All metrics have a timestamp of receipt unless it's explicitly stated in the metric format, for example, Prometheus where it can be sent in payload or inferred as 'now': <br/>`http_requests_total{method="post",code="200"} 1027 1395066363000` <br/>`http_requests_total{method="post",code="200"} 1027` |
| Graphing Over Time | Use timeslice / count + optional transpose operator pattern to convert to charting format over time. Timeslice interval is set in the query. | No `_timeslice` since all metric data points already have a timeslice called quantization. |
| Aggregation | Specific to the log search query, for example, sum by host vs avg by host, and can have multiple aggregations. | All metrics have multiple rollups stored: `sum`, `min`, `max`, `count`, `latest`, `_value`. By default avg is used and this can have dramatic effects on output of the metric query. |
| Retention | Set at partition level, logs stored immutably until retention is reached, but could be pre-summarized using scheduled views. | Raw metric is retained for 30 days, and a 1-hour rollup for 13 months. For historical 1-hour rollups Sumo Logic calculates the `max`, `min`, `avg`, `sum`, and `count` values for a metric per hour. Metrics transformation rules available for custom summarization. |
|  Charting | Log search must produce aggregate data in correct format for chart type selected. | Formatting is inferred in charting UI, so in most cases the same query can produce time series or other charts without modification. |
| Cardinality | High cardinality can impact query efficiency but has no impact on log ingest or storage costs. Very high cardinality is supported in log searches (>1m) | Greater cardinality in metric names or tags increases the DPM (data points per minute) and results in higher ingest charges. There are strict cardinality limits and metrics or tags may be disabled if limits are exceeded, for example, max of 5000 series per metric in 24 hours. See [High cardinality dimensions are dropped](/docs/metrics/manage-metric-volume/disabled-metrics-sources/#high-cardinality-dimensions-are-dropped) |
| Query language flexibility | Over 100 log operators allow very complex query types (transactions, log reduce, etc.) and advanced parsing and transformation of fields and values including regex. | Limited metric operators for high performance aggregate charting of lower cardinality data. Parsing and transformation of metric names or values is limited compared to logs. |
| Pricing plan | Either ingest based (ingest cost per GB + storage charge based on retention with free query) or scan based (most cost is generated based on volume of partition data scanned). For ingest based, larger log events (not metadata) drives cost. For scan based plans scoping of query, time range and partition design has greatest impact. | DPM (data points per minute) are averaged over a 24 hour period. Sending more data points by shorter intervals (for example, 10s vs 1m), sending more metric names, or higher cardinality of tags will increase DPM cost |

## Key tips for metric query

### Filter metrics

Filter metrics via one or more expression in scope before `|`. Usually a `metric=` and one or more tag matches.

For example:
```
cluster=search metric=cpu_idle | avg by node
```

:::note
There are `where` filter operators, but always filter via scope whenever possible for faster query performance.
:::

### Scope wildcards

Scope wildcards are allowed, and matches are case insensitive.

For example:
```
cluster=prod* metric=cpu_idle | avg by node
namespace=*  equates to: namespace tag is present and has any value
```

### Not or !

Use `not` or `!`

For example, use `!tag=value*` or `not tag=value*` or `!(tag=value)`

### Space

A space implies an `AND`. The use of `AND` and `OR ()` is similar to log search. Always bracket `() OR` for correct scope. 

For example,
```
( host=us* or host=eu* ) AND metric=cpu_idle | max by host
```

is the same as:
```
( host=us* or host=eu* ) metric=cpu_idle | max by host
```

### Quantize

Quantize is always applied to metrics (like time slicing in logs). Every metric series has multiple rollup types: `min`, `max`, `latest`, `avg`, `sum` and `count`. Quantize and rollup will have a very large impact on the resulting output. `avg` is the default.

Pick the correct rollup for the query use case via the quantize operator. For example:

```
| quantize to 1m using max drop last
```

### Rates

Rates over time are shows via an ascending counter. Many metric values are ascending counters so you must measure a delta or "rate over time". Use either the `delta` or `rate` operators (see [delta Metrics Operator](/docs/metrics/metrics-operators/delta/) and [rate Metrics Operator](/docs/metrics/metrics-operators/rate/)). 

Think carefully about the rollup dimension you are using in the output. 
The typical pattern is extract `rate`/ `delta` then `sum` in each quantized time range.
The `delta` operator is easier to understand and graph. 

### #A #B #C pattern

Use the `#A` `#B` `#C` pattern with the `along` operator when you need to compute a value from two series (see [along Metrics Statement](/docs/metrics/metrics-operators/along/)).

For example: 
```
#A: metric=Net_InBytes account=* | avg by account
#B: metric=Net_OutBytes account=* | avg by account
#C: #B - #A along account
```
### eval

It's often necessary to use math on a metric value via the `eval` operator (see [eval Metrics Operator](/docs/metrics/metrics-operators/eval/)).

For example, cpu used % instead of `cpu_ idle`: 
```
metric=CPU_Idle | filter max > .3  | eval 100 * (1 - _value) | avg by hostname 
```

### parse

The `parse` operator can extract values from metric names (see [parse Metrics Operator](/docs/metrics/metrics-operators/parse/)). A common use case is to split metric or tag strings into parts, say to remove high cardinality instance or stack IDs. (Use [metrics transformation rules](/docs/metrics/metrics-transformation-rules/) for Graphite Carbon type metric strings to turn them into tag and value formats on ingest, or to aggregate metrics to reduce high cardinality tags).

For example, if the loadbalancer = `app/app-song-8d/4567223890123456`, the following query:
```
availabilityZone=us-west-1a metric=HTTPCode_Target_5XX_Count | parse field=LoadBalancer */*/* as type, name, id | sum by name

```

results in new tags: `type = app`, `name = app-song-8d`, `id = 4567223890123456`

### where

The `where` and older `filter` operators are best used for value based filtering, not scope of query (see [where Metrics Operator](/docs/metrics/metrics-operators/where/) and [filter Metrics Operator](/docs/metrics/metrics-operators/filter/)). You can use the `where` operator to filter out either entire time series, or individual data points within a time series. Supported reducer functions are: 
* `avg`, `min`, `max`, `sum`, `count`
* `pct(n)`. The nth percentile of the values in the time series.
* `latest`. The last data point in the time series.

### CloudWatch metrics

[CloudWatch metrics from AWS](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/working_with_metrics.html) also sends a statistic tag, so there are multiple versions of each metric sent. You must use `statistic=<type>` in every query to ensure valid results.

For example:
```
namespace=aws/applicationelb metric=HTTPCode_ELB_5XX_Count statistic=<type>
```

This further complicates the quantization type.

## Quantization

## Metric discovery

## Charting metrics

## Learn your ABC

## Rates and counters

## Managing DPM and high cardinality

