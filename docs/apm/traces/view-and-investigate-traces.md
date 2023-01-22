---
id: view-and-investigate-traces
title: View and Investigate Traces
description: Learn how to search and investigate your traces, trace views, and trace events.
---

You can visualize trace data through filtered trace lists and icicle charts. These visualizations will help you find and troubleshoot faulty transactions easily.

## Traces page

Use Traces to search and view traces. To open, go to **+ New** > **Traces**.

![traces menu option.png](/img/traces/traces-menu-option.png)

A new Traces page opens:

![trace-page.png](/img/traces/trace-page.png)

You can view traces in a **Table**.

## Table

Click on any row to open the [Trace View](#trace-view). Traces are displayed in the following columns:

| Column name | Example value | Description |
|:--|:--|:--|
| Trace ID | ffaf2f69ee8ad0c1 | The unique identifier of the trace. |
| Root Service | api | The service that started the trace. |
| Started At | 07/27/2020 09:01:04.533 | When the trace started. |
| Duration | 12.582 ms | The amount of time the trace spans.  |
| Number of spans | 35 | A trace consists of spans. This number tells you how many spans are in the trace. |
| Duration Breakdown | ![breakdown](/img/traces/breakdown.png) | Each color indicates a service. The colors assigned to services are always the same on your account. You can change the color in the span summary tab after clicking on the individual span in trace view.<br/>Hover over to view a percentage breakdown of how long each span covers in the trace.<br/>![img](/img/traces/span-hover-view.png) |
| Number of errors | 0 | The number of errors in the trace. |
| Status | 200 | The HTTP status code of the trace. A menu is available in this column when hovering on a row. The menu has an option to **Show similar traces**.<br/>![img](/img/traces/similar-traces-menu.png) |

## Trace query

A trace query allows you to search for traces representing transaction flows through your system using the following filters:

* **Root Service**. name of the service that started the trace
* **Any Service**. name of a service that took part in the trace
* **Duration**. time in milliseconds of the trace
* **Number of spans**
* **Number of errors**

As well as any other metadata standard or custom we may find in spans.

All metadata in all spans are automatically indexed and searchable up to following limits:  

* up to 64MB of all metadata per each trace  
* up to 10000 unique tag names per retention period per org  
* up to 1024 unique tag names per trace  
* tags with names longer than 64 chars are not indexed   
* tags with values over 4096 chars are not indexed  
* `spanid` and `parentspanid` are not indexed in Traces search, but searchable through Span analytics

To write a query, click on the **Choose filters** input line. You can select the desired filter type and value from the dropdown menu or manually type them. Multiple filters are allowed in a query row, `AND` is implicit.<br/>![filters.png](/img/traces/trace-filters.png)

You can add more queries by clicking the **+** icon on the right of the query row:<br/>![Add trace query.png](/img/traces/Add-trace-query.png)

Each query is labeled with a letter, in the following screenshot the first query on the top row is labeled **#A**, the second query is labeled **#B**.<br/>![trace-queries.png](/img/traces/trace-queries.png)

### Visibility

Use the eye icon to toggle the visibility of results from a query. When hidden, the traces returned from the query in the row are not displayed in your results.<br/>![trace-hide-show.png](/img/traces/trace-hide-show.png)

### Time range 

Results are returned for the time range selected. The traces available (retention) in Trace query is 15 days. Please note that queries above 7 days may be slower to load. See [Time Range Expressions](/docs/search/get-started-with-search/search-basics/time-range-expressions) for details on defining a time range.

### Refresh

The results are not automatically updated. If you want to refresh traces, click the refresh button on the top right corner of the page.<br/>![Refresh.png](/img/traces/Refresh.png)


## Trace Duration Breakdown Chart

![breakdown](/img/traces/breakdown2.png)

This chart helps you understand average trace durations in every time bucket as well as time every service contributed to the end to end duration. Use this chart to:

* Quickly understand intermittent duration spikes or slowdowns
* Immediately spot the offending service by comparing CPC contribution by service

### Navigation  

For best results, filter your traces to represent similar traces (traces of same transaction like login). Running this chart for different transaction types will not provide the insights you want. For the same reason, running the chart for all data without any filters is disabled.

The height of the bar represents the average trace duration for each time bucket.

Each segment represent a Critical Path Contribution of each service from each trace. Services not present in certain traces do not contribute to the value.

Click on any of the color segments to focus on this service and drill down to selected timeframe.

Click and drag on the chart to zoom.

Multiple query rows are not supported currently. Charts shows data for first active (visible) row only.

#### Dashboard support
You can add Trace Duration Breakdown Chart as a dashboard panel. In other to do so - when adding a new panel to new or existing dashboard, pick Traces panel type, add required trace query filters and switch chart type to "Breakdown Chart" in **Visual Settings** > **Chart type**.

## Trace View

Trace View shows the time flow of a single trace by its spans. To open, click on a trace row in the Traces [table](#table). Each color represents a different service.<br/> ![trace-view.png](/img/traces/trace-view.png)

### Navigate

:::tip
Changes to the View are preserved when switching between other tabs.
:::

* Use your mouse to drag and zoom in and out. Or use the buttons in the bottom left to reset the view, zoom in, and zoom out.  <br/>  ![trace-zooms.png](/img/traces/trace-zooms.png)
* You can click the **Critical path contribution by service** bar at the top to filter out the services that are of less interest. The critical path is the sequence of span segments that contribute to the total trace duration.  <br/>  ![critical path on trace view.png](/img/traces/critical-path-on-trace-view.png)
* Use the **Error Spans Only** toggle to hide or show error spans and the **Hide all services** button to hide services.  <br/> ![toggle and button hide.png](/img/traces/toggle-and-button-hide.png)
* Hover over a span to view the parent span relationship including the service, operation, relative start in milliseconds, and duration in milliseconds. <br/>  ![trace-hover.png](/img/traces/trace-hover.png)

### Details pane

Click on any span to open a side panel with details.<br/> ![trace-view-details.png](/img/traces/trace-view-details.png)

The details pane provides the following tabs:

#### Summary
The details of the span are provided.

To drill down further into your data, the **Logs** section has links to run searches against related log data. Top links for span/trace IDs work if you have span and trace IDs injected into logs. Lower section links are available and work automatically if [SumoLogic Kubernetes Collection](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/main/deploy) is installed.  <br/> ![Logs links.png](/img/traces/Logs-links.png)

#### Service Color

The color of the **Service** can be changed by clicking the colored box and selecting a defined swatch or custom color.  <br/> ![service color traces span.png](/img/traces/service-color-traces-span.png)

#### Metadata

Lists all of the related service entities involved in the span. When selecting a [Span Event](#span-events), the Metadata includes a Span Event section.  

![trace-details-metadata.png](/img/traces/trace-details-metadata.png)

![trace-details-metadata-event.png](/img/traces/trace-details-metadata-event.png)

You can click on the clipboard icon to copy the value to your computer's clipboard.  <br/> ![clipboard option.png](/img/traces/clipboard-option.png)

#### Entities

The **Entities** tab provides troubleshooting links for related Entities and Environments, as well as any [Monitors](/docs/alerts/monitors) with a Critical, Warning, or Missing Data status that are tracking logs or metrics on the Entity.

Only entity types from a curated list are identified. The AWS, Kubernetes, Traces, and Host domains are supported.

The **Infrastructure** tab was renamed to **Entities**.<br/> ![entities tab.png](/img/dashboards-new/drill-root-causes/entities-tab.png)

<Tabs
  className="unique-tabs"
  defaultValue="troubleshoot"
  values={[
    {label: 'Troubleshoot links', value: 'troubleshoot'},
    {label: 'Time selector', value: 'time'},
    {label: 'Triggered monitors', value: 'triggered'},
  ]}>

<TabItem value="troubleshoot">

To investigate, click the **Open In** button and select an icon to launch another feature against the entity or environment. An icon is not available if it is not a valid launch.<br/> ![infrastructure tab with RCE link.png](/img/dashboards-new/drill-root-causes/infrastructure-tab-with-RCE-link.png)

</TabItem>
<TabItem value="time">

Use the time selector to set if data is related to the "now" moment of time or the moment of time around the data point you clicked on.

If the **Datapoint** is the same as **Now** the selector will not allow you to select **Now**.<br/> ![entities time selector.png](/img/dashboards-new/drill-root-causes/entities-time-selector.png)

![time selector options.png](/img/dashboards-new/drill-root-causes/time-selector-options.png)

</TabItem>
<TabItem value="triggered">

[Monitors](/docs/alerts/monitors) track your Metrics or Logs data in real time and send notifications when noteworthy changes happen in your production applications. The **Entities** tab shows any Monitors with a Critical, Warning, or Missing Data status that are tracking logs or metrics on the Entity.

Alerts are only visible when the [Time Selector](../../dashboards-new/drill-down-to-discover-root-causes.md#time-selector) is set to **Now.**

Next to the Entity, you will see any of the following icons indicating the type of Monitor alert that has triggered.

![monitor types.png](/img/dashboards-new/drill-root-causes/monitor-types.png)

Click the **Triggered monitors** row to view the related Monitors. You can click on them to view the Monitor on the [Monitors](/docs/alerts/monitors) page.

![triggered monitors.png](/img/dashboards-new/drill-root-causes/triggered-monitors.png)

</TabItem>
</Tabs>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Span Events

Span Events describe and contextualize the work being done under a Span by tracing and displaying that data in Trace Views. Events are optional time-stamped strings which are made up of timestamp, name, and (optional) key-value pair attributes. Select a marker in the timeline or a span to review the Span Event data. All details and attributes display in the **Metadata** tab with pop-up **Details** for additional event messages and attribute details. 

For example, during OpenTelemetry Java or Python auto-instrumentation, any exceptions may be traced and attach the exception details automatically onto the relevant span as a Span Event.

You can also manually create Span Events, such as this [example from Ruby](https://opentelemetry.io/docs/instrumentation/ruby/events/). 

Each event tracks a marker in the span timeline showing the start, end, and amount of passed time in a span. For many events that occur in spans, zoom in to expand and review event markers helping them to space out if overlapping or close together. As you hover and select events, associated spans highlight and provide a view of the event in all spans affected.<br/> ![span-event-markers.gif](/img/traces/span-event-markers.gif)

Select a span event marker ![span-event-marker.png](/img/traces/span-event-marker.png) in the timeline or a span with an event to see the **Span Events** section in the **Metadata** tab including:

* Name for the event
* Timestamp when it occurred
* A metric or measurement
* Additional attributes (short or long), displayed in multiple formats
* Captured errors with codes and additional details if available

![span-event-select.png](/img/traces/span-event-select.png)

A **Details** link displays if additional information is available that may be too large for the tab view area, such as a metric attributes and error messages. Click to review this information.

![span-event-more1.png](/img/traces/span-event-more1.png)

![span-event-more2.png](/img/traces/span-event-more2.png)

## Span Links
Tracing focuses on the parent-child relationship between spans which are described by a Span ID, a parent Span ID, and a Trace ID. You can establish more casual relationships between Traces using Span Links.

To give Spans context, links can point to Spans inside a trace or across different traces. For example, with links you can represent batch operations, where a Span is initiated by multiple initiating spans, each representing one item being processed in the batch. The links give you the relationship between the originating and the following trace. Span Links are added by tracing instrumentation at the client side and are automatically shown when detected in data. For details on configuring Span Links, see the [OpenTelemetry specification](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/overview.md#links-between-spans).<br/> ![links.png](/img/traces/links.png)

You can copy the Span ID, by selecting the Clipboard icon next to the span link.

You can select the Traces icon to view all other traces that link to this Span ID, and it will take you to the Trace View with the linkedSpanId as a filter criteria.<br/> ![links.png](/img/traces/links2.png)
