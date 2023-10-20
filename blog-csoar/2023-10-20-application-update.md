---
title: October 20, 2023 - Application Update
hide_table_of_contents: false
keywords:
  - sumo logic
  - cloud soar
  - automation service
 
tags: [cloud soar release notes,automation service , application update]
image: https://help.sumologic.com/img/sumo-square.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Changes and Enhancements 
* Automation Bridge: ECR docker images are now replicated in all AWS regions.
* App Central: Introduced Tags attribute for playbooks.
* Audit Logs: Enabled events forwarding to CIP.
* Playbooks: Improved status field update and granularity.
#### Cloud SOAR 
* Incident closing note: It is now part of APIv3 response and available as Read Only field in Incident Overview page.

### Bug fixes 
#### Cloud SOAR 
* Playbooks: Fixed display in task result table view for Authorizer.
* Rules: Fixed bug not displaying all Integrations using same daemon.
#### Automation Service 
* Playbooks: Fixed possibility to add new playbook type.
* Playbooks: Fixed killing playbook update status.
