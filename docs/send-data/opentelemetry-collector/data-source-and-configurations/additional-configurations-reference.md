---
id: additional-configurations-reference
title: Additional Configurations Reference
sidebar_label: Additional Configurations Reference
description: Learn about Configurations Reference
---

## OpenTelemetry Configuration

All configuration files in this setup follow the schema for OpenTelemetry Collector configuration, which comprises a service consisting of pipelines with receivers, processors, and exporters:

* A receiver, which can be push or pull based, is how data gets into the Collector. Receivers may support one or more data sources.

  Refer to [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/configuration/#receivers) for more details.

* Processors are run on data between being received and being exported. Processors are optional though some are recommended.
  With processors you can filter. WIth processor you can filter your data, add custom fields, modify content and much more.

  Refer to [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/configuration/#processors) for more details.

* An exporter, which can be push or pull based, is how you send data to one or more backends/destinations especially to Sumo Logic.

  Refer to [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/configuration/#exporters) for more details.

* Extensions are available primarily for tasks that do not involve processing telemetry data. Examples of extensions include health monitoring, service discovery, and data forwarding.
  Sumo Logic has it own extension which registers and manage your Sumo Logic collector

  Refer to [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/configuration/#extensions) for more details.

Pipeline is configured through the service stanza. Please refer to [OpenTelemetry documentation](https://opentelemetry.io/docs/collector/configuration/#service) to become more familiar with this concept.

## Sumo Logic Distribution for OpenTelemetry Collector Configuration Structure

We are using the following organization of files within configuration directory:

```txt
.
├── conf.d
│   ├── common.yaml
│   └── hostmetrics.yaml
├── env
│   └── token.env
└── sumologic.yaml
```

* `sumologic.yaml` is provided by Sumo Logic and shouldn't be changed, as it can be overridden during installation/upgrade
* `conf.d` is intended to be changed by customers if they need to customize OpenTelemetry Collector behavior
* `env` is intended to contain environmental variable files

By default, configuration is loaded in the following order.

* `sumologic.yaml`
* all configuration files from `conf.d` sorted alphabetically

:::note
If a configuration is loaded later in the order, it will be merged with the previous configuration.
:::

Let's consider the following example configuration files.

`conf.d/0-base.yaml`:

```yaml
extensions:
  sumologic:
    collector_description: "My OpenTelemetry Collector"
    collector_fields:
      cluster: "cluster-1"
    some_list:
      - element 1
      - element 2
```

`conf.d/1-override.yaml`:

```yaml
extensions:
  sumologic:
    collector_fields:
      zone: "eu"
    some_list:
      - element 3
      - element 4
```

the effective configuration will look like the following:

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

Notice that the list has been overridden and maps have been merged.

## Best Practices

### Configuration Location

All Sumo Logic preconfigured components are stored in `sumologic.yaml` file. This file is managed by the installation script and should never be changed manually.

We recommend to keep configuration of all components which are intended to be reused in `conf.d/common.yaml`.

Specific configurations should be grouped by pipelines in meaningfully named files in `conf.d` directory.
For example `conf.d/mysql.yaaml` may contain MySQL receiver with all processors intended to modify collected data before sending it to Sumo Logic.

### Custom Pipeline

There are few processors provided in `sumologic.yaml` which are intended to be used in every pipeline.

* The memory limiter processor is used to prevent out of memory situations on the collector. It should be always first on the processors list.

  Refer to [OpenTelemetry documentation](https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/memorylimiterprocessor#memory-limiter-processor) for more details.

* The batch processor accepts spans, metrics, or logs and places them into batches. Batching helps better compress the data and reduce the number of outgoing connections required to transmit the data.

  See [Using batch processor to batch data](#using-batch-processor-to-batch-data) for more details.

* TODO: verify this point -> The Sumo Logic Schema processor modifies the metadata on logs, metrics and traces sent to Sumo Logic so that the Sumo Logic apps can make full use of the ingested data.

  Refer to [Sumo Logic repository](https://github.com/SumoLogic/sumologic-otel-collector/tree/main/pkg/processor/sumologicschemaprocessor#sumo-logic-schema-processor) for more details.

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

### Using batch processor to batch data

[Batch processor][batchprocessor] can be used to transform processed data into batches greater than given size or from given time interval.
This helps better compress the data and reduce the number of requests sent by the exporters.

It is highly recommended to use this processor in every pipeline. It should be defined after [memory limiter processor][memorylimiterprocessor]
and any processors that drop the data, such as [filter processor][filterprocessor].

Besides setting the lower limit for batch size, it is also possible to set a maximal size for a batch.
We highly recommend to set that limit to avoid sudden increase of request sizes in case more data is being received temporarily.
The value we recommend to set is `2 * send_batch_size`.

Overall, we recommend the following default configuration for this processor.

```yaml
batch:
  send_batch_size: 1_024
  timeout: 1s
  send_batch_max_size: 2_048 ## = 2 * 1024
```

:::note
when using [Sumo Logic exporter][sumologicexporter] and sending data that is **not** in otlp format,
you can explicitly limit size of the requests in bytes using config option `max_request_body_size`.
:::

Refer to the [OpenTelemetry documentation](https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/batchprocessor#batch-processor) for more details.

[batchprocessor]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/batchprocessor
[memorylimiterprocessor]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/memorylimiterprocessor
[filterprocessor]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/filterprocessor
[sumologicexporter]: https://github.com/SumoLogic/sumologic-otel-collector/pkg/exporter/sumologicexporter

### Mapping OpenTelemetry concepts to Sumo Logic

OpenTelemetry has a [rich data model], which is internally constructed out of several layers. For all signals,
these can be broken down into following:
* **Resource** - includes attributes describing the resource from which given set of data comes from.
  Should follow [resource semantic conventions].
* **Instrumentation Scope** - additional information about the scope of data (e.g. instrumentation library name).
* **Record** - specific record (Log, Span, Metric) that also includes its own set of Attributes. May follow given
  signal type semantic conventions (e.g. [trace], [metrics], [logs]), though they may also contain key/values that are
  specific to the context of the record. Additionally, Logs can also include attributes in the Body.

As can be observed, while attributes can be present at both Resource and Record level currently, they are not created
equal and should be interpreted separately. Resource-level attributes have a much wider scope and are used to identify
where the data comes from while Record-level attributes context is much narrower, related just to the single record,
frequently with much high cardinality of both keys and values.

At Sumo Logic, there is a concept of [Fields](https://help.sumologic.com/docs/manage/fields) for log data. Fields offer
a powerful capability to associate indexable metadata with logs, though only limited number of them can be used
at a given time. Also, they need to be defined first.

Looking from the OpenTelemetry standpoint, Fields are a good match for Resource-level attributes,
while Log Record-level attributes are good fit for [structured representation of the log via JSON], which
is automatically supported by Sumo Logic Search.

All resource-level attributes are stored as fields. If a matching field is not defined, it will be skipped (the list
of ignored fields can be checked via [dropped fields view]).
When log contains record-level attributes, they are stored as JSON representation. Body, if present, is then
stored under `log` key.

#### Examples

##### Log with both Resource-level and Record-level attributes

Consider following input log:

```text
  Resource:
    Attributes:
      "indexed-field": "some value"
  Log:
    Body: "sample body"
    Attributes:
      "log-level-attribute": 42
```

Such log will be stored as following set of data at Sumo Logic:

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

In case of no log-level attributes, body is stored inline. I.e. for following input:

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

[rich data model]: https://github.com/open-telemetry/opentelemetry-proto/tree/main/opentelemetry/proto
[resource semantic conventions]: https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/resource/semantic_conventions
[trace]: https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/trace/semantic_conventions
[metrics]: https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/metrics/semantic_conventions
[logs]: https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/logs/semantic_conventions
[structured representation of the log via JSON]: https://help.sumologic.com/docs/search/get-started-with-search/search-basics/view-search-results-json-logs
[dropped fields view]: https://help.sumologic.com/docs/manage/fields/#view-dropped-fields

### Data Tagging recommendations

Please read [Metadata Naming Conventions](/docs/send-data/reference-information/metadata-naming-conventions/) to became more familiar with the following terms:

* Source Category (`_sourceCategory`)
* Source Host (`_sourceHost`)
* Source Name (`_sourceName`)

The above attributes are taken from the resource attributes and in case they are not set, they are taken from collector configuration.

See the following example which shows how to set them using Resource Attributes processor:

```yaml
processors:
  resource/static fields:
    attributes:
    - key: _sourceName
      value: my source name
      ## upsert will override existing _sourceName field
      action: upsert
```

For more advanced cases you can use Transform processor. For example you can concatenate multiple resource attributes into `_sourceCategory` concatenated with `/`

```yaml
processors:
  transform/custom fields:
    log_statements:
    - context: resource
      statements:
      - set(attributes["_sourceCategory"], Concat([attributes["service.name"], attributes["http.method"]], "/"))
```

In addition to special tags, you can also create your own. We simply treat all resource attributes as tags.
You can set default tags in collector configuration using `collector_fields` option:

```yaml
extensions:
  sumologic:
    collector_fields:
      cluster: staging
```

Tags are useful for building the queries and helps to correlate the different signals (metrics, logs and traces) with each other.

:::note
Refer to [Fields](/docs/manage/fields/) for more information on fields and how to use them.
:::
