---
title: May 15, 2024 - Application Update
keywords:
  - cloud siem
  - rule level signal suppression
  - MITRE explorer
image: https://help.sumologic.com/img/sumo-square.png
hide_table_of_contents: true
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<a href="https://help.sumologic.com/release-notes-cse/rss.xml"><img src={useBaseUrl('img/release-notes/rss-orange2.png')} alt="icon" width="50"/></a>


#### Rule-Based Signal Suppression

We've added an advanced rule feature that allows users to override the global signal suppression period. This is most useful for individual rules that require much shorter (or no) suppression, such as rules that pass alerts through from external data sources such as endpoint detection systems.

This setting can be accessed from the rule details page:

<img src={useBaseUrl('img/release-notes/cse/csiem-rule-signal-suppression.jpg')} alt="Rule-Level Signal Suppression Settings in Cloud SIEM"/>

The setting is in the "Show Advanced" section. You can specify a suppression period for the rule between 0 and 168 hours (if you set it to 0, suppression is completely disabled for the rule).

#### Minor Changes and Enhancements

* Users can now view the MITRE ATT&amp;CK&reg; Threat Coverage Explorer with only the View Rules permission; previously users had to have the Manage Rules permission to access the Explorer.

#### Bug Fixes

* Some system events that automatically occur after an Insight is created (such as enrichment, automation service calls, and so on) were not consistently executing.
* Some system events that automatically occur just before rule processing (such as adding Geo IP and ASN data, checking match lists, and so on) were not consistently executing.
* Users were unable to duplicate rules due to an internal error.
