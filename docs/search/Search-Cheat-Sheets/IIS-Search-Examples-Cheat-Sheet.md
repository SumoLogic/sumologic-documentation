---
id: iis-search-examples-cheat-sheet
---

# IIS Search Examples Cheat Sheet

The IIS Search Examples cheat sheet provides examples of useful IIS
search queries for different use cases.

The examples use this sample Access log message where applicable:

    2015-06-03 00:02:48 GET /myurl dp=mysearch 8200 10.1.1.1 Windows-RSS-Platform/2.0+(IE+11.0;+Windows+NT+6.2) - - abcd.com 200 0 0 2583 271 15

## Keyword Expressions

|                                                                                       |                                                |
|---------------------------------------------------------------------------------------|------------------------------------------------|
| **Use Case**                                                                          | **Sumo Logic Query Example**                   |
| Look for failures or errors with a specific message.                                  | `"ID = 123456" AND (fail* OR error)`           |
| Look for errors in sshd logs. AND is assumed. Case insensitive, unless double-quoted. | `sshd (fail* OR error OR allowed OR identity)` |
| Look for general authorization failures excluding router messages.                    | `(fail* OR error?) NOT _source=routers`        |

For more information, see [Keyword Search
Expression](../Get-Started-with-Search/How-to-Build-a-Search/Keyword-Search-Expressions.md "Keyword Search Expression").

## Parse, Count, and Top Operators

[TABLE]

For more information,
see [Parsing](../Search-Query-Language/01-Parse-Operators.md "Parsing"), [Count](../Search-Query-Language/aaGroup/count,-count-distinct,-and-count-frequent.md "count, count_distinct, and count_frequent"),
and [Top](../Search-Query-Language/Search-Operators/top.md "top").

## Timeslice and Transpose

|                                                                                                                    |                                                                                                                                         |
|--------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| **Use Case**                                                                                                       | **Sumo Logic Query Example**                                                                                                            |
| For the host / domain "abcd.com", count by sc_status with a timeslice of 15m                                       | `source=IIS              | parse "abcd.com * " as sc_status              | timeslice 15m              | count by _timeslice, sc_status` |
| Pivot the results so that time is on the X axis and sc_status is on the Y axis (values can be displayed in legend) | `| transpose row _timeslice column sc_status`                                                                                           |

For more information,
see [Timeslice](../Search-Query-Language/Search-Operators/timeslice.md "timeslice") and [Transpose](../Search-Query-Language/Search-Operators/transpose.md "transpose").

## Conditional Operators

|                                                                                                                    |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|--------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Use Case**                                                                                                       | **Sumo Logic Query Example**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| For the source "IIS", find all messages with a client error status code (40\*)                                     | `_source=IIS 40*              | parse "abcd.com * " as sc_status              | where sc_status matches "40*"`                                                                                                                                                                                                                                                                                                                                                                                                    |
| For the source "IIS/Access", count hits by browser                                                                 | `source=IIS/Access              | parse “* * * * * * * * “ as date, time, csmethod, cs_uri_stem, cs_uri_query, s_port, c_ip, cs_UserAgent              | if (cs_UserAgent matches "*MSIE*",1,0) as ie              | if (cs_UserAgent matches "*Firefox*",1,0) as firefox              | if (cs_UserAgent matches "*Safari*",1,0) as safari             | if (cs_UserAgent matches "*Chrome*",1,0) as chrome              | sum(ie) as ie, sum(firefox) as firefox, sum(safari) as safari, sum(chrome) as chrome` |
| Use the where operator to match only weekend days.                                                                 | `* | parse "day=*:" as day_of_week              | where day_of_week in ("Saturday","Sunday")`                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Identify all URLs that contain the subdirectory "Courses" in the path.                                             | `* | parse "GET * " as cs_uri_stem              | where cs_uri_stem matches "*Courses*"`                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Find version numbers that match numeric values 2, 3 or 6. Use the num operator to change the string into a number. | `* | parse "Version=*." as number              | num(number) | where number in (2,3,6)`                                                                                                                                                                                                                                                                                                                                                                                                                           |

For more information, see
[Where](../Search-Query-Language/Search-Operators/where.md "where") and
[If](../Search-Query-Language/Search-Operators/if-operator-and.md "if and ?"). 

For any query, you can increase specificity by adding metadata fields to
the keyword expression. Metadata fields include `_sourceCategory`,
`_sourceHost `, and `_sourceName`. Edit Source metadata in the
**Collection** tab. For details see [Search
Metadata.](../Get-Started-with-Search/Search-Basics/Built-in-Metadata.md "Search Metadata") 
