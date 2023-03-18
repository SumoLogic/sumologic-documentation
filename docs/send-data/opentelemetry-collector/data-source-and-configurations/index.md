---
slug: /send-data/opentelemetry-collector/data-source-and-configurations
title: Data Source and Configurations
description: Learn about Sources in Sumo Logic Otel Collectors
---

The data receiver sources are the types of data sources that can be used with the Sumo Logic OpenTelemetry collector to collect telemetry data. These sources include protocol and log receivers, and can be configured using the building blocks of the Otel configuration.

### Receivers

Receivers are the components that listen for data coming in from different sources. Receivers can be configured to accept data from a wide range of sources, including log files, network sockets, and cloud platforms like Amazon Web Services (AWS) and Microsoft Azure.

Sumo Logic Otel collectors support a variety of receivers, including:
* `OTLP` receiver listens for data coming in using the OpenTelemetry Protocol (OTLP).
* `Jaeger` receiver listens for data coming in using the Jaeger tracing protocol.
* `Zipkin` receiver listens for data coming in using the Zipkin tracing protocol.
* `Prometheus` receiver listens for data coming in from Prometheus metrics endpoints.
* `Syslog` receiver listens for data coming in over the syslog protocol.
* `Fluentd` receiver listens for data coming in using the Fluentd logging protocol.

### Sources

Sources are components that generate data that is then collected by receivers. A source can be thought of as the originating point for data that is being ingested into the Sumo Logic Otel collector. Sources are responsible for collecting and formatting data, and then passing it along to the appropriate receiver.

Some of the sources supported by Sumo Logic OoenTelemetry Collectors include:
* Log file source: This source reads log data from local files or network file systems.
* TCP source: This source listens for data coming in over a TCP socket.
* UDP source: This source listens for data coming in over a UDP socket.
* Kubernetes source: This source collects data from Kubernetes API servers, pods, and services.
* Amazon CloudWatch Logs source: This source collects log data from Amazon CloudWatch Logs.

Overall, receivers and sources are key components in the Sumo Logic Otel collector that work together to ingest and process data from various sources and protocols.

## OpenTelemetry Configuration

OpenTelemetry (Otel) configuration is the process of setting up and configuring the Otel collector to collect telemetry data (e.g., logs, metrics, traces) from different sources and export it to different destinations. The Otel collector provides a number of pre-built configurations that can be used as a starting point, and these configurations can be customized based on the specific needs of your environment.

### Components

The OpenTelemetry configuration is composed of the following building blocks.

* **Receivers**. Receivers are the components that listen for data coming in from different sources. Receivers can be configured to accept data from a wide range of sources, including log files, network sockets, and cloud platforms like Amazon Web Services (AWS) and Microsoft Azure.

* **Processors**. Processors are the components that transform and enrich data before it is sent to the next component in the pipeline. Processors can be used to add or remove attributes, filter data, or perform other actions on data.

* **Exporters**. Exporters are the components that send telemetry data to different destinations, such as Sumo Logic, Prometheus, or Amazon Simple Storage Service (S3).

* **Extensions**. Extensions are the components that provide additional functionality to the Otel collector, such as adding support for new protocols or integrating with other systems.

Otel configuration can be done using a configuration file or through environment variables. The configuration file is a YAML or JSON file that defines the configuration of the Otel collector, including the receivers, processors, exporters, and extensions. The environment variables can be used to set specific configuration options at runtime.

## Sumo Logic Otel Configuration structure (TODO)

 `sumologic.yaml`, `conf.d` directory. How does all of this work?


import useBaseUrl from '@docusaurus/useBaseUrl';

 In this section, we'll introduce the following concepts:

 <div class="box-wrapper" markdown="1">
  <div class="box smallbox1 card">
    <div class="container">
    <a href="/docs/send-data/opentelemetry-collector/data-source-and-configurations/collect-logs"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40" /><h4>Collect Logs</h4></a>
      <p>Instructions for collecting logs with the OpenTelemetry collector.</p>
    </div>
  </div>
  <div class="box smallbox2 card">
    <div class="container">
    <a href="/docs/send-data/opentelemetry-collector/data-source-and-configurations/collect-metrics"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40" /><h4>Collect Metrics</h4></a>
      <p>Instructions for collecting metrics with the OpenTelemetry collector.</p>
    </div>
  </div>
  <div class="box smallbox3 card">
    <div class="container">
    <a href="/docs/send-data/opentelemetry-collector/data-source-and-configurations/collect-tracing"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40" /><h4>Collect Tracing</h4></a>
      <p>Instructions for collecting tracing data with the OpenTelemetry collector.</p>
    </div>
  </div>
  <div class="box smallbox4 card">
    <div class="container">
    <a href="/docs/send-data/opentelemetry-collector/data-source-and-configurations/additional-configurations-reference"><img src={useBaseUrl('img/icons/operations/data-collection.png')} alt="icon" width="40" /><h4>Additional Configurations Reference</h4></a>
      <p>Reference for additional configurations you can use with the OpenTelemetry collector.</p>
    </div>
  </div>
</div>
