---
id: rabbitmq
title: RabbitMQ Source Template
sidebar_label: RabbitMQ
description: Learn about the Sumo Logic RabbitMQ source template for OpenTelemetry.
---

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('/img/integrations/containers-orchestration/rabbitmq.png')} alt="Thumbnail icon" width="100"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="30"/>

The RabbitMQ source template creates an OpenTelemetry configuration that can be pushed to a remotely managed OpenTelemetry collector (abbreviated as otelcol). By creating this source template and pushing the config to the appropriate OpenTelemetry agent, you can ensure collection of your RabbitMQ logs and metrics to Sumo Logic.
		
## Fields creation in Sumo Logic for Local File

If not already present, the following [Fields](/docs/manage/fields/) are created as part of source template creation.

- **`sumo.datasource`**. Fixed value of **localfile**.
- **`deployment.environment`**. This is a user-configured field set at the time of collector installation. It identifies the environment where the host resides, such as `dev`, `prod`, or `qa`.
- **`messaging.cluster.name`**. User configured. Enter a uniquely identifiable name for your RabbitMQ server cluster to show in the Sumo Logic dashboards.
- **`messaging.node.name`**. Includes the value of the hostname of the machine which is being monitored.
		
## Prerequisites

### For metrics collection

The RabbitMQ [receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/rabbitmqreceiver) fetches stats from a RabbitMQ node using the [RabbitMQ Management Plugin](https://www.rabbitmq.com/management.html). The RabbitMQ Management Plugin must be enabled by following the [official instructions](https://www.rabbitmq.com/management.html#getting-started).

This receiver supports RabbitMQ versions `3.8` and `3.9`
		
### For logs collection

By default, RabbitMQ logs are stored in a log file.

Follow the instructions to set up log collection:

1. **Configure logging in RabbitMQ**. RabbitMQ supports logging via the following methods: local text log files, syslog and stdout. RabbitMQ logs have six levels of verbosity: debug, info, warning, error, critical, none. For details please visit this [page](https://www.rabbitmq.com/logging.html#log-levels). For the dashboards to work properly, must set log level = debug. Default, log level is info. All logging settings are located in [RabbitMQ.conf](https://www.rabbitmq.com/logging.html).
2. **Configure RabbitMQ log to a Local file**. By default, RabbitMQ logs are stored in `/var/log/rabbitmq/rabbit@<hostname>.log`. The default directory for log files is listed in the RabbitMQ.conf file.
To configure the log output destination to a log file, use one of the following settings, either in the[ configuration file](https://www.rabbitmq.com/logging.html).

Edit or create file config: /etc/rabbitmq/rabbitmq.conf following below:
```sql
log.dir = /var/log/rabbitmq
log.file = rabbitmq.log
log.file.level = debug
```

import LogsCollectionPrereqisites from '../../../../reuse/apps/logs-collection-prereqisites.md';

<LogsCollectionPrereqisites/>

import OtelWindowsLogPrereq from '../../../../reuse/apps/opentelemetry/log-collection-prerequisite-windows.md';

<OtelWindowsLogPrereq/>
		
## Source template configuration
		
Follow the below steps to set a remotely managed OpenTelemetry collector and push the source template to it.
		
### Step 1: Set up remotely managed OpenTelemetry collector
		
import CollectorInstallation from '../../../../reuse/apps/opentelemetry/collector-installation.md';
		
<CollectorInstallation/>
		
### Step 2: Configure the source template
		
In this step, you will configure the yaml required for Local File Collection. Below are the inputs required for configuration :
		
- **Name**. Name of the source template.
- **Description**. Description for the source template.
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default, sumo tags `_sourceCategory` with the value otel/rabbitmq.
- **File Path**. Provide the file which needs to be read by OpenTelemetry agent. You can provide path to multiple files by adding new entry to it.
- **DenyList**. Provide path expression describing the files to be excluded.

import OtelLogAdvanceOption from '../../../../reuse/apps/opentelemetry/logs-advance-option-otel.md';

<OtelLogAdvanceOption/>

**Processing Rules**. You can add processing rules for logs collected. To learn more, refer to [Processing Rules](../processing-rules/index.md).

### Step 3: Push the source template to the desired remotely managed collectors

import DataConfiguration from '../../../../reuse/apps/opentelemetry/data-configuration.md';

<DataConfiguration/>
