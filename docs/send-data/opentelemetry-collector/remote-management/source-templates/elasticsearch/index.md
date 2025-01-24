---
slug: /send-data/opentelemetry-collector/remote-management/source-templates/elasticsearch
title: Elasticsearch Source Template
sidebar_label: Elasticsearch
description: Learn about the Sumo Logic Elasticsearch source template for OpenTelemetry.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

<img src={useBaseUrl('img/integrations/databases/elasticsearch.png')} alt="Thumbnail icon" width="100"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="30"/>

The Elasticsearch source template creates an OpenTelemetry configuration that can be pushed to a remotely managed OpenTelemetry collector (abbreviated as otelcol). By creating this source template and pushing the config to the appropriate OpenTelemetry agent, you can ensure collection of Elasticsearch logs and metrics to Sumo Logic.

## Fields creation in Sumo Logic for Local File

If not already present, the following [Fields](/docs/manage/fields/) are created as part of source template creation.

- **`sumo.datasource`**. Fixed value of **elasticsearch**.
- **`deployment.environment`**. This is a user-configured field set at the time of collector installation. It identifies the environment where the host resides, such as `dev`, `prod`, or `qa`.
- **`db.cluster.name`**. User configured. Enter a uniquely identifiable name for your elasticsearch cluster to show in the Sumo Logic dashboards.
- **`db.node.name`**. Includes the value of the hostname of the machine which is being monitored.

## Prerequisites

### For metrics collection

The Elasticsearch metrics [receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/elasticsearchreceiver) queries the Elasticsearch [node stats](https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-nodes-stats.html), [cluster health](https://www.elastic.co/guide/en/elasticsearch/reference/current/cluster-health.html) and [index stats](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-stats.html) endpoints in order to scrape metrics from a running Elasticsearch cluster.

This receiver supports Elasticsearch versions 7.9+

Make sure to set the password of PostgreSQL user as an environment variable for OpenTelemetry agent. Details steps to set the environment variable for OpenTelemetry collector are available in [this](../../st-with-secrets.md) page

### For logs collection

Elasticsearch supports logging via local text log files. Elasticsearch logs have four levels of verbosity. To select a level, set `loglevel` to one of:

* **debug**. A lot of information, useful for development/testing.
* **verbose**. Includes information not often needed, but logs less than debug.
* **notice** (default value). Moderately verbose, ideal for production environments.
* **warning**. Only important/critical messages are logged.

All logging settings are located in [Elasticsearch.conf](https://www.elastic.co/guide/en/elasticsearch/reference/current/logging.html). By default, Elasticsearch logs are stored in `/var/log/elasticsearch/ELK-<Clustername>.log`. The default directory for log files is listed in the Elasticsearch.conf file.

Ensure that the otelcol has adequate permissions to access all log file paths. Execute the following command:

```bash
sudo setfacl -R -m d:u:otelcol-sumo:r-x,u:otelcol-sumo:r-x,g:otelcol-sumo:r-x <PATH_TO_LOG_FILE>
```

import LogsCollectionPrereqisites from '../../../../reuse/apps/logs-collection-prereqisites.md';
<LogsCollectionPrereqisites/>

import OtelWindowsLogPrereq from '../../../../../reuse/apps/opentelemetry/log-collection-prerequisite-windows.md';

<OtelWindowsLogPrereq/>

## Configuring the Elasticsearch source template

You can follow the below steps to set a remotely managed OpenTelemetry collector and push the source template to it.

### Step 1: Set up remotely managed OpenTelemetry collector

import CollectorInstallation from '../../../../reuse/apps/opentelemetry/collector-installation.md';

<CollectorInstallation/>

### Step 2: Configure the source template

In this step, you will configure the yaml required for Elasticsearch collection. Below are the inputs required for configuration:

- **Name**. Name of the source template.
- **Description**. Description for the source template.	
- **Log Filepath**. Location where the Elasticsearch logs are logged. Please refer to your elasticsearch.conf file.
- **Endpoint**. Enter the url of the server you need to monitor. (default: `localhost:9200`).
- **Username**. Enter the Elasticsearch username.
- **Password Environment Variable Name**. Enter the Elasticsearch password environment variable name.
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default, Sumo Logic tags `_sourceCategory` with the value otel/elasticsearch user needs to provide the value for `db.cluster.name`.

import OtelLogAdvanceOption from '../../../../reuse/apps/opentelemetry/logs-advance-option-otel.md';

<OtelLogAdvanceOption/>

**Processing Rules**. You can add **processing rules** for logs/metrics collected. To learn more, refer to [Processing Rules](../processing-rules/index.md).

### Step 3: Push the source template to the desired remotely managed collectors

import DataConfiguration from '../../../../reuse/apps/opentelemetry/data-configuration.md';

<DataConfiguration/>

:::info
Refer to the [changelog](changelog.md) for information on periodic updates to this source template.
:::