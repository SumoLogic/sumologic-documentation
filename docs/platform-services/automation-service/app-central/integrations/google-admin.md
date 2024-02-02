---
title: Google Admin
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/google.png)

Version: 1.2  
Updated: Sep 21, 2023

Google Admin relies on the Admin SDK API, which empowers administrators to efficiently manage Google Workspace organizations on a large scale.

## Actions

* **Get Activity Report** *(Enrichment)* - Retrieves a list of activities for a specific customer's account and application such as the Admin console application or the Google Drive application

## Google Admin Configuration

To create a Service Account in Google Workspace and generate the JSON file needed to configure the Google Admin integration, follow these steps:

1. Log in to the Google Cloud portal at [https://console.cloud.google.com](https://console.cloud.google.com)
2. Select a Google Cloud project (or create a new one)
3. Go to the **API&Services** > **Credentials** page
4. Click **CREATE CREDENTIALS** and select **Service Account**. <br/>![](/img/platform-services/automation-service/app-central/integrations/google-admin/google-admin-1.png)
5. Enter a Service account name to display in the Google Cloud console. The Google Cloud console generates a service account ID based on this name.
6. Optional: Enter a description of the service account.
7. Skip two optional grant permissions steps and click **Done** to complete the service account creation. <br/>![](/img/platform-services/automation-service/app-central/integrations/google-admin/google-admin-2.png)
8. Click on the generated service account to open the details. <br/>![](/img/platform-services/automation-service/app-central/integrations/google-admin/google-admin-3.png)
9. Under the **KEYS** tab, Click **ADD KEY** and choose **Create new key**. <br/>![](/img/platform-services/automation-service/app-central/integrations/google-admin/google-admin-4.png)
10. Click on **CREATE** (make sure **JSON** is selected). <br/>![](/img/platform-services/automation-service/app-central/integrations/google-admin/google-admin-5.png)
11. The JSON file is downloaded. Make sure you save it in a safe place
12. Enable the Admin SDK API for the project at [https://console.cloud.google.com/flows/enableapi?apiid=admin.googleapis.com](https://console.cloud.google.com/flows/enableapi?apiid=admin.googleapis.com)
13. Go to [https://admin.google.com/ac/owl/domainwidedelegation](https://admin.google.com/ac/owl/domainwidedelegation) open the Domain-Wide delegation settings in the Google Admin portal
14. Click on Add new. <br/>![](/img/platform-services/automation-service/app-central/integrations/google-admin/google-admin-6.png)
15. In the Client ID field, provide the client ID from the JSON file. <br/>![](/img/platform-services/automation-service/app-central/integrations/google-admin/google-admin-7.png). <br/>![](/img/platform-services/automation-service/app-central/integrations/google-admin/google-admin-8.png)
16. In the OAuth scopes (comma-delimited) field, provide the following scopes:
	'https://www.googleapis.com/auth/admin.reports.audit.readonly'
17. Click Authorize. <br/>![](/img/platform-services/automation-service/app-central/integrations/google-admin/google-admin-9.png)

## Google Admin in Automation Service and Cloud SOAR

* Label: The desired name for the resource
* User Service Account JSON: Provide the content of the JSON file generated in the previous steps. Open the file and copy-paste the whole content in the field.
* Admin User Email: The e-mail address of an admin user

## Change Log

* September 19, 2023 (v1.1) - First upload
* September 21, 2023 (v1.2)
	+ changed docker to gmail
	+ implemented error handling for User Service Account JSON
