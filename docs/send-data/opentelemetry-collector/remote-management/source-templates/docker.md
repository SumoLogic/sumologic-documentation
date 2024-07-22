---
id: docker
title: Docker Source Template
sidebar_label: Docker
description: Learn about the Sumo Logic Docker source template for OpenTelemetry.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

<img src={useBaseUrl('img/integrations/containers-orchestration/docker-icon.png')} alt="Thumbnail icon" width="100"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="30"/>

Docker source template creates an OpenTelemetry configuration that can be pushed to a remotely managed OpenTelemetry collector (abbreviated as otelcol). By creating this source template and pushing the config to the appropriate OpenTelemetry agent you can ensure collection of logs and metrics of Docker to Sumo Logic.

## Fields creation in Sumo Logic for Docker

If not already present, the following [Fields](/docs/manage/fields/) are created as part of Source template creation.

- **`sumo.datasource`**. Fixed value of **docker**. 
- **`deployment.environment`**. This is a user-configured field set at the time of collector installation. It identifies the environment where the docker env resides, such as `dev`, `prod`, or `qa`.

## Prerequisites

This section provides instructions for configuring metrics and log collection for the Sumo Logic app for Docker.

#### For metric collection

Metrics are collected through the [Docker Stats Receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/dockerstatsreceiver/README.md) of OpenTelemetry. This requires Docker API version 1.22+ and only Linux is supported.

#### For log collection

To collect the Docker container event logs, the following command needs to be executed on the host machine and needs to be kept running, for monitoring all the Docker container-related events. The following command also needs a JSON file path where these container events can be dumped.

```
docker events -f 'type=container' --format '{{json .}}' > <PATH_TO_JSON> & disown
```
The path to this JSON file will be required in the [next step](#step-2-configure-integration), where events are sent to Sumo Logic through a filelog receiver and seen as part of the **Docker - Overview** dashboard. Also, you can add additional parameters to this command to send events for specific containers. [Learn more](https://docs.docker.com/engine/reference/commandline/events/).

Ensure that the otelcol has adequate permissions to access all log file paths. Execute the following command for the same:
		
```
sudo setfacl -R -m d:u:otelcol-sumo:r-x,u:otelcol-sumo:r-x,g:otelcol-sumo:r-x <PATH_TO_LOG_FILE>
```

import LogsCollectionPrereqisites from '../../../../reuse/apps/logs-collection-prereqisites.md';
		
## Source template configuration
		
You can follow the below steps to set a remotely managed OpenTelemetry collector and push the source template to it.
		
### Step 1: Set up remotely managed OpenTelemetry collector
		
import CollectorInstallation from '../../../../reuse/apps/opentelemetry/collector-installation.md';
		
<CollectorInstallation/>

### Step 2: Configure the source template

In this step, you will configure the yaml required for Docker Collection. Below are the inputs required for configuration:

- **Name**. Name of the source template.
- **Description**. Description for the source template.	
- **Docker Event log location**. Enter the path of the JSON file generated through the command in the prerequisite section.
- **Endpoint**. Address to reach the desired Docker daemon (default: `unix:///var/run/docker.sock`).
- **Excluded Image List**. A list of strings, [regexes](https://golang.org/pkg/regexp/), or [globs](https://github.com/gobwas/glob) whose referent container image names will not be among the queried containers for scrapping metrics. Learn more about [*excluded_images*](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/dockerstatsreceiver/README.md#configuration).
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default sumo tags `_sourceCategory` with the value otel/kafka.

import OtelLogAdvanceOption from '../../../../reuse/apps/opentelemetry/logs-advance-option-otel.md';

<OtelLogAdvanceOption/>

**Processing Rules**. You can add **processing rules** for logs/metrics collected. To learn more, refer to [Processing Rules](../processing-rules/index.md).

### Step 3: Push the source template to the desired remotely managed collectors

import DataConfiguration from '../../../../reuse/apps/opentelemetry/data-configuration.md';

<DataConfiguration/>
