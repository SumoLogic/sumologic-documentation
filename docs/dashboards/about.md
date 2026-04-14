---
id: about
title: Dashboards Overview
sidebar_label: About Dashboard
description: Sumo Logic dashboards let you visualise log and metric data together in real time with template variable filters, auto-refresh, dark mode, drill-down, and scheduled email reports.
keywords:
  - dashboards
  - log-dashboard
  - metric-dashboard
  - real-time-dashboard
  - template-variables
  - dashboard-auto-refresh
  - dashboard-dark-mode
  - operational-dashboard
  - build-a-dashboard
head:
  - tagName: script
    attributes:
      type: application/ld+json
    innerHTML: |
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a Sumo Logic dashboard?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A Sumo Logic dashboard is a real-time visualisation surface that displays log and metric data together in a single view. Panels support charts, tables, maps, and single-value displays. Dashboards can be filtered with template variables, set to auto-refresh, shared with teammates, and exported as PDF, PNG, or JSON."
            }
          },
          {
            "@type": "Question",
            "name": "How to build a real-time operational dashboard from logs in Sumo Logic?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Create a new dashboard, add log or metric panels directly from the dashboard editor, write queries for each panel, set a time range and optional auto-refresh interval, and use template variables to make filters dynamic. See the Create a Dashboard page for step-by-step instructions."
            }
          },
          {
            "@type": "Question",
            "name": "Can Sumo Logic dashboards display logs and metrics together?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Sumo Logic dashboards support both log and metric queries in the same panel and across panels on the same dashboard, giving a unified view of application and infrastructure data."
            }
          },
          {
            "@type": "Question",
            "name": "How to share a Sumo Logic dashboard?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use the Share option in the dashboard menu to share with teammates inside the organisation, preserving template variables and time range. Dashboards can also be shared publicly outside the organisation using a public URL."
            }
          },
          {
            "@type": "Question",
            "name": "How to set up auto-refresh on a Sumo Logic dashboard?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Click the dropdown arrow next to the refresh icon on the dashboard and select a refresh interval. Auto-refresh applies to the entire dashboard and cannot be set per panel. If the requested interval is not achievable due to query complexity or time range, an error message indicates the actual refresh rate."
            }
          },
          {
            "@type": "Question",
            "name": "How to send a Sumo Logic dashboard as a scheduled email report?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use the Scheduled Report feature to send a dashboard snapshot by email on a defined schedule. See the Scheduled Report page for setup steps."
            }
          },
          {
            "@type": "Question",
            "name": "What are the limitations of Sumo Logic dashboards?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A dashboard can have up to 100 queries. Each panel supports up to 6 log queries and 6 metric queries. Dashboard queries cannot return more than 1,440 data points. Joining log queries across panels is not supported. The operators Details, LogReduce, LogCompare, Save, and Transaction cannot be used in dashboard panels."
            }
          }
        ]
      }
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/dashboards/about-dashboard/dashboards.png')} alt="Dashboards icon" width="50"/>

A Sumo Logic dashboard displays log and metric data together in a single real-time view. Panels support a range of chart types, template variable filters make dashboards dynamic, and auto-refresh keeps data current without manual reloads. This is exactly what you need to effectively monitor and manage a Kubernetes environment.

Dashboards are a critical tool for monitoring and troubleshooting modern applications, allowing you to quickly navigate through your data without having to learn a query language. Graphs and data mappings provide visual representations of data that enable you to quickly identify and resolve key issues.

## What can Sumo Logic dashboards display?

Dashboards support both log and metric queries in the same panel and across panels on the same dashboard. This gives a unified view of application logs and infrastructure metrics without switching between tools.

Supported panel types include: Area, Bar, Box Plot, Bubble, Cluster Map, Column, Combo, Connection Map, Funnel, Geo Heat Map, Heat Map, Honeycomb, Line, Pie, Sankey Diagram, Scatter, Single Value, Table, and Text panels.

See [Panels](/docs/dashboards/panels/) for details on each chart type.

## How do template variables work in dashboards?

[Template variables](/docs/dashboards/filter-template-variables/) let you filter dashboard data dynamically without editing individual panel queries. A variable can be applied across both log and metric panels simultaneously, and the dashboard updates all panels when the variable value changes.

Template variables support full replacement control over inserted values and work across log and metric panels.

## What features does Sumo Logic Dashboard support?

:::tip
See [Migrate to Dashboards](/docs/dashboards/dashboards-migration).
:::

* Dashboard template variables provide full replacement control over what is inserted, and the variables work across both log and metric panels.
* Dashboard provides a dashboard-first view to build, maintain, and interact with dashboards. With Dashboard you can build panels inside the dashboard rather than adding panels from the Search or Metrics pages.
* Dashboard utilizes the [Metrics Search](/docs/metrics/metrics-queries/metrics-explorer/) with full text auto-complete capabilities, so you can quickly find the metrics you are looking for.

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

## What operators cannot be used in dashboard panels?

The following operators are not supported in dashboard panels:

- `Details`
- `LogReduce`
- `LogCompare`
- `Save`
- `Transaction`

:::note
Live mode restrictions do not apply to dashboards.
:::

See [Restricted Operators in Dashboards](/docs/dashboards/restricted-operators-dashboards/) for full details.

## What are the limits for Sumo Logic dashboards?

| Limit | Value |
|:--|:--|
| Queries per dashboard | 100 |
| Log queries per panel | 6 |
| Metric queries per panel | 6 |
| Data points per query | 1,440 |
| Joining log queries across panels | Not supported |

Chart properties set in a panel are not retained when the chart is viewed from the Search page, and are not retained when a chart is added to a dashboard from the Search page.

## How does auto-refresh work?

Dashboards can automatically refresh all panels at a configured interval. To set the interval, click the dropdown arrow next to the refresh icon and select a rate.<br/><img src={useBaseUrl('/img/dashboards/about-dashboard/auto-refresh-dropdown-options.png')} alt="auto refresh dropdown options" style={{border: '1px solid gray'}} width="200" /><br/><img src={useBaseUrl('/img/dashboards/about-dashboard/dashboard-new-refresh-interval-options.png')} alt="dashboard new refresh interval options" style={{border: '1px solid gray'}} width="100" />

* Auto Refresh applies to the whole dashboard, you cannot configure it by panel.
* If there are two or more queries in a panel, the refresh interval for the panel is set to the maximum supported interval.
* If the requested refresh interval is not possible, you'll get an error message indicating the actual refresh rate is slower than requested. This can be due to one of the following reasons:
   * The time range is too long to refresh at this rate. Reduce the time range to allow a faster refresh interval.
   * An operator is not supported at this refresh interval.
   * The number of grouped elements is too large for the requested interval.

See [Restricted Operators in Dashboards](/docs/dashboards/restricted-operators-dashboards/) for a full list of operators that affect refresh behaviour.

## How to switch to dark mode?

Dashboards have two themes available: Light mode (which is the default) and Dark mode. You can toggle between the two themes within the dashboard by clicking the three-dot kebab icon. The following image shows the option to **Switch to Dark Theme**.<br/><img src={useBaseUrl('/img/dashboards/about-dashboard/dark-theme-switch.png')} alt="dark theme switch" style={{border: '1px solid gray'}} width="700" />

## How does the clickable legend work?

If you want to focus on one item in your chart you can simply click on the item in the legend. If you want to toggle just one legend item, just hold the **shift** key and then click the item.<br/><img src={useBaseUrl('/img/dashboards/about-dashboard/clicklegend.gif')} alt="clicklegend" style={{border: '1px solid gray'}} width="700" />

## How do I view dashboard scan cost information?

The dashboard information dialog shows insights into the scan costs associated with log-based queries that run within dashboards.

To view the dashboard information, follow the steps below:
1. Open the dashboard for which you need to view the information.
2. Click the three-dot kebab menu icon in the top right corner of the dashboard and select **Info** from the dropdown menu.<br/><img src={useBaseUrl('img/dashboards/dashboard_info/dashboard_info.png')} alt="dashboard_info" style={{border: '1px solid gray'}} width="230"/>
3. A popup pane will appear, displaying the following dashboard information:<br/><img src={useBaseUrl('img/dashboards/dashboard_info/dashboard_info_panel.png')} alt="dashboard_info_panel" style={{border: '1px solid gray'}} width="600"/>
    - **Dashboard Name**. Name of the dashboard.
    - **Created By**. The user who created the dashboard. 
    - **Time Range Expression**. The time range selected for the dashboard.
    - **Start**. The current start time based on the selected time range.
    - **End**. The current end time based on the selected time range.
    - **Time Zone**. The time zone for the set time range.
    - **Scanned Bytes**. The total amount of data scanned in bytes.
    - **Dashboard ID**. A unique identification ID for the dashboard. Copy and use the dashboard ID within the APIs to identify the dashboard when making requests.


## FAQs

### What is a Sumo Logic dashboard?

A Sumo Logic dashboard is a real-time visualisation surface that displays log and metric data together in a single view. Panels support charts, tables, maps, and single-value displays. Dashboards can be filtered with template variables, set to auto-refresh, shared with teammates, and exported as PDF, PNG, or JSON.

### How to build a real-time operational dashboard from logs?

Create a new dashboard, add log or metric panels directly from the dashboard editor, write queries for each panel, set a time range and optional auto-refresh interval, and use template variables to make filters dynamic. See [Create a Dashboard](/docs/dashboards/create-dashboard-new/) for step-by-step instructions.

### Can Sumo Logic dashboards display logs and metrics together?

Yes. Both log and metric queries are supported in the same panel and across panels on the same dashboard, giving a unified view of application and infrastructure data.

### How to share a Sumo Logic dashboard?

Use the **Share** option in the dashboard menu to share with teammates inside the organisation, preserving template variables and time range. Dashboards can also be shared publicly outside the organisation. See [Share a Dashboard](/docs/dashboards/share-dashboard-new/) and [Share a Dashboard Outside Your Organisation](/docs/dashboards/share-dashboard-outside-org/).

### How to set up auto-refresh on a dashboard?

Click the dropdown arrow next to the refresh icon and select an interval. Auto-refresh applies to the entire dashboard. If the requested interval is not achievable, an error message explains the reason — usually a time range that is too long or an unsupported operator.

### How to send a dashboard as a scheduled email report?

Use the [Scheduled Report](/docs/dashboards/scheduled-report/) feature to send a dashboard snapshot by email on a defined schedule.

### What are the limitations of Sumo Logic dashboards?

A dashboard supports up to 100 queries total. Each panel supports up to 6 log and 6 metric queries. Queries cannot return more than 1,440 data points. Joining log queries across panels is not supported. The operators Details, LogReduce, LogCompare, Save, and Transaction cannot be used in dashboard panels.