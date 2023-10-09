---
id: cassandra-opentelemetry
title: Cassandra - OpenTelemetry Collector
sidebar_label: Cassandra - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry App for Cassandra.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/databases/cassandra.png')} alt="Thumbnail icon" width="60"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

The [Cassandra](https://cassandra.apache.org/_/cassandra-basics.html) - OpenTelemetry app is a log based app that helps you monitor the availability, performance, health, and resource utilization of your Cassandra clusters. Preconfigured dashboards provide insight into resource utilization, cache/Gossip/Memtable statistics and Error and warnings. Cassandra logs are sent to Sumo Logic through OpenTelemetry [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

The app supports Logs from the open-source version of Cassandra. The App is tested on the 3.11.10 version of Cassandra.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Cassandra-OpenTelemetry/Cassandra-Schematics.png' alt="Schematics" />

## Fields creation in Sumo Logic for Cassandra

Following are the [Fields](/docs/manage/fields/) which will be created as part of Cassandra App install if not already present:

- `db.cluster.name`. User configured. Enter a name to identify this Cassandra cluster. This cluster name will be shown in the Sumo Logic dashboards.
- `db.system`. Has fixed value of **cassandra**.
- `deployment.environment`. User configured. Through this Cassandra cluster is identified by the environment where it resides. For example: dev, prod or qa.
- `sumo.datasource`. Has fixed value of **cassandra**.

## Prerequisites

Cassandra has three main logs: system.log, debug.log, and gc.log which hold general logging messages, debugging logging messages, and java garbage collection logs respectively.

These logs by default live in `${CASSANDRA_HOME}/logs`, but most Linux distributions relocate logs to `/var/log/cassandra`. Operators can tune this location as well as what levels are logged using the provided logback.xml file. For more details on Cassandra logs, see[ this](https://cassandra.apache.org/doc/latest/troubleshooting/reading_logs.html) link.

## Collection configuration and app installation

{@import ../../../reuse/apps/opentelemetry/config-app-install.md}

### Step 1: Set up Collector

{@import ../../../reuse/apps/opentelemetry/set-up-collector.md}

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Cassandra-OpenTelemetry/Cassandra-Collector.png' alt="Collector" />

### Step 2: Configure integration

In this step, you will configure the yaml required for Cassandra Collection. Path of the log file configured to capture Cassandra logs needs to be given here.

Below are the inputs required:
- The path to system.log is required here. This file is typically located in `/var/log/cassandra`. If you're using a customized path, check the respective conf file for this information.

You can add any custom fields which you want to be tagged with the data ingested in Sumo. Click on the **Download YAML File** button to get the yaml file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Cassandra-OpenTelemetry/Cassandra-YAML.png' alt="YAML" />

### Step 3: Send logs to Sumo

{@import ../../../reuse/apps/opentelemetry/send-logs-intro.md}

Linux:

1. Copy the yaml to `/etc/otelcol-sumo/conf.d/` folder for the Cassandra instance which needs to be monitored.
2. Restart the collector using:
  ```sh
  sudo systemctl restart otelcol-sumo
  ```

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}

## Sample Log

```sql
INFO [ScheduledTasks:1] 2023-01-08 09:18:47,347 StatusLogger.java:101 - system.schema_aggregates
```

## Sample Query 

Following is the query from Cassandra App's overview Dashboard's Nodes Up Panel:

```sql
%"sumo.datasource"=cassandra %"deployment.environment"=* %"db.cluster.name"=*   "INFO" | json "log" as _rawlog nodrop 
| if (isEmpty(_rawlog), _raw, _rawlog) as _raw
| parse regex field=_raw "(?<level>[A-Z]*) *\[(?<thread_name>[^\]]*?)[:_-]?(?<thread_id>[0-9]*)\] (?<Date>.{10} .{12}) *(?<source_file>[^:]*):(?<source_line>[0-9]*) - (?<message>.*)"
| if (message matches "InetAddress * is now UP",1,0) as UP
| timeslice 1d
| sum(UP) as UP by _timeslice
| sort by _timeslice asc
```

## Viewing Cassandra Dashboards

### Overview

The **Cassandra - Overview** dashboard provides an at-a-glance view of Cassandra backend and frontend HTTP error codes percentage, visitor location, URLs, and clients causing errors.

Use this dashboard to:

- Identify number of nodes which are up and down
- Gain insights into Memory - Init, used, Max and committed
- Gain insights into the error and warning logs by thread and Node activity

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Cassandra-OpenTelemetry/Cassandra-Overview.jpg' alt="Collector" />

### Cache Stats

The **Cassandra - Cache Stats** dashboard provides insight into the database cache status, schedule, and items.

Use this dashboard to:

- Monitor Cache performance.
- Identify Cache usage statistics.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Cassandra-OpenTelemetry/Cassandra-Cache-Stats.jpg' alt="Cache Stats" />

### Errors and Warnings

The **Cassandra - Errors and Warnings** dashboard provides details of the database errors and warnings.

Use this dashboard to:

- Review errors and warnings generated by the server.
- Review the Threads errors and warning events.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Cassandra-OpenTelemetry/Cassandra-Errors-and-Warnings.jpg' alt="Errors and Warnings" />

### Gossip

The **Cassandra - Gossip** dashboard provides details about communication between various cassandra nodes.

Use this dashboard to:

- Determine nodes with errors resulting in failures.
- Review the node activity and pending tasks.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Cassandra-OpenTelemetry/Cassandra-Gossip.jpg' alt="Gossip" />

### Memtable

The **Cassandra - Memtable** dashboard provides insights into memtable statistics.

Use this dashboard to:

- Review flush activity and memtable status.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Cassandra-OpenTelemetry/Cassandra-Memtable.jpg' alt="Memtable" />

### Resource Usage

The **Cassandra - Resource Usage** dashboard provides details of resource utilization across Cassandra clusters.

Use this dashboard to:

- Identify resource utilization. This can help you to determine whether resources are over-allocated or under-allocated.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Cassandra-OpenTelemetry/Cassandra-Resource-Usage-Logs.jpg' alt="Resource Usage" />
