---
id: create-real-time-alert
title: Deprecation of Real-Time Scheduled Searches
---
<head>
 <meta name="robots" content="noindex" />
</head>
:::warning Deprecated Feature
As of **May 15, 2025**, Real-Time Scheduled Searches are officially deprecated and no longer run in real time. All remaining Real-Time Scheduled Searches have been automatically converted to 15-minute schedules. For real-time alerting, use [Monitors](/docs/alerts/monitors/overview).
:::

As part of our ongoing platform improvements, Sumo Logic has officially deprecated [Real-Time Scheduled Searches](/docs/alerts/scheduled-searches/create-real-time-alert). These legacy searches have been replaced by [Monitors](/docs/alerts/monitors/overview), which offer more powerful, scalable, and flexible alerting capabilities.


## Deprecation timeline

| Date | Change |
|:-----|:-------|
| **May 29, 2024** | Creation of new Real-Time Scheduled Searches was disabled across all Sumo Logic accounts |
| **May 15, 2025** | All remaining Real-Time Scheduled Searches were automatically converted to 15-minute schedules (except for a small number of approved exceptions). An audit log entry was created for each conversion. |

Real-Time frequency is no longer supported, and any attempt to edit or recreate a real-time schedule will default to 15-minute intervals.


## Why did this change happen?

[Monitors](/docs/alerts/monitors/overview) support real-time alerting on both logs and metrics, and offer significant advantages over Scheduled Searches, including:

* [Multiple trigger conditions](/docs/alerts/monitors/create-monitor/#step-1-set-trigger-conditions) (Critical, Warning, Missing Data)
* [Alert grouping](/docs/alerts/monitors/alert-grouping/)
* [Playbook support](/docs/alerts/monitors/alert-response/#alert-details)
* [AI-driven alerting](/release-notes-service/2024/12/31/#march-12-2024-alerts)
* [Integration with the Alert Response page](/docs/alerts/monitors/alert-response/)

Monitors are the strategic focus for our future alerting development and enhancements.

## What should I do?

If you're still relying on Scheduled Searches for real-time alerting, we strongly recommend migrating to Monitors for the most accurate, flexible, and reliable experience.

:::note Can I import a Scheduled Search into a Monitor?
No. Scheduled Searches and Monitors use different JSON structures. You’ll need to recreate the search logic manually in the [Monitor creation UI](/docs/alerts/monitors/create-monitor/).
:::

If your use case doesn't require real-time execution, your automatically converted Scheduled Search will continue to run every 15 minutes. However, it may be a good time to consider consolidating logic in Monitors for long-term maintenance.

If you have any questions, please contact your account team or open a [Support ticket](https://support.sumologic.com/support/s/).
