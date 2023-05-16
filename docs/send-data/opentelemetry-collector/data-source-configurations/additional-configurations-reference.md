---
id: additional-configurations-reference
title: Additional Configurations Reference
sidebar_label: Additional Configurations Reference
description: Reference guide for Sumo Logic OpenTelemetry Collector configurations.
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Sumo Logic Distribution for OpenTelemetry stores the configuration for the collector in the configuration directory. It can be found here.

| | |
| :-- | :-- |
| Linux | `/etc/otelcol-sumo/conf.d` |
| Mac | `/etc/otelcol-sumo/conf.d` |
| Windows | `C:\ProgramData\Sumo Logic OpenTelemetry Collector\` |


## Configuration location and structure

The Sumo Logic OpenTelemetry Collector configuration is comprised of two parts. Based on the platform, the configuration by default is stored at the following location:
* Linux and macOS: `/etc/otelcol-sumo/`
* Windows: `C:\ProgramData\Sumo Logic\OpenTelemetry Collector\config`

:::note
If you manually installed the collector, your configuration may be in a different location.
:::

### Sumo Logic-defined configuration

This is required by the collector to properly communicate with Sumo Logic SaaS service, and transmit data. All Sumo Logic preconfigured components are stored in `sumologic.yaml` file. This file is managed by the installation script and should never be changed manually. Depending upon your platform.

### Data Source configuration

Here, you can define all the configuration that tells the collector what data to collect, how to process it (including adding metadata), and send it to Sumo Logic. All the user-defined configuration resides under the `conf.d` directory.

Any configuration for a Source (e.g., MySQL, Nginx, Application Logs) should be stored in a separate file with descriptive name under the `conf.d` directory. For example, a file named `conf.d/mysql.yaml` can contain configuration to collect MySQL data (logs and metrics), and will contain the necessary receiver, processors and the pipeline that together inform the collector on how to collect and send the MySQL data.

:::tip
It is recommended to maintain the configuration of all reusable components in `conf.d/common.yaml`. For example, a file named `conf.d/mysql.yaml` can contain the MySQL receiver along with any processors that are intended to modify the collected data before sending it to Sumo Logic.
:::

Our [**App Catalog**](/docs/get-started/apps-integrations) provides a mechanism to create these configuration files using a simple UI form input. Learn More.

## Custom Configuration

Use Custom configuration to customize the collection of your logs, metrics and traces in Sumo Logic. Learn more about configuration [here](https://opentelemetry.io/docs/collector/configuration).

There are some processors provided in `sumologic.yaml` that are intended to be used in every pipeline.

* **Memory limiter processor**. It is used to prevent out-of-memory situations on the collector. It should be always first on the processor's list. For more information, refer to the [OpenTelemetry documentation](https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/memorylimiterprocessor#memory-limiter-processor).
* **Batch processor**. It accepts spans, metrics, or logs and places them into batches. Batching helps better compress the data and reduce the number of outgoing connections required to transmit the data. See [Using batch processor to batch data](#using-batch-processor-to-batch-data) for more information.
* **ResourceDetection/System processor**. [It can be used](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourcedetectionprocessor/) to detect resource information from the host in a format that conforms to the [OpenTelemetry resource semantic conventions](https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/resource/semantic_conventions/), and append or override the resource value in telemetry data with this information. This processor is used to tag labels like `host.name`, `host.id`, `os.type`.

We also expect the Sumo Logic exporter to be included in the `exporters` section.

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
      exporters:
        - sumologic
```

## Using Batch processor to batch data

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
* [batchprocessor]
* [memorylimiterprocessor]
* [filterprocessor]
* [sumologicexporter]

## Mapping OpenTelemetry concepts to Sumo Logic

OpenTelemetry has a [rich data model](https://github.com/open-telemetry/opentelemetry-proto/tree/main/opentelemetry/proto), which is internally constructed out of several layers. For all signals,
these can be broken down into following:

* **Resource**. Includes attributes describing the resource from which given set of data comes from. Should follow [resource semantic conventions](https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/resource/semantic_conventions).
* **Instrumentation Scope**. Additional information about the scope of data. For example, instrumentation library name.
* **Record**. Refers to a specific entry of data, such as a Log, Span, or Metric. Each Record has its own set of attributes, which may include key/value pairs that are specific to the context of the Record. Some Record types may follow certain conventions for signal types, such as [trace](https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/trace/semantic_conventions), [metrics](https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/metrics/semantic_conventions), or [logs](https://github.com/open-telemetry/opentelemetry-specification/tree/main/specification/logs/semantic_conventions). Logs, in particular, can also include attributes in the body of the Record.

As can be observed, while attributes can be present at both **Resource** and **Record level** currently, they are not created equal and should be interpreted separately. The Resource-Level attribute context is much broader, and they identify where data comes from, whereas Record-Level attributes concern just one record, often with many keys and values.

At Sumo Logic, there is a concept of [Fields](/docs/manage/fields) for log data. Fields offer a powerful capability to associate indexable metadata with logs, though only a limited number of them can be used at a given time, and you must define them first.

Looking from the OpenTelemetry standpoint, [Fields](/docs/manage/fields) are a good match for the **Resource-level** attributes, while Log Record-level attributes are good fit for the [structured representation of the log via JSON](/docs/search/get-started-with-search/search-basics/view-search-results-json-logs), which is automatically supported by Sumo Logic Search.

All **Resource-level** attributes are stored as fields, and any attributes that don't match a defined field will be skipped. You can check the list of ignored fields using the [dropped fields view](/docs/manage/fields/#view-dropped-fields). When a log contains attributes at the **Record-level**, they are stored as JSON, and if there is a body, it will be stored under the `log` key.

### Example: Log with both Resource-level and Record-level attributes

Consider the following input log:

```text
  Resource:
    Attributes:
      "indexed-field": "some value"
  Log:
    Body: "Sample body"
    Attributes:
      "log-level-attribute": 42
```

Such log will be stored as the following set of data at Sumo Logic:

```text
  Fields:
    "indexed-field": "some value"

  _raw (JSON): {
    "log": "Sample body",
    "log-level-attribute": "42"
  }
```

<img src={useBaseUrl('img/send-data/opentelemetry-collector/resource-and-record-level-attributes.png')} alt="resource and record attributes in Sumo Logic" />

### Example: Log with Resource-level attributes only

If no log-level attributes are present, the log body is stored inline. For example, for the following input:

```text
  Resource:
    Attributes:
      "indexed-field": "some value"
  Log:
    Body: "Sample body"
```

The output is stored as:

```text
  Fields:
    "indexed-field": "some value"

  _raw: "Sample body"
```

<img src={useBaseUrl('img/send-data/opentelemetry-collector/resource-attributes-only.png')} alt="resource attributes only in Sumo Logic" />

## Data Tagging Recommendations

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

[batchprocessor]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/batchprocessor
[memorylimiterprocessor]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/processor/memorylimiterprocessor
[filterprocessor]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/filterprocessor
[sumologicexporter]: https://github.com/SumoLogic/sumologic-otel-collector/pkg/exporter/sumologicexporter
