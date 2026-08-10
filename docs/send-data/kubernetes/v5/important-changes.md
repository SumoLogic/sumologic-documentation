---
id: important-changes
title: Kubernetes Collection v5.0.0 - Important Changes
sidebar_label: Important Changes
description: This page describes the major changes and the necessary migration steps.
---

We're introducing some changes to the Sumo Logic Kubernetes Collection solution.

This page describes the major changes and the necessary migration steps.

## Important changes

## Prometheus operator removal

:::note
For those already using the OpenTelemetry operator (the default metrics collector) in v4, or who are not using the metrics collection feature at all, this change is not applicable. Please skip this section.
Only applicable for customers who are still using the Sumologic-provided Prometheus operator for metrics collection by explicitly enabling the `kube-prometheus-stack.prometheusOperator.enabled` flag.
:::

The OpenTelemetry operator became the default for metrics collection starting with helm chart v4, but in v4, there was an option to re-enable the Prometheus operator for metrics collection. Starting with v5, we have removed support for the Prometheus operator completely, and the OpenTelemetry operator is now the sole source for metric collection.

If you are still using Prometheus Operator in Helm chart v4 and haven't migrated to OpenTelemetry operator yet, please follow [OpenTelemetry Operator migration guide](https://www.sumologic.com/help/docs/send-data/kubernetes/v4/important-changes/#opentelemetry-collector-for-metrics-collection) before upgrading to this version. The guide will help you to install OpenTelemetry Operator CRDs, which are a prerequisite for this upgrade.

## Prometheus remote write

:::note
This change applies only to customers who are forwarding metrics from their own Prometheus instance into the Sumo Logic Kubernetes metrics collection pipeline via remote write. If you are not using Prometheus remote write, please skip this section.
:::

The Sumologic metrics collector previously used to accept Prometheus remote write requests using [telegraf receiver](https://github.com/SumoLogic/sumologic-otel-collector/tree/main/pkg/receiver/telegrafreceiver) has been replaced by the `prometheusremotewritereceiver`. This new receiver **only supports Prometheus Remote Write v2 protocol**.

If you are currently sending metrics using Remote Write v1, you have two options:

- **Recommended:** Migrate to Remote Write v2 by adding `protobuf_message: io.prometheus.write.v2.Request` to your Prometheus `remote_write` configuration. See the [prometheusremotewritereceiver documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusremotewritereceiver#configuring-your-prometheus) for details.
- **Temporary:** Enable the flag `metadata.metrics.enableSumoPrometheusRemotewriteReceiver` to accept both v1 and v2 writes during your migration window. This flag will be removed in a future release.
