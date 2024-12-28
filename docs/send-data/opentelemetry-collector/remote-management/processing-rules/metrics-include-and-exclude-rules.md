---
id: metrics-include-and-exclude-rules
title: OpenTelemetry Remote Management Metrics Include and Exclude Rules
sidebar_label: Metrics Include and Exclude Rules
description: You can use metrics processing rules to specify what metrics are sent to Sumo Logic using OpenTelemetry remote management.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

You can use include and exclude processing rules to specify which metrics are sent to Sumo Logic using the OpenTelemetry Collector. These rules internally leverage the [filter processor](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/filterprocessor) to filter metrics.

* An exclude rule functions as a denylist filter, ensuring that matching data is not sent to Sumo Logic.
* An include rule functions as an allowlist filter, ensuring that only matching data is sent to Sumo Logic.

As a best practice, configure these rules to filter the smaller volume of data for optimal performance:

* If you want to **collect the majority of data** from a source template, use **exclude** rules to match (filter out) the lesser volume of data.
* If you want to **collect a small set of data** from a source template, use **include** rules to match (filter in) the lesser volume of data.

## Metric filter examples

You can apply filters to metrics data in a source template by adding a metrics filter. Specify the filter name, **Type** (include or exclude), and **Filter By** criteria.

There are three filtering options:
* Filter by metrics name
* Filter by dimension
* Filter by metric name and dimension

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

* Metric name regex: network
* Dimension key-value pairs: `device=lo`, `direction=transmit`

<img src={useBaseUrl('img/send-data/opentelemetry-collector/processingrule-include-metricnameanddimension.png')} alt="collector-installation-completion-page" style={{border:'1px solid gray'}} width="700" />

## Rules and limitations

* Rules must be compliant with [RE2 syntax](https://github.com/google/re2/wiki/Syntax).
* Exclude rules take precedence over include rules. Include rules are processed first, however, if an exclude rule matches data that matched the include rule filter, the data is excluded.
* When multiple rules are listed, the assumed Boolean operator is `OR`.
* To filter for a single dimension key with multiple possible values, use the `|` operator. For example, to monitor CPU metrics for only cpu0 and cpu1, specify the dimension value as `cpu0|cpu1`.
