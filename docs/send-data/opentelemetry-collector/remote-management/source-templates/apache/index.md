---
slug: /send-data/opentelemetry-collector/remote-management/source-templates/apache
title: Apache Source Template
sidebar_label: Apache
description: Learn about the Sumo Logic Apache source template for OpenTelemetry.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="30"/><img src={useBaseUrl('img/integrations/web-servers/apache.png')} alt="Thumbnail icon" width="70"/>

Apache source template creates an OpenTelemetry configuration that can be pushed to a remotely managed OpenTelemetry collector (abbreviated as otelcol). By creating this source template and pushing the config to the appropriate OpenTelemetry agent you can ensure collection of logs and metrics of Apache to Sumo Logic.

## Fields creation in Sumo Logic for Apache

If not already present, the following [Fields](/docs/manage/fields/) are created as part of Source template creation.

- **`sumo.datasource`**. Fixed value of **apache**.
- **`webengine.system`**. Fixed value of **apache**.
- **`deployment.environment`**. This is a user-configured field set at the time of collector installation. It identifies the environment where the apache env resides, such as `dev`, `prod`, or `qa`.
- **`webengine.cluster.name`**. User configured. Enter a uniquely identifiable name for your Apache web server cluster to show in the Sumo Logic dashboards.
- **`webengine.node.name`**. Includes the value of the hostname of the machine which is being monitored.

## Prerequisites

### For metrics collection

The receiver gets stats from an Apache Web Server instance using the `server-status?auto` endpoint. This receiver supports Apache Web Server version 2.4+.

Receive server statistics by configuring the server's `httpd.conf` file to [enable status support](https://httpd.apache.org/docs/2.4/mod/mod_status.html).

### For logs collection

Configure the Apache log files:
1. Configure the logging of access logs and error logs via the instructions described in their [documentation](https://httpd.apache.org/docs/2.4/logs.html).
1. Locate your local `httpd.conf` configuration file in the Apache directory. After determining the location of the conf file, modify the `httpd.conf` configuration file logging parameters if required.
   * For access logs, the following directive is to be noted:
      - **CustomLog**. Access log file path and format (standard common and combined).
   * For error logs, the following directives are to be noted:
      - **ErrorLog**. Error log file path.
      - **LogLevel**. To control the number of messages logged to the `error_log`.

Ensure that the otelcol has adequate permissions to access all log file paths. Execute the following command for the same:

```
sudo setfacl -R -m d:u:otelcol-sumo:r-x,u:otelcol-sumo:r-x,g:otelcol-sumo:r-x <PATH_TO_LOG_FILE>
```

import LogsCollectionPrereqisites from '../../../../../reuse/apps/logs-collection-prereqisites.md';

<LogsCollectionPrereqisites/>

import OtelWindowsLogPrereq from '../../../../../reuse/apps/opentelemetry/log-collection-prerequisite-windows.md';

<OtelWindowsLogPrereq/>

## Source template configuration

You can follow the below steps to set a remotely managed OpenTelemetry collector and push the source template to it.

### Step 1: Set up remotely managed OpenTelemetry collector

import CollectorInstallation from '../../../../../reuse/apps/opentelemetry/collector-installation.md';

<CollectorInstallation/>

### Step 2: Configure the source template

In this step, you will configure the yaml required for Apache Collection. Below are the inputs required for configuration:

- **Name**. Name of the source template.
- **Description**. Description for the source template.
- **Endpoint**. The URL of the httpd status endpoint (default: `http://localhost:80/server-status?auto`).
- **Access File log Path**. Enter the path to the Access log file for your Apache instance.
- **Error file log path**. Enter the path to the error log file for your Apache instance.
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default, sumo tags `_sourceCategory` with the value otel/apache user needs to provide the value for `webengine.cluster.name`.

import OtelLogAdvanceOption from '../../../../../reuse/apps/opentelemetry/logs-advance-option-otel.md';

<OtelLogAdvanceOption/>

**Processing Rules**. You can add **processing rules** for logs/metrics collected. To learn more, refer to [Processing Rules](../../processing-rules/index.md).

### Step 3: Push the source template to the desired remotely managed collectors

import DataConfiguration from '../../../../../reuse/apps/opentelemetry/data-configuration.md';

<DataConfiguration/>

:::info
Refer to the [changelog](changelog.md) for information on periodic updates to this source template.
:::
