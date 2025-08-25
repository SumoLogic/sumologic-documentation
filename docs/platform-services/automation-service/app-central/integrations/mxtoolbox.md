---
title: MxToolbox
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/mxtoolbox.png')} alt="mxtoolbox" width="60"/>

***Version: 1.3  
Updated: Jun 23, 2023***

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

* February 14, 2020 - First upload
* January 13 ,2023 - General improvements
* June 23, 2023 (v1.1) - Updated the integration with Environmental Variables