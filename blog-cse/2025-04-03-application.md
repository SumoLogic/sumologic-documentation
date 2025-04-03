---
title: April 3, 2025 - Application Update
image: https://help.sumologic.com/img/sumo-square.png
keywords:
  - threat intelligence
hide_table_of_contents: true    
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### New Threat Intelligence Source

We’re excited to announce a new `SumoLogic_ThreatIntel` source incorporating Indicators of Compromise (IoC) from [Intel 471](https://intel471.com/). Analysts can use this out-of-the-box default source of threat indicators to aid in security analysis.

:::warning
On April 30, 2025, we will discontinue our legacy `_sumo_global_feed_cs` source. If you have rules that explicitly point to this source, update them to use the new `SumoLogic_ThreatIntel` source.
:::

[Learn more](/docs/security/threat-intelligence/about-threat-intelligence/#sumo-logic-threat-intelligence-sources).

<img src={useBaseUrl('img/security/threat-intelligence-tab-example.png')} alt="Threat Intelligence tab" style={{border: '1px solid gray'}} width="800" />
