---
id: microsoft-iis-parser
title: Suggested Searches for the Microsoft IIS Parser
sidebar_label: Microsoft IIS Parser
description: The following searches were built for use with the Microsoft IIS Parser. Copy and paste these searches into the search query field and save them for use later.
---

These suggested searches cover some of the most common scenarios for monitoring Security, Audit, and Performance issues on a Linux server. You can enter these queries into the Search box as a starting baseline, and then customize the queries for your system.

These are written assuming the messages are parsed by our out-of-the-box IIS W3C access log parser (for example, parse using public/iis).

## HTTP Status Code Summary Over Time

Returns the number of client errors, server errors, redirects, and successful responses observed each day over the last seven days. This search can be used to understand the distribution of errors vs successful responses and redirects.

* Suggested Time Range: -7d

```sql
_sourceCategory=*IIS*
| parse using public/iis
| if(sc_status matches "2*", 1, 0) as successes
| if(sc_status matches "3*", 1, 0) as redirects
| if(sc_status matches "5*", 1, 0) as server_errors
| if(sc_status matches "4*", 1, 0) as client_errors
| timeslice by 1d
| sum(successes) as successes, sum(redirects) as redirects, sum(client_errors) as client_errors, sum(server_errors) as server_errors by _timeslice
```

## Top 404 URLs

Returns the top 100 URLs that refer to a resource (that does not exist on the website). This information can be used to fix existing web pages.

* Suggested Time Range: -1d

```sql
_sourceCategory=*IIS* "404"
| parse using public/iis
| where sc_status matches "404" 
| count_frequent cs_uri_stem | limit 100
```

## Traffic Volume Served Per Day

Returns the number of hits on a website each day over the past 24 hours. If this search is run over a longer period of time (such as two weeks or a month) it may give you a good idea of which days of the week are busier.

* Suggested Time Range: -7d

```sql
_sourceCategory=*IIS*
| parse using public/iis
| timeslice by 1d
| count as hits by _timeslice
```

## Top Browsers

Returns the top 10 browsers accessing the website.

* Suggested Time Range: -1d

```sql
_sourceCategory=*IIS*
| parse using public/iis
| count_frequent cs_user_agent
| limit 10f
```

## Slowest URLs by Average Time

* Suggested Time Range: -1d

```sql
_sourceCategory=*IIS*
| parse using public/iis
| (time_taken/1000) as seconds
| avg(seconds) as avgtimeinseconds by cs_uri_stem
| sort by avgtimeinseconds
| limit 100
```
