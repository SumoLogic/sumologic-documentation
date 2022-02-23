---
id: log-operators-cheat-sheet
---

# Log Operators Cheat Sheet

The Log Operators cheat sheet provides a list of available parsers,
aggregators, search operators, and mathematical expressions with links
to full details for each item.  For a step-by-step video and tutorial
about creating queries, see the [Quick Start
Tutorial](../../01Start-Here/Quick-Start-Tutorials.md "Quick Start Labs and Tutorials"). 
For a complete list of Sumo Logic Search operators, you can download the
[PDF
version](https://drive.google.com/file/d/1UAMMawIW1st1LTDw9UjdEtivRKvgk-j7/view?usp=sharing "https://drive.google.com/file/d/1UAMMawIW1st1LTDw9UjdEtivRKvgk-j7/view?usp=sharing"). 

For a collection of customer-created search queries and their use cases,
see the [Sumo Logic Community Query
Library](https://community.sumologic.com/s/topic/0TOE0000000g86fOAA/Query-Library "https://community.sumologic.com/s/topic/0TOE0000000g86fOAA/Query-Library").

The following tables provide a list of available Sumo Logic parsers,
aggregators, search operators, and mathematical expressions.  

## Parsing

Sumo provides a number of ways
to [parse](../Search-Query-Language/01-Parse-Operators.md "Parsing") fields
in your log messages.

|                                                                                                                                                             |                                                                                                                                                                                                                                                                                                                                    |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Operator**                                                                                                                                                | **Description**                                                                                                                                                                                                                                                                                                                    |
| [parse (anchor)](../Search-Query-Language/01-Parse-Operators/01-Parse-Predictable-Patterns-Using-an-Anchor.md "Parse Predictable Patterns Using an Anchor") | The parse operator, also called parse anchor, parses strings according to specified start and stop anchors, and then labels them as fields for use in subsequent aggregation functions in the query such as sorting, grouping, or other functions.                                                                                 |
| [parse regex](../Search-Query-Language/01-Parse-Operators/02-Parse-Variable-Patterns-Using-Regex.md "Parse Regex or Extract Operator")                      | The parse regex operator (also called the extract operator) enables users comfortable with regular expression syntax to extract more complex data from log lines. Parse regex can be used, for example, to extract nested fields.                                                                                                  |
| [keyvalue](../Search-Query-Language/01-Parse-Operators/04-Parse-Keyvalue-Formatted-Logs.md "Keyvalue operator")                                             | Typically, log files contain information that follow a key-value pair structure. The keyvalue operator allows you to get values from a log message by specifying the key paired with each value.                                                                                                                                   |
| [csv](../Search-Query-Language/01-Parse-Operators/05-Parse-CSV-Formatted-Logs.md "CSV Operator")                                                            | The csv operator allows you to parse Comma Separated Values (CSV) formatted log entries. It uses a comma as the default delimiter.csv operator allows you to parse Comma Separated Values (CSV) formatted log entries. It uses a comma as the default delimiter.                                                                   |
| [JSON](../Search-Query-Language/01-Parse-Operators/03-Parse-JSON-Formatted-Logs.md "Parsing JSON Logs")                                                     | The JSON operator is a search query language operator that allows you to extract values from JSON input. Because JSON supports both nested keys and arrays that contain ordered sequences of values, the Sumo Logic JSON operator allows you to extract single top-level fields, multiple fields, nested keys, and keys in arrays. |
| [split](../Search-Query-Language/01-Parse-Operators/06-Parse-Delimited-Logs-Using-Split.md "split")                                                         | The split operator allows you to split strings into multiple strings, and parse delimited log entries, such as space-delimited formats.                                                                                                                                                                                            |
| [xml](../Search-Query-Language/01-Parse-Operators/07-Parse-XML-Formatted-Logs.md "Parsing XML")                                                             | The XML operator uses a subset of the XPath 1.0 specification to provide a way for you to parse fields from XML documents. Using it, you can specify what to extract from an XML document using an XPath reference.                                                                                                                |

 

## Aggregating

[Aggregating
functions](../Search-Query-Language/aaGroup.md "Aggregating") evaluate
messages and place them into groups. The group operator is used in
conjunction with group-by functions. When using any grouping function,
the word by is sufficient for representing the group operator.

An aggregation function cannot take another function (such as a math
function). For example, you cannot use:

`... | avg(x + y) as average`  
Instead use separate steps:  
`... | x + y as z | avg(z) as average`

 

|                                                                                                                                                                        |                                                                                                                                                                                                                                                                                 |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Operator**                                                                                                                                                           | **Description**                                                                                                                                                                                                                                                                 |
| [avg](../Search-Query-Language/aaGroup/avg.md "avg")                                                                                                                   | The averaging function (avg) calculates the average value of the numerical field being evaluated within the time range analyzed.                                                                                                                                                |
| [count, count_distinct, and count_frequent](../Search-Query-Language/aaGroup/count,-count-distinct,-and-count-frequent.md "count, count_distinct, and count_frequent") | Aggregating (group-by) functions are used in conjunction with the group operator and a field name. Only the word by is required to represent the group operator. The count function is also an operator in its own right and therefore can be used with or without the word by. |
| [first and last](../Search-Query-Language/aaGroup/first-and-last.md "first and last")                                                                                  | First finds the earliest occurrence in search results, and last finds the result that follows all others, based on the sort order for the query.                                                                                                                                |
| [min and max](../Search-Query-Language/aaGroup/min-and-max.md "min and max")                                                                                           | Use the min and max functions to find the smallest or largest value in a set of values.                                                                                                                                                                                         |
| [most_recent and least_recent](../Search-Query-Language/aaGroup/most-recent-and-least-recent.md "most_recent and least_recent")                                        | The most_recent and least_recent operators, used with the withtime operator, allow you to order data from newest to oldest.                                                                                                                                                     |
| [pct](../Search-Query-Language/aaGroup/percentile-(pct).md "pct")                                                                                                      | The percentile function (pct) finds the percentile of a given field. Multiple pct functions can be included in one query.                                                                                                                                                       |
| [stddev](../Search-Query-Language/aaGroup/standard-deviation.md "stddev")                                                                                              | The standard deviation function (stddev) finds the standard deviation value for a distribution of numerical values within the time range analyzed and associated with a group designated by the "group by" field.                                                               |
| [sum](../Search-Query-Language/aaGroup/sum.md "sum")                                                                                                                   | Sum adds the values of the numerical field being evaluated within the time range analyzed.                                                                                                                                                                                      |
| [values](../Search-Query-Language/aaGroup/values.md "values")                                                                                                          | The values operator provides all the distinct values of a field.                                                                                                                                                                                                                |

 

## Search Operators

This section provides detailed syntax, rules, and examples for Sumo
Logic Operators, Expressions, and Search Language.

[TABLE]

## Math Expressions

You can use general mathematical expressions on numerical data extracted
from log lines. For any mathematical or group-by function that
implicitly requires integers, Sumo Logic casts the string data to a
number for you.

[TABLE]

 
