---
title: Microsoft SharePoint (Graph)
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/microsoft-sharepoint.png')} alt="microsoft-sharepoint" width="100"/>

***Version: 1.1  
Updated: February 24, 2026***

Utilize Microsoft SharePoint lists, files, and folders during incident investigations.

## Actions

* **Get List** (*Enrichment*) - Gather a specified list from SharePoint.
* **Get Lists** (*Enrichment*) - Gather all lists from SharePoint.
* **Get Files** (*Enrichment*) - Gather all files from SharePoint.
* **Get Folders** (*Enrichment*) - Gather all folders from SharePoint.
* **Get File** (*Enrichment*) - Gather a specific file from SharePoint.
* **Get List Fields** (*Enrichment*) - Gather all list fields from SharePoint.
* **Create List** (*Notification*) - Create a new list.
* **Add File** (*Notification*) - Add a new file to SharePoint.
* **Add List Item** (*Notification*) - Add a new list item.

### Register an application

Registering your application establishes a trust relationship between your app and the Microsoft identity platform. The trust is unidirectional. Your app trusts the Microsoft identity platform, and not the other way around.

Follow these steps to create the app registration:

1. Sign in to the [Azure portal](https://portal.azure.com/).
2. If you have access to multiple tenants, use the Directory + subscription filter <br/>Click <img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-ews/microsoft-ews-1.png')} style={{border:'1px solid gray'}} alt="/microsoft-ews" width="30"/> in the top menu to select the tenant in which you want to register an application.
3. Search for and select the **Azure Active Directory**.
4. Under **Manage**, select **App registrations > New registration**.
5. Enter a **Name** for your application. Users of your app might see this name, and you can change it later.
6. Select **Register** to complete the initial app registration.
7. Don't enter anything for **Redirect URI (optional)**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-ews/microsoft-ews-2.png')} style={{border:'1px solid gray'}} alt="/microsoft-ews" width="800"/>

When registration completes, the Azure portal displays the app registration's **Overview** pane, which includes its Application (client) ID. Also referred to as just client ID, this value uniquely identifies your application in the Microsoft identity platform.

The client ID is one aspect in validating the security tokens it receives from the identity platform.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-ews/microsoft-ews-3.png')} style={{border:'1px solid gray'}} alt="/microsoft-ews" width="800"/>

### Add credentials

Credentials are used by confidential client applications that access an API. Examples of confidential clients are web apps, or service- and daemon-type applications. Credentials allow your application to authenticate as itself, requiring no interaction from a user at runtime.   

You can add client secrets (a string) as credentials to your confidential client app registration.

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-ews/microsoft-ews-4.png')} style={{border:'1px solid gray'}} alt="/microsoft-ews" width="800"/>

### Add a client secret

The client secret, known also as an application password, is a string value of your app.

1. Select your application in App registrations in the Azure portal.
2. Select **Certificates & secrets > New client secret**.
3. Add a description for your client secret.
4. Select a duration.
5. Select **Add**.
6. Record the secret's value for use in your client application code. It's never displayed again after you leave this page.

### Add permissions to API

1. Select your application in **App registrations** in the Azure portal.
2. Select **API permissions > Add a permission**.
3. Application permissions are for service- or daemon-type applications that need to access API as themselves, without user interaction for sign-in or consent, unless you've defined application roles for your API.
4. Select **Add a permission**, and add the following permissions: <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-sharepoint/microsoft-sharepoint-graph.png')} style={{border:'1px solid gray'}} alt="/microsoft-ews" width="800"/>

#### Microsoft Sharepoint (Graph) API to be configured for these permissions

Applications are authorized to call APIs when they are granted permissions by users or administrators as part of the consent process. The list of configured permissions should include all the permissions the application needs.

**API / Permissions**

Microsoft Graph (7)

* Sites.FullControl.All
    + Type: Application
    + Description: Have full control of all site collections
    + Admin: -
* Sites.Manage.All
    + Type: Application
    + Description: Create, edit, and delete items and lists in all site collections
    + Admin: Yes
* Sites.ReadWrite.All
    + Type: Application
    + Description: Read and write items in all site collections
    + Admin: Yes

## Configure Microsoft SharePoint in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Microsoft Graph URL**. Enter Microsoft Graph URL, `https://graph.microsoft.com/v1.0`

* **Tenant ID**. Enter the  [tenant ID](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-find-tenant) for authentication.

* **Client ID**. Enter the client ID for authentication.

* **Client Secret**. Enter the client secret for authentication.

* **Microsoft SharePoint Site Name.**. Enter the Microsoft Sharepoint Site Name.

* **Microsoft SharePoint HostName**. Enter the Microsoft Sharepoint HostName.

* **Microsoft Graph Scope**. Enter the scope.
* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/microsoft-sharepoint-configuration-graph.png')} style={{border:'1px solid gray'}} alt="Microsoft SharePoint configuration" width="400"/>

For information about Microsoft SharePoint, see [SharePoint documentation](https://learn.microsoft.com/en-us/sharepoint/dev/sp-add-ins/sharepoint-admin-apis-authentication-and-authorization).

## Change Log

* October 10, 2025 - First upload
* February 24, 2026 - Improved the Folder Relative URL hint to provide clearer guidance on entering the correct relative path format.