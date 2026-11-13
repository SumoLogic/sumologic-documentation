---
title: November 13, 2026 - Application Update
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - automation service
  - cloud soar
  - app central
  - app catalog
hide_table_of_contents: true
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## October release

The following updates were made in October 2026.

### Platform 

#### App Central deprecation

App Central will be deprecated next week and will no longer be accessible. Its content has moved to the unified App Catalog, so you can now discover and install apps, integrations, and playbook templates from one place in Sumo Logic.

**What changed**

- Playbook templates and automation integrations previously available in App Central are now in the App Catalog.
- The App Catalog is organized into **Apps**, **Integrations**, and **Playbook Templates**, giving you a consistent way to find and install resources across the platform.

<img src={useBaseUrl('img/cse/app-catalog.png')} alt="App Catalog" style={{border: '1px solid gray'}} width="800"/>

**What you need to do**

- To open the App Catalog, in the main Sumo Logic menu, select **App Catalog**.
- Update any bookmarks or internal documentation that point to App Central.

For more information, see [App Catalog](/docs/integrations/).

#### Conversational Playbooks enhancements

Mobot’s conversational playbook experience now includes the following:

- **App Catalog integrations**. Mobot can search, filter, and recommend integrations you haven’t installed yet. Install and update messages now include a link to the integration in the App Catalog, so you can install it straight from the chat.
- **Existing playbook check**. Once you confirm the plan, Mobot searches for similar playbooks and suggests the closest existing matches.
- **Payload metadata exploration**. When working with playbook payload parameters, Mobot can look up what each field means and which values are allowed, such as for `status`. It uses this to guide you to the right fields for your use case. See Playbook Payloads.
- **Stricter validation**. Playbooks created through Mobot are validated more strictly, which reduces runtime errors.

For more on building playbooks with Mobot, see Sumo Logic Mobot and Playbooks.

#### UI improvements

- Dropdown menus and action items in all themes have refined spacing, shadows, and hover states, matching the rest of the platform.
- Menus, dialogs, and tables now use the same rounded corners for a more consistent look.

#### Cloud SIEM insight permissions

Playbook and UI calls that fetch Cloud SIEM insight details now send the `viewCse` permission. Cloud SIEM enforces this permission on its insight APIs. The playbook test-run insight check now logs the underlying error when it fails.

### Integrations

For details on Automation Service Integrations updates, see [Automation Service Integrations](/release-notes-service/2026/10/30/apps/#automation-service-integrations-enhancements).
