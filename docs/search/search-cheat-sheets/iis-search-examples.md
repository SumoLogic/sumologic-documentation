---
id: iis-search-examples
title: IIS Search Examples Cheat Sheet
sidebar_label: IIS Search Examples
description: The IIS Search Examples cheat sheet provides examples of useful IIS search queries for different use cases.
---


The IIS Search Examples cheat sheet provides examples of useful IIS search queries for different use cases.

The examples use this sample Access log message where applicable:

```json
2015-06-03 00:02:48 GET /myurl dp=mysearch 8200 10.1.1.1 Windows-RSS-Platform/2.0+(IE+11.0;+Windows+NT+6.2) - - abcd.com 200 0 0 2583 271 15
```

## Keyword Expressions

| Use Case | Sumo Logic Query Example |
| :-- | :-- |
| Look for failures or errors with a specific message. | `"ID = 123456" AND (fail* OR error)` |
| Look for errors in sshd logs. AND is assumed. Case insensitive, unless double-quoted. | `sshd (fail* OR error OR allowed OR identity)` |
| Look for general authorization failures excluding router messages. | `(fail* OR error?) NOT _source=routers` |

:::sumo More Info
For more information, see [Keyword Search Expression](../get-started-with-search/build-search/keyword-search-expressions.md)
:::

## Parse, Count, and Top Operators

| Use Case | Sumo Logic Query Example |
| :-- | :-- |
| Extract "from" and "to" fields using a simple wild card. For example, if a raw event contains "From: Jane To: John", then from=Jane and to=John.  `* | parse "From: * To: *" as from, to` |
| Extract IP address using a regex pattern.	 | `* | parse regex "(?<c_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})" ` |
| Identify pages visited, extracted as the "cs_uri_stem" field.	 | `_source=IIS | parse "GET * " as cs_uri_stem ` |
| Identify messages with status code “200” and extract the sc_substatus, sc_win32_status, and sc_bytes fields.  | `_source=IIS | parse " 200 * * * " as sc_substatus, sc_win32_status, sc_bytes` |

The following examples assume you used the parsing from above:

| Use Case | Sumo Logic Query Example |
| :-- | :-- |
| Calculate the total number of bytes transferred to each client IP address. | &#124; count, sum(sc_bytes) by c_ip |  
|Calculate the average size of successful HTTP responses. | &#124; avg(sc_bytes) |
| If the "sc_substatus" field is missing don't exclude those messages (nodrop)…otherwise non-matches would be filtered out.| &#124; parse " 200 \* " as sc_substatusnodrop |
|Calculate the number of times a page has been visited. | &#124; count by cs_uri_stem |  
| Calculate the total number of pages by client IP addresses. | &#124; count by c_ip |
| Calculate the total number of pages by client IP address, sort them highest to lowest. | &#124; count by c_ip &#124; sort by _countdesc |
| Identify the top 10 pages. |   &#124; count by cs_uri_stem &#124; top 10 cs_uri_stem by _count |
| Identify the top 10 client IP addresses by bandwidth usage.|  &#124; sum(sc_bytes) as total_bytes by c_ip  &#124; top 10 c_ip by total_bytes |  
| Identify the top 100 client IP addresses by number of hits.| &#124; count by c_ip &#124; top 100 c_ip by _count |  

:::sumo More Info
For more information, see [Parsing](/docs/search/search-query-language/parse-operators), [Count](/docs/search/search-query-language/group-aggregate-operators/count-count-distinct-and-count-frequent), and [Top](/docs/search/search-query-language/search-operators/top).
:::

## Timeslice and Transpose

| Use Case | Sumo Logic Query Example |
| :-- | :-- |
| For the host / domain "abcd.com", count by sc_status with a timeslice of 15m | source=IIS  &#124; parse "abcd.com \* " as sc_status &#124; timeslice 15m &#124; count by _timeslice, sc_status |
| Pivot the results so that time is on the X axis and sc_status is on the Y axis (values can be displayed in legend) | &#124; transpose row _timeslice column sc_status |

:::info
For more information, see [Timeslice](/docs/search/search-query-language/search-operators/timeslice) and [Transpose](/docs/search/search-query-language/search-operators/transpose).
:::

## Conditional Operators

| Use Case | Sumo Logic Query Example |
| :-- | :-- |
| For the source "IIS", find all messages with a client error status code (40\*) | `_source=IIS 40*`  `| parse "abcd.com * " as sc_status`  `| where sc_status matches "40*"` |
| For the source "IIS/Access", count hits by browser | `source=IIS/Access  | parse “* * * * * * * * “ as date, time, csmethod, cs_uri_stem, cs_uri_query, s_port, c_ip, cs_UserAgent  | if (cs_UserAgent matches "*MSIE*",1,0) as ie  | if (cs_UserAgent matches "*Firefox*",1,0) as firefox  | if (cs_UserAgent matches "*Safari*",1,0) as safari | if (cs_UserAgent matches "*Chrome*",1,0) as chrome  | sum(ie) as ie, sum(firefox) as firefox, sum(safari) as safari, sum(chrome) as chrome` |
| Use the where operator to match only weekend days. | `* | parse "day=*:" as day_of_week  | where day_of_week in ("Saturday","Sunday")` |
| Identify all URLs that contain the subdirectory "Courses" in the path. | `* | parse "GET * " as cs_uri_stem  | where cs_uri_stem matches "*Courses*"` |
| Find version numbers that match numeric values 2, 3 or 1. Use the num operator to change the string into a number. | `* | parse "Version=*." as number  | num(number) | where number in (2,3,6)` |

:::sumo More Info
For more information, see [Where](/docs/search/search-query-language/search-operators/where) and [If](/docs/search/search-query-language/search-operators/if). 
:::

For any query, you can increase specificity by adding metadata fields to the keyword expression. Metadata fields include `_sourceCategory`,
`_sourceHost `, and `_sourceName`. Edit Source metadata in the **Collection** tab. For details see [Search Metadata.](/docs/search/get-started-with-search/search-basics/built-in-metadata) 
