---
id: collect-logs-metrics
title: Collect Logs and Metrics for the Kubernetes App
sidebar_label: Collect Logs and Metrics for the Kubernetes App
description: This page has instructions for collecting logs for the Sumo App for Kubernetes.
---

This page has instructions for collecting logs and metrics for the Sumo App for Kubernetes. FluentBit and FluentD. Prometheus collects metrics data for Sumo Logic.

## What You'll Need  
Set the following fields in the Sumo Logic UI prior to configuring collection. This ensures that your logs are tagged with relevant metadata, which is required by the app dashboards and Explore.

* cluster
* container
* deployment
* host
* namespace
* node
* pod
* service

For information on setting up fields, see the [Fields](/docs/manage/fields) help page.

## Collecting metrics and logs for Kubernetes
Reference the [Deployment Guide](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/README.md#documentation) in our sumologic-kubernetes-collection GitHub repository for detailed instructions on how to collect Kubernetes logs, metrics, and events; enrich them with deployment, pod, and service level metadata; and send them to Sumo Logic.

The Deployment Guide has information on advanced configurations, best practices, performance, troubleshooting, and upgrading for our latest and previous versions of supported software.

## Sample log message

Application Logs:

```
{"timestamp":1561534865020,"log":"E0626 07:41:05.020255       1
manager.go:101] Error in scraping containers from kubelet:192.168.190.54:10255:
failed to get all container stats from Kubelet URL \"http://192.168.190.54:10255/stats/container/\":
Post http://192.168.190.54:10255/stats/container/: dial tcp 192.168.190.54:10255:
getsockopt: connection refused"}
```

## Sample Query

Message Breakdown by Container from the Dashboard Container Logs:

```sql
 cluster = * and namespace = * and pod = * and container = *
| json field=_raw "log" as message
| fields - message | count container | top 10 container by _count
```
