---
id: slack
title: Webhook Connection for Slack
sidebar_label: Slack
description: Webhook Connections allow you to send alerts as a post to a Slack channel.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/saas-cloud/slack.png')} alt="Thumbnail icon" width="50"/>

You can send an alert from Sumo Logic as an HTTP POST request to a Slack channel. Learn more about Slack requirements for Webhooks in their [API Help](https://api.slack.com/incoming-webhooks).

[Webhook connections](set-up-webhook-connections.md) rely on HTTP endpoints that tell Sumo Logic where to send data. You can set up any number of connections.

Once you set up the webhook connection, you'll have the option to use it in a [Scheduled Search](schedule-searches-webhook-connections.md) or [Monitor](/docs/alerts/monitors).

## Configure a Webhook connection for Slack

You need the **Manage connections** [role capability](/docs/manage/users-roles/roles/role-capabilities.md) to create webhook connections.

1. Go to **Manage Data** > **Monitoring** > **Connections**.
1. On the **Connections** page click **Add**.
1. Click **Slack**.
1. In the **Create Connection** dialog, enter the **Name** of the Connection.
1. (Optional) Enter a **Description** for the Connection.
1. Enter the **URL** for the endpoint. See [Slack API Help](https://api.slack.com/incoming-webhooks) for more information.
1. (Optional) **Custom Headers**, enter up to five comma separated key-value pairs.
1. Under **Alert Payload**, which allows you to customize how the alert notification look in Slack, enter a JSON object in the format required by Slack. For details on variables that can be used as parameters within your JSON object, see [Webhook Payload Variables](set-up-webhook-connections.md). 
1. Under **Recovery Payload**, which allows you to customize how the recovery notification look in Slack, enter a JSON object in the format required by Slack. 
1. Click **Save**.

Details on how to format your payload message are available in Slack's documentation, [Basic message formatting](https://api.slack.com/docs/message-formatting).

Slack offers a [Message Builder](https://api.slack.com/docs/messages/builder) where you can build and test your JSON payload.

## Examples

These examples are provided as a reference on Slack's supported Webhook payloads. Refer to Slack for further details on what their service supports and how to build payloads.

### Send Scheduled Search results

Here is an example JSON payload to send most of the available Webhook variables including `ResultsJson`.

```json
{
    "text": "Sumo Logic Alert: *{{Name}}*",
    "attachments": [{
        "fields": [{
                "title": "Description",
                "value": "{{Description}}"
            },
            {
                "title": "Query",
                "value": "<{{QueryUrl}}|{{Query}}>"
            },
            {
                "title": "Time Range",
                "value": "{{TimeRange}}"
            },
            {
                "title": "FieldName",
                "value": "{{ResultsJson.fieldname}}"
            },
            {
                "title": "Results",
                "value": "{{ResultsJson}}"
            }
        ],
        "mrkdwn_in": ["text", "pretext"],
        "color": "#29A1E6"
    }]
}
```

### Post to Slack with CURL

Assume that you use the following CURL command to post to Slack.

```bash
curl -X POST --data-urlencode 'payload={"channel": "#mychannel", "username": "webhookuser", "text": "This is posted to #mychannel and comes from a bot named webhookbot.", "icon_emoji": ":ghost:"}' https://hooks.slack.com/services/A12...AqlwV1fJ0oiGpk
```

The underlined portion is the token that is needed for the Slack configuration. Variables must follow JSON Object format. Here is an example JSON payload send Sumo Logic variables with Slack's **text** parameter:

```json
{
"text": "{{Name}} ran over {{TriggerTimeRange}} at {{TriggerTime}}",
"username": "Sumo Logic Alert"
}
```

Here is an example JSON payload using Slack's **attachments** parameter:

```json
{
     "attachments": [
         {
             "pretext": "Sumo Logic Alert: *{{Name}}*",
             "fields": [
                 {
                     "title": "Description",
                     "value": "{{Description}}"
                 },
                 {
                     "title": "Query",
                     "value": "<{{QueryUrl}}|{{Query}}>"
                 },
                 {
                     "title": "Time Range",
                     "value": "{{TriggerTimeRange}}"
                 }
             ],
             "mrkdwn_in": ["text", "pretext"],
             "color": "#29A1E6"
         }
     ]
 }
```

## Create an alert

Once you set up the webhook connection, you'll have the option to use it in a [Scheduled Search](schedule-searches-webhook-connections.md) or [Monitor](/docs/alerts/monitors).
