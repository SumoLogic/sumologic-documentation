---
id: difference-from-scheduled-searches
title: Difference between Monitors and Scheduled Searches
sidebar_label: Monitors vs. Scheduled Searches
description: Learn why you should use monitors instead of scheduled searches and metrics monitors.
---

To understand the difference between monitors and scheduled searches, it's essential to recognize the specific use cases each solution addresses.

## Scheduled searches

Scheduled searches address two primary use cases:

* Alerting about specific issues in your application. For example, you can create scheduled searches to notify you about a spike in the error rate for a service or a stopped process.
* Reporting specific insights from searches on a periodic schedule. For instance, you can schedule a search to run daily, notifying you about the Daily Active Users on your platform.

## Monitors

Monitors are specifically designed for the first use case: alerting. They offer additional capabilities such as auto-resolution and support for multiple notification channels. Any scheduled searches created for alerting purposes can be moved to monitors.

## Feature differences

Beyond the differences in use cases, there are distinct feature differences between scheduled searches and monitors for logs.

| Feature | Scheduled Searches | Monitors (Logs) |
| :-- | :-- | :-- |
| Support for Slack, PagerDuty, OpsGenie, and other integrations | Yes | Yes |
| Customizable notifications | Yes | Yes |
| Incident auto-resolution | No | Yes |
| Send notification to multiple channels | No | Yes |
| Alert disablement | No | Yes*<br/>(Disable is a manual operation. We do not support scheduled disabling of alerts.) |
| API support | Partial*<br/>(Supported via content sync API) | Yes |
| Terraform support | Yes<br/>(see [content API resource](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/content)) | Yes |
| Log Search operator support | Yes | Yes |
| Outlier-based alerts | Yes | Yes |
| Access control | Object-Level Access Control | Object-Level Access Control (Per request - limited availability) |
| Audit logs for CRUD and system events (for example, notifications sent, failures) | Yes | Yes |
| Control over alert scheduling and evaluation | Yes | No |
| One notification per log line | Yes | Yes*<br/>(Supported via [Alert grouping](/docs/alerts/monitors/alert-grouping)) |
