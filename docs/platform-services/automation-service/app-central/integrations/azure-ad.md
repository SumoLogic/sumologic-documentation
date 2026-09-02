---
title: Azure AD
description: ''
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/azure-ad.png')} alt="axonius" width="80"/>

***Version: 1.16  
Updated: Aug 21, 2026***

Azure Active Directory (Azure AD) is Microsoft's cloud-based identity and access management service, which helps your employees sign in and access resources.

## Authentication modes

The integration supports two authentication types, configured via the **Authentication Type** field in the integration resource:

| Mode | When to use                                                                                                                                                                                                      |
|:------|:----------|
| **Application (Client Credentials)** | Uses `client_id` + `client_secret`. Works for all standard actions except **Reset User Password With Writeback**.                                                                                               |
| **Delegated (Device Code Flow)** | Actions that require a signed-in user's context, such as **Reset User Password With Writeback**, which requires the Privileged Auth Admin role. Tokens are scoped to the user who completes the browser sign-in. |

Use **Application** for most automation. Use **Delegated** only when Microsoft requires user context for the target operation.

## Actions

* **Add Member To Group** *(Enrichment)* - Add a user to a specific group.
* **Confirm User Compromised** *(Containment)* - Confirm a user as compromised in Azure AD Identity Protection.
* **Create Group** *(Enrichment)* - Create a group.
* **Create User** *(Enrichment)* - Create a new user.
* **Delete Group** *(Containment)* - Delete a specific group.
* **Delete User** *(Containment)* - Delete a specific user.
* **Disable User** *(Containment)* - Block user account.
* **Dismiss Risky User** *(Containment)* - Dismiss the risk for a specific risky user.
* **Enable User** *(Containment)* - Enable a specific user account.
* **Exchange Device Code** *(Custom)* - Polls Microsoft until the user completes browser sign-in and returns tokens. (Delegated auth only.)
* **Get Manager** *(Enrichment)* - Get user manager.
* **Get Member Groups** *(Enrichment)* - Retrieve group memberships for the user.
* **Get Risky User** *(Enrichment)* - Retrieve risk details for a specific user.
* **Get User** *(Enrichment)* - Get details for a specific user.
* **Initiate Delegated Auth** *(Enrichment)* - Starts the Device Code Flow by calling Microsoft's `/oauth2/v2.0/devicecode` endpoint. Returns `user_code`, `verification_uri`, `device_code`, `interval`, `expires_in`, and `message`. (Delegated auth only.)
* **List Devices** *(Enrichment)* - Retrieve a list of device objects registered in the organization.
* **List Groups** *(Enrichment)* - List all the groups available in an organization.
* **List Of Group Members** *(Enrichment)* - Retrieve a list of members in a specific group.
* **List Risky Users** *(Enrichment)* - Retrieve a list of risky users detected by Azure AD Identity Protection.
* **List Users** *(Enrichment)* - List all users.
* **Refresh Access Token** *(Enrichment)* - Exchanges a stored refresh token for a fresh access token without user interaction. (Delegated auth only).
* **Remove Member From Group** *(Containment)* - Remove a user from a specific group.
* **Reset User MFA** *(Containment)* - Reset the MFA authentication methods for a user, with an option to require re-enrollment at next sign-in.
* **Reset User Password** *(Containment)* - Reset user password.
* **Reset User Password With Writeback** *(Containment)* - Resets a user's password with writeback to on-premises AD. (Delegated auth only) — Microsoft does not support application permissions for this endpoint.
* **Revoke Sign In Sessions** *(Containment)* - Invalidates all the refresh tokens issued to applications for a user (as well as session cookies in a user's browser).

## Azure Active Directory configuration

The following steps show how to create an Azure AD Application in order to work with Sumo Logic automation.

1. Log in to the Azure portal with the user who has administrator privileges.
1. Navigate to **Azure Active Directory** > **App registrations** > **New registration**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/azure-ad/azure-ad-1.png')} style={{border:'1px solid gray'}} alt="Azure ad 1" width="600"/>
1. In the registration form, choose a name for your application and then click **Register**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/azure-ad/azure-ad-2.png')} style={{border:'1px solid gray'}} alt="Azure AD register" width="600"/>
1. Write down the Application ID and Directory ID. You will need them later for the integration configuration.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/azure-ad/azure-ad-3.png')} style={{border:'1px solid gray'}} alt="Azure ad 3" width="600"/>
1. To configure Azure AD Application permissions, on the left, choose **API permissions**. 
1. Click the **Add a permission** button.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/azure-ad/azure-ad-4.png')} style={{border:'1px solid gray'}} alt="Azure AD add a permission" width="600"/>
1. Select your application in App registrations in the Azure portal. Application permissions are for service or daemon-type applications that need to access the API as themselves, without user interaction for sign-in or consent.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/azure-ad/azure-ad-5.png')} style={{border:'1px solid gray'}} alt="Azure AD permissions" width="700"/>
1. Select the following **Application** permissions to add: `Device.ReadWrite.All`, `Directory.Read.All`, `Directory.ReadWrite.All`, `Group.ReadWrite.All`, `GroupMember.ReadWrite.All`, `IdentityRiskyUser.ReadWrite.All`, `User-PasswordProfile.ReadWrite.All`, `User.EnableDisableAccount.All`, `User.Read.All`, `User.ReadWrite.All`, `User.RevokeSessions.All`, `UserAuthenticationMethod.ReadWrite.All`.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/azure-ad/azure-ad-6.png')} style={{border:'1px solid gray'}} alt="Azure AD application permissions" width="600"/>
1. Once API permissions are added, then Admin must consent to grant these permissions ([Learn more about permissions and consent](https://docs.microsoft.com/azure/active-directory/develop/v2-permissions-and-consent?WT.mc_id=Portal-Microsoft_AAD_RegisteredApps).) <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/azure-ad/azure-ad-7.png')} style={{border:'1px solid gray'}} alt="Azure AD admin consent" width="600"/>
1. Once Admin Consent is granted, API permissions configuration has been completed. Then we have to add a Client secret for authentication, along with the Client ID and Directory ID. To add a client secret, go to Certificates and secrets, and click **New client secret**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/azure-ad/azure-ad-8.png')} style={{border:'1px solid gray'}} alt="Azure AD new client secret" width="600"/>
1. Select the description and expiry period for the created secret and create it. 
1. Once it's created, make sure you save its value, since it's only displayed once.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/azure-ad/azure-ad-9.png')} style={{border:'1px solid gray'}} alt="Azure ad 9" width="600"/>
1. Once you do these steps, you will need to find the Tenant ID in order to use it on your resources file.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/azure-ad/azure-ad-10.png')} style={{border:'1px solid gray'}} alt="Azure AD tenant ID" width="600"/>
1. Once the Azure AD application is configured, you will need the application's Client ID, secret, and Tenant ID.
1. Assign the app the role of User Administrator. This is required to perform the **Reset User Password** action.
    * **Azure Active Directory** > **Roles and administrators** > **User Administrator** > **Add assignments** > **Your app** > **Add**.

## Delegated auth setup (one-time)

Complete this setup once to enable delegated actions such as **Reset User Password With Writeback**. After setup, playbooks run automatically using the stored refresh token — no repeat browser sign-in needed.

**Prerequisite**: The signed-in user must hold the **Privileged Auth Admin** role in Azure AD.

1. In the integration resource, set **Authentication Type** to **Delegated**.
1. Run **Initiate Delegated Auth**. Note the `user_code` and `verification_uri` from the output.
1. Open the `verification_uri` in a browser, enter the `user_code`, and complete sign-in as the privileged user.
1. Run **Exchange Device Code** with `device_code` mapped from step 2. The action polls until sign-in completes (default timeout: 90s).
1. Copy the `refresh_token` from the **Exchange Device Code** output.
1. Paste the `refresh_token` into the **Delegated Refresh Token** field in the integration resource and save.

The integration is now ready for automated use. Re-authentication is only needed if the token is unused for 90 days or an admin explicitly revokes it.

**Token reference:**

| Token | Lifetime | Notes |
|-------|----------|-------|
| `access_token` | 60–90 minutes | Refresh at the start of each playbook run |
| `refresh_token` | 90-day sliding window | Resets on each use; survives multiple access token exchanges |

## Configure Azure AD in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';
import IntegrationCertificate from '../../../../reuse/automation-service/integration-certificate.md';
import IntegrationEngine from '../../../../reuse/automation-service/integration-engine.md';
import IntegrationLabel from '../../../../reuse/automation-service/integration-label.md';
import IntegrationProxy from '../../../../reuse/automation-service/integration-proxy.md';
import IntegrationTimeout from '../../../../reuse/automation-service/integration-timeout.md';

<IntegrationsAuth/>
* <IntegrationLabel/>
 * **API URL**. Enter the Azure AD API URL, for example, `https://graph.microsoft.com`

* **Directory (Tenant) ID**. Enter the [tenant ID](https://learn.microsoft.com/en-us/entra/fundamentals/how-to-find-tenant) located when you configured Azure AD [above](#azure-active-directory-configuration).  

* **Application (Client) ID**. Enter the client ID from your Azure Application. 

* **Application (Client) Secret**. Enter your client secret. 

* **Authentication Type**. Select `Application` (default) for client credential auth, or `Delegated` to enable Device Code Flow actions.

* **Delegated Refresh Token**. Paste the refresh token obtained during the [delegated auth setup](#delegated-auth-setup-one-time). Used by **Refresh Access Token** when no token is mapped directly in the playbook.

* <IntegrationTimeout/>
* <IntegrationCertificate/>
* <IntegrationEngine/>
* <IntegrationProxy/>

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/azure-ad/azure-ad-configuration.png')} style={{border:'1px solid gray'}} alt="Azure AD configuration" width="400"/>

For information about Microsoft Entra ID (formerly Azure AD), see [Entra ID documentation](https://learn.microsoft.com/en-us/entra/identity/).

## Playbook usage with delegated auth

All 26 actions support both authentication types. For delegated playbooks, add **Refresh Access Token** as the first action and map its `access_token` output to the **Delegated Access Token** input of every subsequent action that requires it. This ensures a fresh token at the start of every run regardless of when the playbook executes.

```
[Start]
  └─ Refresh Access Token
       └─ access_token ──► Reset User Password With Writeback (Delegated Access Token)
       └─ access_token ──► [other delegated actions]
```

## Change Log

* October 7, 2021 - First upload
* March 11, 2022 - Logo
* November 10, 2022 (v1.2) - New Action: Get Manager
* April 28, 2023 (v1.3)
	+ Updated integration: (Updated the integration Fields with Environmental Variables and improved error handling)
	+ Remove action (**Filter Users**) as we already have a similar **List Users** Action
	+ Changed a few action types from Containment to Enrichment
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
* April 27, 2026 (v1.11) - Upgraded the `python3_generic` Docker image (Python 3.8) to `python3_12_generic` (Python 3.12) to address Python 3.8 end-of-life and improve security and performance.
* May 7, 2026 (v1.12) - Added New Action: Reset User MFA
* May 7, 2026 (v1.14) - Fixed an issue in the Reset User Password and Remove Member From Group actions that caused errors when processing the response.
* July 31, 2026 (v1.15)
    + Added New Actions:
      + Confirm User Compromised
      + Dismiss Risky User
      + Enable User
      + Get Risky User
      + List Risky Users
    + Improved integration reliability, enhanced error handling, better edge case support, and more user-friendly error messages.
* August 21, 2026 (v1.16)
    + Added Delegated (Device Code Flow) authentication support alongside existing Application (Client Credentials) auth.
    + Added New Actions (Delegated auth only):
      + Initiate Delegated Auth
      + Exchange Device Code
      + Refresh Access Token
      + Reset User Password With Writeback
    + Added new integration resource fields: Authentication Type, Delegated Refresh Token.
