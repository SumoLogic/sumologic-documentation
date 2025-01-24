---
slug: /send-data/opentelemetry-collector/remote-management/source-templates/mysql
title: MySQL Source Template
sidebar_label: MySQL
description: Learn about the Sumo Logic MySQL source template for OpenTelemetry.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head>
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

<img src={useBaseUrl('img/integrations/databases/mysql.png')} alt="Thumbnail icon" width="100"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="30"/>

The MySQL source template creates an OpenTelemetry configuration that can be pushed to a remotely managed OpenTelemetry collector (abbreviated as otelcol). By creating this source template and pushing the config to the appropriate OpenTelemetry agent, you can ensure collection of MySQL logs and metrics to Sumo Logic.

## Fields creation in Sumo Logic for Local File

If not already present, the following [Fields](/docs/manage/fields/) are created as part of source template creation.

- **`sumo.datasource`**. Fixed value of **mysql**.
- **`deployment.environment`**. This is a user-configured field set at the time of collector installation. It identifies the environment where the host resides, such as `dev`, `prod`, or `qa`.
- **`db.cluster.name`**. User configured. Enter a uniquely identifiable name for your mysql cluster to show in the Sumo Logic dashboards.
- **`db.node.name`**. Includes the value of the hostname of the machine which is being monitored.

## Prerequisites

### For metrics collection

The MySQL metrics [receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/mysqlreceiver) collects metrics by querying MySQL's global status and InnoDB tables. This app has been tested with following MySQL versions: 8.0

Make sure to set the password of MySQL user as an environment variable for OpenTelemetry agent. Details steps to set the environment variable for OpenTelemetry collector are available in [this](../../st-with-secrets.md) page

### For logs collection

MySQL logs are stored in log files. Slow query logs must be explicitly enabled to be able to be written to a log file. To configure the MySQL log file(s), locate your local `my.cnf` configuration file in the database directory.
   1. Open `my.cnf` in a text editor.
   2. Set the following parameters in the `[mysqld]` section:
   ```sql
   [mysqld]
       log_error = /var/log/mysql/error.log
       slow_query_log=1
       slow_query_log_file = /var/log/mysql/mysql-slow.log
       long_query_time=2
   ```
     * [Error Logs](https://dev.mysql.com/doc/refman/5.7/en/slow-query-log.html). By default, error logs are enabled and are logged at file specified by the `log_error` key.
     * [Slow Query Logs](https://dev.mysql.com/doc/refman/5.7/en/slow-query-log.html). `slow_query_log=1` enables logging of slow queries to the file specified by `slow_query_log_file`. Setting `long_query_time=2` will cause queries that take more than two seconds to execute to be logged. The default value of `long_query_time` is 10 seconds.
     * [General Query Logs](https://dev.mysql.com/doc/refman/5.7/en/query-log.html). We do not recommend enabling `general_log` for performance reasons. These logs are not used by the Sumo Logic MySQL app.
   3. Save the `my.cnf` file.
   4. Restart the MySQL server:
    ```bash
        sudo mysql.server restart
    ```
Ensure that the otelcol has adequate permissions to access all log file paths. Execute the following command:

```bash
sudo setfacl -R -m d:u:otelcol-sumo:r-x,u:otelcol-sumo:r-x,g:otelcol-sumo:r-x <PATH_TO_LOG_FILE>
```

import LogsCollectionPrereqisites from '../../../../reuse/apps/logs-collection-prereqisites.md';
<LogsCollectionPrereqisites/>

import OtelWindowsLogPrereq from '../../../../../reuse/apps/opentelemetry/log-collection-prerequisite-windows.md';

<OtelWindowsLogPrereq/>

## Configuring the MySQL source template

You can follow the below steps to set a remotely managed OpenTelemetry collector and push the source template to it.

### Step 1: Set up remotely managed OpenTelemetry collector

import CollectorInstallation from '../../../../reuse/apps/opentelemetry/collector-installation.md';

<CollectorInstallation/>

### Step 2: Configure the source template

In this step, you will configure the yaml required for MySQL collection. Below are the inputs required for configuration:

- **Name**. Name of the source template.
- **Description**. Description for the source template.	
- **Error log path**. Location where the SQL Errors are logged. Please refer to your my.cnf file.
- **Slow Transaction log file path (optional)**. Location where the Slow SQL transactions are logged. Please refer to your my.cnf file.
- **Endpoint**. The URL of the MySQL endpoint (default: `localhost:3306`).
- **Username**. Enter the MySQL username.
- **Password Environment Variable Name**. Enter the MySQL password environment variable name.
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default, Sumo Logic tags `_sourceCategory` with the value otel/mysql user needs to provide the value for `db.cluster.name`.

import OtelLogAdvanceOption from '../../../../reuse/apps/opentelemetry/logs-advance-option-otel.md';

<OtelLogAdvanceOption/>

**Processing Rules**. You can add **processing rules** for logs/metrics collected. To learn more, refer to [Processing Rules](../processing-rules/index.md).

### Step 3: Push the source template to the desired remotely managed collectors

import DataConfiguration from '../../../../reuse/apps/opentelemetry/data-configuration.md';

<DataConfiguration/>

:::info
Refer to the [changelog](changelog.md) for information on periodic updates to this source template.
:::