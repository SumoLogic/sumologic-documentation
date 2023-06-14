---
id: sql-server-linux-opentelemetry
title: Microsoft SQL Server for Linux - OpenTelemetry Collector
sidebar_label: Microsoft SQL Server for Linux - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry app for Microsoft SQL Server for Linux.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

<img src={useBaseUrl('img/integrations/microsoft-azure/sql.png')} alt="thumbnail icon" width="50"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

The Sumo Logic app for Microsoft SQL Server is a logs based app that provides insight into your SQL Server for Linux. The app consists of predefined dashboards, providing visibility into your environment for real-time or historical analysis on backup, restore mirroring, general health and operations of your system.

This app has been tested with following SQL Server versions:

- Microsoft SQL Server 2016

SQL Server logs are sent to Sumo Logic through OpenTelemetry [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/SQLServer-Linux-OpenTelemetry/SQL-Server-Schematics.png' alt="Redis Logs dashboards" />

## Fields creation in Sumo Logic for SQL Server

Following are the [Fields](https://help.sumologic.com/docs/manage/fields/) which will be created as part of SQL Server app install if not already present.

* `db.cluster.name`. User configured. Enter a name to identify this SQL Server cluster. This cluster name will be shown in the Sumo Logic dashboards.
* `db.system`. Has a fixed value of **sqlserver**.
* `deployment.environment`. User configured. This is the deployment environment where the SQL Server cluster resides. For example dev, prod, or qa.
* `sumo.datasource`. Has a fixed value of **sqlserver**.

## Prerequisites

Make sure logging is turned on in SQL Server. Follow [this documentation](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/scm-services-configure-sql-server-error-logs?view=sql-server-ver15) to enable it.

The Microsoft SQL Server app's queries and dashboards depend on logs from the SQL Server ERRORLOG, which is typically found in: `/var/opt/mssql/log/errorlog`.

The ERRORLOG is typically in UTF-16LE encoding, but verify the file encoding used in your SQL Server configuration.

## Configure SQL Server Logs Collection

### Step 1: Set up Collector

{@import ../../../reuse/apps/opentelemetry/set-up-collector.md}

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/SQLServer-OpenTelemetry/SQL-Server-Collector.png' alt="Collector" />

### Step 2: Configure integration

The Microsoft SQL Server app's queries and dashboards depend on logs from the SQL Server ERRORLOG, which is typically found in:

`/var/opt/mssql/log/errorlog`

You can add any custom fields which you want to tag along with the data ingested in Sumo. Click on the **Download YAML File** button to get the YAML file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/SQLServer-Linux-OpenTelemetry/SQL-Server-linux-YAML.png' alt="YAML" style={{border: '1px solid black'}} />

### Step 3: Send logs to Sumo Logic

{@import ../../../reuse/apps/opentelemetry/send-logs-intro.md}

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the SQL Server instance which needs to be monitored.
1. Restart the collector using:
  ```sh
  sudo systemctl restart otelcol-sumo
  ```

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}

## Sample log

```
2023-01-09 13:23:31.276 Logon Login succeeded for user 'NT SERVICE\SQLSERVERAGENT'. Connection made using Windows authentication. [CLIENT: ]
```

## Sample Query

Following is the query from **Error and warning count** panel from the **SQL Server app - Overview** dashboard:

```sql
 %"db.cluster.name"=* %"deployment.environment"=*  %"sumo.datasource"=sqlserver ("Error:" or "Warning:") | json "log" as _rawlog nodrop 
| if (isEmpty(_rawlog), _raw, _rawlog) as _raw 
| parse regex "\s+(?<Logtype>Error|Warning):\s+(?<message>.*)$"
| count by LogType
```

## Viewing Microsoft SQL Server dashboards

### Overview

The **SQL Server - Overview** dashboard provides a snapshot overview of your SQL Server instance. Use this dashboard to understand CPU, Memory, and Disk utilization of your SQL Server(s) deployed in your cluster. This dashboard also provides login activities and methods by users.

Use this dashboard to:
-   Keep track of Deadlock, Error, Backup failure, Mirroring errors, and Insufficient space issue counts.
-   Examine Login activities, failures, and failure reasons.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/SQLServer-Linux-OpenTelemetry/SQL-Server-Overview.png' alt="Overview" />

### General Health

The **SQL Server - General Health** dashboard provides you the overall health of SQL Server. Use this dashboard to analyze server events including stopped/up servers and its corresponding down/uptime, monitor disk space percentage utilization, wait time trend, and app-domain issues by SQL server.

Use this dashboard to:

-   Analyze server events including stopped/up servers and its corresponding down/uptime.
-   Monitor server events trends including SQL Server wait time.
-   Get insight into app-domain and percentage disk utilization issues by SQL Server.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/SQLServer-Linux-OpenTelemetry/SQL-Server-General-Health.png' alt="General Health" />

### Backup Restore Mirroring

The **SQL Server - Backup Restore Mirroring** dashboard provides information about:

-   Transaction log backup events
-   Database backup events
-   Restore activities
-   Backup failures and reasons
-   Mirroring errors

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/SQLServer-Linux-OpenTelemetry/SQL-Server-Backup-Restore-Mirroring.png' alt="Backup Restore Mirroring" />

### Operations

The **SQL Server - Operations** dashboard displays recent server configuration changes, number and type of configuration updates, error and warnings, high severity error, and warning trends.

Use this dashboard to:

-   Get insights into configuration changes and updates to SQL server instances.
-   Monitor any errors and warnings.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/SQLServer-Linux-OpenTelemetry/SQL-Server-Operations.png' alt="Operations" />

