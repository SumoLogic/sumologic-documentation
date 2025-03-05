---
slug: /security/threat-intelligence/threat-indicators-in-cloud-siem
title: Threat Intelligence Indicators in Cloud SIEM
sidebar_label: Indicators in Cloud SIEM
description: Learn how to use threat intelligence indicators in Cloud SIEM.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Threat intelligence indicators can be used in Cloud SIEM to find possible threat activity.

:::note
Previously, Cloud SIEM administrators could add [custom threat intelligence sources](/docs/cse/administration/create-custom-threat-intel-source/) in Cloud SIEM. **You can no longer add custom threat intelligence sources in Cloud SIEM**. To add new sources, [ingest threat intelligence indicators](/docs/security/threat-intelligence/about-threat-intelligence/#ingest-threat-intelligence-indicators) using the Sumo Logic threat intelligence framework. [Contact Support](https://support.sumologic.com/support/s/) if you still need to create custom sources in Cloud SIEM.
:::

## hasThreatMatch Cloud SIEM rules language function

Use the `hasThreatMatch` function in Cloud SIEM rules to analyze incoming records for matches to threat intelligence indicators. 

For example, use the function to match all records with a `srcDevice_ip` attribute correlated to a threat indicator with a high confidence level (greater than 50): 

```
hasThreatMatch([srcDevice_ip], confidence > 50)
```

For more information, see [hasThreatMatch](/docs/cse/rules/cse-rules-syntax/#hasthreatmatch).

## View threat indicator labels in the Cloud SIEM UI

Entities are automatically enriched with indicator data from [custom intelligence sources](/docs/cse/administration/create-custom-threat-intel-source/) and [sources you ingest](/docs/security/threat-intelligence/about-threat-intelligence/#ingest-threat-intelligence-indicators) (but not from the **_sumo_global_feed_cs** global feed). 

When a match to a threat indicator in sources is found, labels showing the entity's "reputation" will be displayed throughout the Cloud SIEM UI:

| Reputation value | Label | Icon |
|:--|:--|:--|
| **Malicious** | <img src={useBaseUrl('img/cse/indicator-malicious-label.png')} alt="Malicious label" width="100"/> | <img src={useBaseUrl('img/cse/indicator-malicious-icon.png')} alt="Malicious icon" width="30"/> |
| **Suspicious** | <img src={useBaseUrl('img/cse/indicator-suspicious-label.png')} alt="Suspicious label" width="110"/> | <img src={useBaseUrl('img/cse/indicator-suspicious-icon.png')} alt="Suspicious icon" width="30"/> |
| **Not Flagged** | <img src={useBaseUrl('img/cse/indicator-notflagged-label.png')} alt="Suspicious label" width="125"/> | None |

**Not Flagged** is not the default value (which is no indicator at all). Cloud SIEM does not automatically assign an indicator value; enrichments must explicitly define it.

:::note
Cloud SIEM automatically enriches *signals* with information from your sources in the Sumo Logic threat intelligence datastore. However, unlike [custom intelligence sources](/docs/cse/administration/create-custom-threat-intel-source/), it does not enrich *records*. Even if a match occurs based on the rule expression, the indicator body is not attached to the record. Instead, the signal should contain a list of matched indicator IDs, and the indicators are visible on the matched entities.
:::

### Example of a label in the UI

In the following screenshot, the **Malicious** icon displays on the entity in the insight details, and the **Malicious** label displays on the [**Enrichments** tab](/docs/cse/integrations/enrichments-and-indicators/#enrichments-tab). 

<img src={useBaseUrl('img/cse/enrichments.png')} alt="Examples of enrichments" width="800"/>

### Labels for sources

Since different sources can report different reputations, each source has a reputation icon on its row in the Cloud SIEM UI. In the following example, an indicator from the Palo Alto Networks Unit 42 source returned a reputation of **Malicious**, hence the red icon. The link to the right would open a log search window showing the matching indicators in detail.

<img src={useBaseUrl('img/security/threat-indicators-in-cloud-siem-ui.png')} alt="Threat indicators in the Cloud SIEM UI" style={{border: '1px solid gray'}} width="300" />

### Threat type mapping to reputation

Following is the mapping of threat type fields in indicators to reputation labels in the Cloud SIEM UI:

| Threat type value | Reputation label in the Cloud SIEM UI |
| :-- | :-- |
| `anomalous-activity` | **Suspicious** |
| `anonymization` |  **Suspicious** |
| `benign` |  **Not Flagged** |
| `compromised` |  **Malicious** |
| `malicious-activity` | **Malicious** |
| `attribution` |  (None) |
| `unknown` (or not set) |  **Suspicious** |

:::note
If the mapping produces a threat indicator level of **Malicious**, but the confidence is less than 60, the entity's reputation will be set to **Suspicious** instead. If there are multiple reputation values for a given entity (potentially from threat intel and enrichment), Cloud SIEM will show the most severe indicator.
:::