---
title: Imperva SecureSphere
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/imperva-securesphere.png')} alt="imperva-securesphere" width="100"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Retrieve and modify IP groups for incident investigation and remediation.

## Actions

* **Get IP Group** (*Enrichment*) - Gather IP groups from SecureSphere.
* **Update IP Group** (*Containment*) - Modify IP groups in SecureSphere.

## Configure Imperva SecureSphere in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Host**. Enter the Imperva SecureSphere hostname, for example `192.168.74.51`

* **Port**. Enter your Imperva SecureSphere port.

* **Username**. Enter the username of an Imperva SecureSphere admin user authorized to provide authentication for the integration.

* **Password**. Enter the password of the admin user.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/imperva-securesphere-configuration.png')} style={{border:'1px solid gray'}} alt="Imperva SecureSphere configuration" width="400"/>

For information about Imperva SecureSphere, see the [Imperva SecureSphere documentation](https://docs.imperva.com/bundle/v15.3-waf-administration-guide/page/9282.htm).

## Change Log

* July 29, 2019 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
