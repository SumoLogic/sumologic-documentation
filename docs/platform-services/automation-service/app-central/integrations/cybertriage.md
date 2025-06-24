---
title: CyberTriage
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cybertriage.png')} alt="cybertriage" width="100"/>

***Version: 1.1  
Updated: Jul 06, 2023***

Initiate the triage of endpoints with Cyber Triage from Basis Technology.

## Actions

* **Triage Endpoint** (*Containment*) - Start the triage process on an endpoint.

## Configure Cyber Triage in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Hostname of Cyber Triage server**.

* **REST Port**. Enter your [Cyber Triage port](https://docs.cybertriage.com/en/latest/chapters/team/index.html#rest-api-access).

* **API Key**. Enter your [Cyber Triage API key](https://docs.cybertriage.com/en/latest/chapters/team/index.html#api-user).

* **Windows Domain**. Enter the Windows domain associated with your Cyber Triage instance. 

* **Windows Admin Account**. Enter the Windows admin account associated with your Cyber Triage instance.

* **Password**. Enter the password for the Windows admin account.
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/cyber-triage/cyber-triage-configuration.png')} style={{border:'1px solid gray'}} alt="Cyber Triage configuration" width="400"/>

For information about Cyber Triage, see [Cyber Triage documentation](https://docs.cybertriage.com/en/latest/index.html).

## Change Log

* August 17, 2021 - First upload
* July 6, 2023 (v1.1) - Updated the integration with Environmental Variables
