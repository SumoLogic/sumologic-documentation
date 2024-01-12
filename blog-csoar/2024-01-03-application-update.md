---
title: January 03, 2024 - Application Update
hide_table_of_contents: false
keywords:
  - sumo logic
  - cloud soar
  - automation service
tags: [cloud soar release notes, automation service, application update]
image: https://help.sumologic.com/img/sumo-square.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

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
