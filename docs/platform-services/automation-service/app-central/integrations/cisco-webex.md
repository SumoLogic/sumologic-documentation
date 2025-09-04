---
title: Cisco Webex
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/cisco-webex.png')} alt="cisco-webex" width="70"/>

***Version: 1.3  
Updated: Jun 27, 2023***

Cisco Webex is a solution for video conferencing, online meetings, screen share, and webinars.

## Actions

* **Add Member** (*Containment*) - Add member to a team.
* **Create Room** (*Containment*) - Create room.
* **Create Team** (*Containment*) - Create a team.
* **Create User** (*Containment*) - Create a new user account.
* **Delete Message** (*Containment*) - Delete a message.
* **Delete Team** (*Containment*) - Delete a team.
* **Delete User** (*Containment*) - Remove a user from the system.
* **Edit Message** (*Containment*) - Edit a message.
* **List Rooms***(Enrichment)* - List current rooms.
* **List Users***(Enrichment)* - List people in your organization.
* **Send Message** (*Notification*) - Send a message.
* **Update Room** (*Containment*) - Update a room.

## Configure Cisco Webex in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter the API URL for your Cisco Webex instance. The default URL is `https://webexapis.com/`

* **Token**. Enter a Cisco Webex [token](https://developer.webex.com/docs/getting-your-personal-access-token).
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/cisco-webex-configuration.png')} style={{border:'1px solid gray'}} alt="Cisco Webex configuration" width="400"/>

For information about Cisco Webex, see [Webex documentation](https://developer.webex.com/docs).

## Category

Messaging

## Change Log

* May 12, 2021 - First upload
* November 30, 2022
	+ New Actions
		- Create User
		- Delete User
		- List Users
	+ Modified Actions
		- Add Member
		- Create Room
		- Create Team
		- Delete Message
		- Delete Team
		- Edit Message
		- List Rooms
		- Send Message
		- Update Room
* June 27, 2023 (v1.3) - Updated the integration with Environmental Variables
