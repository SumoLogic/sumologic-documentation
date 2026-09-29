---
id: full-list-of-changes
title: Kubernetes Collection v6.0.0 - Full List of Changes
sidebar_label: Full list of Changes
description: This page describes the complete list of changes in Kubernetes Collection v6.
---

## Sourceless Mode (enabled by default)

- `sumologic.sourcelessMode` defaults to `true` in v6 (was `false` in v5)
- New flag `sumologic.sourcelessModeAck` — must be set to `true` to confirm you have read the migration guide; upgrade is blocked until this is set
- `_source` metadata field is no longer populated; `_collector` is preserved. So, `_source` cannot be used in search queries.
- All Sumo Logic exporters without an explicit `endpoint` uplload data using the installation token (sourceless path)
- Custom exporters with an explicit `endpoint` in `config.merge` continue to use their configured source URL, enabling incremental migration
- Hosted Collector and its default sources are **not** deleted automatically on upgrade; use `sumologic.cleanupHostedCollector: true` to clean up (permanent and irreversible — verify no custom sources exist first)
- `sourceType: http` is incompatible with `sourcelessMode: true`; switch to `sourceType: otlp` or use an explicit endpoint via `config.merge`
- Collection pods register as OpenTelemetry collectors and appear in **Manage Data → Collection → OpenTelemetry Collection**; filter by `cluster=<your-cluster-name>` to view pods for a specific cluster
- GitOps / ArgoCD users with `setupEnabled: false` must supply `sumologic.installationToken` manually (token is not created automatically when Terraform/setup job is disabled)

## Metrics Pipeline Unification (enabled by default)

- `singleLayerPipeline.enabled` defaults to `true` in v6 (was `false` in v5)
- New flag `singleLayerPipeline.migrationDocAcknowledged` — must be set to `true` to confirm you have read the migration guide; upgrade is blocked until this is set
- `sumologic-metadata-metrics` StatefulSet and its Service are removed
- Metrics scraping and metadata enrichment are merged into a single OTel collector pipeline
- Collector resource sizing: `cpu = scraper_cpu + enrichment_cpu`, `memory = max(scraper_memory, enrichment_memory) * 1.5`
- Configuration key changes: `fluentd.metrics.*` → `singleLayerPipeline.fluentd.*`; `otelcol.metrics.statefulset.*` → `singleLayerPipeline.otelcol.*`; `otelcol.metrics.autoscaling.*` → `singleLayerPipeline.autoscaling.*`; `otelcol.metrics.scraper.*` remains at `otelcol.metrics.*` (unchanged)
- Internal pipeline renamed from `metrics/metadata` to `metrics/default`; update any custom OTel config that references the pipeline by name
- Prometheus remote write URLs targeting the metadata StatefulSet Service must be updated to point to the new single-layer collector Service
