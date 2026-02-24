---
title: Kaspersky CyberTrace
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/kaspersky-cybertrace.png')} alt="kaspersky-cybertrace" width="100"/>

***Version: 1.1  
Updated: Jul 05, 2023***

Perform queries in Kaspersky CyberTrace.

## Actions

* **Indicator Search** (*Enrichment*) - Performs an indicator search.

## Configure Kaspersky CyberTrace in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server URL**. Enter your Kaspersky CyberTrance [server URL](https://support.kaspersky.com/cybertrace/4.4/en-US/198537.htm).

* **Username**. Enter the username of a Kaspersky CyberTrance admin user authorized to provide authentication for the integration. 

* **Password**. Enter the password for the admin user. 
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/kaspersky-cybertrace-configuration.png')} style={{border:'1px solid gray'}} alt="Kaspersky Cybertrace configuration" width="400"/>

For information about Kaspersky CyberTrace, see [Kaspersky CyberTrace documentation](https://support.kaspersky.com/cybertrace/4.4/en-US/226871.htm).

## Change Log

* August 17, 2021 - First upload
* July 5, 2023 (v1.1) - Updated the integration with Environmental Variables
