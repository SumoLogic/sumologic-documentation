---
id: kubernetes
title: Kubernetes
sidebar_label: Kubernetes
description: The Sumo Logic app for Kubernetes provides visibility into worker node and application health, including container health, replication, pod state, and anomalous activity detected by Falco.
keywords:
  - kubernetes
  - kubernetes app
  - kubernetes monitoring
  - k8s
  - apps
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/icons/operations/kubernetes.png')} alt="k8s logo" width="50"/>  

Sumo Logic Kubernetes provides visibility into worker nodes and their application logs, as well as seamlessly managing the master node control plane, including the API server, etcd, kube-system and worker nodes. With Sumo Logic Kubernetes, you can monitor and troubleshoot container health, replication, load balancing, pod state, and hardware resource allocation. Falco events are utilized to monitor and detect abnormal container, application, host, and network activity.

:::note
The Kubernetes app is a [next-gen app](/docs/get-started/apps-integrations/#next-gen-apps). Dashboards, monitors, and the fields the app needs are created when you install it.
:::

In conjunction with the Kubernetes app, the AKS Control Plane, GKE Control Plane, EKS Control Plane, or Kubernetes Control Plane apps provide dedicated dashboards for the control plane components, including the API server, scheduler, and controller manager.

[Kubernetes](https://kubernetes.io/) is a system that automates the deployment, management, scaling, networking, and availability of container-based applications. Kubernetes container-orchestration allows you to easily deploy and manage multi-container applications at scale.

:::tip
For an end-to-end solution for deploying, managing, monitoring, and administering your Kubernetes environment, see the [Kubernetes Solution pages](/docs/observability/kubernetes).
:::

## Supported versions

The Sumo Logic Kubernetes app is compatible with the latest version of [Sumo Logic Kubernetes Collection Helm Chart](https://github.com/SumoLogic/sumologic-kubernetes-collection). A list of supported platforms can be found [here](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/main/docs#support-matrix).

## Log and metric types

The Sumo Logic app for Kubernetes uses logs and metrics.

### Log sources

* Application logs
* Kubernetes events

### Metrics sources

* [Node-exporter Metrics](https://prometheus.io/docs/guides/node-exporter/) - System-level statistics about bare-metal nodes or virtual machines and generates metrics.
* [Kube-state-metrics](https://github.com/kubernetes/kube-state-metrics) - Metrics about the state of Kubernetes logical objects, including node status, node capacity (CPU and memory), number of desired/available/unavailable/updated replicas per deployment, pod status (e.g., waiting, running, ready), and containers.
* Container (cAdvisor), CoreDNS, and Kubernetes API server metrics.

For more information, see [this page](https://github.com/SumoLogic/sumologic-kubernetes-collection). Metrics are collected using the [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector), which also enriches them with metadata.

### Sample log messages

```json title="Application Logs"
{"timestamp":1561534865020,"log":"E0626 07:41:05.020255       1
manager.go:101] Error in scraping containers from kubelet:192.168.190.54:10255:
failed to get all container stats from Kubelet URL \"http://192.168.190.54:10255/stats/container/\":
Post http://192.168.190.54:10255/stats/container/: dial tcp 192.168.190.54:10255:
getsockopt: connection refused"}
```

### Sample queries

```sumo title="Message Breakdown by Container from the Dashboard Container Logs"
 cluster = * and namespace = * and pod = * and container = *
| json field=_raw "log" as message
| fields - message | count container | top 10 container by _count
```

## Collecting Metrics and Logs for the Kubernetes app

This section contains instructions for collecting logs and metrics for the Sumo Logic app for Kubernetes.

Your logs and metrics must be tagged with the metadata fields that the app dashboards use. The app creates these fields when you [install it](#installing-the-kubernetes-app).

Reference the [Deployment Guide](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/README.md#documentation) in our sumologic-kubernetes-collection GitHub repository for detailed instructions on how to collect Kubernetes logs, metrics, and events; enrich them with deployment, pod, and service level metadata; and send them to Sumo Logic.

The Deployment Guide has information on advanced configurations, best practices, performance, troubleshooting, and upgrading for our latest and previous versions of supported software.

## Installing the Kubernetes app

Now that you have set up the collection for the Kubernetes app, install the Sumo Logic app for Kubernetes to use the pre-configured Kubernetes dashboards that provide visibility into your Kubernetes environment.

:::note
The Kubernetes app has no **Field Name** configuration step. Helm chart collection must already be set up before you install the app, as described in [Collecting logs and metrics for the Kubernetes app](#collecting-metrics-and-logs-for-the-kubernetes-app).
:::

import AppInstall2 from '../../reuse/apps/app-install-v2.md';

<AppInstall2/>

#### Post-installation options

After you install the app, the app page provides these options:

* **Explore Dashboards**. Opens the Kubernetes Explore hierarchy. You can also click **Open Dashboards in Library** to view the app dashboards in the library.
* **Manage** dropdown:
  * **Add Another Cluster**. Walks you through the **Add Repo** and **Install Helm chart** steps for an additional cluster. Monitors are packaged with the app, so there is no separate monitor installation step. See [Create monitors for the Kubernetes app](#create-monitors-for-the-kubernetes-app).
  * **Uninstall**. See [Uninstalling the Kubernetes app](#uninstalling-the-kubernetes-app-optional).
  * **Upgrade** and **Revert**, when available. See [Upgrade/Downgrade the Kubernetes app](#upgradedowngrade-the-kubernetes-app-optional).

#### Fields

As part of the app installation process, the following fields will be created by default:

* `cluster`
* `container`
* `deployment`
* `host`
* `namespace`
* `node`
* `pod`
* `service`

For information on fields, see the [Fields](/docs/manage/fields) help page.

import DoNotModify from '../../reuse/apps/do-not-modify-installed-content.md';

<DoNotModify/>

## Viewing Kubernetes dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Cluster Explorer

The **Kubernetes - Cluster Explorer** dashboard provides a high-level view of the health of the cluster services, along with details on the utilized resources by service.

Use this dashboard to:
* Navigate the cluster topology
* Review the memory and CPU usage by cluster and service components.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Cluster_Explorer.png')} alt="Kubernetes dashboards" />

### Cluster

The **Kubernetes - Cluster** dashboard provides a detailed view of the cluster health, along with details on all the components and resources.

Use this dashboard to:
* Monitor overall cluster health.
* Get insight into the state and resource usage of cluster components and use this information to fine-tune your Kubernetes cluster.
* Get quick insights into the state of the related entities.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Cluster.png')} alt="Kubernetes dashboards" />

### Cluster - Overview

The **Kubernetes - Cluster - Overview** dashboard provides a high-level view of the cluster health, along with details on all the components and resources.

Use this dashboard to:
* Get quick insights into the health of the cluster.
* View top resource-intensive components and use this information to fine-tune your cluster.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Cluster_Overview.png')} alt="Kubernetes dashboards" />

### Node

The **Kubernetes - Node** dashboard provides detailed information on the health and performance of the cluster nodes.

Use this dashboard to:
* Monitor node health.
* Review node pressure conditions.
* Get insight into how resources are being used across nodes and fine-tune node configurations accordingly.
* Investigate potential issues with nodes.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Node.png')} alt="Kubernetes dashboards" />

### Node - Overview

The **Kubernetes - Node - Overview** dashboard provides high-level information on the health and performance of the cluster nodes.

Use this dashboard to:
* Get quick insights into the health of the node.
* View top resource-intensive components and use this information to fine-tune your node.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Node_Overview.png')} alt="Kubernetes dashboards" />

### Namespace

The **Kubernetes - Namespace** dashboard provides a high-level view of the health of the cluster namespaces, along with details on the utilized resources.

Use this dashboard to:
* Monitor namespace health.
* Get insight into the components of a namespace and how resources are being used across namespaces, and fine-tune configurations accordingly.
* Investigate potential issues.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Namespace.png')} alt="Kubernetes dashboards" />

### Pod

The **Kubernetes - Pod** dashboard provides a high-level view on the health of the cluster pods, along with details on the utilized resources.

Use this dashboard to:
* Monitor pod health.
* Track the restart rate by container.
* Get insight into the components of a pod and how resources are being used across namespaces and fine-tune configurations accordingly.
* Investigate potential issues.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Pod.png')} alt="Kubernetes dashboards" />

### Container

The **Kubernetes - Container** dashboard provides a high-level view of the health of cluster containers, along with details of the utilized resources.

Use this dashboard to:
* Monitor container health.
* Get insight into container resource utilization, including CPU throttling, and fine-tune configurations accordingly.
* Determine if containers are stuck in CrashLoopBackOff, Terminated, or Waiting states and make necessary adjustments.
* Investigate containers that are over-utilizing resources.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Container.png')} alt="Kubernetes dashboards" />

### Daemonsets - Overview

The **Kubernetes - Daemonsets - Overview** dashboard provides a high-level view of the health of the Daemonsets.

Use this dashboard to:
* Monitor the health of Daemonsets.
* Identify whether the required replica level is achieved or not.
* View logs and errors and investigate potential issues.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Daemonsets_Overview.png')} alt="Kubernetes dashboards" />

### StatefulSets - Overview

The **Kubernetes - StatefulSets - Overview** dashboard provides a high-level view of the health of the StatefulSets.

Use this dashboard to:
* Monitor the health of StatefulSets.
* Identify whether the required replica level is achieved or not.
* View logs and errors and investigate potential issues.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_StatefulSets_Overview.png')} alt="Kubernetes dashboards" />

### Deployment - Overview

The **Kubernetes - Deployment - Overview** dashboard provides high-level insights into the health and performance of your Kubernetes deployments.

Use this dashboard to:
* Monitor the health of deployments in your Kubernetes environment.
* Identify whether the required replica level has been achieved or not.
* View logs and errors and investigate potential issues.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Deployment_Overview.png')} alt="Kubernetes dashboards" />

### Collection Health Check

The **Kubernetes - Collection Health Check** dashboard displays collection status from otel components in the Kubernetes cluster.

Use this dashboard to:
* Monitor the health of OpenTelemetry-based collection in your Kubernetes environment.
* Get insight into resource utilization and fine-tune configurations accordingly.
* View logs and errors and investigate potential issues.

<img src={useBaseUrl('img/integrations/containers-orchestration/k8s-health.png')} alt="Kubernetes dashboards" />

### Deployment

The **Kubernetes - Deployment** dashboard provides detailed insights into the health and performance of your Kubernetes deployments.

Use this dashboard to:
* Monitor the health of deployments in your Kubernetes environment.
* Identify whether the required replica level has been achieved or not.
* View logs and errors and investigate potential issues.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Deployment.png')} alt="Kubernetes dashboards" />

### Events

The **Kubernetes - Events** dashboard provides visibility into cluster events, warning conditions, and pod lifecycle activities using Kubernetes event logs.

Use this dashboard to:
* Review events by type over time, and by source component.
* Investigate warning events by namespace and by reason, and review the latest warning events.
* Track Back-Off and OOM Kill events over time.

### Security Overview

:::note
This dashboard relies on Falco. If the dashboard is not populated, enable Falco by setting the flag `falco.enabled` as `"true"` in values.yaml, as described [here](/docs/send-data/kubernetes/install-helm-chart).
:::

The **Kubernetes - Security Overview** dashboard provides high level details of anomalous container, application, host, and network activity.

Use this dashboard to:
* Identify and investigate anomalous activity.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Security_Overview.png')} alt="Kubernetes dashboards" />

### Security Rules Triggered

:::note
This dashboard relies on Falco. If the dashboard is not populated, enable Falco by setting the flag `falco.enabled` as `"true"` in values.yaml. For details, please see the Sumo Logic Kubernetes Collection Helm Chart [documentation](https://github.com/SumoLogic/sumologic-kubernetes-collection#documentation).
:::

The **Kubernetes - Security Rules Triggered** dashboard provides detailed information of anomalous activity, in addition it also provides details of the OOB Falco rules triggered by the activity on your infrastructure.

Use this dashboard to:
* Review detailed information on anomalous activity.
* Review if the OOB Falco security events are triggered and identify the root cause.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Sec_Rules_Triggered.png')} alt="Kubernetes dashboards" />

### Service

The **Kubernetes - Service** dashboard provides a high-level view of the health of the cluster services, along with details on the utilized resources by service.

Use this dashboard to:
* Review detailed information on services.
* Identify components by Services.
* Determine any errors and warnings by Services.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_Service.png')} alt="Kubernetes dashboards" />

### CoreDNS

CoreDNS is a [DNS server](https://en.wikipedia.org/wiki/Domain_Name_System) and can be used as a replacement for kube-dns in a Kubernetes cluster.

The **Kubernetes - CoreDNS** dashboard provides insights into CoreDNS status including Cache details, Resource Usage.

Use this dashboard to:
* Track the total number of requests.
* Review Cache statistics.
* Monitor CoreDNS's resource usage and spikes.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_CoreDNS.png')} alt="Kubernetes dashboards" />

### HPA

The Horizontal Pod Autoscaler automatically scales the number of Pods in a replication controller, deployment, replica set or stateful set based on observed CPU utilization.

The **Kubernetes - HPA** dashboard provides a high-level view of the health of the Horizontal Pod Autoscaler.

Use this dashboard to:
* Identify whether the required replica level has been achieved or not.
* View logs and errors and investigate potential issues.

<img src={useBaseUrl('img/integrations/containers-orchestration/K8s_HPA.png')} alt="Kubernetes dashboards" />

## Create monitors for the Kubernetes app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Kubernetes alerts

The app includes the following monitors. Node Disk Pressure, Node Memory Pressure, Deployment Replica Mismatch, Node Filesystem Running Full, and API Server Error Rate High are new.

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | Recovery Condition |
|:--|:--|:--|:--|:--|
| `Kubernetes - Kube Node Not Ready` | This alert is fired when a Kubernetes node is not in a ready state. | Critical/MissingData | \<=0 | >0 |
| `Kubernetes - DaemonSet Not Scheduled` | This alert is fired when DaemonSet pods are not scheduled. | Warning | >0 | \<=0 |
| `Kubernetes - etcd Insufficient Members` | This alert is fired when the etcd cluster has insufficient members. | Critical | >0 | \<=0 |
| `Kubernetes - Pod Crash Looping` | This alert is fired when a pod is crash looping. | Warning | >0 | \<=0 |
| `Kubernetes - Multiple Terminated Pods (Errored Out)` | This alert is fired when pods have been terminated due to errors. | Critical | >5 | \<=5 |
| `Kubernetes - Multiple Terminated Pods (OOM Killed)` | This alert is fired when pods have been OOM Killed. | Critical | >5 | \<=5 |
| `Kubernetes - Container Waiting` | This alert is fired when a pod container has been waiting longer than 1 hour. | Warning | >0 | \<=0 |
| `Kubernetes - Kubelet Down` | This alert is fired when Kubelet disappears from Prometheus target discovery. | Critical/MissingData | \<=0 | >0 |
| `Kubernetes - Kube API Down` | This alert is fired when KubeAPI disappears from Prometheus target discovery. | Critical/MissingData | \<=0 | >0 |
| `Kubernetes - Node CPU Utilization High` | This alert is fired when Node CPU utilization is high. | Critical/Warning | Critical: >0.9, Warning: >0.75 | Critical: \<=0.9, Warning: \<=0.75 |
| `Kubernetes - Prometheus Remote Storage Failures` | This alert is fired when Prometheus fails to send samples to remote storage. | Critical | >1 | \<=1 |
| `Kubernetes - Kube Controller Manager Down` | This alert is fired when KubeControllerManager disappears from Prometheus target discovery. | Critical/MissingData | \<=0 | >0 |
| `Kubernetes - DaemonSet Misscheduled` | This alert is fired when DaemonSet pods are mis-scheduled (running on nodes they should not be on). | Warning | >0 | \<=0 |
| `Kubernetes - Kube Scheduler Down` | This alert is fired when Kube Scheduler disappears from Prometheus target discovery. | Critical/MissingData | \<=0 | >0 |
| `Kubernetes - StatefulSet Generation Mismatch` | This alert is fired when StatefulSet observed generation differs from metadata generation, indicating a possible rollback. | Warning | >0 | \<=0 |
| `Kubernetes - Multiple Terminated Pods (Deadline Exceeded)` | This alert is fired when pods have been terminated due to deadline exceeded. | Critical | >5 | \<=5 |
| `Kubernetes - Multiple Terminated Pods (Container Cannot Run)` | This alert is fired when pods have been terminated because the container cannot run. | Critical | >5 | \<=5 |
| `Kubernetes - Multiple Containers OOM Killed` | This alert is fired when multiple containers are OOM Killed. | Warning | >=5 | \<5 |
| `Kubernetes - HPA Maxed Out` | This alert is fired when HPA is running at maximum replicas. | Warning | \<=0 | >0 |
| `Kubernetes - Node Disk Pressure` | This alert fires when a Kubernetes node reports DiskPressure condition, indicating the node is running low on disk space. | Warning | >0 | \<=0 |
| `Kubernetes - Node Memory Pressure` | This alert fires when a Kubernetes node reports MemoryPressure condition, indicating the node is running low on memory. | Warning | >0 | \<=0 |
| `Kubernetes - Deployment Replica Mismatch` | This alert fires when the number of available replicas for a deployment is less than the desired replica count. | Warning | >0 | \<=0 |
| `Kubernetes - Node Filesystem Running Full` | This alert fires when a node's filesystem is predicted to run out of space. Critical at less than 5% free, Warning at less than 10% free. | Critical/Warning | Critical: \<5, Warning: \<10 | Critical: >=5, Warning: >=10 |
| `Kubernetes - API Server Error Rate High` | This alert fires when the Kubernetes API server error rate (5xx responses) exceeds 5% of total requests. Critical at greater than 10%, Warning at greater than 5%. | Critical/Warning | Critical: >10, Warning: >5 | Critical: \<=10, Warning: \<=5 |

## Upgrade/Downgrade the Kubernetes app (Optional)

import AppUpdate from '../../reuse/apps/app-update.md';

<AppUpdate/>

## Uninstalling the Kubernetes app (Optional)

To uninstall the app, do the following:

1. Select **App Catalog**.
1. In the 🔎 **Search Apps** field, run a search for **Kubernetes**, then select it.
1. Click **Manage**, and then select **Uninstall**.

## FAQ

### What does the Sumo Logic Kubernetes app monitor?

It monitors worker node and application health across your Kubernetes cluster, including container health, replication, load balancing, pod state, and hardware resource allocation, plus cluster events and anomalous activity detected by Falco.

### What data sources does the Kubernetes app use?

It uses application logs and Kubernetes events, plus Node-exporter, kube-state-metrics, cAdvisor, CoreDNS, and API server metrics, collected using the Sumo Logic Distribution for OpenTelemetry Collector.

### Do I need a separate app for the Kubernetes control plane?

The Kubernetes app includes monitors for control plane components such as the API server, scheduler, and controller manager. For dedicated control plane dashboards, use the AKS Control Plane, GKE Control Plane, EKS Control Plane, or Kubernetes Control Plane app alongside it.

### Which Helm chart version does the Kubernetes app require?

The app is compatible with the latest version of the Sumo Logic Kubernetes Collection Helm Chart. Check the [support matrix](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/main/docs#support-matrix) in the GitHub repository for the exact supported platforms and versions.

### Can the Kubernetes app detect security issues?

Yes. The Security Overview and Security Rules Triggered dashboards rely on Falco to show anomalous container, application, host, and network activity, and which out-of-the-box Falco rules were triggered.

### What new fields appear in Hosted Kubernetes Collectors after v5.0.0?

Users would see the following new fields in the Hosted Kubernetes Collectors after upgrading or installing v5.0.0 of the Sumo Logic Kubernetes Collection.

```aiignore
sumo.cluster.name: <cluster_name> (Shows the cluster name set during the helm chart installation)
sumo.helm.release: <helm_version> (Shows the Helm chart version used to install Sumo Logic Kubernetes Collection)
sumo.hostedcollector.subtype: K8s
```
<img src={useBaseUrl('img/integrations/containers-orchestration/k8s_collector_fields.png')} alt="Kubernetes Collector Fields" />


These fields are added to support the new Kubernetes Collection feature, which will be released soon on Sumo Logic. These new fields are static and do not
impact the user's storage/ingest budget. Since the new fields are static, they also do not impact the cardinality of the metric timeseries.

:::note 
These fields are required to support the new Kubernetes Collection page. If users decide to remove these fields, they will not be able to view the content on the new Kubernetes Collection page (upcoming feature).
:::
