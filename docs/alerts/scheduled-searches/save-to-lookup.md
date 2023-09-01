---
id: save-to-lookup
title: Save to Lookup
sidebar_label: Save to Lookup
description: Learn how to save the results of a scheduled search to a Lookup Table.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

When you create a scheduled search, you can choose **Save to Lookup** as the alert type. This way, you can view the search results later in the lookup table. You can use the lookup operator to enrich other log data with information from the lookup table.

## Rules

* The lookup table must already exist before you can use the **Save to Lookup** option. For instructions, see [Create a Lookup Table](/docs/search/lookup-tables/create-lookup-table).
* Make sure your search returns all of the fields defined in the lookup table schema and no additional fields. Additional fields will be dropped and not saved to the lookup table. If your search returns fewer fields than that defined for the lookup table, any missing fields whose data type is string will be marked as NULL during the save operation. Missing fields of other data types will be dropped. If your search results are missing the primary key, the save operation will fail. 
* The `save` operator is not supported. You can only use the `save` operator to save your search results to a lookup table when not doing a scheduled search. See [save Search Operator](/docs/search/search-query-language/search-operators/save).
* Updates to a lookup table from a scheduled search will appear in the [Lookup Actions History pane](/docs/search/lookup-tables/manage-update-lookup-tables/#view-lookup-table-update-status) that is displayed for lookup table when you open it from the Sumo Logic Library.
* No more than 512 messages returned by a scheduled search can be saved to a lookup table.

## Save the results of scheduled search to a lookup table

1. Create a log query.
1. Click the save icon.<br/><img src={useBaseUrl('img/alerts/save-search.png')} alt="Save search icon" width="800" />
1. On the **Save Item** popup, click **Schedule this search**. <br/><img src={useBaseUrl('img/alerts/save-item-1.png')} alt="Save icon" width="500" />
1. Click in the **Run frequency** field, and select how frequently you want the search to run. For information, see [Schedule a Search](/docs/alerts/scheduled-searches/schedule-search). 
1. On the **Save Item** popup:
   1. **Send Notification**. For information about this option , see [Schedule a Search](/docs/alerts/scheduled-searches/schedule-search).
   1. **Time range** and **Timezone**. For information about this option, see [Schedule a Search](/docs/alerts/scheduled-searches/schedule-search).
   1. **Alert Type**. Select **Save to Lookup**.
   1. **Save to Lookup Table**. Select the folder that contains the lookup table where you want the search results saved.
   1. **Save operation method**. 
      * **Full Replace**. Choose this option to completely replace the data in the lookup table with the scheduled search results each time the search runs.
      * **Merge**. Choose this option to update existing lookup tables rows with new values, or to add new rows to a lookup table. 
1. Click **Save**.
