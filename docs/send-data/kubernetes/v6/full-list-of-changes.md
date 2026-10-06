---
id: full-list-of-changes
title: Kubernetes Collection v6.0.0 - Full List of Changes
sidebar_label: Full list of Changes
description: This page describes the complete list of changes in Kubernetes Collection v6.
---

## Sourceless Mode (enabled by default)

- `sumologic.sourcelessMode` defaults to `true` in v6 (was `false` in v5)
- New flag `sumologic.sourcelessModeAck`: must be set to `true` to confirm you have read the migration guide; upgrade is blocked until this is set
- `_source` metadata field is no longer populated; `_collector` is preserved. So, `_source` cannot be used in search queries.
- All Sumo Logic exporters without an explicit `endpoint` upload data using the installation token through the sourceless path.
- Custom exporters with an explicit `endpoint` in `config.merge` continue to use their configured source URL, enabling incremental migration
- Hosted Collector and its default sources are **not** deleted automatically on upgrade; use `sumologic.cleanupHostedCollector: true` to clean up (permanent and irreversible; verify no custom sources exist first)
- `sourceType: http` is incompatible with `sourcelessMode: true`; switch to `sourceType: otlp` or use an explicit endpoint via `config.merge`
- Collection pods register as OpenTelemetry collectors and appear in **Manage Data → Collection → OpenTelemetry Collection**; filter by `cluster=<your-cluster-name>` to view pods for a specific cluster
- GitOps / ArgoCD users with `setupEnabled: false` must supply `sumologic.installationToken` manually (token is not created automatically when Terraform/setup job is disabled)

## Metrics Pipeline Unification (enabled by default)

- `sumologic.metrics.collector.otelcol.singleLayerPipeline.enabled` defaults to `true` in v6 (was `false` in v5)
- New flag `sumologic.metrics.collector.otelcol.singleLayerPipeline.migrationDocAcknowledged`: must be set to `true` regardless of whether the single-layer pipeline is enabled or disabled; upgrade is blocked until this is set. See [How to Upgrade](./how-to-upgrade.md#metrics-pipeline-unification) for detailed migration steps.
- `sumologic-metadata-metrics` StatefulSet, HPA, Services, and PDB are removed
- Metrics scraping and metadata enrichment are merged into a single OTel collector pod using two logical pipelines connected by a `forward` connector
- Collector resource sizing: `memory = collector memory limit + metadata memory limit` (apply 1.5x safety multiplier), `cpu = collector CPU limit + (total metadata CPU usage / number of collector replicas)`. With single-layer metrics pipeline, the default metrics collector resources are increased to CPU `768m` and memory `768Mi`. If your environment requires more resources, you can reconfigure them using `sumologic.metrics.collector.otelcol.resources`.
- Configuration keys under `metadata.metrics.statefulset.*` and `metadata.metrics.autoscaling.*` must be migrated to their `sumologic.metrics.collector.otelcol.*` equivalents (see [How to Upgrade](./how-to-upgrade.md#customer-action-required) for the full mapping table)
- `metadata.metrics.config.override` is incompatible with single-layer pipeline; use `metadata.metrics.config.merge` instead
- Collector pipeline renamed from `metrics` to `metrics/collector`; the enrichment pipeline keeps the name `metrics`. Update any `sumologic.metrics.collector.otelcol.config.merge` that targets the scraping pipeline to use `metrics/collector`
- `metadata.metrics.config.merge` targeting `service.pipelines.metrics` continues to work unchanged
- Prometheus remote write URL hostname changes from `<release>-sumologic-metadata-metrics` to `<release>-sumologic-metrics-collector` (same port 9888, same path)
- PVCs from the previous pipeline mode are not automatically deleted when switching between modes and must be manually cleaned up
- To disable single-layer and restore the 2-layer pipeline, set `singleLayerPipeline.enabled: false` and run `helm upgrade`
