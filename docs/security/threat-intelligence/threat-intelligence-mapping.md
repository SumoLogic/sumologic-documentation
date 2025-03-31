---
slug: /security/threat-intelligence/threat-intelligence-mapping
title: Threat Intelligence Mapping
sidebar_label: Threat Intelligence Mapping 
description: Learn about mapping of threat intelligence indicators to Sumo Logic.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This article provides guidance on mapping behavior from the legacy **_sumo_global_feed_cs** source supplied by [CrowdStrike](https://www.crowdstrike.com/en-us/) to the **SumoLogic_ThreatIntel** source supplied by [Intel 471](https://intel471.com/).

:::warning
*The **_sumo_global_feed_cs** source will be discontinued on April 30, 2025*. For more information, see [Sumo Logic Threat Intelligence Sources](/docs/security/threat-intelligence/about-threat-intelligence/#sumo-logic-threat-intelligence-sources).
:::

## Field mapping

It may not be possible to translate CrowdStrike-specific fields to Intel 471-specific fields, because they capture and prioritize different aspects of indicators of compromise.  As a starting point, however, below is approximate mapping of CrowdStrike fields to Intel 471 fields:

| CrowdStrike | Intel 471 | Translation notes |
| :-- | :-- | :-- |
| `indicator` | `data.indicator_data.*` <br/><br/>For example:<br/>`data.indicator_data.address`<br/>`data.indicator_data.file.md5`<br/>`data.indicator_data.file.sha1`<br/>`data.indicator_data.file.sha256`<br/>`data.indicator_data.url` | Depends on the type. Every Intel 471 file hash record includes all hash types. <br/><br/>Intel 471 also includes geoip data for IP addresses under `data.indicator_data.geo_ip`.<br/><br/>Intel 471 has no domain or email indicators, instead prioritizing IP addresses, URLs, and file hashes. |
| `kill_chains` | `data.mitre_tactics` |
| `labels[*].name` | `data.threat.type`<br/>`data.threat.data.family`<br/>`data.context.description`<br/>`data.mitre_tactics` | CrowdStrike's labels are redundant with other sections in the CrowdStrike record. |
| `last_updated` | `last_updated` | CrowdStrike's timestamps are in epoch seconds whereas Intel 471's are in milliseconds. |
| `malicious_confidence` | `data.confidence` | |
| `malware_families` | `data.threat.data.family` | |
| `threat_types` | `data.threat.type` | |
| `type` | `data.indicator_type` | |
| (none) | `data.expiration` | Intel 471 only. In milliseconds. |