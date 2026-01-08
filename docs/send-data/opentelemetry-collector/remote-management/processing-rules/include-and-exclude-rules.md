---
id: include-and-exclude-rules
title: OpenTelemetry Remote Management Include and Exclude Rules
sidebar_label: Include and Exclude Rules
description: Use include and exclude processing rules to specify what kind of data is sent to Sumo Logic using OpenTelemetry remote management.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can use include and exclude processing rules to define which data is sent to Sumo Logic using the OpenTelemetry Collector. These rules internally utilize the [filter processor](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/filterprocessor) to filter data for logs and metrics.

* Exclude rule functions as denylist filters, ensuring that matching data is not sent to Sumo Logic.
* Include rule functions as allowlist filters, ensuring that only matching data is sent to Sumo Logic.

As a best practice, configure these rules to filter the smaller volume of data for optimal performance:

* If you want to collect the majority of data from a source template, use exclude rules to match (filter out) the smaller volume of data.
* If you want to collect a small set of data from a source template, use include rules to match (filter in) the smaller volume of data.

## Logs: Include and exclude rules

### Examples

To include only messages from a Windows Event log with ID `8015`, you can add a Logs Filter to the source template. Select the **Type** of the filter as "Include messages that match" and use the following filter regular expression:

```
.*"id":8015.*
```

<img src={useBaseUrl('img/send-data/opentelemetry-collector/processingrule-include-logs.png')} alt="collector-installation-completion-page" style={{border:'1px solid gray'}} width="700" />

## Metrics: Include and exclude rules

### Examples

Metrics filters can be configured in a source template by specifying:

* Filter by metrics name
* Filter by dimension
* Filter by metric name and dimension

Specify the filter name, **Type** (include or exclude), and **Filter By** criteria.

### Filter by metrics name

To filter by the name of a metric, select this option and provide a regex that matches the metric name.

For example, to collect only network metrics while collecting host metrics, specify `network` as the metric name.

<img src={useBaseUrl('img/send-data/opentelemetry-collector/processingrule-include-metricname.png')} alt="collector-installation-completion-page" style={{border:'1px solid gray'}} width="700" />

### Filter by dimension

To filter by metric dimensions, select this option and specify key-value pairs in the dimension table.

* The key must match the exact dimension name.
* The value can be a regex matching the corresponding value.
* Multiple key-value pairs are evaluated using an `AND` condition.

For example, when collecting host metrics, you can filter CPU metrics data for a specific CPU (say `cpu0`), and you can mention the respective key value pair in the dimension table.

<img src={useBaseUrl('img/send-data/opentelemetry-collector/processingrule-include-metricdimension.png')} alt="collector-installation-completion-page" style={{border:'1px solid gray'}} width="700" />

### Filter by metrics name and dimension

To filter by both metric name and dimensions, specify a regex for the metric name along with key-value pairs for dimensions.

* The key must match the exact dimension name.
* The value can be a regex matching the corresponding value for the key given.
* The metric name and all key-value pairs are evaluated using an `AND` condition.

For example, when collecting host metrics, you can filter network metrics for a specific device and direction by specifying:

* Metric name regex: `network`
* Dimension key-value pairs: `device=lo`, `direction=transmit`

<img src={useBaseUrl('img/send-data/opentelemetry-collector/processingrule-include-metricnameanddimension.png')} alt="collector-installation-completion-page" style={{border:'1px solid gray'}} width="700" />


## Rules and limitations

When creating regular expression rules, adhere to the following guidelines:

- Rules must comply with [RE2 syntax](https://github.com/google/re2/wiki/Syntax).
- Exclude rules take precedence over include rules. Include rules are processed first, but if an exclude rule matches data that also matches the include rule, the data will be excluded.
- When multiple rules are listed, the assumed Boolean operator is `OR`.
- To filter for a single dimension key with multiple possible values, use the | operator. Example: For `cpu0` and `cpu1`, specify the dimension value as: `cpu0|cpu1`
- If your rule matches any part of a log line, the entire log line will be matched.
- For single-line messages, it is not necessary to prefix or suffix the regex with `.*`.
