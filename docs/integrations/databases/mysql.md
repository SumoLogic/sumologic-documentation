---
id: mysql
title: Sumo Logic App for MySQL
sidebar_label: MySQL
description: Provides insight into the health of your MySQL servers, replication status, and errors.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/databases/mysql.png')} alt="Thumbnail icon" width="100" />

The Sumo Logic App for MySQL is a unified logs and metrics app that helps you monitor the availability, performance and resource utilization of MySQL database clusters. Preconfigured dashboards and searches provide insight into the health of your MySQL clusters, replication status, error logs, query performance, slow queries, Innodb operations, failed logins and error logs.

The MySQL App supports following versions:
* MySQL 5.5.35-1 and later
* Percona MySQL 5.6.17 and later
* MySQL 8.0.x


## Log and Metrics Types

The Sumo Logic App for MySQL assumes the default MySQL Error log file format for error logs, and the MySQL Slow Query file format for slow query logs. For a list of metrics that are collected and used by the app, see [MySQL Metrics](#MySQL_Metrics).

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

The MySQL app dashboards dependent on error logs are based on the message types ERROR, NOTE, Warning, and Info.

For more details on the MySQL log file format, see [http://dev.mysql.com/doc/refman/5.5/en/server-logs.html](http://dev.mysql.com/doc/refman/5.5/en/server-logs.html).


## MySQL App searches

The predefined searches In the MySQL app are based on the following log types.

### Searches based on Error logs

* MySQL - Crash Recovery Attempts by Host
* MySQL - Number of Replication Completion Events by Host
* MySQL - Replication Failures by Host
* MySQL - Server Latest Replication State
* MySQL - Server Latest Running State
* MySQL - Server Up-Down Events by Host

### Searches based on Slow Query logs

* Slow Query Server Location. If your servers are not using private IP addresses, you can use the Slow Query Server Location search to visualize their locations on a map of the world.



## Collecting Logs and Metrics for MySQL

Configuring log and metric collection for the MySQL App includes the following tasks.

### Step 1: Configure Fields in Sumo Logic

Create the following Fields in Sumo Logic prior to configuring the collection. This ensures that your logs and metrics are tagged with relevant metadata, which is required by the app dashboards. For information on setting up fields, see the [Fields](/docs/manage/fields.md) help page.

<Tabs
  groupId="k8s-nonk8s"
  defaultValue="k8s"
  values={[
    {label: 'Kubernetes environments', value: 'k8s'},
    {label: 'Non-Kubernetes environments', value: 'non-k8s'},
  ]}>

<TabItem value="k8s">

If you are using MySQL in a Kubernetes environment create the fields:

* `pod_labels_component`
* `pod_labels_environment`
* `pod_labels_db_system`
* `pod_labels_db_cluster`

</TabItem>
<TabItem value="non-k8s">

If you are using MySQL in a non-Kubernetes environment create the fields:

* `component`
* `environment`
* `db_system`
* `db_cluster`
* `pod`

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

The diagram below illustrates how data is collected from MySQL in Kubernetes environments. In the architecture shown below, there are four services that make up the metric collection pipeline: Telegraf, Prometheus, Fluentd and FluentBit.

<img src={useBaseUrl('img/integrations/databases/k8s-flow.png')} alt="K8s flow" />

The first service in the pipeline is Telegraf. Telegraf collects metrics from MySQL. Note that we’re running Telegraf in each pod we want to collect metrics from as a sidecar deployment: that is, Telegraf runs in the same pod as the containers it monitors. Telegraf uses the [MySQL input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mysql) to obtain metrics. (For simplicity, the diagram doesn’t show the input plugins.) The injection of the Telegraf sidecar container is done by the Telegraf Operator. Fluentbit collects logs written to standard out and forwards them to FluentD, which in turn sends all the logs and metrics data to a Sumo Logic HTTP Source.

#### Prerequisites

Ensure that you are monitoring your Kubernetes clusters with the Telegraf operator. If you're not, see [Install Telegraf](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf.md).  

#### Step 1: Configure Metrics collection

This configure metrics collection from Kubernetes, add the following annotations to your MySQL pods, and make the edits described [below:](#metric-annotations)

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
         environment = "prod"
          component = "database"
          db_system = "mysql"
         db_cluster = "your_mysql_cluster_name"
    tailing-sidecar: sidecarconfig;slowlog:data:/bitnami/mysql/data/mysql-release-0-slow.log
```

**To edit the annotations**

Supply values for the following parameters in your annotations.

* `telegraf.influxdata.com/inputs`. This contains the required configuration for the Telegraf MySQL Input plugin. For information on configuring the MySQL input plugin for Telegraf, see the MySQL Input Plugin [Readme](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mysql).
14
Because Telegraf will be run as a sidecar the host should always be localhost.
* In `[[inputs.mysql]]`:
    * `servers.` The URL to the MySQL server
    * Configure metrics to collect by uncommenting or setting the following parameters. For more information, see   the MySQL Input Plugin [Readme](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mysql).
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

There are additional configuration options that you should **not** modify, as changing them will prevent the MySQL app from functioning correctly. **The settings you should not modify are:**
* `telegraf.influxdata.com/class: sumologic-prometheus`  instructs the Telegraf operator what output to use.
* `prometheus.io/scrape: "true"` ensures Prometheus will scrape the metrics.
* `prometheus.io/port: "9273"`  tells Prometheus what ports to scrape on.
* `telegraf.influxdata.com/inputs`
    * In the `[inputs.mysql.tags]` section:
        * `component: "database"` is used by the Sumo Logic app to identify application components.
        * `db_system: "mysql"`  identifies the database system.

For information about properties that can be configured globally in the Telegraf agent, see the [Configuration](https://github.com/influxdata/telegraf/blob/master/docs/CONFIGURATION.md) documentation for Telegraf.

Sumo Logic Kubernetes collection will automatically start collecting metrics from the pods with the labels and annotations you added in the previous step.

To verify the metrics have been ingested, run this metrics query:
```sql
db_cluster=<your_mysql_cluster_name> component="database" and db_system="mysql"
```



#### Step 2: Configure Log collection

This section explains the steps to collect MySQL logs from a Kubernetes environment. Follow the steps in [Option A](#Option_A:_Collect_MySQL_logs_written_to_standard_output) or [Option B](#Option_B:_Collect_MySQL_logs_written_to_log_files), depending on whether your logs are being written to standard output or to log files.


<details><summary>Option 1: Collect MySQL logs written to standard output</summary>

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

The Sumo Logic Kubernetes Collection process will automatically capture the logs from stdout and send the logs to Sumo Logic. For more information on deploying the sumologic-kubernetes-collection, see [Collect Logs and Metrics for the Kubernetes App](/docs/integrations/containers-orchestration/Kubernetes#Collect_Logs_and_Metrics_for_the_Kubernetes_App).

</details>

<details><summary>Option B: Collect MySQL logs written to log files</summary>

This method is recommend for Slow Query Logs.

If your MySQL helm chart/pod is writing its logs to log files, you can use a sidecar to send log files to standard out. To do so:

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

#### Step 3: Add an FER to normalize the fields in Kubernetes environments

Labels created in Kubernetes environments are automatically prefixed with pod_labels. To normalize these for our app to work, we'll create a [Field Extraction Rule](/docs/manage/field-extractions/create-field-extraction-rule.md), Database Application Components, assuming it does not already exist:

1. Go to **Manage Data > Logs > Field Extraction Rules**.
2. Click the **+ Add**.
3. The **Add Field Extraction** pane appears. \
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
   | pod_labels_db_cluster as db_cluster
   ```
7. Click **Save** to create the rule.
8. To verify logs are flowing into Sumo Logic, run this query: \
`component=database db_system=mysql db_cluster=<your_mysql_cluster_name>`


#### Sample Log Messages

```json
{
	"timestamp":1617810938497,
	"log":"2021-04-07T15:55:34.261220Z 0 [System] [MY-010931] [Server] /opt/bitnami/mysql/bin/mysqld: ready for connections. Version: '8.0.23'  socket: '/opt/bitnami/mysql/tmp/mysql.sock'  port: 3306  Source distribution.",
	"stream":"stdout",
	"time":"2021-04-07T15:55:34.261397194Z"
}
```

#### Sample query

This sample Query is from the Logs panel of the MySQL - Logs dashboard.

```sql title="Query String - “Top 10 Slow Queries by Average Execution Time”"
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

In non-Kubernetes environments, we use the Telegraf Operator for MySQL metric collection and a Sumo Logic Installed Collector for collecting MySQL logs.

The diagram below illustrates the components of the MySQL collection in a non-Kubernetes environment for each database server. Telegraf runs on the same host as MySQL, and uses the [MySQL input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mysql) to obtain MySQL metrics, and the [Sumo Logic output plugin](https://github.com/SumoLogic/fluentd-output-sumologic) to send the metrics to Sumo Logic. MySQL logs are sent to a Sumo Logic Local File source on an Installed Collector.

<img src={useBaseUrl('img/integrations/databases/non-k8s.png')} alt="non-K8s flow" />


#### Step 1: Configure metric collection

1. Configure a Hosted Collector. For instructions, see [Configure a Hosted Collector](/docs/send-data/configure-hosted-collector).
2. Configure an HTTP Logs and Metrics Source.** **For instructions, see [HTTP Logs and Metrics Source](/docs/send-data/sources/sources-hosted-collectors/http-logs-metrics-source). Make a note of the HTTP Source URL.
3. Install Telegraf. For instructions see [Install Telegraf](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/install-telegraf.md).
4. Configure and start Telegraf. As part of collecting metrics data from Telegraf, we use the [MySQL input plugin](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mysql) to get data from Telegraf and the [Sumo Logic output plugin](https://github.com/SumoLogic/fluentd-output-sumologic) to send data to Sumo Logic.
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
    environment = "prod"
    component = "database"
    db_system = "mysql"
    db_cluster = "your_mysql_cluster_name"
[[outputs.sumologic]]
    url = "<URL Created in Step 3>"
    data_format = "prometheus"

[agent]
  interval = "60s"
  flush_interval = "60s"
```

6. Follow the instructions in [Setting values in telegraf.conf](#Setting_values_in_telegraf.conf) below to configure the settings in the `.conf`  file.
7. After updating the `telegraf.conf` file, start or reload the telegraf service using the [instructions](https://docs.influxdata.com/telegraf/v1.17/introduction/getting-started/#start-telegraf-service) in Telegraf documentation.
8. At this point, MySQL metrics should start flowing into Sumo Logic.
9. **Setting values in telegraf.conf**. Make the following updates to `telegraf.conf`.
   * In the `[[inputs.mysql]]` section, set `servers` to the URL of your MySQL server. For information about additional input plugin configuration options, see the [Readme](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mysql) for the MySQL input plugin.
   * Configure the metrics to collect by uncommenting the following lines. For more information, see this [section](https://github.com/influxdata/telegraf/tree/master/plugins/inputs/mysql#configuration) of the Readme.  

```yml
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
      * `environment`. Specify the deployment environment where the MySQL cluster identified by the value of `servers` resides. For example: dev, prod or qa. While this value is optional we highly recommend setting it.
      * `db_cluster`.  Enter a name to uniquely identify the MySQL cluster. This cluster name will be shown in the Sumo Logic dashboards.
   * In the `[[outputs.sumologic]]` section, set `url` to the is the HTTP source URL created in [Step 2](#Step_2:_Configure_Collection_of_Metrics_from_a_MySQL_Server). For information about additional output plugin configuration options, see [Configure Telegraf Output Plugin for Sumo Logic](/docs/send-data/collect-from-other-data-sources/collect-metrics-telegraf/configure-telegraf-output-plugin.md).
   * In the `[agent]` section, set `interval` and `flush_interval` to “60s” to collect metrics every 60 seconds.

There are additional configuration options that you should **not** modify, as changing them will prevent the MySQL app from functioning correctly. The settings you should not modify are:
* `data_format = "prometheus"`, in the output plugins section, causes metrics to be sent in the Prometheus format to Sumo Logic.
* `component = "database"`, in the input plugins section, is used by the Sumo Logic app to identify application components.
* `db_system = "mysql"`, in the input plugins section, identifies the database system.

For information about properties that can be configured globally in the Telegraf agent, see the [Configuration](https://github.com/influxdata/telegraf/blob/master/docs/CONFIGURATION.md) documentation for Telegraf.


#### Step 2: Configure log collection

This section provides instructions for configuring collection of logs for MySQL running on a non-Kubernetes environment. MySQL logs are stored in log files. Slow query logs must be explicitly enabled to be able to be written to a log file.

Sumo Logic supports collecting logs via a local log file. Local log files can be collected by Sumo Logic [Installed Collectors](/docs/send-data/Installed-Collectors), which requires you to allow outbound traffic to Sumo Logic [endpoints](https://help.sumologic.com/APIs/General-API-Information/Sumo-Logic-Endpoints-by-Deployment-and-Firewall-Security) for collection to work.


#### Step 2a: Configure MySQL to log to a local file(s)

MySQL logs written to a log file can be collected via the Local File Source of a Sumo Logic Installed Collector.

To configure the MySQL log file(s), locate your local `my.cnf` configuration file in the database directory.

1. Open `my.cnf` in a text editor.
Set the following parameters in the `[mysqld]` section:
```
[mysqld]
    log_error = /var/log/mysql/error.log
    slow_query_log=1
    slow_query_log_file = /var/log/mysql/mysql-slow.log
    long_query_time=2
    long_query_time=2
```

[Error Logs](https://dev.mysql.com/doc/refman/5.7/en/slow-query-log.html). By default, error logs are enabled and are logged at file specified by the `log_error` key.

[Slow Query Logs](https://dev.mysql.com/doc/refman/5.7/en/slow-query-log.html). `slow_query_log=1` enables logging of slow queries to the file specified by `slow_query_log_file`. Setting `long_query_time=2` will cause queries that take more than 2 seconds to execute to be logged. The default value of `long_query_time` is 10 seconds.

[General Query Logs](https://dev.mysql.com/doc/refman/5.7/en/query-log.html). We don't recommend enabling `general_log` for performance reasons. These logs are not used by the Sumo Logic MySQL App.
3.  
Save the `my.cnf` file.
4. Restart the MySQL server:
```
sudo mysql.server restart
```

#### Step 2b: Configure an [Installed Collector.](/docs/send-data/Installed-Collectors)

#### Step 2c: Add a Local File Source for MySQL error logs

1. Add a [Local File Source](/docs/send-data/Sources/sources-installed-collectors/Local-File-Source) in the installed collector configured in the previous step. Configure the Local File Source fields as follows:
   * **Name.** (Required)
   * **Description**. (Optional)
   * **File Path** (Required). Enter the path to your error.log. The files are typically located in `/var/log/mysql/error.log`. If you are using a customized path, check the `my.cnf` file for this information.
   * **Source Host**. Sumo Logic uses the hostname assigned by the OS unless you enter a different host nameSource Category. Enter any string to tag the output collected from this Source, such as Prod/MySQL/Error. (The Source Category metadata field is a fundamental building block to organize and label Sources. For details see [Best Practices](/docs/send-data/design-deployment/best-practices-source-categories).)
   * **Fields**. Set the following fields. For more information, see [Fields](/docs/manage/fields.md).
     * component = database
     * db_system = mysql
     * db_cluster = <your_mysql_cluster_name>
     * environment = <Environment_Name>, such as dev, qa, or prod.
    The values of `db_cluster` and `environment` should match those configured in the [Setting values in telegraf.conf](#Setting_values_in_telegraf.conf) above.
2. In the **Advanced Options for Logs** section:
   * **Enable Timestamp Parsing**. Select "Extract timestamp information from log file entries".
   * **Time Zone**. Select "Use time zone form log file, if none is detected use Use Collector Default”.
   * **Timestamp Format**. Select "Automatically detect the format."
   * **Encoding**. Select UTF-8 (Default).
   * **Enable Multiline Processing**
      * **Detect Messages Spanning Multiple Lines.** True
      * **Infer Boundaries - Detect message boundaries automatically**. False
      * **Boundary Regex.**
        * If error messages starts like `2021-05-11T10:12:55.421100Z` then use boundary regex as below`^\d{4}-\d{2}-\d{2}T\d{1,2}:\d{1,2}:\d{1,2}.*`
        * If error messages starts like `210511 11:20:40` then use boundary regex as below`^\d{6}\s+\d{1,2}:\d{1,2}:\d{1,2}.*`
3. Click **Save**.

   At this point, MySQL error logs should start flowing into Sumo Logic.


#### Step 2d: Configuring a Local File Source for slow query log

1. Add a [Local File Source](/docs/send-data/Sources/sources-installed-collectors/Local-File-Source) in the installed collector configured in the previous step. Configure the Local File Source fields as follows:
2. **Name.** (Required)
3. **Description**. (Optional)
4. **File Path** (Required). Enter the path to your `mysql-slow.log`. The file is typically located in `/var/log/mysql/mysql-slow.log`. If you are using a customized path, check `my.cnf` file for this information.
5. **Source Host**. Sumo Logic uses the hostname assigned by the OS unless you enter a different host name
6. **Source Category**. Enter any string to tag the output collected from this Source, such as Prod/MySQL/Error. (The Source Category metadata field is a fundamental building block to organize and label Sources. For details see [Best Practices](/docs/send-data/design-deployment/best-practices-source-categories).)
7. **Fields**. Set the following fields. For more information, see [Fields](/docs/manage/fields.md).
   * component = database
   * db_system = mysql
   * db_cluster = <your_mysql_cluster_name>
   * environment = <Environment_Name>, such as dev, qa, or prod. \
   The values of `db_cluster` and `environment` should match those configured in the [Setting values in telegraf.conf](#Setting_values_in_telegraf.conf) above.
8. In the **Advanced Options for Logs** section:
   * **Enable Timestamp Parsing**. Select "Extract timestamp information from log file entries".
   * **Time Zone**. Select "Use time zone form log file, if none is detected use Use Collector Default".
   * **Timestamp Format**. Select "Automatically detect the format".
   * **Encoding**. Select "UTF-8" (Default).
   * **Enable Multiline Processing**
      * **Detect Messages Spanning Multiple Lines.** True
      * **Infer Boundaries - Detect message boundaries automatically**. False
      * **Boundary Regex.**  `^#\sTime:\s.*`
9. Click **Save**.

At this point, MySQL slow query logs should start flowing into Sumo Logic.


#### Sample Log message

```bash
210408 00:00:19 [Note] /usr/sbin/mysqld: ready for connections.
```

#### Sample query

This sample Query is from the Logs panel of the MySQL - Logs dashboard.

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
