---
slug: /alerts/monitors
title: Monitors
sidebar_label: Monitors
description: Sumo Logic Monitors continuously query your logs or metrics and send notifications when specific events occur, such as critical, warning, and missing data.
tags: [monitor, monitors]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/icons/operations/monitor-and-visualize.png')} alt="icon" width="45"/>

Sumo Logic Monitors allow you to set robust and configurable alerting policies that enable you to get notified about critical changes or issues affecting your production application.

Monitors track your Metrics or Logs data in real time and send notifications when noteworthy changes happen in your production applications.

:::note
Learn how [Monitors differ from Scheduled Searches](/docs/alerts/difference-from-scheduled-searches).
:::

## Rules

* To manage and/or view monitors, you'll need the **Manage** and **View Monitors** [role capabilities](/docs/manage/users-roles/roles/role-capabilities.md). [Learn more](/docs/alerts/monitors/edit-settings/#monitors-folder-permissions) about controlling permissions at the monitor or folder level.
* The frequency a Monitor executes depends upon a variety of factors such as the underlying query, the operators used, and the detection window. It can vary from a couple of seconds to a few minutes. If for example, the detection window of your alert is one day it will be evaluated every couple of minutes, whereas if the detection window of the monitor is 15 minutes then it will be evaluated every couple of seconds.
* Log Monitors use the [role search filter](/docs/manage/users-roles/roles/construct-search-filter-for-role.md) of their creator.
* Log Monitors delay execution by two minutes. This means it won't evaluate data from the current time, but evaluate data from two minutes ago. This ensures that any delays in ingestion are factored in and won't generate false positive or false negative alerts.
* Metric Monitors delay execution by one minute.
* Depending on your account type, you can have up to a certain number of Log and Metric Monitors.
  * Enterprise and Trial can have up to 1,000 Log Monitors and 1,500 Metric Monitors.
  * Essentials and Professional can have up to 300 Log Monitors and 500 Metric Monitors.
  * Free can have up to 50 Log Monitors and 50 Metric Monitors.

## Notifications

Notifications are optional and available as an **alert** and **recovery** for each trigger condition you specify, **Critical**, **Warning**, and **Missing Data**.

## Limitations

### General

* [Receipt Time](../../search/get-started-with-search/build-search/use-receipt-time.md) is not supported.
* [Log Reduce](../../search/logreduce/logreduce-operator/)/ [Log Compare](../../search/logcompare/) operators are not supported in Monitors. If your query contains these operators, you will not be able to create the monitor.  
* Monitors only support the [Continuous data tier](/docs/manage/partitions-data-tiers/data-tiers.md).
* An aggregate Metric Monitor can evaluate up to 15,000 time series. A non-aggregate Metric Monitor can evaluate up to 3,000 time series.
* [Save to Index](../scheduled-searches/save-to-index.md) and [Save to Lookup](../scheduled-searches/save-to-lookup.md) are not supported.
* [Search templates](../../search/get-started-with-search/build-search/search-templates.md) are not supported.
* A Log Monitor can have one query up to 15,000 characters long. Metric Monitors can specify up to six queries.
* Email notifications can have up to 100 recipients.
* The timeshift [metrics operator](/docs/metrics/metrics-operators) is not supported in a Metric Monitor.
* [Hidden Metrics queries](../../metrics/metrics-queries/metrics-explorer.md) do not persist across edit sessions.
* The last millisecond of the defined time range is not searched. For example, a time range of 6:15 to 6.30 pm will run as 6:15:00:000 to 6:29:59:999.

### Alerts

* Monitor evaluation for each trigger type (Critical, Warning or Missing Data) happens independently. Each trigger type's lifecycle is managed separately and doesn't have any impact on other trigger types. So it is possible for a monitor to be in Critical and Warning state at the same time. Monitor goes back to normal when it is not in either of Critical, Warning and Missing Data states.
* When both Critical and Warning conditions are met, two separate alerts and notifications are generated - one for the Critical condition and one for the Warning condition. Auto resolution, if set up, will work according to the resolution condition for each case. 
* Metric Monitors have the option to group notifications. When configured, the Monitor will not trigger new notifications until the first one is resolved. The Monitor will only update if the notification type supports Auto Resolution. Grouped notifications will resolve when all the time series return to normal.
* Log Monitors always group notifications.

### Recovery

* Recovery is based on the detection window, which is either the time range or the number of data points of the trigger condition. An alert is recovered (resolved) when the recovery condition is met for the entire duration of the detection window.
   * For example, if an alert is triggered at 1:00 PM and the detection window is 15 minutes, the earliest the alert would recover is after 1:15 PM since the entire detection window must pass. This is to ensure there isn't an alert between the triggered and resolved state, especially for metrics that are volatile.
* Auto Resolution is supported with Email, Lambda, Microsoft Teams, OpsGenie, PagerDuty, Slack, and generic webhook connections.
* **Recovery Payload** customization is supported for Slack, Microsoft Teams, AWS Lambda, Azure Functions, generic webhooks, PagerDuty, OpsGenie, and ServiceNow.
* For the rest of our Connections, you can customize the **Alert Payload**, but not the **Recovery Payload**. What you enter for the **Alert Payload** will be used for both alerts and recovery.
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

import useBaseUrl from '@docusaurus/useBaseUrl';

In this section, we'll introduce the following concepts:

<div className="box-wrapper" markdown="1">
<div className="box smallbox1 card">
  <div className="container">
  <a href="/docs/alerts/monitors/create-monitor"><img src={useBaseUrl('img/icons/operations/monitor-and-visualize.png')} alt="icon" width="40"/><h4>Create a Monitor</h4></a>
  <p>Learn how to create a monitor.</p>
  </div>
</div>
<div className="box smallbox2 card">
  <div className="container">
  <a href="/docs/alerts/monitors/edit-settings"><img src={useBaseUrl('img/icons/operations/monitor-and-visualize.png')} alt="icon" width="40"/><h4>Edit Monitor Settings</h4></a>
  <p>Learn how to view, create, manage, and organize Monitors.</p>
  </div>
</div>
<div className="box smallbox3 card">
  <div className="container">
    <a href="/docs/alerts/monitors/monitor-faq"><img src={useBaseUrl('img/icons/operations/monitor-and-visualize.png')} alt="icon" width="40"/><h4>Monitors FAQ</h4></a>
  <p>This topic lists the common FAQs regarding Monitors.</p>
  </div>
</div>
<div className="box smallbox4 card">
  <div className="container">
    <a href="/docs/alerts/monitors/alert-variables"><img src={useBaseUrl('img/icons/operations/monitor-and-visualize.png')} alt="icon" width="40"/><h4>Alert Variables</h4></a>
  <p>Use Alert Variables as parameters to customize the JSON payload object of your alert notifications.</p>
  </div>
</div>
<div className="box smallbox5 card">
  <div className="container">
    <a href="/docs/alerts/monitors/alert-response"><img src={useBaseUrl('img/icons/operations/monitor-and-visualize.png')} alt="icon" width="40"/><h4>Alert Response</h4></a>
  <p>Get contextual insights about triggered alerts to minimize the time needed to investigate and resolve application failures.</p>
  </div>
</div>
<div className="box smallbox6 card">
  <div className="container">
  <a href="/docs/alerts/monitors/alert-grouping"><img src={useBaseUrl('img/icons/operations/monitor-and-visualize.png')} alt="icon" width="40"/><h4>Alert Grouping</h4></a>
<p>Customize how your alerts are generated from monitors by specifying a grouping condition based on specific fields.</p>
  </div>
</div>
<div className="box smallbox7 card">
  <div className="container">
  <a href="/docs/alerts/monitors/alert-response-faq"><img src={useBaseUrl('img/icons/operations/monitor-and-visualize.png')} alt="icon" width="40"/><h4>Alert Response FAQ</h4></a>
<p>This topic lists the common FAQs regarding Alert Response.</p>
  </div>
</div>
</div>
