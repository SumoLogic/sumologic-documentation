---
id: create-metrics-visualization
title: Create a Metrics Query and Visualization
sidebar_label: Create a Metrics Query and Visualization
description: You can view metrics data in Sumo Logic.
---

This topic has information about Sumo Logic's Classic metrics UI. For information about the Metric Explorer UI, which replaces the Classic metrics UI, see [Metrics Explorer](../metric-queries-alerts/metrics-explorer.md).

:::note
If your query matches more than 1000 time series, you might see a message indicating that you need to adjust your query to reduce the number of time series. For more information, see [Too Many Time Series Messages](../metric-queries-alerts/metric-query-error-messages.md).
:::

The metrics visualization area is in the upper part of the page and the query area is in the lower part of the page.  

![page](/img/metrics/metricsblanknew.png)

To create a metrics visualization:

1. Click **+** in the tab bar and select **Metrics**.
1. Create your query or queries in the **Query** tab, which opens by default when you open the Metrics page.  

    ![page](/img/metrics/metricsquerycallout.png)

    Create up to six metrics queries, with each including a combination of the following:

    * Sequence of space-separated `tag=value` pairs. 
    * Unqualified strings (value with no key).
    * Functions (displayed with `|` symbol).
    * Aggregation by specified parameters (displayed with `|` symbol).
    * Logical operators (AND, OR, and NOT/!)  

    Example 1 (one query): `metric=CPU_Idle `  

    Example 1 (one query with aggregation): `cluster=search node=search-1 metric=cpu-system | avg by node`  

    Example 2 (two queries) `_sourceCategory=tara_cloudwatch_aws_logs_2 metric=CPU_Idle `  

    Example 3 (one query, using NOT to visualize all nodes except search-1): `cluster=search !node=search-1 metric=cpu-system | avg by node`  
     

    ![image3.png](/img/metrics/metrics-query-tab.png)

    For more information, see [Guidelines for Metrics Queries](../metric-queries-alerts/metrics-queries-classic.md).

1. Press **Enter** in any of the entry fields to display the data in the data visualization area. See [Interacting with Metric Charts](interacting-metric-charts.md) to learn how to interact with the visualization and modify settings.  

    ![metrics_first chart.jpg](/img/metrics/create-metric-vis.png)
