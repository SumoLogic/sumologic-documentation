---
id: create-real-time-alert
title: Deprecation of Real-Time Scheduled Searches
---

<head>
 <meta name="robots" content="noindex" />
</head>

:::warning Deprecated Feature
As of May 29, 2024, creating new Real-Time Scheduled Searches has been disabled. Existing Real-Time Scheduled Searches will continue to function as-is. For new alerting needs, we recommend using [Monitors](/docs/alerts/monitors/overview).
:::

Sumo Logic has deprecated Real-Time Scheduled Searches as part of our ongoing platform improvements. While existing searches continue to operate, [Monitors](/docs/alerts/monitors/overview) are the recommended solution for real-time and scheduled alerting going forward.

## Deprecation timeline

| Date | Change |
|:-----|:-------|
| **May 29, 2024** | Creation of new Real-Time Scheduled Searches was disabled across all accounts. |
| **May 15, 2025** | Scheduled removal of real-time frequency was canceled. Existing Real-Time Scheduled Searches continue operating without change. |

Real-Time Scheduled Searches are considered a legacy feature. Any edits or new creations must use Monitors instead.

## Why is this happening?

Monitors offer significant improvements over Real-Time Scheduled Searches, including:

* [Multiple trigger conditions](/docs/alerts/monitors/create-monitor/#step-1-set-trigger-conditions) (Critical, Warning, Missing Data)
* [Alert grouping](/docs/alerts/monitors/alert-grouping/)
* [Playbook support](/docs/alerts/monitors/alert-response/#alert-details)
* [AI-driven alerting](/release-notes-service/2024/12/31/#march-12-2024-alerts)
* [Integration with the Alert Response page](/docs/alerts/monitors/alert-response/)

Monitors are the strategic focus for our future alerting development and enhancements.

## What should I do?

* For new real-time alerting needs, use Monitors.
* If you have existing Real-Time Scheduled Searches, they will continue functioning without changes for now.
* Edits to existing Real-Time Scheduled Searches are possible, but you cannot create new ones.

:::note Can I import a scheduled search into a monitor?
No. Because the JSON formatting of Scheduled Searches differs from monitors, you’ll need to manually recreate it as a Monitor from the Search UI for your real-time use cases.
:::

If you have any questions, reach out to your account team or open a [Support ticket](https://support.sumologic.com/support/s/).
