---
id: redis
title: Redis Source Template
sidebar_label: Redis
description: Learn about the Sumo Logic Redis source template for OpenTelemetry.
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('/img/integrations/databases/redis.png')} alt="Thumbnail icon" width="100"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="30"/>

The Redis source template creates an OpenTelemetry configuration that can be pushed to a remotely managed OpenTelemetry collector (abbreviated as otelcol). By creating this source template and pushing the config to the appropriate OpenTelemetry agent, you can ensure collection of your redis logs and metrics to Sumo Logic.
		
## Fields creation in Sumo Logic for Local File

If not already present, the following [Fields](/docs/manage/fields/) are created as part of source template creation.

- **`sumo.datasource`**. Fixed value of **localfile**.
- **`deployment.environment`**. This is a user-configured field set at the time of collector installation. It identifies the environment where the host resides, such as `dev`, `prod`, or `qa`.
- **`db.cluster.name`**. User configured. Enter a uniquely identifiable name for your redis server cluster to show in the Sumo Logic dashboards.
- **`db.node.name`**. Includes the value of the hostname of the machine which is being monitored.
		
## Prerequisites

### For metrics collection

The Redis INFO command returns information and statistics about a Redis server (see Redis [INFO](https://redis.io/commands/info) for details). The Redis [receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/redisreceiver) extracts values from the result and converts them to OpenTelemetry metrics.

### For logs collection

The Redis logs are generated in files as configured in the cluster node configuration files in `/etc/redis/redis.conf`. For more details on Redis logs, see [Redis documentation](https://redislabs.com/ebook/part-2-core-concepts/chapter-5-using-redis-for-application-support/5-1-logging-to-redis/)

Follow the instructions to set up log collection:

1. To configure the Redis log file, locate your local [`redis.conf`](https://download.redis.io/redis-stable/redis.conf) configuration file in the database directory. By default, Redis logs are stored in `/var/log/redis/redis-server.log`.
1. After determining the location of conf file, open your `redis.conf` configuration file in a text editor to modify its logging parameters as such:
   1. Specify the server verbosity level. The value **`loglevel`** in conf file can be set to one of the following, in ascending order of severity: `debug`, `verbose`, `notice`, `warning`.
   1. Specify the log file name. Also the empty string can be used to force Redis to log on the standard output. If you use the standard output for logging but daemonize, logs will be sent to `/dev/null` logfile.
1. Save the `redis.conf` file and restart the Redis server using the command: `sudo service redis-server restart`.

Once the logs are configured to write to a local file, follow the steps below to configure the collection in Sumo Logic.

import LogsCollectionPrereqisites from '../../../../reuse/apps/logs-collection-prereqisites.md';

<LogsCollectionPrereqisites/>
		
## Source template configuration
		
Follow the below steps to set a remotely managed OpenTelemetry collector and push the source template to it.
		
### Step 1: Set up remotely managed OpenTelemetry collector
		
import CollectorInstallation from '../../../../reuse/apps/opentelemetry/collector-installation.md';
		
<CollectorInstallation/>
		
### Step 2: Configure the source template
		
In this step, you will configure the yaml required for Local File Collection. Below are the inputs required:
		
- **Name**. Name of the source template.
- **Description**. Description for the source template.
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default, sumo tags `_sourceCategory` with the value otel/redis.
- **Redis logs Path**. Provide the file which needs to be read by OpenTelemetry agent. You can provide path to multiple files by adding new entry to it.
- **DenyList**. Provide path expression describing the files to be excluded.
- **endpoint**. The hostname and port of the Redis instance, separated by a colon. (For example: `localhost:6379`.)
- **Username**. Enter the Redis username.
- **Password Env Name**. Enter the Redis password environment variable name.

The log file path configured to capture redis logs must be given here. The files are typically located in `/var/log/redis/redis-server.log`. If you are using a customized path, check the [`redis.conf`](https://download.redis.io/redis-stable/redis.conf) file for this information.

import OtelLogAdvanceOption from '../../../../reuse/apps/opentelemetry/logs-advance-option-otel.md';

<OtelLogAdvanceOption/>

**Processing Rules**. You can add processing rules for logs collected. To learn more, refer to [Processing Rules](../processing-rules/index.md).

### Step 3: Push the source template to the desired remotely managed collectors

import DataConfiguration from '../../../../reuse/apps/opentelemetry/data-configuration.md';

<DataConfiguration/>
