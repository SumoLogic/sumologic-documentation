---
slug: /send-data/opentelemetry-collector/data-source-configurations
title: Data Source and Configurations
description: Learn about Sumo Logic OTel Collector Sources.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Data Sources
Data sources or Source in Sumo refers to a specific application/infrastructure component from which the collector can collect telemetry (Logs, Metrics, and Traces). The sources include all configuration including protocol, receivers, processors, and exporters required to collect telemetry data from a given source. MySQL, Nginx, Kafka, Cassandra, and JMX are all examples of sources from where Sumo Logic collector can collect and send data. 


### Configuration 
To collect data from a source the OpenTelemetry collector requires **source configuration**, that instructs the collector how to collect the data. [Learn More](https://opentelemetry.io/docs/collector/configuration/) about OpenTelemetry Collector configuration. 


### How the OpenTelemetry Collector sends data to Sumo Logic
OpenTelemetry Collector starts sending data to the Sumo service as soon as it is available from the Sources configured on the Collector. Before sending the data, a Collector compresses (by a factor of 10x) and encrypts the data. A Collector sends data to the Sumo service over HTTPS using SumoLogic Exporter.

## Guides

In this section, we'll introduce the following concepts:

<div class="box-wrapper" markdown="1">
<div class="box smallbox1 card">
  <div class="container">
  <a href="/docs/send-data/opentelemetry-collector/data-source-configurations/collect-logs"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40" /><h4>Collect Logs</h4></a>
  <p>Instructions for collecting logs with the OpenTelemetry collector.</p>
  </div>
</div>
<div class="box smallbox2 card">
  <div class="container">
  <a href="/docs/send-data/opentelemetry-collector/data-source-configurations/collect-metrics"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40" /><h4>Collect Metrics</h4></a>
  <p>Instructions for collecting metrics with the OpenTelemetry collector.</p>
  </div>
</div>
<div class="box smallbox3 card">
  <div class="container">
  <a href="/docs/send-data/opentelemetry-collector/data-source-configurations/collect-traces"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40" /><h4>Collect Traces</h4></a>
  <p>Instructions for collecting tracing data with the OpenTelemetry collector.</p>
  </div>
</div>
<div class="box smallbox4 card">
  <div class="container">
  <a href="/docs/send-data/opentelemetry-collector/data-source-configurations/additional-configurations-reference"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40" /><h4>Additional Configurations</h4></a>
  <p>More OpenTelemetry collector configurations.</p>
  </div>
  </div>
</div>


## Receivers

Receivers are the components that listen for data coming in from different sources. Receivers can be configured to accept data from a wide range of sources, including log files, network sockets, and cloud platforms like Amazon Web Services (AWS) and Microsoft Azure.

Sumo Logic Otel collectors support a variety of receivers, including:

* `OTLP` receiver listens for data coming in using the OpenTelemetry Protocol (OTLP).
* `Jaeger` receiver listens for data coming in using the Jaeger tracing protocol.
* `Zipkin` receiver listens for data coming in using the Zipkin tracing protocol.
* `Prometheus` receiver listens for data coming in from Prometheus metrics endpoints.
* `Syslog` receiver listens for data coming in over the syslog protocol.
* `Fluentd` receiver listens for data coming in using the Fluentd logging protocol.

## Sources

Sources are components that generate data that is then collected by receivers. A source can be thought of as the originating point for data that is being ingested into the Sumo Logic Otel collector. Sources are responsible for collecting and formatting data, and then passing it along to the appropriate receiver.

Some of the sources supported by Sumo Logic OoenTelemetry Collectors include:

* Log file source: This source reads log data from local files or network file systems.
* TCP source: This source listens for data coming in over a TCP socket.
* UDP source: This source listens for data coming in over a UDP socket.
* Kubernetes source: This source collects data from Kubernetes API servers, pods, and services.
* Amazon CloudWatch Logs source: This source collects log data from Amazon CloudWatch Logs.

Overall, receivers and sources are key components in the Sumo Logic Otel collector that work together to ingest and process data from various sources and protocols.

## OpenTelemetry Configuration

All configuration files in this setup follow the schema for OpenTelemetry Collector configuration, which comprises a service consisting of pipelines with receivers, processors, and exporters:

* A **Receiver**, which can be push or pull based, is how data gets into the Collector. Receivers may support one or more data sources. For more information, refer to the [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/configuration/#receivers).
* A **Processor** is run on data between being received and being exported. Processors are optional though some are recommended. With processors, you can filter your data, add custom fields, modify content, and much more. For more information refer to the [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/configuration/#processors).
* An **Exporter** is how you transmit data to one or more backends/destinations, specifically Sumo Logic. It can be push or pull based. For more information, refer to the [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/configuration/#exporters).
* An **Extension** is available primarily for tasks that do not involve processing telemetry data. Examples of extensions include health monitoring, service discovery, and data forwarding. Sumo Logic has its own extension, which registers and manage your Sumo Logic collector. For more information, refer to the [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/configuration/#extensions).
* A **Pipeline** is configured through the service stanza. For more information, refer to the [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/configuration/#service) to become more familiar with this concept.

## Sumo Logic Distribution for OpenTelemetry Collector Configuration Structure

The configuration directory has three main components:

* The `sumologic.yaml` is provided by Sumo Logic and shouldn't be changed, as it can be overridden during installation or upgrades.
  * `common.yaml` file contains configuration settings that are common to all collectors.
  * `hostmetrics.yaml` file contains configuration settings that are specific to host metrics collectors.
* The `conf.d` directory is where customers can customize the behavior of the OpenTelemetry Collector. It contains configuration files that can be changed according to specific needs.
* The `env` directory contains environmental variable files that can be used to configure settings for the collector.
  * `token.env` file contains configuration settings related to authentication and authorization for the collector.

The following is the file structure used in our configuration directory:

```txt
.
├── conf.d
│   ├── common.yaml
│   └── hostmetrics.yaml
├── env
│   └── token.env
└── sumologic.yaml
```

When the collector is started, it loads the configuration in the following order:

* `sumologic.yaml`. This is the default configuration file provided by Sumo Logic. It contains the default settings for the collector.
* All configuration files from `conf.d`, sorted alphabetically. These files contain additional configuration settings that can be customized by customers. If there are any conflicts between the files, the last loaded configuration file will take precedence.

:::note
If a configuration is loaded later in the order, it will be merged with the previous configuration.
:::

For example, if two configuration files define the same key, the value from the later file will overwrite the value from the earlier file. If a list or map is defined in multiple configuration files, the lists or maps are merged, with values from the later configuration file taking precedence.

Consider the following example configuration files:

```yaml title="conf.d/0-base.yaml"
extensions:
  sumologic:
    collector_description: "My OpenTelemetry Collector"
    collector_fields:
      cluster: "cluster-1"
    some_list:
      - element 1
      - element 2
```

```yaml title="conf.d/1-override.yaml"
extensions:
  sumologic:
    collector_fields:
      zone: "eu"
    some_list:
      - element 3
      - element 4
```

The effective configuration will look like the following:

```yaml
extensions:
  sumologic:
    collector_description: "My OpenTelemetry Collector"
    collector_fields:
      cluster: "cluster-1"
      zone: "eu"
    some_list:
      - element 3
      - element 4
```

Note that the list has been overridden and maps have been merged.
