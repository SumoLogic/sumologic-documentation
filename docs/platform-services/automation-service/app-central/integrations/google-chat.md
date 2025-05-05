---
title: Google Chat
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/google.png')} alt="google" width="80"/>

***Version: 2.1  
Updated: Dec 06, 2024***

Google Chat is an intelligent and secure communication and collaboration tool, built for teams.

:::info Preferable
To send rich text messages, use the Create Message action with `Disable HTML` in the message body. Follow the directions in the [Google Chat documentation](https://developers.google.com/workspace/chat/format-messages).
:::

## Actions

* **Create Message** (*Notification*) - Send messages privately to a specific Chat user.
* **Delete Message** (*Containment*) - Delete a message that the Chat app sent.
* **Get Member** (*Enrichment*) - Get details about a membership in a space.
* **Get Message** (*Enrichment*) - Get details about a message.
* **Get Space** (*Enrichment*) - Get details about a space.
* **List Members** (*Enrichment*) - Lists memberships in spaces that the Chat app has access to.
* **List Spaces** (*Enrichment*) - Lists spaces that the Chat app has access to.
* **Update Message** (*Containment*) - Update the message.

## Google Chat configuration

To [create service account credentials](https://developers.google.com/workspace/guides/create-credentials) in Google Workspace needed to configure the Google Chat app integration, follow these steps:

1. Log in to the [Google Cloud](https://console.cloud.google.com) portal.
2. Select a Google Cloud project (or create a new one).
3. Go to the **API&Services** > **Credentials** page.
4. In the same page click on **ENABLES API AND SERVICES** and search for Google Chat and enable it.
5. Click **CREATE CREDENTIALS** and select **Service Account**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-1.png')} style={{border:'1px solid gray'}} alt="google-drive" width="800"/>
6. Enter a service account name to display in the Google Cloud console. The Google Cloud console generates a service account ID based on this name.
7. (Optional) Enter a description of the service account.
8. Skip two optional grant permissions steps and click **Done** to complete the service account creation.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-2.png')} style={{border:'1px solid gray'}} alt="google-drive" width="800"/>
9. Click on the generated service account to open the details.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-3.png')} style={{border:'1px solid gray'}} alt="google-drive" width="800"/>
10. Under the **KEYS** tab, click **ADD KEY** and choose **Create new key**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-4.png')} style={{border:'1px solid gray'}} alt="google-drive" width="800"/>
11. Click on **CREATE** (make sure **JSON** is selected).<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-5.png')} style={{border:'1px solid gray'}} alt="google-drive" width="400"/>
12. The JSON file is downloaded. Make sure you save it in a safe place.
13. To configure the app in Google Chat API, go to **APIs & Services**, select **Google Chat API**, and in **CONFIGURATION** provide the details and click on **SAVE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-10.png')} style={{border:'1px solid gray'}} alt="google-drive" width="800"/>
14. Go to the **Google Chat App** and add the above app in that. Also, to add above app in space, go to **space** and in **Apps & integration** add the app.

## Configure Google Chat in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

For information about Google Chat, see [Google Chat documentation](https://developers.google.com/workspace/chat/overview).

* **Label**. The desired name for the resource.
* **Private Key Json**. Provide the content of the JSON file generated in the previous steps. Open the file and
  copy-paste the whole content in the field.

## Use cases for sending messages

### Disable HTML

Send plain text messages with HTML formatting disabled. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-1.png')} style={{border:'1px solid gray'}} alt="google-drive" width="400"/>

### Compose rich text messages

Format your messages with rich text using [Google Chat Rich Text Message](https://developers.google.com/workspace/chat/format-messages). This allows you to enhance message readability with structured formatting options. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-2.png')} style={{border:'1px solid gray'}} alt="google-drive" width="400"/>

### Receive notifications

Use Google Chat to receive notifications, ensuring you promptly get important updates or alerts. Notifications will be displayed in a well-formatted text, making them easy to read and understand in Google Chat. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-3.png')} style={{border:'1px solid gray'}} alt="google-drive" width="400"/>

## Change Log

* August 27, 2024 (v2.0) - First upload
* October 29, 2024 (v2.0) - Updated the docs 
* December 06, 2024 (v2.1) - Added the Rich Text Message support in the Create Message action