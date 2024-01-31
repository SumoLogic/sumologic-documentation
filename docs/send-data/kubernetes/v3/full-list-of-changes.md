---
id: full-list-of-changes
title: Kubernetes Collection v3.0.0 - Full List of Changes
sidebar_label: Full List of Changes
description: This page describes full list of changes in Kubernetes Collection v3
---

- Upgrading kube-prometheus stack

  We are updating Kube-prometheus-stack to newest available version. Major feature related to that change is upgrading kube-state-metrics to v2

- Removing mechanism to replace values in configuration for traces marked by 'replace' suffix
- Moving direct configuration of OpenTelemetry Collector for log metadata

  Removed explicit configuration for otelcol under `metadata.logs.config`. Added option to merge configuration under `metadata.logs.config.merge` or overwrite default configuration `metadata.logs.config.override`

- Moving direct configuration of OpenTelemetry Collector for metrics metadata

  Removed explicit configuration for otelcol under `metadata.metrics.config`. Added option to merge configuration under `metadata.metrics.config.merge` or overwrite default configuration `metadata.metrics.config.override`

- Removing support for `sumologic.cluster.load_config_file`. Leaving this configuration will result in setup job failure.
- Upgrading Falco helm chart to `v2.4.2` which changed their configuration: Please validate and adjust your configuration to new version according to [Falco documentation]

- Moved parameters from `fluentd.logs.containers` to `sumologic.logs.container`

  - moved `fluentd.logs.containers.sourceHost` to `sumologic.logs.container.sourceHost`
  - moved `fluentd.logs.containers.sourceName` to `sumologic.logs.container.sourceName`
  - moved `fluentd.logs.containers.sourceCategory` to `sumologic.logs.container.sourceCategory`
  - moved `fluentd.logs.containers.sourceCategoryPrefix` to `sumologic.logs.container.sourceCategoryPrefix`
  - moved `fluentd.logs.containers.sourceCategoryReplaceDash` to `sumologic.logs.container.sourceCategoryReplaceDash`
  - moved `fluentd.logs.containers.excludeContainerRegex` to `sumologic.logs.container.excludeContainerRegex`
  - moved `fluentd.logs.containers.excludeHostRegex` to `sumologic.logs.container.excludeHostRegex`
  - moved `fluentd.logs.containers.excludeNamespaceRegex` to `sumologic.logs.container.excludeNamespaceRegex`
  - moved `fluentd.logs.containers.excludePodRegex` to `sumologic.logs.container.excludePodRegex`
  - moved `fluentd.logs.containers.sourceHost` to `sumologic.logs.container.sourceHost`
  - moved `fluentd.logs.containers.perContainerAnnotationsEnabled` to `sumologic.logs.container.perContainerAnnotationsEnabled`
  - moved `fluentd.logs.containers.perContainerAnnotationPrefixes` to `sumologic.logs.container.perContainerAnnotationPrefixes`

- Moved parameters from `fluentd.logs.kubelet` to `sumologic.logs.kubelet`

  - moved `fluentd.logs.kubelet.sourceName` to `sumologic.logs.kubelet.sourceName`
  - moved `fluentd.logs.kubelet.sourceCategory` to `sumologic.logs.kubelet.sourceCategory`
  - moved `fluentd.logs.kubelet.sourceCategoryPrefix` to `sumologic.logs.kubelet.sourceCategoryPrefix`
  - moved `fluentd.logs.kubelet.sourceCategoryReplaceDash` to `sumologic.logs.kubelet.sourceCategoryReplaceDash`
  - moved `fluentd.logs.kubelet.excludeFacilityRegex` to `sumologic.logs.kubelet.excludeFacilityRegex`
  - moved `fluentd.logs.kubelet.excludeHostRegex` to `sumologic.logs.kubelet.excludeHostRegex`
  - moved `fluentd.logs.kubelet.excludePriorityRegex` to `sumologic.logs.kubelet.excludePriorityRegex`
  - moved `fluentd.logs.kubelet.excludeUnitRegex` to `sumologic.logs.kubelet.excludeUnitRegex`

- Moved parameters from `fluentd.logs.systemd` to `sumologic.logs.systemd`

  - moved `fluentd.logs.systemd.sourceName` to `sumologic.logs.systemd.sourceName`
  - moved `fluentd.logs.systemd.sourceCategory` to `sumologic.logs.systemd.sourceCategory`
  - moved `fluentd.logs.systemd.sourceCategoryPrefix` to `sumologic.logs.systemd.sourceCategoryPrefix`
  - moved `fluentd.logs.systemd.sourceCategoryReplaceDash` to `sumologic.logs.systemd.sourceCategoryReplaceDash`
  - moved `fluentd.logs.systemd.excludeFacilityRegex` to `sumologic.logs.systemd.excludeFacilityRegex`
  - moved `fluentd.logs.systemd.excludeHostRegex` to `sumologic.logs.systemd.excludeHostRegex`
  - moved `fluentd.logs.systemd.excludePriorityRegex` to `sumologic.logs.systemd.excludePriorityRegex`
  - moved `fluentd.logs.systemd.excludeUnitRegex` to `sumologic.logs.systemd.excludeUnitRegex`

- Moved parameters from `fluentd.logs.default` to `sumologic.logs.defaultFluentd`

  - moved `fluentd.logs.default.sourceName` to `sumologic.logs.defaultFluentd.sourceName`
  - moved `fluentd.logs.default.sourceCategory` to `sumologic.logs.defaultFluentd.sourceCategory`
  - moved `fluentd.logs.default.sourceCategoryPrefix` to `sumologic.logs.defaultFluentd.sourceCategoryPrefix`
  - moved `fluentd.logs.default.sourceCategoryReplaceDash` to `sumologic.logs.defaultFluentd.sourceCategoryReplaceDash`
  - moved `fluentd.logs.default.excludeFacilityRegex` to `sumologic.logs.defaultFluentd.excludeFacilityRegex`
  - moved `fluentd.logs.default.excludeHostRegex` to `sumologic.logs.defaultFluentd.excludeHostRegex`
  - moved `fluentd.logs.default.excludePriorityRegex` to `sumologic.logs.defaultFluentd.excludePriorityRegex`
  - moved `fluentd.logs.default.excludeUnitRegex` to `sumologic.logs.defaultFluentd.excludeUnitRegex`

- Upgrading Metrics Server to `6.2.4`. In case of changing `metrics-server.*` configuration, see [upgrading section of chart's documentation][metrics-server-upgrade].

- Upgrading Tailing Sidecar Operator helm chart to v0.5.5. There is no breaking change if using annotations only.

- OpenTelemetry Logs Collector will read from end of file now.

  See [OpenTelemetry Collector doesn't read logs from the beginning of files](/docs/send-data/kubernetes/v3/how-to-upgrade.md#opentelemetry-collector-doesnt-read-logs-from-the-beginning-of-files) if you want to keep old behavior.

- Changed `otelagent` from `DaemonSet` to `StatefulSet`

- Moved parameters from `otelagent.*` to `otelcolInstrumentation.*`

- Moved parameters from `otelgateway.*` to `tracesGateway.*`

- Moved parameters from `otelcol.*` to `tracesSampler.*`

- Enabled metrics and traces collection from instrumentation by default

  - changed parameter `sumologic.traces.enabled` default value from `false` to `true`

- Adding `sumologic.metrics.serviceMonitors` to avoid copying values for `kube-prometheus-stack.prometheus.additionalServiceMonitors` configuration

- Adding `sumologic.metrics.otelcol.extraProcessors` to make metrics modification easy

- Moved `fluentd.logs.output.logFormat` to `sumologic.logs.container.format`

[falco documentation]: https://github.com/falcosecurity/charts/tree/falco-2.4.2/falco
[metrics-server-upgrade]: https://github.com/bitnami/charts/tree/5b09f7a7c0d9232f5752840b6c4e5cdc56d7f796/bitnami/metrics-server#to-600
