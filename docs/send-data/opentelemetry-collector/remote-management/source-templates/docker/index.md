---
slug: /send-data/opentelemetry-collector/remote-management/source-templates/docker
title: Docker Source Template
sidebar_label: Docker
description: Learn about the Sumo Logic Docker source template for OpenTelemetry.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="30"/><img src={useBaseUrl('img/integrations/containers-orchestration/docker.png')} alt="Thumbnail icon" width="90"/>

The Docker source template creates an OpenTelemetry configuration that can be pushed to a remotely managed OpenTelemetry collector (abbreviated as otelcol). By creating this source template and pushing the config to the appropriate OpenTelemetry agent, you can collect Docker logs and metrics to Sumo Logic.

## Fields created by the source template

When you create a source template, the following [fields](/docs/manage/fields/) are automatically added (if they don’t already exist):

- **`sumo.datasource`**. Fixed value of **docker**.
- **`deployment.environment`**. This is a user-configured field set at the time of collector installation. It identifies the environment where the docker env resides, such as `dev`, `prod`, or `qa`.

## Prerequisites

This section provides instructions for configuring metrics and log collection for the Sumo Logic Docker app.

### For metrics collection

Metrics are collected through the [Docker Stats Receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/dockerstatsreceiver/README.md) of OpenTelemetry. This requires Docker API version 1.22+ and only Linux is supported.

After installing Sumo OpenTelemetry collector to docker host machine, you need to make sure that `otelcol-sumo` user (created during Sumo OpenTelemetry collector installation) has permission to access docker.sock before pushing Docker ST to the collector. The command for this may vary depending on the linux OS which is being used. Here are commands which can help do that:

- You can grant read and write access to the user otelcol-sumo for the docker.sock file using the command:
   ```
   sudo setfacl -m user:otelcol-sumo:rw /var/run/docker.sock
   ```
- If docker.sock has docker group as the owner you can add otelcol-sumo user to this docker group using command:
   ```
   sudo usermod -aG docker otelcol-sumo
   ```

### For logs collection

To collect Docker container event logs, execute the following command on the host machine and keep it running to monitor all Docker container-related events. The command requires a JSON file path where these container events will be stored.

```
docker events -f 'type=container' --format '{{json .}}' > <PATH_TO_JSON> & disown
```
The path to this JSON file will be required in the next step, where events are sent to Sumo Logic through a filelog receiver and seen as part of the **Docker - Overview** dashboard. Also, you can add additional parameters to this command to send events for specific containers. [Learn more](https://docs.docker.com/engine/reference/commandline/events/).

Ensure that the otelcol has adequate permissions to access all log file paths. Execute the following command for the same:

```
sudo setfacl -R -m d:u:otelcol-sumo:r-x,u:otelcol-sumo:r-x,g:otelcol-sumo:r-x <PATH_TO_LOG_FILE>
```

import LogsCollectionPrereqisites from '../../../../../reuse/apps/logs-collection-prereqisites.md';

## Configuring the Docker source template

Follow these steps to set up and deploy the source template to a remotely managed OpenTelemetry collector.

### Step 1: Set up remotely managed OpenTelemetry collector

import CollectorInstallation from '../../../../../reuse/apps/opentelemetry/collector-installation.md';

<CollectorInstallation/>

### Step 2: Configure the source template

In this step, you will configure the yaml required for Docker Collection. Below are the inputs required for configuration:

- **Name**. Name of the source template.
- **Description**. Description for the source template.
- **Docker Event log location**. Enter the path of the JSON file generated through the command in the prerequisite section.
- **Endpoint**. Address to reach the desired Docker daemon (default: `unix:///var/run/docker.sock`).
- **Excluded Image List**. A list of strings, [regexes](https://golang.org/pkg/regexp/), or [globs](https://github.com/gobwas/glob) whose referent container image names will not be among the queried containers for scrapping metrics. Learn more about [*excluded_images*](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/dockerstatsreceiver/README.md#configuration).
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default, Sumo Logic tags `_sourceCategory` with the value otel/docker.

**Timestamp Parsing**. You can do timestamp parsing for log ingested using this source template. For more details, refer to [Timestamps, Time Zones and Date Formats](/docs/send-data/opentelemetry-collector/remote-management/source-templates/otrmTimestampParsing.md) for OpenTelemetry collector.

**Processing Rules**. You can add **processing rules** for logs/metrics collected. To learn more, refer to [Processing Rules](../../processing-rules/index.md).

### Step 3: Push the source template to the desired remotely managed collectors

import DataConfiguration from '../../../../../reuse/apps/opentelemetry/data-configuration.md';

<DataConfiguration/>

:::info
Refer to the [changelog](changelog.md) for information on periodic updates to this source template.
:::
