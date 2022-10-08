---
id: metric-query-error-messages
title: Metric Query Error Messages
sidebar_label: Error Messages
description: Sumo issues errors when metric queries run too long or match too many time series.
---

This page describes error messages that are presented for long-running metric queries and metric queries that return too many results.

## Too many time series

For a single metrics query row, Sumo limits input time series at 1000 for non-aggregate queries and 15000 for aggregate queries (queries that have an aggregate operator like avg and max). The input time series is the time series before aggregation that match the selector.

When a metric query returns more than 1000 time series, Sumo limits the number of time series in the visualization and any aggregate calculations, and presents a message like this:

`Too many time-series matched '(query-selectors)'. Displaying n of m+ matching series. Add more filters to select fewer time series or apply an aggregation function`

Where: 

* `query-selectors` are the selectors you used in your query.
* `n` is the number of time series displayed in the visualization.
* `m` is the number of time series that matched your query.

:::important
If the query that results in the message contains an aggregation operator, the results presented are likely to be erroneous because the aggregation will be based on only 1000 time series.  
:::

One solution is to add additional selectors to your query to reduce the number of time series returned, for example by adding additional `tag=value` pairs to the query. You can also filter the time series returned using the [topk](/docs/metrics/metrics-operators#topk), [bottomk](/docs/metrics/metrics-operators#bottomk), and [filter](/docs/metrics/metrics-operators#filter) operators. 

## Long-running metric query

For a single metrics query request, Sumo limits the output time series at 1000 for visualization. Output time series can either exceed the limit for a single row or multiple rows combined.

When a metric query runs for 30 seconds, it will time out, and Sumo will present a message like this:

`The metrics query timed out. Please consider making the query more selective.`

The error might results from the query matching too many time series, but it could also be caused by other conditions, for instance a backend failure or problem.
