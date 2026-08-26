---
title: Google Kubernetes Engine
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/google.png')} alt="google" width="80"/>

***Version: 1.0  
Updated: Jun 18, 2026***

Google Kubernetes Engine (GKE) is a managed Kubernetes service that lets you deploy, manage, and scale containerized applications on Google Cloud infrastructure.

## Actions

* **Delete Deployment** (*Containment*) - Deletes a specified deployment from a GKE cluster.
* **Get Cluster** (*Enrichment*) - Retrieves details of a specific GKE cluster.
* **Get Deployment** (*Enrichment*) - Retrieves details of a specific deployment in a GKE cluster.
* **List Cluster Role Bindings** (*Enrichment*) - Lists all cluster role bindings in a GKE cluster.
* **List Clusters** (*Enrichment*) - Lists all GKE clusters in the specified project and region.
* **List Workloads** (*Enrichment*) - Lists all workloads running in a GKE cluster.
* **Grant Cluster Role Binding** (*Containment*) - Creates a cluster role binding in a GKE cluster.
* **Revoke Cluster Role Binding** (*Containment*) - Deletes a cluster role binding from a GKE cluster.
* **Pod Security Monitor Daemon** (*Daemon*) - Monitors pod security events and alerts on policy violations in a GKE cluster.
* **Scale Down Deployment** (*Containment*) - Scales down the replica count of a specified deployment in a GKE cluster.

## Google Kubernetes Engine configuration

The Google Kubernetes Engine integration supports two types of authentication:
- **Service Account**
- **WIF (Workload Identity Federation)**

We recommend using WIF since it is more secure and easier to manage. For more information, see [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation).

## Required AWS details from Sumo Logic

To configure the Google Kubernetes Engine integration using WIF authentication, you need the following AWS details from Sumo Logic. These details are essential for setting up the Workload Identity Federation (WIF) credentials in Google Cloud:
* Deployment name is the unique name of your Sumo Logic [deployment](/docs/api/about-apis/getting-started/#documentation), for example, `dub`, `fra`, etc. 
* Sumo Logic AWS account ID: `926226587429`
* Sumo Logic AWS role: `<deployment_name>-csoar-automation-gcpgke`
* Sumo Logic AWS Lambda function: `<deployment_name>-csoar-automation-gcpgke`
* Full ARN: `arn:aws:sts::926226587429:assumed-role/<deployment_name>-csoar-automation-gcpgke/<deployment_name>-csoar-automation-gcpgke`

### Workload Identity Federation (WIF) authentication

Follow the steps below to [create WIF credentials](https://cloud.google.com/iam/docs/workload-identity-federation) in Google Cloud, which are required to configure the Google Kubernetes Engine integration:
1. Log in to the [Google Cloud](https://console.cloud.google.com) portal.
2. Select a Google Cloud project (or create a new one).
3. Navigate to **API & Services**.
4. On the same page, click **ENABLED API AND SERVICES** and search for Kubernetes Engine API, Cloud Resource Manager API, IAM Service Account Credentials API, Identity and Access Management (IAM) API, Security Token Service API, and enable them all.
5. Navigate to **IAM & Admin** > **Service Accounts** page.
6. Click **CREATE SERVICE ACCOUNT**. A [Service Account](https://cloud.google.com/iam/docs/service-accounts-create) is required to access Google Kubernetes Engine.
7. While creating the service account, in **Permissions** add the roles **Service Account Token Creator** and **Kubernetes Engine Admin**, then click **DONE**. If your organization prefers least-privilege access, you can create a custom role with only the following permissions instead of Kubernetes Engine Admin:
   - `container.clusters.get`
   - `container.clusters.list`
   - `container.deployments.get`
   - `container.deployments.list`
   - `container.deployments.delete`
   - `container.deployments.update`
   - `container.clusterRoleBindings.list`
   - `container.clusterRoleBindings.create`
   - `container.clusterRoleBindings.delete`
   - `container.pods.list`
   - `container.events.list`

   <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-11.png')} style={{border:'1px solid gray'}} alt="Service Account Token Creator and Kubernetes Engine Admin" width="800"/>
8. Navigate to **IAM & Admin** > **Workload Identity Federation**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-4.png')} style={{border:'1px solid gray'}} alt="Workload Identity Federation" width="800"/>
9. Click **CREATE POOL**, provide the details, and click **CONTINUE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-5.png')} style={{border:'1px solid gray'}} alt="Create pool" width="800"/>
10. Add the **Provider details**. Select **AWS** as the provider type and enter the AWS Account ID provided by Sumo Logic. Click **CONTINUE** and **SAVE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-6.png')} style={{border:'1px solid gray'}} alt="Provider details" width="800"/>
11. Now you will see the created pool and provider. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-8.png')} style={{border:'1px solid gray'}} alt="Created pool and provider" width="800"/>
12. Build a principal name to configure in Sumo Logic. The format of the principal name is: `principalSet://iam.googleapis.com/projects/{YourProjectID}/locations/global/workloadIdentityPools/{YourPoolName}/attribute.aws_role/arn:aws:sts::{SumoAWSAccountID}:assumed-role/{SumoAWSRole}/{SumoAWSLambdaFunction}`. 
13. Navigate to **IAM & Admin** > **IAM** and click **Grant Access** to add a new principal. 
14. In the **New principals** field, provide the principal name created in step 12 and select the role as **Workload Identity User**. Click **SAVE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-12.png')} style={{border:'1px solid gray'}} alt="Workload Identity User" width="800"/>
15. Go to the **IAM & Admin** > **Workload Identity Federation** and select the pool created in step 9. 
16. Click **Grant Access** > **Grant access using service account impersonation**. 
17. Select the service account created in the previous step. Set the principal type as `aws_role` and the ARN as `arn:aws:sts::{SumoAWSAccountID}:assumed-role/{SumoAWSRole}` and then click **SAVE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-10.png')} style={{border:'1px solid gray'}} alt="Provide ARN" width="800"/>
18. Navigate to **Grant Access** > **Grant access using service account impersonation**. Select the service account created in step 6. Select the principal as `aws_role` and provide the ARN as `arn:aws:sts::{SumoAWSAccountID}:assumed-role/{SumoAWSRole}/{SumoAWSLambdaFunction}`. Click **SAVE**. 
19. Download the WIF `conf.json` file. Ensure you save it in a safe place. Use the JSON content to configure the Google Kubernetes Engine integration to use WIF authentication in Automation Service and Cloud SOAR. 

### Service Account authentication

To [create service account credentials](https://developers.google.com/workspace/guides/create-credentials) in GCP, needed to configure the Google Kubernetes Engine integration, follow these steps:

1. Log in to the [Google Cloud](https://console.cloud.google.com) portal.
2. Select a Google Cloud project (or create a new one).
3. Navigate to **API & Services** > **Credentials**.
4. On the same page, click **ENABLED API AND SERVICES** and search for Kubernetes Engine API, Cloud Resource Manager API, IAM Service Account Credentials API, Identity and Access Management (IAM) API, Security Token Service API, and enable them.
5. Click **CREATE CREDENTIALS** and select **Service Account**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-1.png')} style={{border:'1px solid gray'}} alt="Create credentials" width="800"/>
6. Enter a service account name to display in the Google Cloud console. The Google Cloud console generates a service account ID based on this name.
7. (Optional) Enter a description of the service account.
8. In the **Grant this service account access to project** step, add the role **Kubernetes Engine Admin**, then click **DONE** to complete the service account creation. If your organization prefers least-privilege access, you can create a custom role with only the following permissions instead of Kubernetes Engine Admin:
   - `container.clusters.get`
   - `container.clusters.list`
   - `container.deployments.get`
   - `container.deployments.list`
   - `container.deployments.delete`
   - `container.deployments.update`
   - `container.clusterRoleBindings.list`
   - `container.clusterRoleBindings.create`
   - `container.clusterRoleBindings.delete`
   - `container.pods.list`
   - `container.events.list`

   <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-2.png')} style={{border:'1px solid gray'}} alt="Complete service account creation" width="800"/>
9. Click the generated service account to open the details.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-3.png')} style={{border:'1px solid gray'}} alt="Generated service details" width="800"/>
10. Under the **KEYS** tab, click **ADD KEY** and select **Create new key**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-4.png')} style={{border:'1px solid gray'}} alt="Create new key" width="800"/>
11. Click **CREATE** (make sure **JSON** is selected).<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-5.png')} style={{border:'1px solid gray'}} alt="Click on create" width="400"/>
12. The JSON file is downloaded. Ensure you save it in a safe place.

## Configure Google Kubernetes Engine in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Authentication Type**. Select the authentication type: **Service Account Private Key Json** or **Workload Identity Federation Private Key Json** and provide the selected type JSON content.
* **Scopes**. Default scope is `https://www.googleapis.com/auth/cloud-platform`. If not already present, add this scope.
* **Project ID**. Provide the Google Cloud Project ID where the GKE clusters are located.
* **Cluster Location**. Provide the Google Cloud region or zone where the GKE cluster is located (for example, `us-central1` or `us-central1-a`).
* **Cluster Name**. Provide the name of the GKE cluster to connect to.
* <IntegrationEngine/>
* <IntegrationCertificate/>
* <IntegrationTimeout/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-kubernetes-engine/google-kubernetes-engine.png')} style={{border:'1px solid gray'}} alt="Google Cloud Kubernetes Engine configuration" width="400"/>

For more information on Google Kubernetes Engine, see [Google Kubernetes Engine documentation](https://cloud.google.com/kubernetes-engine/docs).

## Change Log

* June 18, 2026 (v1.0) - First upload
