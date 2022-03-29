---
id: set-up-webhook-connections
---

# Set Up Webhook Connections

### About Webhooks

A Webhook is an HTTP callback: an HTTP POST that occurs when something
happens. Webhook connections allow you to send Sumo Logic alerts to
third-party applications that accept incoming webhooks.

For example, once you set up a webhook connection in Sumo Logic and
create a scheduled search, you can send an alert from that scheduled
search as a post to a Slack channel, or integrate with third-party
systems. In addition to an alert, you can include a link directly to a
search and even a few search results (depending on the third party tool
you're connecting to). There is no limit to the number of webhooks you
can send from Sumo Logic, but your third party might impose
restrictions. In addition, the payload of a webhook may be restricted by
Sumo or the third party.

Along with a fully customizable webhook connection, you can quickly
create webhooks for:

* [AWS Lambda](Webhook_Connection_for_AWS_Lambda.md "Webhook Connection for AWS Lambda")
* [Azure Functions](Webhook_Connection_for_Microsoft_Azure_Functions.md "Webhook Connection for Microsoft Azure Functions")
* [Datadog](Webhook_Connection_for_Datadog.md "Webhook Connection for Datadog")
* [HipChat](Webhook_Connection_for_HipChat.md "Webhook Connection for HipChat")
* [Jira](Webhook_Connections_for_Jira.md "Webhook Connections for Jira")
* [Microsoft Teams](Webhook_Connection_for_Microsoft_Teams.md "Webhook Connection for Microsoft Teams")
* [New Relic](Webhook_Connection_for_New_Relic.md "Webhook Connection for New Relic")
* [Opsgenie](Webhook_Connection_for_Opsgenie.md "Webhook Connection for Opsgenie")
* [PagerDuty](Webhook_Connection_for_PagerDuty.md "Webhook Connection for PagerDuty")
* [Service Now](../ServiceNow/Set-Up-ServiceNow-Connections.md "Set Up ServiceNow Connections")
* [Slack](Webhook_Connection_for_Slack.md "Webhook Connection for Slack")

Most services with a REST API should allow you to create a connection
using the generic webhook.

If a scheduled search fails or times out, no data will be sent via
webhook. In this case, you won’t see any notifications in the app you’ve
configured to receive data.

### Setting up webhook connections

To configure a webhook connection, you must have a Sumo role that grants
you the ****Manage connections**** capability.

The first step in integrating webhooks with Sumo Logic is to configure
one or more connections, which are HTTP endpoints that tell Sumo Logic
where to send data. You can set up any number of connections, depending
on your organization's needs.

**To set up a webhook connection**

1.  Go to **Manage Data�\> Monitoring \> Connections**.
2.  On the **Connections** page click the ********+******** button on the top right of the table.
3.  Click **Webhook**.
4.  In the **Create Connection** dialog, enter the **Name** of the connection.
5.  (Optional) Enter a **Description** for the connection.
6.  Enter the **URL** for the endpoint. This is generated from the remote system’s API. Only HTTPS (port 443) and HTTP (port 80) URLs are supported. 
7.  (Optional) If the third-party system requires an **Authorization Header**, enter it here. For more information, see [Example Authorization Header](./Set_Up_Webhook_Connections.md "About Webhook Connections") below.
8.  (Optional) **Custom Headers**, enter up to five comma separated key-value pairs.
9.  For **Payload**, enter a JSON object in the format required by the target webhook URL. For details on variables that can be used as parameters within your JSON object, see [webhook payload variables](./Set_Up_Webhook_Connections.md "Set Up Webhook Connections"), below.      When using a generic webhook connection for notifications in a [Monitor](../../../Visualizations-and-Alerts/Alerts/Monitors.md "Monitors") you can distinguish between an alert and a recovery by using the [alert variable](../../../Visualizations-and-Alerts/Alerts/Alert_Variables.md "Alert Variables") `TriggerType`. An alert will have a value of either `Critical` , `Warning`, or `Missing ``Data`. Recovery will have either `CriticalResolved`, `WarningResolved`, or `Missing Data Resolved`. The same payload for both alerts and recovery is used.

Variables are escaped according to the JSON standard, meaning that they
can be used in application JSON. 

1.  Click **Save**.
2.  When you're ready, create a [scheduled search](Schedule-Searches-for-Webhook-Connections.md "Schedule Searches for Webhook Connections") to send alerts to this connection.

### Webhook payload variables
\<div class="mt-contentreuse-widget"
page="Visualizations-and-Alerts/Alerts/Alert_Variables" section=""
show="false\>
\</di\>

### Example Authorization Header

Use HTTP Basic Authentication, this is a standard used across the world
wide web, Sumo Logic doesn't require anything different or special. The
username and password are concatenated, base64-encoded, and passed in
the `Authorization` HTTP header. The Authorization field is constructed
as follows:

* Combine the username and password with a single colon.
* Encode using the [RFC2045-MIME](https://www.ietf.org/rfc/rfc2045.txt "https://www.ietf.org/rfc/rfc2045.txt") variant of Base64. You can use any encoder, including the [base64](../../../05Search/Search-Query-Language/Search-Operators/base64Encode.md "base64Encode") search operator to do this.
* The authorization method and a space, i.e. "Basic " is then put before the encoded string.

For example, if the user agent uses `Aladdin` as the username and
`OpenSesame` as the password then the field could be formed with a
simple bash command as follows:
 echo -n "Aladdin:OpenSesame" | base64

The `-n` ensures that an extra new line is not encoded.

yielding a string 'QWxhZGRpbjpPcGVuU2VzYW1l' that is used like this:
 Authorization: Basic QWxhZGRpbjpPcGVuU2VzYW1l

So in the **Authentication Header** field, you would enter: 
 Basic QWxhZGRpbjpPcGVuU2VzYW1l

### Example payloads 

**Flat JSON**

This example payload is flat JSON. 
 {      "text": "{{Name}} ran over {{TimeRange}} at {{FireTime}}",      "results": "{{ResultsJson}}",      "num": "{{NumQueryResults}}" }

**Hierarchical JSON**

This example payload is hierarchical JSON. 
 { "event_type": "trigger",     "description": "{{Description}}",     "client": "Sumo Logic",     "client_url": "{{SearchQueryUrl}}",     "details": {         "name: {{Name}}, time: {{TimeRange}}--{{FireTime}}, num: {{NumQueryResults}}, results: {{ResultsJson}}"     } }

### Example payload fields

All variables must be enclosed in quotes to be interpreted as valid
JSON. 

You can validate your JSON at sites like
[jsonlint.com](http://jsonlint.com "http://jsonlint.com").

For this example message,
 {    "thread": "conciergePartitioner-1",    "user_id": "",    "user_name": "",    "web_session": "",    "Message": "2015-10-27 10:31:15,853 -0700 INFO Partitioned 0 tokens, 2 targets into 773 assignments" }

the following is the payload configuration. Notice that
`RawResultsJson `is enclosed in quotes.
 {    "channel": "ops",    "text": "{{ResultsJson}}" }

The following valid JSON is sent in the payload of the POST request.
 {"channel": "ops", "text": "{\"thread\":\"conciergePartitioner-1\",\"user\_id\":\"\",\"user\_name\":\"\",\"web\_session\":\"\",\"Message\":\"2015-10-27 10:31:15,853 -0700 INFO Partitioned 0 tokens, 2 targets into 773 assignments\"}

### Testing a connection

After configuring the connection, click the **Test Connection** button
at the bottom left of the **Payload** area. If the connection is made,
you will see a 200 OK response message.

This test does not use the same static IP addresses that send
notifications, it uses different temporary IP addresses.

![test connection
button.png](../../static/img/Connections-and-Integrations/Webhook-Connections/Set_Up_Webhook_Connections/test%20connection%20button.png)

If the connection is successful, you'll see a message appearing in the
third-party tool. This won't contain any information from the scheduled
search, it will just have the text in the payload.

### Editing or deleting connections

If a connection is changed, all scheduled searches that link to the
connection are changed moving forward. No changes are made to previous
searches.

If a connection is deleted, the searches sent to those connections are
not deleted. To delete these searches, use the Library.
