---
id: create-cse-actions
title: Create Cloud SIEM Actions
sidebar_label: Create Cloud SIEM Actions
description: You can use Cloud SIEM actions to issue notifications to another service when certain events occur in Cloud SIEM.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has instructions for configuring Cloud SIEM actions.

:::warning
In the future, Cloud SIEM actions will be deprecated because comparable behavior is available in the Automation Service. Although Cloud SIEM actions are still supported, we recommend you use the Automation Service to perform actions. For more information, see [Migrate from legacy actions and enrichments to the Automation Service](/docs/cse/automation/automations-in-cloud-siem/#migrate-from-legacy-actions-and-enrichments-to-the-automation-service).
:::

## About Cloud SIEM actions

You can use Cloud SIEM actions to issue a notification to another service when certain events occur in Cloud SIEM. The supported action types are:

* AWS Simple Notification Service (SNS)
* Demisto (Cortex XSOAR)
* Email
* HTTP POST v2
* Microsoft Teams
* PagerDuty
* Recorded Future
* Slack
* Slack webhook

An action can be configured for insight-related activity as described below in [Insight actions](#insight-actions). You can also configure an action to be run when a rule is automatically disabled, as described below in [Rule actions](#rule-actions).

Watch this micro lesson to learn how to configure an action.

<Iframe url="https://www.youtube.com/embed/uHY-r04edn0?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

import Iframe from 'react-iframe'; 


## Insight actions

You can configure an action to send information about an insight to another system, automatically when the insight is created or on-demand from the insight's **Actions** menu, and in the case of an HTTP POST v2 action, when an insight is closed.

What gets sent to the target system depends on the action type. For some types—Slack, Microsoft Teams, and PagerDuty—the notification contains a summary of the insight with the following information:

* The entity the insight fired on.
* The [MITRE tactic](https://attack.mitre.org/) or tactics that form a portion of the insight ID, which indicates which stage of the MITRE framework the insight relates to. 
* A link to the insight in Cloud SIEM. 

For the other action types—AWS Simple Notification Service (SNS), Demisto (Cortex XSOAR), HTTP POST v2, and Slack webhook—the notification includes the insight itself in JSON format, and in some cases signals or records, depending on how you configure the action.

## Sensor actions
You can configure an action to send a notification when any Network Sensor goes offline.

## Rule actions

You can configure an action to send a notification when a rule is automatically disabled. (Cloud SIEM automatically disables rules that generate too many signals, more than 100K in an hour, or 1 million in 24 hours.)

:::note
A rule action doesn't fire when a rule is enabled, moved in or out of prototype mode, or manually disabled.
:::

The notification sent by a rule action contains the name of the rule and the reason it was disabled.

## Create an action

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the top menu select **Configuration**, and then under **Integrations** select **Actions**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Cloud SIEM Integrations** select **Actions**. You can also click the **Go To...** menu at the top of the screen and select **Actions**. 
1. On the **Actions** tab, click **+ Add Action**.
1. The **Add Action** popup appears. <br/><img src={useBaseUrl('img/cse/create-action-empty.png')} alt="Create action dialog" style={{border: '1px solid gray'}} width="400" />
1. **Name**. Enter a name that communicates what the action does.
1. **Action Type**. Choose one of the following options, and follow the instructions for that action type to complete creating your action.
    * [AWS Simple Notification Service](#aws-simple-notification-service-sns)
    * [Demisto](#demistocortex-xsoar)
    * [Email](#email)
    * [HTTP POST v2](#http-post-v2)
    * [Microsoft Teams](#microsoft-teams)
    * [PagerDuty](#pagerduty)
    * [Recorded Future](#recorded-future)
    * [Slack](#slack)
    * [Slack Webhook](#slack-webhook)
1. **Notifications**. 
    * **Insight**. Click **When Created** to automatically generate a notification when any insight is created, **When Closed** to automatically generate a notification when any insight is closed, or **On Demand** to add the Action as an option in the **Actions** menu on the insight details page. 
    * **Sensor**. Click **When Offline** to to automatically generate notifications when any sensor goes offline.
    * **Rule**. Click **When Automatically Disabled** to generate a notification when Cloud SIEM disables a rule.
1. **Active**. Move the slider to the right if you’d like the Action to be enabled upon creation.

Continue filling out the dialog box depending on the type of action you are creating.

### AWS Simple Notification Service (SNS)

When you run this action type for an insight, Cloud SIEM sends the full insight in JSON format to the AWS Simple Notification Service (SNS).

You can configure the action to authenticate with SNS using your AWS Access Key and Secret Access Key, or using the **AssumeRole** method.

1. **Access Key**. Enter your AWS Access Key, if you're using AWS Access Keys to authenticate.
1. **Secret Key**. Enter your AWS Secret Access Key, if you're using AWS Access Keys to authenticate.
1. **Assume Role ARN**. Enter the AssumeRole ARN, if that's how you want to authenticate. Enter the Sumo Logic AWS account ID. For the Sumo Logic ID, see [Create a role manually using the AWS console](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product#create-a-role-manually-using-the-aws-console).
1. **Topic ARN**. Enter the ARN of the SNS topic.
1. **Region**. Enter the AWS region for the SNS topic. 
1. Click **Create**.  

### Demisto (Cortex XSOAR)

When you run this action type for an insight, Cloud SIEM sends the full insight in JSON format to Demisto.

1. **API Key**. Enter your Demisto API Key.
1. **URL**. Enter the URL of your Demisto API endpoint.
1. **Client Certificate**. Upload your client certificate for accessing the Demisto API endpoint.
1. **Create Incident API Endpoint**. Select `/incident/json`.
1. **Extra Headers**. Enter any additional headers you want to send, as line-delimited key:value pairs.
1. **Exclude Records**. Move the slider to the right if you don’t want to include records in the notification.
1. Click **Create**. 

### Email

This action type sends an email notification.

1. **Recipients**. Enter a comma-separated list of the email addresses to send the notification to.
1. Click **Create**. 

When this action runs on an insight, the email notification contains:

* The entity the insight fired on.
* The [MITRE tactic](https://attack.mitre.org/) or tactics that form a portion of the insight ID, which indicates which stage of the MITRE framework the insight relates to.
* A link to the insight in Cloud SIEM.

### HTTP POST v2

This action type sends a HTTP POST notification. For an insight action, the notification contains the full insight in JSON format. You can optionally configure the action to send the signals and records associated with the insight as well.

The output of the HTTP POST notification is the same as the JSON output from the `/insight/:id` API endpoint. For information about accessing API documentation, see [Cloud SIEM APIs](/docs/cse/administration/cse-apis/).

Once you select HTTP POST v2  in the Type field a new **Notification** option—**When Closed**—appears, as highlighted in the screenshot below. Choose this if you want to send a notification when an insight is closed
in Cloud SIEM.

1. **URL**. The URL to send the POST to.
   :::note
   The allowed destination ports for the HTTP Post are: *80*, *8080*, *443*, *8443*, and *8000*. You can specify the port in the URL, but if the default port on the destination server is an allowable port, you do not need to.
   :::
1. **Username**. The username to use to access the URL.
1. **Password**. The password to use to access the URL.
1. **Extra Headers**. Additional HTTP headers to send with the POST.
1. **Include Signals**. Move the slider to the right to send the signals associated with the insight in the POST. 
1. **Include Records**. Move the slider to the right to send the records associated with the signal in the POST. 
1. **Record Fields to Include**. If desired, provide a comma-delimited list of selected record fields to include (instead of all record fields).
1. Click **Create**. 

### Microsoft Teams

This action type sends a webhook notification to Microsoft Teams.

#### Configure webhook connection in Microsoft Teams

Create a webhook connection for the Microsoft Teams channel to which emails should be sent. Follow the instructions in [Create Incoming Webhooks](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook) in Microsoft help.

#### Configure action in Cloud SIEM

1. **URL**. Enter the URL for the webhook connection you created above. 
1. Click **Create**. 

### PagerDuty

This action types sends a notification to PagerDuty.

1. **Service Key**. Enter your PagerDuty service key.
1. **Subdomain**. Enter your PagerDuty account subdomain.
1. Click **Create**. 

The notification contains:

* The entity the insight fired on.
* The [MITRE tactic](https://attack.mitre.org/) or tactics that form a portion of the insight ID, which indicates which stage of the MITRE framework the insight relates to. 
* A link to the insight in Cloud SIEM.

### Recorded Future

Recorded Future (RF) provides contextual Threat Intelligence through indicator lookups using a cloud-accessible API.

The Cloud SIEM Recorded Future action runs lookups on record fields that contain IP addresses, domains, and hashes encountered in insights, signals, or both, depending on how you configure the action. The lookup result is added as an enrichment to insights, signals, or both. 

Lookups will consume RF API credits.

#### Generate Recorded Future API token

1. In Recorded Future, go to **User Settings > API Access > Generate New API Token**.
1. On the **Generate New Token** page:
    1. **Name**. Enter a name for the token. 
    1. **Integration**. Select “Sumologic” from the list of integrations.
1. Click **Generate**.
1. Copy and save the token.

#### Create action in Cloud SIEM

1. **API Key**. Enter the Recorded Future API token you generated for the Sumo Logic integration. 
1. **Enrich Insights**. Move the slider to the right to enrich insights.
1. **Enrich Signals of Insights**. Move the slider to the right to enrich signals.
1. Click **Create**.

####  View Recorded Future Enrichments

To view an Enrichment that’s been added to an insight or signal, navigate to the item and select the [**Enrichments**](/docs/cse/integrations/enrichments-and-indicators/#enrichments) tab.

### Slack

This action type sends a message to a Slack channel.

1. **API Key**. Enter your Slack API key.
1. **Channel**. Enter the Slack Channel that messages should go to.
1. Click **Create**.

If the action was run on an insight, the message contains:

* The entity the insight fired on.
* The [MITRE tactic](https://attack.mitre.org/) or tactics that form a portion of the insight ID, which indicates which stage of the MITRE framework the insight relates to. 
* A link to the insight in Cloud SIEM.

### Slack webhook

When you run this action type on an insight, Cloud SIEM sends the complete insight in JSON format to a Slack channel.

#### Configure webhook connection in Slack

Create a webhook connection for the Slack channel to which insights should be sent. Follow the instructions in [Sending messages using Incoming Webhooks](https://api.slack.com/messaging/webhooks) in Slack help.

#### Configure action in Cloud SIEM

1. **Webhook URL**. Enter the URL of the webhook you created above.
1. Click **Create**.
