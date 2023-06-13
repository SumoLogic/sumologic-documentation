---
title: June 12, 2023 - Application Update
keywords:
  - cloud siem
  - entity timeline
tags: [application update]
authors:
  - url: https://help.sumologic.com/release-notes-cse/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Minor Changes and Enhancements

* [New] The Entity Timeline now supports all Entity types (including custom types).
* [New] The `GetSignals` API call now includes an attribute with a timestamp when each Signal was `created`.
* [Updated] The log mapping UI has been updated so that if a standard vendor and product is selected, those values will be auto-filled on the record configuration, avoiding an issue where customers were accidentally creating 'custom' values. 

### Bug Fixes

* An error would occur when sorting entity groups by entity type.
* The control used to select schema tags for Entities was not working properly.
* The "View in Log Search / Normalized Data" button was opening a log search window with an incorrect time frame.
* Global search was not displaying previous searches, and was not returning some Entities.
* The rule tuning expression editor would not scroll for very long expressions.
* Importing a rule via the UI was not working in some scenarios.
