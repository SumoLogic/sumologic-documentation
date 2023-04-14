---
id: collect-logs
title: Collect Logs
sidebar_label: Collect Logs
description: Learn how to collect logs using the Sumo Logic OpenTelemetry Collector.
---

The Sumo Logic Distribution for OpenTelemetry Collector provides various receivers for log collection. This document describes the receivers most commonly used for logs: the [Filelog Receiver](#filelog-receiver) and [Windows Log Event Receiver](#windows-log-event-receiver).

You can find the full list of receivers on our [OpenTelemetry Collector GitHub page](https://github.com/SumoLogic/sumologic-otel-collector/tree/main#components).

## Filelog Receiver

The Filelog Receiver tails and parses logs from files. The following is a basic configuration for the Filelog Receiver (collecting logs from a file), which you can place in the `conf.d` directory:

```yaml
receivers:
  filelog/custom_files:
    include:
    - /var/log/myservice/*.log
    - /other/path/**/*.txt
    - ./tmp/logs/*.log
    include_file_name: false
    include_file_path_resolved: true
processors:
  groupbyattrs/file path resolved:
    keys:
      - log.file.path_resolved
service:
  pipelines:
    logs/custom_files:
      receivers:
      - filelog/custom_files
      processors:
      - memory_limiter
      - groupbyattrs/file path resolved
      - resourcedetection/system
      - batch
      exporters:
      - sumologic
```

`include:` lets the Filelog Receiver know where the log file is placed. Make sure that the collector has permissions to access the files; otherwise, it will not be collected.

The `include_file_name: false` prevents the receiver from adding `log.file.name` attribute to the logs.

Instead, we are using `include_file_path_resolved: true`, which adds a `log.file.path_resolved` attribute to the logs that contain the whole path of the file, as opposed to just the name of the file. The `log.file.path_resolved` attribute should be moved to resource and we use [Group by Attributes processor][groupbyattrprocessor] for that.

The remaining processors in pipeline are from `sumologic.yaml` file and should be applied for better performance of collector and use of Sumo Logic platform.

:::note
The receiver (`filelog/custom_files`) and pipeline (`logs/custom_files:`) names should be unique across all configuration files to avoid conflicts and unexpected behavior.
:::

### Keeping track of position in files

By default, the Filelog receiver watches files starting at their end (the default is `start_at: end`), so nothing will be read after the otelcol process starts until new data is added to the files. To change this, add `start_at: beginning` to the receiver's configuration.

To prevent the receiver from reading the same data over and over again on each otelcol restart, also add the [File Storage extension][filestorageextension_docs] which is already defined in `sumologic.yaml`, that will allow Filelog receiver to persist the current position in watched files between otelcol restarts. Here's an example of such a configuration:

```yaml
receivers:
  filelog:
    include:
    - /var/log/myservice/*.log
    - /other/path/**/*.txt
    include_file_name: false
    include_file_path_resolved: true
    storage: file_storage
processors:
  groupbyattrs/file path resolved:
    keys:
      - log.file.path_resolved
service:
  pipelines:
    logs/custom_files:
      receivers:
      - filelog/custom_files
      processors:
      - memory_limiter
      - groupbyattrs/file path resolved
      - resourcedetection/system
      - batch
      exporters:
      - sumologic
```

For more details, see the [Filelog Receiver documentation][filelogreceiver_readme].

### Parsing JSON logs

Filelog Receiver with [json_parser][json_parser] operator can be used for parsing JSON logs. The [json_parser][json_parser] operator parses the string-type field selected by `parse_from` as JSON (by default, `parse_from` is set to `$body` which indicates the whole log record).

For example, when logs has following form in the file:

```json
{
  "message": "{\"key\": \"val\"}"
}
```

Then configuration to extract JSON which is represented as string (`{\"key\": \"val\"}`) has following form:

```yaml
receivers:
  filelog/custom_files:
    include:
    - /var/log/myservice/*.log
    - /other/path/**/*.txt
    include_file_name: false
    include_file_path_resolved: true
    storage: file_storage
    operators:
      # this parses log line as JSON for all files ins /other/path/ directory
      - type: json_parser
        parse_to: body
        if: 'attributes["log.file.path_resolved"] matches "^/other/path/.*"'
      # this parses string under 'message' key as JSON for all files in /other/path/ directory
      - type: json_parser
        parse_from: body.message
        parse_to: body.message
        if: 'attributes["log.file.path_resolved"] matches "^/other/path/.*"'
    start_at: beginning
processors:
  groupbyattrs/file path resolved:
    keys:
      - log.file.path_resolved
service:
  pipelines:
    logs/custom_files:
      receivers:
      - filelog/custom_files
      processors:
      - memory_limiter
      - groupbyattrs/file path resolved
      - resourcedetection/system
      - batch
      exporters:
      - sumologic
```

## Windows Log Event Receiver

Windows Log Event Receiver tails and parses logs from windows event log API.

Consider the following example usage of [Windows Event Log receiver][windowseventlogreceiver]. It is going to collect logs from application, security, and system channels and send them to Sumo Logic.

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
        - resourcedetection/system
        - resource/windows_resource_attributes/localhost
        - batch
      exporters:
        - sumologic
```

:::tip Additional information
* See [OpenTelemetry documentation][windowseventlogreceiver] for more information about Windows Event Log receiver.
* See [Additional Configurations Reference](/docs/send-data/opentelemetry-collector/data-source-configurations/additional-configurations-reference/) for more details about OpenTelemetry configuration.
:::

[json_parser]: https://github.com/open-telemetry/opentelemetry-log-collection/blob/main/docs/operators/json_parser.md
[filelogreceiver_readme]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver
[filestorageextension_docs]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/extension/storage/filestorage
[groupbyattrprocessor]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/groupbyattrsprocessor#group-by-attributes-processor
[windowseventlogreceiver]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/windowseventlogreceiver/README.md
