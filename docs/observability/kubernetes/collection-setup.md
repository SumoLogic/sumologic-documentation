---
id: collection-setup
title: Set up Data Collection for Kubernetes
sidebar_label: Set Up Data Collection
description: This page provides an overview of Kubernetes collection process for Kubernetes environments, and then walks you through configuring log and metric collection.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page provides an overview of the collection process for Kubernetes environments.

Sumo Logic collects logs, events, metrics, and security data using the [Sumo Logic distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector) and Falco, both of which are open source collectors. The collected data streams through the OpenTelemetry pipelines for metadata enrichment. Sumo Logic then tags the container, pod, node, and cluster, as well as identifying the service, namespace, and deployment.

<img src={useBaseUrl('img/kubernetes/K8s-architecture.png')} alt="Kubernetes architecture" style={{border: '1px solid gray'}} width="800" />

Reference [Kubernetes Quickstart](/docs/observability/kubernetes/quickstart) for instructions on how to set up collection, install the relevant dashboards and alerts, and start monitoring your Kubernetes environment.

See the [Sumo Logic Kubernetes Helm Chart](/docs/send-data/kubernetes/helm-chart-overview) for information on advanced configurations, best practices, performance, troubleshooting, and upgrading to our latest version.
