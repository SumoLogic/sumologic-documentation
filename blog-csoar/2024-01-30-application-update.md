---
title: January 30, 2024 - Application Update
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
* Added public help document for supported integrations. See [Integrations in App Central](https://help.sumologic.com/docs/platform-services/automation-service/app-central/integrations/).
* Integrations: Added possibility to rename an integration keeping original reference in YAML.
* Playbooks:
  * List view set as default. View changes are saved in user preferences.
  * Deprecated Nested attribute.
  * Added possibility to dynamically reference a resource in actions.
* Automation now tracks failed actions executions.

#### Cloud SOAR
* Playbooks: Fixed insight execution for nested playbooks with more than 2 nesting levels.
* Rules: Added ability to change the Daemon Name or Integration Resource within an existing automation rule.

### Bug fixes
* Email encoding a character to UTF8 for literal string fixed.
* Playbooks:
  * Unable to use variable fields with quotes in text area fixed.
  * Fixed playbook inputs not visible in TextArea placeholder.
  * Resolved scheduled action execution issue with playbook status.

#### Cloud SOAR
* Incidents:
  * Fixed war room export for updated tasks.
  * Fixed possibility to copy table contents in Notes description field.
  * Incident creation: Fixed infinite spinner in Automation tab.
