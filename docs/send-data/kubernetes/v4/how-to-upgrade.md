---
id: how-to-upgrade
title: Kubernetes Collection v4.0.0 - How to Upgrade
sidebar_label: How to Upgrade
description: This page describes how to upgrade Kubernetes Collection to v4.
---

## Requirements

- `helm3`
- `kubectl`
- Set the following environment variables, which our commands will use:
   ```bash
   export NAMESPACE=...
   export HELM_RELEASE_NAME=...
   ```

## Metrics migration

If you do not have metrics collection enabled, skip straight to the
[next major section](#remove-remaining-fluent-bit-and-fluentd-configuration).

### Convert Prometheus remote writes to otel metrics filters

**When?**: If you have custom remote writes defined in `kube-prometheus-stack.prometheus.prometheusSpec.additionalRemoteWrites`.

When using Prometheus for metrics collection in v3, we relied on remote writes for filtering forwarded metrics. OTel, which is the default in v4, does not support remote writes, so we've moved this functionality to OTel processors, or ServiceMonitors if it can be done there.

There are several scenarios here, depending on the exact use case:

1. You're collecting different [Kubernetes metrics][kubernetes_metrics_v3] than what the Chart provides by default. You've modified the existing ServiceMonitor for these metrics, and added a remote write as instructed by the documentation.

   You can safely delete the added remote write definition. No further action is required.

1. As above, but you're also doing some additional data transformation via relabelling rules in the remote write definition.

   You'll need to either move the relabelling rules into the ServiceMonitor itself, or [add an equivalent filter processor][otel_metrics_filter] rule to OTel.

1. You're collecting custom application metrics by adding a [`prometheus.io/scrape` annotation][application_metrics_annotation]. You do not need to filter these metrics.

   No action is needed.

1. As above, but you also have a remote write definition to filter these metrics.

   You'll need to delete the remote write definition and [add an equivalent filter processor][otel_metrics_filter] rule to OTel.

### Upgrade the Kubernetes App

**When?**: If you use the [Sumo Logic Kubernetes App](/docs/integrations/containers-orchestration/kubernetes/)

Recording rule metrics removed in version 4 were used in the Sumo Kubernetes App. A new version of the App must be installed to ensure
compatibility with version 4 of Helm Chart. See [here][k8s_app_upgrade] for upgrade instructions.

[k8s_app_upgrade]: /docs/integrations/containers-orchestration/kubernetes/#upgradedowngrade-the-kubernetes-app

#### Using the new app with v3

To make the migration simpler, it's possible to configure v3 to be compatible with the new App. This way, you can migrate to the new App
before migrating to version 4. The configuration for version 3 is the following:

```yaml
kube-prometheus-stack:
  prometheus:
    prometheusSpec:
      additionalRemoteWrite:
        - url: http://$(METADATA_METRICS_SVC).$(NAMESPACE).svc.cluster.local.:9888/prometheus.metrics.node
          remoteTimeout: 5s
          writeRelabelConfigs:
            - action: keep
              regex: node-exporter;(?:node_load1|node_load5|node_load15|node_cpu_seconds_total|node_disk_io_time_weighted_seconds_total|node_disk_io_time_seconds_total|node_vmstat_pgpgin|node_vmstat_pgpgout|node_memory_MemFree_bytes|node_memory_MemAvailable_bytes|node_memory_Cached_bytes|node_memory_Buffers_bytes|node_memory_MemTotal_bytes|node_network_receive_drop_total|node_network_transmit_drop_total|node_network_receive_bytes_total|node_network_transmit_bytes_total|node_filesystem_avail_bytes|node_filesystem_size_bytes)
            sourceLabels: [job, __name__]
  prometheus-node-exporter:
    prometheus:
      monitor:
        metricRelabelings:
          - action: keep
            regex: (?:node_load1|node_load5|node_load15|node_cpu_seconds_total|node_disk_io_time_weighted_seconds_total|node_disk_io_time_seconds_total|node_vmstat_pgpgin|node_vmstat_pgpgout|node_memory_MemFree_bytes|node_memory_MemAvailable_bytes|node_memory_Cached_bytes|node_memory_Buffers_bytes|node_memory_MemTotal_bytes|node_network_receive_drop_total|node_network_transmit_drop_total|node_network_receive_bytes_total|node_network_transmit_bytes_total|node_filesystem_avail_bytes|node_filesystem_size_bytes)
            sourceLabels: [__name__]
```

#### Update custom resource definition for OpenTelemetry operator

```shell
kubectl apply -f https://raw.githubusercontent.com/open-telemetry/opentelemetry-helm-charts/opentelemetry-operator-0.56.1/charts/opentelemetry-operator/crds/crd-opentelemetry.io_opampbridges.yaml

kubectl apply -f https://raw.githubusercontent.com/open-telemetry/opentelemetry-helm-charts/opentelemetry-operator-0.56.1/charts/opentelemetry-operator/crds/crd-opentelemetryinstrumentation.yaml

kubectl apply -f https://raw.githubusercontent.com/open-telemetry/opentelemetry-helm-charts/opentelemetry-operator-0.56.1/charts/opentelemetry-operator/crds/crd-opentelemetrycollector.yaml`
```

### How to revert to the v3 defaults

Set the following in your configuration:

```yaml
sumologic:
  metrics:
    collector:
      otelcol:
        enabled: false
    remoteWriteProxy:
      enabled: true

kube-prometheus-stack:
  prometheus:
    enabled: true
  prometheusOperator:
    enabled: true
```

## Remove remaining Fluent Bit and Fluentd configuration

If you've already switched to OTel, skip straight to the [next major section](#switch-to-otlp-sources).

The following configuration options aren't used anymore, and should be removed from your `user-values.yaml`:

- `fluent-bit.*`
- `sumologic.logs.collector.allowSideBySide`
- `sumologic.logs.defaultFluentd.*`
- `fluentd.*`
- `sumologic.logs.metadata.provider`
- `sumologic.metrics.metadata.provider`

### Configuration Migration

See the [v3 migration guide][v3_migration_guide].

In addition, the following changes have been made:

- `otelevents.serviceLabels` has been introduced as replacement for `fluentd.serviceLabels` for events service
- `sumologic.events.sourceName` is going to be used instead of `fluentd.events.sourceName` to build `_sourceCategory` for events

If you've changed the values of either of these two options, you'll need to adjust your configuration accordingly.

## Switch to OTLP sources

:::note
Both source types will be created by the setup job. The settings discussed here affect which source is actually used.
:::

**When?**: You use the `_sourceName` or `_source` fields in your Sumo queries.

The only solution is to change the queries in question. In general, it's an antipattern to write queries against specific sources, instead of semantic attributes of the data.

### How to revert to the v3 defaults

Set the following in your configuration:

```yaml
sumologic:
  logs:
    sourceType: http

  metrics:
    sourceType: http

  traces:
    sourceType: http

  events:
    sourceType: http

tracesSampler:
  config:
    exporters:
      otlphttp:
        traces_endpoint: ${SUMO_ENDPOINT_DEFAULT_TRACES_SOURCE}/v1/traces
```

## Running the helm upgrade

Once you've taken care of any manual steps necessary for your configuration, run the helm upgrade:

```bash
helm upgrade --namespace "${NAMESPACE}" "${HELM_RELEASE_NAME}" sumologic/sumologic --version=4.0.0 -f new-values.yaml
```
:::note
Make sure to replace `--version=4.0.0` with the version of the helm chart you prefer to use. The latest release can be found in our [Sumo Logic Kubernetes Collection GitHub Repository](https://github.com/SumoLogic/sumologic-kubernetes-collection/releases).
:::

After you're done, please review the [full list of changes](full-list-of-changes.md), as some of them may impact you even if they do not require additional action.

[application_metrics_annotation]: /docs/send-data/kubernetes/collecting-metrics#application-metrics-are-exposed-one-endpoint-scenario
[kubernetes_metrics_v3]: https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/release-v3/docs/collecting-kubernetes-metrics.md#collecting-kubernetes-metrics
[otel_metrics_filter]: /docs/send-data/kubernetes/collecting-metrics#filtering-metrics
[v3_migration_guide]: /docs/send-data/kubernetes/v3/important-changes/
