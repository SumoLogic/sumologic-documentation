---
slug: /platform-services/threat-intelligence/threat-indicators-in-cloud-siem
title: Threat Intelligence Indicators in Cloud SIEM
sidebar_label: Indicators in Cloud SIEM
description: Learn how to use threat intelligence indicators in Cloud SIEM.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Threat intelligence indicators can be used in Cloud SIEM to find possible threats. 

## hasThreatMatch Cloud SIEM rules language function

Use the `hasThreatMatch` function in Cloud SIEM rules to search incoming Records for matches to threat intelligence indicators. 

For example, use the function to find all Records with a `srcDevice_ip` attribute correlated to a threat indicator with a high confidence level (greater than 50): 

```
hasThreatMatch([srcDevice_ip], confidence > 50)
```

For more information, see [hasThreatMatch](/docs/cse/rules/cse-rules-syntax/#hasthreatmatch).

## View threat indicators in the Cloud SIEM UI

An Entity can be associated with a known indicator that has a threat type attribute, either `threatType` (in normalized JSON format and CSV format), or `indicator_types` (in STIX format as [defined by indicator_types in STIX 2.1](https://docs.oasis-open.org/cti/stix/v2.1/os/stix-v2.1-os.html#_cvhfwe3t9vuo)). 

When that occurs, then anywhere the Entity is displayed in the Cloud SIEM UI, a [threat indicator icon or label](/docs/cse/integrations/enrichments-and-indicators/#threat-indicators) will be displayed showing the Entity's "reputation" corresponding to that threat type:

| Threat type value | Label in the Cloud SIEM UI |
| :-- | :-- |
| `anomalous-activity` | **Suspicious** |
| `anonymization` |  **Suspicious** |
| `benign` |  **Not Flagged** |
| `compromised` |  **Malicious** |
| `malicious-activity` | **Malicious** |
| `attribution` |  (None) |
| `unknown` (or not set) |  **Suspicious** |

Note that if the mapping produces a threat indicator level of **Malicious**, but the confidence is less than 60, the Entity's reputation will be set to **Suspicious** instead. If there are multiple reputation values for a given Entity (potentially from threat intel and enrichment), Cloud SIEM will show the most severe indicator.

Since different sources can report different reputations, each source has a reputation icon on its row in the Cloud SIEM UI. In the following example, the indicator from the Unit 42 source returned a reputation of Malicious, hence the red icon. The link to the right would open a log search window showing the matching indicators in detail.

<img src={useBaseUrl('img/platform-services/threat-indicators-in-cloud-siem-ui.png')} alt="Threat indicators in the Cloud SIEM UI" style={{border: '1px solid gray'}} width="400" />

<!-- Put this back once we support cat with the threatlookup search operator. 
## Custom threat intelligence sources in Cloud SIEM

You can no longer [create custom threat intelligence sources using Cloud SIEM](/docs/cse/administration/create-custom-threat-intel-source/). You should use the Threat Intelligence tab, a collector, or the API to create sources. 

If you have custom sources in Cloud SIEM, they will continue to be honored until the feature is deprecated at a future time. If you have indicators in Cloud SIEM that you want to continue using past deprecation, we recommend you re-ingest them from the source that you originally used to place the custom sources in Cloud SIEM. Once ingested, the indicators will appear in the [Threat Intelligence tab](/docs/platform-services/threat-intelligence/threat-intelligence-indicators/#threat-intelligence-tab) and be available for use in both Cloud SIEM as well as the Sumo Logic Log Analytics Platform. 
-->