---
title: ThreatConnect
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/threatconnect.png')} alt="threatminer" width="100"/>

***Version: 1.1  
Updated: Jul 03, 2023***

Utilize ThreatConnect intelligence data during incident investigations.

## Actions

* **Search Intelligence** (*Enrichment*) - Search ThreatConnect data for information matching the specified query.
* **Update Intelligence** (*Notification*) - Update ThreatConnect intelligence data.

## Configure ThreatConnect in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server URL**. Enter your ThreatConnect [server URL](https://docs.threatconnect.com/en/latest/rest_api/quick_start.html), for example, `https://api.threatconnect.com`.

* **Access ID**. Enter a ThreatConnect [access ID](https://knowledge.threatconnect.com/docs/managing-user-accounts#creating-an-api-user).

* **Secret Key**. Enter the secret for the access ID.

* **Default owner**. Enter the default [owner](https://knowledge.threatconnect.com/docs/en/ownership-in-threatconnect).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/threatconnect-configuration.png')} style={{border:'1px solid gray'}} alt="ThreatConnect configuration" width="400"/>

For information about ThreatConnect, see [ThreatConnect documentation](https://docs.threatconnect.com/en/latest/).

## Change Log

* December 19, 2019 - First upload
* July 3, 2023 (v1.1)
	+ Updated the integration with Environmental Variables
	+ Integration renamed from ThreatConnect OIF to ThreatConnect
