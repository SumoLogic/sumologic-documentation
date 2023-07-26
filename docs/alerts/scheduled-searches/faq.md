---
id: faq
title: Scheduled Search FAQs
sidebar_label: FAQ
description: You can edit or cancel a Scheduled Search at any time.
---

The following topics include frequently asked questions about scheduled
searches and provide troubleshooting tips. 

## Does Sumo Logic let me get alerts from a specific static IP address?

Yes, Sumo Logic provides webhook notifications through static IP addresses. You can allowlist those IP addresses to receive notifications directly from Sumo Logic. For a list of our allowlist addresses, contact [Support](https://support.sumologic.com/hc/en-us).

:::note
The [Test Connection feature for webhooks](/docs/alerts/webhook-connections/set-up-webhook-connections) does not use the same static IP addresses that send notifications, it uses different temporary IP addresses.
:::

## Create an Email Alert to Notify you when Data Usage Reaches 90 Percent of your Account Limit

I want to create an email alert that lets me know when I reach 90% of data usage on my account, so I’m notified before I reach my account limit. What’s the best way to do this?

The best way to do this is to create a Scheduled Search using the sample query included in this article to send you an email alert when your data usage reaches 90% of your account’s limit. As a prerequisite, you will need to enable the Data Volume Index to collect more detailed statistics about your account.

### Prerequisite: Enable the Data Volume Index

If you do not already have the Data Volume Index enabled, you will need to enable it. If you already have the Data Volume Index enabled, continue to the next section.

To enable the Data Volume Index, use the instructions in [Enable and Manage the Data Volume Index](/docs/manage/ingestion-volume/data-volume-index).

:::important
Once the Data Volume index is enabled, let it run for at least 24 hours before you create your Scheduled Search.
:::

### Create a Scheduled Search

Next, create a Scheduled Search with an email alert that will notify you when your account reaches 90% of its data using the following sample query.

This query will return values only when the configured threshold is met. To do this, set your alert so that it's triggered only when more than "0" results are returned. When the threshold value is met or crossed, a list of Collectors is included in the email body, and the busier Collectors are ranked ahead of the others. Schedule this alert to run every four hours or so and to select the time-range of "Today."

To create a Scheduled Search:

1. On the **Search** page, enter the sample query provided below as a template for your Scheduled Search. Adjust the **plan_size** and **thresholds** accordingly, as mentioned the comments in the sample query.
    ```
    _index=sumologic_volume
    | where _sourceCategory="collector_volume"
    | parse regex "(?<collector>\"[^\"]*\")\:{\"sizeInBytes\"\:(?<bytes>\d+),\"count\"\:(?<count>\d+)\}" multi
    | bytes/1024/1024/1024 as gbytes
    | sum(gbytes) as gbytes by collector
    | total gbytes as todays_volume
    | "200" as plan_size //replace with your daily plan limit
    | gbytes / todays_volume as collector_pct_of_todaysvolume
    | todays_volume / plan_size as todaysvolume_against_plan
    | where todaysvolume_against_plan > .9 //replace with the percentage threshold you want to alert on
    | sort gbytes
    | fields collector, gbytes, collector_pct_of_todaysvolume, todays_volume, plan_size, todaysvolume_against_plan
    ```
1. For the search **Time Range**, select **Today**.
1. Click **Save As**. <br/>![DataUsageBreached.png](/img/alerts/DataUsageBreached.png)
1. In the **Save Search As** dialog, enter a name for this Scheduled Search, such as **90% Data Usage Limit Reached**.
1. **Run frequency.** Select **Every 4 hours**.
1. Click **Schedule this search**. 
   * **Time range for the scheduled search.** Select **Today**.
   * **Alert condition.** Select **Send notification only if the condition below is satisfied:** and enter **Number of results Greater than > 0**.
   * **Alert Type.** Select **Email**.
   * Enter the **email address** where you would like to be alerted.
1. For all configuration options, see [Schedule a Search](/docs/alerts/scheduled-searches/schedule-search.md). 
1. Click **Save**.

## Why Would a Scheduled Search Fail?

A Scheduled Search may fail and be suspended for several reasons, with the failures falling into three general areas.

### Scheduled Search Query

Failures could be related to the Scheduled Search query. Check the following possible issues. 

* In queries that use [lookup](/docs/search/search-query-language/search-operators/lookup-classic) files, the lookup file could be empty. This would cause the Scheduled Search to fail because Sumo Logic downloads the lookup file prior to executing the query. 
* Other query-specific factors could be at play. To test if the failure can be reproduced, run the Scheduled Search query. 
* To make sure your query is written correctly, see [Write Efficient Search Queries](/docs/search/get-started-with-search/build-search). 
* You may be able to optimize your query performance using [Partitions](/docs/manage/partitions-data-tiers) or [Scheduled Views](/docs/manage/scheduled-views).  
* Taking too long to complete. See [How to Prevent Your Scheduled Search from Timing Out](#how-to-prevent-your-scheduled-search-from-timing-out). 

### Sumo Logic Backend Issues

Failures can be seen across many Scheduled Searches due to backend infrastructure issues at Sumo Logic, and nothing specific to that particular query. In this case, just wait until Sumo Logic service is restored and be ready to test your query for normal performance.

* Check http://status.sumologic.com for outages impacting multiple customers and specific functionality such as searches, real time alerts, etc.
* Sumo Logic reports Scheduled Search failures in the [Audit Index](/docs/manage/security/audit-index.md). You can determine if many Scheduled Search failures occurred at the same time of your failure. In this case, the Sumo Logic operations team is alerted to any infrastructure issues and will take action to address them as soon as possible. 

### Other Issues

Scheduled Search failures could be the result of other factors, such as a spike in data being processed by the Scheduled Search. 

* If you have a query that normally runs, but is close to reaching the [timeout period limit](#how-to-prevent-your-scheduled-search-from-timing-out), it could finally fail due to changes in your account, such as the content and size of log messages, or the volume or number of messages sent during a specific time range. Choosing a narrower time range can help.
* Even if the query normally runs within the timeout period limit, there could be a data surge that causes more processing time to be needed.
* There could be normal growth factors within an account, such as increased Collector deployment, that would cause some Source Categories to have a data surge. You should test your Scheduled Searches for performance periodically to address this possibility.

See also, [What Happens When a Scheduled Search is Suspended?](#what-happens-when-a-scheduled-search-is-suspended).

### What else can I do? 

For assistance with Scheduled Search issues, contact [Sumo Logic Support](https://support.sumologic.com/hc/en-us). 


## How to Prevent your Scheduled Search from Timing Out

Before you create a scheduled search, be aware that  Sumo Logic will not allow the scheduled search to run indefinitely. At some point, the query will be timed out to protect the reliability of the service.

### Timeout Settings

Sumo Logic's timeout setting is equivalent to 1/3rd of the scheduled search's time range, with a minimum timeout of 3 minutes and a maximum timeout of 120 minutes.

For example, if the search time range is a 2 hour period, then the timeout threshold would be:

2 (time range in hours) x 60 (minutes) / 3 = 40 minutes

If the calculated timeout threshold is less than 3 minutes, the search will time out at 3 minutes. If the calculated timeout threshold is more than 120 minutes, the search will time out at 120 minutes.

Sumo Logic will attempt to run the scheduled search three consecutive times in case the search times out. After the third failed event, an email will be sent to the author of the search, and the scheduled search will be suspended for at least a four-hour period to give the user an opportunity to modify their query.

### Preventing Search Timeout

To test the performance of a query, time how long it takes to complete before you save and schedule the search. If it completes below the expected time out thresholds mentioned previously, then it’s fine to schedule on a recurring basis.

:::tip
Reach out to the Sumo Logic Support team to get guidance on optimizing your query.
:::

Here are also a few additional things to consider when conducting your performance tests:

* Use a time range outside of the last 24-hour period. For example, if you plan on saving a search with the relative timeframe of the **Last 24 hours**, run a test using the following time range instead: **-48h -24h** (48 hours ago to 24 hours ago). Doing this will trigger the same backend nodes that would be called to run your scheduled search.
* [Optimize your searches](/docs/search/optimize-search-performance.md) as much as possible.
* If the data you are testing against is not reflective of the actual volume you’ll be scanning on a recurring basis, then the test itself should be considered invalid. Similarly, avoid scheduling searches preemptively. Wait until you get a good sample size and make sure your live streaming is completely set up.
* If there are plans to add more data to your account in the near future, please keep that in mind in your testing and include a buffer to make sure that your increased data volume won’t cause your scheduled search to time out.


## Real Time Alert with greater than 1,000 results

Scheduled Search alert condition thresholds are based on the number of rows returned in your search results. It does not consider any values that may be present within a column of those rows. If your query does not perform any aggregations the Scheduled Search threshold will apply to the number of raw messages returned with a query, as seen under the Messages tab of the search. If a query contains an aggregate operation, for example, count, sum, min, max, etc... the Scheduled Search threshold will be applied to the number of aggregate rows returned by the query, as seen within the Aggregate tab of the results.   

When performing an aggregation as part of a query, and wanting to alert when a specific aggregate value meets a threshold, the threshold for that field value will need to be included as part of the query itself. This can typically be done by providing a [where](/docs/search/search-query-language/search-operators/where) condition after the aggregation within the query. For example:

```sql
_sourceCategory=aws/prod
| json "message","logStream","logGroup"
| parse field=message "* * * * * * * * * * * * * *" as version,accountID,interfaceID,src_ip,dest_ip,src_port,dest_port,Protocol,Packets,bytes,StartSample,EndSample,Action,status
| timeslice 1m
| where action="REJECT"
| count as drops by _timeslice
| where drops > 1000
```

This will ensure results are only returned when the field value meets the threshold provided within the query. The threshold set within the Scheduled Search would then be set to alert based on the resulting number of rows that met the threshold set within the query. For example: `Greater than\> 0`

 
## Service Alert: Scheduled Search Email Quota Reached for Search

Why have I received the following email?

```
From: Sumo Logic [mailto:service@sumologic.com]

Sent: Saturday, October 18, 2014 11:01 PM

To: <YOUR_EMAIL>

Subject: Service Alert: Scheduled Search Email Quota Reached for search

The Sumo Logic service has detected that 100% of your allowed quota of email notifications for scheduled search named has been used. No more email notifications will be sent for this search.

Regards,
The Sumo Logic Team
```

Sumo Logic implements an email quota allowing 100 emails to be sent per day per scheduled search. The purpose of this limit is set to prevent service.sumologic.com from spamming an inbox. This is documented in [Scheduled Searches](/docs/alerts/scheduled-searches/receive-email-alerts.md). 

The above quota assumes that no more than 5 Alert emails will be triggered per hour or an alert every 12 minutes on average. Sumo Logic expects that Alerts are used as an exception and it is unlikely to find email Alerts being sent at a rate higher than 5 emails per hour.


## What Happens When a Scheduled Search Is Suspended?

If you have received an Alert Email from Sumo Logic stating that an issue has been detected with a Scheduled Search, it might not be immediately apparent why your Scheduled Search has failed, and may even be suspended. The Scheduled Search referred to in the email may be one that has run for months without a problem, but now for some reason, it fails.

First, we recommend that you review the scheduled search. (Just click the link at the bottom of the email.) It could be that there's an easy-to-spot typo. Or perhaps an operator is being used improperly. See [how to prevent your scheduled search from failing](/docs/alerts/scheduled-searches/faq#why-would-a-scheduled-search-fail).

### Why was my Scheduled Search suspended?

Scheduled Searches must run within the limits of a [timeout period](#how-to-prevent-your-scheduled-search-from-timing-out), which can be 20 minutes to an hour, depending on the time range set for the query. If for some reason, a Scheduled Search cannot complete within the confines of the timeout period, such as connectivity problems or heavy load, the query will timeout and fail.

When a Scheduled Search query fails Sumo Logic attempts to run the query again a few more times. If all attempts fail the scheduled search is temporarily or permanently suspended depending on the issue detected. The owner of the scheduled search will receive an email alert with details of the suspension including the reason.

The [Audit Index](/docs/manage/security/audit-index.md) stores events on your scheduled search events.

### Is there a limit on number of scheduled searches?

A maximum of 6000 scheduled searches are allowed per account.

### Examples of Scheduled Search suspensions

#### Temporary suspension

The following is an example of a temporary suspension email:

![suspension email.png](/img/alerts/suspension-email.png)

The [Audit Index](/docs/manage/security/audit-index.md) stores events on your scheduled search events. The following is an example of a temporary suspension log:   

![temp sus.png](/img/alerts/temp-sus.png)

#### Permanent suspension

The following is an example of a permanent suspension email:  

![permanent sus.png](/img/alerts/permanentsus.png)

The [Audit Index](/docs/manage/security/audit-index.md) stores events on your scheduled search events. The following is an example of a permanent suspension log:

![perm sus.png](/img/alerts/perm-sus.png)

#### How long will the Scheduled Search be suspended?  

The suspended state of the Scheduled Search lasts for four hours for non-daily searches (for example, searches recurring every 15 minutes, every 1 hour, etc.) and for up to an extra day for a daily search (two failed executions on two days and skips the third day).

Once the suspension period is over, the Scheduled Search will resume normal operation after four hours (for non-daily scheduled searches) or on the fourth day for a daily Scheduled Search.

Permanent suspensions last forever. You need to create a new scheduled search. 

#### How can I troubleshoot the failure?

For complete details, see [Why Would a Scheduled Search Fail?](/docs/alerts/scheduled-searches/faq#why-would-a-scheduled-search-fail).

#### Reactivate a Suspended Scheduled Search

If you would like to reactivate the Scheduled Search immediately without waiting for the suspension time out period, you can edit the Scheduled Search and change the **Run Frequency** from **Never** back to the desired frequency. This will reactivate the Scheduled Search immediately. If the cause of the failure was a temporary high load on the system or some other connectivity issue, the Scheduled Search should run properly. But if the root cause is still unknown, it may fail again.

#### What else can I do?

For assistance with Scheduled Search issues, contact [Sumo Logic Support](https://support.sumologic.com/hc/en-us). 
