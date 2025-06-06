---
id: overview
title: Monitors Overview
sidebar_label: Overview
description: Sumo Logic monitors continuously query your logs or metrics and sends notifications when specific events occur, such as critical, warning, and missing data.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

Monitors track your metrics and logs data in real time and send notifications when noteworthy changes happen in your production applications.

:::note
Learn how [monitors differ from Scheduled Searches](/docs/alerts/difference-from-scheduled-searches).
:::

## Prerequisites

To manage and/or view monitors, you'll need the **Manage** and **View Monitors** [role capabilities](/docs/manage/users-roles/roles/role-capabilities). [Learn more](/docs/alerts/monitors/settings/#monitor-folder-permissions) about controlling permissions at the monitor or folder level.

## Rules

The frequency at which a monitor executes depends on various factors, such as the underlying query, the operators used, and the detection window. This frequency can range from a few seconds to several minutes.

For example, if the detection window of your alert is 24 hours, it will be evaluated every few minutes. Conversely, if the detection window of the monitor is 15 minutes, it will be evaluated every few seconds.

See [Trigger Type (Logs)](/docs/alerts/monitors/create-monitor/#trigger-type-logs) and [Trigger Type (Metrics)](/docs/alerts/monitors/create-monitor/#trigger-type-metrics) for more information.

### Log monitors

* Log monitors use the [role search filter](/docs/manage/users-roles/roles/construct-search-filter-for-role) of their creator.
* Log monitors delay execution by two minutes. This means it won't evaluate data from the current time, but evaluate data from two minutes ago. This ensures that any delays in ingestion are factored in and won't generate false positive or false negative alerts.
* Enterprise and Trial plan customers can have up to 1,000 log monitors.
* Essentials and Professional plan customers can have up to 300 log monitors.
* Free Trial customers can have up to 50 log monitors.

#### Auto-resolving notifications

Log monitors in a triggered state can auto-resolve.

- **Static Fields** log monitors will trigger/resolve based on the value of a field returned by their search. If no data is returned by the query, then chart data is not ingested. If it has been a full detection window or more since a trigger condition was matched, then no data results in the monitor/group getting resolved.
- **Missing Data** monitors will auto-resolve if they have not seen any data for the last 24 consecutive hours.
  - Non-grouped monitors will trigger again after auto-resolving if there is still no data.
  - Grouped monitors will be removed and no longer considered after being auto-resolved, unless data for this group is seen again.

### Metrics monitors

* Metrics monitors delay execution by one minute.
* Enterprise and Trial plan customers can have up to 1,500 Metrics monitors.
* Essentials and Professional plan customers can have up to 500 Metrics monitors.
* Free Trial customers can have up to 50 log monitors.

## Notifications

Notifications are optional and available as an **alert** and **recovery** for each trigger condition you specify, **critical**, **warning**, and **missing**.

### Alerts

* Monitor evaluation for each trigger type (Critical, Warning or Missing Data) happens independently. Each trigger type's lifecycle is managed separately and doesn't have any impact on other trigger types. So it is possible for a monitor to be in Critical and Warning state at the same time. Monitor goes back to normal when it is not in either of Critical, Warning and Missing Data states.
* When both Critical and Warning conditions are met, two separate alerts and notifications are generated - one for the Critical condition and one for the Warning condition. Auto-resolution, if set up, will work according to the resolution condition for each case. 
* Metric monitors have the option to group notifications. When configured, the Monitor will not trigger new notifications until the first one is resolved. The Monitor will only update if the notification type supports auto-resolution. Grouped notifications will resolve when all the time series return to normal.
* Log monitors always group notifications.

### Recovery

* Recovery is based on the detection window, which is either the time range or the number of data points of the trigger condition. An alert is recovered (resolved) when the recovery condition is met for the entire duration of the detection window.
   * For example, if an alert is triggered at 1:00 PM and the detection window is 15 minutes, the earliest the alert would recover is after 1:15 PM since the entire detection window must pass. This is to ensure there isn't an alert between the triggered and resolved state, especially for metrics that are volatile.
* Auto-resolution is supported with email, Lambda, Microsoft Teams, OpsGenie, PagerDuty, Slack, and generic webhook connections.
* **Recovery Payload** customization is supported for Slack, Microsoft Teams, AWS Lambda, Azure Functions, generic webhooks, PagerDuty, OpsGenie, and ServiceNow.
* For the rest of our Connections, you can customize the **Alert Payload**, but not the **Recovery Payload**. What you enter for the **Alert Payload** will be used for both alerts and recovery.
* The recovery notification is sent to the same channel where the corresponding Alert notifications were sent. In other words, you cannot have different channels where you receive alert and recovery notifications for a given trigger condition.
* After one day without new data to an incident, the system automatically expires it. The incident is marked as resolved with the resolution set to **Expired**.

## Tools

* [Monitor resource in Terraform](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/monitor) 
* [Monitor Management API](/docs/api/monitors-management)


## Terminology

Here are the technical terms used in monitors.

### Detection method  
This can be _Static_, _Dynamic_, _Anomaly_, or _Outlier_.

### Disable
The monitor is in a disabled state when monitors are not processed by the backend, only their definition is persisted in the database.

### Incident  
When a specific alerting condition is met, as defined on the monitor, an incident is triggered.

### Monitor  

A _Monitor_ creates an _Alert_. Using the options below, you're subscribing to an _Alert's Monitor_.

The monitor is the object that you configure within Sumo Logic that:
  * Checks for specific events of interest against a data source, based on your specified conditions. Events of interest are used in a general sense to denote an event that may be of interest to you.
  * Notifies you about the event-of-interest based on your preferences.

### Monitor type  
The underlying data stream, either logs or metrics, on which the monitor is created.

### Mute  
When a monitor is in a mute state, it continues to process your data stream as expected where alerts are still generated. However, notifications are suppressed based on your mute condition. See also: [Muting Schedules](/docs/alerts/monitors/muting-schedules).

### Resolve  
The process of closing an incident.

### Status  
The state of the monitor can be one of the following: Normal, Critical, Warning, or Missing Data.

### Template  
The section that describes the actual connection attributes.

### Threshold  
The static condition which when met an incident is triggered by a monitor.

### Trigger (state)  
The state when an alert condition has been met, and an incident has been created as a result.

### Trigger type  
Type of alert/trigger condition defined Critical/Warning/Missing Data.

### Alert variables  
Custom variables used inside the Action Payload.


## Limitations

### General

* [Receipt Time](../../search/get-started-with-search/build-search/use-receipt-time.md) is not supported.
* [LogReduce](/docs/search/behavior-insights/logreduce/logreduce-operator) / [LogCompare](/docs/search/behavior-insights/logcompare) operators are not supported in monitors. If your query contains these operators, you will not be able to create the monitor.  
* Monitors only support the [Continuous data tier](/docs/manage/partitions/data-tiers).
* An aggregate Metric Monitor can evaluate up to 15,000 time series. A non-aggregate Metric Monitor can evaluate up to 3,000 time series.
* [Save to Index](../scheduled-searches/save-to-index.md) and [Save to Lookup](../scheduled-searches/save-to-lookup.md) are not supported.
* [Search templates](../../search/get-started-with-search/build-search/search-templates.md) are not supported.
* A Log Monitor can have one query up to 15,000 characters long. Metric monitors can specify up to six queries.
* Email notifications can have up to 100 recipients.
* The [`timeshift metrics` operator](/docs/metrics/metrics-operators/timeshift) is not supported in a Metric Monitor.
* [Hidden Metrics queries](../../metrics/metrics-queries/metrics-explorer.md) do not persist across edit sessions.
* The last millisecond of the defined time range is not searched. For example, a time range of 6:15 to 6.30 pm will run as 6:15:00:000 to 6:29:59:999.
