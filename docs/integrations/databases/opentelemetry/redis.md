---
id: redis
title: Sumo Logic OpenTelemetry App for Redis
sidebar_label: Redis
description: Documentation for OpenTelemetry App for Redis.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/integrations/databases/redis.png')} alt="Thumbnail icon" width="50"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="45"/>

[Redis](https://redis.io/docs/about/) is an in-memory data structure that implements a distributed, in-memory key-value database with durability options.

The Sumo Logic App for Redis helps you monitor the Redis database cluster. The preconfigured dashboards provide detailed analysis based on logs. The panels provide details such as RDBMemory Usage, events, RDB, and AOF events.

Redis logs are sent to Sumo Logic through OpenTelemetry [filelog receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Redis-OpenTelemetry/schematics-redis.png')} alt="Redis Schematics" />

## Log Types

This Sumo Logic App for Redis supports logs for Redis in Cluster or Standalone mode. The Redis logs are generated in files as configured in the cluster node configuration files in `/etc/redis/redis.conf`. For more details on Redis logs, [click here](https://redislabs.com/ebook/part-2-core-concepts/chapter-5-using-redis-for-application-support/5-1-logging-to-redis/).

## Creating Fields in Sumo Logic for Redis

Following are the [Fields](https://help.sumologic.com/docs/manage/fields/), which will be created as part of the Redis App install if not already present.

**db.cluster.name** - User configured. Enter a name to identify this Redis cluster. This cluster name will be shown in the Sumo Logic dashboards.
**db.system** - Has fixed value of redis
**deployment.environment** - User configured. This is the deployment environment where the Redis cluster resides. For example: dev, prod or qa.
**sumo.datasource** - has fixed value of redis

## Prerequisite

This section provides instructions for configuring log collection for Redis running on a non-Kubernetes environment. By default, Redis logs are stored in a log file.

Follow the instructions to set up log collection:

1. To configure the Redis log file, locate your local `[redis.conf](https://download.redis.io/redis-stable/redis.conf)` configuration file in the database directory. By default, Redis logs are stored in `/var/log/redis/redis-server.log`.
1. After determining the location of conf file, open your `redis.conf` configuration file in a text editor to modify its logging parameters as such:
   1. Specify the server verbosity level. The value loglevel in conf file can be set to one of the following:
      * debug (a lot of information, useful for development/testing)
      * verbose (many rarely useful info, but not a mess like the debug level)
      * notice (moderately verbose, what you want in production probably)
      * warning (only very important/critical messages are logged) loglevel notice
    1. Specify the log file name. Also the empty string can be used to force Redis to log on the standard output. Note that if you use the standard output for logging but daemonize, logs will be sent to `/dev/null` logfile
1. Save the `redis.conf` file and restart the Redis server using the command: `sudo  service redis-server restart`.

Once the logs are configured to be written to a local file, follow the steps below to configure the collection in Sumo Logic.

## Configuring Collection and Installing the Redis App

As part of setting up the collection process and app installation, you can select the App from **App Catalog** and click **Install App**. Follow the steps below:

### Step 1: Set up Collector

:::note
If you want to use an existing OpenTelemetry Collector, you can skip this step by selecting the option of using an existing Collector.
:::

If you want to create a new Collector, select the **Add a new Collector** option.

Select the platform for which you want to install the Sumo OpenTelemetry Collector.

This will generate a command that can be executed in the machine that needs monitoring. Once executed, it will install the Sumo Logic OpenTelemetry Collector agent. <br/> <img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Redis-OpenTelemetry/collector-screenshot.png')} alt="Collector" />

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Redis-OpenTelemetry/collector-screenshot.png')} alt="Collector" />

### Step 2: Configure integration

OpenTelemetry works with a [configuration](https://opentelemetry.io/docs/collector/configuration/) yaml file with all the details concerning the data that needs to be collected. For example, it specifies the location of a log file that is read and sent to the Sumo Logic platform.

In this step, we will be configuring the yaml required for Redis Collection.

The log file path configured to capture redis logs must be given here.

The files are typically located in `/var/log/redis/redis-server.log`. If you are using a customized path, check the `[redis.conf](https://download.redis.io/redis-stable/redis.conf)` file for this information.

Click on the **Download YAML File** button to get the yaml file.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Redis-OpenTelemetry/configuration-screenshot.png')} alt="Configuration" />

### Step 3: Sending logs to Sumo Logic

Once you have the yaml file downloaded in step 2, please follow the below steps based on your environment

#### Linux

1. Copy the yaml at **`/etc/otelcol-sumo/conf.d/`** folder in the Redis instance which needs to be monitored.
2. Restart the otelcol-sumo process using the below command `sudo systemctl restart otelcol-sumo`

#### Mac

1. Copy the yaml at `/etc/otelcol-sumo/conf.d/` folder in the Redis instance which needs to be monitored.
2. Restart the otelcol-sumo process using the command `otelcol-sumo --config /etc/otelcol-sumo/sumologic.yaml --conf "glob:/etc/otelcol-sumo/conf.d/*.yaml"`

Sumo Logic will start receiving data from your host machine when the above command is successfully executed.

This will install the app and dashboards to your Sumo Logic org.

Results will be available after a while. It is important to note that each panel slowly and automatically fills with data matching the time range query received since the panel was created. Your data should appear in the dashboard within 20 minutes, and you will see complete graphs and maps.

## Sample Log Message

Here's a sample log message in Non-Kubernetes environment.

`5275:S 17 Mar 2021  19:13:38.138 * MASTER <-> REPLICA sync: Finished with success`

## Sample Query

This sample Query is from the Redis - Logs dashboard > Logs panel.

```sql
Query String
db.cluster.name=* sumo.datasource="redis"
| json auto maxdepth 1 nodrop
| if  (isEmpty(log), _raw, log)  as message
| count by message
| limit  100
| fields message
```

## Viewing Redis Dashboards

### Logs

The Redis - Logs dashboard provides a detailed analysis based on logs. The panels provide details such as RDBMemory Usage, events, RDB, and AOF events.

Use this dashboard to:
- Review errors and warnings generated by the server.
- Review the RDBMemory Usage, events, RDB, and AOF events.

<img src={useBaseUrl('https://sumologic-app-data-v2.s3.amazonaws.com/dashboards/Redis-OpenTelemetry/Redis-Logs.png')} alt="Redis Logs dashboards" />
