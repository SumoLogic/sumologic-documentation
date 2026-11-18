---
title: October 13, 2026 - Application Update
hide_table_of_contents: true
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - automation service
  - cloud soar
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## September release

The following updates were made in September 2026.

### Platform 

#### General

* **Unified App Catalog**. Migrated playbook templates and integrations from App Central to the unified App Catalog, delivering consistent navigation and discovery aligned with the rest of the Sumo Logic platform. [Learn more](/docs/integrations/).
* **Capability naming standardization**. Standardized capability labels across Cloud SOAR and Automation Service to align with platform-wide naming conventions. [Learn more](/docs/manage/users-roles/roles/role-capabilities).

#### Playbooks

The following enhancements were made to the conversational playbook via Mobot:
* **Playbook metadata updates**. Mobot can now update playbook names, descriptions, tags, and categories through conversation in the chat interface.
* **Smart integration discovery**. Mobot can now identify and recommend relevant integrations from the App Catalog, including installed and non-installed ones. It can also discover newly available actions for installed integrations and use them to generate recommendations, helping you find the right connectors and actions when building workflows.
* **User and group awareness for approval tasks**. Mobot can now access your organization's user and group information, making it easier to assign and configure approvers when adding Task or User Choice nodes to playbooks.
* **Canvas validation fix**. Fixed an issue that allowed Mobot to place a Filter node immediately after non-action nodes, such as Condition or Decision nodes. AI-generated playbook structures now adhere to supported canvas rules.

### Integrations

For details on Automation Service Integrations updates, see [Automation Service Integrations](/release-notes-service/2026/09/30/apps/#automation-service-integrations).

### Bug Fixes

#### Playbooks

Fixed an issue in the playbook **Test Node** dialog where clicking **Save & Run Test** could inadvertently clear previously entered input parameters and send empty values.

#### Integrations

Resolved a timeout issue when executing internal integration actions.
