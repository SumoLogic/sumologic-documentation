---
id: about
title: About Dashboard
sidebar_label: About Dashboard
description: Learn the benefits of Dashboard and how it seamlessly integrates log, metric, and trace data.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/dashboards/about-dashboard/dashboards.png')} alt="icon" width="50"/>

Dashboard allows you to analyze metric and log data on the same dashboard, in a streamlined user experience. This is exactly what you need to effectively monitor and manage a Kubernetes environment.

Dashboards are a critical tool for monitoring and troubleshooting modern applications, allowing you to quickly navigate through your data without having to learn a query language. Graphs and data mappings provide visual representations of data that enable you to quickly identify and resolve key issues.

## What's great about Dashboard 

Dashboard provides the unique ability to display metrics metadata and logs data on the same dashboard in an integrated seamless view. This gives you control over the visual display of metric data as well as log data. Dashboard streamlines dashboard configuration and on-the-fly analytic visualizations with its new templating features. 

[Template variables](filter-template-variables.md) allow you to filter dashboard data dynamically to generate new visualizations for intuitive chart creation and data scoping.

### Features

:::tip
See [Migrate to Dashboards](/docs/dashboards/dashboards-migration).
:::

* Dashboard template variables provide full replacement control over what is inserted, and the variables work across both log and metric panels.
* Dashboard provides a dashboard-first view to build, maintain, and interact with dashboards. With Dashboard you can build panels inside the dashboard rather than adding panels from the Search or Metrics pages.
* Dashboard utilizes the [Metrics Explorer](/docs/metrics/metrics-queries/metrics-explorer/) with full text auto-complete capabilities, so you can quickly find the metrics you are looking for.

The following table shows the availability of features for Dashboard.

| Feature |Dashboard|
| :-- | :-- |
| Filtering a Dashboard | [Template Variable Based Filters](/docs/dashboards/filter-template-variables/) with greater control on filter values, data type, and acceptable input. |
| Adding Queries to Dashboards | Add a panel from Search or Metrics<br/>Ability to [add panels inline](/docs/dashboards/filter-template-variables/) through Add a Panel button |
| Log Visualizations | [Area](/docs/dashboards/panels/area-charts/)<br/>[Bar](/docs/dashboards/panels/bar-charts/)<br/>[Box Plot](/docs/dashboards/panels/box-plot-charts/)<br/>[Bubble](/docs/dashboards/panels/bubble-charts/)<br/>[Cluster Map](/docs/dashboards/panels/map-charts/)<br/>[Column](/docs/dashboards/panels/column-charts/)<br/>[Combo](/docs/dashboards/panels/combo-charts/)<br/>Connection Map<br/>[Funnel](/docs/metrics/metrics-queries/funnel-chart/)<br/>[Geo Heat Map](/docs/dashboards/panels/map-charts/)<br/>[Heat Map](/docs/metrics/metrics-queries/heat-map/)<br/>Honeycomb<br/>[Line](/docs/dashboards/panels/line-charts/)<br/>[Pie](/docs/dashboards/panels/pie-charts/)<br/>[Sankey Diagram](/docs/dashboards/panels/sankey-charts/)<br/>[Scatter](/docs/dashboards/panels/scatter-charts/)<br/>[Single Value](/docs/dashboards/panels/single-value-charts/)<br/>[Table](/docs/dashboards/panels/table-charts/) |
| Metric Visualizations |  [Area](/docs/dashboards/panels/area-charts/)<br/>[Bar](/docs/dashboards/panels/bar-charts/)<br/>[Box Plot](/docs/dashboards/panels/box-plot-charts/)<br/>[Bubble](/docs/dashboards/panels/bubble-charts/)<br/>[Cluster Map](/docs/dashboards/panels/map-charts/)<br/>[Column](/docs/dashboards/panels/column-charts/)<br/>[Combo](/docs/dashboards/panels/combo-charts/)<br/>Connection Map<br/>[Funnel](/docs/metrics/metrics-queries/funnel-chart/)<br/>[Geo Heat Map](/docs/dashboards/panels/map-charts/)<br/>[Heat Map](/docs/metrics/metrics-queries/heat-map/)<br/>Honeycomb<br/>[Line](/docs/dashboards/panels/line-charts/)<br/>[Pie](/docs/dashboards/panels/pie-charts/)<br/>[Sankey Diagram](/docs/dashboards/panels/sankey-charts/)<br/>[Scatter](/docs/dashboards/panels/scatter-charts/)<br/>[Single Value](/docs/dashboards/panels/single-value-charts/)<br/>[Table](/docs/dashboards/panels/table-charts/) |
| Text Panel | [Supported](/docs/dashboards/panels/markdown-syntax/) |
| Real Time Dashboarding | [Auto Refresh](/docs/dashboards/about/#auto-refresh) |
| Dashboards as Wall Monitors | Public Dashboards<br/>Whitelisting |
| Dashboard Sharing with Variables and Time Range preserved | [Supported](/docs/dashboards/share-dashboard-new/) |
| Dashboard Content Item Sharing | [Supported](/docs/dashboards/share-dashboard-new/#sharing-a-dashboard-within-your-organization) |
| Run As Creator / Data Access Level Control | Supported |
| Dark Theme | [Supported](/docs/dashboards/about/#dark-theme) |
| Configured Dashboard Linking | [Supported](/docs/dashboards/link-dashboards/) |
| Recommended Dashboards & Logs Drilldowns | Supported by clicking on data points or slices/sections of pie charts, bar charts, column charts, area charts, and line charts. [Learn more](/docs/dashboards/drill-down-to-discover-root-causes).|
| Combined Metrics & Logs Panel | Supported. See how to [overlay logs and metrics in a panel](/docs/dashboards/faq#how-do-i-overlay-logs-and-metrics-on-one-panel). |
| Styling Queries and Series |  Ability to style through display overrides inside the panel settings.<br/>Ability to set the color per query/series.<br/>Multiple layers of expressiveness for display overrides.<br/>For details, see how to [modify a chart](/docs/dashboards/panels/modify-chart/). |
| Colors by Value Range  | Supported |
| Export to PDF/PNG/JSON File | [Supported](/docs/dashboards/export-dashboard-new/) |
| Scheduled Dashboard Report | [Supported](/docs/dashboards/scheduled-report/) |
| Link Dashboard to Your Stack | [Supported](/docs/dashboards/link-dashboards/#link-a-custom-dashboard-to-your-stack) |
| Locate Deviations in a Time Series |[Supported](/docs/dashboards/locate-deviations-time-series/) |
| Longer Time Range Queries | [Supported](/docs/dashboards/set-custom-time-ranges/) |

## Restricted Operators in Dashboard

The following operators cannot be used with Dashboard:

* Details
* LogReduce
* LogCompare
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
* Dashboard queries cannot return more than 1440 data points.

## Rules

* Auto Refresh applies to the whole dashboard, you cannot configure it by panel.
* If there are two or more queries in a panel, the refresh interval for the panel is set to the maximum supported interval.
* If the requested refresh interval is not possible, you'll get an error message indicating the actual refresh rate is slower than requested. This can be due to one of the following reasons:
   * The time range is too long to refresh at this rate. Reduce the time range to allow a faster refresh interval.
   * An operator is not supported at this refresh interval.
   * The number of grouped elements is too large for the requested interval.

## Auto Refresh

Your dashboard can automatically refresh its panels to the latest information. You have the ability to configure the refresh interval rate by clicking the dropdown arrow next to the refresh icon.

There are some restrictions when using operators with dashboards. To learn more, see [Restricted Operators in Dashboards](/docs/dashboards/restricted-operators-dashboards).<br/><img src={useBaseUrl('/img/dashboards/about-dashboard/auto-refresh-dropdown-options.png')} alt="auto refresh dropdown options" style={{border: '1px solid gray'}} width="200" />
<br/>A list of the refresh interval rates is provided for you to select from.<br/><img src={useBaseUrl('/img/dashboards/about-dashboard/dashboard-new-refresh-interval-options.png')} alt="dashboard new refresh interval options" style={{border: '1px solid gray'}} width="100" />

## Dark Theme

Dashboards have two themes available: Light mode (which is the default) and Dark mode. You can toggle between the two themes within the dashboard by clicking the three-dot kebab icon. The following image shows the option to **Switch to Dark Theme**.<br/><img src={useBaseUrl('/img/dashboards/about-dashboard/dark-theme-switch.png')} alt="dark theme switch" style={{border: '1px solid gray'}} width="700" />

## Clickable Legend

If you want to focus on one item in your chart you can simply click on the item in the legend. If you want to toggle just one legend item, just hold the **shift** key and then click the item.<br/><img src={useBaseUrl('/img/dashboards/about-dashboard/clicklegend.gif')} alt="clicklegend" style={{border: '1px solid gray'}} width="700" />
