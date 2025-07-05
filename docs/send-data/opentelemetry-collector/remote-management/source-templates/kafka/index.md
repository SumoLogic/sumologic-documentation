---
slug: /send-data/opentelemetry-collector/remote-management/source-templates/kafka
title: Kafka Source Template
sidebar_label: Kafka
description: Learn about the Sumo Logic Kafka source template for OpenTelemetry.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="30"/><img src={useBaseUrl('img/integrations/containers-orchestration/kafka.png')} alt="icon" width="65"/>

The Kafka source template generates an OpenTelemetry configuration that can be sent to a remotely managed OpenTelemetry collector (otelcol). By creating this source template and pushing the configuration to the appropriate OpenTelemetry agent, you can ensure the collection of Kafka logs and metrics in Sumo Logic.

## Fields created by the source template

When you create a source template, the following [fields](/docs/manage/fields/) are automatically added (if they don’t already exist):

- **`sumo.datasource`**. Fixed value of **kafka**.
- **`messaging.system`**. Fixed value of **kafka**.
- **`deployment.environment`**. This is a user-configured field set at the time of collector installation. It identifies the environment where the Kafka env resides, such as `dev`, `prod`, or `qa`.
- **`messaging.cluster.name`**. User configured. Enter a name to uniquely identify your Kafka cluster. This cluster name will be shown in the Sumo Logic dashboards.
- **`messaging.node.name`**. Includes the value of the hostname of the machine which is being monitored.

## Prerequisites

### For metrics collection

The Kafka metrics [receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/kafkametricsreceiver) collects Kafka metrics (brokers, topics, partitions, and consumer groups) from the Kafka server. This app has been tested with following Kafka versions: 2.x and 3.x.

### For logs collection

In this section, you'll configure logging in Kafka. By default, Kafka logs (`server.log` and `controller.log`) are stored in the directory called `/opt/Kafka/kafka_<VERSION>/logs`. Make a note of this logs directory.

Ensure that the otelcol has adequate permissions to access all log file paths. Execute the following command:

```
sudo setfacl -R -m d:u:otelcol-sumo:r-x,u:otelcol-sumo:r-x,g:otelcol-sumo:r-x <PATH_TO_LOG_FILE>
```

import LogsCollectionPrereqisites from '../../../../../reuse/apps/logs-collection-prereqisites.md';

<LogsCollectionPrereqisites/>

import OtelWindowsLogPrereq from '../../../../../reuse/apps/opentelemetry/log-collection-prerequisite-windows.md';

<OtelWindowsLogPrereq/>

## Configuring the Kafka source template

Follow these steps to set up and deploy the source template to a remotely managed OpenTelemetry collector.

### Step 1: Set up remotely managed OpenTelemetry collector

import CollectorInstallation from '../../../../../reuse/apps/opentelemetry/collector-installation.md';

<CollectorInstallation/>

### Step 2: Configure the source template

In this step, you will configure the yaml required for Kafka collection. Below are the inputs required for configuration:

- **Name**. Name of the source template.
- **Description**. Description for the source template.
- **Server file log path**. Enter the path to the server log file for your Kafka instance.
- **Controller file log path**. Enter the path to the controller log file for your Kafka instance.
- **Endpoint**. The URL of the broker endpoint (default: `localhost:9092`).
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default, Sumo Logic tags `_sourceCategory` with the value otel/kafka user needs to provide the value for `webengine.cluster.name`.

**Timestamp Parsing**. You can do timestamp parsing for log ingested using this source template. For more details, refer to [Timestamps, Time Zones and Date Formats](/docs/send-data/opentelemetry-collector/remote-management/source-templates/otrmTimestampParsing.md) for OpenTelemetry collector.


**Processing Rules**. You can add **processing rules** for logs/metrics collected. To learn more, refer to [Processing Rules](../../processing-rules/index.md).

### Step 3: Push the source template to the desired remotely managed collectors

import DataConfiguration from '../../../../../reuse/apps/opentelemetry/data-configuration.md';

<DataConfiguration/>

:::info
Refer to the [changelog](changelog.md) for information on periodic updates to this source template.
:::
