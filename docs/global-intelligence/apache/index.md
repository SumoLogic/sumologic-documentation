---
slug: /global-intelligence/apache
title: Global Intelligence for Apache
sidebar_label: Global Intelligence for Apache
description: The Global Intelligence for Apache App is a companion to the Apache App and helps DevOps and infrastructure engineers compare server and user activity patterns associated with their Apache servers against other Sumo Logic customer’s servers.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/web-servers/gi-apache1.png')} alt="icon" width="75"/>

The Global Intelligence for Apache App is a companion to the [Apache](/docs/integrations/web-servers/apache) App and helps DevOps and infrastructure engineers compare server and user activity patterns associated with their Apache servers against other Sumo Logic customer’s servers. Such comparisons can help diagnose potential load, throughput, or error issues in Apache clusters and avoid operational incidents arising from sub-optimal configurations of Apache clusters.

## Availability

This feature is available in the following account plans.

| Account Type | Account Level                           |
|:--------------|:-----------------------------------------|
| CloudFlex    | Enterprise                              |
| Credits      | Enterprise Operations, Enterprise Suite |

## Dashboards

| Dashboard | Description |
|:--|:--|
| GI Apache - 01. Load Signals and Contributing Factors | This dashboard compares the golden signal of load (requests per second) for a company’s Apache servers to other servers. These signals are impacted by connections per second, requests per connection, the share of bot connections, and the share of HTTP POST/DELETE requests. These causal signals are also compared to the population of Apache servers. Use this dashboard to analyze unusual load spikes and the reasons for them. |
| GI Apache - 02. Throughput Signals and Contributing Factors | This dashboard compares the golden signal of throughput (GB per second) for a company’s Apache servers to other servers. These signals are impacted by requests per second, GB per request, and error rate. These causal signals are also compared to the population of Apache servers. Use this dashboard to assess unusual throughput drops and the reasons for them such as increased errors or load spikes.  |
| GI Apache - 03. Errors and Contributing Factors | This dashboard compares the golden signal of error rate for a company’s Apache servers to other servers. These signals are impacted by requests per second, connections per second, and GB per request. These causal signals are also compared to the population of Apache servers. Use this dashboard to assess unusual increases in error rate and the reasons for them such as increased load. |
| GI Apache - 04. Latency Signals and Contributing Factors | This dashboard compares the golden signal of latency for a company’s Apache servers to other servers. These signals are impacted by requests per second and HTTP POST/DELETE share of requests. These causal signals are also compared to the population of Apache servers. Use this dashboard to assess unusual latency increases and the reasons for them such as increased load.  |
| GI Apache - 05. Visitor Benchmarks | These panels compare bots and client platforms served by your company's Apache servers versus Apache servers of other companies to assess if unusual patterns in these indicators correlate with golden signals. |

## Data Sources 

The Global Intelligence for Apache App uses logs data from Apache clusters. Like the Sumo Logic App for Apache, it assumes the NCSA extended/combined log file format for Access logs and the default Apache error log file format for error logs. [For more details](http://httpd.apache.org/docs/current/mod/mod_log_config.html) on Apache logs.

## Sample Query 

The following sample query is from the Average **Requests Per Second: My Server v Benchmark** panel of **GI Apache - 02. Load Signals and Contributing Factors** dashboard.

```sql
| parse regex field=apache_log_message "(?<Method>[A-Za-z]+)\s(?<URL>\S+)\sHTTP/[\d\.]+\"\s(?<Status_Code>\d+)\s(?<Size>[\d-]+)\s\"(?<Referrer>.*?)\"\s\"(?<User_Agent>.+?)\".*"
| where _sourceHost matches "*"
| _sourceHost as server
| where size != "-"
| timeslice 1h
| count as hits by _timeslice, server
| hits/3600 as my_company_requests_per_sec
| fields - hits
//| pct(my_company_requests_per_sec, 0.99) as my_entity_p99 by server
| avg(my_company_requests_per_sec) as my_entity_avg by server
| "requests_per_sec" as benchmarkname
| infer _category=gislite _model=benchmarktrendline appname=apache benchmark_stat="avg" my_entity_stat="avg"
//| max(benchmark_p99) as benchmark_p99, max(my_entity_p99) as my_entity_p99 by date
| max(benchmark_avg) as benchmark_avg, max(my_entity_avg) as my_entity_avg by date
| sort by date asc
```
