---
id: export-results-of-saved-file
---

# Export the Results of a Saved File

This was an advanced task designed to fulfill a missing feature in Sumo.

With the [catoperator](../Search-Query-Language/Search-Operators/cat.md) you can simply retrieve your results and use the [export](../get-started-with-search/search-basics/export-search-results.md) feature.

## Deprecated

Sumo Logic provides the ability to save a file using the [save](../Search-Query-Language/Search-Operators/save-lookups-classic.md) operator, but it does not allow you to export the results of that saved file. To do so, you would have to re-run the original query and export the results.

But if you know you will need to export your saved files results routinely, you can create another column in the results that are saved to the file that acts as a primary key for each result. This key then allows you to conduct a [lookup](../Search-Query-Language/Search-Operators/lookup-classic.md)
operation matching the key.

To create keys in your saved file:

1. In your query that is saving the file with the save operator, you need to add numbers to act as the primary key. You can start at 1 and increment by 1 for each result, as shown. Add a group by if needed (such as a [timeslice](../Search-Query-Language/Search-Operators/timeslice.md "timeslice")):

    ```sql
    | 1 as number 
    | accum number as number // by _timeslice
    ```

1. Now that your saved file has numbers as unique keys on each result you can do a lookup so that the matching is done on the keys, like this:

    ```sql
    | 1 as number 
    | accum number as key 
    | lookup * from shared/file.csv on key=number
    ```

    The query with the lookup operator needs to create at least the same number of keys as the results in your saved file, so that the keys match all. Since each result is assigned a key, you just need to make sure enough results are returned. If you have more keys from your lookup query, it is not a problem, because we do not match on them anyway. This will return all of your saved file's results, ready for export.

1. If you are appending to your saved file, you can get the file's last key to define the starting key for the append query using the following query:

    ```sql
    | 1 as number 
    | accum number as key 
    | lookup _accum from shared/file/forsupport on key=_accum 
    | max(_accum) 
    | _max + 1 as key
    ```

    The `_accum` field is the same as the `number` field in the first example. But you cannot use this query with your save query that is appending because we use the max operator.
