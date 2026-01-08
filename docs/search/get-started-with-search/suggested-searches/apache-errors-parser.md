---
id: apache-errors-parser
title: Suggested Searches for the Apache Errors Parser
sidebar_label: Apache Errors Parser
description: The following searches were built for use with the Apache Access Parser. Copy and paste these searches into the search query field and save them for later use.
---

The following searches were built for use with the Apache Errors Parser. Copy and paste these searches into the search query field and save them for use later.

You can also set up [threshold alerts](../../../alerts/scheduled-searches/create-email-alert.md) for the Critical Operations Errors to be notified in the event critical errors occur.

To obtain the best results possible, be sure to make the following modifications to the example queries:

* Use a specific keyword expression or metadata search to limit the initial results to Apache logs. (Replace _the metadata search expression `"sourceName=*error_log* AND _sourceCategory=*apache*"` in the examples.)
* Change the time range and the timeslice values to tailor the results to your needs.

## Identify Critical Operations Errors

### Critical Log Messages

This search returns the most critical log messages in the Apache error log.

* Suggested Time Range: -10m; Set to run every 15 minutes with an
    alert for 1 or more results found.

```sql
_sourceName=*error_log* AND _sourceCategory=*apache* AND ("emerg" OR "alert" OR "crit")
| parse using public/apache/error
```

### Log Level Counts

Returns a count of all messages by log level (error, warn etc.) to give administrators quick insight into whether they need to investigate further.

* Suggested Time Rang: -15m

```sql
_sourceName=*error_log* AND _sourceCategory=*apache*
| parse using public/apache/error
| where log_level !=""
| count by log_level
| sort by _count
```

### Server Stops and Starts Over Time

Returns trend data of how many server start and stop events took place over a period of time.

* Suggested Time Range: -6h

```sql
_sourceName=*error_log* AND _sourceCategory=*apache*
| parse using public/apache/error
| if(reason matches "caught SIGTERM, shutting down", 1, 0) as server_stop
| if(reason matches "*-- resuming normal operations",1, 0) as server_start
| timeslice by 1h
| sum(server_stop) as server_stops, sum(server_start) as server_starts by _timeslice
```

## Identify Top Error Characteristics

### Top Error Reasons

This search returns the top Apache error log reasons.

* Suggested Time Range: -6h

```sql
_sourceName=*error_log* AND _sourceCategory=*apache*
| parse using public/apache/error
| count by reason
| top 100 reason by _count
```

### Top Clients Causing Errors

Returns the top source IP addresses that cause errors, which should correlate with the corresponding [access log searches](apache-access-parser.md) to determine the most malicious clients.

* Suggested Time Range: -6h

```sql
_sourceName=*error_log* AND _sourceCategory=*apache*
| parse using public/apache/error
| count_frequent src_ip
| limit 100
```
