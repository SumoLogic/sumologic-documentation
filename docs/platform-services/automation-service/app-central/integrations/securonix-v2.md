---
title: Securonix V2
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/securonix-v2.png')} alt="securonix-v2" width="100"/>

***Version: 2.1  
Updated: Jul 07, 2023***

Query event/alert data and user details from Securonix.

## Actions

* **Search into Events Securonix** (version 6.3) (*Enrichment*) - Search previously generated events.
* **Generate Token** (version 6.3) (*Enrichment*) - Generate a new token.

**Supported Versions**

* v6.3

## Configure Securonix V2 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server URL**. Enter your Securonix [server URL](https://documentation.securonix.com/bundle/securonix-cloud-user-guide/page/content/settings-application-settings.htm), for example, `https://10.0.0.21:8443`.

* **Username**. Enter the username of a Securonix admin user authorized to authenticate the integration.

* **Password**. Enter the password for the admin user.

* **Tenant**. Enter your Securonix [tenant name](https://documentation.securonix.com/bundle/securonix-cloud-user-guide/page/content/settings-hadoop-tenant-details.htm).

* **Timezone**. Select your timezone.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/securonix-v2-configuration.png')} style={{border:'1px solid gray'}} alt="Securonix V2 configuration" width="400"/>

For information about Securonix, see [Securonix documentation](https://documentation.securonix.com/).

## Change Log

* May 15, 2020 - First upload
* July 7, 2023 (v2.1) - Updated the integration with Environmental Variables
