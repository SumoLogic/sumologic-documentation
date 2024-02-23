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
  * Enabled  [Playbook Testing](https://help.sumologic.com/docs/cloud-soar/automation/#testing-playbooks) feature. With this improvement is now possible to test a playbook configuration, before publishing it, using Insight, Incident or a custom JSON as input.
  * Action configuration: integration fields configuration now suggest a default values, if present.
  * UserChoice, answer by Email: Fixed Authorizer usage from previous nodes.
* AppCentral: Within the Integrations section, each integration card contains now an hyperlink to the related public documentation page [Integrations in App Central](https://help.sumologic.com/docs/platform-services/automation-service/app-central/integrations/).
* Integrations: Is now possible to send custom commands when integration docker image is created. This feature is available fot Not certified integration only.

#### Cloud SOAR 
* Enabled a new reporting feature for case management and dashboarding.

### Bug fixes 
* Integrations: 
  * Fixed Resource test issue.
* AppCentral: Fixed playbook preview when maximized view is used.
 
#### Cloud SOAR 
* Rules: Fixed scheduled execution.
* Tasks: Fixed creation if required field is dismissed.
* Incidents: Fixed full screen view buttons for widgets.
* Notes: Fixed csv export.