---
title: Screenshot Machine
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/screenshot-machine.png')} alt="Screenshot Machine icon" width="100"/>

Version: 1.4  
Updated: April 30, 2026

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

| Version | Date | Description |
|:--|:--|:--|
| v1.4 | April 30, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.3 | February 16, 2024 | Updated the **Screenshot Webpage** action to use the new Cloud SOAR API. |
| v1.2 | September 4, 2023 | <ul><li>Refactored the integration.</li><li>Added a new action: **Screenshot Webpage V2**.</li></ul> |
| v1.1 | July 11, 2023 | <ul><li>Updated the integration with Environmental Variables.</li><li>Renamed the integration from Screenshot Machine OIF to Screenshot Machine.</li></ul> |
| v1.0 | October 16, 2019 | Initial release of the Screenshot Machine integration. |