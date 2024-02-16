---
title: Telegram V2
description: ''
tags: []
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/telegram-v2.png')} alt="tenable.io" width="100"/>

***Version: 2.1  
Updated: Jul 07, 2023***

Send messages from Cloud SOAR integration with Telegram V2.

## Actions

* **Send Message** (*Enrichment*) - Send a new message

## Telegram V2 Configuration

In Telegram application, create new bot sending a message /newbot to Botfather. Choose name and username for your bot. After crating your bot you will receive a message with your token to access the HTTP API. Keep your token secure and store it safely.

## Telegram V2 in Automation Service and Cloud SOAR

1. To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation. <br/>![](/img/platform-services/automation-service/app-central/integrations/telegram-v2/telegram-v2-1.png)

1. In the Automation section, on the left menu, click Integrations. <br/>![](/img/platform-services/automation-service/app-central/integrations/telegram-v2/telegram-v2-2.png)

1. After the list of the integrations appears, search for the integration and click on the row.

1. The integration details will appear. Click on the "+" button to add new Resource. <br/>![](/img/platform-services/automation-service/app-central/integrations/telegram-v2/telegram-v2-3.png)

1. Populate all the required fields (\*) and then click Save.
   * URL: the Telegram URL `https://api.telegram.org/`
   * API Token: the API Token you copied earlier when creating your bot. <br/>![](/img/platform-services/automation-service/app-central/integrations/telegram-v2/telegram-v2-4.png)

1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right. <br/>![](/img/platform-services/automation-service/app-central/integrations/telegram-v2/telegram-v2-5.png)

1. Click Test. <br/>![](/img/platform-services/automation-service/app-central/integrations/telegram-v2/telegram-v2-6.png)   

1. You should receive a successful notification in the bottom right corner. <br/>![](/img/platform-services/automation-service/app-central/integrations/telegram-v2/telegram-v2-7.png)

:::note
* The bot must be Administrator of the chat to send your message.
* The chat ID will be sent without writing it as parameter in Chat field if there are chat updates in 24 hours. Otherwise, needs to be send a message to the chat in Telegram application to continue. Other possible way to obtain chat ID is also from Telegram application following the steps: go on the group of choice, add @rose bot, type the command /id and chat ID will be sent. Use that value in parameter for Chat.
:::

## Change Log

* February 12, 2021 - First upload
* July 7, 2023 (v2.1) - Updated the integration with Environmental Variables
