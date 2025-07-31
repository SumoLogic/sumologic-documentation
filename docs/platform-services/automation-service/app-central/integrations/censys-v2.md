---
title: Censys V2
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/censys.png')} alt="censys" width="100"/>

***Version: 2.3  
Updated: Jul 31, 2025***

Censys reduces your Internet attack surface by continually discovering unknown assets and helping remediate Internet facing risks.   

## Actions

* **Search** (*Enrichment*) - Returns previews of hosts matching a specified search query search.
* **Aggregate Hosts** (*Enrichment*) - Returns aggregation of hosts that match the given query string aggregation.
* **View IP** (*Enrichment*) - Returns host information for the specified IP address.
* **View Certificate** (*Enrichment*) - Returns a list of hosts presenting the given certificate.

## Configure Censys V2 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter the URL of Censys V2, for example `https://search.censys.io`

* **User ID**. Enter the [API ID](https://docs.censys.com/docs/ls-api).

* **User Secret**. Enter the secret for the API ID.
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/censys-v2-configuration.png')} style={{border:'1px solid gray'}} alt="Censys V2 configuration" width="400"/>

For information about Censys V2, see [Censys documentation](https://docs.censys.com/docs).

## Change Log

* February 14, 2022 - First upload
* July 7, 2023 (v2.2)
	+ Updated the integration with Environmental Variables
	+ Integration renamed from Censys 2.0 to Censys V2
* July 31, 2024 (v2.3) - Updated the integration logo.
