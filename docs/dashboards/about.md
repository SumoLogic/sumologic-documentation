---
id: about
title: About Dashboard
sidebar_label: About Dashboard
description: Learn the benefits of Dashboard and how it seamlessly integrates log, metric, and trace data.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/dashboards-new/about-dashboard-new/dashboards-new.png')} alt="icon" width="50"/>

Dashboard allows you to analyze metric and log data on the same dashboard, in a streamlined user experience. This is exactly what you need to effectively monitor and manage a Kubernetes environment.

Sumo Logic classic [Dashboards](/docs/dashboards) are still available. Now, you have two dashboard options. This page outlines the key differences between the classic Dashboard platform and Dashboard, and outlines recommended [best practices](#best-practices) for when to use each. 

Dashboards are a critical tool for monitoring and troubleshooting modern applications, allowing you to quickly navigate through your data without having to learn a query language. Graphs and data mappings provide visual representations of data that enable you to quickly identify and resolve key issues.

## What's great about Dashboard 

Dashboard provides the unique ability to display metrics metadata and logs data on the same dashboard in an integrated seamless view. This gives you control over the visual display of metric data as well as log data. Dashboard streamlines dashboard configuration and on-the-fly analytic visualizations with its new templating features. 

[Template variables](filter-template-variables.md) allow you to filter dashboard data dynamically to generate new visualizations for intuitive chart creation and data scoping.


### Feature differences between Classic Dashboard and Dashboard

:::tip
See [Migrate to Dashboards](/docs/dashboards/dashboards-migration).
:::

* Dashboard template variables differ slightly from the filters in classic Dashboards. Filters were auto injected at runtime by Sumo Logic, allowing you little control over how they were used or what they represented. In addition, filters only worked on log panels. Dashboard template variables provide full replacement control over what is inserted, and the variables work across both log and metric panels.
* Dashboard provides a dashboard-first view to build, maintain, and interact with dashboards. With Dashboard you can build panels inside the dashboard rather than adding panels from the Search or Metrics pages.
* Dashboard utilizes the [metrics query builder] with an improved full text auto-complete capabilities, so you can quickly find the metrics you are looking for.

The following table shows the availability of features for classic
Dashboards and Dashboard.

| Feature | Classic |Dashboard|
| :-- | :-- | :-- |
| Filtering a Dashboard | Filters | [Template Variable Based Filters](/docs/dashboards/filter-template-variables/) with greater control on filter values, data type, and acceptable input. |
| Adding Queries to Dashboards | Add a Panel from Search or Metrics | Add a panel from Search or Metrics<br/>Ability to [add panels inline](/docs/dashboards/filter-template-variables/) through Add a Panel button |
| Log Visualizations | Area Bar Box Plot<br/>Bubble is not supported<br/>Column<br/>Honeycomb is not supported<br/>Line<br/>Map - Cluster Map<br/>Pie<br/>Sankey Diagram<br/>Scatter is not supported<br/>Single Value<br/>Table | [Area](/docs/dashboards/panels/area-charts/)<br/>[Bar](/docs/dashboards/panels/bar-charts/)<br/>[Box Plot](/docs/dashboards/panels/box-plot-charts/)<br/>[Bubble](/docs/dashboards/panels/bubble-charts/)<br/>[Cluster Map](/docs/dashboards/panels/map-charts/)<br/>[Column](/docs/dashboards/panels/column-charts/)<br/>[Combo](/docs/dashboards/panels/combo-charts/)<br/>Connection Map<br/>[Funnel](/docs/metrics/metrics-queries/funnel-chart/)<br/>[Geo Heat Map](/docs/dashboards/panels/map-charts/)<br/>[Heat Map](/docs/metrics/metrics-queries/heat-map/)<br/>Honeycomb<br/>[Line](/docs/dashboards/panels/line-charts/)<br/>[Pie](/docs/dashboards/panels/pie-charts/)<br/>[Sankey Diagram](/docs/dashboards/panels/sankey-charts/)<br/>[Scatter](/docs/dashboards/panels/scatter-charts/)<br/>[Single Value](/docs/dashboards/panels/single-value-charts/)<br/>[Table](/docs/dashboards/panels/table-charts/) |
| Metric Visualizations | Area<br/>Line<br/>Single Value |  [Area](/docs/dashboards/panels/area-charts/)<br/>[Bar](/docs/dashboards/panels/bar-charts/)<br/>[Box Plot](/docs/dashboards/panels/box-plot-charts/)<br/>[Bubble](/docs/dashboards/panels/bubble-charts/)<br/>[Cluster Map](/docs/dashboards/panels/map-charts/)<br/>[Column](/docs/dashboards/panels/column-charts/)<br/>[Combo](/docs/dashboards/panels/combo-charts/)<br/>Connection Map<br/>[Funnel](/docs/metrics/metrics-queries/funnel-chart/)<br/>[Geo Heat Map](/docs/dashboards/panels/map-charts/)<br/>[Heat Map](/docs/metrics/metrics-queries/heat-map/)<br/>Honeycomb<br/>[Line](/docs/dashboards/panels/line-charts/)<br/>[Pie](/docs/dashboards/panels/pie-charts/)<br/>[Sankey Diagram](/docs/dashboards/panels/sankey-charts/)<br/>[Scatter](/docs/dashboards/panels/scatter-charts/)<br/>[Single Value](/docs/dashboards/panels/single-value-charts/)<br/>[Table](/docs/dashboards/panels/table-charts/) |
| Text Panel | Supported | [Supported](/docs/dashboards/panels/markdown-syntax/) |
| Real Time Dashboarding | Live Mode | [Auto Refresh](/docs/dashboards/about/#auto-refresh) |
| Dashboards as Wall Monitors | Public Dashboards<br/>Whitelisting<br/>Dashboard Pop-Out | Public Dashboards<br/>Whitelisting |
| Dashboard Sharing with Variables and Time Range preserved | Supported | [Supported](/docs/dashboards/share-dashboard-new/) |
| Dashboard Content Item Sharing | Supported | [Supported](/docs/dashboards/share-dashboard-new/#sharing-a-dashboard-within-your-organization) |
| Run As Creator / Data Access Level Control | Supported | Supported |
| Dark Theme | Supported | [Supported](/docs/dashboards/about/#dark-theme) |
| Configured Dashboard Linking | Supported | [Supported](/docs/dashboards/link-dashboards/) |
| Recommended Dashboards & Logs Drilldowns | Not supported | Supported by clicking on data points or slices/sections of pie charts, bar charts, column charts, area charts, and line charts. [Learn more](/docs/dashboards/drill-down-to-discover-root-causes).|
| Combined Metrics & Logs Panel | Not supported | Supported. See how to [overlay logs and metrics in a panel](/docs/dashboards/faq#how-do-i-overlay-logs-and-metrics-on-one-panel). |
| Styling Queries and Series | 	Ability to style through settings on the search page.<br/>Can not set color per time series or query.<br/>Restricted ability to override displays. | Ability to style through display overrides inside the panel settings.<br/>Ability to set the color per query/series.<br/>Multiple layers of expressiveness for display overrides.<br/>For details, see how to [modify a chart](/docs/dashboards/panels/modify-chart/). |
| Colors by Value Range | Supported | Supported |
| Export to PDF/PNG/JSON File | Not supported | [Supported](/docs/dashboards/export-dashboard-new/) |
| Scheduled Dashboard Report | Not supported | [Supported](/docs/dashboards/scheduled-report/) |
| Link Dashboard to Explore | Not supported | [Supported](/docs/dashboards/link-dashboards/#link-a-dashboard-new-to-explore) |
| Locate Deviations in a Time Series | Not supported | [Supported](/docs/dashboards/locate-deviations-time-series/) |
| Longer Time Range Queries | Not supported | [Supported](/docs/dashboards/set-custom-time-ranges/) |

## Restricted Operators in Dashboard

The following operators can't be used with Dashboard:

* Details
* LogReduce
* LogCompare
* Parse multi
* Save
* Transaction

:::note
Live mode restrictions do not apply to Dashboard. 
:::

## Limitations

* A panel can have up to 6 logs and 6 metrics queries.
* Joining log queries in a separate query is not supported. See how to [join metric queries](/docs/metrics/metrics-queries/metrics-explorer) for details on how this works.
* A Dashboard can have up to 100 queries.
* Dashboard chart properties are not retained when viewed from the Search page.
* Chart properties are not retained when a chart is added to a Dashboard from the Search page.

## Rules

* Auto Refresh applies to the whole dashboard, you can't configure it by panel.
* If there are two or more queries in a panel, the refresh interval for the panel is set to the maximum supported interval.
* Panels with an [absolute time range](/docs/search/get-started-with-search/search-basics/time-range-expressions) are not supported.
* If the requested refresh interval is not possible, you'll get an error message indicating the actual refresh rate is slower than requested. This can be due to one of the following reasons:
   * The time range is too long to refresh at this rate. Reduce the time range to allow a faster refresh interval.
   * An operator is not supported at this refresh interval.
   * The number of grouped elements is too large for the requested interval.

## Auto Refresh

Your dashboard can automatically refresh its panels to the latest information. You have the ability to configure the refresh interval rate by clicking the dropdown arrow next to the refresh icon.

![auto refresh dropdown options.png](/img/dashboards-new/about-dashboard-new/auto-refresh-dropdown-options.png)

A list of the refresh interval rates is provided for you to select from.

![dashboard new refresh interval options.png](/img/dashboards-new/about-dashboard-new/dashboard-new-refresh-interval-options.png)


## Dark Theme

Dashboards have two themes available: Light mode (which is the default) and Dark mode. You can toggle between the two themes within the dashboard by clicking the three-dot icon. The following image shows the option to **Switch to Dark Theme**.

![dark theme switch](/img/dashboards-new/about-dashboard-new/dark-theme-switch.png)

## Clickable Legend

If you want to focus on one item in your chart you can simply click on the item in the legend. If you want to toggle just one legend item, just hold the **shift** key and then click the item.

![clicklegend.gif](/img/dashboards-new/about-dashboard-new/clicklegend.gif)

## Monitoring with classic Dashboards

If you want to monitor your environment and display dashboards on a monitor or television screen, use the classic Dashboards. Currently, we don't have monitor support for the Dashboard framework. We hope to support monitoring across both dashboard frameworks in the near future.

## Troubleshooting with Dashboard

If you want to interact with dashboards to actively troubleshoot problems, Dashboard is the best framework, depending on the type of data you will be analyzing. There are use cases where a combination of the two dashboards are recommended:

* Use Dashboard if you are building a metrics first dashboard, for the extensive visualization options and variable support for metrics panels.
* Use classic Dashboards if you are building a logs-first dashboard, for options that provide the most robust results.
   * You can build logs panels in Dashboard. However, all of the log building pieces you have with classic Dashboards will not be available with Dashboard. Raw messages, output, and facets are not yet available for Logs with Dashboard. However, you can add to a dashboard from the search page with Dashboard, if needed.
* Use Dashboard for advanced pivots, such as contextual drill-downs to logs from panels, as these features are not available in the existing classic Dashboards.
