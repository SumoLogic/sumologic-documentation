---
title: IP Quality Score
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/ip-quality-score.png')} alt="IP Quality Score icon" width="100"/>

***Version: 1.3  
Updated: April 29, 2026***

Perform threat intelligence evidence gathering with IPQualityScore.

## Actions

* **Email Reputation** *(Enrichment)* - Gather Email reputation information from IP Quality Score.
* **Get Credit Usage** *(Enrichment)* - Gather Credit usage information from IP Quality Score.
* **IP Reputation** *(Enrichment)* - Gather IP reputation information from IP Quality Score.
* **URL Reputation** *(Enrichment)* - Gather URL reputation information from IP Quality Score.

## Configure IPQualityScore in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your IPQualityScore API URL, for example, `https://www.ipqualityscore.com/`

* **API Key**. Enter an IPQualityScore API key.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/ip-quality-score-configuration.png')} style={{border:'1px solid gray'}} alt="IPQualityScore configuration" width="400"/>

For information about IPQualityScore, see [IPQualityScore documentation](https://www.ipqualityscore.com/documentation/overview).

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.3 | April 29, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.2 | January 29, 2024 | <ul><li>Added new actions: **Email Reputation** and **URL Reputation**.</li><li>Renamed the **Get Credit Usage API** action to **Get Credit Usage**.</li><li>Refactored the code.</li><li>Refined labels and hints.</li><li>Extended output mapping with examples.</li><li>Added a link to the API doc in the source code.</li><li>Resized the logo.</li></ul> |
| v1.1 | July 5, 2023 | Updated the integration with Environmental Variables. |
| | September 18, 2020 | Initial release of the IP Quality Score integration. |
