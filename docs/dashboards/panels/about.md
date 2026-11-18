---
id: about
title: About Dashboard Panels
description: Learn about the various dashboard panels and the types of data best suited for each.
---

import useBaseUrl from '@docusaurus/useBaseUrl';


## Time Series panel

<img src={useBaseUrl('/img/dashboards/panels/time-series-panel.png')} style={{border: '1px solid gray'}} alt="time series panel" width="75"/>

Time series panels provide information on a series of data points ordered in time. Typically, a time series is a sequence taken at successive equally spaced points in time. Examples of time series are CPU and memory usage over time.

In a time series, time is often the independent variable and the goal is usually to make a forecast for the future. Time series are frequently plotted with area or line charts.

Time series panels are best for looking at statistics collected over time, such as CPU, memory, and disk usage.

Time series panels accept aggregate fields with epoch values (milliseconds since 1970).

:::note
Log queries can use the [`timeslice` operator](/docs/search/search-query-language/search-operators/timeslice) to provide a time series.
:::

Available chart types:

* [Area](area-charts.md)
* [Bar](bar-charts.md)
* [Column](column-charts.md)
* [Line](line-charts.md)
* [Table](table-charts.md)
* [Box Plot](/docs/dashboards/panels/box-plot-charts)
* [Heat Map](/docs/metrics/metrics-queries/heat-map)

When you move the cursor over the Line, Column, Bar, Area, and Box Plot time series panels, you can see a crosshair line across the panel which displays the time-series data. If other time series panels are configured with an overlapping time range, the crosshair timestamp also appears on those panels when you hover over one of them. A tooltip displays the time series data along with the crosshair. For combo charts, the tooltip also shows information about the combined chart types.

:::note
Crosshair timestamps are not available for Heatmap, Table, Categorical, and Honeycomb charts.
:::

<img src={useBaseUrl('/img/dashboards/panels/crosshair_1.png')} style={{border: '1px solid gray'}} alt="crosshair" width="500" /><br/><img src={useBaseUrl('/img/dashboards/panels/crosshair_2.png')} style={{border: '1px solid gray'}} alt="crosshair" width="500" />

As a dashboard user, you can modify the time range for the selected panel or for all panels in the dashboard. For more information, see [Set Custom Time Ranges](/docs/dashboards/set-custom-time-ranges/#modify-time-ranges).

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

The **time series** panel type is designed to graph data over time. Time series panels accept aggregate fields with epoch values (milliseconds since 1970). You can use the `timeslice` operator to provide a time series.

The time series panel includes the following chart types:

* Area
* Bar
* Column
* Line
* Table
* Box Plot
* Heat Map

## Categorical panel

<img src={useBaseUrl('/img/dashboards/panels/categorical-icon.png')} style={{border: '1px solid gray'}} alt="categorical icon" width="75"/>

Categorical panels show how often (the frequency) distinct values occur. Categorical frequencies are typically shown in pie, table, and column charts.

Categorical panels are best for understanding the distribution of data by category. For example, you can see the number of CPUs used by machine type or the number of requests handled by a pod.

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

## Single Value panel

<img src={useBaseUrl('/img/dashboards/panels/single-value-panel.png')} style={{border: '1px solid gray'}} alt="single value panel" width="75"/>

Single value panels provide high-level overviews. They work well on executive dashboards and give you at-a-glance information to help you decide where to investigate and troubleshoot further.

Only [single value charts](single-value-charts.md) are supported.<br/><img src={useBaseUrl('/img/dashboards/panels/single-value-charts.png')} style={{border: '1px solid gray'}} alt="single value charts" width="800"/>

## Map panel

<img src={useBaseUrl('/img/dashboards/panels/map-panel.png')} style={{border: '1px solid gray'}} alt="map panel" width="75"/>

Maps identify where requests come from. Map panels are ideal for [geolocation](/docs/search/search-query-language/search-operators/geo-lookup-map) data.

:::note
Map panels may not render if hardware acceleration is disabled in your browser.
:::

Only [map charts](map-charts.md) are supported.<br/><img src={useBaseUrl('/img/dashboards/panels/new-map-charts.png')} style={{border: '1px solid gray'}} alt="new map charts" width="800"/>

## Text panel

<img src={useBaseUrl('/img/dashboards/panels/text-panel.png')} style={{border: '1px solid gray'}} alt="text panel" width="75"/>

Text can clarify what you are showing on dashboards or act as a note to your viewer. Text panels let you display descriptive text above or alongside other panels.

Titles use the same size and font. You style text with Markdown syntax, which lets you control the size and weight of the text. Not all Markdown syntax options are supported; see [Markdown Syntax](markdown-syntax.md).

There is no limit to the number of text panels you can add to a dashboard. Text panels do not count against the panel quota in Sumo Logic Free accounts.

To add a text panel:

1. With the dashboard open, click the **Add Panel** button.<br/><img src={useBaseUrl('/img/dashboards/panels/add-panel.png')} style={{border: '1px solid gray'}} alt="add panel" width="800"/>
1. Choose **Text** as the **Panel Type**.
1. The **Text Editor** and **Visual Settings** appear.<br/><img src={useBaseUrl('/img/dashboards/panels/Display-options.png')} style={{border: '1px solid gray'}} alt="Display options" width="800"/>
    1. Enter your text or Markdown syntax in the **Text Editor** pane. See [Markdown Syntax](markdown-syntax.md) for details on what is supported.
    1. The **Visual Settings** options allow you to adjust the font, colors, and alignment of your text.
    1. A title is optional. You can show or hide it in the **Panel Details** pane described in the next step.
1. To set a title, click the **General** menu icon to open the **Panel Details** pane.<br/><img src={useBaseUrl('/img/dashboards/panels/Panel-details-general-icon.png')} style={{border: '1px solid gray'}} alt="Panel details general icon" width="800"/>
    A title is optional. Use the toggle switch labeled **Show Title** to show or hide the title. If desired, enter a title and set the font size.
1. The **Panel Preview** section displays your text panel based on your settings.<br/><img src={useBaseUrl('/img/dashboards/panels/Text-Panel-preview.png')} style={{border: '1px solid gray'}} alt="Text Panel preview" width="800"/>
1. When you are done, click **Add to Dashboard** at the top of the window.<br/><img src={useBaseUrl('/img/dashboards/panels/Add-to-Dashboard-button.png')} style={{border: '1px solid gray'}} alt="Add to Dashboard button" width="800"/>

### Add links to text panels

You can add links to URLs or other dashboards in text panels using Markdown syntax. To create a link to a URL, surround the link text with square brackets `[]`, then add the URL in parentheses `()`, as shown.

To add a link to a panel to drill down to another dashboard, see [Add Dashboard Link](/docs/dashboards/panels/about#add-links-to-text-panels).

### Syntax

```
[link text](url)
```

<img src={useBaseUrl('/img/dashboards/panels/link-syntax-example-Jan-2021.png')} style={{border: '1px solid gray'}} alt="link syntax example Jan 2021" width="600"/>

The link is displayed in the panel.

## Services panel

<img src={useBaseUrl('/img/dashboards/panels/icon-service-map.png')} style={{border: '1px solid gray'}} alt="Icon service map" width="75"/>

The [Services List and Map](/docs/apm/services-list-map) views show a high-level picture of your application environment, giving you greater insight into your application architecture and dependencies between monitored microservices.

The panel gives you a fully functioning map that you can zoom in and out of and move through to explore services. The size and color of application entities show status and activity. Click a service to open the Entity Inspector to drill down to traces, metrics, and the service dashboard.

You can filter the map according to application and service. See the [Dashboards](/docs/dashboards/about) guide for more information about creating panels, configuring filters, using template variables from dashboard headers, and more.<br/><img src={useBaseUrl('/img/dashboards/panels/panel-service.png')} style={{border: '1px solid gray'}} alt="Panel service" width="800"/>

To add a Services panel:

1. With the dashboard open, click the **Add Panel** button and select **Services**.<br/><img src={useBaseUrl('/img/dashboards/panels/add-servicemap.png')} style={{border: '1px solid gray'}} alt="add-servicemap" width="800"/>
1. A panel configuration page opens.<br/><img src={useBaseUrl('/img/dashboards/panels/create-servicemap.png')} style={{border: '1px solid gray'}} alt="create-servicemap" width="800"/>
1. Select from the dropdown menus to filter the Service Map by the following:<br/><img src={useBaseUrl('/img/apm/filter-servicemap.png')} style={{border: '1px solid gray'}} alt="filter-servicemap" width="800"/>
    * **Application** if your tracing data has the `application=[app-name]`, tag **Service**.
    * To pass the variables from dashboard filters, set `application={{application}}` and/or `service={{service}}`.
1. Do not set the time. The Service Map always shows the last 72 hours of data.
1. Leave **Chart Type** set to **Graph**.
1. Click the **General** tab to edit the Panel Details. Enter a name for the panel, set a **Title Font Size**, and add a short **Description**.<br/><img src={useBaseUrl('/img/apm/traces/tracelist-details.png')} style={{border: '1px solid gray'}} alt="Tracelist details" width="400"/>
1. Click **Add to Dashboard**.

## Traces panel

<img src={useBaseUrl('/img/dashboards/panels/icon-trace-list.png')} style={{border: '1px solid gray'}} alt="Icon trace list" width="75"/>

Transaction tracing captures and tracks distributed business workflows by enriching and analyzing traces, logs, and metrics in real time with automatically generated application topology. Each trace provides details on the root service, when the trace occurred, how long it lasted, the number of [spans](/docs/apm/spans), and a breakdown of services. The panel displays the table from the [Traces page](/docs/apm/traces/) so you can track traces at a glance from your dashboard. To view transaction and service details ([Trace View](/docs/apm/traces/view-and-investigate-traces)), click a trace from the panel.

See the [Dashboards](/docs/dashboards/about) guide for more information about creating panels, configuring filters, using template variables from dashboard headers, and more.

:::note
You are limited to three Traces panels in a dashboard.
:::

<img src={useBaseUrl('/img/dashboards/panels/panel-trace.png')} style={{border: '1px solid gray'}} alt="Panel trace" width="600"/>

To add a Traces panel:

1. With the dashboard open, click the **Add Panel** button. <br/><img src={useBaseUrl('/img/apm/traces/add-tracelist.png')} style={{border: '1px solid gray'}} alt="add-tracelist" width="800"/>
1. A panel configuration page opens. <br/><img src={useBaseUrl('/img/dashboards/panels/create-tracelist.png')} style={{border: '1px solid gray'}} alt="create-tracelist" width="800"/>
1. Configure a [Trace query](/docs/apm/traces/view-and-investigate-traces) to search for the set of traces you want.
1. Select a time range or [create a custom range](/docs/dashboards/set-custom-time-ranges) for the panel. You can set this when you create the panel or at any time while viewing the dashboard.<br/><img src={useBaseUrl('/img/dashboards/panels/timerange.png')} style={{border: '1px solid gray'}} alt="timerange" width="300"/>
1. Select a **Chart Type**:
   1. **Table**. Shows a table of traces.
   1. **Breakdown chart**. Shows the aggregated Trace Duration Breakdown chart.
   If you choose **Table**, complete the following steps:
1. Enter the **Rows Per Page** for the panel, from 5 to 100. The default is 15. The panel automatically paginates traces so you can browse all of them.
1. Select the table columns of trace data to show in the panel:
    | Column Name | Example Value | Description |
    | :-- | :-- | :-- |
    | Trace ID | ffaf2f69ee8ad0c1 | The unique identifier of the trace. |
    | Root Service | api | The service that started the trace. |
    | Started At | 07/27/2020 09:01:04.533 | When the trace started. |
    | Duration | 12.582 ms | The total amount of time the trace takes. |
    | Number of spans | 35 | A trace consists of spans. This number tells you how many spans are in the trace. |
    | Duration Breakdown | <img src={useBaseUrl('/img/apm/traces/breakdown.png')} style={{border: '1px solid gray'}} alt="breakdown" width="800"/> | Each color indicates a service. The colors assigned to services are always the same in your account. You can change the color in the span summary tab after clicking the individual span in trace view.<br/>Hover over the chart to view the percentage of the trace duration that each span covers.<br/><img src={useBaseUrl('/img/apm/traces/span-hover-view.png')} style={{border: '1px solid gray'}} alt="span hover" width="800"/> |
    | Number of errors | 0 | The number of errors in the trace. |
    | Status | 200 | The HTTP status code of the trace. |
1. Click the **General** tab to edit the Panel Details. Enter a name for the panel, set a **Title Font Size**, and add a short **Description**.<br/><img src={useBaseUrl('/img/apm/traces/tracelist-details.png')} style={{border: '1px solid gray'}} alt="tracelist details" width="400"/>
1. Click **Add to Dashboard**.

## Delete a panel

You can delete a panel that you no longer need.

1. Go to the dashboard that has the panel you want to delete.
1. Hover the cursor over the **Details** icon to display the pop-up menu. <br/><img src={useBaseUrl('/img/dashboards/panels/delete-panel/details-option.png')} style={{border: '1px solid gray'}} alt="details option" width="800"/>
1. Select **Delete**. <br/><img src={useBaseUrl('/img/dashboards/panels/delete-panel/delete-a-panel.png')} style={{border: '1px solid gray'}} alt="delete a panel" width="800"/>
1. In the confirmation dialog, click **Delete Panel** to remove the panel, or **Cancel** to keep it.

:::note
If the panel is part of a shared dashboard, the confirmation dialog warns you that deleting it may impact other users who use the dashboard.
:::

## Additional information

* [Warning and Critical Thresholds](/docs/metrics/metrics-queries/metrics-explorer/#set-warning-and-critical-thresholds)
