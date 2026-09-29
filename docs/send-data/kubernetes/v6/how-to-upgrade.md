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

**Option 1: Migrate to single-layer pipeline (default)**

```yaml
singleLayerPipeline:
  enabled: true
  migrationDocAcknowledged: true
```

**Option 2: Defer metrics pipeline unification**

```yaml
singleLayerPipeline:
  enabled: false
  migrationDocAcknowledged: true
```

## Step 3: Run the Upgrade

```bash
helm upgrade ${HELM_RELEASE_NAME} sumologic/sumologic \
  -n ${NAMESPACE} \
  -f values.yaml
```
