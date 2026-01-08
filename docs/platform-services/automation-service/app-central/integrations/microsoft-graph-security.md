---
title: Microsoft Graph Security
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/microsoft-graph-security.png')} alt="microsoft-graph-security" width="100"/>

***Version: 1.1  
Updated: Jun 21, 2023***

Query the Microsoft Graph Security API and update alerts.

## Actions

* **Search Into Alerts** (*Enrichment*) - Search Graph Security alerts.
* **Get Alert** (*Enrichment*) - Get details for a Graph Security alert.
* **Update Security Alert** (*Containment*) - Update a Graph Security alert.

## Configure Microsoft Graph Security in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Tenant**. Enter the [tenant ID](https://learn.microsoft.com/en-us/azure/healthcare-apis/register-application#application-id-client-id) of the AAD directory in which you created the application.

* **Username**. Enter the username of a Microsoft Graph Security admin user authorized to authenticate the integration.

* **Password**. Enter the admin user password.

* **Application (Client) ID**. Enter your Microsoft Graph Security [application ID](https://learn.microsoft.com/en-us/azure/healthcare-apis/register-application#application-id-client-id).

* **Application (Client) Secret**. Enter your application (client) secret.
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/microsoft-graph-security-configuration.png')} style={{border:'1px solid gray'}} alt="Microsoft Graph Security configuration" width="400"/>

For information about Microsoft Graph Security, see [Microsoft Graph Security documentation](https://learn.microsoft.com/en-us/graph/security-authorization).

## Change Log

* February 21, 2019 - First upload
* March 10, 2022 - Logo
* June 21, 2023 (v1.1) - Removed unnecessary empty lines
