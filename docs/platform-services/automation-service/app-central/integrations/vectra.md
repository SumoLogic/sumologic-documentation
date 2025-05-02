---
title: Vectra
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/vectra.png')} alt="vectra" width="80"/>

***Version: 1.1  
Updated: Jul 07, 2023***

The integration with Vectra allows users to retrieve information about detections, hosts, accounts sensor info, system health info and do an advanced search.

Vectra AI detects and prioritises high-fidelity alerts in real time and responds with automated enforcement or alerts to security personnel. Security teams use this information for threat hunting and retrospective investigations via a subscription service.

## Actions

* **List Detections** (*Enrichment*) - Security detection events.
* **List Hosts** (*Enrichment*) - Host information.
* **List Accounts** (*Enrichment*) - List accounts.
* **Get Detection** (*Enrichment*) - Detection Information.
* **Get Host** (*Enrichment*) - Host information.
* **Advanced Search** (*Enrichment*) - Advanced search on hosts, accounts, and detections.
* **Sensors Info** (*Enrichment*) - Sensor information.
* **System Health Info** (*Enrichment*) - System Health information.

## Vectra configuration

1. Sign in to [Vectra](https://apitest.vectracloudlab.com). 
1. In the main page, click on the section **My Profile**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vectra/vectra-1.png')} style={{border:'1px solid gray'}} alt="vectra" width="200"/>
1. Click on the copy button in API Token (or click generate a new token and then copy button).   

## Configure Vectra in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about Vectra, see [Vectra documentation.](https://support.vectra.ai/vectra/knowledge)

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.
1. Populate all the required fields (\*) and then click **SAVE**. Populate all the required fields:   
   * **Label**. The name of the resource.
   * **Host**. 'https://apitest.vectracloudlab.com/api/v2.2/'   
   * **Token**. API Token copied earlier.
1. Click **SAVE**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vectra/vectra-5.png')} style={{border:'1px solid gray'}} alt="vectra" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vectra/vectra-6.png')} style={{border:'1px solid gray'}} alt="vectra" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vectra/vectra-7.png')} style={{border:'1px solid gray'}} alt="vectra" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/vectra/vectra-8.png')} style={{border:'1px solid gray'}} alt="vectra" width="400"/>

## Change Log

* December 15, 2021 - First upload
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables
