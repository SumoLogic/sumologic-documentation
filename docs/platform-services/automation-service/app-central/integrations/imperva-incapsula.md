---
title: Imperva Incapsula
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/imperva-incapsula.png')} alt="imperva-incapsula" width="100"/>

***Version: 1.2  
Updated: Jul 18, 2023***

Gather statistical information from Incapsula for incident investigation.

## Actions

* **Get Infrastructure Protection Statistics** (*Enrichment*) - Gather Infrastructure Protection statistics for an account or IP range from Incapsula.

## Configure Imperva Incapsula in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Host**. Enter the Imperva Incapsula hostname, for exmaple `my.incapsula.com`

* **Port**. Enter your Imperva Incapsula port.

* **API ID** Enter an Imperva Incapsula [API ID](https://docs.imperva.com/bundle/cloud-application-security/page/settings/api-keys.htm).

* **API Key**. Enter the key for the API ID.

* **Account ID**. Enter the numeric identifier of the [account](https://docs.imperva.com/bundle/z-kb-articles-knowledgebase-support/page/290234822.html) to fetch data for.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/imperva-incapsula-configuration.png')} style={{border:'1px solid gray'}} alt="Imperva Incapsula configuration" width="400"/>

For information about Imperva Cloud Application Security ([formerly Incapsula](https://docs.imperva.com/bundle/articles/page/73354.htm)), see [Imperva Cloud Application Security documentation](https://docs.imperva.com/bundle/cloud-application-security/page/introducing/overview.htm).

## Change Log

* July 29, 2019 - First upload
* June 26, 2023 (v1.1) - Updated the integration with Environmental Variables
* July 18, 2023 (v1.2) - Code refactoring
