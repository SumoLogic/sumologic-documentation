---
id: mysql-opentelemetry
title: MySQL - OpenTelemetry Collector
sidebar_label: MySQL - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry App for MySQL.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/databases/mysql.png')} alt="Thumbnail icon" width="90" /> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

The Sumo Logic App for MySQL is a unified logs and metrics app that helps you monitor the availability, performance and resource utilization of MySQL database clusters. Preconfigured dashboards and searches provide insight into the health of your MySQL clusters, replication status, error logs, query performance, slow queries, Innodb operations, failed logins and error logs.

This App supports MySQL version 8.0.

We use the OpenTelemetry collector for MySQL metric collection and for collecting MySQL logs.

The diagram below illustrates the components of the MySQL collection for each database server. OpenTelemetry collector runs on the same host as MySQL, and uses the [MySQL receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/mysqlreceiver) to obtain MySQL metrics, and the [Sumo Logic OpenTelemetry Exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/sumologicexporter) to send the metrics to Sumo Logic. MySQL logs are sent to Sumo Logic through a [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/MySql-OpenTelemetry/MySQL-Schematics.png' alt="Schematics" />

## Log and Metrics Types

The Sumo Logic App for MySQL assumes the default MySQL Error log file format for error logs, and the MySQL Slow Query file format for slow query logs. For a list of metrics that are collected and used by the app, see [MySQL Metrics](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/mysqlreceiver/documentation.md).

- The MySQL - Overview dashboard is based on logs from both the Error and Slow Query log formats, so as to correlate information between the two.
- Dashboards in the Metrics folder are based on MySQL metrics.
- Dashboards in the Logs folder are based on MySQL logs from both the Error and Slow Query log formats.
    - Dashboards based on the Error format:
        - MySQL - Error Logs
        - MySQL - Failed Logins
        - MySQL - Replication
    - Dashboard based on Slow Query format:
        - MySQL - Slow Queries
- MySQL General Health is based on logs from the MySQL Error log format.
- MySQL Replication is based on logs from the MySQL Error log format.
- MySQL Slow Queries is based on logs from the MySQL Slow Queries log format.

The MySQL app dashboards dependent on error logs are based on the message types ERROR, NOTE, Warning, and Info. For more details on the MySQL log file format, see [here](http://dev.mysql.com/doc/refman/5.5/en/server-logs.html).

## Fields creation in Sumo Logic for MySQL

Following are the [fields](/docs/manage/fields/) which will be created as part of MySQL App install if not already present. 

- `db.cluster.name` - User configured. Enter a name to identify this MySQL cluster. This cluster name will be shown in the Sumo Logic dashboards.
- `db.system` - Has fixed value of **mysql**
- `sumo.datasource` - Has fixed value of **mysql**
- `db.node.name` - Has the value of host name of the machine which is being monitored

## Prerequisites

**For metric collection**: For metric collection [here](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/mysqlreceiver#prerequisites) are the prerequisites.

**For log collection**: Configure MySQL to log to a local file(s). MySQL logs written to a log file can be collected via the Local File Source of a Sumo Logic Installed Collector. To configure the MySQL log file(s), locate your local my.cnf configuration file in the database directory.

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

[Error Logs](https://dev.mysql.com/doc/refman/8.0/en/error-log.html). By default, error logs are enabled and are logged at file specified by the `log_error` key.

[Slow Query Logs](https://dev.mysql.com/doc/refman/8.0/en/slow-query-log.html). `slow_query_log=1` enables logging of slow queries to the file specified by `slow_query_log_file`. Setting `long_query_time=2` will cause queries that take more than two seconds to execute to be logged. The default value of `long_query_time` is 10 seconds.

[General Query Logs](https://dev.mysql.com/doc/refman/8.0/en/query-log.html). We don't recommend enabling `general_log` for performance reasons. These logs are not used by the Sumo Logic MySQL App.

1. Save the `my.cnf` file.
2. Restart the MySQL server: `sudo mysql.server restart`

## Collecting Logs, Metrics, and installing App for MySQL

As part of data collection setup and app installation, you can select the **MySQL - OpenTelemetry** app from the **App Catalog** and click on **Install App**. Follow the steps below to configure the collection.

### Step 1: Set up collector

{@import ../../../reuse/apps/opentelemetry/set-up-collector.md}

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/MySql-OpenTelemetry/MySQL-Collector.png' alt="Collector" />

### Step 2: Configure integration

In this step, you will configure the yaml required for MySQL collection.

Below are the required inputs:

- **Endpoint**. enter the url of the server which needs to be monitored
- **User Name**. enter the MySQL username.
- **Error File log Path**. enter the path to the error log file for your mysql instance.
- **Slow Transaction file log path**. enter the path to the slow log file for your mysql instance.
- **Tags**. `db.cluster.name`.

You can add any custom fields which you want to tag along with the data ingested in Sumo.

Click on the **Download YAML File** button to get the yaml file.

For Linux platform, click **Download Environment Variables File** to get the file with the password which is supposed to be set as environment variable.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/MySql-OpenTelemetry/MySQL-YAML.png' alt="YAML" />

### Step 3: Send logs and metrics to Sumo Logic

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

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the MySQL instance which needs to be monitored.
2. Place Env file in the following directory:
  ```sh
  /etc/otelcol-sumo/env/
  ```
3. restart the collector using:
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

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the MySQL instance which needs to be monitored.
2. Restart the otelcol-sumo process using: 
  ```sh
  otelcol-sumo --config /etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
  ```

</TabItem>
</Tabs>

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}

## Sample Logs

```json
{
log.file.name:"mysqld-error.log",
log:"2022-10-14T09:16:02.430542Z 63707 [Note] [MY-010926] [Server] Access denied for user 'root'@'ip-10-0-16-79' (using password: YES)"
}
```

## Sample Metric

```json
{"queryId":"A","_source":"sumo_hosted_collector_otel_mysql","operation":"deleted","metric":"mysql.row_operations","db.cluster.name":"sumoCluster_otel","_collectorId":"000000000C59BB2E","deployment.environment":"sumodev_otel","_sourceId":"0000000000000000","unit":"1","db.system":"mysql","_sourceHost":"sumoOtelMysql","_collector":"sumo_hosted_collector_otel_mysql","max":0,"min":0,"avg":0,"sum":0,"latest":0,"count":4}
```

## Sample Queries

This sample query is from the **Top 10 Slow Queries by Average Execution Time** panel.

```sql
db.system=mysql db.cluster.name={{db.cluster.name}} "User@Host"  "Query_time" 
| parse regex "(?<query_block># User@Host:[\S\s]+?SET timestamp=\d+;[\S\s]+?;)" multi
| parse regex field=query_block "# User@Host: \S+?\[(?<user>\S*?)\] @ (?<host_name>\S+)\s\[(?<ip_addr>\S*?)\]" nodrop
| parse regex field=query_block "# User@Host: \S+?\[(?<user>\S*?)\] @\s+\[(?<ip_addr>\S*?)\]\s+Id:\s+(?<Id>\d{1,10})" nodrop | parse regex field=query_block "# User@Host: \S+?\[(?<user>\S*?)\] @ (?<host_name>\S+)\s\[(?<ip_addr>\S*?)\]\s+Id:\s+(?<Id>\d{1,10})" | parse regex field=query_block "Schema: (?<schema>(?:\S*|\s)?)\s*Last_errno[\s\S]+?Query_time:\s+(?<query_time>[\d.]*)\s+Lock_time:\s+(?<lock_time>[\d.]*)\s+Rows_sent:\s+(?<rows_sent>[\d.]*)\s+Rows_examined:\s+(?<rows_examined>[\d.]*)\s+Rows_affected:\s+(?<rows_affected>[\d.]*)\s+Rows_read:\s+(?<rows_read>[\d.]*)\n" nodrop | parse regex field=query_block "Schema: (?<schema>(?:\S*|\s)?)\s*Last_errno[\s\S]+?\s+Killed:\s+\d+\n" nodrop | parse regex field=query_block "Query_time:\s+(?<query_time>[\d.]*)\s+Lock_time:\s+(?<lock_time>[\d.]*)\s+Rows_sent:\s+(?<rows_sent>[\d]*)\s+Rows_examined:\s+(?<rows_examined>[\d]*)\s+Rows_affected:\s+(?<rows_affected>[\d]*)\s+" nodrop | parse regex field=query_block "Query_time:\s+(?<query_time>[\d.]*)\s+Lock_time:\s+(?<lock_time>[\d.]*)\s+Rows_sent:\s+(?<rows_sent>[\d]*)\s+Rows_examined:\s+(?<rows_examined>[\d]*)" 
| parse regex field=query_block "# Bytes_sent:\s+(?<bytes_sent>\d*)\s+Tmp_tables:\s+(?<tmp_tables>\d*)\s+Tmp_disk_tables:\s+(?<temp_disk_tables>\d*)\s+Tmp_table_sizes:\s+(?<tmp_table_sizes>\d*)\n" nodrop | parse regex field=query_block "# Bytes_sent:\s+(?<bytes_sent>\d*)\n" nodrop | parse regex field=query_block "SET timestamp=(?<set_timestamp>\d*);(?:\\n|\n)(?<sql_cmd>[\s\S]*);" nodrop
| fields -query_block
| avg(query_time)  as avg_time,  sum(query_time)  as total_time,  min(query_time)  as min_time,  max(query_time)  as max_time,  avg(rows_examined)  as avg_rows_examined,  avg(rows_sent)  as avg_rows_sent,  avg(Lock_Time)  as avg_lock_time, count as frequency group  by sql_cmd, db.cluster.name
| sort by avg_time | limit  10
```


This sample metrics query is from the **FSync Op Count** panel.

```sql title="Sample metrics query"
sumo.datasource=mysql deployment.environment=* db.cluster.name=* db.node.name=* metric=mysql.operations operation=fsyncs  | sum
```

## Viewing MySQL Dashboards

### Overview

The **MySQL - Overview** dashboard gives you an at-a-glance view of the state of your database clusters by monitoring key cluster information such as errors, failed logins, errors, queries executed, slow queries, lock waits, uptime and more.

Use this dashboard to:
- Quickly identify the state of a given database cluster

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/MySql-OpenTelemetry/MySQL-Overview.png' alt="Overview" />

### Error Logs

The **MySQL - Error Logs** dashboard provides insight into database error logs by specifically monitoring database shutdown/start events, errors over time, errors, warnings and crash recovery attempts.

Use this dashboard to:

- Quickly identify errors and patterns in logs for troubleshooting
- Monitor trends in error logs and identify outliers
- Ensure that server start, server stop and crash recovery events are in line with expectations
- Dashboard filters allow you to narrow a search for database cluster.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/MySql-OpenTelemetry/MySQL-Error-Logs.png' alt="Error Logs" />

### Failed Logins

The **MySQL - Failed Logins** dashboard provides insights into all failed login attempts by location, users and hosts.

Use this dashboard to:

- Monitor all failed login attempts and identify any unusual or suspicious activity

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/MySql-OpenTelemetry/MySQL-Failed-Logins.png' alt="Failed Logins" />

### Replication

The **MySQL - Replication** dashboard provides insights into the state of database replication.

Use this dashboard to:

- Quickly determine reasons for replication failures
- Monitor replication status trends

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/MySql-OpenTelemetry/MySQL-Replication.png' alt="Replication" />

### Slow Queries

The **MySQL - Slow Queries** dashboard provides insights into all slow queries executed on the database.

Note: Slow queries are queries that take 10 seconds or more to execute (default value is 10 seconds as per mysql configuration which can be altered) and excessive slow queries are those that take 15 seconds or more to execute.

Use this dashboard to:

- Identify all slow queries
- Quickly determine which queries have been identified as slow or excessive slow queries
- Monitor users and hosts running slow queries
- Determine which SQL commands are slower than others
- Examine slow query trends to determine if there are periodic performance bottlenecks in your database clusters

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/MySql-OpenTelemetry/MySQL-Slow-Queries.png' alt="Slow Queries" />

### Performance and Resource Metrics

The **MySQL - Performance and Resource Metrics** dashboard allows you to monitor the performance and resource usage of your database clusters.

Use this dashboard to:

- Understand the behavior and performance of your database clusters
- Monitor key operational metrics around threads running, innodb waits and locks.
- Monitor query execution trends to ensure they match up with expectations
- Dashboard filters allow you to narrow a search for a specific database cluster

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/MySql-OpenTelemetry/MySQL-Performance-and-Resource-Metrics.png' alt="Performance and Resource Metrics" />
