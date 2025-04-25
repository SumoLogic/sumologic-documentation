---
title: SecurityTrails
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/securitytrails.png')} alt="securitytrails" width="100"/>

***Version: 1.1  
Updated: Jul 18, 2023***

SecurityTrails is a total inventory that curates comprehensive domain and IP address data for users and applications that demand clarity. By combining current and historic data of all Internet assets, SecurityTrails is the proven solution for 3rd-party risk assessment, attack surface reduction and threat hunting.

## Actions

* **List Subdomains** *(Enrichment)* - Returns child and sibling subdomains for a given hostname.

## Configure SecurityTrails in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row. The integration details will appear.Click on the **"+"** button to add new Resource.
1. Populate all the required fields (\*) and then click **SAVE**.  
   * **Label**. The desired name for the resource.
   * **URL**. The SecurityTrails API URL. Default: `https://api.securitytrails.com`.
   * **API Key**. Your SecurityTrails API Key.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/securitytrails/securitytrails-3.png')} style={{border:'1px solid gray'}} alt="securitytrails" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/securitytrails/securitytrails-4.png')} style={{border:'1px solid gray'}} alt="securitytrails" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/securitytrails/securitytrails-5.png')} style={{border:'1px solid gray'}} alt="securitytrails" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/securitytrails/securitytrails-6.png')} style={{border:'1px solid gray'}} alt="securitytrails" width="400"/>

## Change Log

* November 28, 2022 - First upload
* December 13, 2022 - Refactoring
* July 18, 2023 (v1.1) - Removed leading/trailing spaces
