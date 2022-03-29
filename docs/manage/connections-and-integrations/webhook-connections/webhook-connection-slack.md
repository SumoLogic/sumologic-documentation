---
id: webhook-connection-for-slack
---

# Webhook Connection for Slack

You can send an alert from Sumo Logic as an HTTP POST request to a Slack
channel. Learn more about Slack requirements for Webhooks in
their [API Help](https://api.slack.com/incoming-webhooks).

[Webhook
connections](Set_Up_Webhook_Connections.md "Set Up Webhook Connections") rely
on HTTP endpoints that tell Sumo Logic where to send data. You can set
up any number of connections.

Once you set up the webhook connection you'll have the option to use
it in a [Scheduled
Search](Schedule-Searches-for-Webhook-Connections.md "Schedule Searches for Webhook Connections") or [Monitor](../../../Visualizations-and-Alerts/Alerts/Monitors.md "Monitors").

### Configure a Webhook connection for Slack

You need the ********Manage connections******** [role
capability](../../Users-and-Roles/Manage-Roles/05-Role-Capabilities.md "Role Capabilities") to
create webhook connections.

1.  Go to **Manage Data \> Monitoring�\> Connections**.
2.  On the **Connections** page click **Add**.
3.  Click **Slack**.
4.  In the **Create Connection** dialog, enter the **Name** of the Connection.
5.  (Optional**)** Enter a **Description** for the Connection.
6.  Enter the **URL** for the endpoint. (Check [Slack API Help](https://api.slack.com/incoming-webhooks) for more information.)
7.  (Optional) Enter an **Authorization Header**, which may include an authorization token.
8.  (Optional) ****Custom Headers****, enter up to five comma separated key-value pairs.
9.  Under **Payload**, enter a JSON object in the format required by Slack. For details on variables that can be used as parameters within your JSON object, see [Webhook Payload Variables](Set_Up_Webhook_Connections.md "Set Up Webhook Connections"). 
10. Click **Save**.

Details on how to format your payload message are available in Slack's
documentation, [Basic message
formatting](https://api.slack.com/docs/message-formatting "https://api.slack.com/docs/message-formatting").

Slack offers a [Message
Builder](https://api.slack.com/docs/messages/builder "https://api.slack.com/docs/messages/builder")
where you can build and test your JSON payload.

### Examples

These examples are provided as a reference on Slack's supported Webhook
payloads. Refer to Slack for further details on what their service
supports and how to build payloads.

#### Send Scheduled Search results

Here is an example JSON payload to send most of the available Webhook
variables including `ResultsJson`.
 {     "text": "Sumo Logic Alert: *{{Name}}*",     "attachments": [{         "fields": [{                 "title": "Description",                 "value": "{{Description}}"             },             {                 "title": "Query",                 "value": \<{{QueryUrl}}|{{Query}\>"             },             {                 "title": "Time Range",                 "value": "{{TimeRange}}"             },             {                 "title": "FieldName",                 "value": "{{ResultsJson.fieldname}}"             },             {                 "title": "Results",                 "value": "{{ResultsJson}}"             }         ],         "mrkdwn_in": ["text", "pretext"],         "color": "#29A1E6"     }] }

#### Post to Slack with CURL

Assume that you use the following CURL command to post to Slack.

`curl -X POST --data-urlencode 'payload={"channel": "#mychannel", "username": "webhookuser", "text": "This is posted to #mychannel and comes from a bot named webhookbot.", "icon_emoji": ":ghost:"}' https://hooks.slack.com/services/A12...AqlwV1fJ0oiGpk`

The underlined portion is the token that is needed for the Slack
configuration. Variables must follow JSON Object format. Here is an
example JSON payload send Sumo Logic variables with Slack's ***text***
parameter:
 { "text": "{{Name}} ran over {{TriggerTimeRange}} at {{TriggerTime}}", "username": "Sumo Logic Alert" }

Here is an example JSON payload using Slack's ***attachments***
parameter:
 {      "attachments": [          {              "pretext": "Sumo Logic Alert: *{{Name}}*",              "fields": [                  {                      "title": "Description",                      "value": "{{Description}}"                  },                  {                      "title": "Query",                      "value": \<{{QueryUrl}}|{{Query}\>"                  },                  {                      "title": "Time Range",                      "value": "{{TriggerTimeRange}}"                  }              ],              "mrkdwn_in": ["text", "pretext"],              "color": "#29A1E6"          }      ]  }

### Create an alert

Once you set up the webhook connection you'll have the option to use
it in a [Scheduled
Search](Schedule-Searches-for-Webhook-Connections.md "Schedule Searches for Webhook Connections") or [Monitor](../../../Visualizations-and-Alerts/Alerts/Monitors.md "Monitors").
