---
title: Telegram V2
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/telegram-v2.png')} alt="tenable.io" width="100"/>

***Version: 2.1  
Updated: Jul 07, 2023***

Send messages from Cloud SOAR integration with Telegram V2.

## Actions

* **Send Message** (*Enrichment*) - Send a new message.

## Telegram V2 configuration

In Telegram application, create new bot sending a message /newbot to Botfather. Choose name and username for your bot. After crating your bot you will receive a message with your token to access the HTTP API. Keep your token secure and store it safely.

## Configure Telegram V2 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about Telegram, see the [Telegram website](https://telegram.org/).

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/telegram-v2/telegram-v2-3.png')} style={{border:'1px solid gray'}} alt="telegram" width="700"/>
1. Populate all the required fields (\*) and then click **SAVE**.
   * **URL**. The Telegram URL `https://api.telegram.org/`.
   * **API Token**. the API Token you copied earlier when creating your bot.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/telegram-v2/telegram-v2-4.png')} style={{border:'1px solid gray'}} alt="telegram" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/telegram-v2/telegram-v2-5.png')} style={{border:'1px solid gray'}} alt="telegram" width="400"/>
1. Click **Test**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/telegram-v2/telegram-v2-6.png')} style={{border:'1px solid gray'}} alt="telegram" width="400"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/telegram-v2/telegram-v2-7.png')} style={{border:'1px solid gray'}} alt="telegram" width="400"/>

:::note
* The bot must be Administrator of the chat to send your message.
* The chat ID will be sent without writing it as parameter in Chat field if there are chat updates in 24 hours. Otherwise, needs to be send a message to the chat in Telegram application to continue. Other possible way to obtain chat ID is also from Telegram application following the steps: go on the group of choice, add @rose bot, type the command /id and chat ID will be sent. Use that value in parameter for Chat.
:::

## Change Log

* February 12, 2021 - First upload
* July 7, 2023 (v2.1) - Updated the integration with Environmental Variables
