---
title: October 23, 2026 - Application Update
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - signals
  - cloud siem
hide_table_of_contents: true
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Threat Intelligence Enrichment on Signal Details

You can now see exactly what threat intelligence existed when a signal fired. The new **Threat Intelligence Enrichment** tab in the entity panel on the signal Details page shows a point-in-time snapshot of the matched indicators, including the matching sources, confidence, threat type, and feed-specific details such as actors and kill chain phases.

Because the snapshot is captured when the signal is created, it doesn't change if an indicator is later updated or expires. You can investigate older signals with the same context that triggered them. [Learn more](/docs/cse/records-signals-entities-insights/signals-ui/#threat-intelligence-enrichment).

## More ways to filter with the `hasThreatMatch` function

Write more precise threat detection rules. The `hasThreatMatch` function now supports:

* The `actors` and `kill_chain` attributes, to match on threat actor names and kill chain phases.
* Any Cloud SIEM rules syntax function in the filter expression, such as `contains()` and `toString()`.
* `_threatlookup_fields`, to filter on custom fields from your own threat intelligence feeds.

For example, `hasThreatMatch([srcDevice_ip], contains(actors, 'HELIXKITTEN'))` matches only indicators associated with a specific actor.
[Learn more](/docs/cse/rules/cse-rules-syntax/#hasthreatmatch).
