---
id: configuration
title: OpenTelemetry Configuration
sidebar_label: Config
---

OpenTelemetry is the future of agent-based collection for Sumo Logic and the Sumo Logic Distribution for OpenTelemetry Collector is our next generation collector built on OpenTelemetry. It provides a single unified agent to send Logs, Metrics, Traces, and Metadata for Observability to Sumo Logic.

## Basic configuration

The only required option to run the collector is `--config`, which points to the configuration file.

```shell
otelcol-sumo --config config.yaml
```
