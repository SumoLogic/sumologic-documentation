---
title: March 16, 2023 - Application Update
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

* [New] The Entity Timeline can now be filtered by record type:

<img src={useBaseUrl('img/release-notes/cse/timeline-filter.jpg')} alt="Entity Timeline Filter"/>

### Bug Fixes

* When an Entity normalization lookup table was deleted and then re-created in the Sumo platform, the configuration in CSE was not automatically updated, causing the normalization to fail. 
* Match lists with custom columns were not working properly during record processing.
* The Network Blocks section was missing from the Entity details panel.
* Links for schema tags were not displaying in the UI properly.
