---
id: mysql
title: MySQL - Classic Collector
sidebar_label: MySQL
description: Provides insight into the health of your MySQL servers, replication status, and errors.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/databases/mysql.png')} alt="Thumbnail icon" width="100" />

The Sumo Logic app for MySQL is a unified logs and metrics app that helps you monitor the availability, performance and resource utilization of MySQL database clusters. Preconfigured dashboards and searches provide insight into the health of your MySQL clusters, replication status, error logs, query performance, slow queries, Innodb operations, failed logins and error logs.

The MySQL app supports following versions:
* MySQL 5.5.35-1 and later
* Percona MySQL 5.6.17 and later
* MySQL 8.0.x

## MySQL app Searches
The predefined searches in the MySQL app are based on the following log types.

### Searches based on Error logs
* MySQL - Crash Recovery Attempts by Host
* MySQL - Number of Replication Completion Events by Host
* MySQL - Replication Failures by Host
* MySQL - Server Latest Replication State
* MySQL - Server Latest Running State
* MySQL - Server Up-Down Events by Host

### Searches based on Slow Query logs
* Slow Query Server Location. If your servers are not using private IP addresses, you can use the Slow Query Server Location search to visualize their locations on a map of the world.

## Log and Metrics Types
The Sumo Logic app for MySQL assumes the default MySQL Error log file format for error logs, and the MySQL Slow Query file format for slow query logs. For a list of metrics that are collected and used by the app, see [MySQL Metrics](#MySQL_Metrics).
* The **MySQL - Overview** dashboard is based on logs from both the Error and Slow Query log formats, so as to correlate information between the two.
* Dashboards in the Metrics folder are based on MySQL metrics.
* Dashboards in the Logs folder are based on MySQL logs from both the Error and Slow Query log formats.
    * Dashboards based on the Error format:
        * **MySQL - Error Logs**
        * **MySQL - Failed Logins**
        * **MySQL - Replication**
    * Dashboard based on Slow Query format:
        * **MySQL - Slow Queries**
* **MySQL General Health** is based on logs from the MySQL Error log format.
* **MySQL Replication** is based on logs from the MySQL Error log format.
* **MySQL Slow Queries** is based on logs from the MySQL Slow Queries log format.

The MySQL app dashboards dependent on error logs are based on the message types ERROR, NOTE, Warning, and Info. For more details on the MySQL log file format, see [http://dev.mysql.com/doc/refman/5.5/en/server-logs.html](http://dev.mysql.com/doc/refman/5.5/en/server-logs.html).

### Sample Logs

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
	"timestamp":1617810938497,
	"log":"2021-04-07T15:55:34.261220Z 0 [System] [MY-010931] [Server] /opt/bitnami/mysql/bin/mysqld: ready for connections. Version: '8.0.23'  socket: '/opt/bitnami/mysql/tmp/mysql.sock'  port: 3306  Source distribution.",
	"stream":"stdout",
	"time":"2021-04-07T15:55:34.261397194Z"
}
```

</TabItem>
<TabItem value="non-k8s">

```json
210408 00:00:19 [Note] /usr/sbin/mysqld: ready for connections.
```

</TabItem>
</Tabs>

### Sample Queries

This sample query is from the MySQL - Logs dashboard > Logs panel.

<Tabs
  groupId="k8s-nonk8s"
  defaultValue="k8s"
  values={[
    {label: 'Kubernetes environments', value: 'k8s'},
    {label: 'Non-Kubernetes environments', value: 'non-k8s'},
  ]}>

<TabItem value="k8s">

```sql title="Query String - Top 10 Slow Queries by Average Execution Time"
db_system=mysql db_cluster={{db_cluster}} "User@Host" "Query_time"  
| parse regex "(?<query_block># User@Host:[\S\s]+?SET timestamp=\d+;[\S\s]+?;)" multi
| parse regex field=query_block "# User@Host: \S+?\[(?<user>\S*?)\] @ (?<host_name>\S+)\s\[(?<ip_addr>\S*?)\]" nodrop // Pttrn1-vrtn1
| parse regex field=query_block "# User@Host: \S+?\[(?<user>\S*?)\] @\s+\[(?<ip_addr>\S*?)\]\s+Id:\s+(?<Id>\d{1,10})" nodrop // Pttrn1-vrtn2
| parse regex field=query_block "# User@Host: \S+?\[(?<user>\S*?)\] @ (?<host_name>\S+)\s\[(?<ip_addr>\S*?)\]\s+Id:\s+(?<Id>\d{1,10})" // Pttrn1-vrtn3
| parse regex field=query_block "Schema: (?<schema>(?:\S*|\s)?)\s*Last_errno[\s\S]+?Query_time:\s+(?<query_time>[\d.]*)\s+Lock_time:\s+(?<lock_time>[\d.]*)\s+Rows_sent:\s+(?<rows_sent>[\d.]*)\s+Rows_examined:\s+(?<rows_examined>[\d.]*)\s+Rows_affected:\s+(?<rows_affected>[\d.]*)\s+Rows_read:\s+(?<rows_read>[\d.]*)\n" nodrop // Pttrn2-vrtn1
| parse regex field=query_block "Schema: (?<schema>(?:\S*|\s)?)\s*Last_errno[\s\S]+?\s+Killed:\s+\d+\n" nodrop // Pttrn2-vrtn2
| parse regex field=query_block "Query_time:\s+(?<query_time>[\d.]*)\s+Lock_time:\s+(?<lock_time>[\d.]*)\s+Rows_sent:\s+(?<rows_sent>[\d]*)\s+Rows_examined:\s+(?<rows_examined>[\d]*)\s+Rows_affected:\s+(?<rows_affected>[\d]*)\s+" nodrop // Pttrn2-vrtn3
| parse regex field=query_block "Query_time:\s+(?<query_time>[\d.]*)\s+Lock_time:\s+(?<lock_time>[\d.]*)\s+Rows_sent:\s+(?<rows_sent>[\d]*)\s+Rows_examined:\s+(?<rows_examined>[\d]*)" // Pttrn2-vrtn4
| parse regex field=query_block "# Bytes_sent:\s+(?<bytes_sent>\d*)\s+Tmp_tables:\s+(?<tmp_tables>\d*)\s+Tmp_disk_tables:\s+(?<temp_disk_tables>\d*)\s+Tmp_table_sizes:\s+(?<tmp_table_sizes>\d*)\n" nodrop // Pttrn3-vrtn1
| parse regex field=query_block "# Bytes_sent:\s+(?<bytes_sent>\d*)\n" nodrop // Pttrn3-vrtn2
| parse regex field=query_block "SET timestamp=(?<set_timestamp>\d*);(?:\\n|\n)(?<sql_cmd>[\s\S]*);" nodrop
| fields -query_block
| avg(query_time) as avg_time, sum(query_time) as total_time, min(query_time) as min_time, max(query_time) as max_time, avg(rows_examined) as avg_rows_examined, avg(rows_sent) as avg_rows_sent, avg(Lock_Time) as avg_lock_time, count as frequency group by sql_cmd, db_cluster
| sort by avg_time | limit 10
```

</TabItem>
<TabItem value="non-k8s">

```sql title="Query String - Top 10 Slow Queries by Average Execution Time"
db_system=mysql db_cluster={{db_cluster}} "User@Host" "Query_time"  
| parse regex "(?<query_block># User@Host:[\S\s]+?SET timestamp=\d+;[\S\s]+?;)" multi
| parse regex field=query_block "# User@Host: \S+?\[(?<user>\S*?)\] @ (?<host_name>\S+)\s\[(?<ip_addr>\S*?)\]" nodrop // Pttrn1-vrtn1
| parse regex field=query_block "# User@Host: \S+?\[(?<user>\S*?)\] @\s+\[(?<ip_addr>\S*?)\]\s+Id:\s+(?<Id>\d{1,10})" nodrop // Pttrn1-vrtn2
| parse regex field=query_block "# User@Host: \S+?\[(?<user>\S*?)\] @ (?<host_name>\S+)\s\[(?<ip_addr>\S*?)\]\s+Id:\s+(?<Id>\d{1,10})" // Pttrn1-vrtn3
| parse regex field=query_block "Schema: (?<schema>(?:\S*|\s)?)\s*Last_errno[\s\S]+?Query_time:\s+(?<query_time>[\d.]*)\s+Lock_time:\s+(?<lock_time>[\d.]*)\s+Rows_sent:\s+(?<rows_sent>[\d.]*)\s+Rows_examined:\s+(?<rows_examined>[\d.]*)\s+Rows_affected:\s+(?<rows_affected>[\d.]*)\s+Rows_read:\s+(?<rows_read>[\d.]*)\n" nodrop // Pttrn2-vrtn1
| parse regex field=query_block "Schema: (?<schema>(?:\S*|\s)?)\s*Last_errno[\s\S]+?\s+Killed:\s+\d+\n" nodrop // Pttrn2-vrtn2
| parse regex field=query_block "Query_time:\s+(?<query_time>[\d.]*)\s+Lock_time:\s+(?<lock_time>[\d.]*)\s+Rows_sent:\s+(?<rows_sent>[\d]*)\s+Rows_examined:\s+(?<rows_examined>[\d]*)\s+Rows_affected:\s+(?<rows_affected>[\d]*)\s+" nodrop // Pttrn2-vrtn3
| parse regex field=query_block "Query_time:\s+(?<query_time>[\d.]*)\s+Lock_time:\s+(?<lock_time>[\d.]*)\s+Rows_sent:\s+(?<rows_sent>[\d]*)\s+Rows_examined:\s+(?<rows_examined>[\d]*)" // Pttrn2-vrtn4
| parse regex field=query_block "# Bytes_sent:\s+(?<bytes_sent>\d*)\s+Tmp_tables:\s+(?<tmp_tables>\d*)\s+Tmp_disk_tables:\s+(?<temp_disk_tables>\d*)\s+Tmp_table_sizes:\s+(?<tmp_table_sizes>\d*)\n" nodrop // Pttrn3-vrtn1
| parse regex field=query_block "# Bytes_sent:\s+(?<bytes_sent>\d*)\n" nodrop // Pttrn3-vrtn2
| parse regex field=query_block "SET timestamp=(?<set_timestamp>\d*);(?:\\n|\n)(?<sql_cmd>[\s\S]*);" nodrop
| fields -query_block
| avg(query_time) as avg_time, sum(query_time) as total_time, min(query_time) as min_time, max(query_time) as max_time, avg(rows_examined) as avg_rows_examined, avg(rows_sent) as avg_rows_sent, avg(Lock_Time) as avg_lock_time, count as frequency group by sql_cmd, db_cluster
| sort by avg_time | limit 10
```

</TabItem>
</Tabs>

## Collecting Logs and Metrics for MySQL

Configuring log and metric collection for the MySQL app includes the following tasks.

### Step 1: Configure Fields in Sumo Logic

Create the following Fields in Sumo Logic prior to configuring the collection. This ensures that your logs and metrics are tagged with relevant metadata, which is required by the app dashboards. For information on setting up fields, see [Sumo Logic Fields](/docs/manage/fields.md).

<Tabs
  groupId="k8s-nonk8s"
  defaultValue="k8s"
  values={[
    {label: 'Kubernetes environments', value: 'k8s'},
    {label: 'Non-Kubernetes environments', value: 'non-k8s'},
  ]}>

<TabItem value="k8s">

If you're using MySQL in a Kubernetes environment, create the fields:

* `pod_labels_component`
* `pod_labels_environment`
* `pod_labels_db_system`
* `pod_labels_db_cluster`
* `pod_labels_db_cluster_address`
* `pod_labels_db_cluster_port`

</TabItem>
<TabItem value="non-k8s">

If you're using MySQL in a non-Kubernetes environment, create the fields:

* `component`
* `environment`
* `db_system`
* `db_cluster`
* `db_cluster_address`
* `db_cluster_port`

</TabItem>
</Tabs>

### Step 2: Configure MySQL Logs and Metrics Collection

<Tabs
  groupId="k8s-nonk8s"
  defaultValue="k8s"
  values={[
    {label: 'Kubernetes environments', value: 'k8s'},
    {label: 'Non-Kubernetes environments', value: 'non-k8s'},
  ]}>

<TabItem value="k8s">

In Kubernetes environments, we use the Telegraf Operator, which is packaged with our Kubernetes collection. For more information, see [Telegraf Collection Architecture](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/telegraf-collection-architecture).

The diagram below illustrates how data is collected from MySQL in Kubernetes environments. In the architecture shown below, there are four services that make up the metric collection pipeline: Telegraf, Telegraf Operator, Prometheus, and [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector).

<br/><img src={useBaseUrl('img/integrations/databases/k8s-flow.png')} alt="K8s flow" />

The first service in the metrics pipeline is Telegraf. Telegraf collects metrics from MySQL. Note that we’re running Telegraf in each pod we want to collect metrics from as a sidecar deployment: that is, Telegraf runs in the same pod as the containers it monitors. Telegraf uses the [MySQL input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mysql) to obtain metrics. (For simplicity, the diagram doesn’t show the input plugins.) The injection of the Telegraf sidecar container is done by the Telegraf Operator.
Prometheus pulls metrics from Telegraf and sends them to [Sumo Logic Distribution for OpenTelemetry Collector](https://github.com/SumoLogic/sumologic-otel-collector) which enriches metadata and sends metrics to Sumo Logic.

In the logs pipeline, Sumo Logic Distribution for OpenTelemetry Collector collects logs written to standard out and forwards them to another instance of Sumo Logic Distribution for OpenTelemetry Collector, which enriches metadata and sends logs to Sumo Logic.

:::note prerequisites
Ensure that you are monitoring your Kubernetes clusters with the Telegraf operator. If you're not, see [Install Telegraf](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf.md).  
:::

#### Step 1: Configure Metrics collection

This configures metrics collection from Kubernetes.

1. Add the following annotations to your MySQL pods, and make the edits described [below](#metric-annotations):
```sql
primary:
  podAnnotations:
    telegraf.influxdata.com/class: sumologic-prometheus
    prometheus.io/scrape: "true"
    prometheus.io/port: "9273"
    telegraf.influxdata.com/inputs: |+
      [[inputs.mysql]]
       servers = ["user:passwd@tcp(localhost:3306)/?tls=false"]
        table_schema_databases = []
        gather_slave_status = true
        gather_global_variables = true
        gather_table_io_waits = true
        gather_table_lock_waits = true
        gather_index_io_waits = true
        gather_event_waits = true
        gather_file_events_stats = true
        gather_perf_events_statements = true
        [inputs.mysql.tags]
        environment = "ENV_TO_BE_CHANGED"
        component = "database"
        db_system = "mysql"
        db_cluster = "ENV_TO_BE_CHANGED"
        db_cluster_address = "ENV_TO_BE_CHANGED"
        db_cluster_port = "ENV_TO_BE_CHANGED"
    tailing-sidecar: sidecarconfig;slowlog:data:/bitnami/mysql/data/mysql-release-0-slow.log
```

2. Enter values for the following parameters in your annotations:
   * `telegraf.influxdata.com/inputs`. This contains the required configuration for the Telegraf MySQL Input plugin. For information on configuring the MySQL input plugin for Telegraf, see the MySQL Input Plugin [Readme](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mysql). Because Telegraf will be run as a sidecar the host should always be localhost.
   * In `[[inputs.mysql]]`:
      * `servers.` The URL to the MySQL server
      * Configure metrics to collect by uncommenting or setting the following parameters. For more information, see the MySQL Input Plugin [README](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mysql).
         * `table_schema_databases = []`
         * `gather_slave_status = true`
         * `gather_global_variables = true`
         * `gather_table_io_waits = true`
         * `gather_table_lock_waits = true`
         * `gather_index_io_waits = true`
         * `gather_event_waits = true`
         * `gather_file_events_stats = true`
         * `gather_perf_events_statements = true`
    * In `[inputs.mysql.tags]`:
        * `environment`. This is the deployment environment where the MySQL cluster identified by the value of `servers` resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
        * `db_cluster`. Enter a name to uniquely identify this MySQL cluster. This cluster name will be shown in the Sumo Logic dashboards.
        * `db_cluster_address` - Enter the cluster hostname or ip address that is used by the application to connect to the database. It could also be the load balancer or proxy endpoint.
        * `db_cluster_port` - Enter the database port. If not provided, a default port will be used.
:::note
`db_cluster_address` and `db_cluster_port` should reflect the exact configuration of DB client configuration in your application, especially if you instrument it with OT tracing. The values of these fields should match exactly the connection string used by the database client (reported as values for net.peer.name and net.peer.port metadata fields).

For example, if your application uses “mysql-prod.sumologic.com:3306” as the connection string, the field values should be set as follows: `db_cluster_address=mysql-prod.sumologic.com db_cluster_port=3306`

If your application connects directly to a given MySQL node, rather than the whole cluster, use the application connection string to override the value of the “host” field in the Telegraf configuration: `host=mysql-prod.sumologic.com`

Pivoting to Tracing data from Entity Inspector is possible only for “MySQL address” Entities.
:::
    * **DO NOT MODIFY** these configuration options; changing them will prevent the MySQL app from functioning correctly.
      * `telegraf.influxdata.com/class: sumologic-prometheus` instructs the Telegraf operator what output to use.
      * `prometheus.io/scrape: "true"` ensures Prometheus will scrape the metrics.
      * `prometheus.io/port: "9273"` tells Prometheus what ports to scrape on.
      * `telegraf.influxdata.com/inputs`
        * In the `[inputs.mysql.tags]` section:
        * `component: "database"` is used by the Sumo Logic app to identify application components.
        * `db_system: "mysql"` identifies the database system.
    * For information about properties that can be configured globally in the Telegraf agent, see the [Configuration](https://github.com/influxdata/telegraf/blob/master/docs/CONFIGURATION.md) documentation for Telegraf.
3. Sumo Logic Kubernetes collection will automatically start collecting metrics from the pods with the labels and annotations you added in the previous step.
4. To verify the metrics have been ingested, run this metrics query:
  ```sql
  db_cluster=<your_mysql_cluster_name> component="database" and db_system="mysql"
  ```

#### Configure Logs collection

This section explains the steps to collect MySQL logs from a Kubernetes environment.

1. Follow the steps in [Method A](#Option_A:_Collect_MySQL_logs_written_to_standard_output) or [Method B](#Option_B:_Collect_MySQL_logs_written_to_log_files), depending on whether your logs are being written to standard output or to log files.

<details><summary>Method 1: Collect MySQL logs written to standard output</summary>

If your MySQL Helm chart/pod is writing the logs to standard output, follow these steps:

Apply the following labels to your MySQL pods:
```sql
labels:
    environment: "prod"
    component: "database"
    db_system: "mysql"
    db_cluster: "your_mysql_cluster_name"
```
Enter in values for the following parameters (marked `CHANGEME` in the snippet above):

* `environment.` This is the deployment environment where the MySQL cluster identified by the value of `servers` resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
* `db_cluster`. Enter a name to identify this MySQL cluster. This cluster name will be shown in the Sumo Logic dashboards.

There are additional configuration options that you should **not** modify, as changing them will prevent the MySQL app from functioning correctly. **The settings you should not modify are:**
* `component: "database"` is used by Sumo Logic apps to identify application components.
* `db_system: "mysql"` identifies the database system.

For information about properties that can be configured globally in the Telegraf agent, see the [Configuration](https://github.com/influxdata/telegraf/blob/master/docs/CONFIGURATION.md) documentation for Telegraf.

The Sumo Logic Kubernetes Collection process will automatically capture the logs from stdout and send the logs to Sumo Logic. For more information on deploying the sumologic-kubernetes-collection, see [Collect Logs and Metrics for the Kubernetes app](/docs/integrations/containers-orchestration/kubernetes#Collect_Logs_and_Metrics_for_the_Kubernetes_App).

</details>

<details><summary>Method B: Collect MySQL logs written to log files</summary>

This method is recommend for Slow Query Logs. If your MySQL helm chart/pod is writing its logs to log files, you can use a sidecar to send log files to standard out. To do so:

1. Determine the location of the MySQL log file on Kubernetes. You can determine this from the `my.cnf` file for your MySQL cluster along with the volume mounts on the MySQL pods.
2. Install the Sumo Logic [tailing sidecar operator](https://github.com/SumoLogic/tailing-sidecar/tree/main/operator#deploy-tailing-sidecar-operator).
3. Add the following annotation in addition to the existing annotations.
```yml
   primary:
     podAnnotations:
      tailing-sidecar: sidecarconfig;container_name:<mount_volume>:<path_of_mysql_log_file>/<mysql_log_file_name>
```

For example:
```yml
 primary:
   podAnnotations:
    tailing-sidecar: sidecarconfig;slowlog:data:/bitnami/mysql/data/mysql-release-0-slow.log
```

To verify that the MySQL pods are running and annotations are applied, run this command:
```bash
kubectl describe pod <mysql_pod_name>
```

Sumo Logic Kubernetes collection will automatically start collecting logs from the pods having the annotations defined above.

</details>

2. **Add an FER to normalize the fields in Kubernetes environments**. This step is not needed if using application components solution terraform script. Labels created in Kubernetes environments are automatically prefixed with pod_labels. To normalize these for our app to work, we'll create a [Field Extraction Rule](/docs/manage/field-extractions/create-field-extraction-rule), Database Application Components, assuming it does not already exist:
   1. Go to **Manage Data > Logs > Field Extraction Rules**.
   2. Click the **+ Add**.
   3. The **Add Field Extraction** pane appears.
   4. **Rule Name.** Enter "App Observability - Database".
   5. **Applied At**. Choose "Ingest Time".
   6. **Scope**. Select "Specific Data".
     * **Scope**. Enter the following keyword search expression:  
      ```sql
      pod_labels_environment=* pod_labels_component=database pod_labels_db_system=* pod_labels_db_cluster=*
      ```
     * **Parse Expression**. Enter the following parse expression:
     ```sql
     | if (!isEmpty(pod_labels_environment), pod_labels_environment, "") as environment
     | pod_labels_component as component
     | pod_labels_db_system as db_system
     | if (!isEmpty(pod_labels_db_cluster), pod_labels_db_cluster, null) as db_cluster
     ```
   7. Click **Save** to create the rule.
   8. To verify that logs are flowing into Sumo Logic, run this query:
    ```sql
    component=database db_system=mysql db_cluster=<your_mysql_cluster_name>
    ```

</TabItem>
<TabItem value="non-k8s">

In non-Kubernetes environments, we use the Telegraf Operator for MySQL metric collection and a Sumo Logic Installed Collector for collecting MySQL logs.

The diagram below illustrates the components of the MySQL collection in a non-Kubernetes environment for each database server. Telegraf runs on the same host as MySQL, and uses the [MySQL input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mysql) to obtain MySQL metrics, and the [Sumo Logic output plugin](https://github.com/SumoLogic/fluentd-output-sumologic) to send the metrics to Sumo Logic. MySQL logs are sent to a Sumo Logic Local File source on an Installed Collector.

<img src={useBaseUrl('img/integrations/databases/non-k8s.png')} alt="non-K8s flow" />

#### Configure Metrics collection

1. **Configure a Hosted Collector**. For instructions, see [Configure a Hosted Collector](/docs/send-data/hosted-collectors/configure-hosted-collector).
2. **Configure an HTTP Logs and Metrics Source.** For instructions, see [HTTP Logs and Metrics Source](/docs/send-data/hosted-collectors/http-source/logs-metrics). Make a note of the HTTP Source URL.
3. **Install Telegraf**. For instructions see [Install Telegraf](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf.md).
4. **Configure and start Telegraf**. As part of collecting metrics data from Telegraf, we use the [MySQL input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mysql) to get data from Telegraf and the [Sumo Logic output plugin](https://github.com/SumoLogic/fluentd-output-sumologic) to send data to Sumo Logic.
5. Create or modify the `telegraf.conf` file, and copy the following into the relevant sections.
```sql
[[inputs.mysql]]
  servers = ["user:passwd@tcp(127.0.0.1:3306)/?tls=false"]
  table_schema_databases = []
  gather_slave_status = true
  gather_global_variables = true
  gather_table_io_waits = true
  gather_table_lock_waits = true
  gather_index_io_waits = true
  gather_event_waits = true
  gather_file_events_stats = true
  gather_perf_events_statements = true
  [inputs.mysql.tags]
   environment = "ENV_TO_BE_CHANGED"
   component = "database"
   db_system = "mysql"
   db_cluster = "ENV_TO_BE_CHANGED"
   db_cluster_address = "ENV_TO_BE_CHANGED"
   db_cluster_port = "ENV_TO_BE_CHANGED"
[[outputs.sumologic]]
   url = "CHANGEME"--HTTP Source URL created in Step 2  
   data_format = "prometheus"

[agent]
  interval = "60s"
  flush_interval = "60s"
```
6. Follow the instructions in [Setting values in telegraf.conf](#Setting_values_in_telegraf.conf) below to configure the settings in the `.conf` file.
7. After updating the `telegraf.conf` file, start or reload the telegraf service using the [instructions](https://docs.influxdata.com/telegraf/v1.17/introduction/getting-started/#start-telegraf-service) in Telegraf documentation.
8. At this point, MySQL metrics should start flowing into Sumo Logic.
9. **Setting values in telegraf.conf**. Make the following updates to `telegraf.conf`.
   * In the `[[inputs.mysql]]` section, set `servers` to the URL of your MySQL server. For information about additional input plugin configuration options, see the [Readme](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mysql) for the MySQL input plugin.
   * Configure the metrics to collect by uncommenting the following lines. For more information, see this [section](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mysql#configuration) of the Readme.  
    ```sql
    [[inputs.mysql]]
     table_schema_databases = []
     gather_slave_status = true
     gather_global_variables = true
     gather_table_io_waits = true
     gather_table_lock_waits = true
     gather_index_io_waits = true
     gather_event_waits = true
     gather_file_events_stats = true
     gather_perf_events_statements = true
    ```
   * In the `[inputs.mysql.tags]` section:
      * `environment` - Specify the deployment environment where the MySQL cluster identified by the value of `servers` resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
      * `db_cluster` - Enter a name to uniquely identify the MySQL cluster. This cluster name will be shown in the Sumo Logic dashboards.
      * `db_cluster_address` - Enter the cluster hostname or ip address that is used by the application to connect to the database. It could also be the load balancer or proxy endpoint.
      * `db_cluster_port` - Enter the database port. If not provided, a default port will be used.
:::note
`db_cluster_address` and `db_cluster_port` should reflect the exact configuration of DB client configuration in your application, especially if you instrument it with OT tracing. The values of these fields should match exactly the connection string used by the database client (reported as values for net.peer.name and net.peer.port metadata fields).

For example, if your application uses `“mysql-prod.sumologic.com:3306”` as the connection string, the field values should be set as follows: `db_cluster_address=mysql-prod.sumologic.com db_cluster_port=3306`.

If your application connects directly to a given MySQL node, rather than the whole cluster, use the application connection string to override the value of the “host” field in the Telegraf configuration: `host=mysql-prod.sumologic.com`

Pivoting to Tracing data from Entity Inspector is possible only for “MySQL address” Entities.
:::
   * In the `[[outputs.sumologic]]` section, set `url` to the HTTP source URL created in Step 2 (Configure an HTTP Logs and Metrics Source). For information about additional output plugin configuration options, see [Configure Telegraf Output Plugin for Sumo Logic](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/configure-telegraf-output-plugin.md).
   * In the `[agent]` section, set `interval` and `flush_interval` to `“60s”` to collect metrics every 60 seconds.

**Do not modify** these configuration options. Changing them will prevent the MySQL app from functioning correctly.
* `data_format = "prometheus"`, in the output plugins section, causes metrics to be sent in the Prometheus format to Sumo Logic.
* `component = "database"`, in the input plugins section, is used by the Sumo Logic app to identify application components.
* `db_system = "mysql"`, in the input plugins section, identifies the database system.

For information about properties that can be configured globally in the Telegraf agent, see the [Configuration](https://github.com/influxdata/telegraf/blob/master/docs/CONFIGURATION.md) documentation for Telegraf.


#### Configure Log Collection

This section provides instructions for configuring collection of logs for MySQL running on a non-Kubernetes environment. MySQL logs are stored in log files. Slow query logs must be explicitly enabled to be able to be written to a log file.

Sumo Logic supports collecting logs via a local log file. Local log files can be collected by Sumo Logic [Installed Collectors](/docs/send-data/installed-collectors), which requires you to allow outbound traffic to Sumo Logic [endpoints](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security) for collection to work.

1. **Configure MySQL to log to a local file(s)**. MySQL logs written to a log file can be collected via the Local File Source of a Sumo Logic Installed Collector. To configure the MySQL log file(s), locate your local `my.cnf` configuration file in the database directory.
   1. Open `my.cnf` in a text editor.
   2. Set the following parameters in the `[mysqld]` section:
   ```sql
   [mysqld]
       log_error = /var/log/mysql/error.log
       slow_query_log=1
       slow_query_log_file = /var/log/mysql/mysql-slow.log
       long_query_time=2
       long_query_time=2
   ```
     * [Error Logs](https://dev.mysql.com/doc/refman/5.7/en/slow-query-log.html). By default, error logs are enabled and are logged at file specified by the `log_error` key.
     * [Slow Query Logs](https://dev.mysql.com/doc/refman/5.7/en/slow-query-log.html). `slow_query_log=1` enables logging of slow queries to the file specified by `slow_query_log_file`. Setting `long_query_time=2` will cause queries that take more than two seconds to execute to be logged. The default value of `long_query_time` is 10 seconds.
     * [General Query Logs](https://dev.mysql.com/doc/refman/5.7/en/query-log.html). We don't recommend enabling `general_log` for performance reasons. These logs are not used by the Sumo Logic MySQL app.
   3. Save the `my.cnf` file.
   4. Restart the MySQL server:
    ```bash
    sudo mysql.server restart
    ```
2. **Configure an [Installed Collector](/docs/send-data/installed-collectors)**.
3. **Add a [Local File Source](/docs/send-data/installed-collectors/sources/local-file-source) for MySQL error logs**.
   1. Add a Local File Source in the installed collector configured in the previous step. Configure the Local File Source fields as follows:
      * **Name.** (Required)
      * **Description**. (Optional)
      * **File Path** (Required). Enter the path to your error.log. The files are typically located in `/var/log/mysql/error.log`. If you're using a customized path, check the `my.cnf` file for this information.
      * **Source Host**. Sumo Logic uses the hostname assigned by the OS unless you enter a different host nameSource Category. Enter any string to tag the output collected from this Source, such as Prod/MySQL/Error. (The Source Category metadata field is a fundamental building block to organize and label Sources. For details see [Best Practices](/docs/send-data/best-practices).)
      * **Fields**. Set the following fields. For more information, see [Fields](/docs/manage/fields.md).
      * `component = database`
      * `db_system = mysql`
      * `db_cluster = <your_mysql_cluster_name>`
      * `environment = <Environment_Name>`, such as dev, qa, or prod.
      * `db_cluster_address` - Enter the cluster hostname or ip address that is used by the application to connect to the database. It could also be the load balancer or proxy endpoint.
      * `db_cluster_port` - Enter the database port. If not provided, a default port will be used.
      The values of `db_cluster` and `environment` should match those configured in the [Setting values in telegraf.conf](#Setting_values_in_telegraf.conf) above.
      :::note
      `db_cluster_address` and `db_cluster_port` should reflect the exact configuration of DB client configuration in your application, especially if you instrument it with OT tracing. The values of these fields should match exactly the connection string used by the database client (reported as values for `net.peer.name` and `net.peer.port` metadata fields).

      For example, if your application uses `“mysql-prod.sumologic.com:3306”` as the connection string, the field values should be set as follows: `db_cluster_address=mysql-prod.sumologic.com db_cluster_port=3306`.

      If your application connects directly to a given MySQL node, rather than the whole cluster, use the application connection string to override the value of the “host” field in the Telegraf configuration: `host=mysql-prod.sumologic.com`

      Pivoting to Tracing data from Entity Inspector is possible only for “MySQL address” Entities.
      :::
   2. In the **Advanced Options for Logs** section:
      * **Enable Timestamp Parsing**. Select "Extract timestamp information from log file entries".
      * **Time Zone**. Select "Use time zone form log file, if none is detected use Use Collector Default”.
      * **Timestamp Format**. Select "Automatically detect the format."
      * **Encoding**. Select UTF-8 (Default).
      * **Enable Multiline Processing**
      * **Detect Messages Spanning Multiple Lines.** True
      * **Infer Boundaries - Detect message boundaries automatically**. False
      * **Boundary Regex.**
        * If error messages starts like `2021-05-11T10:12:55.421100Z` then use boundary regex as below `^\d{4}-\d{2}-\d{2}T\d{1,2}:\d{1,2}:\d{1,2}.*`
        * If error messages starts like `210511 11:20:40` then use boundary regex as below `^\d{6}\s+\d{1,2}:\d{1,2}:\d{1,2}.*`
   3. Click **Save**.

At this point, MySQL error logs should start flowing into Sumo Logic.

4. **Configuring a [Local File Source](/docs/send-data/installed-collectors/sources/local-file-source) for slow query log**.
   1. Add a Local File Source in the installed collector configured in the previous step. Configure the Local File Source fields as follows:
      * **Name.** (Required)
      * **Description**. (Optional)
      * **File Path** (Required). Enter the path to your `mysql-slow.log`. The file is typically located in `/var/log/mysql/mysql-slow.log`. If you're using a customized path, check `my.cnf` file for this information.
      * **Source Host**. Sumo Logic uses the hostname assigned by the OS unless you enter a different host name
      * **Source Category**. Enter any string to tag the output collected from this Source, such as Prod/MySQL/Error. (The Source Category metadata field is a fundamental building block to organize and label Sources. For details see [Best Practices](/docs/send-data/best-practices).)
      * **Fields**. Set the following fields. For more information, see [Fields](/docs/manage/fields.md).
        * `component = database`
        * `db_system = mysql`
        * `db_cluster = <your_mysql_cluster_name>`
        * `environment = <Environment_Name>`, such as dev, qa, or prod.
        * `db_cluster_address` - Enter the cluster hostname or ip address that is used by the application to connect to the database. It could also be the load balancer or proxy endpoint.
        * `db_cluster_port` - Enter the database port. If not provided, a default port will be used.
       The values of `db_cluster` and `environment` should match those configured in the [Setting values in telegraf.conf](#Setting_values_in_telegraf.conf) above.
       :::note
       `db_cluster_address` and `db_cluster_port` should reflect exact configuration of DB client configuration in your application, especially if you instrument it with OT tracing. The values of these fields should match exactly the connection string used by the database client (reported as values for net.peer.name and net.peer.port metadata fields).

       For example, if your application uses `“mysql-prod.sumologic.com:3306”` as the connection string, the field values should be set as follows: `db_cluster_address=mysql-prod.sumologic.com db_cluster_port=3306`

       If your application connects directly to a given mysql node, rather than the whole cluster, use the application connection string to override the value of the “host” field in the Telegraf configuration: `host=mysql-prod.sumologic.com`.

       Pivoting to Tracing data from Entity Inspector is possible only for “MySQL address” Entities.
       :::
   2. In the **Advanced Options for Logs** section:
      * **Enable Timestamp Parsing**. Select "Extract timestamp information from log file entries".
      * **Time Zone**. Select "Use time zone form log file, if none is detected use Use Collector Default".
      * **Timestamp Format**. Select "Automatically detect the format".
      * **Encoding**. Select "UTF-8" (Default).
      * **Enable Multiline Processing**
        * **Detect Messages Spanning Multiple Lines.** True
        * **Infer Boundaries - Detect message boundaries automatically**. False
        * **Boundary Regex**. `^#\sTime:\s.*`
   3. Click **Save**.

At this point, MySQL slow query logs should start flowing into Sumo Logic.

</TabItem>
</Tabs>

## Installing MySQL Monitors

The next few sections provide instructions for installing Sumo Logic Monitors for MySQL, the app and descriptions of each of the app dashboards. These instructions assume you have already set up collection as described in Collecting MySQL Logs and Metrics.

Sumo Logic has provided pre-packaged alerts available through [Sumo Logic monitors](/docs/alerts/monitors) to help you proactively determine if a MySQL cluster is available and performing as expected. These monitors are based on metric and log data and include pre-set thresholds that reflect industry best practices and recommendations. For more information about individual alerts, see [MySQL Alerts](#MySQL-Alerts).

To install these monitors, you must have the **Manage Monitors** role capability.

You can install monitors by importing a JSON file or using a Terraform script.

There are limits to how many alerts can be enabled. For more information, see [Monitors](/docs/alerts/monitors#Rules) for details.

### Method A: Install Monitors by importing a JSON file

1. Download the [JSON file](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/blob/main/monitor_packages/mysql/mysql.json) that describes the monitors.
2. Replace `$$mysql_data_source` with a custom source filter. To configure alerts for a specific database cluster, use a filter like `db_system=mysql` or `db_cluster=dev-mysql`. To configure the alerts for all of your clusters, set `$$mysql_data_source` to blank (`""`).
3. Go to **Manage Data > Alerts > Monitors**.
4. Click **Add**.
5. Click **Import.**
6. On the** Import Content popup**, enter "MySQL" in the Name field, paste in the JSON into the the popup, and click **Import**.  
7. The monitors are created in a "MySQL" folder. The monitors are disabled by default. See the [Monitors](/docs/alerts/monitors) topic for information about enabling monitors and configuring notifications or connections.


### Method B: Using a Terraform script

1. Generate an access key and access ID for a user that has the **Manage Monitors** role capability. For instructions see  [Access Keys](/docs/manage/security/access-keys#Create_an_access_key_on_Preferences_page).
2. Download [Terraform 0.13](https://www.terraform.io/downloads.html) or later, and install it.
3. Download the Sumo Logic Terraform package for MySQL monitors. The alerts package is available in the Sumo Logic github [repository](https://github.com/SumoLogic/terraform-sumologic-sumo-logic-monitor/tree/main/monitor_packages/mysql). You can either download it using the `git clone` command or as a zip file.
4. Alert Configuration: After extracting the package, navigate to the `terraform-sumologic-sumo-logic-monitor/monitor_packages/mysql/` directory.
   1. Edit the `mysql.auto.tfvars` file and add the Sumo Logic Access Key and Access ID from Step 1 and your Sumo Logic deployment. If you're not sure of your deployment, see [Sumo Logic Endpoints and Firewall Security](/docs/api/getting-started#sumo-logic-endpoints-by-deployment-and-firewall-security).
    ```sql
    access_id   = "<SUMOLOGIC ACCESS ID>"
    access_key  = "<SUMOLOGIC ACCESS KEY>"
    environment = "<SUMOLOGIC DEPLOYMENT>"
    ```
   2. The Terraform script installs the alerts without any scope filters. If you would like to restrict the alerts to specific clusters or environments, update the `mysql_data_source` variable. For example:
     * To configure alerts for a specific cluster, set `mysql_data_source` to something like `db_cluster=mysql.prod.01`
     * To configure alerts for all clusters in an environment Set mysql_data_source to something like `environment=prod`
     * To configure alerts for...Multiple clusters using a wildcard, set `mysql_data_source` to something like `db_cluster=mysql-prod*`
      * To configure alerts for a specific cluster within a specific environment, set `mysql_data_source` to something like `db_cluster=mysql-1` and `environment=prod`. This assumes you have configured and applied Fields as described in Step 1: Configure Fields of the Sumo Logic of the Collect Logs and Metrics for MySQL topic.

  All monitors are disabled by default on installation. To enable all of the monitors, set the `monitors_disabled` parameter to `false`. By default, the monitors will be located in a "MySQL" folder on the **Monitors** page. To change the name of the folder, update the monitor folder name in the `folder` variable in the `mysql.auto.tfvars` file.

5. If you want the alerts to send email or connection notifications, edit the `mysql_notifications.auto.tfvars` file to populate the `connection_notifications` and `email_notifications` sections. Examples are provided below.

In the variable definition below, replace `<CONNECTION_ID>` with the connection ID of the Webhook connection. You can obtain the Webhook connection ID by calling the [Monitors API](https://api.sumologic.com/docs/#operation/listConnections).

```sql title="Pagerduty connection example"
connection_notifications = [
    {
      connection_type       = "PagerDuty",
      connection_id         = "<CONNECTION_ID>",
      payload_override      = "{\"service_key\": \"your_pagerduty_api_integration_key\",\"event_type\": \"trigger\",\"description\": \"Alert: Triggered {{TriggerType}} for Monitor {{Name}}\",\"client\": \"Sumo Logic\",\"client_url\": \"{{QueryUrl}}\"}",
      run_for_trigger_types = ["Critical", "ResolvedCritical"]
    },
    {
      connection_type       = "Webhook",
      connection_id         = "<CONNECTION_ID>",
      payload_override      = "",
      run_for_trigger_types = ["Critical", "ResolvedCritical"]
    }
  ]
```

For information about overriding the payload for different connection types, see [Set Up Webhook Connections](/docs/alerts/webhook-connections/Set-Up-Webhook-Connections).

```sql title="Email notifications example"
email_notifications = [
    {
      connection_type       = "Email",
      recipients            = ["abc@example.com"],
      subject               = "Monitor Alert: {{TriggerType}} on {{Name}}",
      time_zone             = "PST",
      message_body          = "Triggered {{TriggerType}} Alert on {{Name}}: {{QueryURL}}",
      run_for_trigger_types = ["Critical", "ResolvedCritical"]
    }
  ]
```

6. Install Monitors.
   1. Navigate to the `terraform-sumologic-sumo-logic-monitor/monitor_packages/mysql/` directory and run `terraform init`. This will initialize Terraform and download the required components.
   2. Run `terraform plan` to view the monitors that Terraform will create or modify.
   3. Run `terraform apply`.


## Installing the MySQL app  

Now that you have set up collection for MySQL, install the Sumo Logic app for MySQL to use the preconfigured searches and [Dashboards](#Dashboards) that provide insight into your data.

Locate and install the app you need from the **App Catalog**. If you want to see a preview of the dashboards included with the app before installing, click **Preview Dashboards**.

1. From the App Catalog, search for and select the app.
1. Select the service version you're using and click Add to Library. Version selection applies only to a few apps currently. For more information, see the Install the Apps from the Library.
1. To install the app, complete the following fields.
   * **App Name**. You can retain the existing name or enter the app's name of your choice.
   * **Advanced**. Select the Location in the Library (the default is the Personal folder in the library), or click New Folder to add a new folder.
1. Click Add to Library.

Once an app is installed, it will appear in your Personal folder or another folder that you specified. From here, you can share it with your organization.

Panels will start to fill automatically. It's important to note that each panel slowly fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but with a bit of time, you'll see full graphs and maps.

## Viewing MySQL dashboards

:::tip Filter with template variables    
Template variables provide dynamic dashboards that can rescope data on the fly. As you apply variables to troubleshoot through your dashboard, you view dynamic changes to the data for a quicker resolution to the root cause. You can use template variables to drill down and examine the data on a granular level. For more information, see [Filter with template variables](/docs/dashboards-new/filter-template-variables.md).
:::

### Overview  

The** MySQL - Overview** dashboard gives you an at-a-glance view of the state of your database clusters by monitoring key cluster information such as errors, failed logins, errors, queries executed, slow queries, lock waits, uptime and more.

Use this dashboard to:
* Quickly identify the state of a given database cluster.

<img src={useBaseUrl('img/integrations/databases/MySQL-Overview.png')} alt="MySQL dashboard" />

### Error Logs  

The **MySQL - Error Logs** dashboard provides insight into database error logs by specifically monitoring database shutdown/start events, errors over time, errors, warnings, and crash recovery attempts.

Use this dashboard to:
* Quickly identify errors and patterns in logs for troubleshooting.
* Monitor trends in error logs and identify outliers.
* Ensure that server start, server stop and crash recovery events are in line with expectations.
* Dashboard filters allow you to narrow a search for database cluster.

<img src={useBaseUrl('img/integrations/databases/MySQL-Error-Logs.png')} alt="MySQL dashboard" />


### Failed Logins  

The **MySQL - Failed Logins** dashboard provides insights into all failed login attempts by location, users, and hosts.

Use this dashboard to:
* Monitor all failed login attempts and identify any unusual or suspicious activity.

<img src={useBaseUrl('img/integrations/databases/MySQL-Failed-Logins.png')} alt="MySQL dashboard" />

### Replication  

The **MySQL - Replication** dashboard provides insights into the state of database replication.

Use this dashboard to:
* Quickly determine reasons for replication failures.
* Monitor replication status trends.

<img src={useBaseUrl('img/integrations/databases/MySQL-Replication.png')} alt="MySQL dashboard" />

### Slow Queries

The **MySQL - Slow Queries** dashboard provides insights into all slow queries executed on the database.

Note: Slow queries are queries that take 10 seconds or more to execute (default value is 10 seconds as per mysql configuration which can be altered) and excessive slow queries are those that take 15 seconds or more to execute.  

Use this dashboard to:
* Identify all slow queries.
* Quickly determine which queries have been identified as slow or excessive slow queries.
* Monitor users and hosts running slow queries.
* Determine which SQL commands are slower than others.
* Examine slow query trends to determine if there are periodic performance bottlenecks in your database clusters.

<img src={useBaseUrl('img/integrations/databases/MySQL-Slow-Queries.png')} alt="MySQL dashboard" />

### Performance and Resource Metrics

The **MySQL - Performance and Resource Metrics** dashboard allows you to monitor the performance and resource usage of your database clusters.

Use this dashboard to:
* Understand the behavior and performance of your database clusters.
* Monitor key operational metrics around connections, network traffic, threads running, innodb waits, and locks.
* Monitor query execution trends to ensure they match up with expectations.
* Dashboard filters allow you to narrow a search for a specific database cluster.

<img src={useBaseUrl('img/integrations/databases/MySQL-Performance-and-Resource-Metrics.png')} alt="MySQL dashboard" />

### Performance Schema Metrics

The **MySQL - Performance Schema Metrics** dashboard provides insights into the metrics provided by the MySQL Performance Schema, which is a feature for monitoring MySQL Server execution at a low level.

Use this dashboard to:
* Monitor errors and warning for SQL statements.
* Monitor statements running without use of index columns.
* Monitor statistics such as Table and Index waits and read and write lock waits to optimize the performance of your database.

<img src={useBaseUrl('img/integrations/databases/MySQL-Performance-Schema-Metrics.png')} alt="MySQL dashboard" />

## MySQL Alerts

This section describes the monitors provided with the MySQL app. These monitors are built based on logs and metrics datasets and have preset thresholds based on industry best practices and recommendations.

<table>
  <tr>
   <td>Monitor name
   </td>
   <td>Monitor description
   </td>
   <td>Alert Condition
   </td>
   <td>Recovery Condition
   </td>
  </tr>
  <tr>
   <td>MySQL - Connection refused
   </td>
   <td>This alert fires when connections are refused when the limit of maximum connections is reached within 5 minute time interval.
   </td>
   <td> &#60;&#61; 1 </td>
   <td>&#62; 1
   </td>
  </tr>
  <tr>
   <td>MySQL - High average query run time
   </td>
   <td>This alert fires when the average run time of SQL queries for a given schema is greater than or equal to one second within a time interval of 5 minutes.
   </td>
   <td>&#62;&#61; 1 </td>
   <td> &#60; 1 </td>
  </tr>
  <tr>
   <td>MySQL - High Innodb buffer pool utilization</td>
   <td>This alert fires when we detect that the InnoDB buffer pool utilization is high (&#62;&#61;90%) within a 5 minute time interval.</td>
   <td>&#62;&#61; 90 </td>
   <td> &#60; 90 </td>
  </tr>
  <tr>
   <td>MySQL - Large number of aborted connections
   </td>
   <td>This alert fires when we detect that there are 5 or more aborted connections identified within a time interval of 5 minutes.
   </td>
   <td>&#62;&#61; 5
   </td>
   <td> &#60; 5
   </td>
  </tr>
  <tr>
   <td>MySQL - Large number of internal connection errors
   </td>
   <td>This alert fires when we detect that there are 5 or more internal connection errors within a time interval of 5 minutes.
   </td>
   <td>&#62;&#61; 5 </td>
   <td> &#60; 5
   </td>
  </tr>
  <tr>
   <td>MySQL - Large number of slow queries
   </td>
   <td>This alert fires when we detect that there are 5 or more slow queries within a 5 minute time interval.
   </td>
   <td>&#62;&#61; 5
   </td>
   <td> &#60; 5
   </td>
  </tr>
  <tr>
   <td>MySQL - Large number of statement errors
   </td>
   <td>This alert fires when we detect that there are 5 or more statement errors within a 5 minute time interval.
   </td>
   <td>&#62;&#61; 5
   </td>
   <td> &#60; 5
   </td>
  </tr>
  <tr>
   <td>MySQL - Large number of statement warnings
   </td>
   <td>This alert fires when we detect that there are 20 or more statement warnings within a 5 minute time interval.
   </td>
   <td>&#62;&#61; 20
   </td>
   <td> &#60; 20
   </td>
  </tr>
  <tr>
   <td>MySQL - No index used in the SQL statements
   </td>
   <td>This alert fires when we detect that there are 5 or more statements not using an index in the sql query within a 5 minute time interval.
   </td>
   <td>&#62;&#61; 5
   </td>
   <td> &#60; 5
   </td>
  </tr>
  <tr>
   <td>MySQL - Excessive Slow Query Detected
   </td>
   <td>This alert fires when we detect the average time to execute a query is more than 5 seconds over a 24 hour time-period
   </td>
   <td>&#62;&#61;1
   </td>
   <td> &#60; 1
   </td>
  </tr>
  <tr>
   <td>MySQL - Follower replication lag detected
   </td>
   <td>This alert fires when we detect that the average replication lag is greater than or equal to 900 seconds within a 5 minute time interval.
   </td>
   <td>&#62;&#61; 900
   </td>
   <td> &#60; 900
   </td>
  </tr>
  <tr>
   <td>MySQL - Instance down
   </td>
   <td>This alert fires when we detect that a MySQL instance is down within last 5 minutes interval.
   </td>
   <td>&#62;&#61;1
   </td>
   <td> &#60; 1
   </td>
  </tr>
</table>


## MySQL Metrics

Here are the Telegraf metrics for MySQL collected by the MySQL app.

<table>
  <tr>
   <td><small>
mysql_aborted_clients
<br/>
mysql_aborted_connects
<br/>
mysql_bytes_received
<br/>
mysql_bytes_sent
<br/>
mysql_commands_delete
<br/>
mysql_commands_insert
<br/>
mysql_commands_select
<br/>
mysql_commands_update
<br/>
mysql_connection_errors_internal
<br/>
mysql_connection_errors_max_connections
<br/>
mysql_connections
<br/>
mysql_created_tmp_disk_tables
<br/>
mysql_created_tmp_files
<br/>
mysql_created_tmp_tables
<br/>
mysql_innodb_buffer_pool_pages_free
<br/>
mysql_innodb_buffer_pool_pages_total
<br/>
mysql_innodb_buffer_pool_read_requests
<br/>
mysql_innodb_buffer_pool_reads
<br/>
mysql_innodb_buffer_pool_wait_free
<br/>
mysql_innodb_data_fsyncs
<br/>
mysql_innodb_data_read
<br/>
mysql_innodb_data_writes
<br/>
mysql_innodb_log_waits
<br/>
mysql_innodb_row_lock_current_waits
<br/>
mysql_innodb_row_lock_waits
<br/>
mysql_innodb_rows_deleted
<br/>
mysql_innodb_rows_inserted
<br/>
mysql_innodb_rows_read
<br/>
mysql_innodb_rows_updated
<br/>
mysql_locked_connects
<br/>
mysql_mysqlx_connections_accepted
<br/>
mysql_mysqlx_connections_closed
<br/>
mysql_mysqlx_connections_rejected
<br/>
mysql_mysqlx_worker_threads
<br/>
mysql_mysqlx_worker_threads_active
<br/>
mysql_opened_files
<br/>
mysql_opened_tables
<br/>
mysql_perf_schema_events_statements_errors_total
<br/>
mysql_perf_schema_events_statements_no_index_used_total
<br/>
mysql_perf_schema_events_statements_rows_affected_total
<br/>
mysql_perf_schema_events_statements_rows_examined_total
<br/>
mysql_perf_schema_events_statements_rows_sent_total
<br/>
mysql_perf_schema_events_statements_seconds_total
<br/>
mysql_perf_schema_events_statements_sort_merge_passes_total
<br/>
mysql_perf_schema_events_statements_sort_rows_total
<br/>
mysql_perf_schema_events_statements_tmp_disk_tables_total
<br/>
mysql_perf_schema_events_statements_tmp_tables_total
<br/>
mysql_perf_schema_events_statements_total
<br/>
mysql_perf_schema_events_statements_warnings_total
<br/>
mysql_perf_schema_index_io_waits_seconds_total_delete
</small>
</td>

<td><small>
mysql_perf_schema_index_io_waits_seconds_total_fetch
<br/>
mysql_perf_schema_index_io_waits_seconds_total_insert
<br/>
mysql_perf_schema_index_io_waits_seconds_total_update
<br/>
mysql_perf_schema_index_io_waits_total_delete
<br/>
mysql_perf_schema_index_io_waits_total_fetch
<br/>
mysql_perf_schema_index_io_waits_total_insert
<br/>
mysql_perf_schema_index_io_waits_total_update
<br/>
mysql_perf_schema_read
<br/>
mysql_perf_schema_read_high_priority
<br/>
mysql_perf_schema_read_no_insert
<br/>
mysql_perf_schema_read_normal
<br/>
mysql_perf_schema_read_with_shared_locks
<br/>
mysql_perf_schema_table_io_waits_seconds_total_delete
<br/>
mysql_perf_schema_table_io_waits_seconds_total_fetch
<br/>
mysql_perf_schema_table_io_waits_seconds_total_insert
<br/>
mysql_perf_schema_table_io_waits_seconds_total_update
<br/>
mysql_perf_schema_table_io_waits_total_delete
<br/>
mysql_perf_schema_table_io_waits_total_fetch
<br/>
mysql_perf_schema_table_io_waits_total_insert
<br/>
mysql_perf_schema_table_io_waits_total_update
<br/>
mysql_perf_schema_write
<br/>
mysql_perf_schema_write_allow_write
<br/>
mysql_perf_schema_write_concurrent_insert
<br/>
mysql_perf_schema_write_low_priority
<br/>
mysql_perf_schema_write_normal
<br/>
mysql_qcache_hits
<br/>
mysql_qcache_inserts
<br/>
mysql_queries
<br/>
mysql_questions
<br/>
mysql_select_full_join
<br/>
mysql_select_full_range_join
<br/>
mysql_select_range
<br/>
mysql_select_range_check
<br/>
mysql_select_scan
<br/>
mysql_slow_queries
<br/>
mysql_sort_merge_passes
<br/>
mysql_sort_range
<br/>
mysql_sort_rows
<br/>
mysql_sort_scan
<br/>
mysql_table_locks_immediate
<br/>
mysql_table_locks_waited
<br/>
mysql_table_open_cache_hits
<br/>
mysql_table_open_cache_misses
<br/>
mysql_table_open_cache_overflows
<br/>
mysql_threads_cached
<br/>
mysql_threads_connected
<br/>
mysql_threads_created
<br/>
mysql_threads_running
<br/>
mysql_uptime
</small>
   </td>
  </tr>
</table>
