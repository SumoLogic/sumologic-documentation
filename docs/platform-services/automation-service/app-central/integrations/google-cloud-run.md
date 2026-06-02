---
title: Google Cloud Run
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/google.png')} alt="google" width="80"/>

***Version: 1.0  
Updated: Jun 3, 2026***

Google Cloud Run is a fully managed serverless platform that lets you run stateless containers directly on top of Google's scalable infrastructure. Use this integration to inventory running services, manage access controls, and decommission services as part of automated response workflows.

## Actions

* **List Services** (*Enrichment*) - List all Cloud Run services in a project and region to inventory what is currently running.
* **Get Service** (*Enrichment*) - Retrieve configuration and metadata for a specific Cloud Run service including its URL, revision, and status.
* **Add Member To Role** (*Containment*) - Add a member (user, service account, or group) to a specific IAM role on a Cloud Run service to grant invoke or admin access.
* **Remove Member From Role** (*Containment*) - Remove a member from a specific IAM role on a Cloud Run service to revoke access during incident response.
* **Update Service IAM Policy** (*Containment*) - Modify the IAM policy on a Cloud Run service to restrict or expand who can invoke it.
* **Delete Service** (*Containment*) - Permanently delete a Cloud Run service to decommission legacy or compromised workloads quickly.

## Google Cloud Run configuration

Our Google Cloud Run integration supports two types of authentication: Service Account and WIF (Workload Identity Federation). We recommend using WIF since it is more secure and easier to manage. For more information, see [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation).

## Required AWS details from Sumo Logic

To configure the Google Cloud Run integration using WIF authentication, you need the following AWS details from Sumo Logic. These details are essential for setting up the Workload Identity Federation (WIF) credentials in Google Workspace:
* Deployment name is the unique name of your Sumo Logic [deployment](/docs/api/about-apis/getting-started/#documentation), for example, `dub`, `fra`, etc.
* Sumo Logic AWS account ID: `926226587429`
* Sumo Logic AWS role: `<deployment_name>-csoar-automation-gcpiam`
* Sumo Logic AWS Lambda function: `<deployment_name>-csoar-automation-gcpiam`
* Full ARN: `arn:aws:sts::926226587429:assumed-role/<deployment_name>-csoar-automation-gcpiam/<deployment_name>-csoar-automation-gcpiam`


### Workload Identity Federation (WIF) authentication

To [create WIF credentials](https://cloud.google.com/iam/docs/workload-identity-federation) in Google Workspace needed to configure the Google Cloud Run integration, follow these steps:
1. Log in to the [Google Cloud](https://console.cloud.google.com) portal.
2. Select a Google Cloud project (or create a new one).
3. Go to **API & Services**.
4. Click **ENABLED APIs AND SERVICES** and search for Cloud Resource Manager API, IAM Service Account Credentials API, Identity and Access Management (IAM) API, Security Token Service API, Cloud Run API, and enable them all.
5. Go to **IAM & Admin** > **Service Accounts** page.
6. Click **CREATE SERVICE ACCOUNT**. A [Service Account](https://cloud.google.com/iam/docs/service-accounts-create) is required to access Google Cloud Run.
7. While creating the service account, in **Permissions** add the roles **Service Account Token Creator**, **Cloud Run Admin**, and **Project IAM Admin**, then click **DONE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-11.png')} style={{border:'1px solid gray'}} alt="Add roles" width="800"/>
8. Go to **IAM & Admin** > **Workload Identity Federation** page. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-4.png')} style={{border:'1px solid gray'}} alt="Workload Identity Federation page" width="800"/>
9. Click **CREATE POOL**, provide the details, and click **CONTINUE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-5.png')} style={{border:'1px solid gray'}} alt="Create pool page" width="800"/>
10. Add **Provider details**. Select **AWS** as the provider type and provide the AWS Account ID supplied by Sumo Logic. Click **CONTINUE** and **SAVE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-6.png')} style={{border:'1px solid gray'}} alt="Provider details" width="800"/>
11. You will now see the created pool and provider. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-8.png')} style={{border:'1px solid gray'}} alt="Created pool and provider" width="800"/>
12. Build a principal name to configure in Sumo Logic. The format is: `principalSet://iam.googleapis.com/projects/{YourProjectID}/locations/global/workloadIdentityPools/{YourPoolName}/attribute.aws_role/arn:aws:sts::{SumoAWSAccountID}:assumed-role/{SumoAWSRole}/{SumoAWSLambdaFunction}`.
13. Go to **IAM & Admin** > **IAM** page and click **Grant Access** to add a new principal.
14. In the **New principals** field, provide the principal name from the previous step and select the role **Workload Identity User**. Click **SAVE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-12.png')} style={{border:'1px solid gray'}} alt="New principals" width="800"/>
15. Go to **IAM & Admin** > **Workload Identity Federation** page and select the pool created above.
16. Click **Grant Access** > **Grant access using service account impersonation**.
17. Select the service account created above, select the principle as `aws_role`, and provide the ARN `arn:aws:sts::{SumoAWSAccountID}:assumed-role/{SumoAWSRole}`, then click **SAVE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-10.png')} style={{border:'1px solid gray'}} alt="Provide ARN" width="800"/>
18. Again go to **Grant Access** > **Grant access using service account impersonation**. Select the service account created above. Select the principle as `aws_role` and provide the ARN `arn:aws:sts::{SumoAWSAccountID}:assumed-role/{SumoAWSRole}/{SumoAWSLambdaFunction}`. Click **SAVE**.
19. Download the WIF `conf.json` file. Make sure you save it in a safe place. Use the JSON content to configure the Google Cloud Run integration to use WIF authentication in Automation Service and Cloud SOAR.


### Service Account authentication

To [create service account credentials](https://developers.google.com/workspace/guides/create-credentials) in Google Workspace needed to configure the Google Cloud Run integration, follow these steps:

1. Log in to the [Google Cloud](https://console.cloud.google.com) portal.
2. Select a Google Cloud project (or create a new one).
3. Go to **API & Services** > **Credentials** page.
4. Click **ENABLED APIs AND SERVICES** and search for Cloud Resource Manager API, IAM Service Account Credentials API, Identity and Access Management (IAM) API, Security Token Service API, Cloud Run API, and enable them.
5. Click **CREATE CREDENTIALS** and select **Service Account**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-1.png')} style={{border:'1px solid gray'}} alt="Select Service Accounts" width="800"/>
6. Enter a service account name to display in the Google Cloud console. The Google Cloud console generates a service account ID based on this name.
7. (Optional) Enter a description of the service account.
8. Skip two optional grant permissions steps and click **Done** to complete the service account creation.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-2.png')} style={{border:'1px solid gray'}} alt="Complete service account creation" width="800"/>
9. Click on the generated service account to open the details.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-3.png')} style={{border:'1px solid gray'}} alt="Generated service account details" width="800"/>
10. Under the **KEYS** tab, click **ADD KEY** and choose **Create new key**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-4.png')} style={{border:'1px solid gray'}} alt="Create a new key" width="800"/>
11. Click **CREATE** (make sure **JSON** is selected).<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-5.png')} style={{border:'1px solid gray'}} alt="Click on Create" width="400"/>
12. The JSON file is downloaded. Make sure you save it in a safe place.

## Configure Google Cloud Run in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Authentication Type**. Select the authentication type: **Service Account Private Key Json** or **Workload Identity Federation Private Key json** and provide the selected type JSON content.

* **Scopes**. Default scope is already added as `https://www.googleapis.com/auth/cloud-platform`. If not, add this scope.

* **Project ID**. Provide the Google Cloud Project ID where the Cloud Run actions will be performed.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/google-cloud-run.png')} style={{border:'1px solid gray'}} alt="Google Cloud Run configuration" width="400"/>

For information about Google Cloud Run, see [Google Cloud Run documentation](https://cloud.google.com/run/docs/reference/rest).

## Change Log

* June 3, 2026 (v1.0) - First upload
