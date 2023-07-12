---
id: set-up-webhook-connections
title: Set Up Webhook Connections
sidebar_label: Setup and Configuration
description: Webhook connections allow you to send Sumo Logic alerts to third-party applications.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

A Webhook is an HTTP callback, which is an HTTP POST that occurs when something happens. Webhook connections allow you to send Sumo Logic alerts to third-party applications that accept incoming webhooks.

For example, once you set up a webhook connection in Sumo Logic and create a scheduled search, you can send an alert from that scheduled
search as a post to a Slack channel, or integrate with third-party systems. In addition to an alert, you can include a link directly to a search and even a few search results (depending on the third party tool you're connecting to). There is no limit to the number of webhooks you can send from Sumo Logic, but your third party might impose restrictions. In addition, the payload of a webhook may be restricted by Sumo or the third party.

Along with a fully customizable webhook connection, you can quickly create webhooks for:

* [AWS Lambda](aws-lambda.md)
* [Azure Functions](microsoft-azure-functions.md)
* [Datadog](datadog.md)
* [HipChat](hipchat.md)
* [Jira](jira-cloud.md)
* [Microsoft Teams](microsoft-teams.md)
* [New Relic](new-relic.md)
* [Opsgenie](opsgenie.md)
* [PagerDuty](pagerduty.md)
* [Service Now](/docs/alerts/webhook-connections/servicenow/set-up-connections)
* [Slack](slack.md)

Most services with a REST API should allow you to create a connection using the generic webhook.

:::important
If a scheduled search fails or times out, no data will be sent via webhook. In this case, you won’t see any notifications in the app you’ve configured to receive data.
:::

## Set up a webhook connection

:::note
To configure a webhook connection, you must have a Sumo role that grants you the **Manage connections** capability.
:::

The first step in integrating webhooks with Sumo Logic is to configure one or more connections, which are HTTP endpoints that tell Sumo Logic where to send data. You can set up any number of connections, depending on your organization's needs.

To set up a webhook connection:

1. Go to **Manage Data** > **Monitoring** > **Connections**.
1. On the **Connections** page click the **+** button on the top right of the table.
1. Click **Webhook**.
1. In the **Create Connection** dialog, enter the **Name** of the connection.
1. (Optional) Enter a **Description** for the connection.
1. Enter the **URL** for the endpoint. This is generated from the remote system’s API.
    :::important
    Only HTTPS (`port 443`) and HTTP (`port 80`) URLs are supported. 
    :::
1. (Optional) If the third-party system requires an **Authorization Header**, enter it here. For more information, see [Example Authorization Header](#example-authorization-header) below.
1. (Optional) **Custom Headers**, enter up to five comma separated key-value pairs.
1. (Optional) Under **Alert Payload**, which allows you to customize how the alert notification will look, enter a JSON object in the format required by the target endpoint. For details on variables that can be used as parameters within your JSON object, see [webhook payload variables](#configure-webhook-payload-variables), below. <br/><img src={useBaseUrl('img/connection-and-integration/alert-payload.png')} alt="recovery payload" />
    :::note
    Variables are escaped according to the JSON standard, meaning that they can be used in application JSON. 
    :::
    You can test your customized alert payload by clicking **Test Alert Payload**, which will fire a sample webhook call to the given endpoint.
1. (Optional) Under **Recovery Payload**, which allows you to customize how the recovery notification will look, enter a JSON object in the format required by the target webhook URL.<br/><img src={useBaseUrl('img/connection-and-integration/recovery-payload.png')} alt="recovery payload" /><br/>Example:<br/><img src={useBaseUrl('img/connection-and-integration/recovery-payload-example.png')} alt="recovery payload" /><br/>Clicking **Test Alert + Recovery Payload** will test your recovery alert payload by firing a sample webhook call to the given endpoint.
1. Click **Save**.
1. When you're ready, create a [scheduled search](schedule-searches-webhook-connections.md) to send alerts to this connection.

## Configure Webhook payload variables

Variables are used as parameters in the JSON payload object of your alert notifications. These variables are used to dynamically populate specific values from the alert configuration in the notification payload. It includes things like the TriggerType that gives the current monitor status in the notification. When a notification is sent variables are replaced with values from the alert. For example, if you specified `{{Name}}` in your JSON payload, it would be replaced with the actual name of the alert in the delivered payload.

:::note
Variables must be enclosed by double curly brackets.
:::

### Common variables for alerts
You can use variables to customize your notification payload from Monitors and Scheduled Searches. The table below shows a list of variables along with information on which area of the product these are supported. We have also provided a brief description of each of the variables.

:::note
All variables are case-insensitive.
:::

| Variable | Description | Monitors | Scheduled Searches |
| :-- | :-- | :-- | :--|
| `{{Name}}` | The name of the alert. In the delivered payload, this variable is replaced with the Name you assigned to the alert when you created it. | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| `{{Description}}` | The description of the alert. | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| `{{MonitorType}}` | The type of alert, either `Logs` or `Metrics`. | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| `{{Query}}` | The query used to run the alert. | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| `{{QueryURL}}` | The URL to the logs or metrics query within Sumo Logic. | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| `{{ResultsJson}}` | JSON object containing the query results that triggered the alert. A maximum of 200 aggregate results or 10 raw messages for this field can be sent via webhook. | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png)<br/><br/>Not available with Email notifications |
| `{{ResultsJson.fieldName}}` | The value of the specified field name. For example, this payload specification:<br/>`{{ResultsJson.client_ip}} had {{ResultsJson.errors}} errors`<br/><br/>Results in a subject line like this:<br/>`70.69.152.165 had 391 errors`<br/><br/>A maximum of 200 aggregate results or 10 raw messages for this field can be sent via webhook.<br/><br/>A field name must match (case-insensitive) the field from your search and must be alphanumeric characters, underscores, and spaces. If you have a field name that has an unsupported character use the as operator to rename it.<br/><br/>You can return a specific result by providing an array index value in bracket notation. Such as, `{{ResultsJson.fieldName}}[0]` to return the first result.<br/><br/>**Reserved Fields**<br/>The following are reserved field names. They are generated by Sumo Logic during collection or search operations.<ul><li>_raw</li><li>Message</li><li>_messagetime</li><li>Time</li><li>_sourcehost</li><li>Host</li><li>_sourcecategory</li><li>Category</li><li>_sourcename</li><li>Name</li><li>_collector</li><li>Collector</li><li>_timeslice</li><li>_signature</li></ul> | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| `{{NumQueryResults}}` | The number of results the query returned. Results can be raw messages, time-series, or aggregates.<br/><br/>An aggregate query returns the number of aggregate results; displayed in the Aggregates tab of the Search page.<br/><br/>A non-aggregate query returns the number of raw results; displayed in the Messages tab of the Search page. | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| `{{Id}}` | The unique identifier of the monitor or search that triggered the alert. For example, `00000000000468D5`. | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| `{{DetectionMethod}}` | This is the type of Detection Method used to detect alerts. Values are based on static or outlier triggers and data type, either logs or metrics. The value will be either `LogsStaticCondition`, `MetricsStaticCondition`, `LogsOutlierCondition`, `MetricsOutlierCondition`,  `LogsMissingDataCondition`, `MetricsMissingDataCondition`, or `StaticCondition` (deprecated). | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| `{{TriggerType}}` | The status of the alert or recovery. Alert will have either `Normal`, `Critical`, `Warning`, or `Missing Data`.
Recovery will have either `ResolvedCritical`, `ResolvedWarning`, or `ResolvedMissingData`. | ![check](/img/reuse/check.png) | ![check](/img/reuse/x.png) |
| `{{TriggerTimeRange}}` | The time range of the query that triggered the alert. For example:<br/>`07/13/2021 03:21:32 PM UTC to 07/13/2021 03:36:32 PM UTC` | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| `{{TriggerTime}}` | The time the monitor was triggered. For example:<br/>`07/13/2021 03:38:30 PM UTC.` | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| `{{TriggerCondition}}` | The condition that triggered the alert. For example:<br/>`Greater than or equal to 1.0 in the last 15 minutes` | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| `{{TriggerValue}}` | The value that triggered the alert. | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| `{{TriggerTimeStart}}` | The start time of the time range that triggered the monitor in Unix format. For example, `1626189692042`. | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| `{{TriggerTimeEnd}}` | The end time of the time range that triggered the monitor in Unix format. For example, `1626190592042`. | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| `{{SourceURL}}` | The URL to the configuration or status page of the monitor in Sumo Logic. | ![check](/img/reuse/check.png) | ![check](/img/reuse/x.png) |
| `{{AlertResponseUrl}}` | When your Monitor is triggered it will generate a URL and provide it as the value of this variable where you can use it to open Alert Response. | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |


<details><summary>Legacy variables</summary>

This section provides the old variables available for alert notifications from Metrics Monitors and Scheduled Searches. The following table shows where the old variables are supported.

:::tip
We recommend using the new common variables instead of these legacy variables, which will be deprecated.
:::

| Variable | Description | Metrics Monitors | Scheduled Searches |
| :-- | :-- | :-- | :--|
| ` {{SearchName}}` |  | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| `{{SearchDescription}}` | Description of the saved search or Monitor. In the delivered payload, this variable is replaced with the Name you assigned to the search or Monitor when you created it. | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| `{{SearchQuery}}` | The query used to run the saved search. In the delivered payload, this variable is replaced by your saved search query or metric query. | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| `{{SearchQueryUrl}}` | The URL to the search or metrics query. In the delivered payload, this is a URL that you can click to run the saved logs or metric query. | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| `{{TimeRange}}` | The time range that triggered the alert. | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| `{{FireTime}}` | The start time of the log search or metric query that triggered the notification. | ![check](/img/reuse/check.png) | ![check](/img/reuse/check.png) |
| `{{AggregateResultsJson}}` | JSON object containing search aggregation results. A maximum of 200 aggregate results can be sent via webhook. | ![check](/img/reuse/x.png) | ![check](/img/reuse/check.png)<br/>Not available with Email notifications |
| `{{RawResultsJson}}` | JSON object containing raw messages. A maximum of 10 raw messages can be sent via webhook. | ![check](/img/reuse/x.png) | ![check](/img/reuse/check.png)<br/>Not available with Email notifications |
| `{{NumRawResults}}` | Number of results returned by the search. | ![check](/img/reuse/x.png) | ![check](/img/reuse/check.png) |
| `{{Results.fieldname}}` | The value returned from the search result for the specified field. For example, this payload specification:<br/>`{{Results.client_ip}} had {{Results.errors}} errors`<br/><br/>Results in a subject line like this:<br/>`70.69.152.165 had 391 errors`<br/><br/>A maximum of 200 aggregate results or 10 raw messages for this field can be sent via webhook.<br/>A field name must match (case-insensitive) the field from your search and must be alphanumeric characters, underscores, and spaces. If you have a field name that has an unsupported character use the as operator to rename it. | ![check](/img/reuse/x.png) | ![check](/img/reuse/check.png) |
| `{{AlertThreshold}}` | The condition that triggered the alert (for example, above 90 at least once in the last 5 minutes) | ![check](/img/reuse/check.png) | ![check](/img/reuse/x.png) |
| `{{AlertSource}}` | The metric and sourceHost that triggered the alert, including associated tags for that metric. | ![check](/img/reuse/check.png) | ![check](/img/reuse/x.png) |
| `{{AlertSource.fieldname}}` | The value returned from the AlertSource object for the specified field name. | ![check](/img/reuse/check.png) | ![check](/img/reuse/x.png) |
| `{{AlertID}}` | The ID of the triggered alert. | ![check](/img/reuse/check.png) | ![check](/img/reuse/x.png) |
| `The ID of the triggered alert.` | Current status of the time series that triggered (for example, Critical or Warning). | ![check](/img/reuse/check.png) | ![check](/img/reuse/x.png) |
| `{{AlertCondition}}` | The condition that triggered the alert. | ![check](/img/reuse/x.png) | ![check](/img/reuse/x.png) |

</details>



### Example payloads

#### Slack payload

```json
{
     "attachments": [
         {
             "pretext": "Sumo Logic Alert for: *{{Name}}* by user USERNAME",
             "fields": [
                 {
                     "title": "Description",
                     "value": "{{Description}} {{TriggerTimeStart}}"
                 },
                 {
                     "title": "Query",
                     "value": "<{{QueryURL}}|{{Query}}>"
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

#### PagerDuty payload

```json
{
    "service_key": "xxxxx",
    "event_type": "trigger",
    "description": "Monitor Alert on {{Name}}",
    "client": "Sumo Logic",
    "details": {
        "name": "{{Name}}",
        "query": "<{{QueryURL}} | {{Query}}>",
        "time": "{{TriggerTimeRange}} -- {{TriggerTime}} --"
    }
}
```

#### Email message

```
Monitor Alert: {{TriggerTimeRange}} on {{Name}}
```



#### Flat JSON

This example payload is flat JSON. 

```json
{
    "text": "{{Name}} ran over {{TimeRange}} at {{FireTime}}",
    "results": "{{ResultsJson}}",
     "num": "{{NumQueryResults}}"
}
```

#### Hierarchical JSON

This example payload is hierarchical JSON. 

```json
{ "event_type": "trigger",
    "description": "{{Description}}",
    "client": "Sumo Logic",
    "client_url": "{{SearchQueryUrl}}",
    "details": {
        "name: {{Name}}, time: {{TimeRange}}--{{FireTime}}, num: {{NumQueryResults}}, results: {{ResultsJson}}"
    }
}
```

### Example payload fields

All variables must be enclosed in quotes to be interpreted as valid JSON. 

:::note
You can validate your JSON at sites like [jsonlint.com](http://jsonlint.com).
:::

For the following example message:

```json
{
   "thread": "conciergePartitioner-1",
   "user_id": "",
   "user_name": "",
   "web_session": "",
   "Message": "2015-10-27 10:31:15,853 -0700 INFO Partitioned 0 tokens, 2 targets into 773 assignments"
}
```

the following is the payload configuration. Notice that `RawResultsJson` is enclosed in quotes.

```json
{
   "channel": "ops",
   "text": "{{ResultsJson}}"
}
```

The following valid JSON is sent in the payload of the POST request.

```
{"channel": "ops", "text": "{\"thread\":\"conciergePartitioner-1\",\"user_id\":\"\",\"user_name\":\"\",\"web_session\":\"\",\"Message\":\"2015-10-27 10:31:15,853 -0700 INFO Partitioned 0 tokens, 2 targets into 773 assignments\"}
```

### Example authorization header

Use HTTP Basic Authentication, this is a standard used across the world wide web, Sumo Logic doesn't require anything different or special. The username and password are concatenated, base64-encoded, and passed in the `Authorization` HTTP header. The Authorization field is constructed as follows:

* Combine the username and password with a single colon.
* Encode using the [RFC2045-MIME](https://www.ietf.org/rfc/rfc2045.txt) variant of Base64. You can use any encoder, including the [base64](/docs/search/search-query-language/search-operators/base64encode) search operator to do this.
* The authorization method and a space, such as "Basic " is then put before the encoded string.

For example, if the user agent uses `Aladdin` as the username and `OpenSesame` as the password then the field could be formed with a
simple bash command as follows:
```bash
echo -n "Aladdin:OpenSesame" | base64
```

:::tip
The `-n` ensures that an extra new line is not encoded.
:::

yielding a string 'QWxhZGRpbjpPcGVuU2VzYW1l' that is used like this:
```
Authorization: Basic QWxhZGRpbjpPcGVuU2VzYW1l
```

So in the **Authentication Header** field, you would enter: 
```
Basic QWxhZGRpbjpPcGVuU2VzYW1l
```

## Test a connection

After configuring the connection, click the **Test Connection** button at the bottom left of the **Payload** area. If the connection is made, you will see a 200 OK response message.

This test does not use the same static IP addresses that send notifications, it uses different temporary IP addresses.

![test connection button.png](/img/connection-and-integration/test-connection-button.png)

If the connection is successful, you'll see a message appearing in the third-party tool. This won't contain any information from the scheduled search, it will just have the text in the payload.

## Editing and deleting connections

If a connection is changed, all scheduled searches that link to the connection are changed moving forward. No changes are made to previous searches.

If a connection is deleted, the searches sent to those connections are not deleted. To delete these searches, use the Library.
