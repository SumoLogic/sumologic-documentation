---
id: kubernetes-metrics
title: Kubernetes Metrics
sidebar_label: Kubernetes Metrics
description: This page lists the Kubernetes metrics that are collected when you deploy the collection solution described in sumologic-kubernetes-collection deployment guide.
---

This page lists the Kubernetes metrics that are collected when you deploy the collection solution described in
[sumologic-kubernetes-collection deployment guide](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/main/deploy). 

The metrics to be collected are specified in the [overrides.xml](https://github.com/SumoLogic/sumologic-kubernetes-collection) file. The deployment guide has information about filtering and relabeling metrics, and how to send custom Prometheus metrics to Sumo Logic.

## Kube state metrics (kube-state-metrics)

kube-state-metrics is a service that listens to the Kubernetes API server and generates metrics about the state of the objects, including deployments, nodes, and pods.

You can deploy kube-state-metrics using Helm. The Sumo Logic helm chart has a dependency to install it. To avoid duplication, use a single instance of FluentD to collect the metrics.  

You can use kube-state-metrics in managed Kubernetes environments, such as GKE, EKS, or AKS, or in a Kubernetes deployment you manage yourself.

### kube-state-metrics metrics to collect

This section lists recommended metrics to collect. For information about all kube-state-metrics, and metric descriptions, see [Kubernetes docs](https://github.com/kubernetes/kube-state-metrics/tree/master/docs)

* Daemonsets
    * kube_daemonset_status_current_number_scheduled
    * kube_daemonset_status_desired_number_scheduled
    * kube_daemonset_status_number_misscheduled
    * kube_daemonset_status_number_unavailable
    * kube_daemonset_metadata_generation
* Deployments
    * kube_deployment_metadata_generation
    * kube_deployment_spec_paused
    * kube_deployment_spec_replicas
    * kube_deployment_spec_strategy_rollingupdate_max_unavailable
    * kube_deployment_status_observed_generation
    * kube_deployment_status_replicas_available
    * kube_deployment_status_replicas_unavailable
* Nodes
    * kube_node_info
    * kube_node_spec_unschedulable
    * kube_node_status_allocatable
    * kube_node_status_capacity
    * kube_node_status_condition
* Pods
    * kube_pod_container_info
    * kube_pod_container_resource_requests
    * kube_pod_container_resource_limits
    * kube_pod_container_status_ready
    * kube_pod_container_status_terminated_reason
    * kube_pod_container_status_waiting_reason
    * kube_pod_status_phase

### View kube-state-metrics

Install [Prometheus Operator](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/main/deploy#step-2-configure-prometheus) on your cluster in the prometheus namespace. 

Run this command to start a proxy to the Kubernetes API server: 

```bash
kubectl proxy
```

To view metrics, open your browser to: 

`http://127.0.0.1:8001/api/v1/namespaces/prometheus/services/kube-prometheus-exporter-kube-state:80/proxy/metrics`

## Controller Manager (kube-controller-manager) metrics

Controller manager metrics provide important insight into the performance and health of the controller manager.

Requires a service to be deployed to talk to Controller Manager. Prometheus Operator does this for you.

You can collect kube-controller-manager metrics in a Kubernetes deployment you manage yourself. You can’t collect kube-controller-manager metrics in managed Kubernetes environments, such as GKE, EKS, or AKS.  

### kube-controller-manager metrics to collect

`cloudprovider_\*_api_request_duration_seconds\*`

### View kube-controller-manager metrics 

Install [Prometheus Operator](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/main/deploy#step-2-configure-prometheus) on your cluster in the prometheus namespace.  

Run this command to start a proxy to the Kubernetes API server: 

```bash
kubectl proxy
```

To view metrics, open your browser to: 

`http://127.0.0.1:8001/api/v1/namespaces/kube-system/services/kube-prometheus-exporter-kube-controller-manager:10252/proxy/metrics`

## Scheduler (kube-scheduler) metrics

Requires a service to be deployed to talk to Scheduler. Prometheus Operator does this for you.

You can collect kube-scheduler metrics in a Kubernetes deployment you manage yourself. You can’t collect kube-scheduler metrics in managed Kubernetes environments, such as GKE, EKS, or AKS.  

### kube-scheduler metrics to collect

* scheduler_e2e_scheduling_latency_microseconds\*
* scheduler_binding_latency_microseconds\*
* scheduler_scheduling_algorithm_latency_microseconds\*

### View kube-scheduler metrics 

Install [Prometheus Operator](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/main/deploy#step-2-configure-prometheus) on your cluster in the prometheus namespace.

Run this command to start a proxy to the Kubernetes API server: 

`kubectl proxy`

To view metrics, open your browser to: 

`http://127.0.0.1:8001/api/v1/namespaces/kube-system/services/kube-prometheus-exporter-kube-controller-manager:10252/proxy/metrics`

## API Server (apiserver) metrics

You can collect apiserver metrics in managed Kubernetes environments, such as GKE, EKS, or AKS, or in a Kubernetes deployment you manage yourself.

A single worker should collect these to avoid duplication.

* apiserver metrics to collect
* apiserver_request_count
* apiserver_request_latencies\*
* etcd_request_cache_get_latencies_summary\*
* etcd_request_cache_add_latencies_summary\*
* etcd_helper_cache_hit_count
* etcd_helper_cache_miss_count

### View apiserver metrics


Install [Prometheus Operator](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/main/deploy#step-2-configure-prometheus) on your cluster in the prometheus namespace.

Run this command to start a proxy to the Kubernetes API server: 

`kubectl proxy `

To view metrics, open your browser to:  

`http://127.0.0.1:8001/metrics`

## Kubelet (kubelet) metrics

The Kubelet acts as a bridge between the Kubernetes master and the Kubernetes nodes. It manages the pods and containers running on a machine. 

You can collect kubelet in managed Kubernetes environments, such as GKE, EKS, or AKS, or in a Kubernetes deployment you manage yourself.

Collect from each node in the cluster.

### Metrics to collect

* kubelet_docker_operations_errors
* kubelet_docker_operations_latency_microseconds\*
* kubelet_running_container_count
* kubelet_running_pod_count
* kubelet_runtime_operations_latency_microseconds\*
* etcd_helper_cache_hit_count
* etcd_helper_cache_miss_count

### View kubelet metrics

Install [Prometheus Operator](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/main/deploy#step-2-configure-prometheus) on your cluster in the prometheus namespace.

Run this command to start a proxy to the Kubernetes API server: 

`kubectl proxy `

To view metrics, open your browser to: 

`http://127.0.0.1:8001/api/v1/nodes/NODE_NAME/proxy/metrics`  
   
Where `NODE_NAME` is the name of your node. For example:

`http://127.0.0.1:8001/api/v1/nodes/ip-172-20-114-48.us-west-2.compute.internal/proxy/metrics`

## cAdvisor (kubelet) metrics

cAdvisor is an open source container resource usage and performance analysis agent.

You can collect cAdvisor metrics in managed Kubernetes environments, such as GKE, EKS, or AKS, or in a Kubernetes deployment you manage yourself.

By default, we exclude records where container_name is empty or POD and collect from each node in a cluster.

### Metrics to collect

* container_cpu_load_average_10s
* container_cpu_system_seconds_total
* container_cpu_usage_seconds_total
* container_cpu_cfs_throttled_seconds_total
* container_memory_usage_bytes
* container_memory_swap
* container_spec_memory_limit_bytes
* container_spec_memory_swap_limit_bytes
* container_spec_memory_reservation_limit_bytes
* container_fs_usage_bytes
* container_fs_limit_bytes
* container_fs_writes_bytes_total
* container_fs_reads_bytes_total
* container_network_receive_bytes_total
* container_network_transmit_bytes_total
* container_network_receive_errors_total
* container_network_transmit_errors_total

Install [Prometheus Operator](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/main/deploy#step-2-configure-prometheus) on your cluster in the prometheus namespace.

Run this command to start a proxy to the Kubernetes API server: 

`kubectl proxy `

To view metrics, open your browser to: 

`http://127.0.0.1:8001/api/v1/nodes/NODE_NAME/proxy/metrics/cadvisor`

 Where `NODE_NAME` is the name of your node. For example:

`http://127.0.0.1:8001/api/v1/nodes/ip-172-20-114-48.us-west-2.compute.internal/proxy/metrics/cadvisor`

## Node Exporter (node-exporter) metrics

You can collect Node Exporter metrics in managed Kubernetes environments, such as GKE, EKS, or AKS, or in a Kubernetes deployment you manage yourself.

By default, Sumo Logic collects from each node in a cluster.

For a full list of metrics scraped and forwarded by Sumo Logic Kubernetes, see [this table](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/scraped-metrics.md#metrics).
The table lists the metric name, source, and if it is forwarded.

### Node Exporter metrics to collect

* node_load1
* node_load5
* node_load15
* node_cpu_seconds_total
* node_memory_MemAvailable_bytes
* node_memory_MemTotal_bytes
* node_memory_Buffers_bytes
* node_memory_SwapCached_bytes
* node_memory_Cached_bytes
* node_memory_MemFree_bytes
* node_memory_SwapFree_bytes
* node_ipvs_incoming_bytes_total
* node_ipvs_incoming_packets_total
* node_ipvs_outgoing_bytes_total
* node_ipvs_outgoing_packets_total
* node_disk_reads_completed_total
* node_disk_writes_completed_total
* node_disk_read_bytes_total
* node_disk_written_bytes_total
* node_filesystem_avail_bytes
* node_filesystem_free_bytes
* node_filesystem_size_bytes

### View Node Exporter metrics

Install [Prometheus Operator](https://github.com/SumoLogic/sumologic-kubernetes-collection/tree/main/deploy#step-2-configure-prometheus) in the sumologic namespace.

Run kubectl port-forward: 

`kubectl -n sumologic port-forward svc/sumologic-prometheus-node-exporter 9100`

In another console, run this command to get a metrics sample to confirm the metrics are being generated.

`curl localhost:9100/metrics`

## Metrics created by Prometheus Operator rules (default)

These metrics are produced by Prometheus rules at ingest time—they are not available on an exporter, Prometheus creates them during scrape activities. Rules-created metrics are sent with the remote write API.

You can collect metrics created by Prometheus Operator rules in managed Kubernetes environments, such as GKE, EKS, or AKS, or in a Kubernetes deployment you manage yourself.

### Metrics to collect

* [Cluster_quantile:apiserver_request_latencies:histogram_quantile](https://github.com/helm/charts/blob/master/stable/prometheus-operator/templates/prometheus/rules/kube-apiserver.rules.yaml#L21)
* [Node Recording rule metrics](https://github.com/helm/charts/blob/master/stable/prometheus-operator/templates/prometheus/rules/kube-prometheus-node-recording.rules.yaml#L23)
    * The value of record will be the metric name.
* [Kube Scheduler rules](https://github.com/helm/charts/blob/master/stable/prometheus-operator/templates/prometheus/rules/kube-scheduler.rules.yaml#L21)
    * The value of record will be the metric name.
* [Node Rules](https://github.com/helm/charts/blob/master/stable/prometheus-operator/templates/prometheus/rules/node.rules.yaml)
    * The value of record will be the metric name.

## up metrics

Prometheus generates a metric called up that indicates whether a scrape was successful. A  value of “1” is scrape indicates success, “0” failure. The `up` metric is useful for debugging and alerting for targets that are down or having issues. Each target should produce an up metric on every scrape.
