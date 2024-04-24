---
id: metrics-include-and-exclude-rules-otel
title: Metrics Include and Exclude Rules OpenTelemetry (Beta)
description: You can use metrics processing rules to specify what metrics are send to Sumo Logic using OpenTelemetry Collector.
---
<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

You can use include and exclude processing rules to specify what metrics is sent to Sumo Logic using OpenTelemetry Collector. Internally these will use [filter processor](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/filterprocessor) to get the metrics filtered. 

* An exclude rule functions as a denylist filter where all data is sent except matching data to Sumo Logic.
* An include rule functions as an allowlist filter where only matching data is sent to Sumo Logic.

As a best practice, specify these rules to match the lesser volume of data.

* If you want to collect the majority of data from a source template, provide exclude rules to match (filter out) the lesser volume of data
* If you want to collect a small set of data from a source template, provide include rules to match (filter in) the lesser volume of data.

## Metric Filter Example

For filtering metrics data in source template you can add a metrics filter to the source template. You can then provide the name of the filter followed by Type (filter to Include or Exclude) and "Filter by". There are three ways to use metrics filter in source template : 

1. **Filter by Metrics Name** : If you need to filter by name of the metrics, then you can select this option and provide the regex which matched with the metric name. 

For example when collecting host metrics, if you need to collect only network metrics then you can give "network" in metric name. 
<img src={useBaseUrl('img/send-data/opentelemetry-collector/processingrule-include-metricname.png')} alt="collector-installation-completion-page" style={{border:'1px solid gray'}} width="700" />

2. **Filter by Dimension** : If you need to filter by dimension of the metrics, then you can select this option and provide the list of key and value in the dimension table. Key needs to be the exact dimension name and value can be a regex which matches against the value for the key given. All of these key value pairs will have AND condition between them. 

For example, when collecting host metrics you can filter cpu metrics data for specific cpu(say cpu0), you can mention respective key value pair in dimension table.
<img src={useBaseUrl('img/send-data/opentelemetry-collector/processingrule-include-metricdimension.png')} alt="collector-installation-completion-page" style={{border:'1px solid gray'}} width="700" />

3. **Filter by Metrics Name & Dimension** : If you need to filter by metric name and dimension, then you can select this option and provide the metric name regex and dimension key and value. Key needs to be the exact dimension name and value can be a regex which matches against the value for the key given. All inputs here i.e. metric name and all key value pairs will have AND condition between them. 

For example, when collecting hostmetrics, you can filter network metric for specific device and direction by giving metric name regex as network and in dimension table key value pair you can specify device=lo and direction=transmit.

<img src={useBaseUrl('img/send-data/opentelemetry-collector/processingrule-include-metricnameanddimension.png')} alt="collector-installation-completion-page" style={{border:'1px solid gray'}} width="700" />