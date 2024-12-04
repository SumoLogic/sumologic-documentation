---
title: March 26, 2024 - Application Update
keywords:
  - cloud soar
  - automation service
image: https://help.sumologic.com/img/sumo-square.png
hide_table_of_contents: true
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<a href="https://help.sumologic.com/release-notes-csoar/rss.xml"><img src={useBaseUrl('img/release-notes/rss-orange2.png')} alt="icon" width="50"/></a>

### Bug fixes
* Playbooks:
  * Fixed execution with cartesian product disabled.
  * Fixed condition node not working as expected when evaluating value `0 == any string`.
* Fixed date-time format settings.

#### Cloud SOAR
* Triage: Fixed playbook graph view errors.
* Incidents:
  * Fixed incidents navigation button disabled when inside an incident.
  * Fixed modal to add user as investigator that returned an error.
  * Fixed fields with '0' value displayed as empty in GUI.
  * Fixed issue related to 'Prohibit duplicate naming' that was not enforced properly in case of incidents created from automation rule.
  * Fixed duplicate incidents issue when created from webhooks (LAP scheduled search).
  * Fixed incidents list with empty rows.
