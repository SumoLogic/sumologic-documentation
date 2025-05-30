---
title: Microsoft Teams
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/microsoft-teams.png')} alt="microsoft-teamsg" width="100"/>

***Version: 1.9  
Updated: Mar 4, 2024***

Microsoft Teams is the ultimate hub for teamwork and intelligent communications. Built on the strength and scale of Microsoft 365 with over 120 million users, Microsoft Teams is a chat-based workspace in Microsoft 365. Microsoft Graph makes it easy to create large numbers of teams and populate them with users and channels, by automating the creation and management of teams, and channels. also send a messages to chats or channels.

## Actions

* **Add Channel Members**  *(Notification)* - Add a conversation member to a Channel. This operation is allowed only for private Channels.
* **Add Team Members**  *(Notification)* - Add new multiple conversation Members to a Team.
* **Archive Team** *(Containment)* - Archive the specified team. When a team is archived, users can no longer send or like messages on any channel in the team, edit the team's name, description, or other settings, or in general make most changes to the team. Membership changes to the team continue to be allowed.
* **Archive Team On Incident Closure Trigger** *(Trigger)* - Archive Team automatically when the SOAR Incident is closed.
* **Create Channel** *(Notification)* - Create a new channel by including the display name and description in a team.
* **Create Team**  *(Notification)* - Create a Team from scratch.
* **Create Team On Incident Creation Trigger** *(Trigger)* - When a new incident is created, automatically a new Team will be created in Microsoft Teams and all investigators of the incident will be added to the Team.
* **Delete Channel** *(Containment)* - Delete the specified Channel.
* **List Channel Members** *(Enrichment)* - Retrieve a list of conversation members from a Channel.
* **List Channel Messages**  *(Enrichment)* - Retrieve the list of messages in a channel of a team. By using the delta query, you can get new or updated messages in a channel.
* **List Channels**  *(Enrichment)* - Retrieve the list of channels in this team.
* **List Team Members** *(Enrichment)* - List the conversation member collection of a Team.
* **List Teams** *(Enrichment)* - List all the Teams available in an organization.
* **List Users** *(Enrichment)* - Retrieve a list of users objects.
* **Remove Member From Channel** *(Containment)* - Delete a conversation member from a Channel. This operation is allowed only for private channels.
* **Search Channels Messages** *(Enrichment)* - Retrieve messages across all Channels in a Team.
* **Search Chats Messages** *(Enrichment)* - Retrieve all messages from all chats that a user is a participant in, including one-on-one chats, group chats, and meeting chats.
* **Send Chat Message** *(Notification)* - Create a new chat and Send a chat message to a one-on-one chat or group chat conversation.
* **Send Teams Message** *(Notification)* - Send a new chat Message in the specified Channel in a Team.
* **Microsoft Teams List Channel Messages Daemon** *(Daemon)* - A Daemon that retrieves the list of messages in a channel of a team.

## Microsoft Teams configuration

Each application you want the Microsoft identity platform to perform identity and access management (IAM) needs to be registered. Registering it establishes a trust relationship between your application and the identity provider, the Microsoft identity platform.

**Register an application**

[Registering your application](https://learn.microsoft.com/en-us/graph/auth-register-app-v2#register-an-application) establishes a trust relationship between your app and the Microsoft identity platform. The trust is unidirectional: your app trusts the Microsoft identity platform, and not the other way around.

Follow these steps to create the app registration:

1. Sign in to the [Azure portal](https://portal.azure.com/).
1. If you have access to multiple tenants, use the **Directory + subscription** filter <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-teams/microsoft-teams-1.png')} style={{border:'1px solid gray'}} alt="microsoft-teams" width="30"/> in the top menu to select the tenant in which you want to register an application.
1. Search for and select the **Azure Active Directory.**
1. Under Manage, select **App registrations** > **New registration**.
1. Enter a **Name** for your application. Users of your app might see this name, and you can change it later.
1. Select **Register** to complete the initial app registration. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-teams/microsoft-teams-2.png')} style={{border:'1px solid gray'}} alt="microsoft-teams" width="800"/>
1. Don't enter anything for **Redirect URI (optional)**.
1. When registration completes, the Azure portal displays the app registration's Overview pane, which includes its **Application (client) ID**. Also referred to as just *client ID*, this value uniquely identifies your application in the Microsoft identity platform.

The client ID as one aspect in validating the security tokens it receives from the identity platform.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-teams/microsoft-teams-3.png')} style={{border:'1px solid gray'}} alt="microsoft-teams" width="800"/>

**Add Credentials**

Credentials are used by confidential client applications that access an API. Examples of confidential clients are web apps, or service- and daemon-type applications. Credentials allow your application to authenticate as itself, requiring no interaction from a user at runtime.

You can add client secrets (a string) as credentials to your confidential client app registration.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/microsoft-teams/microsoft-teams-4.png')} style={{border:'1px solid gray'}} alt="microsoft-teams" width="800"/>

**Add a Client Secret**

The client secret, known also as an *application password*, is a string value of your app.

1. Select your application in **App registrations** in the Azure portal.
1. Select **Certificates & secrets** > **New client secret.**
1. Add a description for your client secret.
1. Select a duration.
1. Select **Add**.
1. **Record the secret's** value for use in your client application resource - it's *never displayed again* after you leave this page.

**Add Permissions to API**

1. Select your application in **App registrations** in the Azure portal.
1. Select **API permissions** > **Add a permission**
1. **Delegated permissions** are selected by default. Delegated permissions are appropriate for client apps that access an API as the signed-in user, and whose access should be restricted to the permissions you select in the next step.
1. **Application permissions** are for service- or daemon-type applications that need to access API as themselves, without user interaction for sign-in or consent. Unless you've defined application roles for your API.
1. Select **Add a permission,** and ***below are the permissions to be added to the application you just created.***

**Microsoft Teams Test connector:**

One of the following permissions is required to call this Action. To learn more, including how to choose permissions, see [Permissions](https://docs.microsoft.com/en-us/graph/permissions-reference).

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED)|
|:-- | :-- |
| Delegated (work or school account) | User.ReadBasic.All, User.Read.All, User.ReadWrite.All, Directory.Read.All, Directory.ReadWrite.All |
| Application | User.Read.All, User.ReadWrite.All, Directory.Read.All, Directory.ReadWrite.All |

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | GroupMember.Read.All, Group.Read.All, Directory.Read.All, Group.ReadWrite.All, Directory.ReadWrite.All |
| Application | GroupMember.Read.All, Group.Read.All, Directory.Read.All, Group.ReadWrite.All, Directory.ReadWrite.All |

**Add Channel Members Action:**

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | User.ReadBasic.All, User.Read.All, User.ReadWrite.All, Directory.Read.All, Directory.ReadWrite.All |
| Application | User.Read.All, User.ReadWrite.All, Directory.Read.All, Directory.ReadWrite.All |

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | ChannelMember.ReadWrite.All |
| Application | ChannelMember.ReadWrite.All |

**Add Team Members Action:**

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | User.ReadBasic.All, User.Read.All, User.ReadWrite.All, Directory.Read.All, Directory.ReadWrite.All |
| Application | User.Read.All, User.ReadWrite.All, Directory.Read.All, Directory.ReadWrite.All |

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | TeamMember.ReadWrite.All |
| Application | TeamMember.ReadWrite.All |

**Archive Team** *AND* **Archive Team On Incident Closure Trigger Actions:**

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | TeamSettings.ReadWrite.All |
| Application | TeamSettings.ReadWrite.Group\* |

**Note**: This API supports admin permissions. Global admins and Microsoft Teams service admins can access teams that they are not a member of.

**Create Channel** **Action:**

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | GroupMember.Read.All, Group.Read.All, Directory.Read.All, Group.ReadWrite.All, Directory.ReadWrite.All |
| Application | GroupMember.Read.All, Group.Read.All, Directory.Read.All, Group.ReadWrite.All, Directory.ReadWrite.All |

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | Channel.Create |
| Application | Channel.Create |

**Note**: This API supports admin permissions. Global admins and Microsoft Teams service admins can access teams that they are not a member of.

**Create Team Action:**

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | Team.Create |
| Application | Team.Create, Teamwork.Migrate.All |

**Create Team On Incident Creation Trigger Action:**

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | TeamMember.ReadWrite.All |
| Application | TeamMember.ReadWrite.All |

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | Team.Create |
| Application | Team.Create, Teamwork.Migrate.All |

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED)|
|:-- | :-- |
| Delegated (work or school account) | User.ReadBasic.All, User.Read.All, User.ReadWrite.All, Directory.Read.All, Directory.ReadWrite.All |
| Application | User.Read.All, User.ReadWrite.All, Directory.Read.All, Directory.ReadWrite.All |

**Delete Channel Action:**

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | Channel.Delete.All |
| Application  | Channel.Delete.Group\*, Channel.Delete.All, |

**List Channel Members Action:**

One of the following permissions is required to call this API.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | ChannelMember.Read.All, ChannelMember.ReadWrite.All |
| Application | ChannelMember.Read.All, ChannelMember.ReadWrite.All |

**List Channel Messages Action:**

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED)|
|:-- | :-- |
| Delegated (work or school account) | GroupMember.Read.All, Group.Read.All, Directory.Read.All, Group.ReadWrite.All, Directory.ReadWrite.All |
| Application | GroupMember.Read.All, Group.Read.All, Directory.Read.All, Group.ReadWrite.All, Directory.ReadWrite.All |

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | Channel.ReadBasic.All, ChannelSettings.Read.All, ChannelSettings.ReadWrite.All |
| Application | Channel.ReadBasic.All, ChannelSettings.Read.All, ChannelSettings.ReadWrite.All |

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | ChannelMessage.Read.All |
| Application | ChannelMessage.Read.All  |

**List Channels Action:**

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED)                                    |
|:-- | :-- |
| Delegated (work or school account) | Channel.ReadBasic.All, ChannelSettings.Read.All, ChannelSettings.ReadWrite.All |
| Application | Channel.ReadBasic.All, ChannelSettings.Read.All, ChannelSettings.ReadWrite.All |

:::note
This API supports admin permissions. Global admins and Microsoft Teams service admins can access teams that they are not a member of **List Team Members Action**.
:::

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | TeamMember.Read.All, TeamMember.ReadWrite.All|
| Application | TeamMember.Read.Group\*, TeamMember.Read.All, TeamMember.ReadWrite.All |

**List Teams Action:**

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | GroupMember.Read.All, Group.Read.All, Directory.Read.All, Group.ReadWrite.All, Directory.ReadWrite.All |
| Application | GroupMember.Read.All, Group.Read.All, Directory.Read.All, Group.ReadWrite.All, Directory.ReadWrite.All |

**List Users Action:**

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | User.ReadBasic.All, User.Read.All, User.ReadWrite.All, Directory.Read.All, Directory.ReadWrite.All |
| Application | User.Read.All, User.ReadWrite.All, Directory.Read.All, Directory.ReadWrite.All |

**Remove Member From Channel Action:**

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | ChannelMember.ReadWrite.All |
| Application | ChannelMember.ReadWrite.All |

**Search Channels Messages Action:**

The following permissions are required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | Not supported. |
| Application | ChannelMessage.Read.All |

Note: Before you call this Action with application permissions, you must request access. For details, see [**Protected APIs in Microsoft Teams**](https://docs.microsoft.com/en-us/graph/teams-protected-apis)

**Search Chats Messages Action:**

The following permissions are required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | Not supported. |
| Application | Chat.Read.All, Chat.ReadWrite.All |

Note: Before you call this Action with application permissions, you must request access. For details, see [**Protected APIs in Microsoft Teams**](https://docs.microsoft.com/en-us/graph/teams-protected-apis).

**Send Chat Message Action:**

One of the following permissions is required to call this API. To learn more, including how to choose permissions, see [Permissions](https://docs.microsoft.com/en-us/graph/permissions-reference).

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
| Delegated (work or school account) | ChatMessage.Send, Chat.ReadWrite |
| Application | Not supported.  |

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | User.ReadBasic.All, User.Read.All, User.ReadWrite.All, Directory.Read.All, Directory.ReadWrite.All |
| Application | User.Read.All, User.ReadWrite.All, Directory.Read.All, Directory.ReadWrite.All |

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | Chat.Create, Chat.ReadWrite |
| Application | Chat.Create |

For the action to work correctly and to avoid permission errors, ensure that one of the following criteria is met:

* The Channel moderation must be Off
* The account must be added as a moderator
* The account must be added as a team owner

For more information please visit: [Change moderator roles and settings in a channel](https://support.microsoft.com/en-us/office/change-moderator-roles-and-settings-in-a-channel-6ac54758-3440-4f6a-9bd5-cebf97cb7ea6)

**Send Teams Message Action:**

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | ChannelMessage.Send |
| Application | Teamwork.Migrate.All |

Note: Application permissions are *only* supported for [migration](https://docs.microsoft.com/en-us/microsoftteams/platform/graph-api/import-messages/import-external-messages-to-teams). In the future, Microsoft may require you or your customers to pay additional fees based on the amount of data imported.

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED)|
|:-- | :-- |
| Delegated (work or school account) | GroupMember.Read.All, Group.Read.All, Directory.Read.All, Group.ReadWrite.All, Directory.ReadWrite.All |
| Application | GroupMember.Read.All, Group.Read.All, Directory.Read.All, Group.ReadWrite.All, Directory.ReadWrite.All |

One of the following permissions is required to call this Action.

| PERMISSION TYPE | PERMISSIONS (FROM LEAST TO MOST PRIVILEGED) |
|:-- | :-- |
| Delegated (work or school account) | Channel.ReadBasic.All, ChannelSettings.Read.All, ChannelSettings.ReadWrite.All |
| Application | Channel.ReadBasic.All, ChannelSettings.Read.All, ChannelSettings.ReadWrite.All |

For the action to work correctly and to avoid permission errors, ensure that one of the following criteria is met:

* The Channel moderation must be Off
* The account must be added as a moderator
* The account must be added as a team owner

For more information please visit: [Change moderator roles and settings in a channel](https://support.microsoft.com/en-us/office/change-moderator-roles-and-settings-in-a-channel-6ac54758-3440-4f6a-9bd5-cebf97cb7ea6)

Microsoft Graph API need to be configure as listed the above permissions

Applications are authorized to call APIs when they are granted permissions by **users/admins** as part of the consent process. The list of configured permissions should include all the permissions the application needs.

Once API permission are added then **Admin** must consent to a grant these permissions, [Learn more about permissions and consent](https://docs.microsoft.com/azure/active-directory/develop/v2-permissions-and-consent?WT.mc_id=Portal-Microsoft_AAD_RegisteredApps)

For detailed API documentation visit [**https://docs.microsoft.com/en-us/graph/api/resources/teams-api-overview?view=graph-rest-1.0**](https://docs.microsoft.com/en-us/graph/api/resources/teams-api-overview?view=graph-rest-1.0)

## Configure Microsoft Teams in Automation Service and Cloud SOAR

import IntegrationsAuth from '../../../../reuse/integrations-authentication.md';

<IntegrationsAuth/>

    * **Label**. The resource name.
    * **API URL**. The default Microsoft Graph API URL is 'https://graph.microsoft.com/v1.0'.
    * **Tenant ID**. Directory (Tenant) ID (You can check from you app registration page).
    * **Authentication Grant Type**. You can choose any value from the following according to the permissions you add to your App:
        * Password (Delegated Context)
        * Client Credentials (Application Context)
    * **Client ID**. Application (Client) ID, Required for both Authentication Grant Type (You can check from you app registration page).
    * **Client Secret**. Application (Client) Secret, Required for both Authentication Grant Type (Client Secret that you copied earlier).
    * **Username**. Required only for Authentication Grant Type Password (Delegated Context) leave this field empty if you set **Authentication Grant Type** as Client Credentials (Application Context).
    * **Password**. Required only for Authentication Grant Type Password (Delegated Context) leave this field empty if you set **Authentication Grant Type** as Client Credentials (Application Context).
    * **Cloud SOAR URL**. Provide the SOAR URL in format 'https://your-cloud-soar-host/incmansuite\_ng' (this field is only required and use in Triggers).
    * **Cloud SOAR JWT Token**. Provide your SOAR JWT which you can copy from your profile section (this field is only required and use in Triggers).
    * **Team Incident Internal Field Name**. To save Team ID in Incident Field, Required only for Triggers, For Example: opt\_1.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/misc/microsoft-teams-configuration.png')} style={{border:'1px solid gray'}} alt="Microsoft Teams configuration" width="400"/>

For information about Microsoft Teams, see [Microsoft Teams documentation](https://learn.microsoft.com/en-us/microsoftteams/).

## Change Log

* July 12, 2022 (v1.0) - First upload
* January 10, 2023 (v1.1) - Refactoring
* May 10, 2023 (v1.2) - Daemon added
* May 19, 2023 (v1.3)
    + Updated Daemon - **Microsoft Teams List Channel Messages Daemon** (Removed HTML Tags from Messages)
    + Documentation Updated
    + Modified the action type from **Containment** to **Notification** for the following actions:
        - Add Channel Members
        - Add Team Members
        - Create Channel
        - Create Team
* June 26, 2023 (v1.4) - Removed unnecessary empty lines and other little changes
* June 28, 2023 (v1.6) - Visibility of the Resource fields changed
* July 5, 2023 (v1.8)
    + Updated Actions - List Users & Create Channel
* March 4, 2024 (v1.9) - Updated code for compatibility with Python 3.12
