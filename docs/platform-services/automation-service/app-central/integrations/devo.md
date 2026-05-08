---
title: Devo
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/devo.png')} alt="darktrace" width="100"/>

***Version: 1.3  
Updated: April 29, 2026***

DEVO integration to query data from Devo.

## Actions

* **Query Data** (*Enrichment*) - Query data from DEVO.

## Configure Devo in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Devo Domain**. Enter your [Devo domain](https://docs.devo.com/space/latest/94762877/Domain+administration).

* **API Key**. Enter a Devo [access key](https://docs.devo.com/space/latest/94763781/Access+keys).

* **Secret Key**. Enter the secret for the access key.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/devo-configuration.png')} style={{border:'1px solid gray'}} alt="Devo configuration" width="400"/>

For information about Devo, see [Devo documentation](https://docs.devo.com/).

## Change Log

* February 12, 2021 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
* March 4, 2024 (v1.2) - Updated code for compatibility with Python 3.12
* April 29, 2026 (v1.3) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
