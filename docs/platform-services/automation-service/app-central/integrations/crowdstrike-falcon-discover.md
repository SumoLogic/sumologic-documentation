---
title: CrowdStrike Falcon Discover
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/crowdstrike-falcon-discover.png')} alt="crowdstrike-falcon-intelligence" width="100"/>

***Version: 1.1  
Updated: Jul 03, 2023***

**CrowdStrike Falcon Discover** allows to quickly identify and eliminate malicious or noncompliant activity by providing unmatched real-time visibility into the devices, users, and applications in your network.
* **Search Logins** *(Enrichment)* - Search for logins in your environment.
* **Search Accounts** *(Enrichment)* - Search for accounts in your environment.
* **Search Applications** *(Enrichment)* - Search for applications in your environment.
* **Search Assets** *(Enrichment)* - Search for assets in your environment.
* **Get Logins** *(Enrichment)* - Get details on logins.
* **Get Accounts** *(Enrichment)* - Get details on accounts.
* **Get Applications** *(Containment)* - Get details on applications.
* **Get Assets** *(Containment)* - Get details on assets.

## Configure CrowdStrike Falcon Discover in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/crowdstrike-falcon-discover/crowdstrike-falcon-discover-3.png')} style={{border:'1px solid gray'}} alt="crowdstrike-falcon-discover" width="600"/>
1. Populate all the required fields (\*) and then click **Save**.
   * **Label**. The desired name for the resource.
   * **API URL**. `https://api.crowdstrike.com`.
   * **Client ID**. The unique identifier of the API client.
   * **Client Secret**. A secret code for an API client.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/crowdstrike-falcon-discover/crowdstrike-falcon-discover-4.png')} style={{border:'1px solid gray'}} alt="crowdstrike-falcon-discover" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/crowdstrike-falcon-discover/crowdstrike-falcon-discover-5.png')} style={{border:'1px solid gray'}} alt="crowdstrike-falcon-discover" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/crowdstrike-falcon-discover/crowdstrike-falcon-discover-6.png')} style={{border:'1px solid gray'}} alt="crowdstrike-falcon-discover" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/crowdstrike-falcon-discover/crowdstrike-falcon-discover-7.png')} style={{border:'1px solid gray'}} alt="crowdstrike-falcon-discover" width="400"/>

## Note

Refer to [Falcon documentation](https://falcon.crowdstrike.com/documentation/45/falcon-query-language-fql) to know more on creating FQL Query Filter.

## Change Log

* March 16, 2023 (v1.0) - First upload
* July 3, 2023 (v1.1) - Removed leading/trailing spaces
