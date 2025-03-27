---
id: deprecation
title: Deprecation of Real-Time Scheduled Searches
---

:::warning Deprecation Notice
Real-Time Scheduled Searches will be deprecated on **May 15, 2025**. As of **May 29, 2024**, creating new Real-Time Scheduled Searches is no longer supported. Existing Real-Time Searches will continue to function until the deprecation date, at which point they will automatically convert to 15-minute schedules. See below for full details.
:::

As part of our ongoing platform improvements, we are deprecating [Real-Time Scheduled Searches](/docs/alerts/scheduled-searches/create-real-time-alert). While this functionality has supported real-time alerting for many years, our modern alerting framework, [Monitors](/docs/alerts/monitors/overview), offers a more powerful and flexible experience for real-time and scheduled alerts.

## Deprecation timeline

| Date | Change |
|:-----|:-------|
| **May 29, 2024** | Creation of new Real-Time Scheduled Searches was disabled across all Sumo Logic accounts |
| **May 15, 2025** | All remaining Real-Time Searches will automatically convert to 15-minute schedules (except for a small number of customers with exceptions). Each conversion will be recorded via audit log. Real-Time frequency will no longer be editable. |

## Why is this happening?

[Monitors](/docs/alerts/monitors/overview) support real-time alerting on both logs and metrics, and offer significant advantages over Scheduled Searches, including:

* [Multiple trigger conditions](/docs/alerts/monitors/create-monitor/#step-1-set-trigger-conditions) (Critical, Warning, Missing Data)
* [Alert grouping](/docs/alerts/monitors/alert-grouping/)
* [Playbook support](/docs/alerts/monitors/alert-response/#alert-details)
* [AI-driven alerting](/release-notes-service/2024/12/31/#march-12-2024-alerts)
* [Integration with the Alert Response page](/docs/alerts/monitors/alert-response/)

Monitors are the primary focus for our Product and Engineering Teams for alerting features and enhancements.

## What do I need to do?

Before **May 15, 2025**, we recommend:

* If you need real-time alerting, recreate your Real-Time Scheduled Searches as [Monitors](/docs/alerts/monitors/overview).
   :::note Can I import a Scheduled Search into a Monitor?
   No. Scheduled Searches and Monitors use different JSON structures. You’ll need to recreate the search logic manually in the [Monitor creation UI](/docs/alerts/monitors/create-monitor/).
   :::
* If real-time execution isn’t required, you can manually update your Scheduled Search to run every 15 minutes or longer.

After the deprecation date, all remaining Real-Time Scheduled Searches will be automatically updated to run at 15-minute intervals. An audit log entry will be generated for each conversion.

:::note
If you edit an existing Real-Time Scheduled Search and change the frequency, you will not be able to revert it back to Real-Time.
:::

If you have any questions, please reach out to your account team or open a [Support ticket](https://support.sumologic.com/support/s/).
