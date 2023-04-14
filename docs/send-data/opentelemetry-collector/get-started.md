---
id: get-started
title: Get Started with the Sumo Logic OpenTelemetry Collector
sidebar_label: Getting Started
description: Get up and running quickly with the Sumo Logic OpenTelemetry Collector.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic makes it easy to get started with OpenTelemetry by providing a custom distribution of the OpenTelemetry collector, which can be used to send metrics, logs, and traces directly to our platform.

This doc is a step-by-step guide to installing and running the OpenTelemetry collector and getting your hands on the resulting metric data in Sumo Logic.

## What you'll learn

We'll install the Sumo Logic OpenTelemetry collector, create, and configure an installation token for it, configure a receiver to collect memory data, and send that via the Sumo Logic exporter directly to the Sumo Logic Ingest API.

Then we'll get our hands on the data in the Sumo Logic UI. With our streamlined onboarding workflow, you do most of this work in the browser.

We'll show a simple example of running a single collector, on a single machine, collecting a single metric. But of course, in the real world, you'll be dealing with hundreds or thousands of machines, each with as many metrics, and you'll be collecting much more nuanced information than simple system memory load.

## Terminology

Let’s talk about the technologies we’ll use today: OpenTelemetry and Sumo Logic.

[OpenTelemetry](https://opentelemetry.io/) is a state-of-the-art open standard for collecting all kinds of observability data. Using a single common standard, it can flexibly collect logs, metrics, and tracing data. It is open source and freely available to download and hack on. It comes out of the box with support for the most popular integrations and makes it very easy to implement new ones if your use case isn’t already covered (it probably is!).

[Sumo Logic](https://www.sumologic.com/) is an ingest and storage platform. Its intuitive web-based interface makes it easy to visualize, query, and analyze all kinds of observability data. It’s highly customizable and flexible, allowing you to build detailed dashboards, and alerts and integrate external workflows. It’s a proven platform known for its excellent handling of log-based data and with OpenTelemetry, metrics, and tracing.

We will use these two together by running an OpenTelemetry [collector](https://opentelemetry.io/docs/collector/) directly on the machine we wish to monitor, which will send data via the Sumo Logic [API](/docs/api/), which is compatible with the [OpenTelemetry Protocol (OTLP)](https://opentelemetry.io/docs/reference/specification/protocol/). To learn more, see [Sumo Logic OpenTelemetry vs. OpenTelemetry Upstream Relationship](/docs/send-data/opentelemetry-collector/sumo-logic-opentelemetry-vs-opentelemetry-upstream-relationship).

Some other important terms that you will see during this process:

* [Collector](https://opentelemetry.io/docs/collector/). An executable program that collects and sends observability data. It typically runs directly on the node that is being monitored (this is the OTel agent).
* [Receiver](https://opentelemetry.io/docs/collector/configuration/#receivers). A component within the collector that understands how to receive data from a particular source. This will have custom code for understanding various types of services to derive metrics from them (e.g., from Nginx or PostgreSQL).
* [Exporter](https://opentelemetry.io/docs/collector/configuration/#exporters). A component within the collector that sends data to another destination (e.g., Sumo Logic).
* [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector#readme). A custom build of the OpenTelemetry collector that is optimized for interacting with Sumo Logic’s API. It supports everything the standard collector does but has some additional extensions for Sumo Logic.
* [Installation Token](/docs/manage/security/installation-tokens/). A security token that allows a collector to send data through the API to your Sumo Logic account. This is secure enough that you can comfortably deploy it as an environment variable or as part of a script.

## Installation

In this section, you'll install Sumo Logic’s OpenTelemetry collector on the machine, add a configuration file to describe the metric you want to collect, then start the collector running. The data will appear in the Sumo Logic UI instantly. As a use case, we'll collect memory usage information from a host and send that to Sumo Logic for storage and analysis.

### Step 1: Log in to Sumo

If you don’t already have an account on Sumo Logic, [create a free trial account](/docs/get-started/sign-up/#sign-up-through-sumo-logic). Otherwise, [log in](https://service.sumologic.com/ui/) as you normally would.

### Step 2: Get an Installation Token

The installation token lets the collector talk to Sumo Logic API and tells it what account to send the data to. To create that, go to the Administration section of your account, and generate a new token. Follow the [Installation Tokens](/docs/manage/security/installation-tokens/) documentation for detailed steps. After you’ve created it, don’t forget to copy the token.

### Step 3: Install the collector on the target machine

We've created a one-step installation script to make it easier to install the collector. We’ll install this on a Mac in this example, but the same basic steps work for Linux environments.

1. First, set up an environment variable to hold the installation token you just created. Open up a shell and run the following command:
   ```bash
   export SUMOLOGIC_INSTALL_TOKEN=<TOKEN>
   ```
1. Next, run the install script. You’ll need to use `sudo` here, so ensure you run this from an account with admin privileges.
   ```bash
   curl -s https://raw.githubusercontent.com/SumoLogic/sumologic-otel-collector/main/scripts/install.sh | sudo -E bash -s -- --installation-token "${SUMOLOGIC_INSTALL_TOKEN}"
   ```
1. After running the install script, you should see the following files installed:
   - `/usr/local/bin/otelcol-sumo`. The collector executable. This should be on your `PATH`.
   - `/etc/otelcol-sumo/sumologic.yaml`. An auto-generated config file for the collector. It’s best to leave this one as-is, as it sets up some important defaults.
   - `/etc/otelcol-sumo/conf.d/`. A directory that holds collector configuration files. A best practice is to use multiple single-purpose configuration files, which will all be loaded from this directory.
   - `/etc/otelcol-sumo/conf.d/common.yaml`. A collector configuration file that contains the installation token

### Step 4: Configure the metrics you want to collect

In this example, we’ll set up the collector to read memory usage stats from the machine and send those as metrics to Sumo Logic.

To do this, create a new file within the `/etc/otelcol-sumo/conf.d/` directory called `hostmetrics.yaml`. The contents should look like this:
  ```yaml
  receivers:
    hostmetrics:
      collection_interval: 5s
      scrapers:
        memory:

    exporters:
      logging:
        loglevel: debug

    service:
      pipelines:
        metrics:
          receivers:
            - hostmetrics
          exporters:
            - sumologic
            - logging
  ```

<details><summary>What are <code>receivers</code>, <code>exporters</code>, and <code>services</code>?</summary>
* The `receivers` section describes the sources from which we will collect observability data. In this case, we’re going to be using the `hostmetrics` receiver, which can collect CPU, disk, and memory information from the host machine that the collector is running on. In that stanza, we specify that we want the collector to scrape information once every 5 seconds, and that we want to run the `memory` scraper. To learn more about `hostmetrics` receiver, check out the docs.
* The `exporters` section describes the places we will send that data. The default configuration file already sets up an exporter called `sumologic`, so we don’t need to specify that again. Instead, we’ll set up an additional simple console debug logger to see when the collector processes data.
* The `services` section describes how the collector will process the information between when  it scrapes the raw metrics and when it exports it. To do this, it will set up a pipeline for the information that can process metrics, logs, or traces differently. Here we specify that we want a metrics pipeline that takes the data from the `hostmetrics` receiver and sends it to both Sumo Logic and to our local console logger.
</details>

Save this yaml file. Now, the collector is ready to start running.

### Step 5: Run the collector

To start the collector, run the following command:
```bash
sudo otelcol-sumo --config=/etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
```

This command launches the collector with the default configuration, and any config files under the `/etc/otelcol-sumo/conf.d/` directory.

Note that you could also run this via `systemd` or whatever your preferred system is for managing long-running services. In fact, by default, the install script includes files for integrating the collector with `systemd`. You can launch it with `systemctl restart otelcol-sumo`.

### Step 6: Verify the collector is running

At this point, the collector should be running and sending memory stats data into Sumo Logic every 5 seconds. To verify, confirm that your local console log output displayed some lines like:<br/>
`[...] Heartbeat loop initialized. Starting to send heartbeat requests […]
[...] Everything is ready. Begin running and processing data. [...]`

Then after that, every 5 seconds you should see a line like:<br/>
`[...] MetricsExporter {"kind": "exporter", "data_type": "metrics", "name": "logging", "#metrics": 1} [...]`

If you see that kind of output, the collector has successfully set up a connection to Sumo Logic and is sending memory stats metrics as expected. Great! Now let’s go find those in Sumo.

### Step 7: Access the metrics data in Sumo Logic

Back in the Sumo Logic UI:

1. Navigate to **Manage Data** > **Collection** > **Collection** tab. You should see a list of running collectors there. One of those will be the collector we ran in the previous step. It should have a green **Healthy** status and its Type should be **OT Distro**.
1. To see the metrics data, hover over the line, and two small icons will appear next to the collector's name. Click the icon to the right, **Open in Metrics**, which looks like a small graph.

This will open a new tab that shows you the metrics coming from this collector. You should see a graph with three lines, one for each state of the `system.memory.usage` metric: `free`, `used`, and `inactive`.

That means the data has made it into Sumo Logic and it’s ready for analysis. Nice work!


## Performance Benchmarks

### Logs collection

The following benchmark has been compiled on an Amazon `m4.large`
instance, which has 2 CPU cores and 8 GB of memory available.

It can be used when estimating the required CPU resources for logs collection
using [`filelogreceiver`](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).


### CPU usage guidelines

#### Benchmark - CPU usage for particular average message size and EPS

Measured CPU usage for particular Events Per Second (EPS) average message size.

|          | 100B  | 512B  |  1KB   |  5KB   |  10KB  |
|:---------|:------|:------|:-------|:-------|:-------|
| **EPS**  |   -   |   -   |   -    |   -    |   -    |
| **100**  | 1.14% |  1%   | 1.01%  |  1.4%  | 3.78%  |
| **200**  | 1.29% | 1.4%  | 1.41%  | 2.57%  | 5.36%  |
| **500**  | 2.75% | 2.71% | 2.95%  |  5.7%  | 10.68% |
| **1000** | 4.74% | 5.07% | 5.32%  | 11.3%  | 20.12% |
| **1500** | 7.08% | 7.29% | 7.99%  | 16.93% | 27.96% |
| **2000** | 9.64% | 9.56% | 10.39% | 22.51% | 36.59% |

#### Benchmark - EPS for average message size and CPU usage

Events Per Second (EPS) achieved for a particular average message size and CPU usage.

|                       | 100B  | 512B  | 1KB  | 5KB  | 10KB |
|:----------------------|:------|:------|:-----|:-----|:-----|
| **Average CPU usage** |   -   |   -   |  -   |  -   |  -   |
|        **5%**         | 2000  | 1100  | 1000 | 150  | 200  |
|        **10%**        | 3500  | 2100  | 1500 | 450  | 300  |
|        **20%**        | 6500  | 4100  | 3000 | 1200 | 700  |
|        **50%**        | 14000 | 10100 | 8500 |  -<sup>*</sup>  |  -<sup>*</sup>  |
|        **90%**        |  -<sup>*</sup>   | 19100 |  -<sup>*</sup>  |  -<sup>*</sup>  |  -<sup>*</sup>  |

<sup>*</sup> Cells without a resulting EPS come from the fact that the CPU utilization didn't reach the designated CPU utilization during the benchmark run.<br/><br/>

Using the information from the above table, if you had an average CPU usage of 5%:
* 10 KB logs can be ingested at 200 logs/sec (2000 KB/sec).
* 1 KB logs can be ingested at 1000 logs/sec (1000 KB/sec).

This shows that the collector performs better when it is made to ingest bigger log entries (which is expected due to less overhead coming from timestamp parsing, etc.).

### Memory usage guidelines

#### Benchmark - memory usage for particular average message size and EPS

Measured memory usage (in MB) for particular Events Per Second (EPS) average message size.

|          |  100B  |  512B  |  1KB   |  5KB   |  10KB  |
|:---------|:-------|:-------|:-------|:-------|:-------|
| **EPS**  |   -    |   -    |   -    |   -    |   -    |
| **100**  | 113.14 | 116.16 | 117.1  | 116.99 | 112.59 |
| **200**  | 115.16 | 118.55 | 116.8  | 119.67 | 127.02 |
| **500**  | 118.24 | 121.79 | 122.78 | 127.87 | 142.73 |
| **1000** | 121.6  | 126.75 | 127.94 | 140.11 | 106.82 |
| **1500** | 128.54 | 131.9  | 137.69 | 95.21  | 113.89 |
| **2000** | 130.62 | 125.27 | 144.59 | 98.62  | 134.61 |


## Fine Tuning Performance

There are a couple configuration options that can help with performance in specific scenarios.

### Sumo Logic Exporter

The [Sumo Logic Exporter](https://github.com/SumoLogic/sumologic-otel-collector/tree/main/pkg/exporter/sumologicexporter)
sends data to Sumo Logic. It has the following features that can help with performance:

- `retry_on_failure` with its `initial_interval`, `max_interval` and `max_elapsed_time` settings
- `sending_queue` with its `num_consumers`, `queue_size` settings
- `timeout`

Read more about these features in the [Sumo Logic Exporter docs](https://github.com/SumoLogic/sumologic-otel-collector/tree/main/pkg/exporter/sumologicexporter/README.md).

### Batch Processor

The [Batch Processor](https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/batchprocessor) joins records of each type in batches. It has the following features that can help with performance:

- `send_batch_size`
- `send_batch_max_size`
- `timeout`

Read more about these features in the [Batch Processor docs](https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md).

### Memory Limiter Processor

The [Memory Limiter Processor](https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/memorylimiterprocessor) prevents out-of-memory crashes for the collector process
by monitoring the amount of memory used by the collector and forcing it to lower its memory consumption.

Read more about its features in the [Memory Limiter Processor docs](https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/memorylimiterprocessor/README.md).


## Additional Resources

* [Sumo Logic Distribution for OpenTelemetry GitHub Repo](https://github.com/SumoLogic/sumologic-otel-collector#readme), our custom distro of the collector
* [OpenTelemetry Contrib Repo](https://github.com/open-telemetry/opentelemetry-collector-contrib#readme), where most of the receivers and exporters are implemented
* [OpenTelemetry Docs](https://opentelemetry.io/docs/), where you can learn more about how OpenTelemetry works
