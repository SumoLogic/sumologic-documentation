---
title: Snort
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/snort.png')} alt="snort" width="60"/>

***Version: 1.1  
Updated: Jul 18, 2023***

The Snort is a free open source network intrusion detection system and intrusion prevention system.

## Actions

* **IP Blocklist** *(Enrichment)* - Fetch IP indicators from Snort.

## Configure Snort in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/snort/snort-3.png')} style={{border:'1px solid gray'}} alt="snort" width="700"/>
1. Populate all the required fields (\*) and then click **SAVE**.
   * **URL**. 'https://www.snort.org'. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/snort/snort-4.png')} style={{border:'1px solid gray'}} alt="snort" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/snort/snort-5.png')} style={{border:'1px solid gray'}} alt="snort" width="400"/>
1. Click **Test**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/snort/snort-6.png')} style={{border:'1px solid gray'}} alt="snort" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/snort/snort-7.png')} style={{border:'1px solid gray'}} alt="snort" width="400"/>

## Change Log

* December 13, 2022 - First upload
* July 18, 2023 (v1.1) - Removed leading/trailing spaces
