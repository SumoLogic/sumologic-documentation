---
id: "-parse-csv-formatted-logs"
---

# Parse CSV Formatted Logs

The **CSV** operator allows you to parse CSV (Comma Separated Values)
formatted log entries. It uses a comma as the default delimiter.

For example, let’s say you have a .csv file that maps internal IP
addresses to your data center locations and names. Once the .csv file is
ingested into Sumo Logic, you can use the CSV operator to parse the
fields of the file and populate a lookup table. Then you could use the
Geo Lookup operator to map your data center IP addresses and display
them on a map of the world.

To parse delimited log entries other than CSV files, such as space
delimited files, use
the [Split](06-Parse-Delimited-Logs-Using-Split.md "split") operator.

### Syntax

Extract fields using the index:

* `csv` \<field\> extract 1 as \<A\>, 2 as \<B\>, 5 as \<E\>, 6 as \<F\>

Extract fields using position:

* `csv` \<field\> extract \<A\>, \<B\>, \_, \_, \<E\>, \<F\> 

Use an underscore `_` to skip the position.

Specify an escape, and quote character:

* `csv` \<field\> escape='\\', quote=''' extract \<A\>, \<B\>, \_, \_,
    \<E\>, \<F\>

### Rules

* By default, the CSV operator uses a comma (,) for a delimiter,
    backlash (\\) for an escape character, and (“) quote for a quote
    character.
* A field to extract from is always required. To extract from your
    original message use the `_raw`
    [metadata](../../Get-Started-with-Search/Search-Basics/Built-in-Metadata.md "Search Metadata")
    field.

### Examples

#### Parse comma delimited fields

Use the following query to parse a CSV file’s comma delimited fields as
shown:

`_sourceCategory=csv`  
`|  ``csv ``_raw extract 1 as user2, 2 as id, 3 as name`

which provides results like:

![](../../static/img/Search-Query-Language/01-Parse-Operators/05-Parse-CSV-Formatted-Logs/../../../../Assets/Media_Repo_for_Search/csv_example1.png)

#### Parse a stream query and extract search terms

`"Starting stream query" | parse "query=[*], queryId" as query | csv query extract searchTerms, op1, op2, op3`

This produces results like:

![](../../static/img/Search-Query-Language/01-Parse-Operators/05-Parse-CSV-Formatted-Logs/../../../../Assets/Media_Repo_for_Search/csv_operator_example_695x65.png)

For more information on parsing CSV files,
see [Lookup](../Search-Operators/lookup-classic.md "lookup")
operator and [Save](../Search-Operators/save-lookups-classic.md "save")
operator.
