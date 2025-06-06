---
title: Forcepoint Web Security
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/forcepoint-web-security.png')} alt="forcepoint-web-security" width="100"/>

***Version: 1.2  
Updated: Jul 18, 2023***

Forcepoint Web Security is a flexible web protection solution that provides fine-tuned control over your users’ web access, while providing comprehensive protection against web threats such as viruses, malware, data loss, and phishing attacks. 

## Actions

* **Add Managed Category** *(Containment)* - Add API-managed Category.
* **Block IP** *(Containment)* - Add IP addresses to an API-managed category.
* **Block URL** *(Containment)* - Add URLs to an API-managed category.
* **Delete Managed Category** *(Containment)* - Delete API-managed Category.
* **Unblock IP** *(Containment)* - Delete IP addresses from an API-managed category.
* **Unblock URL** *(Containment)* - Delete URLs from an API-managed category.
* **Get System Status** *(Enrichment)* - Get system and transaction status.
* **List Block IP** *(Enrichment)* - List IP addresses in an API-managed category.
* **List Block URL** *(Enrichment)* - List URLs in an API-managed category.
* **List Managed Categories***(Enrichment)* - Lists all API-managed categories.

## Configure Forcepoint Web Security in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/forcepoint-web-security-configuration.png')} style={{border:'1px solid gray'}} alt="Forcepoint configuration" width="400"/>

For information about Forcepoint Web Security, see [Forcepoint documentation](https://support.forcepoint.com/s/article/Web-Security-Documentation).

## Change Log

* April 22, 2021 - First upload
* June 26, 2023 (v1.1) - Updated the integration with Environmental Variables
* July 18, 2023 (v1.2) - Code refactoring
