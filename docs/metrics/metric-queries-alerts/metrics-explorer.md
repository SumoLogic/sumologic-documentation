---
id: metrics-explorer
---

# Metrics Explorer

This page describes the Metrics Explorer UI and how to use it.

:::tip
If you prefer to use the Classic metrics UI, see [Switch to the Classic metrics UI](metrics-explorer.md).
:::

## About the UI

The Metrics Explorer appears when you open a new metrics tab. The page
has two modes:

* **Basic**. Basic Mode provides a query builder UI: you can construct metric queries by selecting metadata fields, dimensions, metrics, and operators from pull-down lists. This makes it easier to create your search scope and to apply operators to the metrics that are returned. You’ll still want to understand the functionality of [metric operators](/docs/metrics/metric-queries-alerts/metrics-operators), but the Metrics Explorer helps you by prompting you with a list of available operators, and after you choose an operator, the options or qualifiers that the operator supports. For more information about the Basic UI, see [About Basic Mode UI](metrics-explorer.md).
* **Advanced**. In Advanced Mode, you can enter free-form metric queries. You can enter your entire query manually, but Advanced Mode will also prompt you with pull-down lists of metadata fields, dimensions, metrics, and operators. For more information, see [About the Advanced Mode UI](metrics-explorer.md).

If your query supports basic mode, you can freely move between basic and advanced mode to build and run your query.

## Switch between Basic and Advanced Mode

When you open a new Metrics tab, it is displayed in Basic Mode. You can switch to Advanced Mode by clicking the three-dot icon, and selecting **Advanced Mode**. When you are in Advanced Mode, you can switch back to Basic Mode from the same options menu.

If you use the Advanced Mode to build complex metrics, you can convert it to Basic Mode by selecting the option. If the query cannot support basic mode, you receive a message informing you "Your query cannot be switched to Basic Mode."

Example of queries that *will not* convert:

* `metric=CPU_Sys _sourcecategory=autocomplete | bottomk (5, avg + 3 * stddev)` This query is not supported because `bottomk` in basic mode only supports simple aggregators such as `avg` or `count`. It does not support arbitrary formulas.
* `(metric=CPU_Sys OR metric=CPU_Idle) _sourcecategory=autocomplete` This query is not supported because basic mode does not support logical `OR` for the selector part of the query.

When converted, the filters convert allowing you to select and modify, make different selections, remove filters, and add operators as you would normally in Basic Mode.

![switch-modes.png](/img/metrics/metric-explorer-switch-modes.png)

## Switch to the Classic metrics UI

If you prefer to use the Classic metrics UI, you can switch to it, and switch back the Metrics Explorer interface at any point. To switch to Classic metrics, click the three-dot icon near the upper right corner of the page and click **Switch to Classic Metrics**. 

Not all of the features available in the Metrics Explorer are found in the Classic UI.

You'll be asked to confirm your choice. Click **Switch to Classic UI** to proceed. After you switch to the Classic UI, you can return to the Metrics Explorer UI by clicking the three-dot icon again, and selecting **Switch to New Metrics**. While you are in the Classic UI, new metric tabs you open will display the Classic UI.

![switch-to-classic.png](/img/metrics/confirm-switch-to-classic.png)

### About Basic Mode UI

This section is a brief introduction to the Basic Mode of the Metrics Explorer. This screenshot shows the UI with a query already built.

![ui.png](/img/metrics/metric-explorer-ui.png)

The key components of the UI are:

| Element | Description |
|--|--|
| A | In the **Metric** area, you select the metric you want to return. When you click in this area, you’re presented with a list of metrics. In our example query, we selected the `CPU_LoadAvg_15min` metric. As you enter changes to your query, a message displays indicating if you need to execute the query to see updated results. |
| B | In the **Filters** area, you can narrow down the scope of your query, using metadata and metric dimensions. When you click in this area, you’re presented with a drop down list of the metadata fields and dimensions associated with the metric you selected. When you select a metadata field or dimension, you’re presented with a list of values for the selected field or dimension. In our example query, we selected one metadata field, `_sourceCategory=bloomfilter`. The more metadata fields and dimensions you select, the narrower your query will be. After you've selected a filter and filter value, you can click the chip for the filter setting to edit it. |
| C | In this area, you can apply one or more metric operators to metric query results. When you click **Add Operator**, you’re presented with a list of metric operators. In our example query, we selected the `topk` operator.     |
| D | By default, the left pane below the query builder section presents a Preview Table of the time series returned by your query. You can click **Chart** to view a visualization instead. When you switch to the chart view, by default, a time series plot is presented. You can select a different visualization method, although not all visualizations make sense for every query.  |
| E | In the **Panel Type** area, you can select a different chart type: Categorical, Single Value, Map, and Honeycomb. The **Visual Settings** options allow you to customize your chart.  |
| F | The icons on the right of the **Panel Type** area allow you to add a query, hide a query, clear a query, enter advanced mode, and duplicate a query. |
| G | The icons in this area allow you to add another query row, hide a query, and open the more options menu.
| H | The icons in this area allow you to save and share metric queries. |
| I | The magnifying glass icon is the run button you click to run a metric query. You can also run a query by pressing Enter on your keyboard, or pressing Alt-Enter, depending on how your **Query Editing** Preference is set.  |

### About Advanced Mode UI

In Advanced Mode, you can enter a free-form metric query. You'll also be prompted with selectors for choosing metrics, metadata, and operators.

![advanced-mode-2.png](/img/metrics/advanced-mode-2.png)

### Keyboard shortcuts

You can use keyboard shortcuts in the Metrics Explorer to navigate quickly among multiple metric queries, hide or show queries, switch to advanced mode, and so on. Use **Shift ?** display a list of keyboard shortcuts. 

The listed shortcuts display for your Operating System. The following list displays for MacOS.

![keyboard-shortcuts.png](/img/metrics/keyboard-shortcuts.png)

### What's in the Preview Table?

The screenshot below shows a portion of the **Preview Table** for a metric query. (There are too many columns to show in a screenshot.)

:::tip
You can drag the columns in the table to rearrange them, and double-click a column to expand it.
:::

![preview-table.png](/img/metrics/preview-table.png)

The **Preview Table** contains a row for each time series returned by a query. A row contains the following information:

* Row label. Indicates which query returned the time series, for example `#A` or `#B`.
* Metric name. The name of the metric returned, for example `CPU_LoadAvg_15min`.
* An array of metadata fields and metric dimensions associated with the time series, in key=value format. 

  * The metadata fields that appear includes standard Sumo Logic metadata fields, such as `_sourceCategory`, `_collectorId`, `_sourceHost`, `_sourceName`, and so on.
  * The dimensions that appear are whatever dimensions were attached to the incoming metrics, or added to the metrics in Sumo Logic using the [Metric Rules Editor](/docs/metrics/metric-rules-editor). The query in the screenshot above returns metrics that were collected by a host metric source running on an Installed Collector on an AWS EC2 instance. Such metrics are automatically tagged with the following EC2 tags: 
  
    * InstanceID 
    * Instance type
    * Availability Zone
    * Region
    * AccountID 

* Metric value stats. The rightmost columns of the table present the current value of the metric, and minimum, maximum, average, current, and sum of the metric value over the query time range.

## Create a metric query

1. In the Sumo Logic UI, click **+ New** and choose **Metrics** from the drop-down list.
1. The Metrics Explorer opens. Click the **Metric** field. A list of metrics appears. You can scroll through the list, or begin typing to dynamically narrow the list. Click the desired metric.

    ![click-in-metric-area.png](/img/metrics/click-in-metrici-area.png)

1. Click the **Filters** field. A list of metadata fields and metric dimensions appears. Scroll through the list, or begin typing to dynamically narrow the list. Click a field or dimension. In the screenshot below, we clicked the `_sourcecategory` metadata field. A drop down list of values for the selected item appears.

    ![filter-values.png](/img/metrics/filter-values.png)

1. Scroll through the list, or begin typing to dynamically narrow the list. Click the desired value. The **Filter** field now contains the key-value pair you selected. You can click a filter setting to edit it. You can preface a filter value with and exclamation point (!) to NOT the value.
1. As desired, repeat the previous steps to add additional filters to the query. 
1. When you are ready to run your query, click the run button: ![run-button.png](/img/metrics/run-button.png)
1. The metrics returned by your query appear in the **Preview Table**.

    ![results-in-table.png](/img/metrics/results-in-table.png)

1. At any time, you can click **Chart** to see a visualization of the metrics. The chart area now displays a visualization of the selected metric.

    ![query-visualization.png](/img/metrics/query-visualization.png)

1. If you want to apply an operator, click **Add Operator** to the right of the **Filters** field. A list of metric operators appears. Note that when you hover over an operator, a tool tip displays the [Advanced Mode](metrics-explorer.md) syntax and a description of the operator.

    ![delta-hover.png](/img/metrics/delta-hover.png)

1. Choose an operator from the list. If you choose an operator that supports or requires arguments, you are prompted to supply them. Click the run button to run the updated query. The chart area updates to show your query results with the operator applied.

    ![results.png](/img/metrics/results-with-operator.png)

1. Apply additional operators to the query, as desired. 

## Add another metric query

You can specify up to six queries in the same Metrics tab.

To add an additional query:

1. Click **Add Query** to the right of the query builder area.

    ![add-query.png](/img/metrics/add-query.png)

1. A new row, labeled #B, is added to the query builder area.
1. Follow the steps in [Create a metric query](metrics-explorer.md) to build another query, and click the run icon to run the query.
1. Your visualization is updated to chart the additional query.

    ![two-queries.png](/img/metrics/two-queries.png)

## Join metric queries

:::note
Metric query joins are only supported in Advanced Mode. The instructions below show how to switch to Advanced mode and enter a join query.
:::

You can perform basic math operations (+, -, \*, /) on two or more metrics queries, and use an additional query to apply an operation to the results of the other queries. For example, in the metric query tab below, the two queries return the incoming and outgoing network bytes.

![pre-join.png](/img/metrics/pre-join.png)

To join the queries, add a third query row, and then switch to Advanced mode, by choosing **Advanced Mode** from the three-dot menu in that row.

![advanced.png](/img/metrics/advanced.png)

In Advanced mode, enter:  
  
`#B-#A`

It returns the difference between the incoming rate and the outgoing rate. In the visualization, display of the first two queries is toggled off, so only the join results are shown.  
  
![joined-query.png](/img/metrics/joined-query.png)

## Hide a query

You can hide a query so that it is not visualized in the chart.

1. Click the eye icon to the right of the query builder area in the row that contains the query you want to hide.
1. The visualization for the query is hidden. The query label for a hidden query is faded out.

    ![eye-icon.png](/img/metrics/eye-icon.png)

1. To make the query visible, click the eye icon again.

## Add a monitor to a metric query

1. Select **Add Monitor** from the more options menu.

    ![add-monitor.png](/img/metrics/add-monitor.png)

1. Follow the instructions to add a Monitor.

## Convert query modes

The Metrics Explorer opens in Basic Mode by default. You can convert
between Basic and Advanced anytime.

1. Select **Advanced Mode** from the more options menu.
1. Build your query in Advanced Mode.
1. To convert to Basic, select **Basic Mode** from the more options menu.
1. The query converts with each filter loaded for editing or removing as needed. You can also add more operators. If the query cannot be converted, a message displays.

![advanced-basic.gif](/img/metrics/advanced-basic.gif)

## Duplicate a metric query

1. Select **Duplicate Query** from the more options menu.

![duplicate-query.png](/img/metrics/duplicate-query.png)

1. Your query will be copied to a new row in the query builder area.

## Tailoring charts

For information about tailoring charts, see modify a chart.

## Add a metric chart to a dashboard

To add a metric chart to a dashboard, click the **Add to Dashboard** button in the upper right corner of the Metric tab.