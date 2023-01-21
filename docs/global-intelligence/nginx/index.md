---
slug: /global-intelligence/nginx
title: Global Intelligence for Nginx
sidebar_label: Global Intelligence for Nginx
description: The Global Intelligence for Nginx app provides you with information regarding Golden Signals and Visitor Benchmarks for your company's Nginx servers, and compares them to all servers from all customers.
---

## Availability

This feature is available in the following account plans.

| Account Type | Account Level                                  |
|:--------------|:------------------------------------------------|
| CloudFlex    | Trial, Enterprise                              |
| Credits      | Trial, Enterprise Operations, Enterprise Suite |

[Nginx](https://www.nginx.com/) is a web server that is used as a reverse proxy, load balancer, mail proxy, and HTTP cache. Global Intelligence for Nginx, is a companion to the [Nginx ULM](/docs/integrations/web-servers/Nginx-Legacy)
application. It helps DevOps and infrastructure engineers to compare server, and user activity patterns associated with their Nginx servers against other Sumo Logic customer’s servers. Such comparisons can help diagnose potential load, throughput or error issues in Nginx clusters and avoid operational incidents arising from sub-optimal configurations of Nginx clusters. 

| Dashboard | Description|
|:--|:--|
| GI Nginx - 01 Golden Signals | This dashboard compares golden signals of load (requests per second), throughput (responses by type) and errors for a company’s Nginx servers compared to other servers. Unusual levels of these signals compared to benchmarks can indicate configuration or operational issues. |
| GI Nginx - 02 Visitor Benchmarks | These panels compare unique visitor rates, bots and client platforms served by your company's Nginx servers versus Nginx servers of other companies to assess if unusual patterns in these indicators correlate with golden signals.  |

## Data Sources 

Global Intelligence for Nginx App uses logs data from Nginx clusters. Like the Sumo Logic App for Nginx, it assumes the NCSA extended/combined log file format for Access logs and the default Nginx error log file format for error logs. [For more details](http://nginx.org/en/docs/http/ngx_http_log_module.html) on Nginx logs. 

## Sample Query 

The following sample query is from the Average **Requests Per Second: My Company v Benchmark** panel of **GI Nginx - 01 Golden Signals** dashboard.

```sql
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
