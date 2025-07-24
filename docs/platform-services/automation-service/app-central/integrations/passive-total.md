---
title: PassiveTotal
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/passive-total.png')} alt="passive-total" width="100"/>

***Version: 1.1  
Updated: Jul 07, 2023***

IP and Domain Information.

## Actions

* **Whois** (*Enrichment*) - Gather IP or Domain information.

## Configure PassiveTotal in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Endpoint**. Enter your PassiveTotal [endpoint address](https://passivetotal.readthedocs.io/en/latest/getting-started.html), for example, `https://api.passivetotal.org/v2`

* **Username/Key**. Enter your PassiveTotal [API key](https://passivetotal.readthedocs.io/en/latest/getting-started.html#obtain-api-keys).

* **API Secret**. Enter the secret for the key.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/passive-total-configuration.png')} style={{border:'1px solid gray'}} alt="PassiveTotal configuration" width="400"/>

For information about PassiveTotal, see [PassiveTotal documentation](https://passivetotal.readthedocs.io/en/latest/#).

## Change Log

* June 12, 2019 - First upload
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables
