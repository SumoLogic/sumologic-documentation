---
id: lookupcontains
---

# lookupContains

You can use the `lookupContains` operator to determine whether a key
exists in a lookup table. `lookupContains` returns a boolean value. 

### Syntax

The syntax for `lookupContains` in varies depending on whether you use
the operator within a `where` expression, or before it.

#### Within a where expression

This is the syntax for using `lookupContains` within a `where`
expression:

`... | where lookupContains (path://�\<path-to-tabl\>”,\<event-fiel\>\<lookup-fiel\>) | ...`

Where:

-   \<path-to-tabl\>` is the full path to the lookup table in the Sumo
    Logic library, for example:  
      
    `/Library/Users/username@sumologic.com/lookup-table-name`  
      
    To determine the path to a lookup table, highlight the row for the
    table in the Sumo Logic library, and select **Copy path **from the
    tree-dot more options menu for the table.   
     
-   `event-field` is a field in a log. 
-   `lookup-field` is a field in the lookup table.

**Example 1: Using lookupContains within a where expression to compare a
single field**

The example below compares the value of the `userID` field in an event
to values of the `user` field in the `suspicious-users` lookup table,
and returns `true` if the field values match.

`... | where lookupContains(path://"/Library/Users/username@sumologic.com/suspicious-users", userID=user) | ...`

**Example 2: Using lookupContains within a where expression to compare
multiple fields**

The example below compares the value of the `userID` field in an event
to values of the `user` field in the `suspicious-users` lookup table,
and compares the value of the `userIP` field in the event to values of
the `sourceIP` field in the lookup table and returns `true` if the both
sets of field values match.

`... | where lookupContains(path://"/Library/Users/username@sumologic.com/suspicious-users", userID=user AND userIP=sourceIP) | ...`

#### Before a where expression

When you use `lookupContains` before a `where` expression, you need to
supply an alias for the return value, using `as`. This form allows you
to use the alias in later clauses of the search query.

`... | lookupContains (path://\<path-to-tabl\>",\<event-fiel\>\<lookup-fiel\>) as\<fiel\> | where\<fiel\> = true`

Where:

-   \<path-to-tabl\>` is the full path to the lookup table in the Sumo
    Logic library, for example:  
      
    `/Library/Users/username@sumologic.com/lookup-table-name`  
      
    To determine the path to a lookup table, highlight the row for the
    table in the Sumo Logic library, and select **Copy path **from the
    tree-dot more options menu for the table.   
     
-   `event-field` is a field in a log. 
-   `field` is the name that you assign as the alias for the field. 
