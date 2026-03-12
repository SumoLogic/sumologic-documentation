---
id: collect-metrics
title: Collect Metrics
sidebar_label: Collect Metrics
description: Learn how to collect metrics using the Sumo Logic OpenTelemetry Collector.
---

The Sumo Logic Distribution for OpenTelemetry Collector provides various receivers for metrics collection. The full list of OpenTelemetry receivers are available on [OpenTelemetry collector repository](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/).

To use a receiver, define it in the `receivers:` section, then reference it in a pipeline. Place your configuration files in the `conf.d` directory.

## Host metrics

The following example uses the [Host Metrics receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/hostmetricsreceiver#host-metrics-receiver) to collect system-level metrics like CPU, memory, and disk usage:

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

## Prometheus metrics

If you have applications that expose metrics in [Prometheus format](https://prometheus.io/docs/instrumenting/exposition_formats/), you can scrape them using the [`prometheus` receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusreceiver). This is the recommended approach for collecting Prometheus metrics with the Sumo Logic OpenTelemetry Collector.

:::tip
If you're migrating from a Telegraf-based collection setup, see [Collect Prometheus Metrics](/docs/send-data/collect-from-other-data-sources/collect-prometheus-metrics) for the older Telegraf-based approach.
:::

The following example scrapes metrics from an application running on `localhost:8080`:

```yaml
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: 'my-app-metrics'
          scrape_interval: 10s
          static_configs:
            - targets: ['localhost:8080']
service:
  pipelines:
    metrics:
      receivers: [prometheus]
      exporters: [sumologic]
```

This configuration:
* Defines a `prometheus` receiver that scrapes metrics from `localhost:8080` every 10 seconds.
* Creates a metrics pipeline that sends the scraped metrics to Sumo Logic via the `sumologic` exporter.

You can add multiple targets under `static_configs` to scrape from several endpoints, or add additional `scrape_configs` entries for different jobs:

```yaml
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: 'app-1'
          scrape_interval: 10s
          static_configs:
            - targets: ['app1-host:9090']
        - job_name: 'app-2'
          scrape_interval: 30s
          static_configs:
            - targets: ['app2-host:9090', 'app2-host:9091']
```

Once your metrics are flowing into Sumo Logic, you can visualize them in a [dashboard](/docs/dashboards/create-dashboard-new/) and [set up monitors](/docs/alerts/monitors/create-monitor/) to alert on threshold breaches.

:::note
You'll need to restart the collector process in order to apply changes.
:::

:::tip
Refer to our [Additional Configurations Reference](/docs/send-data/opentelemetry-collector/data-source-configurations/additional-configurations-reference/) for more details about OpenTelemetry configuration.
:::

[our repository]: https://github.com/SumoLogic/sumologic-otel-collector/tree/main#components
