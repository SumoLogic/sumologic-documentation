---
id: create-cse-actions
title: Create Cloud SIEM Actions
sidebar_label: Create Cloud SIEM Actions
description: You can use Cloud SIEM Actions to issue notifications to another service when certain events occur in Cloud SIEM.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

This topic has instructions for configuring Cloud SIEM Actions.

:::caution
Cloud SIEM Actions are deprecated. Use the Automation Service instead for actions. See [Migrate from legacy actions and enrichments to the Automation Service](/docs/cse/automation-service/automation-service-automations#migrate-from-legacy-actions-and-enrichments-to-the-automation-service).
:::

## About Cloud SIEM Actions

You can use Cloud SIEM Actions to issue a notification to another service when certain events occur in Cloud SIEM. The supported Action types are:

* AWS Simple Notification Service (SNS)
* Demisto (Corex XSOAR)
* Email
* HTTP POST v2
* HipChat
* Microsoft Teams
* PagerDuty
* Recorded Future
* Slack
* Slack Webhook

An Action can be configured for Insight-related activity as described below in [Insight Actions](#insight-actions). You can also configure an Action to be run when a rule is automatically disabled, as described below in [Rule Actions](#rule-actions).

Watch this micro lesson to learn how to configure an Action.

<Iframe url="https://www.youtube.com/embed/uHY-r04edn0?rel=0"
        width="854px"
        height="480px"
        id="myId"
        className="video-container"
        display="initial"
        position="relative"
        allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        />

import Iframe from 'react-iframe'; 


## Insight Actions

You can configure an Action to send information about an Insight to another system, automatically when the Insight is created or on-demand from the Insight's **Actions** menu, and in the case of an HTTP POST v2 Action, when an Insight is closed.

What gets sent to the target system depends on the Action type. For some types—Slack, HipChat, Microsoft Teams, and PagerDuty—the notification contains a summary of the Insight with the following information:

* The Entity the Insight fired on.
* The [MITRE tactic](https://attack.mitre.org/) or tactics that form a portion of the Insight ID, which indicates which stage of the MITRE framework the Insight relates to. In the example below, the “Initial Access” tactic is shown.
* A link to the Insight in Cloud SIEM. <br/><img src={useBaseUrl('img/cse/received-email.png')} alt="Received email.png" width="600" />

For the other Action types—AWS Simple Notification Service (SNS), Demisto (Corex XSOAR), HTTP POST v2, and Slack Webhook—the notification includes the Insight itself in JSON format, and in some cases Signals or Records, depending on how you configure the Action.

## Sensor Actions
You can configure an Action to send a notification when any Network Sensor goes offline.

## Rule Actions

You can configure an Action to send a notification when a rule is automatically disabled. (Cloud SIEM automatically disables rules that generate too many Signals, more than 100K in an hour, or 1 million in 24 hours.)

:::note
A Rule Action doesn't fire when a rule is enabled, moved in or out of prototype mode, or manually disabled.
:::

The notification sent by a Rule Action contains the name of the rule and the reason it was disabled.

## Create an Action

1. Click the gear icon near the top of the Cloud SIEM UI and select **Actions** under **Integrations**. <br/><img src={useBaseUrl('img/cse/gear-menu-actions.png')} alt="Actions menu" width="600" />
1. On the **Actions** page, click **Create**.
1. The **Create Action** popup appears. <br/><img src={useBaseUrl('img/cse/create-action-empty.png')} alt="Create Action dialog" width="500" />
1. **Name**. Enter a name that communicates what the Action does.
1. **Type**. Choose one of the following options, and follow the instructions for that Action type to complete creating your Action.
    * [AWS Simple Notification Service](#aws-simple-notification-service-sns)
    * [Demisto](#demistocorex-xsoar)
    * [Email](#email)
    * [HTTP POST v2](#http-post-v2)
    * [HipChat](#hipchat)
    * [Microsoft Teams](#microsoft-teams)
    * [PagerDuty](#pagerduty)
    * [Recorded Future](#recorded-future)
    * [Slack](#slack)
    * [Slack Webhook](#slack-webhook)
1. **Notifications**. 
    * **Insight**. Click **When Created** to automatically generate a notification when any Insight is created, **When Closed** to automatically generate a notification when any Insight is closed, or **On Demand** to add the Action as an option in the **Actions** menu on the Insight details page. 
    * **Sensor**. Click **When Offline** to to automatically generate notifications when any sensor goes offline.
    * **Rule**. Click **When Automatically Disabled** to generate a notification when Cloud SIEM disables a rule.
1. **Active**. Move the slider to the right if you’d like the Action to be enabled upon creation.

### AWS Simple Notification Service (SNS)

When you run this Action type for an Insight, Cloud SIEM sends the full Insight in JSON format to SNS.

You can configure the action to authenticate with SNS using your AWS Access Key and Secret Access Key, or using the **AssumeRole** method.

1. **Access Key**. Enter your AWS Access Key, if you're using AWS Access Keys to authenticate.
1. **Secret Key**. Enter your AWS Secret Access Key, if you're using AWS Access Keys to authenticate.
1. **Assume Role ARN**. Enter the AssumeRole ARN, if that's how you want to authenticate. Enter the Sumo Logic AWS account ID. For the Sumo Logic ID, see [Create a role manually using the AWS console](/docs/send-data/hosted-collectors/amazon-aws/grant-access-aws-product#create-a-role-manually-using-the-aws-console).
1. **Topic ARN**. Enter the ARN of the SNS topic.
1. **Region**. Enter the AWS region for the SNS topic. 
1. Click **Create**.  <br/><img src={useBaseUrl('img/cse/sns.png')} alt="AWS simple notification service action" width="500" />

### Demisto (Corex XSOAR)

When you run this Action type for an Insight, Cloud SIEM sends the full Insight in JSON format to Demisto.

1. **API Key**. Enter your Demisto API Key.
1. **URL**. Enter the URL of your Demisto API endpoint.
1. **Client Certificate**. Upload your client certificate for accessing the Demisto API endpoint.
1. **Create Incident API Endpoint**. Select `/incident/json`.
1. **Extra Headers**. Enter any additional headers you want to send, as line-delimited key:value pairs.
1. **Exclude Records**. Move the slider to the right if you don’t want to include Records in the notification.
1. Click **Create**. <br/><img src={useBaseUrl('img/cse/demisto-action.png')} alt="Demisto action.png" width="500" />

### Email

This Action type sends an email notification.

1. **Recipients**. Enter a comma-separated list of the email addresses to send the notification to.
1. Click **Create**.  <br/><img src={useBaseUrl('img/cse/email-action.png')} alt="Email notification action.png" width="500" />

When this Action runs on an Insight, the email notification contains:

* The Entity the Insight fired on.
* The [MITRE tactic](https://attack.mitre.org/) or tactics that form a portion of the Insight ID, which indicates which stage of the MITRE framework the Insight relates to.
* A link to the Insight in Cloud SIEM.

### HTTP POST v2

This Action type sends a HTTP POST notification. For an Insight Action, the notification contains the full Insight in JSON format. You can optionally configure the Action to send the Signals and Records associated with the Insight as well.

The output of the HTTP POST notification is the same as the JSON output from the `/insight/:id` API endpoint. For information about accessing API documentation, see [Cloud SIEM APIs](/docs/cse/administration/cse-apis/).

Once you select HTTP POST v2  in the Type field a new **Notification** option—**When Closed**—appears, as highlighted in the screenshot below. Choose this if you want to send a notification when an Insight is closed
in Cloud SIEM.

1. **URL**. The URL to send the POST to.
   :::note
   The allowed destination ports for the HTTP Post are: *80*, *8080*, *443*, *8443*, and *8000*. You can specify the port in the URL, but if the default port on the destination server is an allowable port, you don't need to.
   :::
1. **Username**. The username to use to access the URL.
1. **Password**. The password to use to access the URL.
1. **Extra Headers**. Additional HTTP headers to send with the POST.
1. **Include Signals**. Move the slider to the right to send the Signals associated with the Insight in the POST. 
1. **Include Records**. Move the slider to the right to send the Records associated with the Signal in the POST. 
1. **Record Fields to Include**. If desired, provide a comma-delimited list of selected Record fields to include (instead of all Record fields).
1. Click **Create**. <br/><img src={useBaseUrl('img/cse/http-post-v2.png')} alt="HTTP Post V2 action" width="500" />

### HipChat

This Action type sends a message to a HipChat room.

1. **API Key**. Enter your HipChat API key.
1. **Room**. Enter the HipChat room to send the notification to. 
1. Click **Create**.  <br/><img src={useBaseUrl('img/cse/hipchat.png')} alt="HipChat action" width="500" />

When this Action type is run on an Insight, the message contains:

* The Entity the Insight fired on.
* The [MITRE tactic](https://attack.mitre.org/) or tactics that form a portion of the Insight ID, which indicates which stage of the MITRE framework the Insight relates to. 
* A link to the Insight in Cloud SIEM.

### Microsoft Teams

This Action type sends a Webhook notification to Microsoft Teams.

#### Configure Webhook connection in Microsoft Teams

Create a Webhook connection for the Microsoft Teams channel to which emails should be sent. Follow the instructions in [Create Incoming Webhooks](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook) in Microsoft help.

#### Configure Action in Cloud SIEM

1. **URL**. Enter the URL for the Webhook connection you created
    above. 
1. Click **Create**. <br/><img src={useBaseUrl('img/cse/microsoft-teams.png')} alt="Microsoft Teams action" width="500" />

### PagerDuty

This Action types sends a notification to PagerDuty.

1. **Service Key**. Enter your PagerDuty service key.
1. **Subdomain**. Enter your PagerDuty account subdomain.
1. Click **Create**. <br/><img src={useBaseUrl('img/cse/pagerduty.png')} alt="PagerDuty action" width="500" />

The notification contains:

* The Entity the Insight fired on.
* The [MITRE tactic](https://attack.mitre.org/) or tactics that form a portion of the Insight ID, which indicates which stage of the MITRE framework the Insight relates to. 
* A link to the Insight in Cloud SIEM.

### Recorded Future

Recorded Future (RF) provides contextual Threat Intelligence through indicator lookups using a cloud-accessible API.

The Cloud SIEM Recorded Future Action runs lookups on Record fields that contain IP addresses, domains, and hashes encountered in Insights, Signals, or both, depending on how you configure the Action. The lookup result is added as an enrichment to Insights, Signals, or both. 

Lookups will consume RF API credits.

#### Generate Recorded Future API token

1. In Recorded Future, go to **User Settings > API Access > Generate New API Token**.
1. On the **Generate New Token** page:
    1. **Name**. Enter a name for the token. 
    1. **Integration**. Select “Sumologic” from the list of integrations.
1. Click **Generate**.  <br/><img src={useBaseUrl('img/cse/rf-api-token.png')} alt="Recorded Future API token" width="400" />
1. Copy and save the token.

#### Create Action in Cloud SIEM

1. **API Key**. Enter the Recorded Future API token you generated for the Sumo Logic integration. 
1. **Enrich Insights**. Move the slider to the right to enrich Insights.
1. **Enrich Signals of Insights**. Move the slider to the right to enrich Signals.
1. Click **Create**.<br/><img src={useBaseUrl('img/cse/recorded-future.png')} alt="Recorded Future action" width="500" />

####  View Recorded Future Enrichments

To view an Enrichment that’s been added to an Insight or Signal, navigate to the item and select the **Enrichments** tab.

<img src={useBaseUrl('img/cse/rf-enrichments.png')} alt="Recorded Future enrichments" width="600" />

### Slack

This Action type sends a message to a Slack channel.

1. **API Key**. Enter your Slack API key.
1. **Channel**. Enter the Slack Channel that messages should go to.
1. Click **Create**.  <br/><img src={useBaseUrl('img/cse/slack.png')} alt="Slack action" width="500" />

If the Action was run on an Insight, the message contains:

* The Entity the Insight fired on.
* The [MITRE tactic](https://attack.mitre.org/) or tactics that form a portion of the Insight ID, which indicates which stage of the MITRE framework the Insight relates to. 
* A link to the Insight in Cloud SIEM.

### Slack Webhook

When you run this Action type on an Insight, Cloud SIEM sends the complete Insight in JSON format to a Slack channel.

#### Configure Webhook connection in Slack

Create a Webhook connection for the Slack channel to which Insights should be sent. Follow the instructions in [Sending messages using Incoming Webhooks](https://api.slack.com/messaging/webhooks) in Slack help.

#### Configure Action in Cloud SIEM

1. **Webhook URL**. Enter the URL of the Webhook you created above.
1. Click **Create**.  <br/><img src={useBaseUrl('img/cse/slack-webhook.png')} alt="Slack webhook action" width="500" />
