---
title: Wittra
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/wittra.png')} alt="wwittra" width="70"/>

***Version: 1.2  
Updated: April 30, 2026***

Wittra is hardware and software provider with patented solutions for business in the Internet of Moving Things.

## Actions

* **Get Organization Details** *(Enrichment)* - Retrieve data about a requested organization.
* **List Projects** *(Enrichment)* - Retrieve all projects in a requested organization.
* **List Users** *(Enrichment)* - Retrieve all users in a requested organization.
* **List Devices** *(Enrichment)* - Retrieve all devices for a requested project.
* **Get Device** *(Enrichment)* - Retrieve data about a specific device.
* **List Devices Telemetry** *(Enrichment)* - Retrieve telemetry for all devices in a project.

## Configure Wittra in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your [Wittra URL](https://docs.wittra.io/#/howto-integrations-and-api?id=use-the-api-key), for example, `https://api.wittra.se/`.

* **API Key**. Enter the [Wittra API key](https://docs.wittra.io/#/howto-integrations-and-api?id=set-up-api-key).

* **Organization ID**. Enter your Wittra [organization ID](https://docs.wittra.io/#/howto-console?id=create-a-project).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/wittra-configuration.png')} style={{border:'1px solid gray'}} alt="Wittra configuration" width="400"/>

For information about Wittra, see [Wittra documentation](https://docs.wittra.io/#/).

## Change Log

* February 8, 2023 - First upload
* February 13, 2023 - New Logo
* July 18, 2023 (v1.1) - Removed leading/trailing spaces
* April 30, 2026 (v1.2) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
