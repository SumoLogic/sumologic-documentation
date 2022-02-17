---
id: about-dashboard-new
---

# About Dashboard (New)

Dashboard (New) allows you to analyze metric and log data on the same dashboard, in a streamlined user experience. This is exactly what you need to effectively monitor and manage a Kubernetes environment.

Sumo Logic classic [Dashboards](../Dashboards.md "Dashboards") are still available. Now, you have two dashboard options. This page outlines the key differences between the classic Dashboard platform and Dashboard (New), and outlines recommended [best practices](./About_Dashboard_(New).md "Sumo Logic's New Dashboard (Beta)") for when to use each. 

Dashboards are a critical tool for monitoring and troubleshooting modern applications, allowing you to quickly navigate through your data without having to learn a query language. Graphs and data mappings provide visual representations of data that enable you to quickly identify and resolve key issues.

## What's great about Dashboard (New) 

Dashboard (New) provides the unique ability to display metrics metadata and logs data on the same dashboard in an integrated seamless view. This gives you control over the visual display of metric data as well as log data. Dashboard (New) streamlines dashboard configuration and on-the-fly analytic visualizations with its new templating features. 

[Template variables](filter_with_template_variables.md) allow you to filter dashboard data dynamically to generate new visualizations for intuitive chart creation and data scoping.

## Key Differences

Dashboard (New) differs from classic Dashboards in the following ways:  

* Dashboard (New) template variables differ slightly from the filters in classic Dashboards. Filters were auto injected at runtime by Sumo Logic, allowing you little control over how they were used or what they represented. In addition, filters only worked on log panels. Dashboard (New) template variables provide full replacement control over what is inserted, and the variables work across both log and metric panels.
* Dashboard (New) provides a dashboard-first view to build, maintain, and interact with dashboards. With Dashboard (New) you can build panels inside the dashboard rather than adding panels from the Search or Metrics pages.
* Dashboard (New) utilizes the [metrics query builder] with an improved full text auto-complete capabilities, so you can quickly find the metrics you're looking for.

See the [feature differences table](./About_Dashboard_(New).md) for a
complete comparison.

## Restricted Operators in Dashboard (New)

The following operators can't be used with Dashboard (New):

* Details
* LogReduce
* LogCompare
* Parse multi
* Save
* Transaction

Live mode restrictions do not apply to Dashboard (New). 

## Limitations

* A panel can have up to 6 logs and 6 metrics queries.
* Joining log queries in a separate query is not supported. See how to [join metric queries](../../Metrics/Metric-Queries-and-Alerts/00Metrics_Explorer.md "Metrics Explorer") for details on how this works.
* A Dashboard (New) can have up to 100 queries.
* Dashboard (New) chart properties are not retained when viewed from the Search page.
* Chart properties are not retained when a chart is added to a Dashboard (New) from the Search page.

## Rules

* Auto Refresh applies to the whole dashboard, you cannot configure it by panel.
* If there are two or more queries in a panel, the refresh interval for the panel is set to the maximum supported interval.
* If the requested refresh interval is not possible, you will get an error message indicating the actual refresh rate is slower than requested. Reasons why the refresh interval is not possible are the following: 

  * The time range is too long to refresh at this rate. Reduce the time range to allow a faster refresh interval. 
  * An operator is not supported at this refresh interval. 
  * The number of grouped elements is too large for the requested interval.

## Auto Refresh

Your dashboard can automatically refresh its panels to the latest information. You have the ability to configure the refresh interval rate by clicking the dropdown arrow next to the refresh icon.

![auto refresh drowndown options.png](/img/dashboards-new/about-dashboard-new/auto-refresh-drowndown-options.png)

A list of the refresh interval rates is provided for you to select from.

![dashboard new refresh interval options.png](/img/dashboards-new/about-dashboard-new/dashboard-new-refresh-interval-options.png)

### Rules

* Auto Refresh applies to the whole dashboard, you cannot configure it by panel.
* If there are two or more queries in a panel, the refresh interval for the panel is set to the maximum supported interval.
* Panels with an [absolute time range](../../05Search/Get-Started-with-Search/Search-Basics/Time-Range-Expressions.md "Time Range Expressions") are not supported.
* If the requested refresh interval is not possible, you will get an error message indicating the actual refresh rate is slower than requested. The following are reasons why setting the refresh interval is not possible: 

  * The time range is too long to refresh at this rate. Reduce the time range to allow a faster refresh interval. 
  * An operator is not supported at this refresh interval. 
  * The number of grouped elements is too large for the requested interval.

## Dark Theme

Dashboards have two themes available: Light (which is the default) and Dark. You can toggle between the two themes within the dashboard by clicking the three-dot icon. The following image shows the option to **Switch to Dark Theme**.

![dark theme switch](/img/dashboards-new/about-dashboard-new/dark-theme-switch.png)

## Clickable Legend

If you want to focus on one item in your chart you can simply click on the item in the legend. If you want to toggle just one legend item, just hold the **shift** key and then click the item.

![clicklegend.gif](/img/dashboards-new/about-dashboard-new/clicklegend.gif)

## Best Practices

The Sumo Logic classic Dashboards and Dashboard (New) dashboards each have strengths. This section outlines the recommended use cases for each dashboard framework.

### Monitoring with classic Dashboards

If you want to monitor your environment and display dashboards on a monitor or television screen, use the classic Dashboards. Currently, we do not have monitor support for the Dashboard (New) framework. We hope to support monitoring across both dashboard frameworks in the near future.

#### Troubleshooting with Dashboard (New)

If you want to interact with dashboards to actively troubleshoot problems, Dashboard (New) is the best framework, depending on the type of data you will be analyzing. There are use cases where a combination
of the two dashboards are recommended:

* Use Dashboard (New) if you are building a metrics first dashboard, for the extensive visualization options and variable support for metrics panels.
* Use classic Dashboards if you are building a logs-first dashboard, for options that provide the most robust results.

    You can build logs panels in Dashboard (New). However, all of the log building pieces you have with classic Dashboards will not be available with Dashboard (New). Raw messages, output, and facets are not yet available for Logs with Dashboard (New). However, you can add to a dashboard from the search page with Dashboard (New), if needed.

* Use Dashboard (New) for advanced pivots, such as contextual drill-downs to logs from panels, as these features are not available in the existing classic Dashboards.

### Feature differences between Classic and Dashboard (New)

The following table shows the availability of features for classic
Dashboards and Dashboard (New).

| Feature | Classic | Dashboard (New) |
| -- | -- | -- |
| Filtering a Dashboard | Filters | Variables |
| Adding Queries to Dashboards | Add a Panel from Search or Metrics | Add a panel from Search or Metrics<br/>Ability to add panels inline through Add a Panel button |
| Log Visualizations | Area<br/>Bar<br/>Box Plot<br/>Bubble is not supported<br/>Column<br/>Honeycomb is not supported<br/>Line<br/>Map - Cluster Map<br/>Pie<br/>Sankey Diagram<br/>Scatter is not supported<br/>Single Value<br/>Table | Area<br/><br/>Bar<br/>Bubble<br/>Column<br/>Honeycomb<br/>Line<br/>Map - Heat Map/Cluster Map<br/>Pie<br/>Scatter<br/>Single Value<br/>Table |
| Metric Visualizations | Area<br/>Line<br/>Single Value | Area<br/>Bar<br/>Column<br/>Line<br/>Pie<br/>Single Value<br/>Table |
| Real Time Dashboarding | Live Mode | Not supported |
| Dashboards as Wall Monitors | Public Dashboards<br/>Whitelisting<br/>Dashboard Pop-Out | Not supported |
| Dashboard Sharing | Share with variables and time range preserved | Supported without variables and time range |
| Dashboard Content Item Sharing | Supported | Supported |
| Run As Creator / Data Access Level Control | Supported | Not supported |
| Dark Theme | Supported | Supported |
| Configured Dashboard Linking | Supported | Supported |
| Recommended Dashboards & Logs Drilldowns | Not supported | Supported by clicking on data points or slices/sections of pie charts, bar charts, column charts, area charts, and line charts. |
| Combined Metrics & Logs Panel | Not supported | Supported. See how to [overlay logs and metrics in a panel](dashboard-new-faqs.md#how-do-i-overlay-logs-and-metrics-on-one-panel). |
| Styling Queries and Series | 	Ability to style through settings on the search page.<br/>Can not set color per time series or query.<br/>Restricted ability to override displays. | Ability to style through display overrides inside the panel settings.<br/>Ability to set the color per query/series.<br/>Multiple layers of expressiveness for display overrides.<br/>For details, see how to modify a chart. |
| Colors by Value Range | Supported | Not supported |
