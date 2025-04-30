---
slug: /security/threat-intelligence/threat-intelligence-vendor-switch
title: Threat Intelligence Vendor Switch
description: Learn about the switch of our threat intelligence vendor from CrowdStrike to Intel 471.
---

<head>
 <meta name="robots" content="noindex" />
</head>

import useBaseUrl from '@docusaurus/useBaseUrl';

This article provides guidance on our switching from the legacy **_sumo_global_feed_cs** source supplied by [CrowdStrike](https://www.crowdstrike.com/en-us/) to the **SumoLogic_ThreatIntel** source supplied by [Intel 471](https://intel471.com/).

<!--
:::warning
*The **_sumo_global_feed_cs** source will be discontinued on April 30, 2025*. For more information, see [Sumo Logic Threat Intelligence Sources](/docs/security/threat-intelligence/about-threat-intelligence/#sumo-logic-threat-intelligence-sources).
:::
-->

Switching to the Intel 471 global threat feed from CrowdStrike will introduce differences in the threat indicator content. Namely, the `raw` field from the `lookup` operator, and the `raw_threat` field from the `threatip` operator will contain different JSON-formatted fields. Sophisticated, security-centric Sumo Logic platform queries sometimes use these fields for searches and dashboards.

Importantly, the intel vendors themselves control what appears in these "raw" fields, and each vendor prioritizes different aspects of the intel they provide. For example, CrowdStrike often includes CVEs where applicable, whereas Intel 471 bundles geo-IP data with some of its entries. CrowdStrike reports the publication timestamp of its indicators, whereas Intel 471 reports the recommended expiration timestamp. As such, Sumo Logic strongly encourages customers to review their searches and dashboards for "raw" field handling, and to modify them appropriately.

Customers can experiment with the Intel 471 feed by referencing the `sumo://threat/i471` lookup table as a parameter to the [`lookup` search operator](/docs/search/search-query-language/search-operators/lookup). (It isn't possible to do the same for `threatip`, though its `raw_threat` field is the same as the `lookup` operator's `raw` field.)  

<!--
On April 30, 2025, the global CrowdStrike feed will be fully replaced by Intel 471 in the Sumo Logic platform, and references to the old feed will automatically be updated to point to the new feed.
-->

Sumo Logic's native security applications will be updated to support this vendor change. To take advantage of the new Intel 471 feed, customers only need to update queries in their custom apps. For examples of queries using the `lookup` operator, see the dashboards in the [Threat Intel Quick Analysis](/docs/integrations/security-threat-detection/threat-intel-quick-analysis/#threat-intel-optimization) app.

## How do I know if I need to update a search or dashboard?

If your queries reference `json field=raw` or `parse field=raw` (or `raw_threat`, in the case of the `threatip` operator), you are extracting vendor-specific data that might need to be updated.

Additionally, the Intel 471 source currently does not include domain or email indicators, instead prioritizing IP addresses, URLs, and file hashes. 

## How can I translate CrowdStrike-specific fields to Intel 471-specific fields?

In many cases, it may not be possible to translate CrowdStrike-specific fields to Intel 471-specific fields, as the two vendors emphasize different aspects of indicators of compromise. However, the table below provides approximate mappings to help you start adapting your queries.

### Approximate field mappings

As a starting point to analyze field mapping, examine the following translations:

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

### JSON side-by-side approximate field mappings

<img src={useBaseUrl('img/security/threat-intel-field-mappings.png')} alt="Threat Intelligence field mappings" style={{border: '1px solid gray'}} width="800" />

## Migrate to the new source

Perform the steps in the following sections to migrate to the `SumoLogic_ThreatIntel` source. 

### hasThreatMatch rule syntax

<!--
In most cases, no change is needed if you use [hasThreatMatch](/docs/cse/rules/cse-rules-syntax/#hasthreatmatch) in your rules:
* Until April 30, 2025 the rules point to the legacy `_sumo_global_feed_cs` source (and the rest of your tenant-specific sources). 
* After April 30, 2025, the rules point to the new `SumoLogic_ThreatIntel` source (and the rest of your tenant-specific sources).
-->

You may need to make changes in these scenarios:
* If you have rules with `hasThreatMatch` syntax that explicitly point to the legacy `_sumo_global_feed_cs` source, change them to point to `SumoLogic_ThreatIntel` source. For example: 
   * Change this: <br/>`hasThreatMatch([srcDevice_ip], confidence > 50 AND source="_sumo_global_feed_cs")` 
   * To this: <br/>`hasThreatMatch([srcDevice_ip], confidence > 50 AND source="SumoLogic_ThreatIntel")`
* The `domain-name` and `email-addr` types are not supported in Intel 471. If you filter for these types using `hasThreatMatch`, update your rule syntax to remove them.

### lookup operator

In most cases, no change is needed if you use the [lookup](/docs/search/search-query-language/search-operators/lookup/) search operator to point to `sumo://threat/cs` (the legacy `_sumo_global_feed_cs` source) instead of `sumo://threat/i471` instead (the new `SumoLogic_ThreatIntel` source). For examples, see the dashboards in the [Threat Intel Quick Analysis](/docs/integrations/security-threat-detection/threat-intel-quick-analysis/) app. See [Threat Intel Optimization](/docs/integrations/security-threat-detection/threat-intel-quick-analysis/#threat-intel-optimization) for guidance on using those queries.
<!--
* Until April 30, 2025, queries in apps that use the `lookup` search operator to point to `sumo://threat/cs` are unchanged. 
* After April 30, 2025, queries in apps that use the `lookup` operator to point to `sumo://threat/cs` are updated to point to `sumo://threat/i471` instead. **You must upgrade your apps to get this update.** In the App Catalog, open apps labeled **Upgrade Available** and select **Manage > Upgrade**.
-->

You may need to make changes in these scenarios:
* The `domain-name` and `email-addr` types are not supported in Intel 471. If you filter for these types using the `lookup` operator, update your queries to remove them.
* If you parse the `raw` field returned from the `lookup` operation, you will see different fields when you use the new `SumoLogic_ThreatIntel` source. To avoid problems with fields not returning data, use a [nodrop](/docs/search/search-query-language/parse-operators/parse-nodrop-option/) clause when you use `parse field=raw` or `json field=raw`. In the following excerpt from a query, `nodrop` is added at the end of the line where `json field=raw` is called:
   ```
   | lookup type, actor, raw, threatlevel as malicious_confidence from sumo://threat/cs on threat=src_ip
   | json field=raw "labels[*].name" as label_name nodrop
   ```

### threatip search operator

If you use the [threatip](/docs/search/search-query-language/search-operators/threatip/) search operator, no change is needed.

<!--
* Until April 30, 2025, the `threatip` operator points to the legacy `_sumo_global_feed_cs` source.
* After April 30, 2025, the `threatip` operator points to the new `SumoLogic_ThreatIntel` source.
-->