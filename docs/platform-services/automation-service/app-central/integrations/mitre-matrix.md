---
title: Mitre Matrix
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/mitre-matrix.png')} alt="mitre-matrix" width="100"/>

***Version: 2.2  
Updated: Jul 18, 2023***

MITRE is a globally-accessible knowledge base of adversary tactics and techniques based on real-world observations. 

## Actions

* **Get Techniques** *(Enrichment)* - Get a specific technique details by identifier.
* **Get Tactics** *(Enrichment)* - Get a specific Tactic details by identifier.
* **Get Associated Intrusions** *(Enrichment)* - Get a specific malware details by identifier.
* **Get Mitigations** *(Enrichment)* - Get mitigations details by identifier.
* **Retrieve Tactics And Techniques From CSE Insight** *(Enrichment)* - Get Tactics And Techniques From CSE Insight Tags.

## External Libraries

* [pyattck](https://github.com/swimlane/pyattck/blob/master/LICENSE.md)

## Configure Mitre Matrix in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/mitre-matrix-configuration.png')} style={{border:'1px solid gray'}} alt="Mitre Matrix configuration" width="400"/>

For information about Mitre Matrix, see [Mitre Matrix documentation](https://attack.mitre.org/).

## Change Log

* February 3, 2021 - First upload
* June 07, 2022 - Updated all the actions with pyattck==5.4.0
* June 26, 2023 (v2.1) - Updated the integration with Environmental Variables
* July 18, 2023 (v2.2) - Integration refactored
