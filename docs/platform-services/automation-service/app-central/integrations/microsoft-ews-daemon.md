---
title: Microsoft EWS Daemon
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/microsoft-ews-daemon.png')} alt="microsoft-defender-atp" width="100"/>

***Version: 2.5  
Updated: May 9, 2024***

:::sumo Cloud SOAR
This integration is only for Cloud SOAR.
:::

Process emails with EWS Daemon.

## Overview

### Purpose

The Microsoft EWS Incoming Mail Daemon automatically retrieves emails. It enables seamless integration with security automation platforms by pulling in messages for further analysis and action.
### Use cases

* Automatically ingest emails from monitored mailboxes for phishing analysis or ticketing systems.
* Feed email content into security orchestration workflows.
* Process and analyze attachments (e.g., .eml, .msg, documents) in near real-time.
* Extract and enrich sender/recipient metadata for further investigation.

### Supported versions

* Microsoft Exchange Online (Office 365)

### Prerequisites
* Active Azure subscription
* Application registration with:
  * Client ID
  * Client Secret
  * Tenant ID
* EWS API permissions
* Basic authentication (legacy) or OAuth 2.0 with modern authentication
* Correctly configured EWS endpoint 
* Valid credentials or token

### Limitations 
* Certain attachments may be represented differently, which can result in missing or inconsistent file metadata (e.g., name or type).
* Mailbox rate limits may apply depending on Microsoft tenant configuration

## Usage

### Basic usage
* Configure credentials (Tenant ID, Client ID, Client Secret).
* Set retrieval parameters like polling frequency, folders to include/exclude.
* Enable the Daemon action in a rule or playbook.
* Emails are pulled automatically.

### Advanced usage
* Use filtering parameters to narrow email scope:
  * Subject keywords 
  * Sender domain 
  * Date ranges
* Enable the Daemon action in a rule or playbook.

## Actions

* **Microsoft EWS Incoming Mail Daemon** *(Daemon)* - Automatically retrieve emails from EWS.

## Microsoft EWS configuration

Each application you want the Microsoft identity platform to perform identity and access management (IAM) needs to be registered. Registering it establishes a trust relationship between your application and the identity provider, the Microsoft identity platform.

### Register an application

[Registering your application](https://learn.microsoft.com/en-us/exchange/client-developer/exchange-web-services/how-to-authenticate-an-ews-application-by-using-oauth) establishes a trust relationship between your app and the Microsoft identity platform. The trust is unidirectional: your app trusts the Microsoft identity platform, and not the other way around.

Follow these steps to create the app registration:

1. Sign in to the [Azure portal](https://portal.azure.com/).
1. If you have access to multiple tenants, use the Directory + subscription filter  <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-ews-daemon/microsoft-ews-daemon-1.png')} style={{border:'1px solid gray'}} alt="microsoft-ews-daemon" width="30"/> in the top menu to select the tenant in which you want to register an application.
1. Search for and select the **Azure Active Directory**.
1. Under **Manage**, select **App registrations > New registration**.
1. Enter a Name for your application. Users of your app might see this name, and you can change it later.
1. Select Register to complete the initial app registration.
1. Don't enter anything for **Redirect URI (optional)**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-ews-daemon/microsoft-ews-daemon-2.png')} style={{border:'1px solid gray'}} alt="microsoft-defender-atp" width="800"/>

When registration completes, the Azure portal displays the app registration's Overview pane, which includes its Application (client) ID. Also referred to as just client ID, this value uniquely identifies your application in the Microsoft identity platform.

The client ID as one aspect in validating the security tokens it receives from the identity platform.
<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-ews-daemon/microsoft-ews-daemon-3.png')} style={{border:'1px solid gray'}} alt="microsoft-defender-atp" width="800"/>

**Add credentials**

Credentials are used by confidential client applications that access an API. Examples of confidential clients are web apps, or service- and daemon-type applications. Credentials allow your application to authenticate as itself, requiring no interaction from a user at runtime.

You can add client secrets (a string) as credentials to your confidential client app registration.<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-ews-daemon/microsoft-ews-daemon-4.png')} style={{border:'1px solid gray'}} alt="microsoft-defender-atp" width="800"/>

**Add a client secret**

The client secret, known also as an application password, is a string value of your app.

1. Select your application in App registrations in the Azure portal.
2. Select **Certificates & secrets > New client secret**.
3. Add a description for your client secret.
4. Select a duration.
5. Select **Add**.
6. Record the secret's value for use in your client application code - it's never displayed again after you leave this page.

**Add permissions to API**

1. Select your application in App registrations in the Azure portal.
2. Select **API permissions > Add a permission**.
3. Delegated permissions are selected by default. Delegated permissions are appropriate for client apps that access an API as the signed-in user, and whose access should be restricted to the permissions you select in the next step.
4. Application permissions are for service- or daemon-type applications that need to access API as themselves, without user interaction for sign-in or consent. Unless you've defined application roles for your API.
5. Select Add a permission, and add the following permissions (as we can see from the picture).<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-ews-daemon/microsoft-ews-daemon-5.png')} style={{border:'1px solid gray'}} alt="microsoft-defender-atp" width="800"/>

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

Once API permission are added then Admin must consent to a grant these permissions, [Learn more about permissions and consent](https://docs.microsoft.com/azure/active-directory/develop/v2-permissions-and-consent?WT.mc_id=Portal-Microsoft_AAD_RegisteredApps).

:::info Important Note
When using the Microsoft EWS Daemon action within an automation rule, note that it will only pull in emails that are marked "Unread" within the respective mailbox scope. To ensure all relevant alerts are processed correctly, keep this mailbox a dedicated entity and avoid any manual reviews by other stakeholders.
:::

## Configure Microsoft EWS Daemon in Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

* Host
* Authentication Method
* Username
* Password
* Primary SMTP Address
* Tenant
* Client ID
* Client Secret 
* Cloud SOAR API URL
* Cloud SOAR Access ID
* Cloud SOAR Access Key
* etc. other details for filtering the mails
* Automation Engine
<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/microsoft-ews-daemon-configuration.png')} style={{border:'1px solid gray'}} alt="Microsoft EWS Daemon configuration" width="400"/>

For information about Microsoft EWS, see [Microsoft Exchange Web Services documentation](https://learn.microsoft.com/en-us/exchange/client-developer/exchange-web-services/how-to-authenticate-an-ews-application-by-using-oauth).

## API reference

### Configuration
Environment variables or parameters:
* tenant
* client id
* client secret 
* email: The service account email address 
* password or OAuth token: Authentication credentials
* automation bridge
* and other fields info based on the requirement

### Containment APIs

### Rate Limits and Quotas
* Microsoft may enforce throttling based on:
  * Number of concurrent EWS requests 
  * Number of items retrieved per call 
  * Number of mailbox accesses per day/hour

#### Troubleshooting
| Issue | Resolution | Resolution |
| :-- |:-- |:-- |
| No emails retrieved | Incorrect folder, filters too strict | Check filters, verify folder ID    |
| Authentication failed | Invalid credentials or token | Update credentials and reauthorize |

### FAQ

#### Can I filter which emails are fetched?
Yes. Filtering can be applied based on folders, received time. Custom filters may be implemented depending on integration configuration.

#### How frequently does the Daemon poll for new messages?
The polling interval is determined by the configuration within the integration setup or automation rule.

### Support
* For issues, questions, or improvements:
* Microsoft [Q&A](https://learn.microsoft.com/answers)
* Review logs on the portal using log search.

## Category

Email Gateway

## Change Log

* October 27, 2021 - First upload
* March 10, 2022 - Logo
* October 6, 2023 (v2.2) - Integration Updated
* March 4, 2024 (v2.3) - Updated code for compatibility with Python 3.12
* March 21, 2024 (v2.4) - Resolved an issue related to the Email Body
* May 9, 2024 (v2.5) - A new field has been added to the integration resource for specifying the folder or path to search within 
