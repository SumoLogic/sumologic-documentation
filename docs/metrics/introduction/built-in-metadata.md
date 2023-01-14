---
id: built-in-metadata
title: Built-in Metadata for Metrics
sidebar_label: Built-in Metadata
description: Learn about the metadata attached to metrics.
---

Sumo Logic automatically adds several metadata fields to metrics at ingestion time. Sumo Logic uses metrics metadata in a number of ways. For instance, you can use metadata to scope your metrics queries.  

:::tip
For a list of Sumo Logic metrics sources, see [Metrics Sources](/docs/metrics/introduction).  
:::


## Built-in metadata fields
You can run queries using any of the following built-in metadata fields.

| Name | Description
| :-- | :--
`_collector` | The name of the Collector (set when the Collector was installed) that received metrics data points.
`_metricId` | The identifier of the metric. It is calculated based on the dimensions of the metric, and can be used to uniquely identify a specific metric.
`_source`	| The name of the Source, determined by the name supplied when the Metrics Source was configured.
`_sourceCategory`	| The source category assigned to the Source by the user that configured it. `_sourceCategory` | can be a maximum of 400 characters long.
`_sourceHost`	| The host name of the Source. For Sources that run on Installed Collectors, this is the Source Host configured for the Source. For Sources that run on Hosted Collectors, _sourceHost takes its value from the remote host's name, obtained using a reverse DNS lookup. If the name cannot be resolved, _sourceHost is displayed as localhost.
`_sourceHost` |  can be a maximum of 400 characters.
`_sourceName`	|  The name of the Source, provided when the Source was configured.
`_contentType` |	Type of the ingested metric. It can be the format of the metric, the source type (HostMetrics, AwsCloudWatch, and so on), the origin (MetricFromLog, MetricFromTrace, and so on) or for an HTTP Source, the Content-Type header configured for the Source.
