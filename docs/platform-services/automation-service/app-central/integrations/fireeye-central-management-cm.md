---
title: FireEye Central Management (CM)
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/fireeye-central-management-cm.png')} alt="fireeye-central-management-cm" width="100"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Centralized device and intelligence management to correlate data across attack vectors.

## Actions

* **Get Alert Info** (*Enrichment*) - Query FireEye CM for alert details.
* **Get ATI Details** (*Enrichment*) - Query FireEye Advanced Threat Intelligence for intelligence data.
* **Get Event Info** (*Enrichment*) - Get information from previously generated event.
* **Add Snort Rule** (*Containment*) - Add a new Snort rule.
* **Add YARA Rule** (*Containment*) - Add a new YARA rule.
* **Acknowledge Alert** (*Containment*) - Notate previously generated alert.

## Configure FireEye Central Management (CM) in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Endpoint**. Enter the FireEye CM endpoint URL.

* **Username**. Enter the username of a FireEye CM admin user authorized to authenticate the integration.

* **Password**. Enter the password for the admin user.

* **API Version**. Select the API version, 2.0.0 or 1.2.0.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/fireeye-central-management-configuration.png')} style={{border:'1px solid gray'}} alt="FireEye Central Management configuration" width="400"/>

For information about Trellix Central Management (formerly FireEye Central Management), see [Trellix documentation](https://docs.trellix.com/bundle/fx_10.0.x_sag/page/UUID-feae882c-4d05-175b-652f-f7c504e95bb4.html).

## Change Log

* June 21, 2019 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
