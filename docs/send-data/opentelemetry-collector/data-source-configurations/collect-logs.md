---
id: collect-logs
title: Collect Logs
sidebar_label: Collect Logs
description: Learn how to collect logs using the Sumo Logic OpenTelemetry Collector.
---

The Sumo Logic Distribution for OpenTelemetry Collector provides various receivers for log collection. This document describes the most common scenarios.

* [Collecting logs from local files](#collecting-logs-from-local-files)
  * [Parsing JSON logs](#parsing-json-logs)
* [Collecting logs from Windows Event Log](#collecting-logs-from-windows-event-log)
  * [Collecting Application, Security and System channels](#collecting-application-security-and-system-channels)
  * [Collect from Custom channels (PowerShell, Sysmon)](#collect-from-custom-channels-powershell-sysmon)
* [Collecting logs from Syslog](#collecting-logs-from-syslog)
  * [Parsing Syslog logs into structured logs](#parsing-syslog-logs-into-structured-logs)
  * [Collecting Syslog logs in format compatible with Sumo Logic Installed Collector](#collecting-syslog-logs-in-format-compatible-with-sumo-logic-installed-collector)
* [Collecting logs from SQL databases](#collecting-logs-from-sql-databases)
  * [Collecting logs from a MySQL database](#collecting-logs-from-a-mysql-database)
  * [Collecting logs from an Oracle database](#collecting-logs-from-an-oracle-database)
  * [Collecting logs from a PostgreSQL database](#collecting-logs-from-a-postgresql-database)
  * [Collecting logs from Microsoft SQL database](#collecting-logs-from-an-mssql-database)
  * [Troubleshooting the SQL Query receiver](#troubleshooting-the-sql-query-receiver)
* [Collecting logs from other sources](#collecting-logs-from-other-sources)

You can find the full list of receivers on our [Sumo Logic OpenTelemetry Collector page][collector_components_docs].

:::tip Additional information
See [Additional Configurations Reference](/docs/send-data/opentelemetry-collector/data-source-configurations/additional-configurations-reference/) for more details about configuring the Sumo Logic OpenTelemetry Collector.
:::

## Collecting logs from local files

Following configuration demonstrates:

* **Collect**: How to collect logs stored in `/var/log/syslog` and `/var/log/audit/audit.log`.
* **Transform**: Set `_sourceCategory` field to `application_logs_prod`
* **Export**: Send data to authenticated Sumo Logic organization.

   ```yaml
   receivers:
     filelog/custom_files:
       include:
         - /var/log/syslog
         - /var/log/audit/audit.log
       include_file_name: false
       include_file_path_resolved: true
       storage: file_storage

   processors:
     groupbyattrs/custom_files:
       keys:
         - log.file.path_resolved
     resource/custom_files:
       attributes:
         - key: _sourceCategory
           value: application_logs_prod
           action: insert
         - key: sumo.datasource
           value: linux
           action: insert
     sumologic_schema/custom_files:

   service:
     pipelines:
       logs/custom_files:
         receivers:
           - filelog/custom_files
         processors:
           - memory_limiter
           - groupbyattrs/custom_files
           - resource/custom_files
           - resourcedetection/system
           - sumologic_schema/custom_files
           - batch
         exporters:
           - sumologic
   ```
1. Create a file in folder `/etc/otelcol-sumo/conf.d` with name for your choice, perhaps matching the pipeline name, `custom_files.yaml`. Its name has to end with `.yaml`.
1. Paste the above content.
1. Restart collector with following command:
   ```bash title="Linux"
   systemctl restart otelcol-sumo
   ```
   ```bash title="Windows"
   Restart-Service -Name OtelcolSumo
   ```


Configuration details:

* **receivers**:
  * `filelog/custom_files:` Unique name defined for the filelog receiver. You can add multiple filelog receivers as `filelog/2`, `filelog/prod` etc.
    * `include` Lets the Filelog receiver know where the log files are placed. Make sure that the collector has permissions to read the files; otherwise, the logs will not be collected.
    * `include_file_path_resolved: true` Adds a `log.file.path_resolved` attribute to the logs that contain the whole path of the file.
    * `storage: file_storage` Prevents the receiver from reading the same data over and over again on each otelcol restart. The `file_storage` extension is defined in the default `/etc/otelcol-sumo/sumologic.yaml` file.

* **processors**:
  * `groupbyattrs/custom_files` Moves the `log.file.path_resolved` attribute from log record level to resource level to reduce data duplication.
  * `resource/custom_files` Adds the `_sourceCategory` resource attribute with value `application_logs_prod`.
  * `sumologic_schema/custom_files` Translates attributes to names understood by Sumo Logic apps, for example renames the resource attribute `log.file.path_resolved` to `_sourceName`.

* **exporters**:
  * `sumologic` Sends data to the registered Sumo Logic organization. This exporter is preconfigured in the `sumologic.yaml` file during installation.

* **service.pipelines**:
  * `logs/custom_files:` Pipeline glues together the receivers with the processors and the exporters.

The remaining processors in pipeline are defined in the `sumologic.yaml` file and should be applied for better performance of the collector.

:::note
The names of the components defined in this file (`filelog/custom_files`, `groupbyattrs/custom_files`, `resource/custom_files`) and the pipeline name (`logs/custom_files`) should be unique across all configuration files to avoid conflicts and unexpected behavior.
:::

For more details, see the [Filelog receiver documentation][filelog_receiver_docs].

### Parsing JSON logs

Use Filelog receiver with [json_parser][json_parser_docs] operator to parse JSON logs.

For example, given the following file where each line is a JSON message:

```json
{"timestamp": "2022-01-01T12:23:34Z","message": "User logged in successfully","severity": "INFO","user_id": 1234}
{"timestamp": "2022-01-01T15:34:21Z","message": "Error processing request","severity": "ERROR","error_code": 500,"error_message": "Internal Server Error","request_id": "ABC123"}
```

Then configuration has following form:

```yaml
receivers:
  filelog/json_files:
    include:
      - /var/log/myservice/*.log
    include_file_name: false
    include_file_path_resolved: true
    storage: file_storage
    operators:
      - type: json_parser
        parse_to: body

processors:
  groupbyattrs/json_files:
    keys:
      - log.file.path_resolved
  resource/json_files:
    attributes:
      - key: sumo.datasource
        value: linux
        action: insert
  sumologic_schema/json_files:

service:
  pipelines:
    logs/json_files:
      receivers:
      - filelog/json_files
      processors:
      - memory_limiter
      - groupbyattrs/json_files
      - resource/json_files
      - resourcedetection/system
      - sumologic_schema/json_files
      - batch
      exporters:
      - sumologic
```

## Collecting logs from Windows Event Log

Windows Log Event Receiver reads and parses logs from windows event log API to collect local events as you see on Windows Event Viewer.

### Collecting Application, Security and System channels

Following configuration demonstrates:

* **Collect**: Collect Application, Security and System channels.
* **Transform**: Set `_sourceCategory` field to `windows_event_log_prod`.
* **Export**: Send data to authenticated Sumo Logic organization.

   ```yaml
   receivers:
     windowseventlog/application/localhost:
       channel: Application
     windowseventlog/security/localhost:
       channel: Security
     windowseventlog/system/localhost:
       channel: System

   processors:
     resource/windows_resource_attributes/localhost:
       attributes:
         - key: _sourceCategory
           value: windows_event_log_prod
           action: insert
         - key: sumo.datasource
           value: windows
           action: insert

   service:
     pipelines:
       logs/windows/localhost:
         receivers:
           - windowseventlog/application/localhost
           - windowseventlog/system/localhost
           - windowseventlog/security/localhost
         processors:
           - memory_limiter
           - resource/windows_resource_attributes/localhost
           - batch
         exporters:
           - sumologic
   ```

1. Create a file in folder `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` with name `sample_windows.yaml`.
1. Paste the above content into the file.
1. Restart collector with following command:
   ```bash title="Windows"
   Restart-Service -Name OtelcolSumo
   ```

Configuration details:

* **receivers**:
  * `windowseventlog/application/localhost:` Collect logs from application channel.
  * `windowseventlog/security/localhost:` Collect logs from security channel.
  * `windowseventlog/system/localhost:` Collect logs from system channel.

* **processors**:
  * `resource/windows_resource_attributes/localhost` Adds the resource attribute `_sourceCategory` with value `windows_event_log_prod`

* **exporters**:
  * `sumologic` Sends data to the registered Sumo Logic organization. This exporter is preconfigured in the `sumologic.yaml` file during installation.

* **service**:
  * `logs/custom_files:` Pipeline glues together the receivers with the processors and the exporters.


### Collect from Custom channels (PowerShell, Sysmon)

Following configuration demonstrates:

* **Collect**: Collect Sysmon logs.
* **Transform**: Set `_sourceCategory` field to `windows_event_log_prod_sysmon`.
* **Export**: Send data to authenticated Sumo Logic organization.

```yaml
receivers:
  windowseventlog/sysmon/localhost/1690233479:
    channel: Microsoft-Windows-Sysmon/Operational

processors:
  resource/windows_resource_attributes/localhost/1690233479:
    attributes:
      - key: _sourceCategory
        value: windows_event_log_prod_sysmon
        action: insert
      - key: sumo.datasource
        value: windows
        action: insert

service:
  pipelines:
    logs/windows/localhost/1690233479:
      receivers:
        -  windowseventlog/sysmon/localhost/1690233479
      processors:
        - memory_limiter
        - resource/windows_resource_attributes/localhost/1690233479
        - batch
      exporters:
        - sumologic
```

1. Create a file in folder `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\conf.d` with name `sysmon_windows.yaml`.
2. Paste the above content into the file.
3. Restart collector with following command:
   ```bash title="Windows"
   Restart-Service -Name OtelcolSumo
   ```

#### Configuration details

* **receivers**: `windowseventlog/sysmon/localhost/1690233479:` Collect logs from sysmon channel with name “Microsoft-Windows-Sysmon/Operational”.
* **processors**: `resource/windows_resource_attributes/localhost/1690233479` Adds the resource attribute `_sourceCategory` with value `windows_event_log_prod_sysmon`
* **exporters**: `sumologic` Sends data to the registered Sumo Logic organization. This exporter is preconfigured in the `sumologic.yaml` file during installation.
* **service**: `logs/custom_files:` Pipeline glues together the receivers with the processors and the exporters.

For more details, see the [Windows Event Log receiver][windows_event_log_receiver_docs].

## Collecting logs from Syslog

The OpenTelemetry Collector offers two approaches for Syslog processing:

* [Syslog receiver][syslog_receiver_docs]
* [TCP Log receiver][tcp_log_receiver_docs] / [UDP Log receiver][udp_log_receiver_docs]

The following table shows the comparison of these components.

| Feature/Capability    | OpenTelemetry Syslog Receiver                                      | TCPlog/UDPlog Receiver and Sumo Logic Syslog Processor                |
|:----------------------|:-------------------------------------------------------------------|:----------------------------------------------------------------------|
| Recommendation        | Parse syslog into structured logs                                  | Compatibility with the current Installed Collector behavior is needed |
| Network protocol      | TCP, UDP                                                           | TCP, UDP                                                              |
| Syslog format         | `RFC3164` and `RFC5424` formats                                    | Any format                                                            |
| Field Parsing         | Collector side                                                     | Not on collector side                                                 |
| Protocol Verification | Strict parsing; logs sent to the wrong endpoint will not be parsed | No protocol verification; all formats are treated the same            |


### Parsing Syslog logs into structured logs

Following configuration demonstrates:

* **Collect**: Collect syslog sent using UDP protocol to `172.31.93.11` on port `5140`
* **Transform**: Set `_sourceCategory` field to `syslog_event_log_prod`
* **Export**: Send data to authenticated Sumo Logic organization

```yaml
receivers:
  syslog/local_syslog:
    udp:
      listen_address: "172.31.93.11:5140"
    protocol: rfc5424

processors:
  resource/local_syslog:
    attributes:
      - key: _sourceCategory
        value: syslog_event_log_prod
        action: insert
      - key: sumo.datasource
        value: linux
        action: insert

service:
  pipelines:
    logs/local_syslog:
      receivers:
        - syslog/local_syslog
      processors:
        - resource/local_syslog
      exporters:
        - sumologic
```

1. Create a file in folder `/etc/otelcol-sumo/conf.d` with name for your choice, e.g. `local_syslog.yaml`.
2. Paste the above content to `local_syslog.yaml`
3. Restart collector with following command:
   ```bash title="Linux"
   systemctl restart otelcol-sumo
   ```
4. You can validate if the configuration was successful by running the following command:
   ```bash title="Linux"
   sudo lsof -i:<port>
   ```
   Where `port` is the port specified in your config above.

For more details, see the [Syslog receiver][syslog_receiver_docs].

### Collecting Syslog logs in format compatible with Sumo Logic Installed Collector

To collect Syslog logs in format compatible with the Sumo Logic Installed Collector, use the [TCP Log][tcp_log_receiver_docs] or [UDP Log][udp_log_receiver_docs] receiver.

Following configuration demonstrates:

* **Collect**: Collect syslog UDP on IP `172.31.93.11` port `5140` and TCP on IP `172.31.93.11` port `1514`.
* **Transform**: Set `_sourceCategory` field to `syslog_event_log_prod`
* **Export**: Send data to authenticated Sumo Logic organization


```yaml
receivers:
  tcplog/syslog_plain:
    listen_address: "172.31.93.11:1514"
  udplog/syslog_plain:
    listen_address: "172.31.93.11:5140"

processors:
  resource/syslog_plain:
    attributes:
      - key: _sourceCategory
        value: syslog_event_log_prod
        action: insert
      - key: sumo.datasource
        value: linux
        action: insert
  sumologic_syslog/syslog_plain:

service:
  pipelines:
    logs/syslog_plain:
      receivers:
        - tcplog/syslog_plain
        - udplog/syslog_plain
      processors:
        - resource/syslog_plain
        - sumologic_syslog/syslog_plain
      exporters:
        - sumologic
```

1. Create a file in folder `/etc/otelcol-sumo/conf.d` with name for your choice, e.g. `tcp_udp_log.yaml`.
2. Paste the above content to `tcp_udp_log.yaml`
3. Restart collector with following command:
   ```bash title="Linux"
   systemctl restart otelcol-sumo
   ```
4. You can validate if the configuration was successful by running the following command:
   ```bash title="Linux"
   sudo lsof -i:<port>
   ```
   Where `port` is the port specified in your config above.

For more details, see the [TCP Log][tcp_log_receiver_docs] or [UDP Log][udp_log_receiver_docs] receiver.

## Collecting logs from SQL databases

The [SQL Query receiver][sqlquery_receiver_docs] retrieves logs from SQL databases, including MySQL, Oracle and PostgreSQL. See below for configuration for a specific database engine.

:::note
This section describes the configuration to collect logs stored in DB tables using queries. If you intend to monitor database applications availability, performance, and resource utilization of MySQL database clusters, visit [Database Monitoring](/docs/integrations/databases) and find the database of your choice.
:::

### Collecting logs from a MySQL database

Here's an example configuration for MySQL that you can place in the `conf.d` directory:

```yaml
receivers:
  sqlquery/mysql:
    collection_interval: 30s
    driver: mysql
    datasource: user:password@tcp(host:port)/dbname
    storage: file_storage
    queries:
      - sql: select log_id, log_text from logs_table where log_id > ? order by log_id
        tracking_column: log_id
        tracking_start_value: 1
        logs:
          - body_column: log_text
service:
  pipelines:
    logs/mysql:
      receivers:
        - sqlquery/mysql
      processors:
        - memory_limiter
        - resourcedetection/system
        - batch
      exporters:
        - sumologic
```

With this configuration, the SQL Query receiver will run the SQL query `select log_id, log_text from logs_table where log_id > ?` every 30 seconds and create a log record out of each result row, using the value from the `log_text` column as the body of the log.

On the first query run, the parameter represented with the question mark `?` will be substituted with `1`, which is the value of the `tracking_start_value` property. On subsequent query runs, the last retrieved value of the `log_id` column from the previous run will be used as the value for the parameter.

The last used tracking value will be stored persistently using the `file_storage` extension, allowing the collector to pick up where it left off between collector restarts.

### Collecting logs from an Oracle database

Here's an example configuration for Oracle database that you can place in the `conf.d` directory:

```yaml
receivers:
  sqlquery/oracle:
    collection_interval: 30s
    driver: oracle
    datasource: oracle://user:password@host:port/servicename
    storage: file_storage
    queries:
      - sql: SELECT log_id, log_text, (log_id || ';' || log_text) AS concatenated_fields FROM logs_table WHERE log_id > :id ORDER BY log_id
        tracking_column: LOG_ID
        tracking_start_value: 1
        logs:
          - body_column: concatenated_fields
service:
  pipelines:
    logs/oracle:
      receivers:
        - sqlquery/oracle
      processors:
        - memory_limiter
        - resourcedetection/system
        - batch
      exporters:
        - sumologic
```

With this configuration, the SQL Query receiver will run the SQL query `select log_id, log_text from logs_table where log_id > :id` every 30 seconds and create a log record out of each result row, using the value from the `log_text` column as the body of the log.

On the first query run, the parameter represented with `:id` will be substituted with `1`, which is the value of the `tracking_start_value` property. On subsequent query runs, the last retrieved value of the `log_id` column from the previous run will be used as the value for the parameter.

The last used tracking value will be stored persistently using the `file_storage` extension, allowing the collector to pick up where it left off between collector restarts.

### Collecting logs from a PostgreSQL database

Here's an example configuration for PostgreSQL that you can place in the `conf.d` directory:

```yaml
receivers:
  sqlquery/postgresql:
    collection_interval: 30s
    driver: postgres
    datasource: "postgresql://user:password@host:port/dbname"
    storage: file_storage
    queries:
      - sql: select log_id, log_text from logs_table where log_id > $$1 order by log_id
        tracking_column: log_id
        tracking_start_value: 1
        logs:
          - body_column: log_text
service:
  pipelines:
    logs/postgresql:
      receivers:
        - sqlquery/postgresql
      processors:
        - memory_limiter
        - resourcedetection/system
        - batch
      exporters:
        - sumologic
```

With this configuration, the SQL Query receiver will run the SQL query `select log_id, log_text from logs_table where log_id > $1` every 30 seconds and create a log record out of each result row, using the value from the `log_text` column as the body of the log. Note that you need to escape the dollar character in the YAML config file by adding a second dollar character: `$$`.

On the first query run, the parameter represented with the dollar one `$1` will be substituted with `1`, which is the value of the `tracking_start_value` property. On subsequent query runs, the last retrieved value of the `log_id` column from the previous run will be used as the value for the parameter.

The last used tracking value will be stored persistently using the `file_storage` extension, allowing the collector to pick up where it left off between collector restarts.

### Collecting logs from an MSSQL database

Here's an example configuration for Microsoft SQL that you can place in the `conf.d` directory:

```yaml
receivers:
  sqlquery:
    collection_interval: 60s
    driver: sqlserver
    datasource: server=hostname;port=1433;user=user;password=pass
    storage: file_storage
    queries:
      - sql: SELECT [UserID], [FirstName], [LastName], [Email], [DateOfBirth], CONCAT([FirstName], ' ', [LastName], ',', [Email], ',', [DateOfBirth]) AS [ConcatenatedColumn] FROM [master].[dbo].[Users]
        tracking_column: "UserID"
        tracking_start_value: 1
        logs:
          - body_column: ConcatenatedColumn

processors:
  resource/sqlquery:
    attributes:
      - key: _sourceCategory
        value: POV/PROD/test
        action: insert

service:
  pipelines:
    logs/sqlserver:
      receivers:
        - sqlquery
      processors:
        - memory_limiter
        - resourcedetection/system
        - resource/sqlquery
        - batch
      exporters:
        - sumologic
```
With this configuration, the SQL Query receiver will run the SQL query `SELECT [UserID], [FirstName], [LastName], [Email], [DateOfBirth], CONCAT([FirstName], ' ', [LastName], ',', [Email], ',', [DateOfBirth]) AS [ConcatenatedColumn] FROM [master].[dbo].[Users]` every 30 seconds and create a log record out of each result row, using the value from the `ConcatenatedColumn` column as the body of the log.

### Troubleshooting the SQL Query receiver

If you can see the following logs from the collector after applying the configuration:

```console
'' has invalid keys: storage
'queries[0]' has invalid keys: logs, tracking_column, tracking_start_value
```

Make sure you are using collector version `v0.78.0-sumo-0` or higher.

## Collecting logs from other sources

You can find the full list of receivers available on the [Sumo Logic OpenTelemetry Collector][collector_components_docs] page. When the Sumo Logic OpenTelemetry Collector does not support collecting logs from a source, the [Monitoring Job Receiver (Beta)][monitoring_job_receiver_docs] can be used as a catch-all.

The Monitoring Job Receiver can be configured to execute a script or command on the collector host. The standard output and error streams from that command will be collected as log record(s).

:::important Prefer purpose-built receivers to Monitoring Jobs
When available, prefer purpose-built receivers like `sqlquery` to monitoring jobs receiver. The below example is about monitoring job configuration that runs SQL queries using the `psql` tool for demonstration purposes as it is well understood.
:::

This configuration configures the controller to execute the `psql` command and collects the output text as logs. See the [Monitoring Job Receiver documentation][monitoring_job_receiver_docs] for configuration specifics including advanced output processing with features like multi-line log detection, timestamp, and field parsing.

```yaml
receivers:
  monitoringjob/logs_table:
    schedule:
        interval: 10m
    exec:
        command: psql
        arguments:
            - '--csv'
            - '-c'
            - "select log_id, log_text from logs_table WHERE log_time > (NOW() - interval '10 minutes');"
service:
  pipelines:
    logs/postgresql:
      receivers:
        - monitoringjob/logs_table
      processors:
        - memory_limiter
        - resourcedetection/system
        - batch
      exporters:
        - sumologic
```

[collector_components_docs]: https://github.com/SumoLogic/sumologic-otel-collector/tree/main#components
[filelog_receiver_docs]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/filelogreceiver/README.md
[json_parser_docs]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/stanza/docs/operators/json_parser.md
[windows_event_log_receiver_docs]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/windowseventlogreceiver/README.md
[syslog_receiver_docs]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/syslogreceiver/README.md
[tcp_log_receiver_docs]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/tcplogreceiver/README.md
[udp_log_receiver_docs]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/udplogreceiver/README.md
[sqlquery_receiver_docs]: https://github.com/dmolenda-sumo/opentelemetry-collector-contrib/blob/sqlquery-receiver-add-logs-v0.78.0/receiver/sqlqueryreceiver/README.md
[monitoring_job_receiver_docs]: https://github.com/SumoLogic/sumologic-otel-collector/blob/main/pkg/receiver/jobreceiver/README.md
