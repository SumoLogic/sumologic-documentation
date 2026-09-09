---
title: Microsoft Azure Security Center
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/microsoft-azure-security-center.png')} alt="Microsoft Azure Security Center" width="100"/>

***Version: 1.3  
Updated: April 30, 2026***

Work with Alerts, Policies, Tasks, and other resources with Microsoft Azure Security Center.

## Actions

* **Get Security Alert** (*Enrichment*) - Get information from a security alert.
* **List Security Alerts** (*Enrichment*) - Get a list of security alerts.
* **List Security Policies** (*Enrichment*) - Get a list of security policies.
* **Get Security Policy** (*Enrichment*) - Get information regarding a security policy.
* **List Security Statuses** (*Enrichment*) - Get a list of current security statuses.
* **Get Security Task** (*Enrichment*) - Get information regarding a security task.
* **List Security Tasks** (*Enrichment*) - Get a list of security tasks.
* **List Locations** (*Enrichment*) - List all locations.
* **List Resource Groups** (*Enrichment*) - List all resource group information.
* **Update Alert Status** (*Containment*) - Update the status of a security alert.
* **Update Security Policy** (*Containment*) - Update security policy information.
* **Update Task Status** (*Containment*) - Update the status of a security task.

## Microsoft Azure Security Center configuration

The following steps show how to create a Microsoft Azure Security Center Application to work with Sumo Logic automation.

1. Log in to the Azure portal with the user who has administrator privileges.
1. From **Azure Services** click **App registrations** > **New registration**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ms-az-service-center/azure-ad-1.png')} style={{border:'1px solid gray'}} alt="Microsoft Azure Security Center 1" width="600"/>
1. In the registration form, choose a name for your application and then click **Register**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ms-az-service-center/ms-azure-security-2.png')} style={{border:'1px solid gray'}} alt="Microsoft Azure Security Center register" width="600"/>
1. Write down the Application ID and Directory ID and secure them. You will need them later for the integration configuration.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ms-az-service-center/ms-azure-security-ad-3.png')} style={{border:'1px solid gray'}} alt="Microsoft Azure Security Center 3" width="600"/>
1. To configure Microsoft Azure Security Center Application permissions, on the left, choose **API permissions**. 
6. Click the **Add a permission** button.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ms-az-service-center/ms-azure-security-ad-4.png')} style={{border:'1px solid gray'}} alt="Microsoft Azure Security Center a permission" width="600"/>
7. Select your application in App registrations in the Azure portal.
   * Click on **APIs my organization uses** and search for **Windows Azure Service Management API**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ms-az-service-center/ms-azure-security-ad-5.png')} style={{border:'1px solid gray'}} alt="Microsoft Azure Security Center permissions" width="700"/>
   * Select **Windows Azure Service Management API**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ms-az-service-center/ms-azure-security-ad-6.png')} style={{border:'1px solid gray'}} alt="Microsoft Azure Security Center permissions" width="700"/>
   * **Delegated**. `user_impersonation`.
   * **Client Credentials**. All required permissions are managed through Azure RBAC role assignments on the subscription or resource group. [Learn more about RBAC scope](https://learn.microsoft.com/en-us/azure/role-based-access-control/scope-overview).
   <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ms-az-service-center/ms-azure-security-ad-7.png')} style={{border:'1px solid gray'}} alt="Microsoft Azure Security Center application permissions" width="600"/>
1. Add the Client secret for authentication, along with the Client ID and Directory ID. To add a client secret, go to Certificates and secrets, and click **New client secret**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ms-az-service-center/ms-azure-security-ad-8.png')} style={{border:'1px solid gray'}} alt="Microsoft Azure Security Center new client secret" width="600"/>
1. Select the description and expiry period for the created secret and create it. 
1. Once it's created, ensure to save its value, since it's only displayed once.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/ms-az-service-center/ms-azure-security-ad-9.png')} style={{border:'1px solid gray'}} alt="Microsoft Azure Security Center 9" width="600"/>
1. Once the Microsoft Azure Security Center application is configured, you will need the application’s Client ID, secret, and Tenant ID.

### Assign RBAC roles

After registering the application, assign the required Azure RBAC roles to grant it access to Security Center resources.

1. In the [Azure portal](https://portal.azure.com/), navigate to your **Subscription**.
1. Click **Access Control (IAM)**.
1. Click **Add** > **Add role assignment**.
1. Select the **Security Admin** role and click **Next**.
1. Under **Assign access to**, select **User, group, or service principal**.
1. Click **Select members**, search for your app registration, and select it.
1. Click **Review + assign**.
1. Repeat the steps above to assign the **Reader** role.

For more information, see [Assign Azure roles using the Azure portal](https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal).

Alternatively, if you prefer to follow the principle of least privilege, you can create a custom role with only the permissions required by this integration.

### Create a custom RBAC role (optional)

1. In the [Azure portal](https://portal.azure.com/), navigate to your **Subscription**.
1. Click **Access Control (IAM)**.
1. Click **Roles**, then click **Add** > **Add custom role**.
1. Enter a **Role name** and **Description**, and select **Start from scratch**.
1. Click **Next** to go to the **Permissions** tab, then click **Add permissions** and add the following:
   * `Microsoft.Security/alerts/read`
   * `Microsoft.Security/alerts/write`
   * `Microsoft.Security/policies/read`
   * `Microsoft.Security/policies/write`
   * `Microsoft.Security/tasks/read`
   * `Microsoft.Security/tasks/write`
   * `Microsoft.Security/*/read`
   * `Microsoft.Resources/subscriptions/read`
   * `Microsoft.Resources/subscriptions/locations/read`
   * `Microsoft.Resources/subscriptions/resourceGroups/read`
1. Under **Assignable scopes**, select your target subscription.
1. Click **Review + create**.
1. Once the custom role is created, assign it to your app registration by following the steps in [Assign RBAC roles](#assign-rbac-roles) above, selecting your custom role instead of **Security Admin**.

## Configure Microsoft Azure Security Center in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
* **Username**. Enter the username of a Microsoft Azure Security Center admin user authorized to authenticate the integration.
* **Password**. Enter the admin user password.
* **Directory (Tenant) ID**. Enter the [tenant ID](https://learn.microsoft.com/en-us/azure/healthcare-apis/register-application#application-id-client-id) of the AAD directory in which you created the application.
* **Application (Client) ID**. Enter the client ID from your [application ID](https://learn.microsoft.com/en-us/azure/healthcare-apis/register-application#application-id-client-id).
* **Application (Client) Secret**. Enter your application (client) secret.
* **Scope**. Enter the OAuth scope based on your authentication flow:
   * **Delegated** (user_impersonation): `https://management.azure.com/user_impersonation`
   * **Client Credentials** (app-only): `https://management.azure.com/.default`
* **Subscription ID**. Enter your [subscription ID](https://learn.microsoft.com/en-us/azure/azure-portal/get-subscription-tenant-id). The subscription ID is a GUID that uniquely identifies your subscription to use Azure services.
* <IntegrationTimeout/>
* <IntegrationEngine/>
* <IntegrationProxy/>
  <img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/microsoft-azure-security-center-configuration.png')} style={{border:'1px solid gray'}} alt="Microsoft Azure Security Center configuration" width="400"/>

For information about Microsoft Defender for Cloud ([formerly Azure Security Center](https://techcommunity.microsoft.com/blog/microsoftdefendercloudblog/a-new-name-for-multi-cloud-security-microsoft-defender-for-cloud/2943020)), see [Microsoft Defender for Cloud documentation](https://learn.microsoft.com/en-us/azure/defender-for-cloud/).

## Change Log

* March 22, 2019 - First upload
* March 11, 2022 - Logo
* June 21, 2023 (v1.1) - Updated the integration with Environmental Variables
* March 17, 2026 (v1.2) - Align integration with Microsoft-recommended authentication (app-only authentication)
* April 30, 2026 (v1.3) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
