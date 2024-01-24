---
title: Libraesva Email Security V5
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/libraesva-email-security-v5.png)

Version: 5.2  
Updated: Jul 11, 2023

Libraesva Email Security V5 is active defense against phishing, 0-day malware, impersonation, spoofing and email threats.

## Actions

* **Get URLsand Report** *(Enrichment)* - Retrieve the collection of Sandbox/Urlsand resources
* **Get Current User** *(Enrichment)* - Retrieve the collection of User resources
* **Get Whitelist** *(Enrichment)* - Retrieve the collection of Whitelist resources
* **Get Blacklist** *(Enrichment)* - Retrieve the collection of Blacklist resources
* **List Valid Recipients** *(Enrichment)* - Retrieve the collection of ValidRecipient resources
* **Search Email** *(Enrichment)* - Retrieve the collection of Message resources
* **Get Quicksand Report** *(Enrichment)* - Retrieve the collection of Sandbox/Quicksand resources
* **Add to Blacklist** *(Containment)* - Creates a Blacklist resource
* **Remove From Blacklist** *(Containment)* - Removes the Blacklist resource
* **Generate Token** *(Enrichment)* - Generate token to populate the integration resource
* **Get Message** *(Enrichment)-* Retrieves a Message resource.
* **Download Attachment Content** *(Enrichment)-* Fetch message attachment content or download attachment to incident attachments.
* **Fetch Message HTML** *(Enrichment)-* Fetch message HTML.

## Libraesva Email Security V5 in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/libraesva-email-security-v5/libraesva-email-security-v5-1.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/libraesva-email-security-v5/libraesva-email-security-v5-2.png)

After the list of the integrations appears, search for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/libraesva-email-security-v5/libraesva-email-security-v5-3.png)

Populate all the required fields (\*) and then click Save.

* URL API
* User
* Password
* Libraesva Token: the generated token obtained from Generate Token action (follow the instructions below)
* Impersonate User: for some actions admin privileges are required
* Cloud SOAR URL: i.e : https://your-cloud-soar-host/incmansuite\_ng
* Cloud SOAR User JWT Token'

![](/img/platform-services/automation-service/app-central/integrations/libraesva-email-security-v5/libraesva-email-security-v5-4.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/libraesva-email-security-v5/libraesva-email-security-v5-5.png)

Click Test.

![](/img/platform-services/automation-service/app-central/integrations/libraesva-email-security-v5/libraesva-email-security-v5-6.png)   


You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/libraesva-email-security-v5/libraesva-email-security-v5-7.png)

**Token**

1. To generate the token make sure you provided the URL API, user and password

2. Test the resource to check that the credentials are correct

3. Execute the Generate Token action with the Test Action

![](/img/platform-services/automation-service/app-central/integrations/libraesva-email-security-v5/libraesva-email-security-v5-8.png)

4. Copy the token (without quotation marks)

![](/img/platform-services/automation-service/app-central/integrations/libraesva-email-security-v5/libraesva-email-security-v5-9.png)

5. Now you can populate the Token field in the resource.

## Category

Email Security

## Change Log

* September 2, 2022 - First upload
* September 12, 2022 - Changed integration name and logo
* October 7, 2022 - Changed user and password to be not required; OTP removed from resource and actions; added three new actions
* July 7, 2023 (v5.2)
	+ Updated the integration with Environmental Variables
	+ Changed fields visibility
