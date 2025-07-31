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

In Telegram application, create new [bot](https://core.telegram.org/bots) sending a message /newbot to Botfather. Choose name and username for your bot. After creating your bot you will receive a message with your token to access the HTTP API. Keep your token secure and store it safely.

:::note
* The bot must be the administrator of the chat to send your message.
* The chat ID will be sent without writing it as a parameter in the Chat field if there are chat updates in 24 hours. Otherwise, it needs to send a message to the chat in the Telegram application to continue. Another possible way to obtain a chat ID is to follow these steps in the Telegram application: go on the group of choice, add @rose bot, type the command /id, and the chat ID will be sent. Use that value in the parameter for Chat.
:::

## Configure Telegram V2 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **URL**. Enter your Telegram API URL, for example, `https://api.telegram.org/`.

* **API Token**. Enter the API [token](https://core.telegram.org/bots/tutorial#obtain-your-bot-token) you [copied earlier](#telegram-v2-configuration) when creating your bot.
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/telegram-v2-configuration.png')} style={{border:'1px solid gray'}} alt="Telegram V2 configuration" width="400"/>

For information about Telegram, see the [Telegram website](https://telegram.org/).

## Change Log

* February 12, 2021 - First upload
* July 7, 2023 (v2.1) - Updated the integration with Environmental Variables
