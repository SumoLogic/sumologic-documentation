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

   * **Label**. The name for the resource.
   * **URL API**. Certego URL API. Default: `https://panoptikon.certego.net/`.
   * **Username**. Your Certego username.
   * **Password**. Your Certego password. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/certego-configuration.png')} style={{border:'1px solid gray'}} alt="Certego configuration" width="400"/>

For information about Certego, see the [Certego website](https://www.certego.net/).

## Change Log

* October 25, 2022 - First upload
* March 29, 2023 - Integration refactored.
* July 11, 2023 (v1.2) - Removed leading/trailing spaces
