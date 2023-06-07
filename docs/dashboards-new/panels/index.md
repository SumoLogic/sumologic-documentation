---
slug: /dashboards-new/panels
title: Dashboard (New) Panels
sidebar_label: Panels
description: Learn about the various Dashboard (New) panels and the types of data best suited for each.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


Panels are the building blocks used to create a dashboard. Each panel displays analytics for a specific query. The type of panel you choose to display your data depends on the type of query you want to run.

Related topics:

* [Modify a Chart](modify-chart.md)
* [Markdown Syntax](markdown-syntax.md)
* [Warning and Critical Thresholds](/docs/metrics/metrics-queries/metrics-explorer/#set-warning-and-critical-thresholds)

## Time Series Panel 

![time series panel.png](/img/dashboards-new/panels/time-series-panel.png)

Time series panels provide information on a series of data points ordered in time. Typically, a time series is a sequence taken at successive equally spaced points in time. Examples of time series are CPU and Memory over time.

In a time series, time is often the independent variable and the goal is usually to make a forecast for the future. Time series are frequently plotted with area or line charts. 

These are best used for looking at statistics taken over time. Things like CPU, Memory, and disk usage statistics fall into this category.

Time series panels accept aggregate fields with epoch values (milliseconds since 1970).

:::note
Log queries can use the [timeslice operator](/docs/search/search-query-language/search-operators/timeslice) to provide a time series.
:::

Available chart types:

* [Area](area-charts.md)
* [Bar](bar-charts.md)
* [Column](column-charts.md)
* [Line](line-charts.md)
* [Table](table-charts.md)
* [Box Plot](/docs/dashboards-new/panels/box-plot-charts)
* [Heatmap](/docs/metrics/metrics-queries/heat-map)

### What is the difference between a categorical and time series panel?
The **categorical** panel type contains charts that graph data across categories. This includes:

* Line Charts
* Area Charts
* Bar Charts over categories
* Column charts over categories
* Pie Charts
* Funnel Charts
* Tables over categories
* Bubble Charts
* Scatter Charts
* Sankey Diagram
* Box Plot Charts

The **time series** panel type is designed to graph data over time. Time series panels accept aggregate fields with epoch values (milliseconds since 1970). You can use the timeslice operator to provide a time series.

The types of charts you’ll find in the time series panel include:

* Area
* Bar
* Column
* Line
* Table
* Box Plot
* Heat Map

## Categorical Panel

![categorical icon.png](/img/dashboards-new/panels/categorical-icon.png)

Categorical panels provide information on the number of occurrences (frequency) of distinct values. Categorical frequencies are typically shown in pie, table, and column charts. 

These are best used to understand the distribution of data by categories. For example, understanding the number of CPUs used by machine type, or the number of requests handled by a pod.

Available chart types:

* [Area](area-charts.md)
* [Bar](bar-charts.md)
* [Bubble](bubble-charts.md)
* [Column](column-charts.md)
* [Pie](pie-charts.md)
* [Scatter](scatter-charts.md)
* [Table](table-charts.md)
* [Line](line-charts.md)
* [Box Plot](/docs/dashboards-new/panels/box-plot-charts)
* [Funnel Charts](/docs/metrics/metrics-queries/funnel-chart)
* [Sankey Diagram](/docs/dashboards-new/panels/sankey-charts)

The following image shows an example of Scatter and Bubble charts.  <br/> ![scatter and bubble charts.png](/img/dashboards-new/panels/scatter-and-bubble-charts.png)

## Single Value Panel

![single value panel.png](/img/dashboards-new/panels/single-value-panel.png)

Single Value Panels are great at providing high level overviews. They look great on executive dashboards and can provide at-a-glance information to help decide where to inspect and troubleshoot further.

Only [single value charts](single-value-charts.md) are supported.<br/>![single value charts.png](/img/dashboards-new/panels/single-value-charts.png)

## Map Panel

![map panel.png](/img/dashboards-new/panels/map-panel.png)

Maps identify where requests are coming from. These are ideal for [geolocation](/docs/search/search-query-language/search-operators/geo-lookup-map) data.

:::note
You may not see map panels render if hardware acceleration is disabled on your browser.
:::

Only [map charts](map-charts.md) are supported.<br/>![new map charts.png](/img/dashboards-new/panels/new-map-charts.png)

## Text Panel

![text panel.png](/img/dashboards-new/panels/text-panel.png)

Text can clarify what you are showing on dashboards or act as a note to your viewer. Text  panels provide the flexibility to display descriptive text in or above other panels.

Titles are displayed in the same size and font. Text is styled using Markdown syntax, meaning that you can control the size and weight of the text. Not all Markdown syntax options are supported; see [Markdown Syntax](markdown-syntax.md).

There is no limit to the number of Text Panels you can add to Dashboards. These types of Panels don't count against the quota in Sumo Logic Free accounts.

To add a Text Panel:

1. With the Dashboard open, click the **Add Panel** button.  <br/> ![add panel.png](/img/dashboards-new/panels/add-panel.png)
1. Choose **Text **as the Panel Type**.** 
1. The **Text Editor** and **Visual Settings** are displayed.  <br/> ![Display options.png](/img/dashboards-new/panels/Display-options.png)
    1. Input your **Text** or **Markdown** syntax in the **Text Editor** pane. See [Markdown Syntax](markdown-syntax.md) for details on what is supported.
    1. The **Visual Settings** options allow you to adjust the font, colors, and alignment of your data.
    1. A title is optional, you can toggle its visibility in the **Panel Details** covered in the next section.
1. Next, to set a Title, select the **General** menu icon to open the **Panel Details** pane.  <br/> ![Panel details general icon.png](/img/dashboards-new/panels/Panel-details-general-icon.png)
    A title is optional. Use the toggle switch labeled **Show Title** to set if the title is displayed. If desired, enter a title and set the font size.
1. The **Panel Preview** section displays your text panel based on your settings.  <br/>   ![Text Panel preview.png](/img/dashboards-new/panels/Text-Panel-preview.png)
1. When you are done, click **Add to Dashboard** at the top of the window.  <br/>   ![Add to Dashboard button.png](/img/dashboards-new/panels/Add-to-Dashboard-button.png)

### Add links to text panels

Text panels can provide links to URLs or other Dashboards with markdown syntax. To create a link to a URL, surround your linked text with square brackets `[]`, then add your URL in parenthesis `()`, as shown.

To add a link to a Panel in order to drill down to another Dashboard, see [Add Dashboard Link](/docs/dashboards/get-started/add-dashboard-link).

### Syntax

```
[<Text>](<URL>)
```

![link syntax example Jan 2021.png](/img/dashboards-new/panels/link-syntax-example-Jan-2021.png)

In the panel, the link is displayed. 


## Service Map Panel

![icon-service-map.png](/img/dashboards-new/panels/icon-service-map.png)

The [Services List and Map](/docs/apm/traces/services-list-map) views display high-level views of your application environment, giving you a greater insight into your application architecture and dependencies between monitored microservices.

The panel gives you a fully functioning map to zoom in and out and move through services. The size and color of application entities shows status and activity. Click on a service to open the Entity Inspector to drill down to traces, metrics, and the service dashboard.

You can filter the map according to application and service. See the [Dashboard (New)](/docs/dashboards-new/about) guide for additional information and options to create panels, configure filters, create and filter with template variables from dashboard headers, and more.<br/> ![panel-service.png](/img/dashboards-new/panels/panel-service.png)

To add a Service Map panel:

1. With the Dashboard open, click the **Add Panel** button and select **Service Map**. <br/> ![add-servicemap.png](/img/dashboards-new/panels/add-servicemap.png)  
1. A panel configuration page opens.  <br/> ![create-servicemap.png](/img/dashboards-new/panels/create-servicemap.png)
1. Select from the dropdown menus to filter the Service Map by the following:  <br/>   ![filter-servicemap.png](/img/apm/traces/filter-servicemap.png)
    * **Application** if your tracing data has the `application=[app-name]`, tag **Service** 
    * To pass the variables from dashboard filters, set `application={{application}}` and/or `service={{service}}`
1. Do not set the time. Service Map always shows last 72h of data.
1. The **Chart Type** is set to Graph.
1. Click the **General** tab to edit the Panel Details. Enter a name for the panel, set a **Title Font Size**, and add a short **Description**.  <br/> ![tracelist-details.png](/img/apm/traces/tracelist-details.png)
1. Click **Add to Dashboard**.



## Trace List Panel

![icon-trace-list.png](/img/dashboards-new/panels/icon-trace-list.png)

Transaction tracing captures and tracks distributed business workflows, by enriching and analyzing traces, logs, and metrics in real-time with automated generated application topology. Each trace provides details on root service, when it occurred and how long, the number of [spans](/docs/apm/traces/spans), and a breakdown of services. The panel panel displays the [Traces page](/docs/apm/traces/) table to give at-a-glance tracking for traces through your Dashboard. To view transaction and service details ([Trace View](/docs/apm/traces/view-and-investigate-traces)), click a trace from the panel. 

See the [Dashboard (New)](/docs/dashboards-new/about) guide for additional information and options to create panels, configure filters, create and filter with template variables from dashboard headers and more.

:::note
You are limited to three Trace List panels in a dashboard.
:::

![panel-trace.png](/img/dashboards-new/panels/panel-trace.png)

To add a Trace List panel:

1. With the Dashboard open, click the **Add Panel** button. <br/> ![add-tracelist.png](/img/apm/traces/add-tracelist.png)  
1. A panel configuration page opens. <br/> ![create-tracelist.png](/img/dashboards-new/panels/create-tracelist.png)
1. Configure a [Trace query](/docs/apm/traces/view-and-investigate-traces) to search for desired set of traces. 
1. Select a time range or [create a custom range](/docs/dashboards-new/set-custom-time-ranges) for the panel. You can set this when creating or at any time when viewing the Dashboard panel.<br/> ![timerange.png](/img/dashboards-new/panels/timerange.png)
1. Select **Chart Type** as either:
   1. **Table**. showing table with traces.
   1. **Breakdown chart**. showing aggregated Trace Duration Breakdown Chart.  
   If you choose **Table**, complete the following steps:
1. Enter the **Rows Per Page** for the panel, between 5 to 100. The default amount is 15. The panel automatically paginates traces to browse through and view all traces.
1. Select the Table columns of trace data to load in the panel:

 | Column Name | Example Value | Description |
 | :-- | :-- | :-- |
 | Trace ID | ffaf2f69ee8ad0c1 | The unique identifier of the trace. |
 | Root Service | api | The service that started the trace. |
 | Started At | 07/27/2020 09:01:04.533 | When the trace started. |
 | Duration | 12.582 ms | The amount of time the trace spans.  |
 | Number of spans | 35 | A trace consists of spans. This number tells you how many spans are in the trace. |
 | Duration Breakdown | ![breakdown](/img/apm/traces/breakdown.png) | Each color indicates a service. The colors assigned to services are always the same on your account. You can change the color in the span summary tab after clicking on the individual span in trace view.<br/>Hover over to view a percentage breakdown of how long each span covers in the trace.<br/>![span hover](/img/apm/traces/span-hover-view.png) |
 | Number of errors | 0 | The number of errors in the trace. |
 | Status | 200 | The HTTP status code of the trace. |

1. Click the **General** tab to edit the Panel Details. Enter a name for the panel, set a **Title Font Size**, and add a short **Description**. <br/> ![tracelist details](/img/apm/traces/tracelist-details.png)
1. Click **Add to Dashboard**. 


## Delete a Panel

You can delete a panel that you no longer need.

1. Go to the Dashboard (New) in Sumo Logic that has the panel you want to delete.
1. Hover the cursor over the **Details** icon to display the pop-up menu. <br/> ![details option.png](/img/dashboards-new/panels/delete-panel/details-option.png)
1. Select **Delete**. <br/> ![delete a panel.png](/img/dashboards-new/panels/delete-panel/delete-a-panel.png)
