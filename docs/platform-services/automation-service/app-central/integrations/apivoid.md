---
title: APIVoid
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/apivoid.png')} alt="apivoid" width="90"/>

***Version: 1.4  
Updated: April 13, 2026***

Utilize APIVOID to gather enrichment data during incident investigations.

## Actions

* **Check Credit Balance** (*Enrichment*) - Check the APIVOID credit balance for a specific account.
* **DNS Lookup** (*Enrichment*) - Gather DNS lookup information.
* **Domain Reputation** (*Enrichment*) - Gather Domain Reputation information.
* **Email Verify** (*Enrichment*) - Verify a submitted email address.
* **IP Reputation** (*Enrichment*) - Gather IP reputation information.
* **Save Screenshot** (*Enrichment*) - Save screenshots to Cloud SOAR.
* **Save URL** (*Enrichment*) - Save URL details.
* **Site Trustworthiness** (*Enrichment*) - Gather a site's trustworthiness score.
* **URL Reputation** (*Enrichment*) - Gather URL reputation information.

## Configure APIVoid in Automation Service and Cloud SOAR

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
* **API URL**. Enter the APIVoid API URL. The default value is `https://endpoint.apivoid.com/`

* **API Key**. Enter your APIVoid API key. 
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <CloudSOARAPIURL/>
* <AccessID/>
* <AccessKey/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/apivoid/apivoid-configuration.png')} style={{border:'1px solid gray'}} alt="APIVoid configuration" width="400"/>

For information about APIVoid, see [APIVoid documentation](https://docs.apivoid.com/).

## Change Log

| Version | Date | Description |
|:--|:--|:--|
| v1.4 | April 13, 2026 | Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance. |
| v1.3 | July 01, 2024 | Updated the **Save Screenshot** and **Save URL** actions with the new Cloud SOAR API; results can now be saved as incident attachments and artifacts. |
| v1.2 | October 5, 2023 | Changed fields visibility. |
| v1.1 | June 26, 2023 | Updated the integration with environmental variables. |
| | August 14, 2020 | Initial release of the APIVoid integration. |
