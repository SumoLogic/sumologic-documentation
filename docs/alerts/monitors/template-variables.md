---
id: template-variables
title: Template Variables
sidebar_label: Template Variables
description: Monitor notifications support variables allowing you to customize alerts with the information you need.
---

This document outlines the variables you can use as parameters in the JSON payload object of your notifications. Variables are replaced with values from the monitor and must be enclosed by double curly brackets. For example, in your JSON payload, if you specified `{{Name}}` it would be replaced with the actual name of the monitor in the delivered payload.

Template variables allow you to customize your notification payload. We have built in template variables that allow you to reference specific configurations of your monitor. For example, Trigger Condition and Monitor Name, within your custom notification payload.

:::note
Unresolved variables are given empty quotes `""` as a value.
:::

## Built in Template Variables for monitors

You can use the following variables when specifying the notification
payload for log or metric monitors.

| Variable | Description |
|--|--|
|  `{{Name}}` | The name of the monitor. In the delivered payload, this variable is replaced with the Name you assigned to the monitor when you created it. |
|  `{{Description}}` | The description of the monitor. In the delivered payload, this variable is replaced with the Description you assigned to the monitor when you created it. |
| `{{MonitorType}}` | The type of monitor, either Logs or Metrics. |
|  `{{Query}}` | The query used to run the monitor. In the delivered payload, this variable is replaced by your log or metric query. |
| `{{QueryURL}}` | The URL link to the search or metrics query. In the delivered payload, this is a URL that you can click to run the saved search or metric query. |
| `{{ResultsJson}}` | JSON object containing the query results that triggered the alert. |
| `{{NumQueryResults}}`  | The number of results the query returned. |
| `{{Id}}` | The identifier of the triggered alert. |
| `{{DetectionMethod}}`  | The condition that triggered the alert. For example, above 90 at least once in the last 5 minutes. |
| `{{TriggerType}}` | The status of the monitor, either Normal, Critical, Warning, or Missing Data. |
| `{{TriggerTimeRange}}` | The time range that triggered the monitor to send the notification. In the delivered payload, this variable will be replaced by the time range for the log or metric query. |
| `{{TriggerTime}}` | The start time of the log or metric query that triggered the notification. |
| `{{TriggerCondition}}` | The condition that triggered the alert. |
| `{{TriggerValue}}` | The value of the trigger condition. |
| `{{TriggerTimeStart}}` | When the trigger condition was met. |
| `{{TriggerTimeEnd}}` | When the trigger condition was resolved. |

## Examples

### Slack payload

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

### PagerDuty payload

```json
{
    "service_key": "xxxxx",
    "event_type": "trigger",
    "description": "Monitor Alert on {{Name}}",
    "client": "Sumo Logic",
    "details": {
        "name": "{{Name}}",
        "query": "<{{QueryURL}}|{{Query}}>",
        "time": "{{TriggerTimeRange}} -- {{TriggerTime}} --"
    }
}
```

### Email message

```
Monitor Alert: {{TriggerTimeRange}} on {{Name}}
```
