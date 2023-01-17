---
id: service-map
title: Services List and Map
description: View your application topology and investigate microservice interactions.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To open the Services List and Map, click **+ New** > **Services**.

<img src={useBaseUrl('img/traces/open-service-map.png')} alt="open servicemap" width="400"/>

## Services List view

The **Services List** view provides a compact, high-level overview of your application service health insights and KPIs.

![panel-service.png](/img/traces/service-list.png)


### Settings

KPIs listed in the table reflect the previous 15 minutes of data. Click on any service opens the Entities panel supporting further drill-down.

* Filter and sort your KPI data using the filters and column headers <br/>![services-list-display](/img/traces/services-list-filters.png)
* Display and hide columns using **Display Settings** <br/>![services-list-display](/img/traces/services-list-display.png)
* Configure anomalies in **Settings**<br/> <img src={useBaseUrl('img/traces/services-list-settings.png')} alt="services-list-settings" width="400"/>


## Services Map view

The **Services Map** view visually maps out your application environment, giving you a greater understanding of your application architecture, hierarchy, and dependencies between monitored microservices. Health and load of each microservice is reflected in size and color to help you spot potential problems and bottlenecks in your application infrastructure.

Maps are built automatically from distributed tracing data in real time as it arrives in Sumo Logic.

<img src={useBaseUrl('img/traces/services-map.png')} alt="servicemap" />

The Services Map provides the following features:

* Zoom in and out on the map
* Hover over a service to see its connections to other services and the last 15 minutes of activity in terms of latency, requests, and errors
* Click on a service to open the Entity Inspector with the ability to drill down to traces, metrics, and the service dashboard
* Filter by application (if your tracing data has the `application=[app-name]` tag)
* Search for a service by name<br/> ![service map april 2021.png](/img/traces/service-map-example.png)

### Map legend

![services-map-legend](/img/traces/services-map-legend.png)

* **Color** of services: Red indicates an anomaly and blue indicates normal activity. This is based on Automatic or Manual anomaly detection thresholds, which are configured in your **Settings**.
* **Shape** of services:
  * Circles represent connected application services
  * Cloud icons represent remote services like databases or external calls, which are automatically detected for you in client traffic even without using direct instrumentation
  * Arrows map out connection activity between services and their presence from the last 72 hours.
  * Circle and arrows with dotted lines represent services or connections that have been inactive an hour or more.
* **Size** of services: Size is based on service activity, where large circles are more active compared to smaller circles that are less active.  

### Settings

Your settings are specific to you (not your team) and will be preserved in your browser's local storage. Open the **Settings** menu by clicking the gears icon in the top-right corner.   

<img src={useBaseUrl('img/traces/settings-general.png')} alt="service map gear icon for settings" width="450"/>


### Services Dashboard Panels

The **Services Map** and **Services List** panels, available out of the box, enable you to explore your application environment and review all traces from your Dashboard. You can duplicate or add multiple panels with different filtering or queries to refine views and support your organization.

To add a Services panel to your Dashboard:

1. Open an existing Dashboard or create a new Dashboard (**+New** > **Dashboard New**).
1. On an existing Dashboard, click **Add Panel** > **Services**, or, on a new Dashboard, click **Services**.<br/> ![add-servicemap.png](/img/traces/add-servicemap.png)  
1. When the panel configuration page opens, go to the **Visual Settings** > **Chart Type**, dropdown and select **Table** (Services List) or **Graph** (Services Map). <br/> ![create-servicemap.png](/img/traces/create-servicemap.png)
1. Select from the dropdown menus to filter by the following:<br/>  ![filter-servicemap.png](/img/traces/filter-servicemap.png)
   * **Application** (Optional). You can use this if your tracing data has the `application=[app-name]` tag
   * **Environment**. Your production, staging, or development environment name
   * **Services**. To pass the variables from dashboard filters, set `application={{application}}` and/or `service={{service}}`
1. Go to the **General** tab to configure your panel details (name, **Title Font Size**, and **Description**). <br/> <img src={useBaseUrl('img/traces/tracelist-details.png')} alt="panel details" width="330"/>
1. For **Table** chart type only: Go to **Display Settings** and set the column data and services you'd like to see displayed.<br/> <img src={useBaseUrl('img/traces/display-settings-setup.png')} alt="display-settings-setup" width="500"/>
1. Click **Add to Dashboard**. The panel loads in your Dashboard to review your applications and services according to filtering.

:::tip
See the [Dashboard (New) guide](/docs/dashboards-new) for additional information and options to create panels, configure filters, create and filter with template variables from dashboard headers, and more.
:::


## Anomaly Detection

An anomaly is a spike in latency and errors or a dip in requests. In both **Map** view and **List** view, automatic anomaly detection is enabled by default. A service is displayed in a red circle if at least one of the KPIs (latency, errors, requests) has an anomaly in the last 15 minutes AND the anomaly was not present 7 days ago at the same time. In the **Settings** menu, this default option is called **Worst Case**. You can explicitly choose one of the KPIs instead.

The standard metric outlier operator is used to detect this. You can adjust the sensitivity and **learning window** of the outlier detection in the settings menu to make the logic more or less dependent on occasional spikes. 

<img src={useBaseUrl('img/traces/auto-service-map-settings.png')} alt="auto-service-map-settings" width="300"/>

Manual anomaly detection settings allow you to specify different detection settings for each KPI. Click the toggle switch to activate these settings on and off. You can explicitly toggle each KPI as desired.

<img src={useBaseUrl('img/traces/service-map-manual-detection-settings.png')} alt="service-map-manual-detection-settings" width="300"/>
