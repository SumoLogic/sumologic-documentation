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
* [Collecting logs from Syslog](#collecting-logs-from-syslog)
  * [Parsing Syslog logs into structured logs](#parsing-syslog-logs-into-structured-logs)
  * [Collecting Syslog logs in format compatible with Sumo Logic Installed Collector](#collecting-syslog-logs-in-format-compatible-with-sumo-logic-installed-collector)
* [Collecting logs from SQL databases](#collecting-logs-from-sql-databases)
  * [Collecting logs from a MySQL database](#collecting-logs-from-a-mysql-database)
  * [Collecting logs from an Oracle database](#collecting-logs-from-an-oracle-database)
  * [Collecting logs from a PostgreSQL database](#collecting-logs-from-a-postgresql-database)
  * [Troubleshooting the SQL Query receiver](#troubleshooting-the-sql-query-receiver)

You can find the full list of receivers on our [Sumo Logic OpenTelemetry Collector page](https://github.com/SumoLogic/sumologic-otel-collector/tree/main#components).

:::tip Additional information
See [Additional Configurations Reference](/docs/send-data/opentelemetry-collector/data-source-configurations/additional-configurations-reference/) for more details about configuring the Sumo Logic OpenTelemetry Collector.
:::

## Collecting logs from local files

Following configuration demonstrates:

1. **Collect**: How to collect logs stored in `/var/log/syslog` and `/var/log/audit/audit.log`.
2. **Transform**: Set `_sourceCategory` field to `application_logs_prod`
3. **Export**: Send data to authenticated Sumo Logic organization.

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
        - batch
      exporters:
        - sumologic
```

1. Create a file in folder `/etc/otelcol-sumo/conf.d` with name for your choice, perhaps matching the pipeline name, `custom_files.yaml`. Its name has to end with `.yaml`.
2. Paste the above content.
3. Restart collector with following command:
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

service:
  pipelines:
    logs/json_files:
      receivers:
      - filelog/json_files
      processors:
      - memory_limiter
      - groupbyattrs/json_files
      - resourcedetection/system
      - batch
      exporters:
      - sumologic
```

## Collecting logs from Windows Event Log

Windows Log Event Receiver reads and parses logs from windows event log API to collect local events as you see on Windows Event Viewer.

Following configuration demonstrates:

1. **Collect**: Collect Application, Security and System channels.
2. **Transform**: Set `_sourceCategory` field to `windows_event_log_prod`.
3. **Export**: Send data to authenticated Sumo Logic organization.

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

1. Create a file in folder `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config\` with name `sample_windows.yaml`.
2. Paste the above content into the file.
3. Restart collector with following command:
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

1. **Collect**: Collect syslog sent using UDP protocol to `172.31.93.11` on port `5140`
2. **Transform**: Set `_sourceCategory` field to `syslog_event_log_prod`
3. **Export**: Send data to authenticated Sumo Logic organization

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

For more details, see the [Syslog receiver][syslog_receiver_docs].

### Collecting Syslog logs in format compatible with Sumo Logic Installed Collector

To collect Syslog logs in format compatible with the Sumo Logic Installed Collector, use the [TCP Log][tcp_log_receiver_docs] or [UDP Log][udp_log_receiver_docs] receiver.

Following configuration demonstrates:

1. **Collect**: Collect syslog UDP on IP 172.31.93.11 port 5140 and TCP on IP 172.31.93.11 port 1514.
2. **Transform**: Set `_sourceCategory` field to `syslog_event_log_prod`
3. **Export**: Send data to authenticated Sumo Logic organization


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
2. Paste the above content to tcp_udp_log.yaml
3. Restart collector with following command:
   ```bash title="Linux"
   systemctl restart otelcol-sumo
   ```

For more details, see the [TCP Log][tcp_log_receiver_docs] or [UDP Log][udp_log_receiver_docs] receiver.

## Collecting logs from SQL databases

The [SQL Query receiver][sqlquery_receiver_docs] retrieves logs from SQL databases, including MySQL, Oracle and PostgreSQL. See below for configuration for a specific database engine.

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
      - sql: select log_id, log_text from logs_table where log_id > :id order by log_id
        tracking_column: LOG_ID
        tracking_start_value: 1
        logs:
          - body_column: LOG_TEXT
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

### Troubleshooting the SQL Query receiver

If you can see the following logs from the collector after applying the configuration:

```console
'' has invalid keys: storage
'queries[0]' has invalid keys: logs, tracking_column, tracking_start_value
```

Make sure you are using collector version `v0.78.0-sumo-0` or higher.

[filelog_receiver_docs]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/filelogreceiver/README.md
[json_parser_docs]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/stanza/docs/operators/json_parser.md
[windows_event_log_receiver_docs]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/windowseventlogreceiver/README.md
[syslog_receiver_docs]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/syslogreceiver/README.md
[tcp_log_receiver_docs]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/tcplogreceiver/README.md
[udp_log_receiver_docs]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/udplogreceiver/README.md
[sqlquery_receiver_docs]: https://github.com/dmolenda-sumo/opentelemetry-collector-contrib/blob/sqlquery-receiver-add-logs-v0.78.0/receiver/sqlqueryreceiver/README.md
