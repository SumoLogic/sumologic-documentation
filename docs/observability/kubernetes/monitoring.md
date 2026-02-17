---
id: monitoring
title: Monitoring Your K8s Environment
description: Learn how to effectively monitor your Kubernetes environment according to the individual areas of the Kubernetes architecture.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page provides insights for effectively monitoring your Kubernetes environment with Sumo Logic, and is organized according to the individual areas of the Kubernetes architecture.

## Navigating your Kubernetes environment

Sumo Logic allows you to monitor and troubleshoot your applications in Kubernetes using an intuitive mental model of Kubernetes hierarchies, instead of the server-based focus.

We currently provide four hierarchical Views of the Kubernetes system: Node, Deployment, Service, and Namespace. These views make it easy to traverse your Kubernetes hierarchy to monitor specific components, identify problems, discover root causes, and take progressive action.

* [Node](https://kubernetes.io/docs/concepts/architecture/nodes/): Observe the infrastructure topology of resources (e.g., physical nodes, VMs) on your private cloud, public cloud or bare metal.
* [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/): Observe how your Kubernetes deployment(s) perform against your specified criteria and manage changes.
* [Service](https://kubernetes.io/docs/concepts/services-networking/service/): Observe how your Kubernetes Service(s) interacts with your other services within and outside your cluster.
* [Namespace](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces): Track environments with many users spread across multiple teams, or projects like dev, lab, and prod.

<img src={useBaseUrl('img/kubernetes/K8s_Views_overview.png')} alt="Kubernetes views overview" style={{border: '1px solid gray'}} width="800" />

These intuitive hierarchies can be accessed from the [Kubernetes views](/docs/dashboards/explore-view/#kubernetes-views).


### Open Kubernetes views

:::info prerequisites
To start monitoring your Kubernetes environment, you'll need to set up data collection and core dashboards installation ([learn more](/docs/observability/kubernetes/quickstart)).
:::

Kubernetes views provide a visual representation of your Kubernetes stack.

To navigate and analyze your Kubernetes environment, do the following:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Observability**, and then under **Infrastructure Monitoring**, select **Kubernetes**. You can also click the **Go To...** menu at the top of the screen and select **Kubernetes**. <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Go to the **Home** screen and select **Explore**.  
1. In the upper-left corner of the screen, select the Kubernetes view you want from the dropdown menu.
1. Click the arrow to the left of a content name to expand and view its contents.<br/><img src={useBaseUrl('img/kubernetes/Explore_cluster_contents.png')} alt="Explore cluster contents" style={{border: '1px solid gray'}} width="400" />
1. Dead entities are shown faded:<br/><img src={useBaseUrl('img/kubernetes/faded-entity-explore.png')} alt="Dead entities" style={{border: '1px solid gray'}} width="300" />
1. Drill down into the clusters to view the pods and containers. The data for your selection is displayed in the panels of the dashboard on the right.<br/><img src={useBaseUrl('img/kubernetes/Explore_Drill-Down.png')} alt="Explore drill-down" style={{border: '1px solid gray'}} width="800" />
1. Optional: Select another type of dashboard display from the dropdown menu at the top of the dashboard, and select another time interval.<br/><img src={useBaseUrl('img/kubernetes/Explore_Drill-Down_Dashboard_options.png')} alt="Explore drill-down dashboard options" style={{border: '1px solid gray'}} width="800" />

<!--
    The navigation panel appears on the left with a collapsed view of your Kubernetes stack.

    <img src={useBaseUrl('img/kubernetes/Explore_Collapsed_view.png')} alt="Explore collapsed view" style={{border: '1px solid gray'}} width="800" />

    * If this is your first time using the view, the window at the right will be empty.
    * If you have already installed a Sumo Logic App for Kubernetes, a dashboard displaying data for the selected deployment appears on the right. For instructions on installing the Sumo Logic Kubernetes App, see the [Kubernetes Solution help pages](collection-setup.md). 

1. Now you can navigate your Kubernetes environment and analyze the landscape.

### Analyzing the Kubernetes landscape 

The views allow you to quickly navigate through your Kubernetes environment and assess the landscape of the hierarchy. The navigation panel on the left shows a list of all your clusters with the namespaces, containers, and pods nested underneath each cluster.

-->

### Drilling into related content 

Sumo Logic provides relevant log searches and dashboards to consider investigating, as well as other locations with relevant content. This facilitates quickly discovering the root cause and devising a plan of action.

To discover and view related content, select the graph data point you are interested in. In the following screenshot, we selected a cell in a honeycomb chart. A panel appears on the right of the window with details and a list of related content links.

<img src={useBaseUrl('img/kubernetes/details-pane-Explore.png')} alt="Details pane in Explore" style={{border: '1px solid gray'}} width="800" />

#### Summary tab

Select links from the **Summary** tab, to go directly to:

* [Linked dashboards](/docs/dashboards/panels/modify-chart#link-dashboards)
* Recommended dashboards - Currently, only dashboards from the Kubernetes app are supported.

### Custom dashboards

You can make your own custom dashboards to show up in the view by using the stack linking capability within dashboards.

In order to link a dashboard to an existing Kubernetes hierarchy, your entity key in Stack Linking must be the same as the explored entity on the view.

For example, if you want you custom Kubernetes deployment dashboard to show up in explorer, you will have to add the following entities in the stack linking (as shown below), since those entities are used as filters on the view:

* Cluster
* Namespace
* Deployment


<img src={useBaseUrl('img/kubernetes/deploy1.png')} alt="Cluster" style={{border: '1px solid gray'}} width="800" />

<br/><br/><img src={useBaseUrl('img/kubernetes/deploy2.png')} alt="Namespace" style={{border: '1px solid gray'}} width="800" />

Once you have created the stack linking, your custom dashboard should appear in the list of dashboard associated with a specific entity view in explorer.

<img src={useBaseUrl('img/kubernetes/deploy3.png')} alt="Deployment" style={{border: '1px solid gray'}} width="800" />

<!--
## Explore a Visual Kubernetes Hierarchy

**Explore** is an intuitive navigational framework that provides a visual map of the hierarchy of your Kubernetes environment. It allows you to traverse the hierarchy and filter the display to focus on deployments, nodes, services, or namespaces. Explore accomplishes this by translating metadata fields into an easy to understand mental model so you can quickly check system states at various levels and proactively troubleshoot issues. 

<img src={useBaseUrl('img/kubernetes/K8s_Views_overview.png')} alt="Kubernetes views overview" style={{border: '1px solid gray'}} width="800" />

Health and performance data appears in the dashboard on the right for the view you are investigating: node, deployment, service, or namespace. The Sumo Logic dashboard framework is unique in its ability to show logs and metrics in a seamless integration with the same dashboard.

In the following example, we chose the Kubernetes Node View and selected the k8s-freno-2 cluster. We then selected the Kubernetes - Cluster Overview dashboard, for a high-level view of the health and performance of the cluster.

<img src={useBaseUrl('img/kubernetes/K8s_Dashboard_overview.png')} alt="Kubernetes dashboard overview" style={{border: '1px solid gray'}} width="800" />


## Kubernetes logs and metrics

Sumo Logic utilizes the following Open Source applications to provide insights into logs and metrics in your Kubernetes environment:

* **FluentD**, an Open Source collector, is used to collect logs from the Kubernetes cluster, then forwards them to Sumo Logic. This includes cluster and container orchestration logs, as well as logs generated by apps on your pods.
* **Prometheus**, an Open Source monitoring tool, is used to collect metrics that provide data on the cluster, node, and pod level.

### Metrics rich monitoring

Sumo Logic provides scraper utility that collects Prometheus formatted metrics from exporters. The metrics are then enriched with metadata and sent to Sumo Logic via HTTP. Sumo Logic Kubernetes apps show Prometheus format metrics in graphic display dashboards for intuitive analysis.

### How Kubernetes exposes metrics

* Exporters expose metrics on a particular port and endpoint.
* Node exporter can be run to expose node metrics, such as CPU and memory utilization which can be used to monitor the health of your nodes.
* Kube State add-on exposes cluster level state information.

<img src={useBaseUrl('img/kubernetes/Intro_Prometheus_Metrics.png')} alt="Intro Prometheus metrics" style={{border: '1px solid gray'}} width="800" />

-->

## Using metadata to power your search

You can create fields with key-value pairs that label logs with custom metadata. Referencing log data with fields based on meaningful associations makes searches easier and more intuitive. Sumo Logic allows you to add custom fields to collectors that define key-value pairs at the source level. The custom fields in the metadata streams are then automatically extracted for searching, querying, and graphing. This allows you to view results for intuitively referenced subsets not traditionally tagged as source categories. 

This page shows you how to define a custom field on a collector, and then how to effectively use the custom metadata to search log data.

:::tip
To learn more about adding meaningful information to your data so you have more control and an easier time referencing data in searches, see the Data Enrichment and Fields pages.
:::

### Adding custom fields to collectors

You can add custom fields to collectors for more intuitive searches, partitions, and Role-Based Access Control (RBAC) queries. After which, the log data that passes through the collector automatically inherits the custom metadata. You can create a custom field label for anything that is "collected" and adapt your logs to familiar naming conventions. 

:::note
Custom metadata is usually set up by your administrator. Check with your site administrator before adding a custom key-value pair to a collector.
:::

The following task shows you how to create a custom field for a collector. In this process, you assign a custom key-value pair in the field to tag the metadata. In this example, we create two fields with a key-value pairs, one for a cluster and one for a pod. 

To add a custom field to a collector, do the following:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu select **Data Management**, and then under **Data Collection** select **Collection**. You can also click the **Go To...** menu at the top of the screen and select **Collection**.  <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic).  In the main Sumo Logic menu, select **Manage Data > Collection > Collection**. 
1. Select the collector to which you want to add a custom key-value pair. In this example, we've selected the Falco collector.<br/><img src={useBaseUrl('img/kubernetes/MM_Collection_Select_Collector.png')} alt="Select collector" style={{border: '1px solid gray'}} width="800" /><br/>
    The Edit Collector dialog appears.
1. Click **Add Field**.<br/><img src={useBaseUrl('img/kubernetes/MM_Add-Field.png')} alt="Add field" style={{border: '1px solid gray'}} width="600" />
1. Enter a field name and value in the respective text fields. In this example, we created a field for a **cluster** with the label **k8s.dev** and a pod with the name **pod_test** and label **k8s.test**. This allows you to easily search for log data for that cluster or pod.
    * <img src={useBaseUrl('img/reuse/green-check-circle.png')} alt="green check circle.png" width="20"/> A green circle with a check mark appears when the field exists and is enabled in the fields table schema.
    * <img src={useBaseUrl('img/reuse/orange-exclamation-point.png')} alt="orange exclamation point.png" width="20"/> An orange triangle with an exclamation point appears when the field doesn't exist yet, or is disabled, in the fields table schema. In this case, an option to automatically add or enable the nonexistent fields to the fields table schema is provided. If a field is sent to Sumo that does not exist in the fields schema or is disabled it is ignored, known as dropped.<br/><img src={useBaseUrl('img/kubernetes/MM_Fields_Key-Value-Pairs.png')} alt="Fields key-value pairs" style={{border: '1px solid gray'}} width="600" />
1. Click **Save**.

Now, any logs sent to this Collector will have these key-value pairs associated with it. With this association, you can search for `cluster=k8s.dev` or `pod_test=k8s.test` to return your logs.

### Leveraging metadata for quicker results

In this section, you'll learn how to use metadata to search by components of the Kubernetes environment, such as containers, pods, and namespaces for localized investigation and analysis. You will also use metadata set with key-value pairs to effectively find the log data, and display Kubernetes labels and view the respective data in your query results.

To use metadata to view Kubernetes components and display Kubernetes label results, do the following:

1. [**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Logs > Log Search**. You can also click the **Go To...** menu at the top of the screen and select **Log Search**.  <br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). Go to the **Home** screen and select **Log Search**. 
1. Indicate the metadata namespace. In this example, we entered `namespace=sumologic`.<br/><img src={useBaseUrl('img/kubernetes/MWT_namespace.png')} alt="namespace=sumologic" style={{border: '1px solid gray'}} width="800" />
1. Click **Start** to run the query, then under **Hidden Fields** on the **Messages** tab, click **namespace** to display the metadata for that Kubernetes component. Notice that the namespace field moves **Hidden Fields** to **Display Fields**.<br/><img src={useBaseUrl('img/kubernetes/MWT_namespace_Display_Fields.png')} alt="Namespace display fields" style={{border: '1px solid gray'}} width="500" />
1. To view metadata for a key-value pair, enter the key-value pair in the query text field. In our example, we wanted to view the metadata for the prometheus container and entered `container=prometheus`.
1. Then we expanded the search range by changing the time interval from the last 15 minutes to the **Last 60 minutes**.
1. To further investigate the container, we clicked **Logreduce**, which groups common log messages into signature groupings. 
1. To examine the details of the smaller set of signatures that appear, under **Select Count** we selected. Oftentimes when troubleshooting a problem, our lesser quantity contains the root cause.<br/><img src={useBaseUrl('img/kubernetes/MWT_LogReduce_1.png')} alt="Select Count" style={{border: '1px solid gray'}} width="800" /><br/>
    The warning `Endpoints ended with: too old resource version` may be something to investigate or just the indication of an ongoing upgrade.
1. To view data for other Kubernetes components, we can enable them one by one by selecting the checkbox next to **namespace**, **cluster**, **container**, **pod**, **service**, and/or **Source Host**.

:::note
If this was an ongoing upgrade, the **Source Host** ip address would help pinpoint the servers that may still need upgrading.
:::

<!--
### How Metadata Works

Metadata allows you to view your data in an intuitive mental model, as a visual representation of your Kubernetes environment within Sumo Logic. Explore uses metadata to unify metric and log streams with a centralized agent. The centralized agent has the ability to access multiple data streams across the platform with a common language comprised of metadata objects. Log and metric data are then displayed seamlessly in panels on the same dashboards.

The following image illustrates the Explore intuitive "mental model" concept. The side-by-side views show a traditional infrastructure-centric model for visualizing service events on the left, and the Explore intuitive mental model for visualizing the data for the same service events on the right.

<img src={useBaseUrl('img/kubernetes/infrastructure-vs-service.png')} alt="Infrastructure vs service" style={{border: '1px solid gray'}} width="800" />


-->
