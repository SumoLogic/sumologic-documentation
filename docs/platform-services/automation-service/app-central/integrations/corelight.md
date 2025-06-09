---
title: Corelight
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/corelight.png')} alt="corelight" width="100"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Utilize Corelight during incident investigation.

## Actions

* **Get Metrics** (*Enrichment*) - Gather metrics from Corelight.
* **Update Threat Intel** (*Containment*) - Update Corelight threat intel.

## Configure Corelight in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **IP or Hostname**. Enter the IP or the hostname of your Corelight instance. Do not include the preceding `https://`.

* **Username**. Enter the username of a Corelight admin user authorized to provide authentication for the integration.

* **Password**. Enter the password for the admin user.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/corelight/corelight-configuration.png')} style={{border:'1px solid gray'}} alt="Corelight configuration" width="400"/>

For information about Corelight, see [Corelight documentation](https://corelight.com/resources/resource-center).

## Change Log

* August 23, 2019 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
