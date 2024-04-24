---
id: email-alert-data-usage-exceeded
---

# Create an Email Alert to Notify you when Data Usage Reaches 90 Percent of your Account Limit

I want to create an email alert that lets me know when I reach 90% of data usage on my account, so I’m notified before I reach my account limit. What’s the best way to do this?

The best way to do this is to create a Scheduled Search using the sample query included in this article to send you an email alert when your data usage reaches 90% of your account’s limit. As a prerequisite, you will need to enable the Data Volume Index to collect more detailed statistics about your account.

## Prerequisite: Enable the Data Volume Index

If you do not already have the Data Volume Index enabled, you will need to enable it. If you already have the Data Volume Index enabled, continue to the next section.

To enable the Data Volume Index, use the instructions in [Enable and Manage the Data Volume Index](/docs/manage/ingestion-volume/data-volume-index).

:::important
Once the Data Volume index is enabled, let it run for at least 24 hours before you create your Scheduled Search.
:::

## Create a Scheduled Search

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
1. Click **Save As**.

    ![DataUsageBreached.png](/img/alerts/DataUsageBreached.png)

1. In the **Save Search As** dialog, enter a name for this Scheduled Search, such as **90% Data Usage Limit Reached**.
1. **Run frequency.** Select **Every 4 hours**.
1. Click **Schedule this search**. 

   * **Time range for the scheduled search.** Select **Today**.
   * **Alert condition.** Select **Send notification only if the condition below is satisfied:** and enter **Number of results Greater than \> 0**.
   * **Alert Type.** Select **Email**.
   * Enter the **email address** where you would like to be alerted.

1. For all configuration options, see [Schedule a Search](/docs/alerts/scheduled-searches/schedule-search.md). 
1. Click **Save**.
