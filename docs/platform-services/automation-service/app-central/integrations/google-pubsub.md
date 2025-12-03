---
title: Google PubSub
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/google.png')} alt="google" width="80"/>

***Version: 1.0  
Updated: Dec 3, 2025***

Google Pub/Sub is a managed messaging service designed for event-driven applications and asynchronous message transmission. It supports real-time message delivery, helping systems decouple microservices and manage high-throughput data pipelines.


## Actions

* **Get Subscription IAM Policy** (*Enrichment*) - Retrieves the IAM policy of a subscription to identify who can publish, pull, or administer it.
* **List Topics and Subscriptions** (*Enrichment*) - Lists all Pub/Sub topics and subscriptions in the project, including their configuration details.
* **Pause Subscription** (*Containment*) - Temporarily stops message delivery by clearing the push endpoint. This action works only for Push subscriptions.
* **Pull Messages** (*Enrichment*) - Fetches messages from a pull subscription for debugging or forensic analysis. This action works only for Pull subscriptions.
* **Resume Subscription** (*Containment*) - Restores the push endpoint to re-enable message delivery after a pause. This action works only for Push subscriptions.
* **Update Subscription Policy** (*Containment*) - Modifies IAM bindings (adds/removes members) on the subscription for access control.

## Google PubSub configuration

Our Google PubSub integration support two types of authentication, Service Account and WIF (Workload Identity Federation). We recommend using WIF since it is more secure and easier to manage. For more information, see [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation).

## Required AWS details from Sumo Logic

To configure the Google PubSub integration using WIF authentication, you need the following AWS details from Sumo Logic. These details are essential for setting up the Workload Identity Federation (WIF) credentials in Google Workspace:
* Deployment name is the unique name of your Sumo Logic [deployment](/docs/api/about-apis/getting-started/#documentation), for example, `dub`, `fra`, etc. 
* Sumo Logic AWS account ID: `926226587429`
* Sumo Logic AWS role: `<deployment_name>-csoar-automation-gcpiam`
* Sumo Logic AWS Lambda function: `<deployment_name>-csoar-automation-gcpiam`
* Full ARN: `arn:aws:sts::926226587429:assumed-role/<deployment_name>-csoar-automation-gcpiam/<deployment_name>-csoar-automation-gcpiam`


### Workload Identity Federation (WIF) authentication

To [create WIF credentials](https://cloud.google.com/iam/docs/workload-identity-federation) in Google Workspace needed to configure the Google PubSub integration, follow these steps:
1. Log in to the [Google Cloud](https://console.cloud.google.com) portal.
2. Select a Google Cloud project (or create a new one).
3. Go to the **API&Services**
4. In the same page click on **ENABLED API AND SERVICES** and search for Cloud Resource Manager API, IAM Service Account Credentials API, Identity and Access Management (IAM) API, Security Token Service API, Cloud Pub/Sub API and enable it all.
5. Go to the **IAM & Admin** > **Service Accounts** page.
6. Click **CREATE SERVICE ACCOUNT** [Service Account](https://cloud.google.com/iam/docs/service-accounts-create) is required to access the Google PubSub.
7. While creating the service account, in **Permissions** add the role **Service Account Token Creator**, **Pub/Sub Viewer**, **Pub/Sub Admin**, **Pub/Sub Subscriber**, **Pub/Sub Publisher** and click on **DONE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-11.png')} style={{border:'1px solid gray'}} alt="google-chat" width="800"/>
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
19. Download the WIF `conf.json` file. Make sure you save it in a safe place. Use the JSON content to configure the Google PubSub integration to use WIF authentication in Automation Service and Cloud SOAR. 


### Service Account authentication
To [create service account credentials](https://developers.google.com/workspace/guides/create-credentials) in Google Workspace needed to configure the Google PubSub integration, follow these steps:

1. Log in to the [Google Cloud](https://console.cloud.google.com) portal.
2. Select a Google Cloud project (or create a new one).
3. Go to the **API&Services** > **Credentials** page.
4. In the same page click on **ENABLES API AND SERVICES** and search for Cloud Resource Manager API, IAM Service Account Credentials API, Identity and Access Management (IAM) API, Security Token Service API and enable it.
5. Click **CREATE CREDENTIALS** and select **Service Account**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-1.png')} style={{border:'1px solid gray'}} alt="google-drive" width="800"/>
6. Enter a service account name to display in the Google Cloud console. The Google Cloud console generates a service account ID based on this name.
7. (Optional) Enter a description of the service account.
8. Skip two optional grant permissions steps and click **Done** to complete the service account creation.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-2.png')} style={{border:'1px solid gray'}} alt="google-drive" width="800"/>
9. Click on the generated service account to open the details.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-3.png')} style={{border:'1px solid gray'}} alt="google-drive" width="800"/>
10. Under the **KEYS** tab, click **ADD KEY** and choose **Create new key**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-4.png')} style={{border:'1px solid gray'}} alt="google-drive" width="800"/>
11. Click on **CREATE** (make sure **JSON** is selected).<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-5.png')} style={{border:'1px solid gray'}} alt="google-drive" width="400"/>
12. The JSON file is downloaded. Make sure you save it in a safe place.

## Configure Google PubSub in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Authentication Type**. Select the authentication type: **Service Account Private Key Json** or **Workload Identity Federation Private Key json** and provide the selected type Json content.
* **scopes**. Default scope is already added as `https://www.googleapis.com/auth/cloud-platform`, if not then add this scope.
* **Project ID**. Provide the Google Cloud Project ID where the IAM actions will be performed.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/google-cloudsql-postgres.png')} style={{border:'1px solid gray'}} alt="Google CloudSQL Postgres configuration" width="400"/>

For information about Google PubSub, see [Google PubSub documentation](https://docs.cloud.google.com/pubsub/docs/apis).

## Change Log

* December 3, 2025 (v1.0) - First upload