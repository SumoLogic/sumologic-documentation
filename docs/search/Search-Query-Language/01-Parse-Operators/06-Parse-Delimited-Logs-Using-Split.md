---
id: "-parse-delimited-logs-using-split"
---

# Parse Delimited Logs Using Split

The **split** operator allows you to split strings into multiple
strings, and parse delimited log entries, such as space-delimited
formats.

To parse log entries from CSV files, you can use the simpler [CSV
operator](05-Parse-CSV-Formatted-Logs.md "Parse CSV Formatted Logs").

### Syntax

Extract fields using the index:

* `split\<fiel\> extract 1 as\<\>, 2 as\<\>, 5 as\<\>, 6 as\<\>`

Extract fields using position:

* `split\<fiel\> extract\<\>,\<\>, _, _,\<\>,\<\>`

Use an underscore `_` to skip the position.

Mix positional and index-based:

* `split\<fiel\> extract\<\>,\<\>, 5 as\<\>,\<\>`

Specify a delimiter, escape, and quote character:

* `split\<fiel\> escape='\', delim=':', quote=''' extract\<\>,\<\>, _, _,\<\>,\<\>`

### Rules

* By default, the Split operator uses a comma (`,`) for a delimiter,
    backlash (`\`) for an escape character, and (`"`) quote for a quote
    character, though you can define your own if you like.
* If you define your own escape, delimiter, or quote characters, they
    must all be different and be a single character matching the Java
    regular expression `[\s\S]`.
* A field to extract from is always required. To extract from your
    original message use
    the `_raw` [metadata](../../Get-Started-with-Search/Search-Basics/Built-in-Metadata.md "Search Metadata") field.

### Examples

#### Parsing a colon delimited file

For example, if you had a file with the following colon delimited log
message:

    [05/09/2014 09:39:990] INFO little@sumologic.com:ABCD00001239:EFGH1234509:
    "Upload Complete - Your message has been uploaded successfully."

You could parse the fields using the following query:

`_sourceCategory=colon | parse "] * *" as log_level, split_field | split split_field delim=':' extract 1 as user, 2 as account_id, 3 as session_id, 4 as result`

which produces results such as:

![](../../static/img/Search-Query-Language/01-Parse-Operators/06-Parse-Delimited-Logs-Using-Split/../../../../Assets/Media_Repository/split_example_colon.png)

In another example, you could use the following query:

`_sourceCategory=colon | split _raw delim=':' extract 1 as user2, 2 as id, 3 as name`

which provides results like:

![](../../static/img/Search-Query-Language/01-Parse-Operators/06-Parse-Delimited-Logs-Using-Split/../../../../Assets/Media_Repository/split_example1.png)

#### Parsing a CSV file

Use the following query to extract comma delimited fields as specified:

`_sourceCategory=csv | split _raw delim=',' extract 1 as user2, 2 as id, 3 as name`

which produces results such as:

![](../../static/img/Search-Query-Language/01-Parse-Operators/06-Parse-Delimited-Logs-Using-Split/../../../../Assets/Media_Repository/split_example3.png)

#### Parsing a tab delimited file

Use this query to extract fields from a tab delimited log file. 

You have to manually specify the tab character for the delim value.

`_sourceCategory=sumo/zscaler | split _raw delim='    ' extract 1 as Column1, 2 as dlpeng, 3 as cat`

which produces this result:

![SplitTab.jpg](../../static/img/Search-Query-Language/01-Parse-Operators/06-Parse-Delimited-Logs-Using-Split/SplitTab.jpg)

Alternatively, you can use the parse operator to extract fields from a
tab delimited log file. The following query produces the same result as
the previous query.

`_sourceCategory=sumo/zscaler  | parse "*\t*\t*\t" as Column1,dpleng,cat`

 
