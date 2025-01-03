---
title: Azure AD
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/azure-ad.png')} alt="axonius" width="80"/>

***Version: 1.10  
Updated: Fri 03, 2024***

Azure Active Directory (Azure AD) is Microsoft's cloud-based identity and access management service, which helps your employees sign in and access resources.

## Actions

* **Add Member To Group** *(Enrichment)* - Add a user to a specific group.
* **Create Group** *(Enrichment)* - Create a group.
* **Create User** *(Enrichment)* - Create a new user.
* **Delete Group** *(Containment)* -Delete a specific group.
* **Delete User** *(Containment)* - Delete a specific user.
* **Disable User** *(Containment)* - Block user account.
* **Get Manager** (*Enrichment*) - Get user manager.
* **Get Member Groups** *(Enrichment)* - Retrieve a Group memberships for the user.
* **Get User** (Enrichment) - Get details for a specific user.
* **List Devices** *(Enrichment)* - Retrieve a list of device objects registered in the organization.
* **List Groups** (*Enrichment*) - List all the groups available in an organization.
* **List Of Group Members** *(Enrichment)* - Retrieve a list of members in a specific group.
* **List Users** *(Enrichment)* - List all users.
* **Remove Member From Group** *(Containment)* - Remove a user from a specific group.
* **Reset User Password** *(Containment)* - Reset user password.
* **Revoke Sign In Sessions** (*Containment*) - Invalidates all the refresh tokens issued to applications for a user (as well as session cookies in a user's browser).

## Azure Active Directory configuration

The following steps show how to create an Azure AD Application in order to work with Cloud SOAR.

1. Log in to Azure portal with the user that has administrator privileges.
1. Navigate to **Azure Active Directory** > **App registrations** > **New registration**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/azure-ad/azure-ad-1.png')} style={{border:'1px solid gray'}} alt="azure-ad-1" width="600"/>
1. In the registration form, choose a name for your application and then click **Register**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/azure-ad/azure-ad-2.png')} style={{border:'1px solid gray'}} alt="azure-ad-2" width="600"/>
1. Write down the Application ID and Directory ID. You will need them later for the integration configuration.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/azure-ad/azure-ad-3.png')} style={{border:'1px solid gray'}} alt="azure-ad-3" width="600"/>
1. To configure Azure AD Application permissions, on the left choose **API permissions**. 
6. Click the **Add a permission** button.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/azure-ad/azure-ad-4.png')} style={{border:'1px solid gray'}} alt="azure-ad-4" width="600"/>
7. Select your application in App registrations in the Azure portal. 
   * Delegated permissions are selected by default. 
   * Delegated permissions are appropriate for client apps that access an API as the signed-in user, and whose access should be restricted to the permissions you select in the next step. 
   * Application permissions are for service or daemon-type applications that need to access API as themselves, without user interaction for sign-in or consent.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/azure-ad/azure-ad-5.png')} style={{border:'1px solid gray'}} alt="azure-ad-5" width="700"/>
1. Select the following permissions to add:
   * **Delegated (work or school account)**. User.Read, User.ReadWrite, User.ReadBasic.All, User.Read.All, User.ReadWrite.All, Directory.Read.All, Directory.ReadWrite.All, Directory.AccessAsUser.All.
   * **Delegated (personal Microsoft account)**. User.Read, User.ReadWrite.
   * **Application**. User.Read.All, User.ReadWrite.All, Directory.Read.All, Directory.ReadWrite.All. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/azure-ad/azure-ad-6.png')} style={{border:'1px solid gray'}} alt="azure-ad-6" width="600"/>
1. Once API permission are added then Admin must consent to a grant these permissions ([Learn more about permissions and consent](https://docs.microsoft.com/azure/active-directory/develop/v2-permissions-and-consent?WT.mc_id=Portal-Microsoft_AAD_RegisteredApps).) <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/azure-ad/azure-ad-7.png')} style={{border:'1px solid gray'}} alt="azure-ad-7" width="600"/>
1. Once Admin Consent is granted, API permissions configuration have been completed. Then we have to add a Client secret that will be used for the authentication, along with Client ID and Directory ID. To add Client secret, go to Certificates and secrets, and click **New client secret**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/azure-ad/azure-ad-8.png')} style={{border:'1px solid gray'}} alt="azure-ad-8" width="600"/>
1. Select description and expiry period for the created secret and create it. 
1. Once it's created, make sure you save its value, since its only displayed once.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/azure-ad/azure-ad-9.png')} style={{border:'1px solid gray'}} alt="azure-ad-9" width="600"/>
1. Once you do these steps you will need to find the Tenant ID in order to use it on your resources file.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/azure-ad/azure-ad-10.png')} style={{border:'1px solid gray'}} alt="azure-ad-10" width="600"/>
1. Configuration of Azure AD application is completed, you will need application’s Client ID, secret, Tenant ID. 
1. Assign the app the role of User Administrator. This is required to perform action "Reset User Password".
    * **Azure Active Directory** > **Roles and administrators** > **User Administrator** > **Add assignments** > **Your app** > **Add**.


## Change Log

* October 7, 2021 - First upload
* March 11, 2022 - Logo
* November 10, 2022 (v1.2) - New Action: Get Manager
* April 28, 2023 (v1.3)
	+ Updated integration: (Updated the integration Fields with Environmental Variables and improved error handling)
	+ Remove action (**Filter Users**) as we already have a similar **List Users** Action
	+ Changed a few actions type from Containment to Enrichment
	+ Added New Action **List Groups**
* June 26, 2023 (v1.4) - Changed multiline hints to single line
* August 25, 2023 (v1.5)
	+ Added New Action **Revoke Sign In Sessions**
* August 31, 2023 (v1.6) - Added new actions: List Devices, Disable User
* September 19, 2023 (v1.7) - Versioning
* January 16, 2024 (v1.8)
	+ Added New Action: Get Member Groups
* November 12, 2024 (v1.9)
    + Added New Action: Reset User Password
+ January 3, 2025 (v1.10)
    + Added New Action:
      + List Of Group Members
      + Remove Member From Group