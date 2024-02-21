---
title: February 19, 2024 - Application Update
hide_table_of_contents: false
keywords:
  - sumo logic
  - cloud soar
  - automation service
tags: [cloud soar release notes,automation service , application update]
image: https://help.sumologic.com/img/sumo-square.png
authors:
  - url: https://help.sumologic.com/release-notes-csoar/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Changes and Enhancements 
* Playbooks: 
  * Enabled [Testing playbooks](https://help.sumologic.com/docs/cloud-soar/automation/#testing-playbooks) where user can choose between: Insight, Custom (JSON payload) and for CloudSoar also Incidents.
  * Node configuration: Added suggested values present in yaml.
  * UserChoice, answer by Email: Fixed Authorizer usage from previous nodes.
* AppCentral: Integrations added link to [Integrations in App Central
](https://help.sumologic.com/docs/platform-services/automation-service/app-central/integrations/) for each integration in Installation modal.
* Integrations: Enabled custom docker container.
#### Cloud SOAR 
* Reports: Enabled new reports.

### Bug fixes 
* Integrations: 
  * Fixed test resource for not saved values.
* AppCentral: Fixed playbook maximize view.
 
#### Cloud SOAR 
* Rules: Fixed scheduled execution.
* Tasks: Fixed creation if required field is dismissed.
* Incidents: Widgets fixed full screen view buttons.