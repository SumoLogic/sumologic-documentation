---
title: Mattermost
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/mattermost.png')} alt="mattermost" width="100"/>

***Version: 1.3  
Updated: Jul 07, 2023***

Mattermost designed as an internal chat for companies and organisations for online chat service with file sharing,
search, and integrations.

* **Get Teams** *(Notification)* - Returns a list of teams.
* **Get Channels** *(Notification)* - Returns a list of channels.
* **Create Channel** *(Notification)* - Create a new channel.
* **Invite To Channel** *(Notification)* - Invite user to channel.
* **Post Message To Channel** *(Notification)* - Post a message to a specific channel.

## Configure Mattermost in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. In the Automation section, on the left menu, click **Integrations**. 
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/mattermost/mattermost-3.png')} style={{border:'1px solid gray'}} alt="mattermost" width="400"/>
1. Populate all the required fields (\*):
   * **Label**. Name of the resource.
   * **URL**. URL of Mattermost, for example `https://xxx.yyy.mattermost.com` is already provided.
   * **User Email**
   * **Password**<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/mattermost/mattermost-4.png')} style={{border:'1px solid gray'}} alt="mattermost" width="400"/>
1. Click **SAVE**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/mattermost/mattermost-5.png')} style={{border:'1px solid gray'}} alt="mattermost" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/mattermost/mattermost-6.png')} style={{border:'1px solid gray'}} alt="mattermost" width="400"/>
1. Click **TEST SAVED SETTINGS**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/mattermost/mattermost-7.png')} style={{border:'1px solid gray'}} alt="mattermost" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/mattermost/mattermost-8.png')} style={{border:'1px solid gray'}} alt="mattermost" width="400"/>
## Change Log

* February 15, 2022 - First upload
* July 7, 2023 (v1.3)
    + Updated the integration with Environmental Variables
    + Changed type to Notification for all actions
