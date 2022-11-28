---
slug: /alerts/monitors
title: Monitors
sidebar_label: Monitors
description: Monitors continuously query your logs or metrics and send notifications when specific events occur, such as critical, warning, and missing data.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/icons/operations/monitor-and-visualize.png')} alt="icon" width="75"/>

Sumo Logic Monitors allow you to set robust and configurable alerting policies that enable you to get notified about critical changes or issues affecting your production application.

Monitors track your Metrics or Logs data in real time and send notifications when noteworthy changes happen in your production applications.

:::note
Learn how [Monitors differ from Scheduled Searches](/docs/alerts/difference-from-scheduled-searches).
:::

## Rules

* You need the **Manage** or **View Monitors** [role capability](docs/manage/users-roles/roles/role-capabilities.md) to manage or view monitors, respectively. These capabilities work in concert with [folder permissions](/docs/alerts/monitors/edit-settings/#monitors-folder-permissions) to enable fine-grained permissions.
* The frequency a Monitor executes depends upon a variety of factors such as the underlying query, the operators used, and the detection window. It can vary from a couple of seconds to a few minutes. If for example, the detection window of your alert is one day it will be evaluated every couple of minutes, whereas if the detection window of the monitor is 15 minutes then it will be evaluated every couple of seconds.
* Log Monitors use the [role search filter](docs/manage/users-roles/roles/construct-search-filter-for-role.md) of their creator.
* Log Monitors delay execution by two minutes. This means it won't evaluate data from the current time, but evaluate data from two minutes ago.  This ensures that any delays in ingestion are factored in and won't generate false positive or false negative alerts.
* Metric Monitors delay execution by one minute.
* Depending on your account type, you can have up to a certain number of Log and Metric Monitors.
  * Enterprise and Trial can have up to 1,000 Log Monitors and 500 Metric Monitors.
  * Essentials and Professional can have up to 300 Log Monitors and 500 Metric Monitors.
  * Free can have up to 50 Log Monitors and 50 Metric Monitors.

## Notifications

Notifications are optional and available as an **alert** and **recovery** for each trigger condition you specify, **Critical**, **Warning**, and **Missing Data**.

## Limitations

### General

* [Receipt Time](../../search/get-started-with-search/build-search/use-receipt-time.md) is not supported.
* Monitors only support the [Continuous data tier](docs/manage/partitions-data-tiers/data-tiers.md).
* An aggregate Metric Monitor can evaluate up to 15,000 time series. A non-aggregate Metric Monitor can evaluate up to 3,000 time series.
* [Save to Index](../scheduled-searches/save-to-index.md) and [Save to Lookup](../scheduled-searches/save-to-lookup.md) are not supported.
* [Search templates](../../search/get-started-with-search/build-search/search-templates.md) are not supported.
* A Log Monitor can have one query up to 4,000 characters long. Metric Monitors can specify up to six queries.
* Email notifications can have up to 100 recipients.
* [Dynamic Parsing](../../search/get-started-with-search/build-search/dynamic-parsing.md) (auto-parse mode) is not supported.
* The timeshift [metrics operator](/docs/metrics/metrics-operators) is not supported in a Metric Monitor.
* [Hidden Metrics queries](../../metrics/metrics-queries/metrics-explorer.md) do not persist across edit sessions.
* The last millisecond of the defined time range is not searched. For example, a time range of 6:15 to 6.30 pm will run as 6:15:00:000 to 6:29:59:999.

### Alerts

* Monitor evaluation for each trigger type (Critical, Warning or Missing Data) happens independently. Each trigger type's lifecycle is managed separately and doesn't have any impact on other trigger types. So it is possible for a monitor to be in Critical and Warning state at the same time. Monitor goes back to normal when it is not in either of Critical, Warning and Missing Data states.
* When both Critical and Warning conditions are met, two separate alerts and notifications are generated - one for the Critical condition and one for the Warning condition. Auto resolution, if set up, will work according to the resolution condition for each case. 
* Metric Monitors have the option to group notifications. When configured, the Monitor will not trigger new notifications until the first one is resolved. The Monitor will only update if the notification type supports Auto Resolution. Grouped notifications will resolve when all the time series return to normal.
* Log Monitors always group notifications.

### Recovery

* Recovery is based on the detection window, which is either the time range or the number of data points of the trigger condition. An alert is recovered (resolved) when the recovery condition is met for the entire duration of the detection window. For example, if an alert is triggered at 1 PM and the detection window is 15 minutes, the earliest the alert would recover is after 1:15 PM since the entire detection window must pass. This is to ensure there isn't an alert between the triggered and resolved state, especially for metrics that are volatile.
* Auto Resolution is supported with Email, Lambda, Microsoft Teams, OpsGenie, PagerDuty, Slack, and generic webhook connections. Support for other connection types is coming soon.
  * For Lambda and generic webhooks, the same payload for both alerts and recovery is used.
  * Email, Microsoft Teams, OpsGenie, PagerDuty, and Slack recovery notifications are hardcoded by Sumo Logic and cannot be edited. The recovery payload is not the same as the alert payload.
* The recovery notification is sent to the same channel where the corresponding Alert notifications were sent. In other words, you cannot have different channels where you receive alert and recovery notifications for a given trigger condition.
* After one day without new data to an incident, the system automatically expires it. The incident is marked as resolved with the resolution set to **Expired**.


## Terminology

Here are the technical terms used in Monitors.

### Detection Method  
This can be _Static_, _Dynamic_, _Anomaly_, or _Outlier_.

### Disable
The monitor is in a disabled state when monitors are not processed by the backend, only their definition is persisted in the database.

### Incident  
When a specific alerting condition is met, as defined on the monitor, an incident is triggered.

### Monitor  
The monitor is the object that you configure within Sumo Logic that:
  * Checks for specific events of interest against a data source, based on your specified conditions. Events of interest are used in a general sense to denote an event that may be of interest to you.
  * Notifies you about the event-of-interest based on your preferences.

### Monitor Type  
The underlying data stream, either logs or metrics, on which the monitor is created.

### Mute  
When a monitor is in a mute state it continues to process your data stream as expected where Incidents are still generated. However, notifications are snoozed based on your mute condition.

### Resolve  
The process of closing an incident.

### Status  
The state of the monitor can be one of the following, Normal, Critical, Warning, or Missing Data.

### Template  
The section that describes the actual connection attributes.

### Threshold  
The static condition which when met an incident is triggered by a monitor.

### Trigger (state)  
The state when an alert condition has been met, and an incident has been created as a result.

### Trigger Type  
Type of Alert/Trigger condition defined Critical/Warning/Missing Data.

### Alert Variables  
Custom variables used inside the Action Payload.
