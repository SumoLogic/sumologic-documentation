---
title: Libraesva Email Security V5
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/libraesva-email-security-v5.png')} alt="libraesva-email-security-v5" width="100"/>

***Version: 5.2  
Updated: Jul 11, 2023***

Libraesva Email Security V5 is active defense against phishing, 0-day malware, impersonation, spoofing, and email threats.

## Actions

* **Get URLsand Report** *(Enrichment)* - Retrieve the collection of Sandbox/Urlsand resources.
* **Get Current User** *(Enrichment)* - Retrieve the collection of User resources.
* **Get Whitelist** *(Enrichment)* - Retrieve the collection of Whitelist resources.
* **Get Blacklist** *(Enrichment)* - Retrieve the collection of Blacklist resources.
* **List Valid Recipients** *(Enrichment)* - Retrieve the collection of ValidRecipient resources.
* **Search Email** *(Enrichment)* - Retrieve the collection of Message resources.
* **Get Quicksand Report** *(Enrichment)* - Retrieve the collection of Sandbox/Quicksand resources.
* **Add to Blacklist** *(Containment)* - Creates a Blacklist resource.
* **Remove From Blacklist** *(Containment)* - Removes the Blacklist resource.
* **Generate Token** *(Enrichment)* - Generate token to populate the integration resource.
* **Get Message** *(Enrichment)* - Retrieves a Message resource.
* **Download Attachment Content** *(Enrichment)* - Fetch message attachment content or download attachment to incident attachments.
* **Fetch Message HTML** *(Enrichment)* - Fetch message HTML.

## Configure Libraesva Email Security V5 in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search for the integration and click on the row. <br/>The integration details will appear. Click on the "+" button to add new Resource. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/libraesva-email-security-v5/libraesva-email-security-v5-3.png')} style={{border:'1px solid gray'}} alt="libraesva-email-security-v5-3" width="400"/>
1. Populate all the required fields (\*) and then click **SAVE**.
   * URL API
   * User
   * Password
   * Libraesva Token. The generated token obtained from Generate Token action (follow the instructions below).
   * Impersonate User. For some actions admin privileges are required.
   * Cloud SOAR URL. i.e : https://your-cloud-soar-host/incmansuite\_ng
   * Cloud SOAR User JWT Token <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/libraesva-email-security-v5/libraesva-email-security-v5-4.png')} style={{border:'1px solid gray'}} alt="libraesva-email-security-v5-1" width="400"/>
1. To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/libraesva-email-security-v5/libraesva-email-security-v5-5.png')} style={{border:'1px solid gray'}} alt="libraesva-email-security-v5-5" width="400"/>
1. Click **Test**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/libraesva-email-security-v5/libraesva-email-security-v5-6.png')} style={{border:'1px solid gray'}} alt="libraesva-email-security-v5-6" width="400"/>
1. You should receive a successful notification in the bottom right corner. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/libraesva-email-security-v5/libraesva-email-security-v5-7.png')} style={{border:'1px solid gray'}} alt="libraesva-email-security-v5-7" width="400"/>

**Token**

1. To generate the token make sure you provided the URL API, user, and password.
1. Test the resource to check that the credentials are correct.
1. Execute the Generate Token action with the Test Action.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/libraesva-email-security-v5/libraesva-email-security-v5-8.png')} style={{border:'1px solid gray'}} alt="libraesva-email-security-v5-8" width="400"/>
1. Copy the token (without quotation marks).<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/libraesva-email-security-v5/libraesva-email-security-v5-9.png')} style={{border:'1px solid gray'}} alt="libraesva-email-security-v5-9" width="700"/>
1. Now you can populate the Token field in the resource.

## Category

Email Security

## Change Log

* September 2, 2022 - First upload
* September 12, 2022 - Changed integration name and logo
* October 7, 2022 - Changed user and password to be not required; OTP removed from resource and actions; added three new actions
* July 7, 2023 (v5.2)
	+ Updated the integration with Environmental Variables
	+ Changed fields visibility
