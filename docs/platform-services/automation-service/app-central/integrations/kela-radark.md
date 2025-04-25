---
title: Kela RaDark
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
* **Update Kela RaDark Incident** *(Containment)* - Updating an Incident.

## Kela RaDark configuration

1. Sign in **Kela RaDark** using your username and password.
2. The API token can be generated through the RADARK UI, under the user menu - Generate Api Key.
3. Make sure you copy and save the api token.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/kela-radark/kela-radark-1.png')} style={{border:'1px solid gray'}} alt="kela-radark" width="600"/>

## Configure Kela RaDark in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/kela-radark/kela-radark-4.png')} style={{border:'1px solid gray'}} alt="kela-radark" width="400"/>
1. Populate all the required fields (\*).
1. In the API Key field, insert the previously copied key.
1. Click **Save**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/kela-radark/kela-radark-5.png')} style={{border:'1px solid gray'}} alt="kela-radark" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/kela-radark/kela-radark-6.png')} style={{border:'1px solid gray'}} alt="kela-radark" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/kela-radark/kela-radark-7.png')} style={{border:'1px solid gray'}} alt="kela-radark" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/kela-radark/kela-radark-8.png')} style={{border:'1px solid gray'}} alt="kela-radark" width="400"/>


## Change Log

* July 3, 2023 (v1.1) - Updated the integration with Environmental Variables
