---
title: Certego
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/certego.png')} alt="certego" width="100"/>

***Version: 1.2  
Updated: Jul 11, 2023***

Certego Managed services for breach detection, cyber security, and response to threats and intrusions.

## Actions

* **Search Tickets** *(Enrichment)* - Retrieve Tickets/Incidents.
* **Get Ticket Details** *(Enrichment)* - Retrieves full details for a particular ticket.
* **Certego Tickets Daemon** *(Daemon)* - Automatically retrieve new tickets.

  
## Configure Certego in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('img/platform-services/automation-service/app-central/integrations/certego/certego-3.png')} style={{border:'1px solid gray'}} alt="certego" width="600"/>
1. Populate all the required fields (\*) and then click **Save**.
   * **Label**. The name for the resource.
   * **URL API**. Certego URL API. Default: `https://panoptikon.certego.net/`.
   * **Username**. Your Certego username.
   * **Password**. Your Certego password. <br/><img src={useBaseUrl('img/platform-services/automation-service/app-central/integrations/certego/certego-4.png')} style={{border:'1px solid gray'}} alt="certego" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('img/platform-services/automation-service/app-central/integrations/certego/certego-5.png')} style={{border:'1px solid gray'}} alt="certego" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('img/platform-services/automation-service/app-central/integrations/certego/certego-6.png')} style={{border:'1px solid gray'}} alt="certego" width="400"/> 
1. You should receive a successful notification in the bottom right corner. <br/><img src={useBaseUrl('img/platform-services/automation-service/app-central/integrations/certego/certego-7.png')} style={{border:'1px solid gray'}} alt="certego" width="400"/>

## Change Log

* October 25, 2022 - First upload
* March 29, 2023 - Integration refactored.
* July 11, 2023 (v1.2) - Removed leading/trailing spaces
