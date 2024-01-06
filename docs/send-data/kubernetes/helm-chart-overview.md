---
id: helm-chart-overview
title: Sumo Logic Kubernetes Helm Chart
sidebar_label: Overview
description: This page provides an overview of the Sumo Logic Kubernetes Helm Chart.
---

This page provides an overview of the Sumo Logic Kubernetes Helm Chart.

The Helm Chart collects logs, events, metrics, and security data using the [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector) and Falco, both of which are open source collectors. The collected data streams through the OpenTelemetry pipelines for metadata enrichment.

![K8s.png](/img/kubernetes/K8s-architecture.png)

See the [Installation guide](install-helm-chart.md) for instructions on how install the Helm Chart.
