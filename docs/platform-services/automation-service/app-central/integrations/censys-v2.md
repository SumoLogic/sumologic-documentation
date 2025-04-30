---
title: Censys V2
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/censys.png')} alt="censys" width="100"/>

***Version: 2.2  
Updated: Jul 07, 2023***

Censys reduces your Internet attack surface by continually discovering unknown assets and helping remediate Internet facing risks.   

## Actions

* **Search** (*Enrichment*) - Returns previews of hosts matching a specified search query search.
* **Aggregate Hosts** (*Enrichment*) - Returns aggregation of hosts that match the given query string aggregation.
* **View IP** (*Enrichment*) - Returns host information for the specified IP address.
* **View Certificate** (*Enrichment*) - Returns a list of hosts presenting the given certificate.

## Configure Censys V2 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about Censys V2, see [Censys documentation](https://docs.censys.com/docs).

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.
1. Populate all the required fields (\*):
   * **Label**. Name of the resource.
   * **URL**. URL of Censys V2 (example URL: [https://search.censys.io](https://search.censys.io/api)).
   * **User ID**
   * **User Secret** <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/censys-v2/censys-v2-4.png')} style={{border:'1px solid gray'}} alt="censys" width="400"/>
1. Then click **Save**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/censys-v2/censys-v2-5.png')} style={{border:'1px solid gray'}} alt="censys" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/censys-v2/censys-v2-6.png')} style={{border:'1px solid gray'}} alt="censys" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/censys-v2/censys-v2-7.png')} style={{border:'1px solid gray'}} alt="censys" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/censys-v2/censys-v2-8.png')} style={{border:'1px solid gray'}} alt="censys" width="400"/>

## Change Log

* February 14, 2022 - First upload
* July 7, 2023 (v2.2)
	+ Updated the integration with Environmental Variables
	+ Integration renamed from Censys 2.0 to Censys V2
