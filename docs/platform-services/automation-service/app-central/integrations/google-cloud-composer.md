---
title: Google Cloud Composer
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/google.png')} alt="google" width="80"/>

***Version: 1.0  
Updated: Jun 12, 2026***

Google Cloud Composer is a fully managed workflow orchestration service built on Apache Airflow that helps you author, schedule, and monitor pipelines spanning hybrid and multi-cloud environments.

## Actions

* **Add Member to IAM Role** (*Containment*) - Adds a new member to the specified IAM role for the Cloud Composer environment.
* **Get DAG** (*Enrichment*) - Retrieves details of a specific DAG from a Cloud Composer environment.
* **Get Environment** (*Enrichment*) - Retrieves details of a specific Cloud Composer environment.
* **List DAGs** (*Enrichment*) - Lists all DAGs in a Cloud Composer environment.
* **List Environments** (*Enrichment*) - Lists all Cloud Composer environments in the specified project and region.
* **Pause DAG** (*Containment*) - Pauses a DAG in a Cloud Composer environment to stop scheduled runs.
* **Remove Member from IAM Role** (*Containment*) - Removes a member from the specified IAM role for the Cloud Composer environment.
* **Unpause DAG** (*Containment*) - Unpauses a previously paused DAG in a Cloud Composer environment to resume scheduled runs.
* **Update Project IAM Policy** (*Containment*) - Updates the IAM policy for the project associated with the Cloud Composer environment.

## Required IAM roles

The following table lists the required IAM roles for each action:

| Action | Required Role | Permission |
|:--------|:--------------|:------------|
| Add Member to IAM Role | Project IAM Admin (`roles/resourcemanager.projectIamAdmin`) | `resourcemanager.projects.setIamPolicy` |
| Get DAG | Composer User (`roles/composer.user`) | `composer.dags.get` |
| Get Environment | Composer User (`roles/composer.user`) | `composer.environments.get` |
| List DAGs | Composer User (`roles/composer.user`) | `composer.dags.list` |
| List Environments | Composer User (`roles/composer.user`) | `composer.environments.list` |
| Pause DAG | Composer Admin (`roles/composer.admin`) | `composer.dags.update` |
| Remove Member from IAM Role | Project IAM Admin (`roles/resourcemanager.projectIamAdmin`) | `resourcemanager.projects.setIamPolicy` |
| Unpause DAG | Composer Admin (`roles/composer.admin`) | `composer.dags.update` |
| Update Project IAM Policy | Project IAM Admin (`roles/resourcemanager.projectIamAdmin`) | `resourcemanager.projects.setIamPolicy` |

:::note
For read-only actions (Get DAG, Get Environment, List DAGs, List Environments), the **Composer User** role is sufficient. For DAG management actions (Pause DAG, Unpause DAG), the **Composer Admin** role is required. For IAM management actions (Add Member to IAM Role, Remove Member from IAM Role, Update Project IAM Policy), the **Project IAM Admin** role is required.
:::

## Google Cloud Composer configuration

The Google Cloud Composer integration supports two types of authentication: Service Account and WIF (Workload Identity Federation). We recommend using WIF since it is more secure and easier to manage. For more information, see [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation).

## Required AWS details from Sumo Logic

To configure the Google Cloud Composer integration using WIF authentication, you need the following AWS details from Sumo Logic. These details are essential for setting up the Workload Identity Federation (WIF) credentials in Google Workspace:
* Deployment name is the unique name of your Sumo Logic [deployment](/docs/api/about-apis/getting-started/#documentation), for example, `dub`, `fra`, etc. 
* Sumo Logic AWS account ID: `926226587429`
* Sumo Logic AWS role: `<deployment_name>-csoar-automation-gcpcomposer`
* Sumo Logic AWS Lambda function: `<deployment_name>-csoar-automation-gcpcomposer`
* Full ARN: `arn:aws:sts::926226587429:assumed-role/<deployment_name>-csoar-automation-gcpcomposer/<deployment_name>-csoar-automation-gcpcomposer`


### Workload Identity Federation (WIF) authentication

To [create WIF credentials](https://cloud.google.com/iam/docs/workload-identity-federation) in Google Workspace needed to configure the Google Cloud Composer integration, follow these steps:
1. Log in to the [Google Cloud](https://console.cloud.google.com) portal.
2. Select a Google Cloud project (or create a new one).
3. Go to the **API&Services**.
4. In the same page click on **ENABLED API AND SERVICES** and search for Cloud Composer API, Cloud Resource Manager API, IAM Service Account Credentials API, Identity and Access Management (IAM) API, Security Token Service API and enable them all.
5. Go to the **IAM & Admin** > **Service Accounts** page.
6. Click **CREATE SERVICE ACCOUNT**. A [Service Account](https://cloud.google.com/iam/docs/service-accounts-create) is required to access Google Cloud Composer.
7. While creating the service account, in **Permissions** add the role **Service Account Token Creator** and click on **DONE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-11.png')} style={{border:'1px solid gray'}} alt="Service Account Token Creator" width="800"/>
8. Go to the **IAM & Admin** > **Workload Identity Federation** page. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-4.png')} style={{border:'1px solid gray'}} alt="Workload Identity Federation" width="800"/>
9. Click **CREATE POOL**, provide the details, and click on **CONTINUE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-5.png')} style={{border:'1px solid gray'}} alt="Create pool" width="800"/>
10. Add **Provider details**. Select **AWS** as the provider type and provide the details of the AWS Account ID which is provided by Sumo Logic. Click on **CONTINUE** and **SAVE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-6.png')} style={{border:'1px solid gray'}} alt="Provider details" width="800"/>
11. Now you will see the created pool and provider. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-8.png')} style={{border:'1px solid gray'}} alt="Created pool and provider" width="800"/>
12. Now we have to build a principal name to configure in Sumo Logic. The format of the principal name is: `principalSet://iam.googleapis.com/projects/{YourProjectID}/locations/global/workloadIdentityPools/{YourPoolName}/attribute.aws_role/arn:aws:sts::{SumoAWSAccountID}:assumed-role/{SumoAWSRole}/{SumoAWSLambdaFunction}`. 
13. Go to the **IAM & Admin** > **IAM** page and click on **Grant Access** to add a new principal. 
14. In the **New principals** field, provide the above principal name and select the role **Workload Identity User**. Click on **SAVE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-12.png')} style={{border:'1px solid gray'}} alt="Workload Identity User" width="800"/>
15. Go to the **IAM & Admin** > **Workload Identity Federation** page and select the pool which was created above. 
16. Click on **Grant Access** > **Grant access using service account impersonation**. 
17. Select the service account which created above, select the principle as aws_role and provide the arn `arn:aws:sts::{SumoAWSAccountID}:assumed-role/{SumoAWSRole}` and click on **SAVE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-10.png')} style={{border:'1px solid gray'}} alt="Provide ARN" width="800"/>
18. Again go to **Grant Access** > **Grant access using service account impersonation**. Select the service account which was created above. Select the principle as `aws_role` and provide the arn `arn:aws:sts::{SumoAWSAccountID}:assumed-role/{SumoAWSRole}/{SumoAWSLambdaFunction}`. Click on **SAVE**. 
19. Download the WIF `conf.json` file. Make sure you save it in a safe place. Use the JSON content to configure the Google Cloud Composer integration to use WIF authentication in Automation Service and Cloud SOAR. 


### Service Account authentication
To [create service account credentials](https://developers.google.com/workspace/guides/create-credentials) in Google Workspace needed to configure the Google Cloud Composer integration, follow these steps:

1. Log in to the [Google Cloud](https://console.cloud.google.com) portal.
2. Select a Google Cloud project (or create a new one).
3. Go to the **API&Services** > **Credentials** page.
4. In the same page click on **ENABLED API AND SERVICES** and search for Cloud Composer API, Cloud Resource Manager API, IAM Service Account Credentials API, Identity and Access Management (IAM) API, Security Token Service API and enable them.
5. Click **CREATE CREDENTIALS** and select **Service Account**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-1.png')} style={{border:'1px solid gray'}} alt="Create credentials" width="800"/>
6. Enter a service account name to display in the Google Cloud console. The Google Cloud console generates a service account ID based on this name.
7. (Optional) Enter a description of the service account.
8. Skip two optional grant permissions steps and click **Done** to complete the service account creation.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-2.png')} style={{border:'1px solid gray'}} alt="Complete service account creation" width="800"/>
9. Click on the generated service account to open the details.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-3.png')} style={{border:'1px solid gray'}} alt="Generated service details" width="800"/>
10. Under the **KEYS** tab, click **ADD KEY** and choose **Create new key**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-4.png')} style={{border:'1px solid gray'}} alt="Create new key" width="800"/>
11. Click on **CREATE** (make sure **JSON** is selected).<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-5.png')} style={{border:'1px solid gray'}} alt="Click on create" width="400"/>
12. The JSON file is downloaded. Make sure you save it in a safe place.

## Configure Google Cloud Composer in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Authentication Type**. Select the authentication type: **Service Account Private Key Json** or **Workload Identity Federation Private Key Json** and provide the selected type JSON content.
* **Scopes**. Default scope is already added as `https://www.googleapis.com/auth/cloud-platform`, if not then add this scope.
* **Project ID**. Provide the Google Cloud Project ID where the Composer environments are located.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/google-cloud-composer-configuration.png')} style={{border:'1px solid gray'}} alt="Google Cloud composer configuration" width="400"/>

For information about Google Cloud Composer, see [Google Cloud Composer documentation](https://cloud.google.com/composer/docs).

## Change Log

* June 12, 2026 (v1.0) - First upload
