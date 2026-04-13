---
title: AS3
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/f5-as3.png')} alt="F5 AS3 icon" width="60"/>

***Version: 1.3  
Updated: April 13, 2026***

AS3 integration enables management of configuration declarations.

## Actions

* **Declarations** (*Enrichment*) - Configure declarations within F5 AS3.

## Configure F5 AS3 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server URL**. Enter your F5 AS3 server URL.

* **Username**. Enter the username of an F5 AS3 admin user authorized to provide authentication for the integration.

* **Password**. Enter the password for the admin user.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/f5-as3-configuration.png')} style={{border:'1px solid gray'}} alt="F5 AS3 configuration" width="400"/>

For information about F5 AS3, see [F5 AS3 documentation](https://clouddocs.f5.com/products/extensions/f5-appsvcs-extension/latest/).

## Change Log

* April 13, 2026 (v1.3) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
