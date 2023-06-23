---
id: mongodb-opentelemetry
title: MongoDB - OpenTelemetry Collector
sidebar_label: MongoDB - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry App for MongoDB.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/databases/mongodb.png')} alt="Thumbnail icon" width="120"/><img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

[MongoDB](https://www.mongodb.com/why-use-mongodb#:~:text=MongoDB%20is%20a%20document%20database,development%20teams%20using%20agile%20methodologies.) is a source-available cross-platform document-oriented database program. The Sumo Logic app for MongoDB supports logs and metrics from the open source version of MongoDB. The App is tested on the 4.4.4 version of MongoDB.

MongoDB logs are sent to Sumo Logic through OpenTelemetry [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/MongoDB-OpenTelemetry/MongoDB-Schematics.png' alt="Schematics" />

## Log Types

The MongoDB logs are generated in files as configured in the configuration file `/var/log/mongodb/mongodb.log`. For more details on MongoDB logs, see [this](https://docs.mongodb.com/manual/reference/log-messages/) link.

## Fields creation in Sumo Logic for MongoDB

Following are the [Fields](/docs/manage/fields/) which will be created as part of MongoDB App install if not already present.

- **`db.cluster.name`**. User configured. Enter a name to identify this MongoDb cluster. This cluster name will be shown in the Sumo Logic dashboards.
- **`db.system`**. Has fixed value of **mongodb**.
- **`deployment.environment`**. User configured. This is the deployment environment where the Mongodb cluster resides. For example: dev, prod or qa.
- **`sumo.datasource`**. has a fixed value of **mongodb**.

## Prerequisites

By default, MongoDB logs are stored in a log file.

1. Configure logging verbosity in MongoDB : MongoDB logs have six levels of verbosity. All logging settings are located in [MongoDB.conf](https://docs.mongodb.com/manual/reference/method/db.setLogLevel/). To select a level, set loglevel to one of:
   - 0 is the MongoDB's default log verbosity level, to include [Informational](https://docs.mongodb.com/manual/reference/log-messages/#std-label-log-severity-levels) messages.
   - 1 to 5 increases the verbosity level to include[ Debug](https://docs.mongodb.com/manual/reference/log-messages/#std-label-log-severity-levels) messages.
2. Configure MongoDB to log to a Local file: Configuring MongoDB logs to go to log files. By default, MongoDB logs are stored in `/var/log/mongodb/mongodb.log`. The default directory for log files is listed in the MongoDB.conf file. To configure the log output destination to a log file, use one of the following settings, either in the [configuration file](https://docs.mongodb.com/manual/reference/configuration-options/) or command-line:
   - Configuration file: The [systemLog.destination](https://docs.mongodb.com/manual/reference/configuration-options/#mongodb-setting-systemLog.destination) option for file.
      - Command-line:
         - The [--logpath](https://docs.mongodb.com/manual/reference/program/mongod/#std-option-mongod.--logpath) option for [mongod](https://docs.mongodb.com/manual/reference/program/mongod/#mongodb-binary-bin.mongod) for file.
         - The [--logpath](https://docs.mongodb.com/manual/reference/program/mongos/#std-option-mongos.--logpath) option for [mongos](https://docs.mongodb.com/manual/reference/program/mongos/#mongodb-binary-bin.mongos) for file.

## Configure MongoDB Logs Collection

### Step 1: Set up Collector

{@import ../../../reuse/apps/opentelemetry/set-up-collector.md}

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/MongoDB-OpenTelemetry/MongoDB-Collector.png' alt="Collector" />

### Step 2: Configure integration

In this step the user needs to provide the path to the mongo db log file configured as part of above steps. Typically the logs are located at the location: `/var/log/mongodb/mongodb.log`.

You can add any custom fields which you want to tag along with the data ingested in Sumo. Click on the **Download YAML File** button to get the yaml file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/MongoDB-OpenTelemetry/MongoDB-YAML.png' alt="YAML" />

### Step 3: Send logs to Sumo

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

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the Mongodb instance which needs to be monitored.
2. restart the collector using:
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

1. Copy the yaml file to `/etc/otelcol-sumo/conf.d/` folder in the Mongodb instance which needs to be monitored.
2. Restart the otelcol-sumo process using:
```sh
 otelcol-sumo --config /etc/otelcol-sumo/sumologic.yaml --config "glob:/etc/otelcol-sumo/conf.d/*.yaml" 
```

</TabItem>
</Tabs>

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}

## Sample Log Message

```sql
{
   "t":{
       "$date":"2021-05-21T10:22:57.373+00:00"
   },
   "s":"I",
   "c":"NETWORK",
   "id":51800,
   "ctx":"conn500659",
   "msg":"client metadata",
   "attr":{
       "remote":"127.0.0.1:49472",
       "client":"conn500659",
       "doc":{
           "application":{
               "name":"MongoDB Shell"
           },
           "driver":{
               "name":"MongoDB Internal Client",
               "version":"4.4.4"
           },
           "os":{
               "type":"Linux",
               "name":"PRETTY_NAME=\"Debian GNU/Linux 10 (buster)\"",
               "architecture":"x86_64",
               "version":"Kernel 4.4.0-62-generic"
           }
       }
   }
}
```

## Sample Query

Dashboard: MongoDB - Errors and Warnings, Panel: Errors by Component

```sql
deployment.environment=* db.cluster.name=* sumo.datasource=mongodb  | json "log"  as _rawlog nodrop
| if  (isEmpty(_rawlog), _raw, _rawlog)  as _raw
| json field=_raw "t.$date"  as  timestamp
| json field=_raw "s"  as severity
| json field=_raw "c"  as component
| json field=_raw "ctx"  as context
| json field=_raw "msg"  as msg
| where severity in ("E")
| count by component
```

## Viewing MongoDB Dashboards

If no relevant data was received within the time range of the Panel, the Panel will be empty.

### Overview

The **MongoDB - Overview** dashboard provides an at-a-glance view of MongoDB health, performance and problems causing errors.

Use this dashboard to:

-   Identify Slow CRUD and DB commands.
-   Gain insights into Errors logs by component and context.
-   Number of up servers.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/MongoDB-OpenTelemetry/MongoDB-Overview.png' alt="Overview" />

### Errors and Warnings

The **MongoDB - Errors and Warnings** dashboard shows errors and warnings by the MongoDB component.

Use this dashboard to:

-   Determine components producing multiple errors or warnings.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/MongoDB-OpenTelemetry/MongoDB-Errors-and-Warnings.png' alt="Access" />

### Logins and Connections

The **MongoDB - Logins and Connections** dashboard shows geo location of client connection requests, failed connection logins by geo location, and count of failed login attempts.

Use this dashboard to:

-   Determine potential hacking attempts.
-   Determine location of attacks.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/MongoDB-OpenTelemetry/MongoDB-Logins-and-Connections.png' alt="Logins and Connections" />

### Query Logs

The **MongoDB - Query Logs** dashboard shows read and write query trends.

Use this dashboard to:

-   Monitor abnormal spikes in Query volume.
-   Identify the read versus write ratio of your application queries. Adjusting indexes to improve query performance.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/MongoDB-OpenTelemetry/MongoDB-Query-Logs.png' alt="Query Logs" />

### Replication Logs

The **MongoDB - Replication Logs** dashboard shows replica deletes/updates/inserts trend and replica state.

Use this dashboard to:

-   Monitor replication state and replication events like inserts/updates/commands per second.
-   Track Replication Oplog window to identify replication delay

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/MongoDB-OpenTelemetry/MongoDB-Replication-Logs.png' alt="Replication Logs" />

### Sharding

The **MongoDB - Sharding** dashboard dashboard shows sharding related errors, events, failures and number of chunks moving between shards.

Use this dashboard to:

-   Identify Sharding errors and warnings.
-   Gain insights into Chunk operations.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/MongoDB-OpenTelemetry/MongoDB-Sharding.png' alt="Sharding" />
