---
title: Google Drive
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/google-drive.png)

Version: 1.0  
Updated: Oct 13, 2023

Google Drive is Google's cloud-based storage and file-sharing service, enabling users to store, sync, and collaborate on files from any device.

## Actions

* **Create Permission** *(Containment)* - Creates a permission for a file or shared drive
* **Delete Permission** *(Containment)* - Deletes a permission
* **Get File** *(Enrichment)* - Gets a file's metadata or content by ID
* **List Files** *(Enrichment)* - Lists the user's files
* **List Permissions** *(Enrichment)* - Lists a file's or shared drive's permissions

## Google Drive Configuration

To create a Service Account in Google Workspace and generate the JSON file needed to configure the Google Drive integration, follow these steps:

1. Log in to the Google Cloud portal at <https://console.cloud.google.com>
2. Select a Google Cloud project (or create a new one)
3. Go to the **API&Services** > **Credentials** page
4. Click **CREATE CREDENTIALS** and select **Service Account**   
  
![](/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-1.png)
5. Enter a Service account name to display in the Google Cloud console. The Google Cloud console generates a service account ID based on this name.
6. Optional: Enter a description of the service account.
7. Skip two optional grant permissions steps and click **Done** to complete the service account creation.   
  
![](/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-2.png)
8. Click on the generated service account to open the details   
  
![](/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-3.png)
9. Under the **KEYS** tab, Click **ADD KEY** and choose **Create new key**   
  
![](/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-4.png)
10. Click on **CREATE** (make sure **JSON** is selected)   
  
![](/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-5.png)
11. The JSON file is downloaded. Make sure you save it in a safe place
12. Enable the Admin SDK API for the project at <https://console.cloud.google.com/flows/enableapi?apiid=admin.googleapis.com>
13. Go to <https://admin.google.com/ac/owl/domainwidedelegation> to open the Domain-Wide delegation settings in the Google Admin portal
14. Click on Add new   
  
  
![](/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-6.png)
15. In the Client ID field, provide the client ID from the JSON file   
  
![](/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-7.png)   
  
![](/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-8.png)
16. In the OAuth scopes (comma-delimited) field, provide the following scopes:
	1. https://www.googleapis.com/auth/drive
17. Click Authorize

![](/img/platform-services/automation-service/app-central/integrations/google-drive/google-drive-9.png)

## Google Drive in Automation Service and Cloud SOAR

* Label: The desired name for the resource
* User Service Account JSON: Provide the content of the JSON file generated in the previous steps. Open the file and copy-paste the whole content in the field.
* Admin User Email: The e-mail address of an admin user

## Change Log

* October 13, 2023 (v1.0) - First upload
