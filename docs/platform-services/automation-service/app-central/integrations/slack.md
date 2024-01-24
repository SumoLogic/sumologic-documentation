---
title: Slack
description: ''
tags: []
---

![](/img/platform-services/automation-service/app-central/logos/slack.png)

Version: 1.8  
Updated: Jan 16, 2024

Create a public or private channel, Send messages or Files to channels or Users directly. **C**loud SOAR Slack integration keeps teams connected. Organize conversations, and quickly find what you need to get work done. 

## Actions

* **Send Message** *(Notification)* - Sends a message to a channel or direct message
* **Send File** *(Notification)* - Sends a file to a channel or direct user
* **Create Channel** *(Notification)* - Initiates a public or private channel-based conversation
* **Get Channel** *(Notification)* - Retrieve information about a conversation
* **Invite To Channel** *(Notification)* - Invites users to a channel
* **Search into Conversations** *(Notification)* - Searches for messages and files matching a query
* **List Conversations History** *(Notification)* - Fetches a conversation's history of messages and events
* **Remove User From Channel** *(Containment)* - Removes a user from a conversation
* **Archive Channel** *(Containment)* - Archives a conversation
* **Deactivate Account** *(Containment)* - Remove a user from a workspace.
* **Delete Message** *(Containment)* - Deletes a message
* **Get Members** *(Notification)* - Retrieve members of a conversation
* **Get User** *(Notification)* - Gets information about a user.
* **List Channels** *(Notification)* - Lists all channels in a Slack team
* **List Users** *(Notification)* - Lists all users in a Slack team
* **Ask Question** (Notification) - Ask a Question, you can use any option to send a message/question to any user to user or user to channel for both bot and user with multiple options
* **Ask For User Email** (Notification) - Retrieve an Email Address or User tagged in the slack chat

## Slack Configuration

First you need to create a Slack App on your workspace. 

Click on this [link](https://api.slack.com/apps)

Click on Create an App button.

![](/img/platform-services/automation-service/app-central/integrations/slack/slack-1.png)

Choose From scratch

![](/img/platform-services/automation-service/app-central/integrations/slack/slack-2.png)

Inserta a name for the app and select the workspace.

![](/img/platform-services/automation-service/app-central/integrations/slack/slack-3.png)

Once you created your App, you have to add Permissions.

![](/img/platform-services/automation-service/app-central/integrations/slack/slack-4.png)

Alternatively you can see OAuth & Permissions from this page.

![](/img/platform-services/automation-service/app-central/integrations/slack/slack-5.png)

Now you have to add the Scopes for User Token and Bot Token.

![](/img/platform-services/automation-service/app-central/integrations/slack/slack-6.png)

Bot tokens let your app act independently.

User tokens allow you to work directly on behalf of users, based on the OAuth scopes that installing users' awards to your app.

All the Actions required scopes depend on the type of channel-like object you're working with. 

To use the Actions, you'll need at least one of the channels:, groups:, im: or mpim: scopes corresponding to the conversation type you're working with.

Now for each action of Slack Integration, you need different scopes to be added to the BOT or User.

Actions: List Channels / Get Channel / Get Members

For these actions you will need the below scopes.

BOT Token and USER Token needs the same scopes.

* channels:read (View basic information about public channels in a workspace)
* groups:read (View basic information about private channels that your slack app has been added to)
* im:read (View basic information about direct messages that your slack app has been added to)
* mpim:read (View basic information about group direct messages that your slack app has been added to)

Actions: Create channel / Invite To Channel / Remove User From Channel / Archive Channel

for above actions you will need the following scopes: 

BOT Token

* channels:manage (Manage public channels that your slack app has been added to and create new ones)

User Token

* channels:write (Manage a user’s public channels and create new ones on a user’s behalf)

These scopes are the same for BOT and USER token:

* groups:write (Manage private channels that your slack app has been added to and create new ones)
* im:write (Start direct messages with people)
* mpim:write (Start group direct messages with people)

Actions: List Users / Get User

BOT Token and USER Token needs the same scopes.

* users:read (View people in a workspace)
* users:read.email (View email addresses of people in a workspace)

Actions: List Conversations History

BOT Token and USER Token needs the same scopes.

* channels:history (View messages and other content in public channels that your slack app has been added to)
* groups:history (View messages and other content in private channels that your slack app has been added to)
* im:history (View messages and other content in direct messages that your slack app has been added to)
* mpim:history (View messages and other content in group direct messages that your slack app has been added to)

Actions: Send Message / Delete Message

BOT Token

* chat:write (Post messages in approved channels & conversations)

User Token

* chat:write:user (Send messages on a user’s behalf)
* chat:write (Post messages in approved channels & conversations)
* chat:write:bot (Send messages as your slack app)

Actions: Deactivate Account 

For this action you will need the below scope but it only works with USER Token but not with BOT Token

User Token

* admin.users:write (Modify account information)

Actions: Search into Conversations 

(this action you will need the only one scope and it only works with USER Token but not with BOT Token) 

User Token

* search:read (Search a workspace’s content)

Actions: Send File 

BOT Token

* files:write (Upload, edit, and delete files as your slack app)

User Token

* files:write:user (Upload, edit, and delete files as your slack app)
* files:write (Upload, edit, and delete files as your slack app)

![](/img/platform-services/automation-service/app-central/integrations/slack/slack-7.png)

![](/img/platform-services/automation-service/app-central/integrations/slack/slack-8.png)

Now you need to Install the APP in the workspace.

![](/img/platform-services/automation-service/app-central/integrations/slack/slack-9.png)

After installing the App now, you have two Tokens, these tokens are automatically generated when you installed the app. 

You will need these two tokens later.

![](/img/platform-services/automation-service/app-central/integrations/slack/slack-10.png)

## Slack in Automation Service and Cloud SOAR

To configure the integration, log into the application, expand the configuration menu in the top right corner by hovering over the gear icon and click Automation.

![](/img/platform-services/automation-service/app-central/integrations/slack/slack-11.png)

In the Automation section, on the left menu, click Integrations.

![](/img/platform-services/automation-service/app-central/integrations/slack/slack-12.png)

After the list of the integrations appears, search/look for the integration and click on the row.

The integration details will appear. Click on the "+" button to add new Resource.

![](/img/platform-services/automation-service/app-central/integrations/slack/slack-13.png)

Create a new resource for the User.

Copy the User OAuth Token from Slack webpage and paste it In the Bot/User OAuth Token.

Once you have filled in all the required fields, click Save.

![](/img/platform-services/automation-service/app-central/integrations/slack/slack-14.png)

Create another resource for the Bot User.

Copy the Bot User OAuth Token from Slack webpage and paste it In the Bot/User OAuth Token.

Once you have filled in all the required fields, click Save.

![](/img/platform-services/automation-service/app-central/integrations/slack/slack-15.png)

![](/img/platform-services/automation-service/app-central/integrations/slack/slack-16.png)

To make sure the resource is working, hover over the resource and then click the pencil icon that appears on the right.

![](/img/platform-services/automation-service/app-central/integrations/slack/slack-17.png)

Click Test Saved Settings.

![](/img/platform-services/automation-service/app-central/integrations/slack/slack-18.png)

You should receive a successful notification in the bottom right corner.

![](/img/platform-services/automation-service/app-central/integrations/slack/slack-19.png)

  


* Send Message Action   
BOT users can't post to a direct message conversation between two users using Send Message Action.   
If your app was involved in the conversation, then it would be a multi-person direct message instead.   
Apps can post to direct message conversations between users when a shortcut or slash command belonging to that app is used in the conversation.
* Get User Action   
This Action returns information about a member of a workspace.   
If you want to search for users it's possible to manage it with an Exact match or without an Exact match.   
Also this action will return on the field name users\_ids in JSON, which you can use in Playbook, if you want to invite many users to the channel.
* Delete Action   
When used with a typical user token, may only delete messages posted by that user. When used with a bot user's token, may delete only messages posted by that bot user.
* Invite To Channel Action   
This action invites 1-1000 users to a public or private channel. The calling user must be a member of the channel. And also the invites must not be the owner of the channel.   
  
Limits for workspace apps   
Because workspace apps can't act on behalf of users, they don't have the power to invite users to conversations, except when they're the owner/creator of the conversation.
* Create Channel Action   
Limits for workspace apps   
At least one user needs to be invited when creating a public or private conversation.   
Otherwise, workspace apps could create invisible channels, which might cause a few problems.
* Archive Channel Action   
This Action archives a conversation. Not all types of conversations can be archived.   
  
Limits for workspace apps   
Because workspace apps can't act on behalf of users, they don't have the power to archive conversations, except when they're the owner/creator of the conversation.
* Deactivate Account Action   
This Admin API removes a user from a workspace. This app can not be installed on a workspace. Apps with this feature are only available to Enterprise customers.

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
