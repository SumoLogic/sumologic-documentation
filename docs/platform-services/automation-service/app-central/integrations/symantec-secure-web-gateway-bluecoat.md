---
title: Symantec Secure Web Gateway (Bluecoat)
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/symantec-secure-web-gateway-bluecoat.png')} alt="symantec-secure-web-gateway-bluecoat" width="100"/>

***Version: 1.1  
Updated: Jul 07, 2023***

Search SWG events and test URL access.

## Actions

* **Search Into Events Bluecoat** (*Enrichment*) - Search events based on the specified query.
* **Show Active Sessions** (*Enrichment*) - Search active sessions based on the specified query.
* **Test URL Access** (*Enrichment*) - Test access to the specified URL.

## Configure Symantec Secure Web Gateway (Bluecoat) in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Endpoint**. Enter your Symantec Secure Web Gateway endpoint address.

* **Username**. Enter the username for a Symantec Secure Web Gateway admin user.

* **Password**. Enter the password for the admin user.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/symantec-secure-web-gateway-configuration.png')} style={{border:'1px solid gray'}} alt="Symantec Secure Web Gateway configuration" width="400"/>

For information about Symantec Secure Web Gateway, see [Symantec Secure Web Gateway documentation](https://techdocs.broadcom.com/us/en/symantec-security-software/web-and-network-security/cloud-swg/help.html).

## Change Log

* June 3, 2019 - First upload
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables
