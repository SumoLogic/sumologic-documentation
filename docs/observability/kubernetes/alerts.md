---
id: alerts
title: Kubernetes Alerts
description: To help determine if the Kubernetes cluster is available and performing well, the Sumo Logic monitors are provided with out of box alerts.
hide_table_of_contents: true
---

Sumo Logic monitors provide you with out-of-box alerts that help determine if your Kubernetes cluster is available and performing well. The alerts, listed on this page, are packaged as monitor templates with the Sumo Logic Kubernetes app. To create them, see [Create monitors for the Kubernetes app](/docs/integrations/containers-orchestration/kubernetes/#create-monitors-for-the-kubernetes-app). They are built based on metrics datasets and have preset thresholds.

:::info
For information on creating customized alerts, see [Monitors](/docs/alerts/monitors).
:::

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
