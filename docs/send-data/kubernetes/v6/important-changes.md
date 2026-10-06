---
id: important-changes
title: Kubernetes Collection v6.0.0 - Important Changes
sidebar_label: Important Changes
description: This page describes the major changes and the necessary migration steps.
---

We're introducing two major changes to the Sumo Logic Kubernetes Collection solution in v6.

This page describes each change and its impact on your existing setup. Both below listed features are **enabled by default** in v6. You can read the changes and disable if required. You also need set the corresponding acknowledgment flag before the upgrade can proceed.

## 1. Sourceless Mode for data upload

Through Helm chart v5, the Sumo Logic Kubernetes Collection sent data to HTTP or OpenTelemetry Protocol (OTLP) sources on a Hosted Collector. The Hosted Collector appears in **Manage Data → Collection** under the value configured in `sumologic.collectorName` or, by default, `sumologic.clusterName`. Sourceless mode removes this dependency. Collection pods instead authenticate and register directly with Sumo Logic by using an installation token and the Sumo Logic OpenTelemetry extension.

Below are the key changes and their impact on your existing setup. You can read these impacts and disable the sourceless mode if required, but most of the cases, it's advised to proceed with enabling sourceless mode.

### 1.1 `_source` metadata no longer available

In the classic collection model, each data pipeline sends data to a dedicated HTTP or OTLP source, which automatically populates the `_source` metadata field on ingested data. In sourceless mode, there are no sources involved and data is sent directly to Sumo Logic, so `_source` is no longer populated and cannot be used in search queries.

**Impact:**
- Any saved searches, dashboards, or monitors that filter or group by `_source` will return no results or incorrect results after migration.
- Audit and update these queries before enabling sourceless mode. No changes are needed if your queries do not use `_source`.

`_collector` **is preserved.** The source processor in the OTel pipeline still populates `_collector` with the value of `sumologic.collectorName` (defaults to `sumologic.clusterName`). Queries that use `_collector` to identify your cluster continue to work without any changes.

### 1.2 Sending data to a specific Hosted Collector source URL

:::note
This applies only if you need to continue sending specific data to a Hosted Collector HTTP or OTLP source URL. If you are not using custom source URLs or custom exporters through `config.merge` or `config.override`, skip this section.
:::

When sourceless mode is enabled, all Sumo Logic exporters that do **not** have an explicit `endpoint` configured will route data through the sourceless path. Custom exporters with an explicit `endpoint` defined via `config.merge` or `config.override` continue to send data to that source URL.

This allows incremental migration keeping specific custom pipelines pointing at a source URL while others move to sourceless:

```yaml
sumologic:
  sourcelessMode: true

metadata:
  logs:
    config:
      merge:
        exporters:
          sumologic/custom-logs: # This is a custom exporter which sends data to below mentioned hosted collector http source
            endpoint: "https://<your-endpoint>.collection.sumologic.com/receiver/v1/http/<token>"
            timeout: 30s
          sumologic/default: # This is a custom exporter without an explicit endpoint defined, so this will send data to your account directly without any sources.
            timeout: 30s
```

Only exporters without an `endpoint` will use the sourceless path. Any exporter with an explicit endpoint continues to send data to the specified source. To move these custom exporters to sourcless ingestion mode, you can remove endpoint parameter in the exporter configuration.

### 1.3 Hosted Collector cleanup

The Hosted Collector and its default sources are **not deleted automatically** when you enable sourceless mode. They remain in your account until you explicitly request cleanup.

Before enabling cleanup, check whether you have added any **custom sources** to the Hosted Collector beyond the defaults created by the Helm chart. The Hosted Collector for your cluster is identified by `sumologic.clusterName` or `sumologic.collectorName` in **Sumo Logic UI → Manage Data → Collection**.

**If you have no custom sources:** You can enable the cleanup flag:

```yaml
sumologic:
  sourcelessMode: true
  cleanupHostedCollector: true
```

:::warning
Enabling `cleanupHostedCollector` permanently deletes the Hosted Collector and **all sources** attached to it. This cannot be undone.
:::

**If you have custom sources:** Do **not** enable `cleanupHostedCollector` until you have migrated all custom sources to an alternative ingestion path.

### 1.4 Source type restriction

:::note
This applies only to deployments using `sourceType: http` for logs, metrics, or events.
:::

`sourcelessMode: true` is incompatible with `sourceType: http`. The Helm chart will fail validation if both are set. You must either:
- Switch to `sourceType: otlp` (recommended), or
- Use `config.merge` to define an explicit endpoint for pipelines that must continue using an HTTP source URL (see [section 2](#2-sending-data-to-a-specific-hosted-collector-source-url) above).

### 1.5 Collector pods now visible under OpenTelemetry Collection

Once sourceless mode is enabled, all collection pods that send data to Sumo Logic will register as OpenTelemetry collectors and appear in **Manage Data → Collection → OpenTelemetry Collection**.

To view pods registered for a specific cluster:
1. Navigate to **Manage Data → Collection → OpenTelemetry Collection**.
2. In the **Filters** panel, add the tag: `cluster=<your-cluster-name>`
3. All collector pods for that cluster are listed with their registration status and last active time.

This pod visibility was not available in the classic Hosted Collector model.


## 2. Metrics Pipeline Unification

The Kubernetes metrics collection pipeline is moving from a **2-layer architecture** (collector StatefulSet + metadata StatefulSet) to a
**single-layer architecture** (collector only).

In the 2-layer pipeline:

- **Layer 1 (Collector)** scrapes metrics via the Prometheus receiver, applies light processing, and forwards via OTLP to Layer 2.
- **Layer 2 (Metadata)** enriches metrics with Kubernetes metadata (k8sattributes, source, sumologic processors), applies routing, batching,
  and exports to Sumo Logic.

In the single-layer pipeline, the collector handles all of this in a single pod using two logical pipelines connected by a `forward` connector. The metadata StatefulSet, HPA, Services, and PDB are no longer rendered.

:::note
`sumologic.metrics.collector.otelcol.singleLayerPipeline.migrationDocAcknowledged` must be set to `true` regardless of whether you enable or disable the single-layer pipeline. The upgrade is blocked until this flag is set. If you are not using any additional `metadata.metrics.*` configuration overrides, you can set this flag and proceed with the installation.
:::

### Benefits

- Fewer pods (metadata replicas eliminated), reducing resource consumption.
- Lower end-to-end latency (no internal OTLP hop).
- Simpler configuration (single pipeline to reason about).

### What Changes

When `sumologic.metrics.collector.otelcol.singleLayerPipeline.enabled` is set to `true`:

1. The **metadata metrics StatefulSet, HPA, Services, and PDB are not rendered**.
2. The **collector config** includes all enrichment processors (`k8sattributes`, `source`, `sumologic`, etc.) and Sumo Logic exporters.
3. **`SUMO_ENDPOINT_*`** env vars are injected into the collector pod.
4. Both `sumologic.metrics.collector.otelcol.config.merge` and `metadata.metrics.config.merge` are applied to the collector config, preserving existing customizations.
5. The **collector pipeline is renamed** from `metrics` to `metrics/collector`. The enrichment pipeline keeps the name `metrics` (matching the 2-layer metadata pipeline name).

For detailed migration steps including resource sizing, configuration key migration, pipeline rename examples, and rollback instructions, see [How to Upgrade](./how-to-upgrade.md#metrics-pipeline-unification-1).
