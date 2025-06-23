---
id: automation
title: Cloud SOAR Automation
sidebar_label: Automation
description: Configuration tools for Cloud SOAR automation and orchestration features.
---

import Iframe from 'react-iframe';
import useBaseUrl from '@docusaurus/useBaseUrl';

The **Automation** section contains configuration tools for Cloud SOAR's automation and orchestration features.

[**Classic UI**](/docs/cloud-soar/overview#classic-ui). To access Automation, click the gear icon <img src={useBaseUrl('img/cloud-soar/cloud-soar-settings-icon.png')} alt="Settings menu icon" style={{border: '1px solid gray'}} width="25"/> in the top right and select **Automation**.

[**New UI**](/docs/cloud-soar/overview#new-ui). To access Automation, in the main Sumo Logic menu select **Automation**.
 

Because Cloud SOAR provides automation functionality to the [Automation Service](/docs/platform-services/automation-service/), many features are identical between Cloud SOAR and the Automation Service. Therefore, for information about the following Cloud SOAR features, see the Automation Service articles:
* [App Central](/docs/platform-services/automation-service/app-central/)
* [Integrations](/docs/platform-services/automation-service/automation-service-integrations/)
* [Automation bridge](/docs/platform-services/automation-service/automation-service-bridge)
* [Integration framework](/docs/platform-services/automation-service/integration-framework/)
* [Audit logging](/docs/platform-services/automation-service/automation-service-audit-logging)
* [Playbooks](/docs/platform-services/automation-service/automation-service-playbooks/). (For information specific to running playbooks in Cloud SOAR, see [Run playbooks in Cloud SOAR](#run-playbooks-in-cloud-soar) below.)

The following sections describe automation features only used in Cloud SOAR.

## Run playbooks in Cloud SOAR

In Cloud SOAR, playbooks are run from [incidents](/docs/cloud-soar/incidents-triage/#incidents). To run playbooks in Cloud SOAR, perform the following steps:
1. [Create a playbook](/docs/platform-services/automation-service/automation-service-playbooks/#create-a-new-playbook) to use in incident response. When you create the playbook, do the following:
   1. Click the **Edit** icon on the **Start** node:<br/><img src={useBaseUrl('img/platform-services/automation-service/start-node.png')} alt="Start node" style={{border:'1px solid gray'}} width="100"/>
   1. Ensure that the **Add one or more params as a playbook input** field is left blank: <br/><img src={useBaseUrl('img/platform-services/automation-service/edit-start-node-input.png')} alt="Edit node dialog" style={{border:'1px solid gray'}} width="500"/><br/>Do *not* click the field to show the dropdown menu: <br/><img src={useBaseUrl('img/platform-services/automation-service/start-node-parameters.png')} alt="Types of start node parameters" style={{border:'1px solid gray'}} width="400"/><br/>The other values in the field are used for automation outside of Cloud SOAR:
      * **Insight** and **Entity** are for launching a playbook from a Cloud SIEM automation.
      * **Alert** is for launching a playbook from a monitor. 
      * **Parse from JSON** is for launching a playbook from another playbook.
   1. Proceed to create the playbook as needed.
1. [Create an incident template](#create-a-new-incident-template) to be assigned to incidents. When you create the template, add the playbook to the template and select **Autorun** to run the playbook when the incident is created, or deselect if you want to manually run the playbook from the incident.<br/><img src={useBaseUrl('img/cloud-soar/new-incident-template-add-playbook.png')} alt="New template" style={{border: '1px solid gray'}} width="700"/>
1. Monitor and run playbooks on [incidents](/docs/cloud-soar/incidents-triage/#incidents):
   * Within an incident, select **Operations > Playbooks** to see the playbooks assigned to the incident. 
   * If playbooks haven't been assigned by an incident template, you can add playbooks by clicking the **+** button.
   * To manually run a playbook for the incident, click the **Run** button at the bottom of the screen.<br/><img src={useBaseUrl('img/cloud-soar/playbook-on-incident.png')} alt="Playbook on an incident" style={{border: '1px solid gray'}} width="700"/>

## Incident templates

Incident templates define the way in which incidents will be created for a specific alert, incident type or event. They allow you to define a certain number of incident attributes (for example, incident type, severity, assignment, and any other default or custom incident parameters) that will automatically be set each time an incident is generated, based on the template. This may include type, classification, incident assignment, playbooks, knowledge base articles, or any other incident attribute. Since rules are created for generating incidents based on syslog messages, email, SIEM integrations, or other data sources, it is the incident templates that will define how the initial incident will be created.

### Create a new incident template

1. [**Classic UI**](/docs/cloud-soar/overview#classic-ui). Click the gear icon <img src={useBaseUrl('img/cloud-soar/cloud-soar-settings-icon.png')} alt="Settings menu icon" style={{border: '1px solid gray'}} width="25"/> in the top right, select **Automation**, and then select **Incident templates** in the left nav bar. <br/>[**New UI**](/docs/cloud-soar/overview#new-ui). In the main Sumo Logic menu select **Automation > Template**. You can also click the **Go To...** menu at the top of the screen and select **Template**.  
1. Click **+** to the left of **Template**.<br/><img src={useBaseUrl('img/cloud-soar/incident-templates.png')} alt="Add template" style={{border: '1px solid gray'}} width="800"/>
1. Define the template: <br/><img src={useBaseUrl('img/cloud-soar/create-incident-template.png')} alt="Create incident template dialog" style={{border: '1px solid gray'}} width="400"/>
   1. **Template name**. Enter a name that is easily identifiable and related to the activity it is developed for.
   1. **Category**. Enter a category for this template. For example, suppose we're building a template for a DLP incident. We might enter a category named **Data Theft**, but we can enter anything we want that will help us group incident templates in the future. You can customize this field to fit your environment, as well as all other fields in Cloud SOAR (see [Custom fields](/docs/cloud-soar/overview/#custom-fields)).
   1. **Tags**. Enter any tags to further categorize or define the incident. You can use these tags later when searching for or correlating events.
1. Click **Incident** at the top of the dialog.
1. Define any incident parameters you want to set by default when an incident is creating using the template: <br/><img src={useBaseUrl('img/cloud-soar/create-incident-template-2.png')} alt="Create incident template dialog to define the incident type" style={{border: '1px solid gray'}} width="400"/>
1. Click **Apply**. The new template is displayed.  <br/><img src={useBaseUrl('img/cloud-soar/new-incident-template.png')} alt="New template" style={{border: '1px solid gray'}} width="700"/>
1. Scroll down and enter the following:
   1. **Incident details**. Click the **Edit** toggle to set up details for a specific incident type.
   1. **Description**. Describe details of the template.
   1. **Playbook**. Select the playbooks that should be automatically assigned to an incident. For each playbook, you can choose to have the playbook automatically execute immediately upon incident creation, or assigned and wait for manual execution.
   1. **Investigators**. Select the investigators who should be automatically assigned to the incident.
   1. **Notes**. Enter notes which should be created for the incident.
   1. **Mapping**. Select the daemon field mapping for the template.

### Configure a webhook for Cloud SOAR

You can configure a [webhook connection](/docs/alerts/webhook-connections/cloud-soar/) to allow you to send an alert from a scheduled search to Sumo Logic Cloud SOAR using an incident template.

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Monitoring > Connections**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Monitoring** select **Connections**. You can also click the **Go To...** menu at the top of the screen and select **Connections**. 
1. Click **+** and choose **Cloud SOAR** as the connection type. The **Create Cloud SOAR Connection** dialog is displayed.<br/><img src={useBaseUrl('img/cloud-soar/CSOAR-connection1.png')} alt="New connection" style={{border: '1px solid gray'}} width="600"/>
1. Enter a **Name** and give an optional **Description** to the connection.
1. The **URL** field shows your [Sumo Logic API endpoint](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) followed by `/csoar/v3/incidents/`. For example, `https://api.us2.sumologic.com/api/csoar/v3/incidents/`
1. In **Authorization Header**, enter your basic authentication access information for the header. For example, `Basic <base64 encode <accessId>:<accessKey>>`. For more information, see [Basic Access (Base64 encoded)](/docs/api/getting-started#basic-access-base64-encoded).
1. Click **Save**. After save, the **Templates** dropdown shows a list of all incident templates by name configured in your Cloud SOAR environment.
1. Select a **Template**.
1. The default payload synchronizes with the selected template, and the **Alert Payload** field shows the associated `template_id` field automatically defined in the default payload. A `template_id` is required in the payload in order to configure the connection:

    ```
    {
      "template_id": <Template ID>,
     "fields": {
        "incidentid": "Incident Id"
      }
    }
    ```

    You can add additional variables. For example:

    ```
    {
      "fields": {
        "description": "string",
        "additional_info": "string",
        "starttime": "ISO-8601 datetime string",
        "incident_kind": <ID incident kind>,
        "incident_category": <ID incident category>,
        "status": <ID incident status>,
        "restriction": <ID incident restriction>
      }
    }
    ```
    :::note
    * For details on variables you can use as parameters within your JSON object, see [Configure Webhook Payload Variables](/docs/alerts/webhook-connections/set-up-webhook-connections/#configure-webhook-payload-variables).
    * For information on additional fields, please refer to the [Cloud SOAR APIs](/docs/api/cloud-soar/) documentation.
    * The preceding example shows an `ISO-8601 datetime string`. For information about how to configure it, see [parser documentation](https://dateutil.readthedocs.io/en/stable/parser.html#dateutil.parser.isoparse).
    :::
1. Click **Save**.

## Automation rules

Cloud SOAR can ingest, parse, and process incident data from email, syslog and bidirectional integrations. For Cloud SOAR to begin processing incident data from these sources, automation rules need to be configured.

Automation rules allow specific data to be parsed from the incoming data sources and then acted upon automatically or through manual actions. You can establish any daemonized integration rules to define what occurs when data is received from each of these sources.

### Create an automation rule

1. [**Classic UI**](/docs/cloud-soar/overview#classic-ui). Click the gear icon <img src={useBaseUrl('img/cloud-soar/cloud-soar-settings-icon.png')} alt="Settings menu icon" style={{border: '1px solid gray'}} width="25"/> in the top right, select **Automation**, and then select **Rules** in the left nav bar. <br/>[**New UI**](/docs/cloud-soar/overview#new-ui). In the main Sumo Logic menu select **Automation > Rules**. You can also click the **Go To...** menu at the top of the screen and select **Rules**.  
1. Click **+** to the left of **Rules**.
1. Select a name for the rule, then select the daemon to use with this new rule, the resource, and fill in all the remaining parameters. <br/><img src={useBaseUrl('img/cloud-soar/add-automation-rule.png')} alt="Add automation rule"  style={{border: '1px solid gray'}} width="400"/>
1. Click **Save**. The new rule is displayed. <br/><img src={useBaseUrl('img/cloud-soar/sample-automation-rule.png')} alt="Sample automation rule"  style={{border: '1px solid gray'}} width="700"/>
1. Add a **Filter** if desired.
1. Click **+** to the left of **Actions**.
1. Click **Action type**. <br/><img src={useBaseUrl('img/cloud-soar/automation-rule-action-types.png')} alt="Automation rule Action type dropdown menu" style={{border: '1px solid gray'}} width="400"/>
1. Select the action Cloud SOAR will can take when the specified activity is observed:
    * **Create incident from template**. Specify what [incident template](#incident-templates) to use, the incident owner, and incident ID format. This is the most common action.
    * **Update incident**. Update a field in an existing incident based on parameters from the parsed message.
    * **Close incident**. Automatically close a known false positive incident.
    * **Add events to an existing incident**. Add events based on parameters from the parsed message.
    * **Set task progress**. Set task progress based on parameters from the parsed message.
    * **Close task**. Close a task based on parameters from the parsed message.
    * **Add to Triage**. Create a new triage event based on parameters from the parsed message.
1. Fill out the rest of the fields for the action.
1. Click **+** to the left of **Mapping** and select the daemon field mapping for the rule.

## Configure Slack for Cloud SOAR

With the Cloud SOAR Slack integration, teams can remain connected, organize conversations,  and quickly find what is needed to get the work done.

With the Cloud SOAR Slack integration, you can directly manage [user choice](/docs/platform-services/automation-service/automation-service-playbooks/#add-a-user-choice-node-to-a-playbook) actions within the playbooks from your Slack workspace.  Furthermore, for each new incident, a related conversation channel will be created within your Slack workspace, where users will correspond to investigators. Changing a user within the incident will also result in a change to the user within the conversation channel.

:::note
To configure Slack for use inside Cloud SOAR, you must first create a public or private channel so you can send messages or files to channels or users directly.
:::

### Step 1: Create a Slack app

Before you can use the Slack integration in Cloud SOAR, you need to create a Slack app on the user or company workspace.

1. Navigate to the [Slack API page](https://api.slack.com/apps).
1. Click **Create an App**.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-add-app.png')} alt="Create a Slack app" style={{border: '1px solid gray'}} width="800"/>
1. Select **From scratch**.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-from-scratch.png')} alt="Create a Slack app from scratch" style={{border: '1px solid gray'}} width="400"/>
1. Enter "CSOAR Bot" as the app name and select the workspace where you wish to install it.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-workspace-delivery2.png')} alt="Insert name and workspace for Slack app" style={{border: '1px solid gray'}} width="400"/>
1. Click **Create App**.

### Step 2: Add permissions to the Slack app

After you create a Slack app, you must add the appropriate permissions for use with Cloud SOAR.

1. Click **Permissions**, or from the left nav bar, click **OAuth & Permissions**.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-permissions.png')} alt="Slack OAuth and Permissions" width="600"/>
1. Scroll down to the **Scopes** section.<br/>You must add permissions for the Bot Token. Bot tokens let your app act independently.
1. Click **Add an OAuth Scope** under **Bot Token Scopes**.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-scopes-delivery2.png')} alt="Add an OAuth Scope in Slack" style={{border: '1px solid gray'}} width="500"/>
1. Enter the following permissions.
   * **Actions: List Channels / Get Channel / Get Members**
      * `channels:read`. View basic information about public channels in a workspace.
      * `groups:read`. View basic information about private channels that your Slack app has been added to.
      * `im:read`. View basic information about direct messages that your Slack app has been added to.
      * `mpim:read`. View basic information about group direct messages that your Slack app has been added to.
   * **Actions: Create channel / Invite To Channel / Remove User From Channel / Archive Channel**
      * `channels:manage`. Manage public channels that your Slack app has been added to and create new ones.
      * `channels:write.invites`. Invite members to public channels.
      * `groups:write`. Manage private channels that your Slack app has been added to and create new ones.
      * `groups:write.invites`. Invite members to private channels.
      * `im:write`. Start direct messages with people.
      * `mpim:write`. Start group direct messages with people.
      * `mpim:write.invites`. Invite members to group direct messages.
   * **Actions: List Users / Get User**
     * `users:read`. View people in a workspace.
     * `users:read.email`. View email addresses of people in a workspace.
   * **Actions: List Conversations History**
     * `channels:history`. View messages and other content in public channels that your Slack app has been added to.
     * `groups:history`. View messages and other content in private channels that your Slack app has been added to.
     * `im:history`. View messages and other content in direct messages that your Slack app has been added to.
     * `mpim:history`. View messages and other content in group direct messages that your Slack app has been added to.
   * **Actions: Send Message / Delete Message**
      * `chat:write`. Post messages in approved channels and conversations.
1. Verify that scopes are set up correctly:
   * Here are the Bot Token scopes after configuration:<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-scopes-bot-token-1-delivery2.png')} alt="Bot token 1" style={{border: '1px solid gray'}} width="500"/>
1. Place your instance URL in the **Interactivity & Shortcuts** page. <br/><img src={useBaseUrl('img/cloud-soar/integrations-interactivity-delivery2.png')} alt="Interactivity" style={{border: '1px solid gray'}} width="600"/>
1. Click **Install to Workspace** to make the app available for use.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-install-to-workspace.png')} alt="Install the app" width="600"/>
1. Installation generates a Bot User OAuth Token and a Signing Secret. Copy the tokens and keep them in a secure location for use in the next step. <br/><img src={useBaseUrl('img/cloud-soar/integration-slack-bot-user-oauth-token.png')} alt="Bot Oauth token" style={{border: '1px solid gray'}} width="600"/> <br/><img src={useBaseUrl('img/cloud-soar/integration-slack-signing-secret.png')} alt="Signing Secret" style={{border: '1px solid gray'}} width="600"/>

### Step 3: Configure the Slack integration in Cloud SOAR

Now you must configure the Slack integration in Cloud SOAR to use the Bot OAuth Token and Signing Secret you saved in the previous step. These tokens will give the Slack integration the permissions it needs to perform the tasks in the scopes you set up.

1. Add resources for the tokens:
   1. [**Classic UI**](/docs/cloud-soar/overview#classic-ui). Click the gear icon <img src={useBaseUrl('img/cloud-soar/cloud-soar-settings-icon.png')} alt="Settings menu icon" style={{border: '1px solid gray'}} width="25"/> in the top right, select **Automation**, and then select **Integrations** in the left nav bar. <br/>[**New UI**](/docs/cloud-soar/overview#new-ui). In the main Sumo Logic menu select **Automation > Integrations**. You can also click the **Go To...** menu at the top of the screen and select **Integrations**.  
   1. Select the Slack integration. The integration's resources appear.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-in-list.png')} alt="Select the Slack integration" style={{border: '1px solid gray'}} width="800"/>
   1. Click **+** to add a new Resource.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-resources.png')} alt="Add a resource" style={{border: '1px solid gray'}} width="500"/>
   1. Name the resource "Bot User OAuth Access Token".
   1. Copy the Bot Oauth Token you saved from the Slack API setup and paste it Into the **Bot/User OAuth Token** field.
   1. Click **TEST** to verify configuration.
   1. Once you have filled in all the required fields, click **SAVE**.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-bot-user-2.png')} alt="Bot resource" style={{border: '1px solid gray'}} width="400"/>
1. Configure instant messaging:
    1. [**Classic UI**](/docs/cloud-soar/overview#classic-ui). Click the gear icon <img src={useBaseUrl('img/cloud-soar/cloud-soar-settings-icon.png')} alt="Settings menu icon" style={{border: '1px solid gray'}} width="25"/> in the top right and select **Settings**. <br/>[**New UI**](/docs/cloud-soar/overview#new-ui). In the top menu select **Administration**, and then under **Cloud SOAR Settings** select **General Settings**. You can also click the **Go To...** menu at the top of the screen and select **General**. 
    1. Scroll down and open **Instant Messaging**.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-instant-messaging-delivery2.png')} alt="Instant Messaging configuration dialog" style={{border: '1px solid gray'}} width="400"/>
    1. For **Integration** select Slack.
    1. Paste your previously saved Bot User OAuth Access Token to the **Bot OAuth** field.
    1. Paste your previously saved Signing Secret to the **Signing Secret for verify requests** field. If configuration is successful, **Workspace** displays "Success".

    If your new resources are configured correctly, and Instant Messaging displays a "Success" message for the configured workspace, you can [Use the Slack app in User Choice](#use-the-slack-app-in-user-choice).

### Use the Slack app in User Choice

 If you have configured Slack as described in [Configure Slack for Cloud SOAR](#configure-slack-for-cloud-soar), you can set a playbook’s [user choice](/docs/platform-services/automation-service/automation-service-playbooks/#add-a-user-choice-node-to-a-playbook) to be answered by Slack.

1. Run a playbook with a User Choice action. The following example shows a simple playbook with two available answers: **Close Incident** and **Investigate**. Notice that the option **Answer By Slack** is enabled.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-playbook.png')} alt="Playbook with user choices" style={{border: '1px solid gray'}} width="700"/>
<br/>In this case, the Authorizer set is just a user. If a group is chosen, a message will be sent directly from the CSOAR Bot to every available user. If a user is not selected, and the playbook is inside an incident, the message will be sent within the relevant channel in the Slack workspace, and all the users within it will be authorized to choose one of the User Choice available options.
1. When the playbook flow reaches the **User Choice**, the user will receive a message containing the reference to the incident, the playbook name, and the question set for the **User Choice**.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-user-choice.png')} alt="Slack user choice message" style={{border: '1px solid gray'}} width="600"/>
1. After a recipient chooses one of the available options, the playbook flow will continue and a message will inform the user or the group about the choice made.<br/><img src={useBaseUrl('img/cloud-soar/integration-slack-user-choice-2.png')} alt="Selected user choice" style={{border: '1px solid gray'}} width="600"/>

### Bidirectional use cases between Slack and incident management

You can manage Slack communication channels directly by creating/editing various incidents within Cloud SOAR. Here are some use cases:

* Creating an incident <br/>When an incident is created, a conversation channel will automatically be created within your Slack workspace, where the channel name will be formed like this: **incident-incident_id**. Furthermore, all users (owners, investigators, groups) who are part of the workspace will be added to the channel.<br/><img src={useBaseUrl('img/cloud-soar/created-incident-fs.png')} alt="Created incident" style={{border: '1px solid gray'}} width="800"/><br/><img src={useBaseUrl('img/cloud-soar/created-slack-channel.png')} alt="Created Slack channel" style={{border: '1px solid gray'}} width="800"/>
* Adding / removing users from the incident <br/>When users (owners, investigators, groups) are added or removed from the incident, they will be managed in the same way within the channel in the workspace.
* Close / delete an incident <br/>When an incident is closed / deleted, the related channel in the workspace will automatically be archived as well.<br/><img src={useBaseUrl('img/cloud-soar/archived-slack-channel.png')} alt="Archived Slack channel" style={{border: '1px solid gray'}} width="400"/>
* Viewing channel history from the **War room** section <br/>Within the war room section of an incident, it will be possible to view the history of a Slack channel.<br/><img src={useBaseUrl('img/cloud-soar/war-room-chat-section.png')} alt="Slack message in the war room" style={{border: '1px solid gray'}} width="800"/>
