---
title: ProtectOnce
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/protectonce.png')} alt="protectonce" width="100"/>

***Version: 1.3  
Updated: Mar 4, 2024***

The ProtectOnce provides SaaS companies with a radically simplified agentless solution that secures API-driven applications in a matter of minutes, providing deep visibility into all APIs and helping to prevent complex attacks.

## Actions

* **Get Incidents** *(Enrichment)* - Returns all Incidents.
* **Netskope Get Incidents Daemon ProtectOnce** *(Daemon)* - Automatically gather Incidents from ProtectOnce.

## Configure ProtectOnce in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/protectonce/protectonce-3.png')} style={{border:'1px solid gray'}} alt="protectonce" width="800"/>
1. Populate all the required fields (\*) and then click **SAVE**.
    * **Server URL**. URL for API.
    * **Email**. Email you use to log in into the system.
    * **Password**. The password of your email.
    * **Application ID**. The id of the application.
1. Additionally, if need you can populate the query daemons.
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/protectonce/protectonce-4.png')} style={{border:'1px solid gray'}} alt="protectonce" width="400"/>
1. Click **Test**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/protectonce/protectonce-5.png')} style={{border:'1px solid gray'}} alt="protectonce" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/protectonce/protectonce-6.png')} style={{border:'1px solid gray'}} alt="protectonce" width="400"/>

## Change Log

* December 26, 2022 - First upload
* July 18, 2023 (v1.2) - Removed leading/trailing spaces
* March 4, 2024 (v1.3) - Updated code for compatibility with Python 3.12
