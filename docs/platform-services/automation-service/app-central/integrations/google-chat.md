---
title: Google Chat
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/google.png')} alt="google" width="80"/>

***Version: 2.2  
Updated: Sept 25, 2025***

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

Our Google Chat integration support two types of authentication, Service Account and WIF (Workload Identity Federation). We recommend using WIF since it is more secure and easier to manage. For more information, see [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation).

## Required AWS details from Sumo Logic

To configure the Google Chat integration using WIF authentication, you need the following AWS details from Sumo Logic. These details are essential for setting up the Workload Identity Federation (WIF) credentials in Google Workspace:
* Sumo Logic AWS account ID: `246946804217`
* Sumo Logic AWS role: `stag-csoar-automation-gcpiam`
* Sumo Logic AWS Lambda function: `stag-csoar-automation-gcpiam`
* Full ARN: `arn:aws:sts::246946804217:assumed-role/stag-csoar-automation-gcpiam/stag-csoar-automation-gcpiam`


### Workload Identity Federation (WIF) authentication

To [create WIF credentials](https://cloud.google.com/iam/docs/workload-identity-federation) in Google Workspace needed to configure the Google Chat app integration, follow these steps:
1. Log in to the [Google Cloud](https://console.cloud.google.com) portal.
2. Select a Google Cloud project (or create a new one).
3. Go to the **API&Services**
4. In the same page click on **ENABLED API AND SERVICES** and search for Google Chat, Cloud Resource Manager API, IAM Service Account Credentials API, Identity and Access Management (IAM) API, Security Token Service API and enable it all.
5. Go to the **IAM & Admin** > **Service Accounts** page.
6. Click **CREATE SERVICE ACCOUNT** [Service Account](https://cloud.google.com/iam/docs/service-accounts-create) is required to access the Google Chat API.
7. While creating the service account, in **Permissions** add the role **Service Account Token Creator** and click on **DONE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-11.png')} style={{border:'1px solid gray'}} alt="google-chat" width="800"/>
8. Go to the **IAM & Admin** > **Workload Identity Federation** page. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-4.png')} style={{border:'1px solid gray'}} alt="google-chat" width="800"/>
9. Click **CREATE POOL**, provide the details, and click on **CONTINUE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-5.png')} style={{border:'1px solid gray'}} alt="google-chat" width="800"/>
10. Add **Provider details**. Select **AWS** as the provider type and provide the details of the AWS Account ID which is provided by Sumo Logic. Click on **CONTINUE** and **SAVE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-6.png')} style={{border:'1px solid gray'}} alt="google-chat" width="800"/>
11. Now you will see the created pool and provider. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-8.png')} style={{border:'1px solid gray'}} alt="google-chat" width="800"/>
12. Now we have to build a principal name to configure in Sumo Logic. The format of the principal name is: `principalSet://iam.googleapis.com/projects/{YourProjectID}/locations/global/workloadIdentityPools/{YourPoolName}/attribute.aws_role/arn:aws:sts::{SumoAWSAccountID}:assumed-role/{SumoAWSRole}/{SumoAWSLambdaFunction}`. 
13. Go to the **IAM & Admin** > **IAM** page and click on **Grant Access** to add a new principal. 
14. In the **New principals** field, provide the above principal name and select the role **Workload Identity User**. Click on **SAVE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-12.png')} style={{border:'1px solid gray'}} alt="google-chat" width="800"/>
15. Go to the **IAM & Admin** > **Workload Identity Federation** page and select the pool which was created above. 
16. Click on **Grant Access** > **Grant access using service account impersonation**. 
17. Select the service account which created above, select the principle as aws_role and provide the arn `arn:aws:sts::{SumoAWSAccountID}:assumed-role/{SumoAWSRole}` and click on **SAVE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-10.png')} style={{border:'1px solid gray'}} alt="google-chat" width="800"/>
18. Again go to **Grant Access** > **Grant access using service account impersonation**. Select the service account which was created above. Select the principle as `aws_role` and provide the arn `arn:aws:sts::{SumoAWSAccountID}:assumed-role/{SumoAWSRole}/{SumoAWSLambdaFunction}`. Click on **SAVE**. 
19. Download the WIF `conf.json` file. Make sure you save it in a safe place. Use the JSON content to configure the Google Chat integration to use WIF authentication in Automation Service and Cloud SOAR. 
20. To configure the app in Google Chat API, go to **APIs & Services**, select **Google Chat API**, and in **CONFIGURATION** provide the details and click on **SAVE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-10.png')} style={{border:'1px solid gray'}} alt="google-drive" width="800"/>
21. Go to the **Google Chat App** and add the above app in that. Also, to add above app in space, go to **space** and in **Apps & integration** add the app.


### Service Account authentication
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
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* Provide the **Service Account Private Key Json** or **WIF Private Key Json** based on your configuration.
* **scopes**. Default scope is already added as `https://www.googleapis.com/auth/chat.bot`, if not then add this scope.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/google-chat-configuration.png')} style={{border:'1px solid gray'}} alt="Google Chat configuration" width="400"/>

For information about Google Chat, see [Google Chat documentation](https://developers.google.com/workspace/chat/overview).

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
* September 25, 2025 (v2.2) - Updated the WIF configuration steps