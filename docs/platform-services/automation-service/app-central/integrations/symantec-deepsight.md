---
title: Symantec DeepSight
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/symantec-deepsight.png')} alt="Symantec DeepSight icon" width="100"/>

***Version: 1.2  
Updated: April 30, 2026***

Gather threat intelligence data from Symantec DeepSight for incident investigation.

## Actions

* **Malware Information** (*Enrichment*) - Gather malware information from DeepSight.
* **File Reputation** (*Enrichment*) - Gather file reputation information from DeepSight.
* **URL Reputation** (*Enrichment*) - Gather URL reputation information from DeepSight.
* **Domain Reputation** (*Enrichment*) - Gather domain reputation information from DeepSight.
* **IP Reputation** (*Enrichment*) - Gather IP reputation information from DeepSight.

## Configure Symantec DeepSight in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API Key**. Enter your Symantec DeepSight API key.

* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/symantec-deepsight-configuration.png')} style={{border:'1px solid gray'}} alt="Symantec DeepSight configuration" width="400"/>

For information about Symantec, see [Symantec documentation](https://techdocs.broadcom.com/us/en/symantec-security-software.html).

## Change Log

* July 29, 2019 - First upload
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables
* April 30, 2026 (v1.2) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
