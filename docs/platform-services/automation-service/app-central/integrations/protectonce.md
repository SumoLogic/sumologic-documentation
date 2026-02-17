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
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server URL**. Enter your ProtectOnce API URL.

* **Email**. Enter the email that an admin user uses to log in into the system.

* **Password**. Enter the admin user's password.

* **Application ID**. Enter the ID of the application. 

* **Query**. Populate the query daemons.

* **Start Date**. Enter the start date of the query. (Required for daemon action format `%Y-%m-%dT%H:%M:%S.%f`.)

* **End Date**. Enter the end date of the query. (Required for daemon action format `%Y-%m-%dT%H:%M:%S.%f`.)
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/protectonce-configuration.png')} style={{border:'1px solid gray'}} alt="ProtectOnce configuration" width="400"/>

For information about ProtectOnce, see the [ProtectOnce website](https://app.protectonce.com/).

## Change Log

* December 26, 2022 - First upload
* July 18, 2023 (v1.2) - Removed leading/trailing spaces
* March 4, 2024 (v1.3) - Updated code for compatibility with Python 3.12
