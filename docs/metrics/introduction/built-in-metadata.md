---
id: built-in-metadata
title: Built-in Metadata for Metrics
sidebar_label: Built-in Metadata
description: Learn about the metadata attached to metrics.
---

Sumo Logic automatically adds several metadata fields to metrics at ingestion time. Sumo Logic uses metrics metadata in a number of ways. For instance, you can use metadata to scope your metrics queries.  

:::tip
For a list of Sumo Logic metrics sources, see [Metrics sources](/docs/metrics/introduction/#metrics-sources).  
:::


## Built-in metadata fields
You can run queries using any of the following built-in metadata fields.

| Name | Description |
| :-- | :--
| `_collector` | The name of the collector (set when the collector was installed) that received metrics data points. |
| `_metricId` | The identifier of the metric. It is calculated based on the dimensions of the metric, and can be used to uniquely identify a specific metric. |
| `_source`	| The name of the source, determined by the name supplied when the Metrics source was configured. |
| `_sourceCategory`	| The source category assigned to the source by the user that configured it. Can be a maximum of 1,024 characters long. |
| `_sourceHost`	| The host name of the source. For sources that run on installed collectors, this is the Source Host configured for the source. For sources that run on hosted collectors, `_sourceHost` takes its value from the remote host's name, obtained using a reverse DNS lookup. If the name cannot be resolved, `_sourceHost` is displayed as `localhost`. Can be a maximum of 400 characters. |
| `_sourceName`	|  The name of the source, provided when the source was configured. |
| `_contentType` |	Type of the ingested metric. It can be the format of the metric, the source type (`HostMetrics`, `AwsCloudWatch`, and so on), the origin (`MetricFromLog`, `MetricFromTrace`, and so on) or for an HTTP source, the `Content-Type` header configured for the source. |
