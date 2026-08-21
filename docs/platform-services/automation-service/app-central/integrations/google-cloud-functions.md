---
id: google-cloud-functions
title: Google Cloud Functions
description: Learn about the Sumo Logic Google Cloud Functions integration for the Automation Service and Cloud SOAR.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/google.png')} alt="google" width="80"/>

***Version: 1.0  
Updated: Aug 25, 2026***

Google Cloud Functions is a serverless execution environment for building and connecting cloud services. This integration supports 2nd-generation functions backed by Cloud Run v2 service APIs. Use this integration to inventory deployed functions, trigger executions, monitor logs, and manage access controls as part of automated response workflows.

## Actions

* **List Functions** (*Enrichment*) - List all Cloud Functions in a project to inventory what is currently deployed.
* **Get Function** (*Enrichment*) - Retrieve configuration and metadata for a specific Cloud Function, including its service URL, revision, and status.
* **Enable Disable Function** (*Containment*) - Enable or disable a Cloud Function to control its availability during incident response.
* **Trigger Function** (*Notification*) - Invoke a Cloud Function by calling its service URL to initiate automated workflows.
* **Monitor Function Logs** (*Daemon*) - Continuously monitor execution logs for a Cloud Function to detect anomalies.
* **Update Function IAM Policy** (*Containment*) - Modify the IAM policy on a Cloud Function to restrict or expand invoker access.

## Google Cloud Functions configuration

Our Google Cloud Functions integration supports two types of authentication: Service Account and WIF (Workload Identity Federation). We recommend using WIF since it is more secure and easier to manage. For more information, see [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation).

## Required Sumo Logic details for WIF authentication

To configure the Google Cloud Functions integration using WIF authentication, you need the following AWS details from Sumo Logic. These details are essential for setting up the Workload Identity Federation (WIF) credentials in Google Cloud:
* Deployment name is the unique name of your Sumo Logic [deployment](/docs/api/about-apis/getting-started/#documentation), for example, `dub`, `fra`, etc.
* Sumo Logic AWS account ID: `926226587429`
* Sumo Logic AWS role: `<deployment_name>-csoar-automation-gcpiam`
* Sumo Logic AWS Lambda function: `<deployment_name>-csoar-automation-gcpiam`
* Full ARN: `arn:aws:sts::926226587429:assumed-role/<deployment_name>-csoar-automation-gcpiam/<deployment_name>-csoar-automation-gcpiam`

### Workload Identity Federation (WIF) authentication

To [create WIF credentials](https://cloud.google.com/iam/docs/workload-identity-federation) in Google Cloud needed to configure the Google Cloud Functions integration, follow these steps:
1. Log in to the [Google Cloud](https://console.cloud.google.com) portal.
2. Select a Google Cloud project (or create a new one).
3. Go to **API & Services**.
4. Click **ENABLED APIs AND SERVICES** and search for Cloud Functions API, Cloud Run API, Cloud Resource Manager API, IAM Service Account Credentials API, Identity and Access Management (IAM) API, Security Token Service API, and Cloud Logging API, and enable them all.
5. Go to **IAM & Admin** > **Service Accounts** page.
6. Click **CREATE SERVICE ACCOUNT**. A [Service Account](https://cloud.google.com/iam/docs/service-accounts-create) is required to access Google Cloud Functions.
7. While creating the service account, in **Permissions** add the roles **Service Account Token Creator** and **Cloud Functions Admin**, then click **DONE**. If your organization prefers least-privilege access, you can create a custom role with only the following permissions instead of Cloud Functions Admin: `cloudfunctions.functions.list`, `cloudfunctions.functions.get`, `cloudfunctions.functions.invoke`, `cloudfunctions.functions.update`, `run.services.getIamPolicy`, and `run.services.setIamPolicy`. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-11.png')} style={{border:'1px solid gray'}} alt="Add roles" width="800"/>
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
19. Download the WIF `conf.json` file. Make sure you save it in a safe place. Use the JSON content to configure the Google Cloud Functions integration to use WIF authentication in Automation Service and Cloud SOAR.

### Service Account authentication

To [create service account credentials](https://developers.google.com/workspace/guides/create-credentials) in Google Cloud needed to configure the Google Cloud Functions integration, follow these steps:

1. Log in to the [Google Cloud](https://console.cloud.google.com) portal.
2. Select a Google Cloud project (or create a new one).
3. Go to **API & Services** > **Credentials** page.
4. Click **ENABLED APIs AND SERVICES** and search for Cloud Functions API, Cloud Run API, Cloud Resource Manager API, IAM Service Account Credentials API, Identity and Access Management (IAM) API, Security Token Service API, and Cloud Logging API, and enable them.
5. Click **CREATE CREDENTIALS** and select **Service Account**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-1.png')} style={{border:'1px solid gray'}} alt="Select Service Accounts" width="800"/>
6. Enter a service account name to display in the Google Cloud console. The Google Cloud console generates a service account ID based on this name.
7. (Optional) Enter a description of the service account.
8. In the **Grant this service account access to project** step, add the role **Cloud Functions Admin**, then click **DONE** to complete the service account creation. If your organization prefers least-privilege access, you can create a custom role with only the following permissions instead of Cloud Functions Admin: `cloudfunctions.functions.list`, `cloudfunctions.functions.get`, `cloudfunctions.functions.invoke`, `cloudfunctions.functions.update`, `run.services.getIamPolicy`, and `run.services.setIamPolicy`.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-2.png')} style={{border:'1px solid gray'}} alt="Complete service account creation" width="800"/>
9. Click on the generated service account to open the details.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-3.png')} style={{border:'1px solid gray'}} alt="Generated service account details" width="800"/>
10. Under the **KEYS** tab, click **ADD KEY** and choose **Create new key**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-4.png')} style={{border:'1px solid gray'}} alt="Create a new key" width="800"/>
11. Click **CREATE** (make sure **JSON** is selected).<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-5.png')} style={{border:'1px solid gray'}} alt="Click on Create" width="400"/>
12. The JSON file is downloaded. Make sure you save it in a safe place.

## Configure Google Cloud Functions in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>

* **Authentication Type**. Select the authentication type: **Service Account Private Key Json** or **Workload Identity Federation Private Key Json** and provide the selected type JSON content.

* **Scopes**. Default scope is already added as `https://www.googleapis.com/auth/cloud-platform`. If not, add this scope.

* **Project ID**. Provide the Google Cloud Project ID where the Cloud Functions actions will be performed.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/google-cloud-function-configuration.png')} style={{border:'1px solid gray'}} alt="Google Cloud Functions configuration" width="400"/>

For information about Google Cloud Functions, see [Google Cloud Functions documentation](https://cloud.google.com/functions/docs).

## Change Log

* August 25, 2026 (v1.0) - First upload
