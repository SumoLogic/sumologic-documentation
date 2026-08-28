---
title: Google Cloud Functions
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/google.png')} alt="google" width="80"/>

***Version: 1.0  
Updated: Aug 28, 2026***

Google Cloud Functions is a serverless execution environment for building and connecting cloud services. This integration supports 2nd-generation functions backed by Cloud Run v2 service APIs. Use this integration to inventory deployed functions, trigger executions, monitor logs, and manage access controls as part of automated response workflows.

## Actions

* **List Functions** (*Enrichment*) - List all Cloud Functions in a project to inventory what is currently deployed.
* **Get Function** (*Enrichment*) - Retrieve configuration and metadata for a specific Cloud Function, including its service URL, revision, and status.
* **Enable Function** (*Containment*) - Enable a Cloud Function to restore its availability during incident response.
* **Disable Function** (*Containment*) - Disable a Cloud Function to restrict its availability during incident response.
* **Trigger Function** (*Notification*) - Invokes a 2nd-gen Cloud Function by automatically resolving its Cloud Run v2 service URL from the function name and region, then calling it with a signed OIDC identity token obtained from the configured credentials (Service Account or WIF). No manual token handling is required.

   **Inputs**:
   | Field | Required | Description |
   |---|---|---|
   | Service Name | Yes | Cloud Run service name backing the function (e.g., `my-function`) |
   | Location | Yes | GCP region where the function is deployed (e.g., `us-central1`) |
   | Payload | No | JSON body to send to the function. Defaults to `{}` if not provided. |

   **Outputs**: `function_name`, `function_url` (resolved Cloud Run URL), `status` (HTTP status), `received` (response body).

   The caller principal must have `roles/run.invoker` on the underlying Cloud Run service.
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
7. While creating the service account, in **Permissions** add the roles **Service Account Token Creator** and **Cloud Functions Admin**, then click **DONE**. If your organization prefers least-privilege access, you can create a custom role with only the following permissions instead of Cloud Functions Admin: `cloudfunctions.functions.list`, `cloudfunctions.functions.get`, `cloudfunctions.functions.invoke`, `cloudfunctions.functions.update`, `run.services.getIamPolicy`, `run.services.setIamPolicy`, and `logging.logEntries.list`. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-chat/google-chat-11.png')} style={{border:'1px solid gray'}} alt="Add roles" width="800"/>
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
8. In the **Grant this service account access to project** step, add the role **Cloud Functions Admin**, then click **DONE** to complete the service account creation. If your organization prefers least-privilege access, you can create a custom role with only the following permissions instead of Cloud Functions Admin: `cloudfunctions.functions.list`, `cloudfunctions.functions.get`, `cloudfunctions.functions.invoke`, `cloudfunctions.functions.update`, `run.services.getIamPolicy`, `run.services.setIamPolicy`, and `logging.logEntries.list`.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-2.png')} style={{border:'1px solid gray'}} alt="Complete service account creation" width="800"/>
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

## Troubleshooting

### Permission denied (401/403) on `run.services.getIamPolicy` or `run.services.setIamPolicy`

**Cause**: The service account used by the integration (or the impersonated account via WIF) lacks the required permissions.

**Fix**: Grant the service account **Cloud Functions Admin** or a custom role containing `cloudfunctions.functions.get`, `cloudfunctions.functions.invoke`, `run.services.getIamPolicy`, and `run.services.setIamPolicy`. For invocations, ensure `roles/run.invoker` is granted to the caller principal.

### WIF pool or provider misconfiguration

**Cause**: Incorrect AWS account ID, wrong `aws_role` ARN, or principal format mismatch in the Workload Identity Pool provider.

**Fix**: Verify the provider is set to **AWS**, the Sumo Logic AWS account ID and role ARN are exact, and the principal is built as:
```
principalSet://iam.googleapis.com/projects/{PROJECT_ID}/locations/global/workloadIdentityPools/{POOL_NAME}/attribute.aws_role/arn:aws:sts::{SUMO_AWS_ACCOUNT_ID}:assumed-role/{SUMO_AWS_ROLE}/{SUMO_AWS_LAMBDA}
```
Also confirm attribute mappings and audience settings in the pool match what Sumo Logic expects.

### Missing Google APIs (calls fail or setup steps not available)

**Cause**: Required APIs are not enabled.

**Fix**: Enable **Cloud Functions API**, **Cloud Run API**, **Cloud Resource Manager API**, **IAM Service Account Credentials API**, **Security Token Service API**, and **Cloud Logging API** for the project.

### Token or identity errors when invoking private services

**Cause**: Using an expired or incorrect identity/OIDC token, or not impersonating the correct service account.

**Fix**: Generate a fresh identity token (for example, `gcloud auth print-identity-token` when testing locally), or ensure the integration uses the configured WIF or service account credentials to obtain tokens automatically.

### Service ingress or network issues (function unreachable)

**Cause**: Function or service ingress is restricted (internal VPC) or protected by IAM/ingress rules.

**Fix**: Check Cloud Run/Function ingress settings, VPC connector configuration, and any firewall rules. For private services, ensure the caller has network access or use an authorized path.

### Diagnostic commands

Check **Cloud Logging** for Cloud Run and Cloud Functions logs to see error details. The following commands are useful for diagnosing issues:

- Verify service IAM policy:
  ```bash
  gcloud run services get-iam-policy <SERVICE> --region=<REGION>
  ```
- Test invocation with an identity token:
  ```bash
  TOKEN=$(gcloud auth print-identity-token)
  curl -H "Authorization: Bearer $TOKEN" https://<SERVICE_URL> -d '{}'
  ```

If using WIF, check the Workload Identity Pool and provider logs to confirm that the token exchange succeeds.

If the issue persists, confirm the integration configuration JSON matches the selected authentication type (WIF vs. service account). See [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation), [Cloud Run IAM](https://cloud.google.com/run/docs/securing/managing-access), and [Cloud Functions authentication](https://cloud.google.com/functions/docs/securing/authenticating) for deeper troubleshooting.

## Change Log

* August 28, 2026 (v1.0) - First upload
