---
id: apache-tomcat
title: Global Intelligence for Apache Tomcat App
sidebar_label: Global Intelligence for Tomcat
description: The Global Intelligence for Apache Tomcat app helps DevOps and infrastructure engineers compare server and user activity patterns associated with their Apache Tomcat servers.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/web-servers/gi-apache.png')} alt="icon" width="75"/>

Global Intelligence for Apache Tomcat App is a companion to the Apache Tomcat application and helps DevOps and infrastructure engineers compare server and user activity patterns associated with their Apache Tomcat servers against other Sumo Logic customer’s servers. Such comparisons can help diagnose potential load, throughput or error issues in Apache Tomcat clusters and avoid operational incidents arising from sub-optimal configurations of Tomcat servers.

## Data Sources 

Global Intelligence for Apache Tomcat App uses logs data from Apache Tomcat clusters. Like the Sumo Logic App for Apache Tomcat, it assumes the NCSA extended/combined log file format for Access logs and the default Apache Tomcat error log file format for error logs. For more details on custom log formats, see [Apache Tomcat Module mod_log_config](https://httpd.apache.org/docs/current/mod/mod_log_config.html).

## Sample Query 

The following sample query is from the **Average Requests Per Second: My Server v Benchmark** panel of the **GI Tomcat - 02. Load Signals and Contributing Factors** dashboard.

```
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

## Collecting Logs for the Global Intelligence for Tomcat App

The Sumo Global Intelligence for Tomcat app provides insights into your key Tomcat infrastructure indicators. 

Follow the steps in [Sumo Logic Tomcat Logs](/docs/integrations/web-servers/apache-Tomcat#Collecting-Logs-and-Metrics-for-Apache-Tomcat) to configure the collection for Global Intelligence for Tomcat App.


## Installing the Global Intelligence for Apache Tomcat App

This section has instructions for installing the Sumo Logic App for Global Intelligence for Apache Tomcat.

{@import ../../reuse/apps/app-install.md}

## Concepts

### Golden Signals

[Golden signals](https://landing.google.com/sre/sre-book/chapters/preface/) of load, bottleneck, latency, errors and throughput help identify flow of causation between benchmark signals. In a nutshell, load spikes lead to either latency or error spikes; latency and error spikes lead to drop in throughput as shown in the figure below. The signals and contributing factors are organized based on Golden Signal analysis

![screen](/img/global-intelligence/apache-tomcat-golden-signal.png)

### Distance: Quantifying Similarity of Server Time Series to Benchmark

Distance, between 0 and 1, is a statistical measure of how similar a given entity is to other entities based on a given time series signal. A distance of 0 signifies entities that are behaving identical to the population of entities, for the given signal. Sudden increases in distance coupled with sudden increases compared to benchmark values indicate entities that are either the cause of an incident or are affected by upstream issues.

For each Apache Tomcat server, hourly signals for the past 7 days are used to construct the benchmark distribution for a given signal such as requests per second. A given server’s hourly readings for each day are compared with the benchmark signals to determine the daily distance from the benchmark. If a server is consistently different from the benchmark, such a server is behaving differently from the population for a given signal. Changes, such as a sudden increase in distance between days are more significant than the absolute value of distance on any given day.   

## Global Intelligence for Apache Tomcat Dashboards

### Load Signals and Contributing Factors

The **GI Apache Tomcat - 01 Load Signals and Contributing Factors** dashboard compares the golden signal of load (requests per second) for a company’s Apache Tomcat servers to other servers. These signals are impacted by connections per second, requests per connection and share of HTTP POST/DELETE requests. These causal signals are also compared to the population of Apache Tomcat servers. Use this dashboard to analyze unusual load spikes and the reasons for them. 

Use this dashboard to:

* analyze unusual load spikes and the reasons for them. Load on an Apache Tomcat server is measured by Requests per Second. Apache Tomcat [request rate](https://tomcat.apache.org/articles/performance.pdf) is affected by connection rate, requests per connection, data transferred (GB/request), BOT activity and HTTP verb mix. In addition [configuration factors](https://www.oreilly.com/library/view/tomcat-the-definitive/9780596101060/ch04.html) such as use of HTTPs and CPU/Memory allocation also affect Apache Tomcat request rate. Assess if your Apache Tomcat request rates are significantly lower for a given server compared to other Apache Tomcat servers. If so, consult these correlates to verify if any of these factors might be the cause. To do this, first consult the Distance measurement and then the difference between a given entity and the benchmark

![screen](/img/global-intelligence/GI-Tomcat-01-Load-Signals-and-Contributing-Factors.png)

### Throughput Signals and Contributing Factors

The **GI Apache Tomcat - 02 Throughput Signals and Contributing Factors** dashboard compares the golden signal of throughput (GB per second) for a company’s Apache Tomcat servers to other servers. These signals are impacted by requests per second, GB per request and error rate. These causal signals are also compared to the population of Apache Tomcat servers. Use this dashboard to assess unusual throughput drops and the reasons for them such as increased errors or load spikes. 

Use this dashboard to assess if your Apache Tomcat throughput is significantly lower for a given server compared to other Apache Tomcat servers. If so, analyze the request rate, GB per request and server errors to verify if any of these factors might be the cause.

To do this, first consult the Distance measurement and then the difference between a given entity and the benchmark. Sudden increases in distance coupled with sudden increases compared to benchmark values indicate entities that are either the cause of an incident or are affected by upstream issues.

![screen](/img/global-intelligence/GI-Tomcat-02-Throughput-Signals-and-Contributing-Factors.png)

### Errors and Contributing Factors

The **GI Apache Tomcat - 03 Errors and Contributing Factors** dashboard compares the golden signal of error rate for a company’s Apache Tomcat servers to other servers. These signals are impacted by requests per second, connections per second and GB per request. These causal signals are also compared to the population of Apache Tomcat servers. Use this dashboard to assess unusual increases in error rate and the reasons for them such as increased load.

Use this dashboard to assess unusual increases in error rate and the reasons for them. Apache Tomcat errors may be caused by high request rate, high request rate or large data transfer in GB per request. Analyze the request rate, GB per request and server errors to verify if any of these factors might be the cause.

To do this, first consult the Distance measurement and then the difference between a given entity and the benchmark. Sudden increases in distance coupled with sudden increases compared to benchmark values indicate entities that are either the cause of an incident or are affected by upstream issues.

![screen](/img/global-intelligence/GI-Tomcat-03-Errors-and-Contributing-Factors.png)

### Latency Signals and Contributing Factors

The **GI Apache Tomcat - 04 Latency Signals and Contributing Factors** dashboard compares the golden signal of latency for a company’s Apache Tomcat servers to other servers. These signals are impacted by requests per second and HTTP POST/DELETE share of requests. These causal signals are also compared to the population of Apache Tomcat servers. Use this dashboard to assess unusual latency increases and the reasons for them such as increased load. 

Use this dashboard to assess unusual latency increases and the reasons for them such as increased load. Analyze the request rate and HTTP POST/DELETE mix of requests to verify if any of these factors might be the cause.

To do this, first consult the Distance measurement and then the difference between a given entity and the benchmark. Sudden increases in distance coupled with sudden increases compared to benchmark values indicate entities that are either the cause of an incident or are affected by upstream issues.

![screen](/img/global-intelligence/GI-Tomcat-04-Latency-Signals-and-Contributing-Factors.png)

### Dashboard Filters  

**Each dashboard has a set of filters** that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard. 

:::note
You can use filters to drill down and examine the data on a granular level.  One server must be selected for benchmark comparisons to be meaningful.
:::

![screen](/img/global-intelligence/apache-tomcat-filter.png)
