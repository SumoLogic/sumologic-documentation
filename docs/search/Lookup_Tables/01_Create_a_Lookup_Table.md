---
id: "-create-a-lookup-table"
---

# Create a Lookup Table

This page has instructions for creating and and managing Lookup Tables
using the Sumo Logic UI.

You can also use the [Lookups
API](https://api.sumologic.com/docs/#tag/lookupManagement "https://api.sumologic.com/docs/#tag/lookupManagement")
to create and manage Lookup Tables. 

For information about updating, exporting, and sharing Lookup Tables,
see [Manage and Update Lookup
Tables](02_Manage_and_Update_Lookup_Tables.md "Manage and Update Lookup Tables").

New Lookup Tables are available in all deployments except Sumo Logic's
Montreal deployment, pending AWS providing a required AWS service in the
Montreal region.

### Introduction to Lookup Tables

A Lookup Table is a table of data hosted on Sumo Logic that you can use
to enrich the log data received by Sumo Logic. For example, in a Sumo
Logic log search, you could refer to a Lookup Table of user account data
to map the user ID in an incoming log to a row in the Lookup Table, and
return other attributes of that user, for instance, email address or
phone number. The fields you look up appear as part of your search
results. 

### Key facts about Lookup Tables

Before you create or update a Lookup table, note the following.

#### Size limits

* Lookup files can be up to 100 MB in size. Note that if the .csv file
    contains duplicate rows (rows with the same primary key) the
    duplicate rows will be included in the file size calculation, and
    apply towards the 100 MB limit.
* The maximum length for a primary key string field is 1024
    characters.
* The total size of any row cannot be larger than 200 KB.

#### Lookup Table naming

A Lookup Table cannot have a forward slash (/) in its name or be stored
in a folder with a forward slash in the name.

#### Reserved keywords

When you create a Lookup Table schema, note the following requirements:

* The following strings are reserved (case-insensitive) and should not
    be used as field names: "pkv", "tid-cid-s", "mt", "tid-sk-1",
    "tid-sk-2", "tid-sk-3", "tid-sk-4", "tid-sk-5", "tid-sk-6",
    "tid-sk-7", "tid-sk-8", "tid-sk-9", "tid-sk-10", "tid-sk-11",
    "tid-sk-12", "tid-sk-13", "tid-sk-14", "tid-sk-15", "tid-sk-16",
    "tid-sk-17", "tid-sk-18", "tid-sk-19", "tid-sk-20", "\_messagetime",
    "\_receipttime", "\_sourcecategory", "\_sourcehost", "\_sourcename",
    "\_source", "\_sourceid", "\_collector", "\_collectorid", "\_view",
    "\_index".
* Field names cannot contain two tilde characters in a row (\~\~). 
* Field names are not case-sensitive. For example, you can't have both
    "Name" and "name" fields.

#### Lookup Tables and Search Templates

Currently, the ability to reference a field in a new style Lookup
Table in a [Search
Template](../Get-Started-with-Search/How-to-Build-a-Search/Search-Templates.md "Search Templates")
is not supported. However, you can refer to [classic Lookup
Tables](../Search-Query-Language/Search-Operators/lookup-classic.md "lookup (Classic)")
in Search Templates.  

### How many Lookup Tables can you have?

The number of Lookup Tables you can have depends on what type of Sumo
Logic account you have, as shown in the table below.

| Account Type                             | Lookup Tables allowed per org             |
|------------------------------------------|-------------------------------------------|
| Professional (Cloud Flex)                | 10                                        |
| Enterprise (Cloud Flex)                  | 100                                       |
| Essentials (Cloud Flex Credits)          | 10                                        |
| Enterprise Ops (Cloud Flex Credits)      | 100                                       |
| Enterprise Security (Cloud Flex Credits) | 100                                       |
| Enterprise Suite (Cloud Flex Credits)    | 100                                       |
| Trials                                   | Depends on the account type being trialed |
| Free                                     | None                                      |

### Create a Lookup Table

This section has instructions for creating a Lookup Table using the Sumo
Logic UI. You can create the Lookup Table schema only, or create and
populate the table by uploading a .csv file.

You can also use the [Lookups
API](https://api.sumologic.com/docs/#tag/lookupManagement "https://api.sumologic.com/docs/#tag/lookupManagement")
to create a Lookup Table. 

#### Create a Lookup Table schema

Follow these instructions to create a new Lookup Table and define its
schema without populating the table.

1.  Go to the Sumo Logic Library.
2.  Navigate to the folder where you want to create the Lookup Table.
3.  Click **Add New** and then select **New Lookup**.  
    ![lookup-list.png](../static/img/Lookup_Tables/01_Create_a_Lookup_Table/new-lookup-button.png)
4.  The **Create Lookup Table** page appears.  
    ![create-lookup-table.png](../static/img/Lookup_Tables/01_Create_a_Lookup_Table/create-lookup-table.png)
5.  **Lookup Name**. Enter a name for the Lookup Table.
6.  **Description.** (Optional.)  Enter a description of the Lookup
    Table.
7.  **Do you want a TTL for table entries?** A TTL specifies a time
    limit beyond which an unchanged row in the table will be unavailable
    for reads and will be deleted. For example, if you set a TTL of 5
    minutes for a lookup table, when 5 minutes pass without a row being
    updated, that row will no longer be returned by lookups and will be
    deleted from the lookups table. A TTL is useful for managing the
    freshness of the data and the size of the table.
    1.  Click **Yes** if you want to set a TTL.
    2.  Enter an integer value in the **Duration** field, and select a
        unit of time from the pulldown:  **Seconds**, **Minutes**
        (default), **Hours**, or **Days**.
8.  **Size Limit Handling**. This option controls how on how additions
    to the Lookup table will be handled when it reaches its size limit
    (100 MB)
    * **Stop Incoming Data**. Once the Lookup Table size limit is
        reached, no new data will be added to the table. 
    * **Delete Old Data**. The rows that have been modified or updated
        least recently will be replaced by new rows.
9.  **How do you want to create lookup?** Click **Create Schema only**.
10. The page displays a **Schema** section.   
    ![schema.png](../static/img/Lookup_Tables/01_Create_a_Lookup_Table/schema.png)
11. **Schema**. For the first column in the table, enter:
    1.  **Field**. Enter a name for the field.
        As you name your fields, note reserved keywords listed
        in [Reserved
        keywords](./01_Create_a_Lookup_Table.md "Create a Lookup Table").
    2.  **Value Type**. Choose the value type: boolean, int, long,
        double, or string (default).
    3.  **Primary Key**. Click the **Yes** checkbox if the field is part
        of the primary key for the table. If your table's primary key is
        a composite key, you will check this checkbox for each field that
        is part of the key.
        You must define a primary key for your Lookup Table.
12. To add another column to the table, click the plus sign to the right
    of the first column and repeat the previous step.
13. To remove a column from the table, select **Delete Column** from the
    three-dot more options menu.
14. When you are done adding columns, click **Create**. 

#### Create a Lookup Table from a .csv file

Follow these instructions to create and populate a Lookup Table with the
contents of a .csv file.

Before you start, create a .csv file containing the rows you want to put
in the new Lookup Table. The file should have a .csv extension, and not
be larger than 100 MB. The first row of the table should contain the
names of the fields in the table. For example:

`username,IPAddress,region`

Note that no spaces are allowed between quotes and values for field
names. For example, `"name"` is allowed, but `" name"` is not.

As you name your fields, note the information in [Reserved
keywords](./01_Create_a_Lookup_Table.md "Create a Lookup Table").

1.  Go to the Sumo Logic Library.
2.  Click **Add New** and then select **New Lookup**.  
    ![new-lookup-button.png](../static/img/Lookup_Tables/01_Create_a_Lookup_Table/new-lookup-button.png)
3.  The **Create Lookup Table** page appears.
4.  **Lookup Name**. Enter a name for the Lookup Table.
5.  **Description.** (Optional.)  Enter a description of the Lookup
    Table.
6.  **Do you want a TTL for table entries?** A TTL specifies a time
    limit beyond which an unchanged row in the table will be unavailable
    for reads and will be deleted. For example, if you set a TTL of 5
    minutes for a lookup table, when 5 minutes pass without a row being
    updated, that row will no longer be returned by lookups and will be
    deleted from the lookups table. A TTL is useful for managing the
    freshness of the data and the size of the table. 
    1.  Click **Yes** if you want to set a TTL.
    2.  Enter an integer value in the **Duration** field, and select a
        unit of time from the pulldown:  **Seconds**, **Minutes**
        (default), **Hours**, or **Days**.
7.  **How do you want to create lookup?** Click **Upload File**.
8.  The **Upload File** section appears.  
    ![upload-file.png](../static/img/Lookup_Tables/01_Create_a_Lookup_Table/upload-file.png)
9.  **Advanced Upload Settings**. (Optional.) If your .csv file is
    encoded in a format other than UTF-8, select the format from
    the pull-down.
10. Click **Upload**.
11. Navigate to the file you want to upload and click **Open**.
12. The **Schema** section of the page refreshes, and displays up to 10
    rows from the .csv file you uploaded.  
    ![create-by-upload.png](../static/img/Lookup_Tables/01_Create_a_Lookup_Table/create-by-upload.png)
13. For each column in the table:
    1.  **Value Type**. Choose the value type: boolean, int, long,
        double, or string (default).
    2.  **Primary Key**. Click the **Yes** checkbox if the field is part
        of the primary key for the table. 
        Defining a primary key for your Lookup Table is required.
14. Click **Create** in the upper right of the page.

### View the contents of a Lookup Table

1.  Go to the Sumo Logic Library.  
    ![library-icon.png](../static/img/Lookup_Tables/01_Create_a_Lookup_Table/library-icon.png)
2.  Click in the search bar, and select **Lookups** from the dropdown.  
    ![search-for-lookups.png](../static/img/Lookup_Tables/01_Create_a_Lookup_Table/search-for-lookups.png)
3.  Hover over the Lookup Table you want to view, and select
    **Open **from the three-dot more options menu.
4.  The view page for the Lookup Table appears. It displays a preview of
    the contents of the Lookup Table, up to 10 rows.  
    ![lookup-created.png](../static/img/Lookup_Tables/01_Create_a_Lookup_Table/lookup-created.png)
5.  To view the complete contents of the Lookup Table, click **View
    Data**.
6.  A Sumo Logic search tab opens and a `cat` command is run on your
    table.  
    ![view-lookup-table.png](../static/img/Lookup_Tables/01_Create_a_Lookup_Table/view-lookup-table.png)

### Find a lookup table path

When you run search operators that work with Lookup Tables (described in
the following section), you need to know the path to the Lookup Table in
the Sumo Logic Library. The path can be determined in several ways:

* From the **Actions** menu on the Lookup Table
    page. ![copy-path-actions-menu.png](../static/img/Lookup_Tables/01_Create_a_Lookup_Table/copy-path-actions-menu.png)
* From the three-dot more options menu for a Lookup Table in the Sumo
    Logic Library.  
    ![copy-path-lib.png](../static/img/Lookup_Tables/01_Create_a_Lookup_Table/copy-path-lib.png)
* From the left-hand navigation menu  
    ![copy-path-left-nav.png](../static/img/Lookup_Tables/01_Create_a_Lookup_Table/copy-path-left-nav.png)

### Operators you use with Lookup Tables

You can use the following operators with Lookup Tables in Sumo Logic log
searches and in Cloud SIEM rules:

* `cat`—You can view the contents of a Lookup Table using the `cat`
    operator in a Sumo Logic log search tab. For more information, see
    [cat](../Search-Query-Language/Search-Operators/cat.md "cat Operator").
* `lookup`—You can use the `lookup` operator to return one or more
    fields from a Lookup Table. For more information, see
    [lookup](../Search-Query-Language/Search-Operators/lookup.md "lookup operator").
* `lookupContains`—You can use the `lookupContains` operator to see
    whether a key exists in a Lookup Table. For more information, see
    [lookupContains](../Search-Query-Language/Search-Operators/lookupContains.md "lookupContains Operator").
* `save`—You can use the `save` operator to save the results of a Sumo
    log query to a Lookup Table you created using the Lookup UI or API.
    For more information, see
    [save](../Search-Query-Language/Search-Operators/save.md "save operator").  
     
