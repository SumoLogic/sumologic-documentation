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
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Host**. Enter your Mattermost [URL](https://docs.mattermost.com/configure/authentication-configuration-settings.html), for example, `https://XXX.cloud.mattermost.com/`

* **User Email**. Enter the Mattermost email for an admin user authorized to authenticate the integration.

* **Password**. Enter the password for the admin user.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/mattermost-configuration.png')} style={{border:'1px solid gray'}} alt="Mattermost configuration" width="400"/>

For information about Mattermost, see [Mattermost documentation](https://docs.mattermost.com/index.html).

## Change Log

* February 15, 2022 - First upload
* July 7, 2023 (v1.3)
    + Updated the integration with Environmental Variables
    + Changed type to Notification for all actions
