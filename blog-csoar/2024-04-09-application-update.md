---
title: April 9, 2024 - Application Update
keywords:
  - sumo logic
  - cloud soar
  - automation service
tags: [cloud soar release notes, automation service, application update]
image: https://help.sumologic.com/img/sumo-square.png
authors:
  - url: https://help.sumologic.com/release-notes-csoar/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Changes and Enhancements
* Text area editor: HTML mode is disabled by default.
* Automation: In playbook ListView now results are loaded after user opens each action card.

### Bug fixes
* AppCentral: Now when an integration is updated, user custom yaml output is automatically handled by the system and merged during the update process.
* Automation: Users could now contact Sumo support asking from which public IPs automations will be generated.
* Playbooks: 
  * Fixed playbook saving action that caused playbook to be empty.
  * Fixed issue related to multiple manual action execution in the same playbook.
  * Fixed import issue.

#### Cloud SOAR
* Entities: Fixed issue when creating new entity of type FILE. 
* Rules: Now is not possible to create two rules with the same name.
* Incidents: Fixed issue related to incident privileges.
