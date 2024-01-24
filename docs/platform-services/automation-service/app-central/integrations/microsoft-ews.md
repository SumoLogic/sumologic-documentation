---
title: Microsoft EWS
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/microsoft-ews.png)

Version: 2.2  
Updated: Oct 06, 2023

Perform actions on Microsoft EWS mailboxes, accounts and security settings.

## Actions

* **Get Attachments** (*Enrichment*) - Get an email attachment
* **Get Contacts** (*Enrichment*) - Get all contacts for a mailbox
* **Get Searchable Mailboxes** (*Enrichment*) - Multiple new fields to search mails
* **Get Out Of Office** (*Enrichment*) - Get out of office message for a mailbox
* **Search Emails Extended** (*Enrichment*) - Search emails with multiple new fields to search mails
* **Copy Email** (*Containment*) - Copy email to a new destination
* **Delete Attachments** (*Containment*) - Delete an attachment
* **Delete Email** (*Containment*) - Delete an email
* **Download Mail As EML** (*Enrichment*) - Save the whole email as EML format in incident attachments / objects
* **Junk Mail** *(Containment)* - Mark the specified email as Junk
* **Send Email** *(Notification)* - Send an email
* **Reply To Email** *(Notification)* - Reply to an email with a given item\_id

## Microsoft EWS Configuration

Each application you want the Microsoft identity platform to perform identity and access management (IAM) needs to be registered. Registering it establishes a trust relationship between your application and the identity provider, the Microsoft identity platform.   


**Register an application**

Registering your application establishes a trust relationship between your app and the Microsoft identity platform. The trust is unidirectional: your app trusts the Microsoft identity platform, and not the other way around. 

Follow these steps to create the app registration:

1. Sign in to the [Azure portal](https://portal.azure.com/)
2. If you have access to multiple tenants, use the Directory + subscription filter ![](/img/platform-services/automation-service/app-central/integrations/microsoft-ews/microsoft-ews-1.png) in the top menu to select the tenant in which you want to register an application.
3. Search for and select the Azure Active Directory.
4. Under Manage, select App registrations > New registration.
5. Enter a Name for your application. Users of your app might see this name, and you can change it later.
6. Select Register to complete the initial app registration.
7. Don't enter anything for Redirect URI (optional)

![](/img/platform-services/automation-service/app-central/integrations/microsoft-ews/microsoft-ews-2.png)

When registration completes, the Azure portal displays the app registration's Overview pane, which includes its Application (client) ID. Also referred to as just client ID, this value uniquely identifies your application in the Microsoft identity platform.   
The client ID as one aspect in validating the security tokens it receives from the identity platform.

![](/img/platform-services/automation-service/app-central/integrations/microsoft-ews/microsoft-ews-3.png)

**Add credentials**   
Credentials are used by confidential client applications that access an API. Examples of confidential clients are web apps, or service- and daemon-type applications. Credentials allow your application to authenticate as itself, requiring no interaction from a user at runtime.   
You can add client secrets (a string) as credentials to your confidential client app registration.   
 

![](/img/platform-services/automation-service/app-central/integrations/microsoft-ews/microsoft-ews-4.png)

**Add a client secret**   
The client secret, known also as an application password, is a string value of your app.

1. Select your application in App registrations in the Azure portal.
2. Select Certificates & secrets > New client secret.
3. Add a description for your client secret.
4. Select a duration.
5. Select Add.
6. Record the secret's value for use in your client application code - it's never displayed again after you leave this page.

**Add permissions to API**   
 

1. Select your application in App registrations in the Azure portal.
2. Select API permissions > Add a permission
3. Delegated permissions are selected by default. Delegated permissions are appropriate for client apps that access an API as the signed-in user, and whose access should be restricted to the permissions you select in the next step.
4. Application permissions are for service- or daemon-type applications that need to access API as themselves, without user interaction for sign-in or consent. Unless you've defined application roles for your API.
5. Select Add a permission, and add the following premissions (as we can see from picutre)

![](/img/platform-services/automation-service/app-central/integrations/microsoft-ews/microsoft-ews-5.png)

**EWS API need to be configure these permissions**   
Applications are authorized to call APIs when they are granted permissions by users/admins as part of the consent process. The list of configured permissions should include all the permissions the application needs.

**API / Permissions**

 Microsoft Graph (7)

* Mail.Read
	+ Type: Delegated
	+ Description: Read user mail
	+ Admin: -
* Mail.Read
	+ Type: Application
	+ Description: Read mail in all mailboxes
	+ Admin: Yes
* Mail.ReadBasic
	+ Type: Delegated
	+ Description: Read user basic mail
	+ Admin: -
* Mail.ReadBasic
	+ Type: Application
	+ Description: Read basic mail in all mailboxes
	+ Admin: Yes
* Mail.ReadBasic.All
	+ Type: Application
	+ Description: Read basic mail in all mailboxes
	+ Admin: Yes
* profile
	+ Type: Delegated
	+ Description: View users' basic profile
	+ Admin: -
* User.Read
	+ Type: Delegated
	+ Description: Sign in and read user profile
	+ Admin: Yes

Office 365 Exchange Online (3)

* EWS.AccessAsUser.All
	+ Type: Delegated
	+ Description: Access mailboxes as the signed-in user via Exchange Web Services
	+ Admin: -
* Exchange.ManageAsApp
	+ Type: Application
	+ Description: Manage Exchange As Application
	+ Admin: Yes
* full\_access\_as\_app
	+ Type: Application
	+ Description: Use Exchange Web Services with full access to all mailboxes
	+ Admin: Yes

full\_access\_as\_app Use Exchange Web Services with full access to all mailboxes

Once API permission are added then Admin must consent to a grant these permissions, [Learn more about permissions and consent](https://docs.microsoft.com/azure/active-directory/develop/v2-permissions-and-consent?WT.mc_id=Portal-Microsoft_AAD_RegisteredApps)   
 

## Category

Email Gateway

## Change Log

* April 12, 2019 - First upload
* December 21, 2020
	+ Added new actions
	+ Search Emails Extended replaced the Search Email action
	+ Added new Authentication Method OAuth 2.0 to all actions
* March 10, 2022 - Logo
* October 26, 2022 - added config doc
* November 29, 2022 - Added new actions (Send Email and Reply To Email)
* October 6, 2023 (v2.2) - Integration Updated
