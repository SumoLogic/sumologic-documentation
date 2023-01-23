---
id: cat
title: cat Search Operator
sidebar_label: cat
---

You can use the `cat` operator to view the contents of a lookup table. Not supported in live dashboards or scheduled searches.

## Syntax

```sql
cat path://”<path-to-table>”
```

Where:

* `path-to-table` is the path to the lookup table in the Sumo Logic Library.


## Example

For example: 

```sql
cat path://"/Library/Users/myusername@sumologic.com/Suspicious Users"
```

To determine the path to a lookup table, highlight the row for the table in the Sumo Logic Library, and select **Copy path to clipboard** from the three-dot more options menu for the table.   
 
If your lookup table is very large, it may take a few minutes to display.

You can export query results in the **Messages** tab of the search results. Click the gear icon and select an export option.
