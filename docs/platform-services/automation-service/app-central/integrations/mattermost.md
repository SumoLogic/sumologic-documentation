---
title: Mattermost
description: ''
tags: [ ]
---

![](/img/platform-services/automation-service/app-central/logos/mattermost.png)

Version: 1.3  
Updated: Jul 07, 2023

Mattermost designed as an internal chat for companies and organisations for online chat service with file sharing,
search, and integrations.

* **Get Teams** *(Notification)* - Returns a list of teams
* **Get Channels** *(Notification)* - Returns a list of channels
* **Create Channel** *(Notification)* - Create a new channel
* **Invite To Channel** *(Notification)* - Invite user to channel
* **Post Message To Channel** *(Notification)* - Post a message to a specific channel

## Configure Mattermost in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner
by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/mattermost/mattermost-1.png)

In the Automation section, in the top left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/mattermost/mattermost-2.png)

After the list of the integrations appears search/look for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/mattermost/mattermost-3.png)

Populate all the required fields (\*):

* Label - Name of the resource
* URL: URL of Mattermost (Example ’'https://xxx.yyy.mattermost.com'’ is already provided)
* User Email
* Password

![](/img/platform-services/automation-service/app-central/integrations/mattermost/mattermost-4.png)

Then click save settings.

![](/img/platform-services/automation-service/app-central/integrations/mattermost/mattermost-5.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/mattermost/mattermost-6.png)

Click Test Saved Settings.

![](/img/platform-services/automation-service/app-central/integrations/mattermost/mattermost-7.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/mattermost/mattermost-8.png)

## Change Log

* February 15, 2022 - First upload
* July 7, 2023 (v1.3)
    + Updated the integration with Environmental Variables
    + Changed type to Notification for all actions
