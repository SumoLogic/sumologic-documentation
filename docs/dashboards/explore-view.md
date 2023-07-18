---
id: explore-view
title: Explore
description: Explore gives you an easy way to view and navigate the hierarchy of your environment.
---

import Iframe from 'react-iframe';
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/dashboards-new/explore/explore.png')} alt="Explore" width="50"/>

**Explore** is a navigation tool that provides an intuitive visual hierarchy of your environment. Use Explore to facilitate successful monitoring, managing, and troubleshooting.

:::note
If you're looking for our Root Cause Explorer observability tool, [click here](/docs/observability/root-cause-explorer).
:::

## Navigating Explore

To open Explore, do the following:

1. Log in to Sumo Logic and click **+ New** on the top menu bar.
2. From the dropdown menu, choose **Explore**.<br/><img src={useBaseUrl('img/dashboards-new/explore/Explore-open.png')} alt="Explore" />
3. In the **Explore By** navigation panel, select your desired category (e.g., AWS Observability), then drill down further until you find your desired component which you'd like to explore. Metrics will be displayed/visualized as dashboards. See [Application Components View](/docs/dashboards/explore-view/#application-components-view) for an example walkthrough.

## Explore dashboard categories

Explore can be accessed using Dashboard in conjunction with the below apps and solutions.

### Stack linking

Stack linking connects **Dashboard** to Explore so you can view dashboards when exploring infrastructure components. [Learn more](/docs/dashboards/link-dashboards.md). <br/><img src={useBaseUrl('img/dashboards-new/explore/stack-linking.png')} alt="Explore" width="500"/>

### AWS Observability

Explore provides an intuitive dashboard framework that mirrors industry-standard AWS hierarchies. You can quickly navigate across multiple AWS accounts and view resources hosted in multiple locations worldwide. From the Explore tab, you can quickly navigate across multiple AWS accounts and view resources hosted in multiple locations worldwide. [Learn more](/docs/observability/aws/deploy-use-aws-observability/view-dashboards.md).<br/><img src={useBaseUrl('img/dashboards-new/explore/aws-view.png')} alt="Explore" width="400"/>

### Kubernetes Observability

Explore provides a visual hierarchy of the clusters in your environment that allows you to view and switch between clusters with a single click. Explore, used in conjunction with the Sumo Logic [Kubernetes App](/docs/integrations/containers-orchestration/kubernetes.md), allows you to intuitively monitor and troubleshoot issues as they arise. From the Explore tab, you can intuitively filter on four hierarchical views of your Kubernetes system: Node, Deployment, Service, and Namespace. [Learn more](/docs/observability/kubernetes/monitoring.md).<br/><img src={useBaseUrl('img/dashboards-new/explore/k8s-view.png')} alt="Explore" width="400"/>

### Database View​

Explore provides a set of dashboards for various components of your application that allow you to review the state of individual parts of your system. You can track errors, performance, and usage of application components, grouped by their type and logical clusters.

:::note
This feature is currently supported only for Database apps. To learn more, go to the [Database docs](/docs/integrations/databases) and [Application Component Solution](/docs/observability/application-components).
:::

1. Select the **Database View** category.
1. Select an environment (e.g., `dev` or `prod`).
   * **Application Components - Environments Overview** will appear on the right. This dashboard provides insights into the CRUD activities and monitor errors of each of the components in that environment.
1. Select from the list of that environment's components (e.g., `Elastisearch Clusters`).
   * The respective dashboard will appear in the right nav.
1. Then choose a specific database .
1. Drill down into hierarchy to find specific component entities to view dashboards at more granular levels.
1. Toggle between various dashboards to get your desired info.<br/><img src={useBaseUrl('img/dashboards-new/explore/db-drilldown.png')} alt="Explore" width="800"/>

### Application service views

Explore provides three Service and Application dashboard views accessible through the **Explore By** menu. This allows you to review tracing data by application (all or grouped), environment, and services by top level and breaking down their health by application. This helps you review the most active operations performed on specified applications and services. See [Service Map Traces](/docs/apm/traces/services-list-map) and [Sumo Logic Apps](/docs/integrations) for more info. <br/><img src={useBaseUrl('img/dashboards-new/explore/apm-service-view.png')} alt="Explore" width="400"/>

### Real User Monitoring

[Real User Monitoring](/docs/apm/real-user-monitoring): Explore allows you to visualize Real User Monitoring (RUM) metrics gathered from tracing instrumentation in the browser. This provides visibility into an actual end-user experience by geographical locations, browser, and operating system types. This also helps you to understand how your customers experience the performance of your web application.<br/><img src={useBaseUrl('img/dashboards-new/explore/stack-linking.png')} alt="Explore" />

## Filtering Explore

Explore provides the ability to filter your view so you can focus on specific entities and sections of your system.

### Create filters

1. To filter Explore click the filter icon in the left-hand navigation menu. You can click the icon to toggle the visibility of the menu.<br/><img src={useBaseUrl('img/dashboards-new/explore/brand-themefilter.png')} alt="Explore" />

2. Once clicked the filter menu appears below:<br/><img src={useBaseUrl('img/dashboards-new/explore/brand_theme_filter_options.png')} alt="Explore" />

  The **Filter** menu allows you to select a saved filter or write a new one. If you have any saved filters they are available in the dropdown menu **Filter**. The default value is **None Selected**. The **Clear All** button is available to clear any filters that are already applied.

3. To create a new filter click in the **Enter a key value pair to create a filter** input area. A dropdown will appear showing you available keys you can filter by. You may only provide a **value** without a key.<br/><img src={useBaseUrl('img/dashboards-new/explore/select-filter.png')} alt="Explore" width="400"/>

4. Enter or select the keys you want to filter by then click **Apply**. Filters of the same key behave as an **OR** condition and different keys behave as an **AND** condition.<br/><img src={useBaseUrl('img/dashboards-new/explore/brand_theme_apply_filters.png')} alt="Explore" width="500"/>

The Dashboard and Explore menu will refresh with your filters applied.

:::tip Negation
You can apply the filter as an exclusion or negation so the filter acts as a `not` or bang `!`. This way the filter will return results that don't have those values. Simply click the prohibition or _no_ sign to set. The filter will get a red border when set to exclude. You may manually add an exclamation or bang `!` to the input area before selecting your filter. For example, `!_key=value`.
:::

### Saving filters

You can save filters so they are applied every time you explore the same Dashboards. To save, click the three-vertical dots icon and then click **Save**.<br/><img src={useBaseUrl('img/dashboards-new/explore/brand_theme_save_filters.png')} alt="Explore" width="500"/>

A pop up window is shown where you need to provide the filter a name. This name is what you'll see in the **Filter** dropdown menu.<br/><img src={useBaseUrl('img/dashboards-new/explore/savefilter.png')} alt="Explore" width="350"/>

We have named the filter "primary" in the above image. Once done click **Save**. When opening Explore you'll now see the **primary** filter as an option in the **Filter** menu.<br/><img src={useBaseUrl('img/dashboards-new/explore/select-saved-filters.png')} alt="Explore" width="500"/>

### Updating, Deleting, Saving filters as default

Saved filters can be applied as a default filter, edited, or deleted.
* A default filter is applied every time you open Explore.
* The update option is available if you edit a saved filter.
* A deleted filter is not recoverable.

<img src={useBaseUrl('img/dashboards-new/explore/set-default.png')} alt="Explore" width="500"/>

### Remove Default filter

The default filter is displayed in the **Filter** dropdown menu with a **Default** label. Select the **Remove default** text link to clear your set default filter.<br/><img src={useBaseUrl('img/dashboards-new/explore/remove-default-filter.png')} alt="Explore" width="400"/>

## Linking to entities in Explore

### Obtaining Links

Use the link button to the right of the Dashboard title in Explore to copy the link to your specific entity view in the dashboard. This is related to [Stack Linking](/docs/dashboards/link-dashboards.md).<br/><img src={useBaseUrl('img/dashboards-new/explore/link-explore-dashboard.png')} alt="Explore" />

### Manually creating links

You can create a URL to a specific entity in Explore.

### Syntax

```xml
https://<endpoint>/ui/#/explore/[@<startMs>,<endMs>]@topology=<topologyId>@<entityId>,<entityTypeId>,<entityName>[@<entityId>,<entityTypeId>,<entityName>][@filters@<negation>:<filterValue>[:<filter>],<negation2>:<filterValue2>[:<filter2>] ...]@selectedDashboardId@<dashboardId>
```

Required:
* `<endpoint>` is your Sumo Logic service endpoint. See [Sumo Logic Endpoints and Firewall Security](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) for the endpoint URLs.
* `<entityKey>` is the type of entity you want to explore, such as cluster, deployment, service, node, account, region, namespace, or pod.
* `<entityValue>` is the value of the entity to explore.

Optional arguments:
* `<start>` is the start of your dashboard time range in milliseconds since epoch.
* `<end>` is the end of your dashboard time range in milliseconds since epoch.

Filters:
* `<filterValue>` is the value of a key you want to filter.
* `<filter>` (optional) is the metadata key you want to apply as a filter to explore. You do not have to provide a filter, you may only provide a `filterValue`.
* `<negation>` set as `0` to apply your filters or `1` to treat the filters as an exclusion. Think of using `1` as using a `not` or `!` bang, so the filter will return results that don't have those values. This is an example:
```xml
https://<endpoint>/ui/#//explore/@1628023955694,1628024855694@topology=0000000000000041@cluster=kubernetes@filters@1:cl-tracing-training:_collector,0:kubernetes:_origin
```
Dashboard:
* `<dashboardId>` is the unique identifier of the Dashboard.

#### Example

Let’s create a URL to open Explore on the `primary-eks `cluster, `kube-system` namespace, and `metrics-server` service.

The custom URL that launches this log query in the Sumo Logic Search page would be similar to the following. The exact URL would depend on your Sumo Logic account endpoint, as listed in [Sumo Logic Endpoints and Firewall Security](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security).
```bash
https://service.us2.sumologic.com/ui/#/explore/@cluster=primary-eks@namespace=kube-system@service=metrics-server
```

Using milliseconds as this time range: 09/26/2020 to 09/29/2020 10:33:10.282 AM GMT-04:00 DST
```bash
https://service.us2.sumologic.com/ui/#/explore/@1601092800000,1601389990282@cluster=primary-eks@namespace=kube-system@service=metrics-server
```

## Troubleshooting with Explore

Explore navigation capabilities allow you to quickly locate the object that needs debugging in a physical stack. This page walks you through a high-level troubleshooting scenario to illustrate the possibilities.

<Iframe url="https://www.youtube.com/embed/CEBN4lRp4SU?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

### Step 1: Analyzing the cluster

We suspect there's a problem with a Kubernetes cluster but aren't sure where, so we start by analyzing the Cluster Overview dashboard. Everything that is running on the cluster is shown on this dashboard. The Terminated and Waiting by Namespace panel allows us to easily comprehend the failure states the namespaces are in. Here we can easily see if there are configuration issues or overall administration issues that need to be addressed.<br/><img src={useBaseUrl('img/dashboards-new/explore/Explore_TS_Cluster_Overview.png')} alt="Explore" />

### Step 2: Exploring a namespace

To further pinpoint the problem with our cluster, we investigated the namespace by selecting kube-system in the navigation panel and switching to the Namespace Overview dashboard. This dashboard provides information on pods running in the deployment, failed pods, errors, CPU and memory usage, file system usage, terminated and waiting pods and containers. In this example, we're focusing on the CPU and memory usage panels of the dashboard in our attempt to find out where our application is running into problems.<br/><img src={useBaseUrl('img/dashboards-new/explore/Explore_TS_Namespace_Overview.png')} alt="Explore" />

### Step 3: Drilling down into a pod

Once we've determined which pod is having problems, we can drill down into the pod for more granular data. For example,  you can select the Details icon for a panel to view that data in a search. Or, you can review the actual logs in the Log Stream panel.<br/><img src={useBaseUrl('img/dashboards-new/explore/Explore_TS_Pod_drill-down.png')} alt="Explore" />
