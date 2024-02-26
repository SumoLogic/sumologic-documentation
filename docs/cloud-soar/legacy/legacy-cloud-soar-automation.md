---
id: legacy-cloud-soar-automation
title: Legacy Cloud SOAR Automation
sidebar_label: Automation
description: Features of legacy Cloud SOAR automation.
---

import Iframe from 'react-iframe';
import useBaseUrl from '@docusaurus/useBaseUrl';

:::info
This article only applies to organizations having a legacy Cloud SOAR instance URL matching the pattern `*.soar.sumologic.com`. If it doesn't, refer to [Cloud SOAR Automation](/docs/cloud-soar/automation/) for documentation of our latest Cloud SOAR SaaS version.
:::


## Report template

**Report Templates** allow users to build their own reports by selecting various components of an incident they wish to include in the report. These components can include incident details, evidence, hosts, observables and many others.

<!--
Directions in the following section describe how to configure Slack in the Delivery 1 version of Cloud SOAR. Keeping these hidden here in case they need to be placed back into the documentation.


### Configure Slack for Cloud SOAR - Delivery 1

With Slack configured for Cloud SOAR, you can add Slack to the list of available [User Choice](#user-choice) actions in playbooks.

#### Step 1: Create a Slack app

Before you can use the Slack integration in Cloud SOAR, you need to create a Slack app on the user or company workspace.

1. Navigate to the [Slack API page](https://api.slack.com/apps).
1. Click **Create an App**.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-add-app.png')} alt="Create a Slack app" width="800"/>
1. Select **From scratch**.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-from-scratch.png')} alt="Create a Slack app from scratch" width="400"/>
1. Type a name for the app and select the workspace.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-workspace.png')} alt="Choose name and workspace for Slack app" width="400"/>
1. Click **Create App**.

#### Step 2: Add permissions to the Slack app

After you create a Slack app, you must add the appropriate permissions for use with Cloud SOAR.

1. Click **Permissions**, or from the left nav bar, click **OAuth & Permissions**.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-permissions.png')} alt="Slack OAuth and Permissions" width="600"/>
1. Scroll down to the **Scopes** section.<br/>You must add permissions for the Bot Token and the User Token. Both tokens let your app act independently, but user tokens allow you to work directly on behalf of users, based on the OAuth scopes for users in your app.
1. Click **Add an OAuth Scope** under **Bot Token Scopes** or **User Token Scopes**.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-scopes.png')} alt="Add an OAuth Scope in Slack" width="500"/>
1. Enter the following permissions for Bot Token Scopes or User Token Scopes, depending on the the actions you want to perform. You'll need at least one of the `channels:`, `groups:`, `im:`, or `mpim:` scopes corresponding to the conversation type you're working with.
   * **Actions: List Channels / Get Channel / Get Members**<br/>Bot Token and User Token need the same scopes:
      * `channels:read`. View basic information about public channels in a workspace.
      * `groups:read`. View basic information about private channels that your Slack app has been added to.
      * `im:read`. View basic information about direct messages that your Slack app has been added to.
      * `mpim:read`. View basic information about group direct messages that your Slack app has been added to.
    * **Actions: Create channel / Invite To Channel / Remove User From Channel / Archive Channel**
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
      * `files:write`. Upload, edit, and delete files as your Slack app.
1. Verify that scopes are set up correctly:
   * Here are the Bot Token scopes after configuration:<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-scopes-bot-token.png')} alt="Bot token" width="600"/>
   * Here are the User Token scopes after configuration:<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-scopes-user-token.png')} alt="User token" width="600"/>
1. Click **Install to Workspace** to make the app available for use. <br/><img src={useBaseUrl('img/cloud-soar/integration-slack-install-to-workspace.png')} alt="Install the app" width="600"/>
1. Installation generates a User OAuth Token and a Bot User OAuth Token. Copy the tokens and keep them in a secure location for use in the next step. <br/><img src={useBaseUrl('img/cloud-soar/integration-slack-user-oauth-token.png')} alt="Oauth tokens" width="600"/>

#### Step 4: Configure the Slack integration in Cloud SOAR

Now you must configure the Slack integration in Cloud SOAR to use the Bot OAuth Token and User OAuth token you saved in the previous step. These tokens will give the Slack integration the permissions it needs to perform the tasks in the scopes you set up.
1. Add resources for the tokens:
   1. In Cloud SOAR, click the gear icon and select **Automation**.<br/><img src={useBaseUrl('img/cloud-soar/integration-automation-menu.png')} alt="Automation option" width="300"/>
   1. Click **Integrations**.
   1. Select the Slack integration. The integration's resources appear.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-in-list.png')} alt="Select the Slack integration" width="800"/>
   1. Click **+** to add a new Resource.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-resources.png')} alt="Add a resource" width="600"/>
   1. Name the resource "User OAuth Access Token".
   1. Click **Edit**.
   1. Copy the User OAuth Token you saved from the Slack API setup and paste it Into the **Bot/User OAuth Token** field.
   1. Once you have filled in all the required fields, click **Save**.
   1. Click **TEST SAVED SETTINGS** to verify configuration.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-bot-user.png')} alt="New resource" width="400"/>
   1. Repeat the steps to create a "Bot User OAuth Access Token", and paste your previously saved Bot User OAuth Token into the **Bot/User OAuth Token** field.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-bot-user-2.png')} alt="Bot resource" width="400"/>
   1. Ensure that both new resources are configured properly by using **TEST SAVED SETTINGS**. Following is an example of a successful configuration message.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-edit-resource.png')} alt="Successful configuration message" width="400"/><br/>Here is how the Resources look after configuration.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-resource-2.png')} alt="Resources after configuration" width="600"/>
1. Set up instant messaging:
   :::note
   Only set this up if you want to be able to use the Slack App in User Choice responses or enable Slack Chat Integration. This is outlined below.
   :::
   1. Navigate to the [Slack API page](https://api.slack.com/apps).
   1. Place your instance URL in the **Event Subscriptions** page.<br/><img src={useBaseUrl('img/cloud-soar/integration-event-subscriptions.png')} alt="Event subscriptions" width="600"/>
   1. Place your instance URL in the **Interactivity & Shortcuts** page.<br/><img src={useBaseUrl('img/cloud-soar/integrations-interactivity.png')} alt="Event subscriptions" width="600"/>
   1. In Cloud SOAR, at the top of the screen click the gear icon and select **Settings**.<br/><img src={useBaseUrl('img/cloud-soar/integration-settings-menu.png')} alt="Settings option" width="300"/>
   1. Click **General**.
   1. Open **Instant Messaging**.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-instant-messaging.png')} alt="Successful configuration" width="600"/>
   1. For **Integration** select Slack.
   1. Paste your previously saved Bot User OAuth Access Token to the **Bot OAuth** field.
   1. Paste your previously saved User OAuth Access Token to the **Oauth Token for channel creation** field. If configuration is successful, **Workspace** displays "Success".

If your new resources are configured correctly, and Instant Messaging displays a "Success" message for the configured workspace, you can [Use the Slack app in User Choice](#use-the-slack-app-in-user-choice).

#### Use the Slack app in User Choice

 If you have configured Slack as described in [Configure Slack for Cloud SOAR](#configure-slack-for-cloud-soar), you can set a playbook’s [User Choice](#user-choice) to be answered by Slack.

1. Run a playbook with a User Choice action. The following example shows a simple playbook with two available answers: **Close Incident** and **Investigate**. Notice that the option **Answer By Slack** is enabled.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-playbook.png')} alt="Playbook with user choices" width="600"/>
<br/>In this case, the Authorizer set is just a user. If a group is chosen, a Slack channel will be created and all the group members will be authorized to choose one of the **User Choice** available options. The channel will be automatically named as the incident on which the playbook is running.
1. When the playbook flow reaches the **User Choice**, the user or group will receive a message containing the reference to the incident, the playbook name, and the question set for the **User Choice**.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-user-choice.png')} alt="Slack user choice message" width="600"/>
1. After a recipient chooses one of the available options, the playbook flow will continue and a message will inform the user or the group about the choice made.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-user-choice-2.png')} alt="Selected user choice" width="600"/>

#### Enable Slack chat integration

Cloud SOAR has a built-in Slack chat feature that lets you exchange messages with all the investigators of an incident.

1. Set the BOT Token scopes and User Token scopes as described in [Configure Slack for Cloud SOAR](#configure-slack-for-cloud-soar).
1. Select **Profile**.<br/><img src={useBaseUrl('img/cloud-soar/integration-profile-button.png')} alt="Profile button" width="150"/><br/>Your user profile opens in the **User > User Management** page.
1. In the Preferences panel click **Enable slack chat integration**.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-chat-enable.png')} alt="Enable Slack chat integtration toggle" width="500"/>
1. After enabling the Slack chat integration, a channel will automatically appear in the workspace when an incident is created inside Cloud SOAR. The message will contain a link to the incident and all team conversations regarding the incident. <br/><img src={useBaseUrl('img/cloud-soar/integration-slack-chat-new-channel.png')} alt="New channel" width="400"/>
1. A chat box also displays. Click the incident ID shown in the chat box to open the incident.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-chat-incident-id.png')} alt="Chat box" width="200"/>

-->
