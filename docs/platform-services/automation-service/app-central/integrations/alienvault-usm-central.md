---
title: AlienVault USM Central
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/alienvault-usm-central.png')} alt="alienvault-otx" width="90"/>

***Version: 1.1  
Updated: Jun 26, 2023***

Search events, alarms, and update labels in AlienVault USM Central.

## Actions

* **Get Alarm** (*Enrichment*) - Gather all available alarms.
* **List Alarms** (*Enrichment*) - List all available alarms.
* **List Deployments** (*Enrichment*) - List all available deployments.
* **AlienVault USM Central Alarms** (*Daemon*) - Automatically pull USM Central Alarms.

## Configure AlienVault USM Central in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>

* <IntegrationLabel/>
* **Server URL**. Enter your AlienVault USM Central URL, for example, `https://example.alienvault.cloud/`

* **Username**. Enter the username of the AlienVault USM Central admin user authorized to provide authentication for the integration.

* **Password**. Enter the username's password.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/alienvault/alienvault-usm-central-configuration.png')} style={{border:'1px solid gray'}} alt="Alienvault USM Central configuration" width="400"/>

For information about AlienVault USM Central, see [AlienVault USM Central documentation](https://cybersecurity.att.com/documentation/usm-central.htm).

## Change Log

* October 26, 2020 - First upload
* June 26, 2023 (v1.1) - Updated the integration with Environmental Variables
