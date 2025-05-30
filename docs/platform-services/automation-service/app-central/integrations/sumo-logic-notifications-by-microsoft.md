---
title: Sumo Logic Notifications By Microsoft
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/sumo-logic-notifications.png')} alt="sumo-logic-notifications" width="100"/>

***Version: 1.0  
Updated: Dec 04, 2024***

Integration with Sumo Logic platform for monitors and Microsoft (Outlook) notification.

## Actions

* **Assess Alert Status** (*Scheduled*) - Periodically monitor status of a Sumo Logic alert and notify a Outlook user about an unresolved alert.

## Sumo Logic Notifications By Microsoft configuration

### Register an application

Registering your application establishes a trust relationship between your app and the Microsoft identity platform. The trust is unidirectional: your app trusts the Microsoft identity platform, and not the other way around.

Follow these steps to create the app registration:

1. Sign in to the [Azure portal](https://portal.azure.com/).
2. If you have access to multiple tenants, use the Directory + subscription filter <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-ews/microsoft-ews-1.png')} style={{border:'1px solid gray'}} alt="/microsoft-ews" width="30"/> in the top menu to select the tenant in which you want to register an application.
3. Search for and select the **Azure Active Directory**.
4. Under **Manage**, select **App registrations > New registration**.
5. Enter a Name for your application. Users of your app might see this name, and you can change it later.
6. Select **Register** to complete the initial app registration.
7. Don't enter anything for **Redirect URI (optional)**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-ews/microsoft-ews-2.png')} style={{border:'1px solid gray'}} alt="/microsoft-ews" width="800"/>

When registration completes, the Azure portal displays the app registration's Overview pane, which includes its Application (client) ID. Also referred to as just client ID, this value uniquely identifies your application in the Microsoft identity platform.

The client ID as one aspect in validating the security tokens it receives from the identity platform.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-ews/microsoft-ews-3.png')} style={{border:'1px solid gray'}} alt="/microsoft-ews" width="800"/>

### Add credentials

Credentials are used by confidential client applications that access an API. Examples of confidential clients are web apps, or service- and daemon-type applications. Credentials allow your application to authenticate as itself, requiring no interaction from a user at runtime.   
You can add client secrets (a string) as credentials to your confidential client app registration.

<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-ews/microsoft-ews-4.png')} style={{border:'1px solid gray'}} alt="/microsoft-ews" width="800"/>

### Add a client secret

The client secret, known also as an application password, is a string value of your app.

1. Select your application in **App registrations** in the Azure portal.
2. Select **Certificates & secrets > New client secret**.
3. Add a description for your client secret.
4. Select a duration.
5. Click **Add**.
6. Record the secret's value for use in your client application code - it's never displayed again after you leave this page.

### Add permissions to API

1. Select your application in **App registrations** in the Azure portal.
2. Select **API permissions > Add a permission**.
3. Delegated permissions are selected by default. Delegated permissions are appropriate for client apps that access an API as the signed-in user, and whose access should be restricted to the permissions you select in the next step.
4. Application permissions are for service- or daemon-type applications that need to access API as themselves, without user interaction for sign-in or consent. Unless you've defined application roles for your API.
5. Select **Add a permission**, and add the following permissions (as shown in the screenshot). <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sumo-logic-notifications-by-microsoft/sumo-logic-notifications-by-microsoft-1.png')} style={{border:'1px solid gray'}} alt="/microsoft-ews" width="800"/>

#### EWS API to be configured for these permissions

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
* Mail.Send
    + Type: Delegated
    + Description: Send mail as a user
    + Admin: Yes
* Mail.Send
    + Type: Application
    + Description: Send mail as any user
    + Admin: Yes
* User.ReadBasic.All
    + Type: Delegated
    + Description: Read basic profiles of all users
    + Admin: Yes
* User.ReadBasic.All
    + Type: Application
    + Description: Read basic profiles of all users
    + Admin: Yes

## Create an access key in Sumo Logic

1. In the main Sumo Logic menu, select your username and then **Preferences**. 
2. From the preferences screen, in the section **My Access Keys**, click **Add Access Key**. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sumo-logic-notifications-by-gmail/sumo-logic-notifications-by-gmail-2.png')} style={{border:'1px solid gray'}} alt="sumo-logic-notifications" width="600"/>
3. Populate the name and click **Create Key**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sumo-logic-notifications-by-gmail/sumo-logic-notifications-by-gmail-3.png')} style={{border:'1px solid gray'}} alt="sumo-logic-notifications" width="400"/>
4. Copy the **Access ID** and **Access Key** and store them (temporally) into a text editor.
   :::note
   They won't be available again once you close this screen.
   :::
5. Click **Done** after you copied the Access ID and Access Key.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/sumo-logic-notifications/sumo-logic-notifications-4.png')} style={{border:'1px solid gray'}} alt="sumo-logic-notifications" width="400"/>

## Configure Sumo Logic Notifications by Microsoft in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

   * For the first **API URL** field, provide the Microsoft Graph API URL.
   * Specify the **Authentication Grant Type** and **Directory (Tenant) ID**.
   * For **Client ID** and **Client Secret**, provide the Microsoft Graph client ID and secret obtained as described in [Add a client secret](#add-a-client-secret).
   * Provide the **Sumo Logic API URL** (for example, `https://api.sumologic.com`). Enter the [API endpoint URL](/docs/api/getting-started/#sumo-logic-endpoints-by-deployment-and-firewall-security) for your region.
   * Enter the **Access ID** and **Access Key** from a Sumo Logic [access key](/docs/manage/security/access-keys/). Select **Default** as the scope when generating access keys.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/sumo-logic-notifications-by-microsoft-configuration.png')} style={{border:'1px solid gray'}} alt="Sumo Logic Notifications by Microsoft configuration" width="400"/>

## Change Log
* December 04, 2024 - First upload