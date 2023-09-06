---
title: July 21, 2023 - Application Update
keywords:
  - cloud siem
  - unified UI
  - signal severity total
tags: [application update]
authors:
  - url: https://help.sumologic.com/release-notes-cse/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Minor Changes and Enhancements

* [Update] The Cloud SIEM UI has been updated with refreshed fonts and colors to better align with the core Sumo Logic pages. This is the first change in a greater series of updates designed to present a more unified user experience across Sumo Logic feature sets. 
* [New] The **Signal Severity Total**, an indication of the activity for an Entity, has been added to the Entity list and details views. The Signal Severity Total is calculated by adding up the severity value for each of the Signals generated against a given Entity during the current detection window (by default 14 days), not including duplicate or suppressed Signals.

### Bug Fixes

* With the recent changes to log mapping, some users were seeing an error when attempting to use custom input vendors and/or products.
* Entity lookup normalization was taking place after Entity Groups were processed; normalization now happens first.
