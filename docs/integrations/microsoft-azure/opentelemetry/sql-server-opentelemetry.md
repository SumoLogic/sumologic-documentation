---
id: sql-server-opentelemetry
title: Microsoft SQL Server - OpenTelemetry Collector
sidebar_label: Microsoft SQL Server - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry App for Microsoft SQL Server for Windows.
---
import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/sql.png')} alt="thumbnail icon" width="50"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

:::note
The information provided in this page will only support the Sumo Logic OpenTelemetry app for Microsoft SQL Server for Windows.
:::
The SQL Server app is a unifies logs and metrics app to help you monitor the availability, performance, health and resource utilization of your Microsoft SQL Server database clusters. Preconfigured dashboards provide insight into cluster status, performance, operations as well as backup and restore operations along with Performance metrics and metrics for transaction and transaction logs.

This App has been tested with following SQL Server versions:

- Microsoft SQL Server 2016

The diagram below illustrates the components of the SQL Server collection for each database server. OpenTelemetry collector runs on the same host as SQL Server, and uses the [SQL Server receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/sqlserverreceiver) to obtain SQL Server metrics. This receiver grabs metrics about a Microsoft SQL Server instance using the Windows Performance Counters. Because of this, it is a Windows only receiver. Thus metrics for SQL Server can be collected only if its in a windows machine. 
SQL Server logs are sent to Sumo Logic through OpenTelemetry [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/SQLServer-OpenTelemetry/SQL-Server-Schematics.png' alt="Redis Logs dashboards"/>

## Fields creation in Sumo Logic for SQL Server

Following are the [Fields](https://help.sumologic.com/docs/manage/fields/) which will be created as part of SQL Server App install if not already present.
* `db.cluster.name`. User configured. Enter a name to identify this SQL Server cluster. This cluster name will be shown in the Sumo Logic dashboards.
* `db.system`. Has a fixed value of **sqlserver**.
* `deployment.environment`. User configured. This is the deployment environment where the SQL Server cluster resides. For example dev, prod, or qa.
* `sumo.datasource`. Has a fixed value of **sqlserver**.

## Prerequisites

Make sure logging is turned on in SQL Server. Follow [this documentation](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/scm-services-configure-sql-server-error-logs?view=sql-server-ver15) to enable it.

The Microsoft SQL Server App's queries and dashboards depend on logs from the SQL Server ERRORLOG, which is typically found in: `C:\Program Files\Microsoft SQL Server\MSSQL<version>.MSSQLSERVER\MSSQL\Log\ERRORLOG*`.

The ERRORLOG is typically in UTF-16LE encoding, however, be sure to verify the file encoding used in your SQL Server configuration.

## Configure SQL Server Logs Collection

### Step 1: Set up Collector

If you want to use an existing Otel Collector then this step can be skipped by selecting the option of using an existing Collector.

If you want to create a new Collector, select the **Add a new Collector** option.

Select the platform for which you want to install the Sumo OpenTelemetry Collector.

This will generate a command which can be executed in the machine which needs to get monitored. Once executed it will install the Sumo Logic OpenTelemetry Collector agent.
<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/SQLServer-OpenTelemetry/SQL-Server-Collector.png' alt="Collector" />

### Step 2: Configure integration

The Microsoft SQL Server App's queries and dashboards depend on logs from the SQL Server ERRORLOG, which is typically found in:
`C:\Program Files\Microsoft SQL Server\MSSQL<version>.MSSQLSERVER\MSSQL\Log\ERRORLOG*`

You can add any custom fields which you want to tag along with the data ingested in Sumo Logic. Click on the **Download YAML File** button to get the yaml file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/SQLServer-OpenTelemetry/SQL-Server-YAML.png' alt="YAML" />

### Step 3: Send logs to Sumo Logic

{@import ../../../reuse/apps/opentelemetry/send-logs-intro.md}

1.  Copy the YAML file to `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` folder in the machine which needs to be monitored.
2.  Restart the collector using:
    ```sh
    Restart-Service -Name OtelcolSumo
    ```

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}

## Sample log

```
2023-01-09 13:23:31.276 Logon Login succeeded for user 'NT SERVICE\SQLSERVERAGENT'. Connection made using Windows authentication. [CLIENT: ]
```
## Sample Metrics

```json
{
  "queryId":"A",
  "_source":"EC2AMAZ-T30T53R-13b7b3fc-cc2f-4eb0-accb-2aa33e6fa01b",
  "_metricId":"K4oGmX1LMJ_iMZ4EeqGjJg",
  "_sourceName":"OTC Metric Input",
  "os.type":"windows",
  "sumo.datasource":"sqlserver",
  "db.system":"sqlserver",
  "_sourceCategory":"OTC Metric Input",
  "deployment.environment":"ec2WinDev",
  "host.name":"EC2AMAZ-T30T53R.ec2.internal",
  "metric":"sqlserver.transaction_log.flush.rate",
  "_collectorId":"00005AF3107A445C",
  "_sourceId":"0000000000000000",
  "unit":"{flushes}/s",
  "db.cluster.name":"sqlserverCluster",
  "_sourceHost":"EC2AMAZ-T30T53R",
  "sqlserver.database.name":"master",
  "_collector":"EC2AMAZ-T30T53R-13b7b3fc-cc2f-4eb0-accb-2aa33e6fa01b",
  "max":0.001388,
  "min":0,
  "avg":0.0007219,
  "sum":0.00361,
  "latest":0,
  "count":5
  }
```

## Sample log query

Following is the query from **Error and warning count** panel from the **SQL Server App - Overview** dashboard:

```sql
 %"db.cluster.name"=* %"deployment.environment"=*  %"sumo.datasource"=sqlserver ("Error:" or "Warning:") | json "log" as _rawlog nodrop 
| if (isEmpty(_rawlog), _raw, _rawlog) as _raw 
| parse regex "\s+(?<Logtype>Error|Warning):\s+(?<message>.*)$"
| count by LogType
```

## Sample Metrics Query

The following query is from the **SQL Server - Performance Counters** dashboard > **Page Buffer hit ratio %** panel:

```sql
sumo.datasource=sqlserver deployment.environment=* db.cluster.name=* metric=sqlserver.page.buffer_cache.hit_ratio 
```

## Viewing Microsoft SQL Server dashboards

### Overview

The **SQL Server - Overview** dashboard provides a snapshot overview of your SQL Server instance. Use this dashboard to understand CPU, Memory, and Disk utilization of your SQL Server(s) deployed in your cluster. This dashboard also provides information on login activities and methods by users.

Use this dashboard to:
- Keep track of Deadlock, Error, Backup failure, mirroring errors, and insufficient space issue counts.
- Examine Login activities, failures, and failure reasons.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/SQLServer-OpenTelemetry/SQL-Server-Overview.png' alt="Overview" />

### General Health

The **SQL Server - General Health** dashboard gives you the overall health of SQL Server. Use this dashboard to analyze server events including stopped/up servers, and corresponding down/uptime, monitor disk space percentage utilization, wait time trend, app-domain issues by SQL server.

Use this dashboard to:
- Analyze server events including stopped/up servers, and corresponding down/uptime.
- Monitor server events trends including SQL Server wait time.
- Get insight into app domain and percentage disk utilization issues by SQL Server.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/SQLServer-OpenTelemetry/SQL-Server-General-Health.png' alt="General Health" />

### Backup Restore Mirroring

The **SQL Server - Backup Restore Mirroring** dashboard provides information about:

- Transaction log backup events
- Database backup events
- Restore activities
- Backup failures and reasons
- Mirroring errors

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/SQLServer-OpenTelemetry/SQL-Server-Backup-Restore-Mirroring.png' />

### Operations

The **SQL Server - Operations** displays recent server configuration changes, number and type of configuration updates, error and warnings, high severity error, and warning trends.

Use this dashboard to:
- Get insights into configuration changes and updates to SQL Server instances.
- Monitor any errors and warnings.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/SQLServer-OpenTelemetry/SQL-Server-Operations.png' alt="Operations"/>

### Transaction and Transaction Logs

The **SQL Server - Transaction and Transaction Logs** dashboard shows performance counters related metric for Transaction and Transaction Logs.

Use this dashboard to:

- Get info with respect to time for Transaction and write Transaction per sec.
- Insight into Transaction log related metrics like flush rate, flush data rate, and flush wait rate along with Transaction log % usage.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/SQLServer-OpenTelemetry/SQL-Server-Transaction-And-Transaction-Logs.png' alt="Operations" />

### Performance Counters

The **SQL Server - Performance Counters** dashboard shows performance counters related to database activities, SQL statistics, and buffer cache.

Use this dashboard to:

- Get info for page buffer hit % and page split rate.
- Insight into lock waits rate, page read and write rate along with patch request rate and SQL compilation, and recompilation per sec.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/SQLServer-OpenTelemetry/SQL-Server-Performance-Counters.png' alt="Performance-Counters" />
