---
title: October 30, 2026 - Application Update
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - threat-intelligence
  - indicators
hide_table_of_contents: true
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## New Indicators tab for Threat Intelligence

The Threat Intelligence page now has an **Indicators** tab, so you can view and search the individual threat intelligence indicators from your custom sources. Use it to confirm that an indicator was ingested, check which source supplied it, or verify that a source is delivering data. Indicators from Sumo Logic global feeds are not available on this tab.

From the tab, you can:
- Search indicators by value.
- Filter by source, indicator type, and confidence.
- Sort by type, confidence, last updated, source, or expiration date.
- Select an indicator to see its details and raw IOC data, and open related activity in Log Search.

New indicators can take up to 10 minutes to appear. [Learn more](/docs/security/threat-intelligence/threat-intelligence-indicators/#view-and-search-indicators).

:::note
- The Threat Intelligence indicators tab is not currently supported in the AWS European Sovereign Cloud (ESC) region.
- The expired indicator retention period setting is deprecated with this release.
:::
