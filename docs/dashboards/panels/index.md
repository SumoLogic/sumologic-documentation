---
slug: /dashboards/panels
title: Dashboard Panels
sidebar_label: Panels
description: Learn about the various Dashboard panels and the types of data best suited for each.
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Panels are the building blocks used to create a dashboard. Each panel displays analytics for a specific query. The type of panel you choose to display your data depends on the type of query you want to run.

Related topics:

* [Modify a Chart](modify-chart.md)
* [Markdown Syntax](markdown-syntax.md)
* [Warning and Critical Thresholds](/docs/metrics/metrics-queries/metrics-explorer/#set-warning-and-critical-thresholds)

## Time Series Panel 

<img src={useBaseUrl('/img/dashboards/panels/time-series-panel.png')} style={{border: '1px solid gray'}} alt="time series panel" width="75"/>

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
* [Box Plot](/docs/dashboards/panels/box-plot-charts)
* [Heat Map](/docs/metrics/metrics-queries/heat-map)

When you move the cursor over the Line, Column, Bar, Area, and Box Plot time series panels, you can see a crosshair line across the panel which displays the time-series data. If other time series panels are also configured with overlapping time range, then when you hover over one time panel, crosshair timestamp will be displayed on the other panels as well. A tooltip is used to display the time-series data along with the crosshair, which also displays information about the combination chart.

:::note
Crosshair timestamps are not available for Heatmap, Table, Categorical, and Honeycomb charts.
:::

<img src={useBaseUrl('/img/dashboards/panels/crosshair_1.png')} style={{border: '1px solid gray'}} alt="crosshair" width="500" /><br/><img src={useBaseUrl('/img/dashboards/panels/crosshair_2.png')} style={{border: '1px solid gray'}} alt="crosshair" width="500" />

As a dashboard user, you are allowed to modify the time range for the selected panel or for the entire panels in the dashboard. To know more, refer to [Set Custom Time Ranges](/docs/dashboards/set-custom-time-ranges/#modify-time-ranges).

### What is the difference between a categorical and time series panel?

The **categorical** panel type contains charts that graph data across categories. This includes:

* Line Charts
* Area Charts
* Bar Charts over categories
* Column Charts over categories
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

<img src={useBaseUrl('/img/dashboards/panels/categorical-icon.png')} style={{border: '1px solid gray'}} alt="categorical icon" width="75"/>

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
* [Box Plot](/docs/dashboards/panels/box-plot-charts)
* [Funnel Charts](/docs/metrics/metrics-queries/funnel-chart)
* [Sankey Diagram](/docs/dashboards/panels/sankey-charts)

The following image shows an example of Scatter and Bubble charts.<br/><img src={useBaseUrl('/img/dashboards/panels/scatter-and-bubble-charts.png')} style={{border: '1px solid gray'}} alt="scatter and bubble charts" width="800"/>

## Single Value Panel

<img src={useBaseUrl('/img/dashboards/panels/single-value-panel.png')} style={{border: '1px solid gray'}} alt="single value panel" width="75"/>

Single Value Panels are great at providing high level overviews. They look great on executive dashboards and can provide at-a-glance information to help decide where to inspect and troubleshoot further.

Only [single value charts](single-value-charts.md) are supported.<br/><img src={useBaseUrl('/img/dashboards/panels/single-value-charts.png')} style={{border: '1px solid gray'}} alt="single value charts" width="800"/>

## Map Panel

<img src={useBaseUrl('/img/dashboards/panels/map-panel.png')} style={{border: '1px solid gray'}} alt="map panel" width="75"/>

Maps identify where requests are coming from. These are ideal for [geolocation](/docs/search/search-query-language/search-operators/geo-lookup-map) data.

:::note
You may not see map panels render if hardware acceleration is disabled on your browser.
:::

Only [map charts](map-charts.md) are supported.<br/><img src={useBaseUrl('/img/dashboards/panels/new-map-charts.png')} style={{border: '1px solid gray'}} alt="new map charts" width="800"/>

## Text Panel

<img src={useBaseUrl('/img/dashboards/panels/text-panel.png')} style={{border: '1px solid gray'}} alt="text panel" width="75"/>

Text can clarify what you are showing on dashboards or act as a note to your viewer. Text  panels provide the flexibility to display descriptive text in or above other panels.

Titles are displayed in the same size and font. Text is styled using Markdown syntax, meaning that you can control the size and weight of the text. Not all Markdown syntax options are supported; see [Markdown Syntax](markdown-syntax.md).

There is no limit to the number of Text Panels you can add to Dashboards.

To add a Text Panel:

1. With the Dashboard open, click the **Add Panel** button.<br/><img src={useBaseUrl('/img/dashboards/panels/add-panel.png')} style={{border: '1px solid gray'}} alt="add panel" width="800"/>
1. Choose **Text **as the Panel Type**.** 
1. The **Text Editor** and **Visual Settings** are displayed.<br/><img src={useBaseUrl('/img/dashboards/panels/Display-options.png')} style={{border: '1px solid gray'}} alt="Display options" width="800"/>
    1. Input your **Text** or **Markdown** syntax in the **Text Editor** pane. See [Markdown Syntax](markdown-syntax.md) for details on what is supported.
    1. The **Visual Settings** options allow you to adjust the font, colors, and alignment of your data.
    1. A title is optional, you can toggle its visibility in the **Panel Details** covered in the next section.
1. Next, to set a Title, select the **General** menu icon to open the **Panel Details** pane.<br/><img src={useBaseUrl('/img/dashboards/panels/Panel-details-general-icon.png')} style={{border: '1px solid gray'}} alt="Panel details general icon" width="800"/>
    A title is optional. Use the toggle switch labeled **Show Title** to set if the title is displayed. If desired, enter a title and set the font size.
1. The **Panel Preview** section displays your text panel based on your settings.<br/><img src={useBaseUrl('/img/dashboards/panels/Text-Panel-preview.png')} style={{border: '1px solid gray'}} alt="Text Panel preview" width="800"/>
1. When you are done, click **Add to Dashboard** at the top of the window.<br/><img src={useBaseUrl('/img/dashboards/panels/Add-to-Dashboard-button.png')} style={{border: '1px solid gray'}} alt="Add to Dashboard button" width="800"/>

### Add links to text panels

Text panels can provide links to URLs or other Dashboards with markdown syntax. To create a link to a URL, surround your linked text with square brackets `[]`, then add your URL in parenthesis `()`, as shown.

To add a link to a Panel in order to drill down to another Dashboard, see [Add Dashboard Link](/docs/dashboards/panels/#add-links-to-text-panels).

### Syntax

```
[<Text>](<URL>)
```

<img src={useBaseUrl('/img/dashboards/panels/link-syntax-example-Jan-2021.png')} style={{border: '1px solid gray'}} alt="link syntax example Jan 2021" width="600"/>

The link is displayed is in the panel.

## Service Map Panel

<img src={useBaseUrl('/img/dashboards/panels/icon-service-map.png')} style={{border: '1px solid gray'}} alt="icon-service-map" width="75"/>

The [Services List and Map](/docs/apm/services-list-map) views display high-level views of your application environment, giving you a greater insight into your application architecture and dependencies between monitored microservices.

The panel gives you a fully functioning map to zoom in and out and move through services. The size and color of application entities shows status and activity. Click on a service to open the Entity Inspector to drill down to traces, metrics, and the service dashboard.

You can filter the map according to application and service. See the [Dashboard](/docs/dashboards/about) guide for additional information and options to create panels, configure filters, create and filter with template variables from dashboard headers, and more.<br/><img src={useBaseUrl('/img/dashboards/panels/panel-service.png')} style={{border: '1px solid gray'}} alt="panel-service" width="800"/>

To add a Service Map panel:

1. With the Dashboard open, click the **Add Panel** button and select **Service Map**.<br/><img src={useBaseUrl('/img/dashboards/panels/add-servicemap.png')} style={{border: '1px solid gray'}} alt="add-servicemap" width="400"/>
1. A panel configuration page opens.<br/><img src={useBaseUrl('/img/dashboards/panels/create-servicemap.png')} style={{border: '1px solid gray'}} alt="create-servicemap" width="800"/>
1. Select from the dropdown menus to filter the Service Map by the following:<br/><img src={useBaseUrl('/img/apm/traces/filter-servicemap.png')} style={{border: '1px solid gray'}} alt="filter-servicemap" width="800"/>
    * **Application** if your tracing data has the `application=[app-name]`, tag **Service**.
    * To pass the variables from dashboard filters, set `application={{application}}` and/or `service={{service}}`.
1. Do not set the time. Service Map always shows last 72h of data.
1. The **Chart Type** is set to Graph.
1. Click the **General** tab to edit the Panel Details. Enter a name for the panel, set a **Title Font Size**, and add a short **Description**.<br/><img src={useBaseUrl('/img/apm/traces/tracelist-details.png')} style={{border: '1px solid gray'}} alt="tracelist-details" width="400"/>
1. Click **Add to Dashboard**.

## Trace List Panel

<img src={useBaseUrl('/img/dashboards/panels/icon-trace-list.png')} style={{border: '1px solid gray'}} alt="icon-trace-list" width="75"/>

Transaction tracing captures and tracks distributed business workflows, by enriching and analyzing traces, logs, and metrics in real-time with automated generated application topology. Each trace provides details on root service, when it occurred and how long, the number of [spans](/docs/apm/spans), and a breakdown of services. The panel panel displays the [Traces page](/docs/apm/traces/) table to give at-a-glance tracking for traces through your Dashboard. To view transaction and service details ([Trace View](/docs/apm/traces/view-and-investigate-traces)), click a trace from the panel. 

See the [Dashboard](/docs/dashboards/about) guide for additional information and options to create panels, configure filters, create and filter with template variables from dashboard headers and more.

:::note
You are limited to three Trace List panels in a dashboard.
:::

<img src={useBaseUrl('/img/dashboards/panels/panel-trace.png')} style={{border: '1px solid gray'}} alt="panel-trace" width="600"/>

To add a Trace List panel:

1. With the Dashboard open, click the **Add Panel** button. <br/><img src={useBaseUrl('/img/apm/traces/add-tracelist.png')} style={{border: '1px solid gray'}} alt="add-tracelist" width="400"/>
1. A panel configuration page opens. <br/><img src={useBaseUrl('/img/dashboards/panels/create-tracelist.png')} style={{border: '1px solid gray'}} alt="create-tracelist" width="800"/>
1. Configure a [Trace query](/docs/apm/traces/view-and-investigate-traces) to search for desired set of traces. 
1. Select a time range or [create a custom range](/docs/dashboards/set-custom-time-ranges) for the panel. You can set this when creating or at any time when viewing the Dashboard panel.<br/><img src={useBaseUrl('/img/dashboards/panels/timerange.png')} style={{border: '1px solid gray'}} alt="timerange" width="300"/>
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
    | Duration Breakdown | <img src={useBaseUrl('/img/apm/traces/breakdown.png')} style={{border: '1px solid gray'}} alt="breakdown" width="800"/> | Each color indicates a service. The colors assigned to services are always the same on your account. You can change the color in the span summary tab after clicking on the individual span in trace view.<br/>Hover over to view a percentage breakdown of how long each span covers in the trace.<br/><img src={useBaseUrl('/img/apm/traces/span-hover-view.png')} style={{border: '1px solid gray'}} alt="span hover" width="800"/> |
    | Number of errors | 0 | The number of errors in the trace. |
    | Status | 200 | The HTTP status code of the trace. |
1. Click the **General** tab to edit the Panel Details. Enter a name for the panel, set a **Title Font Size**, and add a short **Description**.<br/><img src={useBaseUrl('/img/apm/traces/tracelist-details.png')} style={{border: '1px solid gray'}} alt="tracelist details" width="400"/>
1. Click **Add to Dashboard**. 

## Delete a Panel

You can delete a panel that you no longer need.

1. Go to the Dashboard in Sumo Logic that has the panel you want to delete.
1. Hover the cursor over the **Details** icon to display the pop-up menu. <br/><img src={useBaseUrl('/img/dashboards/panels/delete-panel/details-option.png')} style={{border: '1px solid gray'}} alt="details option" width="800"/>
1. Select **Delete**. <br/><img src={useBaseUrl('/img/dashboards/panels/delete-panel/delete-a-panel.png')} style={{border: '1px solid gray'}} alt="delete a panel" width="800"/>
