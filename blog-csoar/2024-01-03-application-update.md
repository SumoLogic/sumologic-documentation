---
title: January 03, 2024 - Application Update
keywords:
  - sumo logic
  - cloud soar
  - automation service
tags: [cloud soar release notes, automation service, application update]
image: https://help.sumologic.com/img/sumo-square.png
authors:
  - url: https://help.sumologic.com/release-notes-csoar/rss.xml
    image_url: /img/release-notes/rss-orange.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Changes and Enhancements
* Playbooks: UserChoice nodes can be handled now from Slack workspace (see [documentation](https://help.sumologic.com/docs/cloud-soar/cloud-soar-delivery-2/#configure-slack-for-cloud-soar)).

#### Cloud SOAR
* New privilege "Api Admin": Enabling this privilege in Log Analytics Platform will allow user to handle incident operations without being involved directly as investigator.

### Bug fixes
* Fixed black screen when opening a Cloud SOAR or Automation Service URL with invalid session.
* Playbooks:
  * Fixed: Parameters not being passed to nested playbooks.
  * Fixed: Configuration loss after being installed from App Central.
  * Placeholder TextArea with `<` and `>` that were converted in "spaces" in HTML.

#### Cloud SOAR
* Groups: Fixed member removal that could result in broken requests.
* Playbooks:
  * TextArea fixed placeholder view for Artifacts fields.
  * Incident ID placeholder available in node configuration.

#### Automation Service
* Playbooks: Start node parameters fixed by using a “.” or a "space" in parameter names that were converted into `_`.
