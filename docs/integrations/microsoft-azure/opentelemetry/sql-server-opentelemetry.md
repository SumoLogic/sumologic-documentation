---
id: sql-server-linux-opentelemetry
title: Microsoft SQL Server for Linux - OpenTelemetry Collector
sidebar_label: Microsoft SQL Server for Linux - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry App for Microsoft SQL Server for linux.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/microsoft-azure/sql.png')} alt="thumbnail icon" width="50"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

The Sumo Logic App for Microsoft SQL Server is a logs based app that provides insight into your SQL Server for Linux. The App consists of predefined dashboards, providing visibility into your environment for real-time or historical analysis on backup, restore mirroring, general health and operations of your system.

This App has been tested with following SQL Server versions:

- Microsoft SQL Server 2016

SQL Server logs are sent to Sumo Logic through OpenTelemetry [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/SQLServer-Linux-OpenTelemetry/SQL-Server-Schematics.png' alt="Redis Logs dashboards" />

## Fields creation in Sumo Logic for SQL Server

Following are the [Fields](https://help.sumologic.com/docs/manage/fields/) which will be created as part of SQL Server App install if not already present.

* `db.cluster.name`. User configured. Enter a name to identify this SQL Server cluster. This cluster name will be shown in the Sumo Logic dashboards.
* `db.system`. Has a fixed value of **sqlserver**.
* `deployment.environment`. User configured. This is the deployment environment where the SQL Server cluster resides. For example dev, prod, or qa.
* `sumo.datasource`. Has a fixed value of **sqlserver**.

## Prerequisites

Make sure logging is turned on in SQL Server. Follow [this documentation](https://docs.microsoft.com/en-us/sql/database-engine/configure-windows/scm-services-configure-sql-server-error-logs?view=sql-server-ver15) to enable it.

The Microsoft SQL Server App's queries and dashboards depend on logs from the SQL Server ERRORLOG, which is typically found in: `/var/opt/mssql/log/errorlog`

The ERRORLOG is typically in UTF-16LE encoding, but verify the file encoding used in your SQL Server configuration.

## Configure SQL Server Logs Collection

### Step 1: Set up Collector

If you want to use an existing Otel Collector then this step can be skipped by selecting the option of using an existing Collector.

If you want to create a new Collector, select the **Add a new Collector** option.

Select the platform for which you want to install the Sumo OpenTelemetry Collector.

This will generate a command which can be executed in the machine which needs to get monitored. Once executed it will install the Sumo Logic OpenTelemetry Collector agent.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/SQLServer-OpenTelemetry/SQL-Server-Collector.png' alt="Collector" />

### Step 2: Configure integration

The Microsoft SQL Server App's queries and dashboards depend on logs from the SQL Server ERRORLOG, which is typically found in:

`/var/opt/mssql/log/errorlog`

You can add any custom fields which you want to tag along with the data ingested in Sumo. Click on the **Download YAML File** button to get the yaml file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/SQLServer-Linux-OpenTelemetry/SQL-Server-linux-YAML.png' alt="YAML" />

### Step 3: Send logs to Sumo

Once you have the yaml file downloaded in step 2, you can copy it to the machine which needs to be monitored. Follow the below steps based on the platform of the machine:

1.  Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the SQL Server instance which needs to be monitored.
1.  Restart the collector using:
  ```sh
  sudo systemctl restart otelcol-sumo
  ```

After successful execution of the above command, Sumo will start receiving the data from your host machine.

Press **Next** . This will install the app to your Sumo Logic Org. The app consists of Dashboards.

Panels will start to fill automatically. It's important to note that each panel fills with data matching the time range query and received since the panel was created. Results won't immediately be available, but within 20 minutes, you'll see full graphs and maps.

## Sample Logs

```
2023-01-09 13:23:31.276 Logon Login succeeded for user 'NT SERVICE\SQLSERVERAGENT'. Connection made using Windows authentication. [CLIENT: ]
```

## Sample Queries

Following is the query from **Error and warning count** panel from the **SQL Server App - Overview** dashboard:

```sql
 %"db.cluster.name"=* %"deployment.environment"=*  %"sumo.datasource"=sqlserver ("Error:" or "Warning:") | json "log" as _rawlog nodrop 
| if (isEmpty(_rawlog), _raw, _rawlog) as _raw 
| parse regex "\s+(?<Logtype>Error|Warning):\s+(?<message>.*)$"
| count by LogType
```

## Viewing Microsoft SQL Server Dashboards

### SQL Server - Overview

The **SQL Server - Overview** dashboard provides a snapshot overview of your SQL Server instance. Use this dashboard to understand CPU, Memory, and Disk utilization of your SQL Server(s) deployed in your cluster. This dashboard also provides login activities and methods by users.

Use this dashboard to:
-   Keep track of Deadlock, Error, Backup failure, Mirroring errors, and Insufficient space issue counts.
-   Examine Login activities, failures, and failure reasons.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/SQLServer-Linux-OpenTelemetry/SQL-Server-Overview.png' alt="Overview" />

### SQL Server - General Health

The **SQL Server - General Health** dashboard provides you the overall health of SQL Server. Use this dashboard to analyze server events including stopped/up servers and its corresponding down/uptime, monitor disk space percentage utilization, wait time trend, and app-domain issues by SQL server.

Use this dashboard to:

-   Analyze server events including stopped/up servers and its corresponding down/uptime.
-   Monitor server events trends including SQL Server wait time.
-   Get insight into app-domain and percentage disk utilization issues by SQL Server.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/SQLServer-Linux-OpenTelemetry/SQL-Server-General-Health.png' alt="General Health" />

### SQL Server - Backup Restore Mirroring

The **SQL Server - Backup Restore Mirroring** dashboard provides information about:

-   Transaction log backup events
-   Database backup events
-   Restore activities
-   Backup failures and reasons
-   Mirroring errors

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/SQLServer-Linux-OpenTelemetry/SQL-Server-Backup-Restore-Mirroring.png' alt="Backup Restore Mirroring" />

### SQL Server - Operations

The **SQL Server - Operations** dashboard displays recent server configuration changes, number and type of configuration updates, error and warnings, high severity error, and warning trends.

Use this dashboard to:

-   Get insights into configuration changes and updates to SQL server instances.
-   Monitor any errors and warnings.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/SQLServer-Linux-OpenTelemetry/SQL-Server-Operations.png' alt="Operations" />