---
id: metrics-explorer
title: Metrics Search
sidebar_label: Metrics Search
description: Learn how to use the Metrics Search to query your metrics.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page describes the Metrics Search UI and how to use it.

import TerraformLink from '../../reuse/terraform-link.md';

:::tip
You can use Terraform to provide a metrics search with the [`sumologic_metrics_search_v2`](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/metrics_search_v2) resource.

<TerraformLink/>
:::

## About the UI

The Metrics Search appears when you open a new metrics tab. The page
has two modes:

* **Basic**. Basic Mode provides a query builder UI: you can construct metric queries by selecting metadata fields, dimensions, metrics, and operators from pull-down lists. This makes it easier to create your search scope and to apply operators to the metrics that are returned. You’ll still want to understand the functionality of [metric operators](/docs/metrics/metrics-operators), but the Metrics Search helps you by prompting you with a list of available operators, and after you choose an operator, the options or qualifiers that the operator supports.
* **Advanced**. In Advanced Mode, you can enter free-form metric queries. You can enter your entire query manually, but Advanced Mode will also prompt you with pull-down lists of metadata fields, dimensions, metrics, and operators.

If your query supports basic mode, you can freely move between basic and advanced mode to build and run your query.

## Switch between Basic and Advanced Mode

When you open a new Metrics tab, it is displayed in Basic Mode. You can switch to Advanced Mode by clicking the three-dot kebab icon, and selecting **Advanced Mode**. When you are in Advanced Mode, you can switch back to Basic Mode from the same options menu.

If you use the Advanced Mode to build complex metrics, you can convert it to Basic Mode by selecting the option. If the query cannot support basic mode, you receive a message informing you "Your query cannot be switched to Basic Mode."

Example of queries that *will not* convert:

* `metric=CPU_Sys _sourceCategory=autocomplete | bottomk (5, avg + 3 * stddev)` This query is not supported because `bottomk` in basic mode only supports simple aggregators such as `avg` or `count`. It does not support arbitrary formulas.
* `(metric=CPU_Sys OR metric=CPU_Idle) _sourceCategory=autocomplete` This query is not supported because basic mode does not support logical `OR` for the selector part of the query.

When converted, the filters convert allowing you to select and modify, make different selections, remove filters, and add operators as you would normally in Basic Mode.

<img src={useBaseUrl('img/metrics/metric-explorer-switch-modes.png')} alt="Metrics Search switch modes" style={{border: '1px solid gray'}} width="800" />

## View Metrics Query History

Every query run by a user is saved in query history (both incorrect and correct queries). You can use the Metrics query history to find your previous metric queries. Both those run in the Metric Tab and the Dashboard panels. Queries as saved and stored in user settings, just like information on hidden columns for Preview Table and open tabs.

When you select a query from the list, it is updated for a query row where you opened query history dropdown. Selected queries from list are adjusted to current query editor mode selected by the user. For example, if you are in Basic mode and the query was run before in advanced mode, the Metrics interface  will adjust to Basic mode.

:::note
If the query editor mode cannot be adjusted, it is changed to advanced mode so that it can handle query from history. It is possible to run queries which were used with parameters/template variables.
:::

## Create a metric query

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Metrics > Metrics Search**. You can also click the **Go To...** menu at the top of the screen and select **Metrics Search**.  <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Go to the **Home** screen and select **Metrics**. 
1. The Metrics Search page opens. Click the **Metric** field. A list of metrics appears. You can scroll through the list, or begin typing to dynamically narrow the list. Click the desired metric.

    <img src={useBaseUrl('img/metrics/click-in-metrici-area.png')} alt="Select metric" style={{border: '1px solid gray'}} width="800" />

1. Click the **Filters** field. A list of metadata fields and metric dimensions appears. Scroll through the list, or begin typing to dynamically narrow the list. Click a field or dimension. In the screenshot below, we clicked the `_sourceCategory` metadata field. A dropdown list of values for the selected item appears.

    <img src={useBaseUrl('img/metrics/filter-values.png')} alt="Filter values" style={{border: '1px solid gray'}} width="800" />

1. Scroll through the list, or begin typing to dynamically narrow the list. Click the desired value. The **Filter** field now contains the key-value pair you selected. You can click a filter setting to edit it. You can preface a filter value with and exclamation point (!) to NOT the value.
1. As desired, repeat the previous steps to add additional filters to the query. 
1. When you are ready to run your query, click the run button: <img src={useBaseUrl('img/metrics/run-button.png')} alt="Run button" style={{border: '1px solid gray'}} width="50" />
1. The metrics returned by your query appear in the **Time Series Table**.

    <img src={useBaseUrl('img/metrics/results-in-table.png')} alt="Metrics search results in time series table" style={{border: '1px solid gray'}} width="800" />

1. At any time, you can click **Chart** to see a visualization of the metrics. The chart area now displays a visualization of the selected metric.

    <img src={useBaseUrl('img/metrics/query-visualization.png')} alt="Metrics search results in a chart" style={{border: '1px solid gray'}} width="800" />

1. If you want to apply an operator, click **Add Operator** to the right of the **Filters** field. A list of metric operators appears. Note that when you hover over an operator, a tool tip displays the [Advanced Mode](#switch-betweenbasic-and-advancedmode) syntax and a description of the operator.

    <img src={useBaseUrl('img/metrics/delta-hover.png')} alt="Add operator" style={{border: '1px solid gray'}} width="400" />

1. Choose an operator from the list. If you choose an operator that supports or requires arguments, you are prompted to supply them. Click the run button to run the updated query. The chart area updates to show your query results with the operator applied.

    <img src={useBaseUrl('img/metrics/results-with-operator.png')} alt="Results with operator" style={{border: '1px solid gray'}} width="800" />

1. Apply additional operators to the query, as desired. 

## Set Warning and Critical Thresholds

For some chart types, you can use the **Thresholds** tab in the **Display Settings** panel to define warning and critical thresholds. The **Thresholds** tab is available in the Chart view for a Time Series panel, and for these  chart types for Categorical panels: Line, Area, Bar, Column, and Table.

**To set threshold values**

1. After you enter your query, in the **Chart** view, click the **Thresholds** icon in the right-side pane of icons. <br/> <img src={useBaseUrl('img/metrics/thresholds-icon.png')} alt="Thresholds icon.png" style={{border: '1px solid gray'}} width="800"/>
2. Click the toggle in the **Thresholds** pane. <br/><img src={useBaseUrl('img/metrics/thresholds-toggle.png')} alt="thresholds-icon.png" width="350"/>
3. The **Thresholds** area updates to display default settings. <br/> <img src={useBaseUrl('img/metrics/thresholds-default.png')} alt="Thresholds default settings" style={{border: '1px solid gray'}} width="350"/>
4. Configure the appropriate comparator and threshold values, based on your data and requirements. You can choose from the following comparators.
    * **greater than**. Any value greater than the value you specify will violate the threshold.
    * **greater than or equal to**. Any value greater than or equal to the value you specify will violate the threshold.
    * **less than**. Any value less than the value you specify will violate this threshold.
    * **less than or equal**. Any value less than or equal to the value you specify will violate the threshold.
    * **includes.** Any value between the two values you specify will violate the threshold.
    * **excludes**. Every value NOT between the two values you specify will violate the threshold.
5. Threshold bands appear on the chart. The red band shows the Critical threshold, the yellow band is Warning. <br/>
  The chart type in the screenshot below is a line chart. For other chart types, the threshold visualization may vary. For example, in bar and column charts, the bars and columns are shaded yellow, red, and green  in accordance with the thresholds defined.<br/>
  The critical threshold has higher priority than the warning threshold. If the thresholds you define overlap, only the Critical shading (red) is applied to the overlapping area. fill-green.png
6. If you toggle the **Fill remaining area as green** option, the portion of the chart with no thresholds is shaded in green. <br/><img src={useBaseUrl('img/metrics/fill-green.png')} alt="Fill remaining area as green" style={{border: '1px solid gray'}} width="800" />
7. If you toggle the **Highlight Violations** option, the horizontal threshold shading is removed. Instead you’ll see vertical red and yellow highlighting in the timelices where those thresholds were violated. <br/> <img src={useBaseUrl('img/metrics/highlight-mode.png')} alt="Highlight violations" style={{border: '1px solid gray'}} width="800" />

## Add another metric query

You can specify up to six queries in the same Metrics tab.

To add an additional query:

1. Click **Add Query** to the right of the query builder area. <br/><img src={useBaseUrl('img/metrics/add-query.png')} alt="Add Query button" style={{border: '1px solid gray'}} width="400" />
1. A new row, labeled #B, is added to the query builder area.
1. Follow the steps in [Create a metric query](/docs/metrics/metrics-queries/metrics-explorer/#create-a-metric-query) to build another query, and click the run icon to run the query.
1. Your visualization is updated to chart the additional query. <br/><img src={useBaseUrl('img/metrics/two-queries.png')} alt="Two queries" style={{border: '1px solid gray'}} width="800" />

## Join metric queries

:::note
Metric query joins are only supported in Advanced Mode. The instructions below show how to switch to Advanced mode and enter a join query.
:::

You can perform basic math operations (+, -, \*, /) on two or more metrics queries, and use an additional query to apply an operation to the results of the other queries. For example, in the metric query tab below, the two queries return the incoming and outgoing network bytes.

<img src={useBaseUrl('img/metrics/pre-join.png')} alt="Before joining queries" style={{border: '1px solid gray'}} width="800" />

To join the queries, add a third query row, and then switch to advanced mode by choosing **Advanced Mode** from the three-dot kebab menu in that row.

<img src={useBaseUrl('img/metrics/advanced.png')} alt="Advanced" style={{border: '1px solid gray'}} width="100" />

In Advanced mode, enter:  

`#B-#A`

It returns the difference between the incoming rate and the outgoing rate. In the visualization, display of the first two queries is toggled off, so only the join results are shown.  

<img src={useBaseUrl('img/metrics/joined-query.png')} alt="After joining queries" style={{border: '1px solid gray'}} width="800" />

## Hide a query

You can hide a query so that it is not visualized in the chart.

1. Click the eye icon to the right of the query builder area in the row that contains the query you want to hide.
1. The visualization for the query is hidden. The query label for a hidden query is faded out.<br/><img src={useBaseUrl('img/metrics/eye-icon.png')} alt="Eye icon" style={{border: '1px solid gray'}} width="100" />
1. To make the query visible, click the eye icon again.

## Add a monitor to a metric query

1. Select **Add Monitor** from the more options menu.<br/><img src={useBaseUrl('img/metrics/add-monitor.png')} alt="Add monitor" style={{border: '1px solid gray'}} width="150" />
1. Follow the instructions to add a Monitor.

## Convert query mode

The Metrics Search opens in Basic Mode by default. You can convert
between Basic and Advanced anytime.

1. Select **Advanced Mode** from the more options menu.
1. Build your query in Advanced Mode.
1. To convert to Basic, select **Basic Mode** from the more options menu.
1. The query converts with each filter loaded for editing or removing as needed. You can also add more operators. If the query cannot be converted, a message displays.

## Duplicate a metric query

1. Select **Duplicate Query** from the more options menu. <br/><img src={useBaseUrl('img/metrics/duplicate-query.png')} alt="Duplicate query" style={{border: '1px solid gray'}} width="150" />
1. Your query will be copied to a new row in the query builder area.

## Tailoring charts

For information about tailoring charts, see modify a chart.

## Add a metric chart to a dashboard

To add a metric chart to a dashboard, click the **Add to Dashboard** button in the upper right corner of the Metric tab.


## Metrics Search FAQs

Below are some FAQs about the Metrics Search.

### What value does Metrics Search provide?

The Metrics Search gives you more visualization types and makes your metrics easier to  discover. Metrics Search provides the same visualizations available in Dashboards (New), from tables and category charts, to time series charts and honeycomb visualizations. The Metrics Search has richer and more comprehensive autocomplete support, providing suggestions for even very high cardinality queries. The structured query builder approach also makes the metrics experience friendlier to infrequent and inexperienced metrics users.

### Can I put logs and metrics on the same panel in the Metrics Search?

Yes you can. The experience is consistent with the Dashboards (New) experience and has the same features.

### How does autocomplete when searching metrics work?

Autocomplete in the Metrics Search works by taking what you type and looking for tokenized prefixes that match your input. We tokenize based on spaces, underscores, hyphens, and a variety of other special characters. For example, assume you have a metric `metric_this_is`. If you enter `is` in the **Metric** field, Sumo Logic will suggest `metric_this_is` because `is` is a token in the metric. Similarly, entering `met` will result in the same recommendation because `met` is a prefix for the token `metric`. However, if you enter `ric`, we won't suggest `metric_this_is` because `ric` isn’t a prefix of any of the tokens in token in that metric name. 
