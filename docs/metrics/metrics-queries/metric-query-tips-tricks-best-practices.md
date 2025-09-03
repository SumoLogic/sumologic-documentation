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

Quantization is at the very heart of query output for metrics. You must use the correct quantization for every use case. 

Every metric series has multiple rollup types: `min`, `max`, `latest`, `avg`, `sum`, and `count`. Every metric query has auto quantize by default using `avg`, but we override with the `quantize` operator (see [quantize Metrics Operator](/docs/metrics/metrics-operators/quantize/)). The `quantize` operator has a time window (similar to the [timeslice search operator](https://help.sumologic.com/docs/search/search-query-language/search-operators/timeslice/) in logs), and a rollup type, for example, `avg` or `sum`.

The following screenshot shows a query with the `quantize` type of `max` and an interval of `1h`: 

<img src={useBaseUrl('img/metrics/metrics-query-quantize-example.png')} alt="Metrics query example" style={{border: '1px solid gray'}} width="600" />

This screenshot shows the rollup types of `min`, `max`, `latest`, `avg`, `sum`, and `count`:

<img src={useBaseUrl('img/metrics/metrics-query-quantize-results.png')} alt="Metrics query rollup types" style={{border: '1px solid gray'}} width="800" />

### Pod count quantize example

Suppose you want to find the latest value for total pods in a cluster regardless of the run state. 

Each pod has 5 metric series (one for each possible pod state tag) with a value from 0 to *n* being the number of pods in that state:

<img src={useBaseUrl('img/metrics/metrics-query-quantize-results.png')} alt="Metrics query rollup types" style={{border: '1px solid gray'}} width="800" />

Note that when you sum the colums, the sum of `max` is 2, sum of `avg` would be 1.5, and the sum of `count` would be 10.

The correct query is to max each series and then sum them:
```
cluster=prod metric=kube_pod_status_phase  
| quantize to 1m using max drop last | sum
```
<img src={useBaseUrl('img/metrics/metrics-count-pods-correct.png')} alt="Correct query for pod count" style={{border: '1px solid gray'}} width="800" />

The wrong approach is to average the rollup and count of metric series:

<img src={useBaseUrl('img/metrics/metrics-count-pods-wrong.png')} alt="Wrong query for pod count" style={{border: '1px solid gray'}} width="800" />

### Changing statistic type on a chart changes results

Changing the **Statistic Type** on a chart (if that option is present) changes the output of the query that is displayed. Always consider if the default of **Average** is correct:

<img src={useBaseUrl('img/metrics/metrics-quantize-statistic-type.png')} alt="Statistic Type for a chart" style={{border: '1px solid gray'}} width="300" />

For example, selecting the **Average** statistic type for the following query yields a sum of `75.63`:
<img src={useBaseUrl('img/metrics/metrics-query-average-statistics-type.png')} alt="Average statistic type for a chart" style={{border: '1px solid gray'}} width="400" />

But selecting the **Sum** statistic type for the same query yields a sum of `1,739.5`:
<img src={useBaseUrl('img/metrics/metrics-query-sum-statistic-type.png')} alt="Sum statistic type for a chart" style={{border: '1px solid gray'}} width="400" />

## Metric discovery

### Autocomplete

Metric and tag discovery is a key activity in creating metric queries. Metrics Search provides an autocomplete function to make it fast and easy to build out metric queries. Tag names and values are supplied in the query UI based on the current metric query scope. 

Autocomplete can show you:
* Which metrics exist for a specific scope:<br/><img src={useBaseUrl('img/metrics/metric-query-which-metrics.png')} alt="Which metrics exist for a specific scope" style={{border: '1px solid gray'}} width="600" />
* What tag names exist for a specific metric or tag scope:<br/><img src={useBaseUrl('img/metrics/metric-query-which-tag-names.png')} alt="Which metrics exist for a specific scope" style={{border: '1px solid gray'}} width="500" />
* What values exist for a specific tag in the current scope:<br/><img src={useBaseUrl('img/metrics/metric-query-what-values.png')} alt="What values exist for a specific tag" style={{border: '1px solid gray'}} width="300" />

### Time series

The **Time Series** view lets you review the metric time series and tag values when the query outputs raw metric query (with no aggregation). Use this view to understand what many metric series are in the current scope and check how many values appear in tag columns or understand higher than expected cardinality values in tags.

Switch to the **Time Series** tab to see metrics, tags and tag values:
* Use `//` to comment out the aggregate part of query to jump back to raw time series view.
* Columns are sortable.
* Select the ellipsis button on any tag value in the grid to quickly add filter statements.

<img src={useBaseUrl('img/metrics/metric-query-time-series.png')} alt="Time series with a metric query" style={{border: '1px solid gray'}} width="800" />

### Time series example

In the following example, we use the comment tag `//` to view the metric query that is still raw (no aggregation) in the **Time Series** tab:

```
container="istio-proxy" node="ip-10-42-169-62.us-west-2.compute.internal" metric=container_memory_working_set_bytes cluster=prod namespace=prod-otel001 
| quantize 1m  // | avg by container, pod | sum by pod 
```
<img src={useBaseUrl('img/metrics/time-series-example.png')} alt="Time series example" style={{border: '1px solid gray'}} width="800" />

Notice the following:
* The `container`, `namespace`, and `pod` labels for the metric from Kubernetes (`https://kubernetes.io/docs/reference/instrumentation/metrics/`).
* There is one metric in scope for `cluster` and `node`.
* There are 17 time series, so one or more tags must have unique values.
* The `deployment` and `pod` columns both have 17 values (one per istio endpoint).
* Use `avg` quantization (default), then `sum` for final total.
* Don't use `sum` (total for all data points) or `count` (count of data points only).

## Charting metrics

### Metric chart types

Unlike log searches, you often don't need to format the query output to make different types or charts. Some panels like **Single Value** do need aggregate output formatted a certain way.

For metrics, the UI has a very large impact on the resulting chart (compared to log search charting). The same query can produce many types of charts even when not aggregated (unlike in logs).

### Aggregate in metrics

Good reasons to aggregate in metrics:
* Better control over resulting time series from query.
* Much easier to get the query output you want to chart.
* Queries will scale to larger numbers of series and data points.<br/>For a single metrics query row, Sumo Logic limits the number of input time series to 1000 for non-aggregate queries. For aggregate queries (queries that have an aggregate operator like `avg` or `max`) the limit is at least 200,000 for time ranges within last 24 hours and 50,000 otherwise.
* For monitors it makes it easy to have alert grouping, for example, per cluster, per pod, per host.
* In monitor payloads you can use `ResultsJson.<fieldname>` for custom alert text.

### Fix "too many timeseries in the output"

When you perform a metric query, you may see the following message: <br/> `There were too many timeseries in the output, showing first 1000`.

<img src={useBaseUrl('img/metrics/timeseries-error-message.png')} alt="Too many timeseries message" style={{border: '1px solid gray'}} width="400" />

You can't have more than 1000 groups in aggregation or raw data series. This is called the "output limit". For more information, see [Output data limit](/docs/metrics/metrics-queries/metric-query-error-messages/#output-data-limit).

Try the following fixes:
* Perform a final aggregation by a dimension with less than 1000 groups:
    <br/>`| sum by pod | sum`
    <br/>or
    <br/>`| sum by namespace`
* Use the [topk search operator](/docs/search/search-query-language/search-operators/topk/):
    <br/>`| topk(500,latest)| sum by pod`
* Filter to remove series using `filter` or `where` operators:
    <br/>`| filter max > 0 `
    <br/>or
    <br/>`| where _value > 0`
    <br/>or 
    <br/>`| where max > 0`

###  Metric charting options that change output

Pay special attention to these UI options as they can impact your metrics chart output much more than log search does:
* Rounding
* Statistic type, especially for raw query
* Stacking for some types:<br/><img src={useBaseUrl('img/metrics/metric-query-chart-tips.png')} alt="Chart tips" style={{border: '1px solid gray'}} width="300" />
* Group or sort can be a UI setting in some charts:<br/><img src={useBaseUrl('img/metrics/metric-query-group-sort.png')} alt="Group and sort for charts" style={{border: '1px solid gray'}} width="300" />
* Threshold chart coloring can be a UI setting:<br/><img src={useBaseUrl('img/metrics/metric-query-threshold.png')} alt="Threshold for charts" style={{border: '1px solid gray'}} width="400" />

### Overrides to improve series naming

Use the **Display Overrides** tab to make it easy to read alias for metric series names in legends and popups, as well as the more usual options for custom chart formatting, such as the left/right axis. For more information, see [Override dashboard displays](/docs/dashboards/panels/modify-chart/#overridedashboard-displays).

Following are examples of queries without and then with override.

#### Default raw series

Query:
    ```
    metric=kube_pod_container_status_restarts_total
    | quantize using max | delta counter
    | topk(100,max)
   ```

Override: None

Output:
<img src={useBaseUrl('img/metrics/metric-query-default-raw.png')} alt="Default raw series output" style={{border: '1px solid gray'}} width="600" />

#### Aggregated

Query:
    ```
    metric=kube_pod_container_status_restarts_total 
    | quantize using max | delta counter 
    | topk(100,max) | sum by pod,cluster,namespace
    ```
Override: None

Output:
<img src={useBaseUrl('img/metrics/metric-query-aggregated.png')} alt="Aggregated series output" style={{border: '1px solid gray'}} width="600" />

#### Aggregated with override alias on #A

Now see how an override makes it easier to read output.

Query:
    ```
    metric=kube_pod_container_status_restarts_total 
    | quantize using max | delta counter 
    | topk(100,max)
    | sum by pod,cluster,namespace
    ```

Override:
<img src={useBaseUrl('img/metrics/metric-query-display-override.png')} alt="Example of metric query display override" style={{border: '1px solid gray'}} width="400" />

Output:
<img src={useBaseUrl('img/metrics/metric-query-aggregated-with-override.png')} alt="Aggregated with override series output" style={{border: '1px solid gray'}} width="400" />

## Tabular stats for time series panels

Use the **Bottom** or **Right** positions with table format and include aggregates like `sum`, `avg`, and `latest` to enable summary stats in the same panel for time series charts.

<img src={useBaseUrl('img/metrics/metric-query-table-display.png')} alt="Table statistics" style={{border: '1px solid gray'}} width="700" />

## Learn your ABC

## Rates and counters

## Managing DPM and high cardinality

