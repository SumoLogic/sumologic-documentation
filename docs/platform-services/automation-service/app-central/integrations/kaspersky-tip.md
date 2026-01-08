---
title: Kaspersky TIP
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/kaspersky-tip.png')} alt="kaspersky-tip" width="100"/>

***Version: 1.1  
Updated: Jul 05, 2023***

Quickly determine whether an investigated object is dangerous or clean by requesting detailed information about URLs, IP addresses and hashes from the Kaspersky Threat Intelligence Portal, directly from Sumo Logic SOAR Platform.

## Actions

* **Search Intelligence** (*Enrichment*) - Search for incident indicators from Kaspersky threat intelligence feeds.

## Configure Kaspersky TIP in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server URL**. Enter your Kaspersky TIP server URL.

* **Username**. Enter the username of a Kaspersky TIP admin user authorized to provide authentication for the integration. 

* **Password**. Enter the password for the admin user.

* **Kaspersky Certificate**. Enter the Kaspersky [certificate](https://support.kaspersky.com/KTIPS/en-EN/153080.htm). The certificate must be in PEM (base64encode) format.
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/kaspersky-tip-configuration.png')} style={{border:'1px solid gray'}} alt="Kaspersky TIP configuration" width="400"/>

For information about Kaspersky TIP, see [Kaspersky TIP documentation](https://opentip.kaspersky.com/Help/Doc_data/About.htm).

## Change Log

* July 10, 2019 - First upload
* January 22, 2020 - Updated "search Intelligence" action
* July 5, 2023 (v1.1) - Updated the integration with Environmental Variables
