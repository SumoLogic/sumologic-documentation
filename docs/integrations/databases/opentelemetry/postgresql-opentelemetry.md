---
id: postgresql-opentelemetry
title: PostgreSQL - OpenTelemetry Collector
sidebar_label: PostgreSQL - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry App for PostgreSQL.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/databases/postgresql.png')} alt="Thumbnail icon" width="45"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

[PostgreSQL](https://www.postgresql.org/) is an open source object-relational database that extends the robustness SQL language to safely store and scale extensive data workloads.

The Sumo Logic App for PostgreSQL includes predefined searches and dashboards that allow you to monitor logs and metrics for the database. The logs enable you to monitor database activity, user activity, incoming connections, query execution time, and errors.The metrics allow you to monitor database resource utilization and throughput performance.

This App supports PostgreSQL version 9.6+.

We use the OpenTelemetry collector for PostgreSQL metric collection and for collecting PostgreSQL logs.

The diagram below illustrates the components of the PostgreSQL collection for each database server. OpenTelemetry collector runs on the same host as PostgreSQL, and uses the [PostgreSQL receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/postgresqlreceiver) to obtain PostgreSQL metrics, and the [Sumo Logic OpenTelemetry Exporter](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/sumologicexporter) to send the metrics to Sumo Logic. MySQL logs are sent to Sumo Logic through a [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Postgresql-OpenTelemetry/PostgreSQL-Schematics.png' alt="Schematics" />

## Fields creation in Sumo Logic for PostgreSQL

Following are the tags that will be created as part of PostgreSQL App install if not already present: 

- **db.cluster.name**. User configured. Enter a name to identify this PostgreSQL cluster. This cluster name will be shown in the Sumo Logic dashboards.
- **db.system**. Has a fixed value of **postgresql**.
- **sumo.datasource**. Has a fixed value of **postgresql**.
- **db.node.name**. Has a value of the host name of the machine which is being monitored.

## Prerequisites

[Here](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/postgresqlreceiver#prerequisites) are the prerequisites for metric collection.

Configure logging in PostgreSQL:

1. Locate your local PostgreSQL postgresql.conf configuration file in the database data_directory. For more information, see the [PostgreSQL File Locations documentation](https://www.postgresql.org/docs/9.1/static/runtime-config-file-locations.html). By default it's located in `/var/lib/pgsql/<version>/data/postgresql.conf`. You can run SHOW config_file command inside your server's psql shell to get the location. After determining the location of conf file, modify the PostgreSQL postgresql.conf configuration file logging parameters
2. Connect to the database server (using SSH) in a terminal window.
3. Open `postgresql.conf` configuration file.
4. Under the ERROR REPORTING AND LOGGING section of the file, use the following config parameters. For more information on the following parameters, [click here](https://www.postgresql.org/docs/12/static/runtime-config-logging.html).
  ```sql
    log_destination = 'stderr'
    logging_collector = on
    log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
    log_truncate_on_rotation = off
    log_rotation_age = 1d
    log_min_duration_statement = 250
    log_connections = on
    log_duration = on
    log_hostname = on
    log_timezone = 'UTC'
    log_min_messages = 'WARNING'
    log_line_prefix = '%m [%p] %q%u@%d '
  ```
5.  Save the `postgresql.conf` file and restart the postgresql server:   
  ```sh
  sudo service postgresql restart
  ```

## Collecting logs, metrics, and PostgreSQL app installation

As part of data collection setup and app installation, you can select the **PostgreSQL - OpenTelemetry** app from the **App Catalog** and click on **Install App**. Follow the steps below to configure the collection.

### Step 1: Set up Collector

{@import ../../../reuse/apps/opentelemetry/set-up-collector.md}

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Postgresql-OpenTelemetry/PostgreSQL-Collector.png' alt="Collector" />

### Step 2: Configure integration

In this step, you will configure the yaml file required for Mysql collection.

Below is the required input:

- **Error Log Path**. enter the path of the error log file for your PostgreSQL instance.
- **Endpoint**. enter the url of the server which needs to be monitored. Default endpoint is `localhost:5432`
- **UserName**. enter the PostgreSQL username.
- **Password**. password for the user name which is being used for scrapping the PostgreSQL metrics.

You can add any custom fields which you want to tag along with the data ingested in Sumo. Click on the **Download YAML File** button to get the yaml file.

For linux platform - Click on **Download Environment Variables File** button to get the file with the password which is supposed to be set as environment variable.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Postgresql-OpenTelemetry/PostgreSQL-YAML.png' alt="YAML" />

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

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the PostgreSQL instance which needs to be monitored.
2. Place Env file in the following directory:
  ```sh
  /etc/otelcol-sumo/env/
  ```
3. Restart the collector using:
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

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the PostgreSQL instance which needs to be monitored.
2. Restart the otelcol-sumo process using:
  ```sh
  otelcol-sumo --config /etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml"
  ```

</TabItem>
</Tabs>

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}

## Sample Logs

```sql
2021-04-01 08:30:20.002 UTC [11916] postgres@postgres LOG:  connection authorized: user=postgres database=postgres
```

## Sample Queries

This sample query is from the **PostgreSQL - Overview** dashboard, **Fatal Errors** panel.

```sql
sumo.datasource=postgresql db.cluster.name=*
| json auto maxdepth 1 nodrop
| if (isEmpty(log), _raw, log) as _raw
| parse "* * * [*] *@* *:  *" as date,time,time_zone,thread_id,user,db,severity,msg
| where severity IN ("ERROR", "FATAL")
| count by date, time, severity, db, user, msg
```

This sample query is from the **PostgreSQL - Database Metrics** dashboard, **Number of Active Databases** panel.

```sql
sumo.datasource=postgresql deployment.environment=* db.cluster.name=* metric=postgresql.backends postgresql.database.name=* db.node.name=* | count by postgresql.database.name | count
```

## Sample Metrics

```sql
{"queryId":"A","_source":"postgresql-metric-otel","source":"idx_read","db.table":"company","_sourceName":"Http Input","host":"ip-172-31-91-203.ec2.internal","os.type":"linux","sumo.datasource":"postgresql","db.system":"postgresql","postgresql.database.name":"postgres","_sourceCategory":"Labs/postgresql-otel/metric","deployment.environment":"postgresqlEnvanema","_contentType":"Carbon2","metric":"postgresql.blocks_read","_collectorId":"000000000CD05E30","db.schema":"public","_sourceId":"000000004453F6D9","unit":"1","db.cluster.name":"postgresqlOtelClusteranema","postgresql.table.name":"public.company","_collector":"Labs - postgresql-otel","max":5,"min":0,"avg":1.92,"sum":115,"latest":0,"count":60}
```


## Viewing PostgreSQL Dashboards

### Overview

The **PostgreSQL - Overview** dashboard gives you an at-a-glance view of the state of your database clusters by monitoring errors, failed logins, slow queries and trends over time.

Use this dashboard to:

- Determine the number of active databases and clusters.
- Drill-down into database errors, failed logins and slow queries.
- Determine if your database or queries need to be tuned based on comparing the number of slow queries.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Postgresql-OpenTelemetry/PostgreSQL-Overview.png' alt="Overview" />

### Query Execution

The **PostgreSQL - Query Execution** dashboard gives you insights into the number and time taken to execute queries:

Use this dashboard to:

- Monitor query performance and identify slow queries.
- Examine query execution trends.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Postgresql-OpenTelemetry/PostgreSQL-Query-Execution.png' alt="Query Execution" />

### Database Metrics

The **PostgreSQL - Database Metrics** dashboard allows you to monitor the database performance, which includes disk usage, commits, rollbacks, and scans.

Use this dashboard to:

- Understand the behavior and performance of your database clusters.
- Monitor database size and disk usage.
- Identify top 5 and least 5 frequently scanned indexes.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Postgresql-OpenTelemetry/PostgreSQL-Database-Metrics.png' alt="Database Metrics" />

### Schema Metrics

The **PostgreSQL - Schema Metrics** dashboard allows you to view and analyze the metrics for monitoring the schema in a cluster.

Use this dashboard to view:

- Head Only Tuple updated by schema.
- Disk block reads and Disk usage by schema.
- Buffer hits and rows inserted, updated and deleted by schema.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Postgresql-OpenTelemetry/PostgreSQL-Schema-Metrics.png' alt="Schema Metrics" />

Query performance can degrade with the growth of the size of table, database and/or indexes. This means that you either need to scale up the database instance, [partition your data](https://www.postgresql.org/docs/current/static/ddl-partitioning.html), or redesign your indexes. Unusual growth in disk space can also mean there are problems with [VACUUMs](https://www.postgresql.org/docs/9.1/static/sql-vacuum.html) .

If your database regularly performs more sequential scans over time, you can improve its performance by creating an [index](https://www.postgresql.org/docs/current/static/sql-createindex.html) on frequently accessed data.

### Security

The **PostgreSQL - Security** dashboard provides insight into locations of incoming connections, failed authentications and top database errors and warnings.

Use this dashboard to:

- Monitor incoming connections, failed authorization requests, and outliers in the number of queries executed outlier.
- Identify known malicious IPs that are accessing your databases and use firewall access control lists to prevent them from sending you traffic going forward.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Postgresql-OpenTelemetry/PostgreSQL-Security.png' alt="Security" />

### Error Logs

The **PostgreSQL - Error Logs** dashboard provides insight into database error logs by specifically monitoring errors, user activity, database activity and database shutdown/start events.

Use this dashboard to:

- Quickly identify errors and patterns in logs for troubleshooting.
- Monitor error trends and quickly identify outliers.
- Identify unexpected database or user activity.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Postgresql-OpenTelemetry/PostgreSQL-Error-Logs.png' alt="Error Logs" />

### Slow Queries

The **PostgreSQL - Slow Queries** dashboard provides insights into all slow queries executed on the database.

Use this dashboard to:

- Identify all slow queries.
- Monitor users and databases running slow queries.
- Determine which SQL commands are slower than others.
- Examine slow query trends to determine if there are periodic performance bottlenecks in your database clusters.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Postgresql-OpenTelemetry/PostgreSQL-Slow-Queries.png' alt="Slow Queries" />

### Relation Metrics

The **PostgreSQL - Relation Metrics** dashboard allows you to view and analyze the metrics for monitoring the relations in a schema.

Use this dashboard to:

- Monitor PostgreSQL relation metrics (disk blocks, buffer hits, hot updates etc) trends over time.
- Monitor index scans and size to determine if executed queries are accessing them for a relation.
- Track index utilization of existing indexes in a relation.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Postgresql-OpenTelemetry/PostgreSQL-Relation-Metrics.png' alt="Relation Metrics" />
