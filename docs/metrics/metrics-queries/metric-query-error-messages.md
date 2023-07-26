---
id: metric-query-error-messages
title: Metric Query Error Messages
sidebar_label: Error Messages
description: Explanation of warning and error messages from Sumo Logic Metric Query, and .
---

This page describes warning and error messages that are presented for long-running metric queries and metric queries that return too many results.

## Errors

An error means a critical issue that prevents your query from running. When an error happens, you query will not yield any result. The error could be caused by a syntax error in the query string, or by the query reaching a hard limit. You can request Sumo for a limit increase if a hard limit is reached.

### Query Timeout

When a metric query runs for 60 seconds, it will time out, and Sumo will present a message like this:

`The metrics query timed out. Please consider making the query more selective.`

The error might results from the query matching too many time series, but it could also be caused by other conditions, for instance a backend failure or problem.

### Hard Limits on Metric Queries

To provide the best user experience, we have hard limits that are preventing some unusual query patterns from executing. If your use case involves queries over any of these limits, please contact customer support to increase the limit. 

The following hard limits apply to Metrics queries in Sumo:

|Property|Limit|Error Message|
|:---|:---|:---|
|Query Rows|6|Too many query rows ([number of rows]). The limit is: [limit].|
|Query String Length|1500 chars|Too long ([queryLength] characters). The limit is: [limit].|
|Max Number of Operators|60|Too many operators: [number of operators]. The maximum number of possible operators is: [limit].|
|Max Number of Selectors|50|Too many selectors: [number of selectors]. The maximum number of possible selectors is: [limit].|
|Max Time Range|1000d|The given time range was invalid.|
|Max Quantization Interval|30d|The given quantization was too big.|
|Max Timeshift|1000d|The given timeshift was too big.|


## Warnings

Warnings refer to issues that will not block your query from running and returning results. However, the result may be inaccurate or incomplete due to the issue warned about. 

### Too many time series

Sumo Logic imposes limits on the input data for a query and the data output by the query, as described below.

#### Input data limit

*Input data* is the data that matches the selector, prior to aggregation. Sumo Logic evaluates the volume of input data in terms of the number of time series.

For a single metrics query row, Sumo Logic limits the number of input time series to 1000 for non-aggregate queries, and 50,000 for aggregate queries (queries that have an aggregate operator like `avg` and `max`). In addition, the total number of data points scanned by a single row of query limited to 500,000,000 (500M) raw data points, or 50,000,000 (50M) [rollup data points](/docs/metrics/introduction/metric-quantization/#rollup-types).

When a single row of a query scans more than 50,000 time series, more than 500M raw data points or more than 50M rollup data points, Sumo will stop after scanning the current time series, and aggregate the results based on the scanned inputs. A message like this appears when the input limit is reached:

`This query is scanning too much data, the first (number of input time series scanned) time series were included.`

:::important
If the query that results in the message contains an aggregation operator, the results presented are likely to be erroneous because the aggregation will be based on partial input.  
:::

#### Output data limit

When a single row of query returns more than 1000 time series after the input data limit is applied, Sumo also limits the number of time series in the visualization and any aggregate calculations, and presents a message as follows:

`There were too many timeseries in the output, showing first 1000`

There will also be a tip like this:

`Tip: Group your data by _sourceHost using avg to produce more readable result. Add operator to query.`

One solution is to add additional selectors to your query to reduce the number of time series returned, for example, by adding additional `tag=value` pairs to the query. You can also filter the time series returned using the [topk](/docs/metrics/metrics-operators/topk), [bottomk](/docs/metrics/metrics-operators/bottomk), and [filter](/docs/metrics/metrics-operators/filter) operators. 

#### Join data limit

When a cross-row calculation (e.g. #A+#B) produces more than 1000 time series, Sumo will limit the number of output from this cross-row calculation to 1000, and present a message as follows:

`The cross-row calculation resulted in too many time-series. Limiting results to 1000 series.`

### Quantization interval not supported

When you use the [quantize](/docs/metrics/metrics-operators/quantize) operator to control Sumo’s quantization behavior, the following limitations will apply in sequence:

- Each output time series will contain no more than 300 data points. If the quantization interval is too small, the following warning message will be displayed:

  `The requested quantization granularity of [Desired Interval] would produce more than 300 points per metric. Using [Corrected Interval] instead.`

  and the quantization interval will be set to the nearest appropriate value that results in less than or equal to 300 data points per series.

- When the specified quantization interval is less than the minimum quantization interval supported by the dataset, the following warning message will be displayed:

  `The requested quantization granularity [Desired Interval] was not supported. Using [Corrected Interval] instead.`

  and the quantization interval will be set to the nearest supported value.
  
If multiple conditions apply, the message from the latest warning will be displayed with the initial desired interval and the final corrected interval.
  
### Aggregation over nonexistent key

Aggregate (group-by) functions evaluate the specified arithmetic function for each timestamp across different time series. The by clause is used to define the field to group by.

If the field specified in the by clause is empty for one or more time series, the following warning message will be displayed:

`Aggregate by non-existent keys. Keys: [key1, key2, ...] is missing in one or more time series.`

All the series that have the group by field empty will be treated as one group in the aggregation result.
