---
id: kubernetes-metrics
title: Kubernetes Metrics
description: This page lists the Kubernetes metrics that are collected when you deploy the collection solution described in sumologic-kubernetes-collection deployment guide.
---

This page lists the Kubernetes metrics that are collected when you deploy the collection solution described in
[sumologic-kubernetes-collection deployment guide](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/installation.md).

Information about filtering and relabeling metrics, and how to send custom Prometheus metrics to Sumo Logic can be found in
[Collecting Application Metrics guide](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/collecting-application-metrics.md).

## Kube state metrics (kube-state-metrics)

[kube-state-metrics](https://github.com/kubernetes/kube-state-metrics) is a service that listens to the Kubernetes API server and generates metrics about the state of the objects, including deployments, nodes, and pods.

You can deploy kube-state-metrics using the [Sumo Logic Kubernetes Collection Helm Chart](https://github.com/SumoLogic/sumologic-kubernetes-collection).

You can use kube-state-metrics in managed Kubernetes environments, such as GKE, EKS, or AKS, or in a Kubernetes deployment you manage yourself.

### kube-state-metrics metrics to collect

This section lists recommended metrics to collect. For information about all kube-state-metrics, and metric descriptions,
see [kube-state-metrics docs](https://github.com/kubernetes/kube-state-metrics/tree/release-2.6/docs)

* kube_daemonset_status_current_number_scheduled
* kube_daemonset_status_desired_number_scheduled
* kube_daemonset_status_number_misscheduled
* kube_daemonset_status_number_unavailable
* kube_deployment_spec_replicas
* kube_deployment_status_replicas_available
* kube_deployment_status_replicas_unavailable
* kube_node_info
* kube_node_status_allocatable
* kube_node_status_capacity
* kube_node_status_condition
* kube_statefulset_metadata_generation
* kube_statefulset_replicas
* kube_statefulset_status_observed_generation
* kube_statefulset_status_replicas
* kube_hpa_spec_max_replicas
* kube_hpa_spec_min_replicas
* kube_hpa_status_condition
* kube_hpa_status_current_replicas
* kube_hpa_status_desired_replicas
* kube_pod_container_info
* kube_pod_container_resource_limits
* kube_pod_container_resource_requests
* kube_pod_container_status_ready
* kube_pod_container_status_restarts_total
* kube_pod_container_status_terminated_reason
* kube_pod_container_status_waiting_reason
* kube_pod_status_phase
* kube_service_info
* kube_service_spec_external_ip
* kube_service_spec_type
* kube_service_status_load_balancer_ingress

### View kube-state-metrics

Assuming that you have the [Sumo Logic Kubernetes Collection Helm Chart](https://github.com/SumoLogic/sumologic-kubernetes-collection) installed in your cluster, run this command to start a proxy to the Kubernetes API server:

```bash
kubectl proxy
```

To view metrics, open your browser to:

`http://127.0.0.1:8001/api/v1/namespaces/SUMOLOGIC_HELM_CHART_NAMESPACE/services/SUMOLOGIC_HELM_CHART_RELEASE_NAME-kube-state-metrics:8080/proxy/metrics`

Where `SUMOLOGIC_HELM_CHART_NAMESPACE` is the namespace where the Sumo Logic Kubernetes Collection Helm Chart is installed and
`SUMOLOGIC_HELM_CHART_RELEASE_NAME` is the the release name of the Sumo Logic Kubernetes Collection Helm Chart in your cluster.

## Controller Manager (kube-controller-manager) metrics

Controller manager metrics provide important insight into the performance and health of [the controller manager](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/).

Collection of controller manager metrics requires a service to be deployed to talk to controller manager. The [Sumo Logic Kubernetes Collection Helm Chart](https://github.com/SumoLogic/sumologic-kubernetes-collection) creates this service.

You can collect kube-scheduler metrics in a Kubernetes deployment you manage yourself. You can’t collect kube-scheduler metrics in managed Kubernetes environments, such as GKE, EKS, or AKS.  

### kube-controller-manager metrics to collect

* cloudprovider_\*_api_request_duration_seconds\*

### View kube-controller-manager metrics

To see kube-controller-manager metrics, run the curl command from a master node, using the appropriate certificates to pass the authentication process:

```bash
curl -k --cert /tmp/server.crt --key /tmp/server.key https://localhost:10257/metrics
```

## Scheduler (kube-scheduler) metrics

[Scheduler](https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/) metrics provide information about for kubernetes scheduling.

Collection of scheduler metrics requires a service to be deployed to talk to scheduler. The [Sumo Logic Kubernetes Collection Helm Chart](https://github.com/SumoLogic/sumologic-kubernetes-collection) creates this service.

You can collect kube-scheduler metrics in a Kubernetes deployment you manage yourself. You can’t collect kube-scheduler metrics in managed Kubernetes environments, such as GKE, EKS, or AKS.  

### kube-scheduler metrics to collect

* scheduler_e2e_scheduling_duration\*
* scheduler_binding_duration\*
* scheduler_scheduling_algorithm_duration\*

### View kube-scheduler metrics

To see kube-scheduler metrics, run the curl command from a master node, using the appropriate certificates to pass the authentication process:

```bash
curl -k --cert /tmp/server.crt --key /tmp/server.key https://localhost:10259/metrics
```

## API Server (kube-apiserver) metrics

You can collect [kube-apiserver](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/) metrics in managed Kubernetes environments, such as GKE, EKS, or AKS, or in a Kubernetes deployment you manage yourself.

### kube-apiserver metrics to collect

* apiserver_request_count
* apiserver_request_latencies\*
* etcd_request_cache_get_latencies_summary\*
* etcd_request_cache_add_latencies_summary\*
* etcd_helper_cache_hit_count
* etcd_helper_cache_miss_count

### View apiserver metrics

Run this command to start a proxy to the Kubernetes API server:

```bash
kubectl proxy
```

To view metrics, open your browser to:  

`http://127.0.0.1:8001/metrics`

## Kubelet (kubelet) metrics

[Kubelet](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/) acts as a bridge between the Kubernetes master and the Kubernetes nodes. It manages the pods and containers running on a machine.

You can collect kubelet in managed Kubernetes environments, such as GKE, EKS, or AKS, or in a Kubernetes deployment you manage yourself.

Collect from each node in the cluster.

### Kubelet metrics to collect

* kubelet_docker_operations_errors
* kubelet_docker_operations_latency_microseconds\*
* kubelet_running_container_count
* kubelet_running_pod_count
* kubelet_runtime_operations_latency_microseconds\*
* etcd_helper_cache_hit_count
* etcd_helper_cache_miss_count

### View kubelet metrics

Run this command to start a proxy to the Kubernetes API server: 

```bash
kubectl proxy
```

To view metrics, open your browser to:

`http://127.0.0.1:8001/api/v1/nodes/NODE_NAME/proxy/metrics`  

Where `NODE_NAME` is the name of your node. For example:

`http://127.0.0.1:8001/api/v1/nodes/ip-172-20-114-48.us-west-2.compute.internal/proxy/metrics`

## cAdvisor (kubelet) metrics

[cAdvisor](https://github.com/google/cadvisor) is an open source container resource usage and performance analysis agent.

You can collect cAdvisor metrics in managed Kubernetes environments, such as GKE, EKS, or AKS, or in a Kubernetes deployment you manage yourself.

### cAdvisor metrics to collect

* container_cpu_usage_seconds_total
* container_fs_limit_bytes
* container_fs_usage_bytes
* container_memory_working_set_bytes
* container_cpu_cfs_throttled_seconds_total
* container_network_receive_bytes_total
* container_network_transmit_bytes_total

### View cAdvisor metrics

Run this command to start a proxy to the Kubernetes API server:

```bash
kubectl proxy
```

To view metrics, open your browser to:

`http://127.0.0.1:8001/api/v1/nodes/NODE_NAME/proxy/metrics/cadvisor`

 Where `NODE_NAME` is the name of your node. For example:

`http://127.0.0.1:8001/api/v1/nodes/ip-172-20-114-48.us-west-2.compute.internal/proxy/metrics/cadvisor`

## Node Exporter (node-exporter) metrics

You can collect [Node Exporter](https://github.com/prometheus/node_exporter) metrics in managed Kubernetes environments, such as GKE, EKS, or AKS, or in a Kubernetes deployment you manage yourself.

For a full list of metrics scraped and forwarded by Sumo Logic Kubernetes, see [this table](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/scraped-metrics.md#metrics).
The table lists the metric name, source, and if it is forwarded.

### Node Exporter metrics to collect

* node_cpu_seconds_total
* node_load1
* node_load5
* node_load15
* node_disk_io_time_weighted_seconds_total
* node_disk_io_time_seconds_total
* node_vmstat_pgpgin
* node_vmstat_pgpgout
* node_memory_MemFree_bytes
* node_memory_Cached_bytes
* node_memory_Buffers_bytes
* node_memory_MemTotal_bytes
* node_network_receive_drop_total
* node_network_transmit_drop_total
* node_network_receive_bytes_total
* node_network_transmit_bytes_total
* node_filesystem_avail_bytes
* node_filesystem_size_bytes
* node_filesystem_files_free
* node_filesystem_files

### View Node Exporter metrics

Assuming that you have the [Sumo Logic Kubernetes Collection Helm Chart](https://github.com/SumoLogic/sumologic-kubernetes-collection) installed in your cluster, run this command to start a proxy to the Kubernetes API server:

```bash
kubectl proxy
```

To view metrics, open your browser to:

`http://127.0.0.1:8001/api/v1/namespaces/SUMOLOGIC_HELM_CHART_NAMESPACE/services/SUMOLOGIC_HELM_CHART_RELEASE_NAME-prometheus-node-exporter:9100/proxy/metrics`

Where `SUMOLOGIC_HELM_CHART_NAMESPACE` is the namespace where the Sumo Logic Kubernetes Collection Helm Chart is installed and
`SUMOLOGIC_HELM_CHART_RELEASE_NAME` is the the release name of the Sumo Logic Kubernetes Collection Helm Chart in your cluster.

## Metrics created by Prometheus rules

These metrics are produced by Prometheus rules at ingest time — they are not available on an exporter, Prometheus creates them during scrape activities. Rules-created metrics are sent with the remote write API.

You can collect metrics created by Prometheus Operator rules in managed Kubernetes environments, such as GKE, EKS, or AKS, or in a Kubernetes deployment you manage yourself.

### Metrics to collect

* :kube_pod_info_node_count:
* :node_cpu_saturation_load1:
* :node_cpu_utilisation:avg1m
* :node_disk_saturation:avg_irate
* :node_disk_utilisation:avg_irate
* :node_memory_swap_io_bytes:sum_rate
* :node_memory_utilisation:
* :node_net_saturation:sum_irate
* :node_net_utilisation:sum_irate
* cluster_quantile:apiserver_request_duration_seconds:histogram_quantile
* cluster_quantile:scheduler_binding_duration_seconds:histogram_quantile
* cluster_quantile:scheduler_e2e_scheduling_duration_seconds:histogram_quantile
* cluster_quantile:scheduler_scheduling_algorithm_duration_seconds:histogram_quantile
* instance:node_filesystem_usage:sum
* instance:node_network_receive_bytes:rate:sum
* node:cluster_cpu_utilisation:ratio
* node:cluster_memory_utilisation:ratio
* node:node_cpu_saturation_load1:
* node:node_cpu_utilisation:avg1m
* node:node_disk_saturation:avg_irate
* node:node_disk_utilisation:avg_irate
* node:node_filesystem_avail:
* node:node_filesystem_usage:
* node:node_inodes_free:
* node:node_inodes_total:
* node:node_memory_bytes_total:sum
* node:node_memory_swap_io_bytes:sum_rate
* node:node_memory_utilisation:
* node:node_memory_utilisation:ratio
* node:node_memory_utilisation_2:
* node:node_net_saturation:sum_irate
* node:node_net_utilisation:sum_irate
* node:node_num_cpu:sum
* node_namespace_pod:kube_pod_info:

For more information about above metrics please see [this](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/scraped-metrics.md#aggregations) documentation.

## up metrics

Prometheus generates a metric called up that indicates whether a scrape was successful. A  value of “1” is scrape indicates success, “0” failure. The `up` metric is useful for debugging and alerting for targets that are down or having issues. Each target should produce an up metric on every scrape.
