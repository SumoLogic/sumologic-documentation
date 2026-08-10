---
title: Google Cloud Service Mesh
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/google.png')} alt="google" width="80"/>

***Version: 1.0  
Updated: Jun 25, 2026***

Google Cloud Service Mesh provides a managed service mesh that helps you secure, manage, and observe communication between your microservices running on Google Kubernetes Engine (GKE) and other platforms.

## Actions

* **Get Authorization Policy** (*Enrichment*) - Retrieve details of a specific authorization policy in the service mesh.
* **Get Mesh Metrics** (*Enrichment*) - Retrieve service mesh metrics including traffic, latency, and error rates.
* **List Authorization Policies** (*Enrichment*) - List all authorization policies configured in the service mesh.
* **Restrict Network Flow** (*Containment*) - Restrict network traffic flow between services by creating or updating authorization policies.
* **Update Authorization Policy** (*Containment*) - Update an existing authorization policy in the service mesh.

## Required IAM roles

The following table lists the required IAM roles for each action:

| Action | Required Role | Permission |
|:--------|:--------------|:------------|
| Get Authorization Policy | Mesh Viewer (`roles/meshconfig.viewer`) | `meshconfig.authorizationPolicies.get` |
| Get Mesh Metrics | Monitoring Viewer (`roles/monitoring.viewer`) | `monitoring.timeSeries.list` |
| List Authorization Policies | Mesh Viewer (`roles/meshconfig.viewer`) | `meshconfig.authorizationPolicies.list` |
| Restrict Network Flow | Mesh Admin (`roles/meshconfig.admin`) | `meshconfig.authorizationPolicies.create`, `meshconfig.authorizationPolicies.update` |
| Update Authorization Policy | Mesh Admin (`roles/meshconfig.admin`) | `meshconfig.authorizationPolicies.update` |

Additional permissions required:

| Permission | Description |
|:-----------|:------------|
| `container.clusters.get` | Get GKE cluster details |
| `container.clusters.list` | List GKE clusters |
| `container.clusters.create` | Create GKE clusters |
| `container.clusters.update` | Update GKE clusters |
| `meshconfig.meshes.get` | Get mesh configuration |
| `meshconfig.meshes.list` | List mesh configurations |

:::note
For read-only actions (Get Authorization Policy, List Authorization Policies), the **Mesh Viewer** role provides the minimum required access. The **Mesh Admin** role grants broader permissions including create, update, and delete capabilities, and is only required for write actions (Restrict Network Flow, Update Authorization Policy). For monitoring actions (Get Mesh Metrics), the **Monitoring Viewer** role is sufficient.
:::

## Google Cloud Service Mesh configuration

The Google Cloud Service Mesh integration supports two types of authentication: Service Account and WIF (Workload Identity Federation). We recommend using WIF since it is more secure and easier to manage. For more information, see [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation).

## Required AWS details from Sumo Logic

To configure the Google Cloud Service Mesh integration using WIF authentication, you need the following AWS details from Sumo Logic. These details are essential for setting up the Workload Identity Federation (WIF) credentials in Google Workspace:
* Deployment name is the unique name of your Sumo Logic [deployment](/docs/api/about-apis/getting-started/#documentation), for example, `dub`, `fra`, etc. 
* Sumo Logic AWS account ID: `926226587429`
* Sumo Logic AWS role: `<deployment_name>-csoar-automation-gcpservicemesh`
* Sumo Logic AWS Lambda function: `<deployment_name>-csoar-automation-gcpservicemesh`
* Full ARN: `arn:aws:sts::926226587429:assumed-role/<deployment_name>-csoar-automation-gcpservicemesh/<deployment_name>-csoar-automation-gcpservicemesh`


### Workload Identity Federation (WIF) authentication

To [create WIF credentials](https://cloud.google.com/iam/docs/workload-identity-federation) in Google Cloud needed to configure the Google Cloud Service Mesh integration, follow these steps:
1. Log in to the [Google Cloud](https://console.cloud.google.com) portal.
2. Select a Google Cloud project (or create a new one).
3. Go to **APIs & Services**.
4. In the same page click on **ENABLED API AND SERVICES** and search for Mesh API, Kubernetes Engine API, Cloud Resource Manager API, IAM Service Account Credentials API, Identity and Access Management (IAM) API, Security Token Service API, Cloud Monitoring API and enable them all.
5. Go to the **IAM & Admin** > **Service Accounts** page.
6. Click **CREATE SERVICE ACCOUNT**. A [Service Account](https://cloud.google.com/iam/docs/service-accounts-create) is required to access Google Cloud Service Mesh.
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
17. Select the service account which was created above, select the principle as aws_role and provide the arn `arn:aws:sts::{SumoAWSAccountID}:assumed-role/{SumoAWSRole}` and click on **SAVE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-10.png')} style={{border:'1px solid gray'}} alt="Provide ARN" width="800"/>
18. Again go to **Grant Access** > **Grant access using service account impersonation**. Select the service account which was created above. Select the principle as `aws_role` and provide the arn `arn:aws:sts::{SumoAWSAccountID}:assumed-role/{SumoAWSRole}/{SumoAWSLambdaFunction}`. Click on **SAVE**. 
19. Download the WIF `conf.json` file. Make sure you save it in a safe place. Use the JSON content to configure the Google Cloud Service Mesh integration to use WIF authentication in Automation Service and Cloud SOAR. 


### Service Account authentication
To [create service account credentials](https://developers.google.com/workspace/guides/create-credentials) in Google Cloud needed to configure the Google Cloud Service Mesh integration, follow these steps:

1. Log in to the [Google Cloud](https://console.cloud.google.com) portal.
2. Select a Google Cloud project (or create a new one).
3. Go to the **APIs & Services** > **Credentials** page.
4. In the same page click on **ENABLED API AND SERVICES** and search for Mesh API, Kubernetes Engine API, Cloud Resource Manager API, IAM Service Account Credentials API, Identity and Access Management (IAM) API, Security Token Service API, Cloud Monitoring API and enable them.
5. Click **CREATE CREDENTIALS** and select **Service Account**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-1.png')} style={{border:'1px solid gray'}} alt="Create credentials" width="800"/>
6. Enter a service account name to display in the Google Cloud console. The Google Cloud console generates a service account ID based on this name.
7. (Optional) Enter a description of the service account.
8. Skip two optional grant permissions steps and click **Done** to complete the service account creation.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-2.png')} style={{border:'1px solid gray'}} alt="Complete service account creation" width="800"/>
9. Click on the generated service account to open the details.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-3.png')} style={{border:'1px solid gray'}} alt="Generated service details" width="800"/>
10. Under the **KEYS** tab, click **ADD KEY** and choose **Create new key**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-4.png')} style={{border:'1px solid gray'}} alt="Create new key" width="800"/>
11. Click on **CREATE** (make sure **JSON** is selected).<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-5.png')} style={{border:'1px solid gray'}} alt="Click on create" width="400"/>
12. The JSON file is downloaded. Make sure you save it in a safe place.

## Configure Google Cloud Service Mesh in Automation Service and Cloud SOAR

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
* **Project ID**. Provide the Google Cloud Project ID where the Service Mesh actions will be performed.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/google-cloud-service-mesh-configuration.png')} style={{border:'1px solid gray'}} alt="Google Cloud Service Mesh" width="400"/>

For information about Google Cloud Service Mesh, see [Google Cloud Service Mesh documentation](https://cloud.google.com/service-mesh/docs).

## Change Log

* June 25, 2026 (v1.0) - First upload
