---
title: Pulsedive
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/pulsedive.png')} alt="pulsedive" width="100"/>

***Version: 1.2  
Updated: April 30, 2026***

Pulsedive is a free analyst-centric threat intelligence platform that offers comprehensive, enriched threat intelligence from user submissions and threat intelligence feeds, equating to over 5 million IOCs searchable at pulsedive.com.

## Actions

* **IP Reputation** (*Enrichment*) - Gather reputation information for a specific IP.
* **URL Reputation** (*Enrichment*) - Gather reputation information for a specific URL.
* **Domain Reputation** (*Enrichment*) - Gather reputation information for a specific domain.
* **Get Threat details** (*Enrichment*) - Get Threat details by Threat ID or by Threat name.
* **Add to Queue** (*Containment*) - Adding the indicator to the queue for processing (scanning).
* **Retrieve Result from Queue** (*Enrichment*) - Gather information on a specific indicator (value).

## Configure Pulsedive in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your Pulsedive URL.

* **API Key**. Enter a Pulsedive [API key](https://pulsedive.com/api/).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/pulsedive-configuration.png')} style={{border:'1px solid gray'}} alt="Pulsedive configuration" width="400"/>

For information about Pulsedive, see [Pulsedive documentation](https://pulsedive.com/api/).

## Change Log

* March 9, 2021 - First upload
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables
* April 30, 2026 (v1.2) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
