---
id: difference-from-scheduled-searches
title: Difference between Monitors and Scheduled Searches
sidebar_label: Monitors vs. Scheduled Searches
description: Learn why you should use monitors instead of Scheduled Searches and metrics monitors.
---

To understand the difference between monitors and Scheduled Searches, you'll first need to know the use cases that each solution solves today. 

Scheduled Searches solve two main use cases:

* **Alerting you about specific issues** happening in your application. For example, you can create Scheduled Searches to get notified about a spike in the error rate for a service or a stopped process. 
* **Reporting on specific insights** from searches on a periodic schedule. For example, you can create a schedule to run daily to notify you about the Daily Active users on your platform.

Monitors are designed to solve the first use case, alerting. It provides additional capabilities like auto-resolution and support for multiple notification channels. Any Scheduled Searches that were created to solve the alerting use case can be moved to monitors. This includes real-time Scheduled Searches. 

Apart from the differences in the use cases, there are some feature differences between Scheduled Searches and monitors for logs.

| Feature | Scheduled Searches | Monitors (Logs) |
| :-- | :-- | :-- |
| Support for Slack, PagerDuty, OpsGenie and other integrations | Yes | Yes |
| Customizable notifications | Yes | Yes |
| Incident auto-resolution | No | Yes |
| Send notification to multiple channels | No | Yes |
| Alert disablement | No | Yes*<br/>(Disable is a manual operation. We do not support scheduled disabling of alerts.) |
| API support | Partial* (Supported via content sync API) | Yes |
| Terraform support | No*<br/>The Content API resource allows you to manage Schedule Searches ([learn more](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/content)) | Yes |
| Log Search operator support | Yes*<br/>(Some operators are not supported for real-time alerts) | Yes |
| Outlier-based alerts | Yes | Yes |
| Access control | Object-Level Access Control | Object-Level Access Control (Per request - limited availability) |
| Audit logs for CRUD and system events (e.g., notifications sent, failures) | Yes | Yes |
| Control over alert scheduling and evaluation | Yes | No |
| One notification per log line | Yes | Yes<br/>*Supported via [Alert grouping](/docs/alerts/monitors/alert-grouping) |
