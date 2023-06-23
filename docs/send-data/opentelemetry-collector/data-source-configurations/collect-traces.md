---
id: collect-traces
title: Collect Traces
sidebar_label: Collect Traces
description: Learn how to collecting traces using the Sumo Logic OpenTelemetry Collector.
---

Default installation of the Sumo Logic Distribution for OpenTelemetry Collector goes with default endpoints for tracing collection in OTLP format:

* `localhost:4317` for GRPC
* `localhost:4318` for HTTP

## Run collection on different ports

If you'd like to run collection on different ports, you can save a configuration like the following as `conf.d/expose-otlp.yaml`:

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 1.2.3.4:4317
      http:
        endpoint: 0.0.0.0:4318
```

The configuration is going to be applied for `metrics/default`, `logs/default`, and `traces/default` defined in `sumologic.yaml`.

## Create a new independent pipeline

If you'd like to create a new independent pipeline, use the following content for `conf.d/expose-otlp.yaml`

```yaml
receivers:
  otlp/exposed:
    protocols:
      grpc:
        endpoint: 1.2.3.4:4317
      http:
        endpoint: 0.0.0.0:4318
service:
  pipelines:
    traces/exposes:
      receivers:
        - otlp/exposed
      processors:
        - memory_limiter
        # you can add custom processors here, if you would like to filter or modify the data
        - batch
      exporters:
        - sumologic
```


:::tip
* Refer to our [Additional Configurations Reference](/docs/send-data/opentelemetry-collector/data-source-configurations/additional-configurations-reference/) for more details about OpenTelemetry configuration.
* Refer to [Instrument your application with OpenTelemetry](/docs/apm/traces/get-started-transaction-tracing/opentelemetry-instrumentation/) for a detailed explanation of application instrumentation.
:::
