---
title: March 12, 2024 - Application Update
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
* Python version updated. If you experience any issues, refer to our [content release note](/release-notes-csoar/2024/03/12/content/).

#### Cloud SOAR
* Playbooks: Test feature now permits you to use internal Incident ID.

### Bug fixes
* Playbooks: 
  * Fixed test playbook broken functionality.
  * Fixed scheduled actions issue.
* Integrations: Fixed Docker Image build issue that resulted in an internal error. 

#### Cloud SOAR
* Incidents: Fixed column reordering causing the table to disappear.
* Triage: Fixed possibility to execute the same playbook more than two times.
