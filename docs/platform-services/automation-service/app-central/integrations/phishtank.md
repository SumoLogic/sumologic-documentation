---
title: PhishTank
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/phishtank.png')} alt="phishtank" width="100"/>

***Version: 1.2  
Updated: April 30, 2026***

Query the URL reputation via PhishTank.

## Actions

* **URL Reputation** (*Enrichment*) - Get URL Reputation.

## Configure PhishTank in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server URL**. Enter your PhishTank server URL, for example, `https://www.phishtank.com`.

* **API Key**. Enter an [API key](https://phishtank.org/faq.php#howdoigetanapikey) for PhishTank.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/phishtank-configuration.png')} style={{border:'1px solid gray'}} alt="PhishTank configuration" width="400"/>

For information about PhishTank, see [PhishTank documentation](https://phishtank.org/developer_info.php).

## Change Log

* January 10, 2019 - First upload
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables
* April 30, 2026 (v1.2) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
