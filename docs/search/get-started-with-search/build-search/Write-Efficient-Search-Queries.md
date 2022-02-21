---
id: write-efficient-search-queries
---

# Write Efficient Search Queries

### Make the search as selective as possible

The more specific the query, the more efficiently it will run, as
unnecessary messages are quickly thrown out of the mix. For example, the
following two queries will generate the same result:

-   `* | parse regex "uid=(\<userI\>\d+)"`
-   `"uid=" | parse regex "uid=(\<userI\>\d+)"`

The second query will return the results more efficiently because the
first query includes "`*`", which prompts Sumo Logic to comb through all
messages for the given time range.

### Use Field Extraction Rules

If your admin has created Field Extraction Rules, [learn how to use
them](../../../Manage/Field-Extractions/Edit-Field-Extraction-Rules.md "Edit Field Extraction Rules").
Field Extraction Rules parse out fields from your organization's log
files, meaning that you won't need to parse out fields in your query.

### Include the most selective filters first

It's best to filter data as early as possible in the query, using the
most selective filters first.

For example, look at the following queries:

-   `* | parse "queryTime=* " as queryTime | parse "uid=* " as uid | where queryTime\> 10000`
-   `* | parse "queryTime=* " as queryTime | where queryTime\> 10000 | parse "uid=* " as ``uid`

Because most log lines have a **uid**, but only a small fraction
have **queryTime \> 10000**, the second query is more efficient.
