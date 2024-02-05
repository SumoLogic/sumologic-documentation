---
id: difference-from-scheduled-searches
title: Difference between Monitors and Scheduled Searches
sidebar_label: Monitors vs. Scheduled Searches
description: Learn why you should use Monitors instead of Scheduled Searches and Metric Monitors.
---

To understand the difference between Monitors and Scheduled Searches, you'll first need to know the use cases that each solution solves today. 

Scheduled searches solve two main use cases:

* **Alerting you about specific issues** happening in your application. For example, you can create scheduled searches to get notified about a spike in the error rate for a service or a stopped process. 
* **Reporting on specific insights** from searches on a periodic schedule. For example, you can create a schedule to run daily to notify you about the Daily Active users on your platform.

Monitors are designed to solve the first use case, alerting. It provides additional capabilities like Auto-resolution and support for multiple notification channels. Any scheduled searches that were created to solve the alerting use case can be moved to Monitors. This includes Real-Time Scheduled Searches. 

Apart from the differences in the use cases, there are some feature differences between Scheduled Searches and Monitors for logs.

| Feature | Scheduled Searches | Monitors (Logs) |
| :-- | :-- | :-- |
| Support for Slack, PagerDuty, OpsGenie and other Integrations | Yes | Yes |
| Customization of Notification | Yes | Yes |
| Auto Resolution of Incidents | No | Yes |
| Send Notification to multiple channels | No | Yes |
| Disable Alerts | No | Yes*<br/>(Disable is a manual operation. We don't support scheduled disabling of alerts.) |
| API Support | Partial* (Supported via content sync API) | Yes |
| Terraform Support | No*<br/>The Content API resource allows you to manage Schedule Searches ([learn more](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/content)) | Yes |
| All Log Operators supported | Yes*<br/>(Some operators are not supported for Real time alerts) | Yes |
| Outlier based alerts | Yes | Yes |
| Access Control | Object Level Access Control | Object Level Access Control (Per request - limited availability) |
| Audit Logs for CRUD and System Events (e.g., Notifications Sent, Failures) | Yes | Yes |
| Control Over Schedule of alert/When alert is evaluated | Yes | No |
| One Notification per Log Line | Yes | Yes<br/>*Supported via [Alert grouping](/docs/alerts/monitors/alert-grouping) |
