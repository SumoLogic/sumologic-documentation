---
title: June 08, 2026 - Application Update
hide_table_of_contents: true
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - automation service
  - cloud soar
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## May release

The following are the updates made in May 2026.

### Integrations

This section includes new integrations and upgrades to existing ones.

- **Azure AD**. Added the **Reset User MFA** action. [Learn more](/docs/platform-services/automation-service/app-central/integrations/azure-ad/).
- **Delinea Secret Server**. Added new integration for Delinea Secret Server. [Learn more](/docs/platform-services/automation-service/app-central/integrations/delinea-secret-server/).

### Platform

Updated the UI design of checkbox and switch components to ensure consistency across the platform.

### Bug Fixes

#### Integrations

- **Azure AD**. Resolved an issue in the Reset User Password and Remove Member From Group actions that caused errors while processing responses.
- **Microsoft Defender ATP**. Fixed the List Machine Actions issue where the machine name filter was not applied correctly.

#### Playbooks

- Fixed an issue where the node side drawer in the Playbook Result Graph View would close unexpectedly.
- Resolved a UI issue where the Playbook Enable/Disable icon was slightly overlapping on the listing page.
- Fixed inconsistent behavior in Playbook import and export operations.