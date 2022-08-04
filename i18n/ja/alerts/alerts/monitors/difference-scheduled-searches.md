---
id: difference-from-scheduled-searches
title: Difference from Scheduled Searches
sidebar_label: Difference from Scheduled Searches
description: Learn why you should use Monitors instead of Scheduled Searches and Metric Monitors.
---

In order to understand the difference between the two we first need to know the use-cases that each solves today. 

Scheduled searches solve two main use cases:

1. **Alerting you about specific issues** happening in your application. For example, you can create scheduled searches to get notified about a spike in the error rate for a service or a stopped process. 
1. **Reporting on specific insights** from searches on a periodic schedule. For example, you can create a schedule to run daily to notify you about the Daily Active users on your platform.

The new Monitors are designed to solve the ****first use case, alerting****. It provides additional capabilities, like Auto-resolution, support for multiple notification channels, and more. Any scheduled searches that were created to solve the alerting use case can be moved to new Monitors, this includes Real Time Scheduled Searches. 

Apart from the differences in the use cases, there are a couple of feature differences between Scheduled Searches and new Monitors for logs.

| Feature | Scheduled Searches | Monitors (Logs) |
| -- | -- | -- |
| Support for Slack, PagerDuty, OpsGenie and other Integrations | Yes | Yes |
| Customization of Notification | Yes | Yes |
| Auto Resolution of Incidents | No | Yes |
| Send Notification to multiple channels | No | Yes |
| Disable/Mute Alerts | No | Yes |
| API Support | Partial* (Supported via content sync API) | Yes |
| Terraform Support | No<br/>*The Content API resource allows you to manage Schedule Searches, see [https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/content](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/content) | Yes |
| All Log Operators supported | Yes*<br/>(Some operators are not supported for Real time alerts) | Yes |
| Outlier based alerts | Yes | Yes |
| Access Control | Object Level Access Control | Feature Level Access Control |
| Audit Logs for CRUD and System Events (like Notifications Sent, Failures etc.) | Yes | Yes |
| Control Over Schedule of alert/When alert is evaluated | Yes | No |
| One Notification per Log Line | Yes | No |
