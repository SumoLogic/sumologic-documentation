---
id: spans
title: Analyze data on Span level
sidebar_label: Spans
description: Learn how to use the Spans page to explore your span data.
---

## Availability

| Account Type | Account Level                           |
|:--------------|:-----------------------------------------|
| Credits    | Enterprise Operations and Enterprise Suite<br/>Essentials get up to 5 GB a day |

Sumo Logic Application Monitoring and Observability provides transactional intelligence for distributed workflows, by combining telemetry from traces, logs, and metrics in the context of real-time automatically tracked application topology.

## Spans page

The Spans page allows you to filter and aggregate your trace data at the raw span level so you can understand the performance and behavior of your application services. You can filter and aggregate by any standard or custom span attribute (tag) and create charts to visualize results. If you find something interesting, you can quickly explore your raw span records in the **Messages** tab. You can also further enhance your query for more advanced use cases using the [Open in Search](#open-in-search) button. This opens a new Search of your spans based on your query where you can investigate further by utilizing the [Search Query Language](search-query-language-support-for-traces.md).

:::note
You need to have Tracing enabled in your account to use this functionality. Contact your account team if the only thing you see is an infographic.
:::

To open, go to **+ New \> Spans**.

![open spans from menu.png](/img/traces/open-spans-from-menu.png)

A new Spans page opens. Data is displayed once you run a query.

![Spans page.png](/img/traces/Spans-page.png)

## Spans query

You build a spans query by using the provided input fields. By default, you'll see an input for **Filters** and **Visualize**.

![blank spans query.png](/img/traces/blank-spans-query.png)

Once you click the text area of an input field you'll get a dropdown menu that provides the available options detected from your data. You can manually type into these input fields or select from the dropdown of available options.

![dropdown for spans filter.png](/img/traces/dropdown-for-spans-filter.png)

**Filters** narrow the scope of the query. Enter metadata values that match the data you want to search. You can add multiple filters to focus on specific data.

:::note
Each Trace includes up to 10,000 spans to better support monitoring for long running and complex transactions. New spans can increase credits consumption.
:::

### Aggregate your data

To aggregate raw spans for better insights, you'll select the subject to visualize and the type of aggregation.

**Visualize** sets the metric to aggregate the filtered data by. The two default options are:

* **count** - counts the field you set. Typically you want to count spans, such as, to show how many of them are in any particular category. However, you can count distinct occurrences of any other field, such as IP addresses or pods.
* **duration** - conducts the sum, avg, min, max, or pct of the span duration metric.

:::tip
You can instead use custom numeric metrics from your data by typing the name of the span tag field carrying a metric into the box.
:::

You can visualize multiple different metrics at once.

* If you define **Visualize** you'll see another option to set **Group By** value. You can have the aggregated results grouped by time or other fields.

  * If you want to display a time series you need to Group By time and select the granularity.
  * If you prefer to have aggregated data without a time dimension, pick the appropriate dimensions to Group By.

      You can group by time and other fields at the same time. When you do time and another dimension, you can create a stacked bar time series.

* If you define **Group By** you'll see another option to set a **Limit** value. This allows you to reduce the number of results by an order.

![spans query.png](/img/traces/spans-query.png)

:::note
When you run your query with **Visualize** and/or **Group By**, the results tab will automatically switch to **Aggregates**.
:::

### Time Range

You set the time range of the query at the top right of the Spans page, above the search button. Tracing data retention in `_trace_spans` index is the same as default log index retention. See Time Range Expressions for details.  

![spans time range.png](/img/traces/spans-time-range.png)

## Run query

Once you have defined your spans query, with filters and aggregation if desired, click the search button to run the search. It looks like the following:  

![spans search button.png](/img/traces/spans-search-button.png)

You can pause or stop your search by clicking the appropriate icons below the search button.  

![pause or stop spans query.png](/img/traces/pause-or-stop-spans-query.png)

## Search Results

**Messages** (including **Facets**) are always provided to show you the raw output of your query, you will have **Aggregates** if your query has set the **Visualize** option.

### Messages

The Messages table shows your raw span data. You can click on any row to open right-side Details pane showing details of the span (similar to the one in [Trace View](view-and-investigate-traces.md)) and providing abilities to navigate to other parts of the system from there.

![messages results.png](/img/traces/messages-results.png)

The table can be modified by the following:

* Hold click and drag the name of a column to move it to a different location in the table.
* Hold click and drag the vertical line in between the columns to adjust the width.  

   ![resize column.png](/img/traces/resize-column.png)

* Double click the vertical line to the right of a column name to reset the width to the default.
* **Facets** shows all of the metadata fields from your search results and allows you to show or hide fields from the results table. See [Facets](#facets) below for more details.

#### Facets

This panel provides a list of all the metadata fields returned from your search. The content of the Facets panel is affected by your current active filters and time range, but shows any found metadata tag (span attribute) with its top 10 values, including any custom tags you may [add to your data](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/java/custom-tags-configuration). By default, the fields used in the query are shown in the Messages table.

![Facets expanded.png](/img/traces/Facets-expanded.png)

* You can adjust which fields are displayed in the raw span messages table by checking or unchecking the box next to the field in the Facets panel.
* Use the search field to easily find the metadata from your data. This applies the filter to both tag names and their values.
* The number of values found for each is displayed for your reference.
* Add and remove fields from your query by hovering over a field and clicking.  

![facets add to query.png](/img/traces/facets-add-to-query.png)

### Aggregates

The Aggregates tab shows your data charted. See Panels from Dashboard (New) for details on the settings, however, note that not all settings will be available on the Spans page. The interface will only show you available settings.

![sumo-logic-spans-aggregates-visualize.png](/img/traces/sumo-logic-spans-aggregates-visualize.png)

## Add to Dashboard

You can add to Dashboard as long as your total dashboard-originated `_trace_spans `read volume does not exceed 200x of your tracing ingest. Contact your Sumo Logic representative for paid subscription service options for volume requirements exceeding 200x of your tracing ingest.

To add your aggregated span data to a Dashboard:

1. Click the three vertical-dots icon on the top right of the Spans page and select **Add to Dashboard**.

    ![add-to-dashboard-spans.png](/img/traces/add-to-dashboard-spans.png)

1. In the **Add Panel to Dashboard** window provide a **Panel Title** and a name for the **Dashboard**. Once the name is entered you'll have an option to select **Create New Dashboard** with your name.

    ![span-dashboard.png](/img/traces/span-dashboard.png)

1. Click **Add** when you're done assigning which Dashboard to add the Panel to.

## Open in Search

To further enhance your query, you can use the [Search Query Language](search-query-language-support-for-traces.md) for more advanced use cases by opening a Search of your spans. Click the
three vertical-dots icon on the top right of the Spans page and select **Open in Search**.  

![span-open-in-search.png](/img/traces/span-open-in-search.png)

### Examples

1. To compare the performance of different release versions defined by a custom tag `assemblyVersion`, you can graph the 95th percentile of latency of a microservice in the function of time by version.

Use the **filters** or **facets** features to find the appropriate service in the dropdown and select it. Then, select to visualize duration’s 95th percentile and pick a group by time, for example, 1-minute granularity and the `assemblyVersion` custom tag that carries version information. That’s it!

![service percentile by time.png](/img/traces/service-percentile-by-time.png)

You can customize your chart by picking different visualization types and colors.

1. Next, let’s see how to find the distribution of different HTTP errors among our services. Not as a time series, just a pie chart to find which service and status codes are most common.

Here is the simple query we used to visualize that data:

![status codes spans example.png](/img/traces/status-codes-spans-example.png)

It’s now easier than ever to drill down into the information you care about. Note that our query only includes spans with codes from 4xx and 5xx ranges and visualizes the count of such spans, broken down by two dimensions, service and status code. Easy!

The number of cases you can realize with this is unlimited. In addition to the above examples, you can aggregate and visualize the content of custom metrics in your spans, and filter and break them down by any field, including custom tags. These can all be presented in any of the available chart visualizations.

If any further query customization is required, you can click the [**Open in Search**](#open-in-search) button to edit your query, making it a great place to start queries in a way that still allows further technical refinement. Especially if you try to solve a use case that requires more than the current functionality of the Spans page, such as the following:

1. A stacked time-series chart with more than two non-time dimensions. You can only set **Group By** to **Time** and a single dimension.
1. Visualize multiple series with more than one count operation.
1. Use OR operations in filters. Filters are concatenated using AND logic.
1. Use mathematical operations between metrics.
