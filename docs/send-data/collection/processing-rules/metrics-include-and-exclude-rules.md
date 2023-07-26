---
id: metrics-include-and-exclude-rules
title: Metrics Include and Exclude Rules
description: You can use metrics processing rules to specify what metrics a metrics source are sen to Sumo Logic.
---


This page describes metrics include and exclude processing rules, which you can apply to a metrics source to control metrics are sent to Sumo Logic.

* An exclude rule functions as a denylist filter where all data is sent except matching data to Sumo Logic.
* An include rule functions as an allowlist filter where only matching data is sent to Sumo Logic.

You can use metrics include and exclude rules with any metrics source, except the AWS Kinesis Firehose for Metrics source.

As a best practice, specify these rules to match the lesser volume of data.

* If you want to collect the majority of data from the Source's path provide exclude rules to match (filter out) the lesser volume of data.
* If you want to collect a small set of data from the Source's path provide include rules to match (filter in) the lesser volume of data.

You configure metrics processing rules on the **Collection > Collectors and Sources > Edit Source** page for a metrics source. There are two rule types for metrics: **Exclude metrics that match** and **Include metrics that match.**

![metric-processing-rule.png](/img/collector/processing-rules/metric-processing-rule.png)

## Exclude metrics example

Because we support multiple metrics formats, Sumo Logic leverages the filtering based on how data is serialized regardless of the format that is sent. You can use the metric name, a space, and a comma-separated list of dimensions and metatags.

Assume you have a `CPU_Usage` metric with this structure:

`Name: CPU_Usage Dimension: {cluster:receiver, _sourceCategory:receiver} Metadata: {service:payment, env:dev}`

You can filter `CPU_Usage` data points by either dimensions, metadata, or both. For example, to prevent ingestion of `CPU_``Usage `metrics for which `service=payment`, user a filter like:

`^CPU_Usage.*service=payment.* `

Host metrics merge metadata and dimensions then sort based on the keys represented as `s"${key}=${value}"` the different key-value is joined with `, `as separator. For example:

```
private lazy val sortedKeyValuePairs = TreeMap((metadata ++ dimensions).toSeq: _*)( (x: String, y: String) > x.compareTo(y))

def nameDimensionMetadataString: String = { s"$name ${sortedKeyValuePairs.map { case (key, value) > s"${key}=${value}" }.mkString(",")}"
}
```

## Include metrics example

Assume the `CPU_Usage` metric described above. 

To configure a source to only send `CPU_Usage` metrics for which `env=prod`, user a filter like:

```
^CPU_Usage.*env=prod.*
```
