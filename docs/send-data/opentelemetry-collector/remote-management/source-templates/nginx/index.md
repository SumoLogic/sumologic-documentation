---
slug: /send-data/opentelemetry-collector/remote-management/source-templates/nginx
title: Nginx Source Template
sidebar_label: Nginx
description: Learn about the Sumo Logic Nginx source template for OpenTelemetry.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="30"/><img src={useBaseUrl('img/integrations/web-servers/nginx.png')} alt="Thumbnail icon" width="90"/>

The Nginx source template generates an OpenTelemetry configuration that can be sent to a remotely managed OpenTelemetry collector (otelcol). By creating this source template and pushing the configuration to the appropriate OpenTelemetry agent, you can ensure the collection of Nginx logs and metrics in Sumo Logic.

## Fields created by the source template

When you create a source template, the following [fields](/docs/manage/fields/) are automatically added (if they don’t already exist):

- **`sumo.datasource`**. Fixed value of **nginx**.
- **`webengine.system`**. Fixed value of **nginx**.
- **`deployment.environment`**. This is a user-configured field set at the time of collector installation. It identifies the environment where the nginx env resides, such as `dev`, `prod`, or `qa`.
- **`webengine.cluster.name`**. User configured. Enter a uniquely identifiable name for your nginx web server cluster to show in the Sumo Logic dashboards.
- **`webengine.node.name`**. Includes the value of the hostname of the machine which is being monitored.

## Prerequisites

### For metrics collection

The receiver gets stats from an nginx Web Server instance using the `/status` endpoint. This receiver supports Nginx Web Server version 1.26.1+.

Receive server statistics, by configuring the server's `nginx.conf` file to [enable status support](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/nginxreceiver#configuration).

### For logs collection

Configure the Nginx access and error log files:
1. Configure the logging of access logs and error logs by following the instructions in their [documentation](https://docs.nginx.com/nginx/admin-guide/monitoring/logging/).
1. Locate your local `nginx.conf` configuration file in the Nginx directory. After determining the location of the conf file, modify the `nginx.conf` configuration file logging parameters if required.
   * For access logs, the following directive is to be noted:
      - **Setting Up the Access Log**. Access log file path and format (standard common and combined).
   * For error logs, the following directives are to be noted:
      - **Setting Up the Error Log**. Error log file path.

Ensure that the otelcol has adequate permissions to access all log file paths. Execute the following command for the same:

```
sudo setfacl -R -m d:u:otelcol-sumo:r-x,u:otelcol-sumo:r-x,g:otelcol-sumo:r-x <PATH_TO_LOG_FILE>
```

import LogsCollectionPrereqisites from '../../../../../reuse/apps/logs-collection-prereqisites.md';

<LogsCollectionPrereqisites/>

import OtelWindowsLogPrereq from '../../../../../reuse/apps/opentelemetry/log-collection-prerequisite-windows.md';

<OtelWindowsLogPrereq/>

## Configuring the Nginx source template

Follow these steps to set up and deploy the source template to a remotely managed OpenTelemetry collector.

### Step 1: Set up remotely managed OpenTelemetry collector

import CollectorInstallation from '../../../../../reuse/apps/opentelemetry/collector-installation.md';

<CollectorInstallation/>

### Step 2: Configure the source template

In this step, you will configure the yaml required for Nginx collection. Below are the inputs required for configuration:

- **Name**. Name of the source template.
- **Description**. Description for the source template.
- **Endpoint**. The URL of the httpd status endpoint (default: `http://localhost:80/status`).
- **Path to Nginx access Log file**. Enter the path to the Access log file for your Nginx instance.
- **Path to Nginx error Log file**. Enter the path to the error log file for your Nginx instance.
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default sumo tags `_sourceCategory` with the value otel/nginx user needs to provide the value for `webengine.cluster.name`.

import OtelLogAdvanceOption from '../../../../../reuse/apps/opentelemetry/logs-advance-option-otel.md';

<OtelLogAdvanceOption/>

**Processing Rules**. You can add **processing rules** for logs/metrics collected. To learn more, refer to [Processing Rules](../../processing-rules/index.md).

### Step 3: Push the source template to the desired remotely managed collectors

import DataConfiguration from '../../../../../reuse/apps/opentelemetry/data-configuration.md';

<DataConfiguration/>

:::info
Refer to the [changelog](changelog.md) for information on periodic updates to this source template.
:::
