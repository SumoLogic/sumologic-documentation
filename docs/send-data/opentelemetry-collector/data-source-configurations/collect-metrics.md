---
id: collect-metrics
title: Collect Metrics
sidebar_label: Collect Metrics
description: Learn how to collect metrics using the Sumo Logic OpenTelemetry Collector.
---

The Sumo Logic Distribution for OpenTelemetry Collector provides various receivers for metrics collection. The full list of OpenTelemetry receivers are available on [OpenTelemetry collector repository](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/).

To use the receiver, you need to define it in the `receivers:` section and then use it in the pipeline.

Consider the following example configuration for collecting [Host Metrics Source](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver#host-metrics-receiver). This configuration can be placed in `conf.d` directory:

```yaml
receivers:
  hostmetrics/linux/localhost:
    scrapers:
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
      load: null
      memory:
        metrics:
          system.memory.utilization:
            enabled: true
      disk: null
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      network: null
      paging: null
      process:
        mute_process_name_error: true
        metrics:
          process.threads:
            enabled: true
          process.paging.faults:
            enabled: true
          process.cpu.utilization:
            enabled: true
          process.memory.utilization:
            enabled: true
          process.signals_pending:
            enabled: true
          process.open_file_descriptors:
            enabled: true
          process.context_switches:
            enabled: true
          process.disk.operations:
            enabled: true
processors:
  resource/linux_resource_attributes/localhost:
    attributes:
      - key: sumo.datasource
        value: linux
        action: insert
service:
  pipelines:
    metrics/linux/localhost:
      receivers:
        - hostmetrics/linux/localhost
      processors:
        - memory_limiter
        - resource/linux_resource_attributes/localhost
        - resourcedetection/system
        - batch
      exporters:
        - sumologic
```
:::note
You'll need to restart the collector process in order to apply changes.
:::

:::tip
Refer to our [Additional Configurations Reference](/docs/send-data/opentelemetry-collector/data-source-configurations/additional-configurations-reference/) for more details about OpenTelemetry configuration.
:::

[our repository]: https://github.com/SumoLogic/sumologic-otel-collector/tree/main#components
