---
id: nginx
title: Global Intelligence for Nginx App
sidebar_label: Global Intelligence for Nginx
description: The Global Intelligence for Nginx app provides you with information regarding Golden Signals and Visitor Benchmarks for your company's Nginx servers, and compares them to all servers from all customers.
---

## Availability

This feature is available in the following account plans.

| Account Type | Account Level                                  |
|:--------------|:------------------------------------------------|
| CloudFlex    | Trial, Enterprise                              |
| Credits      | Trial, Enterprise Operations, Enterprise Suite |

[Nginx](https://www.nginx.com/) is a web server that is used as a reverse proxy, load balancer, mail proxy, and HTTP cache. Global Intelligence for Nginx, is a companion to the [Nginx ULM](/docs/integrations/web-servers/nginx-legacy)
application. It helps DevOps and infrastructure engineers to compare server, and user activity patterns associated with their Nginx servers against other Sumo Logic customer’s servers. Such comparisons can help diagnose potential load, throughput or error issues in Nginx clusters and avoid operational incidents arising from sub-optimal configurations of Nginx clusters. 

| Dashboard | Description|
|:--|:--|
| GI Nginx - 01 Golden Signals | This dashboard compares golden signals of load (requests per second), throughput (responses by type) and errors for a company’s Nginx servers compared to other servers. Unusual levels of these signals compared to benchmarks can indicate configuration or operational issues. |
| GI Nginx - 02 Visitor Benchmarks | These panels compare unique visitor rates, bots and client platforms served by your company's Nginx servers versus Nginx servers of other companies to assess if unusual patterns in these indicators correlate with golden signals.  |

## Data Sources 

Global Intelligence for Nginx App uses logs data from Nginx clusters. Like the Sumo Logic App for Nginx, it assumes the NCSA extended/combined log file format for Access logs and the default Nginx error log file format for error logs. [For more details](http://nginx.org/en/docs/http/ngx_http_log_module.html) on Nginx logs. 

## Sample Query 

The following sample query is from the Average **Requests Per Second: My Company v Benchmark** panel of **GI Nginx - 01 Golden Signals** dashboard.

```
// id=@benchmark_requests_per_hr_sourceCategory=Labs/Nginx/Logs
| json auto maxdepth 1 nodrop
| if (isEmpty(log), _raw, log) as nginx_log_message
| parse regex field=nginx_log_message "(?<Client_Ip>\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})"
| parse regex field=nginx_log_message|
"(?<Method>[A-Z]+)\s(?<URL>\S+)\sHTTP/[\d\.]+\"\s(?<Status_Code>\d+)\s(?<Size>[\d-]+)\s\"(?<Referrer>.*?)\"\s\"(?<User_Agent>.+?)\".*"
| where _sourceHost matches Client_Ip matches "*" and Method matches "*" and URL matches "*" and Status_Code matches "*" and Referrer matches "*"
| where size != "-"
| timeslice 1h
| count as hits by _timeslice
| hits/3600 as hits
| pct(hits, 50) as my_company_p50, pct(hits, 75) as my_company_p75
| "requests_per_sec" as benchmarkname
| infer _category=gislite _model=benchmark appname=nginx benchmarktype=numerical stat="p50,p75"
| benchmark_p75/3600 as benchmark_p75
| benchmark_p50/3600 as benchmark_p50
| max(my_company_p50) as my_company_p50, max(my_company_p75) as my_company_p75, max(benchmark_p75) as benchmark_p75, max(benchmark_p50) as benchmark_p50 by benchmarkname
```


## Configuring Log Collection for Global Intelligence for Nginx

Follow the steps on the [Sumo Logic Nginx App](/docs/integrations/web-servers/nginx-legacy) to configure the log collection for Global Intelligence for Nginx App.


## Installing the Global Intelligence for Nginx App

This section has instructions for installing the Sumo Logic App for Global Intelligence for Nginx.

{@import ../../reuse/apps/app-install.md}

## Viewing Global Intelligence for Nginx Dashboards

### Dashboard Filters  

**Each dashboard has a set of filters** that you can apply to the entire dashboard, as shown in the following example. Click the funnel icon in the top dashboard menu bar to display a scrollable list of filters that are applied across the entire dashboard. 

:::note
You can use filters to drill down and examine the data on a granular level.  One server must be selected for benchmark comparisons to be meaningful.
:::

![](/img/global-intelligence/nginx-filter.png)

### GI Nginx - 01 Golden Signals

The **GI Nginx - 01 Golden Signals** dashboard tabulates requests per second, HTTP method mix,  GB per request, response types (success, error, redirect) per request, and errors in your company’s Nginx servers and compares them to all servers from all customers. Filter results by nginx server to profile a given server against all  Nginx servers in the Sumo Logic customer base. If your stats are different compared to the benchmark, it is a strong signal that your Nginx cluster’s load profile is different or is incorrectly provisioned compared to request load when compared to other customers. Refer to [https://www.nginx.com/blog/testing-t...s-web-servers/](https://www.nginx.com/blog/testing-the-performance-of-nginx-and-nginx-plus-web-servers/) to validate your nginx configuration relative to load configuration.

Use this dashboard to:

* Compare requests per second, HTTP method mix and GB per request along with response types, errors and log levels distribution for your company’s Nginx servers versus all servers.
* As noted [here](https://www.nginx.com/blog/testing-the-performance-of-nginx-and-nginx-plus-web-servers), Ngnix request rate is affected by: (a) CPUs allocated (b) data transferred  and (c ) use of HTTPs. Assess if your Nginx request rates are significantly lower for a given server compared to other Nginx. If so, consult the Nginx documentation to determine if adequate CPU resources are allocated. Next, check if differences in HTTP method mix (greater share of POST over GET) or (greater) GB per request might explain lower request rates. Error rate differences compared to the benchmark might imply application incidents (for server-side error codes) or user / client side issues (for 4XX errors). Diagnose these further by correlating with application incidents, GB per request differences or other factors. 
* Use the trend line panels for request rate, GB per request and errors to understand if your Nginx errors have a temporal pattern that might help explain differences compared to benchmarks. 

![golden signals.jpg](/img/global-intelligence/nginx-golden-signals.jpeg)

### GI Nginx - 02 Visitor Benchmarks

The **GI Nginx - 02 Visitor** dashboard compares unique visitors, client platforms, bots and media types served by your company’s Nginx servers compared to all Nginx servers across the Sumo Logic customer population.  

Use this dashboard to:

* Assess if your unique visitors per hour and mix of client platforms, bots and media types served are significantly different for a given Nginx server compared to  other servers. 
* Assess if bot activity is unusual for your company compared to others in the benchmark. Unusual bots compared to benchmark could impact your site reliability or [compromise](https://nocinit.com/blog/bad-bots-blocking-apache-nginx-csf-tutorial/) security.
* Assess if media types served are very different for your Nginx servers. This can be helpful to understand correlations with GB per request in **GI Nginx - 01 Golden Signals. **
* Understand your mix of clients (desktop versus mobile, desktop OS versions, mobile OS versions) to diagnose unusual levels of certain error codes observed in **GI Nginx - 01 Golden Signals.** See [this](https://stackoverflow.com/questions/27828200/why-does-nginx-give-a-502-error-only-for-mobile-devices) example.
* Diagnose deviations of your company compared to the benchmark by using the trend line panels for your company’s Nginx servers

![nginx-benchmarks](/img/global-intelligence/nginx-benchmarks.jpeg)
