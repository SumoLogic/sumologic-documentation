---
id: save
---

# save

The `save`  operator allows you to save the results of a query to a
lookup table you have already created, as described in [Create a Lookup
Table](../../Lookup_Tables/01_Create_a_Lookup_Table.md "Create and Manage Lookup Tables").
You can use the [lookup](lookup.md "lookup Operator") and
[cat](cat.md "cat Operator") operator to access the saved data.

You can use the `append` option with `save` to merge new and changed
rows into a lookup table. If you use `save` without `append`, any
existing rows in the lookup table will be overwritten by your search
results. 

If your lookup table is configured with a time-to-live (TTL), creating
or updating a row sets or resets the TTL for that row.   

Either raw or aggregated results can be saved with the `save` operator.

### Syntax 

`save [append] path://�\<path-to-tabl\>”  `

where: 

-   `path-to-table` is the path to the lookup table in the Sumo Logic
    Library.

To determine the path to a lookup table, highlight the row for the table
in the Sumo Logic Library, and select **Copy path to clipboard** from
the three-dot more options menu for the table.

### Rules 

-   Your search schema must match the schema of the Lookup Table that
    you're writing to, including the data types of the fields you want
    to save to the lookup table. Make sure your search returns all of
    the fields defined for the lookup table and no additional fields.
    Additional fields will be dropped and not saved to the lookup table.
    If your search returns fewer fields than that defined for the lookup
    table, the search will fail.
-   The file size limit for lookup tables is 100 MB.
-   You cannot create a lookup table with the `save` operator. You must
    first create a lookup table, as described in [Create a Lookup
    Table](../../Lookup_Tables/01_Create_a_Lookup_Table.md "Create and Manage Lookup Tables"). 
-   The `save` operator is not supported with Scheduled Views.
-   Queries that use the `save` operator cannot be pinned.

### Examples 

#### Using save without append

This example saves search results data about new user accounts to
the lookup table on Sumo Logic  .

`| parse "name=*," as name | parse "action=*," as action | parse "date=*," as date | where action="sign-up" | first(date) as date, first(action) as action by name | save path://"/Library/Users/myusername@sumologic.com/Users"`

The above search would populate the lookup table to have these rows:

|          |            |            |
|----------|------------|------------|
| **Name** | **Action** | **Date**   |
| John     | sign-up    | 2012-08-20 |
| Bill     | sign-up    | 2012-08-21 |
| Bob      | sign-up    | 2012-08-21 |

#### Using save with append

You can use the `append` option to add rows to a lookup table and to
update existing rows. For example, you could run a scheduled search once
a day and use `save append` to merge new and changed rows into the
table. If a row in your search results has the same primary key as a row
in the lookup, the lookup table row will be updated. If the primary key
in a row in the search results does not match a row in the lookup table,
the new row will be added to the lookup. Fields returned by your search
that are not in the Lookup Table schema will be dropped and not saved to
the lookup table. If your search returns fewer fields than that defined
for the lookup table, the search will fail.

Let's say that you'd like to append your lookup file each day by
scheduling this search to run every 24 hours:

`| parse "name=*," as name  | parse "action=*," as action  | parse "date=*," as date  | where action="sign-up"  | first(date) as date, first(action) as action by name  | save append path://"/Library/Users/myusername@sumologic.com/Users"`

Each day the query runs and the new and changed rows are written to the
table.

You can also append data to a saved file from different queries. For
example, say we have two sources, "bill" that includes billing
information, and "config" that contains account information, and we'd
like to be able to search for some values from each source. These
searches would populate a table with information from both sources:

`_source=bill | parse "user_id=*," as name | parse "user_email=*," as email | save path://"/Library/Users/myusername@sumologic.com/Users" _source=config | parse "_user=[*]" as name | parse "contact_info=[*]" as email | save append path://"/Library/Users/myusername@sumologic.com/Users"`

  
 

    
