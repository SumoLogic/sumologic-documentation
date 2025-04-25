---
id: alerts
title: Kubernetes Alerts
description: To help determine if the Kubernetes cluster is available and performing well, the Sumo Logic monitors are provided with out of box alerts.
hide_table_of_contents: true
---

Sumo Logic monitors provide you with out-of-box alerts that help determine if your Kubernetes cluster is available and performing well. The alerts, listed on this page, are installed by default when you [set up data collection using Helm or YAML](/docs/observability/kubernetes/quickstart/#installation). They are built based on metrics datasets and have preset thresholds.

:::info
For information on creating customized alerts, see [Monitors](/docs/alerts/monitors).
:::

| Name | Description | Trigger Type (Critical / Warning / MissingData) | Alert Condition | Recovery Condition |
|:--|:--|:--|:--|:--|
| `Kubernetes - etcd Insufficient Members` | This alert is fired when we determine that etcd cluster has insufficient members. | Critical | >0 | \<=0 |
| `Kubernetes - Kube API Down` | This alert is fired when KubeAPI disappears from Prometheus target discovery. | Critical/MissingData | \<=0 | \\>0 |
| `Kubernetes - Kube Controller Manager Down` | This alert is fired when KubeControllerManager disappears from Prometheus target discovery. | Critical | \<=0 | \\>0 |
| `Kubernetes - Kubelet Down` | This alert is fired when Kubelet disappears from Prometheus target discovery. | Critical/MissingData | \<=0 | \\>0 |
| `Kubernetes - Kube Node Not Ready` | This alert is fired when a node is not ready. | Critical/MissingData | \<=0 | \\>0 |
| `Kubernetes - Kube Scheduler Down` | This alert is fired when Kube Scheduler disappears from Prometheus target discovery. | Critical/MissingData | \<=0 | \\>0 |
| `Kubernetes -Cluster CPU Utilization High` | This alert is fired when Cluster CPU utilization is high. | Critical/Warning | >0.90 | \<=0.90 |
| `Kubernetes - Prometheus Remote Storage Failures` | This alert is fired when Prometheus fails to send samples to remote storage. | Critical | \\>1 | \<=1 |
| `Kubernetes -Multiple Terminated Pods (Errored Out)` | This alert is fired when we determine that there are pods that have been terminated because of an error. | Critical | \\>5 | \<=5 |
| `Kubernetes - Multiple Terminated Pods (Container Cannot Run)` | This alert is fired when we determine that there are pods that have been terminated because the container cannot run. | Critical | \\>5 | \<=5 |
| `Kubernetes - Multiple Terminated Pods (OOM Killed)` | This alert is fired when we determine that there are pods that have been terminated because the pods have been OOM Killed. | Critical | \\>5 | \<=5 |
| `Kubernetes - Multiple Terminated Pods (Deadline Exceeded)` | This alert is fired when we determine that there are pods that have been terminated because the deadline was exceeded. | Critical | \\>5 | \<=5 |
| `Kubernetes - Pod Crash Looping` | This alert is fired when we determine that a pod is crash looping. | Warning | \\>0 | \<=0 |
| `Kubernetes - Container Waiting` | This alert is fired when a pod container waits longer than 1 hour. | Warning | \\>0 | \<=0 |
| `Kubernetes - DaemonSet Not Scheduled` | This alert is fired when DaemonSet pods are not scheduled. | Warning | \\>0 | \<=0 |
| `Kubernetes - DaemonSet Misscheduled` | This alert is fired when DaemonSet pods are miss-scheduled. | Warning | \\>0 | \<=0 |
| `Kubernetes - StatefulSet Generation Mismatch` | This alert is fired when StatefulSet generation mismatch is determined due to possible roll-back. | Warning | \\>0 | \<=0 |
| `Kubernetes - HPA Maxed Out` | This alert is fired when HPA is running at maximum replicas. | Warning | \<=0 | \\>0 |
| `Kubernetes - Multiple Containers OOM Killed` | This alert is fired when multiple containers are OOM Killed. | Warning | >=5 | \<5 |
