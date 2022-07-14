---
id: navigate-kubernetes-environment
title: Navigate your Kubernetes environment
sidebar_label: Navigating Your Environment
---

## Navigating with Explore

This section shows you how to quickly access Explore and navigate your Kubernetes environment. As you navigate, data for your selection is shown in the dashboard on the right. Metric and log data is viewable on the same dashboard in one integrated, seamless view.

### Open Explore

Explore is an out-of-the-box Sumo Logic view that you can use to navigate a visual representation of your Kubernetes stack.

To open Explore, do the following:

1. Log in to Sumo Logic and click **+ New** on the top menu bar.
1. From the drop-down menu, choose **Explore**. 

    ![Explore_Open.png](/img/kubernetes/Explore_Open.png)

    The Explore navigation panel appears on the left with a collapsed view of your Kubernetes stack.

    ![Explore_Collapsed_view.png](/img/kubernetes/Explore_Collapsed_view.png)

    * If this is your first time using Explore, the window at the right will be empty.
    * If you have already installed a Sumo Logic App for Kubernetes, a dashboard displaying data for the selected deployment appears on the right. For instructions on installing the Sumo Logic Kubernetes App, see the [Kubernetes Solution help pages](set-up-collection-kubernetes.md). 

1. Now you can [navigate your Kubernetes environment and analyze the landscape](#navigate-and-analyze-the-kubernetes-landscape).

### Navigate and analyze the Kubernetes landscape 

Explore provides a framework of Views that allow you to quickly navigate through your Kubernetes environment and assess the landscape of the hierarchy. The navigation panel on the left shows a list of all your clusters with the namespaces, containers, and pods nested underneath each cluster.

To navigate Kubernetes environment and analyze the landscape, do the following:

1. At the top of the navigation panel, click **Explore By** to expand the menu and make a selection for the top level hierarchy. The contents of your selection appear below.

![Explore_By_Options.png](/img/kubernetes/Explore_By_Options.png)

1. Click the arrow to the left of a content name to expand and view its contents. 

    ![Explore_cluster_contents.png](/img/kubernetes/Explore_cluster_contents.png)

    Dead entities are shown faded:

    ![faded entitiyexplore.png](/img/kubernetes/faded-entitiy-explore.png)

1. Drill-down into the clusters to view the pods and containers. The data for your selection is displayed in the panels of the dashboard on the right.

    ![Explore_Drill-Down.png](/img/kubernetes/Explore_Drill-Down.png)

1. Optional: Select another type of dashboard display from the drop-down menu at the top of the dashboard, and select another time interval.

![Explore_Drill-Down_Dashboard_options.png](/img/kubernetes/Explore_Drill-Down_Dashboard_options.png)

### Drilling into related content 

Sumo Logic provides relevant log searches and dashboards to consider
investigating, as well as other locations with relevant content. This
facilitates quickly discovering the root cause and devising a plan of
action.

To discover and view related content, do the following:

1. Select the graph data point you are interested in. In the following screenshot, we selected a cell in a honeycomb chart. A panel appears on the right of the window with details and a list of related content links.

    ![details pane in Explore.png](/img/kubernetes/details-pane-Explore.png)

#### Summary tab

Select links from the **Summary** tab to go directly to:

* Linked Dashboards 
* Recommended Dashboards - Currently, only dashboards from the Kubernetes App are supported.

#### Infrastructure tab

The **Infrastructure** tab provides the following **Troubleshooting Links** for related Entities and Environments. To investigate, click an icon to launch another feature against the entity or environment. An icon is not available if it's irrelevant. 

* ![explore-icon-small](/img/kubernetes/explore-icon-small.png) Explore
* ![raw-logs-icon](/img/kubernetes/raw-logs-icon.png) Logs
* ![traces-icon](/img/kubernetes/traces-icon.png) Traces
* ![metrics-icon](/img/kubernetes/metrics-icon.png) Metrics

![infrastructure](/img/kubernetes/infrastructure.png)


## Explore a Visual Kubernetes Hierarchy

**Explore** is an intuitive navigational framework that provides a visual map of the hierarchy of your Kubernetes environment. It allows you to easily traverse the hierarchy and filter the display to focus on deployments, nodes, services, or namespaces. Explore accomplishes this by translating metadata fields into an easy to understand mental model so you can quickly check system states at various levels and proactively troubleshoot issues. 

![K8s_Views_overview.png](/img/kubernetes/K8s_Views_overview.png)

Health and performance data appears in the dashboard on the right for the view you are investigating: node, deployment, service, or namespace. The Sumo Logic Dashboard (New) framework is unique in its ability to show logs and metrics in a seamless integration with the same dashboard.

In the following example, we chose the Kubernetes Node View and selected the k8s-freno-2 cluster. We then selected the Kubernetes - Cluster Overview dashboard, for a high-level view of the health and performance of the cluster. For more information, go to [Navigate your Kubernetes environment](navigate-kubernetes-environment.md).

![K8s_Dashboard_overview.png](/img/kubernetes/K8s_Dashboard_overview.png)

### How Metadata Works

Metadata allows you to view your data in an intuitive mental model, as a visual representation of your Kubernetes environment within Sumo Logic. Explore uses metadata to unify metric and log streams with a centralized agent. The centralized agent has the ability to access multiple data streams across the platform with a common language comprised of metadata objects. Log and metric data are then displayed seamlessly in panels on the same dashboards.

The following image illustrates the Explore intuitive "mental model" concept. The side-by-side views show a traditional infrastructure-centric model for visualizing service events on the left, and the Explore intuitive mental model for visualizing the data for the same service events on the right.

![Infrastructure vs service.png](/img/kubernetes/infrastructure-vs-service.png)
