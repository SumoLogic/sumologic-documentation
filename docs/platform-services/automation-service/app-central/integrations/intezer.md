---
title: Intezer
description: ''
tags: []
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/intezer.png')} alt="ip-api" width="90"/>

***Version: 1.1  
Updated: Jul 07, 2023***

Intezer is a platform that provides automated, algorithm-driven Tier 1 services with little to no human supervision. Intezer connects to your alert pipelines collecting data to offer advice and automatically triage, respond, and hunt.

## Actions

* **Analyze File** (*Enrichment*) - Submit a file to be analyzed.
* **Analyze Hash** (*Enrichment*) - Submit a hash to be analyzed.
* **Get Analysis** (*Enrichment*) - Retrieve summary of the analysis of an uploaded file, memory module, or hash.

## Intezer in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click **Automation**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/intezer/intezer-1.png')} style={{border:'1px solid gray'}} alt="intezer" width="400"/>
1. In the Automation section, on the left menu, click **Integrations**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/intezer/intezer-2.png')} style={{border:'1px solid gray'}} alt="intezer" width="400"/>
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/intezer/intezer-3.png')} style={{border:'1px solid gray'}} alt="intezer" width="400"/>
1. Populate all the required fields (\*)
   * **Label**. Your Resource Label.
   * **API Key**. Your API Key.
1. Click **Save**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/intezer/intezer-4.png')} style={{border:'1px solid gray'}} alt="intezer" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/intezer/intezer-5.png')} style={{border:'1px solid gray'}} alt="intezer" width="400"/>
1. Click **Test**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/intezer/intezer-6.png')} style={{border:'1px solid gray'}} alt="intezer" width="300"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/intezer/intezer-7.png')} style={{border:'1px solid gray'}} alt="intezer" width="400"/>

## Change Log

* June 28, 2022 - First upload
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables
