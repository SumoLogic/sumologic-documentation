---
id: view-and-investigate-traces
title: View and Investigate Traces
description: Learn how to search and investigate your traces, trace views, and trace events.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can visualize your Traces data through filtered trace lists and icicle charts. These visualizations will help you find and troubleshoot faulty transactions easily.

## Traces Table view

The **Traces** page is where you'll start. Go to **+ New** > **Traces**.<br/> <img src={useBaseUrl('img/traces/traces-menu-option.png')} alt="traces menu option.png" width="300"/>

A new Traces page opens, where you can search and view your Traces in a table.

![trace-page.png](/img/traces/trace-page.png)

Traces are displayed in the following columns:

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

:::tip
To drill down further into a Trace, click on any row in your table to open the [Trace View](/docs/apm/traces/trace-view).
:::

## Trace queries

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

### Write a Trace query

To write a Trace query:

1. Click on the **Choose filters** input line. You can select the desired filter type and value from the dropdown menu or manually type them. Multiple filters are allowed in a query row, `AND` is implicit.<br/>![filters.png](/img/traces/trace-filters.png)
1. (Optional): You can add more queries by clicking the **+** icon on the right of the query row.<br/>![Add trace query.png](/img/traces/Add-trace-query.png)

Each query is labeled with a letter. In the following screenshot, the first query on the top row is labeled **#A** and the second query is labeled **#B**.<br/>![trace-queries.png](/img/traces/trace-queries.png)

### Visibility

Use the eye icon to toggle the visibility of results from a query. When hidden, the traces returned from the query in the row are not displayed in your results.<br/>![trace-hide-show.png](/img/traces/trace-hide-show.png)

### Set Time Range

Results are returned for the time range selected. The traces available (retention) in Trace query is 15 days. See [Time Range Expressions](/docs/search/get-started-with-search/search-basics/time-range-expressions) for details on defining a time range.

:::note
Queries above 7 days may be slower to load.
:::

### Refresh

The results are not automatically updated. If you want to refresh traces, click the refresh button on the top right corner of the page.<br/>![Refresh.png](/img/traces/Refresh.png)


## Trace Duration Breakdown Chart

The Trace Duration Breakdown Chart helps you understand average trace durations in every time bucket as well as the amount of time each service contributed to the end-to-end duration. Use this chart to:

* Quickly understand intermittent duration spikes or slowdowns.
* Immediately spot the offending service by comparing CPC contribution by service.

### Navigation  

![breakdown](/img/traces/breakdown2.png)

For best results, filter your traces to represent similar traces (traces of same transaction like login). Running this chart for different transaction types will not provide the insights you want. For the same reason, running the chart for all data without any filters is disabled.

* The height of the bar represents the average trace duration for each time bucket.
* Each segment represent a Critical Path Contribution of each service from each trace. Services not present in certain traces do not contribute to the value.
* Click on any of the color segments to focus on this service and drill down to selected timeframe.
* Click and drag on the chart to zoom in.

Multiple query rows are not supported currently. Charts show data for first active (visible) row only.

### Dashboard Panel support

You can add Trace Duration Breakdown Chart as a dashboard panel to a new or existing dashboard. From a new dashboard:

1. Go to **+ New** > **Dashboard (New)**.
1. Click the **Traces** panel type.
1. Add the required trace query filters
1. Under **Visual Settings** > **Chart type**, select **Trace Duration Breakdown Chart**.
