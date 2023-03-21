---
id: collect-prometheus-metrics
title: Collect Prometheus Metrics
sidebar_label: Prometheus
description: You can collect Prometheus metrics in Kubernetes or outside of Kubernetes using Telegraf to collect and a plugin to send data to Sumo Logic.
---


You can collect Prometheus metrics in Kubernetes or outside of Kubernetes using Telegraf to collect and a plugin to send data to Sumo Logic. This guide walks through the plugins and options to set up your collection.

## Collecting Prometheus Metrics in Kubernetes

Use the [Prometheus Input Plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/prometheus)
to gather metrics from HTTP servers exposing metrics in Prometheus format.

### Configure and Collect Metrics

Configure the following options for the plugin.

**URLs.** An array of URLs to scrape for metrics.

```
urls = ["http://localhost:9100/metrics"]
```

**Metric version.** This version controls the mapping from Prometheus metrics into Telegraf metrics. When using the prometheus_client output, use the same value in both plugins to ensure metrics are handled without modification. We recommend version 2.

```
metric_version = 1
```

**URL tag.** Provide a url tag name containing the scraped url. The default is "url".

```
url_tag = "url"
```

**Timestamp ignored.** Indicate if the timestamp of scraped metrics should be ignored. If "true", gather time is used collecting the timestamp.

```
ignore_timestamp = false
```

**Kubernetes services array.** List an array of Kubernetes services to scrape metrics from.

```
kubernetes_services = ["http://my-service-dns.my-namespace:9100/metrics"]
```

**Kubernetes config file.** Provide a path to your Kubernetes config file to create a client from.

```
kube_config = "/path/to/kubernetes.config"
```

**Scrape Kubernetes pods.** Indicate if you want to scrape Kubernetes pods.

```
monitor_kubernetes_pods = true
```

You can scrape for the following annotations:

| Pod | Options |
|:--|:--|
| prometheus.io/scrape | Enable scraping for this pod. |
| prometheus.io/scheme | If the metrics endpoint is secured, you will need to set this to "https" and may need to set the tls config. |
| prometheus.io/path   | If the metrics path is not /metrics, define it with this annotation. |
| prometheus.io/port   | If port is not 9102, use this annotation. |

**Pod scrape scope.** Get a list of pods to scrape with one of the
following scopes:
 * cluster: The Kubernetes watch API. This is used by default.
 * node: The local cadvisor API used for scalability. If using this scope, you will need to set a node IP and pod scrape interval. See the following options.
     pod_scrape_scope = "cluster"

**Node IP.** If using the *node* pod scrape scope, set the IP of the node Telegraf runs on. You must configure this setting or add an environment variable of NODE_IP.

```sql
node_ip = "10.180.1.1"
```

**Pod scrape interval.** If using the *node* pod scrape scope, set an interval in seconds for updating the post list for scraping. The default is 60 seconds.

```sql
pod_scrape_interval = 60
```

**Restrict namespace.** Set options to restrict Kubernetes monitoring to a single namespace.

```sql
monitor_kubernetes_pods_namespace = ""
```

For example:

```sql
monitor_kubernetes_pods_namespace = "default"
```

To set the label selector to target pods with a specific label:

```sql
kubernetes_label_selector = "env=dev,app=nginx"
```

To scrape pods on a specific node, set the field selector to target pods:

```sql
kubernetes_field_selector = "spec.nodeName=$HOSTNAME"
```

**Scrape Services available in Consul Catalog.** Configure the following to scrape services available in the Consul Catalog, including the inputs.prometheus consul, inputs.prometheus consul.query, and inputs.prometheus consul.query.tags settings.

```sql
 [inputs.prometheus.consul]
     enabled = true
     agent = "http://localhost:8500"
     query_interval = "5m"

     [[inputs.prometheus.consul.query]]
       name = "a service name"
       tag = "a service tag"
       url = 'http://{{if ne .ServiceAddress ""}}{{.ServiceAddress}}{{else}}{{.Address}}{{end}}:{{.ServicePort}}/{{with .ServiceMeta.metrics_path}}{{.}}{{else}}metrics{{end}}'
       [inputs.prometheus.consul.query.tags]
         host = "{{.Node}}"

```

**Bearer token.** Use one of the following for bearer token for authorization. "bearer_token" takes priority.

```sql
bearer_token = "/path/to/bearer/token"
bearer_token_string = "abc_123"
```

**HTTP Basic Authentication.** Set the username and password for authentication. "bearer_token" and

```sql
"bearer_token_string" take priority.
username = "" password = ""
```

**Timeout.** Specify timeout duration for slower Prometheus clients. The default is 3 seconds.

```sql
response_timeout = "3s"
```

**(Optional) TLS Config.** Configure the paths for TLS config.

```sql
tls_ca = /path/to/cafile tls_cert = /path/to/certfile tls_key = /path/to/keyfile
```

**Verification skip.** Indicate to use TLS but skip chain and host verification.

```sql
insecure_skip_verify = false
```

## Collecting Prometheus Metrics Outside of Kubernetes

Use the Prometheus Input Plugin to read data into Telegraf, then use the [Sumo Logic output plugin](https://github.com/influxdata/telegraf/tree/master/plugins/outputs/sumologic) to send data into Sumo Logic.

### Requirements

Install and configure Telegraf to read your data for sending through the Sumo Logic output plugin.

1. [Install Telegraf](collect-metrics-telegraf/install-telegraf.md).
1. [Configure Telegraf Inputs](collect-metrics-telegraf/configure-telegraf-input-plugins.md) to receive data from the [Prometheus Input Plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/prometheus). 

### Configure and Collect Metrics

To send data into Sumo Logic, use the [*Sumo Logic output plugin*](https://github.com/influxdata/telegraf/tree/master/plugins/outputs/sumologic). Configure the following options for the plugin. See [Supported HTTP Headers](../hosted-collectors/http-source/logs-metrics/upload-metrics.md) for additional Sumo supported options.

**URL.** A unique URL generated for your HTTP Metrics Source. Use the following address to send metrics to:

```sql
url = "https://events.sumologic.net/receiver/v1/http/<UniqueHTTPCollectorCode>"
```

**Data Format.** This plugin sends metrics to the [Sumo Logic HTTP Source](../hosted-collectors/http-source/logs-metrics/upload-metrics.md) in HTTP messages, encoded using one of the following output data formats, set for the header "Content-Type". For more information, see [Content-type header for metrics](../hosted-collectors/http-source/logs-metrics/upload-metrics.md).

:::note
When unset, Telegraf will use the influx serializer by default which is currently unsupported in HTTP Source.
:::

| Data Format | Content-Type Header |
|:--|:--|
| [Graphite](http://graphite.readthedocs.io/en/latest/feeding-carbon.html#the-plaintext-protocol) | `application/vnd.sumologic.graphite` |
| [Carbon2](http://metrics20.org/implementations/) | `application/vnd.sumologic.carbon2`<br/>This is the default setting. |
| [Prometheus](https://github.com/prometheus/docs/blob/master/content/docs/instrumenting/exposition_formats.md) | `application/vnd.sumologic.prometheus`<br/>Sumo won't ingest Prometheus comments or malformed Prometheus metrics. For more information, see [Prometheus metrics not accepted by Sumo](../hosted-collectors/http-source/logs-metrics/upload-metrics.md#prometheus-metrics-not-accepted-by-sumo). |

**Timeout.** Set a timeout for the HTTP request.

```sql
timeout = "5s"
```

**Max request size.** Set the maximum HTTP request body size in bytes before compression. The default is 1mb (1000000). In some serializers, a metric serialized to multiple lines cannot be split further. Setting this option to a low amount may not work as expected.

```sql
max_request_body_size = 1000000
```

**Source name.** Set a desired source name to override the name configured for the source.

```sql
source_name = ""
```

**Host name.** Set a desired host name to override the host configured for the source.

```sql
source_category = ""
```

**Source category.** Set a desired source category to override the category configured for the source.

```sql
dimensions = ""
```

**Custom dimensions.** Set a comma-separated key=value list of dimensions to apply to every metric. These dimensions allow you to query metrics a more granular level.
