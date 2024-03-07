---
id: manage-indexes-variable-retention
title: Manage Indexes with Variable Retention
description: With Multi-retention, you can create Index Partitions and Scheduled Views to store your data as needed, and set different retention periods for Partitions and Scheduled Views.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

In managing your company's log data, it's crucial to recognize the diverse nature of data types, each potentially warranting distinct retention periods. For instance, sensitive information may necessitate a shorter lifespan for security purposes, while critical data like customer logins may require extended retention to support daily operations. Additionally, certain data serves a dual purpose, requiring availability for historical analysis and metric gathering despite not being accessed daily.

With Variable Retention, you can create Index Partitions and Scheduled Views to store your data as needed, and set different retention periods for those Partitions and Scheduled Views. This way, you can keep the data you need for as long as you need it, while other less important data can be retained for a shorter period, reducing your overall cost of operation.

You set the retention period when you first [create the Partition](/docs/manage/partitions-data-tiers/create-edit-partition/#create-a-partition) or [Scheduled View](/docs/manage/scheduled-views), and you can also edit the retention period at any time in the future. 

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

From the three-dot kebab menu on the right, you can select the following
actions:

* Decommission
* View Details
* Edit Retention Period
* [Edit Data Forwarding](/docs/manage/data-forwarding)

## Edit the Retention Period

You may edit the retention period of Partitions and Scheduled Views. The minimum retention period is 1 day, and the maximum retention period is 5,000 days.

1. Go to **Manage Data** > **Logs**.
1. On the **Partitions** or **Scheduled Views** tab, hover over the item you would like to edit the retention period for.
1. Click the three-dot kebab icon on the right of the desired row, and from the menu select **Edit Retention Period**. (You may also edit the retention period from the expanded information dialog. Next to **Retention Period**, click **Edit**.)
1. In the **Edit Retention Period** dialog, enter the new retention period in days.
   1. If the new retention period is longer than the previous period, click **Save**.<br/> <img src={useBaseUrl('img/partitions-data-tiers/edit_retention_period_save.png')} alt="edit_retention_period_save.png" width="300"/>
   1. If the new retention period is shorter than the previous period, a portion of your data will be deleted in 7 days or right away. Click **Save** and choose either:
       * Simulate this data deletion for a few days and then reduce it permanently by selecting **Apply change in 7 days**. You will be billed for this data until the deletion is permanent, but it gives you a sense of how the deletion will impact you before it is final.<br/><img src={useBaseUrl('img/partitions-data-tiers/reduce-retention-period.png')} alt="reduce-retention-period" width="350"/>
         :::info
         With this option, the retention period on your Partitions page will not change immediately. There will be an icon indicating that a retention decrease is imminent in a number of days. When the counter expires, the data will be deleted, the warning icon will disappear, and the new retention policy will be in effect. The retention period change applies to all data (including data ingested before the change).
         :::
       * Or, if you are sure you want to proceed and end billing for this data immediately, click **Apply change now**. The data will be deleted immediately as well.
1. The retention period is updated and displayed in the **Retention Period** column.
   :::info
   If you used the **Apply change in 7 days** option and change your mind, you have the option to undo your data retention reduction until the date you specified. The retention will stay at previous retention level, and the job to reduce the retention is canceled. Otherwise, the data will be deleted after 7 days.
   :::
