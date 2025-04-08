---
title: Gmail
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/google.png')} alt="google" width="80"/>

**Version: 1.5  
Updated: June 26, 2024**

Interact with filters, mail messages, and attachments in Google Mail.

## Actions

* **Add Filter** (*Containment*) - Creates a filter. Note: you can only create a maximum of 1,000 filters.
* **Authorize DO NOT USE IN PLAYBOOK** (*Enrichment*) - Authorize access to Gmail. This should only be run once and not from Playbook.
* **Confirm DO NOT USE IN PLAYBOOK** (*Enrichment*) - Confirm access to Gmail. This should only be run once and not from Playbook.
* **Delete Filter** (*Containment*) - Immediately and permanently deletes the specified filter.
* **Delete Mail** *(Containment)* - Immediately and permanently deletes the specified message. This operation cannot be undone.
* **Get Attachment** (*Enrichment*) - Gets the specified message attachment.
* **Get Mail** (*Enrichment*) - Gets the specified message.
* **Get Thread** (*Enrichment*) - Gets the specified thread.
* **Gmail Daemon** (*Daemon*) - Automatically retrieve all unread messages in the inbox and mark them as read.
* **List Filters** (*Enrichment*) - Lists the message filters of a Gmail user.
* **List Labels** (*Enrichment*) - Lists all labels in the user's mailbox.
* **Move Mail** (*Enrichment*) - Modifies the labels on the specified message.
* **Search Engine** (*Enrichment*) - Search all items using the specified query.
* **Search Mail** (*Enrichment*) - Lists the messages in the user's mailbox.
* **Send Email \*** (*Notification*) - Sends the specified message.
* **Send Email V2** (*Notification*) - Sends the specified message without any attachments.

\* Only available for Cloud SOAR

## Gmail configuration

1) Create a new Project in the D[eveloper Console](https://console.developers.google.com/).
2) In the APIs & Services section, navigate to Credentials and select Create Credentials: [https://console.cloud.google.com/apis/api](https://console.cloud.google.com/apis/api).
3) Select OAuth Client ID as the credential type and set the following inputs:
	* **Application Type**. Web Application.
	* **Authorized redirect URIs > Add URI**. 'http://localhost/'.
		:::note
		Will only be used to generate a refresh token.
		:::
4) Copy the resulting Client ID and Client Secret Key values, as these will be used later.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/gmail/gmail-2.png')} style={{border:'1px solid gray'}} alt="gmail" width="400"/>
5) Navigate to the OAuth Consent Screen section and set the following inputs:
	* App Name
	* User Support Email: Set to an email that you have access to.
	* Developer Contact Information: Set to an email that you have access to.
6) The following Scopes are needed:
	* 'https://mail.google.com'
	* 'https://www.googleapis.com/auth/gmail.modify'
	* 'https://www.googleapis.com/auth/gmail.readonly'
	* 'https://www.googleapis.com/auth/admin.directory.user'
	* 'https://www.googleapis.com/auth/gmail.compose'
	* 'https://www.googleapis.com/auth/gmail.send'
	* 'https://www.googleapis.com/auth/gmail.settings.basic'
	* 'https://www.googleapis.com/auth/gmail.settings.sharing'

7) In Cloud SOAR, navigate to **Settings > Integrations > Gmail**, add a new Resource and provide the following inputs:
	* Client ID (generated in step 4)
	* Client Secret Key (generated in step 4)
8) Save and close the Resource.
9) Click and execute the **Authorize DO NOT USE IN PLAYBOOK** action. If successful, a URL will be returned.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/gmail/gmail-3.png')} style={{border:'1px solid gray'}} alt="gmail" width="400"/> 
10) Open a new browser tab, and navigate to the URL generated in the previous step.
11) Provide consent for this developer project to access the Gmail API.   
12) The response to this consent flow is the localhost redirect specified earlier. Copy this URL.
13) Within this URL, copy the code nested in this URL: 
	```
	http://localhost/?code=4/0AbUR2VXXXXFe8kuMTUE4Dkxts4J8mo3\_BkZKxXAcdzXXXXtd9lrjai00pEuG0YXWtWjimg&scope=https://mail.google.com/%20https://www.googleapis.com/auth/gmail.settings.basic
	```
	<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/gmail/gmail-4.png')} style={{border:'1px solid gray'}} alt="gmail" width="600"/>
14) In Cloud SOAR, click and run the **Confirm DO NOT USE IN PLAYBOOK** action, providing the code generated above in the Code input.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/gmail/gmail-5.png')} style={{border:'1px solid gray'}} alt="gmail" width="600"/>
15) This will return a JSON result with a "**credentials**" key. Copy the value of this key, which is a base64-encoded string JSON credential we will use in the next and final step.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/gmail/gmail-6.png')} style={{border:'1px solid gray'}} alt="gmail" width="600"/>
16) Paste the base64 string in the "**Credentials**" field of the Integration Resource created in step 7. Save and close the resource window.
17) You can test that the integration credentials are working by running the "**Get Labels**" action (no inputs are needed). If successful, it will return a JSON result of mail labels.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/gmail/gmail-7.png')} style={{border:'1px solid gray'}} alt="gmail" width="600"/>

## External Libraries

* [Gmail (python)](https://github.com/googleapis/google-auth-library-python/blob/master/LICENSE)
* [Gmail (Google API)](https://github.com/googleapis/google-api-python-client/blob/master/LICENSE)

## Change Log

* February 28, 2019 - First upload
* September 6, 2019 - Added link to Gmail external libraries
* June 19, 2020 - Gmail daemon added
* March 10, 2022 - Logo
* August 18, 2023 (v1.2) - Integration refactored
* October 26, 2023 (v1.4)
	+ List of changes grouped by actions
		- Add Filter
			* Changed action type to Containment
			* Changed field type to tag for the following fields: Add Labels IDs, Remove Label IDs
			* Changed field type to textarea for the following fields: Subject, Query, Negated Query
			* Changed field type to list for the following fields: Size Comparison
			* Enabled Incident Artifacts feature flag for the following fields: Add Label IDs, Remove Label IDs, From, To
		- Delete Mail
			* Enabled Incident Artifacts feature flag for the following fields: Message ID
		- Get Attachment
			* Enabled Incident Artifacts feature flag for the following fields: Message ID, Attachment ID
			* Changed type to text for the following output path: size
		- List Filters (formerly Get Filters)
			* Action renamed from Get Filters to List Filters
			* Added table view
			* Extended output mappings
		- List Labels (formerly Get Labels)
			* Action renamed from Get Labels to List Labels
			* Added table view
		- Get Mail
			* Enabled Incident Artifacts feature flag for the following fields: Message ID
			* Added table view
			* Extended output mappings
		- Get Thread
			* Enabled Incident Artifacts feature flag for the following fields: Thread ID
			* Added table view
			* Extended output mappings
		- Gmail Daemon
			* Extended Table View for action results
		- Move Mail
			* Enabled Incident Artifacts feature flag for the following fields: Message ID, Add Labels IDs, Remove Label IDs
			* Changed field type to tag for the following fields: Add Labels IDs, Remove Label IDs
			* Added table view
			* Extended output mappings
		- Search Mail
			* Now it is possible to view a list of emails without necessary providing any search keyword
			* Changed label from Search (Query) to Search
			* Extended output mappings
		- Send Email
			* Enabled Incident Artifacts feature flag for the following fields: From, Final Report ID
			* Added table view
			* Added output mappings
		- Send Email V2
			* Enabled Incident Artifacts feature flag for the following fields: From
			* Added table view
			* Added output mappings
	+ Other general changes
		- Code refactoring
* June 26, 2024 (v1.5)
	+ Update: The Send Email action now supports the new Cloud SOAR API. This update enables you to send incident attachments directly through the email action.
