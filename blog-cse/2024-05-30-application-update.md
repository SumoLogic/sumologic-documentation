---
title: May 30, 2024 - Application Update
keywords:
  - cloud siem
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg
hide_table_of_contents: true
authors:
  - url: https://www.sumologic.com/help/release-notes-cse/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

#### Minor Changes and Enhancements

* [New] To help facilitate investigations and audits, a list of the sourceMessageIds for each of the records that contributed to a Threshold, Chain, or Aggregation Signal are now included in that Signal's record in the `sec_signal` index, in the new `aggregatedMessageIds` field.

#### Bug Fixes

* The Community view on the MITRE ATT&amp;CK&reg; Threat Coverage Explorer was not filtering by default properly.
