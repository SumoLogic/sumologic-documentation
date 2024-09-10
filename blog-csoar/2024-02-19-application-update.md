---
title: February 19, 2024 - Application Update
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
* Playbooks:
  * Enabled [playbook testing](https://help.sumologic.com/docs/cloud-soar/automation/#testing-playbooks). With this improvement it is now possible to test a playbook configuration before publishing it, using Insight, Incident or custom JSON as input.
  * Action configuration: Integration fields configuration now suggests default values, if present.
  * UserChoice, answer by Email: Fixed Authorizer usage from previous nodes.
* AppCentral: Within the Integrations section, each integration card now contains a hyperlink to the related public documentation page [Integrations in App Central](https://help.sumologic.com/docs/platform-services/automation-service/app-central/integrations/).
* Integrations: It is now possible to send custom commands when an integration docker image is created. This feature is available for Not Certified integration only.

#### Cloud SOAR
* Enabled a new reporting feature for case management and dashboards.

### Bug fixes
* Integrations:
  * Fixed Resource test issue.
* AppCentral: Fixed playbook preview when maximized view is used.

#### Cloud SOAR
* Rules: Fixed scheduled execution.
* Tasks: Fixed creation if a required field is dismissed.
* Incidents: Fixed full screen view buttons for widgets.
* Notes: Fixed CSV export.
