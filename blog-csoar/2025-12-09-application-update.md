---
title: December 9, 2025 - Application Update
hide_table_of_contents: true
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - automation service
  - cloud soar
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## November release

Following are the updates made in November.

### Changes and enhancements

#### Playbooks

* Added user choice variables that let you retrieve user choice data in subsequent playbook actions in a playbook. [Learn more](/docs/platform-services/automation-service/playbooks/create-playbooks/#user-choice-variables).
* Enhanced the user experience when selecting 'and/or' operators between conditions in both condition and filter nodes.

#### Integrations

* Added new integrations: 
   * [Google Firebase](/docs/platform-services/automation-service/app-central/integrations/google-firebase/)
   * [Monday](/docs/platform-services/automation-service/app-central/integrations/monday/)
* [The Cisco Meraki](/docs/platform-services/automation-service/app-central/integrations/cisco-meraki/) integration has been fully upgraded to align with the latest Meraki Dashboard API (v1) and SDK (v2.0.3).
* Added the Convert Time action to [Sumo Logic Automation Tools](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-automation-tools/).
* In [Microsoft OneDrive](/docs/platform-services/automation-service/app-central/integrations/microsoft-onedrive/) added support for downloading file from site document library using hostname and site name parameters.


### Bug Fixes

#### Playbooks

* Added validation to prevent the creation of condition and filter nodes without defined conditions.
* Updated the condition node to restrict the deletion of all conditions, avoiding the creation of empty nodes.
* Fixed the 'split by' functionality in filter nodes to ensure splitting only occurs with array variables.

#### Integrations

In [Microsoft EWS (Graph)](/docs/platform-services/automation-service/app-central/integrations/microsoft-ews-graph/) fixed an issue in the Search Emails Extended action.

#### Misc 

Fixed an issue causing duplicate key errors during incident ownership updates.