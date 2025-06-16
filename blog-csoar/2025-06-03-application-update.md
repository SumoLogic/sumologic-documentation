---
title: June 3, 2025 - Application Update
hide_table_of_contents: true
image: https://help.sumologic.com/img/sumo-square.png
keywords:
  - automation service
  - cloud soar
  - soar
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## May release

### Changes and enhancements

#### New feature: Enable/disable playbooks

This feature allows users to easily enable or disable playbooks without deleting them, offering greater control over their execution.

What's new:
* Switch playbooks' status to enabled or disabled directly from the playbook details page.
* The playbooks listing page now shows a status column to display the status of the playbooks.
* Disabled playbooks will not execute from any linked triggers like monitors, insights, or incident rules, enhancing operational safety.
* By default, playbooks with any published version are set to enabled, while those that are draft-only or have been deleted remain disabled.
* Audit logs are generated whenever playbooks are enabled or disabled manually.

For more information, see [Enable or disable playbooks](/docs/platform-services/automation-service/automation-service-playbooks/#enable-or-disable-playbooks).

#### Integrations

* [NEW] [Google Workspace IDP](/docs/platform-services/automation-service/app-central/integrations/google-workspace-idp/) – This integration automates user and group management in Google Workspace, simplifying identity and access control for improved security and efficiency.
* [UPDATED] [Microsoft EWS Daemon](/docs/platform-services/automation-service/app-central/integrations/microsoft-ews-daemon/) - Enhanced the handling of email attachments that may lack file extension, ensuring consistent detection and processing.
* [UPDATED] [TheHive](/docs/platform-services/automation-service/app-central/integrations/thehive/) - Modified TheHive integration with case and observable enhancements:
   * Fixed parsing issues for date related inputs with inconsistent formatting.
   * Fixed SSL-related warning issues.
   * Added organization name field in resource which will included in the headers.
   * Enhanced error handling and made the integration more resilient to malformed inputs.
* [UPDATED] [Sumo Logic Automation Tools](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-automation-tools/) - Introduced the new "Scaled Decimal to Percentage" action, which converts a scaled decimal value into a percentage.
* [UPDATED] [Microsoft Sentinel](/docs/platform-services/automation-service/app-central/integrations/microsoft-sentinel/) - Enhanced the "Microsoft Sentinel Incidents Daemon" action, and added support to seamlessly fetch subsequent paginated data.

### Bug Fixes

#### Playbooks

* Fixed an issue where users were unable to use the "Answer by Email" option when selecting  the authorizer as a playbook input variable.
* Fixed long text getting cropped in filter and conditions nodes preview.

#### Rules

* Resolved an issue where empty keys within nested list objects were not properly filtered during rule execution. This fix ensures accurate evaluation of `isnot` and `notcontains` conditions by excluding empty keys, resulting in improved data processing accuracy and rule performance.

#### Incidents

* Resolved data loading issue on incidents and triage listing tables.
* Fixed issue related to user redirection to the logic page on session timeout.