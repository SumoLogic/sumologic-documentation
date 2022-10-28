---
id: metric-query-error-messages
title: Metric Query Error Messages
sidebar_label: Error Messages
description: Sumo issues errors when metric queries run too long or match too many time series.
---

This page describes error messages that are presented for long-running metric queries and metric queries that return too many results.

## Too many time series

Sumo Logic imposes limits on the input data for a query and the data output by the query, as described below.

### Input data limit

*Input data* is the data that matches the selector, prior to aggregation. Sumo Logic evaluates the volume of input data in terms of the number of time series.

For a single metrics query row, Sumo Logic limits the number of input time series to 1000 for non-aggregate queries, and 37000 for aggregate queries (queries that have an aggregate operator like avg and max). Besides, the total number of datapoints scanned by a single row of query is limited at 500,000,000 (500M) raw datapoints, or equivalent size of compressed datapoints.

When a single row of a query scans more than 37000 time series or more than 500M datapoints, Sumo will stop after scanning the current time series, and aggregate the results based on the scanned inputs. A message like this appears when the input limit is reached:

`This query is scanning too much data, the first (number of input time series scanned) time series were included.`

:::important
If the query that results in the message contains an aggregation operator, the results presented are likely to be erroneous because the aggregation will be based on partial input.  
:::

### Output data limit

When a single row of query returns more than 1000 time series after the input data limit is applied, Sumo also limits the number of time series in the visualization and any aggregate calculations, and presents a message like this:

`There were too many timeseries in the output, showing first 1000`

There will also be a tip like this:

`Tip: Group your data by _sourceHost using avg to produce more readable result. Add operator to query.`

One solution is to add additional selectors to your query to reduce the number of time series returned, for example by adding additional `tag=value` pairs to the query. You can also filter the time series returned using the [topk](/docs/metrics/metrics-operators/topk), [bottomk](/docs/metrics/metrics-operators/bottomk), and [filter](/docs/metrics/metrics-operators/filter) operators. 

## Long-running metric query

For a single metrics query request, Sumo limits the output time series at 1000 for visualization. Output time series can either exceed the limit for a single row or multiple rows combined.

When a metric query runs for 60 seconds, it will time out, and Sumo will present a message like this:

`The metrics query timed out. Please consider making the query more selective.`

The error might results from the query matching too many time series, but it could also be caused by other conditions, for instance a backend failure or problem.
