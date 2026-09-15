---
title: Intel 471
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/intel-471.png')} alt="intel" width="80"/>

***Version: 1.3  
Updated: September 15, 2026***

Intel 471 provides comprehensive coverage of the criminal underground, SaaS platform which exposes locally sourced human-driven, automation-enabled insights to gain broad coverage and monitor the threats.

## Actions

* **List Alerts** *(Enrichment)* - Returns list of Alerts matching filter criteria excluding the following types: Malware reports, YARA.
* **Search IOC** *(Enrichment)* - Returns list of Indicators of compromise matching filter criteria.
* **Stream Malware Intelligence Indicators** *(Enrichment)* - Returns list of Indicators matching filter criteria.

## Intel 471 configuration

1. Sign in to the Intel 471 Verity portal at [api.intel471.cloud](https://api.intel471.cloud).
2. Navigate to your profile settings.
3. Locate your **Client ID** and **Client Secret**.
4. Copy the **Client ID** and **Client Secret** for use below.

## Configure Intel 471 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your Intel 471 Verity URL, for example, `https://api.intel471.cloud`

* **Client ID**. Enter the [Client ID copied above](#intel-471-configuration).

* **Client Secret**. Enter the [Client Secret copied above](#intel-471-configuration).
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>
   
<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/intel-471-configuration.png')} style={{border:'1px solid gray'}} alt="Intel 471 configuration" width="400"/>

For information about Intel 471, see the [Intel 471 website](https://intel471.com/resources). The Intel 471 documentation is not public and can only be accessed by partners or customers.

## Category

Threat Intelligence-Reputation

## Change log

| Version | Date               | Description |
|:--------|:-------------------|:--|
| v1.3    | September 15, 2026 | Migrated the Intel 471 integration to the new Verity API, updating the Stream Malware Intelligence Indicators, Search IOC, and List Alerts actions to use the latest API endpoints. |
| v1.2    | April 29, 2026     | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.1    | July 6, 2023       | Updated the integration with Environmental Variables. |
| v1.0    | May 23, 2022       | First upload. |

## Additional resources

For Intel 471, Sumo Logic offers the [Intel 471 Threat Intel source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/intel471-threat-intel-source/) to collect your Intel 471 data.