---
title: January 30, 2024 - Application Update
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
* Public Help Document for Supported Integrations [released](https://help.sumologic.com/docs/platform-services/automation-service/app-central/integrations/).
* Integrations: added possibility to rename an integration keeping original reference in yaml.
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


