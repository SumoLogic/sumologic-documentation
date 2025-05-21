---
title: Google Workspace IDP
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/google.png')} alt="google" width="80"/>

***Version: 1.1  
Updated: May 21, 2025***

Google Workspace Identity Platform (IDP) is a cloud-based identity management system that enables secure authentication, single sign-on (SSO), and user access control across Google services and third-party applications.

## Actions

* **Create User** *(Containment)* - Adds a new user account to the domain.
* **Enable User** *(Containment)* - Reactivates a previously suspended user account.
* **Suspend User** *(Containment)* - Temporarily disables a user account.
* **List All Users** *(Enrichment)* - Retrieves a list of users in the specified domain.
* **List All Groups** *(Enrichment)* - Lists all Google Groups in the domain.
* **List Group Members** *(Enrichment)* - Lists all members of a specific group.
* **Get Group** *(Enrichment)* - Retrieves details of a specific group by group email.
* **Get User** *(Enrichment)* - Fetches detailed information about a specific user by email or user ID.

## Google Workspace IDP Configurations

To [create service account credentials](https://developers.google.com/workspace/guides/create-credentials) in Google Workspace and generate the JSON file needed to configure the Google Workspace IDP integration, follow these steps:

1. Log in to the [Google Cloud](https://console.cloud.google.com) portal.
2. Select a Google Cloud project (or create a new one).
3. Go to the **API&Services** > **Credentials** page.
4. Click **CREATE CREDENTIALS** and select **Service Account**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-1.png')} style={{border:'1px solid gray'}} alt="google-drive" width="800"/>
5. Enter a Service account name to display in the Google Cloud console. The Google Cloud console generates a service account ID based on this name.
6. Optional: Enter a description of the service account.
7. Skip two optional grant permissions steps and click **Done** to complete the service account creation.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-2.png')} style={{border:'1px solid gray'}} alt="google-drive" width="800"/>
8. Click on the generated service account to open the details.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-3.png')} style={{border:'1px solid gray'}} alt="google-drive" width="800"/>
9. Under the **KEYS** tab, Click **ADD KEY** and choose **Create new key**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-4.png')} style={{border:'1px solid gray'}} alt="google-drive" width="800"/>
10. Click on **CREATE** (make sure **JSON** is selected).<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-5.png')} style={{border:'1px solid gray'}} alt="google-drive" width="400"/>
11. The JSON file is downloaded. Make sure you save it in a safe place
12. Enable the Admin SDK API for the project at [https://console.cloud.google.com/flows/enableapi?apiid=admin.googleapis.com](https://console.cloud.google.com/flows/enableapi?apiid=admin.googleapis.com).
13. Go to [https://admin.google.com/ac/owl/domainwidedelegation](https://admin.google.com/ac/owl/domainwidedelegation) to open the Domain-Wide delegation settings in the Google Admin portal
14. Click on Add new. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-6.png')} style={{border:'1px solid gray'}} alt="google-drive" width="800"/>
15. In the Client ID field, provide the client ID from the JSON file.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-7.png')} style={{border:'1px solid gray'}} alt="google-drive" width="500"/><br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-8.png')} style={{border:'1px solid gray'}} alt="google-drive" width="600"/>
16. In the OAuth scopes (comma-delimited) field, provide the following scopes: <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-workspace-idp/google-workspace-idp1.png')} style={{border:'1px solid gray'}} alt="google-workspace-idp1" width="400"/>
17. Click Authorize.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-9.png')} style={{border:'1px solid gray'}} alt="google-drive" width="800"/>

## Configure Google Workspace IDP in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

* **Label**. The desired name for the resource.
* **User Service Account JSON**. Provide the content of the JSON file generated in the previous steps. Open the file and copy-paste the whole content in the field.
* **Admin User Email**. The e-mail address of an admin user.
* **Domain Name**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/google-workspace-idp-configuration.png')} style={{border:'1px solid gray'}} alt="Google Workspace IDP Configuration" width="400"/>

For information about Google Workspace IDP, see [Google Workspace IDP API documentation](https://developers.google.com/workspace/admin/directory/reference/rest).

## Change Log

* May 21, 2025 (v1.0) - First upload
* May 21, 2025 (v1.1) - Updated google logo in integration
