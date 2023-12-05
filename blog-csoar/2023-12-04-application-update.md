---
title: December 04, 2023 - Application Update
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
* Playbooks: Added ability to dynamically select an authorizer in UserChoice node.
#### Automation Service 
* Now the Automation Service permits to execute also Containment and Scheduled actions. App Central has been updated accordingly.

### Bug fixes 
* Fixed: Selecting a timestamp while testing integrations results in wrong timestamp to be used.
* Fixed: Boolean values are processed as null in actions/playbooks.
* Fixed: Issue using playbooks placeholder in textArea for Incident fields.
* Fixed: Issue related to edit a playbook and publishing causing empty playbook.
#### Cloud SOAR
* Playbooks: Fixed Incident Fields not available in Condition Nodes (ie: "NULL").
* Entities: Fixed file type not displayed for entities File.