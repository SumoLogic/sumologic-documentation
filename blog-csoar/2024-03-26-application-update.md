---
title: March 26, 2024 - Application Update
keywords:
  - cloud soar
  - automation service
tags: [cloud soar release notes, automation service, application update]
image: https://help.sumologic.com/img/sumo-square.png
authors:
  - url: https://help.sumologic.com/release-notes-csoar/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Bug fixes
* Playbooks: 
  * Fixed execution with cartesian product disabled.
  * Fixed condition node not working as expected when evaluating value `0 == any string`.
* Fixed date-time format settings not apply anywhere.

#### Cloud SOAR
* Triage: Fixed playbook graph view errors.
* Incidents:
  * Fixed Incidents navigation button disabled when inside an incident.
  * Fixed modal to Add user as investigator that returned an error.
  * Fixed fields with '0' value displayed as empty in gui.
  * Fixed issue related 'Prohibit duplicate naming' that was not enforced properly in case of incidents created from automation rule.
  * Fixed duplicate incidents issue when created from webhooks (LAP scheduled search).
  * Fixed incidents list with empty rows. 
