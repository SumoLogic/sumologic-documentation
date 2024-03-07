---
title: Arcanna
description: ''
tags: []
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/arcanna.png')} alt="apivoid" width="90"/>

***Version: 1.1  
Updated: Jul 18, 2023***

Arcanna enables experts to train context-aware AI models which encompass their knowledge and experience both in terms of cybersecurity and organizational distinctiveness. All without writing a single line of code.

## Actions

* **Get Jobs** *(Enrichment)* - The lists the AI jobs.
* **Get Decision** *(Enrichment)* - Retrieve the event decision.
* **Get System Health** *(Enrichment)* - Retrieve system health.
* **Send Event** *(Containment)* - Send an event to Arcanna.
* **Send Feedback** *(Containment)* - Updates the feedback on the event.

## Arcanna Elements configuration

Log in to Arcanna platform using your credentials login on Arcanna AI using [this](https://elements.withsecure.com/) url.

## Arcanna in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/arcanna/arcanna-1.png')} style={{border:'1px solid gray'}} alt="arcanna-1" width="400"/>
1. In the Automation section, on the left menu, click Integrations.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/arcanna/arcanna-2.png')} style={{border:'1px solid gray'}} alt="arcanna-2" width="400"/>
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/arcanna/arcanna-3.png')} style={{border:'1px solid gray'}} alt="arcanna-3" width="800"/>
1. Populate all the required fields (\*) and then click **SAVE**.
   * **Label**. The name for the resource.
   * **URL**. The base API URL for Arcanna.
   * **Api Key**. Previously created Api Key.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/arcanna/arcanna-4.png')} style={{border:'1px solid gray'}} alt="arcanna-4" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/arcanna/arcanna-5.png')} style={{border:'1px solid gray'}} alt="arcanna-5" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/arcanna/arcanna-6.png')} style={{border:'1px solid gray'}} alt="arcanna-6" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/arcanna/arcanna-7.png')} style={{border:'1px solid gray'}} alt="arcanna-7" width="400"/>

## Category

Threat Intelligence-Reputation

## Change Log

* March 24, 2023 - First upload
* July 18, 2023 (v1.1) - Removed leading/trailing spaces
