---
id: collection-setup
title: Set up Data Collection for Kubernetes
sidebar_label: Set Up Data Collection
hide_table_of_contents: true
---

This page provides an overview of the collection process for Kubernetes environments.

Sumo Logic collects logs, events, metrics, and security data with Fluentbit, FluentD, Prometheus, and Falco. These collectors are all open source collectors that are maintained by the Cloud Native Computing Foundation (CNCF). The collected data streams through a centralized FluentD pipeline for metadata enrichment. Sumo Logic tags the container, pod, node, and cluster, as well as identifying the service, namespace, and deployment.

![K8s.png](/img/kubernetes/K8s-architecture.png)

## Installation Guide

Reference the [K8s Quickstart guide](/docs/observability/kubernetes-solution/quickstart.md) for instructions on how to setup collection, install the relevant dashboards and alerts, in order to start monitoring your Kubernetes environment.

See the [Deployment Guide](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/README.md#documentation) for Deployment Guide has information on advanced configurations, best practices, performance, troubleshooting, and upgrading for our latest and previous versions of supported software.
