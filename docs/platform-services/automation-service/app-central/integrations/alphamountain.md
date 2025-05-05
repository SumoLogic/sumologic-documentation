---
title: alphaMountain
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/alphamountain.png')} alt="alienvault-otx" width="100"/>

***Version: 1.1  
Updated: Sep 28, 2023***

alphaMountain provides up-to-date domain and IP intelligence for cybersecurity investigational and protection platforms.

## Actions

* **Get Categories** (*Enrichment*) - Get categories for an internet URI/URL.
* **Get Threat Score** (*Enrichment*) - Return a threat score for an internet URL.
* **Get Possible Impersonations** (*Enrichment*) - Get possible impersonations for a URI/URL.
* **Get Remaining Quota** (*Enrichment*) - Fetch remaining quota.
* **Get Popularity** (*Enrichment*) - Return the popularity in the last 24 hours of a given hostname or domain name as an integer.

## alphaMountain Configuration

In order to get a free trial please visit [https://www.alphamountain.ai/contact/](https://www.alphamountain.ai/contact/) to get your license key.

## Configure alphaMountain in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about alphaMountain, see [alphaMountain documentation](https://www.alphamountain.ai/api/).

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/alphamountain/alphamountain-3.png')} style={{border:'1px solid gray'}} alt="alphamountain-3" width="400"/>
1. Populate all the required fields (\*):
   * **URL**. alphaMountain API URL. Default: 'https://api.alphamountain.ai'
   * **License Key**. Your License Key for alphaMountain.
1. Click **SAVE**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/alphamountain/alphamountain-4.png')} style={{border:'1px solid gray'}} alt="alphamountain-4" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/alphamountain/alphamountain-5.png')} style={{border:'1px solid gray'}} alt="alphamountain-5" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/alphamountain/alphamountain-6.png')} style={{border:'1px solid gray'}} alt="alphamountain-6" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/alphamountain/alphamountain-7.png')} style={{border:'1px solid gray'}} alt="alphamountain-7" width="400"/>

## Category

Threat Intelligence-Reputation

## Change Log

* June 21, 2022 - First upload
* September 15, 2022
	+ Changed integration name in alphaMountain
	+ Updated integration guide
	+ Changed action name: Get Likely Impersonations -> Get Possible Impersonations
	+ Updated tableview for Get Categories and Get Threat Score
* June 26, 2023 (v1.1) - Updated the integration with Environmental Variables
