---
id: apache-access-parser
title: Suggested Searches for the Apache Access Parser
sidebar_label: Apache Access Parser
description: The following searches were built for use with the Apache Errors Parser.
---


The following searches were built for use with the Apache Access Parser. Copy and paste these searches into the search query field and save them for later use.

To obtain the best results, be sure to make the following modifications to the example queries:

* Use a specific keyword expression or metadata search to limit the initial results to Apache logs. (Replace the metadata search expression `"sourceName=*error_log* AND _sourceCategory=*apache*"` in the examples.)
* Change the time range and the timeslice values to tailor the results to your needs.

## Understanding Incoming Requests

Use these searches for troubleshooting and performance monitoring.

### All HTTP Response codes with their count

This search returns the number of requests observed per HTTP status code.

* Suggested Time Range: -1d

```sql
_sourceName=*access_log* AND _sourceCategory=*apache*
| parse using public/apache/access
| count by status_code
| sort by _count
```

### Client Errors (4xx response codes) per day

Returns the number of errors caused by web clients over the past seven days. This search can be used to detect if these errors are increasing or decreasing over time. These kinds of errors can either indicate whether the number of attacks to the website are increasing (for example, 403 Forbidden responses) or whether website changes are causing more errors.

* Suggested Time Range: -7d

```sql
_sourceName=*access_log* AND _sourceCategory=*apache*
| parse using public/apache/access
| where status_code matches "4*"
| timeslice by 1d
| count by _timeslice
```

### Server Response Summary Over Time

Returns the number of client errors, server errors, redirects and successful responses observed each day over the last seven days. This search can be used to understand the distribution of errors vs. successful responses and redirects.

* Suggested Time Range: -7d

```sql
_sourceName=*access_log* AND _sourceCategory=*apache*
| parse using public/apache/access
| if(status_code matches "2*", 1, 0) as successes
| if(status_code matches "5*", 1, 0) as server_errors
| if(status_code matches "4*", 1, 0) as client_errors
| timeslice by 1d
| sum(successes) as successes, sum(client_errors) as client_errors, sum(server_errors) as server_errors by _timeslice
```

### Top 404 referrers

Returns the top 100 URLS that refer to a resource that does not exist on the website. This information can be used to fix existing web pages.

* Suggested Time Range: -1d

```sql
(_sourceName=*access_log* AND _sourceCategory=*apache*) AND "404"
| parse using public/apache/access
| where status_code="404"
| count_frequent referrer
| limit 100
```

### Top Clients Causing Errors

Returns the top source IP addresses that are responsible for client errors on the website, which can help in blocking certain IP addresses or IP address ranges from accessing the website.

* Suggested Time Range: -1d

```sql
_sourceName=*access_log* AND _sourceCategory=*apache*
| parse using public/apache/access
| where status_code matches "4*"
| count_frequent src_ip
| limit 100
```

## Understand Incoming Traffic

The following searches can help you get information about the volume of traffic and the amount of bytes served by your website over a period of time. In addition, the searches can help you learn more about the browsers and devices accessing your site.

### Traffic volume and bytes served per day

Returns the number of bytes served and the number of hits to the website each day over the past day. If run over a longer period of time (say two weeks or a month), this also may give a good idea of which days of the week are more busy than others.

* Suggested Time Range: -7d

```sql
_sourceName=*access_log* AND _sourceCategory=*apache*
| parse using public/apache/access
| where size != "-"
| (size/1048576) as mbytes
| timeslice by 1d
| sum(mbytes) as Bytes_Served_mb, count as hits by _timeslice
```

### Top clients

This search returns the top 100 IP addresses that cause the most hits to the website.

* Suggested Time Range: -1d up to -7d

```sql
_sourceName=*access_log* AND _sourceCategory=*apache*
| parse using public/apache/access
| count_frequent src_ip
```

### Top browsers

This search returns the top 100 browsers that are accessing the website.

* Suggested Time Range: -1d

```sql
_sourceName=*access_log* AND _sourceCategory=*apache*
| parse using public/apache/access
| count_frequent user_agent
| limit 100
```

### Robots

This search returns a list of all robots that are accessing the website, assuming that robots first access the robots.txt file before actually crawling through the website.

* Suggested Time Range: -1d

```sql
(_sourceName=*access_log* AND _sourceCategory=*apache*) AND "/robots.txt"
| parse using public/apache/access
| count_frequent user_agent
```

## Understand Page-Served Time

### Time taken to serve requests

This search adds the time taken in seconds, microseconds and minutes to serve the requests as additional fields. It can be used to get quick insight into the performance of the server at present.

:::important
This is assuming that the **%T/%D** logging directive is added to the access log where **%T** is the number of seconds and **%D** is the number of microseconds taken to serve the request.
:::

* Suggested Time Range: -30m

```sql
_sourceName=*access_log* AND _sourceCategory=*apache*
| parse using public/apache/access
| extract " (?<seconds>\d+)/(?<microseconds>\d+)$"
| toLong(microseconds/(1000000*60)) as minutes
```

## URLs and Bytes Served Statistics

### Malicious URL requests

Get information on incoming client request URLs which are sent for malicious reasons. These may or may not cause client or server errors.

* Suggested Time Range: -2h

```sql
(_sourceName=*access_log* AND _sourceCategory=*apache*) AND ("jsessionid" OR "old" OR "bak")
| parse using public/apache/access
| where url matches "*.old" OR url matches "*.bak" OR url matches "*jsessionid=*"
```

### Top URLs by bytes served

* Suggested Time Range: -1d

```sql
_sourceName=*access_log* AND _sourceCategory=*apache*
| parse using public/apache/access
| where size != "-"
| avg(size) as average_size_KB by url
| sort by average_size_KB
| limit 100
| (average_size_KB/1024) as average_size_KB
| (toLong(average_size_KB*100)/100) as average_size_KB
```
