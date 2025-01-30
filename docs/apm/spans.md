---
id: spans
title: Span Analytics and Queries
description: Learn how to use the Spans page to explore your span data.
---

Sumo Logic Span Analytics enables you to filter and aggregate trace data at the raw span level, providing insights into the performance and behavior of your application services.  

With its intuitive interface, Span Analytics allows you to:  
* Filter and inspect tracing data in detail.  
* Explore span metadata through a structured facets list.  
* Aggregate by any custom dimension or tag to generate charts and tables.  

To access span analytics:

* [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Go to the **Home** screen and click **Traces**. In the new page, click the **Traces** dropdown menu and select **Span Analytics**.
* [**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu, select **Observability**, and then under **Application Monitoring**, select **Span Analytics**. You can also click the **Go To...** menu at the top of the screen and select **Span Analytics**.

A new **Spans** page opens. Data is displayed once you run a query.

![Spans page](/img/apm/spans-page.png)

From here, you can filter and aggregate by any standard or custom span attribute (tag) and create charts to visualize results. If you find something interesting, you can quickly explore your raw span records in the **Messages** tab.

For more advanced use cases, you can further enhance your query by clicking the [Open in Search](#open-in-search) button, which opens a new Log Search of your spans based on your query. Here, you can use [Search Query Language](/docs/apm/traces/search-query-language-support-for-traces) to investigate further.

:::note
Tracing must be enabled in your account to use this functionality. Contact your account team if the only thing you see is an infographic.
:::

import Iframe from 'react-iframe';

:::sumo Micro Lesson

This micro lesson provides an overview of Span Analytics, and describes the term *span* in the distributed tracing and the benefits of Span Analytics. It also explains how to perform Span Analytics in Sumo Logic UI.

<Iframe url="https://fast.wistia.net/embed/iframe/t2q0n8etid?web_component=true&seo=true&videoFoam=false"
  width="854px"
  height="480px"
  title="Micro Lesson: Span Analytics Video"
  id="wistiaVideo"
  className="video-container"
  display="initial"
  position="relative"
  allow="autoplay; fullscreen"
  allowfullscreen
/>

<!-- old
<Iframe url="https://www.youtube.com/embed/2cp_0pmzD-A"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />
-->

:::


## Spans query

You can build a spans query using the provided input fields. By default, you'll see an input for **Filters** and **Visualize**.

![blank spans query](/img/apm/spans-query-blank.png)

Once you click the text area of an input field, you'll get a dropdown menu that provides the available options detected from your data. You can manually type into these input fields or select from the dropdown of available options.

![dropdown for spans filter](/img/apm/dropdown-for-spans-filter.png)

### Filters

**Filters** narrow the scope of the query. Enter metadata values that match the data you want to search. You can add multiple filters to focus on specific data.

:::note
Each trace includes up to 10,000 spans to better support monitoring for long-running and complex transactions. New spans can increase credits consumption.
:::

### Visualize your data

Aggregating raw spans helps you gain deeper insights by selecting the subject you want to visualize and the type of aggregation to apply.

The **Visualize** option determines how to aggregate the filtered data. The default aggregation methods are:

* **count**. Counts the occurrences of the selected field. Typically, you’ll count spans to see how many fall into a particular category. You can also count distinct values of other fields, such as IP addresses or pods.
* **duration**. Conducts the [sum](/docs/search/search-query-language/group-aggregate-operators/sum), [average](/docs/search/search-query-language/group-aggregate-operators/avg), [minimum](/docs/search/search-query-language/group-aggregate-operators/min-max), [maximum](/docs/search/search-query-language/group-aggregate-operators/min-max), or [percentile](/docs/search/search-query-language/group-aggregate-operators/pct-percentile) of the span duration metric.

You can use custom numeric metrics from your data by entering the name of the span tag field that contains a metric.

You can visualize multiple metrics simultaneously.

### Group and limit results

If you define **Visualize**, an option to set **Group By** appears, allowing you to organize aggregated results grouped by time or other fields.
* To display a time series, you need to Group By time and select the granularity.
* If you prefer aggregated data without a time dimension, select relevant fields for Group By.
* You can group by both time and other fields simultaneously to create a stacked bar time series.

If you define **Group By**, you'll see another option to set a **Limit** value. This allows you to reduce the number of results by an order.

![spans query](/img/apm/spans-query.png)

:::note
When you run a query using **Visualize** and/or **Group By**, the results tab automatically switches to **Aggregates**.
:::

### Set time range

You set the time range of the query at the top right of the Spans page, above the search button. Tracing data retention in `_trace_spans` index is the same as default log index retention. See [Time Range Expressions](/docs/search/get-started-with-search/search-basics/time-range-expressions) for details.  

![spans time range](/img/apm/spans-time-range.png)

### Run query

Once you have defined your spans query, with filters and aggregation if desired, click the search button to run the search. It looks like the following:  

![spans search button](/img/apm/spans-search-button.png)

You can pause or stop your search by clicking the appropriate icons below the search button.  

![pause or stop spans query](/img/apm/pause-or-stop-spans-query.png)

## Search results

**Messages** (including **Facets**) are always provided to show you the raw output of your query. You will have **Aggregates** if your query has set the **Visualize** option.

### Messages tab

The **Messages** table shows your raw span data. You can click on any row to open a right-side Details pane (similar to the one in [Trace View](/docs/apm/traces/view-and-investigate-traces)) showing span details and options to navigate to other parts of the system from there.

![messages results](/img/apm/spans-messages-results.png)

* To move a column left or right, hold click and drag it to a different location in the table.
* To adjust column width, click and drag the vertical line in between the columns.<br/> ![resize column](/img/search/get-started-search/search-page/resize-column.png)
* To reset column width to the default size, double-click the vertical line to the right of a column name.

#### Facets

The **Facets** panel provides a list of all the metadata fields returned from your search results and allows you to show or hide fields from the results table.

The content of the Facets panel is affected by your current active filters and time range, but shows any found metadata tag (span attribute) with its top 10 values, including any custom tags you may [add to your data](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/java/custom-tags-configuration). By default, the fields used in the query are shown in the Messages table.

![Facets expanded](/img/apm/facets-expanded.png)

* You can adjust which fields are displayed in the raw span messages table by checking or unchecking the box next to the field in the Facets panel.
* Use the search field to easily find the metadata from your data. This applies the filter to both tag names and their values.
* The number of values found for each is displayed for your reference.
* Add and remove fields from your query by hovering over a field and clicking.  

![facets add to query](/img/apm/facets-add-to-query.png)

### Aggregates tab

The **Aggregates** tab shows your data charted. See Panels from Dashboard for details on the settings. However, note that not all settings will be available on the Spans page. The interface will only show you available settings.

![spans-aggregates-visualize](/img/apm/spans-aggregates-visualize.png)

#### Add to Dashboard

You can add to a dashboard as long as your total dashboard-originated `_trace_spans` read volume does not exceed 200x of your tracing ingest. Contact your Sumo Logic representative for paid subscription service options for volume requirements exceeding 200x of your tracing ingest.

To add your aggregated span data to a dashboard:

1. Click the three-dot kebab menu icon and select **Add to Dashboard**.<br/>  ![add-to-dashboard-spans](/img/apm/spans-add-to-dashboard.png)
1. In the **Add Panel to Dashboard** window, provide a **Panel Title** and enter an existing **Dashboard** name or add to a newly created a new one, as seen in this screenshot.<br/> ![span-dashboard](/img/apm/span-dashboard.png)
1. When you're done assigning the panel to a dashboard, click **Add**.

#### Open in Search

To further enhance your query, you can use the [Search Query Language](/docs/apm/traces/search-query-language-support-for-traces) for more advanced use cases by opening a Search of your spans. Click the three-dot kebab menu icon and select **Open in Search**.  

![span-open-in-search](/img/apm/span-open-in-search.png)

### Examples

#### Compare performance of different release versions

To compare the performance of different release versions defined by a custom tag `assemblyVersion`, you can graph the 95th percentile of latency of a microservice in the function of time by version.

Use the **filters** or **facets** features to find the appropriate service in the dropdown and select it. Next, select to visualize duration’s 95th percentile and pick a group by time. For example, 1-minute granularity and the `assemblyVersion` custom tag that carries version information. That’s it!

![service percentile by time](/img/apm/service-percentile-by-time.png)

You can customize your chart by picking different visualization types and colors.

#### Find HTTP errors distribution

Next, let’s see how to find the distribution of different HTTP errors among our services. Not as a time series, just a pie chart to find which service and status codes are most common.

Here is the simple query we used to visualize that data:

![status codes spans example](/img/apm/spans-status-codes-example.png)

It’s now easier than ever to drill down into the information you care about. Note that our query only includes spans with codes from 4xx and 5xx ranges and visualizes the count of such spans, broken down by two dimensions, service and status code. Easy!

The number of cases you can realize with this is unlimited. In addition to the above examples, you can aggregate and visualize the content of custom metrics in your spans, and filter and break them down by any field, including custom tags. These can all be presented in any of the available chart visualizations.

To further customize your query, click [Open in Search](#open-in-search) to edit. Spans makes it a great place to start queries in a way that still allows further technical refinement. Especially if you try to solve a use case that requires more than the current functionality of the Spans page, such as the following:

1. A stacked time-series chart with more than two non-time dimensions. You can only set **Group By** to **Time** and a single dimension.
1. Visualize multiple series with more than one count operation.
1. Use `OR` operations in filters. Filters are concatenated using `AND` logic.
1. Use mathematical operations between metrics.
