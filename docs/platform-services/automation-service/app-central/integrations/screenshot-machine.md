---
title: Screenshot Machine
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/screenshot-machine.png')} alt="screenshot-machine" width="100"/>

Version: 1.3  
Updated: February 16, 2024

Utilize Screenshot Machine to create screenshots of suspicious webpages as evidence during an investigation. 

## Actions

* **Screenshot Webpage** (*Enrichment*) - Take a screenshot of a specific webpage for investigation.
* **Screenshot Webpage V2** (*Enrichment*) - Take a screenshot of a specific webpage for investigation.

## Configure Screenshot Machine in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';
import CloudSOARAPIURL from '../../../../reuse/automation-service/cloud-soar-api-url.md';
import AccessID from '../../../../reuse/automation-service/access-id.md';
import AccessKey from '../../../../reuse/automation-service/access-key.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your Screenshot Machine API [URL](https://www.screenshotmachine.com/website-screenshot-api.php), for example, `https://api.screenshotmachine.com`.

* **API Key**. Enter your Screenshot Machine API key.

* **Secret Phrase**. Enter your Screenshot Machine secret phrase. This is required if a secret phrase was set in your Screenshot Machine account settings.
* <CloudSOARAPIURL/>
* <AccessID/>
* <AccessKey/>
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/screenshot-machine-configuration.png')} style={{border:'1px solid gray'}} alt="Screenshot Machine configuration" width="400"/>

For information about Screenshot Machine, see [Screenshot Machine documentation](https://www.screenshotmachine.com/website-screenshot-api.php).

## Change Log

* October 16, 2019 - First upload
* July 11, 2023 (v1.1)
	+ Updated the integration with Environmental Variables
	+ Integration renamed form Screenshot Machine OIF to Screenshot Machine
* September 4, 2023 (v1.2)
	+ integration refactored
	+ added new action Screenshot Webpage V2
* February 16, 2024 (v1.3)
    + Screenshot Webpage Action: Updated with new Cloud SOAR API
