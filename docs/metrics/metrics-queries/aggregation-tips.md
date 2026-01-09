---
id: aggregation-tips
title: Metric Aggregation Tips
sidebar_label: Metric Aggregation Tips
---

import useBaseUrl from '@docusaurus/useBaseUrl';

When you run a metrics query that returns high cardinality results, the [Metrics Search](/docs/metrics/metrics-queries/metrics-explorer) displays a tip for how to use an aggregation clause to produce more readable results. An aggregation tip is displayed for a query based on the cardinality of the query. It is presented when a query’s cardinality exceeds these thresholds:

| Tab type | Cardinality threshold | 
| :-- | :-- |
| **Chart** tab with a Single Value panel type | 1 unique series  |
| **Chart** tab with a Time Series or Categorical panel type | 10 unique series |
| **Time Series** tab | 50 unique time series |

Aggregation tips are available in the Metrics Search, and in metrics queries in dashboards.

## View aggregation tips

The screenshot below shows the **Time Series** tab for a query that returns 270 time series. Note the tip below the query suggests grouping the data by the `prometheus_replica` dimension using the [`avg`](/docs/metrics/metrics-operators/avg/) operator. You can ignore the tip and close the tip by clicking the x to the right. Or you can click **Add operator to query** to add the recommended operator and dimension to your query.<br/><img src={useBaseUrl('img/metrics/hint1.png')} alt="line-commented.png" style={{border: '1px solid gray'}} width="800" />

If you click **Add operator to query**, the aggregation clause is added to your query. We don’t run the query automatically—press Enter, or click the run icon to execute the query.<br/><img src={useBaseUrl('img/metrics/hint2.png')} alt="line-commented.png" style={{border: '1px solid gray'}} width="800" />

If you’re running multiple queries, a tip will be provided for each of the queries that exceeds a cardinality threshold.<br/><img src={useBaseUrl('img/metrics/hint3.png')} alt="line-commented.png" style={{border: '1px solid gray'}} width="800" />

## Disable tips

If you prefer not to see query tips, choose **Disable Query Tips** from the three-dot kebab menu in the Metrics Search.

<img src={useBaseUrl('img/metrics/disable-query-tips.png')} alt="line-commented.png" style={{border: '1px solid gray'}} width="200" />
