---
title: Palo Alto AutoFocus
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/palo-alto-autofocus.png')} alt="palo-alto-autofocus" width="100"/>

***Version: 1.1
Updated: Jul 07, 2023***

Utilize Palo Alto Auto Focus threat intelligence feeds during incident investigation.

## Actions

* **Search Samples** (*Enrichment*) - Search for incident indicators from Palo Alto threat intelligence samples.
* **Search Sessions** (*Enrichment*) - Search for incident indicators from Palo Alto threat intelligence sessions.

## Configure Palo Alto AutoFocus in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Endpoint**. Enter your Palo Alto [endpoint URL](https://docs.paloaltonetworks.com/autofocus/autofocus-api/about-the-autofocus-api/autofocus-api-resources), for example, `https://autofocus.paloaltonetworks.com`

* **API Key**. Enter an AutoFocus [API key](https://docs.paloaltonetworks.com/autofocus/autofocus-api/get-started-with-the-autofocus-api/get-your-api-key).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/palo-alto-autofocus-configuration.png')} style={{border:'1px solid gray'}} alt="Palo Alto AutoFocus configuration" width="400"/>

For information about Palo Alto AutoFocus, see [Palo Alto AutoFocus documentation](https://docs.paloaltonetworks.com/autofocus/autofocus-admin).

## Change Log

* July 10, 2019 - First upload
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables
