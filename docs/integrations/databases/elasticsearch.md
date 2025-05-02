---
id: elasticsearch
title: Elasticsearch - Classic Collector
sidebar_label: Elasticsearch
description: The Elasticsearch app helps you monitor the availability, performance, health, and resource utilization of your Elasticsearch clusters.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/databases/elasticsearch.png')} alt="Thumbnail icon" width="50"/>

The Elasticsearch app is a unified logs and metrics app that helps you monitor the availability, performance, health, and resource utilization of your Elasticsearch clusters. Preconfigured dashboards provide insight into cluster health, resource utilization, sharding, garbage collection, and search, index, and cache performance.

## Sample log messages

<Tabs
  groupId="k8s-nonk8s"
  defaultValue="k8s"
  values={[
    {label: 'Kubernetes environments', value: 'k8s'},
    {label: 'Non-Kubernetes environments', value: 'non-k8s'},
  ]}>

<TabItem value="k8s">

```json
{
	"type":"server",
	"timestamp":"2021-07-12T05:12:07,101+0000",
	"level":"WARN",
	"component":"o.e.c.NodeConnectionsService",
	"cluster.name":"elasticsearch",
	"node.name":"elasticsearch-master-0",
	"cluster.uuid":"pQ372ZkIQiaHkSVp6hlxZw",
	"node.id":"7PdqQlHYRjqbzClkTeoVdA",
	"message":"failed to connect to {elasticsearch-master-1}{OfUoMAwoRoKr2sAlYAYuEA}{RnYfI0DUT9uqtF4h5aVDQg}{10.42.1.143}{10.42.1.143:9300}{dim}{ml.machine_memory=2147483648, ml.max_open_jobs=20, xpack.installed=true} (tried [1] times)"
}
```

</TabItem>
<TabItem value="non-k8s">

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

</TabItem>
</Tabs>


## Collecting logs and metrics for the Elasticsearch app

Configuring log and metric collection for the Elasticsearch app includes the following tasks.


### Configure Collection for Elasticsearch

<Tabs
  groupId="k8s-nonk8s"
  defaultValue="k8s"
  values={[
    {label: 'Kubernetes environments', value: 'k8s'},
    {label: 'Non-Kubernetes environments', value: 'non-k8s'},
  ]}>

<TabItem value="k8s">

In Kubernetes environments, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more about it [here](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/telegraf-collection-architecture). The diagram below illustrates how data is collected from Elasticsearch in a Kubernetes environment. Four services in the architecture shown below make up the metric collection pipeline: Telegraf, Telegraf Operator, Prometheus, and [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector).

<br/><img src={useBaseUrl('img/integrations/databases/elasticsearchk8s.png')} alt="elasticsearch" />

The first service in the metrics pipeline is Telegraf. Telegraf collects metrics from Elasticsearch. Note that we’re running Telegraf in each pod we want to collect metrics from as a sidecar deployment, for example, Telegraf runs in the same pod as the containers it monitors. Telegraf uses the Elasticsearch input plugin to obtain metrics. For simplicity, the diagram doesn’t show the input plugins. The injection of the Telegraf sidecar container is done by the Telegraf Operator.
Prometheus pulls metrics from Telegraf and sends them to [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector) which enriches metadata and sends metrics to Sumo Logic.

In the logs pipeline, Sumo Logic Distribution for OpenTelemetry Collector collects logs written to standard out and forwards them to another instance of Sumo Logic Distribution for OpenTelemetry Collector, which enriches metadata and sends logs to Sumo Logic.

Follow the below instructions to set up the logs and metric collection:

:::note prerequisites
It’s assumed that you are using the latest helm chart version. If not, upgrade using the instructions [here](/docs/send-data/kubernetes).
:::

#### Configure Logs Collection

This section explains the steps to collect Elasticsearch logs from a Kubernetes environment.

1. **(Recommended Method) Add labels on your Elasticsearch pods to capture logs from standard output on Kubernetes**.
   1. Apply the following labels to the Elasticsearch pods:
    ```sh
    environment = "dev_CHANGE_ME"
    component = "database"
    db_system = "elasticsearch"
    db_cluster = "elasticsearch_on_k8s_CHANGE_ME"
    db_cluster_address = `ENV_TO_BE_CHANGED`
    db_cluster_port = `ENV_TO_BE_CHANGED`
    ```
   2. Enter in values for the following parameters (marked `ENV_TO_BE_CHANGED` above):
    * `environment`. This is the deployment environment where the Elasticsearch cluster identified by the value of **servers** resides. For example, dev, prod, or QA. While this value is optional we highly recommend setting it.
    * `db_cluster`. Enter a name to identify this Elasticsearch cluster. This cluster name will be shown in the Sumo Logic dashboards.
    * `db_cluster_address` - Enter the cluster hostname or ip address that is used by the application to connect to the database. It could also be the load balancer or proxy endpoint.
    * `db_cluster_port` - Enter the database port. If not provided, a default port will be used.

    :::note
    `db_cluster_address` and `db_cluster_port` should reflect the exact configuration of DB client configuration in your application, especially if you instrument it with OT tracing. The values of these fields should match exactly the connection string used by the database client (reported as values for `net.peer.name` and `net.peer.port` metadata fields).
    For example, if your application uses “elasticsearch-prod.sumologic.com:3306” as the connection string, the field values should be set as follows: `db_cluster_address=elasticsearch-prod.sumologic.com db_cluster_port=3306`. If your application connects directly to a given elasticsearch node, rather than the whole cluster, use the application connection string to override the value of the “host” field in the Telegraf configuration: `host=elasticsearch-prod.sumologic.com`. Pivoting to Tracing data from Entity Inspector is possible only for “Elasticsearch address” Entities.
    :::
    * **Do not modify the following values** as they will cause the Sumo Logic apps to not function correctly.
      * `component: “database”` - This value is used by Sumo Logic apps to identify application components.
      * `db_system: “elasticsearch”`- This value identifies the database system.
    * See [this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf#configuring-telegraf) for more parameters that can be configured in the Telegraf agent globally.
   3. The Sumologic-Kubernetes-Collection will automatically capture the logs from stdout and will send the logs to Sumologic. For more information on deploying Sumologic-Kubernetes-Collection, [visit here](/docs/integrations/containers-orchestration/kubernetes#collecting-metrics-and-logs-for-the-kubernetes-app).
   4. Verify logs in Sumo Logic.
2. **(Optional) Collecting Elasticsearch Logs from a Log File**. Follow the steps below to capture Elasticsearch logs from a log file on Kubernetes.
   1. Determine the location of the Elasticsearch log file on Kubernetes. This can be determined from the log4j.properties for your Elasticsearch cluster along with the mounts on the Elasticsearch pods.
   2. Install the Sumo Logic [tailing sidecar operator](https://github.com/SumoLogic/tailing-sidecar/tree/main/operator#deploy-tailing-sidecar-operator).
   3. Add the following annotation in addition to the existing annotations.
    ```xml
    annotations:
       tailing-sidecar: sidecarconfig;<mount>:<path_of_Elasticsearch_log_file>/<Elasticsearch_log_file_name>
    ```
    Example:
    ```bash
    annotations:
      tailing-sidecar: sidecarconfig;data:/usr/share/elasticsearch/logs/gc.log
    ```
   4. Make sure that the Elasticsearch pods are running and annotations are applied by using the command:
    ```bash
    kubectl describe pod <Elasticsearch_pod_name>
    ```
   5. Sumo Logic Kubernetes collection will automatically start collecting logs from the pods having the annotations defined above.
   6. Verify logs in Sumo Logic.
3. **Add a FER to normalize the fields in Kubernetes environments**. This step is not needed if using application components solution terraform script. Labels created in Kubernetes environments automatically are prefixed with `pod_labels`. To normalize these for our app to work, we need to create a Field Extraction Rule if not already created for Database Application Components. To do so:
   1. [**Classic UI**](/docs/get-started/sumo-logic-ui-classic). In the main Sumo Logic menu, select **Manage Data > Logs > Field Extraction Rules**. <br/>[**New UI**](/docs/get-started/sumo-logic-ui). In the top menu select **Configuration**, and then under **Logs** select **Field Extraction Rules**. You can also click the **Go To...** menu at the top of the screen and select **Field Extraction Rules**.  
   2. Click the + Add button on the top right of the table.
   3. The **Add Field Extraction Rule** form will appear:
   4. Enter the following options:
     * **Rule Name**. Enter the name as **App Observability - Database**.
     * **Applied At.** Choose **Ingest Time**
     * **Scope**. Select **Specific Data**
     * **Scope**: Enter the following keyword search expression:  
     ```sql
     pod_labels_environment=* pod_labels_component=database pod_labels_db_system=* pod_labels_db_cluster=*
     ```
     * **Parse Expression**.Enter the following parse expression:
   ```sql
   if (!isEmpty(pod_labels_environment), pod_labels_environment, "") as environment
       | pod_labels_component as component
       | pod_labels_db_system as db_system
       | if (!isEmpty(pod_labels_db_cluster), pod_labels_db_cluster, null) as db_cluster
   ```
   5. Click **Save** to create the rule.


#### Configure Metrics Collection

This section explains the steps to collect Elasticsearch metrics from a Kubernetes environment, where we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more about this [here](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/telegraf-collection-architecture). Follow the steps listed below to collect metrics from a Kubernetes environment:

1. [Set up Kubernetes Collection with the Telegraf Operator](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf).
2. On your Elasticsearch Pods, add the following annotations:
```sql
 annotations:
    telegraf.influxdata.com/class: sumologic-prometheus
    prometheus.io/scrape: "true"
    prometheus.io/port: "9273"
    telegraf.influxdata.com/inputs: |+

  servers = ["http://<USER_CHANGE_ME>:<PASS_CHANGE_ME>@localhost:9200"]
  http_timeout = "5s"
  local = true
  cluster_health = true
  cluster_stats = true
  cluster_stats_only_from_master = false
  indices_include = ["_all"]
  indices_level = "cluster"
  [inputs.elasticsearch.tags]
    environment = "ENV_TO_BE_CHANGED"
    component = "database"
    db_system = "elasticsearch"
    db_cluster = "ENV_TO_BE_CHANGED"
    db_cluster_address = `ENV_TO_BE_CHANGED`
    db_cluster_port = `ENV_TO_BE_CHANGED`
```
3. Enter in values for the following parameters (marked ENV_TO_BE_CHANGED above):
   * `telegraf.influxdata.com/inputs`. This contains the required configuration for the Telegraf Elasticsearch Input plugin. Please refer [to this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/redis) for more information on configuring the Elasticsearch input plugin for Telegraf. Note: As telegraf will be run as a sidecar the host should always be localhost.
   * In the input plugins section, that is `[[inputs.elasticsearch]]`:
      * `servers` - The URL to the Elasticsearch server. This can be a comma-separated list to connect to multiple Elasticsearch servers. Please see [this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/jolokia2) for more information on additional parameters for configuring the Elasticsearch input plugin for Telegraf.
   * In the tags section, which is `[inputs.elasticsearch]`
     * `environment`. This is the deployment environment where the Elasticsearch cluster identified by the value of **servers** resides. For example dev, prod, or QA. While this value is optional we highly recommend setting it.
     * `db_cluster`. Enter a name to identify this Elasticsearch cluster. This cluster name will be shown in the Sumo Logic dashboards.
     * `db_cluster_address` - Enter the cluster hostname or ip address that is used by the application to connect to the database. It could also be the load balancer or proxy endpoint.
     * `db_cluster_port` - Enter the database port. If not provided, a default port will be used.

     :::note
     `db_cluster_address` and `db_cluster_port` should reflect exact configuration of DB client configuration in your application, especially if you instrument it with OT tracing. The values of these fields should match exactly the connection string used by the database client (reported as values for net.peer.name and net.peer.port metadata fields).

     For example, if your application uses “elasticsearch-prod.sumologic.com:3306” as the connection string, the field values should be set as follows: `db_cluster_address=elasticsearch-prod.sumologic.com db_cluster_port=3306`

     If your application connects directly to a given elasticsearch node, rather than the whole cluster, use the application connection string to override the value of the `“host”` field in the Telegraf configuration: `host=elasticsearch-prod.sumologic.com`

     Pivoting to Tracing data from Entity Inspector is possible only for “Elasticsearch address” Entities.
     :::
   * **Do not modify the following values** as it will cause the Sumo Logic app to not function correctly.
     * `telegraf.influxdata.com/class: sumologic-prometheus`. This instructs the Telegraf operator what output to use. This should not be changed.
     * `prometheus.io/scrape: "true"`. This ensures our Prometheus will scrape the metrics.
     * `prometheus.io/port: "9273"`. This tells prometheus what ports to scrape on. This should not be changed.
     * `telegraf.influxdata.com/inputs`
     * In the tags section   `[inputs.elasticsearch.tags]`
        * `component: “database”` - This value is used by Sumo Logic apps to identify application components.
        * `db_system: “elasticsearch”` - This value identifies the database system.
     * See [this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf#configuring-telegraf) for more parameters that can be configured in the Telegraf agent globally.
4. Sumo Logic Kubernetes collection will automatically start collecting metrics from the pods having the labels and annotations defined in the previous step.
5. Verify metrics in Sumo Logic.


</TabItem>
<TabItem value="non-k8s">

For non-Kubernetes environments, we use the Telegraf operator for Elasticsearch metric collection and Sumo Logic Installed Collector for collecting Elasticsearch logs. The diagram below illustrates the components of the Elasticsearch collection in a non-Kubernetes environment. Telegraf runs on the same system as Elasticsearch to obtain Elasticsearch metrics. The Sumo Logic output plugin to send the metrics to Sumo Logic. Logs from Elasticsearch on the other hand are sent to a Sumo Logic Local File source.<br/><img src={useBaseUrl('img/integrations/databases/elasticsearchnonk8s.png')} alt="elasticsearch" />

This section provides instructions for configuring logs and metrics collection for the Sumo Logic app for Elasticsearch.

#### Configure Metrics Collection

1. **Configure a Hosted Collector**. To create a new Sumo Logic hosted collector, perform the steps in the[Create a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector) section of the Sumo Logic documentation.
2. Configure an HTTP Logs and Metrics Source. Create a new HTTP Logs and Metrics Source in the hosted collector created above by following[ these instructions. ](/docs/send-data/hosted-collectors/http-source/logs-metrics). Make a note of the **HTTP Source URL**.
3. **Install Telegraf**. Use the [ following steps](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf.md) to install Telegraf.
4. **Configure and start Telegraf**. As part of collecting metrics data from Telegraf, we will use the [elasticsearch input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/elasticsearch) to get data from Telegraf and the [Sumo Logic output plugin](https://github.com/SumoLogic/fluentd-output-sumologic) to send data to Sumo Logic. Create or modify **telegraf.conf** and copy and paste the text below:
```sql
[[inputs.elasticsearch]]
  servers = ["http://<USER_CHANGE_ME>:<PASS_CHANGE_ME>@localhost:9200"]
  http_timeout = "5s"
  local = true
  cluster_health = true
  cluster_stats = true
  cluster_stats_only_from_master = true
  indices_include = ["_all"]
  indices_level = "cluster"
  node_stats = ["indices", "os", "process", "jvm", "thread_pool", "fs", "transport", "http"]
  [inputs.elasticsearch.tags]
    environment ="ENV_TO_BE_CHANGED"
    component ="database"
    db_system ="elasticsearch"
    db_cluster ="ENV_TO_BE_CHANGED"
    db_cluster_address = `ENV_TO_BE_CHANGED`
    db_cluster_port = `ENV_TO_BE_CHANGED`
[[outputs.sumologic]]
  url = "<URL Created in Step 3_CHANGEME>"
  data_format = "prometheus"
```
5. Please enter values for the following parameters (marked `ENV_TO_BE_CHANGED` above):
  * In the input plugins section, that is `[[inputs.elasticsearch]]`:
     * `servers` - The URL to the elasticsearch server. Please see [this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/elasticsearch) for more information on additional parameters for configuring the Elasticsearch input plugin for Telegraf.
     * In the tags section (`[inputs.Elasticsearch.tags]`):
        * `environment`. This is the deployment environment where the Elasticsearch cluster identified by the value of **servers** resides. For example dev, prod, or QA. While this value is optional we highly recommend setting it.
        * `db_cluster`. Enter a name to identify this Elasticsearch cluster. This cluster name will be shown in the Sumo Logic dashboards.
        * `db_cluster_address` - Enter the cluster hostname or ip address that is used by the application to connect to the database. It could also be the load balancer or proxy endpoint.
        * `db_cluster_port` - Enter the database port. If not provided, a default port will be used.
        :::note
        `db_cluster_address` and `db_cluster_port` should reflect exact configuration of DB client configuration in your application, especially if you instrument it with OT tracing. The values of these fields should match exactly the connection string used by the database client (reported as values for `net.peer.name` and `net.peer.port` metadata fields).

        For example, if your application uses “elasticsearch-prod.sumologic.com:3306” as the connection string, the field values should be set as follows: `db_cluster_address=elasticsearch-prod.sumologic.com db_cluster_port=3306`.

        If your application connects directly to a given elasticsearch node, rather than the whole cluster, use the application connection string to override the value of the “host” field in the Telegraf configuration: `host=elasticsearch-prod.sumologic.com`.

        Pivoting to Tracing data from Entity Inspector is possible only for “Elasticsearch address” Entities.
        :::
     * In the output plugins section (`[[outputs.sumologic]]`):
       * `url` - This is the HTTP source URL created in step 3. Please see [this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/configure-telegraf-output-plugin.md) for more information on additional parameters for configuring the Sumo Logic Telegraf output plugin.
   * Here’s an explanation for additional values set by this Telegraf configuration. If you haven’t defined a cluster in Elasticsearch, then enter `default` for `db_cluster`. There are additional values set by the Telegraf configuration, which we recommend not to modify these values as they might cause the Sumo Logic app to not function correctly.
     * `data_format - “prometheus”` In the output plugins section (`[[outputs.sumologic]]`), metrics are sent in the Prometheus format to Sumo Logic
     * `component: “database”` - In the input plugins section (`[[inputs.Elasticsearch]]`), this value is used by Sumo Logic apps to identify application components.
     * See [this doc](https://github.com/influxdata/telegraf/blob/master/etc/logrotate.d/telegraf) for more parameters that can be configured in the Telegraf agent globally.
6. After you've finalized your telegraf.conf file, you can start or reload the telegraf service using instructions from the [doc](https://docs.influxdata.com/telegraf/v1.17/introduction/getting-started/#start-telegraf-service).

At this point, Elasticsearch metrics should start flowing into Sumo Logic.

<br/>

#### Configure Logs Collection

This section provides instructions for configuring log collection for Sumo Logic app for Elasticsearch, running on a non-Kubernetes environment. By default, Elasticsearch logs are stored in a log file. Local log files can be collected via [Installed collectors](/docs/send-data/installed-collectors). The installed collector will require you to allow outbound traffic to [Sumo Logic endpoints](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) for collection to work. For detailed requirements for Installed collectors, see [this page](/docs/get-started/system-requirements#installed-collector-requirements).

1. **Configure logging in Elasticsearch**. Elasticsearch supports logging via local text log files. Elasticsearch logs have four levels of verbosity. To select a level, set loglevel to one of:
   * `debug`: a lot of information, useful for development/testing
   * `verbose`: includes information not often needed, but logs less than debug
   * `notice` (default value): moderately verbose, ideal for production environments
   * `warning`: only very important/critical messages are logged

  All logging settings are located in [Elasticsearch.conf](https://www.elastic.co/guide/en/elasticsearch/reference/current/logging.html). By default, Elasticsearch logs are stored in `/var/log/elasticsearch/ELK-<Clustername>.log`. The default directory for log files is listed in the Elasticsearch.conf file. Logs from the Elasticsearch log file can be collected via a Sumo Logic [Installed collector](/docs/send-data/installed-collectors) and a [Local File Source](/docs/send-data/installed-collectors/sources/local-file-source) as explained in the next section.
2. **Configure an Installed Collector**. To collect logs directly from the Elasticsearch machine, configure an [Installed Collector](/docs/send-data/installed-collectors) and a Local File Source.
3. Configure a [Local File Source](/docs/send-data/installed-collectors/sources/local-file-source), editing the fields as follows:
   * **Name.** (Required)
   * **Description.** (Optional)
   * **File Path (Required).** Enter the path to your error.log or access.log. The files are typically located in `/var/log/elasticsearch/elasticsearch-<clustername>.log`. If you're using a customized path, check the Elasticsearch.conf file for this information.
   * **Source Host.** Sumo Logic uses the hostname assigned by the OS unless you enter a different hostname
   * **Source Category.** Enter any string to tag the output collected from this Source, such as **elasticsearch/Logs**. (The Source Category metadata field is a fundamental building block to organize and label Sources. For details, see[ Best Practices](/docs/send-data/best-practices).)
   * **Fields. Set the following fields:**
      * `component = database`
      * `db_system = elasticsearch`
      * `db_cluster = <Your_Elasticsearch_Cluster_Name>`
      * `environment = <Environment_Name>`, such as Dev, QA or Prod.
      * `db_cluster_address` - Enter the cluster hostname or ip address that is used by the application to connect to the database. It could also be the load balancer or proxy endpoint.
      * `db_cluster_port` - Enter the database port. If not provided, a default port will be used
      :::note
      `db_cluster_address` and `db_cluster_port` should reflect exact configuration of DB client configuration in your application, especially if you instrument it with OT tracing. The values of these fields should match exactly the connection string used by the database client (reported as values for `net.peer.name` and `net.peer.port` metadata fields).

      For example, if your application uses “elasticsearch-prod.sumologic.com:3306” as the connection string, the field values should be set as follows: `db_cluster_address=elasticsearch-prod.sumologic.com db_cluster_port=3306`

      If your application connects directly to a given elasticsearch node, rather than the whole cluster, use the application connection string to override the value of the “host” field in the Telegraf configuration: `host=elasticsearch-prod.sumologic.com`

      Pivoting to Tracing data from Entity Inspector is possible only for “Elasticsearch address” Entities.
      :::
4. Configure the **Advanced** section:
   * **Enable Timestamp Parsing.** Select Extract timestamp information from log file entries.
   * **Time Zone.** Choose the option, **Ignore time zone from the log file and instead use**, and then select your Elasticsearch Server’s time zone.
   * **Timestamp Format.** The timestamp format is automatically detected.
   * **Encoding.** Select UTF-8 (Default).
   * **Enable Multiline Processing.** Detect messages spanning multiple lines
   * Infer Boundaries - Detect message boundaries automatically
5. Click **Save**.

At this point, Elasticsearch logs should start flowing into Sumo Logic.

</TabItem>
</Tabs>


## Installing the Elasticsearch app

import AppInstall2 from '../../reuse/apps/app-install-only-k8s.md';

<AppInstall2 />

As part of the app installation process, the following fields will be created by default:
* `component`
* `environment`
* `db_system`
* `db_cluster`
* `pod`
* `db_cluster_address`
* `db_cluster_port`

Additionally, if you're using Elasticsearch in the Kubernetes environment, the following additional fields will be created by default during the app installation process:
* `pod_labels_component`
* `pod_labels_environment`
* `pod_labels_db_system`
* `pod_labels_db_cluster`
* `pod_labels_db_cluster_address`
* `pod_labels_db_cluster_port`

For information on setting up fields, see [Fields](/docs/manage/fields).

## Viewing Elasticsearch dashboards

import ViewDashboards from '../../reuse/apps/view-dashboards.md';

<ViewDashboards/>

### Overview

The **Elasticsearch - Overview** dashboard provides the health of Elasticsearch clusters, shards analysis, resource utilization of Elasticsearch host & clusters, search and indexing performance.

<img src={useBaseUrl('img/integrations/databases/Elasticsearch-Overview.png')} alt="elasticsearch dashboards" />

### Total Operations Stats

The **Elasticsearch - Total Operations Stats** dashboard provides information on the operations of the Elasticsearch system.

<img src={useBaseUrl('img/integrations/databases/ElasticSearch-Total.png')} alt="elasticsearch dashboards" />

### Thread Pool

The **Elasticsearch- Thread Pool** dashboard analyzes thread pools operations to manage memory consumption of nodes in the cluster.

<img src={useBaseUrl('img/integrations/databases/ElasticSearch-thread.png')} alt="elasticsearch dashboards" />

### Resource

The **Elasticsearch - Resource** dashboard monitors JVM Memory, Network, Disk, Network and CPU of Elasticsearch node.

<img src={useBaseUrl('img/integrations/databases/ElasticSearch-resource.png')} alt="elasticsearch dashboards" />

### Performance Stats

The **Elasticsearch - Performance Stats** dashboard performance statistics such as latency and Translog operations and size.

<img src={useBaseUrl('img/integrations/databases/ElasticSearch-perf.png')} alt="elasticsearch dashboards" />

### Indices

The **Elasticsearch - Indices** dashboard monitors Index operations, size and latency. It also provides analytics on doc values, fields, fixed bitsets, and terms memory.

<img src={useBaseUrl('img/integrations/databases/elasticsearch-ind.png')} alt="elasticsearch dashboards" />

### Documents

The **Elasticsearch - Documents** dashboard provides analytics and monitoring on Elasticsearch documents.

<img src={useBaseUrl('img/integrations/databases/elasticsearch-doc.png')} alt="elasticsearch dashboards" />

### Caches

The **Elasticsearch - Caches** dashboard allows you to monitor query cache size, evictions and field data memory size.

<img src={useBaseUrl('img/integrations/databases/elasticsearch-cache.png')} alt="elasticsearch dashboards" />

### Errors And Warnings

The **ElasticSearch - Errors And Warnings** dashboard shows errors and warnings by Elasticsearch components.

<img src={useBaseUrl('img/integrations/databases/elasticsearch-err.png')} alt="elasticsearch dashboards" />

### Garbage Collection

The **Elasticsearch - Garbage Collection** dashboard provides information on the garbage collection of the Java Virtual Machine.

<img src={useBaseUrl('img/integrations/databases/elasticsearch-garbage.png')} alt="elasticsearch dashboards" />

### Login And Connections

The **ElasticSearch - Login And Connections** dashboard shows geo location of client connection requests, failed connection logins and count of failed login attempts.

<img src={useBaseUrl('img/integrations/databases/elasticsearch-login.png')} alt="elasticsearch dashboards" />

### Operations

The **Elasticsearch - Operations** dashboard allows you to monitor server stats and events such as node up/down, index creation/deletion. It also provides disk usage and cluster health status.

<img src={useBaseUrl('img/integrations/databases/elasticsearch-ops.png')} alt="elasticsearch dashboards" />

### Queries

The **ElasticSearch - Queries** dashboard shows Elasticsearch provides analytics on slow queries, and query shards.

<img src={useBaseUrl('img/integrations/databases/elasticsearch-q.png')} alt="elasticsearch dashboards" />

## Create monitors for Elasticsearch app

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

### Elasticsearch Alerts

| Alert Type (Metrics/Logs) | Alert Name | Alert Description | Trigger Type (Critical / Warning) | Alert Condition | Recover Condition |
|---|---|---|---|---|---|
| Metrics | Elasticsearch - Cluster Red | This alert fires when Elasticsearch Cluster status is RED | Critical | `>=`3 | `<`3 |
| Metrics | Elasticsearch - Cluster Yellow | This alert fires when Elasticsearch Cluster status is YELLOW | Warning | `>=`2 | `<`2 |
| Metrics | Elasticsearch - Disk Out of Space | This alert fires when the disk usage is over 90% | Critical | >90 | < =90 |
| Metrics | Elasticsearch - Disk Space Low | This alert fires when the disk usage is over 80% | Warning | >80 | < = 80 |
| Metrics | Elasticsearch - Healthy Data Nodes | This alert fires when there missing data node in Elasticsearch cluster | Critical | `<`3 | `>=`3 |
| Metrics | Elasticsearch - Healthy Nodes | This alert fires when there is missing node in Elasticsearch cluster | Critical | `<`3 | `>=`3 |
| Metrics | Elasticsearch - Heap Usage Too High | This alert fires when the heap usage is over 90% | Critical | >90 | < =90 |
| Metrics | Elasticsearch - Heap Usage Warning | This alert fires when the heap usage is over 80% | Warning | >80 | < =80 |
| Metrics | Elasticsearch - Initializing Shards Too Long | This alert fires when elasticsearch has been initializing shards for 5 min | Warning | >0 | < =0 |
| Metrics | Elasticsearch - Pending Tasks | This alert fires when elasticsearch has pending tasks. | Warning | >0 | < =0 |
| Metrics | Elasticsearch - Relocating Shards Too Long | This alert fires when elasticsearch has been relocating shards for 5min | Warning | >0 | < =0 |
| Metrics | Elasticsearch - Unassigned Shards | This alert fires when Elasticsearch has unassigned shards | Critical | >0 | < =0 |
| Logs | Elasticsearch - Query Time Too Slow | This alert fires when queries are slow to execute | Critical | >0 | < =0 |
| Logs | Elasticsearch - Query Time Slow | This alert fires when query time is greater than 5 ms | Warning | >0 | < =0 |
| Logs | Elasticsearch - Too Many Slow Query | This alert fires when there aret oo Many Slow Query in 5 minutes | Warning | >100 | < =100 |
| Logs | Elasticsearch - Error Log Too Many | Error Log Too Many | Critical | >1000 | < =1000 |
