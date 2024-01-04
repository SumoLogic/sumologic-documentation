---
id: important-changes
title: Kubernetes Collection v4.0.0 - Important changes
sidebar_label: Important changes
description: This page describes the major changes and the necessary migration steps.
---

Based on user feedback, we're introducing several changes to the Sumo Logic Kubernetes Collection solution.

This page describes the major changes and the necessary migration steps.

## Important changes

### Remove Fluent Bit and Fluentd

As of version 3 of the Chart, Fluent Bit and Fluentd were replaced by the OpenTelemetry Collector by default. However, it was still possible to use Fluent Bit and/or Fluentd by changing the configuration. In version 4, this is no longer possible. For migration instructions, see the [v3 migration guide][v3_migration_guide].

### Drop Prometheus recording rule metrics

OpenTelemetry can't collect Prometheus recording rule metrics. The new version therefore stops collecting recording rule metrics and updates will be made to the Kubernetes App to remove these metrics. See the [scraped metrics reference][scraped_metrics_aggregations] for instructions on how to recover these recording rule metrics in Sumo.

### OpenTelemetry Collector for metrics collection

By default, the OpenTelemetry Collector is now used for metrics collection instead of Prometheus. For the majority of use cases, this will be a transparent change without any need for manual configuration changes. OpenTelemetry Collector will continue to collect the same default metrics as Prometheus did previously, and will support the same mechanisms for collecting custom application metrics. Any exceptions will be called out in the migration guide below.

### Use OTLP sources by default

This Helm Chart automatically creates the necessary Collector and Sources in Sumo. Up until this point, these were generic HTTP sources accepting data in different formats. As Sumo now has native support for the OTLP protocol used by OpenTelemetry, we've decided to switch to using these new sources by default. This is a completely transparent change **unless** you use the `_sourceName` or `_source` fields in your Sumo queries.

[v3_migration_guide]: https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/v3-migration-doc.md
[scraped_metrics_aggregations]: https://github.com/SumoLogic/sumologic-kubernetes-collection/blob/main/docs/scraped-metrics.md#aggregations-removed
