---
title: Acronis
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/acronis.png')} alt="acronis" width="90"/>

***Version: 1.1  
Updated: Jul 03, 2023***

Acronis develops on-premises and cloud software with integration of backup, disaster recovery, cybersecurity, and endpoint management. It offers a web-based management console that provides infrastructure-utilization insights and allows remote management of backups from any browser on any device, including tablets and smartphones.

## Actions

* **Fetch All Alerts** (*Enrichment*) - Retrieve all alerts by optional filtering parameters.

## Acronis configuration

Follow these steps to get your API key from Arconis.

1. Select **Manage account** from the dashboard. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/acronis/acronis-1.png')} style={{border:'1px solid gray'}} alt="acronis-1" width="400"/>
1. From the **SETTINGS** select **API clients**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/acronis/acronis-2.png')} style={{border:'1px solid gray'}} alt="acronis-2" width="400"/>
1. Click **+ Create API Client** and enter a name.  <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/acronis/acronis-3.png')} style={{border:'1px solid gray'}} alt="acronis-3" width="400"/> <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/acronis/acronis-4.png')} style={{border:'1px solid gray'}} alt="acronis-4" width="400"/>
1. Copy and save the Client ID, Secret, and Data center URL.  <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/acronis/acronis-5.png')} style={{border:'1px solid gray'}} alt="acronis-5" width="400"/>

## Configure Acronis in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/acronis/acronis-8.png')} style={{border:'1px solid gray'}} alt="acronis-8" width="600"/>
1. Populate all the required fields (\*):
   * **Label**. The desired name for the resource.
   * **URL**. Your Acronis Data Center URL you copied earlier from Acronis. Default: 'https://cloud.acronis.com'/ .
   * **Client ID**. Your Acronis Client ID you copied earlier from Acronis.
   * **Client Secret**. Your Acronis Secret you copied earlier from Acronis. 
1. Click **SAVE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/acronis/acronis-9.png')} style={{border:'1px solid gray'}} alt="acronis-9" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/acronis/acronis-10.png')} style={{border:'1px solid gray'}} alt="acronis-10" width="400"/>
1. Click **TEST**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/acronis/acronis-11.png')} style={{border:'1px solid gray'}} alt="acronis-11" width="300"/>
1. You should receive a successful notification in the bottom right corner. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/acronis/acronis-12.png')} style={{border:'1px solid gray'}} alt="acronis-12" width="400"/>

## Change Log

* July 26, 2022 - First upload
* July 3, 2023 (v1.1) - Updated the integration with Environmental Variables
