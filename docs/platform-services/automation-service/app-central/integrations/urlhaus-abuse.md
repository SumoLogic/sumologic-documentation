---
title: URLhaus Abuse
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/urlhaus-abuse.png')} alt="urlscan.io" width="80"/>

***Version: 1.0  
Updated: Feb 20, 2023***

Query domains, URLs, and hash values with URLhaus.

## Actions

* **Get Domain Info** (*Enrichment*) - To retrieve information about a host.
* **Get Hash Info** (*Enrichment*) - To retrieve information about a payload (*malware sample*) that URLhaus has retrieved.
* **Get URL Info** (*Enrichment*) - To retrieve information about an URL.

## Configure URLhaus Abuse in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **API URL**. Enter your [URLhaus Abuse API URL](https://urlhaus.abuse.ch/api/), for example, `https://urlhaus.abuse.ch/api/`.

* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/urlhaus-abuse-configuration.png')} style={{border:'1px solid gray'}} alt="URLhaus Abuse configuration" width="400"/>

For information about URLhaus, see [URLhaus documentation](https://urlhaus.abuse.ch/).

## Change Log

* April 1, 2019 - First upload
* February 20, 2023 (v1.1)
	+ Updated integration: (Updated the integration Fields with Environmental Variables)
