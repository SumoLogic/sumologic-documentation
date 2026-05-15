---
title: IBM MSS Tickets
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/ibm-mss-tickets.png')} alt="IBM MSS Tickets icon" width="100"/>

***Version: 1.2  
Updated: April 29, 2026***

Create, update and gather IBM MSS tickets information.

## Actions

* **Get Tickets** (*Enrichment*) - Get tickets from IBM MSS.
* **Create Ticket** (*Notification*) - Get tickets from IBM MSS.
* **Update Ticket** (*Notification*) - Get tickets from IBM MSS.
* **IBM MSS Tickets Daemon** (*Daemon*) - Automatically pull tickets from MSS.

## Configure IBM MSS Tickets in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Authentication Token**. Enter an IBM MSS [token](https://cloud.ibm.com/docs/key-protect?topic=key-protect-retrieve-access-token).

* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/ibm-mss-configuration.png')} style={{border:'1px solid gray'}} alt="GreyNoise configuration" width="400"/>

For information about IBM MSS, see the [IBM Managed Security Service website](https://www.ibm.com/services/managed-security).

## Change Log

* May 5, 2019 - First upload
* February 8, 2021 - Updated action: Update Ticket
* July 11, 2023 (v1.1) - Updated the integration with Environmental Variables
* April 29, 2026 (v1.2) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
