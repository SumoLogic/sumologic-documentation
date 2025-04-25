---
id: collection-setup
title: Set up Data Collection for Kubernetes
sidebar_label: Set Up Data Collection
description: This page provides an overview of Kubernetes collection process for Kubernetes environments, and then walks you through configuring log and metric collection.
---

This page provides an overview of the collection process for Kubernetes environments.

Sumo Logic collects logs, events, metrics, and security data using the [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector) and Falco, both of which are open source collectors. The collected data streams through the OpenTelemetry pipelines for metadata enrichment. Sumo Logic then tags the container, pod, node, and cluster, as well as identifying the service, namespace, and deployment.

![K8s.png](/img/kubernetes/K8s-architecture.png)

Reference the [K8s Quickstart guide](/docs/observability/kubernetes/quickstart.md) for instructions on how to setup collection, install the relevant dashboards and alerts, in order to start monitoring your Kubernetes environment.

See the [Sumo Logic Kubernetes Collection Deployment Guide](/docs/send-data/kubernetes/helm-chart-overview.md) for information on advanced configurations, best practices, performance, troubleshooting, and upgrading to our latest version.
