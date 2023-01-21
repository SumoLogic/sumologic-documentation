---
id: manage-indexes-variable-retention
title: Manage Indexes with Variable Retention
description: With Multi-retention, you can create Index Partitions and Scheduled Views to store your data as needed, and set different retention periods for Partitions and Scheduled Views.
---


Your company log data comes in many types, and different types of data may require different retention periods. For example, some sensitive information may require a short life span, while other vital data, such as customer logins, may require a longer lifespan for daily use. Still other data may need to be available for historical analysis and to gather metrics to make business decisions, though it is not accessed every day.

With Variable Retention, you can create Index Partitions and Scheduled Views to store your data as needed, and set different retention periods for those Partitions and Scheduled Views. This way, you can keep the data you need for as long as you need it, while other less important data can be retained for a shorter period, reducing your overall cost of operation.

You set the retention period when you first create the Partition or Scheduled View, and you can also edit the retention period at any time in the future. 

Retention is measured from the time that data was received, rather than the message time. 

The minimum retention period is 1 day, and the maximum retention period is 5,000 days.

On the **Manage Data** > **Logs** page, there is a tab for **Partitions** and a tab for **Scheduled Views**.

On the **Partitions** tab, the first entry is the Default Partition, which contains all ingested data that is not assigned to a partition or to views populated by Scheduled Searches. The default retention period of the Default Partition is 30 days.

Here you can see the total volume ingested in each Partition, including:

* Index Name
* Routing Expression
* Storage Consumed—The total volume of uncompressed data ingested across the duration of the retention period.
* Retention Period
* [Data Forwarding](/docs/manage/data-forwarding) 

From the three-dot menu on the right, you can select the following
actions:

* Decommission
* View Details
* Edit Retention Period
* [Edit Data Forwarding](/docs/manage/data-forwarding)

## Edit the Retention Period

You may edit the retention period of Partitions and Scheduled Views. The minimum retention period is 1 day, and the maximum retention period is 5,000 days.

1. Go to **Manage Data** > **Logs**.
1. On the **Partitions** or **Scheduled Views** tab, hover over the item you would like to edit the retention period for.
1. Click the three-dot icon on the right of the desired row, and from the menu select **Edit Retention Period**. (You may also edit the retention period from the expanded information dialog. Next to **Retention Period**, click **Edit**.)
1. In the **Edit Retention Period** dialog, enter the new retention period in days. Alternatively, click the **Apply the retention period of the General Index** check box.

   1. If the new retention period is longer than the previous period, click **Save**.    

    ![edit retention](/img/partitions-data-tiers/edit_retention_period_save.png)

    1. If the new retention period is shorter than the previous period, a portion of your data will be deleted in 7 days or right away. Click **Save** and choose either:

       * Simulate this data deletion for a few days and then reduce it permanently by selecting **Reduce retention period after 7 days.** You will be billed for this data until the deletion is permanent, but it gives you a sense of how the deletion will impact you before it is final.

       :::note
       When you select **Reduce Retention Period after 7 days**, the retention period on your Partitions page will not change immediately. There will be a an icon indicating that a retention decrease is imminent in a number of days. When the counter expires, the data will be deleted, the warning icon will disappear, and the new retention policy will be in effect.
       
       The retention period change applies to all data (including data ingested before the change).

       If you want to change your mind at any time during that period and revert to your previous retention period, click **Click here to undo the reduction in retention period**. The retention will stay at previous retention level, and the job to reduce the retention is canceled.
       :::

       * Or, if you are sure you want to proceed and end billing for this data immediately, enter **DELETE** in the text box, then click **Reduce retention period immediately**. The data will be deleted immediately as well.                   

    ![DeleteNOW.png](/img/partitions-data-tiers/DeleteNOW.png)

1. The retention period is updated and displayed in the **Retention Period** column. If you used the **reduce retention after 7 days** option, you can undo your data retention reduction until the date specified by clicking **Click here to undo the reduction in retention period**. Otherwise, the data will be deleted after 7 days.     
