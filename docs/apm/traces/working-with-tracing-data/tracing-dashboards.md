---
id: tracing-dashboards
title: Tracing Dashboards
sidebar_label: Tracing Dashboards
description: Create Tracing dashboards, install apps, and more.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Application Service Dashboards

Service and Application dashboards are available as two Explore hierarchies. You can access them in the **Explore By** drop down menu.

The **APM: Application View** groups services into higher-level applications based on the `application=[app-name]` custom tag that you may add to your tracing data if you want to leverage it fully. Without the tag, all services will belong to a "default" application. The third level shows environment automatically picked from OT deployment.environment tag. Without the tag, all data will belong to a "default" environment.
The fourth and last shows the top 50 most active operations executed on the service. See [Working with Span attributes](../advanced-configuration/working-with-span-attributes.md) to learn how to how to customize your span attributes.

The **APM: Service View** takes a contrary approach, displaying services by top level and breaking down their health by application. This view can be useful for shared services that support more than one application. The fourth level shows the top 50 most active operations performed on the selected service and application.

The **APM: Environment View** displays environments at the top level and breaks down application health by environment (i.e., prod or dev). This view can be especially useful for understanding the top-down hierarchy of applications and services in a particular environment. The fourth level shows the top 50 most active operations executed on the environment, application, and service. <br/><img src={useBaseUrl('img/traces/Service-Dashboards-from-traces.png')} alt="Service Dashboards from traces" width="350"/>

Services need to be active in the last 15 minutes to appear on the list. Recent inactivity will result in a grayed-out list entry.

Tracing metrics retention has default metrics retention.

Each dashboard is a fully customizable set of panels based on automatically generated metrics using tracing data as input. You can get insight into microservice health by looking at stats from:

* **Latency**: (real-time average) the average time it takes for entry spans for that service to complete. Apart from average you can also select p99, p95, p90, p50 options in service_latency_type filter to view other percentile aggregations.<br/> ![service-latency.png](/img/traces/service-latency.png)
* **Requests**: (real-time counter) the number of entry spans reported by the service
* **Errors**: (real-time counter) the number of entry spans for the service that finished with an error

By clicking on any data point on the chart, you can view the side panel's **Entities** tab and drill down to related metrics or traces for the selected service.

:::note
Drilling to traces by application and to logs by both service and application are coming soon and are not working yet.
:::

![Explore coffee app to drill down on infrastructure tab.png](/img/traces/coffee-app-infrastructure-tab.png)

## Installing the Tracing App (Optional)

The **Tracing - Application Services Health** app is automatically installed for all users of your organization once Sumo Logic detects OT-compatible tracing data coming from your instrumented services. The content is placed in **Sumo Logic Tracing - default dashboards** inside the **Admin Recommended** folder and is automatically available for all users in the organization.

:::note
Do not modify or delete content in the **Admin Recommended** folder as it is maintained and updated automatically. If for any reason this gets removed, you can install the App manually from App Catalog. 
:::

To install the app, do the following:
1. From the **App Catalog**, search for and select the **Tracing - Application Services Health** app.<br/> ![install-tracing-app.png](/img/traces/install-tracing-app.png)
    If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.
2. To install the app, click the **Add to Library** button and complete the following fields.
   * **App Name.** You can retain the existing name, or enter a name of your choice for the app.
   * **Advanced**. Select the **Location in Library** (the default is the Personal folder), or click **New Folder** to add a new folder.<br/> ![Trace app two.png](/img/traces/Trace-app-two.png)
3. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder or the folder you specified. From here, you can share it with your organization.

## Dashboard Panels

Add **Service Map** and **Trace List** panels to explore your application environment and review all traces from your Dashboard. Duplicate or add multiple panels with different filtering or queries to refine views and support your organization. 

See the [Dashboard (New) guide](/docs/dashboards-new) for additional information and options to create panels, configure filters, create and filter with template variables from dashboard headers, and more.

### Service Map panel

The **Service Map** panel displays a service map for filtered applications and services, with the ability to explore the environment.

To add a **Service Map** panel to your Dashboard:
1. Open or create a Dashboard.
1. Click **Add Panel** and select **Service Map**. Or select the **Service Map** option on a new Dashboard.<br/>  ![add-servicemap.png](/img/traces/add-servicemap.png)
    A panel configuration page opens.<br/>  ![create-servicemap.png](/img/traces/create-servicemap.png)
1. Select from the drop-down menus to filter the Service Map by the following:<br/>  ![filter-servicemap.png](/img/traces/filter-servicemap.png)
   * **Application** if your tracing data has the `application=[app-name]` tag
   * **Service** 
   * To pass the variables from dashboard filters, set `application={{application}}`, `service={{service}}`, and/or `deployment.environment`
1. Do not set the time. Service Map always shows last 72h of data.
1. The **Chart Type** is set to Graph.
1. Click the **General** tab to edit the Panel Details. Enter a name for the panel, set a **Title Font Size**, and add a short **Description**.<br/>  ![tracelist-details.png](/img/traces/tracelist-details.png)
1. Click **Add to Dashboard**. The panel loads in your Dashboard to review your applications and services according to filtering.<br/>  ![panel-service.png](/img/traces/panel-service.png)

### Trace List panel

The Trace List panel displays the [Traces page](view-and-investigate-traces.md) table to give at-a-glance tracking for traces. To view deeper details, click a trace from the panel to open the [Trace View](view-and-investigate-traces.md). 

:::note
You are limited to three Trace List panels in a dashboard.
:::

To add a Trace List panel to your Dashboard:

1. Open a Dashboard or create a new Dashboard.
1. Click **Add Panel** and select **Trace List**. Or select the **Trace List** option on a new Dashboard.<br/>  ![add-tracelist.png](/img/traces/add-tracelist.png)   
    A panel configuration page opens.<br/>  ![create-tracelist.png](/img/traces/create-tracelist.png)
1. Configure a [Trace query](view-and-investigate-traces.md) to search for desired set of traces. 
1. Select a time range or create a custom range for the panel. You can set this when creating or at any time when viewing the Dashboard panel.<br/> ![timerange.png](/img/traces/timerange.png)
1. The **Chart Type** is set to Table.
1. Enter the **Rows Per Page** for the panel, between 5 to 100. The default amount is 15. The panel automatically paginates traces to browse through and view all traces.
1. Select the Table columns of trace data to load in the panel:

| Column name | Example value | Description |
|:--|:--|:--|
| Trace ID | ffaf2f69ee8ad0c1 | The unique identifier of the trace. |
| Root Service | api | The service that started the trace. |
| Started At | 07/27/2020 09:01:04.533 | When the trace started. |
| Duration | 12.582 ms | The amount of time the trace spans.  |
| Number of spans | 35 | A trace consists of spans. This number tells you how many spans are in the trace. |
| Duration Breakdown | ![breakdown](/img/traces/breakdown.png) | Each color indicates a service. The colors assigned to services are always the same on your account. You can change the color in the span summary tab after clicking on the individual span in trace view.<br/>Hover over to view a percentage breakdown of how long each span covers in the trace.<br/>![img](/img/traces/span-hover-view.png) |
| Number of errors | 0 | The number of errors in the trace. |
| Status | 200 | The HTTP status code of the trace. A menu is available in this column when hovering on a row. The menu has an option to **Show similar traces**.<br/>![img](/img/traces/similar-traces-menu.png) |

1. Click the **General** tab to edit the Panel Details. Enter a name for the panel, set a **Title Font Size**, and add a short **Description**.<br/>  ![tracelist-details.png](/img/traces/tracelist-details.png)
1. Click **Add to Dashboard**. The panel loads in your Dashboard to review all traces according to the query.<br/>  ![panel-trace.png](/img/traces/panel-trace.png)
