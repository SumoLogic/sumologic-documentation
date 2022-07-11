---
id: about-kubernetes-solution
title: About the Sumo Logic Kubernetes Solution
sidebar_label: Overview
---

The Sumo Logic Kubernetes Solution provides an end-to-end experience that takes you from configuring collection and installing apps, to monitoring, managing, and troubleshooting your Kubernetes environment.

## What is Kubernetes?

Kubernetes is an open source container orchestration platform developed by [Google](https://cloud.google.com/kubernetes/), that is now managed by the [Cloud Native Computing Foundation](https://www.cncf.io/). 

Kubernetes provides for automatic deployment, scaling, and operations across clusters in your environment. Kubernetes provides Desired State Management for clusters by defining a system of cluster services that operates on a set of specified criteria. Kubernetes is ephemeral by design, with elastic scalability and control over how containers and pods are deployed. Kubernetes can run in a public cloud, on a private network, or on bare metal.

## Kubernetes ease-of-use

Sumo Logic Kubernetes provides visibility into worker nodes and their application logs, as well as seamlessly managing the master node control plane, including the API server, etcd, kube-system and worker nodes. With Sumo Logic Kubernetes, you can monitor and troubleshoot container health, replication, load balancing, pod state, and hardware resource allocation. Falco events are utilized to monitor and detect abnormal container, application, host, and network activity. 

Sumo Logic allows you to ingest your full application stack. Sumo Logic Kubernetes collects and centralizes data from an extensive variety of platforms, whether in the cloud, on your premises, Software as a Service (SaaS), or hybrid deployments.

Sumo Logic Kubernetes allows you to:

* Collect and centralize logs, metrics, and events.
* Monitor your environment and track alerts using dashboard intuitive visual displays.
* Troubleshoot issues with advanced analytics to successfully reach a root cause.
* Optimize performance and ensure the security of your apps and environment as a whole.

![K8s_Solution_Ingest_Ease-of-Use.png](/img/kubernetes/K8s_Solution_Ingest_Ease-of-Use.png)

## Sumo Logic Apps for Kubernetes

Sumo Logic provides Kubernetes apps across a variety of platforms, each
with a set of predefined dashboards. 

* **[Sumo Logic Kubernetes] (/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kubernetes)**: The Sumo Logic Kubernetes App provides visibility into the worker nodes that comprise a cluster, as well as application logs of the worker nodes. The App is a single-pane-of-glass for monitoring and troubleshooting container health, replication, load balancing, pod state and hardware resource allocation. This app works seamlessly with the [Sumo Logic Kubernetes - Control Plane] (/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kubernetes_Control_Plane) app.
* **[Sumo Logic Kubernetes - Control Plane] (/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kubernetes_Control_Plane)**: The Sumo Logic Kubernetes Control Plane App manages the master node control plane, including the API server, etcd, kube-system and worker nodes. The App utilizes [Falco](https://falco.org/docs/) Kubernetes Audit events to monitor and detect notable or suspicious activity such as creating pods that are privileged, mount sensitive host paths, use host networking, and the like. This app works seamlessly with the [Sumo Logic Kubernetes] (/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kubernetes) app.
* **[Amazon EKS] (/07Sumo-Logic-Apps/01Amazon_and_AWS/Amazon_EKS_-_Control_Plane)** - Control Plane: The Sumo Logic App for Amazon EKS - Control Plane provides visibility into the EKS control plane with operational insights into the API server, scheduler, control manager, and worker nodes. The app’s preconfigured dashboards display resource-related metrics for Kubernetes deployments, clusters, namespaces, pods, containers, and daemonsets. This App works in conjunction with [Sumo Logic Kubernetes] (/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kubernetes), that provides visibility into worker node metrics and application logs.
* **[Azure Kubernetes Service (AKS)] (/07Sumo-Logic-Apps/04Microsoft-and-Azure/Azure_Kubernetes_Service_(AKS)_-_Control_Plane)** - Control Plane: The Sumo Logic App for Azure Kubernetes Service (AKS) - Control Plane provides visibility into the AKS control plane with operational insights into the API server, scheduler, control manager, and worker nodes. The preconfigured app dashboards display resource-related metrics for Kubernetes deployments, clusters, namespaces, pods, containers, and daemonsets. This App works in conjunction with [Sumo Logic Kubernetes] (/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kubernetes), that provides visibility into worker node metrics and application logs.
* **[Google Kubernetes Engine (GKE)] (/07Sumo-Logic-Apps/06Google/Google_Kubernetes_Engine_(GKE)_-_Control_Plane)** - Control Plane: The Sumo Logic App for Google Kubernetes Engine (GKE) - Control Plane allows you to monitor resource-related logs and metrics for Kubernetes deployments, clusters, namespaces, pods, containers, and daemonsets. The app provides visibility into the GKE control plane with operational insights into the API server, control manager, and worker nodes. This App works in conjunction with [Sumo Logic Kubernetes] (/07Sumo-Logic-Apps/10Containers_and_Orchestration/Kubernetes), that provides visibility into worker node metrics and application logs.

 
