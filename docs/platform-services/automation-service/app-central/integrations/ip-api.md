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

   * **Label**. The name of the resource.
   * **Host**. 'https://pro.ip-api.com'/.
   * **API Key**. The API Key copied earlier.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/ip-api-configuration.png')} style={{border:'1px solid gray'}} alt="IP-API configuration" width="400"/>

For information about IP-API, see [IP-API documentation](https://ip-api.com/docs/).

## Change Log

* December 15, 2021 - First upload
* July 5, 2023 (v1.1) - Updated the integration with Environmental Variables
