---
title: Microsoft Graph Security
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/microsoft-graph-security.png')} alt="Microsoft Graph Security icon" width="100"/>

***Version: 1.3  
Updated: August 31, 2026***

Query the Microsoft Graph Security API and update alerts.

## Actions

* **Get Alert** (*Enrichment*) - Get details for a Graph Security alert using the new [alerts_v2 API](https://learn.microsoft.com/en-us/graph/alertsv1-alertsv2-migration).
* **Microsoft Graph Security Alerts Daemon** (*Daemon*) - Automatically retrieve Microsoft Graph Security alerts.
* **Search Alerts** (*Enrichment*) - Search Graph Security alerts using the new [alerts_v2 API](https://learn.microsoft.com/en-us/graph/alertsv1-alertsv2-migration).
* **Search Into Alerts** (*Enrichment*) - Search Graph Security alerts using the legacy alerts API.
* **Update Alert** (*Containment*) - Update a Graph Security alert using the new [alerts_v2 API](https://learn.microsoft.com/en-us/graph/alertsv1-alertsv2-migration).
* **Update Security Alert** (*Containment*) - Update a Graph Security alert using the legacy alerts API.

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
* April 30, 2026 (v1.2) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
* August 31, 2026 (v1.3)
    + Migrated **Get Alert**, **Search Alerts**, and **Update Alert** actions to the new Microsoft Graph Security [alerts_v2 API](https://learn.microsoft.com/en-us/graph/alertsv1-alertsv2-migration). The legacy `/security/alerts` endpoint is deprecated and will be retired on October 15, 2026.
    + Added new **Microsoft Graph Security Alerts Daemon** action.
    + Added new **Search Alerts** action.
    + Added new **Update Alert** action.
    + Legacy actions **Search Into Alerts** and **Update Security Alert** are retained for backward compatibility, as the alerts_v2 API is not a one-to-one replacement for the legacy API and some alerts may be unavailable through the new endpoint.
