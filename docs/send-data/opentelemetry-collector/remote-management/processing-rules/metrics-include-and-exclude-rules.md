---
id: metrics-include-and-exclude-rules
title: Metrics Include and Exclude Rules for OpenTelemetry (Beta)
description: You can use metrics processing rules to specify what metrics are sent to Sumo Logic using OpenTelemetry Collector.
---
<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';

You can use include and exclude processing rules to specify what metrics is sent to Sumo Logic using OpenTelemetry Collector. Internally these will use [filter processor](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/filterprocessor) to get the metrics filtered. 

* An exclude rule functions as a denylist filter where all data is sent except matching data to Sumo Logic.
* An include rule functions as an allowlist filter where only matching data is sent to Sumo Logic.

As a best practice, specify these rules to match the lesser volume of data.

* If you want to collect the majority of data from a source template, provide exclude rules to match (filter out) the lesser volume of data
* If you want to collect a small set of data from a source template, provide include rules to match (filter in) the lesser volume of data.

## Metric filter examples

For filtering metrics data in source template you can add a metrics filter to the source template. You can then provide the name of the filter followed by **Type** (filter to include or exclude) and **Filter by**. 

There are three ways to use metrics filter in source template: 
* Filter by metrics name
* Filter by dimension
* Filter by metrics name and dimension

### Filter by metrics name

If you need to filter by name of the metrics, then you can select this option and provide the regex which matched with the metric name. 

For example when collecting host metrics, if you need to collect only network metrics, then you can give `network` in the metric name. 

<img src={useBaseUrl('img/send-data/opentelemetry-collector/processingrule-include-metricname.png')} alt="collector-installation-completion-page" style={{border:'1px solid gray'}} width="700" />

### Filter by dimension

If you need to filter by dimension of the metrics, then you can select this option and provide the list of keys and values in the dimension table. Key needs to be the exact dimension name and value can be a regex which matches against the value for the key given. All of these key value pairs will have the `AND` condition between them. 

For example, when collecting host metrics you can filter CPU metrics data for a specific CPU (say `cpu0`), and you can mention the respective key value pair in the dimension table.

<img src={useBaseUrl('img/send-data/opentelemetry-collector/processingrule-include-metricdimension.png')} alt="collector-installation-completion-page" style={{border:'1px solid gray'}} width="700" />

### Filter by metrics name and dimension

If you need to filter by metrics name and dimension, then you can select this option and provide the metric name regex and dimension key and value. Key needs to be the exact dimension name and value can be a regex which matches against the value for the key given. All inputs here (that is, metric name) and all key value pairs will have the `AND` condition between them. 

For example, when collecting host metrics, you can filter network metrics for a specific device and direction by giving metric name regex as `network`, and in the dimension table key value pair you can specify `device=lo` and `direction=transmit`.

<img src={useBaseUrl('img/send-data/opentelemetry-collector/processingrule-include-metricnameanddimension.png')} alt="collector-installation-completion-page" style={{border:'1px solid gray'}} width="700" />

## Rules and Limitations

* Your rule must be [RE2 compliant](https://github.com/google/re2/wiki/Syntax).
* Exclude rules take priority over include rules. Include rules are processed first, however, if an exclude rule matches data that matched the include rule filter, the data is excluded.
* If two or more rules are listed, the assumed Boolean operator is OR.
* If data needs to get filtered for single dimension key which can have multiple possible values then we can use a `|` operator. For example if we need to monitor cpu metrics for only cpu0 and cpu1 then we can form the dimension value expression as `cpu0|cpu1`.
