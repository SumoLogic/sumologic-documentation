---
title: Censys V3
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/censys.png')} alt="censys" width="100"/>

***Version: 1.1  
Updated: Jan 6, 2026***

Censys helps organizations, individuals, and researchers find and monitor every server on the internet to reduce exposure and improve security.

## Actions

* **Search** (*Containment*) - Returns previews of hosts matching a specified search query search.
* **Aggregate Hosts** (*Containment*) - Returns aggregation of hosts that match the given query string aggregation.
* **View IP** (*Enrichment*) - Returns host information for the specified IP address.
* **View Certificate** (*Enrichment*) - Returns a list of hosts presenting the given certificate.

## Configure Censys V3 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter the URL of Censys V3, for example `https://api.platform.censys.io`.

* **PAT**. Enter the Personal Access Token.

* **Organization ID**. Enter the Organization ID of the Censys Account.
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/censys-v3-configuration.png')} style={{border:'1px solid gray'}} alt="Censys V2 configuration" width="400"/>

For information about Censys V3, see [Censys documentation](https://docs.censys.com/reference/get-started).

## Change Log

* January 2, 2026 - First upload
* January 6, 2026 (v1.1) - Updated the decscription.