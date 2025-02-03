---
title: Slack
description: ''
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('/img/platform-services/automation-service/app-central/logos/slack.png')} alt="slack" width="80"/>

***Version: 1.12  
Updated: Jan 27, 2025***

Create a public or private channel, Send messages or Files to channels or Users directly. This Slack integration keeps teams connected. Organize conversations, and quickly find what you need to get work done.

## Actions

* **Archive Channel** *(Containment)* - Archives a conversation.
* **Ask For User Email** (Notification) - Retrieve an Email Address or User tagged in the Slack chat.
* **Ask Question** (Notification) - Send a message/question to any user to user, or user to channel, for both bot and user with multiple options.
* **Create Channel** *(Notification)* - Initiates a public or private channel-based conversation.
* **Deactivate Account** *(Containment)* - Remove a user from a workspace.
* **Delete Message** *(Containment)* - Deletes a message.
* **Get Channel** *(Notification)* - Retrieve information about a conversation.
* **Get Members** *(Notification)* - Retrieve members of a conversation.
* **Get User** *(Notification)* - Gets information about a user.
* **Invite To Channel** *(Notification)* - Invites users to a channel.
* **List Channels** *(Notification)* - Lists all channels in a Slack team.
* **List Conversations History** *(Notification)* - Fetches a conversation's history of messages and events.
* **List Users** *(Notification)* - Lists all users in a Slack team.
* **Remove User From Channel** *(Containment)* - Removes a user from a conversation.
* **Rename Channel** *(Notification)* - Renames a conversation.
* **Search into Conversations** *(Notification)* - Searches for messages and files matching a query.
* **Send File** *(Notification)* - Sends a file to a channel or direct user.
* **Send Message** *(Notification)* - Sends a message to a channel or direct message.

## Slack configuration

1. [Create](https://api.slack.com/apps) a Slack App on your workspace.
1. Click on **Create an App** button.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/slack/slack-1.png')} style={{border:'1px solid gray'}} alt="slack" width="800"/>
1. Choose **From scratch**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/slack/slack-2.png')} style={{border:'1px solid gray'}} alt="slack" width="400"/>
1. Insert a name for the app and select the workspace.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/slack/slack-3.png')} style={{border:'1px solid gray'}} alt="slack" width="400"/>
1. Once you create your App, you have to add **Permissions**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/slack/slack-4.png')} style={{border:'1px solid gray'}} alt="slack" width="800"/>
1. Alternatively, you can see **OAuth & Permissions** from this page.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/slack/slack-5.png')} style={{border:'1px solid gray'}} alt="slack" width="800"/>
1. Now you have to add the Scopes for User Token and Bot Token. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/slack/slack-6.png')} style={{border:'1px solid gray'}} alt="slack" width="800"/>
    * Tokens
        * Bot tokens let your app act independently.
        * User tokens allow you to work directly on behalf of users, based on the OAuth scopes that installing users awards to your app.
    * Actions <br/>All the Actions required scopes depend on the type of channel-like object you're working with. To use the Actions, you'll need at least one of the `channels:`, `groups:`, `im:` or `mpim:` scopes corresponding to the conversation type you're working with.
        * Send Message Action <br/>BOT users cannot post to a direct message conversation between two users using Send Message Action. If your app was involved in the conversation, then it would be a multi-person direct message instead. Apps can post to direct message conversations between users when a shortcut or slash command belonging to that app is used in the conversation.
        * Get User Action <br/>This Action returns information about a member of a workspace. If you want to search for users, it's possible to manage it with an Exact match or without an Exact match. Also, this action will return on the field name users\_ids in JSON, which you can use in Playbook, if you want to invite many users to the channel.
        * Delete Action <br/>When used with a typical user token, may only delete messages posted by that user. When used with a bot user's token, may delete only messages posted by that bot user.
        * Invite To Channel Action <br/>This action invites 1–1000 users to a public or private channel. The calling user must be a member of the channel. And also the invites must not be the owner of the channel.
        * Create Channel Action <br/>At least one user needs to be invited when creating a public or private conversation. Otherwise, workspace apps could create invisible channels, which might cause a few problems.
        * Deactivate Account Action <br/>This Admin API removes a user from a workspace. This app cannot be installed on a workspace. Apps with this feature are only available to Enterprise customers.
        * Archive Channel Action <br/>This Action archives a conversation. Not all types of conversations can be archived.   
          :::note
          Limits for workspace apps <br/>Because workspace apps cannot act on behalf of users, they do not have the power to archive conversations, except when they're the owner/creator of the conversation.
          :::
1. Now for each action of Slack Integration, you need different scopes to be added to the BOT or User.
    * **Actions: List Channels / Get Channel / Get Members**<br/>Bot Token and User Token need the same scopes:
        * `channels:read`. View basic information about public channels in a workspace.
        * `groups:read`. View basic information about private channels that your Slack app has been added to.
        * `im:read`. View basic information about direct messages that your Slack app has been added to.
        * `mpim:read`. View basic information about group direct messages that your Slack app has been added to.
    * **Actions: Create channel / Invite To Channel / Remove User From Channel / Archive Channel / Rename Channel**
        * Bot Token:
            * `channels:manage`. Manage public channels that your Slack app has been added to and create new ones.
        * User Token:
            * `channels:write`. Manage a user’s public channels and create new ones on a user’s behalf.
        * These scopes are the same for Bot and User tokens:
            * `groups:write`. Manage private channels that your Slack app has been added to and create new ones.
            * `im:write`. Start direct messages with people.
            * `mpim:write`. Start group direct messages with people.
    * **Actions: List Users / Get User**<br/>Bot Token and User Token need the same scopes:
        * `users:read`. View people in a workspace.
        * `users:read.email`. View email addresses of people in a workspace.
    * **Actions: List Conversations History**<br/>Bot Token and User Token need the same scopes:
        * `channels:history`. View messages and other content in public channels that your Slack app has been added to.
        * `groups:history`. View messages and other content in private channels that your Slack app has been added to.
        * `im:history`. View messages and other content in direct messages that your Slack app has been added to.
        * `mpim:history`. View messages and other content in group direct messages that your Slack app has been added to.
    * **Actions: Send Message / Delete Message**<br/>Bot Token and User Token need the same scopes:
        * `chat:write`. Post messages in approved channels and conversations.
    * **Actions: Deactivate Account**
        * User Token:
            * `admin.users:write`. Modify account information.
    * **Actions: Search into Conversations**
        * User Token:
            * `search:read`. Search a workspace’s content.
    * **Actions: Send File**<br/>Bot Token and User Token need the same scopes:
        * `files:write`. Upload, edit, and delete files as your Slack app.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/slack/slack-7.png')} style={{border:'1px solid gray'}} alt="slack" width="400"/><br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/slack/slack-8.png')} style={{border:'1px solid gray'}} alt="slack" width="400"/>
1. Now you need to Install the APP in the workspace. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/slack/slack-9.png')} style={{border:'1px solid gray'}} alt="slack" width="800"/>
1. After installing the App now, you have two Tokens; these tokens are automatically generated when you installed the app. You will need these two tokens later. <br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/slack/slack-10.png')} style={{border:'1px solid gray'}} alt="slack" width="800"/>

## Slack in Automation Service and Cloud SOAR

1. Access integrations in the [Automation Service](/docs/platform-services/automation-service/automation-service-integrations/#view-integrations) or [Cloud SOAR](/docs/cloud-soar/automation).
1. After the list of the integrations appears, search/look for the integration and click on the row.
1. The integration details will appear. Click on the **"+"** button to add new Resource.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/slack/slack-13.png')} style={{border:'1px solid gray'}} alt="slack" width="200"/>
1. Create a new resource for the User.
1. Copy the User OAuth Token from Slack webpage and paste it In the Bot/User OAuth Token.
1. If using an Org-level Token, select the Token Type as Org-level Token and provide the Team ID. By default, it is set to Workspace-Level Token, which does not require a Team ID.
1. Once you have filled in all the required fields, click **SAVE**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/slack/slack-14.png')} style={{border:'1px solid gray'}} alt="slack" width="400"/>
1. Create another resource for the Bot User.
1. Copy the Bot User OAuth Token from Slack webpage and paste it In the Bot/User OAuth Token.
1. If using an Org-level Token, select the Token Type as Org-level Token and provide the Team ID. By default, it is set to Workspace-Level Token, which does not require a Team ID.
1. Once you have filled in all the required fields, click **SAVE**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/slack/slack-15.png')} style={{border:'1px solid gray'}} alt="slack" width="400"/><br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/slack/slack-16.png')} style={{border:'1px solid gray'}} alt="slack" width="400"/>
1. To make sure the resource is working, hover over the resource and then click **TEST**.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/slack/slack-17.png')} style={{border:'1px solid gray'}} alt="slack" width="200"/>
1. You should receive a successful notification in the bottom right corner.<br/><img src={useBaseUrl('/img/platform-services/automation-service/app-central/integrations/slack/slack-19.png')} style={{border:'1px solid gray'}} alt="slack" width="400"/>

## Change Log

* March 4, 2021 - First upload
* November 18, 2022 - Get User action fields hints updated
* December 30, 2022 - Added new actions:
    + Ask Question
    + Ask For User Email
* January 10, 2023 - Refactoring
* March 3, 2023 (v1.5)
    + Updated integration Fields Label
* June 30, 2023 (v1.6) - Removed unnecessary spaces
* August 21, 2023 (v1.7) - Updated **Send Message** Action
* January 16, 2024 (v1.8)
    + Updated action: Ask Question (Resolved issue related to newline characters)
* March 22, 2024 (v1.9) - New action: Rename Channel
* Sept 17, 2024 (v1.10)
    * Updated action: Ask Question (Added Allow Custom Text feature)
* Oct 1, 2024 (v1.10)
    * Updated action: Ask Question, Ask For User Email (Made changes for timeout)
* Oct 10, 2024 (v1.11)
    * Updated Integration File - Added Token Type and Team ID arg. 
    * Updated actions - Create Channel, List Channel, Get Channel, List Users, Send Message, Ask Questions, Ask For User Email (added team_id arg if using org level token)
* January 27, 2025 (v1.12)
    * Updated actions: Send Message, Ask Question, Ask For User Email (added a fix to support Slack channel and user mentions, for example `<!here>` and `<!channel>`, ensuring proper formatting in messages).