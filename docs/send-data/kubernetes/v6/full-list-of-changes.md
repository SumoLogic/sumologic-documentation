---
id: full-list-of-changes
title: Full List of Changes in v6
sidebar_label: Full List of Changes
description: Complete list of all changes introduced in Helm chart v6.
---

This page lists all changes introduced in Helm chart v6. For upgrade instructions, see [How to Upgrade](./how-to-upgrade.md). For detailed descriptions of the two major features, see [Important Changes](./important-changes.md).

## Sourceless Mode

Both of the following flags are required to proceed with an upgrade when using the default v6 configuration:

- `sumologic.sourcelessMode` — defaults to `true` in v6 (was `false` in v5)
- `sumologic.sourcelessModeAck` — new flag; must be set to `true` to acknowledge the change

**Changes when `sourcelessMode: true`:**

- Hosted Collector is deleted from Sumo Logic organization on upgrade
- All chart-managed HTTP sources (logs, metrics, traces, events) are deleted
- Collection authenticates via installation token using `sumologicextension` instead of HTTP source URLs
- `_sourceCategory`, `_sourceName`, `_sourceHost` are set as OTel resource attributes (not HTTP source config)
- `_sourceType` is restricted to `OTC`; custom overrides are not supported
- OTel collector appears as a registered collector in the Sumo Logic UI
- `sumologic.cleanupHostedCollector` is automatically set to `true` (cleanup Job runs on uninstall)

## Metrics Pipeline Unification

Both of the following flags are required to proceed with an upgrade when using the default v6 configuration:

- `singleLayerPipeline.enabled` — defaults to `true` in v6 (was `false` in v5)
- `singleLayerPipeline.migrationDocAcknowledged` — must be set to `true` to acknowledge the change

**Changes when `singleLayerPipeline.enabled: true`:**

- `sumologic-metadata-metrics` StatefulSet and its Service are removed
- Metrics scraping and metadata enrichment are merged into a single OTel collector pipeline
- Collector resource requests/limits are recalculated: `cpu = scraper + enrichment`, `memory = max(scraper, enrichment) * 1.5`
- Configuration keys moved: `fluentd.metrics.*` → `singleLayerPipeline.fluentd.*`; `otelcol.metrics.statefulset.*` → `singleLayerPipeline.otelcol.*`
- Internal pipeline renamed from `metrics/metadata` to `metrics/default`
- Prometheus remote write URLs for the metadata StatefulSet Service must be updated to point to the new single-layer collector Service
