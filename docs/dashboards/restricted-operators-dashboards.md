---
id: restricted-operators-dashboards
title: Restricted Operators in Dashboards
sidebar_label: Restricted Operators in Dashboards
description: Learn more about the restrictions when you use operators with dashboards.
---

This page has information about restrictions and rules about using [Sumo Logic search operators](/docs/search/search-query-language) with dashboards.

## Dashboard restrictions

The following operators can't be used with dashboards:

* Details
* LogReduce
* LogCompare
* Parse multi
* Sample (internal-use operator)
* Save
* Transaction

## Auto refresh restrictions

The following operators can't be used in Auto refresh:

* Compare With can be used when your query's aggregate operation is grouped by a [timeslice](/docs/search/search-query-language/search-operators/timeslice)
* Details
* First, Last - instead use the **withtime** option, see [most_recent and least_recent](/docs/search/search-query-language/group-aggregate-operators/most-recent-least-recent).
* Join
* LogReduce
* LogCompare
* Now
* Outlier will omit the first N (window size) data points in results because those data points are used in the training phase.
* Parse Using
* queryStartTime()
* queryEndTime()
* Save
* Sessionize
* Subquery
* Threat Intel
* Trace
* Timeslice greater than 1 day
* Transactionize

The following search modifier cannot be used in Auto refresh.

* _dataTier

## Include only after the first group-by phrase

You can use the following operators in dashboard panels:

* Accum
* Backshift
* Diff
* Join
* Limit
* RollingStd
* Smooth
* Sort
* Top
* Total
* Transaction By Flow

## Notes

You can use the [count_frequent](/docs/search/search-query-language/group-aggregate-operators/count-count-distinct-and-count-frequent) operator in dashboard queries, but the number of results returned is limited to the top 100 most frequent results. All results are available when the search is run on the **Search** page, but only the top 100 are displayed in the Panel.

Sumo Logic provides support for optimization to improve the efficiency of searches in Interactive dashboards. See [Optimize Panels in Interactive Dashboards](/docs/dashboards/dashboard-optimization.md).
