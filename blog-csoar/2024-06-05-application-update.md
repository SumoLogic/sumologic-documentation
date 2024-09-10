---
title: June 5, 2024 - Application Update
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
#### Cloud SOAR
* Incident list: Restored all bulk operations for select all option.

### Bug fixes
* Playbooks:
  * Fixed start node configuration issue.
  * Fixed Input values not displayed correctly in Condition node.
  * Fixed issue related to send email action when cc field is not populated.
  * Fixed issue related to "Playbooks suddenly failing because of missing parameters".
  * Fixed issue with unsupported special characters.
* Integrations:
  * Fixed issue related to Internal Integration and output edit.
  * Fixed issue related to Join and unique operator.
* Entities: Fixed table loading issue.
* Fixed issue related to trigger action, when APIs are involved.

#### Cloud SOAR
* SecOps: Fixed issue when filtering cards with large number of Incidents or Triage events.
* Incidents:
  * Fixed closing note permission.
  * Fixed issue with old SOAR Incidents not loading.
  * Fixed issue related to mandatory Incident closing note.
* Fixed issue with Trigger action Incident Close.
