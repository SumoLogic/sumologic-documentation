---
title: September 3, 2025 - Application Update
hide_table_of_contents: true
image: https://assets-www.sumologic.com/company-logos/_800x418_crop_center-center_82_none/SumoLogic_Preview_600x600.jpg?mtime=1617040082
keywords:
  - automation service
  - cloud soar
  - soar
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## August release

Following are the updates made in August.

### Changes and enhancements

#### Platform 

Default action limit increased to 500.

#### Integrations

* [UPDATED] [Trend Micro Vision One](/docs/platform-services/automation-service/app-central/integrations/trend-micro-vision-one/) 
    * Fixed type SHA1 issue in action Add Object To Suspicious Object List and Delete Object From Suspicious Object List. 
    * Added SHA256 support in action Add Object To Suspicious Object List and Delete Object From Suspicious Object List.
* [UPDATED] [CrowdStrike Falcon](/docs/platform-services/automation-service/app-central/integrations/crowdstrike-falcon/)
    * Resolved timeout issues across all actions, including daemons and enrichment queries, for improved stability and performance.
* [UPDATED] [ManageEngine Desktop Central](/docs/platform-services/automation-service/app-central/integrations/manage-engine-desktop-central/)
    * Added support for both Cloud and On-prem based account type authentication.

### Bug Fixes

#### Playbooks

* Fixed a bug causing false loop detection in playbook execution.
* Fixed operator inconsistencies within conditions for condition and filter nodes.

#### Integrations

Resolved installation error for App Central integrations conflicting with existing custom integrations of the same name.

#### Incidents

Fixed unlimited file upload vulnerability in the Incident documentation feature.