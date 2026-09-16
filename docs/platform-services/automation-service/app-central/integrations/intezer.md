---
title: Intezer
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/intezer.png')} alt="Intezer icon" width="90"/>

***Version: 1.2  
Updated: April 29, 2026***

Intezer is a platform that provides automated, algorithm-driven Tier 1 services with little to no human supervision. Intezer connects to your alert pipelines collecting data to offer advice and automatically triage, respond, and hunt.

## Actions

* **Analyze File** (*Enrichment*) - Submit a file to be analyzed.
* **Analyze Hash** (*Enrichment*) - Submit a hash to be analyzed.
* **Get Analysis** (*Enrichment*) - Retrieve summary of the analysis of an uploaded file, memory module, or hash.

## Configure Intezer in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter you Intezer URL.

* **API Key**. Enter your Intezer [API key](https://intezer.com/blog/api-intezer-analyze-community/).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/intezer-configuration.png')} style={{border:'1px solid gray'}} alt="Intezer configuration" width="400"/>

For information about Intezer, see the [Intezer website](https://intezer.com/resource-center/).

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.2 | April 29, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.1 | July 7, 2023 | Updated the integration with Environmental Variables. |
| v1.0 | June 28, 2022 | Initial release of the Intezer integration. |
