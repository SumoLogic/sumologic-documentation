---
id: quickstart
title: OpenTelemetry Collector Quickstart
sidebar_label: Quickstart
description: Get up and running quickly with the Sumo Logic OpenTelemetry Collector.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic makes it easy to get started with OpenTelemetry by providing a custom distribution of the OpenTelemetry collector, which can be used to send metrics, logs, and traces directly to our platform.

This quickstart guide, which mirrors our Sumo Logic UI onboarding workflow, is a step-by-step guide to installing the OpenTelemetry collector and getting your hands on the resulting metrics data in Sumo Logic. You'll do most of this work in your browser.

## What you'll learn

* Create and configure an installation token
* Install the Sumo Logic OpenTelemetry collector
* Configure a receiver to collect memory data
* Send that via the Sumo Logic exporter directly to the Sumo Logic Ingest API

In this quickstart, you'll run our OpenTelemetry collector directly on the machine you want to monitor, which will send data via our [OTLP](https://opentelemetry.io/docs/reference/specification/protocol/)-compatible Sumo Logic [API](/docs/api/).

We'll show a simple example of running a single collector, on a single machine, collecting a single metric. But of course, in the real world, you'll be dealing with hundreds or thousands of machines, each with as many metrics, and you'll be collecting much more nuanced information than simple system memory load.

## Before you begin

* You'll need a Sumo Logic account. If you don't have one, [start a free trial](/docs/get-started/sign-up/#sign-up-through-sumo-logic).
* Review [What's the difference between OpenTelemetry and the Sumo Logic Distribution for OpenTelemetry?](/docs/send-data/opentelemetry-collector/troubleshooting/#whats-the-difference-between-opentelemetry-and-the-sumo-logic-distribution-for-opentelemetry)


## Installation

In this section, you'll install Sumo Logic’s OpenTelemetry collector on your machine, add a configuration file to describe the metric you want to collect, then start running the collector. The data will appear in the Sumo Logic UI instantly. As a use case, we'll collect memory usage information from a host and send that to Sumo Logic for storage and analysis.

### Step 1: Log in to Sumo

[Sign in](https://service.sumologic.com/ui/) to your Sumo Logic as you normally would.

### Step 2: Get an Installation Token

In this section, you'll create a new [installation token](/docs/manage/security/installation-tokens), which allows the collector to talk securely to Sumo Logic API and tells it what account to send the data to. This is secure enough that you can comfortably deploy it as an environment variable or as part of a script.

1. Go to **Administration** > **Security** > **Installation Tokens**.
1. Click the **+ Add Token** button above the table. A panel named **Create Installation Token** appears to the right of the table.
1. Input a unique name, then click **Save**.
1. After you’ve created your token, don’t forget to copy it.


### Step 3: Install the collector on the target machine

<details><summary>What's a collector?</summary>
A collector is an executable program that collects and sends observability data. It typically runs directly on the node that is being monitored (this is the OTel agent).
</details>

We've created a one-step installation script to make it easier to install the collector. In this example, you'll install this on a Mac. These same basic steps work for Linux environments as well.

1. First, set up an environment variable to hold the installation token you just created. Open up a shell and run the following command:
   ```bash
   export SUMOLOGIC_INSTALL_TOKEN=<TOKEN>
   ```
1. Next, run the install script. You’ll need to use `sudo` here, so ensure you run this from an account with admin privileges.
   ```bash
   curl -s https://github.com/SumoLogic/sumologic-otel-collector/releases/latest/download/install.sh | sudo -E bash -s -- --installation-token "${SUMOLOGIC_INSTALL_TOKEN}"
   ```
1. After running the install script, you should see the following files installed:
   - `/usr/local/bin/otelcol-sumo`. The collector executable. This should be on your `PATH`.
   - `/etc/otelcol-sumo/sumologic.yaml`. An auto-generated config file for the collector. It’s best to leave this one as-is, as it sets up some important defaults.
   - `/etc/otelcol-sumo/conf.d/`. A directory that holds collector configuration files. A best practice is to use multiple single-purpose configuration files, which will all be loaded from this directory.
   - `/etc/otelcol-sumo/conf.d/common.yaml`. A collector configuration file that contains the installation token.

### Step 4: Configure the metrics you want to collect

In this example, you'll set up the collector to read memory usage stats from the machine and send those as metrics to Sumo Logic.

To do this, create a new file within the `/etc/otelcol-sumo/conf.d/` directory called `hostmetrics.yaml`. The contents should look like this:

```yaml title="hostmetrics.yaml"
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

The [`receivers` section](https://opentelemetry.io/docs/collector/configuration/#receivers) describes the sources from which we will collect observability data. The receiver is a component within the collector that understands how to receive data from a particular source. This will have custom code for understanding various types of services to derive metrics from (like Nginx or PostgreSQL). In this case, we’re going to be using the `hostmetrics` receiver, which can collect CPU, disk, and memory information from the host machine that the collector is running on. In that stanza, we specify that we want the collector to scrape information once every 5 seconds, and that we want to run the `memory` scraper. To learn more about `hostmetrics` receiver, check out the docs.

The [`exporters` section](https://opentelemetry.io/docs/collector/configuration/#exporters) describes the places we will send that data. The exporter is a component within the collector that sends data to another destination (in this case, Sumo Logic). The default configuration file already sets up an exporter called `sumologic`, so we don’t need to specify that again. Instead, you'll set up an additional simple console debug logger to see when the collector processes data.

The [`service` section](https://opentelemetry.io/docs/collector/configuration/#service) describes how the collector will process the information between when it scrapes the raw metrics and when it exports it. To do this, it will set up a pipeline for the information that can process metrics, logs, or traces differently. Here we specify that we want a metrics pipeline that takes the data from the `hostmetrics` receiver and sends it to both Sumo Logic and to our local console logger.
</details>

Save this yaml file. Now, the collector is ready to start running.

### Step 5: Run the collector

To start the collector, run the following command:
```bash
sudo otelcol-sumo --config=/etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
```

This command launches the collector with the default configuration, and any config files under the `/etc/otelcol-sumo/conf.d/` directory.

Note that you could also run this via `systemd` or whatever your preferred system is for managing long-running services. In fact, by default, the install script includes files for integrating the collector with `systemd`. You can launch it with:
```bash
systemctl restart otelcol-sumo
```

### Step 6: Verify the collector is running

At this point, the collector should be running and sending memory stats data into Sumo Logic every 5 seconds. To verify, confirm that your local console log output displayed some lines like:

`[...] Heartbeat loop initialized. Starting to send heartbeat requests […]
[...] Everything is ready. Begin running and processing data. [...]`

Then after that, every 5 seconds you should see a line like:

`[...] MetricsExporter {"kind": "exporter", "data_type": "metrics", "name": "logging", "#metrics": 1} [...]`

If you see that kind of output, the collector has successfully set up a connection to Sumo Logic and is sending memory stats metrics as expected. Great! Now let’s go find those in Sumo.

### Step 7: Access the metrics data in Sumo Logic

Back in the Sumo Logic UI:

1. Navigate to **Manage Data** > **Collection** > **Collection** tab. You should see a list of running collectors there. One of those will be the collector we ran in the previous step. It should have a green **Healthy** status and its **Type** should be **OT Distro**.
1. To see the metrics data, hover over the line, and two small icons will appear next to the collector's name. Click the icon to the right, **Open in Metrics**, which looks like a small graph.

This will open a new tab that shows you the metrics coming from this collector. You should see a graph with three lines, one for each state of the `system.memory.usage` metric: `free`, `used`, and `inactive`.

That means the data has made it into Sumo Logic and it’s ready for analysis. Nice work!


## Additional Resources

* [Sumo Logic Distribution for OpenTelemetry GitHub repo](https://github.com/SumoLogic/sumologic-otel-collector#readme), our custom distro of the collector
* [Sumo Logic OpenTelemetry vs OpenTelemetry Upstream Relationship](/docs/send-data/opentelemetry-collector/sumo-logic-opentelemetry-vs-opentelemetry-upstream-relationship/)
* [OpenTelemetry Contrib repo](https://github.com/open-telemetry/opentelemetry-collector-contrib#readme), where most of the receivers and exporters are implemented
* [OpenTelemetry Docs](https://opentelemetry.io/docs/), where you can learn more about how OpenTelemetry works
