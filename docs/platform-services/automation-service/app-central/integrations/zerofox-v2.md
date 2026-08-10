---
title: ZeroFox V2
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/zerofox.png')} alt="axonius" width="100"/>

***Version: 1.0  
Updated: April 24, 2026***

Query data and utilize action in ZeroFox Platform.

## Actions

* **Get Alert Details** *(Enrichment)* - Retrieves a specific alert with enriched context, including AI/ML insights, metadata, and CAC-related details.
* **List Alerts** *(Enrichment)* - Returns alerts matching given/default filters and parameters.
* **List Users** *(Enrichment)* - Lists all users.
* **Request Takedown** *(Containment)* - Takedowns an existing alert.

## Notes

* Action **Request Takedown** is currently available only in version 1.0.

## Configure ZeroFox in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>

* **API URL**. Enter your ZeroFox API URL, for example, `https://api.zerofox.com`
* **Username**. Enter your ZeroFox account username.
* **Password**. Enter your ZeroFox account password.

* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/zerofox-v2/zerofox-v2-configuration.png')} style={{border:'1px solid gray'}} alt="ZeroFox V2 configuration" width="400"/>

For information about ZeroFox, see [ZeroFox documentation](https://www.zerofox.com/resources/#).

## Change Log

* April 24, 2026 - First upload
