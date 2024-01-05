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
#### Cloud SOAR
* Contextual menu now contains Open link in new tab action if URL is highlighted.
#### Automation Service 
* The Automation Service now permits you to execute Containment and Scheduled actions. App Central has been updated accordingly.
* Manual playbook interaction through user choice node and manual action.

### Bug fixes 
* Selecting a timestamp while testing integrations no longer results in the wrong timestamp being used.
* Boolean values are no longer processed as null in actions/playbooks.
* There is no longer an issue using a playbooks placeholder in the textArea for Incident fields.
* Editing a playbook and publishing no longer causes an empty playbook.
#### Cloud SOAR
* In playbooks, Incident fields are now available in condition nodes (they are no longer "NULL").
* The file type is now displayed for Entities files.