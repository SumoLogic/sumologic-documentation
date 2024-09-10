---
title: April 23, 2024 - Application Update
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
* Integrations: Basic Tools added CC in Send Mail Action.

### Bug fixes
* Integrations:
  * Fixed resource testing.
  * Fixed internal integration update process.
  * Fixed output fields containing a value of numerical "0" logged blanks instead of the actual number.
* Playbooks:
  * Fixed playbook condition logic with AND, OR operators.
  * Fixed textarea and regex parsing when HTML tags are enabled.
  * Fixed issue related to multiple playbook revisions and user choice execution.

#### Cloud SOAR
* Incident: Fixed issue with war room large content loading.
* API documentation updated.
