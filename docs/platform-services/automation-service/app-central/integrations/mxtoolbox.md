---
title: MxToolbox
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/mxtoolbox.png')} alt="mxtoolbox" width="60"/>

***Version: 1.4  
Updated: April 30, 2026***

Utilize MXToolbox to gather MX records for enrichment data during incident investigation.

## Actions

* **Lookup** (*Enrichment*) - Lookup MX records for a specific domain.

## Configure MxToolbox in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your MxToolbox URL.

* **API Key**. Enter an MxToolbox [API key](https://mxtoolbox.com/support/knowledgebase/?ticketClass=API).
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/mxtoolbox-configuration.png')} style={{border:'1px solid gray'}} alt="MxToolbox configuration" width="400"/>

For information about MxToolbox, see [MxToolbox documentation](https://mxtoolbox.com/support/knowledgebase/).

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.4 | April 30, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.1 | June 23, 2023 | Updated the integration with Environmental Variables. |
| v1.0 | January 13 ,2023 | Made general improvements to the integration. |
| v1.0 | February 14, 2020 | Initial release of the MxToolbox integration. |
