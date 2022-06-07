---
id: view-list-scheduled-views
---

# View Information About Scheduled Views

The page has information about viewing information about the scheduled views configured for your organization.

:::note
You must have a role that grants you the View Scheduled Views [role capability](view-list-scheduled-views.md) in order to view information about scheduled views.
:::

1. Go to **Manage Data** \> **Logs** \> **Scheduled Views**.

    ![Scheduled Views page.png](/img/scheduled-views/Scheduled-Views-page.png)
    
    * **Name**. The name assigned to the scheduled view. 
    * **Storage Consumed**. The total volume of uncompressed data ingested across the duration of the retention period. 
    * **Retention Period**. The number of days configured as the retention period. 
    * **Data Forwarding**. If the scheduled view is configured to forward data to an S3 bucket, this column contains the name of the [data forwarding](../data-forwarding/data-forwarding-to-s3.md) destination.  

1. To view details of the scheduled view configuration, click the more options icon for the view, and select **View Details** from the menu.

    ![sched-view-more-options.png](/img/scheduled-views/sched-view-more-options.png)

1. The page expands to display the scheduled view configuration.

    ![sched-view-details.png](/img/scheduled-views/sched-view-details.png) 
    
    In addition to information about who created the schedule view, and when, the following is displayed:
    
    * **Retention Period**. The period of time data in the scheduled view is retained. 
    * **Progress** and **Lag Time.** The progress bar indicates how up-to-date the scheduled view is, and if it is not up-to-date, **Lag Time** contains the actual lag time. For more information see [Scheduled View Lag Time](scheduled-view-lag-time.md)
    * **Query**. The query that returns that data to be written to the scheduled view.
    * **Data Forwarding**. If the scheduled view is configured to forward data to an S3 bucket, the name of the [data forwarding](../data-forwarding/data-forwarding-to-s3.md) destination.  
