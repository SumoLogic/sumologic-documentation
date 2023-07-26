---
id: configure-telegraf-output-plugin
title: Configure Telegraf Output Plugin for Sumo Logic
sidebar_label: Configure Telegraf Output Plugin
description: Learn how to configure the Telegraf output plugin for Sumo Logic to send metrics to Sumo Logic.
---



This section has instructions for configuring the Telegraf output plugin for Sumo Logic.

## Configure Hosted Collector and HTTP Source

In order to send data to Sumo Logic with Telegraf’s Sumo Logic output plugin you need to create a Hosted Collector with an HTTP Source to ingest the data. For instructions see:

 * [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector)
 * [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics)

## Configure Sumo Logic output plugin

Once your collector and source are configured, you can specify the output plugin’s configuration. 

The minimum configuration is to specify `url`, the URL for the HTTP source, and `data_format`, your metrics’ format.

```sql
[[outputs.sumologic]]
  url = "https://events.sumologic.net/receiver/v1/http/<HTTPSourceCode>"
  data_format = "carbon2"
  # or
  # data_format = "graphite"
  # or
  # data_format = "prometheus"
```

For all plugin configuration options, see [Sumo Logic output plugin configuration options](#sumo-logic-output-plugin-configuration-options) below.

## About metric formats

This section has examples of the metric formats that Sumo Logic supports.

* Carbon2

    ```
    metric=redis field=used_memory_rss host=host port=6379 replication_role=master server=localhost  7696384 1600101200  
    ```

* Graphite

    ```
    host.6379.master.localhost.redis.used_memory_rss 7700480 1600101195
    ```

* Prometheus

    ```
    redis_used_memory_rss{host="host",port="6379",replication_role="master",server="localhost"} 7.692288e+0
    ```

* Carbon2   You can tweak the carbon2 format using the [metrics_format](https://github.com/influxdata/telegraf/tree/master/plugins/serializers/carbon2#metrics-format") option.

    Field separate example:

    ```
    carbon2_format = "field_separate"
    metric=redis field=used_memory_rss host=host port=6379 replication_role=master server=localhost  7696384 1600101200
    ```

    Metrics included example:

    ```
    carbon2_format = "metric_includes_field"
    metric=redis_used_memory_rss host=host port=6379 replication_role=master server=localhost  7684096 1600101338
    ```

:::note
When you set up Telegraf collection for a supported application (Nginx, Redix, or JMX), make sure you use the Prometheus `data_format` as is required for the applications. This is true whether you are collecting metrics using Telegraf inside or outside of Kubernetes.
:::

## Filtering metrics

You can use Telegraf [measurement filtering](https://docs.influxdata.com/telegraf/v1.15/administration/configuration/#measurement-filtering) to limit the set of metrics sent to output. The following settings might be particularly useful:

* `namepass`. An array of glob pattern strings. Only points whose measurement name matches a pattern in this list are emitted.
* `fieldpass`. An array of glob pattern strings. Only fields whose field key matches a pattern in this list are emitted.

Below, we’ve expanded the minimal configuration of of the Sumo Logic output plugin to collect  only available and free memory metrics from the memory input plugin:  

```
url = "https://events.sumologic.net/receiver/v1/http\<HTTPSourceCod\>" data_format = "carbon2"
```

```
namepass = ["mem"] fieldpass = ["used", "free"]
```

## Sumo Logic output plugin configuration options

This section describes the configuration options for the Telegraf output plugin for Sumo Logic, a plugin that sends metrics from a Telegraf agent in a non-Kubernetes deployment to Sumo Logic. 

### url

Specifies the URL to which the plugin will send metrics. This will be the URL for an HTTP Source running on a Sumo Logic Hosted Collector. 

**Example**

```
url = "https://events.sumologic.net/receiver/v1/http/<UniqueHTTPCollectorCode>"
```

### data_format

The format of the metrics to be sent. The value you specify will be used to set the `Content-Type` header. For more information about content type headers for metrics, see the [Content type headers for metrics](../../hosted-collectors/http-source/logs-metrics/upload-metrics.md) section of the *Upload Metrics to an HTTP Source* topic.

Supported values for `data_format` are: 

| Value        | Content-Type                         |
|:--------------|:--------------------------------------|
| “graphite”   | application/vnd.sumologic.graphite   |
| “carbon2”    | application/vnd.sumologic.carbon2    |
| “prometheus” | application/vnd.sumologic.prometheus |

:::note
If you don’t define a value for `data_format`, Telegraf will use the Influx serializer which Sumo Logic does not currently support.
:::

**Example**

`data_format = "carbon2"`

#### timeout

The timeout for the HTTP request.

**Example**

`timeout = "5s"`

#### method

Specifies the HTTP method for the HTTP request.

Supported values:

 * "POST" 

:::note
If you don’t specify a value for `method`, "POST" is used.
:::

**Example**

```
method = "POST"
```

#### max_request_body_size 

The maximum  HTTP request body size in bytes before compression. The recommended value is 1 MB, which you would specify as 1000000.

:::note
With some serializers, a metric, even if serialized to multiple lines, can’t be split any further, so a very low value for `max_request_body_size` might not work as expected.
:::

**Example**

```
max_request_body_size = 1000000
```

#### source_name

If you specify a value, it will override the source name associated with the HTTP source to which the metrics will be sent, specified by the `url` option. 

**Example**

```
source_name="My Preferred Source Name"
```

#### source_host

If you specify a value, it will override the source host associated with the HTTP source to which the metrics will be sent, specified by `url` option. 

**Example**

```
source_host="My Preferred Source Host"
```

#### source_category

If you specify a value, it will override the source category defined for the HTTP source  to which the metrics will be sent, specified by `url` option.   
   
**Example**

```
source_category="prod/uno/dos"
```

#### dimensions

A comma-separated list of dimensions, in key=value format, to apply to the metrics sent to Sumo Logic. Applying custom dimensions to metrics allows you to query them at a more granular level in Sumo Logic. 

**Example**

```
dimensions="env=prod,div=plack"
```
