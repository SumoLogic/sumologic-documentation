---
id: disabled-metrics-sources
title: Disabled Metrics Sources
sidebar_label: Disabled Metrics Sources
description: Sumo Logic sometimes disables metrics Sources in response to excessive volume of time series.
---

In some cases, Sumo Logic disables a metrics source or drops a metric dimension to limit the number of ingested time series. 

This page has information about the process and how to resolve the problem.

:::note
Sumo Logic also disables a logs-to-metrics rule that generates too many time series, as described in "Metric volume limits and rule disabling" on the [Logs-to-Metrics](../logs-to-metrics.md) page.
:::

## Global metric ingestion limit

Sumo Logic imposes a global limit across all of the  metric sources in your account:

* 50M unique timeseries per week, for metrics with long term retention
* 100M unique timeseries per week, for metrics with short term retention

The storage is based on the metrics retention period, which you can control using [Metrics Transformation Rules](../metrics-transformation-rules.md).

### Warning is issued when you approach the global limits

When you approach one of these limits, Sumo Logic generates a Health Event and writes a message with level “warning” to the Audit Event Index.

The Health Event and audit message are generated when your metric ingestion reaches these levels:

* 35M unique timeseries per week, for metrics with long term retention
* 70M unique timeseries per week, for metrics with short term retention

The Health Event is named `MetricsHighCardinalityDetected`. 

The message written to the Audit Event Log is:

```json
{"status":"UnHealthy","details":{"retention":"long","trackerId":"MetricsHighCardinalityDetected","error":"Detected high cardinality of metrics time series","description":"Approaching the limit for total number of unique time series allowed. In case of exceeding the limit some of your metrics sources would be temporary disabled."},"eventType":"Health-Change","severityLevel":"Warning","accountId":"0000000000000475","eventId":"0687c55e-0b77-44a4-9a6f-6d6d5e588244","eventName":"MetricsHighCardinalityDetected","eventTime":"2020-06-18T14:45:48.252Z","eventFormatVersion":"1.0 beta","subsystem":"Metrics","resourceIdentity":{"id":"0000000000000475","name":"stagData","type":"Organisation"}}
```

### Sources are disabled when you reach the global limits

When you reach the global limits, Sumo Logic starts disabling your metric sources, starting with the one that is ingesting metrics with the highest cardinality, and continues disabled metric sources in that order, until your metric ingestion is reduced to a volume that is lower than the limit.

For each source it disabled, Sumo Logic generates a Health Event and writes a message with level “error” to the Audit Event Index.

The Health Event is named `SourceDisabled`. 

The message written to the Audit Event Log is:

```json
{"status":"UnHealthy","details":{"trackerId":"SourceDisabled","error":"Metrics source temporarily disabled","description":"This metrics source has sent too many unique time series and has been temporarily disabled. The data sent while this source is disabled cannot be recovered."},"eventType":"Health-Change","severityLevel":"Error","accountId":"0000000000000475","eventId":"4b1e4710-bef6-4ebe-926b-57e6b4743e9a","eventName":"SourceDisabled ","eventTime":"2020-06-18T15:00:20.776Z","eventFormatVersion":"1.0 beta","subsystem":"Metrics","resourceIdentity":{"collectorId":"000000000627859B","collectorName":"stag-cass-metrics-aa-2","id":"000000000644FB28","name":"HostMetrics","type":"Source"}}
```

### Sources are re-enabled when metric cardinality drops

When your metric cardinality across your sources drops to 80% of the global limit, all of the disabled sources are re-enabled. The thresholds for re-enabling the sources are:

* 40M unique time series per week, for metrics with long term retention
* 80M unique time series per week, for metrics with short term retention

## High cardinality dimensions are dropped

If a metric source has produced more than 5000 unique values for a dimension within the last 12 hours, or 100K unique values for metrics with short term retention, the dimension will be dropped. 

This limit does not apply to AWS CloudWatch metrics, AWS XRay metrics, or Host Metrics. 

This limit does not apply to the Kubernetes dimensions, Docker dimensions, or the built-in metadata fields listed below:

* `metric`
* `pod`
* `id`
* `type_instance`
* `interface`
* `container_id`
* `name`
* `pod_labels_app-name`
* `pod_labels_id`
* `_rawName`
* `_collector`
* `_source`
* `_sourceCategory`
* `_sourceHost`
* `_sourceName`
* `container.id`
* `container.fullid`
* `container.name`
* `container.imageid`
* `container.imagename`
* `container.imagefullid`
* `container.daemonname`
* `label.com.docker.swarm.task.id`
* `label.com.docker.swarm.task.name`

For other dimensions that exceed the cardinality limit Sumo generates a metric transformation rule to exclude the dimension. The rule appears in the UI at **Manage Data > Metrics > Metric Transformation Rules**:

You can delete the metric transformation rule, but you can’t disable or modify it. 

![transformation-rules.png](/img/metrics/transformation-rules.png)

:::note
If you have a use case that requires the dropped dimension, contact Sumo Logic support.
:::

When a dimension is dropped, Sumo Logic generates a Health Event and writes a message with level “error” to the Audit Event Index.

The Health Event is named `HighCardinalityDimensionDropped`.

The message written to the Audit Event Index is:

```json
{"status":"UnHealthy","details":{"dimension":"monitoridentifier","trackerId":"HighCardinalityDimensionDropped","error":"Dropped highly cardinal metrics dimension","description":"This metrics source has sent metrics with too many unique values of one dimension. Therefore said dimension will be dropped from metrics coming from this source."},"eventType":"Health-Change","severityLevel":"Error","accountId":"0000000000000131","eventId":"7354fe41-bd6e-46e2-802b-bc6b42a97406","eventName":"HighCardinalityDimensionDropped","eventTime":"2020-06-18T15:49:57.803Z","eventFormatVersion":"1.0 beta","subsystem":"Metrics","resourceIdentity":{"collectorId":"00000000064C90BE","collectorName":"nite-alert-1","id":"000000000689D385","name":"carbon2udp","type":"Source"}}
```

## Why Sumo disables a metrics source 

Too many unique time series can occur with metrics whose names contain dynamically-generated strings, for example, a timestamp. This is sometimes the case with Graphite metrics. Similarly, Dropwizard metric names sometimes contain names of threads. With dynamically-generated metric names, a new time series is created with each new name. When this happens, the total number of time series can be subjected to unbounded growth over time. And the time series are typically of little use, given their ephemeral nature.

In the case of EC2 CloudWatch metrics, Amazon’s metric naming convention causes a new time series to be created for each EC2 instance.

To solve the disabling issue, modify the time series naming convention in the Source to exclude any dynamically inserted elements, such as date, timestamp, or thread names.
