---
title: Google Compute Engine
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/google.png')} alt="google" width="80"/>

***Version: 1.0  
Updated: June 5, 2026***

Google Compute Engine is a scalable, high-performance virtual machine infrastructure service on Google Cloud that lets you create and manage VMs, persistent disks, and related compute resources programmatically.

## Actions

* **Add Member to Role** (*Containment*) - Add a member (user, service account, or group) to a specific IAM role on a Compute Engine instance to grant access permissions.
* **Create Disk Snapshot** (*Notification*) - Create a snapshot of a persistent disk attached to an instance.
* **Delete Instance** (*Containment*) - Permanently delete a Compute Engine virtual machine instance.
* **Get Instance** (*Enrichment*) - Retrieve detailed information about a specific virtual machine instance.
* **List Instances** (*Enrichment*) - List all virtual machine instances within a project and zone.
* **Remove Member from Role** (*Containment*) - Remove a member from a specific IAM role on a Compute Engine instance to revoke access permissions.
* **Restore Disk from Snapshot** (*Notification*) - Create a new persistent disk from an existing snapshot.
* **Start Instance** (*Containment*) - Start a stopped virtual machine instance.
* **Stop Instance** (*Containment*) - Stop a running virtual machine instance.
* **Update IAM Policy** (*Containment*) - Update the IAM access control policy for a Compute Engine resource.
* **Check Operation Status** (*Scheduled*) - Poll the status of a long-running operation until it reaches completion. Use this action after asynchronous operations such as stopping, starting, or deleting an instance, creating a disk snapshot, or restoring a disk from a snapshot to confirm the operation has finished.

## Google Compute Engine Authentication Configuration

Our Google Compute Engine integration supports two types of authentication: Service Account and WIF (Workload Identity Federation). We recommend using WIF since it is more secure and easier to manage. For more information, see [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation).

## Required AWS details from Sumo Logic

To configure the Google Compute Engine integration using WIF authentication, you need the following AWS details from Sumo Logic. These details are essential for setting up the Workload Identity Federation (WIF) credentials in Google Cloud:
* Deployment name is the unique name of your Sumo Logic [deployment](/docs/api/about-apis/getting-started/#documentation), for example, `dub`, `fra`, etc.
* Sumo Logic AWS account ID: `926226587429`
* Sumo Logic AWS role: `<deployment_name>-csoar-automation-gcpcompute`
* Sumo Logic AWS Lambda function: `<deployment_name>-csoar-automation-gcpcompute`
* Full ARN: `arn:aws:sts::926226587429:assumed-role/<deployment_name>-csoar-automation-gcpcompute/<deployment_name>-csoar-automation-gcpcompute`

### Workload Identity Federation (WIF) authentication

To [create WIF credentials](https://cloud.google.com/iam/docs/workload-identity-federation) in Google Cloud needed to configure the Google Compute Engine integration, follow these steps:
1. Log in to the [Google Cloud](https://console.cloud.google.com) portal.
2. Select a Google Cloud project (or create a new one).
3. Go to **API & Services**.
4. Click **ENABLED API AND SERVICES** and search for the following APIs, then enable them all: Cloud Resource Manager API, IAM Service Account Credentials API, Identity and Access Management (IAM) API, Security Token Service API, and Compute Engine API.
5. Go to **IAM & Admin** > **Service Accounts**.
6. Click **CREATE SERVICE ACCOUNT**. A [service account](https://cloud.google.com/iam/docs/service-accounts-create) is required to access Google Compute Engine.
7. While creating the service account, in **Permissions** add the roles **Service Account Token Creator** and **Compute Admin**, then click **DONE**. If your organization prefers least-privilege access, you can create a custom role with only the following permissions instead of Compute Admin: `compute.instances.get`, `compute.instances.list`, `compute.instances.delete`, `compute.instances.start`, `compute.instances.stop`, `compute.instances.getIamPolicy`, `compute.instances.setIamPolicy`, `compute.disks.createSnapshot`, `compute.snapshots.create`, `compute.disks.create`, and `compute.snapshots.useReadOnly`. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-11.png')} style={{border:'1px solid gray'}} alt="Service Account Token Creator and Compute Admin" width="800"/>
8. Go to **IAM & Admin** > **Workload Identity Federation**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-4.png')} style={{border:'1px solid gray'}} alt="Workload Identity Federation" width="800"/>
9. Click **CREATE POOL**, provide the details, and click **CONTINUE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-5.png')} style={{border:'1px solid gray'}} alt="Create pool" width="800"/>
10. Add **Provider details**. Select **AWS** as the provider type and provide the AWS Account ID supplied by Sumo Logic. Click **CONTINUE** and **SAVE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-6.png')} style={{border:'1px solid gray'}} alt="Provide details of AWS Account ID" width="800"/>
11. Confirm the created pool and provider. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-8.png')} style={{border:'1px solid gray'}} alt="Created pool and provider" width="800"/>
12. Build a principal name to configure in Sumo Logic. The format is: `principalSet://iam.googleapis.com/projects/{YourProjectID}/locations/global/workloadIdentityPools/{YourPoolName}/attribute.aws_role/arn:aws:sts::{SumoAWSAccountID}:assumed-role/{SumoAWSRole}/{SumoAWSLambdaFunction}`.
13. Go to **IAM & Admin** > **IAM** and click **Grant Access** to add a new principal.
14. In the **New principals** field, enter the principal name from the previous step and select the role **Workload Identity User**. Click **SAVE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-12.png')} style={{border:'1px solid gray'}} alt="Workload Identity User role" width="800"/>
15. Go to **IAM & Admin** > **Workload Identity Federation** and select the pool created above.
16. Click **Grant Access** > **Grant access using service account impersonation**.
17. Select the service account created above, set the principal as `aws_role`, and provide the ARN `arn:aws:sts::{SumoAWSAccountID}:assumed-role/{SumoAWSRole}`. Click **SAVE**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-10.png')} style={{border:'1px solid gray'}} alt="Provide ARN" width="800"/>
18. Again click **Grant Access** > **Grant access using service account impersonation**. Select the same service account, set the principal as `aws_role`, and provide the ARN `arn:aws:sts::{SumoAWSAccountID}:assumed-role/{SumoAWSRole}/{SumoAWSLambdaFunction}`. Click **SAVE**.
19. Download the WIF `conf.json` file. Keep it in a safe place. Use the JSON content to configure the Google Compute Engine integration to use WIF authentication in Automation Service and Cloud SOAR.

### Service Account authentication

To [create service account credentials](https://developers.google.com/workspace/guides/create-credentials) in Google Cloud needed to configure the Google Compute Engine integration, follow these steps:

1. Log in to the [Google Cloud](https://console.cloud.google.com) portal.
2. Select a Google Cloud project (or create a new one).
3. Go to **API & Services** > **Credentials**.
4. Click **ENABLED API AND SERVICES**, search for Compute Engine API, and enable it.
5. Click **CREATE CREDENTIALS** and select **Service Account**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-1.png')} style={{border:'1px solid gray'}} alt="Select Service Account" width="800"/>
6. Enter a service account name. The Google Cloud console generates a service account ID based on this name.
7. (Optional) Enter a description of the service account.
8. In the **Grant this service account access to project** step, add the role **Compute Admin**, then click **DONE** to complete the service account creation. If your organization prefers least-privilege access, you can create a custom role with only the following permissions instead of Compute Admin: `compute.instances.get`, `compute.instances.list`, `compute.instances.delete`, `compute.instances.start`, `compute.instances.stop`, `compute.instances.getIamPolicy`, `compute.instances.setIamPolicy`, `compute.disks.createSnapshot`, `compute.snapshots.create`, `compute.disks.create`, and `compute.snapshots.useReadOnly`.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-2.png')} style={{border:'1px solid gray'}} alt="Complete service account creation" width="800"/>
9. Click the generated service account to open the details.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-3.png')} style={{border:'1px solid gray'}} alt="Service account details" width="800"/>
10. Under the **KEYS** tab, click **ADD KEY** and choose **Create new key**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-4.png')} style={{border:'1px solid gray'}} alt="Create new key" width="800"/>
11. Click **CREATE** (make sure **JSON** is selected).<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-5.png')} style={{border:'1px solid gray'}} alt="Click on Create" width="400"/>
12. The JSON file is downloaded. Keep it in a safe place.

## Configure Google Compute Engine in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Private Key Json**. Provide the content of the JSON file generated [above](#google-compute-engine-authentication-configuration). Open the file and copy-paste the whole content in the field.

* **WIF Private Key Json**. Provide the content of the Workload Identity Federation JSON file generated [above](#google-compute-engine-authentication-configuration). Open the file and copy-paste the whole content in the field.

* **Project ID**. Provide the Google Cloud Project ID where the Compute Engine actions will be performed.

* **Zone**. Provide the default Google Cloud zone (for example, `us-central1-a`) where your Compute Engine instances reside.
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-compute-engine/google-compute-engine.png')} style={{border:'1px solid gray'}} alt="Google Compute Engine configuration" width="400"/>

For information about Google Compute Engine, see [Google Compute Engine documentation](https://cloud.google.com/compute/docs).

## Change Log

* June 5, 2026 (v1.0) - First upload
