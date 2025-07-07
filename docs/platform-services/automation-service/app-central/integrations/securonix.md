---
title: Securonix
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/securonix.png')} alt="securonix" width="100"/>

***Version: 1.1  
Updated: Jul 11, 2023***

Query event/alert data and user details from Securonix.

## Actions

* **List Resource** (*Enrichment*) - Search list of available resources.
* **Search Into Events Securonix** (*Enrichment*) - Search previously generated events.
* **Search Into Alerts** (*Enrichment*) - Search previously generated alerts.
* **Search Users** (*Enrichment*) - Search for Securonix users.
* **Search Assets** (*Enrichment*) - Search for assets.
* **Get User Risk Score** (*Enrichment*) - Query for user's current risk score.
* **Get User Details** (*Enrichment*) - Gather user details.

## Configure Securonix in Automation Service and Cloud SOAR

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

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/securonix-configuration.png')} style={{border:'1px solid gray'}} alt="Securonix configuration" width="400"/>

For information about Securonix, see [Securonix documentation](https://documentation.securonix.com/).

## Change Log

* June 19, 2019 - First upload
* June 27, 2019 - Search Into Events Securonix action updated
* July 11, 2023 (v1.1) - Updated the integration with Environmental Variables
