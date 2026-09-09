---
title: Certego
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/certego.png')} alt="certego" width="100"/>

***Version: 1.3  
Updated: April 27, 2026***

Certego Managed services for breach detection, cyber security, and response to threats and intrusions.

## Actions

* **Search Tickets** *(Enrichment)* - Retrieve Tickets/Incidents.
* **Get Ticket Details** *(Enrichment)* - Retrieves full details for a particular ticket.
* **Certego Tickets Daemon** *(Daemon)* - Automatically retrieve new tickets.

  
## Configure Certego in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL API**. Enter the Certego URL API. The default value is `https://panoptikon.certego.net/`

* **Username**. Enter the username of a Certego admin user authorized to authenticate the integration.

* **Password**. Enter the password for the Certego admin user.
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/certego-configuration.png')} style={{border:'1px solid gray'}} alt="Certego configuration" width="400"/>

For information about Certego, see the [Certego website](https://www.certego.net/).

## Change Log

* October 25, 2022 - First upload
* March 29, 2023 - Integration refactored.
* July 11, 2023 (v1.2) - Removed leading/trailing spaces
* April 27, 2026 (v1.3) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
