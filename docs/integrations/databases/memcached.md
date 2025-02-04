---
id: memcached
title: Memcached - Classic Collector
sidebar_label: Memcached
description: The Memcached app is a unified logs and metrics app that helps you monitor the availability, performance, health, and resource utilization of your Memcached clusters.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/databases/memcached.png')} alt="Thumbnail icon" width="50"/>

The Memcached app is a unified logs and metrics app that helps you monitor the availability, performance, health, and resource utilization of your Memcached clusters. Preconfigured dashboards provide insight into uptime, operational metrics, cache performance, resource utilization, errors, warnings, and commands executed.

The Sumo Logic app for Memcached is tested for Version: 1.4.15.

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
	"timestamp":1626248704386,
	"log":"28: going from conn_closing to conn_closed",
	"stream":"stderr",
	"time":"2021-07-14T07:45:01.839243101Z"
}
```

</TabItem>
<TabItem value="non-k8s">

```json
Jun 23 07:35:01 node03 memcached: \
<31 set GFcIh47CswfCnwk3JkmJ 0 0 4096
```

</TabItem>
</Tabs>


## Collecting logs and metrics for Memcached

Configuring log and metric collection for the Memcached app includes the following tasks.

### Step 1: Configure fields in Sumo Logic

As part of the app installation process, the following fields will created by default:
* `component`
* `environment`
* `db_system`
* `db_cluster`
* `pod`

Additionally, if you are using Memcached in the Kubernetes environment, the following additional fields will be created by default during the app installation process:
* `pod_labels_component`
* `pod_labels_environment`
* `pod_labels_db_system`
* `pod_labels_db_cluster`

For information on setting up fields, see [Fields](/docs/manage/fields).

### Step 2: Configure Logs and Metrics Collection for Memcached

<Tabs
  groupId="k8s-nonk8s"
  defaultValue="k8s"
  values={[
    {label: 'Kubernetes environments', value: 'k8s'},
    {label: 'Non-Kubernetes environments', value: 'non-k8s'},
  ]}>

<TabItem value="k8s">

In Kubernetes environments, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more about it [here](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/telegraf-collection-architecture).

The diagram below illustrates how data is collected from Memcached in a Kubernetes environment. In the architecture shown below, there are four services that make up the metric collection pipeline: Telegraf, Telegraf Operator, Prometheus, and [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector).

<img src={useBaseUrl('img/integrations/databases/memcachedk8s.png')} alt="memcached"/>

The first service in the metrics pipeline is Telegraf. Telegraf collects metrics from Memcached. Note that we’re running Telegraf in each pod we want to collect metrics from as a sidecar deployment, for example, Telegraf runs in the same pod as the containers it monitors. Telegraf uses the [Memcached input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/memcached#configuration) to obtain metrics. (For simplicity, the diagram doesn’t show the input plugins.) The injection of the Telegraf sidecar container is done by the Telegraf Operator.
Prometheus pulls metrics from Telegraf and sends them to [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector) which enriches metadata and sends metrics to Sumo Logic.

In the logs pipeline, Sumo Logic Distribution for OpenTelemetry Collector collects logs written to standard out and forwards them to another instance of Sumo Logic Distribution for OpenTelemetry Collector, which enriches metadata and sends logs to Sumo Logic.

:::note Prerequisites
It’s assumed that you are using the latest helm chart version. If not, upgrade using the instructions [here](/docs/send-data/kubernetes).
:::

#### Configure Metrics Collection

Follow the steps listed below to collect Memcached metrics from a Kubernetes environment.

1. [Set up Kubernetes Collection with the Telegraf Operator.](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf)
2. On your Memcached Pods, add the following annotations:
```sql
 annotations:
    telegraf.influxdata.com/class: sumologic-prometheus
    prometheus.io/scrape: "true"
    prometheus.io/port: "9273"
    telegraf.influxdata.com/inputs: |+
  servers = ["localhost:11211"]
  [inputs.memcached.tags]
    environment ="dev_ENV_TO_BE_CHANGED"
    component ="database"
    db_system ="memcached"
    db_cluster ="memcached_on_k8s_ENV_TO_BE_CHANGED"
    db_cluster_address = "ENV_TO_BE_CHANGED"
    db_cluster_port = "ENV_TO_BE_CHANGED"
```

3. Enter in values for the following parameters (marked `ENV_TO_BE_CHANGED` above):
   * `telegraf.influxdata.com/inputs`. This contains the required configuration for the Telegraf Memcached Input plugin. Please refer[ to this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/redis) for more information on configuring the Memcached input plugin for Telegraf. Note: As telegraf will be run as a sidecar the host should always be localhost.
   * In the input plugins section (`[[inputs.memcached]]`):
      * `servers`. An array of addresses to gather stats about. Specify an IP on the hostname. Please see [this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/memcached) for more information on additional parameters for configuring the Memcached input plugin for Telegraf.
   * In the tags section (`[inputs.memcached.tags]`):
      * `environment`. This is the deployment environment where the Memcached cluster identified by the value of servers resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
      * `db_cluster`. Enter a name to identify this Memcached cluster. This cluster name will be shown in the Sumo Logic dashboards.
      * `db_cluster_address`. Enter the cluster hostname or ip address that is used by the application to connect to the database. It could also be the load balancer or proxy endpoint.
      * `db_cluster_port`. Enter the database port. If not provided, a default port will be used.
:::note
`db_cluster_address` and `db_cluster_port` should reflect the exact configuration of DB client configuration in your application, especially if you instrument it with OT tracing. The values of these fields should match exactly the connection string used by the database client (reported as values for net.peer.name and net.peer.port metadata fields).

For example, if your application uses “memcached-prod.sumologic.com:3306” as the connection string, the field values should be set as follows: `db_cluster_address=memcached-prod.sumologic.com db_cluster_port=3306`.

If your application connects directly to a given Memcached node, rather than the whole cluster, use the application connection string to override the value of the “host” field in the Telegraf configuration: `host=memcached-prod.sumologic.com`

Pivoting to Tracing data from Entity Inspector is possible only for “Memcached address” Entities.
:::
   * **Do not modify** the following values set by this configuration as it will cause the Sumo Logic app to not function correctly.
     * `telegraf.influxdata.com/class: sumologic-prometheus`. This instructs the Telegraf operator what output to use. This should not be changed.
     * `prometheus.io/scrape: "true"`. This ensures our Prometheus will scrape the metrics.
     * `prometheus.io/port: "9273"`. This tells prometheus what ports to scrape on. This should not be changed.
     * `telegraf.influxdata.com/inputs`
     * In the tags section, `[inputs.memcached.tags]`:
        * `component: “database”`. This value is used by Sumo Logic apps to identify application components.
        * `db_system: “memcached”`. This value identifies the database system.
  * For all other parameters, see [this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf#configuring-telegraf) for more parameters that can be configured in the Telegraf agent globally.
4. Sumo Logic Kubernetes collection will automatically start collecting metrics from the pods having the labels and annotations defined in the previous step.
5. Verify metrics in Sumo Logic.

#### Configure Logs Collection

This section explains the steps to collect Memcached logs from a Kubernetes environment.

1. **Add labels on your Memcached pods to capture logs from standard output (recommended method)**.
   1. Apply the following labels to the Memcached pods:
    ```sql
    environment: "prod_ENV_TO_BE_CHANGED"
    component: "database"
    db_system: "memcached"
    db_cluster: "memcached_on_k8s_ENV_TO_BE_CHANGED"
    db_cluster_address = "ENV_TO_BE_CHANGED"
    db_cluster_port = "ENV_TO_BE_CHANGED"
    ```
   2. Enter in values for the following parameters:
    * `environment`. This is the deployment environment where the Memcached cluster identified by  the value of **servers** resides. For example dev, prod, or QA. While this value is optional we highly recommend setting it.
    * `db_cluster`. Enter a name to identify this Memcached cluster. This cluster name will be shown in the Sumo Logic dashboards.
    * `db_cluster_address`. Enter the cluster hostname or ip address that is used by the application to connect to the database. It could also be the load balancer or proxy endpoint.
    * `db_cluster_port`. Enter the database port. If not provided, a default port will be used.
    :::note
    `db_cluster_address` and `db_cluster_port` should reflect the exact configuration of DB client configuration in your application, especially if you instrument it with OT tracing. The values of these fields should match exactly the connection string used by the database client (reported as values for net.peer.name and net.peer.port metadata fields).

    For example, if your application uses “memcached-prod.sumologic.com:3306” as the connection string, the field values should be set as follows: `db_cluster_address=memcached-prod.sumologic.com db_cluster_port=3306`.

    If your application connects directly to a given Memcached node, rather than the whole cluster, use the application connection string to override the value of the “host” field in the Telegraf configuration: `host=memcached-prod.sumologic.com`.

    Pivoting to Tracing data from Entity Inspector is possible only for “Memcached address” Entities.
    :::
    * **Do not modify the following values** as it will cause the Sumo Logic app to not function correctly.
      * `component: “database”`. This value is used by Sumo Logic apps to identify application components.
      * `db_system: “memcached”`. This value identifies the database system.
      * See [this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf#configuring-telegraf) for more parameters that can be configured in the Telegraf agent globally.
   3. The Sumologic-Kubernetes-Collection will automatically capture the logs from stdout and will send the logs to Sumologic. For more information on deploying Sumologic-Kubernetes-Collection, [ visit here](/docs/integrations/containers-orchestration/kubernetes#collecting-metrics-and-logs-for-the-kubernetes-app).
   4. Verify logs in Sumo Logic.
2. **Collecting Memcached Logs from a Log File (Optional)**. If your Memcached chart/pod is writing its logs to log files, you can use a [sidecar](https://github.com/SumoLogic/tailing-sidecar/tree/main/operator) to send log files to standard out. To do this:
   1. Install the Sumo Logic [tailing sidecar operator](https://github.com/SumoLogic/tailing-sidecar/tree/main/operator#deploy-tailing-sidecar-operator).
   2. Add the following annotation in addition to the existing annotations.
    ```xml
    annotations:
      tailing-sidecar: sidecarconfig;<mount>:<path_of_Memcached_log_file>/<Memcached_log_file_name>
    ```
   Example:
    ```bash
    annotations:
        tailing-sidecar: sidecarconfig;data:/var/bitnami/memcached/logs/memcached.log
    ```
   3. Make sure that the Memcached pods are running and annotations are applied by using the command:
    ```bash
    kubectl describe pod <Memcached_pod_name>
    ```
   4. Sumo Logic Kubernetes collection will automatically start collecting logs from the pods having the annotations defined above.

<br/> **FER to normalize the fields in Kubernetes environments.** Labels created in Kubernetes environments automatically are prefixed with pod_labels. To normalize these for our app to work, we will have Field Extraction Rule automatically created for Database Application Components named as **AppObservabilityMemcachedDatabaseFER**.
<br/>
</TabItem>
<TabItem value="non-k8s">

In non-Kubernetes environments, we use the Telegraf operator for Memcached metric collection and Sumo Logic Installed Collector for collecting Memcached logs. The diagram below illustrates the components of the Memcached collection in a non-Kubernetes environment. <img src={useBaseUrl('img/integrations/databases/memcachednonk8s.png')} alt="memcached"/>

Telegraf runs on the same system as Memcached and uses the [Memcached input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/memcached#configuration) to obtain Memcached metrics. The Sumo Logic output plugin to send the metrics to Sumo Logic. Logs from Memcached on the other hand are sent to a Sumo Logic Local File source.

This section provides instructions for configuring logs and metrics collection for the Sumo Logic app for Memcached. Follow the below instructions to set up the logs and metrics collection:

#### Configure Metrics Collection

1. **Configure a Hosted Collector**. To create a new Sumo Logic hosted collector, perform the steps in the[ Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector) section of the Sumo Logic documentation.
2. **Configure an HTTP Logs and Metrics Source**. Create a new HTTP Logs and Metrics Source in the hosted collector created above by following [these instructions](/docs/send-data/hosted-collectors/http-source/logs-metrics). Make a note of the **HTTP Source URL**.
3. **Install Telegraf** using the [following steps](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf.md) to install Telegraf.
4. **Configure and start Telegraf**. As part of collecting metrics data from Telegraf, we will use the Memcached [input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/memcached) to get data from Telegraf and the [Sumo Logic output plugin](https://github.com/SumoLogic/fluentd-output-sumologic) to send data to Sumo Logic. Create or modify `telegraf.conf` and copy and paste the text below:  
```sql
 servers = ["localhost:11211"]
  [inputs.memcached.tags]
    environment ="dev_ENV_TO_BE_CHANGED"
    component ="database"
    db_system ="memcached"
    db_cluster="memcached_on_premise_ENV_TO_BE_CHANGED"
    db_cluster_address = "ENV_TO_BE_CHANGED"
    db_cluster_port = "ENV_TO_BE_CHANGED"
    url = "<URL Created in Step 3_ENV_TO_BE_CHANGED>"
    data_format = "prometheus"
```
5. Please enter values for the following parameters (marked in `ENV_TO_BE_CHANGED` above):
  * In the input plugins section (`[[inputs.memcached]]`):
     * `servers`. An array of addresses to gather stats about. Specify an IP on hostname. Please see [this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/memcached) for more information on additional parameters for configuring the Memcached input plugin for Telegraf.
     * In the tags section (`[inputs.memcached.tags]`):
        * `environment`. This is the deployment environment where the Memcached cluster identified by the value of **servers** resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
        * `db_cluster`. Enter a name to identify this Memcached cluster. This cluster name will be shown in the Sumo Logic dashboards.
        * `db_cluster_address`. Enter the cluster hostname or IP address that is used by the application to connect to the database. It could also be the load balancer or proxy endpoint.
        * `db_cluster_port`. Enter the database port. If not provided, a default port will be used.
        :::note
        `db_cluster_address` and `db_cluster_port` should reflect the exact configuration of DB client configuration in your application, especially if you instrument it with OT tracing. The values of these fields should match exactly the connection string used by the database client (reported as values for net.peer.name and net.peer.port metadata fields).

        For example, if your application uses `“memcached-prod.sumologic.com:3306”` as the connection string, the field values should be set as follows: `db_cluster_address=memcached-prod.sumologic.com db_cluster_port=3306`

        If your application connects directly to a given memcached node, rather than the whole cluster, use the application connection string to override the value of the “host” field in the Telegraf configuration: `host=memcached-prod.sumologic.com`

        Pivoting to Tracing data from Entity Inspector is possible only for “Memcached address” Entities.
        :::
  * In the output plugins section (`[[outputs.sumologic]]`):
     * `url`. This is the HTTP source URL created in step 3. Please see [this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/configure-telegraf-output-plugin.md) for more information on additional parameters for configuring the Sumo Logic Telegraf output plugin.
   * **Do not modify the following values** set by this Telegraf configuration as it will cause the Sumo Logic app to not function correctly.
     * `data_format - “prometheus”` in the output plugins section. Metrics are sent in the Prometheus format to Sumo Logic
     * `component: “database”` in the input plugins section. This value is used by Sumo Logic apps to identify application components.
   * For all other parameters, see [this doc](https://github.com/influxdata/telegraf/blob/master/etc/logrotate.d/telegraf) for more parameters that can be configured in the Telegraf agent globally.
6. Once you have finalized your `telegraf.conf` file, you can start or reload the Telegraf service using instructions from the [doc](https://docs.influxdata.com/telegraf/v1.17/introduction/getting-started/#start-telegraf-service).

At this point, Memcached metrics should start flowing into Sumo Logic.


#### Configure Logs Collection

This section provides instructions for configuring log collection for Memcached running on a non-Kubernetes environment for the Sumo Logic app for Memcached.

By default, Memcached logs are stored in a log file. Local log files can be collected via [Installed collectors](/docs/send-data/installed-collectors). An Installed collector will require you to allow outbound traffic to [Sumo Logic endpoints](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) for collection to work. For detailed requirements for Installed collectors, see this [page](/docs/get-started/system-requirements#installed-collector-requirements).

1. **Configure logging in Memcached**. By default, the installation of Memcached will not write any request logs to disk. To add a log file for Memcached, you can use the following syntax:
  ```bash
  memcached -d -m 3072 -l localhost -p 11211 -u nobody -v 2>>/var/log/memcached/memcached.log
  ```

  Or, if you’re on RHEL/CentOS, you can edit the file `/etc/sysconfig/memcached` like so:
  ```bash
  PORT="11211"
  USER="memcached"
  MAXCONN="3048"
  CACHESIZE="256"
  OPTIONS="-vv >> /var/log/memcached/memcached.log 2>&1"
  ```
  Save the file and  restart Memcached.
2. **Configuring a Collector** To collect logs directly from the Memcached machine, configure an[ Installed Collector](/docs/send-data/installed-collectors).
3. **Configuring a Source** To collect logs directly from your Memcached machine, use an Installed Collector and a Local File Source.
    1. Add a [Local File Source](/docs/send-data/installed-collectors/sources/local-file-source).
    2. Configure the Local File Source fields as follows:
        * **Name**. (Required)
        * **Description**. (Optional)
        * **File Path (Required)**. Enter the path to your error.log or access.log. The files are typically located in `/var/log/memcached/memcached.log`. If you're using a customized path, check the `Memcached.conf` file for this information.
        * **Source Host**. Sumo Logic uses the hostname assigned by the OS unless you enter a different hostname
        * **Source Category**. Enter any string to tag the output collected from this Source, such as **Memcached/Logs**. (The Source Category metadata field is a fundamental building block to organize and label Sources. For details, see [Best Practices](/docs/send-data/best-practices.md).
        * **Fields**. Set the following fields:
            * `component = database`
            * `db_system = memcached`
            * `db_cluster = <Your_Memcached_Cluster_Name>`
            * `environment = <Environment_Name>`, such as Dev, QA or Prod.
            * `db_cluster_address`. Enter the cluster hostname or ip address that is used by the application to connect to the database. It could also be the load balancer or proxy endpoint.
            * `db_cluster_port`. Enter the database port. If not provided, a default port will be used.
            :::note
            `db_cluster_address` and `db_cluster_port` should reflect the exact configuration of DB client configuration in your application, especially if you instrument it with OT tracing. The values of these fields should match exactly the connection string used by the database client (reported as values for `net.peer.name` and `net.peer.port` metadata fields).

            For example, if your application uses `“memcached-prod.sumologic.com:3306”` as the connection string, the field values should be set as follows: `db_cluster_address=memcached-prod.sumologic.com db_cluster_port=3306`.

            If your application connects directly to a given Memcached node, rather than the whole cluster, use the application connection string to override the value of the “host” field in the Telegraf configuration: `host=memcached-prod.sumologic.com`

            Pivoting to Tracing data from Entity Inspector is possible only for “Memcached address” Entities.
            :::
    3. Configure the **Advanced** section:
        * **Enable Timestamp Parsing**. Select Extract timestamp information from log file entries.
        * **Time Zone**. Choose the option, **Ignore time zone from log file and instead use**, and then select your Memcached Server’s time zone.
        * **Timestamp Format**. The timestamp format is automatically detected.
        * **Encoding**. Select UTF-8 (Default).
        * **Enable Multiline Processing**. Detect messages spanning multiple lines
            * Infer Boundaries - Detect message boundaries automatically
    4. Click **Save**.

At this point, Memcached logs should start flowing into Sumo Logic.

</TabItem>
</Tabs>

## Installing the Memcached app

This section demonstrates how to install the Memcached app.

import AppInstall from '../../reuse/apps/app-install.md';

<AppInstall/>

## Viewing Memcached Dashboards

:::tip Filter with template variables    
Template variables provide dynamic dashboards that can rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you view dynamic changes to the data for a quicker resolution to the root cause. You can use template variables to drill down and examine the data on a granular level. For more information, see [Filter with template variables](/docs/dashboards/filter-template-variables.md).
:::

### Overview

The **Memcached - Overview** dashboard provides an at-a-glance view of the Memcached server status, error logs, and database metrics.

<img src={useBaseUrl('img/integrations/databases/Memcached-Overview.png')} alt="Memcached dashboards" />

### Operations

The **Memcached - Operations** Dashboard provides detailed analysis on connections, thread requested, network bytes, hash expansion size, table size.

<img src={useBaseUrl('img/integrations/databases/Memcached-Operations.png')} alt="Memcached dashboards" />

### Command Stats

The **Memcached - Command Stats** dashboard provides detailed insights into the number of commands being performed.

<img src={useBaseUrl('img/integrations/databases/Memcached-Command-Stats.png')} alt="Memcached dashboards" />

### Cache Information

The **Memcached - Cache Information** dashboard provides insight into cache states, cache hit, and miss rate over time.

<img src={useBaseUrl('img/integrations/databases/Memcached-Cache-Information.png')} alt="Memcached dashboards" />

### Logs

The **Memcached - Logs** dashboard helps you quickly analyze your Memcached error logs, commands executed, and objects stored.

<img src={useBaseUrl('img/integrations/databases/Memcached-Logs.png')} alt="Memcached dashboards" />

## Create monitors for Memcached app

Sumo Logic provides pre-configured alerts available through [Sumo Logic monitors](/docs/alerts/monitors) to help you proactively determine if an Memcached cluster is available and performing as expected. These monitors are based on metric and log data and include pre-set thresholds that reflect industry best practices and recommendations. For more information about individual alerts, refer to the [Memcached Alerts](/docs/integrations/databases/memcached#memcached-alerts).

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

:::note
- Ensure that you have [Manage Monitors role capability](/docs/manage/users-roles/roles/role-capabilities/#alerting) permissions to install the Memcached Alerts.
- You can only enable the set number of alerts. For more information, refer to [Monitors](/docs/alerts/monitors/create-monitor).
:::

### Memcached alerts
<table>
  <tr>
   <td>Alert Name </td>
   <td>Alert Description   </td>
   <td>Trigger Type (Critical / Warning)   </td>
   <td>Alert Condition </td>
   <td>Recover Condition   </td>
  </tr>
  <tr>
   <td>Memcached - Commands Error </td>
   <td>This alert fires when we detect command errors.   </td>
   <td>Critical   </td>
   <td> &#62; 0   </td>
   <td> &#60;&#61; 0 </td>
  </tr>
  <tr>
   <td>Memcached - Authentication Error   </td>
   <td>This alert fires when we detect authentication errors continuously for 5 mins </td>
   <td>Warning   </td>
   <td> &#62;0   </td>
   <td> &#60;&#61; 0   </td>
  </tr>
  <tr>
   <td>Memcached - Connection Yields   </td>
   <td>This alert fires when we detect yielded connections continuously for 5 mins   </td>
   <td>Warning   </td>
   <td> &#62;5   </td>
   <td> &#60;&#61; 5   </td>
  </tr>
  <tr>
   <td>Memcached - High Memory Usage </td>
   <td>This alert fires when the memory usage is more than 80%. </td>
   <td>Warning   </td>
   <td> &#62;80 </td>
   <td> &#60;&#61; 80   </td>
  </tr>
  <tr>
   <td>Memcached - Listen Disabled   </td>
   <td>This alert fires when new queued connections per minute > 5   </td>
   <td>Warning </td>
   <td> &#62;5   </td>
   <td> &#60;&#61;5   </td>
  </tr>
  <tr>
   <td>Memcached - Cache Hit Ratio   </td>
   <td>The hit rate is one of the most important indicators of Memcached performance. A high hit rate means faster responses to your users. If the hit rate is falling, you need quick visibility into why. This alert gets fired low cache hit ratio is less than 50%   </td>
   <td>Critical </td>
   <td> &#60;&#61;0.5   </td>
   <td> &#62;0.5   </td>
  </tr>
  <tr>
   <td>Memcached - Current Connections   </td>
   <td>This alert gets fired when number of connected clients are 0. If current connections are none then something is wrong.   </td>
   <td>Critical </td>
   <td> &#60;&#61;0 </td>
   <td> &#62;0 </td>
  </tr>
  <tr>
   <td>Memcached - Uptime </td>
   <td>This alert gets fires when uptime is &#60; 180. You can use this to detect respawns. </td>
   <td>Critical </td>
   <td> &#60;&#61;180 </td>
   <td> &#62;180</td>
  </tr>
</table>
