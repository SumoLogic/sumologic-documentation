---
title: July 17, 2024 - Application Update
keywords:
  - sumo logic
  - cloud soar
  - automation service
image: https://help.sumologic.com/img/sumo-square.png
hide_table_of_contents: true
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<a href="https://help.sumologic.com/release-notes-csoar/rss.xml"><img src={useBaseUrl('img/release-notes/rss-orange2.png')} alt="icon" width="50"/></a>

### Changes and Enhancements
* Automation Audit: Logs now contain information about action and section detail (for playbooks, rules, observables, triage, incidents, and so on).
* Playbooks: Added option “Split By” for Filter node.

#### Cloud SOAR
* Playbooks:
  * Added option to hide trigger action modal.
  * Added option to remove additional information from the Slack message in User Choice node.

### Bug fixes
* Playbooks:
  * Fixed send mail action error with Unicode characters.
  * Fixed export.
