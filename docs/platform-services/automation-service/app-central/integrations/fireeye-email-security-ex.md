---
title: FireEye Email Security (EX)
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/fireeye-email-security-ex.png')} alt="fireeye-email-security-ex" width="100"/>

***Version: 1.1  
Updated: Jul 03, 2023***

Full stack email security solution for email analysis.

## Actions

* **Get Alert Info** (*Enrichment*) - Query FireEye EX for alert details.
* **Get ATI Details** (*Enrichment*) - Get the ATI details for the specified alert Id.
* **Add YARA Rule** (*Containment*) - Add a new YARA rule from the specified file.

## Configure FireEye Email Security (EX) in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Endpoint**. Enter the FireEye EX endpoint URL.

* **Username**. Enter the username of a FireEye EX admin user authorized to authenticate the integration.

* **Password**. Enter the password for the admin user.

* **API Version**. Select the API version, 2.0.0 or 1.2.0.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/fireeye-email-security-configuration.png')} style={{border:'1px solid gray'}} alt="FireEye Email Security configuration" width="400"/>

For information about Trellix Email Security - Server (formerly FireEye Email Security), see [Trellix Email Security - Server documentation](https://docs.trellix.com/bundle/fe-email-server-landing/page/UUID-ca2a7502-d2aa-2294-6577-2592319a5837.html).

## Change Log

* June 12, 2019 - First upload
* July 3, 2023 (v1.1) - Updated the integration with Environmental Variables
