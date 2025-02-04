---
id: mariadb
title: MariaDB - Classic Collector
sidebar_label: MariaDB
description: The Sumo Logic app for MariaDB is a unified logs and metrics app that helps you monitor the availability, performance and resource utilization of MariaDB database clusters.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CollBegin from '../../reuse/collection-should-begin-note.md';

<img src={useBaseUrl('img/integrations/databases/mariadb.png')} alt="Thumbnail icon" width="80"/>

The MariaDB app is a unified logs and metrics app that helps you monitor MariaDB database cluster availability, performance, and resource utilization. Pre-configured dashboards and searches provide insight into the health of your database clusters, performance metrics, resource metrics, schema metrics, replication, error logs, slow queries, Innodb operations, failed logins, and error logs.

This app is tested with the following MariaDB versions:
* Kubernetes: MariaDB - Version 10.5.11
* Non-Kubernetes: MariaDB  - Version 10.7.1

## Collecting logs and metrics for the MariaDB app

Configuring log and metric collection for the MariaDB app includes the following tasks.

### Step 1: Configure fields in Sumo Logic

As part of the app installation process, the following fields will created by default:
* `component`
* `environment`
* `db_system`
* `db_cluster`
* `db_cluster_address`
* `db_cluster_port`

Additionally, if you are using MariaDB in the Kubernetes environment, the following additional fields will be created by default during the app installation process:
* `pod_labels_component`
* `pod_labels_environment`
* `pod_labels_db_system`
* `pod_labels_db_cluster`
* `pod_labels_db_cluster_address`
* `pod_labels_db_cluster_port`


To learn more about setting up fields, refer to [Sumo Logic Fields](/docs/manage/fields).

### Step 2: Configure Collection

Sumo Logic supports the collection of logs and metrics data from MariaDB in both Kubernetes and non-Kubernetes environments. Click on the appropriate links below based on the environment where your MariaDB clusters are hosted.

<Tabs
  groupId="k8s-nonk8s"
  defaultValue="k8s"
  values={[
    {label: 'Kubernetes environments', value: 'k8s'},
    {label: 'Non-Kubernetes environments', value: 'non-k8s'},
  ]}>

<TabItem value="k8s">

In Kubernetes environments, we use the Telegraf Operator, which is packaged with our Kubernetes collection. You can learn more about it [here](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/telegraf-collection-architecture). The diagram below illustrates how data is collected from MariaDB in Kubernetes environments. In the architecture shown below, there are four services that make up the metric collection pipeline:
Telegraf, Telegraf Operator, Prometheus, and [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector).

<img src={useBaseUrl('img/integrations/databases/mariadbk8s.png')} alt="mariadb" />

The first service in the metrics pipeline is Telegraf. Telegraf collects metrics from MariaDB. Note that we’re running Telegraf in each pod we want to collect metrics from as a sidecar deployment, that is Telegraf runs in the same pod as the containers it monitors. Telegraf uses the [MySQL Input Plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mysql) to obtain metrics. (For simplicity, the diagram doesn’t show the input plugins.) The injection of the Telegraf sidecar container is done by the Telegraf Operator.

Prometheus pulls metrics from Telegraf and sends them to [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector) which enriches metadata and sends metrics to Sumo Logic.

In the logs pipeline, Sumo Logic Distribution for OpenTelemetry Collector collects logs written to standard out and forwards them to another instance of Sumo Logic Distribution for OpenTelemetry Collector, which enriches metadata and sends logs to Sumo Logic.

:::note Prerequisites
These instructions assume that you are using the latest Helm chart version. If not, upgrade using the instructions [here](/docs/send-data/kubernetes).
:::

#### Configure Metrics Collection

This section explains the steps to collect MariaDB metrics from a Kubernetes environment.

1. [Set up Kubernetes Collection with the Telegraf Operator](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf)
2. On your MariaDB Pods, add the following annotations:
```sql
annotations:
    telegraf.influxdata.com/class: sumologic-prometheus
    prometheus.io/scrape: "true"
    prometheus.io/port: "9273"
    telegraf.influxdata.com/inputs: |+
[[inputs.mysql]]
  servers = ["user_TO_BE_CHANGED:password_TO_BE_CHANGED@tcp(IP_ADDRESS_MARIADB_TO_BE_CHANGED:PORT_MARIADB_TO_BE_CHANGED)/?tls=false"]
  metric_version = 2
  table_schema_databases = []
  perf_summary_events = []
  gather_table_schema = true
  gather_process_list = true
  gather_info_schema_auto_inc = true
  gather_user_statistics = true
  gather_slave_status = true
  gather_table_io_waits = true
  gather_table_lock_waits = true
  gather_index_io_waits = true
  gather_event_waits = true
  gather_file_events_stats = true
  gather_perf_events_statements = true
  interval_slow = "30m"
  [inputs.mysql.tags]
    environment ="ENV_TO_BE_CHANGED"
    component ="database"
    db_system ="mariadb"
    db_cluster ="ENV_TO_BE_CHANGED"
    db_cluster_address = "ENV_TO_BE_CHANGED"
    db_cluster_port = "ENV_TO_BE_CHANGED" --Enter `default` if you haven’t defined a cluster in MariaDB
```
3. Enter in values for the following parameters (marked `ENV_TO_BE_CHANGED` in the snippet above):
  * `telegraf.influxdata.com/inputs`. This contains the required configuration for the Telegraf exec Input plugin. Please refer[ to this doc](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/redis) for more information on configuring the MySQL input plugin for Telegraf. Note: As telegraf will be run as a sidecar, the host should always be localhost.
  * In the input plugins section, that is:
      * `servers` - The URL of your MariaDB server. For information about additional input plugin configuration options, see the [Readme ](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mysql)for the MySQL input plugin.
  * In the tags section (`[inputs.mysql.tags]`):
      * `environment`. This is the deployment environment where the MariaDB cluster identified by the value of **servers** resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
      * `db_cluster`. Enter a name to identify this MariaDB cluster. This cluster name will be shown in the Sumo Logic dashboards.  
      * `db_cluster_address`. Enter the cluster hostname or ip address that is used by the application to connect to the database. It could also be the load balancer or proxy endpoint.
      * `db_cluster_port`. Enter the database port. If not provided, a default port will be used.
      :::note
      `db_cluster_address` and `db_cluster_port` should reflect exact configuration of DB client configuration in your application, especially if you instrument it with OT tracing. The values of these fields should match exactly the connection string used by the database client (reported as values for net.peer.name and net.peer.port metadata fields).

      For example, if your application uses `“mariadb-prod.sumologic.com:3306”` as the connection string, the field values should be set as follows: `db_cluster_address=mariadb-prod.sumologic.com db_cluster_port=3306`.

      If your application connects directly to a given sqlserver node, rather than the whole cluster, use the application connection string to override the value of the “host” field in the Telegraf configuration: `host=mariadb-prod.sumologic.com`

      Pivoting to Tracing data from Entity Inspector is possible only for “MariaDB address” Entities.
      :::
   * **Do not modify the following values** as it will cause the Sumo Logic app to not function correctly.
     * `telegraf.influxdata.com/class: sumologic-prometheus`. This instructs the Telegraf operator what output to use. This should not be changed.
     * `prometheus.io/scrape: "true"`. This ensures our Prometheus will scrape the metrics.
     * `prometheus.io/port: "9273"`. This tells prometheus what ports to scrape on. This should not be changed.
     * `telegraf.influxdata.com/inputs`
      * In the tags section (`[inputs.mysql.tags]`):
        * `component: “database”` - This value is used by Sumo Logic apps to identify application components.
        * `db_system: “mariadb”` - This value identifies the database system.
     * See [this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf#configuring-telegraf) for more parameters that can be configured in the Telegraf agent globally.
4. Sumo Logic Kubernetes collection will automatically start collecting metrics from the pods having the labels and annotations defined in the previous step.
5. Verify metrics in Sumo Logic.

<br/>

#### Configure Logs Collection

This section explains the steps to collect MariaDB logs from a Kubernetes environment.

1. **(Recommended Method) Add labels on your MariaDB pods to capture logs from standard output**. Make sure that the logs from MariaDB are sent to stdout. Follow the instructions below to capture MariaDB logs from stdout on Kubernetes.
   1. Apply following labels to the MariaDB pod:
    ```sql
    environment: "prod_ENV_TO_BE_CHANGED"
    component: "database"
    db_system: "mariadb"
    db_cluster "Cluster_ENV_TO_BE_CHANGED"
    db_cluster_address = "ENV_TO_BE_CHANGED"
    db_cluster_port = "ENV_TO_BE_CHANGED"
    ```
   2. Enter in values for the following parameters (marked in "`ENV_TO_BE_CHANGED`" above):
     * `environment`. This is the deployment environment where the MariaDB cluster identified by the value of **`servers`** resides. For example: dev, prod, or QA. While this value is optional, we highly recommend setting it.
     * `db_cluster`. Enter a name to identify this MariaDB cluster. This cluster name will be shown in the Sumo Logic dashboards. If you haven’t defined a cluster in MariaDB, then enter `default` for db_cluster.
     * **Do not modify the following values** as it will cause the Sumo Logic apps to not function correctly.
       * `component: “database”` - This value is used by Sumo Logic apps to identify application components.
       * `db_system: “mariadb”` - This value identifies the database system.
     * See [this doc](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf#configuring-telegraf) for more parameters that can be configured in the Telegraf agent globally.
   3. The Sumologic-Kubernetes-Collection will automatically capture the logs from stdout and will send the logs to Sumologic. For more information on deploying Sumologic-Kubernetes-Collection, [visit here](/docs/integrations/containers-orchestration/kubernetes#collecting-metrics-and-logs-for-the-kubernetes-app).
   4. Verify logs in Sumo Logic.
2. **(Optional) Collecting MariaDB Logs from a Log File**. Follow the steps below to capture MariaDB logs from a log file on Kubernetes.
   1. Determine the location of the MariaDB log file on Kubernetes. This can be determined from the server.conf for your MariaDB cluster along with the mounts on the MariaDB pods.
   2. Install the Sumo Logic [tailing sidecar operator](https://github.com/SumoLogic/tailing-sidecar/tree/main/operator#deploy-tailing-sidecar-operator).
   3. Add the following annotation in addition to the existing annotations.
    ```yml
    annotations:
      tailing-sidecar: sidecarconfig;<mount>:<path_of_MariaDB_log_file>/<MariaDB_log_file_name>
    ```
    Example:
    ```yml
    annotations:
      tailing-sidecar: sidecarconfig;data:/var/opt/MariaDB/errorlog
    ```
   4. Make sure that the MariaDB pods are running and annotations are applied by using the command:
    ```bash
    kubectl describe pod <MariaDB_pod_name>
    ```
   5. Sumo Logic Kubernetes collection will automatically start collecting logs from the pods having the annotations defined above.
   6. Verify logs in Sumo Logic.


<br/>**FER to normalize the fields in Kubernetes environments.** Labels created in Kubernetes environments automatically are prefixed with pod_labels. To normalize these for our app to work, we will have Field Extraction Rule automatically created for Database Application Components named as **AppObservabilityMariaDBDatabaseFER**.
<br/>

</TabItem>
<TabItem value="non-k8s">

For non-Kubernetes environments, Sumo Logic uses the Telegraf operator for MariaDB metric collection and the [Installed Collector](/docs/send-data/installed-collectors) for collecting MariaDB logs. The diagram below illustrates the components of the MariaDB collection in a non-Kubernetes environment.<br/><img src={useBaseUrl('img/integrations/databases/mariadbnonk8s.png')} alt="mariadb" />

Telegraf uses the [MySQL Input Plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/sqlserver) to obtain MariaDB metrics and the Sumo Logic output plugin to send the metrics to Sumo Logic. Logs from MariaDB are collected by a [Local File Source](/docs/send-data/installed-collectors/sources/local-file-source).

The process to set up collection for MariaDB data is done through the following steps.

#### Configure Logs Collection

This section provides instructions for configuring log collection for MariaDB running on a non-Kubernetes environment for the Sumo Logic app for MariaDB. By default, MariaDB logs are stored in a log file. MariaDB also supports forwarding logs via Syslog Audit Logs.

Sumo Logic supports collecting logs both via Syslog and a local log file. Utilizing Sumo Logic [Cloud Syslog](/docs/send-data/hosted-collectors/cloud-syslog-source) will require TCP TLS Port 6514 to be open in your network. Local log files can be collected via [Installed collectors](/docs/send-data/installed-collectors) or [FluentD](https://www.fluentd.org/). Installed collector will require you to allow outbound traffic to [Sumo Logic endpoints](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) for collection to work. To view more requirements, see [Installed Collector requirements](/docs/get-started/system-requirements#installed-collector-requirements).

Based on your infrastructure and networking setup, choose one of these methods to collect MariaDB logs and follow the instructions below to set up log collection:

<details>
<summary>Method A: Configure MariaDB to log to a local file.</summary>

MariaDB logs written to a log file can be collected via the Local File Source of a Sumo Logic Installed Collector.

1. To configure the MariaDB log file(s), locate your local server.cnf configuration file in the database directory.
2. Open server.cnf in a text editor.
3. Set the following parameters in the `[mariadb]` section:
```sql
[mariadb]
log_error=/var/log/mariadb/mariadb-error.log
log_output=FILE
slow_query_log=1
slow_query_log_file = /var/log/mariadb/slow_query.log
long_query_time=2
```
   * [Error Logs](https://mariadb.com/kb/en/error-log/): MariaDB always writes its error log, but the destination is configurable.
   * [Slow Query Logs](https://mariadb.com/kb/en/slow-query-log-overview/): The slow query log is disabled by default.
   * [General Query Logs](https://mariadb.com/kb/en/general-query-log/). We do not recommend enabling general_log for performance reasons. These logs are not used by the Sumo Logic MariaDB app.
4. Save the server.cnf file.
5. Restart the MariaDB server:
  ```bash
  systemctl restart mariadb
  ```

</details>

<details>
<summary>Method B: Configure a Sumo Logic Collector</summary>

To collect logs directly from the MariaDB machine, configure an [Installed Collector](/docs/send-data/installed-collectors).

</details>

<details>
<summary>Method C: Configure a Source</summary>

This section demonstrates how to configure sources for Error Logs and Slow Query Logs.

#### Configure Source for MariaDB Error Logs

This section demonstrates how to configure a Local File Source for MariaDB Error Logs, for use with an [Installed Collector](/docs/send-data/installed-collectors). You may configure a [Remote File Source](/docs/send-data/installed-collectors/sources/remote-file-source), but the configuration is more complex. Sumo Logic recommends using a Local File Source whenever possible.
1. On the Collection Management screen, click **Add**, next to the collector, then select **Add Source**.
2. Select **Local File** as the source type.
3. Configure the Local File Source fields as follows:
   1. **Name** (Required). Enter a name for the source.
   2. **Description** (Optional).
   3. **File Path** (Required). Enter the path to your mariadb-error.log. The files are typically located in /var/log/mariadb/mariadb-error.log. If you're using a customized path, check the server.cnf file for this information
   4. **Collection should begin**. Set this for how far back historically you want to start collecting.
   :::note
   <CollBegin/>
   :::
   5. **Source Host** (Optional). Sumo Logic uses the hostname assigned by the OS unless you enter a different hostname
   6. **Source Category** (Recommended). DB/MariaDB/ErrorLogs_._
   7. **Fields**. Set the following fields:
     * `component = database`
     * `db_system = mariadb`
     * `db_cluster = <Your_MariaDB_Cluster_Name>`. Enter **Default** if you do not have one.
     * `environment = <Your_Environment_Name>` (for example, Dev, QA, or Prod)
     * `db_cluster_address`. Enter the cluster hostname or ip address that is used by the application to connect to the database. It could also be the load balancer or proxy endpoint.
     * `db_cluster_port`. Enter the database port. If not provided, a default port will be used.
     :::note
     `db_cluster_address` and `db_cluster_port` should reflect exact configuration of DB client configuration in your application, especially if you instrument it with OT tracing. The values of these fields should match exactly the connection string used by the database client (reported as values for net.peer.name and net.peer.port metadata fields).

     For example, if your application uses `“mariadb-prod.sumologic.com:3306”` as the connection string, the field values should be set as follows: `db_cluster_address=mariadb-prod.sumologic.com db_cluster_port=3306`.

     If your application connects directly to a given sqlserver node, rather than the whole cluster, use the application connection string to override the value of the “host” field in the Telegraf configuration: `host=mariadb-prod.sumologic.com`.

     Pivoting to Tracing data from Entity Inspector is possible only for “MariaDB address” Entities.
     :::
4. In the **Advanced** section, select the following options:
   1. **Timestamp Parsing Settings**. Make sure the setting matches the timezone on the log files.
   2. **Enable Timestamp Parsing**. Select **Extract timestamp information from log file entries**.
   3. **Time Zone**. Select the option to **Use time zone from log file. If none is present use**. and set the timezone to **UTC**.
   4. **Timestamp Format**. Select the option to **Automatically detect the format**.
   5. **Encoding**. UTF-8 is the default, but you can choose another encoding format from the menu if your MariaDB logs are encoded differently.
   6. **Enable Multiline Processing**. Uncheck the box to **Detect messages spanning multiple lines**. Since MariaDB Error logs are single line log files, disabling this option will ensure that your messages are collected correctly.
5. Click **Save**.

After a few minutes, your new Source should be propagated down to the Collector and will begin submitting your MariaDB log files to the Sumo Logic service.

#### Configure Source for MariaDB Slow Query Logs

This section demonstrates how to configure a Local File Source for MariaDB Slow Query Logs, for use with an [Installed Collector](/docs/integrations/web-servers/iis-10).

1. On the Collection Management screen, click **Add**, next to the collector, then select **Add Source**.
2. Select **Local File** as the source type.
3. Configure the Local File Source fields as follows:
   1. **Name** (Required). Enter a name for the source.
   2. **Description** (Optional).
   3. **File Path** (Required). Enter the path to your slow_query.log. The files are typically located in /var/log/mariadb/slow_query.log. If you're using a customized path, check the server.cnf file for this information.
   4. The collection should begin. Set this for how far back historically you want to start collecting.
   5. **Source Host (Optional)**. Sumo Logic uses the hostname assigned by the OS unless you enter a different hostname
   6. **Source Category (Recommended)**. DB/MariaDB/SlowQuery.
   7. **Fields.** Set the following fields:
     * `component = database`
     * `db_system = mariadb`
     * `db_cluster = <Your_mariadb_Cluster_Name>`. Enter **Default** if you do not have one.
     * `environment = <Your_Environment_Name>` (for example, Dev, QA, or Prod)
4. In the **Advanced** section, select the following options:
   1. **Timestamp Parsing Settings**. Make sure the setting matches the timezone on the log files.
   2. **Enable Timestamp Parsing**. Select **Extract timestamp information from log file entries**.
   3. **Time Zone**. Select the option to **Use time zone from log file**. If none is present, use and set the timezone to **UTC**.
   4. **Timestamp Format**. Select the option to **Automatically detect the format**.
   5. **Encoding**. UTF-8 is the default, but you can choose another encoding format from the menu if your MariaDB logs are encoded differently.
   6. **Enable Multiline Processing**
     * **Detect Messages Spanning Multiple Lines**. True
     * **Infer Boundaries - Detect message boundaries automatically**. False
     * **Boundary Regex**. `^#\sTime:\s.`
5. Click **Save**.

After a few minutes, your new Source should be propagated down to the Collector and will begin submitting your MariaDB log files to the Sumo Logic service.

</details>

#### Configure Metrics Collection

1. **Set up a Sumo Logic HTTP Source**.
   1. Configure a Hosted Collector for Metrics. To create a new Sumo Logic hosted collector, perform the steps in the [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector) documentation.
   2. Configure an HTTP Logs & Metrics source. On the created Hosted Collector on the Collection Management screen, select **Add Source**.
      * Select **HTTP Logs & Metrics.**
         * **Name.** (Required). Enter a name for the source.
         * **Description.** (Optional).
         * **Source Category.** (Recommended). Be sure to follow the [Best Practices for Source Categories](/docs/send-data/best-practices). A recommended Source Category may be Prod/DB/MariaDB/Metrics.
      * Select **Save**.
      * Note the URL provided once you click _Save_. You can retrieve it again by selecting the Show URL next to the source on the Collection Management screen.
2. **Set up Telegraf**.
   1. Install Telegraf, if you haven’t already, using the [following steps](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf) to install Telegraf.
   2. Configure and start Telegraf to begin collecting metrics data from Telegraf. We will use the [MySQL Input Plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mysql) to get data from Telegraf and the [Sumo Logic output plugin](https://github.com/SumoLogic/fluentd-output-sumologic) to send data to Sumo Logic. Create or modify `telegraf.conf` and copy and paste the text below:  
   ```sql
   [[inputs.mysql]]
    servers = ["user_TO_BE_CHANGED:password_TO_BE_CHANGED@tcp(IP_ADDRESS_MARIADB_TO_BE_CHANGED:PORT_MARIADB_TO_BE_CHANGED)/?tls=false"]
    metric_version = 2
    table_schema_databases = []
    perf_summary_events = []
    gather_table_schema = true
    gather_process_list = true
    gather_info_schema_auto_inc = true
    gather_user_statistics = true
    gather_slave_status = true
    gather_table_io_waits = true
    gather_table_lock_waits = true
    gather_index_io_waits = true
    gather_event_waits = true
    gather_file_events_stats = true
    gather_perf_events_statements = true
    interval_slow = "30m"
    [inputs.mysql.tags]
      environment ="dev_ENV_TO_BE_CHANGED"
      component ="database"
      db_system ="mariadb"
      db_cluster ="mariadb_on_premise_ENV_TO_BE_CHANGED"
      db_cluster_address = "ENV_TO_BE_CHANGED"
      db_cluster_port = "ENV_TO_BE_CHANGED"
   [[outputs.sumologic]]
     url = "<URL_from_HTTP_Logs_and_Metrics_Source>"
     data_format = "prometheus"
   ```
   4. Enter values for fields marked `ENV_TO_BE_CHANGED` above to the appropriate values. Do not include the brackets (`< >`) in your own configuration.
   * Input plugins section, which is `[[inputs.mysql]]`:
      * `servers`. The the URL of your MariaDB server. For information about additional input plugin configuration options, see the [Readme ](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mysql)for the MySQL input plugin.
   * In the tags section, `[inputs.mysql.tags]`:
      * `environment`. This is the deployment environment where the MariaDB cluster identified by the value of **servers** resides. For example; dev, prod, or QA. While this value is optional we highly recommend setting it.
      * `db_cluster`. Enter a name to identify this MariaDB cluster. This cluster name will be shown in our dashboards.
      * `db_cluster_address` - Enter the cluster hostname or ip address that is used by the application to connect to the database. It could also be the load balancer or proxy endpoint.
      * `db_cluster_port` - Enter the database port. If not provided, a default port will be used.
      :::note
      `db_cluster_address` and `db_cluster_port` should reflect the exact configuration of DB client configuration in your application, especially if you instrument it with OT tracing. The values of these fields should match exactly the connection string used by the database client (reported as values for `net.peer.name` and `net.peer.port` metadata fields).

      For example, if your application uses `“mariadb-prod.sumologic.com:3306”` as the connection string, the field values should be set as follows: `db_cluster_address=mariadb-prod.sumologic.com db_cluster_port=3306`

      If your application connects directly to a given sqlserver node, rather than the whole cluster, use the application connection string to override the value of the “host” field in the Telegraf configuration: `host=mariadb-prod.sumologic.com`

      Pivoting to Tracing data from Entity Inspector is possible only for “MariaDB address” Entities.
      :::
   * In the output plugins section, `[[outputs.sumologic]]`:
      * `URL` - This is the HTTP source URL created previously. See this doc for more information on additional parameters for configuring the Sumo Logic Telegraf output plugin.
   * Below is an explanation for additional values set by this Telegraf configuration. If you haven’t defined a cluster in MariaDB, then enter `default` for db_cluster. There are additional values set by the Telegraf configuration.  We recommend not to modify these values as they might cause the Sumo Logic app to not function correctly.
      * `data_format=“prometheus”`. In the output `[[outputs.sumologic]]` plugins section. Metrics are sent in the Prometheus format to Sumo Logic.
      * `component=“database”` - In the input `[[inputs.mysql]]` plugins section. This value is used by Sumo Logic apps to identify application components.
      * `db_system=“mariadb”` - In the input plugins sections. This value identifies the database system.
   * See [this doc](https://github.com/influxdata/telegraf/blob/master/etc/logrotate.d/telegraf) for all other parameters that can be configured in the Telegraf agent globally.
   4. After you have finalized your telegraf.conf file, you can start or reload the telegraf service using instructions from this [doc](https://docs.influxdata.com/telegraf/v1.17/introduction/getting-started/#start-telegraf-service).

At this point, Telegraf should start collecting the MariaDB metrics and forward them to the Sumo Logic HTTP Source.

</TabItem>
</Tabs>

## Installing the MariaDB app

This section demonstrates how to install the MariaDB app. To install the app:

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the **App Catalog**, search for and select the app.
2. Select the version of the service you're using and click **Add to Library**.
:::note
Version selection is not available for all apps.
:::
3. To install the app, complete the following fields.
    1. **App Name.** You can retain the existing name, or enter a name of your choice for the app.
    2. **Data Source.**
        * Choose **Enter a Custom Data Filter**, and enter a custom MariaDB cluster filter. Examples;
            1. For all MariaDB clusters, `db_cluster=*`.
            2. For a specific cluster, `db_cluster=mariadb.dev.01`.
            3. Clusters within a specific environment `db_cluster=mariadb.dev.01` and `environment=prod`. This assumes you have set the optional environment tag while configuring collection.
    3. **Advanced**. Select the **Location in Library** (the default is the Personal folder in the library), or click **New Folder** to add a new folder.
4. Click **Add to Library**.

Once an app is installed, it will appear in your **Personal** folder, or another folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.

## Viewing MariaDB Dashboards

:::tip Filter with template variables    
Template variables provide dynamic dashboards that can rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you view dynamic changes to the data for a quicker resolution to the root cause. You can use template variables to drill down and examine the data on a granular level. For more information, see [Filter with template variables](/docs/dashboards/filter-template-variables).
:::

### Overview

The **MariaDB - Overview** dashboard gives you an at-a-glance view of the state of your database clusters by monitoring key cluster information such as errors, failed logins, errors, queries executed, slow queries, lock waits, uptime, and more.

Use this dashboard to:
* Quickly identify the state of a given database cluster

<img src={useBaseUrl('img/integrations/databases/MariaDB-Overview.png')} alt="mariadb dashboards" />

### Error Logs

The **MariaDB - Error Logs** dashboard provides insight into database error logs by specifically monitoring database shutdown/start events, errors over time, errors, warnings, and crash recovery attempts.

Use this dashboard to:
* Quickly identify errors and patterns in logs for troubleshooting.
* Monitor trends in the error log and identify outliers.
* Ensure that server start, server stop, and crash recovery events are in line with expectations.
* Dashboard filters allow you to narrow a search for the database clusters..

<img src={useBaseUrl('img/integrations/databases/MariaDB-Error-Logs.png')} alt="mariadb dashboards" />

### Failed Logins

The **MariaDB - Failed Logins** dashboard provides insights into all failed login attempts by location, users and hosts.

Use this dashboard to:
* Monitor all failed login attempts and identify any unusual or suspicious activity.

<img src={useBaseUrl('img/integrations/databases/MariaDB-Failed-Logins.png')} alt="mariadb dashboards" />

### Replication

The **MariaDB - Replication** dashboard provides insights into the state of database replication.

Use this dashboard to:
* Quickly determine reasons for replication failures.
* Monitor replication status trends.

<img src={useBaseUrl('img/integrations/databases/MariaDB-Replication.png')} alt="mariadb dashboards" />

### Slow Queries

The **MariaDB - Slow Queries** dashboard provides insights into all slow queries executed on the database.

<img src={useBaseUrl('img/integrations/databases/MariaDB-Slow-Queries.png')} alt="mariadb dashboards" />

Slow queries are queries that take 10 seconds or more to execute (default value is 10 seconds as per MariaDB configuration which can be altered) and excessive slow queries are those that take 15 seconds or more to execute.

Use this dashboard to:
* Identify all slow queries.
* Quickly determine which queries have been identified as slow or excessive slow queries.
* Monitor users and hosts running slow queries.
* Determine which SQL commands are slower than others.
* Examine slow query trends to determine if there are periodic performance bottlenecks in your database clusters.

### Performance and Resource Metrics

The **MariaDB - Performance and Resource Metrics** dashboard allows you to monitor the performance and resource usage of your database clusters.

Use this dashboard to:
* Understand the behavior and performance of your database clusters.
* Monitor key operational metrics around connections, network traffic, threads running, innodb waits, and locks.
* Monitor query execution trends to ensure they match up with expectations.
* Dashboard filters allow you to narrow a search for a specific database cluster.

<img src={useBaseUrl('img/integrations/databases/MariaDB-Performance-and-Resource-Metrics.png')} alt="mariadb dashboards" />

### Performance Schema Metrics

The **MariaDB - Performance Schema Metrics** Dashboard provides insights into the metrics provided by the MariaDB Performance Schema, which is a feature for monitoring MariaDB Server execution at a low level.

Use this dashboard to:
* Monitor errors and warning for SQL statements.
* Monitor statements running without use of index columns.
* Monitor statistics such as Table and Index waits and read and write lock waits to optimize the performance of your database.

<img src={useBaseUrl('img/integrations/databases/MariaDB-Performance-Schema-Metrics.png')} alt="mariadb dashboards" />


### Replication Metrics

The **MariaDB - Replication Metrics** dashboard shows replication events, errors, warnings, and nodes.

<img src={useBaseUrl('img/integrations/databases/MariaDB-Replication-Metrics.png')} alt="mariadb dashboards" />

### InnoDB Metrics

The **MariaDB - InnoDB** Metrics dashboard shows replication events, errors, warnings, and nodes.

<img src={useBaseUrl('img/integrations/databases/MariaDB-InnoDB-Metrics.png')} alt="mariadb dashboards" />

### Table Performance Metrics

The **MariaDB - Table Performance dashboard** provides insights into performance like table i/o wait and table lock waits.

Use this dashboard to:
* Identify root cause of slow queries performed on database table.
* Compare read and write lock waits time with timeshift operator to compare baseline and current trend.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/MariaDB/MariaDB-Table-Peformance-Metrics.png')} alt="mariadb dashboards" />

## Create monitors for MariaDB app

Sumo Logic provides pre-configured alerts available through [Sumo Logic monitors](/docs/alerts/monitors) to help you proactively determine if an MariaDB cluster is available and performing as expected. These monitors are based on metric and log data and include pre-set thresholds that reflect industry best practices and recommendations. For more information about individual alerts, refer to the [MariaDB Alerts](/docs/integrations/databases/mariadb#mariadb-alerts).

import CreateMonitors from '../../reuse/apps/create-monitors.md';

<CreateMonitors/>

:::note
- Ensure that you have [Manage Monitors role capability](/docs/manage/users-roles/roles/role-capabilities/#alerting) permissions to install the MariaDB Alerts.
- You can only enable the set number of alerts. For more information, refer to [Monitors](/docs/alerts/monitors/create-monitor).
:::

### MariaDB alerts

| Alert Type (Metrics/Logs) | Alert Name                                           | Alert Description                                                                                                                                        | Trigger Type (Critical / Warning) | Alert Condition | Recover Condition |
|:---------------------------|:------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------------------------|:-----------------|:-------------------|
| Logs                      | MariaDB - Excessive Slow Query Detected              | This alert fires when the average time to execute a query is more than 15 seconds for a 5 minute time interval.                                          | Critical                          | `>=`1             | `<`1                |
| Logs                      | MariaDB - Instance down                              | This alert fires when we detect that a MariaDB instance is down                                                                                          | Critical                          | `>=`1             | `<`1                |
| Metrics                   | MariaDB - Connection refused                         | This alert fires when connections are refused when the limit of maximum connections is reached.                                                          | Critical                          | `>=`1             | `<`1                |
| Metrics                   | MariaDB - Follower replication lag detected          | This alert fires when we detect that the average replication lag within a 5 minute time interval is greater than or equal to 900 seconds .               | Critical                          | `>=`900           | `<`900              |
| Metrics                   | MariaDB - High average query run time                | This alert fires when the average run time of MariaDB queries within a 5 minute time interval for a given schema is greater than or equal to one second. | Critical                          | `>=`1             | `<`1                |
| Metrics                   | MariaDB - High Innodb buffer pool utilization        | This alert fires when the InnoDB buffer pool utilization is high (`>=`90%) within a 5 minute time interval.                                                | Critical                          | `>=`90            | `<`90               |
| Metrics                   | MariaDB - Large number of aborted connections        | This alert fires when there are 5 or more aborted connections detected within a 5 minute time interval.                                                  | Critical                          | `>=`5             | `<`5                |
| Metrics                   | MariaDB - Large number of internal connection errors | This alert fires when there are 5 or more internal connection errors within a 5 minute time interval.                                                    | Critical                          | `>=`5             | `<`5                |
| Metrics                   | MariaDB - Large number of slow queries               | This alert fires when there are 5 or more slow queries within a 5 minute time interval.                                                                  | Critical                          | `>=`5             | `<`5                |
| Metrics                   | MariaDB - Large number of statement errors           | This alert fires when there are 5 or more statement errors within a 5 minute time interval.                                                              | Critical                          | `>=`5             | `<`5                |
| Metrics                   | MariaDB - Large number of statement warnings         | This alert fires when there are 20 or more statement warnings within a 5 minute time interval.                                                           | Critical                          | `>=`20            | `<`20               |
| Metrics                   | MariaDB - No index used in the SQL statements        | This alert fires when there are 5 or more statements not using an index in the SQL query within a 5 minute time interval.                                | Critical                          | `>=`5             | `<`5                |
| Metrics                   | MariaDB - Slave Server Error                         | This alert fires when there are slave server errors within a 5 minute time interval.                                                                     | Critical                          | >0              | `<`=0               |
