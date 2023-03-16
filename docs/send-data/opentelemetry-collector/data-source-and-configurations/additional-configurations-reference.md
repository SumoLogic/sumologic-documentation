---
id: additional-configurations-reference
title: Additional Configurations Reference
sidebar_label: Additional Configurations Reference
description: Learn about Configurations Reference
---

## OpenTelemetry Configuration

All Configuration files are following the OpenTelemetry Collector configuration schema.
Configuration contains service consisting of pipelines with some receivers, processors and exporters. If you are new to OpenTelemetry Collector, you can familiarize yourself with the terms reading the [upstream documentation].

[upstream documentation]: https://opentelemetry.io/docs/collector/configuration/

## Sumo Logic Distribution for OpenTelemetry Collector Configuration Structure

We are using the following organisation of files within configuration directory:

```txt
.
├── conf.d
│   ├── common.yaml
│   └── hostmetrics.yaml
├── env
│   └── token.env
└── sumologic.yaml
```

- `sumologic.yaml` is provided by Sumo Logic and shouldn't be changed, as it can be overridden during installation/upgrade
- `conf.d` is intended to be changed by customers if they need to customize OpenTelemetry Collector behavior
- `env` is intended to contain environmental variable files

By default configuration is loaded in the following order:

- `sumologic.yaml`
- all configuration files from `conf.d` sorted alphabetically

:::note
Configuration which is loaded later in the order is going to be merged with previous one. Let's consider the following example configuration files:

`conf.d/0-base.yaml`:

```yaml
extensions:
  sumologic:
    collector_description: "My OpenTelemetry Collector"
    collector_fields:
      cluster: "cluster-1"
    some_list:
      - element 1
      - element 2
```

`conf.d/1-override.yaml`:

```yaml
extensions:
  sumologic:
    collector_fields:
      zone: "eu"
    some_list:
      - element 3
      - element 4
```

the effective configuration will look like the following:

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

Notice that the list has been overridden and maps have been merged.
:::
