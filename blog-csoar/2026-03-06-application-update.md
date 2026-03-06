---
title: March 6, 2026 - Application Update
hide_table_of_contents: true
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - automation service
  - cloud soar
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## February release

Following are the updates made in February 2026.

### Changes and enhancements

#### Integrations

* [Added] [Sumo Logic Automation Tools](/docs/platform-services/automation-service/app-central/integrations/sumo-logic-automation-tools/) - Added "Count Occurrence Of Value" action to count the occurrence of a specified value in texts.
* [Updated] [ThreatConnect V3](/docs/platform-services/automation-service/app-central/integrations/threatconnect-v3/) - Added observations parameter to the Update Intelligence action to enable recording observation counts for indicators.
* [Updated] [Atlassian Opsgenie](/docs/platform-services/automation-service/app-central/integrations/atlassian-opsgenie/) - Added a retry mechanism to the Create Alert action of Atlassian Opsgenie.
* [Updated] [Microsoft SharePoint (Graph)](/docs/platform-services/automation-service/app-central/integrations/microsoft-sharepoint-graph/) - Improved the Folder Relative URL hint to provide clearer guidance on entering the correct relative path format.

#### Platform

* Improved the sorting UX experience on all tables in Cloud SOAR and the Automation Service to align with other Sumo Logic modules. 
* Deleted records will no longer be fetched during table searches unless the `Deleted` filter is applied. 

### Bug Fixes

Fixed an issue where query filters were being applied incorrectly during search. 

#### Playbooks

Fixed issues while selecting variables containing the period character in textarea fields and test node input.