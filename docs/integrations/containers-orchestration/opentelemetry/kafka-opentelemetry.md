---
id: kafka-opentelemetry
title: Kafka - OpenTelemetry Collector
sidebar_label: Kafka - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry App for Kafka.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/containers-orchestration/kafka.png')} alt="icon" width="150"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

The Sumo Logic App for Kafka is a unified logs and metrics app. The app helps you monitor the brokers, partition replicas and consumer groups components of Kafka messaging/streaming clusters. Pre-configured dashboards provide insights into the broker operations, topics, replication and error logs.

We use the OpenTelemetry collector for Kafka metric collection and for collecting Kafka logs.

The diagram below illustrates the components of the Kafka collection for each kafka broker node. OpenTelemetry collector runs on the same host as Kafka, and uses the [Kafka Receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/kafkametricsreceiver) to obtain Kafka metrics, and the [Sumo Logic OpenTelemetry Exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/sumologicexporter) to send the metrics to Sumo Logic. Kafka logs are sent to Sumo Logic through a [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Kafka-OpenTelemetry/Kafka-Schematics.png')} alt="Schematics" />

**This App has been tested with following Kafka versions:2.6.0, 2.7.0 and 3.1.2**

## Log Types and Metrics

The Sumo Logic App for Kafka assumes:

-   Kafka app supports the default logs format.
-   For a list of metrics that are collected and used by the app, see [Kafka Metrics](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/kafkametricsreceiver/documentation.md).

### Sample Log Messages

```
[2021-03-10 20:12:28,742] INFO [KafkaServer id=0]
started (kafka.server.KafkaServer)
```

### Sample Log Query

This sample Query is from the Events by Severity panel of the Kafka - Logs dashboard.

```sql
sumo.datasource=kafka messaging.cluster.name={{messaging.cluster.name}}
| json auto maxdepth 1 nodrop
| if (isEmpty(log), _raw, log) as kafka_log_message
| parse field=kafka_log_message "[*] * *" as date_time,severity,msg
| where severity in ("DEBUG", "INFO", "ERROR", "TRACE", "FATAL")
| count by severity
```

### Sample Metric 

```
"Query","metric","deployment.environment","host.name","messaging.cluster.name","messaging.node.name","messaging.system","os.type","sumo.datasource","topic","unit","latest"
```
```
"A","kafka.topic.partitions","prod","ip-10-0-18-47","kafkaotdemo","ip-10-0-18-47","kafka","linux","kafka","otlp_spans","{partitions}","1"
```

### Sample Metric query

Sample query from **Partition by Topics** panel in Kafka - Metrics

```
sumo.datasource=kafka  metric=kafka.topic.partitions messaging.cluster.name={{messaging.cluster.name}} | sum by messaging.cluster.name,topic
```

## Fields Creation in Sumo Logic for Kafka

Following are the [Fields](https://help.sumologic.com/docs/manage/fields/) which will be created as part of KafkaApp install if not already present.

messaging.cluster.name - User configured.Enter a name to uniquely identify your kafka cluster. This cluster name will be shown in the Sumo Logic dashboards.

**messaging.node.name** - Has value of host name.
**messaging.system** - Has fixed value of kafka
**sumo.datasource** - Has fixed value of kafka

## Prerequisites

1.  Configure logging in Kafka: By default Kafka logs (`server.log` and `controller.log`) are stored in the directory: `/opt/Kafka/kafka_<VERSION>/logs`. Make a note of the above logs `directory.\`

## Collecting Logs, Metrics & Installing App for Kafka

The process to set up collection for Kafka data is done through the following steps.

### Step1: Set up OpenTelemetry Collector

If you want to use an existing OpenTelemetry Collector then this step can be skipped by selecting the option of using an existing Collector.

If you want to create a new Collector please select **Add a new Collector** option.

Select the platform for which you want to install the Sumo OpenTelemetry Collector.

This will generate a command which can be executed in the machine which needs to get monitored. Once executed it will install the Sumo Logic OpenTelemetry Collector agent.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Kafka-OpenTelemetry/Kafka-Collector.png')} alt="Collector" />

### Step 2: Configure integration

In this step we will be configuring the yaml required for Kafka Collection.

Below are the input required :

-   **Endpoint - (default: `localhost:9092`)**: The URL of the broker endpoint
-   **Server File log Path** - Enter the path to the Server log file for your kafka instance.
-   **Controller file log path** - Enter the path to the Controller log file for your kafka instance.
-   **Fields** : `messaging.cluster.name` - User configured. Enter a name to identify this Kafka cluster. This cluster name will be shown in the Sumo Logic dashboards.

Click on the **Download YAML File** button to get the yaml file.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Kafka-OpenTelemetry/Kafka-YAML.png')} alt="YAML" />

### Step 3: Sending logs and metric to Sumo

Once you download the yaml file, please follow the below steps based on your platform.

<Tabs
  className="unique-tabs"
  defaultValue="Linux"
  values={[
    {label: 'Linux', value: 'Linux'},
    {label: 'Windows', value: 'Windows'},
    {label: 'macOS', value: 'macOS'},
  ]}>

<TabItem value="Linux">

1.  Copy the yaml to `/etc/otelcol-sumo/conf.d/` folder for the Kafka instance which needs to be monitored.
2.  Restart the collector using:
  ```sh
  sudo systemctl restart otelcol-sumo
  ```

</TabItem>
<TabItem value="Windows">

1.  Copy the yaml to `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` folder in the machine which needs to be monitored.
2.  Restart the collector using 
  ```sh
  Restart-Service -Name OtelcolSumo
  ```

</TabItem>
<TabItem value="macOS">

1.  Copy the yaml to the `/etc/otelcol-sumo/conf.d/` folder in the Kafka instance which needs to be monitored.
2.  Restart the otelcol-sumo process using the below command:
  ```sh
  otelcol-sumo --config /etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
  ```

</TabItem>
</Tabs>

After successful execution of the above command, Sumo will start receiving the data from your host machine.

This will install the app to your Sumo Logic Org. The app consists of Dashboard and monitors

Panels will start to fill automatically. It's important to note that each panel fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but within 20 minutes, you'll see full graphs and maps.

## Viewing Kafka Dashboards

Filters with Template Variables

Template variables provide dynamic dashboards that rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you can view dynamic changes to the data for a fast resolution to the root cause. For more information, see [Filter with template variables](/docs/dashboards-new/filter-template-variables/).

### Kafka - Overview

The Kafka - Overview dashboard gives you an at-a-glance view of your Kafka deployment across brokers, topics, partitions and consumer groups.

Use this dashboard to:

-   Analyze trends across Partition Count and Unsync Partition Replica count metrics. 
-   Determine the number of brokers, partitions and topics across each cluster and ensure they match with expectations

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Kafka-OpenTelemetry/Kafka-Overview.png')} alt="Overview" />

### Kafka - Logs

This dashboard helps you quickly analyze your Kafka error logs across all clusters.

Use this dashboard to:

-   Identify critical events in your Kafka broker and controller logs;
-   Examine trends to detect spikes in Error or Fatal events
-   Monitor Broker added/started and shutdown events in your cluster.
-   Quickly determine patterns across all logs in a given Kafka cluster.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Kafka-OpenTelemetry/Kafka-Logs.png')} alt="Logs" />

### Kafka - Metrics

This dashboard helps you to monitor unsynchronized partition replicas and consumer groups.

Use this dashboard to:

-   Monitor consumer Group Lag by Topic
-   Identify unsynchronized partition replicas

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Kafka-OpenTelemetry/Kafka-Metrics.png')} alt="Metrics" />
