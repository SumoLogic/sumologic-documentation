---
id: add-view
title: Add a Scheduled View
description: Learn how to add a Scheduled View.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::important
To create a Scheduled View you must be an admin or have the Manage Scheduled Views [role capability](/docs/manage/users-roles/users/multi-account-access).
:::

For Scheduled View query requirements, see [Scheduled Views Best Practices and Examples](/docs/manage/views/scheduled-views/best-practices). 

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic/). In the main Sumo Logic menu, select **Manage Data > Logs > Views**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui/). In the top menu select **Configuration**, and then under **Logs** select **Scheduled Views**. You can also click the **Go To...** menu at the top of the screen and select **Scheduled Views**.
1. Click **+ Add View**. <br/><img src={useBaseUrl('/img/scheduled-views/scheduled-view-page.png')} alt="scheduled-view-page" style={{border:'1px solid gray'}} width="800"/>
1. Enter the follow fields to create the scheduled view:
    1. **Scheduled View name**. Enter a name for the view. You'll use this name in queries to search the view, so use a name that's descriptive and easy to remember. Names can contain alphanumeric characters; underscores (`_`) are the only special characters allowed. View names can only have (A-Z, a-z, 0-9), $, and _ after the first letter.
    1. **Query.** Enter the full query that encompasses the data you'd like indexed in the view. Parse operators and most search operators are supported in views.
    1. **Start Date.** Click the date that you'd like to use as the start time of the index. All data from that point forward will be indexed in the scheduled view. The oldest selectable date represents the end of the retention period of your Sumo Logic account.
        :::note limitation
        You cannot select a start date older than 365 days.
        :::
    1. **Search Mode**. Set to **Auto Parse Mode** for [Dynamic Parsing](/docs/search/get-started-with-search/build-search/dynamic-parsing) of JSON data. Manual Mode is the default search behavior.
    1. **Retention Period.** Either enter a retention period for the data in the index, in days, or click **Apply the retention period of sumologic_default**. For more information, see [Manage Indexes with Variable Retention](/docs/manage/partitions/manage-indexes-variable-retention).
    1. **Data Forwarding.** (Optional). Choose **Enable Data Forwarding** to [forward data from Sumo to Amazon S3](/docs/manage/data-forwarding/amazon-s3-bucket). The results from the Scheduled View are forwarded to S3. Raw logs are sent if the view query does not use an aggregate operator. If the view query performs an aggregation, aggregate results are sent. See [File Format](/docs/manage/data-forwarding/amazon-s3-bucket) for details on how the file objects are structured.
    <img src={useBaseUrl('/img/scheduled-views/add-view.png')} alt="add-view" style={{border:'1px solid gray'}} width="400"/>
1. Click **Save**.

The view begins to index data as soon as you create it. Allow a few hours for the indexing to complete. If you've chosen to index a large amount of data and/or have chosen a long date range for the view, it could take a bit longer.

Once created, scheduled views are updated once per minute. 
