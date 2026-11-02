---
id: about
title: About Dashboards
description: Learn the benefits of Sumo Logic dashboards and how they integrate log, metric, and trace data in one view.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/dashboards/about-dashboard/dashboards.png')} alt="Dashboards icon" width="50"/>

Sumo Logic dashboards let you analyze metric and log data together in a streamlined experience, which is useful for monitoring and managing a Kubernetes environment.

Sumo Logic dashboards are a critical tool for monitoring and troubleshooting modern applications. They let you navigate your data quickly without learning a query language. Graphs and data mappings show your data visually so you can identify and resolve key issues.

## What are the benefits of Sumo Logic dashboards?

The main benefit of Sumo Logic dashboards is that they display log and metric data together in one integrated view, giving you control over how both are visualized. They also streamline configuration and support on-the-fly analysis with template variables.

[Template variables](filter-template-variables.md) let you filter dashboard data dynamically, making it easier to create charts and scope your data.

## Features

Sumo Logic dashboards include the features described in the following sections.

:::tip
Migrating from Dashboards (Classic)? See [Migrate Legacy Dashboards](/docs/dashboards/dashboards-migration).
:::

### Combine logs and metrics in one panel

Show logs and metrics together in one panel. Learn how to [overlay logs and metrics in a panel](/docs/dashboards/faq#how-do-i-overlay-logs-and-metrics-on-one-panel).

### Filter dashboards with template variables

Use [template variables](/docs/dashboards/filter-template-variables/) across log and metric panels to control exactly what is inserted into your queries. They give you greater control over filter values, data type, and acceptable input.

### Build panels inside a dashboard

Build panels directly in a dashboard instead of adding them from the Search or Metrics pages.

### Add panels from Search or Metrics

Add a panel from Search or Metrics, or [add panels inline](/docs/dashboards/filter-template-variables/) with the **Add Panel** button.

### Visualize data with many chart types

Log and metric panels support [area](/docs/dashboards/panels/area-charts/), [bar](/docs/dashboards/panels/bar-charts/), [box plot](/docs/dashboards/panels/box-plot-charts/), [bubble](/docs/dashboards/panels/bubble-charts/), [cluster map](/docs/dashboards/panels/map-charts/), [column](/docs/dashboards/panels/column-charts/), [combo](/docs/dashboards/panels/combo-charts/), connection map, [funnel](/docs/metrics/metrics-queries/funnel-chart/), [geo heat map](/docs/dashboards/panels/map-charts/), [heat map](/docs/metrics/metrics-queries/heat-map/), honeycomb, [line](/docs/dashboards/panels/line-charts/), [pie](/docs/dashboards/panels/pie-charts/), [Sankey diagram](/docs/dashboards/panels/sankey-charts/), [scatter](/docs/dashboards/panels/scatter-charts/), [single value](/docs/dashboards/panels/single-value-charts/), and [table](/docs/dashboards/panels/table-charts/) charts.

### Drill down into related data

Click data points or slices and sections of pie, bar, column, area, and line charts to see recommended dashboards and log drilldowns. [Learn more](/docs/dashboards/drill-down-to-discover-root-causes). Cluster map and heat map panels support *Shift+click* on a data point to drill down to the search. Missile map panels support *Shift+click* on the line to drill down to the search. [Learn more](/docs/dashboards/panels/map-charts/#drill-down-from-a-map-chart).

### Link dashboards together

Add [links between dashboards](/docs/dashboards/link-dashboards/) so you can move from a data point to related dashboards. You can also [link a dashboard to your stack](/docs/dashboards/link-dashboards/#link-a-custom-dashboard-to-your-stack) to view it when exploring infrastructure components.

### Find outliers in a time series

[Locate deviations beyond thresholds](/docs/dashboards/locate-deviations-time-series/) in a time series to find outliers.

### Auto refresh

**Auto Refresh** automatically updates dashboard panels with the latest data at a configured interval. Consider disabling it or increasing the minimum refresh interval when frequent updates are not required. For Flex customers, this helps reduce avoidable scan costs from unnecessary refreshes. For Tiered customers, it minimizes unnecessary panel reloads and helps improve dashboard performance.

:::note
To enable or disable this feature, you need to be an **Administrator** or a role with the [**Manage Dashboard Execution Controls**](/docs/manage/users-roles/roles/role-capabilities/#dashboards) capability.
:::

#### Enable the Sumo Logic policy

In this section, you will enable the ability to disable your dashboard auto refresh. By default, auto refresh will be enabled with **30 seconds** minimum time interval. Follow these steps to change this configuration:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Administration**, and then under **Account Security Settings** select **Policies**. You can also click the **Go To...** menu at the top of the screen and select **Policies**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > Policies**.
1. Uncheck the **Allow Auto-Refresh Configuration for all dashboards** checkbox to disable the auto-refresh.
1. If checked, select the minimum auto-refresh interval from the dropdown list based on your requirement. You can select from 30 seconds to 1 day.

<img src={useBaseUrl('img/get-started/auto-refresh.png')} alt="Auto-Refresh" style={{border: '1px solid gray'}} width="500" />

#### Using auto refresh

Once you have enabled the **Auto-Refresh**, you can now see the panels getting refreshed as per the selected auto-refresh interval. If required, you can configure the refresh interval rate by clicking the dropdown arrow next to the **Run** button. Select the refresh interval of your choice from the list.

:::info
There are some restrictions when using operators with dashboards. To learn more, see [Restricted Operators in Dashboards](/docs/dashboards/restricted-operators-dashboards).
:::

:::note
The dropdown only displays the time-interval which is greater than or equal to the set minimum auto-refresh interval in the **Policies** page.
:::

<img src={useBaseUrl('/img/dashboards/about-dashboard/auto-refresh-dropdown-options.png')} alt="auto refresh dropdown options" style={{border: '1px solid gray'}} width="400" />

#### Auto-refresh guardrails

Auto-refresh helps dashboards stay up to date by automatically rerunning panel queries at the interval you configure. However, continuously refreshing a dashboard that no one is viewing, or repeatedly retrying a query that keeps failing, consumes unnecessary compute resources without adding value.

Sumo Logic's auto-refresh guardrails solve this by automatically pausing refresh activity when it is unlikely to help, while keeping dashboards quick to resume when needed.

Two guardrails apply to both private and public dashboards:

##### Hidden tab pause

When you switch away from a dashboard tab (browser tab or Bento tab) for longer than **10 minutes**, auto-refresh pauses automatically. Panels retain their last loaded state, so no data is lost. When you return to the tab, auto-refresh resumes automatically and no action is required.

##### Panel failure exclusion

If a panel's query fails **5 consecutive times** during auto-refresh cycles, that panel is excluded from future auto-refresh cycles. Other healthy panels continue refreshing normally.

When a panel is excluded, you see:

* An error overlay on the affected panel with the original error message.
* A toast notification when the panel is first excluded.

<img src={useBaseUrl('/img/dashboards/about-dashboard/panel-failure-exclusion.png')} alt="Panel error overlay with Retry Panel button" style={{border: '1px solid gray'}} width="500" />

To resume the panel:

* Click **Retry Panel** on the affected panel to resume that panel only.
* Click the dashboard **Run** button to resume all excluded panels.

### Auto run

**Auto Run** lets you control whether dashboard panels run automatically or require manual execution. Use this when you want explicit control over dashboard execution. For example, you may want to open a dashboard with a fixed absolute time range or make several dashboard variable changes before loading data. Disabling auto run prevents unnecessary panel reloads after each change and helps Flex customers reduce avoidable scan costs.
:::note
To enable or disable this feature, you need to be an **Administrator** or a role with the [**Manage Dashboard Execution Controls**](/docs/manage/users-roles/roles/role-capabilities/#dashboards) capability.
:::

#### Enable the Sumo Logic policy

In this section, you will enable the ability to auto run your dashboard panels. By default, auto run will be enabled, to disable it follow these steps:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Administration**, and then under **Account Security Settings** select **Policies**. You can also click the **Go To...** menu at the top of the screen and select **Policies**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Administration > Security > Policies**.
1. Uncheck the **Enable Auto-Run for all dashboards** checkbox.

<img src={useBaseUrl('img/get-started/auto-run.png')} alt="Auto-Run" style={{border: '1px solid gray'}} width="600" />

#### Using auto run

When **Auto Run** is disabled you cannot see any data in the panels until you click the **Run** button. Clicking the **Run** button will run all the panels in the dashboard. If you want to run only the selected panel, click <img src={useBaseUrl('/img/dashboards/about-dashboard/rerun.png')} alt="rerun-button" style={{border: '1px solid gray'}} width="30" /> button on top-right of each panel.

Panels do not rerun after actions such as adding, editing, deleting, changing the time range, or changing the template variable until you click the **Run** button after your changes. You will always see the following warning message near to your search box once any of the above updates are made to the dashboard:

`Auto-Run is disabled. Hit Run to apply the changes.`

### Share dashboards with your organization

[Share dashboards](/docs/dashboards/share-dashboard-new/) with variables and time range preserved, and [share dashboard content items](/docs/dashboards/share-dashboard-new/#sharing-a-dashboard-within-your-organization) within your organization.

### Control what data viewers see

Run a dashboard as its creator and [set the data access level](/docs/dashboards/set-data-access-level/) to control whose role search filter applies when you share the dashboard with other viewers.

### Display dashboards on wall monitors

Use [public dashboards and the service allowlist](/docs/dashboards/share-dashboard-outside-org/) to display dashboards on wall monitors, where viewers do not need a Sumo Logic account.

### Export dashboards as PDF, PNG, or JSON

[Export a dashboard](/docs/dashboards/export-dashboard-new/) to PDF, PNG, or JSON to share a static snapshot. You can select a theme and resolution for PDF and PNG exports.

### Email scheduled reports

[Schedule dashboard reports](/docs/dashboards/scheduled-report/) to receive an emailed copy of a dashboard (PDF or PNG) at the frequency you choose, including people who do not have access to Sumo Logic.

### Style charts and series

Style charts through display overrides in the panel settings, set the color per query or series, and use multiple layers of display overrides. For details, see how to [modify a chart](/docs/dashboards/panels/modify-chart/).

### Color values by threshold

Define warning and critical [thresholds](/docs/dashboards/panels/modify-chart/#modify-the-thresholds) to color chart values by range.

### Set longer time ranges

Dashboard panels are limited to a 32-day time range. [Set custom time ranges](/docs/dashboards/set-custom-time-ranges/) beyond that limit for queries backed by an aggregate scheduled source, such as an aggregate scheduled view or search.

### Add notes with text panels

Add [text panels with Markdown](/docs/dashboards/panels/markdown-syntax/) to explain what a dashboard shows or to leave notes for viewers.

### Find metrics with Metrics Search

Find metrics quickly with [Metrics Search](/docs/metrics/metrics-queries/metrics-explorer/) and its full-text autocomplete.

### View dashboard details and scan costs

The dashboard information popup provides insights into the scan costs associated with log-based queries that run within dashboards.

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

### Dark theme

Dashboards have two themes available: Light mode (which is the default) and Dark mode. You can toggle between the two themes within the dashboard by clicking the three-dot kebab icon. The following image shows the option to **Switch to Dark Theme**.<br/><img src={useBaseUrl('/img/dashboards/about-dashboard/dark-theme-switch.png')} alt="dark theme switch" style={{border: '1px solid gray'}} width="400" />

You can also select a Light or Dark theme when you [export a dashboard](/docs/dashboards/export-dashboard-new/) or create a [scheduled report](/docs/dashboards/scheduled-report/).

### Clickable legend

If you want to focus on one item in your chart you can click the item in the legend. To toggle one legend item, hold the **shift** key and click the item.<br/><img src={useBaseUrl('/img/dashboards/about-dashboard/clicklegend.gif')} alt="clicklegend" style={{border: '1px solid gray'}} width="700" />

## Rules

* Auto Refresh applies to the whole dashboard, you cannot configure it by panel.
* If there are two or more queries in a panel, the refresh interval for the panel is set to the maximum supported interval.
* If the requested refresh interval is not possible, you'll get an error message indicating the actual refresh rate is slower than requested. This can be due to one of the following reasons:
   * The time range is too long to refresh at this rate. Reduce the time range to allow a faster refresh interval.
   * An operator is not supported at this refresh interval.
   * The number of grouped elements is too large for the requested interval.

### Restricted operators in dashboards

The following operators cannot be used with dashboards:

* `details`
* `logreduce`
* `logcompare`
* `save`
* `transaction`

:::note
Live mode restrictions do not apply to dashboards.
:::

## Limitations

* A panel can have up to 6 logs and 6 metrics queries.
* Joining log queries in a separate query is not supported. See how to [join metric queries](/docs/metrics/metrics-queries/metrics-explorer) for details on how this works.
* A dashboard can have up to 100 queries.
* Dashboard chart properties are not retained when viewed from the Search page.
* Chart properties are not retained when a chart is added to a dashboard from the Search page.
* Dashboard queries cannot return more than 1440 data points.
