---
id: install-for-apache-view-dashboards
title: Install Global Intelligence for Apache App and View Dashboards
sidebar_label: Install Global Intelligence for Apache App and View Dashboards
description: Learn how to install the Global Intelligence for Apache App and what it includes.
---

This section has instructions for installing the Global Intelligence for Apache App and has descriptions of each of the included dashboards. 

## Dashboard Filters  

Each dashboard has a set of filters that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard. See how to [filter with template variables](../../dashboards-new/filter-with-template-variables.md)
for details.

:::note
You can use filters to drill down and examine the data on a granular level. One server must be selected for benchmark comparisons to be meaningful.
:::

![Apache app filtersimage.png](/img/global-intelligence/apache-app-filters-image.png)

## Concepts

### Golden Signals

[Golden signals](https://landing.google.com/sre/sre-book/chapters/preface/) of load, bottleneck, latency, errors and throughput help identify the flow of causation between benchmark signals. In a nutshell, load spikes lead to either latency or error spikes; latency and error spikes lead to a drop in throughput as shown in the figure below. The signals and contributing factors are organized based on Golden Signal analysis

![Apache Golden signals.png](/img/global-intelligence/apache-golden-signals.png)

### Distance: Quantifying Similarity of Server Time Series to Benchmark

Distance, between 0 and 1, is a statistical measure of how similar a given entity is to other entities based on a given signal. A distance of 0 signifies entities that are behaving identical to the population of entities, for the given signal. Sudden increases in distance coupled with sudden increases compared to benchmark values indicate entities that are either the cause of an incident or are affected by upstream
issues.

For each Apache server, hourly signals for the past 7 days are used to construct the benchmark distribution for a given signal such as requests per second. A given server’s hourly readings for each day are compared with the benchmark signals to determine the daily distance from the benchmark. If a server is consistently different from the benchmark, such a server is behaving differently from the population for a given signal. Changes, such as a sudden increase in distance between days, are more significant than the absolute value of distance on any given day.

## GI Apache - 01. Load Signals and Contributing Factors

The **GI Apache - 01. Load Signals and Contributing Factors** dashboard compares the golden signal of load (requests per second) for a company’s Apache servers to other servers. These signals are impacted by connections per second, requests per connection, the share of bot connections, and share of HTTP POST/DELETE requests. These causal signals are also compared to the population of Apache servers.

Use this dashboard to:

* Analyze unusual load spikes and the reasons for them. Load on an Apache server is measured by Requests per Second. Apache [request rate](https://httpd.apache.org/docs/trunk/misc/perf-scaling.html) is affected by connection rate, requests per connection, data transferred (GB/request), BOT activity, and HTTP verb mix. In addition [configuration factors](https://www.liquidweb.com/kb/apache-optimization/) such as the use of HTTPs and CPU/Memory allocation also affect Apache request rate. Assess if your Apache request rates are significantly lower for a given server compared to other Apache servers. If so, consult these correlates to verify if any of these factors might be the cause. To do this, first consult the Distance measurement and then the difference between a given entity and the benchmark.

![GI-Apache-01-Load-Signals-and-Contributing-Factors.png](/img/global-intelligence/GI-Apache-01-Load-Signals-and-Contributing-Factors.png)

## GI Apache - 02. Throughput Signals and Contributing Factors

The **GI Apache - 01. Throughput Signals and Contributing Factors** dashboard compares the golden signal of throughput (GB per second)  for a company’s Apache servers to other servers.  

Apache throughput (GB per sec) is affected by: (a) request rate (b) data transferred - GB per request (c) Server errors. 

Use this dashboard to:

* Assess if your Apache throughput is significantly lower for a given server compared to other Apache servers. If so, analyze the request rate, GB per request, and server errors to verify if any of these factors might be the cause. To do this, first consult the Distance measurement and then the difference between a given entity and the benchmark. Sudden increases in distance coupled with sudden increases compared to benchmark values indicate entities that are either the cause of an incident or are affected by upstream issues.

![GI-Apache-02-Throughput-Signals-and-Contributing-Factors.png](/img/global-intelligence/GI-Apache-02-Throughput-Signals-and-Contributing-Factors.png)

## GI Apache - 03. Errors and Contributing Factors

The **GI Apache - 03. Errors and Contributing Factors** dashboard compares the golden signal of error rate for a company’s Apache servers to other servers. These signals are impacted by requests per second, connections per second and GB per request. These causal signals are also compared to the population of Apache servers.

Use this dashboard to:

* Assess unusual increases in error rate and the reasons for them. Apache errors may be caused by high request rate, high request rate or large data transfer in GB per request.  Analyze the request rate, GB per request and server errors to verify if any of these factors might be the cause. To do this, first consult the Distance measurement and then the difference between a given entity and the benchmark. Sudden increases in distance coupled with sudden increases compared to benchmark values indicate entities that are either the cause of an incident or are affected by upstream issues.

![GI-Apache-03-Errors-and-Contributing-Factors.png](/img/global-intelligence/GI-Apache-03-Errors-and-Contributing-Factors.png)

## GI Apache - 04. Latency Signals and Contributing Factors

The **GI Apache - 04. Latency Signals and Contributing Factors** dashboard compares the golden signal of latency for a company’s Apache servers to other servers. Apache [latency](https://www.sumologic.com/insight/apache-response-time/) is affected by request rate, [configuration factors](https://www.liquidweb.com/kb/apache-optimization/), and slow URLs. 

Use this dashboard to:

* assess unusual latency increases and the reasons for them such as increased load. Analyze the request rate and HTTP POST/DELETE mix of requests to verify if any of these factors might be the cause. To do this, first consult the Distance measurement and then the difference between a given entity and the benchmark. Sudden increases in distance coupled with sudden increases compared to benchmark values indicate entities that are either the cause of an incident or are affected by upstream issues.

![GI-Apache-04-Latency-Signals-and-Contributing-Factors.png](/img/global-intelligence/GI-Apache-04-Latency-Signals-and-Contributing-Factors.png)

## GI Apache - 05. Visitor Benchmarks

The **GI Apache - 05. Visitor** dashboard compares client platforms, bots, and media types served by your company’s Apache servers compared to all Apache servers across the Sumo Logic server population.  

Use this dashboard to:

* Assess if your mix of client platforms, bots, and media types served are significantly different for a given Apache server compared to other servers.
* Assess if bot activity is unusual for your company compared to others in the benchmark. Unusual bots compared to benchmarks could impact your site reliability or [compromise](https://nocinit.com/blog/bad-bots-blocking-apache-nginx-csf-tutorial/) security.
* Assess if media types served are very different for your Apache servers. This can be helpful to understand correlations with GB per request in **GI Apache - 01. Load Signals and Contributing Factors. **
* Understand your mix of clients (desktop versus mobile, desktop OS versions, mobile OS versions) to diagnose unusual levels of certain error codes observed in **GI Apache - 01. Load Signals and Contributing Factors. See [this](https://stackoverflow.com/questions/27828200/why-does-nginx-give-a-502-error-only-for-mobile-devices) example.
* Diagnose deviations of your company compared to the benchmark by using the trend line panels for your company’s Apache servers.

![GI-Apache-05-Visitor-Benchmarks.png](/img/global-intelligence/GI-Apache-05-Visitor-Benchmarks.png)
