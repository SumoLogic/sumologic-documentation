---
title: Snort
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/snort.png')} alt="snort" width="60"/>

***Version: 1.2  
Updated: April 30, 2026***

The Snort is a free open source network intrusion detection system and intrusion prevention system.

## Actions

* **IP Blocklist** *(Enrichment)* - Fetch IP indicators from Snort.

## Configure Snort in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your Snort URL, for example, `https://www.snort.org`.
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/snort-configuration.png')} style={{border:'1px solid gray'}} alt="Snort configuration" width="400"/>

For information about Snort, see [Snort documentation](https://www.snort.org/documents).

## Change Log

* December 13, 2022 - First upload
* July 18, 2023 (v1.1) - Removed leading/trailing spaces
* April 30, 2026 (v1.2) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
