---
id: create-metrics-visualization
title: Create a Metrics Query and Chart
sidebar_label: Create and Chart a Metrics Query
description: You can view metrics data in Sumo Logic.
---

:::note
This topic pertains to our Classic Metrics UI (Legacy). For information about the Metrics Explorer UI, which replaces the Classic Metrics UI, see [Metrics Explorer](../metrics-queries/metrics-explorer.md).
:::

The metrics visualization area is in the upper part of the page and the query area is in the lower part of the page.  

![page](/img/metrics/metricsblanknew.png)


## Create a metrics visualization

1. Click **+** in the tab bar and select **Metrics**.
2. Create your query or queries in the **Query** tab, which opens by default when you open the Metrics page.  

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

    For more information, see [Guidelines for Metrics Queries](../metrics-queries/metrics-queries-classic.md).

3. Press **Enter** in any of the entry fields to display the data in the data visualization area. See [Interacting with Metrics Charts](interacting-metric-charts.md) to learn how to interact with the visualization and modify settings.  <br/>  ![metrics_first chart.jpg](/img/metrics/create-metric-vis.png)

## Limitations

If your query matches more than 1000 time series, you might see a message indicating that you need to adjust your query to reduce the number of time series. For more information, see [Too Many Time Series Messages](../metrics-queries/metric-query-error-messages.md).
