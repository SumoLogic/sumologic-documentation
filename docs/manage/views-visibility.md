---
id: views-visibility
title: Views Visibility
description: Learn how to use the unified Views page in Sumo Logic to discover, filter, and manage all your views and their data sources from a single interface.
keywords:
  - views
  - views visibility
  - scheduled views
  - ad hoc views
  - data management
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href={useBaseUrl('docs/preview')}><span className="preview-private">Private Preview</span></a></p>

:::info
This feature is in Private Preview. For more information, contact your Sumo Logic account representative.
:::

import useBaseUrl from '@docusaurus/useBaseUrl';

The **Views** page provides a unified interface to discover, filter, and manage all your views and their associated data sources in one place. It replaces the previous **Scheduled Views** page and consolidates all view types, including scheduled views, scheduled searches, and ad hoc searches, into a single listing under **Data Management**.

## What are views?

A view is a named index that stores the results of queries over time. A single view can have multiple data sources contributing to it. The unified **Views** page gives you complete visibility into what is writing to each view and which data sources are associated with it.

:::note
Partitions are not included in the **Views** page. They are managed separately through the [Partitions](/docs/manage/partitions/) page.
:::

## Key capabilities

- Visibility of all indexes is based on admin-created roles and permissions.
- You can delete or decommission user-created indexes.
- You can view the schema of each view and see views in search autocomplete based on your access.
- As an administrator, you can view existing system limits for each type and the amount of consumed quota.
- Only administrators can define access control on indexes.
- Only scheduled searches with the **Save to Index** alert type are visible in Views.

## Data source types

The **Views** page tracks three types of data sources:

| Data Source | Description |
|:--|:--|
| [**Scheduled Views**](/docs/manage/views/scheduled-views/) | Predefined views that run on a schedule and store aggregated query results to an index. This is the default selection when you open the **Views** page. |
| [**Scheduled Searches**](/docs/alerts/scheduled-searches/) | Saved searches configured to run at a specified frequency and save results to a view via notifications. |
| **Ad Hoc Searches** | Arbitrary queries run using the `save` view operator that write results to a view. Tracking for ad hoc searches is available from April 2026 onwards. Data written before this date may not be fully traceable. |

## How to access the Views page

[**New UI**](/docs/get-started/sumo-logic-ui). In the main Sumo Logic menu, select **Data Management**, then under **Logs**, select **Views**. You can also click the **Go To...** menu at the top of the screen and select **Views**.<br/>[**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Views**.<br/><img src={useBaseUrl('/img/views/views-page.png')} style={{border: '1px solid gray'}} alt="views-page" width="800"/>

:::note
The page opens with **Scheduled Views** selected as the default data source.
:::

## How to use the Views page

The **Views** page lists all views in your organization. For each view, you can see the associated data sources and their types.

To explore data sources for a view:

1. Select a data source type from the top of the page: **Scheduled Views**, **Scheduled Searches**, or **Ad Hoc Searches**.
1. The listing updates to show views associated with the selected data source type.
1. Click a view to see its details, including all data sources contributing to it.

## How to add a Scheduled View

:::important
To create a scheduled view, you must be an admin or have the Manage Views [role capability](/docs/manage/users-roles/roles/role-capabilities/).
:::

For scheduled view query requirements, see [Scheduled Views Best Practices and Examples](/docs/manage/views/scheduled-views/best-practices).

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Views**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Scheduled Views**. You can also click the **Go To...** menu at the top of the screen and select **Scheduled Views**.
1. Click **+ Add View**. <br/><img src={useBaseUrl('/img/views/view-page-add-new.png')} alt="view-page" style={{border:'1px solid gray'}} width="800"/>
1. Enter the following fields to create the scheduled view:
    1. **Name**. Enter a name for the view. You will use this name in queries to search the view, so use a name that is descriptive and easy to remember. Names can contain alphanumeric characters; underscores (`_`) are the only special characters allowed. View names can only have (A-Z, a-z, 0-9), $, and _ after the first letter.
    1. **Query**. Enter the full query that encompasses the data you would like indexed in the view. Parse operators and most search operators are supported in views.
    1. **Start Date**. Click the date that you would like to use as the start time of the index. All data from that point forward will be indexed in the scheduled view. The oldest selectable date represents the end of the retention period of your Sumo Logic account.
        :::note
        You cannot select a start date older than 365 days.
        :::
    1. **Search Mode**. Set to **Auto Parse Mode** for [Dynamic Parsing](/docs/search/get-started-with-search/build-search/dynamic-parsing) of JSON data. Manual Mode is the default search behavior.
    1. **Timezone**.
    1. **Enable AutoParse**.
    1. **Retention Period**. Either enter a retention period for the data in the index, in days, or click **Apply the retention period of sumologic_default**. For more information, see [Manage Indexes with Variable Retention](/docs/manage/partitions/manage-indexes-variable-retention).
    1. (Optional) **Data Forwarding**. Choose **Enable Data Forwarding** to [forward data from Sumo to Amazon S3](/docs/manage/data-forwarding). The results from the Scheduled View are forwarded to S3. Raw logs are sent if the view query does not use an aggregate operator. If the view query performs an aggregation, aggregate results are sent. <br/><img src={useBaseUrl('/img/views/add-view.png')} alt="add-view" style={{border:'1px solid gray'}} width="400"/>
1. Click **Save**.

The view begins to index data as soon as you create it. Allow a few hours for the indexing to complete. If you have chosen to index a large amount of data and/or have chosen a long date range for the view, it could take longer.

Once created, scheduled views are updated once per minute.

## How to view information about views

The page has information about viewing information about the views/indexes configured for your organization.

:::note
Ensure you have **View Views** [role capability](/docs/manage/users-roles/roles/role-capabilities/) to view information about scheduled views.
:::

1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Views**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Views**. You can also click the **Go To...** menu at the top of the screen and select **Views**.
    * **Add a Filter**. To refine the table results, use the **Add a filter** section located above the table. *AND* logic is applied when filtering between different sections, while *OR* logic is applied when filtering within the same section. The filter options are similar to the functionality available in the previous **Scheduled Views** page. You can use the filter bar to narrow results by view name, data source type, or other available attributes.
    * **Status**. Indicates whether the view is currently Completed, Failed, Not Started, Filling, or Paused.
    * **View Name**. The name assigned to the view.
    * **Storage Consumed**. The total volume of uncompressed data ingested across the duration of the retention period.
    * **Retention Period**. The number of days configured as the retention period.
    * **Data Forwarding**. Indicates the name of the [data forwarding](/docs/manage/data-forwarding) destination if the scheduled view is configured to forward data to the S3 bucket.
1. To view details of a view configuration, click the row containing the view. A pane will appear on the right side of the page with the following information.
    * **Name**. Displays the name of the view.
    * **Data Sources - Scheduled View**. Displays the scheduled views associated with the selected view/index.
        * **View Source ID**. Unique ID for each scheduled view, used for faster debugging and improved internal operation efficiency. With the scheduled view ID, you can collect the details and update the scheduled view directly using the API.
        * **Status**. Indicates whether the scheduled view is currently Completed, Failed, Not Started, Filling, or Paused.
        * **Query**. The query that returns the data for the scheduled view.
        * **Search Mode**. Indicates the type of search mode, such as Manual Mode or Auto Parse Mode.
        * **Run Frequency**. Displays the frequency of run to collect the data.
        * **Start Date**. Date when data was first added to the scheduled view.
        * **Lag Time**. If the scheduled view is not up-to-date, **Lag Time** contains the actual lag time. For more information, see [Scheduled View Lag Time](/docs/manage/views/scheduled-views/lag-time).
        * **Timezone**. The timezone used for the scheduled view's time range calculations and run schedule.
        * **Last Accessed**. The date and time the scheduled view was last queried or accessed.
        * **AutoPause Status**. Indicates whether AutoPause is enabled for the scheduled view. When enabled, the scheduled view is automatically paused if it has not been accessed within a defined period, helping reduce unnecessary data scans and costs.
        * **Scheduled AutoPause Date**. The date on which the scheduled view is set to be automatically paused if it remains inactive until that point.
        * **Progress**. Indicates how up-to-date the scheduled view is. <br/><img src={useBaseUrl('/img/views/scheduled-view-details.png')} style={{border: '1px solid gray'}} alt="sched-view-details" width="400"/>
    * **Data Sources - Scheduled Searches**. Displays the scheduled searches associated with the selected view/index.
        * **View Source ID**. Unique ID for each scheduled search, used for faster debugging and improved internal operation efficiency. With the scheduled search ID, you can collect the details and update the scheduled search directly using the API.
        * **Status**. Indicates whether the scheduled search is currently Completed, Failed, Not Started, Filling, or Paused.
        * **Query**. The query that returns the data for the scheduled search.
        * **Search Mode**. Indicates the type of search mode, such as Manual Mode or Auto Parse Mode.
        * **Run Frequency**. Displays the frequency of run to collect the data.
        * **Timerange**. Displays the time range for your scheduled search.
        * **Last Run**. Displays the last run date for your scheduled search.
        * **Scheduled Search**. Click **Open in Search** to open the scheduled search in log search. <br/><img src={useBaseUrl('/img/views/scheduled-search-details.png')} style={{border: '1px solid gray'}} alt="sched-search-details" width="400"/>
    * **Data Sources - Ad Hoc Searches**. Displays the arbitrary queries that ran using the `save` view operator that write results to a view. Click the **View Details** button to navigate to the log search page for deeper insights on this query.<br/><img src={useBaseUrl('/img/views/adhoc-details.png')} style={{border: '1px solid gray'}} alt="adhoc-details" width="600"/>
    * **Data scanned to fill this scheduled view**. Provides trend information about the data scanned over time and displays the total data scanned for the selected time to run the query.
    * **Retention Period**. The period of time data in the scheduled view is retained.
    * **Data Model**. Type of tier or flex.
    * **Query**. The query that returns that data to be written to the scheduled view.
    * **Data Forwarding**. If the scheduled view is configured to forward data to an S3 bucket, the name of the [data forwarding](/docs/manage/data-forwarding) destination.
    * **Created by** and **Modified by**. The user that created the view, and the user that most recently modified the view.

## Limitations

- **Ad hoc search tracking**. Tracking for ad hoc searches is approximate for data written before April 2026. The system may show **Could have contributed** or **Did not contribute** indicators when historical data cannot be confirmed.
- **Partitions excluded**. Partitions do not appear on the **Views** page. Use the [Partitions](/docs/manage/partitions/) page to manage them.
- **Partitions and scheduled views**. A partition and a scheduled view cannot share the same view name and cannot coexist under the same view.
- **Views per organization**. Each organization can have a maximum of 1,000 views across all types.
- **Scheduled Views per organization**. Each organization can have a maximum of 500 scheduled views.
- **All other views per organization**. All other view types are limited to a maximum of 50 per organization.

## FAQ

### What is the difference between the Views page and the Scheduled Views page?

The **Views** page replaces the **Scheduled Views** page and provides a unified interface that consolidates all view types, including scheduled views, scheduled searches, and ad hoc searches, into a single listing. The previous **Scheduled Views** page only showed scheduled views, requiring you to switch between pages to manage different view types. The new **Views** page removes that context switching by bringing everything into one place.

### What data source types are visible on the Views page?

The **Views** page displays three data source types: **Scheduled Views**, **Scheduled Searches**, and **Ad Hoc Searches**. Scheduled Views is the default selection when you open the page. A single view can have multiple data sources contributing to it, and all contributing sources are visible in the right-side details pane when you click a view.

### How do I control who can see which views?

Visibility of all indexes is based on roles and permissions defined by your administrator. Only administrators can define access control on indexes. Contact your Sumo Logic administrator to request access to specific views or to update role capabilities.

### How do I check the system limits for views in my organization?

Administrators can view existing system limits for each view type and the amount of consumed quota directly from the **Views** page. The default limits are 1,000 views per organization across all types, 500 scheduled views, and 50 for all other view types. To request a limit increase, contact your Sumo Logic account representative.

### How do I identify why ad hoc search data is missing or approximate?

Tracking for ad hoc searches is available from April 2026 onwards. For data written before this date, the system may display **Could have contributed** or **Did not contribute** indicators because historical tracking data is not fully available. This is expected behavior and does not indicate an error with the view or the query.

### What scheduled searches appear on the Views page?

Only scheduled searches configured with the **Save to Index** alert type appear on the **Views** page. Scheduled searches using other alert types, such as email notifications or webhook alerts, are not included in the **Views** page listing.
