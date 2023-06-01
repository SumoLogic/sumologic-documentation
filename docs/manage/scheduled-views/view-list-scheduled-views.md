---
id: view-list-scheduled-views
title: View Information About Scheduled Views
description: Learn how to view a list of scheduled views configured for your organization and view the details of a scheduled view.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

The page has information about viewing information about the scheduled views configured for your organization.

:::note
You must have a role that grants you the View Scheduled Views [role capability](view-list-scheduled-views.md) in order to view information about scheduled views.
:::

1. Go to **Manage Data** > **Logs** > **Scheduled Views**.<br/> ![Scheduled Views page.png](/img/scheduled-views/Scheduled-Views-page.png)
    * Status. Indicates whether the scheduled view is currently Completed, Failed, Not Started, Filling, or Paused.
    * **Name**. The name assigned to the scheduled view.
    * **Storage Consumed**. The total volume of uncompressed data ingested across the duration of the retention period.
    * **Retention Period**. The number of days configured as the retention period.
    * **Data Forwarding**. Indicates the name of the [data forwarding](../data-forwarding/amazon-s3-bucket.md) destination if the scheduled view is configured to forward data to the S3 bucket.
1. To view details of a scheduled view configuration, click the row that contains the view. <br/>![sched-view-more-options.png](/img/scheduled-views/sched-view-more-options.png)
1. A pane pops up on the right side of the page with the following information.
    * **Name**. Displays the name of the scheduled view.
    * **Query**. The query that returns the data for the scheduled view.
    * **Search Mode**. Indicates the type of search mode, such as Manual Mode or Auto Parse Mode.
    * **Progress**. Indicates how up-to-date the scheduled view is.
    * **Data scanned to fill this scheduled view**.Provides trend information about the data scanned over time and displays the total data scanned for the selected time to run the query.
    * **Retention Period**. The period of time data in the scheduled view is retained.
    * **Start Date**. Date when data was first added to the scheduled view.
    * **Lag Time**. If the scheduled view is not up-to-date, **Lag Time** contains the actual lag time. For more information, see [Scheduled View Lag Time](scheduled-view-lag-time.md).
    * **Query**. The query that returns that data to be written to the scheduled view.
    * **Data Forwarding**. If the scheduled view is configured to forward data to an S3 bucket, the name of the [data forwarding](../data-forwarding/amazon-s3-bucket.md) destination.  
    * **Created by and Modified by**. The user that created the view, and the user that most recently modified the view. <br/> <img src={useBaseUrl('/img/scheduled-views/sched-view-details.png')} alt="Scheduled Views page" width="400"/>
