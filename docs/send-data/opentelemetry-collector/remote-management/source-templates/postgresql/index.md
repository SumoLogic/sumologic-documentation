---
slug: /send-data/opentelemetry-collector/remote-management/source-templates/postgresql
title: PostgreSQL Source Template
sidebar_label: PostgreSQL
description: Learn about the Sumo Logic PostgreSQL source template for OpenTelemetry.
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<head> 
  <meta name="robots" content="noindex" />
</head>

<p><a href="/docs/beta"><span className="beta">Beta</span></a></p>

<img src={useBaseUrl('img/integrations/databases/postgresql.png')} alt="Thumbnail icon" width="100"/> <img src={useBaseUrl('img/send-data/otel-color.svg')} alt="Thumbnail icon" width="30"/>

The PostgreSQL source template creates an OpenTelemetry configuration that can be pushed to a remotely managed OpenTelemetry collector (abbreviated as otelcol). By creating this source template and pushing the config to the appropriate OpenTelemetry agent, you can ensure collection of PostgreSQL logs and metrics to Sumo Logic.

## Fields creation in Sumo Logic for PostgreSQL

If not already present, the following [Fields](/docs/manage/fields/) are created as part of source template creation.

- **`sumo.datasource`**. Fixed value of **postgresql**.
- **`deployment.environment`**. This is a user-configured field set at the time of collector installation. It identifies the environment where the host resides, such as `dev`, `prod`, or `qa`.
- **`db.cluster.name`**. User configured. Enter a uniquely identifiable name for your PostgreSQL cluster to show in the Sumo Logic dashboards.
- **`db.node.name`**. Includes the value of the hostname of the machine which is being monitored.

## Prerequisites

### For metrics collection

The PostgreSQL metrics [receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/postgresqlreceiver) collects metrics by querying the PostgreSQL [statistics collector](https://www.postgresql.org/docs/13/monitoring-stats.html).

The monitoring user which is used in the source template must be granted permission to SELECT permission for [pg_stat_database](https://www.postgresql.org/docs/current/monitoring-stats.html#MONITORING-PG-STAT-DATABASE-VIEW).

:::note
For SumoLogic OpenTelemetry collector version below 0.116 metric collection will work only for PostgreSQL version 16 and below. With Sumo Logic OpenTelemetry collector version 0.116 and above metric collection will work for PostgreSQL version 17 as well.
:::

### For logs collection

Configure logging in PostgreSQL:

1. Locate your local PostgreSQL postgresql.conf configuration file in the database data_directory. For more information, see the [PostgreSQL File Locations documentation](https://www.postgresql.org/docs/9.1/static/runtime-config-file-locations.html). By default it's located in `/var/lib/pgsql/<version>/data/postgresql.conf`. You can run SHOW config_file command inside your server's psql shell to get the location. After determining the location of conf file, modify the PostgreSQL postgresql.conf configuration file logging parameters
2. Connect to the database server (using SSH) in a terminal window.
3. Open `postgresql.conf` configuration file.
4. Under the ERROR REPORTING AND LOGGING section of the file, use the following config parameters. For more information on the following parameters, [click here](https://www.postgresql.org/docs/12/static/runtime-config-logging.html).
  ```sql
    log_destination = 'stderr'
    logging_collector = on
    log_filename = 'postgresql-%Y-%m-%d_%H%M%S.log'
    log_truncate_on_rotation = off
    log_rotation_age = 1d
    log_min_duration_statement = 250
    log_connections = on
    log_duration = on
    log_hostname = on
    log_timezone = 'UTC'
    log_min_messages = 'WARNING'
    log_line_prefix = '%m [%p] %q%u@%d '
  ```
5.  Save the `postgresql.conf` file and restart the postgresql server:   
  ```sh
  sudo service postgresql restart
  ```
Ensure that the otelcol has adequate permissions to access all log file paths. Execute the following command:

```bash
sudo setfacl -R -m d:u:otelcol-sumo:r-x,u:otelcol-sumo:r-x,g:otelcol-sumo:r-x <PATH_TO_LOG_FILE>
```

import LogsCollectionPrereqisites from '../../../../../reuse/apps/logs-collection-prereqisites.md';

## Source template configuration

You can follow the below steps to set a remotely managed OpenTelemetry collector and push the source template to it.

### Step 1: Set up remotely managed OpenTelemetry collector

import CollectorInstallation from '../../../../../reuse/apps/opentelemetry/collector-installation.md';

<CollectorInstallation/>

### Step 2: Configure the source template

In this step, you will configure the yaml required for PostgreSQL collection. Below are the inputs required for configuration:

- **Name**. Name of the source template.
- **Description**. Description for the source template.
- **Error Log Path**. Enter the path of the error log file for your PostgreSQL instance.
- **Endpoint**. Enter the url of the server which needs to be monitored. Default endpoint is `localhost:5432`.
- **UserName**. Enter the PostgreSQL username.
- **Password Environment Variable Name**. Enter the PostgreSQL password environment variable name.
- **Fields/Metadata**. You can provide any customer fields to be tagged with the data collected. By default, Sumo Logic tags `_sourceCategory` with the value otel/postgresql user needs to provide the value for `db.cluster.name`.

import OtelLogAdvanceOption from '../../../../../reuse/apps/opentelemetry/logs-advance-option-otel.md';

<OtelLogAdvanceOption/>

**Processing Rules**. You can add **processing rules** for logs/metrics collected. To learn more, refer to [Processing Rules](../../processing-rules/index.md).

### Step 3: Push the source template to the desired remotely managed collectors

import DataConfiguration from '../../../../../reuse/apps/opentelemetry/data-configuration.md';

<DataConfiguration/>
