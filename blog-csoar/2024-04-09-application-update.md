---
title: April 9, 2024 - Application Update
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
* Text area editor: HTML mode is disabled by default.
* Automation: In playbook list view now results are loaded after the user opens each action card.

### Bug fixes
* App Central: Now when an integration is updated, user custom YAML output is automatically handled by the system and merged during the update process.
* Automation: Users can now contact Sumo support asking from which public IPs automations will be generated.
* Playbooks:
  * Fixed playbook saving action that caused playbooks to be empty.
  * Fixed issue related to multiple manual action execution in the same playbook.
  * Fixed import issue.

#### Cloud SOAR
* Entities: Fixed issue when creating new entity of type FILE.
* Rules: Now it is not possible to create two rules with the same name.
* Incidents: Fixed issue related to incident privileges.
