---
title: Google Firestore
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/google.png')} alt="google" width="80"/>

***Version: 1.0  
Updated: Oct 17, 2025***

Google Firestore is a flexible, scalable NoSQL cloud database, built on Google Cloud infrastructure, to store and sync data for client and server-side development.

## Actions

* **List Collections** (*Enrichment*) - List all the top level collections.
* **Get Document** (*Enrichment*) - Get the document using specified document ID.

## Google Firestore configuration

Our Google Firestore integration support two types of authentication, Service Account and WIF (Workload Identity Federation). We recommend using WIF since it is more secure and easier to manage. For more information, see [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation).

## Required AWS details from Sumo Logic

To configure the Google Cloud IAM integration using WIF authentication, you need the following AWS details from Sumo Logic. These details are essential for setting up the Workload Identity Federation (WIF) credentials in Google Workspace:
* Deployment name is the unique name of your Sumo Logic [deployment](/docs/api/about-apis/getting-started/#documentation), for example, `dub`, `fra`, etc. 
* Sumo Logic AWS account ID: `926226587429`
* Sumo Logic AWS role: `<deployment_name>-csoar-automation-gcpiam`
* Sumo Logic AWS Lambda function: `<deployment_name>-csoar-automation-gcpiam`
* Full ARN: `arn:aws:sts::926226587429:assumed-role/<deployment_name>-csoar-automation-gcpiam/<deployment_name>-csoar-automation-gcpiam`


### Workload Identity Federation (WIF) authentication

To [create WIF credentials](https://cloud.google.com/iam/docs/workload-identity-federation) in Google Workspace needed to configure the Google Cloud IAM integration, follow these steps:
1. Log in to the [Google Cloud](https://console.cloud.google.com) portal.
2. Select a Google Cloud project (or create a new one).
3. Go to the **API&Services**
4. In the same page click on **ENABLED API AND SERVICES** and search for Cloud Resource Manager API, IAM Service Account Credentials API, Identity and Access Management (IAM) API, Security Token Service API and enable it all.
5. Go to the **IAM & Admin** > **Service Accounts** page.
6. Click **CREATE SERVICE ACCOUNT** [Service Account](https://cloud.google.com/iam/docs/service-accounts-create) is required to access the Google Cloud IAM.
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
19. Download the WIF `conf.json` file. Make sure you save it in a safe place. Use the JSON content to configure the Google Cloud IAM integration to use WIF authentication in Automation Service and Cloud SOAR. 

### Service Account authentication

To [create service account credentials](https://developers.google.com/workspace/guides/create-credentials) in Google Workspace needed to configure the Google Firestore app integration, follow these steps:

1. Log in to the [Google Cloud](https://console.cloud.google.com) portal.
2. Select a Google Cloud project (or create a new one).
3. Go to the **API & Services** > **Credentials** page.
4. In the same page click on **ENABLES API AND SERVICES** and search for Google Firestore and enable it.
5. Click **CREATE CREDENTIALS** and select **Service Account**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-1.png')} style={{border:'1px solid gray'}} alt="google-drive" width="800"/>
6. Enter a service account name to display in the Google Cloud console. The Google Cloud console generates a service account ID based on this name.
7. (Optional) Enter a description of the service account.
8. Skip two optional grant permissions steps and click **Done** to complete the service account creation.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-2.png')} style={{border:'1px solid gray'}} alt="google-drive" width="800"/>
9. Click on the generated service account to open the details.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-3.png')} style={{border:'1px solid gray'}} alt="google-drive" width="800"/>
10. Under the **KEYS** tab, click **ADD KEY** and choose **Create new key**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-4.png')} style={{border:'1px solid gray'}} alt="google-drive" width="800"/>
11. Click on **CREATE** (make sure **JSON** is selected).<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-5.png')} style={{border:'1px solid gray'}} alt="google-drive" width="400"/>
12. The JSON file is downloaded. Make sure you save it in a safe place.
13. Enable the Admin SDK API for the project at [https://console.cloud.google.com/flows/enableapi?apiid=admin.googleapis.com](https://console.cloud.google.com/flows/enableapi?apiid=admin.googleapis.com).

## Configure Google Firestore in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Private Key Json**. Provide the content of the JSON file generated [above](#google-firestore-configuration). Open the file and copy-paste the whole content in the field.
* **Database ID**. Enter the Firestore database ID. For default databases, use `(default)`.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/google-firestore.png')} style={{border:'1px solid gray'}} alt="Google Firestore configuration" width="400"/>

For information about Google Firestore, see [Google Firestore documentation](https://firebase.google.com/docs/firestore).

## Change Log

* October 17, 2025 (v1.0) - First upload
