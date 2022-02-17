---
id: panels
---

# Panels

Panels are the building blocks used to create a dashboard. Each
panel displays analytics for a specific query. The type of panel you
choose to display your data depends on the type of query you want to
run.

Related topics:

-   [Delete a Panel](Panels/00Delete_a_Panel.md "Delete a Panel")
-   [Modify a Chart](Panels/modify-chart.md)
-   [Markdown Syntax](Panels/Markdown_Syntax.md "Markdown Syntax")

### Time Series Panel 

![time series panel.png](/img/dashboards-new/panels/time-series-panel.png)

Time series panels provide information on a series of data points
ordered in time. Typically, a time series is a sequence taken at
successive equally spaced points in time. Examples of time series
are CPU and Memory over time.

In a time series, time is often the independent variable and the goal is
usually to make a forecast for the future. Time series are frequently
plotted with area or line charts. 

These are best used for looking at statistics taken over time. Things
like CPU, Memory, and disk usage statistics fall into this category.

Time series panels accept aggregate fields with epoch values
(milliseconds since 1970).

Log queries can use the [timeslice
operator](../../05Search/Search-Query-Language/Search-Operators/timeslice.md "timeslice")
to provide a time series.

Available chart types:

-   [Area](Panels/Area_Charts.md "Area Charts")
-   [Bar](Panels/Bar_Charts.md "Bar Charts")
-   [Column](panels/column-charts.md "Column Charts")
-   [Line](panels/line-charts.md "Line Charts")
-   [Table](Panels/Table_Charts.md "Table Charts")

#### What is the difference between a categorical and time series panel?
\<div class="mt-contentreuse-widget"
page="Beta/Dashboard_(New)/Dashboard_(New)_FAQs"
section="What is the difference between a categorical and time series panel?"
show="false\>
\</di\>

### Categorical Panel

![categorical icon.png](/img/dashboards-new/panels/categorical-icon.png)

Categorical panels provide information on the number of occurrences
(frequency) of distinct values. Categorical frequencies are typically
shown in pie, table, and column charts. 

These are best used to understand the distribution of data by
categories. For example, understanding the number of CPUs used
by machine type, or the number of requests handled by a pod.

Available chart types:

-   [Area](Panels/Area_Charts.md "Area Charts")
-   [Bar](Panels/Bar_Charts.md "Bar Charts")
-   [Bubble](panels/bubble-charts.md "Bubble Charts")
-   [Column](panels/column-charts.md "Column Charts")
-   [Pie](panels/pie-charts.md "Pie Charts")
-   [Scatter](panels/scatter-charts.md "Scatter Charts")
-   [Table](Panels/Table_Charts.md "Table Charts")

The following image shows an example of Scatter and Bubble charts.  
![scatter and bubble
charts.png](/img/dashboards-new/panels/scatter-and-bubble-charts.png)

### Single Value Panel

![single value
panel.png](/img/dashboards-new/panels/single-value-panel.png)

Single Value Panels are great at providing high level overviews. They
look great on executive dashboards and can provide at-a-glance
information to help decide where to inspect and troubleshoot further.

Only [single value
charts](panels/single-value-charts.md "Single Value Charts") are
supported.

![single value
charts.png](/img/dashboards-new/panels/single-value-charts.png)

### Honeycomb Panel

![honeycomb panel.png](/img/dashboards-new/panels/honeycomb-panel.png)

Honeycombs are great at helping you find areas of significant activity
amongst a set of entities, like hotspots in a cluster. These are ideal
if you want to find the instance running high CPU usage amongst all the
instances in your cluster.

![honeycomb charts.png](/img/dashboards-new/panels/honeycomb-charts.png)

### Map Panel

![map panel.png](/img/dashboards-new/panels/map-panel.png)

Maps identify where requests are coming from. These are ideal for
[geolocation](../../05Search/Search-Query-Language/Search-Operators/Geo-Lookup.md "Geo Lookup (Map)")
data.

You may not see map panels render if hardware acceleration is disabled
on your browser.

Only [map charts](panels/map-charts.md "Map Charts") are supported.

![new map charts.png](/img/dashboards-new/panels/new-map-charts.png)

### Text Panel

![text panel.png](/img/dashboards-new/panels/text-panel.png)

Text can clarify what you're showing on dashboards or act as a note to
your viewer. Text panels provide the flexibility to display descriptive
text in or above other panels.

Titles are displayed in the same size and font. Text is styled using
Markdown syntax, meaning that you can control the size and weight of the
text. Not all Markdown syntax options are supported; see [Markdown
Syntax](Panels/Markdown_Syntax.md "Markdown Syntax").

There's no limit to the number of Text Panels you can add to Dashboards.
These types of Panels do not count against the quota in Sumo Logic Free
accounts.

**To add a Text Panel:**

1.  With the Dashboard open, click the **Add Panel** button.  
    ![add panel.png](/img/dashboards-new/panels/add-panel.png)
2.  Choose **Text **as the Panel Type**.** 
3.  The **Text Editor** and **Visual Settings** are displayed.  
    ![Display options.png](/img/dashboards-new/panels/Display-options.png)
    1.  Input your **Text** or **Markdown** syntax in the **Text
        Editor** pane. See [Markdown
        Syntax](Panels/Markdown_Syntax.md "Markdown Syntax") for details
        on what is supported.
    2.  The **Visual Settings** options allow you to adjust the font,
        colors, and alignment of your data.
    3.  A title is optional, you can toggle its visibility in
        the **Panel Details** covered in the next section.
4.  Next, to set a Title, select the **General** menu icon to open
    the **Panel Details** pane.  
    ![Panel details general
    icon.png](/img/dashboards-new/panels/Panel-details-general-icon.png)
    -   A title is optional. Use the toggle switch labeled **Show
        Title** to set if the title is displayed. If desired, enter a
        title and set the font size.
5.  The **Panel Preview** section displays your text panel based on your
    settings.  
    ![Text Panel
    preview.png](/img/dashboards-new/panels/Text-Panel-preview.png)
6.  When you're done click **Add to Dashboard** at the top of the
    window.  
    ![Add to Dashboard button.png](/img/dashboards-new/panels/Add-to-Dashboard-button.png)

##### Add links to text panels

Text panels can provide links to URLs or other Dashboards with markdown
syntax. To create a link to a URL, surround your linked text with square
brackets `[]`, then add your URL in parenthesis `()`, as shown.

To add a link to a Panel in order to drill down to another Dashboard,
see [Add Dashboard
Link](../Dashboards/Get-Started-with-Dashboards-and-Panels/Add-a-Dashboard-Link.md "Add Dashboard Link").

##### Syntax

\[\<Text\>\](\<URL\>)

![link syntax example Jan
2021.png](/img/dashboards-new/panels/link-syntax-example-Jan-2021.png)

In the panel, the link is displayed. 

#### Service Map Panel

![icon-service-map.png](/img/dashboards-new/panels/icon-service-map.png)

The [Service
Map](../../Traces/Service_Map_and_Dashboards.md "Service Map and Dashboards")
is a high-level view of your application environment, giving you a
greater view and understanding of your application architecture and
dependencies between monitored microservices.

The panel gives you a fully functioning map to zoom in and out and move
through services. The size and color of application entities shows
status and activity. Click on a service to open the Entity Inspector to
drill down to traces, metrics, and the service dashboard.

You can filter the map according to application and service. See the
[Dashboard (New)](Panels/...md "Dashboard (New)") guide for additional
information and options to create panels, configure filters, create and
filter with template variables from dashboard headers, and more.

![panel-service.png](/img/dashboards-new/panels/panel-service.png)

**To add a Service Map panel:**

1.  With the Dashboard open, click the **Add Panel** button and
    select **Service Map**.   
    ![add-servicemap.png](/img/dashboards-new/panels/add-servicemap.png)  
    A panel configuration page opens.  
    ![create-servicemap.png](/img/dashboards-new/panels/create-servicemap.png)

2.  Select from the drop-down menus to filter the Service Map by the
    following:  
    ![filter-servicemap.png](/img/dashboards-new/panels/../../../Traces/Service_Map_and_Dashboards/filter-servicemap.png)
    -   **Application** if your tracing data has the
        `application=[app-name]` tag
    -   **Service** 
    -   To pass the variables from dashboard filters, set
        `application={{application}}` and/or `service={{service}}`

3.  Do not set the time. Service Map always shows last 72h of data.

4.  The **Chart Type** is set to Graph.

5.  Click the **General** tab to edit the Panel Details. Enter a name
    for the panel, set a **Title Font Size**, and add a short
    **Description**.  
    ![](/)![tracelist-details.png](/img/dashboards-new/panels/../../../Traces/Service_Map_and_Dashboards/tracelist-details.png)

6.  Click **Add to Dashboard**. 

#### Trace List Panel

![icon-trace-list.png](/img/dashboards-new/panels/icon-trace-list.png)

Transaction tracing captures and tracks distributed business workflows,
by enriching and analyzing traces, logs, and metrics in real-time with
automated generated application topology. Each trace provides details on
root service, when it occurred and how long, the number of
[spans](../../Traces/Spans.md "Spans"), and a breakdown of services. The
panel panel displays the [Traces
page](../../Traces/View_and_investigate_traces.md "View and investigate traces")
table to give at-a-glance tracking for traces through your Dashboard. To
view transaction and service details, click a trace from the panel to
open the [Trace
View](../../Traces/View_and_investigate_traces.md "View and investigate traces"). 

See the [Dashboard (New)](Panels/...md "Dashboard (New)") guide for
additional information and options to create panels, configure filters,
create and filter with template variables from dashboard headers, and
more.

You are limited to 3 Trace List panels in a dashboard.

![panel-trace.png](/img/dashboards-new/panels/panel-trace.png)

**To add a Trace List panel:**

1.  With the Dashboard open, click the **Add Panel** button.   
    ![add-tracelist.png](/img/dashboards-new/panels/../../../Traces/Service_Map_and_Dashboards/add-tracelist.png)  
    A panel configuration page opens.  
    ![create-tracelist.png](/img/dashboards-new/panels/create-tracelist.png)

2.  Configure a [Trace
    query](../../Traces/View_and_investigate_traces.md "View and investigate traces")
    to search for desired set of traces. 

3.  Select a time range or [create a custom
    range](Set_custom_time_ranges.md "Set customized time ranges") for
    the panel. You can set this when creating or at any time when
    viewing the Dashboard panel.  
    ![timerange.png](/img/dashboards-new/panels/timerange.png)

4.  The **Chart Type** is set to Table.

5.  Enter the **Rows Per Page** for the panel, between 5 to 100. The
    default amount is 15. The panel automatically paginates traces to
    browse through and view all traces.

6.  Select the Table columns of trace data to load in the panel:

[TABLE]

8.  Click the **General** tab to edit the Panel Details. Enter a name
    for the panel, set a **Title Font Size**, and add a short
    **Description**.  
    ![](/)![tracelist-details.png](/img/dashboards-new/panels/../../../Traces/Service_Map_and_Dashboards/tracelist-details.png)

9.  Click **Add to Dashboard**. 
