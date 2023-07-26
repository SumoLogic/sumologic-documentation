---
id: parse-csv-formatted-logs
title: Parse CSV Formatted Logs
---



The **CSV** operator allows you to parse CSV (Comma Separated Values) formatted log entries. It uses a comma as the default delimiter.

For example, let’s say you have a .csv file that maps internal IP addresses to your data center locations and names. Once the .csv file is ingested into Sumo Logic, you can use the CSV operator to parse the fields of the file and populate a lookup table. Then you'd use the Geo Lookup operator to map your data center IP addresses and display them on a map of the world.

To parse delimited log entries other than CSV files, such as space delimited files, use the [Split](parse-delimited-logs-using-split.md) operator.

## Syntax

Extract fields using the index:

* `csv <field> extract 1 as <A>, 2 as <B>, 5 as <E>, 6 as <F>`

Extract fields using position:

* `csv <field> extract <A>, <B>, _, _, <E>, <F>`

:::note
Use an underscore `_` to skip the position.
:::

Specify an escape, and quote character:

* `csv <field> escape='\', quote=''' extract <A>, <B>, _, _, <E>, <F>`

## Rules

* By default, the CSV operator uses a comma (,) for a delimiter, backlash (\\) for an escape character, and (“) quote for a quote character.
* A field to extract from is always required. To extract from your original message use the `_raw` [metadata](/docs/search/get-started-with-search/search-basics/built-in-metadata) field.

## Examples

### Parse comma delimited fields

Use the following query to parse a CSV file’s comma delimited fields as
shown:

```sql
_sourceCategory=csv
| csv _raw extract 1 as user2, 2 as id, 3 as name
```

which provides results like:

![csv example](/img/reuse/query-search/csv_example1.png)

### Parse a stream query and extract search terms

```sql
"Starting stream query"
| parse "query=[*], queryId" as query
| csv query extract searchTerms, op1, op2, op3
```

This produces results like:

![csv operator](/img/reuse/query-search/csv_operator_example_695x65.png)

For more information on parsing CSV files, see [Lookup](/docs/search/search-query-language/search-operators/lookup-classic) operator and [Save](/docs/search/search-query-language/search-operators/save-classic) operator.
