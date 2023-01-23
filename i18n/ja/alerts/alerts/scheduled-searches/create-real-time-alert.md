---
id: create-real-time-alert
title: Create a Real Time Alert
sidebar_label: Create a Real-Time Alert
description: Set up Real Time Alerts to learn of error conditions right when they occur.
---

Real Time Alerts are scheduled searches that run nearly continuously. That means that you're informed in real time when error conditions exist.

When an alert condition is satisfied Sumo Logic triggers the selected alert type. Sumo Logic examines ingested data in a rolling window using the Time Range you define. Any time a new result is found, another email is sent.

:::note
Only use real time schedules when you know your data is ingested within a few minutes of its creation. The [receipt time](../../search/get-started-with-search/build-search/use-receipt-time.md) should be within a few minutes of your log's [message time](/docs/search/get-started-with-search/search-basics/built-in-metadata). See how to [troubleshoot timestamp discrepancies](/docs/send-data/collector-faq#troubleshooting-time-discrepancies).
:::

Real Time Alerts are not duplicated, which means that if a specific raw log message has triggered an alert once already, that same log message will not trigger an alert a second time.

For example, if **Message X** caused an alert to be sent at **Time T,** and Sumo Logic detects **Message X** again at **Time T+1**, Sumo Logic does not send a second alert at **Time T+1**. But if Sumo Logic detects **Message Y** at **Time T+1**, a new alert is sent, because the root cause is different.

:::important
If the time zone of messages is set incorrectly, those logs won't be picked up by Real Time Alerts.
:::

## General limitations

* The time range of a Real Time Alert must be between 5 and 15 minutes. 
* Searching by receipt time is not supported.
* A maximum of 120 emails are sent per day per Real Time Alert.
* Aggregate real-time scheduled searches evaluate the first 1,000 results per search. For Example, if the scheduled search is supposed to return more than 1,000 results, reduce the scope of the search.
* Non-Aggregate real-time scheduled searches evaluate the first 100 results per search. For Example, if the scheduled search is supposed to return more than 100 results, either convert it to aggregate scheduled search or reduce the scope of the search.
* The [_dataTier](/docs/manage/partitions-data-tiers/data-tiers.md) search modifier is not supported in Real Time Alert searches.

### Notification Results

The results from your search will vary based on the type of alert selected. The following table shows the differences, the above limitations still apply to this logic:

| Alert Type | Results in Notification |
| -- | -- |
| [Webhook](/docs/alerts/webhook-connections/schedule-searches-webhook-connections) | If the **Send a separate alert for each search result checkbox** is selected (in step 6) only new results from subsequent searches are sent in the alert payload. Otherwise, all results are sent. |
| [Save to Index](save-to-index.md) | All results are saved from an **aggregate** query.<br/>Only new results from subsequent searches are saved from a **non-aggregate** query. |
| [Save to Lookup](save-to-lookup.md) | All results are saved. |

## Operator limitations

1. Some queries can not be used in Real Time Alert searches. Other operators can be used in Real Time search, but in the search, they must be included after the first "group-by" phrase:

| Not supported for Real Time Alerts | Must be added after a "group by" phrase |
| -- | -- |
| <ul><li>Count_frequent</li><li>Details</li><li>First, Last - instead use the withtime option, see [most_recent and least_recent](/docs/search/search-query-language/group-aggregate-operators/most-recent-least-recent) .</li><li>LogReduce</li><li>Now()</li><li>Outlier will omit the first N (window size) data points in results because those data points are used in the training phase.</li><li>Join</li><li>Parse using</li><li>queryStartTime()</li><li>queryEndTime()</li><li>Save</li><li>Sessionize</li><li>Subquery</li><li>Threat Intel</li><li>Trace</li><li>Timeslice greater than 1 day</li><li>Transactionize</li></ul> | <ul><li>Accum</li><li></li><li>Backshift</li><li>Diff</li><li>Join</li><li>Limit</li><li>RollingStd</li><li>Smooth</li><li>Sort</li><li>Top</li><li>Total</li><li>Transaction By Flow</li><li>Compare With can be used when your query's aggregate operation is grouped by a [timeslice](../../search/search-query-language/search-operators/timeslice.md). See number 2, below, for details.</li></ul> |

1. Real time queries using [**time compare**](../../search/time-compare.md) need to have at least three timeslices within its time range. For example, if the time range is 10 minutes, your timeslices need to be no longer than 3 minutes so that there are at least three of them.

## Configure a Real Time Alert

To set up a Real Time alert:

1. [Save a search](/docs/search/get-started-with-search/search-basics/save-search). 
1. Click **Schedule this search**.

    ![RealTimeAlert.png](/img/alerts/RealTimeAlert.png)

1. **Run Frequency**. Select **Real Time**.
1. For all other configuration options, see [Schedule a Search](schedule-search.md). 
1. Click **Save**. 
