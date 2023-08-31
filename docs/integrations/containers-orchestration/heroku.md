---
id: heroku
title: Heroku
sidebar_label: Heroku
description: The Heroku App is used to monitor heroku infrastructure, applications, metrics and error scenarios to ensure observability into heroku and its components.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Heroku_logo.svg" alt="icon" width="175"/>


The Sumo Logic App for Heroku is a logs only app that allows you to monitor your Heroku environment. The preconfigured dashboards present information to monitor heroku infrastructure, applications, metrics and error scenarios to ensure observability into heroku and its components.

## Log types

* Heroku’s [Logplex logging service](https://devcenter.heroku.com/articles/logging) makes it easy to collect logs from its applications and forward them to Sumo. We use a [HTTPS log drain](https://devcenter.heroku.com/articles/log-drains#https-drains) to send [Syslog-formatted](https://datatracker.ietf.org/doc/html/rfc5424#section-6) messages to an HTTPS endpoint via a POST request.

* The Heroku Labs [log-runtime-metrics](https://devcenter.heroku.com/articles/log-runtime-metrics) feature adds experimental support for enabling visibility into load and memory usage for running dynos.

### Sample log message

* A Logplex POST body resembles the following:
```
83 <40>1 2012-11-30T06:45:29+00:00 host app web.3 - State changed from starting to up
119 <40>1 2012-11-30T06:45:26+00:00 host app web.3 - Starting process with command `bundle exec rackup config.ru -p 24405
```

* Runtime metric logs have the following format:
```
335 <134>1 2023-08-24T10:28:47.153192+00:00 host heroku web.1 - source=web.1 dyno=heroku.322071457.63c5abfd-838b-4e2d-bce1-ce46de280675 sample#memory_total=180.43MB sample#memory_rss=180.05MB sample#memory_cache=0.38MB sample#memory_swap=0.00MB sample#memory_pgpgin=84329pages sample#memory_pgpgout=38140pages sample#memory_quota=512.00MB
205 <134>1 2023-08-24T12:31:50.112+00:00 host heroku web.1 - source=web.1 dyno=heroku.319324155.67cc34d0-0440-4106-97b6-d9486f7d9009 sample#load_avg_1m=0.00 sample#load_avg_5m=0.00 sample#load_avg_15m=0.01
```

### Sample query

#### Log Query

* **Successfull App Build Trend** panel query:
```sql
_sourceCategory"Heroku" "Build Succeeded"
| where _sourceName matches "{{log_drain}}"
| _sourceName as log_drain
| timeslice 5m
| count by log_drain, _timeslice
| transpose row _timeslice column log_drain
```

#### Metric Log Query

* **Memory Utilization (MB)** panel query:
```sql
_sourceCategory"Heroku"
| parse regex "dyno=(?<dyno>.*?(?= )).*memory_total=(?<memory_total>.*?(?=MB )).*memory_rss=(?<memory_rss>.*?(?=MB )).*memory_cache=(?<memory_cache>.*?(?=MB )).*memory_swap=(?<memory_swap>.*?(?=MB ))"
| where dyno matches "{{dyno}}" and _sourceName matches "{{log_drain}}"
| timeslice 1m
| avg(memory_total) as memory_total, avg(memory_rss) as resident_memory, avg(memory_cache) as disk_cache_memory, avg(memory_swap) as swap_memory by _timeslice
```

## Collecting Logs for Heroku

Heroku is a cloud platform that lets companies build, deliver, monitor and scale apps in 8 programming languages namely Node.js, Ruby, Python, Java, PHP, Go, Scala and Clojure.

There are two ways to send Heroku logs to Sumo:
* [Sumo Logic Add-on](https://elements.heroku.com/addons/sumologic) : The Sumo Logic Add-on can be attached to a Heroku application via the the CLI or the UI. It automatically creates a Sumo Logic free trial account that contains a [https logs source](https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/) on a [hosted collector](https://help.sumologic.com/docs/send-data/hosted-collectors/configure-hosted-collector/).
* [HTTPS Log Drain](https://devcenter.heroku.com/articles/log-drains#https-drains) : A HTTPS Log Drain can be attached to a Heroku application via the CLI. It can be used to send logs to a [http logs source](https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/) for any type of [Sumo Logic account](https://help.sumologic.com/docs/manage/manage-subscription/) as per your requirement. The Sumo Logic Add-on internally wraps this method.

### Collecting Logs via Sumo Logic Add-on

The Sumo Logic add-on for Heroku helps you monitor Heroku apps and harness the power of machine data with effortless log management that delivers business and operational insights within minutes.

:::tip NOTE
It is recommended to attach a heroku add-on just after creating an app or running the ```heroku create``` command to help observe heroku logs for all events that may follow for the app.
:::

* #### Provisioning the Sumo Logic add-on via the CLI

    Provisioning the Sumo Logic add-on via the CLI allows us to mointor a single app as well as multiple apps using the same add-on. It creates a Sumo Logic free trail account for analyzing the Heroku logs. You would first need to install the Heroku CLI. Follow these [instructions](https://devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli) to install the CLI. The following sections show how to configure the add-on for heroku apps.

    *  ##### Monitor a Single App

    For a single app, run the following command in your app directory:
    ```
    $ heroku addons:create sumologic
    -----> Adding sumologic to sharp-mountain-4005... done, v18 (free)
    ```

    * ##### Monitor Multiple Apps

    To monitor multiple applications, you can share the same Sumo Logic add-on with multiple applications.
    First, provision the add-on for your first application by running the following command in your app directory:
    ```
    $ heroku addons:create sumologic
    -----> Creating sumologic-test-horizontal-9854... done, (free)
    -----> Adding sumologic-test-horizontal-9854... done
    ```

    Next, attach the add-on to your additional applications using the name of the add-on returned by the create command. Then run the following command in your app directory:

    ```
    $ heroku addons:attach sumologic-test-horizontal-9854
    -----> Attaching sumologic-test-horizontal-9854... done
    ```

    :::tip NOTE
    You can also run ```heroku drains``` or ```heroku drains --json``` command in your app directory to find the name of an existing Sumo Logic add-on of an app which can be attached to a new app.
    :::

    You can now access Sumo Logic. Run the following command in your app directory:
    ```
    $ heroku addons:open sumologic
    Opening sumologic for sharp-mountain-4005
    ```

    This opens up a Sumo Logic free trail account. Fill up the Sumo Logic onboarding form with the relevant details and click on **Get Started** to use Sumo Logic. The Sumo Logic add-on for Heroku sets the value of **_sourceCategory** for your Heroku log data to **“heroku”**. It is recommended to use a single add-on for multiple applications.

* #### Provisioning the Sumo Logic add-on via the UI

    Provisioning the Sumo Logic add-on via the UI allows us to monitor a single app. The steps to do so are as follows:
    1. Log into your [Heroku Dashboard](https://dashboard.heroku.com/) to view information about your apps.
    2. Click on an app to view an in-depth page about the app, which also shows all the **Installed add-ons** in the **Overview** tab.
    3. Click on **Configure Add-ons** and then search for **Sumo Logic**.
    4. Click on the **Sumo Logic** add-on to open up a add-on order form.
    5. Choose the **Plan name** and click on the **Submit Order Form** button.

    You will now be able to see the **Sumo Logic** add-on in the **Installed add-ons** section of you app's **Overview** tab. Clicking on that add-on redirects to open up a Sumo Logic free trail account. Fill up the Sumo Logic onboarding form with the relevant details and click on **Get Started** to use Sumo Logic. The Sumo Logic add-on for Heroku sets the value of **_sourceCategory** for your Heroku log data to **“heroku”**.

### Collecting Logs via HTTPS Log Drain

A HTTPS Log Drain can be attached to a Heroku application via the CLI. You would first need the **URL** of a [https logs source](https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/) on a [hosted collector](https://help.sumologic.com/docs/send-data/hosted-collectors/configure-hosted-collector/) in any [Sumo Logic account](https://help.sumologic.com/docs/manage/manage-subscription/). You would also need to install the Heroku CLI. Follow these [instructions](https://devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli) to install the CLI.

Then, you add an HTTPS drain for an app named **myapp**:
```
$ heroku drains:add <URL> -a myapp
```

You will now be able to see Heroku logs flowing into that http source in Sumo Logic. You can also attach the same url to multiple apps for a single log drain.

## Collecting Mertic Logs for Heroku

The Heroku Labs log-runtime-metrics feature adds experimental support for enabling visibility into load and memory usage for running dynos. Per-dyno stats on memory use, swap use, and load average are inserted into the app’s log stream where they can be seen via ```heroku logs --tail```, used for graphs or alerting via an add-on which consumes app logs, or sent to a log drain. There is no cost incurred by enabling this feature.

To collect metric logs for an app, follow these steps:
1. Attach a log drain to the app. You can either attach a Sumo Logic add-on or a HTTPS log drain as explained in the [Collecting Logs for Heroku](#collecting-logs-for-heroku) section.
2. Enable the log-runtime-metrics:
```
$ heroku labs:enable log-runtime-metrics --app example-app
Enabling log-runtime-metrics for example-app... done
$ heroku restart
```

The metric logs will start flowing into the Sumo Logic endpoint attached to your app. The load and memory usage metrics are surfaced as system logs in the Logplex log stream. Metrics are emitted for each running dyno, at an approximate frequency of once every 20 seconds.

You can also disable this feature by:
```
$ heroku labs:disable log-runtime-metrics --app example-app
Disabling log-runtime-metrics for example-app... done
$ heroku restart
```

## (Optional) Set up field extraction rules for for applications

This step is optional, but recommended, as it makes it easier for you to query your Heroku application logs in Sumo. When Sumo ingests Heroku application logs, it attaches the **_sourceName** metadata field to the the data. The **_sourceName** Sumo assigns varies by application—its value is the unique identifier for the Logplex drain assigned to the application.

For ease of understanding the log data, you can use a **field extraction rule (FER)** to rename **_sourceName** from the drain UUID to the application name. For general information about FERs see [Create a Field Extraction Rule](https://help.sumologic.com/docs/manage/field-extractions/create-field-extraction-rule/) in Sumo help.

You can determine the drain identifier by running the ```heroku drains``` command for your app.
The identifier will look something like:

```
d.98ee476d-d2d8-46bf-afc2-740f6f7e5b2a
```

Then, define an FER in Sumo.
* In the Sumo web app, go to **Manage Data > Settings > Field Extraction Rules**.
* Click the plus sign (+) in the upper left corner of the page to display the **Create Field Extraction Rule** popup.
* **Rule Name** : Enter a name for the FER.
* **Scope** : Enter **_sourceCategory=heroku** when the collection is setup via the Sumo Add-on.
* **Parse Expression** : For each Heroku application reporting data to Sumo, enter a statement that renames the ``_sourceName`` from the drain ID to the application name. For example:

``if (_sourceName="Drain_ID", "Application_Name", _sourceName) as _sourceName``

The FER below changes the value of ``_sourceName`` for two applications. The first line changes ``_sourceName`` from “d.98ee476d-d2d8-46bf-afc2-740f6f7e5b2a” to “CustApp”. The second line changes ``_sourceName`` from “d.00870f28-53f9-4680-b2ab-2287ec9d8637” to “VendorApp”:

``if (_sourceName="d.98ee476d-d2d8-46bf-afc2-740f6f7e5b2a", "CustApp", _sourceName) as _sourceName``

``| if (_sourceName="d.00870f28-53f9-4680-b2ab-2287ec9d8637", "VendorApp", _sourceName) as _sourceName``

Click Add to save the rule.
These custom app **_sourceNames** will appear as values in the dashboard filter variable ``log_drain`` for the Heroku app dashboards.

## Installing the Heroku App

This section provides instructions for installing the Heroku App.

Now that you have set up collection for Heroku, you can install the Heroku App to use the preconfigured searches and Dashboards that provide insight into your data.

{@import ../../reuse/apps/app-install.md}

:::tip NOTE
While using the **Sumo Add-on**, the value **_sourceCategory=heroku** should be used while installing the app.
:::

## Viewing Heroku Dashboards

### Filters with Template Variables

Template variables provide dynamic dashboards that rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you can view dynamic changes to the data for a fast resolution to the root cause. For more information, see the Filter with template variables help [page](https://help.sumologic.com/docs/dashboards/filter-template-variables/).

### Heroku - Overview

This dashboard demonstrates use cases for heroku request timings, response latencies, dyno and error overviews. It also showscases their daily trends.

**Max/Average/50th PCT Connect Time Trend** : Shows the maximum,average and the 50th percentile average connection time trend for Heroku app requests.

**Failed Requests** : Shows the paths of all requests which don't return a 200 successfull response code.

**Top 10 Slowest Requests** : Shows the 10 slowest Heroku app requests based on average connection time.

**Max/Average/50th PCT Latency Trend** : Shows the maximum, average and the 50th percentile average service time latency trend for Heroku app responses.

**Max/Average/50th PCT Path Latency** : Shows the maximum, average and the 50th percentile average service time latency for Heroku app request paths.

**Max/Average/50th PCT Method Latency** : Shows the maximum, average and the 50th percentile average service time latency for Heroku app request methods.

**Dyno Memory(MB)** : Shows the average total memory used by each dyno.

**Status code count by dyno** : Shows the list and count of each status code returned by each dyno response.

**Dyno Load Average** : Shows the average load returned by each dyno.

**MBs Transferred by Dyno Over Time** : Shows the total load trend returned by each dyno.

**Total Errors by Host** : Shows the disctribution of errors returned either by heroku or application infrastructure.

**Total Errors by Component** : Shows the disctribution of errors returned by different heroku infrastructure components.

<img src={useBaseUrl('img/integrations/containers-orchestration/heroku-overview.png')} alt="Heroku dashboards" />

### Heroku - Dyno

This dashboard demonstrates use cases for successful, completed and crashed heroku dyno launches, providing information about their daily trends. Also, it has information on dyno stops, restarts and scaling operations.

**Successfull Dyno Launches** : Shows the count of dynos that have successfully started and are now running in a healthy state.

**Completed Dyno Launches** : Shows the count of dynos that have finished executing their designated tasks or commands and have now terminated.

**Process Exit Status by Code** : Shows the process exit status codes for various dyno operations

Other panels are self explanatory.

<img src={useBaseUrl('img/integrations/containers-orchestration/heroku-dyno.png')} alt="Heroku dashboards" />

### Heroku - Application

This dashboard demonstrates use cases for heroku app builds, providing information about their success and failure trends. Also, it has information on app deployments and releases.

Panels here are self explanatory

<img src={useBaseUrl('img/integrations/containers-orchestration/heroku-application.png')} alt="Heroku dashboards" />

### Heroku - Memory Metrics

This dashboard demonstrates use cases for the metrics which are reported for memory consumption and swap.

The following fields are reported for memory consumption and swap:

**Resident Memory (memory_rss)** : The portion of the dyno’s memory (megabytes) held in RAM.

**Disk Cache Memory (memory_cache)** : The portion of the dyno’s memory (megabytes) used as disk cache.

**Swap Memory (memory_swap)** : The portion of a dyno’s memory, in megabytes, stored on disk. It’s normal for an app to use a few megabytes of swap per dyno. Higher levels of swap usage though may indicate too much memory usage when compared to the dyno size. This can lead to slow response times and should be avoided.

**Total Memory (memory_total)** : The total memory (megabytes) being used by the dyno, equal to the sum of resident, cache, and swap memory.

**Memory Quota (memory_quota)** : The resident memory (memory_rss) value (megabytes) at which an R14 is triggered.

**Pages Written to Disk (memory_pgpgout)** : The cumulative total of the pages written to disk. Sudden high variations on this number can indicate short duration spikes in swap usage. The other memory related metrics are point in time snapshots and can miss short spikes.

**Pages Read from Disk (memory_pgpgin)**: The cumulative total of the pages read from disk. As with the previous metric, watch out for sudden variations.

<img src={useBaseUrl('img/integrations/containers-orchestration/heroku-memory-metrics.png')} alt="Heroku dashboards" />

### Heroku - CPU Load Metrics

This dashboard demonstrates use cases for the metrics which are reported for CPU load average.

The following fields are reported for CPU load average:

**Load Average 1m (load_avg_1m)**: The load average for the dyno in the last 1 minute. This reflects the number of CPU tasks that are in the ready queue (i.e. waiting to be processed).

**Load Average 5m (load_avg_5m)**: The load average for the dyno in the last 5 minutes. Computed in the same manner as 1m load average.

**Load Average 15m (load_avg_15m)**: The load average for the dyno in the last 15 minutes. Computed in the same manner as 1m load average.

<img src={useBaseUrl('img/integrations/containers-orchestration/heroku-cpu-load-metrics.png')} alt="Heroku dashboards" />

### Heroku - Infrastructure Errors

This dashboard demonstrates use cases for heroku infrastructure errors, providing information about different types of errors and other observations. It also shows the trends of these heroku infrastructure errors.

The panels of this dashboard try to cover a few error cases from the list of errors present [here](https://devcenter.heroku.com/articles/error-codes).

<img src={useBaseUrl('img/integrations/containers-orchestration/heroku-infrastructure-errors.png')} alt="Heroku dashboards" />

### Heroku - Application Errors

This dashboard demonstrates use cases for heroku app errors, providing information about different types of erros and other observations. It also the trends of these heroku app errors.

**App Worker Initialization Errors** : Shows the count of heroku application errors resulting due to failed app worker boot up.

**App Signal Termination Errors** : Shows the count of heroku application errors resulting due to app signal termination requests. When a process receives a "SIGTERM" signal, it means that an external entity or another process is requesting the process to terminate gracefully.

The other panels are self explanatory.

<img src={useBaseUrl('img/integrations/containers-orchestration/heroku-application-errors.png')} alt="Heroku dashboards" />