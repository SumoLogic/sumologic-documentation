---
id: trace-view
title: Trace View
description: Learn how to search and investigate your traces, trace views, and trace events.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Trace View shows the time flow of a single trace by its spans. With drilldowns to logs and infrastructure metrics, trace view helps you:
* Investigate the lifetime of your transactions
* Understand calls dependencies
* Troubleshoot long duration and errors

To begin, click on a trace row in the Traces [table](/docs/apm/traces/view-and-investigate-traces/#traces-table-view). Each color represents a different service.<br/> ![trace-view.png](/img/traces/trace-view.png)

## Trace Icicle Chart

Here, you can understand the relationships between the spans across your transaction.

:::tip
Changes to the View are preserved when switching between other tabs.
:::

* Use your mouse to drag and zoom in and out. Or use the buttons in the bottom left to reset the view, zoom in, and zoom out.<br/>  ![trace-zooms.png](/img/traces/trace-zooms.png)
* You can click the **Critical path contribution by service** bar at the top to filter out the services that are of less interest. The critical path is the sequence of span segments that contribute to the total trace duration.  <br/>  ![critical path on trace view.png](/img/traces/critical-path-on-trace-view.png)
   * Quickly understand how each service contributes to the total trace execution time. Each colored segment summarizes all span fragments from a single service, where there was no child span activity.
* Use the **Error Spans Only** toggle to hide or show error spans and the **Hide all services** button to hide services.  <br/> ![toggle and button hide.png](/img/traces/toggle-and-button-hide.png)
* Hover over a span to view the parent span information and relationship, including the service, operation, relative start in milliseconds, and duration in milliseconds. <br/>  ![trace-hover.png](/img/traces/trace-hover.png)

### span segment

Click on any span segment below

Explore the displayed spans by clicking on the span segment. A details panel containing further information will open.

### Span Details Panel

Click on any span to open a side panel with details.<br/> ![trace-view-details.png](/img/traces/trace-view-details.png)

The details pane provides the following tabs:

### Summary

The details of the span are provided. contains general information about the span and you can drilldown to logs by span or trace IDs (if present in logs)

To drill down further into your data, the **Logs** section has links to run searches against related log data. Top links for span/trace IDs work if you have span and trace IDs injected into logs. Lower section links are available and work automatically if you've installed the [Sumo Logic Kubernetes Collection](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/main/deploy).  <br/> ![Logs links.png](/img/traces/Logs-links.png)

#### Service Color

You can change the color of a **Service** by clicking the colored box and selecting a defined swatch or custom color.  <br/> ![service color traces span.png](/img/traces/service-color-traces-span.png)

### Metadata

contains a complete set of span's tags

Lists all of the related service entities involved in the span. When selecting a [Span Event](#span-events), the Metadata includes a Span Event section.  

![trace-details-metadata.png](/img/traces/trace-details-metadata.png)

![trace-details-metadata-event.png](/img/traces/trace-details-metadata-event.png)

You can click on the clipboard icon to copy the value to your computer's clipboard.  <br/> ![clipboard option.png](/img/traces/clipboard-option.png)

### Entities

The **Entities** tab provides troubleshooting links for related Entities and Environments, as well as any [Monitors](/docs/alerts/monitors) with a Critical, Warning, or Missing Data status that are tracking logs or metrics on the Entity.

provides an overview of a span's supporting infrastructure health with the ability to contextually drilldowns to logs and metrics.

![entities tab.png](/img/dashboards-new/drill-root-causes/entities-tab.png)

Only entity types from a curated list are identified. The AWS, Kubernetes, Traces, and Host domains are supported.

#### Troubleshoot links

To investigate, click the **Open In** button and select an icon to launch another feature against the entity or environment. An icon is not available if it is not a valid launch.<br/> ![infrastructure tab with RCE link.png](/img/dashboards-new/drill-root-causes/infrastructure-tab-with-RCE-link.png)

#### Time selector

Use the time selector to set if data is related to the "now" moment of time or the moment of time around the data point you clicked on.

If the **Datapoint** is the same as **Now** the selector will not allow you to select **Now**.<br/> ![entities time selector.png](/img/dashboards-new/drill-root-causes/entities-time-selector.png)

![time selector options.png](/img/dashboards-new/drill-root-causes/time-selector-options.png)

#### Triggered monitors

[Monitors](/docs/alerts/monitors) track your Metrics or Logs data in real time and send notifications when noteworthy changes happen in your production applications. The **Entities** tab shows any Monitors with a Critical, Warning, or Missing Data status that are tracking logs or metrics on the Entity.

Alerts are only visible when the [Time Selector](../../dashboards-new/drill-down-to-discover-root-causes.md#time-selector) is set to **Now.**

Next to the Entity, you will see any of the following icons indicating the type of Monitor alert that has triggered.

![monitor types.png](/img/dashboards-new/drill-root-causes/monitor-types.png)

Click the **Triggered monitors** row to view the related Monitors. You can click on them to view the Monitor on the [Monitors](/docs/alerts/monitors) page.

![triggered monitors.png](/img/dashboards-new/drill-root-causes/triggered-monitors.png)


<!--
### Filters

You can use the filter bar to:

Filter by values of metadata tags in spans
Show only spans with errors (if present) or
Hide all services and select a specific service from the critical path breakdown summary below.
-->


## Span Events

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
