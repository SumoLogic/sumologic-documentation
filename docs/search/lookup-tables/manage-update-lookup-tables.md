---
id: manage-update-lookup-tables
title: Manage and Update Lookup Tables
sidebar_label: Managing Lookup Tables
description: Learn how to update, export, and share Lookup Tables.
---

The page has information about updating, exporting, and sharing Lookup Tables. For information about creating a new Lookup Table, see [Create a Lookup Table](create-lookup-table.md).

:::note
New Lookup Tables are available in all deployments except Sumo Logic's Montreal deployment, pending AWS providing a required AWS service in the Montreal region.
:::

## Update the contents of a lookup table

This section has instructions for updating a lookup table. You can:

* [Merge data](#merge-data-into-a-lookup-table) - Use this option to update existing rows with new values, or to add new rows to the lookup table. 
* [Replace data](#replace-all-the-rows-in-a-lookup-table-with-new-rows) — Use this option to completely replace the data in the lookup table with the data in the .csv file. 
* [Delete data](#delete-a-lookup-table) - Use this option to remove all the data in the lookup table. 

You can also use the [Lookups API](https://api.sumologic.com/docs/#tag/lookupManagement) to update a lookup table. 

### Merge data into a lookup table

You can use the **Merge Data** option to update existing lookup tables rows with new values, or to add new rows to a lookup table. 

Before you start, create a .csv file that contains the data you want to merge. Note that:

* The header of the .csv file must contain the primary key fields, or the merge operation will fail. 
* If a primary key value in the .csv file matches an existing primary key value in the lookup table, the corresponding row in the table will be overwritten.
* If a primary key value in the .csv file does not match a primary key value in any row in the table, a new row will be added to the table.
* Any rows that exist in the lookup table, but not in the .csv file, will remain unchanged.
* If the first row of the file does not match the fields defined in the table schema, the updates in the file will be discarded, and the lookup table will not be updated.
* If the .csv file contains additional columns (fields) that aren't defined in the table schema, the additional fields will be dropped during the merge operation. 
* If the file does not contain one or more columns (fields) that are defined the table schema, the merge operation. will fail. The primary key(s) **must** be present in the file for the merge to succeed. 

The file should have a .csv extension, and not be larger than 100 MB. The first row of the table should contain the names of the fields defined in the table schema. 

For example:

```
username,IPAddress,region
```

1. Go to the Sumo Logic Library.
1. Mouse over the lookup table you want to view, and select **Edit** from the three-dot more options menu.
1. The edit page for the lookup table appears.  

    ![edit-lookup-table.png](/img/search/lookup-tables/edit-lookup-table.png)

1. Click **Merge Data**.
1. The **Merge Lookup Data** popup appears.  

    ![merge-lookup-data.png](/img/search/lookup-tables/merge-lookup-data.png)

1. Click **Upload**.
1. Navigate to the .csv file and click **Open**.
1. Click **Done**.

### Replace all the rows in a lookup table with new rows

You can use the **Replace Data** option to completely replace the data in a lookup table with the data in a .csv file.

Before you start, create a .csv file that contains the rows you overwrite the lookup table with.  

The file should have a .csv extension, and not be larger than 100 MB. The first row of the table should contain the names of the fields defined in the table schema. For example:

`username,IPAddress,region`

For a field that is configured to be boolean, make sure that the field value is either `true` or `false`. Field values are case-insensitive, so `TRUE` or `FALSE` are also fine. However, if a boolean field contains any other value, the value written to the table will be `false`.

1. Go to the Sumo Logic Library.
1. Mouse over the lookup table you want to view, and select **Edit**
    from the three-dot more options menu.
1. The edit page for the lookup table appears.  

    ![edit-lookup-table.png](/img/search/lookup-tables/edit-lookup-table.png)

1. Click **Replace Data**.
1. The **Replace All Lookup Data** popup appears.  

    ![replace-all-lookup-data.png](/img/search/lookup-tables/replace-all-lookup-data.png)

1. Click **Upload**.
1. Navigate to the .csv file and click **Open**.
1. Click **Done.**

#### Delete the contents of a lookup table

You can use the **Delete Data** option to remove all the data in a lookup table.

Follow the steps below to delete all of the contents of a lookup table:

1. Go to the Sumo Logic Library.
1. Mouse over the lookup table you want to delete, and select **Edit** from the three-dot more options menu.
1. The edit page for the lookup table appears.  

    ![edit-lookup-table.png](/img/search/lookup-tables/edit-lookup-table.png)

1. Click **Delete Data.**
1. You are prompted to confirm that you want to delete the contents of the lookup file.  

    ![delete-lookup-data.png](/img/search/lookup-tables/delete-lookup-data.png)

1. Enter `Delete`, and click **Delete**.

### Update a lookup table with the save operator

You can use the `save` operator to save the results of a Sumo log query to a lookup table you created using the Lookup UI or API. For more information, see [save Operator](/docs/search/search-query-language/search-operators/save).

To save the results of a query to a lookup table in a scheduled search, see [Save to Lookup](/docs/alerts/scheduled-searches/save-to-lookup/).

## Export a lookup table schema

If you want to replicate a lookup table schema in a different folder in the Library, the process is to export it, and then import it into the desired folder. When you export a lookup table, the data it contains is not exported.

1. Go to the Sumo Logic Library.
1. Mouse over the lookup table you want to export, and select **Export** from the three-dot more options menu.
1. The export popup presents the contents of the lookup table in JSON format.  

    ![export-lookup-table.png](/img/search/lookup-tables/export-lookup-table.png)

1. Click **Copy** to copy the JSON to the clipboard, or **Download** to download a JSON file.
1. Click **Done**. 
1. To create new lookup table with the JSON, follow the instructions in [Import Content in the Library](/docs/get-started/library#import-content).

## Share a lookup table

You can share a lookup table with other users, a role, or a combination
of the two. 

1. Go to the Sumo Logic Library.
1. Mouse over the row for a lookup table you want to share, and click the sharing icon towards the right side of the row. You’ll be prompted to enter the user and roles with whom you want to share the table, the level of access you want to grant, and other sharing options. For information about sharing, see [Share Content](/docs/manage/content-sharing).

## Delete a lookup table

You can also use the [Lookups API](https://api.sumologic.com/docs/#tag/lookupManagement) to create a delete table. 

Follow the steps below to completely delete a lookup table:

1. Go to the Sumo Logic Library.
1. Mouse over the lookup table you want to delete, and select
    **Delete** from the three-dot more options menu.

## View Lookup Table update status

When you are viewing a Lookup Table in the Library, you can view information about multi-row updates to the table that are queued up or have been recently completed.   

You can toggle your view between **Lookup Actions Queue** and **Lookup Actions History** with the icons labeled **a** and **b** in the screenshot below, respectively.

![lookup-actions-history.png](/img/search/lookup-tables/lookup-actions-history.png)

The notifications include what type of update was initiated and its status.

Types of updates include: 

* **Full Replace**. The contents of the  Lookup Table were completely replaced. 
* **Merge Data**. The contents of the Lookup Table were updated (if they already existed), or additional rows were appended (if they didn't already exist). No data was deleted.
* **Delete Data**. The contents of the current lookup were completely deleted by the user.

The status of an update can be one of the following:

* **Queued**. The update operation has been queued but hasn't been completed. 
* **In Progress**. The update operation is in progress.  
* **Completed**. The update operation was successfully completed.
* **Completed with Warning**. The update operation was successful, but there were some warnings.  
* **Error**. There was an issue in completing the update operation. 
