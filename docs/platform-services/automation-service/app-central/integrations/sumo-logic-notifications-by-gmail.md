---
title: Sumo Logic Notifications By Gmail
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/sumo-logic-notifications.png')} alt="sumo-logic-notifications" width="100"/>

***Version: 1.0  
Updated: Aug 13, 2024***

Integration with Sumo Logic platform for monitors and Gmail notification.

## Actions

* **Assess Alert Status** (*Scheduled*) - Periodically monitor status of a Sumo Logic alert and notify a Gmail user about an unresolved alert.
* **Authorize DO NOT USE IN PLAYBOOK** (*Enrichment*) - Authorize access to Gmail. This should only be run once and not from a playbook.
* **Confirm DO NOT USE IN PLAYBOOK** (*Enrichment*) - Confirm access to Gmail. This should only be run once and not from a playbook.

## Sumo Logic Notifications By Gmail configuration

1. [Create an access key](/docs/manage/security/access-keys/#create-an-access-key) and copy the resulting **Access ID** and **Access Key**. Store the ID and access key (temporally) into a text editor.
   :::note
   The ID and key won't be available again once you close the confirmation screen.
   :::
6. Create a new Project in the [Developer Console](https://console.developers.google.com/). 
7. In the **APIs & Services** section, navigate to **Credentials** and select **Create Credentials**: [https://console.cloud.google.com/apis/api](https://console.cloud.google.com/apis/api). 
8. Select **OAuth Client ID** as the credential type and set the following inputs:
	* **Application Type**. Web Application.
	* **Authorized redirect URIs > Add URI**. Enter `http://localhost/`.
		:::note
		Will only be used to generate a refresh token.
		:::
9. Copy the resulting Client ID and Client Secret Key values, as these will be used later.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/gmail/gmail-2.png')} style={{border:'1px solid gray'}} alt="gmail" width="400"/>
10. Navigate to the **OAuth Consent Screen** section and set the following inputs:
	* **App Name**
	* **User Support Email**. Set to an email that you have access to.
	* **Developer Contact Information**. Set to an email that you have access to.
11. The following Scopes are needed:
	* `https://mail.google.com`
	* `https://www.googleapis.com/auth/gmail.modify`
	* `https://www.googleapis.com/auth/gmail.readonly`
	* `https://www.googleapis.com/auth/admin.directory.user`
	* `https://www.googleapis.com/auth/gmail.compose`
	* `https://www.googleapis.com/auth/gmail.send`
	* `https://www.googleapis.com/auth/gmail.settings.basic`
	* `https://www.googleapis.com/auth/gmail.settings.sharing`

12. In Cloud SOAR, navigate to **Automation > Integrations > Gmail**, add a new Resource and provide the following inputs:
	* Client ID (generated in step 4)
	* Client Secret Key (generated in step 4)
13. Save and close the Resource. 
14. Click and execute the **Authorize DO NOT USE IN PLAYBOOK** action. If successful, a URL will be returned.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sumo-logic-notifications-by-gmail/sumo-logic-notifications-by-gmail-8.png')} style={{border:'1px solid gray'}} alt="gmail" width="400"/>
15. Open a new browser tab, and navigate to the URL generated in the previous step. 
16. Provide consent for this developer project to access the Gmail API.
17. The response to this consent flow is the localhost redirect specified earlier. Copy this URL. 
18. Within this URL, copy the code nested in this URL: 
	```
	http://localhost/?code=4/0AbUR2VXXXXFe8kuMTUE4Dkxts4J8mo3\_BkZKxXAcdzXXXXtd9lrjai00pEuG0YXWtWjimg&scope=https://mail.google.com/%20https://www.googleapis.com/auth/gmail.settings.basic
	```
	<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sumo-logic-notifications-by-gmail/sumo-logic-notifications-by-gmail-10.png')} style={{border:'1px solid gray'}} alt="gmail" width="600"/>
19. In Cloud SOAR, click and run the **Confirm DO NOT USE IN PLAYBOOK** action, providing the code generated above in the Code input.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sumo-logic-notifications-by-gmail/sumo-logic-notifications-by-gmail-9.png')} style={{border:'1px solid gray'}} alt="gmail" width="600"/>
20. This will return a JSON result with a "**credentials**" key. Copy the value of this key, which is a base64-encoded string JSON credential we will use in the next and final step.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/gmail/gmail-6.png')} style={{border:'1px solid gray'}} alt="gmail" width="600"/>
21. Paste the base64 string in the "**credentials**" field of the Integration Resource created in **step 12**. Save and close the resource window. 

## External Libraries

* [Gmail (python)](https://github.com/googleapis/google-auth-library-python/blob/master/LICENSE)
* [Gmail (Google API)](https://github.com/googleapis/google-api-python-client/blob/master/LICENSE)

## Configure Sumo Logic Notifications By Gmail in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';
import SumoLogicAPIURL from '../../../../reuse/automation-service/sumo-logic-api-url.md';
import CloudSOARAPIURL from '../../../../reuse/automation-service/cloud-soar-api-url.md';
import AccessID from '../../../../reuse/automation-service/access-id.md';
import AccessKey from '../../../../reuse/automation-service/access-key.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* <SumoLogicAPIURL/>
* <AccessID/>
* <AccessKey/>
* **Client ID (Gmail)**. Enter the Gmail client ID you [copied earlier](#sumo-logic-notifications-by-gmail-configuration).

* **Client Secret Key (Gmail)**. Enter the secret for the client ID.

* **Credentials**. Retrieve credentials from the "Confirm DO NOT USE IN PLAYBOOK" action.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sumo-logic-notifications-by-gmail/sumo-logic-notifications-by-gmail-7.png')} style={{border:'1px solid gray'}} alt="sumo-logic-notifications" width="400"/>

## Change Log

* Aug 13, 2024 - First upload