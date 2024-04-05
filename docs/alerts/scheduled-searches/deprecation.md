---
id: deprecation
title: Deprecation of Real-Time Scheduled Searches
---

<head>
  <meta name="robots" content="noindex" />
</head>

As part of our ongoing evaluation of the Sumo Logic service, we have decided to deprecate [Real-Time Scheduled Searches](/docs/alerts/scheduled-searches/create-real-time-alert). In particular, we will remove the option to create new Real-Time Scheduled Searches on **May 15, 2024**. Existing Real-Time Scheduled Searches will continue to function until **May 15, 2025**. We believe many use cases for Real-Time Scheduled Searches can be met by [Monitors](/docs/alerts/monitors/overview). Any remaining use cases can be met by executing these searches at 15m intervals. These options are discussed below.

In 2020, Sumo Logic released Monitors, which provided a new framework to trigger alerts on both metrics and log data in real time and send notifications. Real-Time Scheduled Searches provided a much more limited version of this functionality, but has continued to exist in the Sumo Logic Platform.

## Why is this happening?

Monitors provide the same functionality as a Real-Time Scheduled Search, but offer a number of additional features and significant enhancements such as:

* [Multiple Trigger Conditions](/docs/alerts/monitors/create-monitor/#step-1-set-trigger-conditions) (Critical, Warning, Missing Data)
* [Alert Grouping](/docs/alerts/monitors/alert-grouping/)
* [Playbook Support](/docs/alerts/monitors/alert-response/#alert-details)
* [Integration into our Alert Response Page](/docs/alerts/monitors/alert-response/)
* [AI-Driven Alerting](/release-notes-service/2024/03/12/alerts/)

Furthermore, Monitors will continue to be the focus area for our Product and Engineering Teams for features and enhancements regarding alerting.

## What is happening?

After **May 15, 2024**, it will no longer be possible to create a new Scheduled Search with a frequency of Real-Time. We recommend you create a Monitor to address this use case. Note that this does not have any effect on the creation of new Scheduled Searches with other frequencies of 15 Minutes, Hourly, Daily, Weekly, or a specific Cron schedule for example.

Real-Time Scheduled Searches that were created up till **May 15, 2024** will continue to function without any interruption for 1 year until **May 15, 2025**, and any edits to those schedules will still be supported until the next year.

## What do I need to do?

Before **May 15, 2025**, please migrate any Real Time Scheduled Searches to either Monitors or reduce its frequency to the minimum frequency of 15m.

If you have any questions, please reach out to your account team or open a [Support ticket](https://support.sumologic.com/support/s/).
