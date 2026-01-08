---
title: Microsoft Azure Security Center
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/microsoft-azure-security-center.png')} alt="microsoft-azure-security-center" width="100"/>

***Version: 1.1  
Updated: Jun 21, 2023***

Work with Alerts, Policies, Tasks, and other resources with Microsoft Azure Security Center.

## Actions

* **Get Security Alert** (*Enrichment*) - Get information from a security alert.
* **List Security Alerts** (*Enrichment*) - Get a list of security alerts.
* **List Security Policies** (*Enrichment*) - Get a list of security policies.
* **Get Security Policy** (*Enrichment*) - Get information regarding a security policy.
* **List Security Statuses** (*Enrichment*) - Get a list of current security statuses.
* **Get Security Task** (*Enrichment*) - Get information regarding a security task.
* **List Security Tasks** (*Enrichment*) - Get a list of security tasks.
* **List Locations** (*Enrichment*) - List all locations.
* **List Resource Groups** (*Enrichment*) - List all resource group information.
* **Update Alert Status** (*Containment*) - Update the status of a security alert.
* **Update Security Policy** (*Containment*) - Update security policy information.
* **Update Task Status** (*Containment*) - Update the status of a security task.

## Configure Microsoft Azure Security Center in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Username**. Enter the username of a Microsoft Azure Security Center admin user authorized to authenticate the integration.

* **Password**. Enter the admin user password.

* **Directory (Tenant) ID**. Enter the [tenant ID](https://learn.microsoft.com/en-us/azure/healthcare-apis/register-application#application-id-client-id) of the AAD directory in which you created the application.

* **Application (Client) ID**. Enter your Microsoft 365 Defender [application ID](https://learn.microsoft.com/en-us/azure/healthcare-apis/register-application#application-id-client-id).

* **Application (Client) Secret**. Enter your application (client) secret.

* **Subscription ID**. Enter your [subscription ID](https://learn.microsoft.com/en-us/azure/azure-portal/get-subscription-tenant-id). The subscription ID is a GUID that uniquely identifies your subscription to use Azure services.

* **Scope**. Enter the [scope](https://learn.microsoft.com/en-us/azure/role-based-access-control/scope-overview) to use.
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/microsoft-azure-security-center-configuration.png')} style={{border:'1px solid gray'}} alt="Microsoft Azure Security Center configuration" width="400"/>

For information about Microsoft Defender for Cloud ([formerly Azure Security Center](https://techcommunity.microsoft.com/blog/microsoftdefendercloudblog/a-new-name-for-multi-cloud-security-microsoft-defender-for-cloud/2943020)), see [Microsoft Defender for Clolud documentation](https://learn.microsoft.com/en-us/azure/defender-for-cloud/).

## Change Log

* March 22, 2019 - First upload
* March 11, 2022 - Logo
* June 21, 2023 (v1.1) - Updated the integration with Environmental Variables
