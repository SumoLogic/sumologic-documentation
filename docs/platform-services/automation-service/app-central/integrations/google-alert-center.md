---
title: Google Alert Center
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/google.png')} alt="google" width="80"/>

***Version: 1.0  
Updated: Dec 12, 2023***

Google Alert Center relies on the Google Workspace Alert Center API which empowers administrators to efficiently manage alerts on issues affecting the domain.

## Actions

* **Create Alert Feedback** *(Notification)* - Creates new feedback for an alert.
* **Delete Alerts** *(Notification)* - Marks the specified alerts for deletion. An alert that has been marked for deletion is removed from Alert Center after 30 days.
* **Get Alert** *(Enrichment)* - Gets the specified alert.
* **List Alert Feedback** *(Enrichment)* - Lists all the feedback for an alert.
* **List Alerts** *(Enrichment)* - Lists the alerts.
* **Undelete Alerts** *(Notification)* - Restores, or "undeletes", an alert that was marked for deletion within the past 30 days.

## Google Alert Center Configuration

To [create a Service Account](https://developers.google.com/workspace/guides/create-credentials) in Google Workspace and generate the JSON file needed to configure the Google Alert Center integration, follow these steps:

1. Log in to the [Google Cloud](https://console.cloud.google.com) portal.
2. Select a Google Cloud project (or create a new one).
3. Go to the **API&Services** > **Credentials** page.
4. Click **CREATE CREDENTIALS** and select **Service Account**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-alert-center/google-alert-center-1.png')} style={{border:'1px solid gray'}} alt="google-dalert-center" width="800"/>
5. Enter a Service account name to display in the Google Cloud console. The Google Cloud console generates a service account ID based on this name.
6. **Optional**: Enter a description of the service account.
7. Skip two optional grant permissions steps and click **Done** to complete the service account creation.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-alert-center/google-alert-center-2.png')} style={{border:'1px solid gray'}} alt="google-dalert-center" width="800"/>
8. Click on the generated service account to open the details.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-alert-center/google-alert-center-3.png')} style={{border:'1px solid gray'}} alt="google-dalert-center" width="800"/>
9. Under the **KEYS** tab, Click **ADD KEY** and choose **Create new key**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-alert-center/google-alert-center-4.png')} style={{border:'1px solid gray'}} alt="google-dalert-center" width="800"/>
10. Click on **CREATE** (make sure **JSON** is selected).<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-alert-center/google-alert-center-5.png')} style={{border:'1px solid gray'}} alt="google-dalert-center" width="500"/>
11. The JSON file is downloaded. Make sure you save it in a safe place.
12. Enable the Google Workspace Alert Center API for the project at [https://console.cloud.google.com/apis/library/alertcenter.googleapis.com](https://console.cloud.google.com/apis/library/alertcenter.googleapis.com). <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-alert-center/google-alert-center-6.png')} style={{border:'1px solid gray'}} alt="google-dalert-center" width="600"/>
13. Go to [https://admin.google.com/ac/owl/domainwidedelegation](https://admin.google.com/ac/owl/domainwidedelegation) to open the Domain-Wide delegation settings in the Google Admin portal.
14. Click on Add new.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-alert-center/google-alert-center-7.png')} style={{border:'1px solid gray'}} alt="google-dalert-center" width="800"/>
15. In the Client ID field, provide the client ID from the JSON file.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-alert-center/google-alert-center-8.png')} style={{border:'1px solid gray'}} alt="google-dalert-center" width="500"/><br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-alert-center/google-alert-center-9.png')} style={{border:'1px solid gray'}} alt="google-dalert-center" width="500"/>
16. In the OAuth scopes (comma-delimited) field, provide the following scopes:
	'https://www.googleapis.com/auth/apps.alerts'
17. Click Authorize.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/google-alert-center/google-alert-center-10.png')} style={{border:'1px solid gray'}} alt="google-dalert-center" width="800"/>

## Configure Google Alert Center in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **User Service Account JSON**. Provide the content of the JSON file generated in [above](#google-alert-center-configuration). Open the file and copy-paste the whole content in the field.

* **Admin User Email**. Enter the email address of an admin user.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/google-alert-center-configuration.png')} style={{border:'1px solid gray'}} alt="Google Alert Center configuration" width="400"/>

For information about Google Alert Center, see [Google Alert Center documentation](https://support.google.com/a/answer/9105393?hl=en).

## Change Log

* December 12, 2023 (v1.0) - First upload
