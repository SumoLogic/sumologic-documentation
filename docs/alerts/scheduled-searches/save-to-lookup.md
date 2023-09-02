---
id: save-to-lookup
title: Save to Lookup
sidebar_label: Save to Lookup
description: Learn how to save the results of a scheduled search to a Lookup Table.
---

When you create a Scheduled Search, you can choose Save to Lookup as the Alert type. This way, you can view the search results later in the Lookup Table. You can use the lookup operator to enrich other log data with information from the Lookup Table.

## Rules

* The Lookup Table must already exist before you can use the **Save to Lookup** option. For instructions, see [Create a Lookup Table](../../search/lookup-tables/create-lookup-table.md).
* Make sure your search returns all of the fields defined in the Lookup Table schema and no additional fields. Additional fields will be dropped and not saved to the Lookup Table. If your search returns fewer fields than that defined for the Lookup Table, any missing fields whose data type is string will be marked as NULL during the save operation. Missing fields of other data types will be dropped. If your search results are missing the primary key, the save operation will fail. 
* The `save` operator is not supported.
* Updates to a Lookup Table from a scheduled search will appear in the [Lookup Actions History pane](../../search/lookup-tables/manage-update-lookup-tables.md) that is displayed for Lookup Table when you open it from the Sumo Logic Library.
* No more than 512 messages returned by a scheduled search can be saved to a Lookup Table.

## Save the results of Scheduled Search to a Lookup table

1. Create a log query.
1. Click the save icon.<br/>![save-as-link.png](/img/alerts/save-search.png)
1. On the **Save Item** popup, click **Schedule this search**. <br/>![save-item-1.png](/img/alerts/save-item-1.png)
1. Click in the **Run frequency** field, and select how frequently you want the search to run. For information, see [Schedule a Search](schedule-search.md). 
1. On the **Save Item** popup:
   1. **Send Notification**. For information about this option , see [Schedule a Search](schedule-search.md).
   1. **Time range** and **Timezone**. For information about this option, see [Schedule a Search](schedule-search.md).
   1. **Alert Type**. Select **Save to Lookup**.
   1. **Save to Lookup Table**. Select the folder that contains the Lookup Table where you want the search results saved.
   1. **Save operation method**. 
      * **Full Replace**. Choose this option to completely replace the data in the Lookup Table with the scheduled search results each time the search runs.
      * **Merge**. Choose this option to update existing lookup tables rows with new values, or to add new rows to a lookup table. 
1. Click **Save**.
