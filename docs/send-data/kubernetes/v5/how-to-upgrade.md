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

- `helm4`
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


### Forwarding Metrics Using Prometheus Remote Write into the OTel Pipeline
This section is applicable if you are using your own Prometheus Operator and forwarding metrics into the Sumo Logic Kubernetes metrics collection pipeline using prometheus remote write protocol.

In the past, Sumo Logic relied on Prometheus to scrape metrics and since there was no OTel Operator for metrics collection at the time, forwarding via Prometheus remote write was the recommended approach. Now that the OTel Operator has been standardized for metrics collection and supports all Prometheus scraping mechanisms, we recommend migrating. Please refer to the previous section on converting metrics configuration from Prometheus to the OTel Operator.

If you still have specific use cases that require forwarding metrics from your own Prometheus instance into the OTel metrics pipeline, we have introduced the prometheusremotewritereceiver as an alternative.

This receiver accepts Prometheus remote write requests but only supports,
- Remote Write v2 protocol
- /api/v1/write as the default Remote write endpoint, this is only endpoint where sumologic metrics pipeline accepts remote writes. You need to change your prometheus configuration to send metrics to this endpoint.
  
For guidelines on enabling Remote Write v2, please refer to the prometheusremotewritereceiver documentation
 [prometheusremotewrite receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusremotewritereceiver#prometheus-compatibility) documentation.

In the meantime, if you need more time to migrate, you can enable the flag metadata.metrics.enableSumoPrometheusRemotewriteReceiver which retains the same functionality as older versions, which allows both Prometheus Remote Write v1 and v2 and customizing remote write endpoint. Please note that this flag is intended as a temporary migration aid and will be removed in a future release.
