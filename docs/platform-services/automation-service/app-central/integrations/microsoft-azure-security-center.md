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

<IntegrationsAuth/>

For information about Microsoft Defender for Cloud ([formerly Azure Security Center](https://techcommunity.microsoft.com/blog/microsoftdefendercloudblog/a-new-name-for-multi-cloud-security-microsoft-defender-for-cloud/2943020)), see [Microsoft Defender for Clolud documentation](https://learn.microsoft.com/en-us/azure/defender-for-cloud/).

## Change Log

* March 22, 2019 - First upload
* March 11, 2022 - Logo
* June 21, 2023 (v1.1) - Updated the integration with Environmental Variables
