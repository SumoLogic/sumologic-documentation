---
title: KELA RaDark
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/kela-radark.png')} alt="kela-radark" width="80"/>

***Version: 1.1  
Updated: Jul 03, 2023***

KELA's RADARK delivers automated threat intelligence, cultivating the targeted and contextualized insights that you need to stay ahead of attackers. Automatically monitor your environment and ensure that targeted threats are mitigated immediately to consistently maintain a strong security posture.

## Actions

* **List Incidents** *(Enrichment)* - Returns a list of incidents matching it.
* **Scrolling Incidents** *(Enrichment)* - Get the next bulk of incidents from List Incidents action.
* **Get Incident Details** *(Enrichment)* - Get a specific incident.
* **Update KELA RaDark Incident** *(Containment)* - Updating an Incident.

## KELA RaDark configuration

1. Sign in **KELA RaDark** using your username and password.
2. The API token can be generated through the RADARK UI, under the user menu - Generate Api Key.
3. Make sure you copy and save the api token.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/kela-radark/kela-radark-1.png')} style={{border:'1px solid gray'}} alt="kela-radark" width="600"/>

## Configure KELA RaDark in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/kela-radark-configuration.png')} style={{border:'1px solid gray'}} alt="KELA RaDark configuration" width="400"/>

For information about KELA, see [KELA documentation](https://docs.ke-la.com/kela-docs).

## Change Log

* July 3, 2023 (v1.1) - Updated the integration with Environmental Variables
