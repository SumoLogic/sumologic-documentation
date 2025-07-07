---
id: important-changes
title: Kubernetes Collection v4.0.0 - Important Changes
sidebar_label: Important Changes
description: This page describes the major changes and the necessary migration steps.
---

Based on user feedback, we're introducing several changes to the Sumo Logic Kubernetes Collection solution.

This page describes the major changes and the necessary migration steps.

## Important changes

### Kubernetes Attributes Processor support (v4.13)

The [Kubernetes Attributes Processor](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/k8sattributesprocessor/README.md) is now supported for logs and metrics metadata enrichment. This processor is disabled by default. To enable this processor for logs, set `metadata.logs.useSumoK8sProcessor` to `false`. To enable this processor for metrics, set `metadata.metrics.useSumoK8sProcessor` to `false`.

:::note
The Service name isn't part of the metadata enrichment with this new processor.
:::

### Remove Fluent Bit and Fluentd

As of version 3 of the Chart, Fluent Bit and Fluentd were replaced by the OpenTelemetry Collector by default. However, it was still possible to use Fluent Bit and/or Fluentd by changing the configuration. In version 4, this is no longer possible. For migration instructions, see the [v3 migration guide](/docs/send-data/kubernetes/v3/how-to-upgrade/).

### Drop Prometheus recording rule metrics

OpenTelemetry cannot collect Prometheus recording rule metrics. The new version therefore stops collecting recording rule metrics and updates will be made to the Kubernetes App to remove these metrics. See the [scraped metrics reference](https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/scraped-metrics.md#aggregations-removed) for instructions on how to recover these recording rule metrics in Sumo.

### Drop Histogram metrics

Histogram metrics are not collected for any version later than 4.9.0. You can collect these metrics with an allowlist (regex) using the following key: `sumologic.metrics.allowHistogramRegex`

:::note
Histogram metrics could still be collected via auto or manual instrumentation.
:::

### OpenTelemetry Collector for metrics collection

By default, the OpenTelemetry Collector is now used for metrics collection instead of Prometheus. For the majority of use cases, this will be a transparent change without any need for manual configuration changes. OpenTelemetry Collector will continue to collect the same default metrics as Prometheus did previously, and will support the same mechanisms for collecting custom application metrics. Any exceptions will be called out in the migration guide below.

Ensure that the following CRDs from the OpenTelemetry operator are installed and updated using the following commands.

:::note
Please follow instructions below to install the appropriate CRD versions
:::

#### CRDs to install (v4.12.0 and later)

```shell
kubectl apply --server-side -f https://raw.githubusercontent.com/SumoLogic/sumologic-kubernetes-collection/refs/tags/v4.12.0/deploy/helm/sumologic/crds/crd-opentelemetry.io_opampbridges.yaml --force-conflicts

kubectl apply --server-side -f https://raw.githubusercontent.com/SumoLogic/sumologic-kubernetes-collection/refs/tags/v4.12.0/deploy/helm/sumologic/crds/crd-opentelemetrycollector.yaml --force-conflicts

kubectl apply --server-side -f https://raw.githubusercontent.com/SumoLogic/sumologic-kubernetes-collection/refs/tags/v4.12.0/deploy/helm/sumologic/crds/crd-opentelemetryinstrumentation.yaml --force-conflicts
```

Then, annotate and label these CRDs as below

```shell
kubectl annotate crds instrumentations.opentelemetry.io opentelemetrycollectors.opentelemetry.io opampbridges.opentelemetry.io \
  meta.helm.sh/release-name=${RELEASE_NAME} \
  meta.helm.sh/release-namespace=${RELEASE_NAMESPACE}
kubectl label crds instrumentations.opentelemetry.io opentelemetrycollectors.opentelemetry.io opampbridges.opentelemetry.io app.kubernetes.io/managed-by=Helm
```

#### CRDs to install (before v4.12.0)

```shell
kubectl apply -f https://raw.githubusercontent.com/open-telemetry/opentelemetry-helm-charts/opentelemetry-operator-0.56.1/charts/opentelemetry-operator/crds/crd-opentelemetryinstrumentation.yaml

kubectl apply -f https://raw.githubusercontent.com/open-telemetry/opentelemetry-helm-charts/opentelemetry-operator-0.56.1/charts/opentelemetry-operator/crds/crd-opentelemetrycollector.yaml

kubectl apply -f https://raw.githubusercontent.com/open-telemetry/opentelemetry-helm-charts/opentelemetry-operator-0.56.1/charts/opentelemetry-operator/crds/crd-opentelemetry.io_opampbridges.yaml
```

### Use OTLP sources by default

This Helm Chart automatically creates the necessary Collector and Sources in Sumo. Up until this point, these were generic HTTP sources accepting data in different formats. As Sumo now has native support for the OTLP protocol used by OpenTelemetry, we've decided to switch to using these new sources by default. This is a completely transparent change **unless** you use the `_sourceName` or `_source` fields in your Sumo queries.

