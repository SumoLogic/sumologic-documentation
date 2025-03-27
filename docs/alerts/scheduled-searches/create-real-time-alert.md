---
id: create-real-time-alert
title: Manage Real-Time Scheduled Search Alerts (Deprecated)
description: Real-time alerts notify you of error conditions right when they occur.
---

:::warning Solution Deprecated
Real-Time Scheduled Searches will be deprecated on May 15, 2025. Existing searches will be automatically converted to [15-minute scheduled search frequency windows](/docs/alerts/scheduled-searches/schedule-search/#step-2-set-run-frequency) unless your account was explicitly excluded. If you need real-time alerts, we recommend transitioning to [Monitors](/docs/alerts/monitors/overview).
:::

Real-time alerts are scheduled searches that run nearly continuously. This means that you're informed in real time when error conditions exist.

When an alert condition is satisfied, Sumo Logic triggers the selected alert type and examines ingested data in a rolling window using the time range you define. When a new result is found, you'll receive an email.

This document describes how to manage existing real-time alert scheduled searches. Although creating new real-time alerts is no longer supported, you can still view, edit, and delete existing ones.

## When to use

Only use real-time schedules when you know your data is ingested within a few minutes of its creation. The [receipt time](/docs/search/get-started-with-search/build-search/use-receipt-time) should be within a few minutes of your log's [message time](/docs/search/get-started-with-search/search-basics/built-in-metadata). Learn about
troubleshooting timestamp discrepancies [here](/docs/send-data/collector-faq#troubleshooting-time-discrepancies).

Real-time alerts are not duplicated, which means that if a specific raw log message has triggered an alert once already, that same log message will not trigger an alert a second time.

For example, if **Message X** caused an alert to be sent at **Time T**, and Sumo Logic detects **Message X** again at **Time T+1**, Sumo Logic does not send a second alert at **Time T+1**. But if Sumo Logic detects **Message Y** at **Time T+1**, a new alert is sent, because the root cause is different.

:::important
If the time zone of messages is set incorrectly, those logs won't be picked up by real-time alerts.
:::


## Limitations

* The time range of a real-time alerts must be between 5 and 15 minutes. 
* Searching by receipt time is not supported.
* If your search query result is a subset of your previous run's result, a real-time alert will not trigger. It will trigger only when there are new results compared to the previous run.
* A maximum of 120 emails are sent per day from real-time alerts.
* Aggregate real-time scheduled searches evaluate the first 1,000 results per search. For example, if the scheduled search is supposed to return more than 1,000 results, reduce the scope of the search.
* Non-aggregate real-time scheduled searches evaluate the first 100 results per search. For example, if the scheduled search is supposed to return more than 100 results, either convert it to aggregate scheduled search or reduce the scope of the search.
* The [`_dataTier`](/docs/manage/partitions/data-tiers) search modifier is not supported in real-time alert searches.

### Operator limitations

* Some queries cannot be used in real-time alerts searches. Other operators can be used in real-time search, but in the search, they must be included after the first "group-by" phrase:

 | Not supported for real-time alerts | Must be added after a "group by" phrase |
 | :-- | :-- |
 | <ul><li>Count_frequent</li><li>Details</li><li>First, Last - instead use the withtime option, see [`most_recent` and `least_recent`](/docs/search/search-query-language/group-aggregate-operators/most-recent-least-recent).</li><li>LogReduce</li><li>Now()</li><li>Outlier will omit the first N (window size) data points in results because those data points are used in the training phase.</li><li>Join</li><li>Parse using</li><li>queryStartTime()</li><li>queryEndTime()</li><li>Save</li><li>Sessionize</li><li>Subquery</li><li>Threat Intel</li><li>Trace</li><li>Timeslice greater than 1 day</li><li>Transactionize</li></ul> | <ul><li>Accum</li><li>Backshift</li><li>Diff</li><li>Join</li><li>Limit</li><li>RollingStd</li><li>Smooth</li><li>Sort</li><li>Top</li><li>Total</li><li>Transaction By Flow</li><li>Compare With can be used when your query's aggregate operation is grouped by a [`timeslice`](/docs/search/search-query-language/search-operators/timeslice).</li></ul> |

* Real-time queries using [Time Compare](/docs/search/time-compare) need to have at least three timeslices within its time range. For example, if the time range is 10 minutes, your timeslices need to be no longer than 3 minutes so that there are at least three of them.

## Viewing existing real-time alerts

- Navigate to the **Alerts** section in your Sumo Logic dashboard.
- Use the search functionality to locate existing real-time alerts.

## Editing existing real-time alerts

- Click on the real-time alert you wish to edit.
- Make necessary changes to the alert parameters (such as conditions or notification settings).
- Save your changes to update the alert.

## Deleting existing real-time alerts

- Select the real-time alert you want to delete.
- Click the **Delete** button and confirm the deletion.

## Alternatives to real-time alerts

Since the creation of new real-time alerts is deprecated, we recommend using monitors to achieve similar functionality.
