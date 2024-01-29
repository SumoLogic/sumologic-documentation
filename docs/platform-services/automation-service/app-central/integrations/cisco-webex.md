---
title: Cisco Webex
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/cisco-webex.png)

Version: 1.3  
Updated: Jun 27, 2023

Cisco Webex is a solution for video conferencing, online meetings, screen share, and webinars.

## Actions

* **Add Member** (*Containment*) - Add member to a team
* **Create Room** (*Containment*) - Create room
* **Create Team** (*Containment*) - Create a team
* **Create User** (*Containment*) - Create a new user account
* **Delete Message** (*Containment*) - Delete a message
* **Delete Team** (*Containment*) - Delete a team
* **Delete User** (*Containment*) - Remove a user from the system
* **Edit Message** (*Containment*) - Edit a message
* **List Rooms***(Enrichment)* - List current rooms
* **List Users***(Enrichment)* - List people in your organization
* **Send Message** (*Notification*) - Send a message
* **Update Room** (*Containment*) - Update a room

## Cisco Webex in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/cisco-webex/cisco-webex-1.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/cisco-webex/cisco-webex-2.png)

1. After the list of the integrations appears, search for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/cisco-webex/cisco-webex-3.png)

1. Populate all the required fields (\*)
   * Label: The resource name
   * URL: The default url is 'https://webexapis.com'/
   * Token: Your Cisco Webex token

1. Click Save. <br/>![](/img/platform-services/automation-service/app-central/integrations/cisco-webex/cisco-webex-4.png)

1. Click Test Saved Settings. <br/>![](/img/platform-services/automation-service/app-central/integrations/cisco-webex/cisco-webex-5.png)

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/cisco-webex/cisco-webex-6.png)

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
