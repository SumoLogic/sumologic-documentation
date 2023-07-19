---
id: rabbitmq-opentelemetry
title: RabbitMQ - OpenTelemetry Collector
sidebar_label: RabbitMQ - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry App for RabbitMQ.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/containers-orchestration/rabbitmq.png')} alt="icon" width="45"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

The [RabbitMQ](https://www.rabbitmq.com/getstarted.html) app is a unified log app. Preconfigured dashboards provide insight into error logs. RabbitMQ logs are sent to Sumo Logic through OpenTelemetry [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/RabbitMq-OpenTelemetry/RabbitMQ-Schematics.png' alt="Schematics" />

## Fields creation in Sumo Logic for RabbitMQ

Following are the [Fields](/docs/manage/fields/) which will be created as part of RabbitMQ App install if not already present.

* `messaging.cluster.name`. User configured. Specify the user-friendly cluster name which RabbitMQ belongs to.
* `sumo.datasource`. Has fixed value of **rabbitmq**.

## Prerequisites

This section provides instructions for configuring log collection for RabbitMQ running on a non-Kubernetes environment for the Sumo Logic App for RabbitMQ. By default, RabbitMQ logs are stored in a log file.

Follow the instructions to set up log collection:

1. **Configure logging in RabbitMQ**. RabbitMQ supports logging via the following methods: local text log files, syslog and stdout. RabbitMQ logs have six levels of verbosity: debug, info, warning, error, critical, none. For details please visit this [page](https://www.rabbitmq.com/logging.html#log-levels). For the dashboards to work properly, log level needs to be set to **debug**. Default log level is **info**. All logging settings are located in [RabbitMQ.conf](https://www.rabbitmq.com/logging.html).
2. **Configure RabbitMQ to write log lines to a local file**. By default, RabbitMQ logs are stored in `/var/log/rabbitmq/rabbit@<hostname>.log`. The default directory for log files is listed in the `RabbitMQ.conf` file. To configure the log output destination to a log file, use one of the following settings, either in the [configuration file](https://www.rabbitmq.com/logging.html). Edit or create `/etc/rabbitmq/rabbitmq.conf` file config:
  ```
  log.dir = /var/log/rabbitmq
  log.file = rabbitmq.log
  log.file.level = debug
  ```

Once the logs are configured to be written to a local file, follow the below steps to configure collection in Sumo.

## Collection configuration and App installation

As part of data collection setup and app installation, you can select the **RabbitMQ - OpenTelemetry** app from the **App Catalog** and click on **Install App**. Follow the steps below to configure the collection.

### Step 1: Set up Collector

{@import ../../../reuse/apps/opentelemetry/set-up-collector.md}

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/RabbitMq-OpenTelemetry/RabbitMQ-Collector.png' alt="Collector" />

### Step 2: Configure integration

In this step, we will be configuring the yaml file required for RabbitMQ Collection. Path of the log file configured to capture RabbitMQ logs is needed to be given here.

The files are typically located in `/var/log/rabbitmq/rabbit@<hostname>.log`. You can add any custom fields which you want to tag along with the data ingested in sumo. Click on the **Download YAML File** button to get the yaml file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/RabbitMq-OpenTelemetry/RabbitMQ-YAML.png' alt="YAML" />

### Step 3: Send logs to Sumo

{@import ../../../reuse/apps/opentelemetry/send-logs-intro.md}

<Tabs
  className="unique-tabs"
  defaultValue="Linux"
  values={[
    {label: 'Linux', value: 'Linux'},
    {label: 'Windows', value: 'Windows'},
    {label: 'macOS', value: 'macOS'},
  ]}>

<TabItem value="Linux">

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the RabbitMQ instance which needs to be monitored.
2. Restart the collector using:
  ```sh
  sudo systemctl restart otelcol-sumo
  ```

</TabItem>
<TabItem value="Windows">

1. Copy the yaml file to `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` folder in the machine which needs to be monitored.
2. Restart the collector using:
  ```sh
  Restart-Service -Name OtelcolSumo
  ```

</TabItem>
<TabItem value="macOS">

1. Copy the yaml file to /etc/otelcol-sumo/conf.d/ folder in the RabbitMq instance which needs to be monitored.
2. Restart the otelcol-sumo process using the below command 
  ```sh
  otelcol-sumo --config /etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml" 
  ```

</TabItem>
</Tabs>

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}

## Sample Log Messages

Here's a sample log message you'd find in Non-Kubernetes environments.

```
2023-01-16 05:53:44.858 [info] <0.44.0> Application cowboy exited with reason: stopped
```

## Sample Queries

This sample Query is from the **RabbitMQ - Logs dashboard** > **Events** by Severity panel.

```sql title="Query String"
 %"sumo.datasource"="rabbitmq" %"messaging.cluster.name"=* host.name=*
| json "log" as _rawlog nodrop
| if(isEmpty(_rawlog),_raw,_rawlog) as _raw
| parse "* * [*]" as date,time,severity | count by severity
```

## Viewing RabbitMQ Dashboards

### Overview

The **RabbitMQ - Overview** dashboard gives you an at-a-glance view of Error messages, error by severity, top and last 10 errors, Broker and Event Start/Add log messages.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/RabbitMq-OpenTelemetry/RabbitMQ-Overview.png' alt="Overview" />
