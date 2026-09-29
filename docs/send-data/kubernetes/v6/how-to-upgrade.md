---
id: how-to-upgrade
title: Upgrading to Helm Chart v6
sidebar_label: How to Upgrade
description: Step-by-step instructions for upgrading the Sumo Logic Kubernetes collection Helm chart from v5 to v6.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This page walks you through upgrading the Sumo Logic Kubernetes collection Helm chart from v5 to v6. Helm chart v6 introduces two major changes that are **enabled by default**: [Sourceless Mode](#sourceless-mode-migration) and [Metrics Pipeline Unification](#metrics-pipeline-unification). Both changes require you to review the relevant documentation and set acknowledgment flags before the upgrade can proceed.

:::warning
Helm chart v6 is a breaking change. Both Sourceless Mode and the unified single-layer metrics pipeline are enabled by default. Read this guide completely before running `helm upgrade`.
:::

## Before You Begin

- Ensure you are running Helm chart v5. If you are on an earlier version, upgrade to v5 first.
- Review [Important Changes in v6](./important-changes.md) before proceeding.
- Backup your existing `values.yaml` overrides.

## Upgrade Steps

### 1. Review Both Feature Changes

Before upgrading, read the documentation for both features that are enabled by default in v6:

- **Sourceless Mode** — Removes the Hosted Collector and all HTTP sources, migrating to installation-token authentication via the OpenTelemetry extension. See [Important Changes > Sourceless Mode](./important-changes.md#sourceless-mode).
- **Metrics Pipeline Unification** — Eliminates the metadata StatefulSet and merges metadata enrichment into the collector. See [Important Changes > Metrics Pipeline Unification](./important-changes.md#metrics-pipeline-unification).

### 2. Set Acknowledgment Flags

After reviewing the documentation, set both acknowledgment flags in your `values.yaml` to unblock the upgrade:

```yaml
sumologic:
  sourcelessMode: true           # enabled by default in v6
  sourcelessModeAck: true        # required — confirms you have read the migration guide

singleLayerPipeline:
  enabled: true                  # enabled by default in v6
  migrationDocAcknowledged: true # required — confirms you have read the migration guide
```

If you are not ready to migrate either feature, you can defer it by disabling it **and** setting its ack flag:

```yaml
# To defer Sourceless Mode:
sumologic:
  sourcelessMode: false
  sourcelessModeAck: true    # still required to acknowledge the change

# To defer Metrics Pipeline Unification:
singleLayerPipeline:
  enabled: false
  migrationDocAcknowledged: true  # still required to acknowledge the change
```

### 3. Run the Upgrade

```bash
helm upgrade <RELEASE_NAME> sumologic/sumologic \
  --version <v6_VERSION> \
  -f your-values.yaml
```

Replace `<RELEASE_NAME>` with your Helm release name and `<v6_VERSION>` with the target v6 chart version.

## Sourceless Mode Migration

When `sumologic.sourcelessMode: true` (the default in v6), the Hosted Collector and all associated HTTP sources are removed from your Sumo Logic organization and collection switches to installation-token authentication.

**What changes:**

- The Hosted Collector configured by the chart is deleted along with all its HTTP sources.
- Logs, metrics, and traces are sent directly from the OpenTelemetry Collector using an installation token, without an intermediate HTTP source.
- The `_sourceCategory`, `_sourceName`, and `_sourceHost` metadata fields are set by the OTel collector rather than derived from HTTP source configuration.

**Options:**

| Option | `sourcelessMode` | `sourcelessModeAck` |
|--------|-----------------|---------------------|
| Migrate now (default) | `true` | `true` |
| Defer migration | `false` | `true` |

:::note
Even if you set `sourcelessMode: false` to defer, you must still set `sourcelessModeAck: true` to confirm you have reviewed this change.
:::

## Metrics Pipeline Unification

When `singleLayerPipeline.enabled: true` (the default in v6), the separate metadata StatefulSet is removed and its enrichment logic is merged into the OpenTelemetry Collector.

**What changes:**

- The `sumologic-metadata-metrics` StatefulSet is removed.
- Metrics scraping and metadata enrichment now occur in the same collector pipeline.
- Some configuration keys under `fluentd.metrics` and `otelcol.metrics` have moved — see [Important Changes > Metrics Pipeline Unification](./important-changes.md#metrics-pipeline-unification) for the full mapping.
- Prometheus remote write URLs pointing to the metadata StatefulSet must be updated.

**Options:**

| Option | `singleLayerPipeline.enabled` | `singleLayerPipeline.migrationDocAcknowledged` |
|--------|-------------------------------|------------------------------------------------|
| Migrate now (default) | `true` | `true` |
| Defer migration | `false` | `true` |

:::note
Even if you set `singleLayerPipeline.enabled: false` to defer, you must still set `singleLayerPipeline.migrationDocAcknowledged: true` to confirm you have reviewed this change.
:::

## Rollback

If you need to roll back to v5 after upgrading:

```bash
helm rollback <RELEASE_NAME> <REVISION>
```

Use `helm history <RELEASE_NAME>` to find the previous revision number. Note that rolling back does not restore deleted Sumo Logic hosted collector resources — those must be recreated manually if Sourceless Mode was applied.
