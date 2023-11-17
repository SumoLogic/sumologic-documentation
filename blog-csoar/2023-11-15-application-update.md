---
title: November 15, 2023 - Application Update
hide_table_of_contents: false
keywords:
  - sumo logic
  - cloud soar
  - automation service
tags: [cloud soar release notes, automation service, application update]
image: https://help.sumologic.com/img/sumo-square.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Changes and Enhancements 
* Added documentation for [Cloud SOAR Audit Logging](/docs/cloud-soar/audit-event-index/)

### Bug fixes 
* Actions: Fixed run action causing page reload when response data is too large.
* Playbooks: Removed Resource from inputs when selecting an Internal integration in add or edit node.
* Playbooks actions: Fixed boolean values processed as null.
#### Cloud SOAR
* Fixed API v3 change incident owner when using incorrect owner ID or with a Group ID.
* Fixed "Incident Tools" action Add Note issue.
* Fixed Playbooks "Run Test" against an Incident where modal remained with infinite loader.