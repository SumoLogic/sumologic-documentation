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
* [Sumo Logic Add-on](https://elements.heroku.com/addons/sumologic) : The Sumo Logic Add-on can be attached to a Heroku application via the UI or the CLI. It automatically creates a Sumo Logic trial account that contains a [https logs source](https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/) on a [hosted collector](https://help.sumologic.com/docs/send-data/hosted-collectors/configure-hosted-collector/).
* [HTTPS Log Drain](https://devcenter.heroku.com/articles/log-drains#https-drains) : A HTTPS Log Drain can be attached to a Heroku application via the CLI. It can be used to send logs to a [http logs source](https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/) for any type of Sumo Logic account as per your requirement. The Sumo Logic Add-on internally wraps this method.

### Collecting Logs via Sumo Logic Add-on

The Sumo Logic add-on for Heroku helps you monitor Heroku apps and harness the power of machine data with effortless log management that delivers business and operational insights within minutes.

* Provisioning the Sumo Logic add-on via the **CLI** allows us to mointor a single app as well as multiple apps using the same add-on. It creates a Sumo Logic free trail account for analyzing the Heroku logs. We would first need to install the Heroku CLI. Follow these [https://devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli](instructions) to install the CLI. The following sections show how to configure the add-on for heroku apps.

   #### Single App

   For a single app, run the following command:
   ```
   $ heroku addons:create sumologic
   -----> Adding sumologic to sharp-mountain-4005... done, v18 (free)
   ```

   #### Multiple Apps

   To monitor multiple applications, you can share the same Sumo Logic add-on with multiple applications.
   First, provision the add-on for your first application:
   ```
   $ heroku addons:create sumologic
   -----> Creating sumologic-test-horizontal-9854... done, (free)
   -----> Adding sumologic-test-horizontal-9854... done
   ```
   Next, attach the add-on to your additional applications using the name of the add-on returned by the create command:
   ```
   $ heroku addons:attach sumologic-test-horizontal-9854
   -----> Attaching sumologic-test-horizontal-9854... done
   ```

   You can also run ```heroku drains``` or ```heroku drains --json``` command to find the name of an existing Sumo Logic add-on for an app which can be attached to a new app.

   Now you can access Sumo Logic via the CLI:
   ```
   $ heroku addons:open sumologic
   Opening sumologic for sharp-mountain-4005
   ```

   This opens up a Sumo Logic trail account. Fill up the Sumo Logic onboarding form with the relevant details and click on **Get Started** to use Sumo Logic. The Sumo Logic add-on for Heroku sets the value of _sourceCategory for your Heroku log data to “heroku”. You can now start a [log search](https://help.sumologic.com/docs/search/) with _sourceCategory=“heroku” to see the logs flowing in from Heroku.


* Provisioning the Sumo Logic add-on via the **UI** allows us to monitor a single app. The steps to do so are as follows:
   1. Log into the [Heroku Dashboard](https://dashboard.heroku.com/) to view information about your apps.
   2. Click on an app to view an in-depth page about the app, which also shows all the **Installed add-ons** in the **Overview** tab.
   3. Click on **Configure Add-ons** and then search for **Sumo Logic**.
   4. Click on the **Sumo Logic** add-on to open up a add-on order form.
   5. Choose the **Plan name** and click on the **Submit Order Form** button.

   You will now be able to see the **Sumo Logic** add-on in the **Installed add-ons** section of you app's **Overview** tab. Clicking on that add-on redirects to open up a Sumo Logic free trail account. Fill up the Sumo Logic onboarding form with the relevant details and click on **Get Started** to use Sumo Logic. The Sumo Logic add-on for Heroku sets the value of _sourceCategory for your Heroku log data to “heroku”. You can now start a [log search](https://help.sumologic.com/docs/search/) with _sourceCategory=“heroku” to see the logs flowing in from Heroku.

### Collecting Logs via HTTPS Log Drain

A HTTPS Log Drain can be attached to a Heroku application via the CLI. We would first need the URL of a [https logs source](https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/) on a [hosted collector](https://help.sumologic.com/docs/send-data/hosted-collectors/configure-hosted-collector/) in any type of Sumo Logic account.
Then, you add an HTTPS drain like so
