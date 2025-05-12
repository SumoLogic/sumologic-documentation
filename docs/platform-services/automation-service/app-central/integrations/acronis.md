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

   * **Label**. The desired name for the resource.
   * **URL**. Your Acronis Data Center URL you copied earlier from Acronis. Default: 'https://cloud.acronis.com'/ .
   * **Client ID**. Your Acronis Client ID you copied earlier from Acronis.
   * **Client Secret**. Your Acronis Secret you copied earlier from Acronis. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/acronis-configuration.png')} style={{border:'1px solid gray'}} alt="Acronis configuration" width="400"/>

For information about Acronis, see [Acronis documentation](https://developer.acronis.com/doc/).

## Change Log

* July 26, 2022 - First upload
* July 3, 2023 (v1.1) - Updated the integration with Environmental Variables
