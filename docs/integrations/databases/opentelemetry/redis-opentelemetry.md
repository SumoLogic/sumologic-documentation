---
id: redis-opentelemetry
title: Redis - OpenTelemetry Collector
sidebar_label: Redis - OTel Collector
description: Learn about the Sumo Logic OpenTelemetry App for Redis.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/databases/redis.png')} alt="Thumbnail icon" width="50"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

[Redis](https://redis.io/docs/about/) is an in-memory data structure that implements a distributed, in-memory key-value database with durability options.

The Sumo Logic App for Redis helps you monitor the Redis database cluster. The preconfigured dashboards provide detailed analysis based on logs. The panels provide details such as RDBMemory Usage, events, RDB, and AOF events.

Redis logs are sent to Sumo Logic through OpenTelemetry [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Redis-OpenTelemetry/Redis-Schematics.png' alt="Redis Schematics" />

## Log Types

This app supports logs for Redis in Cluster mode or Standalone mode. The Redis logs are generated in files as configured in the cluster node configuration files in `/etc/redis/redis.conf`. For more details on Redis logs, [click here](https://redislabs.com/ebook/part-2-core-concepts/chapter-5-using-redis-for-application-support/5-1-logging-to-redis/).

## Creating Fields in Sumo Logic for Redis

The following are [Fields](/docs/manage/fields/) that will be created as part of the Redis App install if not already present.

* **`db.cluster.name`**. User configured. Enter a name to identify this Redis cluster. This cluster name will be shown in the Sumo Logic dashboards.
* **`db.system`**. Has fixed value of redis.
* **`deployment.environment`**. User configured. This is the deployment environment where the Redis cluster resides. For example: dev, prod or qa.
* **`sumo.datasource`**. Has fixed value of redis.

## Prerequisites

This section provides instructions for configuring log collection for Redis running on a non-Kubernetes environment. By default, Redis logs are stored in a log file.

Follow the instructions to set up log collection:

1. To configure the Redis log file, locate your local [`redis.conf`](https://download.redis.io/redis-stable/redis.conf) configuration file in the database directory. By default, Redis logs are stored in `/var/log/redis/redis-server.log`.
1. After determining the location of conf file, open your `redis.conf` configuration file in a text editor to modify its logging parameters as such:
   1. Specify the server verbosity level. The value **`loglevel`** in conf file can be set to one of the following, in ascending order of severity: `debug`, `verbose`, `notice`, `warning`.
   1. Specify the log file name. Also the empty string can be used to force Redis to log on the standard output. If you use the standard output for logging but daemonize, logs will be sent to `/dev/null` logfile.
1. Save the `redis.conf` file and restart the Redis server using the command: `sudo service redis-server restart`.

Once the logs are configured to write to a local file, follow the steps below to configure the collection in Sumo Logic.

## Collection configuration and app installation

{@import ../../../reuse/apps/opentelemetry/config-app-install.md}

### Step 1: Set up Collector

{@import ../../../reuse/apps/opentelemetry/set-up-collector.md}

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Redis-OpenTelemetry/Redis-Collector.png' alt="Collector" />

### Step 2: Configure integration

OpenTelemetry works with a [configuration](https://opentelemetry.io/docs/collector/configuration/) yaml file with all the details concerning the data that needs to be collected. For example, it specifies the location of a log file that is read and sent to the Sumo Logic platform.

In this step, you will configure the yaml file required for Redis Collection.

The log file path configured to capture redis logs must be given here. The files are typically located in `/var/log/redis/redis-server.log`. If you are using a customized path, check the [`redis.conf`](https://download.redis.io/redis-stable/redis.conf) file for this information.

You can add any custom fields which you want to tag along with the data ingested in Sumo. Click on the **Download YAML File** button to get the yaml file.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Redis-OpenTelemetry/Redis-YAML.png' alt="Configuration" />


### Step 3: Send logs to Sumo Logic

{@import ../../../reuse/apps/opentelemetry/send-logs-intro.md}

<Tabs
  className="unique-tabs"
  defaultValue="Linux"
  values={[
    {label: 'Linux', value: 'Linux'},
    {label: 'macOS', value: 'macOS'},
  ]}>

<TabItem value="Linux">

1. Copy the yaml at `/etc/otelcol-sumo/conf.d/` folder in the Redis instance that needs to be monitored.
2. Restart the otelcol-sumo process using:
  ```sh
  sudo systemctl restart otelcol-sumo
  ```

</TabItem>
<TabItem value="macOS">

1. Copy the yaml at `/etc/otelcol-sumo/conf.d/` folder in the Redis instance that needs to be monitored.
2. Restart the otelcol-sumo process using:
  ```sh
  otelcol-sumo --config /etc/otelcol-sumo/sumologic.yaml --conf "glob:/etc/otelcol-sumo/conf.d/*.yaml"
  ```

</TabItem>
</Tabs>

{@import ../../../reuse/apps/opentelemetry/send-logs-outro.md}

## Sample Log Message

Here's a sample log message in a non-Kubernetes environment.

`5275:S 17 Mar 2021  19:13:38.138 * MASTER <-> REPLICA sync: Finished with success`

## Sample Query

This sample query is from the **Redis - Logs** dashboard > Logs panel.

```sql title="Query string"
db.cluster.name=* sumo.datasource="redis"
| json auto maxdepth 1 nodrop
| if  (isEmpty(log), _raw, log)  as message
| count by message
| limit  100
| fields message
```

## Viewing Redis Dashboards

### Logs

The **Redis - Logs** dashboard provides a detailed analysis based on logs. The panels provide details such as RDBMemory Usage, events, RDB, and AOF events.

Use this dashboard to:
- Review errors and warnings generated by the server.
- Review the RDBMemory Usage, events, RDB, and AOF events.

<img src='https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Redis-OpenTelemetry/Redis-Logs.png' alt="Redis Logs dashboards" />
