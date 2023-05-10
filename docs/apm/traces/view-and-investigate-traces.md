---
id: view-and-investigate-traces
title: View and Investigate Traces
description: Learn how to search and investigate your traces, trace views, and trace events.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can visualize your Traces data through filtered trace lists and icicle charts. These visualizations will help you find and troubleshoot faulty transactions easily.

## Traces page

To get to the main **Traces** page, go to **+ New** > **Traces**.<br/> <img src={useBaseUrl('img/traces/traces-menu-option.png')} alt="traces menu option.png" width="300"/>

Here, you can run a Trace query, view your **Trace Duration Breakdown Chart**, and explore your **Traces matching queries** table.

![trace-page.png](/img/traces/trace-page.png)

### Trace queries

Just above the Traces table, you'll see an input field for you to write a Trace query. Trace queries allows you to search for traces representing transaction flows through your system, using the following filters:

* **Root Service**. name of the service that started the trace
* **Any Service**. name of a service that took part in the trace
* **Duration**. time in milliseconds of the trace
* **Number of spans**.
* **Number of errors**.

As well as any other metadata standard or custom we may find in spans. All metadata in all spans are automatically indexed and searchable up to following limits:  

* up to 64MB of all metadata per each trace  
* up to 10000 unique tag names per retention period per org  
* up to 1024 unique tag names per trace  
* tags with names longer than 64 chars are not indexed   
* tags with values over 4096 chars are not indexed  
* `spanid` and `parentspanid` are not indexed in Traces search, but searchable through Span analytics

#### Write a Trace query

To write a Trace query, click on the **Choose filters** input line. You can select the desired filter type and value from the dropdown menu or manually type them. Multiple filters are allowed in a query row, `AND` is implicit.<br/>![filters.png](/img/traces/trace-filters.png)

You can add more queries by clicking the **+** icon on the right of the query row.<br/>![Add trace query.png](/img/traces/Add-trace-query.png)

Each query is labeled with a letter. In the following screenshot, the first query on the top row is labeled **#A** and the second query is labeled **#B**.<br/>![trace-queries.png](/img/traces/trace-queries.png)

#### Visibility

Use the eye icon to toggle the visibility of results from a query. When hidden, the traces returned from the query in the row are not displayed in your results.<br/>![trace-hide-show.png](/img/traces/trace-hide-show.png)

#### Set Time Range

Results are returned for the time range selected. The traces available (retention) in Trace query is 15 days. See [Time Range Expressions](/docs/search/get-started-with-search/search-basics/time-range-expressions) for details on defining a time range.

:::note
Queries above 7 days may be slower to load.
:::

#### Refresh results

The results are not automatically updated. If you want to refresh traces, click the refresh button on the top right corner of the page.<br/>![Refresh.png](/img/traces/Refresh.png)

### Trace Query Visualizations

The Trace Query Visualizations allow you to visualize the breakdown of where time was spent in traces for various services in your application. By aggregating traces, you can gain insights into anomalies and unexpected behaviors, leading to faster Time-to-Resolution (TTR) and a higher Return on Investment (ROI). It offers six charts to help you analyze and trace data efficiently. These include:
* Trace duration
* Error count
* Error count
* Span count
* Span count
* Trace duration as histogram

<img src={useBaseUrl('/img/traces/breakdown2.png')} alt="breakdown2.png" width="950px" height="500" />

For each chart type, you can choose to view it as either a **timeseries** or **histogram** chart. Here is some more detailed information about each chart type:
* **Trace duration**. It allows you to quickly identify services that are causing spikes or slowdowns in trace duration. It helps you understand the average trace duration for every time bucket, as well as the amount of time each service contributed to the end-to-end duration.
* **Error count**. It helps you visualize the average number of errors per trace for certain time ranges. You can drill down to specific time ranges and identify the distribution of errors.
* **Span count**. It helps you visualize how many spans you have per trace. You can drill down to specific time ranges and identify the distribution of spans.

These charts provide valuable insights into various aspects of your tracing data performance. It helps you quickly identify any unusual spikes in errors that may indicate an issue in the system.

You can further switch between the charts from the dropdown menu, and view them as **timeseries** or **histograms**. **Trace duration** is set as the default **timeseries** chart, but you can drill down further and view additional charts such as the histogram to get a more detailed understanding of your tracing data.
* **Timeseries**. It shows the average trace duration for each time bucket. It allows you to switch between linear and logarithmic scales to better visualize the data.
* **Histogram**. It shows the distribution of data in different time periods  such as the number of traces with a certain range of spans or errors. You can switch between linear and logarithmic scales to better visualize the data.<br/><img src={useBaseUrl('img/traces/charttype.png')} alt="charttype.png" width="950px" />

To get the best results from this chart, it is recommended to filter the traces to represent similar traces of the same transaction, such as login. Running this chart for different transaction types will not provide the insights users need. Similarly, running the chart for all data without any filters is disabled.

* The height of the bar represents the average trace duration for each time bucket.
* Click on any of the color segments to focus on this service and drill down to selected timeframe.
* Click and drag on the chart to zoom in.

:::note
Multiple query rows are not supported currently. Charts show data for first active (visible) row only.
:::

#### Using the Trace Query Visualization Charts

To view the Trace Query Visualization charts:
1. Navigate to the Traces (Query) screen and type in a query.
2. Click the **Show Chart** tab. The default chart shown will be **Trace duration** as a **timeseries** chart.
3. From the dropdown menu, select the chart type you want to view: **Trace duration**, **Error count**, or **Span count**.
4. You can view each chart type as a **timeseries** or **histogram** chart by selecting the corresponding option from the dropdown menu.

These new aggregation charts will provide you with even more insights into the behavior of your application and help you resolve issues faster.

#### Dashboard Panel support

You can add Trace Duration Breakdown Chart as a dashboard panel to a new or existing dashboard. From a new dashboard:

1. Go to **+ New** > **Dashboard (New)**.
1. Click the **Traces** panel type.
1. Add the required trace query filters
1. Under **Visual Settings** > **Chart type**, select **Trace Duration Breakdown Chart**.

### Traces Matching Queries table

In the **Traces matching queries** table, Traces are displayed in the following columns:

| Column name | Example value | Description |
|:--|:--|:--|
| Trace ID | `ffaf2f69ee8ad0c1` | The unique identifier of the trace. |
| Root Service | `api` | The service that started the trace. |
| Started At | `07/27/2020 09:01:04.533` | When the trace started. |
| Duration | `12.582 ms` | The amount of time the trace spans.  |
| Number of spans | `35` | A trace consists of spans. This number tells you how many spans are in the trace. |
| Duration Breakdown | ![breakdown](/img/traces/breakdown.png) | Each color indicates a service. The colors assigned to services are always the same on your account. You can change the color in the span summary tab after clicking on the individual span in trace view.<br/>Hover over to view a percentage breakdown of how long each span covers in the trace.<br/>![img](/img/traces/span-hover-view.png) |
| Number of errors | `0` | The number of errors in the trace. |
| Status | `200` | The HTTP status code of the trace. A menu is available in this column when hovering on a row. The menu has an option to **Show similar traces**.<br/>![img](/img/traces/similar-traces-menu.png) |

:::note
Changes to your View are preserved when switching between other tabs.
:::

Next, open Trace View by clicking on any row.<br/> ![traces-table-row.png](/img/traces/traces-table-row.png)


## Trace View

Trace View shows the time flow of a single trace by its spans, and displays the relationships between the spans across your transaction.

![trace-view.png](/img/traces/trace-view.png)

 With log drilldowns and infrastructure metrics, Trace View helps you:
* Investigate the lifetime of your transactions
* Understand calls dependencies
* Troubleshoot long duration and errors
* Visualize all of your different services, each represented in a different color

Navigation tips:
* Zoom in and out on Spans using your mouse to drag and pan, or use the buttons in the bottom left, where you can also reset the view.<br/> <img src={useBaseUrl('img/traces/trace-zooms.png')} alt="trace-zooms.png" width="100"/>
* Use the **Filters** bar to filter by values of metadata tags in spans.
* Use the **Error Spans Only** toggle to hide or show error spans and the **Hide all services** button to hide services.<br/> <img src={useBaseUrl('img/traces/toggle-and-button-hide.png')} alt="toggle-and-button-hide.png" width="300"/>
* Hover over a span segment to view the parent span information and relationship, including the service, operation, relative start in milliseconds, and duration in milliseconds. <br/> ![trace-view-details.png](/img/traces/trace-view-details2.png) ![trace-view-details.png](/img/traces/trace-view-details.png)
* Hide services that are of less interest by clicking on a segment underneath the **Critical path contribution by service** label. This section displays the sequence of service span segments that contribute to the total trace execution time. Each colored segment summarizes all span fragments from a single service, where there was no child span activity. <br/>![critical path on trace view.png](/img/traces/critical-path-on-trace-view.png)

Click on a span segment to open the details side panel, which contains the following tabs.

### Summary

The details of the span are provided. contains general information about the span and you can drilldown to logs by span or trace IDs (if present in logs).

#### Logs

To drill down further into your data, the **Logs** section has links to run searches against related log data. Top links for span/trace IDs work if you have span and trace IDs injected into logs. Lower section links are available and work automatically if you've installed the [Sumo Logic Kubernetes Collection](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/main/deploy).

![Logs links.png](/img/traces/Logs-links.png)

If no logs are produced for this spanID, results may come back empty. [Learn how to add spanID to logs](/docs/apm/traces/advanced-configuration/correlate-logs).

#### Service color

You can change the color of a **Service** by clicking the colored box and selecting a defined swatch or custom color.

<img src={useBaseUrl('img/traces/service-color-traces-span.png')} alt="service color traces span.png" width="400"/>

### Metadata

Lists all of the related service entities involved in the span, including a complete set of span's tags. You can click on the clipboard icon to copy the value to your computer's clipboard.

<img src={useBaseUrl('img/traces/trace-details-metadata.png')} alt="trace-details-metadata.png" width="300"/>

The Metadata includes a [Span Event](#span-events) section.

#### Span Events

Span Events describe and contextualize the work being done under a Span by tracing and displaying that data in Trace Views. Events are optional time-stamped strings, which are made up of timestamp, name, and (optional) key-value pair attributes.

![span-event-select.png](/img/traces/span-event-select.png)

You can also get to the **Metadata** tab > **Span Events** section by selecting a span event marker ![span-event-marker.png](/img/traces/span-event-marker.png) in the timeline or a span with an event. <br/>
![span-event-markers.gif](/img/traces/span-event-markers.gif)

Span Event data includes:

* Name for the event.
* Timestamp when it occurred.
* A metric or measurement.
* Additional attributes (short or long), displayed in multiple formats
* Captured errors with codes and additional details if available.

All details and attributes display in the **Metadata** tab with pop-up **Details** for additional event messages and attribute details. For example, during OpenTelemetry Java or Python auto-instrumentation, any exceptions may be traced and attach the exception details automatically onto the relevant span as a Span Event.

Each event tracks a marker in the span timeline showing the start, end, and amount of passed time in a span. For many events that occur in spans, zoom in to expand and review event markers helping them to space out if overlapping or close together. As you hover and select events, associated spans highlight and provide a view of the event in all spans affected.

If additional information is available that may be too large for the tab view area, such as a metric attributes and error message, the **Details** link displays. Click to review this information.

![span-event-more1.png](/img/traces/span-event-more1.png)

![span-event-more2.png](/img/traces/span-event-more2.png)


You can also manually create Span Events, such as this [example from Ruby](https://opentelemetry.io/docs/instrumentation/ruby/events/). 


#### Span Links

Tracing focuses on the parent-child relationship between spans, which are described by a Span ID, a parent Span ID, and a Trace ID. You can establish more casual relationships between Traces using Span Links.

**Span Links**, listed under the Metadata tab, give Spans context. Links can point to Spans inside a trace or across different traces. For example, with links you can represent batch operations, where a Span is initiated by multiple initiating spans, each representing one item being processed in the batch. The links give you the relationship between the originating and the following trace. You can copy the Span ID by selecting the Clipboard icon next to the span link.<br/> ![links.png](/img/traces/links.png)

Span Links are added by tracing instrumentation at the client side and are automatically shown when detected in data. For details on configuring Span Links, see the [OpenTelemetry specification](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/overview.md#links-between-spans).

You can select the Traces icon to view all other traces that link to this Span ID, and it will take you to the Trace View with the `linkedSpanId` as a filter criteria.<br/> ![links.png](/img/traces/links2.png)


### Entities

The **Entities** tab provides an overview of a span's supporting infrastructure health with the ability to contextually drill down to logs and metrics. Only entity types from a curated list are identified. The AWS, Kubernetes, Traces, and Host domains are supported.

<img src={useBaseUrl('img/dashboards-new/drill-root-causes/entities-tab.png')} alt="entities-tab.png" width="450"/>

#### Time selector

Use the time selector to set if data is related to the **Now** moment of time or the moment of time around the data point you clicked on. <br/><img src={useBaseUrl('img/dashboards-new/drill-root-causes/entities-time-selector.png')} alt="entities-time-selector.png" width="450"/>

If the **Datapoint** is the same as **Now**, the selector will not allow you to select **Now**.

#### Triggered monitors

:::note
Alerts are only visible when the [Time Selector](../../dashboards-new/drill-down-to-discover-root-causes.md#time-selector) is set to **Now.**
:::

Monitors track your Metrics or Logs data in real time and send notifications when noteworthy changes happen in your production applications. The **Entities** tab shows any Monitors with a Critical, Warning, or Missing Data status that are tracking logs or metrics on the Entity.<br/>![monitor types.png](/img/dashboards-new/drill-root-causes/monitor-types.png)

Next to the Entity, you will see any of the following icons indicating the type of Monitor alert that has triggered. Click the **Triggered monitors** row to view the related Monitors. You can click on them to view the Monitor on the [Monitors](/docs/alerts/monitors) page.

<img src={useBaseUrl('img/dashboards-new/drill-root-causes/triggered-monitors.png')} alt="triggered-monitors.png" width="300"/>

#### Troubleshoot links

This tab also displays troubleshooting links for related Entities and Environments. To investigate, click the **Open In** button, then select an icon to launch another feature against the entity or environment. An icon is not available if it is not a valid launch.<br/><img src={useBaseUrl('img/dashboards-new/drill-root-causes/infrastructure-tab-with-RCE-link.png')} alt="infrastructure tab with RCE link.png" width="350"/>
