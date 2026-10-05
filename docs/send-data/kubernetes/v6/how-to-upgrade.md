---
id: how-to-upgrade
title: Kubernetes Collection v6.0.0 - How to Upgrade
sidebar_label: How to Upgrade
description: This page describes how to upgrade the Kubernetes Collection to v6.
---

This guide walks you through upgrading to Sumo Logic Kubernetes Collection v6.0.0. Here's what's new:
* Sourceless mode is now enabled by default — the Hosted Collector and HTTP sources are replaced by direct installation-token authentication via the OpenTelemetry extension.
* Metrics Pipeline Unification is now enabled by default — the separate metadata StatefulSet is merged into a single OTel collector pipeline.

Both changes are breaking and require you to review the [Important Changes](./important-changes.md) page and set acknowledgment flags before the upgrade proceeds.

## Requirements

- `helm` v3
- `kubectl`
- Set the following environment variables, which our commands will use:
   ```bash
   export NAMESPACE=...
   export HELM_RELEASE_NAME=...
   ```

## Step 1: Review Important Changes

Before upgrading, read [Important Changes in v6](./important-changes.md) in full. Pay particular attention to:
- [Sourceless Mode](./important-changes.md#sourceless-mode) — impact on `_source` metadata, Hosted Collector cleanup, and `sourceType` restrictions.
- [Metrics Pipeline Unification](./important-changes.md#metrics-pipeline-unification) — removed StatefulSet, configuration key changes, and Prometheus remote write URL changes.

## Step 2: Set Acknowledgment Flags

After reviewing, update your `values.yaml` with both acknowledgment flags and your chosen migration option for each feature.

### Sourceless Mode

**Option 1: Migrate to sourceless mode (default)**

```yaml
sumologic:
  sourcelessMode: true
  sourcelessModeAck: true
```

**Option 1a: Migrate and clean up the Hosted Collector**

Choose this only if you have confirmed there are **no custom sources** on your Hosted Collector beyond those created by the Helm chart. 

```yaml
sumologic:
  sourcelessMode: true
  sourcelessModeAck: true
  cleanupHostedCollector: true
```

:::warning
`cleanupHostedCollector: true` permanently deletes the Hosted Collector and **all sources** attached to it. This cannot be undone.
:::

**Option 2: Disable sourceless mode and continue using old Hosted collector flow**

```yaml
sumologic:
  sourcelessMode: false
  sourcelessModeAck: true
```

:::note
**GitOps / ArgoCD users:** If `setupEnabled: false`, Terraform does not run and the installation token is not created automatically. Create a token in **Manage Data → Collection → Installation Tokens**, then supply it explicitly:
```yaml
sumologic:
  sourcelessMode: true
  sourcelessModeAck: true
  installationToken: "<your-installation-token>"
```
:::

### Metrics Pipeline Unification

:::note
If you are not using any additional `metadata.metrics.*` configuration overrides, you can set `sumologic.metrics.collector.otelcol.singleLayerPipeline.migrationDocAcknowledged: true` in your values file and skip to [Step 3](#step-3-run-the-upgrade).
:::

:::note
If it is not possible to migrate your metrics pipeline to single-layer at this time, you can disable it and continue using the existing 2-layer pipeline. See [Rollback](#rollback) for instructions.
:::

**Option 1: Migrate to single-layer pipeline (default)**

```yaml
sumologic:
  metrics:
    collector:
      otelcol:
        singleLayerPipeline:
          enabled: true
          migrationDocAcknowledged: true
```

**Option 2: Defer metrics pipeline unification**

```yaml
sumologic:
  metrics:
    collector:
      otelcol:
        singleLayerPipeline:
          enabled: false
          migrationDocAcknowledged: true
```

If you chose Option 1, continue with the migration steps below before running the upgrade.

#### Resource Sizing

In single-layer mode, the collector handles both scraping and enrichment/export. You must increase collector resources.

**Formula:**

```
Single-layer memory limit = current collector memory limit + current metadata memory limit
Single-layer CPU limit    = current collector CPU limit + (total metadata CPU usage / number of collector replicas)
```

Apply a **1.5x safety multiplier** on memory to account for `k8sattributes` cache growth, queue buildup during backend slowdowns, and uneven target distribution.

**Key principles:**

- **Prefer higher limits over tighter limits.** An OOMKilled collector drops all in-flight metrics. Over-provisioning wastes some reserved memory but prevents production data loss.
- **CPU can be burstable.** CPU throttling slows processing but doesn't kill the pod. Setting CPU request lower than limit (for example, request=2, limit=6) is acceptable.
- **Use HPA with memory target at 60–70%.** This gives headroom for spikes.
- **Monitor `container_memory_working_set_bytes`** after enabling single-layer. If any pod sustains >80% of its memory limit, increase the limit.

#### Configuration Migration

##### Automatic (No Action Needed)

These keys are consumed directly in the single-layer collector config template:

| Key | Description |
|-----|-------------|
| `metadata.metrics.logLevel` | OTel Collector log verbosity |
| `metadata.metrics.metricsLevel` | Internal metrics verbosity |
| `metadata.metrics.useSumoK8sProcessor` | `k8s_tagger` vs `k8sattributes` processor selection |
| `metadata.metrics.waitForMetadata` | Wait for K8s API cache before processing |
| `metadata.metrics.waitForMetadataTimeout` | Timeout for the above |
| `metadata.metrics.extractPodLabels` | Extract pod labels as resource attributes |
| `metadata.metrics.extractNodeLabels` | Extract node labels as resource attributes |
| `metadata.metrics.config.merge` | Deep-merged into the single-layer collector config |

##### Customer Action Required

These keys configure the metadata StatefulSet's scheduling, resources, and scaling. The collector has equivalent keys — you must move your customizations:

| Metadata Key (No Longer Used) | Collector Equivalent |
|-------------------------------|----------------------|
| `metadata.metrics.statefulset.nodeSelector` | `sumologic.metrics.collector.otelcol.nodeSelector` |
| `metadata.metrics.statefulset.tolerations` | `sumologic.metrics.collector.otelcol.tolerations` |
| `metadata.metrics.statefulset.affinity` | `sumologic.metrics.collector.otelcol.affinity` |
| `metadata.metrics.statefulset.replicaCount` | `sumologic.metrics.collector.otelcol.replicaCount` |
| `metadata.metrics.statefulset.resources` | `sumologic.metrics.collector.otelcol.resources` |
| `metadata.metrics.statefulset.priorityClassName` | `sumologic.metrics.collector.otelcol.priorityClassName` |
| `metadata.metrics.statefulset.podLabels` | `sumologic.metrics.collector.otelcol.podLabels` |
| `metadata.metrics.statefulset.podAnnotations` | `sumologic.metrics.collector.otelcol.podAnnotations` |
| `metadata.metrics.statefulset.containers.otelcol.securityContext` | `sumologic.metrics.collector.otelcol.securityContext` |
| `metadata.metrics.statefulset.extraEnvVars` | `sumologic.metrics.collector.otelcol.extraEnvVars` |
| `metadata.metrics.statefulset.extraVolumes` | `sumologic.metrics.collector.otelcol.extraVolumes` |
| `metadata.metrics.statefulset.extraVolumeMounts` | `sumologic.metrics.collector.otelcol.extraVolumeMounts` |
| `metadata.metrics.autoscaling.enabled` | `sumologic.metrics.collector.otelcol.autoscaling.enabled` |
| `metadata.metrics.autoscaling.minReplicas` | `sumologic.metrics.collector.otelcol.autoscaling.minReplicas` |
| `metadata.metrics.autoscaling.maxReplicas` | `sumologic.metrics.collector.otelcol.autoscaling.maxReplicas` |
| `metadata.metrics.autoscaling.targetCPUUtilizationPercentage` | `sumologic.metrics.collector.otelcol.autoscaling.targetCPUUtilizationPercentage` |
| `metadata.metrics.autoscaling.targetMemoryUtilizationPercentage` | `sumologic.metrics.collector.otelcol.autoscaling.targetMemoryUtilizationPercentage` |
| `metadata.metrics.autoscaling.behavior` | `sumologic.metrics.collector.otelcol.autoscaling.behavior` |

##### Incompatible

| Key | Migration |
|-----|-----------|
| `metadata.metrics.config.override` | Cannot be used with single-layer pipeline. Use `metadata.metrics.config.merge` instead, or disable single-layer mode. |

#### Prometheus Remote Write

If you use `metadata.metrics.enableSumoPrometheusRemotewriteReceiver` to push metrics via Prometheus remote write, update the remote write URL hostname from `<release>-sumologic-metadata-metrics` to `<release>-sumologic-metrics-collector` (same port 9888, same path).

#### Pipeline Rename

In single-layer mode (v6 default), the collector uses two logical pipelines connected by a `forward` connector:

```yaml
# Single-layer collector config (v6)
service:
  pipelines:
    metrics/collector:   # scraping + light processing
      receivers: [prometheus]
      processors: [filter/drop_stale_datapoints, ...]
      exporters: [forward]
    metrics:             # enrichment + export
      receivers: [forward]
      processors: [memory_limiter, k8sattributes, source, sumologic, ...]
      exporters: [sumologic/default]
```

This replaces the 2-layer mode (v5), where the collector had a single pipeline named `metrics`:

```yaml
# 2-layer collector config (v5)
service:
  pipelines:
    metrics:
      receivers: [prometheus]
      processors: [filter/drop_stale_datapoints, ...]
      exporters: [otlphttp]
```

The key difference is that the scraping pipeline is now named `metrics/collector` instead of `metrics`. The `metrics` pipeline name is now used by the enrichment pipeline.

**Impact on `config.merge`:**

- **`metadata.metrics.config.merge`** targeting `service.pipelines.metrics` continues to work unchanged — it hits the enrichment pipeline, which has the same name and processor structure as the 2-layer metadata pipeline.
- **`sumologic.metrics.collector.otelcol.config.merge`** targeting `service.pipelines.metrics` now targets the **enrichment** pipeline, not the scraping pipeline. If your collector `config.merge` adds processors or modifies the scraping pipeline, update the pipeline reference from `metrics` to `metrics/collector`.

**Example migration:**

```yaml
# Before (2-layer): adds a processor to the collector's scraping pipeline
sumologic:
  metrics:
    collector:
      otelcol:
        config:
          merge:
            service:
              pipelines:
                metrics:
                  processors:
                    - my_custom_processor
                    - filter/drop_stale_datapoints

# After (single-layer): same processor, but targeting the renamed pipeline
sumologic:
  metrics:
    collector:
      otelcol:
        config:
          merge:
            service:
              pipelines:
                metrics/collector:
                  processors:
                    - my_custom_processor
                    - filter/drop_stale_datapoints
```

## Step 3: Run the Upgrade

Ensure both acknowledgment flags are set to `true` in your `values.yaml` before running the upgrade:

```yaml
sumologic:
  sourcelessModeAck: true
  metrics:
    collector:
      otelcol:
        singleLayerPipeline:
          migrationDocAcknowledged: true
```

Then run:

```bash
helm upgrade ${HELM_RELEASE_NAME} sumologic/sumologic \
  -n ${NAMESPACE} \
  -f values.yaml
```

After upgrading, monitor collector pods for memory pressure using `container_memory_working_set_bytes`.

## Rollback

To restore the 2-layer metrics pipeline, set `singleLayerPipeline.enabled: false` in your values file and run `helm upgrade`. The metadata StatefulSet, HPA, Services, and PDB will be re-created.

**PVC cleanup:** PVCs from the previous pipeline mode are not automatically deleted when switching between modes. After switching:

- **From 2-layer to single-layer:** The metadata StatefulSet PVCs (for example, `file-storage-<release>-sumologic-otelcol-metrics-*`) are orphaned and must be manually deleted.
- **From single-layer to 2-layer:** The single-layer collector PVCs are orphaned and must be manually deleted.
