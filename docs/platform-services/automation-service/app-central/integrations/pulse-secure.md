---
title: Pulse Secure
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/pulse-secure.png')} alt="Pulse Secure icon" width="100"/>

***Version: 1.2  
Updated: April 30, 2026***

Block users and their associated IP addresses with Pulse Secure.

## Actions

* **Get API Key** (*Enrichment*) - Get Pulse Secure API key.
* **Get User Authentication Realms** (*Enrichment*) - Get a user's authentication realms.
* **Get User Realms Source IPs** (*Enrichment*) - Get a user's IP addresses from their user realm.
* **Get User** (*Enrichment*) - Get a user's details.
* **List Authentication Servers** (*Enrichment*) - List all authentication servers.
* **List User Authentication Realms** (*Enrichment*) - List all user authentication realms.
* **List Users** (*Enrichment*) - List all users.
* **Block IP** (*Containment*) - Block an IP address.
* **Block User** (*Containment*) - Block a user.
* **Unblock User** *(Containment*) - Unblock user of system local authentication server.
* **Unblock IP** *(Containment*) - Unblock IP for user authentication realms.

## Category

Authentication, Identity, and Access Management.

## Configure Pulse Secure in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Server URL**. Enter your Pulse Secure server URL.

* **Username**. Enter the username of a Pulse Secure admin user authorized to authenticate the integration.

* **Password**. Enter the password for the admin user.

* API Key**. Enter a Pulse Secure API key.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/pulse-secure-configuration.png')} style={{border:'1px solid gray'}} alt="Pulse Secure configuration" width="400"/>

For information about Secure Access Client (formerly Pulse Secure), see [Secure Access Client documentation](https://help.ivanti.com/ps/help/en_US/ISAC/22.X/spg-22.X/landingpage.htm).

## Change Log

* September 2, 2020 - First upload
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables
* April 30, 2026 (v1.2) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
