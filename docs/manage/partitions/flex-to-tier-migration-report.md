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

The Flex to Tier Migration Report shows your partitions and their readiness for migration from a flex licensing model for log ingestion to a tiered licensing model for log ingestion. It includes recommendation messages and the status of any unsupported features that may be affected by migration.

## Column definitions

| Column | Description |
|:--|:--|
| **Partition Name** | Name of the partition. |
| **Ingestion Volume** | Total ingestion volume associated with the partition. |
| **Current Scope** | Indicates whether the partition is currently included or excluded from the migration scope. |
| **SIEM Forwarding** | Indicates whether SIEM forwarding is enabled for the partition (`true` / `false`). |
| **Unsupported Features Detected When Moving Towards Tiered** | Displays any unsupported dependencies detected for the partition after migration to Tiered storage. For example, `true [monitor, slo]`. |
| **Unsupported Monitor** | Lists monitor names currently using the partition that may not function after migration. |
| **Unsupported SLO** | Lists SLO names associated with the partition that may become unsupported after migration. |
| **Unsupported Scheduled Views** | Lists scheduled view names dependent on the partition that may not work after migration. |
| **Recommendation** | Provides the recommended action based on dependency analysis and migration readiness. |

## Recommendation messages

The **Recommendation** column displays one of the following messages based on the partition's scope, unsupported feature status, and SIEM forwarding configuration.

| Is Included | Unsupported Features Detected | SIEM Forwarding | Recommendation |
|:--|:--|:--|:--|
| `true` | `false` | Any | No action needed. |
| `false` | `false` | `false` | No action needed. |
| `false` | `false` | `true` | Switch to Included (Continuous). SIEM Forwarding will not work correctly on an excluded partition. |
| `false` | `true` | Any | Switch to Included (Continuous). Monitors/SLOs/Scheduled Views will not work correctly on an excluded partition. |

## FAQ

### What is the Flex to Tier Migration Report?

The Flex to Tier Migration Report is a tool that shows each partition in your organization and whether it is ready to migrate from Flex to Tiered storage. It evaluates each partition against a set of dependency checks, including monitors, SLOs, scheduled views, and SIEM forwarding, and provides a recommended action for each.

### What does the Is Included column mean?

The **Is Included** column indicates whether a partition is part of the [default scope](/docs/manage/partitions/flex/faq/#how-can-i-optimize-my-query-using-default-scope). A value of `true` means the partition is included in the default scope; `false` means it is excluded. Excluded partitions may need to be switched to **Included** if they have active SIEM forwarding or unsupported feature dependencies.

### What happens to monitors and SLOs after migration to Tiered storage?

Monitors and SLOs that rely on a partition excluded from Tiered storage may stop functioning correctly after migration. The report lists the affected monitor and SLO names in the **Unsupported Monitor** and **Unsupported SLO** columns so you can take action before migration.

### What should you do if my partition has SIEM Forwarding enabled?

If SIEM Forwarding is enabled and the partition is currently excluded from the migration scope, the recommendation is to switch it to Included (Continuous). SIEM Forwarding does not work correctly on excluded partitions, and leaving it excluded can result in data not being forwarded after migration.
