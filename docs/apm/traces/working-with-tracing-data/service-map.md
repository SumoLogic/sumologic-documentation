---
id: service-map
title: Services List and Map
description: View your application topology and investigate microservice interactions.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

To open the Services List and Map, click **+ New** > **Services**.<br/> <img src={useBaseUrl('img/traces/open-service-map.png')} alt="open servicemap" width="400"/>

## Service List view

The **Service List** view provides a compact, high-level overview of your application service health insights and KPIs.

![panel-service.png](/img/traces/service-list.png)


## Service Map view

The **Service Map** view visually maps out your application environment, giving you a greater understanding of your application architecture, hierarchy, and dependencies between monitored microservices. Health and load of each microservice is reflected in size and color to help you spot potential problems and bottlenecks in your application infrastructure.

The map is built automatically from distributed tracing data in real time as it arrives in Sumo Logic.

The Service Map provides the following features:

* Zoom in and out on the map.
* Hover over a service to see its connections to other services and the last 15 minutes of activity in terms of latency, requests, and errors.
* Click on a service to open the Entity Inspector with the ability to drill down to traces, metrics, and the service dashboard.
* Filter by application, if your tracing data has the `application=[app-name]` tag.
* Search for a service by name.<br/> ![service map april 2021.png](/img/traces/service-map-example.png)
* Color of services: The color of services is based on automatic (default) or manual thresholds you can configure in the settings menu. Red indicates an anomaly and blue indicates normal activity.
* Shape of services: Remote services, like databases or external calls, automatically detected in client traffic, even without actual direct instrumentation, are visualized using the cloud icons instead of circles.<br/> <img src={useBaseUrl('img/traces/service-circles.png')} alt="servicecircles" width="250"/>
* Arrows: The Service Map shows activity between services and their presence from the last 72 hours, however, if the service or connection was inactive for more than one hour, it is displayed with dashed lines.
* Size of services: The size of services on the map is based on how active they are, where large circles are more active compared to small circles that are less active.  

### Settings

Settings are user-specific and preserved in your browser's Local Storage, so each user can have their own specific settings to view Service Map health indicators. The settings menu opens by clicking the gears icon in the top-right corner of the map.   

![service map gear icon for settings.png](/img/traces/service-map-gear-icon-for-settings.png)

#### Anomaly Detection

Automatic anomaly detection is enabled by default. A service is displayed in a red circle if at least one of the KPIs (latency, errors, requests) has an anomaly (a spike for latency and errors or dip in the case of requests) in the last 15 minutes AND the anomaly was not present 7 days ago at the same time. In the settings menu, this default option is called **Worst Case**. You can explicitly choose one of the KPIs instead.

The standard metric outlier operator is used to detect this. You can adjust the sensitivity and **learning window** of the outlier detection in the settings menu to make the logic more or less dependent on occasional spikes. 

![auto service map settings.png](/img/traces/auto-service-map-settings.png)

Manual anomaly detection settings allow you to specify different detection settings for each KPI. Click the toggle switch to activate these settings on and off. You can explicitly toggle each KPI as desired.

![service map manual detection settings.png](/img/traces/service-map-manual-detection-settings.png)

### Service Map Dashboard Panels

You can add Service Map panels to explore your application environment directly through your Dashboard. Duplicate or add multiple panels with different filtering or queries to refine views and support your organization. 

The Service Map panel displays a service map for filtered applications and services, with the ability to explore the environment. To add a Service Map panel to your Dashboard:

1. Open a Dashboard or create a new Dashboard.
1. Click **Add Panel** and select **Service Map**. Or select the **Service Map** option on a new Dashboard.<br/> ![add-servicemap.png](/img/traces/add-servicemap.png)  
1. A panel configuration page opens.  <br/> ![create-servicemap.png](/img/traces/create-servicemap.png)
1. Select from the dropdown menus to filter the Service Map by the following:<br/>  ![filter-servicemap.png](/img/traces/filter-servicemap.png)
   * **Application** if your tracing data has the `application=[app-name]` tag
   * **Service**
   * To pass the variables from dashboard filters, set `application={{application}}` and/or `service={{service}}`
1. Do not set the time. Service Map always shows last 72h of data.
1. The **Chart Type** is set to Graph.
1. Click the **General** tab to edit the Panel Details. Enter a name for the panel, set a **Title Font Size**, and add a short **Description**. <br/>![tracelist-details.png](/img/traces/tracelist-details.png)
1. Click **Add to Dashboard**. The panel loads in your Dashboard to review your applications and services according to filtering.<br/>  ![panel-service.png](/img/traces/panel-service.png)

:::tip
See the [Dashboard (New) guide](/docs/dashboards-new) for additional information and options to create panels, configure filters, create and filter with template variables from dashboard headers, and more.
:::
