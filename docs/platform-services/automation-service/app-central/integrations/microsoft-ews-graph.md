---
title: Microsoft EWS (Graph)
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/microsoft-ews.png')} alt="microsoft-ews" width="100"/>

***Version: 1.0  
Updated: Sep 10, 2025***

Perform actions on Microsoft EWS mailboxes and accounts using Graph API. 

## Actions

* **Get Attachments** (*Enrichment*) - Get an email attachment.
* **Get Contacts** (*Enrichment*) - Get all contacts for a mailbox.
* **Get Searchable Mailboxes** (*Enrichment*) - Multiple new fields to search mails.
* **Get Out Of Office** (*Enrichment*) - Get out of office message for a mailbox.
* **Search Emails Extended** (*Enrichment*) - Search emails with multiple new fields to search mails.
* **Copy Email** (*Containment*) - Copy email to a new destination.
* **Delete Attachments** (*Containment*) - Delete an attachment.
* **Delete Email** (*Containment*) - Delete an email.
* **Download Mail As EML** (*Enrichment*) - Save the whole email as EML format in incident attachments / objects.
* **Forward Mail** *(Containment)* - Forward the email.
* **Send Email** *(Notification)* - Send an email.
* **Reply To Email** *(Notification)* - Reply to an email with a given item ID.

## Microsoft EWS configuration

Each application for which you want the Microsoft identity platform to perform identity and access management (IAM) needs to be registered. Registering it establishes a trust relationship between your application and the identity provider, the Microsoft identity platform.

### Register an application

[Registering your application](https://learn.microsoft.com/en-us/exchange/client-developer/exchange-web-services/how-to-authenticate-an-ews-application-by-using-oauth) establishes a trust relationship between your app and the Microsoft identity platform. The trust is unidirectional. Your app trusts the Microsoft identity platform, and not the other way around.

Follow these steps to create the app registration:

1. Sign in to the [Azure portal](https://portal.azure.com/).
2. If you have access to multiple tenants, use the Directory + subscription filter <br/>Click <img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-ews/microsoft-ews-1.png')} style={{border:'1px solid gray'}} alt="/microsoft-ews" width="30"/> in the top menu to select the tenant in which you want to register an application.
3. Search for and select the **Azure Active Directory**.
4. Under **Manage**, select **App registrations > New registration**.
5. Enter a **Name** for your application. Users of your app might see this name, and you can change it later.
6. Select **Register** to complete the initial app registration.
7. Don't enter anything for **Redirect URI (optional)**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-ews/microsoft-ews-2.png')} style={{border:'1px solid gray'}} alt="/microsoft-ews" width="800"/>

When registration completes, the Azure portal displays the app registration's **Overview** pane, which includes its Application (client) ID. Also referred to as just client ID, this value uniquely identifies your application in the Microsoft identity platform.

The client ID as one aspect in validating the security tokens it receives from the identity platform.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-ews/microsoft-ews-3.png')} style={{border:'1px solid gray'}} alt="/microsoft-ews" width="800"/>

### Add credentials

Credentials are used by confidential client applications that access an API. Examples of confidential clients are web apps, or service- and daemon-type applications. Credentials allow your application to authenticate as itself, requiring no interaction from a user at runtime.   

You can add client secrets (a string) as credentials to your confidential client app registration.

<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-ews/microsoft-ews-4.png')} style={{border:'1px solid gray'}} alt="/microsoft-ews" width="800"/>

### Add a client secret

The client secret, known also as an application password, is a string value of your app.

1. Select your application in App registrations in the Azure portal.
2. Select **Certificates & secrets > New client secret**.
3. Add a description for your client secret.
4. Select a duration.
5. Select **Add**.
6. Record the secret's value for use in your client application code - it's never displayed again after you leave this page.

### Add permissions to API

1. Select your application in **App registrations** in the Azure portal.
2. Select **API permissions > Add a permission**.
3. Application permissions are for service- or daemon-type applications that need to access API as themselves, without user interaction for sign-in or consent. Unless you've defined application roles for your API.
4. Select **Add a permission**, and add the following permissions: <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-ews/microsoft-ews-5.png')} style={{border:'1px solid gray'}} alt="/microsoft-ews" width="800"/>

#### EWS API to be configured for these permissions

Applications are authorized to call APIs when they are granted permissions by users or administrators as part of the consent process. The list of configured permissions should include all the permissions the application needs.

**API / Permissions**

Microsoft Graph (7)

* Contacts.Read
    + Type: Application
    + Description: Read contacts in all mailboxes
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
* Mail.Send
    + Type: Application
    + Description: Send mail as any user
    + Admin: Yes
* MailboxItem.Read.All
    + Type: Application
    + Description: Read all the users' mailbox items
    + Admin: Yes

Office 365 Exchange Online (3)

* Exchange.ManageAsApp
    + Type: Application
    + Description: Manage Exchange As Application
    + Admin: Yes
* full\_access\_as\_app
    + Type: Application
    + Description: Use Exchange Web Services with full access to all mailboxes
    + Admin: Yes

`full\_access\_as\_app` uses Exchange Web Services with full access to all mailboxes.

Once API permission are added, then an administrator must consent to grant these permissions. [Learn more about permissions and consent](https://docs.microsoft.com/azure/active-directory/develop/v2-permissions-and-consent?WT.mc_id=Portal-Microsoft_AAD_RegisteredApps).

### Assign the required roles in the Exchange Admin Center

1. Sign in to the [Exchange Admin Center (EAC)](https://admin.exchange.microsoft.com/#/).
2. In the EAC, navigate to **Roles**.
3. Click **Admin Roles**.
4. Search for the role **Discovery Management** and click on it.
5. Click on the **Assign** tab.
6. Click **+** and search for the user you want to assign the role to.
7. Click **Save**.

## Configure Microsoft EWS in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';
import CloudSOARAPIURL from '../../../../reuse/automation-service/cloud-soar-api-url.md';
import AccessID from '../../../../reuse/automation-service/access-id.md';
import AccessKey from '../../../../reuse/automation-service/access-key.md';

<IntegrationsAuth/>

:::note
Use the information you set up [above](#microsoft-ews-configuration).
:::

* <IntegrationLabel/>
* **Host**. Enter your Microsoft EWS host address, for example, `outlook.office365.com`

* **Tenant ID**. Enter the  [tenant ID](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-find-tenant) for authentication.

* **Client ID**. Enter the client ID for authentication.

* **Client Secret**. Enter the client secret for authentication.

* **Microsoft Graph Scope**. Enter the scope.

* **Mailbox**. Enter the mailbox address.

* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <CloudSOARAPIURL/>
* <AccessID/>
* <AccessKey/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/microsoft-ews-graph-configuration.png')} style={{border:'1px solid gray'}} alt="Microsoft EWS configuration" width="400"/>

For information about Microsoft EWS, see [Microsoft Exchange Web Services documentation](https://learn.microsoft.com/en-us/exchange/client-developer/exchange-web-services/how-to-authenticate-an-ews-application-by-using-oauth).


## Category

Email Gateway

## Change Log

* September 10, 2025 - First upload