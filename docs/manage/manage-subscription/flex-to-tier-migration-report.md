---
id: flex-to-tier-migration-report
title: Flex to Tier Migration Report
sidebar_label: Flex to Tier Migration Report
description: Learn how to use the Flex to Tier Migration Report to assess partition readiness, understand column definitions, and act on migration recommendations.
keywords:
  - flex
  - tier migration
  - partition
  - tiered storage
  - migration report
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Flex to Tier Migration Report shows your partitions and their readiness for migration to Tiered storage. It includes current recommendation messages and the status of any unsupported features that may be affected by migration.

## Column definitions

| Column | Description |
|:--|:--|
| **Partition Name** | Name of the partition. |
| **Ingestion Volume** | Total ingestion volume associated with the partition. |
| **Current Scope** | Indicates whether the partition is currently included or excluded from the migration scope. |
| **SIEM Forwarding** | Indicates whether SIEM forwarding is enabled for the partition (`true` / `false`). |
| **Unsupported Features Detected When Moving Towards Tiered** | Displays whether any unsupported dependencies are detected for the partition after migration to Tiered storage. For example, `true [monitor, slo]`. |
| **Unsupported Monitor** | Lists monitor names currently using the partition that may not function after migration. |
| **Unsupported SLO** | Lists SLO names associated with the partition that may become unsupported after migration. |
| **Unsupported Scheduled Views** | Lists scheduled view names dependent on the partition that may not work after migration. |
| **Recommendation** | Provides the recommended action based on dependency analysis and migration readiness. |

## Recommendation messages

The **Recommendation** column displays one of the following messages based on the partition's scope, unsupported feature status, and SIEM forwarding configuration.

| Is Included | Unsupported Features Detected | SIEM Forwarding | Recommendation |
|:--|:--|:--|:--|
| `true` | `false` | Any | No action needed — No feature conflicts detected. Excluding this partition can reduce scan cost. |
| `false` | `false` | `false` | No action needed — No feature conflicts detected. |
| `false` | `false` | `true` | Switch to Included — SIEM Forwarding will not work correctly on an excluded partition. |
| `false` | `true` | Any | Switch to Included — Monitors/SLOs/Scheduled Views will not work correctly on an excluded partition. |
