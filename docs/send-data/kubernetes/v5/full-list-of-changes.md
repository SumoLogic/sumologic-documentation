---
id: full-list-of-changes
title: Kubernetes Collection v4.0.0 - Full List of Changes
sidebar_label: Full list of Changes
description: This page describes full list of changes in Kubernetes Collection v4.
---

- Drop Prometheus recording rule metrics

  This has already been called out in v4 upgrade guide, this is only applicable now for those who were still using promtheus operator in v4 and just migrating to Otel operator in v5.

  OpenTelemetry cannot collect Prometheus recording rule metrics. The new version therefore stops collecting the following recording rule metrics.

  - kube_pod_info_node_count
  - node_cpu_saturation_load1
  - node_cpu_utilisation:avg1m
  - node_disk_saturation:avg_irate
  - node_disk_utilisation:avg_irate
  - node_memory_swap_io_bytes:sum_rate
  - node_memory_utilisation
  - node_net_saturation:sum_irate
  - node_net_utilisation:sum_irate
  - cluster_quantile:apiserver_request_duration_seconds:histogram_quantile
  - cluster_quantile:scheduler_binding_duration_seconds:histogram_quantile
  - cluster_quantile:scheduler_framework_extension_point_duration_seconds:histogram_quantile
  - cluster_quantile:scheduler_e2e_scheduling_duration_seconds:histogram_quantile
  - cluster_quantile:scheduler_scheduling_algorithm_duration_seconds:histogram_quantile
  - instance:node_network_receive_bytes:rate:sum
  - node:cluster_cpu_utilisation:ratio
  - node:cluster_memory_utilisation:ratio
  - node:node_cpu_saturation_load1
  - node:node_cpu_utilisation:avg1m
  - node:node_disk_saturation:avg_irate
  - node:node_disk_utilisation:avg_irate
  - node:node_filesystem_avail
  - node:node_filesystem_usage
  - node:node_inodes_free
  - node:node_inodes_total
  - node:node_memory_bytes_total:sum
  - node:node_memory_swap_io_bytes:sum_rate
  - node:node_memory_utilisation
  - node:node_memory_utilisation:ratio
  - node:node_memory_utilisation_2
  - node:node_net_saturation:sum_irate
  - node:node_net_utilisation:sum_irate
  - node:node_num_cpu:sum
  - node_namespace_pod:kube_pod_info

  Instead, the following new node metrics are now collected

  - node_disk_io_time_weighted_seconds_total
  - node_disk_io_time_seconds_total
  - node_vmstat_pgpgin
  - node_vmstat_pgpgout
  - node_memory_MemFree_bytes
  - node_memory_MemAvailable_bytes
  - node_memory_Cached_bytes
  - node_memory_Buffers_bytes
  - node_memory_MemTotal_bytes
  - node_network_receive_drop_total
  - node_network_transmit_drop_total
  - node_network_receive_bytes_total
  - node_network_transmit_bytes_total
  - node_filesystem_avail_bytes
  - node_filesystem_size_bytes
