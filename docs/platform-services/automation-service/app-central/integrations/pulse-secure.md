---
title: Pulse Secure
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/pulse-secure.png')} alt="pulse-secure" width="100"/>

***Version: 1.1  
Updated: Jul 07, 2023***

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

<IntegrationsAuth/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/pulse-secure-configuration.png')} style={{border:'1px solid gray'}} alt="Pulse Secure configuration" width="400"/>

For information about Secure Access Client (formerly Pulse Secure), see [Secure Access Client documentation](https://help.ivanti.com/ps/help/en_US/ISAC/22.X/spg-22.X/landingpage.htm).

## Change Log

* September 2, 2020 - First upload
* July 7, 2023 (v1.1) - Updated the integration with Environmental Variables
