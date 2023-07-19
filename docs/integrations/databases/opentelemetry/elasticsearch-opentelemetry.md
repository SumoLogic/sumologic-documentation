---
id: elasticsearch-opentelemetry
title: Elasticsearch - OpenTelemetry Collector
sidebar_label: Elasticsearch - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry App for Elasticsearch.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/databases/elasticsearch.png')} alt="Thumbnail icon" width="50"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

The [Elasticsearch](https://www.elastic.co/what-is/elasticsearch) app is a unified logs and metrics app that helps you monitor the availability, performance, health, and resource utilization of your Elasticsearch clusters. Preconfigured dashboards provide insight into cluster health, resource utilization, sharding, garbage collection, and search, index, and cache performance.

We use the OpenTelemetry collector to collect Elasticsearch metrics and logs.

The diagram below illustrates the components of the Elasticsearch collection for each database server. OpenTelemetry collector runs on the same host as Elasticsearch, and uses the [Elasticsearch Receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/elasticsearchreceiver/) to obtain Elasticsearch metrics, and the [Sumo Logic OpenTelemetry Exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/sumologicexporter) to send the metrics to Sumo Logic. Elasticsearch logs are sent to Sumo Logic through a [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Elasticsearch-OpenTelemetry/Elasticsearch-Schematics.png' alt="Schematics" />

## Fields Create in Sumo Logic for Elasticsearch

Following are the [Fields](/docs/manage/fields/) which will be created as part of Elasticsearch App install, if not already present:

- `db.cluster.name`. User configured. Enter a name to identify this Elasticsearch cluster. This cluster name will be shown in the Sumo Logic dashboards.
- `db.system`. Has a fixed value of **elasticsearch**.
- `sumo.datasource`. Has a fixed value of **elasticsearch**.
- `db.node.name`. Has the value of host name of the machine which is being monitored.

### Prerequisites

This receiver supports Elasticsearch versions 7.9+.

If Elasticsearch security features are enabled, you must have either the monitor or manage cluster privilege. See the [Elasticsearch docs](https://www.elastic.co/guide/en/elasticsearch/reference/current/authorization.html) for more information on authorization and [Security privileges](https://www.elastic.co/guide/en/elasticsearch/reference/current/security-privileges.html).

**Configure logging in Elasticsearch**. Elasticsearch supports logging via local text log files. Elasticsearch logs have four levels of verbosity. To select a level, set `loglevel` to one of:

* debug: a lot of information, useful for development/testing
* verbose: includes information not often needed, but logs less than debug
* notice (default value): moderately verbose, ideal for production environments
* warning: only very important/critical messages are logged

All logging settings are located in [Elasticsearch.conf](https://www.elastic.co/guide/en/elasticsearch/reference/current/logging.html). By default, Elasticsearch logs are stored in `/var/log/elasticsearch/ELK-<Clustername>.log`. The default directory for log files is listed in the Elasticsearch.conf file.

## Collecting Logs, Metrics, and installing Elasticsearch app

As part of data collection setup and app installation, you can select the **Elasticsearch - OpenTelemetry** app from the **App Catalog** and click on **Install App**. Follow the steps below to configure the collection.

### Step 1: Set up Collector

{@import ../../../reuse/apps/opentelemetry/set-up-collector.md}

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Elasticsearch-OpenTelemetry/Elasticsearch-Collector.png' alt="Collector" />

### Step 2: Configure integration

In this step, you will configure the yaml required for Elasticsearch Collection.

Below are the inputs required:

- **Endpoint**. Enter the url of the server you need to monitor. Example: `http://localhost:9200`.
- **User Name**. Enter the Elasticsearch Username.
- **Elasticsearch cluster log path**. By default, Elasticsearch logs are stored in `/var/log/elasticsearch/ELK-<Clustername>.log`.
- **Tags**. `db.cluster.name`.

You can add any custom fields which you want to tag along with the data ingested in Sumo. Click on the **Download YAML File** button to get the yaml file.

For Linux platform, click on **Download Environment Variables File** button to get the file with the password which is supposed to be set as environment variable.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Elasticsearch-OpenTelemetry/ElasticSearch-YAML.png' alt="YAML" />

### Step 3: Send logs and metrics to Sumo

{@import ../../../reuse/apps/opentelemetry/send-logs-intro.md}

<Tabs
  className="unique-tabs"
  defaultValue="Linux"
  values={[
    {label: 'Linux', value: 'Linux'},
    {label: 'Windows', value: 'Windows'},
    {label: 'macOS', value: 'macOS'},
  ]}>

<TabItem value="Linux">

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the Elasticsearch instance which needs to be monitored.
2. Place Env file in the following directory:
  ```sh
  /etc/otelcol-sumo/env/
  ```
3. Testart the collector using:
  ```sh
  sudo systemctl restart otelcol-sumo
  ```

</TabItem>
<TabItem value="Windows">

1. Copy the yaml file to `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` folder in the machine which needs to be monitored.
2. Restart the collector using:
  ```sh
  Restart-Service -Name OtelcolSumo
  ```

</TabItem>
<TabItem value="macOS">

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the Elasticsearch instance which needs to be monitored.
2. Restart the otelcol-sumo process using: 
  ```sh
  otelcol-sumo --config /etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
  ```

</TabItem>
</Tabs>

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}

## Sample Log Messages

```json
{
   "type":"server",
   "timestamp":"2021-07-12T11:42:25,862+07:00",
   "level":"INFO",
   "component":"o.e.x.s.a.s.FileRolesStore",
   "cluster.name":"elasticsearch",
   "node.name":"v103-157-218-134.3stech.vn",
   "message":"parsed [0] roles from file [/etc/elasticsearch/roles.yml]"
}
```

## Sample OpenTelemetry metrics

```json
{
	"queryId":"A",
	"_source":"sumo_hosted_collector_otel_elasticsearch",
	"state":"completed",
	"thread_pool_name":"analyze",
	"elasticsearch.node.name":"ip-172-31-86-95",
	"elasticsearch.cluster.name":"elasticsearch",
	"metric":"elasticsearch.node.thread_pool.tasks.finished",
	"db.cluster.name":"elastic_otel_cluster",
	"_collectorId":"000000000C5B7100",
	"deployment.environment":"otel_elastic_dev",
	"_sourceId":"0000000000000000",
	"unit":"{tasks}",
	"db.system":"elasticsearch",
	"_sourceHost":"sumoOtelelasticsearch",
	"_collector":"sumo_hosted_collector_otel_elasticsearch",
	"max":0,
	"min":0,
	"avg":0,
	"sum":0,
	"latest":0,
	"count":2
}
```

## Sample Queries

### Logs

Sample log query from the **Errors** panel.

```sql
db.system=elasticsearch %"deployment.environment"={{deployment.environment}} db.cluster.name={{db.cluster.name}} ERROR | json "log" as _rawlog nodrop 
| if (isEmpty(_rawlog), _raw, _rawlog) as _raw
| json field=_raw "timestamp" as timestamp
| json field=_raw "level" as level
| json field=_raw "component" as es_component
| json field=_raw "message" as message
| where level = "ERROR"
| count
```

### Metrics

Metrics query from the **JVM Memory Used (MB)** panel.

```sql
deployment.environment=* metric=jvm.memory.heap.used db.cluster.name=* db.node.name=* | sum by db.cluster.name, db.node.name
```

## Viewing Elasticsearch Dashboards

### Overview

The **Elasticsearch - Overview** dashboard provides the health of Elasticsearch clusters, shards analysis, resource utilization of Elasticsearch host and clusters, search and indexing performance.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Elasticsearch-OpenTelemetry/Elasticsearch-Overview.png' alt="Overview" />

### Total Operations Stats

The **Elasticsearch - Total Operations stats** dashboard provides information on the operations of the Elasticsearch system.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Elasticsearch-OpenTelemetry/Elasticsearch-Total-Operations-Stats.png' alt="Total Operations Stats" />

### Thread Pool

The **Elasticsearch - Thread Pool** dashboard analyzes thread pools operations to manage memory consumption of nodes in the cluster.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Elasticsearch-OpenTelemetry/Elasticsearch-Thread-Pool.png' alt="Thread Pool" />

### Resource

The **Elasticsearch - Resource** dashboard monitors JVM Memory, Network, Disk, Network and CPU of Elasticsearch node.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Elasticsearch-OpenTelemetry/Elasticsearch-Resource.png' alt="Resource" />

### Performance Stats

The **Elasticsearch - Performance Stats** dashboard performance statistics such as latency and Translog operations and size.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Elasticsearch-OpenTelemetry/Elasticsearch-Performance-Stats.png' alt="Performance Stats" />

### Indices

The **Elasticsearch - Indices** dashboard monitors Index operations, size and latency. It also provides analytics on doc values, fields, fixed bitsets, and terms memory.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Elasticsearch-OpenTelemetry/Elasticsearch-Indices.png' alt="Indices" />

### Documents

The **Elasticsearch - Documents** dashboard provides analytics and monitoring on Elasticsearch documents.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Elasticsearch-OpenTelemetry/Elasticsearch-Documents.png' alt="Documents" />

### Caches

The **Elasticsearch - Caches** dashboard allows you to monitor query cache size, evictions and field data memory size.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Elasticsearch-OpenTelemetry/Elasticsearch-Caches.png' alt="Caches" />

### Errors And Warnings

The **Elasticsearch - Errors And Warnings** dashboard shows errors and warnings by Elasticsearch components.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Elasticsearch-OpenTelemetry/Elasticsearch-Errors-And-Warnings.png' alt="Errors And Warnings" />

### Garbage Collection

The **Elasticsearch - Garbage Collector** dashboard provides information on the garbage collection of the Java Virtual Machine.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Elasticsearch-OpenTelemetry/Elasticsearch-Garbage-Collection.png' alt="Garbage Collection" />

### Login And Connections

The **Elasticsearch - Login And Connections** dashboard shows geo location of client connection requests, failed connection logins and count of failed login attempts.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Elasticsearch-OpenTelemetry/Elasticsearch-Login-And-Connections.png' alt="Login And Connections" />

### Operations

The **Elasticsearch - Operations** dashboard allows you to monitor server stats and events such as node up/down, index creation/deletion. It also provides disk usage and cluster health status.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Elasticsearch-OpenTelemetry/Elasticsearch-Operations.png' alt="Operations" />

### Queries

The **Elasticsearch - Queries** dashboard shows Elasticsearch provides analytics on slow queries, and query shards.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Elasticsearch-OpenTelemetry/Elasticsearch-Queries.png' alt="Resource Usage" />
