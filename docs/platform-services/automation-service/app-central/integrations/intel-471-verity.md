---
title: Intel 471 Verity
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/intel-471.png')} alt="Intel 471 Verity icon" width="80"/>

***Version: 1.0  
Updated: September 16, 2026***

[Intel 471 Verity](https://www.intel471.com/platform/cyber-threat-intelligence) is a threat intelligence platform that delivers streaming malware and indicator intelligence through the Verity API. It uses Client ID and Client Secret authentication to provide access to real-time indicator streams for threat detection and response.

## Actions

* **Stream Malware Intelligence Indicators** *(Enrichment)*. Returns a list of malware intelligence indicators matching filter criteria from the Intel 471 Verity stream.

## Intel 471 Verity configuration

1. Sign in to the Intel 471 Verity portal at [api.intel471.cloud](https://api.intel471.cloud).
2. Navigate to your profile settings.
3. Locate your **Client ID** and **Client Secret**.
4. Copy the **Client ID** and **Client Secret** for use below.

## Configure Intel 471 Verity in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your Intel 471 Verity URL, for example, `https://api.intel471.cloud`
* **Client ID**. Enter the [Client ID copied above](#intel-471-verity-configuration).
* **Client Secret**. Enter the [Client Secret copied above](#intel-471-verity-configuration).
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/intel-471-verity-configuration.png')} style={{border:'1px solid gray'}} alt="Intel 471 Verity configuration" width="400"/>

For information about Intel 471, see the [Intel 471 website](https://intel471.com/resources). The Intel 471 documentation is not public and can only be accessed by partners or customers.

## Category

Threat Intelligence-Reputation

## Change log

| Version | Date | Description |
|:--|:--|:--|
| v1.0 | September 16, 2026 | First upload. New integration using the Intel 471 Verity stream API with Client ID and Client Secret authentication. |

## Additional resources

For Intel 471, Sumo Logic offers the [Intel 471 Threat Intel source](/docs/send-data/hosted-collectors/cloud-to-cloud-integration-framework/intel471-threat-intel-source/) to collect your Intel 471 data.
