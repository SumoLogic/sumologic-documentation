---
title: Ermes
description: ''
tags: []
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/ermes.png')} alt="ermes" width="100"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Ermes Intelligent Web Protection offers dynamic web threat protection based on the reputation of web pages and their behaviour.

## Actions

* **List All Events** (*Enrichment*) - Get Paginated Event Logs Using OAuth Token.

## Ermes in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click **Automation**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ermes/ermes-1.png')} style={{border:'1px solid gray'}} alt="ermes" width="400"/>
1. In the Automation section, on the left menu, click **Integrations**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ermes/ermes-2.png')} style={{border:'1px solid gray'}} alt="ermes" width="400"/>
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ermes/ermes-3.png')} style={{border:'1px solid gray'}} alt="ermes" width="400"/>
1. Populate all the required fields (\*):
   * **Client ID**. Your client\_id.
   * **Client Secret**. Your client\_secret.
1. Click **Save**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ermes/ermes-4.png')} style={{border:'1px solid gray'}} alt="ermes" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ermes/ermes-5.png')} style={{border:'1px solid gray'}} alt="ermes" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ermes/ermes-6.png')} style={{border:'1px solid gray'}} alt="ermes" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ermes/ermes-7.png')} style={{border:'1px solid gray'}} alt="ermes" width="400"/>

## Change Log

* June 21, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
