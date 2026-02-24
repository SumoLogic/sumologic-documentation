---
slug: /send-data/opentelemetry-collector/remote-management/source-templates/redis
title: Redis Source Template
sidebar_label: Redis
description: Learn about the Sumo Logic Redis source template for OpenTelemetry.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="30"/><img src={useBaseUrl('/img/integrations/databases/redis.png')} alt="Thumbnail icon" width="30"/>

The Redis source template creates an OpenTelemetry configuration that can be pushed to a remotely managed OpenTelemetry collector (abbreviated as otelcol). By creating this source template and pushing the config to the appropriate OpenTelemetry agent, you can collect your redis logs and metrics to Sumo Logic.

## Fields created by the source template

When you create a source template, the following [fields](/docs/manage/fields/) are automatically added (if they don’t already exist):

- **`sumo.datasource`**. Fixed value of **redis**.
- **`deployment.environment`**. This is a user-configured field set at the time of collector installation. It identifies the environment where the host resides, such as `dev`, `prod`, or `qa`.
- **`db.cluster.name`**. User configured. Enter a uniquely identifiable name for your redis server cluster to show in the Sumo Logic dashboards.
- **`db.node.name`**. Includes the value of the hostname of the machine which is being monitored.

## Prerequisites

### For metrics collection
- Metrics for Redis are collected through OpenTelemetry [Redis receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/redisreceiver).
- Receiver uses the [INFO command](https://redis.io/docs/latest/commands/info/) to get Redis statistics.
- Make sure to set the Redis user's password as an environment variable for the OpenTelemetry agent. Refer to [Setting Environment Variables with Secret Values for Source Templates](../st-with-secrets.md). 

### For logs collection
import LogsCollectionPrereqisites from '../../../../../reuse/apps/logs-collection-prereqisites.md';

<LogsCollectionPrereqisites/>

## Configuring the Redis source template

Follow the below steps to set a remotely managed OpenTelemetry collector and push the source template to it.

### Step 1: Set up remotely managed OpenTelemetry collector

import CollectorInstallation from '../../../../../reuse/apps/opentelemetry/collector-installation.md';

<CollectorInstallation/>

### Step 2: Configure the source template

import RedisConfigureSourceTemplate from '../../../../../reuse/send-data/redis-configure-source-template.md';

<RedisConfigureSourceTemplate/>

import TimestampParsing from '../../../../../reuse/apps/opentelemetry/timestamp-parsing.md';

<TimestampParsing/>

**Processing Rules**. You can add processing rules for logs collected. To learn more, refer to [Processing Rules](../../processing-rules/index.md).

### Step 3: Push the source template to the desired remotely managed collectors

import DataConfiguration from '../../../../../reuse/apps/opentelemetry/data-configuration.md';

<DataConfiguration/>

:::info
Refer to the [changelog](changelog.md) for information on periodic updates to this source template.
:::
