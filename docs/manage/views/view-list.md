---
id: view-list
title: View Information About Views
description: Learn how to view a list of scheduled views configured for your organization and view the details of a scheduled view.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The page has information about viewing information about the views/indexes configured for your organization.

:::note
You must have a role that grants you the View Scheduled Views [role capability](view-list.md) in order to view information about scheduled views.
:::

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Views**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Views**. You can also click the **Go To...** menu at the top of the screen and select **Views**. <br/><img src={useBaseUrl('/img/scheduled-views/scheduled-view-page.png')} style={{border: '1px solid gray'}} alt="scheduled-view-page" width="800"/>
    * **Add a Filter**. To refine the table results, use the **Add a filter** section located above the table. *AND* logic is applied when filtering between different sections, while *OR* logic is applied when filtering within the same section.
        :::note
        You can see the suggestions only if there are two or more responses for the same column or section.
        :::
    * **Status**. Indicates whether the view is currently Completed, Failed, Not Started, Filling, or Paused.
    * **View Name**. The name assigned to the view.
    * **Storage Consumed**. The total volume of uncompressed data ingested across the duration of the retention period.
    * **Retention Period**. The number of days configured as the retention period.
    * **Data Forwarding**. Indicates the name of the [data forwarding](../data-forwarding/amazon-s3-bucket.md) destination if the scheduled view is configured to forward data to the S3 bucket.
1. To view details of a view configuration, click the row containing the view. A pane will appear on the right side of the page with the following information.
    * **Name**. Displays the name of the view.
    * **Data Sources - Scheduled View**. Displays the scheduled views ssociated with the selected view/index.
        * **View Source ID**. Unique ID for each scheduled view, used for faster debugging and improved internal operation efficiency. With the scheduled view ID, you can collect the details and update the scheduled view directly using the API.
        * **Status**. Indicates whether the scheduled view is currently Completed, Failed, Not Started, Filling, or Paused.
        * **Query**. The query that returns the data for the scheduled view.
        * **Search Mode**. Indicates the type of search mode, such as Manual Mode or Auto Parse Mode.
        * **Run Frequency**. Displays the frequency of run to collect the data.
        * **Start Date**. Date when data was first added to the scheduled view.
        * **Lag Time**. If the scheduled view is not up-to-date, **Lag Time** contains the actual lag time. For more information, see [Scheduled View Lag Time](lag-time.md).
        * **Progress**. Indicates how up-to-date the scheduled view is. <br/><img src={useBaseUrl('/img/scheduled-views/sched-view-details.png')} style={{border: '1px solid gray'}} alt="sched-view-details" width="400"/>
    * **Data Sources - Scheduled Searches**. Displays the scheduled searches ssociated with the selected view/index.
        * **View Source ID**. Unique ID for each scheduled search, used for faster debugging and improved internal operation efficiency. With the scheduled search ID, you can collect the details and update the scheduled search directly using the API.
        * **Status**. Indicates whether the scheduled search is currently Completed, Failed, Not Started, Filling, or Paused.
        * **Query**. The query that returns the data for the scheduled search.
        * **Search Mode**. Indicates the type of search mode, such as Manual Mode or Auto Parse Mode.
        * **Run Frequency**. Displays the frequency of run to collect the data.
        * **Timerange**. Displays the time range for your scheduled search.
        * **Last Run**. Displays the last run date for your scheduled search.
        * **Scheduled Search**. Click *Open in Search* to open the scheduled search in log search. <br/><img src={useBaseUrl('/img/scheduled-views/sched-search-details.png')} style={{border: '1px solid gray'}} alt="sched-view-details" width="400"/>
    * **Data scanned to fill this scheduled view**. Provides trend information about the data scanned over time and displays the total data scanned for the selected time to run the query.
    * **Retention Period**. The period of time data in the scheduled view is retained.
    * **Query**. The query that returns that data to be written to the scheduled view.
    * **Data Forwarding**. If the scheduled view is configured to forward data to an S3 bucket, the name of the [data forwarding](../data-forwarding/amazon-s3-bucket.md) destination.  
    * **Created by** and **Modified by**. The user that created the view, and the user that most recently modified the view. <br/><img src={useBaseUrl('/img/scheduled-views/sched-details.png')} style={{border: '1px solid gray'}} alt="sched-view-details" width="400"/>