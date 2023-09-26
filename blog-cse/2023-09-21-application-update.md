---
title: September 21, 2023 - Application Update
keywords:
  - cloud siem
  - entity groups
  - inventory
tags: [application update]
authors:
  - url: https://help.sumologic.com/release-notes-cse/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Entity Groups Inventory Enhancements

We are happy to announce some important enhancements to the [Entity Group](/docs/cse/records-signals-entities-insights/create-an-entity-group/) feature in Cloud SIEM Enterprise (CSE).

With this release, Entity Groups can now use *any* attribute available in your inventory data - including non-normalized attributes. (Previously, only the `group` attribute was available.) Non-normalized attributes can be used by adding the `fields.` prefix. 

In addition, the release introduces the ability to auto-set schema tag values on matching Entities based on the value of a given inventory attribute. In this example, any user Entity that has a value for `location` in inventory data will have that value set in a tag (such as `Location:Austin`).

<img src={useBaseUrl('img/release-notes/cse/enitty-group-inventory-enhancements.png')} alt="Entity Group Details Panel"/>

When using dynamic schema tags, you can still set static tags, criticality, and suppression state.

These two enhancements will reduce the number of Entity Groups needed to properly configure your Entities automatically and will automate a more complete and accurate set of Entity attributes, improving Rule and Analyst efficiency.

There much more information about Entity Groups and these enhancements in the [online documentation](/docs/cse/records-signals-entities-insights/create-an-entity-group/).

### Bug Fixes

* Multiple entries were being added to the audit log when some Insights were created.
* Some Insights were not getting enriched with VirusTotal using the direct integration.
* Time-to-live was temporarily considered a mandatory attribute for match lists.
