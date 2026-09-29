---
id: important-changes
title: Kubernetes Collection v6.0.0 - Important Changes
sidebar_label: Important Changes
description: This page describes the major changes and the necessary migration steps.
---

We're introducing two major changes to the Sumo Logic Kubernetes Collection solution in v6.

This page describes each change and its impact on your existing setup. Both below listed features are **enabled by default** in v6. You can read the changes and disable if required. You also need set the corresponding acknowledgment flag before the upgrade can proceed.

## 1. Sourceless Mode for data upload

Till helm chart v5, Sumologic kubernetes collection used hosted collector source url to upload data, this new Sourceless mode removes the dependency on Hosted Collector which is listed under Data Collection page with the name `values.sumologic.collectorName` or `values.sumologic.clusterName` and HTTP/OTLP sources created under the Hosted collector for data ingestion. Instead, collection pods authenticate and register directly with Sumo Logic using an installation token via the Sumo Logic OpenTelemetry extension. 

Below are the key changes and their impact on your existing setup. You can read these impacts and disable the sourceless mode if required, but most of the cases, it's adviced to proceed with enabling sourceless mode.

### 1.1 `_source` metadata no longer available

In the classic collection model, each data pipeline sends data to a dedicated HTTP or OTLP source, which automatically populates the `_source` metadata field on ingested data. In sourceless mode, there are no sources — data is sent directly to Sumo Logic, so `_source` is no longer populated and cannot be used in search queries.

**Impact:**
- Any saved searches, dashboards, or monitors that filter or group by `_source` will return no results or incorrect results after migration.
- You must audit and update these before or after enabling sourceless mode.

`_collector` **is preserved.** The source processor in the OTel pipeline still populates `_collector` with the value of `sumologic.collectorName` (defaults to `sumologic.clusterName`). Queries that use `_collector` to identify your cluster continue to work without any changes.

### 1.2 Sending data to a specific Hosted Collector source URL

:::note
This applies only if you need to continue sending specific data to a Hosted Collector HTTP or OTLP source URL. If you are not using custom source URLs or custom exporters via `config.merge` or `config.merge`, skip this section.
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
          sumologic/custom-logs:
            endpoint: "https://<your-endpoint>.collection.sumologic.com/receiver/v1/http/<token>"
```

Only exporters without an `endpoint` will use the sourceless path. Any exporter with an explicit endpoint continues to send data to the specified source.

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

In the single-layer pipeline, the collector handles all of this in a single metrics collector layer itself.

### What Is Removed

- The `sumologic-metadata-metrics` StatefulSet and its associated Service.
- The two-hop metrics forwarding path (scraper → metadata StatefulSet → Sumo Logic).

### What Changes

**Resource sizing**: With a single collector handling both scraping and enrichment, resources are recalculated as:
- CPU: `scraper_cpu + enrichment_cpu`
- Memory: `max(scraper_memory, enrichment_memory) * 1.5`

**Configuration key changes**: Some keys have moved from the v5 two-layer structure:

| v5 Key | v6 Key |
|--------|--------|
| `fluentd.metrics.enabled` | `singleLayerPipeline.fluentd.enabled` |
| `otelcol.metrics.statefulset.*` | `singleLayerPipeline.otelcol.*` |
| `otelcol.metrics.autoscaling.*` | `singleLayerPipeline.autoscaling.*` |
| `otelcol.metrics.scraper.*` | `otelcol.metrics.*` (unchanged) |

**Pipeline rename**: The internal pipeline name changes from `metrics/metadata` to `metrics/default`. This affects any custom OTel configuration that references the pipeline by name.

**Prometheus remote write**: If you have external systems (e.g., kube-prometheus-stack) configured to remote-write metrics to the metadata StatefulSet Service URL, update those URLs to point to the new single-layer collector Service.
