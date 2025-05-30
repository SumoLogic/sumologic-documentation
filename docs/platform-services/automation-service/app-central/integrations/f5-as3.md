---
title: F5 AS3
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/f5-as3.png')} alt="f5-as3" width="60"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Manipulate F5 AS3 configurations during an active investigation.

## Actions

* **Set Configuration** (*Containment*) - Set configuration parameters within F5 AS3.

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

* September 4, 2019 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
