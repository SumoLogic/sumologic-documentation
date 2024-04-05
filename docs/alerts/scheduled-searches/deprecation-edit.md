---
id: deprecation-edit
title: Real-Time Scheduled Searches Deprecation Notice
---

<head>
  <meta name="robots" content="noindex" />
</head>

As part of our ongoing evaluation of the Sumo Logic service, we've decided to deprecate [Real-Time Scheduled Searches](/docs/alerts/scheduled-searches/create-real-time-alert). Starting **May 15, 2024**, the option to create new Real-Time Scheduled Searches will be removed. Existing Real-Time Scheduled Searches will remain functional until **May 15, 2025**.

## Why is this happening?

In 2020, Sumo Logic introduced [Monitors](/docs/alerts/monitors/overview), offering a more robust framework for triggering alerts on metrics and log data in real time and sending notifications. Real-Time Scheduled Searches provided similar functionality, but with limitations.

## What's Changing?

Monitors offer several enhancements over Real-Time Scheduled Searches, including:
* [Multiple Trigger Conditions](/docs/alerts/monitors/create-monitor/#step-1-set-trigger-conditions) (Critical, Warning, Missing Data)
* [Alert Grouping](/docs/alerts/monitors/alert-grouping/)
* [Playbook Support](/docs/alerts/monitors/alert-response/#alert-details)
* [Integration into our Alert Response Page](/docs/alerts/monitors/alert-response/)
* [AI-Driven Alerting](/release-notes-service/2024/03/12/alerts/)

## Moving Forward

After **May 15, 2024**, creating new Scheduled Searches with a Real-Time frequency won't be possible. We recommend migrating to Monitors to address this need. Note that this change won't affect Scheduled Searches with frequencies of 15 Minutes, Hourly, Daily, Weekly, or specific Cron schedules.

## Action Required

Before **May 15, 2025**, migrate any Real-Time Scheduled Searches to Monitors or adjust their frequency to a minimum of 15 minutes.

## Need Help?

For any questions, please contact your account team or open a [Support ticket](https://support.sumologic.com/support/s/).
