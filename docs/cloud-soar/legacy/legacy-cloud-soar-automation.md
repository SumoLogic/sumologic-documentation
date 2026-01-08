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

## Credential Manager - CyberArk Configuration

You can use CyberArk Credential Manager to manage data that will be used in integration resources.

<img src={useBaseUrl('img/cloud-soar/cyberArk1.png')} alt="Integrations" style={{border: '1px solid gray'}} width="600"/>

Using the cogwheel icon on the right in the integrations section, the main section of the CyberArk configuration opens.

<img src={useBaseUrl('img/cloud-soar/CyberArk2.png')} alt="CyberArk configuration" style={{border: '1px solid gray'}} width="400"/>

Here you can set URL and port of the Components server, and the credentials needed to connect to CyberArk. The **Enable** checkbox can be enabled or disabled later.

If enabled, when you go to open the detail of a integration resource you'll find a new checkbox (**Use CyberArk fields**) at the top already active. If the checkbox on above window is disabled, the checkbox in the resource window will be disabled by default, and it will not be possible to activate it.

<img src={useBaseUrl('img/cloud-soar/CyberArk3.png')} alt="Enable CyberArk fields" style={{border: '1px solid gray'}} width="800"/>

If the checkbox **Use CyberArk fields** is enabled, two new mandatory fields will appear:
* **Account Name** > userName in CyberArk
* **Platform ID** > platformId in CyberArk

Near these fields, there will be the relative toggle that will enable the related field for use on CyberArk.

<img src={useBaseUrl('img/cloud-soar/CyberArk5.png')} alt="CyberArk fields enabled" style={{border: '1px solid gray'}} width="400"/>

In the image above, you can see two custom fields of the resource with their toggles. The first field has been enabled to use CyberArk, while the second one hasn't.

Within the CyberArk fields you need to enter the name of the Properties present in the corresponding Platform ID on CyberArk.

:::note Case sensitive
Pay attention to uppercase and lowercase letters.
:::

<img src={useBaseUrl('img/cloud-soar/CyberArk4.png')} alt="Property names" style={{border: '1px solid gray'}} width="400"/>

Through the name of the Properties, (in the above case **MB3**) during the execution of the resource, it will be replaced with the value present on CyberArk for that resource, in our case **84ca4444-9082-40b7-**.

In the fields enabled for CyberArk, in addition to the account properties, you can also recall the value of the CyberArk Account password, to do this, write the word **Password** in the field.

:::important
If the checkbox for CyberArk is enabled for a resource field, the data type allowed for that field will be string only, even if the same field was configured to accept lists, checkboxes, numbers, and more.
:::

**The only property that will be retained is the mandatory nature of the field**.

Values entered in the field not enabled for CyberArk, if previously entered and saved, will be retained if the field becomes enabled for CyberArk. The same is not true otherwise.

If the CyberArk switch is enabled and one switch on the field line is disabled, that CyberArk field value will be saved empty.

<img src={useBaseUrl('img/cloud-soar/CyberArk6.png')} alt="CyberArk fields" style={{border: '1px solid gray'}} width="400"/>

### Configuring the automation bridge for CyberArk

If you are using CyberArk, you will need to add the following certificates given by CyberArk:
```
**RootCA**new.crt**
**client**new.crt**
**client**new.pem**
```
to the `/opt/automation-bridge/` directory.

**The names must be exactly the same**.

## Pass attributes to a nested playbook

When you nest a child playbook within a parent playbook, you must pass parameters from the parent to the child to be utilized within the child playbook actions.

1. Select the playbook (the child) you want to nest within another playbook.
1. Click the three-dot kebab menu icon in the upper-right corner of the child playbook, select the **Nested** option, and click **Save**. This tags the playbook as a child and prevents adhoc testing against the child, since it will rely upon the parent to provide it inputs. <br/><img src={useBaseUrl('img/cloud-soar/playbook-nested-option.png')} alt="Nested option" width="500"/>
1. Click the **Edit** button at the bottom of the screen, then the **Edit** button on the **Start** node. <br/><img src={useBaseUrl('img/cloud-soar/playbook-start-node.png')} alt="Start node" width="100"/>
1. Add the parameters you would like your child playbook to receive from the parent. These can be arbitrary names and do not need to be aligned to any field schema. They will be mapped from the parent nodes. <br/><img src={useBaseUrl('img/cloud-soar/playbook-parameters.png')} alt="Add parameters" width="500"/>
1. It’s important that your child nodes make use of these parameters. These will be accessible by editing your relevant child nodes, selecting the cog wheel, and selecting the relevant playbook input. In the example below, we use the playbook ID input parameter that will come from the parent. <br/><img src={useBaseUrl('img/cloud-soar/playbook-edit-parameters.png')} alt="Edit parameters" width="500"/>
1. Save and publish your child playbook.
1. Navigate to your parent playbook. Add a new node. <br/><img src={useBaseUrl('img/cloud-soar/playbook-add-node.png')} alt="Add node" width="350"/>
1. Select **Playbook**. <br/><img src={useBaseUrl('img/cloud-soar/playbook-add-node-2.png')} alt="Select Playbook" width="150"/>
1. Select your child playbook. <br/><img src={useBaseUrl('img/cloud-soar/playbook-select-child-playbook.png')} alt="Select child playbook" width="500"/>
1. You will see the parameters that you had set from your child playbook. Use the cog wheel to set these parameters based on your parent action nodes. <br/><img src={useBaseUrl('img/cloud-soar/playbook-parent-parameters.png')} alt="Parent playbook parameters" width="500"/>
1. Save and publish your parent playbook.

You will now be able to perform tests against your parent playbook, and your child playbook will receive the parameters from the parent.

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
