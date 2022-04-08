---
id: add-scheduled-view
---

# Add a Scheduled View

:::important
To create a Scheduled View you must be an admin or have the Manage Scheduled Views [role capability] (../Users-and-Roles/Manage-Roles/05-Role-Capabilities.md "Role Capabilities").
:::

For Scheduled View query requirements, see [Scheduled Views Best Practices and Examples](scheduled-views-best-practices.md). 

1. In Sumo Logic, go to **Manage Data** \> **Logs** \> **Scheduled Views**.
1. Click **+**. 

    ![add view.png](/img/scheduled-views/add-view.png)

1. In the **Create a View** dialog box, enter the following:

    * **Scheduled View.** Type a name that you'll use to search the data in a query. It's important to use a name that's descriptive and easy to remember. Names can contain alphanumeric characters; underscores( \_ ) are the only special characters allowed. View names can only have (A-Z, a-z, 0-9), $, and \_ after the first letter.
    * **Query.** Type the full query that encompasses the data you'd like indexed in the view. Parse operators and most search operators are supported in views.
    * **Search Mode**. Set to **Auto Parse Mode** for [Dynamic Parsing](../../search/get-started-with-search/build-search/dynamic-parsing.md) of JSON data. Manual Mode is the standard search behavior.
    * **Start Date.** Click the date that you'd like to use as the start time of the index. All data from that point forward will be indexed in the scheduled view. The oldest selectable date represents the end of the retention period of your Sumo Logic account.
    * **Retention Period.** Either enter a retention period for the data in the index, in days, or click **Apply the retention period of Default Continuous Partition**. For more information, see [Manage Indexes with Variable Retention](../partitions-and-data-tiers/manage-indexes-variable-retention.md).
    * **Data Forwarding.** (Optional). Choose **Enable Data Forwarding** to [forward data from Sumo to Amazon S3](../data-forwarding/data-forwarding-to-s3.md). The results from the Scheduled View, raw and aggregate, are forwarded. See [File Format](../data-forwarding/data-forwarding-amazon-s3-bucket.md) for details on how the file objects are structured.

1. Click **Create**.

The view begins to index data as soon as you create it. Allow a few hours for the indexing to complete. If you've chosen to index a large amount of data and/or have chosen a long date range for the view, it could take a bit longer.

Once created, scheduled views are executed once per minute. 
