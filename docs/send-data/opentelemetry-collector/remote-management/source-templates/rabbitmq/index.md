---
slug: /send-data/opentelemetry-collector/remote-management/source-templates/rabbitmq
title: RabbitMQ Source Template
sidebar_label: RabbitMQ
description: Learn about the Sumo Logic RabbitMQ source template for OpenTelemetry.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="30"/><img src={useBaseUrl('/img/integrations/containers-orchestration/rabbitmq.png')} alt="Thumbnail icon" width="30"/>

The RabbitMQ source template creates an OpenTelemetry configuration that can be pushed to a remotely managed OpenTelemetry collector (abbreviated as otelcol). By creating this source template and pushing the config to the appropriate OpenTelemetry agent, you can collect your RabbitMQ logs and metrics to Sumo Logic.

## Fields created by the source template

When you create a source template, the following [fields](/docs/manage/fields/) are automatically added (if they don’t already exist):

- **`sumo.datasource`**. Fixed value of **rabbitmq**.
- **`deployment.environment`**. This is a user-configured field set at the time of collector installation. It identifies the environment where the host resides, such as `dev`, `prod`, or `qa`.
- **`messaging.cluster.name`**. User configured. Enter a uniquely identifiable name for your RabbitMQ server cluster to show in the Sumo Logic dashboards.
- **`messaging.node.name`**. Includes the value of the hostname of the machine which is being monitored.

## Prerequisites

### For metrics collection

- Metrics collection is supported for RabbitMQ versions `3.8` and `3.9`.
- Metrics for RabbitMQ are collected through OpenTelemetry [RabbitMQ receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/rabbitmqreceiver).
- The RabbitMQ Management Plugin must be enabled by following the [official instructions](https://www.rabbitmq.com/management.html#getting-started).
- A user with at least [monitoring](https://www.rabbitmq.com/management.html#permissions) level permissions must be used for monitoring.
- Make sure to set the RabbitMQ user's password as an environment variable for OpenTelemetry agent. Refer to the [Setting Environment Variables with Secret Values for Source Templates](../st-with-secrets.md).

### For logs collection
import LogsCollectionPrereqisites from '../../../../../reuse/apps/logs-collection-prereqisites.md';

<LogsCollectionPrereqisites/>

import OtelWindowsLogPrereq from '../../../../../reuse/apps/opentelemetry/log-collection-prerequisite-windows.md';

<OtelWindowsLogPrereq/>

## Configuring the RabbitMQ source template

Follow the below steps to set a remotely managed OpenTelemetry collector and push the source template to it.

### Step 1: Set up remotely managed OpenTelemetry collector

import CollectorInstallation from '../../../../../reuse/apps/opentelemetry/collector-installation.md';

<CollectorInstallation/>

### Step 2: Configure the source template

In this step, you will configure the yaml required for Local File Collection. Below are the inputs required for configuration:

- **Name**. Name of the source template.
- **Description**. Description for the source template.
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default, sumo tags `_sourceCategory` with the value otel/rabbitmq.
- **File Path**. Provide the file which needs to be read by OpenTelemetry agent. You can provide path to multiple files by adding new entry to it.
- **DenyList**. Provide path expression describing the files to be excluded.
- **Endpoint**. (Default: `http://localhost:15672`.) The URL of the node to be monitored.
:::note
  The **Endpoint** value should have `http` at the beginning. For example, `http://localhost:port`. 
:::
- **Username**. Required. Enter the RabbitMQ username.
- **Password Environment Variable Name**. Required. Enter the RabbitMQ password environment variable name.

**Timestamp Parsing**. You can do timestamp parsing for log ingested using this source template. For more details, refer to [Timestamps, Time Zones and Date Formats](/docs/send-data/opentelemetry-collector/remote-management/source-templates/otrmTimestampParsing.md) for OpenTelemetry collector.

**Processing Rules**. You can add processing rules for logs collected. To learn more, refer to [Processing Rules](../../processing-rules/index.md).

### Step 3: Push the source template to the desired remotely managed collectors

import DataConfiguration from '../../../../../reuse/apps/opentelemetry/data-configuration.md';

<DataConfiguration/>

:::info
Refer to the [changelog](changelog.md) for information on periodic updates to this source template.
:::
