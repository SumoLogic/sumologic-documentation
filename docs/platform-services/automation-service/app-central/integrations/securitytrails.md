---
title: SecurityTrails
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/securitytrails.png')} alt="securitytrails" width="100"/>

***Version: 1.1  
Updated: Jul 18, 2023***

SecurityTrails is a total inventory that curates comprehensive domain and IP address data for users and applications that demand clarity. By combining current and historic data of all Internet assets, SecurityTrails is the proven solution for 3rd-party risk assessment, attack surface reduction and threat hunting.

## Actions

* **List Subdomains** *(Enrichment)* - Returns child and sibling subdomains for a given hostname.

## Configure SecurityTrails in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your SecurityTrails [API URL](https://docs.securitytrails.com/docs/overview#accessing-the-securitytrails-rest-api). The default is `https://api.securitytrails.com`.

* **API Key**. Enter your SecurityTrails [API key](https://docs.securitytrails.com/docs/authentication).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>
   
<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/securitytrails-configuration.png')} style={{border:'1px solid gray'}} alt="SecurityTrails configuration" width="400"/>

For information about SecurityTrails, see [SecurityTrails documentation](https://docs.securitytrails.com/docs/overview).

## Change Log

* November 28, 2022 - First upload
* December 13, 2022 - Refactoring
* July 18, 2023 (v1.1) - Removed leading/trailing spaces
