---
title: Cybereason
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cybereason.png')} alt="cybereason" width="100"/>

***Version: 1.2  
Updated: April 29, 2026***

Query Cybereason, set item reputations and work with isolation rules.

## Actions

* **Get Isolation Rules** (*Enrichment*) - Get isolation rules matching the query.
* **Get Items Reputation** (*Enrichment*) - Get items reputation.
* **List Endpoints** (*Enrichment*) - List all endpoints matching the query.
* **Create Isolation Rules** (*Containment*) - Create a new isolation rule.
* **Delete Isolation Rules** (*Containment*) - Delete an existing isolation rule.
* **Set Item Reputation** (*Containment*) - Set the reputation for an item.
* **Update Isolation Rules** (*Containment*) - Update an existing isolation rule.

## Configure Cybereason in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Username**. Enter the username of a Cybereason admin user authorized to provide authentication for the integration.
* **Password**. Enter the password for the admin user.
* **Server URL**. Enter your Cybereason server URL.
* **Port**. Enter your Cybereason port.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cybereason/cybereason-configuration.png')} style={{border:'1px solid gray'}} alt="Cybereason configuration" width="400"/>

For information about Cybereason, see the [Cybereason website](https://www.cybereason.com/).

## Change Log

* December 17, 2018 - First upload
* July 3, 2023 (v1.1) - Updated the integration with Environmental Variables
* April 29, 2026 (v1.2) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
