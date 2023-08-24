---
id: heroku
title: Heroku
sidebar_label: Heroku
description: The Heroku App is used to monitor heroku infrastructure, applications, metrics and error scenarios to ensure observability into heroku and its components.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/containers-orchestration/heroku.png')} alt="icon" width="175"/>


The Sumo Logic App for Heroku is a logs only app that allows you to monitor your Heroku environment. The preconfigured dashboards present information to monitor heroku infrastructure, applications, metrics and error scenarios to ensure observability into heroku and its components.

## Log and Metric Types

Heroku’s [Logplex logging service](https://devcenter.heroku.com/articles/logging) makes it easy to collect logs from its applications and forward them to Sumo. We use a [HTTPS log drain](https://devcenter.heroku.com/articles/log-drains#https-drains) to send [https://datatracker.ietf.org/doc/html/rfc5424#section-6](Syslog-formatted) messages to an HTTPS endpoint via a POST request.

The Heroku Labs [https://devcenter.heroku.com/articles/log-runtime-metrics](log-runtime-metrics) feature adds experimental support for enabling visibility into load and memory usage for running dynos.

### Sample log message

A Logplex POST body resembles the following:

<details><summary>Sample Log Message (click to expand)</summary>
```
83 <40>1 2012-11-30T06:45:29+00:00 host app web.3 - State changed from starting to up
119 <40>1 2012-11-30T06:45:26+00:00 host app web.3 - Starting process with command `bundle exec rackup config.ru -p 24405
```
</details>

Runtime metrics logs have the following format:

<details><summary>Sample Metric Log Message (click to expand)</summary>
```
335 <134>1 2023-08-24T10:28:47.153192+00:00 host heroku web.1 - source=web.1 dyno=heroku.322071457.63c5abfd-838b-4e2d-bce1-ce46de280675 sample#memory_total=180.43MB sample#memory_rss=180.05MB sample#memory_cache=0.38MB sample#memory_swap=0.00MB sample#memory_pgpgin=84329pages sample#memory_pgpgout=38140pages sample#memory_quota=512.00MB
205 <134>1 2023-08-24T12:31:50.112+00:00 host heroku web.1 - source=web.1 dyno=heroku.319324155.67cc34d0-0440-4106-97b6-d9486f7d9009 sample#load_avg_1m=0.00 sample#load_avg_5m=0.00 sample#load_avg_15m=0.01
```
</details>

### Sample query

Log Query:

<details><summary>Successfull App Build Trend (click to expand)</summary>
```sql
_sourceCategory"Heroku" "Build Succeeded"
| where _sourceName matches "{{log_drain}}"
| _sourceName as log_drain
| parse regex "(?<dateStamp>\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}.*\+\d{2}:\d{2})"
| parseDate(dateStamp,"yyyy-MM-dd'T'HH:mm:ss","etc/utc") as date
| formatDate(date, "MMM-dd") as day
| count by log_drain, day
| transpose row day column log_drain
```
</details>

Metric Log Query:

<details><summary>Memory Utilization (megabytes) (click to expand)</summary>
```sql
_sourceCategory"Heroku"
| parse regex "dyno=(?<dyno>.*?(?= )).*memory_total=(?<memory_total>.*?(?=MB )).*memory_rss=(?<memory_rss>.*?(?=MB )).*memory_cache=(?<memory_cache>.*?(?=MB )).*memory_swap=(?<memory_swap>.*?(?=MB ))"
| where dyno matches "{{dyno}}" and _sourceName matches "{{log_drain}}"
| timeslice 1m
| avg(memory_total) as memory_total, avg(memory_rss) as resident_memory, avg(memory_cache) as disk_cache_memory, avg(memory_swap) as swap_memory by _timeslice
```
</details>

## Collecting Logs for Heroku

Heroku is a cloud platform that lets companies build, deliver, monitor and scale apps in 8 programming languages namely Node.js, Ruby, Python, Java, PHP, Go, Scala and Clojure.

There are two ways to send Heroku logs to Sumo:
* [Sumo Logic Add-on](https://devcenter.heroku.com/articles/sumologic) : The Sumo Logic Add-on can be attached to a Heroku application via the UI or the CLI. It automatically creates a Sumo Logic trial account that contains a [https logs source](https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/) on a [hosted collector](https://help.sumologic.com/docs/send-data/hosted-collectors/configure-hosted-collector/).
* [HTTPS Log Drain](https://devcenter.heroku.com/articles/log-drains#https-drains) : A HTTPS Log Drain can be attached to a Heroku application via the CLI. It can be used to send logs to a [http logs source](https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/) for any type of Sumo Logic account as per your requirement. The Sumo Logic Add-on internally wraps this method.