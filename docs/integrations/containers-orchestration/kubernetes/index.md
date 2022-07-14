---
slug: integrations/containers-orchestration/kubernetes
title: Kubernetes
sidebar_label: Kubernetes
---

The Sumo Logic Kubernetes App provides visibility into the worker nodes that comprise a cluster, as well as application logs of the worker nodes. The App is a single-pane-of-glass through which you can monitor and troubleshoot container health, replication, load balancing, pod state and hardware resource allocation. It utilizes [Falco](https://falco.org/docs/) events to monitor and detect anomalous container, application, host, and network activity. 

In conjunction with the Kubernetes App, the AKS Control Plane, GKE Control Plane, EKS Control Plane, or Kubernetes Control Plane Apps provide visibility into the control plane, including the APIserver, scheduler, and controller manager.

[Kubernetes](https://kubernetes.io/) is a system that automates the deployment, management, scaling, networking, and availability of container-based applications. Kubernetes container-orchestration allows you to easily deploy and manage multi-container applications at scale.

:::tip
For an end-to-end solution for deploying, managing, monitoring, and administering your Kubernetes environment, see the Kubernetes Solution pages.
:::

## Supported versions

The following are the minimum supported requirements for this application:


<table>
  <tr>
   <td><strong>Name</strong>
   </td>
   <td><strong>Supported versions</strong>
   </td>
  </tr>
  <tr>
   <td>Kubernetes</td>
   <td>1.10 and later</td>
  </tr>
  <tr>
   <td>Kops</td>
   <td><p>1.13.10-k8s</p>
<p>1.13.10-kops</p>
<p>1.12.8-k8s</p>
<p>1.12.2-kops</p>
<p>1.10.13-k8s</p>
<p>1.10.0-kops</p>
   </td>
  </tr>
</table>


## Log and Metric Types

The Sumo Logic App for Kubernetes uses logs and metrics.

### Log source
* Application Logs

### Metrics sources

* [Node-exporter Metrics](https://prometheus.io/docs/guides/node-exporter/) - System-level statistics about bare-metal nodes or virtual machine and generates metrics.
* [Kube-state-metrics](https://github.com/kubernetes/kube-state-metrics) - Metrics about the state of Kubernetes logical objects, including node status, node capacity (CPU and memory), number of desired/available/unavailable/updated replicas per deployment, pod status (e.g., waiting, running, ready), and containers.


For more information, see [this page](https://github.com/SumoLogic/sumologic-kubernetes-collection). Metrics are collected using [Prometheus with FluentD](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/master/deploy#step-1-create-sumo-collector-and-deploy-fluentd).
