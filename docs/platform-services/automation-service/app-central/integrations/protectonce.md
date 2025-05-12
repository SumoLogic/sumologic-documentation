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

    * **Server URL**. URL for API.
    * **Email**. Email you use to log in into the system.
    * **Password**. The password of your email.
    * **Application ID**. The id of the application.
    * Additionally, if you need you can populate the query daemons.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/protectonce-configuration.png')} style={{border:'1px solid gray'}} alt="ProtectOnce configuration" width="400"/>

For information about ProtectOnce, see the [ProtectOnce website](https://app.protectonce.com/).

## Change Log

* December 26, 2022 - First upload
* July 18, 2023 (v1.2) - Removed leading/trailing spaces
* March 4, 2024 (v1.3) - Updated code for compatibility with Python 3.12
