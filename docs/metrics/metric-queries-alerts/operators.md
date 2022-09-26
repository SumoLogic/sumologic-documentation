---
id: operators
title: Metrics Operators
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic describes Sumo Logic metrics operators and provides usage examples.


## accum

The `accum` operator creates a series of running totals for each metric time series. The running total in each series starts from the value of the first data point in the series, then iteratively adds up successive
values.

`accum` is useful for metrics where the cumulative value over time is of interest, for instance the number of failed or successful transactions.

#### accum Syntax

`accum`

#### accum example

This query calculates the running total for the `success.count` metric: `success.count | accum`.

If the values of success.count during the time range are: `59, 69, 57, 64, 47, 51, 62, 58, 70, 60`.

`accum` produces the following accumulated totals for those values: `59, 128, 185, 249, 296, 347, 409, 467, 537, 597`.

In the metric chart below, the green time series is the result of using
`accum`:

`SuccessCount | accum`

The orange time series shows the results without the `accum` operator.

![accum.png](/img/metrics/accum.png)  
 

## along

The `along` operator joins metric queries to have Sumo evaluate and perform expressions by comparing one or more metric fields. It considers multiple query rows and metrics referenced by another row according to one field or multiple fields separated by a comma (#A, #B,...).

`along` is helpful in the following usage:
* Simple row references (#A to #F) with math expressions. For example, `#A * 100` Math expressions support the same set of functions as the eval operator so you can use sin, cos, abs, log, round, ceil, floor, tan, exp, sqrt, min, and max.
* Evaluate multiple metrics. A single row can contain references to multiple rows, comparing metrics by joining them together in another row, or to to filter results of a query (row) by metadata from another row. For example: `#C: #B - #A along _sourceHost`

We recommend using `along` to refine your queries when comparing and using data from multiple queries. Otherwise, you will receive many-to-many relations.

#### Using RowID in Queries

With these operators, you can execute multiple queries (up to 6 from A to F) and use that rowID to compare multiple queries in the same line or chart. 

The rowID is the lettered query you created. Use it to get information on multiple metrics for the same desired time series. For example, you may want to plot out a CPU, Memory, and Disk metric all on one chart (same time series). Include three metric queries for A, B, and C. You can also use join with the along operator using rowIDs.

![metrics-along.png](/img/metrics/metrics-along.png)

Use the lettered query (#A, #B, #C, …)  for every request where there is only one metric query. Based on the response on rowID, you increment to B, C, D, E, and F (up to 6 queries) if you want multiple related metric queries returned for a single time series.

#### along syntax

```
#A + #B along [FIELD (,FIELD, ...]]
```    

#### along examples

#### Summation for a time series

This query performs a summation for time series whose dimension value matches. For example, you could use `_sourceHost` as the dimension, ensuring a time series in row A  is only added with a time series in row B if they have the same `_sourceHost`. 

```sql
metric=CPU_User _sourceHost=cqsplitter-*
metric=CPU_Sys _sourceHost=cqsplitter-*
#A + #B along _sourceHost
```

#### Disk percent between available and free by device name

This query considers and returns a disk percentage metric available and free for devices where the device name matches.  

```sql
(#B / (#A + #B)) * 100 as DiskUsedPercent along DevName
```

#### Sum and create a total metric

This query adds bytes_in with bytes_out for each node, and creates the metric bytes_total. Each time-series in A gets paired with an appropriate series from B, the one that has the same cluster and node fields. `along` specifies this pairing.

```sql
Row C: #A + #B along cluster, node as bytes_total
metric=bytes_total, node=node-1, cluster=search     C1 = A1 + B1
metric=bytes_total, node=node-2, cluster=search     C2 = A2 + B2
metric=bytes_total, node=node-1, cluster=metrics    C3 = A3 + B3
```

#### Calculate percentages for nodes by cluster

This query calculates bytes_in as a percentage of bytes_total on each node. The expression allows referring to the same series more than once in the expression: #A appears twice in the expression.

```sql
Row C: #A * 100 / (#A + #B) along cluster, node as bytes_in_pct_total
metric=bytes_in_pct_total, node=node-1, cluster=search     C1 = A1 * 100 / (A1 + B1)
metric=bytes_in_pct_total, node=node-2, cluster=search     C2 = A2 * 100 / (A2 + B2)
metric=bytes_in_pct_total, node=node-1, cluster=metrics    C3 = A3 * 100 / (A3 + B3)
```

#### Simulate metadata filtering

This query simulates the effect of filtering on metadata from a row by using metrics joins expressions that *remove* the data part from that row. The following example effectively filters results from row B to those with `_``sourcehost`s in row A.

```sql
#B + 0 *#A along _sourceHost
```

An advanced version of this query shows all metrics of CPU_LoadAvg for 1 minute, 5 minutes, and 15 minutes for three servers which have maximum load_avg.one:

```sql
A: _sourceHost=nite-metricsstore-* CPU_LoadAvg_1min | topk(3,avg)
B: _sourceHost=nite-metricsstore-* CPU_LoadAvg_5min
C: _sourceHost=nite-metricsstore-* CPU_LoadAvg_15min
D: (#B + 0 * #A) along _sourceHost
E: (#C + 0 * #A) along _sourceHost
```

#### Queries with aggregate operator

When running a join queries with aggregate operator:

```sql
#A: metric=Net_InBytes | avg by _sourceHost
```

```sql
#B: metric=Net_OutBytes | avg by _sourceHost
```

Include the aggregation dimension in the result query using along
operator:

```sql
#C: #B - #A along _sourceHost
```

![join-aggregate.png](/img/metrics/join-aggregate.png)


## avg

The `avg` operator calculates the average of all matching time series. If grouping is specified, it calculates the average for each group.

#### avg Syntax

```sql
avg [by FIELD [, FIELD, ...]]
```

#### avg examples

#### Average value across all time series 

This query returns the average value of the `RequestCount` metric across matching time series.  

```sql
Namespace=AWS/ApplicationELB metric=RequestCount Statistic=Sum AvailabilityZone=* Region=* TargetGroup=* | avg 
```  
 
![avg1.png](/img/metrics/avg1.png)

#### Average by one field

This query returns the average value of the `RequestCount` metric by one field—`TargetGroup`—across all matching time series, for the selected query range. Each line on the chart corresponds to a `TargetGroup`.

```sql
Namespace=AWS/ApplicationELB metric=RequestCount Statistic=Sum AvailabilityZone=* Region=* TargetGroup=* | avg by TargetGroup
```  
 
#### Average by two fields

Returns the average value of the metric by two fields—`TargetGroup` and `_sourceName`—across all matching time series, for the selected query range. Each line on the chart corresponds to a `_resourceName-TargetGroup` combination.

```sql
Namespace=AWS/ApplicationELB metric=RequestCount Statistic=Sum AvailabilityZone=* Region=* TargetGroup=* | avg by TargetGroup, _sourceName
```

## bottomk

The `bottomk` operator applies a specified aggregation function to the time series that match the query selector, and returns the n time series that have the lowest evaluated value over the query time range.  

#### bottomk syntax

```sql
bottomk (N, SCALAR_EXPRESSION) [by FIELD [, FIELD, ...]]
```

Where: 

`N` is the number of time series to chart

`SCALAR_EXPRESSION` is one these functions:

| Function | Description |
|--|--|
| min | Rank matching time series by which had the minimum value of the metric across the time range, and return the bottom n time series.  |
| max | Rank matching time series by which had the maximum value of the metric across the time range, and return the bottom n time series. |
| avg | Rank matching time series by the average value of the metric across the time range, and return the bottom n time series.  |
| count | Rank matching time series by the count of the metric values across the time range, and return the  bottom n time series.  |
| sum | Rank matching time series by the sum of the metric values across the time range, and return the bottom n time series. |
| pct(n) | Return the n time series for which the calculated percentile of the metric values across the time range was lowest, and return the bottom n. |
| latest | Rank matching time series by when the most recent data point was received, and return the bottom n time series.  |

#### bottomk examples

#### Bottom time series by avg value

This query ranks the time series that match the query selector by the average value of the CPU_Sys metric over the time range, and returns the bottom 5 time series.

```sql
_contentType=HostMetrics metric=CPU_Sys | bottomk (5, avg)
```

#### The 5 time series with the lowest 99% confidence interval

This query applies a math expression to each time series that match the query selector. The math expression calculates the average value over the time range, plus 3 standard deviations.  The time series are ranked by the calculated value, and the bottom 5 time series are returned.

```sql
_contentType=HostMetrics metric=CPU_Sys | bottomk (5, avg + 3 * stddev)
```

#### Bottom time series by specified percentile

This query calculates 10th percentile of the  Mem_FreePercent metric for each time series that match the query, ranks the time series on that basis, and returns the bottom 5 time series. 

```sql
_contentType=HostMetrics metric=Mem_FreePercent | bottomk (5, pct (10))
```


## count

Counts the total number of time series that match the query. If grouping is specified, it counts the total number for each group.

#### count syntax

```sql
count [by FIELD [, FIELD, ...]]
```    

### count examples

#### Count of time series for a metric

This query returns the number of time series for the `size` metric. 

```sql
metric=size | count
```

#### Count of time series for a metric by IP address

This query returns the number of time series for the size metric by src_ip. 

```sql
metric=size | count by src_ip
```

#### Count of 4xx errors by method

This example shows a query in the [Metrics Explorer](metrics-explorer.md) in basic mode. In advanced mode, the query would look like:

```sql
metric=4XXError | count by method
```

In this query, we're searching for how many 4xx errors occurred by different methods, for example GET, PUT, DELETE, and so on.

![count-example.png](/img/metrics/count-example.png)



## delta

Computes the backward difference at each data point in the time series to determine how much the metric has changed from its last value in the series.

The `delta` operator updates the `metric` dimension, if present,  to `delta($metric)`. If the original time series does not have a `metric` dimension, it creates `metric=delta` dimension. Other dimensions remain unaffected.

You can use the `increasing` or `decreasing` option, to make `delta` consider only pairs of consecutive points where the second point is greater or less than the first point. This functionality is useful when you are calculating the positive or the negative difference of a counter over time.

#### delta syntax

```sql
metric query | delta [increasing | decreasing]
```

#### delta examples

#### Difference in a metric value from previous point

This query returns a time series that reflects the difference in the `Net_InBytes`  metric for the eth0 interface  between a charted value and the one preceding it.

```sql
metric=Net_InBytes Interface=eth0 | delta
```

#### Positive difference in a metric over time

This query returns a time series that reflects the difference in the `elasticsearch_jvm_mem_heap_used_in_bytes`  metric between a charted value and the one preceding it, only considering pairs of consecutive points where the second point is greater than the first point.

```sql
metric=elasticsearch_jvm_mem_heap_used_in_bytes | delta increasing
```

## eval

Evaluates a time series based on a user-specified arithmetic or mathematical function.


#### eval syntax

```sql
metrics query | eval expr([REDUCER BOOLEAN EXPRESSION | _value] [_granularity])
```

* `expr` is basic arithmetic or mathematical function:  +, -, *, /, sin, cos, abs, log, round, ceil, floor, tan, exp, sqrt, min, max
* `_value` is the placeholder for each data point in the time series.
* `REDUCER BOOLEAN EXPRESSION` is an expression that takes all the values of a given time series, uses a function to reduce them to a single value, and evaluates that value. The supported functions are:
    * `avg`. Returns the average of the time series.
    * `min`. Returns the minimum value in the time series.
    * `max`. Returns the maximum value in the time series.
    * `sum`. Returns the sum of the values in the time series.
    * `count`. Returns the count of data points in the time series.
    * `pct(n)`. Returns the nth percentile of the values in the time series.
    * `latest`. Returns the last data point in the time series.
    * `stddev`. Returns standard deviation of the points in the time series.
* `_granularity`. Returns the length of the [quantization](https://help.sumologic.com/Metrics/Introduction-to-Metrics/Metric_Quantization) bucket in milliseconds. You can use this placeholder in your query.


#### Examples

**Example 1**

This query returns the value of the cpu_idle metric, multiplied by 100.

```
_sourceCategory=ApacheHttpServer metrics=cpu_idle | eval _value * 100
```

**Example 2**

This query sets the value of each point in a single time series to the average of all values in that time series.

```
metrics query | eval avg
```

For example, if you have this series, where the points are `(timestamp, value)`:

```
m1: (0, 1) (1, 2) (2, 3)
m2: (0, 3) (1, 6) (2, 9)
```

then `eval avg` would produce:

```
m1: (0, 2) (1, 2) (2, 2)
m2: (0, 6) (1, 6) (2, 6)
```

**Example 3**

This query returns the rate of change per second for the metric.

```
metrics query | sum | eval 1000 * _value/_granularity
```


## ewma

:::note
Currently the `ewma` operator is supported only in the Metrics Explorer’s [advanced mode](./metrics-explorer.md#about-advancedmode-ui), not basic mode.
:::

The `ewma` operator computes an Exponentially Weighted Moving Average (EWMA) on the data points returned by the query for the selected time range. This allows you to smooth out short-term fluctuations (outliers) and display long-term trends.

You can optionally run `ewma` with either:

* An explicit `alpha` smoothing parameter to smooth time series while preserving trends. This is useful if you want to explicitly set the smoothing parameter value.
* A `span` over a number of points. The `span` parameter is commonly understood as an N-Day Exponentially Weighted Moving Average. The *span* value is the number of data points that will be used to calculate the average. The decay (smoothing) parameter alpha  is related to span as: \
`alpha = 2/(span + 1)`

The most commonly used parameter is `span`, which allows you to specify the number of data points you want to use for smoothing. The higher the value of `span`, the smoother the time series will be. You might choose to use `alpha` if you know what smoothing parameter value you want use. Keep in mind that the lower the `alpha` value is, the smoother the time series will be.

If you run `ewma` without specifying either `alpha` or `span`, it runs by default with `alpha=0.5` (or`span=3`).


#### ewma syntax

```
metric query | ewma [alpha=<#> |span=<#>]
```


##### Syntax using alpha parameter

```
query selector | ewma alpha=<#>
```


Where:

* `alpha`, the smoothing parameter, is a decimal value (0.0 ≤ alpha ≤ 1.0)
* The default value of `alpha` is 0.5

**Example**

```
metrics=xyz | ewma alpha=0.1
```



##### Syntax using span parameter  

```
query selector | ewma span=<#>
```

Where:

* `span` is the number of data points. Must be an integer value greater than zero. If you set `span=5`, the last five data points will be used to calculate the average.
* The default value of `span` is 3.

**Example**

```
metrics=xyz | ewma span=10
```

## fillmissing

If a metric query returns results with empty timeslices, the visualization contains a straight line between the data points on either side of the empty timeslice(s).

You can use the `fillmissing` operator to fill empty time slices in metric query results with a derived data point. You can choose betweenseveral methods of deriving a data point, or leave empty timeslices empty.

:::note
The `fillmissing` operator is supported in the metric query tab, and in the [Metric Query Builder](metrics-explorer.md), currently in beta. 
:::

#### fillmissing Syntax

```sql
metric query | fillmissing [using] <empty | interpolation | last | fixed>
```

* `empty`. No data point is derived, and the visualization is discontinuous.
* `interpolation`. The derived data point is a linear interpolation of the data points prior to and after the empty time slice(s).
* `Last`. The derived data point is the same value as the previous data point.
* `fixed`. With this option, you supply a fixed value, for example “50”, and the derived data point will have that value.

#### Query without fillmissing

The chart in this section shows metric query results without the `fillmissing` operator.

```sql
_sourceCategory=Labs/VMWare6.5/Metrics hostname=thisveryhost metric=cpu_ready
```

#### Example 1: fillmissing empty

The chart in this section shows metric query results with the `fillmissing` operator with the `empty` option. Note that empty time slices are not filled with a derived data point. 

```sql
_sourceCategory=Labs/VMWare6.5/Metrics hostname=thisveryhost metric=cpu_ready | fillmissing empty
```

![fillmissing last.png](/img/metrics/fillmissing-empty.png)

#### Example 2: fillmissing interpolation

The chart in this section shows metric query results with the `fillmissing` operator with the `interpolation` option. Note that empty time slices are filled with a derived data point whose value is a linear interpolation of the data points prior to and after the empty time slice. 

```sql
_sourceCategory=Labs/VMWare6.5/Metrics hostname=thisveryhost metric=cpu_ready | fillmissing interpolation
```

![fillmissing last.png](/img/metrics/fillmissing-interpolation.png)

#### Example 3: fillmissing last

The chart in this section shows metric query results with the `fillmissing` operator with the `last` option. Note that empty time slices are filled with a derived data point whose value is the value of the metric from the previous time slice.

```sql
_sourceCategory=Labs/VMWare6.5/Metrics hostname=thisveryhost metric=cpu_ready | fillmissing last
```

![fillmissing last.png](/img/metrics/fillmissing-last.png)

#### Example 4: fillmissing with fixed value

The chart in this section shows metric query results with the `fillmissing` operator with a constant value of 0. Note that empty time slices are filled with a data point whose value is 0.

```sql
_sourceCategory=Labs/VMWare6.5/Metrics hostname=thisveryhost metric=cpu_ready | fillmissing 2000
```

![fillmissing constant.png](/img/metrics/fillmissing-constant.png)


## filter

You can use the `filter` operator to limit the results returned by a metric query. There are several ways you can restrict results. You can apply an aggregation function, such as `avg`, to a time series. You can also filter based on how many times the value of individual data points meet a value condition over a particular duration.

#### filter Syntax

There are two supported syntaxes for the `filter` operator.

#### Syntax 1

The first variant filters based on a function (usually an aggregation function) applied to the time series.

`metric query | filter [REDUCER BOOLEAN EXPRESSION]`

Where:

`[REDUCER BOOLEAN EXPRESSION]` is an expression that takes all the values of a given time series, uses a function to reduce them to a single value, and evaluates that value. 

The supported functions are:

* `avg`. Returns the average of the time series.
* `min`. Returns the minimum value in the time series.
* `max`. Returns the maximum value in the time series.
* `sum`. Returns the sum of the values in the time series.
* `count`. Returns the count of data points in the time series.
* `pct(n)`. Returns the nth percentile of the values in the time series.
* `latest`. Returns the last data point in the time series.

#### Syntax 1 examples

**Example 1**

Return the time series in which the average value of the CPU_User metric is greater than 95:

`metric=CPU_User | filter avg\> 95`

**Example 2**

Return the time series in which the latest value of the CPU_User metric is greater than 50:

`metric=CPU_User | filter latest\> 50`

#### Syntax 2

The second variant filters based on how many times the values of individual data points of a time series meet a value condition over a particular duration.

```sql
SELECTOR | filter _value [VALUE BOOLEAN EXPRESSION] [all | atleast n] [first | any | last] [duration]
```

Where:

* `[VALUE BOOLEAN EXPRESSION]` is a value expression that operates on individual data points of a time series. For example, \> 3`
* Use `all` to specify that all data points within the duration must meet the value condition, or `atleast n`, where `n` is a count, to specify how many data points must meet the value condition.
* Use `first`, `any`, or `last` to specify what part of the time range that duration applies to: the start of the time range, any part of the time range, or the end of the time range.
* Use `duration` to specify the length of time to consider in the query in minutes (m), hours (h), or days (d). For example, `5m`, `6h`, or `1d`.

#### Syntax 2 examples

**Example 1**

Return only the time series in which all data points during the last 5 minutes of the query time range have a value greater than 3. 

:::note
There must be a least one data point in the last 5 minutes of the time range for this to be valid.
:::

```sql
filter _value\> 3 all last 5m
```

**Example 2**

Return only the time series that have at least 1 data point greater than 3 for the last 5 minutes of the query time range. 

```sql
filter _value\> 3 atleast 1 last 5m
```

**Example 3**

Return only the time series that have only values greater than 3 for any consecutive 5 minutes of the time range.

```sql
filter _value\> 3 all any 5m
```

**Example 4**

Return only the time series that have only values greater than 3 for the first 5 minutes of the query time range. 

:::tip
There must be a least one data point in the first 5 minutes of the time range for this to be valid.
:::

```sql
filter _value\> 3 all first 5m
```  
 


## histogram_quantile

The `histogram_quantile` operator calculates the φ-quantile (0 ≤ φ ≤ 1) from the buckets of a histogram. This operator is specific to the [Prometheus Histogram data type](https://prometheus.io/docs/concepts/metric_types/#histogram) and does not work with non-Prometheus histograms. It is equivalent to the [PromQL histogram_quantile()](https://prometheus.io/docs/prometheus/latest/querying/functions/#histogram_quantile)
operator.

#### histogram_quantile syntax

```sql
histogram_quantile(quantile)
```

#### histogram_quantile examples

```sql
histogram_quantile(.99)
```

```sql
histogram_quantile(.5)
```

The following PromQL query to measure the 99th quantile of the `apiserver_request_latencies` histogram:

```sql
histogram_quantile(0.99, rate(apiserver_request_latencies_bucket{}[5m]))
```

It would be written in Sumo as:

```sql
metric=apiserver_request_latencies_bucket | quantize using max | delta | histogram_quantile(0.99)
```

:::note
You must include the `quantize` and delta clauses to get the same results as the PromQL query would produce.
:::


## in

The `in` functionality can be used in a metrics query selector as shorthand for multiple OR conditions.

#### Syntax

`selectors dimension = (value1, value2, value3, …)| metric query `

Where:

* `selectors` is one or more metadata key-value pairs or keywords that scope your query.
* `dimension` is the dimension (field) you want to match.
`value1`, `value2`, `value3`, and so on are values of dimension that you want to limit your query to.

#### Example
This example will match time series in which the value of the `dimX` field is one of the strings in the array enclosed in parentheses.

```sql
metric=CPU_Total dimX=(123, 345, 567)
```

## max

Calculates the maximum value of the time series that match the query. If grouping is specified, it calculates the maximum for each group.

#### Syntax

```sql
max [by FIELD [, FIELD, ...]]
```

#### max examples

#### Maximum metric value across all matching time series

This query returns the maximum `cpu_system` value for each time interval
across all matching time series.

```sql
dep=prod metric=cpu_system | max
```

#### Maximum metric value across by a tag value

This query returns the maximum `cpu_system` value by node for each time interval across all matching time series.

```sql
cluster=search metric=cpu_idle | max by node
```  
 

## min

Calculates the minimum value of the time series that match the query. If grouping is specified, it calculates the minimum for each group.

#### min syntax

```sql
min [by FIELD [, FIELD, ...]]
```

#### min examples

#### Minimum metric value across all matching time series

This query returns the minimum  `cpu_system` value for each time interval across all matching time series.

```sql
dep=prod metric=cpu_system | min
```

#### Minimum metric value across by a tag value

This query returns the minimum cpu_system value by node for each time interval across all matching time series.

```sql
cluster=search metric=cpu_idle | min by node
```  
 

## outlier

This page describes the metrics `outlier` operator and how to use it in a metric query.

The metrics `outlier` operator identifies metrics data points that are outside the range of expected values. Outliers help you spot unusual behavior in your metrics visualizations and track the behavior over time.

The `outlier` operator tracks the moving average and standard deviation of a time series over a specified time window, and calculates a threshold band, outside of which data points are considered outliers. You can use optional qualifiers to specify the time window, the number of standard deviations beyond which a data point is considered an outlier, and the directionality of the deviation.

At this time, using the `outlier` operator in a metric monitor is not supported.

#### outlier syntax

`metric query | outlier [window\<\>, threshold\<\>, direction=[ +- | + | - ]]`

Where:

* `window` is the time window, in minutes, over which to calculate the moving average and standard deviation of the time series. Default: 5m If you include the `window` qualifier, be sure to explicitly specify the units, for example `window=5m`.
* `threshold` is the number of standard deviations from the moving average that defines the threshold band. Default: 3
* `direction` specifies what deviation direction should trigger violations: positive deviations (+), negative deviations (-), or both (+-). Default: +-

![outlier-operator.png](/img/metrics/outlier-operator.png)

In the visualization, the threshold band is the part shaded in pink. The outlier values are represented by the pink triangles.


## parse

Parses the specified field to create new fields to use in the metrics query.

:::tip
If you are querying Graphite metrics, and do not specify the field to be parsed, the metric name parsed.
:::

Each wildcard in the pattern corresponds to a specified field. The parse operator supports both lazy (shortest match) and greedy (longest match wildcard matches.  Use '\*' for a lazy match, or '\*\*' for a greedy match.

#### parse syntax

```sql
parse [field=FIELD] PATTERN as PARSED_FIELD [, PARSED_FIELD, ...]
```

Where:

* `FIELD` is the metric field you want to parse, 
* `PATTERN` is an expression in which wildcards indicate how to parse `FIELD`
* `PARSED_FIELD` is a field that results from the parsing process

#### parse examples

#### parse three fields from a metric field

In this query, we parse the `LoadBalancer` field. The format of the field is `type/name/id`, for example:   

```sql
app/app-song-8d/4567223890123456
```

This query creates a field for each of the forward-slash-separated segments:  

```
AvailabilityZone=us-west-1a metric=HTTPCode_Target_2XX_Count | parse field=LoadBalancer */*/* as type, name, id
```

The `parse` operator creates fields named `type`, `name`, and `id` that have the values from the slash-separated segments of the `LoadBalancer` field.

#### Use a parsed field in a query

You can use the field(s) you’ve parsed within the same query, after the `parse` operator. For example this query parses the `name` field out of the  `LoadBalancer` field, returns the average value of the `HTTPCode_Target_2XX_Count` metric by the `name` field.

```
AvailabilityZone=us-west-1a metric=HTTPCode_Target_2XX_Count | parse field=LoadBalancer */*/* as type, name, id | avg by name
```
 
## pct

Calculates, at each timestamp, the nth percentile of values of the input series for each time interval. If grouping is specified, it calculates the specified percentile for each group.

#### pct syntax

```sql
pct(DOUBLE) [by FIELD [, FIELD, ...]]
```

Where `DOUBLE` is floating point number between 0.0 and 100.0, both inclusive.

#### pct examples

#### Return the 95th percentile of all input time series

This query calculates a single time series, where each plotted value is the 95th percentile of the `MemoryUsed` metric of the input time series for a timeslice.  

```sql
metric=MemoryUsed | pct(95.0)
```

#### Return time series with average metric value in 95th percentile by a field

This query is similar to the previous but it calculates the percentile of the `MemoryUsed` metric by a metric field, in this case, `node`. The query returns a time series for each node; each plotted point in a time series corresponds to the 95th percentile of all of the input time series with that `node` value, for a timeslice.

```sql
metric=MemoryUsed | pct(95.0) by node
```


## quantize

You can use the `quantize` operator to control the Sumo’s quantization behavior, which is described in detail in [Metric Quantization](../introduction-metrics/metric-quantization.md).
You can specify:

* The size of the time buckets across which Sumo aggregates your metrics. If you do not specify a quantization interval, Sumo determines an optimum size for time buckets, as described in [Automatic quantization at query time](../introduction-metrics/metric-quantization.md).  
* The rollup type that Sumo uses to aggregate the individual data points in a time bucket, which can be one of `avg, min, max, sum,` or `count`. If you do not specify a rollup type in the `quantize` clause of your query, for each time bucket, Sumo presents the average of the data points in that bucket.  

#### quantize syntax

:::note
The `quantize` operator *must* appear immediatdly after your query selector, before any other operators.
:::

```sql
metrics query | quantize to INTERVAL [using ROLLUP] [drop last]
```

where:

* `INTERVAL` is the duration over which you want to quantize the metrics, in seconds (`s`) , minutes (`m`), hours (`h`), or days (`d`).
* `ROLLUP` is  `avg, min, max, sum`, or `count`.
* `drop last` causes the last time bucket to be dropped, if the end of that bucket is after the end of the query time range.

:::note
In the Metrics Explorer, you must [switch to Advanced Mode](metrics-explorer.md) to enter the `drop last` option.
:::

#### quantize examples 

#### Set time bucket size

The `quantize` clause in this metric query sets the time bucket size to 5 minutes. Sumo will aggregate the metrics in each time bucket using the default rollup type, `avg`. 

```sql
_sourceCategory=hostmetrics | quantize to 5m
```

#### Set time bucket size and rollup type

The `quantize` clause in this metric query sets the time bucket size to 10 minutes, and specifies the `sum` rollup type. Sumo will sum the metric values in each 10 minute time bucket and return that value.

```sql
metric=CPU_User cluster=kafka | quantize to 10m using sum
```

#### Set time bucket size, rollup type, and drop last 

The `quantize` clause in this metric query sets the time bucket size to 10 minutes, and specifies the `sum` rollup type. Sumo will sum the metric values in each 10 minute time bucket and return that value. If the last time bucket ends after the end of the query time range, that bucket is dropped.

```sql
metric=CPU_User cluster=kafka | quantize to 10m using sum drop last
```


## rate

Calculates the per-second rate of change between consecutive data points. It divides the difference in values of consecutive data points by the difference in their timestamps (in milliseconds) and then multiplies the result by 1000 (to scale up the quantity from a per-millisecond rate to a per-second rate).

The rate operator also assigns the value of the metric tag to be `rate($metric)` and the value of the unit metadata field to be `$unit/second` (for example, 1/second).

#### rate syntax

```sql
metric query | rate [increasing | decreasing]
```

If you use the `increasing` option, the operator will consider only those pairs of consecutive points where the second point in the pair is greater than the first point. Similarly, if you use the the `decreasing` option, the operator will consider only those pairs of consecutive points where the second point in the pair is less than the first point. This functionality is useful when you are calculating the rate of change of a counter over time.

#### rate example

This query calculates the increase or decrease per second in the `Net_InBytes` metric from one collected data point to the next. 

```sql
metric=Net_InBytes Interface=eth0 | rate
```  




## Rollup Selector

Currently, Rollup Selector is available in the Metric Explorer's advanced mode only, not in basic mode.

In a metric query selector, before the first pipe in your query, you can use a Rollup Selector to specify how you want the raw data points to be aggregated. Specifically, you can select what rollup function to use (avg, min, max, count, or sum), and the duration of time over which you want to aggregate data points.

This control over rollup behavior is useful because otherwise,

Sumo Logic will use the default rollup, which is usually avg. (Exceptions: if a query has a max or min aggregation after the first pipe, the query will run against the max or min rollup respectively.)
Sumo Logic will and will automatically choose a rollup duration to limit the number of data points per returned time series to 300.

#### Syntax
You include a rollup selection in the scope of your query, before the first pipe.
```
query selector aggregator over duration
```
Where:

* `aggregator` is one of avg, min, max, count, or sum.
* `duration` is the length of time over which you want to aggregate the data, in milliseconds (ms), seconds (s), minutes (m), hours (h), or days (d).

#### Rules

You must supply both an aggregation function and duration.
Sumo Logic supports a maximum of 300 data points per time series, so, if you choose a duration that would return more than that, we will automatically choose a more granular duration.

#### Example
When this query is run, the matching data points will be rolled up using the sum rollup type, over a 5 minute duration.

```
metric=cpu_idle [sum over 5m] | max
```



## stddev

The `stddev` operator measures of the magnitude of deviations between the values in a time series.

Often used in financial applications, calculating standard deviations also has value in analyzing system behaviors. Measuring the standard deviation of a system metric is useful in performance analysis, transaction monitoring, and identifying or removing outliers. A low deviation value indicates that the data points tend to be very close to the mean, whereas a high deviation value indicates that the data are spread out over a large range of values. A low standard deviation implies that there is a more stable, or consistent, performance within the system.

`stddev` calculates the standard deviation at each time interval across all the time series, resulting in one time series that contains the standard deviation per time slot. If you group the results by a dimension, the standard deviation for the time series in each group is calculated. The result is returned as a metric named _stddev_.


#### stddev syntax

```sql
metric query | stddev [by FIELD [, FIELD, ...]]
```

`stddev` isn’t supported in queries that use the `quantize` operator.

#### Examples

**Example 1**

This query returns the standard deviation of the `cpu_system` metric from the _prod_ deployment.

```sql
dep=prod metric=cpu_system | stddev
```

**Example 2**

This query returns the standard deviation of the `cpu_system` metric from the _prod_ deployment, grouped by the source that collected the metrics.

```sql
dep=prod metric=cpu_system | stddev by _source
```



## sum

Calculates the sum of the metrics values that match the query. If grouping is specified, it calculates the sum for each group.

#### sum syntax

```sql
sum [by FIELD [, FIELD, ...]]
```

#### sum examples

#### Sum the value of a metric 

This query calculates the total of the `cpu_system` metric values across all time series whose `dep` tag equals “prod”.

```sql
dep=prod metric=cpu_system | sum
```

#### Sum the value of a metric by one field 

This query calculates the total of the `cpu_system` metric values across all time series whose `dep` tag equals “prod” by node.

```sql
cluster=search metric=cpu_idle | sum by node
```  

## timeshift

The `timeshift` operator shifts the time series from your metrics query by a specified period of time.

#### timeshift syntax 

`timeshift TIME_INTERVAL` 

Where:

* `TIME_INTERVAL` is a time interval in millisecond(ms), seconds (s), minutes (m), hours (h), or days (d).

#### Example 

Query #A returns the `cpu_idle` metric for the currently selected query time range, the last 15 minutes. 

`#A _sourceCategory=prod/host _sourceHost=my-mac= metric=cpu_idle `

Query #B returns the `cpu_idle` metric for the 15 minute period that ended two hours ago. 

`#B _sourceCategory=prod/host _sourceHost=my-mac= metric=cpu_idle | timeshift 2h`

<img src={useBaseUrl('img/metrics/timeshift.png')} alt="your description" />

## timeslice

The `timeslice` operator allows you to aggregate individual data points over a specified duration using a specified rollup function, one of: avg, min, max, sum, count, or rate.

The timeslice operator is currently supported in the Metric Explorer's advanced mode, not in basic mode.

#### Syntax
```
metrics query | timeslice <avg/min/max/count/sum/rate> over <duration>
```

Where:

duration is the length of time over which you want to aggregate the data, in milliseconds (ms), seconds (s), minutes (m), hours (h), or days (d).

#### Example

```
cluster=search metric=cpu_idle | timeslice max over 3m
```



 

## topk

The `topk` operator applies a specified aggregation function to the time series that match the query selector, and returns the *n* time series that have the highest evaluated value over the query time range.  

#### topk syntax

```sql
topk (N, SCALAR_EXPRESSION) [by FIELD [, FIELD, ...]]
```

Where: 

* `N` is the number of time series to chart
* `SCALAR_EXPRESSION` is one these functions:
    * `min`. Rank matching time series by which had the minimum value of the metric across the time range, and return the top n time series. 
    * `max`. Rank matching time series by which had the maximum value of the metric across the time range, and return the top n time series.
    * `avg`. Rank matching time series by the average value of the metric across the time range, and return the top n time series. 
    * `count`. Rank matching time series by the count of the metric values across the time range, and return the top n time series. 
    * `sum`. Rank matching time series by the sum of the metric values across the time range, and return the top n time series.
    * `pct(n)`. Return the n time series for which the calculated percentile of the metric values across the time range was lowest, and return the top n. 
    * `latest`. Rank matching time series by when the most recent data point was received, and return the top n time series. 

#### topk examples

#### Top 10 time series by maximum value

This query ranks the time series that match the query selector by the maximum value of the CPU_Sys metric over the time range, and returns the top 10 time series.

```sql
metric=cpu_system | topk (10, max)
```

Top 10 time series based on a calculated value.

This query applies a math expression—(max / avg \* 2)—to each time series that matches the query selector. The time series are ranked by the calculated value, and the top 10 time series are returned.

```sql
metric=cpu_system |topk (10, max /avg * 2)
```

## where

You can use the `where` operator to filter data points by value.

`where` is somewhat analogous to the [filter](#filter) metrics operator. However, `filter` only supports filtering entire time series; in contrast, `where` allows you to filter by data point value.

:::note
The `where` operator is currently supported in the Metric Explorer's [advanced mode](./metrics-explorer.md#about-advancedmode-ui), not in basic mode.
:::

#### Syntax

```sql
selectors | where _value [VALUE BOOLEAN EXPRESSION | REDUCER BOOLEAN EXPRESSION] [_granularity]
```

* `_value` is the placeholder for each data point in the time series.
* `_granularity` is the placeholder value for the length of the quantization bucket in milliseconds.
* `[VALUE BOOLEAN EXPRESSION]` is a value expression that operates on individual data points of a time series. For example, `> 3`.
* `[REDUCER BOOLEAN EXPRESSION]` is an expression that takes all the values of a given time series, uses a function to reduce them to a single value, and evaluates that value. The supported functions are listed in the [eval](https://help.sumologic.com/Metrics/Metric-Queries-and-Alerts/07Metrics_Operators/eval) topic.


#### Examples

**Example 1**

This query returns the data points in which the value is greater than 10 and less than 30.

```sql
metric=xyz | where _value > 10 and _value < 30
```

**Example 2**

This query returns the data points in which the value is greater than or equal to the maximum value in the time series.

```sql
metric=xyz | where _value >= max - 5
```
