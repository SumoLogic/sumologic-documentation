---
id: apps
title: Sumo Logic Apps for Kubernetes
sidebar_label: Install Kubernetes Apps
description: Learn about the Sumo Logic Kubernetes apps.
---

Sumo Logic provides a selection of Kubernetes apps to monitor various different aspects of your Kubernetes platform and environment. The apps provide out-of-box dashboards and other content relevant for you to monitor your K8s environment.

## Kubernetes app

The [Sumo Logic Kubernetes App](/docs/integrations/containers-orchestration/kubernetes.md) provides visibility into the operations and security of the worker nodes in a cluster, as well as the application logs of the worker nodes.

The app is a single-pane-of-glass through which you can monitor and troubleshoot container health, replication, load balancing, pod state, and hardware resource allocation. The App also integrates with Falco, an open source container native runtime security tool, to monitor and detect anomalous container, application, host, and network activity. 

One Kubernetes app can monitor multiple clusters, utilizing Falco events to detect abnormal container, application, host, and network activity. We generally recommend using it in conjunction with the Sumo Logic App for Kubernetes Control Plane, depending on your deployment.

It can also work in conjunction with the Sumo Logic Apps for AKS Control Plane, GKE Control Plane, and EKS Control Plane apps to provide visibility into the control plane, including the API server, scheduler, and controller manager.

The following dashboard is an example of one of the many pre-configured dashboards you can access with the app to view and analyze data from your Kubernetes environment.

![K8s_Cluster_Overview.png](/img/kubernetes/K8s_Cluster_Overview.png)

## Kubernetes Control Plane app

The [Sumo Logic Kubernetes Control Plane App](/docs/integrations/containers-orchestration/kubernetes-control-plane.md) monitors and manages the master node control plane, including the API server, etcd, kube-system, and worker nodes. The App utilizes [Falco](https://falco.org/docs/) Kubernetes Audit events to monitor and detect notable or suspicious activity, such as creating pods that are privileged, mounting sensitive host paths, and using host networking. Seamlessly integrated with the Sumo Logic Kubernetes App, pre-configured dashboards display resource-related metrics for Kubernetes deployments, clusters, namespaces, pods, containers, and daemonsets.

The following dashboard is an example of one of the many pre-configured app dashboards you can access to view and analyze data from your Kubernetes environment.

![K8s_CP_Controller_Manager.png](/img/kubernetes/K8s_CP_Controller_Manager.png)

## Amazon EKS - Control Plane app

The [Sumo Logic App for Amazon EKS - Control Plane](/docs/integrations/amazon-aws/eks-control-plane.md) provides visibility into the EKS control plane with operational insights into the API server, scheduler, control manager, and worker nodes. The app’s pre-configured dashboards display resource-related metrics for Kubernetes deployments, clusters, namespaces, pods, containers, and daemonsets. This app works in conjunction with Sumo Logic Kubernetes app that provides visibility into worker node metrics and application logs.

The following dashboard is an example of one of the many pre-configured app dashboards you can access to view and analyze data from your Kubernetes environment.

![EKS_API_Server_Overview.png](/img/kubernetes/EKS_API_Server_Overview.png)

## Azure Kubernetes System (AKS) - Control Plane app

The [Sumo Logic App for Azure Kubernetes Service (AKS) - Control Plane](/docs/integrations/microsoft-azure/kubernetes.md) provides visibility into the AKS control plane with operational insights into the API server, scheduler, control manager, and worker nodes. The pre-configured app dashboards display resource-related metrics for Kubernetes deployments, clusters, namespaces, pods, containers, and daemonsets. This app works in conjunction with Sumo Logic Kubernetes app that provides visibility into worker node metrics and application logs.

The following dashboard is an example of one of the many pre-configured app dashboards you can access to view and analyze data from your Kubernetes environment.

![AKS_Scheduler.png](/img/kubernetes/AKS_Scheduler.png)

## Google Kubernetes Engine (GKE) - Control Plane app

The [Sumo Logic App for Google Kubernetes Engine (GKE) - Control Plane](/docs/integrations/google/kubernetes-engine.md) allows you to monitor resource-related logs and metrics for Kubernetes deployments, clusters, namespaces, pods, containers, and daemonsets. The App provides visibility into the GKE control plane with operational insights into the API server, control manager, and worker nodes. This app works in conjunction with Sumo Logic Kubernetes app that provides visibility into worker node metrics and application logs.

The following dashboard is an example of one of the many pre-configured app dashboards you can access to view and analyze data from your Kubernetes environment.

![GKE_Node_Logs.png](/img/kubernetes/GKE_Node_Logs.png)


## Global Intelligence for Kubernetes DevOps app

The [Global Intelligence for Kubernetes DevOps app](/docs/integrations/global-intelligence/kubernetes-devops) helps infrastructure engineers and DevOps users benchmark the maturity of their Kubernetes adoption and minimize risk of Kubernetes infrastructure incidents by optimizing resource requests and limits for containers.
