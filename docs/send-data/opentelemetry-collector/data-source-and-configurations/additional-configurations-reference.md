---
id: additional-configurations-reference
title: Additional Configurations Reference
sidebar_label: Additional Configurations Reference
description: Learn about Configurations Reference
---

## OpenTelemetry Configuration

All configuration files in this setup follow the schema for OpenTelemetry Collector configuration, which comprises a service consisting of pipelines with receivers, processors, and exporters:

* A **Receiver**, which can be push or pull based, is how data gets into the Collector. Receivers may support one or more data sources. For more information, refer to the [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/configuration/#receivers).
* A **Processor** is run on data between being received and being exported. Processors are optional though some are recommended. With processors, you can filter your data, add custom fields, modify content, and much more. For more information refer to the [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/configuration/#processors).
* An **Exporter** is how you transmit data to one or more backends/destinations, specifically Sumo Logic. It can be push or pull based. For more information, refer to the [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/configuration/#exporters).
* An **Extension** is available primarily for tasks that do not involve processing telemetry data. Examples of extensions include health monitoring, service discovery, and data forwarding. Sumo Logic has its own extension, which registers and manage your Sumo Logic collector. For more information, refer to the [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/configuration/#extensions).
* A **Pipeline** is configured through the service stanza. For more information, refer to the [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/configuration/#service) to become more familiar with this concept.

## Sumo Logic Distribution for OpenTelemetry Collector Configuration Structure

The configuration directory has three main components:

* The `sumologic.yaml` is provided by Sumo Logic and shouldn't be changed, as it can be overridden during installation or upgrades.
  * `common.yaml` file contains configuration settings that are common to all collectors.
  * `hostmetrics.yaml` file contains configuration settings that are specific to host metrics collectors.
* The `conf.d` directory is where customers can customize the behavior of the OpenTelemetry Collector. It contains configuration files that can be changed according to specific needs.
* The `env` directory contains environmental variable files that can be used to configure settings for the collector.
  * `token.env` file contains configuration settings related to authentication and authorization for the collector.

The following is the file structure used in our configuration directory:

```txt
.
├── conf.d
│   ├── common.yaml
│   └── hostmetrics.yaml
├── env
│   └── token.env
└── sumologic.yaml
```

When the collector is started, it loads the configuration in the following order:

* `sumologic.yaml`. This is the default configuration file provided by Sumo Logic. It contains the default settings for the collector.
* All configuration files from `conf.d`, sorted alphabetically. These files contain additional configuration settings that can be customized by customers. If there are any conflicts between the files, the last loaded configuration file will take precedence.

:::note
If a configuration is loaded later in the order, it will be merged with the previous configuration.
:::

For example, if two configuration files define the same key, the value from the later file will overwrite the value from the earlier file. If a list or map is defined in multiple configuration files, the lists or maps are merged, with values from the later configuration file taking precedence.

Let's consider the following example configuration files:

```yaml title="conf.d/0-base.yaml"
extensions:
  sumologic:
    collector_description: "My OpenTelemetry Collector"
    collector_fields:
      cluster: "cluster-1"
    some_list:
      - element 1
      - element 2
```

```yaml title="conf.d/1-override.yaml"
extensions:
  sumologic:
    collector_fields:
      zone: "eu"
    some_list:
      - element 3
      - element 4
```

The effective configuration will look like the following:

```yaml
extensions:
  sumologic:
    collector_description: "My OpenTelemetry Collector"
    collector_fields:
      cluster: "cluster-1"
      zone: "eu"
    some_list:
      - element 3
      - element 4
```

Note that the list has been overridden and maps have been merged.

## Best Practices

### Configuration Location

All Sumo Logic preconfigured components are stored in `sumologic.yaml` file. This file is managed by the installation script and should never be changed manually.

* It is recommended to maintain the configuration of all reusable components in `conf.d/common.yaml`.
* Specific configurations should be grouped by pipelines in meaningfully named files in the `conf.d` directory.

For example, a file named `conf.d/mysql.yaml` can contain the MySQL receiver along with any processors that are intended to modify the collected data before sending it to Sumo Logic.

### Custom Pipeline

There are few processors provided in `sumologic.yaml` which are intended to be used in every pipeline.

* **Memory limiter processor**. It is used to prevent out-of-memory situations on the collector. It should be always first on the processor's list. For more information, refer to the [OpenTelemetry documentation](https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/memorylimiterprocessor#memory-limiter-processor).
* **Batch processor**. It accepts spans, metrics, or logs and places them into batches. Batching helps better compress the data and reduce the number of outgoing connections required to transmit the data. See [Using batch processor to batch data](#using-batch-processor-to-batch-data) for more information.
<!-- * TODO: verify this point -> The Sumo Logic Schema processor modifies the metadata on logs, metrics, and traces sent to Sumo Logic so that the Sumo Logic apps can make full use of the ingested data.  -->

Refer to the [Sumo Logic repository](https://github.com/SumoLogic/sumologic-otel-collector/tree/main/pkg/processor/sumologicschemaprocessor#sumo-logic-schema-processor) for more details.

We also expect Sumo Logic exporter to be included in exporters section.

See the following example:

```yaml
service:
  pipelines:
    metrics/default:
      receivers:
        - otlp
      processors:
        - memory_limiter
        - batch
        - sumologic_schema
      exporters:
        - sumologic
```

### Using Batch processor to batch data

The [Batch processor][batchprocessor] can be utilized to convert the processed data into batches that are larger than a specified size or time interval. This can aid in compressing the data more effectively and minimizing the number of requests sent by the exporters.

It is highly recommended to use this processor in every pipeline. It should be defined after [memory limiter processor][memorylimiterprocessor] and any processors that drop the data, such as [filter processor][filterprocessor].

In addition to setting a lower batch size, it is also possible to set a maximal batch size.

We highly recommend setting that limit to avoid sudden increases in request sizes in case more data is temporarily received. The value we recommend to set is `2 * send_batch_size`.

Overall, we recommend the following default configuration for this processor.

```yaml
batch:
  send_batch_size: 1_024
  timeout: 1s
  send_batch_max_size: 2_048 ## = 2 * 1024
```

:::note
 If you are utilizing the [Sumo Logic exporter][sumologicexporter] to send data in a format **other than** OTLP, it is possible to explicitly restrict the size of the requests in bytes by utilizing the configuration option `max_request_body_size`.
:::

Learn more about these processors:
[batchprocessor]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/batchprocessor
[memorylimiterprocessor]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/memorylimiterprocessor
[filterprocessor]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/filterprocessor
[sumologicexporter]: https://github.com/SumoLogic/sumologic-otel-collector/pkg/exporter/sumologicexporter

### Mapping OpenTelemetry concepts to Sumo Logic

OpenTelemetry has a [rich data model](https://github.com/open-telemetry/opentelemetry-proto/tree/main/opentelemetry/proto), which is internally constructed out of several layers. For all signals,
these can be broken down into following:

* **Resource**. Includes attributes describing the resource from which given set of data comes from. Should follow [resource semantic conventions](https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/resource/semantic_conventions).
* **Instrumentation Scope**. Additional information about the scope of data. For example, instrumentation library name.
* **Record**. Refers to a specific entry of data, such as a Log, Span, or Metric. Each Record has its own set of attributes, which may include key/value pairs that are specific to the context of the Record. Some Record types may follow certain conventions for signal types, such as [trace](https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/trace/semantic_conventions), [metrics](https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/metrics/semantic_conventions), or [logs](https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/logs/semantic_conventions). Logs, in particular, can also include attributes in the body of the Record.

As can be observed, while attributes can be present at both **Resource** and **Record level** currently, they are not created equal and should be interpreted separately. The Resource-Level attribute context is much broader, and they identify where data comes from, whereas Record-Level attributes concern just one record, often with many keys and values.

At Sumo Logic, there is a concept of [Fields](/docs/manage/fields) for log data. Fields offer a powerful capability to associate indexable metadata with logs, though only a limited number of them can be used at a given time, and you must define them first.

Looking from the OpenTelemetry standpoint, [Fields](/docs/manage/fields) are a good match for the **Resource-level** attributes, while Log Record-level attributes are good fit for the [structured representation of the log via JSON](/docs/search/get-started-with-search/search-basics/view-search-results-json-logs), which is automatically supported by Sumo Logic Search.

All **Resource-level** attributes are stored as fields, and any attributes that don't match a defined field will be skipped. You can check the list of ignored fields using the [dropped fields view](/docs/manage/fields/#view-dropped-fields). When a log contains attributes at the **Record-level**, they are stored as JSON, and if there is a body, it will be stored under the `log` key.

#### Examples

##### Log with both Resource-level and Record-level attributes

Consider the following input log:

```text
  Resource:
    Attributes:
      "indexed-field": "some value"
  Log:
    Body: "sample body"
    Attributes:
      "log-level-attribute": 42
```

Such log will be stored as the following set of data at Sumo Logic:

```text
  Fields:
    "indexed-field": "some value"

  _raw (JSON): {
    "log": "sample body",
    "log-level-attribute": "42"
  }
```

ToDo: add screenshots

##### Log with Resource-level attributes only

If no log-level attributes are present, the log body is stored inline. For example, for the following input:

```text
  Resource:
    Attributes:
      "indexed-field": "some value"
  Log:
    Body: "sample body"
```

The output is stored as:

```text
  Fields:
    "indexed-field": "some value"

  _raw: "sample body"
```

ToDo: add screenshots

### Data Tagging Recommendations

We recommend reading the [Metadata Naming Conventions](/docs/send-data/reference-information/metadata-naming-conventions/) document before continuing to become more familiar with the terms used below. The following terms are important for data tagging:

* Source Category (`_sourceCategory`)
* Source Host (`_sourceHost`)
* Source Name (`_sourceName`)

The above attributes are taken from the **Resource attributes**. If they are not set, they are taken from the collector configuration.

See the following example which shows how to set them using the **Resource attributes** processor:

```yaml
processors:
  resource/static fields:
    attributes:
    - key: _sourceName
      value: my source name
      ## upsert will override existing _sourceName field
      action: upsert
```

For more advanced processing capabilities in your data pipeline, you can make use of the **Transform** processor. This processor enables you to perform more complex transformations on your data. For example, you can concatenate multiple **Resource attributes** into  `_sourceCategory` field with a `/` character separating each attribute.

```yaml
processors:
  transform/custom fields:
    log_statements:
    - context: resource
      statements:
      - set(attributes["_sourceCategory"], Concat([attributes["service.name"], attributes["http.method"]], "/"))
```

You now have the ability to create custom tags when processing data, beyond using special tags. All resource attributes are treated as tags, offering flexibility when categorizing and processing data.

You can set default tags in collector configuration using the `collector_fields` option:

```yaml
extensions:
  sumologic:
    collector_fields:
      cluster: staging
```

Tags are useful for building the queries and helps to correlate the different signals (metrics, logs and traces) with each other.

:::note
Refer to the [Fields](/docs/manage/fields/) documentation for more information on fields and how to use them.
:::
