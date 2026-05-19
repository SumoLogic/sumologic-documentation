---
id: overview
title: Monitors Overview
sidebar_label: Overview
description: Learn how Sumo Logic monitors continuously query your logs or metrics and sends notifications when specific events occur, such as critical, warning, and missing data.
keywords:
  - monitors
  - log-monitoring
  - metric-monitoring
  - alert-notification
  - threshold-alert
  - anomaly-detection
  - missing-dataalert
  - monitor-limits
head: 
  - tagName: script
    attributes:
      type: application/ld+json
    innerHTML: |
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a Sumo Logic monitor?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A Sumo Logic monitor continuously queries logs or metrics data and sends a notification when a defined condition is met — such as an error count exceeding a threshold, a metric spiking above a baseline, or log data stopping entirely."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between a monitor and a scheduled search in Sumo Logic?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A monitor evaluates data continuously — from every few seconds to every few minutes — and fires in real time when a condition is breached. A scheduled search runs at a fixed interval such as hourly or daily and sends a report of results. Use monitors for real-time alerting and scheduled searches for periodic reporting."
            }
          },
          {
            "@type": "Question",
            "name": "How many monitors can a Sumo Logic account have?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Enterprise and Trial accounts can have up to 1,000 log monitors and 1,500 metric monitors. Essentials and Professional accounts can have up to 300 log monitors and 500 metric monitors. Free Trial accounts can have up to 50 of each."
            }
          },
          {
            "@type": "Question",
            "name": "What permissions are needed to create a Sumo Logic monitor?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Manage Monitors role capability is required to create or edit monitors. The View Monitors capability is required to view them. Permissions can also be set at the folder level."
            }
          },
          {
            "@type": "Question",
            "name": "When does a Sumo Logic monitor auto-resolve?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A monitor resolves automatically when the recovery condition is met for the entire duration of the detection window. For example, if a monitor triggered at 1:00 PM with a 15-minute detection window, the earliest it can resolve is 1:15 PM. After one day without new data, the incident is automatically expired and marked resolved."
            }
          },
          {
            "@type": "Question",
            "name": "What are the limitations of Sumo Logic monitors?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Monitors do not support Receipt Time, LogReduce, LogCompare, Save to Index, Save to Lookup, or Search Templates. An aggregate metric monitor can evaluate up to 15,000 time series and a non-aggregate metric monitor up to 3,000. A log monitor query can be up to 15,000 characters. Email notifications support up to 100 recipients."
            }
          },
          {
            "@type": "Question",
            "name": "What happens when a monitor is muted in Sumo Logic?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A muted monitor continues to evaluate data and generate alerts, but notifications are suppressed for the duration of the mute. Use muting schedules to silence notifications during planned maintenance without disabling the monitor."
            }
          }
        ]
      }
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

A Sumo Logic monitor continuously queries logs or metrics and send notifications when noteworthy changes happen in your production applications.

:::note
To understand when to use a monitor versus a scheduled search, refer to [Monitors vs. Scheduled Searches](/docs/alerts/difference-from-scheduled-searches/).
:::

## What permissions are required to use monitors?

The **Manage Monitors** role capability is required to create, edit, or delete monitors. The **View Monitors** capability is required to view them. [Learn more](/docs/alerts/monitors/settings/#monitor-folder-permissions) about controlling permissions at the monitor or folder level.

## How often does a monitor evaluate data?

Evaluation frequency depends on the underlying query, the operators used, and the detection window. This frequency can range from a few seconds to several minutes. 

The shorter the detection window, the more frequently the monitor runs:

- A **15-minute** detection window evaluates every few seconds.
- A **24-hour** detection window evaluates every few minutes.

See [Trigger Type (Logs)](/docs/alerts/monitors/create-monitor/#trigger-type-logs) and [Trigger Type (Metrics)](/docs/alerts/monitors/create-monitor/#trigger-type-metrics) for the full evaluation schedule by window size.

## What are the rules specific to log monitors?

* Log monitors use the [role search filter](/docs/manage/users-roles/roles/construct-search-filter-for-role) of their creator.
* Log monitors delay execution by two minutes. This means it won't evaluate data from the current time, but evaluate data from two minutes ago. This ensures that any delays in ingestion are factored in and won't generate false positive or false negative alerts.
* Enterprise and Trial plan customers can have up to 1,000 log monitors.
* Essentials and Professional plan customers can have up to 300 log monitors.
* Free Trial customers can have up to 50 log monitors.

### How do log monitors auto-resolve?

Log monitors in a triggered state can auto-resolve.

- **Static Fields** log monitors will trigger/resolve based on the value of a field returned by their search. If no data is returned by the query, then chart data is not ingested. If it has been a full detection window or more since a trigger condition was matched, then no data results in the monitor/group getting resolved.
- **Missing Data** monitors will auto-resolve if they have not seen any data for the last 24 consecutive hours.
  - Non-grouped monitors will trigger again after auto-resolving if there is still no data.
  - Grouped monitors will be removed and no longer considered after being auto-resolved, unless data for this group is seen again.

## What are the rules specific to metric monitors?

* Metrics monitors delay execution by one minute.
* Enterprise and Trial plan customers can have up to 1,500 Metrics monitors.
* Essentials and Professional plan customers can have up to 500 Metrics monitors.
* Free Trial customers can have up to 50 Metrics monitors.

## How do monitor notifications work?

Notifications are optional and available for both **alert** and **recovery** states for each trigger condition you specify, **critical**, **warning**, and **missing**.

### How do alerts behave when multiple trigger types fire?

* Monitor evaluation for each trigger type (Critical, Warning or Missing Data) happens independently. Each trigger type's lifecycle is managed separately and doesn't have any impact on other trigger types. So it is possible for a monitor to be in Critical and Warning state at the same time. Monitor goes back to normal when it is not in either of Critical, Warning and Missing Data states.
* When both Critical and Warning conditions are met, two separate alerts and notifications are generated - one for the Critical condition and one for the Warning condition. Auto-resolution, if set up, will work according to the resolution condition for each case. 
* Metric monitors have the option to group notifications. When configured, the Monitor will not trigger new notifications until the first one is resolved. The Monitor will only update if the notification type supports auto-resolution. Grouped notifications will resolve when all the time series return to normal.
* Log monitors always group notifications.

### How does alert recovery and auto-resolution work?

* Recovery is based on the detection window, which is either the time range or the number of data points of the trigger condition. An alert is recovered (resolved) when the recovery condition is met for the entire duration of the detection window.
   * For example, if an alert is triggered at 1:00 PM and the detection window is 15 minutes, the earliest the alert would recover is after 1:15 PM since the entire detection window must pass. This is to ensure there isn't an alert between the triggered and resolved state, especially for metrics that are volatile.
* Auto-resolution is supported with email, Lambda, Microsoft Teams, OpsGenie, PagerDuty, Slack, and generic webhook connections.
* **Recovery Payload** customization is supported for Slack, Microsoft Teams, AWS Lambda, Azure Functions, generic webhooks, PagerDuty, OpsGenie, and ServiceNow.
* For the rest of our Connections, you can customize the **Alert Payload**, but not the **Recovery Payload**. What you enter for the **Alert Payload** will be used for both alerts and recovery.
* The recovery notification is sent to the same channel where the corresponding Alert notifications were sent. In other words, you cannot have different channels where you receive alert and recovery notifications for a given trigger condition.
* After one day without new data to an incident, the system automatically expires it. The incident is marked as resolved with the resolution set to **Expired**.

## What are the monitor status values?

| Status | Meaning |
|:--|:--|
| **Normal** | No trigger conditions are met; data is actively monitored. |
| **Critical** | The critical threshold condition is met. |
| **Warning** | The warning threshold condition is met. |
| **Missing Data** | No data was returned within the detection window. |

A monitor returns to Normal when none of the Critical, Warning, or Missing Data conditions are met.

## Where can monitors be managed programmatically?

- **Terraform**. Use the [`sumologic_monitor`](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/monitor) and [`sumologic_monitor_folder`](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/monitor_folder) resources.
- **API**. Use the [Monitor Management API](/docs/api/monitors-management/).

## What does muting a monitor do?

Muting a monitor suppresses notifications for the duration of the mute schedule, but the monitor continues to evaluate data and generate alerts internally. Use
[Muting Schedules](/docs/alerts/monitors/muting-schedules/) to silence notifications during planned maintenance windows without disabling the monitor entirely.

## What are the key terms used in monitors?

| Term | Definition |
|:--|:--|
| **Detection method** | _Static_, _Dynamic_, _Anomaly_, or _Outlier_ defines how the monitor identifies a trigger condition. |
| **Disable** | The monitor is in a disabled state when monitors are not processed by the backend, only their definition is persisted in the database. |
| **Incident** | Created when a trigger condition is met. |
| **Monitor** | A _Monitor_ creates an _Alert_. Using the options below, you're subscribing to an _Alert's Monitor_. <br/>The monitor is the object that you configure within Sumo Logic that:<ul><li>Checks for specific events of interest against a data source, based on your specified conditions. Events of interest are used in a general sense to denote an event that may be of interest to you.</li><li>Notifies you about the event-of-interest based on your preferences.</li></ul> |
| **Monitor type** | The underlying data stream, either logs or metrics, on which the monitor is created. |
| **Mute** | When a monitor is in a mute state, it continues to process your data stream as expected where alerts are still generated. However, notifications are suppressed based on your mute condition. See also: [Muting Schedules](/docs/alerts/monitors/muting-schedules). |
| **Resolve** | The process of closing an incident. |
| **Status** | The state of the monitor can be one of the following: Normal, Critical, Warning, or Missing Data.| 
| **Template** | The section that describes the actual connection attributes. |
| **Threshold** | The static condition which when met an incident is triggered by a monitor. |
| **Trigger (state)** | The state when an alert condition has been met, and an incident has been created as a result. |
| **Trigger type** | Type of alert/trigger condition defined Critical/Warning/Missing Data. |
| **Alert variables** | Custom variables used inside the Action Payload. |

## What are the limitations of monitors?

The following features and operators are **not supported** in monitors:

- [Receipt Time](/docs/search/get-started-with-search/build-search/use-receipt-time/)
- [LogReduce](/docs/search/behavior-insights/logreduce/logreduce-operator/) and [LogCompare](/docs/search/behavior-insights/logcompare/)
- [Save to Index](/docs/alerts/scheduled-searches/save-to-index/) and [Save to Lookup](/docs/alerts/scheduled-searches/save-to-lookup/)
- [Search templates](/docs/search/get-started-with-search/build-search/search-templates/)
- [`timeshift` metrics operator](/docs/metrics/metrics-operators/timeshift/)
- [Hidden Metrics queries](/docs/metrics/metrics-queries/metrics-explorer/) are not persist across edit sessions.
- **Numeric limits:**
  | Limit | Value |
  |:--|:--|
  | Log monitor query length | 15,000 characters |
  | Metric monitor queries | Up to 6 per monitor |
  | Aggregate metric monitor time series | 15,000 |
  | Non-aggregate metric monitor time series | 3,000 |
  | Email notification recipients | 100 |
  | Time range precision | Last millisecond excluded, a range of 6:15 to 6:30 PM runs as 6:15:00.000–6:29:59.999 |
- Monitors only support the [Continuous data tier](/docs/manage/partitions/data-tiers/).

## FAQs

### What is a Sumo Logic monitor?

A monitor continuously queries logs or metrics data and sends a notification when a defined condition is met, such as an error count exceeding a threshold, a metric spiking above a baseline, or log data stopping entirely.

### What is the difference between a monitor and a scheduled search?

A monitor evaluates data continuously every few seconds to every few minutes and fires in real time when a condition is breached. A scheduled search runs at a fixed interval such as hourly or daily and sends a report of results. Use monitors for real-time alerting and scheduled searches for periodic reporting.

### How many monitors can a Sumo Logic account have?

Enterprise and Trial accounts support up to 1,000 log monitors and 1,500 metric monitors. Essentials and Professional accounts support up to 300 log monitors and 500 metric monitors. Free Trial accounts support up to 50 of each type.

### What permissions are needed to create a monitor?

The **Manage Monitors** role capability is required to create or edit monitors. The **View Monitors** capability is required to view them. Permissions can also be set at the folder level.

### When does a Sumo Logic monitor auto-resolve?

A monitor resolves automatically when the recovery condition is met for the entire duration of the detection window. For example, a monitor that triggered at 1:00 PM with a 15-minute window can resolve no earlier than 1:15 PM. Incidents without new data for 24 hours are automatically expired and marked resolved.

### What are the limitations of Sumo Logic monitors?

Monitors do not support Receipt Time, LogReduce, LogCompare, Save to Index, Save to Lookup, or Search Templates. An aggregate metric monitor evaluates up to 15,000 time series; a non-aggregate metric monitor evaluates up to 3,000. Log monitor queries are limited to 15,000 characters. Email notifications support up to 100 recipients.

### What happens when a monitor is muted?

A muted monitor continues to evaluate data and generate alerts internally, but notifications are suppressed for the duration of the mute. Use muting schedules to silence notifications during planned maintenance without disabling the monitor.