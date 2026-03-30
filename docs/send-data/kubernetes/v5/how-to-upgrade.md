---
id: how-to-upgrade
title: Kubernetes Collection v5.0.0 - How to Upgrade
sidebar_label: How to Upgrade
description: This page describes how to upgrade Kubernetes Collection to v5.
---

This guide walks you through upgrading to Sumo Logic Kubernetes Collection v5.0.0, including key changes, migration steps, and best practices to ensure a smooth transition. Here's what’s new:
* Prometheus operator which has been deprecated in v4 has now been removed in v5
* Otel operator is now the single source for metrics collection
* Removed feasibility to forward prometheus metrics into Otel metrics pipeline as described [here](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/release-v4.0/docs/kube-prometheus.md)

Before proceeding, ensure you meet the requirements and review the necessary configuration changes detailed in this guide.

## Requirements

- `helm3`
- `kubectl`
- Set the following environment variables, which our commands will use:
   ```bash
   export NAMESPACE=...
   export HELM_RELEASE_NAME=...
   ```
## Metrics collection - Prometheus to Otel migration
If you have already migrated to Otel operator in v4, not using promtheus operator or not using metrics collection feature at all, please skip this section.

### Convert Prometheus remote writes to otel metrics filters
Please follow [this guide](https://www.sumologic.com/help/docs/send-data/kubernetes/v4/how-to-upgrade/#convert-prometheus-remote-writes-to-otel-metrics-filters) which has detailed steps

### Converting custom application metrics collection config from prometheus to Otel operator
Prometheus has three main types of collection mechanisms namely, podmonitors, servicemonitors and scrape configurations. If you are collecting custom application metrics using any of these
three methods, let's see how it maps to Otel operator.

1. **Pod annotations**:
   No change, Otel operator looks for pods annotated with prometheus.io/scrape=true and collects those metrics.

2. **Service monitors**:
   Otel operator scrapes your custom application metrics which are exposed behind a service using serviceMonitors the same way prometheus operator scrapes. You just need to move your
custom service monitors from promtheus to Otel configuration.
If you have additional custom Service Monitors defined under kube-prometheus-stack.prometheus.additionalServiceMonitor, Move it to sumologic.metrics.additionalServiceMonitors
Otel operators should now scrape your custom app metrics exposed behind the service.

3. **Scrape configs**:
   If you have kube-prometheus-stack.prometheus.prometheusSpec.additionalScrapeConfigs defined, Move it to sumologic.metrics.collector.otelcol.config.merge.receivers.prometheus.config.scrape_configs


### Stop forwarding metrics using Prometheus remote writes into Otel pipeline
This is applicable for you if you are using your own prometheus operator and using remote write proxy to forward metrics into sumologic kubernetes metrics collection pipeline as discussed [here](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/release-v4.0/docs/kube-prometheus.md)

We have provided this feasibility of forwarding metrics from prometheus to sumologic kubernetes collection since we don't had Otel operator in the past for metrics collection and sumologic relied on Promtheus too to scrape metrics and don't want to install another prometheus instance to scrape metrics. But now, Otel operator has been standardized to collect metrics using all types of scraping mechanisms that promtheus supports. Please refer pervious section on converting metrics config from Prometheus to Otel operator to start using Otel to scrape metrics.
