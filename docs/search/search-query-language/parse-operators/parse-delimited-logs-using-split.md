---
id: parse-delimited-logs-using-split
title: Parse Delimited Logs Using Split
---

The **`split`** operator allows you to split strings into multiple strings, and parse delimited log entries, such as space-delimited formats.

To parse log entries from CSV files, you can use the simpler [CSV operator](parse-csv-formatted-logs.md).

## Syntax

Extract fields using the index:

* `split <field> extract 1 as <A>, 2 as <B>, 5 as <E>, 6 as <F>`

Extract fields using position:

* `split <field> extract <A>, <B>, _, _, <E>, <F>`

Use an underscore `_` to skip the position.

Mix positional and index-based:

* `split <field> extract <A>, <B>, 5 as <E>, <F>`

Specify a delimiter, escape, and quote character:

* `split <field> escape='\', delim=':', quote=''' extract <A>, <B>, _, _, <E>, <F>`

## Rules

* By default, the Split operator uses a comma (`,`) for a delimiter, backlash (`\`) for an escape character, and (`"`) quote for a quote character, though you can define your own if you like.
* If you define your own escape, delimiter, or quote characters, they must all be different and be a single character matching the Java regular expression `[\s\S]`.
* A field to extract from is always required. To extract from your original message use the `_raw` [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field.

## Examples

### Parsing a colon delimited file

For example, if you had a file with the following colon delimited log message:

```
[05/09/2014 09:39:990] INFO little@sumologic.com:ABCD00001239:EFGH1234509:
"Upload Complete - Your message has been uploaded successfully."
```

You could parse the fields using the following query:

```sql
_sourceCategory=colon
| parse "] * *" as log_level, split_field
| split split_field delim=':' extract 1 as user, 2 as account_id, 3 as session_id, 4 as result
```

which produces results such as:

![split example colon](/img/reuse/query-search/split_example_colon.png)

In another example, you'd use the following query:

```sql
_sourceCategory=colon
| split _raw delim=':' extract 1 as user2, 2 as id, 3 as name
```

which provides results like:

![split example](/img/reuse/query-search/split_example1.png)

### Parsing a CSV file

Use the following query to extract comma delimited fields as specified:

```sql
_sourceCategory=csv
| split _raw delim=',' extract 1 as user2, 2 as id, 3 as name
```

which produces results such as:

![splt example](/img/reuse/query-search/split_example3.png)

### Parsing a tab delimited file

Use this query to extract fields from a tab delimited log file. 

You have to manually specify the tab character for the delim value.

```sql
_sourceCategory=sumo/zscaler
| split _raw delim='    ' extract 1 as Column1, 2 as dlpeng, 3 as cat
```

which produces this result:

![SplitTab.jpg](/img/search/searchquerylanguage/parse-operators/SplitTab.jpg)

Alternatively, you can use the parse operator to extract fields from a tab delimited log file. The following query produces the same result as the previous query.

```sql
_sourceCategory=sumo/zscaler  | parse "*\t*\t*\t" as Column1,dpleng,cat
```
