---
title: IP-API
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/ip-api.png')} alt="ip-api" width="90"/>

***Version: 1.1  
Updated: Jul 05, 2023***

The integration with IP-API allows users to lookup any IP address. IP-API is IP Geolocation API.

## Actions

* **Lookup IPs** *(Enrichment)* - Lookup any IP address.

## IP-API configuration

1. To configure IP-API, log in to [IP-API](https://members.ip-api.com/) with your e-mail and password. 
1. In the main page, click on the section Manage API Keys.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ip-api/ip-api-1.png')} style={{border:'1px solid gray'}} alt="ip-api" width="600"/>
1. Copy the API key and save it (temporarily) in a text editor. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ip-api/ip-api-2.png')} style={{border:'1px solid gray'}} alt="ip-api" width="600"/>

## Configure IP-API in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.
1. Populate all the required fields (\*) and then click **Save**:
   * **Label**. The name of the resource.
   * **Host**. 'https://pro.ip-api.com'/.
   * **API Key**. The API Key copied earlier.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ip-api/ip-api-6.png')} style={{border:'1px solid gray'}} alt="ip-api" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ip-api/ip-api-7.png')} style={{border:'1px solid gray'}} alt="ip-api" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ip-api/ip-api-8.png')} style={{border:'1px solid gray'}} alt="ip-api" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ip-api/ip-api-9.png')} style={{border:'1px solid gray'}} alt="ip-api" width="400"/>

## Change Log

* December 15, 2021 - First upload
* July 5, 2023 (v1.1) - Updated the integration with Environmental Variables
