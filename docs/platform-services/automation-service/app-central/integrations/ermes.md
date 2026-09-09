---
title: Ermes
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/ermes.png')} alt="ermes" width="100"/>

***Version: 1.2  
Updated: April 29, 2026***

Ermes Intelligent Web Protection offers dynamic web threat protection based on the reputation of web pages and their behaviour.

## Actions

* **List All Events** (*Enrichment*) - Get Paginated Event Logs Using OAuth Token.

## Configure Ermes in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your Ermes URL.

* **Client ID**. Enter an Ermes client ID.

* **Client Secret** Enter the secret for the Ermes client ID.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>
   
<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/ermes-configuration.png')} style={{border:'1px solid gray'}} alt="Ermes configuration" width="400"/>

For information about Ermes, see the [Ermes website](https://www.ermes.company/).

## Change Log

* June 21, 2022 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
* April 29, 2026 (v1.2) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
