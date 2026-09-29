---
id: important-changes
title: Important Changes in v6
sidebar_label: Important Changes
description: Details of the breaking changes introduced in Helm chart v6 — Sourceless Mode and Metrics Pipeline Unification.
---

Helm chart v6 enables two significant architectural changes by default. Both require you to set an acknowledgment flag before upgrading. This page describes what each change does and what you need to be aware of.

## Sourceless Mode {#sourceless-mode}

**Default:** Enabled (`sumologic.sourcelessMode: true`)
**Ack flag required:** `sumologic.sourcelessModeAck: true`

Sourceless Mode removes the Hosted Collector and all HTTP sources from your Sumo Logic organization and switches collection to installation-token authentication via the OpenTelemetry Sumo Logic extension. This is a permanent, destructive change to your Sumo Logic organization resources.

### What Is Removed

- The Hosted Collector created and managed by the chart (`sumologic.collectorName`)
- All HTTP sources created by the chart (logs, metrics, traces, events)

### What Changes

**Authentication**: Collection no longer uses HTTP source URLs. The OTel collector authenticates directly using your installation token via the `sumologicextension`.

**Metadata fields**: `_sourceCategory`, `_sourceName`, and `_sourceHost` are now set as OTel resource attributes by the collector configuration rather than being derived from HTTP source settings. Existing saved searches, dashboards, and monitors that filter on these fields may need to be updated if the values change.

**`_sourceType`**: The `_sourceType` field is restricted to `OTC` for all data sent in sourceless mode. Custom `_sourceType` overrides are not supported.

**Cleanup job**: When `sumologic.cleanupHostedCollector: true` (set automatically when sourceless mode is enabled), a Kubernetes Job runs on `helm uninstall` to delete the Hosted Collector from your Sumo Logic organization.

**OTel collector visibility**: In sourceless mode, the OTel collector appears as a registered collector in the Sumo Logic UI under **Manage Data > Collection**, which was not the case in v5.

### Impact on Existing Data

- Historical data ingested through HTTP sources remains in Sumo Logic and is queryable.
- New data will be associated with the installation token rather than an HTTP source.
- If you have dashboards or saved searches that filter on specific `_sourceCategory` or HTTP source names, review them after upgrading.

### Deferring This Change

To continue using HTTP source authentication (v5 behavior), set:

```yaml
sumologic:
  sourcelessMode: false
  sourcelessModeAck: true  # required even when deferring
```

---

## Metrics Pipeline Unification {#metrics-pipeline-unification}

**Default:** Enabled (`singleLayerPipeline.enabled: true`)
**Ack flag required:** `singleLayerPipeline.migrationDocAcknowledged: true`

In v5, the metrics pipeline used two layers: an OTel collector for scraping and a metadata StatefulSet for enrichment. In v6, both layers are merged into a single OTel collector pipeline, eliminating the intermediate StatefulSet.

### What Is Removed

- The `sumologic-metadata-metrics` StatefulSet and its associated Service.
- The two-hop metrics forwarding path (scraper → metadata StatefulSet → Sumo Logic).

### What Changes

**Resource sizing**: With a single collector handling both scraping and enrichment, memory and CPU requests/limits are recalculated. The single-layer collector is sized as:
- CPU: `scraper_cpu + enrichment_cpu`
- Memory: `max(scraper_memory, enrichment_memory) * 1.5`

**Configuration key changes**: Some configuration keys have moved from the v5 two-layer structure to the v6 single-layer structure:

| v5 Key | v6 Key |
|--------|--------|
| `fluentd.metrics.enabled` | `singleLayerPipeline.fluentd.enabled` |
| `otelcol.metrics.statefulset.*` | `singleLayerPipeline.otelcol.*` |
| `otelcol.metrics.autoscaling.*` | `singleLayerPipeline.autoscaling.*` |
| `otelcol.metrics.scraper.*` | `otelcol.metrics.*` (unchanged) |

**Pipeline rename**: The internal pipeline name changes from `metrics/metadata` to `metrics/default`. This affects any custom OTel configuration that references the pipeline by name.

**Prometheus remote write**: If you have external systems (e.g., kube-prometheus-stack) configured to remote-write metrics to the metadata StatefulSet Service URL, update those URLs to point to the new single-layer collector Service.

### Deferring This Change

To keep the two-layer pipeline (v5 behavior), set:

```yaml
singleLayerPipeline:
  enabled: false
  migrationDocAcknowledged: true  # required even when deferring
```
