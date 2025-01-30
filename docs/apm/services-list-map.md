---
id: services-list-map
title: Services List and Map
description: View your application topology and investigate microservice interactions.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/apm/services-map-icon.png')} alt="icon" width="45"/>

To access the services list and services map features:
* [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Go to the **Home** screen and select **Traces** > **Services**.
* [**New UI**](/docs/get-started/sumo-logic-ui/). In the main Sumo Logic menu, select **Observability**, and then under **Application Monitoring**, select **Services**. You can also click the **Go To...** menu at the top of the screen and select **Services**.

## Services map view

The **Services Map** view visually maps out your application environment, giving you a greater understanding of your application architecture, hierarchy, and dependencies between monitored microservices. Health and load of each microservice is reflected in size and color to help you spot potential problems and bottlenecks in your application infrastructure.

Services maps are built automatically from distributed tracing data in real time as it arrives in Sumo Logic. You can:

* Zoom in on the map to see a more granular level of detail, or zoom out to get a higher-level overview
* Hover over a service to see its connections to other services and the last 15 minutes of activity in terms of latency, requests, and errors
* Click on a service to open the Entity Inspector for further drill down into traces, metrics, and the service dashboard
* Filter by application, if your tracing data has the application tag (`application=[app-name]`)
* Filter by environment (up to 10 values), if your tracing data has the deployment environment tag (`deployment.environment=[environment]`)
* Search for a service by name

<img src={useBaseUrl('img/apm/traces/services-map.png')} style={{border: '1px solid gray'}} alt="services-map" width="800"/>

### Settings

Use the **General Settings** to configure [anomaly detection](#anomaly-detection).<br/><img src={useBaseUrl('img/apm/traces/settings-general.png')} style={{border: '1px solid gray'}} alt="service map gear icon for settings" width="300"/>

### Map legend

<img src={useBaseUrl('img/apm/traces/services-map-legend.png')} style={{border: '1px solid gray'}} alt="services-map-legend" width="500"/>

* **Color** of services:
  * Red represents anomalies.
  * Blue indicates normal, expected activity.
  :::note
  You can configure your own thresholds for anomaly detection in your **General Settings**.
  :::
* **Shape** of services:
  * Circles represent connected application services
  * Cloud icons represent remote services like databases or external APIs, which are automatically detected for you in client traffic even without using direct instrumentation
  * Arrows map out connection activity between services and their presence from the last 72 hours.
  * Circle and arrows with dotted lines represent services or connections that have been inactive an hour or more.
* **Size** of services: Size is based on service activity, where large circles are more active compared to smaller circles that are less active.  

## Services list view

The **Services List** view provides a compact, high-level overview of your application service health insights, alerts, and KPIs. You can filter and sort your KPI data using the filters and column headers.

<img src={useBaseUrl('/img/apm/services-list-filters.png')} alt="services-list-filters" style={{border: '1px solid gray'}} width="800"/>

KPIs listed in the table reflect the previous 15 minutes of data. Clicking on any service will open the Entities panel allowing for further drill-down.

### Alerts

Alerts in the Service List are displayed based on the configured [monitors](/docs/alerts/monitors/overview/) in the Sumo Logic platform for a given service.

The **Alert Status** column displays the most severe alert status along with the total number of alerts associated with a given service.

To view an alert's details, click on a row and view it in the right-hand-side panel.

Additionally, you can narrow down the list of visible services by the type of active alerts for a given service. Service List can filter based on the following alert statuses:

- Critical
- Warning
- Missing Data
- Normal

A service is displayed in the list if at least one of the alerts is in the selected state.

### Settings

* Use the general settings to configure [anomaly detection](#anomaly-detection).<br/><img src={useBaseUrl('img/apm/services-list-settings.png')} style={{border: '1px solid gray'}} alt="services-list-settings" width="300" />
* Use the columns display settings to display and hide columns.<br/><img src={useBaseUrl('img/apm/services-list-display.png')} style={{border: '1px solid gray'}} alt="services-list-settings" width="300" />

## Anomaly detection

An anomaly is a spike in latency and errors or a dip in requests. Here's how to configure your own threshold settings for anomaly detection.

### Automatic

**Automatic anomaly detection** is enabled by default, with the **Worst Case** option selected. This will render services to be displayed as a red circle if at least one of the KPIs (latency, errors, requests) has had an anomaly in the last 15 minutes AND the anomaly was not present 7 days ago at the same time. Optionally, you can explicitly choose one of the other KPIs - **Latency**, **Error**, or **Request**.

<img src={useBaseUrl('img/apm/services-list-map-auto-detection-settings.png')} style={{border: '1px solid gray'}} alt="auto service anomaly settings" width="400" />

The standard [metric outlier operator](/docs/metrics/metrics-operators/outlier/) is used to detect this. You can adjust the sensitivity and **Learning window** of the outlier detection in the settings to make the logic more or less dependent on occasional spikes. 

### Manual

Manual anomaly detection allows you to specify different detection settings for each KPI. Click the toggle switch to manually enable or disable each KPI highlight as desired.

<img src={useBaseUrl('img/apm/services-list-map-manual-detection-settings.png')} style={{border: '1px solid gray'}} alt="services manual anomaly detection settings" width="400"/>

### Alerts

If the **Alerts** option is enabled, the status of a service will be influenced by the presence of active alerts (or those, which have been resolved within the selected time range) associated with the service.

<img src={useBaseUrl('/img/apm/enable-alerts.png')} alt="alerts_host_list" style={{border: '1px solid gray'}} width="400"/>

## Add services panel to dashboard

The **Services Map** and **Services List** panels, available out of the box, enable you to explore your application environment and review all traces from a dashboard. You can duplicate or add multiple panels with different filtering or queries to refine views and support your organization.

To add a services panel to a dashboard:

1. Open an existing dashboard or [create a new one](/docs/dashboards/create-dashboard-new).
1. On an existing dashboard, click **Add Panel** > **Services**, or, if you're creating a new dashboard, click **Services**.<br/><img src={useBaseUrl('img/apm/services-map-dashboard.png')} style={{border: '1px solid gray'}} alt="add-servicemap" width="800"/>
1. When the panel configuration page opens, go to the **Visual Settings** > **Chart Type**, dropdown and select **Table** (Services List) or **Graph** (Services Map). <br/> <img src={useBaseUrl('img/apm/create-servicemap.png')} style={{border: '1px solid gray'}} alt="create-servicemap" width="500"/>
1. (Optional) Select from the dropdown menus to filter by the following:<br/> <img src={useBaseUrl('img/apm/filter-servicemap.png')} style={{border: '1px solid gray'}} alt="filter-servicemap" width="800"/>
   * **Application**. Your application name. You can use this if your tracing data has the tag called `application=[app-name]` To pass the variables from dashboard filters, set `application={{application}}`
   * **Environment**. Your production, staging, or development environment name. You can use this if your tracing data has the tag called `deployment.environment=[environment-name]`. To pass the variables from dashboard filters, set `deployment.environment={{deployment.environment}}`
   * **Service(s)**. Your application name, which should be always there. To pass the variables from dashboard filters, set `service={{service}}`.
1. Go to the **General** tab to configure your panel details (name, **Title Font Size**, and **Description**). <br/> <img src={useBaseUrl('img/apm/traces/tracelist-details.png')}  alt="panel details" width="330"/>
1. For **Table** chart type only: Go to **Display Settings** and set the column data and services you'd like to see displayed.<br/> <img src={useBaseUrl('img/apm/traces/display-settings-setup.png')} style={{border: '1px solid gray'}} alt="display-settings-setup" width="500"/>
1. Click **Add to Dashboard**. The panel loads in your dashboard to review your applications and services according to filtering.

:::tip
See [Dashboards](/docs/dashboards) for additional information on creating panels, configuring filters, filtering with template variables from dashboard headers, and more.
:::
