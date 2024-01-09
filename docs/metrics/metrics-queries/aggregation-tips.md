---
id: aggregation-tips
title: Metric Aggregation Tips
sidebar_label: Metric Aggregation Tips
---

import useBaseUrl from '@docusaurus/useBaseUrl';

When you run a metrics query that returns high cardinality results, the [Metrics Explorer](/docs/metrics/metrics-queries/metrics-explorer.md) displays a tip for how to use an aggregation clause to produce more readable results. An aggregation tip is displayed for a query based on the cardinality of the query. It is presented when a query’s cardinality exceeds these thresholds:


<table>
  <tr>
   <td>Tab / Chart type
   </td>
   <td>Cardinality threshold
   </td>
  </tr>
  <tr>
   <td><strong>Chart </strong>tab with a Single Value panel type
   </td>
   <td>1 unique series
   </td>
  </tr>
  <tr>
   <td><strong>Chart</strong> tab with a Time Series or Categorical panel type
   </td>
   <td>10 unique series
   </td>
  </tr>
  <tr>
   <td><strong>Time Series </strong>tab
   </td>
   <td>50 unique time series
   </td>
  </tr>
</table>


Aggregation tips are available in the Metrics Explorer, and in metrics queries in Dashboards.


## View aggregation tips

The screenshot below shows the **Time Series** tab for a query that returns 270 time series. Note the tip below the query suggests grouping the data by the `prometheus_replica` dimension using the `avg` operator. You can ignore the tip and close the tip by clicking the x to the right. Or you can click **Add operator to query** to add the recommended operator and dimension to your query.

<img src={useBaseUrl('img/metrics/hint1.png')} alt="line-commented.png" />


If you click **Add operator to query**, the aggregation clause is added to your query. We don’t run the query automatically—press Enter, or click the run icon to execute the query.

<img src={useBaseUrl('img/metrics/hint2.png')} alt="line-commented.png" />

If you’re running multiple queries, a tip will be provided for each of the queries that exceeds a cardinality threshold.

<img src={useBaseUrl('img/metrics/hint3.png')} alt="line-commented.png" />



## Disable tips

If you prefer not to see query tips, choose **Disable Query Tips** from the three-dot more options menu in the Metrics Explorer.

<img src={useBaseUrl('img/metrics/disable-query-tips.png')} alt="line-commented.png" />
