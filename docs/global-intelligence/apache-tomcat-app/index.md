---
slug: /global-intelligence/apache-tomcat-app
title: Global Intelligence for Apache Tomcat App
sidebar_label: Global Intelligence for Apache Tomcat App
description: The Global Intelligence for Apache Tomcat app helps DevOps and infrastructure engineers compare server and user activity patterns associated with their Apache Tomcat servers.
---

Global Intelligence for Apache Tomcat App is a companion to the Apache Tomcat application and helps DevOps and infrastructure engineers compare server and user activity patterns associated with their Apache Tomcat servers against other Sumo Logic customer’s servers. Such comparisons can help diagnose potential load, throughput or error issues in Apache Tomcat clusters and avoid operational incidents arising from sub-optimal configurations of Tomcat servers.

## Data Sources 

Global Intelligence for Apache Tomcat App uses logs data from Apache Tomcat clusters. Like the Sumo Logic App for Apache Tomcat, it assumes the NCSA extended/combined log file format for Access logs and the default Apache Tomcat error log file format for error logs. For more details on custom log formats, see [Apache Tomcat Module mod_log_config](https://httpd.apache.org/docs/current/mod/mod_log_config.html).

## Query sample 

The following sample query is from the Average **Requests Per Second: My** **Server** **v Benchmark** panel of **GI Tomcat - 02. Load Signals and Contributing Factors** dashboard.

```sql
| json auto maxdepth 1 nodrop
| if (isEmpty(log), _raw, log) as tomcat_log_message
| parse regex field=tomcat_log_message "(?<remote_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\s+(?<user>\S+)\s+(?<hostname>[\S]+)\s+\[" nodrop
| parse regex field=tomcat_log_message "(?<remote_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\s+(?<local_ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\s+(?<user>\S+)\s+(?<hostname>[\S]+)\s+\[" nodrop
| parse regex field=tomcat_log_message "\s+\[(?<date>[^\]]+)\]\s+\"(?<method>\w+)\s+(?<uri>\S+)\s+(?<protocol>\S+)\"\s+(?<status_code>\d+)\s+(?<size>[\d-]+)" nodrop
| parse regex field=tomcat_log_message "\"\s+\d+\s+[\d-]+\s+(?<timetaken>[\d-]+)"
| where _sourceHost matches "*" and remote_ip matches "*" and method matches "*" and uri matches "*" and status_code matches "*"
| where _sourceHost matches *
| _sourceHost as server
| where size != "-"
| timeslice 1h
| count as hits by _timeslice, server
| hits/3600 as my_company_requests_per_sec
| fields - hits
| avg(my_company_requests_per_sec) as my_entity_avg by server
| "requests_per_sec" as benchmarkname
| infer _category=gislite _model=benchmarktrendline appname=tomcat benchmark_stat="avg" my_entity_stat="avg"
| max(my_entity_avg) as my_entity_avg, max(benchmark_avg) as benchmark_avg by date
| sort by date asc
```
